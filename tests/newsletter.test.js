import assert from "node:assert/strict";
import test from "node:test";
import {
  createToken,
  idempotencyKey,
  parseSignup,
  readConfig,
  verifyToken,
} from "../api/_newsletter.js";
import { GET as confirmPage, POST as confirm } from "../api/confirm.js";
import { POST as subscribe } from "../api/subscribe.js";
import { extractContent, toEmailHtml } from "../scripts/newsletter.js";

const SECRET = "s".repeat(40);
const ENV = {
  RESEND_API_KEY: "re_test",
  NEWSLETTER_SECRET: SECRET,
  RESEND_SEGMENT_ZH: "seg-zh",
  RESEND_SEGMENT_EN: "seg-en",
  RESEND_TOPIC_WEEKLY: "topic-weekly",
  RESEND_TOPIC_BLOG: "topic-blog",
};
const signup = { email: "reader@example.com", lang: "zh", topics: ["weekly"] };

// Replaces fetch with a recorder answering each Resend path from `routes`.
function mockResend(t, routes = {}) {
  const calls = [];
  const saved = { ...process.env };
  Object.assign(process.env, ENV);
  t.mock.method(globalThis, "fetch", async (url, init = {}) => {
    const path = new URL(url).pathname;
    const call = { method: init.method, path, headers: init.headers, body: init.body && JSON.parse(init.body) };
    calls.push(call);
    const [status, data] = routes[`${init.method} ${path}`] ?? [200, {}];
    return new Response(JSON.stringify(data), { status });
  });
  t.after(() => {
    process.env = saved;
  });
  return calls;
}

const post = (body, origin = "https://weekly.tw93.fun") =>
  new Request("https://weekly.tw93.fun/api/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(origin ? { Origin: origin } : {}) },
    body: JSON.stringify(body),
  });

test("a confirmation link is signed, expires and cannot be edited", () => {
  const now = Date.UTC(2026, 9, 26, 10);
  const token = createToken(signup, SECRET, now);
  assert.deepEqual(verifyToken(token, SECRET, now), signup);
  assert.equal(verifyToken(token, "x".repeat(40), now), null, "another secret");
  assert.equal(verifyToken(token, SECRET, now + 4 * 86400000), null, "expired");

  const [body, mac] = token.split(".");
  const forged = Buffer.from(
    JSON.stringify({ ...JSON.parse(Buffer.from(body, "base64url")), e: "victim@example.com" }),
  ).toString("base64url");
  assert.equal(verifyToken(`${forged}.${mac}`, SECRET, now), null, "edited address");

  // Same request on the same day builds the same link and the same key.
  assert.equal(createToken(signup, SECRET, now + 3600000), token);
  assert.equal(idempotencyKey(signup, now), idempotencyKey(signup, now + 3600000));
  assert.notEqual(idempotencyKey(signup, now), idempotencyKey({ ...signup, lang: "en" }, now));
});

test("signups are validated and config gaps disable signup", () => {
  assert.deepEqual(parseSignup({ email: " Reader@Example.com ", lang: "zh", topics: ["weekly", "x"] }), signup);
  assert.equal(parseSignup({ email: "not-an-email", lang: "zh", topics: ["weekly"] }), null);
  assert.equal(parseSignup({ email: "a@b.co", lang: "fr", topics: ["weekly"] }), null);
  assert.equal(parseSignup({ email: "a@b.co", lang: "zh", topics: [] }), null);
  assert.ok(readConfig(ENV));
  assert.equal(readConfig({ ...ENV, RESEND_TOPIC_BLOG: "" }), null);
  assert.equal(readConfig({ ...ENV, NEWSLETTER_SECRET: "short" }), null);
});

test("subscribe only mails a confirmation, and only for the two sites", async (t) => {
  const calls = mockResend(t, { "GET /contacts/reader%40example.com": [404, {}] });

  assert.equal((await subscribe(post(signup, "https://evil.example"))).status, 403);
  assert.equal((await subscribe(post(signup, null))).status, 403);
  assert.equal((await subscribe(post({ ...signup, website: "bot" }))).status, 200);
  assert.equal((await subscribe(post({ ...signup, email: "x" }))).status, 400);
  assert.equal(calls.length, 0, "rejected requests never reach Resend");

  const response = await subscribe(post(signup, "https://tw93.fun"));
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("access-control-allow-origin"), "https://tw93.fun");
  const sent = calls.find((call) => call.path === "/emails");
  assert.ok(sent, "a confirmation email is sent");
  assert.deepEqual(sent.body.to, ["reader@example.com"]);
  assert.match(sent.body.html, /https:\/\/weekly\.tw93\.fun\/api\/confirm\?t=/);
  assert.match(sent.headers["Idempotency-Key"], /^confirm\/[0-9a-f]{64}$/);
  assert.ok(!calls.some((call) => call.method === "POST" && call.path === "/contacts"), "no contact yet");
});

test("an address already on the list is told so by email, not by the form", async (t) => {
  const calls = mockResend(t, {
    "GET /contacts/reader%40example.com": [200, { unsubscribed: false }],
    "GET /contacts/reader%40example.com/topics": [200, { data: [{ id: "topic-weekly", subscription: "opt_in" }] }],
  });
  const response = await subscribe(post(signup));
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true }, "same answer as a new address");
  const sent = calls.find((call) => call.path === "/emails");
  assert.ok(sent, "the reader still gets an email");
  assert.equal(sent.body.subject, "你已经订阅了潮流周刊");
  assert.doesNotMatch(sent.body.html, /api\/confirm/, "nothing to confirm");
  assert.match(sent.headers["Idempotency-Key"], /^already\/[0-9a-f]{64}$/);
  assert.ok(!calls.some((call) => call.method !== "GET" && call.path.startsWith("/contacts")), "no write");
});

test("the confirm link says so when the address is already subscribed", async (t) => {
  const calls = mockResend(t, {
    "GET /contacts/reader%40example.com": [200, { unsubscribed: false }],
    "GET /contacts/reader%40example.com/topics": [200, { data: [{ id: "topic-weekly", subscription: "opt_in" }] }],
  });
  const page = await confirmPage(new Request(`https://weekly.tw93.fun/api/confirm?t=${createToken(signup, SECRET)}`));
  const html = await page.text();
  assert.match(html, /你已经订阅过了/);
  assert.doesNotMatch(html, /<form/);
  assert.ok(calls.every((call) => call.method === "GET"));
});

test("subscribe answers 503 instead of half-working without config", async (t) => {
  mockResend(t);
  delete process.env.RESEND_API_KEY;
  assert.equal((await subscribe(post(signup))).status, 503);
});

test("opening the link writes nothing; the button press saves the contact", async (t) => {
  const calls = mockResend(t, { "GET /contacts/reader%40example.com": [404, {}] });
  const token = createToken(signup, SECRET);

  const page = await confirmPage(new Request(`https://weekly.tw93.fun/api/confirm?t=${token}`));
  assert.equal(page.status, 200);
  assert.match(await page.text(), /<form method="post"/);
  assert.ok(
    calls.every((call) => call.method === "GET"),
    "a link scanner opening the page subscribes no one",
  );

  const done = await confirm(
    new Request("https://weekly.tw93.fun/api/confirm", { method: "POST", body: new URLSearchParams({ t: token }) }),
  );
  assert.equal(done.status, 200);
  const created = calls.find((call) => call.method === "POST" && call.path === "/contacts");
  assert.deepEqual(created.body.segments, [{ id: "seg-zh" }]);
  assert.deepEqual(created.body.topics, [{ id: "topic-weekly", subscription: "opt_in" }]);

  const bad = await confirm(
    new Request("https://weekly.tw93.fun/api/confirm", { method: "POST", body: new URLSearchParams({ t: `${token}x` }) }),
  );
  assert.equal(bad.status, 400);
});

test("an existing contact gets the new segment and topic instead", async (t) => {
  const calls = mockResend(t, {
    "POST /contacts": [409, { name: "already_exists" }],
    "GET /contacts/reader%40example.com/segments": [200, { data: [{ id: "seg-en" }] }],
  });
  const token = createToken(signup, SECRET);
  const done = await confirm(
    new Request("https://weekly.tw93.fun/api/confirm", { method: "POST", body: new URLSearchParams({ t: token }) }),
  );
  assert.equal(done.status, 200);
  const paths = calls.map((call) => `${call.method} ${call.path}`);
  assert.ok(paths.includes("POST /contacts/reader%40example.com/segments/seg-zh"));
  assert.ok(paths.includes("PATCH /contacts/reader%40example.com/topics"));
});

test("the email keeps the issue body and drops site chrome", () => {
  const page = `<div id="write"><h1>Title</h1>
<p>Intro <a href="/posts/1">old issue</a></p>
<img src="https://cdn.fliggy.com/pic/a.png" data-pswp-src="x" style="aspect-ratio: 1.7;" width="800">
<img src="https://cdn.tw93.fun/pic/b.svg" alt="diagram">
<video src="https://cdn.fliggy.com/v.mp4" width="400px"></video>
<pre class="astro-code" style="background:#fff"><code><span style="color:#d73a49">const</span></code></pre>
<div class="flex pay-button-wrapper"><a>Support</a></div>
<form class="newsletter"></form><p>footer</p></div>`;
  const content = extractContent(page, "weekly");
  assert.ok(!content.includes("Support") && !content.includes("footer") && !content.includes("Title"));

  const html = toEmailHtml(content, "https://weekly.tw93.fun/posts/287", "zh");
  assert.match(html, /href="https:\/\/weekly\.tw93\.fun\/posts\/1"/);
  assert.match(html, /<img src="https:\/\/cdn\.fliggy\.com\/pic\/a\.png" width="760" style=/);
  assert.ok(!html.includes("data-pswp") && !html.includes("aspect-ratio") && !html.includes("class="));
  assert.ok(!html.includes(".svg") && html.includes("diagram"), "SVG becomes a link");
  assert.ok(!html.includes("<video") && html.includes("这里有段视频"));
  assert.ok(!html.includes("#d73a49") && !html.includes("background:#fff"), "dark-theme code colours are dropped");
  assert.match(html, /<pre style="[^"]*color:#363433/);
});
