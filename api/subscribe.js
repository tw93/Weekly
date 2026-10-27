// POST /api/subscribe: the signup form on weekly.tw93.fun and tw93.fun posts
// here. It never writes a contact; it mails a confirmation link, or a note
// that the address is already subscribed, once per address and choice per day.

import {
  ALLOWED_ORIGINS,
  CONFIRM_URL,
  FROM,
  alreadySubscribed,
  createToken,
  escapeHtml,
  idempotencyKey,
  parseSignup,
  readConfig,
  resend,
  subscriptionName,
} from "./_newsletter.js";

const cors = (origin) => ({
  "Access-Control-Allow-Origin": origin,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
  Vary: "Origin",
});

const reply = (status, body, origin) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...(origin ? cors(origin) : {}),
    },
  });

const wrap = (lines, link) => {
  const button = link
    ? `<p style="margin:28px 0"><a href="${escapeHtml(link)}" style="display:inline-block;background:#363433;color:#fdfcf9;text-decoration:none;padding:10px 20px;border-radius:8px">${lines.button}</a></p>`
    : "";
  const note = lines.note ? `<p style="color:#6b6863;font-size:13px">${lines.note}</p>` : "";
  return `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','PingFang SC',sans-serif;max-width:520px;margin:0 auto;padding:24px 16px;color:#363433;font-size:15px;line-height:1.7">
<p>${lines.body}</p>
${button}${note}
</div>`;
};

const plain = (lines, link) =>
  [lines.body, link && `${lines.button}: ${link}`, lines.note].filter(Boolean).join("\n\n");

export const confirmationEmail = (signup, link) => {
  const title = subscriptionName(signup.lang, signup.topics);
  const name = escapeHtml(title);
  const lines =
    signup.lang === "zh"
      ? {
          subject: `确认订阅${title}`,
          body: `点下面的按钮确认订阅，之后${name}有更新会发到这个邮箱。`,
          button: "确认订阅",
          note: "不是你订阅的话，忽略这封邮件就好。",
        }
      : {
          subject: `Confirm your subscription to ${title}`,
          body: `Confirm below and new posts from ${name} will come to this address.`,
          button: "Confirm subscription",
          note: "Didn't sign up? Just ignore this email.",
        };
  return { subject: lines.subject, html: wrap(lines, link), text: plain(lines, link) };
};

// Sent instead of a confirmation when the address already receives all it
// asked for, so a repeat signup still gets an answer in the inbox while the
// form itself replies the same either way.
export const alreadyEmail = (signup) => {
  const title = subscriptionName(signup.lang, signup.topics);
  const name = escapeHtml(title);
  const lines =
    signup.lang === "zh"
      ? {
          subject: `你已经订阅了${title}`,
          body: `这个邮箱已经订阅过${name}了，不用再确认，之后有更新会照常发到这里。`,
        }
      : {
          subject: `You're already subscribed to ${title}`,
          body: `This address is already subscribed to ${name}, so there's nothing to confirm. New posts will keep coming here.`,
        };
  return { subject: lines.subject, html: wrap(lines), text: plain(lines) };
};

export function OPTIONS(request) {
  const origin = request.headers.get("origin");
  if (!ALLOWED_ORIGINS.includes(origin)) return new Response(null, { status: 403 });
  return new Response(null, { status: 204, headers: cors(origin) });
}

export async function POST(request) {
  const origin = request.headers.get("origin");
  // Browsers always send Origin on a cross-site or fetch POST; anything else
  // is not the form.
  if (!ALLOWED_ORIGINS.includes(origin)) return reply(403, { ok: false });

  let input;
  try {
    const type = request.headers.get("content-type") ?? "";
    input = type.includes("application/json")
      ? await request.json()
      : Object.fromEntries(await request.formData());
  } catch {
    return reply(400, { ok: false, error: "invalid" }, origin);
  }

  // Honeypot: the form hides this field, so only a bot fills it.
  if (input?.website) return reply(200, { ok: true }, origin);

  const signup = parseSignup(input);
  if (!signup) return reply(400, { ok: false, error: "invalid" }, origin);

  const config = readConfig();
  if (!config) return reply(503, { ok: false, error: "unavailable" }, origin);

  // The form gets the same answer whether or not the address is on the list,
  // so it cannot be used to test who subscribes; the inbox tells them apart.
  const already = await alreadySubscribed(config, signup);
  const email = already
    ? alreadyEmail(signup)
    : confirmationEmail(signup, `${CONFIRM_URL}?t=${createToken(signup, config.secret)}`);
  const sent = await resend(
    config.apiKey,
    "POST",
    "/emails",
    { from: FROM, to: [signup.email], ...email },
    { "Idempotency-Key": idempotencyKey(signup, Date.now(), already ? "already" : "confirm") },
  );
  // 409 is Resend refusing a repeat of today's request: already mailed.
  if (!sent.ok && sent.status !== 409) {
    console.error("subscribe: send failed", sent.status, sent.data?.name);
    return reply(502, { ok: false, error: "send" }, origin);
  }
  return reply(200, { ok: true }, origin);
}
