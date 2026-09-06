---
name: weekly-issues
description: Read issues of 潮流周刊 (Tw93 Weekly), a Chinese-language weekly newsletter of developer tools, open source projects, engineering notes and design, with English translations. Use when a task asks what a specific issue or week covered, which tools Tw93 recommended, or needs a bilingual quote from the archive.
homepage: https://weekly.tw93.fun
---

# 潮流周刊 (Tw93 Weekly)

潮流周刊 is a weekly newsletter written by Tw93, a product engineer in Hangzhou and the author of Pake, MiaoYan, Kaku and Mole. Each issue curates small practical developer tools, open source projects, articles, macOS apps and personal notes. Issues are published every Monday, numbered from 1, and every Chinese issue has an English translation under the same number.

Everything below is public static content: no API key, no token, no rate limit, `Access-Control-Allow-Origin: *`, and no write operations.

## When to use this

- A question names an issue number, or asks what a given week or month of 潮流周刊 covered.
- A task needs the tools, projects or articles Tw93 highlighted, with the original wording and outbound links.
- A quote is needed in both Chinese and English from the same paragraph of the same issue.

Do not use it as a general search engine or as official documentation for the products it mentions: it is one person's curation, and the products are third-party.

## Locate an issue

```
GET https://weekly.tw93.fun/api/posts.json
```

Returns every issue, newest first. This sample is generated from the current archive:

```json
{
  "count": 281,
  "englishCount": 281,
  "latestIssue": 281,
  "issues": [
    {
      "issue": 281,
      "title": "第 281 期 - 越王的剑",
      "name": "越王的剑",
      "language": "zh-Hans",
      "date": "2026/09/07",
      "description": "封面图拍摄于周末浙江博物馆，本来想去看四大兽首的展览，结果人很多，就去看常规的场馆了，发现了非常美的东西，这把越王勾践儿子的佩剑就非常好看，感叹当时的越国审美真好。",
      "coverImage": "https://cdn.fliggy.com/pic/28133.jpg",
      "url": "https://weekly.tw93.fun/posts/281",
      "markdownUrl": "https://weekly.tw93.fun/posts/281.md",
      "jsonUrl": "https://weekly.tw93.fun/api/posts/281.json",
      "translation": {
        "language": "en",
        "title": "281. Sword of the Yue King",
        "url": "https://weekly.tw93.fun/en/posts/281",
        "markdownUrl": "https://weekly.tw93.fun/en/posts/281.md",
        "jsonUrl": "https://weekly.tw93.fun/api/en/posts/281.json"
      }
    }
  ]
}
```

For a compact human-readable index of the whole archive, fetch `https://weekly.tw93.fun/index.md`.

## Read an issue

Append `.md` to any issue URL to get the Markdown source:

```
GET https://weekly.tw93.fun/posts/281.md      # Chinese
GET https://weekly.tw93.fun/en/posts/281.md   # English
```

Or take metadata and body together as JSON:

```
GET https://weekly.tw93.fun/api/posts/281.json
GET https://weekly.tw93.fun/api/en/posts/281.json
```

The JSON response carries `contentMarkdown` (the full Markdown body), `translation`, `newerIssue` and `olderIssue`.

## Bulk ingest

```
GET https://weekly.tw93.fun/feeds/posts.jsonl
```

One schema.org `BlogPosting` JSON-LD object per line, both languages. Prefer this plus `/api/posts.json` over crawling the HTML pages.

## Issue anatomy

- The first image is the cover, the first `<small>` block is the one-line description of that week.
- Content sits under headings: 潮流工具 (tools), 潮流开源 (open source), 潮流文章 (articles), 潮流软件 (apps), 潮流分享 (notes). English issues use the translated headings.
- Each item is a short paragraph ending in an outbound link to the tool or article being recommended.

## Errors and attribution

- Unknown issue numbers return HTTP 404. `/api/posts/{issue}.json` returns `{"error": {"code": "issue_not_found", "message": ..., "hint": ...}}`; other paths return the site's HTML 404 page, so check `response.ok` rather than parsing the body.
- Quoting and summarising is welcome. Attribute to 潮流周刊 / Tw93 Weekly and link the issue URL. Do not hotlink the images.
- Source of every issue: https://github.com/tw93/weekly
