import { getIssues, jsonResponse } from "@/agents";
import { SITE } from "@/config";

const issueParam = {
  name: "issue",
  in: "path",
  required: true,
  description:
    "Issue number, stable across languages. 274 means the 274th weekly issue.",
  schema: { type: "integer", minimum: 1 },
};

const yearParam = {
  name: "year",
  in: "path",
  required: true,
  description: "Calendar year of the issues, from 2020.",
  schema: { type: "integer", minimum: 2020 },
};

const markdownResponse = (description: string) => ({
  "200": {
    description,
    content: {
      "text/markdown": { schema: { type: "string" } },
    },
  },
  "404": { description: "No issue with that number." },
});

export const GET = () => {
  const issues = getIssues("zh");
  const latest = issues[0]?.num ?? 1;

  return jsonResponse({
    openapi: "3.1.0",
    info: {
      title: "潮流周刊 (Tw93 Weekly) content API",
      summary:
        "Read-only access to every issue of the 潮流周刊 weekly newsletter.",
      description:
        "潮流周刊 (Tw93 Weekly) is a Chinese-language weekly newsletter of developer tools, engineering notes, design and life, written by Tw93 and translated into English. This API exposes the archive as JSON and Markdown. Every endpoint is a public prerendered static file: no authentication, no rate limit, no write operations, CORS open to all origins.",
      version: "1.0.0",
      contact: {
        name: "Tw93",
        url: SITE.homePage,
        email: "tw93@qq.com",
      },
      license: {
        name: "MIT (site code)",
        url: `https://github.com/${SITE.repo}/blob/main/LICENSE`,
      },
      termsOfService: `${SITE.homePage}/about`,
    },
    externalDocs: {
      description: "Agent guide: when to use this site and how to call it",
      url: `${SITE.homePage}/llms.md`,
    },
    servers: [{ url: SITE.homePage, description: "Production (static CDN)" }],
    security: [],
    tags: [
      { name: "index", description: "Service description and issue listings" },
      {
        name: "issues",
        description: "Single weekly issue in JSON or Markdown",
      },
      { name: "feeds", description: "Bulk and syndication formats" },
    ],
    paths: {
      "/api/index.json": {
        get: {
          operationId: "getApiIndex",
          tags: ["index"],
          summary: "Service description",
          description:
            "Endpoint list, issue counts, content model, licensing and contact details for the archive.",
          responses: {
            "200": {
              description: "Service description document.",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ApiIndex" },
                },
              },
            },
          },
        },
      },
      "/api/posts.json": {
        get: {
          operationId: "listIssues",
          tags: ["index"],
          summary: "List every issue, newest first",
          description:
            "The complete archive index with title, publication date, one-line description, cover image and per-issue URLs, including the matching English translation when one exists.",
          responses: {
            "200": {
              description: "Issue index.",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/IssueIndex" },
                },
              },
            },
          },
        },
      },
      "/api/posts/{issue}.json": {
        get: {
          operationId: "getIssue",
          tags: ["issues"],
          summary: "Get one Chinese issue with its Markdown body",
          description:
            "Metadata plus the full Markdown source of a single Chinese issue, with links to the English translation and the neighbouring issues.",
          parameters: [issueParam],
          responses: {
            "200": {
              description: "Issue with content.",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/IssueDetail" },
                },
              },
            },
            "404": {
              description: "No issue with that number.",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" },
                },
              },
            },
          },
        },
      },
      "/api/en/posts/{issue}.json": {
        get: {
          operationId: "getIssueEnglish",
          tags: ["issues"],
          summary: "Get the English translation of one issue",
          description:
            "Same shape as getIssue, returning the English translation of the issue with that number.",
          parameters: [issueParam],
          responses: {
            "200": {
              description: "Issue with content.",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/IssueDetail" },
                },
              },
            },
            "404": {
              description: "No English issue with that number.",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Error" },
                },
              },
            },
          },
        },
      },
      "/posts/{issue}.md": {
        get: {
          operationId: "getIssueMarkdown",
          tags: ["issues"],
          summary: "Get one Chinese issue as Markdown",
          description:
            "The Markdown twin of the HTML issue page, headed by the issue title and its canonical links.",
          parameters: [issueParam],
          responses: markdownResponse("Issue as Markdown."),
        },
      },
      "/en/posts/{issue}.md": {
        get: {
          operationId: "getIssueMarkdownEnglish",
          tags: ["issues"],
          summary: "Get one English issue as Markdown",
          parameters: [issueParam],
          responses: markdownResponse("Issue as Markdown."),
        },
      },
      "/index.md": {
        get: {
          operationId: "getSiteMarkdown",
          tags: ["index"],
          summary: "Site root as Markdown",
          description:
            "Site description, endpoint map and a link to every issue.",
          responses: markdownResponse("Site root as Markdown."),
        },
      },
      "/en/index.md": {
        get: {
          operationId: "getSiteMarkdownEnglish",
          tags: ["index"],
          summary: "English site root as Markdown",
          responses: markdownResponse("English site root as Markdown."),
        },
      },
      "/llms.md": {
        get: {
          operationId: "getAgentGuide",
          tags: ["index"],
          summary: "Agent guide",
          description:
            "When to use this site, how to call it, content model, limits and attribution rules.",
          responses: markdownResponse("Agent guide as Markdown."),
        },
      },
      "/api/items.jsonl": {
        get: {
          operationId: "listItems",
          tags: ["feeds"],
          summary: "Every recommended item across all Chinese issues",
          description:
            "Newline-delimited JSON, one IssueItem per line, newest issue first: every tool, project, article and note the issues recommend, for searching the whole archive in one request. About 1.5MB; download once and filter locally.",
          responses: {
            "200": {
              description: "One IssueItem object per line.",
              content: {
                "application/x-ndjson": {
                  schema: { type: "string" },
                  "x-item-schema": { $ref: "#/components/schemas/IssueItem" },
                },
              },
            },
          },
        },
      },
      "/api/en/items.jsonl": {
        get: {
          operationId: "listItemsEnglish",
          tags: ["feeds"],
          summary: "Every recommended item across all English issues",
          responses: {
            "200": {
              description: "One IssueItem object per line.",
              content: {
                "application/x-ndjson": {
                  schema: { type: "string" },
                  "x-item-schema": { $ref: "#/components/schemas/IssueItem" },
                },
              },
            },
          },
        },
      },
      "/items/{year}.md": {
        get: {
          operationId: "getYearItemsMarkdown",
          tags: ["feeds"],
          summary: "One year of Chinese items as Markdown",
          description:
            "The same items as /api/items.jsonl for one calendar year, grouped by issue, sized for agents that can only fetch a page at a time.",
          parameters: [yearParam],
          responses: markdownResponse("Items of that year as Markdown."),
        },
      },
      "/en/items/{year}.md": {
        get: {
          operationId: "getYearItemsMarkdownEnglish",
          tags: ["feeds"],
          summary: "One year of English items as Markdown",
          parameters: [yearParam],
          responses: markdownResponse("Items of that year as Markdown."),
        },
      },
      "/feeds/posts.jsonl": {
        get: {
          operationId: "getIssueFeed",
          tags: ["feeds"],
          summary: "JSON-LD feed of every issue",
          description:
            "Newline-delimited JSON: one schema.org BlogPosting object per issue, newest first.",
          responses: {
            "200": {
              description: "Newline-delimited JSON-LD.",
              content: {
                "application/x-ndjson": { schema: { type: "string" } },
              },
            },
          },
        },
      },
      "/rss.xml": {
        get: {
          operationId: "getRssFeed",
          tags: ["feeds"],
          summary: "RSS feed of recent Chinese issues",
          responses: {
            "200": {
              description: "RSS 2.0 feed.",
              content: {
                "application/rss+xml": { schema: { type: "string" } },
              },
            },
          },
        },
      },
    },
    components: {
      schemas: {
        Translation: {
          type: "object",
          description: "The same issue in the other language.",
          properties: {
            language: { type: "string", enum: ["zh-Hans", "en"] },
            title: { type: "string" },
            url: { type: "string", format: "uri" },
            markdownUrl: { type: "string", format: "uri" },
            jsonUrl: { type: "string", format: "uri" },
          },
        },
        IssueSummary: {
          type: "object",
          required: ["issue", "title", "date", "url", "markdownUrl"],
          properties: {
            issue: {
              type: "integer",
              description: "Issue number.",
              examples: [latest],
            },
            title: {
              type: "string",
              description: "Display title, e.g. 第 274 期 - 海阔天空.",
            },
            name: {
              type: "string",
              description: "Title without the issue number.",
            },
            language: { type: "string", enum: ["zh-Hans", "en"] },
            date: {
              type: "string",
              description: "Publication date, YYYY/MM/DD.",
              examples: ["2026/07/20"],
            },
            description: {
              type: "string",
              description: "One-line summary of the issue.",
            },
            coverImage: { type: ["string", "null"], format: "uri" },
            url: {
              type: "string",
              format: "uri",
              description: "Canonical HTML page.",
            },
            markdownUrl: { type: "string", format: "uri" },
            jsonUrl: { type: "string", format: "uri" },
            translation: {
              anyOf: [
                { $ref: "#/components/schemas/Translation" },
                { type: "null" },
              ],
            },
          },
        },
        IssueDetail: {
          allOf: [
            { $ref: "#/components/schemas/IssueSummary" },
            {
              type: "object",
              required: ["contentMarkdown"],
              properties: {
                contentMarkdown: {
                  type: "string",
                  description:
                    "Full Markdown source of the issue, frontmatter removed.",
                },
                contentFormat: { type: "string", const: "markdown" },
                source: {
                  type: "string",
                  format: "uri",
                  description: "File on GitHub.",
                },
                newerIssue: {
                  anyOf: [
                    { $ref: "#/components/schemas/IssueRef" },
                    { type: "null" },
                  ],
                },
                olderIssue: {
                  anyOf: [
                    { $ref: "#/components/schemas/IssueRef" },
                    { type: "null" },
                  ],
                },
              },
            },
          ],
        },
        IssueRef: {
          type: "object",
          properties: {
            issue: { type: "integer" },
            title: { type: "string" },
            url: { type: "string", format: "uri" },
          },
        },
        IssueIndex: {
          type: "object",
          required: ["count", "issues"],
          properties: {
            site: { type: "string", format: "uri" },
            name: { type: "string" },
            description: { type: "string" },
            count: {
              type: "integer",
              description: "Number of Chinese issues.",
            },
            englishCount: { type: "integer" },
            latestIssue: { type: "integer" },
            issues: {
              type: "array",
              items: { $ref: "#/components/schemas/IssueSummary" },
            },
          },
        },
        ApiIndex: {
          type: "object",
          properties: {
            name: { type: "string" },
            description: { type: "string" },
            version: { type: "string" },
            auth: {
              type: "object",
              description: "Always unauthenticated.",
              properties: {
                required: { type: "boolean", const: false },
                scheme: { type: ["string", "null"] },
                note: { type: "string" },
              },
            },
            counts: {
              type: "object",
              additionalProperties: { type: ["integer", "null"] },
            },
            endpoints: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  method: { type: "string" },
                  path: { type: "string" },
                  description: { type: "string" },
                  example: { type: "string", format: "uri" },
                },
              },
            },
          },
        },
        IssueItem: {
          type: "object",
          required: [
            "issue",
            "date",
            "language",
            "title",
            "url",
            "note",
            "issueUrl",
            "markdownUrl",
          ],
          properties: {
            issue: { type: "integer" },
            date: { type: "string", examples: ["2026/10/26"] },
            language: { type: "string", enum: ["zh-Hans", "en"] },
            section: {
              type: ["string", "null"],
              description: "Heading the item sits under, such as 潮流工具.",
            },
            title: { type: "string" },
            url: {
              type: ["string", "null"],
              format: "uri",
              description:
                "Link to the tool or article; null for Tw93's own notes.",
            },
            note: {
              type: "string",
              description: "Tw93's comment on the item, as plain text.",
            },
            issueUrl: { type: "string", format: "uri" },
            markdownUrl: { type: "string", format: "uri" },
          },
        },
        Error: {
          type: "object",
          required: ["error"],
          properties: {
            error: {
              type: "object",
              required: ["code", "message"],
              properties: {
                code: { type: "string", examples: ["issue_not_found"] },
                message: { type: "string" },
                hint: {
                  type: "string",
                  description: "How to recover from the error.",
                },
              },
            },
          },
        },
      },
    },
  });
};
