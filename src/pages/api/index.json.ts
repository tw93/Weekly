import { getIssues, jsonResponse } from "@/agents";
import { SITE } from "@/config";

const site = SITE.homePage;

export const GET = () => {
  const zhIssues = getIssues("zh");
  const enIssues = getIssues("en");
  const latest = zhIssues[0]?.num ?? 1;

  return jsonResponse({
    name: "潮流周刊 (Tw93 Weekly) content API",
    description:
      "Read-only static JSON API over the 潮流周刊 archive: weekly issues of developer tools, engineering notes, design and life, in Chinese with English translations.",
    version: "1.0.0",
    site,
    documentation: `${site}/llms.md`,
    openapi: `${site}/openapi.json`,
    agentIndex: `${site}/llms.txt`,
    apiCatalog: `${site}/.well-known/api-catalog`,
    auth: {
      required: false,
      scheme: null,
      note: "All endpoints are public prerendered files. There are no API keys, no OAuth flows, no sandbox and no write operations.",
    },
    cors: "*",
    counts: {
      chineseIssues: zhIssues.length,
      englishIssues: enIssues.length,
      latestIssue: latest,
      firstIssue: zhIssues[zhIssues.length - 1]?.num ?? null,
    },
    contentModel: {
      identifier: "issue number, stable across languages and never reused",
      cadence: "one issue every Monday",
      languages: ["zh-Hans", "en"],
      sections: [
        "潮流工具 / Trending Tools",
        "潮流开源 / Trending Open Source",
        "潮流文章 / Trending Articles",
        "潮流软件 / Trending Apps",
        "潮流分享 / Notes",
      ],
    },
    endpoints: [
      {
        method: "GET",
        path: "/api/index.json",
        description: "This document: endpoint list, counts and content model.",
      },
      {
        method: "GET",
        path: "/api/posts.json",
        description:
          "All issues, newest first, with title, date, description, cover image and per-issue URLs.",
      },
      {
        method: "GET",
        path: "/api/posts/{issue}.json",
        description:
          "One Chinese issue: metadata plus the full Markdown body and neighbour links.",
        example: `${site}/api/posts/${latest}.json`,
      },
      {
        method: "GET",
        path: "/api/en/posts/{issue}.json",
        description: "English translation of one issue, same shape.",
        example: `${site}/api/en/posts/${latest}.json`,
      },
      {
        method: "GET",
        path: "/api/items.jsonl",
        description:
          "Every recommended item across all Chinese issues, one JSON object per line with issue, section, title, url and Tw93's note. About 1.5MB, for searching the whole archive.",
        example: `${site}/api/items.jsonl`,
      },
      {
        method: "GET",
        path: "/api/en/items.jsonl",
        description: "The same for the English issues.",
      },
      {
        method: "GET",
        path: "/items/{year}.md",
        description:
          "One year of items as Markdown, grouped by issue, for agents that cannot download the full file. English: /en/items/{year}.md.",
        example: `${site}/items/${zhIssues[0]?.date.slice(0, 4) ?? "2020"}.md`,
      },
      {
        method: "GET",
        path: "/posts/{issue}.md",
        description: "Chinese issue as Markdown (text/markdown).",
        example: `${site}/posts/${latest}.md`,
      },
      {
        method: "GET",
        path: "/en/posts/{issue}.md",
        description: "English issue as Markdown (text/markdown).",
        example: `${site}/en/posts/${latest}.md`,
      },
      {
        method: "GET",
        path: "/index.md",
        description: "Site root as Markdown, every issue listed as a link.",
      },
      {
        method: "GET",
        path: "/feeds/posts.jsonl",
        description: "One schema.org BlogPosting JSON-LD object per line.",
      },
      {
        method: "GET",
        path: "/rss.xml",
        description: "RSS feed with the full HTML of recent issues.",
      },
    ],
    license: {
      content:
        "Free to read, quote and summarise with attribution to 潮流周刊 / Tw93 Weekly and a link to the issue URL.",
      code: "MIT",
      repository: `https://github.com/${SITE.repo}`,
    },
    contact: {
      author: "Tw93",
      email: "tw93@qq.com",
      github: `https://github.com/${SITE.githubId}`,
      x: `https://x.com/${SITE.twitterId}`,
      issues: `https://github.com/${SITE.repo}/issues`,
    },
  });
};
