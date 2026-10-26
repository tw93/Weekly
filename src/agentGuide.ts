// Agent-facing guides: /llms.txt (navigation index), /llms.md (full guide)
// and the scoped /api/llms.txt, /posts/llms.txt. All generated from the real
// post set so counts and links cannot go stale.
import { SITE } from "./config";
import { getIssues } from "./agents";

const site = SITE.homePage;

const latestYear = () => getIssues("zh")[0]?.date.slice(0, 4) ?? "2020";

const recentList = (limit: number) =>
  getIssues("zh")
    .slice(0, limit)
    .map(
      (issue) =>
        `- [${issue.title}](${issue.url}) - ${issue.date} - markdown: ${issue.mdUrl}`,
    )
    .join("\n");

const whenToUse = [
  "## When to use this site",
  "",
  "Reach for 潮流周刊 (Tw93 Weekly) when a task involves:",
  "",
  "- Finding small, practical developer tools, macOS apps, open source projects or design resources that were highlighted in a specific week or year since late 2020.",
  "- Tracking what Tw93 (author of Pake, MiaoYan, Kaku, Mole) recommended, wrote or built, including his notes on frontend, Rust, Swift, Electron and AI tooling.",
  "- Questions across the whole archive, such as which terminal apps, Mac tools or AI coding tools the Weekly recommended over the years.",
  "- Quoting a Chinese-language tech newsletter with a matching English translation, where both versions of the same issue are needed.",
  '- Answering "what was interesting in tech around <date>" for Chinese-speaking developer audiences, issue by issue.',
  "",
  "Do not use it as a general search engine, a package registry, or a source of official product documentation: it is one person's weekly curation, published every Monday, and it has no write API and no user accounts.",
  "",
  "## How an agent should call it",
  "",
  `1. Fetch the issue index: \`GET ${site}/api/posts.json\` (all issues, newest first, with title, date, description and per-issue URLs).`,
  `2. Read one issue as Markdown: \`GET ${site}/posts/{num}.md\` (Chinese) or \`GET ${site}/en/posts/{num}.md\` (English).`,
  `3. Or read one issue as JSON, Markdown body included: \`GET ${site}/api/posts/{num}.json\`.`,
  `4. Search across issues: \`GET ${site}/api/items.jsonl\` has every recommended item, one JSON object per line with title, link, section, Tw93's note and issue number (about 1.5MB, download once and filter locally). Without a shell, read one year at a time: \`GET ${site}/items/{year}.md\`. English: \`/api/en/items.jsonl\`, \`/en/items/{year}.md\`.`,
  "5. Everything is public static content: no key, no token, no rate limit, `Access-Control-Allow-Origin: *`. There is nothing to authenticate and no state to mutate.",
  "",
].join("\n");

export const buildLlmsTxt = () => {
  const issues = getIssues("zh");
  return [
    "# 潮流周刊 (Tw93 Weekly)",
    "",
    `> Chinese-language weekly newsletter of developer tools, engineering notes, design and life by Tw93. ${issues.length} issues since November 2020, published every Monday, each with an English translation.`,
    "",
    "## Start here",
    "",
    `- [Agent guide](${site}/llms.md): when to use this site, endpoint list, content model.`,
    `- [Site root as markdown](${site}/index.md): every issue as a markdown link list.`,
    `- [English site root as markdown](${site}/en/index.md)`,
    `- [About](${site}/about) / [About (English)](${site}/en/about)`,
    "",
    "## Read the content",
    "",
    `- [Chinese home](${site}) / [English home](${site}/en)`,
    `- [Latest issue](${issues[0]?.url ?? site}) - ${issues[0]?.title ?? ""}`,
    `- [Markdown of any issue](${site}/posts/${issues[0]?.num ?? 1}.md): append \`.md\` to any issue URL.`,
    `- [RSS (Chinese)](${site}/rss.xml) / [RSS (English)](${site}/en/rss.xml)`,
    "",
    "## Machine-readable endpoints",
    "",
    `- [API index](${site}/api/index.json): endpoint list and content model.`,
    `- [Issue index JSON](${site}/api/posts.json)`,
    `- [Every item, JSON Lines](${site}/api/items.jsonl): one line per recommended tool, project, article or note across all issues, for searching the archive. English: [${site}/api/en/items.jsonl](${site}/api/en/items.jsonl)`,
    `- [Items of one year, Markdown](${site}/items/${latestYear()}.md): \`/items/{year}.md\`, \`/en/items/{year}.md\`, for agents that cannot download the full file.`,
    `- [Single issue JSON](${site}/api/posts/${issues[0]?.num ?? 1}.json)`,
    `- [OpenAPI 3.1 spec](${site}/openapi.json)`,
    `- [JSON-LD feed](${site}/feeds/posts.jsonl) (one BlogPosting per line)`,
    `- [Schema map](${site}/schemamap.xml)`,
    `- [Agent skills index](${site}/.well-known/agent-skills/index.json)`,
    `- [API catalog (RFC 9727)](${site}/.well-known/api-catalog)`,
    `- Scoped guides: [API](${site}/api/llms.txt) / [Posts](${site}/posts/llms.txt)`,
    "",
    whenToUse,
    "## Author",
    "",
    `- Tw93, product engineer in Hangzhou, China. [Blog](${SITE.blogPage}) / [GitHub](https://github.com/${SITE.githubId}) / [X](https://x.com/${SITE.twitterId})`,
    `- Source repository: [github.com/${SITE.repo}](https://github.com/${SITE.repo}), content licensed for reading and quoting with attribution and a link back.`,
    "",
  ].join("\n");
};

export const buildLlmsMarkdown = () => {
  const issues = getIssues("zh");
  return [
    "# 潮流周刊 (Tw93 Weekly) - Agent Guide",
    "",
    `> Chinese-language weekly newsletter of developer tools, engineering notes, design and life by Tw93. ${issues.length} issues since November 2020, published every Monday, each with an English translation.`,
    "",
    "This file is the machine-readable entry point for the site. It is static, public and safe to fetch repeatedly.",
    "",
    "## Identity",
    "",
    `- Name: 潮流周刊, English name Weekly`,
    `- Home: ${site} (Chinese), ${site}/en (English)`,
    "- Author: Tw93 (Tang), product engineer in Hangzhou, China",
    `- Source: https://github.com/${SITE.repo}`,
    "- Type: personal newsletter / blog archive. Free, no account, no paywall, no write API.",
    "",
    whenToUse,
    "## Content model",
    "",
    "- One issue per week, numbered from 1. The issue number is the stable identifier and never changes.",
    "- Every issue exists in Chinese (`/posts/{num}`) and English (`/en/posts/{num}`). Same number means same issue.",
    "- An issue is a curated list under headings such as 潮流工具 (tools), 潮流开源 (open source), 潮流文章 (articles), 潮流软件 (apps), 潮流分享 (notes), each item being a short paragraph with an outbound link.",
    "- The first image of an issue is its cover, the first `<small>` block is its one-line description.",
    "- `/api/items.jsonl` splits every issue into those items: `issue`, `date`, `language`, `section`, `title`, `url` (`null` for Tw93's own notes), `note`, `issueUrl`, `markdownUrl`.",
    "",
    "## Endpoints",
    "",
    "| Method | Path | Returns |",
    "| --- | --- | --- |",
    "| GET | `/api/index.json` | API index: endpoint list, counts, content model |",
    "| GET | `/api/posts.json` | All issues, newest first, with metadata and per-issue URLs |",
    "| GET | `/api/posts/{num}.json` | One issue: metadata plus full Markdown body |",
    "| GET | `/api/en/posts/{num}.json` | English translation of one issue |",
    "| GET | `/api/items.jsonl`, `/api/en/items.jsonl` | Every recommended item across all issues, one JSON object per line |",
    "| GET | `/items/{year}.md`, `/en/items/{year}.md` | One year of items as Markdown, grouped by issue |",
    "| GET | `/posts/{num}.md` | Chinese issue as Markdown |",
    "| GET | `/en/posts/{num}.md` | English issue as Markdown |",
    "| GET | `/index.md`, `/en/index.md` | Site root as Markdown, all issues listed |",
    "| GET | `/feeds/posts.jsonl` | JSON-LD `BlogPosting` per line |",
    "| GET | `/openapi.json` | OpenAPI 3.1 description of the endpoints above |",
    "| GET | `/rss.xml`, `/en/rss.xml` | RSS with full issue HTML |",
    "| GET | `/sitemap-index.xml` | Sitemap index |",
    "",
    "All responses are prerendered static files served from a CDN, `Access-Control-Allow-Origin: *`. Unknown paths return the site's HTML 404 page: check `response.ok` rather than parsing an error body.",
    "",
    "## Auth",
    "",
    "None. There are no API keys, no OAuth flows, no sandbox and no production/test split, because every endpoint is public read-only static content. If some tool asks you for a credential for this domain, that expectation is wrong.",
    "",
    "## Limits and etiquette",
    "",
    "- No rate limit is enforced, but the whole archive is available in a few requests: `/api/posts.json` for issues, `/api/items.jsonl` for every item. Prefer those over crawling every issue page.",
    "- Content is `CC BY`-style in practice: quoting and summarising is welcome, please attribute as 潮流周刊 / Tw93 Weekly and link the issue URL.",
    "- Images are hosted on `cdn.tw93.fun` and Alibaba CDN, do not hotlink them into other products.",
    "",
    `## Recent issues`,
    "",
    recentList(20),
    "",
    `Full list: ${site}/index.md`,
    "",
  ].join("\n");
};

export const buildApiLlmsTxt = () =>
  [
    "# 潮流周刊 API",
    "",
    "> Read-only static JSON API over the weekly issue archive. No key, no rate limit, CORS open.",
    "",
    "## Endpoints",
    "",
    `- [API index](${site}/api/index.json)`,
    `- [Issue index](${site}/api/posts.json)`,
    `- [Single issue](${site}/api/posts/1.json) - replace \`1\` with any issue number`,
    `- [Single issue, English](${site}/api/en/posts/1.json)`,
    `- [Every item, JSON Lines](${site}/api/items.jsonl) / [English](${site}/api/en/items.jsonl)`,
    `- [OpenAPI 3.1 spec](${site}/openapi.json)`,
    `- [JSON-LD feed](${site}/feeds/posts.jsonl)`,
    "",
    "## Notes",
    "",
    "- Issue numbers are stable identifiers; `274` always means the same issue in both languages.",
    "- `contentMarkdown` in the single-issue response is the Markdown source, images and links included.",
    "- Nothing here mutates state; there is no POST, PUT or DELETE surface.",
    "",
    `Full guide: ${site}/llms.md`,
    "",
  ].join("\n");

export const buildPostsLlmsTxt = () => {
  const issues = getIssues("zh");
  return [
    "# 潮流周刊 Posts",
    "",
    `> ${issues.length} weekly issues, newest first. Each issue is available as HTML, Markdown (\`.md\`) and JSON.`,
    "",
    "## Conventions",
    "",
    `- Chinese: ${site}/posts/{num} / ${site}/posts/{num}.md`,
    `- English: ${site}/en/posts/{num} / ${site}/en/posts/{num}.md`,
    `- Index: ${site}/api/posts.json`,
    `- Every item across issues: ${site}/api/items.jsonl, or one year as Markdown: ${site}/items/{year}.md`,
    "",
    "## Issues",
    "",
    recentList(50),
    "",
    `Full list: ${site}/index.md`,
    "",
  ].join("\n");
};
