// Email subscription for the Weekly and the blog, shared by api/subscribe.js,
// api/confirm.js and scripts/newsletter.js. Files under api/ that start with
// an underscore are not deployed as functions.
//
// Signup is double opt-in and stateless: /api/subscribe mails a signed link,
// and only /api/confirm writes the contact to Resend, so an address typed by
// someone else never receives an issue. The Resend key lives only in the
// Vercel and GitHub Actions secrets.

import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export const FROM = "Tw93 <hi@tw93.fun>";
export const CONFIRM_URL = "https://weekly.tw93.fun/api/confirm";
export const ALLOWED_ORIGINS = ["https://weekly.tw93.fun", "https://tw93.fun"];
export const TOPICS = ["weekly", "blog"];
export const LANGS = ["zh", "en"];

const DAY = 24 * 60 * 60 * 1000;
// A link stays valid for two to three days; the expiry is rounded to a whole
// day so that the same request on the same day builds the same email, which
// lets Resend's idempotency key drop the repeat.
const LINK_DAYS = 3;

export const NAMES = {
  zh: { weekly: "潮流周刊", blog: "Tw93 的博客", and: "和" },
  en: { weekly: "Weekly", blog: "Tw93's blog", and: " and " },
};

export const subscriptionName = (lang, topics) =>
  topics.map((topic) => NAMES[lang][topic]).join(NAMES[lang].and);

/** Reads the Resend settings; a missing one disables signup instead of half-working. */
export function readConfig(env = process.env) {
  const config = {
    apiKey: env.RESEND_API_KEY,
    secret: env.NEWSLETTER_SECRET,
    segments: { zh: env.RESEND_SEGMENT_ZH, en: env.RESEND_SEGMENT_EN },
    topics: { weekly: env.RESEND_TOPIC_WEEKLY, blog: env.RESEND_TOPIC_BLOG },
  };
  const values = [
    config.apiKey,
    config.secret,
    ...Object.values(config.segments),
    ...Object.values(config.topics),
  ];
  if (values.some((value) => !value)) return null;
  if (config.secret.length < 32) return null;
  return config;
}

const EMAIL = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;

/** Validates a signup; returns the normalised request or null. */
export function parseSignup(input) {
  const email = String(input?.email ?? "").trim().toLowerCase();
  const lang = LANGS.includes(input?.lang) ? input.lang : null;
  const raw = Array.isArray(input?.topics) ? input.topics : [input?.topics];
  const topics = TOPICS.filter((topic) => raw.includes(topic));
  if (!email || email.length > 254 || !EMAIL.test(email)) return null;
  if (!lang || topics.length === 0) return null;
  return { email, lang, topics };
}

const encode = (value) => Buffer.from(value).toString("base64url");
const sign = (body, secret) =>
  createHmac("sha256", secret).update(body).digest("base64url");

export function createToken({ email, lang, topics }, secret, now = Date.now()) {
  const expires = (Math.floor(now / DAY) + LINK_DAYS) * DAY;
  const body = encode(JSON.stringify({ e: email, l: lang, t: topics, x: expires }));
  return `${body}.${sign(body, secret)}`;
}

/** Returns the signup a token carries, or null when it is forged or expired. */
export function verifyToken(token, secret, now = Date.now()) {
  const [body, mac, extra] = String(token ?? "").split(".");
  if (!body || !mac || extra !== undefined) return null;
  const expected = Buffer.from(sign(body, secret));
  const given = Buffer.from(mac);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) {
    return null;
  }
  let data;
  try {
    data = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
  } catch {
    return null;
  }
  if (typeof data?.x !== "number" || data.x < now) return null;
  return parseSignup({ email: data.e, lang: data.l, topics: data.t });
}

// `kind` keeps the confirmation and the already-subscribed notice apart.
export const idempotencyKey = (signup, now = Date.now(), kind = "confirm") =>
  `${kind}/` +
  createHash("sha256")
    .update(
      [signup.email, signup.lang, signup.topics.join(","), Math.floor(now / DAY)].join("|"),
    )
    .digest("hex");

export const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

/** Calls the Resend REST API; returns { ok, status, data }. */
export async function resend(apiKey, method, path, body, headers = {}) {
  const response = await fetch(`https://api.resend.com${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  let data = null;
  try {
    data = await response.json();
  } catch {}
  return { ok: response.ok, status: response.status, data };
}

/** True when the address already receives every topic it asked for. */
export async function alreadySubscribed(config, signup) {
  const path = `/contacts/${encodeURIComponent(signup.email)}`;
  const contact = await resend(config.apiKey, "GET", path);
  if (!contact.ok || contact.data?.unsubscribed) return false;
  const topics = await resend(config.apiKey, "GET", `${path}/topics`);
  if (!topics.ok) return false;
  const optedIn = new Set(
    (topics.data?.data ?? [])
      .filter((topic) => topic.subscription === "opt_in")
      .map((topic) => topic.id),
  );
  return signup.topics.every((topic) => optedIn.has(config.topics[topic]));
}

/** Writes a confirmed signup: segment for its language, opt-in for its topics. */
export async function saveContact(config, signup) {
  const segment = config.segments[signup.lang];
  const topics = signup.topics.map((topic) => ({
    id: config.topics[topic],
    subscription: "opt_in",
  }));
  const created = await resend(config.apiKey, "POST", "/contacts", {
    email: signup.email,
    unsubscribed: false,
    segments: [{ id: segment }],
    topics,
  });
  if (created.ok) return true;

  // The address is already a contact, perhaps for the other topic or language.
  const path = `/contacts/${encodeURIComponent(signup.email)}`;
  const updated = await resend(config.apiKey, "PATCH", path, { unsubscribed: false });
  if (!updated.ok) return false;
  const segments = await resend(config.apiKey, "GET", `${path}/segments`);
  if (!segments.ok) return false;
  if (!(segments.data?.data ?? []).some((item) => item.id === segment)) {
    const added = await resend(config.apiKey, "POST", `${path}/segments/${segment}`);
    if (!added.ok) return false;
  }
  const subscribed = await resend(config.apiKey, "PATCH", `${path}/topics`, topics);
  return subscribed.ok;
}
