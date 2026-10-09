import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { assertIssueBlurbs } from "../scripts/seo-copy.js";
import { socialTitle } from "../src/seoTitle.js";

test("every issue keeps its own same-language description", async () => {
  const counts = await assertIssueBlurbs();
  assert.ok(counts.zh > 200);
  assert.equal(counts.zh, counts.en);
});

test("article social titles keep the site prefix, other pages do not", () => {
  assert.equal(
    socialTitle({
      isArticle: true,
      lang: "zh",
      siteTitle: "潮流周刊",
      contentTitle: "第284期 - 小资餐厅",
    }),
    "潮流周刊第284期 - 小资餐厅",
  );
  assert.equal(
    socialTitle({
      isArticle: true,
      lang: "en",
      siteTitle: "Weekly",
      contentTitle: "284. A Stylish Restaurant",
    }),
    "Weekly 284. A Stylish Restaurant",
  );
  assert.equal(
    socialTitle({
      isArticle: false,
      lang: "zh",
      siteTitle: "潮流周刊",
      contentTitle: "关于潮流周刊",
    }),
    "关于潮流周刊",
  );
  assert.equal(
    socialTitle({
      isArticle: false,
      lang: "en",
      siteTitle: "Weekly",
      contentTitle: "About Weekly",
    }),
    "About Weekly",
  );
  assert.equal(
    socialTitle({
      isArticle: false,
      lang: "zh",
      siteTitle: "潮流周刊",
      contentTitle: "",
    }),
    "潮流周刊",
  );
});

test("the about page document title is its heading", () => {
  const source = readFileSync(
    new URL("../src/components/AboutPage.astro", import.meta.url),
    "utf8",
  );
  assert.match(source, /title=\{heading\}/);
  assert.match(source, /content=\{\{ title: heading \}\}/);
  assert.match(source, /const heading = isEn \? 'About Weekly' : '关于潮流周刊'/);
  assert.doesNotMatch(source, /SITE\.title\}关于/);
});
