#!/usr/bin/env node
// Gives every <video> in the issues a poster: a frame from the video saved as
// public/assets/posters/<hash of the video URL>.webp, written into the tag as an
// absolute URL so the Markdown twins and feeds carry it too. Run it after a new
// issue adds a video; `--check` lists videos still without one, `--refresh`
// redraws every poster.
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const DIRS = ["src/pages/posts", "src/pages/en/posts"];
const OUT = "public/assets/posters";
const SITE = "https://weekly.tw93.fun";
const VIDEO = /<video\b[^>]*>[\s\S]*?<\/video>/g;

// /assets is cached for a week, so a redrawn set takes a new version in its
// name. v2: frames decoded in the matrix browsers use (2026-11-17, v1 decoded
// untagged HD as BT.601 and every poster came out redder than its video).
const VERSION = "v2";
export const posterPath = (src) => `/assets/posters/${createHash("sha1").update(src).digest("hex").slice(0, 12)}.${VERSION}.webp`;
const OURS = /^https:\/\/weekly\.tw93\.fun\/assets\/posters\/[^"]+$/;

// Frames picked by hand where the automatic one showed nothing (an empty
// desktop, an empty terminal, a transition, a blank note) or the wrong moment
// (290 opens on the stage lights before Li Zhi comes on), in seconds.
const PICKS = {
  "https://gw.alipayobjects.com/os/k/jw/dock.mp4": 1.68,
  "https://cdn.tw93.fun/blog/upic/AVY7AT.mp4": 22.4,
  "https://cdn.fliggy.com/pic/mole-xhs43.mp4": 8.4,
  "https://gw.alipayobjects.com/os/k/if/slash.mp4": 4,
  "https://cdn.tw93.fun/notes/13_2121632076097277952.mp4": 55,
};

const videoSrc = (tag) => tag.match(/\bsrc="([^"]+)"/)?.[1];

const posts = () =>
  DIRS.flatMap((dir) =>
    fs
      .readdirSync(path.join(ROOT, dir))
      .filter((name) => name.endsWith(".md"))
      .map((name) => path.join(ROOT, dir, name)),
  );

// A CDN read sometimes drops mid-stream (Input/output error); one retry.
const run = (cmd, args, options) => {
  try {
    return execFileSync(cmd, args, options);
  } catch {
    return execFileSync(cmd, args, options);
  }
};

const probe = (src) => {
  const out = run(
    "ffprobe",
    ["-v", "error", "-select_streams", "v:0", "-show_entries", "stream=height,color_space:format=duration", "-of", "json", src],
    { encoding: "utf8", timeout: 60000 },
  );
  const { streams = [], format = {} } = JSON.parse(out);
  return { length: Number.parseFloat(format.duration) || 0, height: streams[0]?.height ?? 0, space: streams[0]?.color_space };
};

// Browsers decode an untagged HD video as BT.709 and SD as BT.601, while
// ffmpeg's RGB conversion assumes BT.601 unless told; match the browser.
const matrixFor = ({ space, height }) => {
  if (space === "bt709") return "bt709";
  if (space === "bt470bg" || space === "smpte170m") return "bt601";
  return height >= 720 ? "bt709" : "bt601";
};

const frameAt = (src, seconds, matrix) =>
  run(
    "ffmpeg",
    ["-v", "error", "-ss", String(seconds), "-i", src, "-frames:v", "1", "-vf", `scale=iw:ih:in_color_matrix=${matrix}:out_color_matrix=${matrix}`, "-f", "image2pipe", "-vcodec", "png", "-"],
    { maxBuffer: 64 * 1024 * 1024, timeout: 120000 },
  );

// A fade-in or a title card on black reads as a broken video, so skip frames
// that are nearly dark or nearly one colour.
const isBlank = async (png) => {
  const { channels } = await sharp(png).greyscale().stats();
  const { mean, stdev } = channels[0];
  return mean < 18 || stdev < 6;
};

// ffmpeg seeking over HTTP through the local proxy drops reads ("Stream ends
// prematurely") where curl does not, so frames come from a local copy.
const download = (src) => {
  const file = path.join(os.tmpdir(), `weekly-poster-${createHash("sha1").update(src).digest("hex").slice(0, 12)}`);
  run("curl", ["-sSfL", "--retry", "2", "--max-time", "600", "-o", file, src], { timeout: 660000 });
  return file;
};

const makePoster = async (url, file) => {
  const src = download(url);
  try {
    await drawPoster(url, src, file);
  } finally {
    fs.rmSync(src, { force: true });
  }
};

const drawPoster = async (url, src, file) => {
  const info = probe(src);
  const { length } = info;
  const matrix = matrixFor(info);
  const times = PICKS[url] !== undefined ? [PICKS[url]] : [1, 2, length * 0.25, length * 0.5].filter((t) => t < length || length === 0);
  let chosen;
  for (const t of times.length ? times : [0]) {
    const png = frameAt(src, Math.max(0, Math.min(t, Math.max(0, length - 0.1))), matrix);
    if (!png.length) continue;
    chosen = png;
    if (!(await isBlank(png))) break;
  }
  if (!chosen) throw new Error(`no frame from ${url}`);
  await sharp(chosen).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 78 }).toFile(file);
};

const main = async () => {
  const check = process.argv.includes("--check");
  const refresh = process.argv.includes("--refresh");
  fs.mkdirSync(path.join(ROOT, OUT), { recursive: true });
  const missing = [];
  const redrawn = new Set();
  let made = 0;
  let tagged = 0;
  for (const file of posts()) {
    const source = fs.readFileSync(file, "utf8");
    let changed = source;
    for (const tag of source.match(VIDEO) ?? []) {
      const src = videoSrc(tag);
      if (!src) continue;
      // Only the <video> element reads poster; on a <source> it is ignored.
      const current = tag.match(/^<video\b[^>]*>/)[0].match(/\bposter="([^"]+)"/)?.[1];
      // A poster this script made under an older version is redrawn; one
      // chosen by hand from elsewhere is left alone.
      if (current && !(OURS.test(current) && current !== SITE + posterPath(src))) continue;
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
      if (!fs.existsSync(out) || (refresh && !redrawn.has(out))) {
        await makePoster(src, out);
        redrawn.add(out);
        made += 1;
      }
      const next = current
        ? tag.replace(`poster="${current}"`, `poster="${SITE}${poster}"`)
        : tag.replace(/^<video\b/, `<video poster="${SITE}${poster}"`);
      changed = changed.replace(tag, next);
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
  const used = new Set(posts().flatMap((file) => [...fs.readFileSync(file, "utf8").matchAll(/poster="https:\/\/weekly\.tw93\.fun(\/assets\/posters\/[^"]+)"/g)].map((m) => m[1])));
  let removed = 0;
  for (const name of fs.readdirSync(path.join(ROOT, OUT))) {
    if (!used.has(`/assets/posters/${name}`)) {
      fs.rmSync(path.join(ROOT, OUT, name));
      removed += 1;
    }
  }
  console.log(`video posters: ${made} made, ${tagged} tags updated, ${removed} unused removed`);
};

if (process.argv[1] && path.resolve(process.argv[1]) === new URL(import.meta.url).pathname) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
