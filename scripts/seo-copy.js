import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ZH_DIR = path.join(ROOT, "src/pages/posts");
const EN_DIR = path.join(ROOT, "src/pages/en/posts");

const ZH_BOILERPLATE = "记录工程师 Tw93 的不枯燥生活，每周一发布，欢迎关注";
const EN_BOILERPLATE =
  "Recording engineer Tw93's interesting life, published every Monday. Welcome to follow.";

const cjkCount = (text) => (text.match(/[\u4e00-\u9fff]/g) || []).length;

export function issueBlurb(markdown) {
  const match = markdown.match(/<small>([\s\S]*?)<\/small>/);
  if (!match) return "";
  return match[1]
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function assertBlurb(filename, blurb, lang) {
  if (!blurb) {
    throw new Error(`${filename} has no <small> description`);
  }
  if (blurb === ZH_BOILERPLATE || blurb === EN_BOILERPLATE) {
    throw new Error(`${filename} description is the site boilerplate`);
  }
  const cjk = cjkCount(blurb);
  const letters = (blurb.match(/[A-Za-z]/g) || []).length;
  if (lang === "zh") {
    if (cjk < 4) {
      throw new Error(`${filename} Chinese description has too little Chinese text`);
    }
    return;
  }
  if (letters < 8 || cjk / blurb.length > 0.35) {
    throw new Error(`${filename} English description is not English`);
  }
}

export async function assertIssueBlurbs() {
  const zhFiles = (await readdir(ZH_DIR)).filter((name) => name.endsWith(".md"));
  const enFiles = (await readdir(EN_DIR)).filter((name) => name.endsWith(".md"));
  for (const name of zhFiles) {
    assertBlurb(name, issueBlurb(await readFile(path.join(ZH_DIR, name), "utf8")), "zh");
  }
  for (const name of enFiles) {
    assertBlurb(name, issueBlurb(await readFile(path.join(EN_DIR, name), "utf8")), "en");
  }
  return { zh: zhFiles.length, en: enFiles.length };
}

const isMain =
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMain) {
  const { zh, en } = await assertIssueBlurbs();
  console.log(`seo copy: ok (${zh} Chinese, ${en} English)`);
}
