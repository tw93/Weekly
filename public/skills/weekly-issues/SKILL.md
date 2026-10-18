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
  "count": 286,
  "englishCount": 286,
  "latestIssue": 286,
  "issues": [
    {
      "issue": 286,
      "title": "第 286 期 - 径山双溪",
      "name": "径山双溪",
      "language": "zh-Hans",
      "date": "2026/10/19",
      "description": "封面图拍摄于周末去径山双溪露营用无人机拍的效果，整体景色不错，不过我感觉蚊子有点多了，看看绿色挺好的，我把视频的效果放到后面去大伙可以瞧瞧。",
      "coverImage": "https://cdn.fliggy.com/pic/28620.png",
      "url": "https://weekly.tw93.fun/posts/286",
      "markdownUrl": "https://weekly.tw93.fun/posts/286.md",
      "jsonUrl": "https://weekly.tw93.fun/api/posts/286.json",
      "translation": {
        "language": "en",
        "title": "286. Jingshan Shuangxi",
        "url": "https://weekly.tw93.fun/en/posts/286",
        "markdownUrl": "https://weekly.tw93.fun/en/posts/286.md",
        "jsonUrl": "https://weekly.tw93.fun/api/en/posts/286.json"
      }
    }
  ]
}
```

For a compact human-readable index of the whole archive, fetch `https://weekly.tw93.fun/index.md`.

## Read an issue

Append `.md` to any issue URL to get the Markdown source:

```
GET https://weekly.tw93.fun/posts/286.md      # Chinese
GET https://weekly.tw93.fun/en/posts/286.md   # English
```

Or take metadata and body together as JSON:

```
GET https://weekly.tw93.fun/api/posts/286.json
GET https://weekly.tw93.fun/api/en/posts/286.json
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
