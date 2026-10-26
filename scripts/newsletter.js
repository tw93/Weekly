// Turns one published Weekly issue or blog post into an email and sends it
// through Resend. Run by .github/workflows/newsletter.yml, by hand only:
//
//   node scripts/newsletter.js --source weekly --id 287 --lang zh --mode preview
//   node scripts/newsletter.js --source blog --id 2026-10-26/mole-product --lang zh --mode test
//
// preview writes the email to a local file and calls nothing; test mails it
// to NEWSLETTER_TEST_TO only; send creates a Broadcast for the subscribers of
// that language and topic, and refuses when a Broadcast of the same name
// already exists, so a rerun cannot mail everyone twice.

import { writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { parse } from "node-html-parser";
import { FROM, escapeHtml, resend } from "../api/_newsletter.js";

const INK = "#363433";
const MUTED = "#6b6863";
const LINE = "#e6e3dd";

const STYLE = {
  p: "margin:0 0 16px",
  h2: `font-size:20px;line-height:1.4;margin:32px 0 12px;color:${INK}`,
  h3: `font-size:17px;line-height:1.4;margin:24px 0 8px;color:${INK}`,
  h4: `font-size:16px;margin:20px 0 8px;color:${INK}`,
  a: `color:${INK};text-decoration:underline`,
  img: "display:block;max-width:100%;height:auto;border-radius:8px;margin:12px 0",
  blockquote: `margin:0 0 16px;padding:0 0 0 12px;border-left:3px solid ${LINE};color:${MUTED}`,
  pre: `margin:0 0 16px;padding:12px;border-radius:8px;background:#f4f2ee;color:${INK};white-space:pre-wrap;word-break:break-word;font-size:14px;line-height:1.6`,
  code: "font-family:SFMono-Regular,Menlo,Consolas,monospace;font-size:0.9em",
  hr: `border:0;border-top:1px solid ${LINE};margin:28px 0`,
  ul: "margin:0 0 16px;padding-left:22px",
  ol: "margin:0 0 16px;padding-left:22px",
  li: "margin:0 0 6px",
  table: "border-collapse:collapse;width:100%;margin:0 0 16px",
  td: `border:1px solid ${LINE};padding:6px 8px;vertical-align:top`,
  th: `border:1px solid ${LINE};padding:6px 8px;text-align:left`,
};

const KEEP = {
  a: ["href"],
  img: ["src", "alt", "width"],
  td: ["colspan", "rowspan"],
  th: ["colspan", "rowspan"],
};
const DROP = new Set(["script", "style", "iframe", "noscript", "button", "form", "input", "svg", "source"]);

const COPY = {
  zh: {
    weekly: "潮流周刊",
    blog: "Tw93 的博客",
    web: "在网页上看",
    video: "这里有段视频，在网页上看",
    image: "这里有张图，在网页上看",
    unsubscribe: "退订",
    test: "[测试] ",
  },
  en: {
    weekly: "Weekly",
    blog: "Tw93's blog",
    web: "Read on the web",
    video: "There is a video here, watch it on the web",
    image: "There is an image here, view it on the web",
    unsubscribe: "Unsubscribe",
    test: "[Test] ",
  },
};

/** The part of the page that is the post itself. */
export function extractContent(html, source) {
  const root = parse(html);
  if (source === "blog") {
    const content = root.querySelector(".entry-content");
    if (!content) throw new Error("no .entry-content on the blog page");
    // The title and date line open every post and the support button and
    // signup form close it; they are site chrome, not the post.
    content
      .querySelectorAll(".post-title, .page-info, .coffee, .newsletter")
      .forEach((node) => node.remove());
    return content.innerHTML;
  }
  const write = root.querySelector("#write");
  if (!write) throw new Error("no #write on the issue page");
  const parts = [];
  for (const node of write.childNodes) {
    if (node.nodeType !== 1) continue;
    if (node.rawTagName === "h1") continue;
    // The support button and the post footer follow the issue body.
    if (node.rawTagName === "div" && node.classList.contains("flex")) break;
    if (node.classList.contains("post-divider") || node.classList.contains("newsletter")) break;
    parts.push(node.outerHTML);
  }
  return parts.join("\n");
}

/** Rewrites page HTML into the attribute-light, inline-styled form mail clients render. */
export function toEmailHtml(content, pageUrl, lang) {
  const copy = COPY[lang];
  // node-html-parser keeps <pre> as raw text by default; parse it so its
  // spans lose their dark-theme colours like everything else.
  const root = parse(`<div>${content}</div>`, {
    blockTextElements: { script: true, noscript: true, style: true },
  });
  const absolute = (value) => {
    try {
      return new URL(value, pageUrl).href;
    } catch {
      return null;
    }
  };
  const webLink = (text) =>
    parse(`<p style="${STYLE.p}"><a href="${escapeHtml(pageUrl)}" style="${STYLE.a}">${escapeHtml(text)}</a></p>`);

  const walk = (node) => {
    for (const child of [...node.childNodes]) {
      if (child.nodeType !== 1) continue;
      const tag = child.rawTagName?.toLowerCase();
      if (tag === "video") {
        child.replaceWith(webLink(copy.video));
        continue;
      }
      if (DROP.has(tag)) {
        child.remove();
        continue;
      }
      if (tag === "img") {
        const src = absolute(child.getAttribute("src") ?? "");
        // Gmail and Outlook do not show SVG images.
        if (!src || /\.svg(\?|$)/i.test(src)) {
          child.replaceWith(webLink(child.getAttribute("alt") || copy.image));
          continue;
        }
        child.setAttribute("src", src);
      }
      if (tag === "a") {
        const href = absolute(child.getAttribute("href") ?? "");
        if (href) child.setAttribute("href", href);
      }
      // Shiki's inline colours belong to the site's dark theme and turn
      // unreadable on the email's light code block, so they are dropped too.
      for (const name of Object.keys(child.attributes)) {
        if (!(KEEP[tag] ?? []).includes(name)) child.removeAttribute(name);
      }
      if (tag === "img") {
        const width = Number(child.getAttribute("width"));
        if (!width || width >= 760) child.setAttribute("width", "760");
      }
      if (STYLE[tag]) child.setAttribute("style", STYLE[tag]);
      walk(child);
    }
  };
  walk(root);
  return root.firstChild.innerHTML;
}

/** The full message around the post body. */
export function wrapEmail({ title, body, pageUrl, lang, source, unsubscribeUrl }) {
  const copy = COPY[lang];
  return `<!doctype html>
<html lang="${lang === "zh" ? "zh-CN" : "en"}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escapeHtml(title)}</title></head>
<body style="margin:0;background:#fdfcf9">
<div style="max-width:800px;margin:0;padding:28px 20px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','PingFang SC','Hiragino Sans GB',sans-serif;font-size:16px;line-height:1.75;color:${INK}">
<p style="margin:0 0 4px;font-size:13px;color:${MUTED}">${escapeHtml(copy[source])}</p>
<h1 style="font-size:24px;line-height:1.35;margin:0 0 24px;color:${INK}"><a href="${escapeHtml(pageUrl)}" style="color:${INK};text-decoration:none">${escapeHtml(title)}</a></h1>
${body}
<hr style="${STYLE.hr}">
<p style="margin:0;font-size:13px;color:${MUTED}"><a href="${escapeHtml(pageUrl)}" style="color:${MUTED}">${copy.web}</a> · <a href="${unsubscribeUrl}" style="color:${MUTED}">${copy.unsubscribe}</a></p>
</div>
</body>
</html>`;
}

const fetchText = async (url) => {
  const response = await fetch(url, { headers: { "User-Agent": "weekly-newsletter" } });
  if (!response.ok) throw new Error(`${url} answered ${response.status}`);
  return response.text();
};

/** Title, summary and page URL of the post, from the sites' own JSON APIs. */
async function readPost(source, id, lang) {
  if (source === "weekly") {
    if (!/^\d+$/.test(id)) throw new Error("a Weekly id is the issue number");
    const issue = JSON.parse(await fetchText(`https://weekly.tw93.fun/api/posts/${id}.json`));
    if (lang === "zh") {
      return { title: `潮流周刊${issue.title}`, summary: issue.description, pageUrl: issue.url };
    }
    if (!issue.translation?.url) throw new Error(`issue ${id} has no English translation yet`);
    const english = JSON.parse(await fetchText(`https://weekly.tw93.fun/api/en/posts/${id}.json`).catch(() => "null"));
    return {
      title: `Weekly ${issue.translation.title}`,
      summary: english?.description ?? "",
      pageUrl: issue.translation.url,
    };
  }
  if (!/^\d{4}-\d{2}-\d{2}\/[\w-]+$/.test(id)) throw new Error("a blog id looks like 2026-10-26/mole-product");
  const pageUrl = `https://tw93.fun/${lang === "en" ? "en/" : ""}${id}.html`;
  const index = JSON.parse(await fetchText("https://tw93.fun/api/posts.json"));
  const post = index.posts.find((item) => item.url === pageUrl);
  if (!post) throw new Error(`${pageUrl} is not in tw93.fun/api/posts.json`);
  return { title: post.title, summary: post.summary, pageUrl };
}

const parseArgs = (argv) => {
  const args = {};
  for (let i = 0; i < argv.length; i += 2) args[argv[i].replace(/^--/, "")] = argv[i + 1];
  return args;
};

async function main() {
  const { source, id, lang, mode = "preview", out } = parseArgs(process.argv.slice(2));
  if (!["weekly", "blog"].includes(source)) throw new Error("--source is weekly or blog");
  if (!["zh", "en"].includes(lang)) throw new Error("--lang is zh or en");
  if (!["preview", "test", "send"].includes(mode)) throw new Error("--mode is preview, test or send");

  const post = await readPost(source, String(id ?? ""), lang);
  const body = toEmailHtml(extractContent(await fetchText(post.pageUrl), source), post.pageUrl, lang);
  const message = (unsubscribeUrl) =>
    wrapEmail({ title: post.title, body, pageUrl: post.pageUrl, lang, source, unsubscribeUrl });

  if (mode === "preview") {
    const file = out ?? `newsletter-${source}-${lang}-${String(id).replace(/\W+/g, "-")}.html`;
    writeFileSync(file, message("#"));
    console.log(`${post.title}\n${file}`);
    return;
  }

  const env = process.env;
  const apiKey = env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not set");

  if (mode === "test") {
    const to = env.NEWSLETTER_TEST_TO;
    if (!to) throw new Error("NEWSLETTER_TEST_TO is not set");
    const sent = await resend(apiKey, "POST", "/emails", {
      from: FROM,
      to: [to],
      subject: COPY[lang].test + post.title,
      html: message("#"),
    });
    if (!sent.ok) throw new Error(`test email failed: ${sent.status} ${JSON.stringify(sent.data)}`);
    console.log(`test email sent to the test address: ${post.title}`);
    return;
  }

  const segment = lang === "zh" ? env.RESEND_SEGMENT_ZH : env.RESEND_SEGMENT_EN;
  const topic = source === "weekly" ? env.RESEND_TOPIC_WEEKLY : env.RESEND_TOPIC_BLOG;
  if (!segment || !topic) throw new Error("the Resend segment or topic id is not set");

  const name = `${source}-${lang}-${id}`;
  for (let after = null; ; ) {
    const page = await resend(apiKey, "GET", `/broadcasts?limit=100${after ? `&after=${after}` : ""}`);
    if (!page.ok) throw new Error(`listing broadcasts failed: ${page.status}`);
    const items = page.data?.data ?? [];
    if (items.some((item) => item.name === name)) {
      throw new Error(`a broadcast named ${name} already exists; not sending it twice`);
    }
    if (!page.data?.has_more || items.length === 0) break;
    after = items[items.length - 1].id;
  }

  const created = await resend(apiKey, "POST", "/broadcasts", {
    name,
    segment_id: segment,
    topic_id: topic,
    from: FROM,
    subject: post.title,
    preview_text: post.summary?.slice(0, 150) || undefined,
    html: message("{{{RESEND_UNSUBSCRIBE_URL}}}"),
    send: true,
  });
  if (!created.ok) throw new Error(`broadcast failed: ${created.status} ${JSON.stringify(created.data)}`);
  console.log(`broadcast ${name} sent: ${created.data?.id}`);
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  main().catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
}
