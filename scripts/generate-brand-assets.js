// Generate raster exports from the cup and the site's existing outlined type.
import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

const root = new URL("../", import.meta.url);
const cup = await readFile(new URL("public/icon.svg", root), "utf8");
const defaults = cup.match(/\.weekly-cup\s*\{([^}]+)\}/)[1];
const colors = Object.fromEntries(
  [...defaults.matchAll(/(--cup-[\w-]+):\s*(#[\da-f]+);/g)].map(
    ([, key, value]) => [key, value],
  ),
);
const darkColors = Object.fromEntries(
  [...cup.match(/\[data-theme="dark"\] \.weekly-cup\s*\{([^}]+)\}/)[1]
    .matchAll(/(--cup-[\w-]+):\s*(#[\da-f]+);/g)].map(
    ([, key, value]) => [key, value],
  ),
);
const staticCup = (palette) => cup
  .replace(/<style>[\s\S]*?<\/style>/, "")
  .replace(/var\((--cup-[\w-]+)\)/g, (_, key) => palette[key]);
const artwork = staticCup(colors);
const cream = "#f4ede5";

function tile(size, small = false, scale = 0.78) {
  const art = small
    ? artwork.replace(/<path class="cup-detail"[^>]*\/>/, "")
    : artwork;
  // A 0.78 scale puts the complete cup inside the maskable centre circle.
  const inner = Math.round(size * scale);
  const inset = (size - inner) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
    <rect width="100%" height="100%" fill="${cream}"/>
    <svg x="${inset}" y="${inset}" width="${inner}" height="${inner}" viewBox="0 0 144 144">${art.replace(/<\/?svg[^>]*>/g, "")}</svg>
  </svg>`;
}

async function png(svg, name, size) {
  const buffer = await sharp(Buffer.from(svg), { density: 288 })
    .resize(size, size)
    .png()
    .toBuffer();
  await writeFile(new URL(`public/${name}`, root), buffer);
  return buffer;
}

// Preserve the old transparent URL for existing readers and external links.
await png(artwork, "icon-144.png", 144);
await png(tile(32, true, 1), "icon-32.png", 32);
await png(tile(180), "apple-touch-icon.png", 180);
await png(tile(192), "icon-192.png", 192);
await png(tile(512), "icon-512.png", 512);

const sizes = [16, 32, 48, 64];
const frames = await Promise.all(
  sizes.map((size) =>
    sharp(Buffer.from(tile(size, size <= 32, 1)), { density: 288 })
      .resize(size, size)
      .png()
      .toBuffer(),
  ),
);
const directory = Buffer.alloc(6 + sizes.length * 16);
directory.writeUInt16LE(1, 2);
directory.writeUInt16LE(sizes.length, 4);
let offset = directory.length;
frames.forEach((frame, index) => {
  const entry = 6 + index * 16;
  directory[entry] = directory[entry + 1] = sizes[index];
  directory.writeUInt16LE(1, entry + 4);
  directory.writeUInt16LE(32, entry + 6);
  directory.writeUInt32LE(frame.length, entry + 8);
  directory.writeUInt32LE(offset, entry + 12);
  offset += frame.length;
});
await writeFile(
  new URL("public/favicon.ico", root),
  Buffer.concat([directory, ...frames]),
);

for (const lang of ["zh", "en"]) {
  const wordmark = await readFile(
    new URL(`scripts/assets/wordmark-${lang}.svg`, root),
  );
  const cupImage = await sharp(Buffer.from(staticCup({ ...colors, ...darkColors })), { density: 288 })
    .resize(352, 352)
    .png()
    .toBuffer();
  const title = await sharp(wordmark, { density: 72 })
    .resize(780, 184, { fit: "inside" })
    .png()
    .toBuffer({ resolveWithObject: true });
  const centreOffset = Math.round((780 - title.info.width) / 2);
  await sharp({
    create: { width: 1280, height: 640, channels: 3, background: "#36563c" },
  })
    .composite([
      { input: cupImage, left: 80 + centreOffset, top: 144 },
      { input: title.data, left: 430 + centreOffset, top: Math.round((640 - title.info.height) / 2) },
    ])
    .png()
    .toFile(new URL(`public/og-${lang}.png`, root).pathname);
}

console.log("Generated cup icons and both Weekly share images.");
