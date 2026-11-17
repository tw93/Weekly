#!/usr/bin/env node
// Gives every <video> in the issues a poster: a frame from the video saved as
// public/assets/posters/<hash of the video URL>.webp, written into the tag as an
// absolute URL so the Markdown twins and feeds carry it too. Run it after a new
// issue adds a video; `--check` lists videos still without one.
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const DIRS = ["src/pages/posts", "src/pages/en/posts"];
const OUT = "public/assets/posters";
const SITE = "https://weekly.tw93.fun";
const VIDEO = /<video\b[^>]*>[\s\S]*?<\/video>/g;

export const posterPath = (src) => `/assets/posters/${createHash("sha1").update(src).digest("hex").slice(0, 12)}.webp`;

const videoSrc = (tag) => tag.match(/\bsrc="([^"]+)"/)?.[1];

const posts = () =>
  DIRS.flatMap((dir) =>
    fs
      .readdirSync(path.join(ROOT, dir))
      .filter((name) => name.endsWith(".md"))
      .map((name) => path.join(ROOT, dir, name)),
  );

const duration = (src) => {
  const out = execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", src], { encoding: "utf8", timeout: 60000 });
  return Number.parseFloat(out) || 0;
};

const frameAt = (src, seconds) =>
  execFileSync("ffmpeg", ["-v", "error", "-ss", String(seconds), "-i", src, "-frames:v", "1", "-f", "image2pipe", "-vcodec", "png", "-"], {
    maxBuffer: 64 * 1024 * 1024,
    timeout: 120000,
  });

// A fade-in or a title card on black reads as a broken video, so skip frames
// that are nearly dark or nearly one colour.
const isBlank = async (png) => {
  const { channels } = await sharp(png).greyscale().stats();
  const { mean, stdev } = channels[0];
  return mean < 18 || stdev < 6;
};

const makePoster = async (src, file) => {
  const length = duration(src);
  const times = [1, 2, length * 0.25, length * 0.5].filter((t) => t < length || length === 0);
  let chosen;
  for (const t of times.length ? times : [0]) {
    const png = frameAt(src, Math.max(0, Math.min(t, Math.max(0, length - 0.1))));
    if (!png.length) continue;
    chosen = png;
    if (!(await isBlank(png))) break;
  }
  if (!chosen) throw new Error(`no frame from ${src}`);
  await sharp(chosen).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 78 }).toFile(file);
};

const main = async () => {
  const check = process.argv.includes("--check");
  fs.mkdirSync(path.join(ROOT, OUT), { recursive: true });
  const missing = [];
  let made = 0;
  let tagged = 0;
  for (const file of posts()) {
    const source = fs.readFileSync(file, "utf8");
    let changed = source;
    for (const tag of source.match(VIDEO) ?? []) {
      // Only the <video> element reads poster; on a <source> it is ignored.
      if (/\bposter=/.test(tag.match(/^<video\b[^>]*>/)[0])) continue;
      const src = videoSrc(tag);
      if (!src) continue;
      if (check) {
        missing.push(`${path.relative(ROOT, file)} ${src}`);
        continue;
      }
      const misplaced = tag.match(/<source\b[^>]*?\s(poster="[^"]+")/);
      if (misplaced) {
        const moved = tag.replace(` ${misplaced[1]}`, "").replace(/^<video\b/, `<video ${misplaced[1]}`);
        changed = changed.replace(tag, moved);
        tagged += 1;
        continue;
      }
      const poster = posterPath(src);
      const out = path.join(ROOT, "public", poster);
      if (!fs.existsSync(out)) {
        await makePoster(src, out);
        made += 1;
      }
      changed = changed.replace(tag, tag.replace(/^<video\b/, `<video poster="${SITE}${poster}"`));
      tagged += 1;
    }
    if (changed !== source) fs.writeFileSync(file, changed);
  }
  if (check) {
    if (missing.length) {
      console.error(`videos without a poster (run node scripts/add-video-posters.js):\n${missing.join("\n")}`);
      process.exit(1);
    }
    console.log("video posters: ok");
    return;
  }
  console.log(`video posters: ${made} made, ${tagged} tags updated`);
};

if (process.argv[1] && path.resolve(process.argv[1]) === new URL(import.meta.url).pathname) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
