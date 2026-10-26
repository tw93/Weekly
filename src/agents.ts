// Shared data layer for the machine-readable surfaces: markdown twins
// (/posts/274.md), the read-only JSON API, the JSON-LD feed and llms.txt.
// Everything here is derived from the Markdown posts, so the agent surfaces
// never drift from the published site.
import { SITE } from "./config";
import { parseIssueItems } from "./issueItems.js";

export type Lang = "zh" | "en";

const zhModules = import.meta.glob("./pages/posts/*.md", {
  eager: true,
}) as Record<string, any>;
const enModules = import.meta.glob("./pages/en/posts/*.md", {
  eager: true,
}) as Record<string, any>;

const zhSource = import.meta.glob("./pages/posts/*.md", {
  query: "?raw",
  import: "default",
}) as Record<string, () => Promise<string>>;
const enSource = import.meta.glob("./pages/en/posts/*.md", {
  query: "?raw",
  import: "default",
}) as Record<string, () => Promise<string>>;

export interface Issue {
  num: number;
  slug: string;
  name: string;
  title: string;
  description: string;
  date: string;
  image?: string;
  lang: Lang;
  path: string;
  mdPath: string;
  jsonPath: string;
  url: string;
  mdUrl: string;
  jsonUrl: string;
}

const modulesFor = (lang: Lang) => (lang === "en" ? enModules : zhModules);
const sourceFor = (lang: Lang) => (lang === "en" ? enSource : zhSource);

const fileName = (filePath: string) => filePath.split("/").pop() ?? "";

export const issueTitle = (lang: Lang, num: number, name: string) =>
  lang === "en"
    ? `${num}. ${name.replace(/-/g, " ")}`.trim()
    : `第 ${num} 期 - ${name}`;

const toIssue = (lang: Lang, filePath: string, module: any): Issue | null => {
  const slug = fileName(filePath).replace(/\.md$/, "");
  const [numberPart, ...nameParts] = slug.split("-");
  const num = Number.parseInt(numberPart, 10);
  if (Number.isNaN(num)) return null;

  const name = nameParts.join("-");
  const prefix = lang === "en" ? "/en" : "";
  const path = `${prefix}/posts/${num}`;
  const mdPath = `${path}.md`;
  const jsonPath =
    lang === "en" ? `/api/en/posts/${num}.json` : `/api/posts/${num}.json`;

  return {
    num,
    slug,
    name,
    title: issueTitle(lang, num, name),
    description: module?.frontmatter?.description ?? "",
    date: module?.frontmatter?.date ?? "",
    image: module?.frontmatter?.image,
    lang,
    path,
    mdPath,
    jsonPath,
    url: `${SITE.homePage}${path}`,
    mdUrl: `${SITE.homePage}${mdPath}`,
    jsonUrl: `${SITE.homePage}${jsonPath}`,
  };
};

export const getIssues = (lang: Lang): Issue[] =>
  Object.entries(modulesFor(lang))
    .map(([filePath, module]) => toIssue(lang, filePath, module))
    .filter((issue): issue is Issue => issue !== null)
    .sort((a, b) => b.num - a.num);

export const getIssue = (lang: Lang, num: number): Issue | undefined =>
  getIssues(lang).find((issue) => issue.num === num);

const stripFrontmatter = (raw: string) =>
  raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, "").trim();

/** Raw Markdown body of an issue, frontmatter removed. */
export const getIssueBody = async (
  lang: Lang,
  num: number,
): Promise<string | null> => {
  const source = sourceFor(lang);
  const entry = Object.entries(source).find(
    ([filePath]) =>
      Number.parseInt(fileName(filePath).split("-")[0], 10) === num,
  );
  if (!entry) return null;
  return stripFrontmatter(await entry[1]());
};

export interface IssueItem {
  issue: number;
  date: string;
  language: "zh-Hans" | "en";
  section: string | null;
  title: string;
  url: string | null;
  note: string;
  issueUrl: string;
  markdownUrl: string;
}

const parsedItems = async (lang: Lang, num: number) => {
  const body = await getIssueBody(lang, num);
  return body === null ? [] : parseIssueItems(body);
};

/**
 * Every recommended item across the archive, newest issue first, for
 * /api/items.jsonl and /items/{year}.md. Some English translations dropped
 * the `<url>` line of an item, so when both languages split into the same
 * number of items the English item borrows the Chinese link at that position.
 */
export const getIssueItems = async (lang: Lang): Promise<IssueItem[]> => {
  const records: IssueItem[] = [];
  for (const issue of getIssues(lang)) {
    const items = await parsedItems(lang, issue.num);
    const original =
      lang === "en" && items.some((item) => !item.url)
        ? await parsedItems("zh", issue.num)
        : null;
    const aligned = original?.length === items.length ? original : null;

    items.forEach((item, index) => {
      records.push({
        issue: issue.num,
        date: issue.date,
        language: lang === "en" ? "en" : "zh-Hans",
        section: item.section,
        title: item.title,
        url: item.url ?? aligned?.[index]?.url ?? null,
        note: item.note,
        issueUrl: issue.url,
        markdownUrl: issue.mdUrl,
      });
    });
  }
  return records;
};

export const issueYears = (lang: Lang) =>
  [...new Set(getIssues(lang).map((issue) => issue.date.slice(0, 4)))].sort(
    (a, b) => b.localeCompare(a),
  );

/** One year of items as Markdown, grouped by issue, for /items/{year}.md. */
export const renderItemsMarkdown = (
  lang: Lang,
  year: string,
  items: IssueItem[],
) => {
  const isEn = lang === "en";
  const prefix = isEn ? "/en" : "";
  const inYear = items.filter((item) => item.date.startsWith(year));
  const years = issueYears(lang);
  const lines = [
    isEn
      ? `# Weekly (潮流周刊) items, ${year}`
      : `# 潮流周刊 ${year} 年推荐条目`,
    "",
    isEn
      ? `> ${inYear.length} items Tw93 recommended or wrote in ${year}, newest issue first. Each item keeps its section, outbound link and Tw93's note.`
      : `> ${year} 年周刊里推荐和写下的 ${inYear.length} 个条目，按期倒序，每条保留所在栏目、原始链接和 Tw93 的点评。`,
    "",
    `- ${isEn ? "All years" : "全部年份"}: ${years
      .map((y) => `${SITE.homePage}${prefix}/items/${y}.md`)
      .join(" ")}`,
    `- ${isEn ? "Whole archive as JSON Lines" : "全部条目 JSON Lines"}: ${SITE.homePage}${isEn ? "/api/en" : "/api"}/items.jsonl`,
  ];

  let currentIssue: number | null = null;
  for (const item of inYear) {
    if (item.issue !== currentIssue) {
      currentIssue = item.issue;
      const issue = getIssue(lang, item.issue);
      lines.push(
        "",
        `## ${issue?.title ?? item.issue} (${item.date})`,
        "",
        `${item.issueUrl} / ${item.markdownUrl}`,
        "",
      );
    }
    const title = item.url ? `[${item.title}](${item.url})` : item.title;
    const section = item.section ? ` (${item.section})` : "";
    lines.push(`- ${title}${section}${item.note ? `: ${item.note}` : ""}`);
  }

  lines.push("");
  return lines.join("\n");
};

/** Compact issue record used by /api/posts.json and the JSON-LD feed. */
export const issueSummary = (issue: Issue, counterpart?: Issue) => ({
  issue: issue.num,
  title: issue.title,
  name: issue.name,
  language: issue.lang === "en" ? "en" : "zh-Hans",
  date: issue.date,
  description: issue.description,
  coverImage: issue.image ?? null,
  url: issue.url,
  markdownUrl: issue.mdUrl,
  jsonUrl: issue.jsonUrl,
  translation: counterpart
    ? {
        language: counterpart.lang === "en" ? "en" : "zh-Hans",
        title: counterpart.title,
        url: counterpart.url,
        markdownUrl: counterpart.mdUrl,
        jsonUrl: counterpart.jsonUrl,
      }
    : null,
});

/** Full issue record used by /api/posts/{issue}.json. */
export const issueDetail = async (lang: Lang, num: number) => {
  const issues = getIssues(lang);
  const index = issues.findIndex((issue) => issue.num === num);
  if (index === -1) return null;

  const issue = issues[index];
  const body = await getIssueBody(lang, num);
  if (body === null) return null;

  const newer = issues[index - 1];
  const older = issues[index + 1];
  const neighbour = (item?: Issue) =>
    item ? { issue: item.num, title: item.title, url: item.url } : null;

  return {
    ...issueSummary(issue, getIssue(lang === "en" ? "zh" : "en", num)),
    contentMarkdown: body,
    contentFormat: "markdown",
    source: `https://github.com/${SITE.repo}/blob/main/src/pages/${
      lang === "en" ? "en/" : ""
    }posts/${encodeURIComponent(issue.slug)}.md`,
    newerIssue: neighbour(newer),
    olderIssue: neighbour(older),
  };
};

export const MARKDOWN_HEADERS = {
  "Content-Type": "text/markdown; charset=utf-8",
  "Access-Control-Allow-Origin": "*",
};

export const JSON_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Access-Control-Allow-Origin": "*",
};

export const jsonResponse = (data: unknown) =>
  new Response(JSON.stringify(data, null, 2), { headers: JSON_HEADERS });

export const textResponse = (
  body: string,
  contentType = "text/markdown; charset=utf-8",
) =>
  new Response(body, {
    headers: {
      "Content-Type": contentType,
      "Access-Control-Allow-Origin": "*",
    },
  });

const label = (lang: Lang) => ({
  siteTitle: lang === "en" ? "Weekly (潮流周刊)" : "潮流周刊 (Tw93 Weekly)",
  tagline:
    lang === "en"
      ? "Recording engineer Tw93's interesting life, published every Monday."
      : "记录工程师 Tw93 的不枯燥生活，每周一发布。",
  issues: lang === "en" ? "Issues" : "全部期刊",
  published: lang === "en" ? "Published" : "发布日期",
});

/** Canonical markdown view of a single issue. */
export const renderIssueMarkdown = (issue: Issue, body: string) => {
  const other =
    issue.lang === "en"
      ? `- Chinese original: ${SITE.homePage}/posts/${issue.num}.md`
      : `- English translation: ${SITE.homePage}/en/posts/${issue.num}.md`;

  return [
    `# ${issue.title}`,
    "",
    issue.description ? `> ${issue.description}` : null,
    issue.description ? "" : null,
    `- Issue: ${issue.num}`,
    `- ${label(issue.lang).published}: ${issue.date}`,
    `- HTML: ${issue.url}`,
    `- JSON: ${issue.jsonUrl}`,
    other,
    "",
    "---",
    "",
    body,
    "",
  ]
    .filter((line) => line !== null)
    .join("\n");
};

/** Canonical markdown view of a site root (/index.md, /en/index.md). */
export const renderIndexMarkdown = (lang: Lang) => {
  const issues = getIssues(lang);
  const l = label(lang);
  const prefix = lang === "en" ? "/en" : "";
  const isEn = lang === "en";

  const lines = [
    `# ${l.siteTitle}`,
    "",
    `> ${l.tagline}`,
    "",
    isEn
      ? `A Chinese-language weekly newsletter about tools, engineering, design and life, written by Tw93 and translated into English. ${issues.length} issues published since November 2020, every Monday.`
      : `每周一发布的中文周刊，记录一周里看到的工具、工程、设计和生活，作者 Tw93。自 2020 年 11 月起已发布 ${issues.length} 期。`,
    "",
    `## ${isEn ? "Site map" : "站点地图"}`,
    "",
    `- HTML home: ${SITE.homePage}${prefix}`,
    `- ${isEn ? "Chinese home (markdown)" : "英文站 (markdown)"}: ${SITE.homePage}${isEn ? "/index.md" : "/en/index.md"}`,
    `- Agent guide: ${SITE.homePage}/llms.md`,
    `- Agent index: ${SITE.homePage}/llms.txt`,
    `- JSON API: ${SITE.homePage}/api/index.json`,
    `- ${isEn ? "Every item, for searching" : "全部条目，用于跨期查找"}: ${SITE.homePage}${isEn ? "/api/en" : "/api"}/items.jsonl, ${SITE.homePage}${prefix}/items/{year}.md`,
    `- OpenAPI: ${SITE.homePage}/openapi.json`,
    `- RSS: ${SITE.homePage}${isEn ? "/en/rss.xml" : "/rss.xml"}`,
    `- About: ${SITE.homePage}${prefix}/about`,
    `- Source: https://github.com/${SITE.repo}`,
    "",
    `## ${isEn ? "How to read an issue" : "如何读取单期内容"}`,
    "",
    isEn
      ? "Every issue is available as HTML, Markdown and JSON. Append `.md` to any issue URL to get the Markdown source:"
      : "每期内容都有 HTML、Markdown、JSON 三种形式。在任意期刊地址后加 `.md` 即可拿到 Markdown 原文：",
    "",
    "```",
    `${SITE.homePage}${prefix}/posts/${issues[0]?.num ?? 1}      # HTML`,
    `${SITE.homePage}${prefix}/posts/${issues[0]?.num ?? 1}.md   # Markdown`,
    `${SITE.homePage}${isEn ? "/api/en" : "/api"}/posts/${issues[0]?.num ?? 1}.json # JSON`,
    "```",
    "",
    `## ${l.issues} (${issues.length})`,
    "",
  ];

  for (const issue of issues) {
    lines.push(
      `- [${issue.title}](${issue.url}) - ${issue.date} - ${issue.mdUrl}`,
    );
  }

  lines.push("");
  return lines.join("\n");
};
