// Rendered on the About page and mirrored into FAQPage JSON-LD from the same
// source, so the structured data never claims answers the page does not show.
export const FAQ: Record<"zh" | "en", { q: string; a: string }[]> = {
  zh: [
    {
      q: "潮流周刊多久更新一期？",
      a: "每周一发布一期，自 2020 年 11 月起连续更新，期号从 1 开始不重排、不复用。",
    },
    {
      q: "有英文版吗？",
      a: "有。每一期中文原文都有对应的英文翻译，两边用同一个期号对应，中文在 /posts/{期号}，英文在 /en/posts/{期号}。",
    },
    {
      q: "怎么订阅？",
      a: "订阅 RSS（/rss.xml 或 /en/rss.xml，含全文），或者在任意一期末尾填邮箱，点确认信里的按钮后，新一期会发到邮箱，也可以在 GitHub 上 Star 与 Watch tw93/weekly 仓库。周刊不需要注册账号。",
    },
    {
      q: "可以引用周刊里的内容吗？",
      a: "可以。注明出处为潮流周刊并保留原期链接即可，图片请不要直接外链。站点代码以 MIT 协议开源，内容版权归作者所有。",
    },
    {
      q: "有 API 吗？需要密钥吗？",
      a: "有只读 JSON API 与 Markdown 端点：/api/posts.json 是全部期刊索引，/api/posts/{期号}.json 含单期全文，任意期刊地址后加 .md 即为 Markdown 原文。全部是公开静态文件，不需要密钥，唯一接收提交的是给读者用的邮件订阅接口 /api/subscribe。",
    },
    {
      q: "想推荐一个工具或项目，怎么提交？",
      a: "发在 GitHub Discussions 的推荐帖（github.com/tw93/weekly/discussions/22），被收录会在当期注明。",
    },
  ],
  en: [
    {
      q: "How often is Weekly published?",
      a: "One issue every Monday, continuously since November 2020. Issue numbers start at 1 and are never reordered or reused.",
    },
    {
      q: "Is there an English version?",
      a: "Yes. Every Chinese issue has an English translation matched by issue number: Chinese at /posts/{number}, English at /en/posts/{number}.",
    },
    {
      q: "How do I subscribe?",
      a: "Subscribe to RSS at /rss.xml or /en/rss.xml (both carry the full text), leave your email at the end of any issue and confirm it to get each new issue by email, or star and watch the tw93/weekly repository on GitHub. There is no account to create.",
    },
    {
      q: "Can I quote the content?",
      a: "Yes. Attribute the material to 潮流周刊 / Tw93 Weekly and keep a link to the original issue, and please do not hotlink the images. The site code is MIT licensed; the written content remains the author's copyright.",
    },
    {
      q: "Is there an API, and does it need a key?",
      a: "Yes, read-only: /api/posts.json is the full issue index, /api/posts/{number}.json returns one issue with its Markdown body, and appending .md to any issue URL returns the Markdown source. Everything is a public static file, so there is no key; the only endpoint that accepts a submission is the reader email signup at /api/subscribe.",
    },
    {
      q: "How do I suggest a tool or project?",
      a: "Post it in the suggestions thread on GitHub Discussions (github.com/tw93/weekly/discussions/22). Accepted suggestions are credited in the issue.",
    },
  ],
};
