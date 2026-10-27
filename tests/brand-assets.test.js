import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import sharp from "sharp";

const asset = (name) => new URL(`../public/${name}`, import.meta.url);

test("home screen icons are opaque at their declared sizes", async () => {
  const manifest = JSON.parse(await readFile(asset("site.webmanifest"), "utf8"));
  const icons = [
    { src: "/apple-touch-icon.png", sizes: "180x180" },
    ...manifest.icons,
  ];
  assert.equal(manifest.icons.length, 2);
  for (const icon of icons) {
    const { data, info } = await sharp(asset(icon.src.slice(1)).pathname)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    assert.equal(`${info.width}x${info.height}`, icon.sizes);
    for (let i = 3; i < data.length; i += 4) assert.equal(data[i], 255);
  }
});

test("a maskable crop retains the complete cup", async () => {
  const { data, info } = await sharp(asset("icon-512.png").pathname)
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const background = [...data.subarray(0, 3)];
  let cupPixels = 0;
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const offset = (y * info.width + x) * 3;
      if (background.every((value, channel) => data[offset + channel] === value)) continue;
      cupPixels++;
      assert.ok(
        Math.hypot(x + 0.5 - info.width / 2, y + 0.5 - info.height / 2) <= info.width * 0.4,
        `cup pixel at ${x},${y} would be cropped`,
      );
    }
  }
  assert.ok(cupPixels > info.width * info.height * 0.2);
});

test("every ICO directory entry decodes at its declared size", async () => {
  const ico = await readFile(asset("favicon.ico"));
  assert.equal(ico.readUInt16LE(0), 0);
  assert.equal(ico.readUInt16LE(2), 1);
  const count = ico.readUInt16LE(4);
  const sizes = [];
  for (let index = 0; index < count; index++) {
    const entry = 6 + index * 16;
    const width = ico[entry] || 256;
    const height = ico[entry + 1] || 256;
    const length = ico.readUInt32LE(entry + 8);
    const offset = ico.readUInt32LE(entry + 12);
    assert.ok(offset + length <= ico.length);
    const frame = await sharp(ico.subarray(offset, offset + length)).metadata();
    assert.equal(frame.width, width);
    assert.equal(frame.height, height);
    sizes.push(width);
  }
  assert.deepEqual(sizes, [16, 32, 48, 64]);
});
