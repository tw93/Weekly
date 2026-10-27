// GET /api/confirm?t=... shows a button; only its POST writes the contact.
// Mail security scanners open every link in a message, so a GET that
// subscribed would confirm addresses nobody confirmed.

import {
  CONFIRM_URL,
  NAMES,
  alreadySubscribed,
  escapeHtml,
  readConfig,
  saveContact,
  subscriptionName,
  verifyToken,
} from "./_newsletter.js";

const COPY = {
  zh: {
    title: (name) => `确认订阅${name}`,
    body: (name, email) => `之后有更新会发到 ${email}`,
    button: "确认订阅",
    doneTitle: "订阅好了",
    done: (name, email) => `之后${name}有更新会发到 ${email}`,
    alreadyTitle: "你已经订阅过了",
    already: (name, email) => `不用再确认，${name}有更新会照常发到 ${email}`,
    invalidTitle: "链接已失效",
    invalid: "回到网站重新订阅一次就好",
    failedTitle: "暂时没能订阅上",
    failed: "过一会儿再点一次邮件里的按钮试试",
    back: (name) => `回到${name}`,
  },
  en: {
    title: (name) => `Confirm your subscription to ${name}`,
    body: (name, email) => `New posts will come to ${email}.`,
    button: "Confirm subscription",
    doneTitle: "You're subscribed",
    done: (name, email) => `New posts from ${name} will come to ${email}.`,
    alreadyTitle: "You're already subscribed",
    already: (name, email) => `New posts from ${name} keep coming to ${email}. Nothing to confirm.`,
    invalidTitle: "This link has expired",
    invalid: "Subscribe again on the site to get a new one.",
    failedTitle: "Couldn't subscribe right now",
    failed: "Try the button in the email again in a little while.",
    back: (name) => `Back to ${name}`,
  },
};

const page = (lang, status, title, body, extra = "") =>
  new Response(
    `<!doctype html>
<html lang="${lang === "zh" ? "zh-CN" : "en"}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>${escapeHtml(title)}</title>
<style>
:root { --ground: #fdfcf9; --ink: #363433; --muted: #6b6863; --button: #363433; --button-ink: #fdfcf9; }
@media (prefers-color-scheme: dark) {
  :root { --ground: #1e1d1b; --ink: #ecebe8; --muted: #a3a09a; --button: #ecebe8; --button-ink: #1e1d1b; }
}
body { margin: 0; background: var(--ground); color: var(--ink); font: 16px/1.7 -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", sans-serif; }
main { max-width: 480px; margin: 18vh auto 0; padding: 0 16px; }
h1 { font-size: 22px; font-weight: 600; margin: 0 0 12px; }
p { margin: 0 0 24px; color: var(--muted); overflow-wrap: anywhere; }
button { font: inherit; font-weight: 500; background: var(--button); color: var(--button-ink); border: 0; border-radius: 8px; padding: 10px 22px; cursor: pointer; }
a { color: var(--ink); }
</style>
</head>
<body><main><h1>${escapeHtml(title)}</h1><p>${escapeHtml(body)}</p>${extra}</main></body>
</html>`,
    {
      status,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
        "Referrer-Policy": "no-referrer",
        "X-Frame-Options": "DENY",
      },
    },
  );

const langOf = (request) =>
  (request.headers.get("accept-language") ?? "").toLowerCase().startsWith("zh") ? "zh" : "en";

// A blog-only signup goes back to the blog, anything else to the Weekly.
const backLink = (lang, topics = ["weekly"]) => {
  const topic = topics.includes("weekly") ? "weekly" : "blog";
  const site = topic === "weekly" ? "https://weekly.tw93.fun" : "https://tw93.fun";
  return `<a href="${site}${lang === "en" ? "/en" : ""}">${COPY[lang].back(NAMES[lang][topic])}</a>`;
};

export async function GET(request) {
  const config = readConfig();
  const token = new URL(request.url).searchParams.get("t");
  const signup = config && verifyToken(token, config.secret);
  if (!signup) {
    const lang = langOf(request);
    const copy = COPY[lang];
    return page(lang, 400, copy.invalidTitle, copy.invalid, backLink(lang));
  }
  const copy = COPY[signup.lang];
  const name = subscriptionName(signup.lang, signup.topics);
  const back = backLink(signup.lang, signup.topics);
  // Reading the list writes nothing, so a link scanner still subscribes no one.
  if (await alreadySubscribed(config, signup)) {
    return page(signup.lang, 200, copy.alreadyTitle, copy.already(name, signup.email), back);
  }
  const form = `<form method="post" action="${CONFIRM_URL}"><input type="hidden" name="t" value="${escapeHtml(token)}"><button type="submit">${copy.button}</button></form>`;
  return page(signup.lang, 200, copy.title(name), copy.body(name, signup.email), form);
}

export async function POST(request) {
  const config = readConfig();
  let token = null;
  try {
    token = (await request.formData()).get("t");
  } catch {}
  const signup = config && verifyToken(token, config.secret);
  if (!signup) {
    const lang = langOf(request);
    const copy = COPY[lang];
    return page(lang, 400, copy.invalidTitle, copy.invalid, backLink(lang));
  }
  const copy = COPY[signup.lang];
  const name = subscriptionName(signup.lang, signup.topics);
  const back = backLink(signup.lang, signup.topics);
  if (!(await saveContact(config, signup))) {
    console.error("confirm: saving the contact failed");
    return page(signup.lang, 502, copy.failedTitle, copy.failed, back);
  }
  return page(signup.lang, 200, copy.doneTitle, copy.done(name, signup.email), back);
}
