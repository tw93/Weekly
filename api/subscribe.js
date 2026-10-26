// POST /api/subscribe: the signup form on weekly.tw93.fun and tw93.fun posts
// here. It never writes a contact; it mails a confirmation link, once per
// address and choice per day.

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

export const confirmationEmail = (signup, link) => {
  const name = subscriptionName(signup.lang, signup.topics);
  const url = escapeHtml(link);
  const zh = signup.lang === "zh";
  const subject = zh ? `确认订阅${name}` : `Confirm your subscription to ${name}`;
  const lines = zh
    ? [
        `刚刚有人用这个邮箱订阅了${escapeHtml(name)}，如果是你，点下面的按钮确认一下，之后有新内容会发到这里。`,
        "确认订阅",
        "不是你操作的话忽略这封邮件就好，不确认就不会收到任何邮件。",
      ]
    : [
        `Someone just subscribed this address to ${escapeHtml(name)}. If it was you, confirm below and new posts will arrive here.`,
        "Confirm subscription",
        "If it wasn't you, ignore this email. Nothing is sent unless you confirm.",
      ];
  const html = `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','PingFang SC',sans-serif;max-width:520px;margin:0 auto;padding:24px 16px;color:#363433;font-size:15px;line-height:1.7">
<p>${lines[0]}</p>
<p style="margin:28px 0"><a href="${url}" style="display:inline-block;background:#363433;color:#fdfcf9;text-decoration:none;padding:10px 20px;border-radius:8px">${lines[1]}</a></p>
<p style="color:#6b6863;font-size:13px">${lines[2]}</p>
</div>`;
  const text = `${lines[0]}\n\n${lines[1]}: ${link}\n\n${lines[2]}`;
  return { subject, html, text };
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

  // The same answer whether or not the address is on the list, so the form
  // cannot be used to test who subscribes.
  if (await alreadySubscribed(config, signup)) return reply(200, { ok: true }, origin);

  const link = `${CONFIRM_URL}?t=${createToken(signup, config.secret)}`;
  const email = confirmationEmail(signup, link);
  const sent = await resend(
    config.apiKey,
    "POST",
    "/emails",
    { from: FROM, to: [signup.email], ...email },
    { "Idempotency-Key": idempotencyKey(signup) },
  );
  // 409 is Resend refusing a repeat of today's request: already mailed.
  if (!sent.ok && sent.status !== 409) {
    console.error("subscribe: send failed", sent.status, sent.data?.name);
    return reply(502, { ok: false, error: "send" }, origin);
  }
  return reply(200, { ok: true }, origin);
}
