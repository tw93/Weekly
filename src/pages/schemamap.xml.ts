// Schema map: a sitemap-shaped index of the structured-data feeds on this
// site, referenced by the `schemamap:` directive in robots.txt.
import { getIssues, textResponse } from "@/agents";
import { SITE } from "@/config";

const site = SITE.homePage;

export const GET = () => {
  const latest = getIssues("zh")[0];
  const lastmod = (latest?.date ?? "").replace(/\//g, "-");

  const feeds = [
    `${site}/feeds/posts.jsonl`,
    `${site}/api/posts.json`,
    `${site}/api/items.jsonl`,
    `${site}/api/en/items.jsonl`,
    `${site}/rss.xml`,
    `${site}/en/rss.xml`,
  ];

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...feeds.map((loc) =>
      [
        "  <url>",
        `    <loc>${loc}</loc>`,
        lastmod ? `    <lastmod>${lastmod}</lastmod>` : "",
        "    <changefreq>weekly</changefreq>",
        "  </url>",
      ]
        .filter(Boolean)
        .join("\n"),
    ),
    "</urlset>",
    "",
  ].join("\n");

  return textResponse(body, "application/xml; charset=utf-8");
};
