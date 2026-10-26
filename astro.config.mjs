import fs from "fs";
import dayjs from "dayjs";
import tailwind from "@astrojs/tailwind";
import remarkBreaks from "remark-breaks";
import sitemap from "@astrojs/sitemap";

import { defineConfig } from "astro/config";
import { parse } from "node-html-parser";
import { SITE } from "./src/config";
import rehypeImage from "./rehype-image.js";

// Markdown configuration - controls line break behavior
const markdownConfig = {
  hardBreaks: true, // Set to true to enable hard breaks (similar to CMARK_OPT_HARDBREAKS)
  gfm: true,
  smartypants: true,
  allowDangerousHtml: true,
};

const DEFAULT_FORMAT = "YYYY/MM/DD";
const WEEKLY_REPO_NAME = "tw93/weekly";

function formatDate(date) {
  return dayjs(date).format(DEFAULT_FORMAT);
}

function getFileCreateDate(filePath) {
  return formatDate(fs.statSync(filePath).birthtime);
}

function getTwitterImage(num) {
  return num >= 110 ? `https://weekly.tw93.fun/assets/${num}.jpg` : undefined;
}

function defaultLayoutPlugin() {
  return function (tree, file) {
    const filePath = file.history[0];
    // Only issue Markdown gets the post layout and the derived post metadata.
    // Prose imported elsewhere (src/data/*.md) renders inside its own page.
    if (!/[\/\\]pages[\/\\](en[\/\\])?posts[\/\\]/.test(filePath)) {
      return;
    }

    const { frontmatter } = file.data.astro;
    frontmatter.layout = "@layouts/post.astro";

    const isEn = filePath.includes("/en/posts/");
    const postsDir = isEn ? "/en/posts/" : "/posts/";

    const relativePath = filePath
      .split(/[\/\\]posts[\/\\]/)[1]
      ?.replace(/\.md$/, "");

    if (relativePath) {
      frontmatter.legacySlug = relativePath;
      const [numberPart, ...nameParts] = relativePath.split("-");
      if (numberPart) {
        const numericIndex = Number.parseInt(numberPart, 10);
        if (!Number.isNaN(numericIndex)) {
          frontmatter.issueNumber = numericIndex;
          frontmatter.numericUrl = `${postsDir}${numericIndex}`;
        } else {
          frontmatter.numericUrl = `${postsDir}${numberPart}`;
        }
      }
      if (nameParts.length > 0) {
        frontmatter.issueTitle = decodeURIComponent(nameParts.join("-"));
      }
    }

    if (tree.children[0]?.value && !frontmatter.image) {
      const imageElement = parse(tree.children[0].value).querySelector("img");
      frontmatter.image = imageElement.getAttribute("src");
    }

    if (tree.children[1]?.children[1]?.value) {
      frontmatter.description = tree.children[1].children[1].value;
    }

    frontmatter.description = frontmatter.description || SITE.description;
    frontmatter.image = frontmatter.image || SITE.siteImage;

    // Fallback to file creation time if no date is specified
    if (!frontmatter.date) {
      frontmatter.date = getFileCreateDate(filePath);
    }

    if (SITE.repo === WEEKLY_REPO_NAME) {
      const postNumber = filePath.split(/[\/\\]posts[\/\\]/)[1]?.split("-")[0];
      frontmatter.socialImage = getTwitterImage(postNumber);
    }
  };
}

export default defineConfig({
  site: SITE.homePage,
  // Inline all CSS: first paint then needs only the HTML response instead of
  // a second round trip for five render-blocking stylesheets.
  build: {
    inlineStylesheets: "always",
  },
  // Hover or tap on any internal link prerenders the page (Speculation Rules in
  // Chromium, plain prefetch elsewhere), so navigation shows a finished page.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
  experimental: {
    clientPrerender: true,
  },
  trailingSlash: "never",
  server: {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  integrations: [
    tailwind(),
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
      filter: (page) => {
        const url = new URL(page);
        const postPathMatch = url.pathname.match(/\/posts\/(\d+)-/);
        return !postPathMatch;
      },
    }),
  ],
  i18n: {
    defaultLocale: "zh",
    locales: ["zh", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  markdown: {
    remarkPlugins: [
      defaultLayoutPlugin,
      // Enable hard breaks based on configuration
      ...(markdownConfig.hardBreaks ? [remarkBreaks] : []),
    ],
    rehypePlugins: [rehypeImage],
    remarkRehype: {
      handlers: {},
      allowDangerousHtml: markdownConfig.allowDangerousHtml,
    },
    gfm: markdownConfig.gfm,
    smartypants: markdownConfig.smartypants,
  },
  vite: {
    server: {
      cors: true,
    },
    build: {
      rollupOptions: {
        onwarn(warning, warn) {
          // Suppress harmless internal Astro import warnings
          if (
            warning.code === "UNUSED_EXTERNAL_IMPORT" &&
            warning.exporter === "@astrojs/internal-helpers/remote"
          ) {
            return;
          }
          warn(warning);
        },
      },
    },
  },
});
