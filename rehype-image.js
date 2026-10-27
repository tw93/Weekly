// rehype-customize-image-src.js
import { visit } from "unist-util-visit";
import fs from "fs";
import path from "path";

// Cache for the metadata to avoid reading from disk too often
let imageMetadataCache = null;

function getImageMetadata() {
  if (process.env.NODE_ENV === "production" && imageMetadataCache) {
    return imageMetadataCache;
  }
  const METADATA_PATH = path.resolve("./src/data/image-metadata.json");
  if (!fs.existsSync(METADATA_PATH)) return {};
  try {
    const data = JSON.parse(fs.readFileSync(METADATA_PATH, "utf-8"));
    if (process.env.NODE_ENV === "production") {
      imageMetadataCache = data;
    }
    return data;
  } catch (e) {
    console.error("Failed to parse image-metadata.json", e);
    return {};
  }
}

// Build an optimized image URL based on the source host:
// - cdn.tw93.fun (Cloudflare R2): wrap with /cdn-cgi/image/ transformation (auto webp/avif).
//   R2 does NOT support Aliyun's ?x-oss-process= params, so they must not be used here.
// - live Aliyun OSS CDNs: keep appending ?x-oss-process= params (still valid on those hosts).
// - github raw / camo / anything else: no URL-based optimization available, return unchanged.
const CF_DOMAIN = "cdn.tw93.fun";
const CF_TRANSFORM = "width=2000,quality=80,format=auto,fit=scale-down";
// cdn.fliggy.com is still live Aliyun OSS and hosts most issue images; it
// fell out of this list in the R2 migration and served multi-megabyte
// originals (issue 287's cover was 8MB). Quality 90 keeps photos as sharp as
// the originals at the 800px column; the lightbox still opens the original.
const OSS_DOMAIN_REGEX =
  /^https:\/\/(?:cdn\.fliggy\.com|cdn\.alipayobjects\.com|gw\.alipayobjects\.com|gw\.alicdn\.com|img\.alicdn\.com)\//;
const OSS_PROCESS =
  "x-oss-process=image/auto-orient,1/resize,w_2000/quality,q_90/format,webp";

function optimizeImageUrl(url) {
  const cfPrefix = `https://${CF_DOMAIN}/`;
  if (url.startsWith(cfPrefix)) {
    if (url.includes("/cdn-cgi/image/")) return url;
    return `${cfPrefix}cdn-cgi/image/${CF_TRANSFORM}/${url.slice(cfPrefix.length)}`;
  }
  if (OSS_DOMAIN_REGEX.test(url)) {
    if (url.includes("x-oss-process")) return url;
    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}${OSS_PROCESS}`;
  }
  return url;
}

const getHeroImage = (tree) => {
  let heroUrl = null;
  visit(tree, "raw", (node) => {
    if (heroUrl) return;
    const match = /<img\s+[^>]*src="([^"]+)"/.exec(node.value);
    if (match) {
      const url = match[1];
      const domainRegex =
        /https:\/\/(?:cdn\.(?:fliggy\.com|alipayobjects\.com)|gw\.(?:alipayobjects\.com|alicdn\.com)|img\.alicdn\.com|raw\.githubusercontent\.com|camo\.githubusercontent\.com|cdn\.tw93\.fun)/;
      const skipRegex = /\.(?:gif|svg|GIF|SVG)(?:\?.*)?$/;
      if (url.match(domainRegex) && !url.match(skipRegex)) {
        heroUrl = optimizeImageUrl(url);
      }
    }
  });
  return heroUrl;
};

const isBlank = (n) => n.type === "text" && !n.value.trim();
const firstChild = (n) => (n.children || []).find((c) => !isBlank(c));
const startsWithStrong = (n) => {
  const c = firstChild(n);
  return c?.type === "element" && c.tagName === "strong";
};
const hasImage = (n) =>
  (n.children || []).some(
    (c) =>
      (c.type === "element" && c.tagName === "img") ||
      (c.type === "raw" && /<img\s/.test(c.value)),
  );

// Mark a bold-led paragraph as a long-form lead when the next block is a plain
// text paragraph, so CSS can style it as a heading without touching short entries.
const markLongFormLeads = (tree) => {
  const blocks = tree.children.filter((n) => !isBlank(n));
  blocks.forEach((node, i) => {
    const next = blocks[i + 1];
    if (
      node.type === "element" &&
      node.tagName === "p" &&
      startsWithStrong(node) &&
      next?.type === "element" &&
      next.tagName === "p" &&
      !startsWithStrong(next) &&
      !hasImage(next)
    ) {
      node.properties = node.properties || {};
      node.properties.className = [...(node.properties.className || []), "entry-lead"];
    }
  });
};

export default function rehypeCustomizeImageSrc() {
  return (tree, file) => {
    markLongFormLeads(tree);
    // In dev mode, we want to pick up changes to the JSON file
    // In production/build, it's fine to read once
    const imageMetadata = getImageMetadata();
    let imageIndex = 0;
    let seenImages = 0;
    // SVG, GIF and non-CDN images pass through unrewritten; still defer every
    // one but the first so they are not all fetched on page load.
    const deferPassThrough = (tag) =>
      seenImages > 1 && !/\sloading=/.test(tag)
        ? tag.replace(/^<img\s+/, '<img loading="lazy" decoding="async" ')
        : tag;

    // Attach hero image to file metadata so layouts can access it for preloading
    const heroImage = getHeroImage(tree);
    if (heroImage) {
      if (!file.data.astro) file.data.astro = {};
      if (!file.data.astro.frontmatter) file.data.astro.frontmatter = {};
      file.data.astro.frontmatter.heroImage = heroImage;
    }

    visit(tree, "raw", (node) => {
      // 1. Process <img> tags
      const fullImgRegex = /<img\s+[^>]*src="([^"]+)"[^>]*>/g;
      node.value = node.value.replace(fullImgRegex, (fullMatch, p1) => {
        seenImages++;
        const urlLower = p1.toLowerCase();
        const isSvgOrGif =
          urlLower.includes(".svg") ||
          urlLower.includes(".gif") ||
          p1.includes("2e737667") || // .svg
          p1.includes("2e676966"); // .gif

        if (isSvgOrGif) {
          return deferPassThrough(fullMatch);
        }

        const domainRegex =
          /https:\/\/(?:cdn\.(?:fliggy\.com|alipayobjects\.com)|gw\.(?:alipayobjects\.com|alicdn\.com)|img\.alicdn\.com|raw\.githubusercontent\.com|camo\.githubusercontent\.com|cdn\.tw93\.fun)/;
        if (!p1.match(domainRegex)) {
          return deferPassThrough(fullMatch);
        }

        imageIndex++;
        const isFirstImage = imageIndex === 1;
        const meta = imageMetadata[p1];

        // Extract original width/height if they exist
        const originalWidthMatch = fullMatch.match(/width="([^"]*)"/);
        const originalHeightMatch = fullMatch.match(/height="([^"]*)"/);
        const origWidth = originalWidthMatch
          ? originalWidthMatch[1].replace("px", "")
          : null;
        const origHeight = originalHeightMatch
          ? originalHeightMatch[1].replace("px", "")
          : null;

        let newAttrs = `src="${optimizeImageUrl(p1)}" data-lightense-src="${p1}" data-pswp-src="${p1}"`;

        // Use metadata for aspect-ratio and lightbox, user-specified for display size
        const metaWidth = meta?.width;
        const metaHeight = meta?.height;

        const loadingAttr = isFirstImage
          ? 'loading="eager" fetchpriority="high"'
          : 'loading="lazy"';
        newAttrs += ` ${loadingAttr}`;

        // Add lightbox dimensions from metadata
        if (metaWidth && metaHeight) {
          const ratio = (Number(metaWidth) / Number(metaHeight)).toFixed(4);
          newAttrs += ` data-pswp-width="${metaWidth}" data-pswp-height="${metaHeight}" style="aspect-ratio: ${ratio};"`;
        }

        // User-specified dimensions for display (if provided)
        if (origWidth) {
          newAttrs += ` width="${origWidth}"`;
        }
        if (origHeight) {
          newAttrs += ` height="${origHeight}"`;
        }

        const otherAttrs = fullMatch
          .replace(/<img\s+/, "")
          .replace(/\s*\/?>$/, "")
          .replace(/\s*src="[^"]*"/, "")
          .replace(/\s*width="[^"]*"/g, "")
          .replace(/\s*height="[^"]*"/g, "")
          .replace(/\s*loading="[^"]*"/g, "")
          .replace(/\s*fetchpriority="[^"]*"/g, "")
          .replace(/\s*style="[^"]*"/g, "");

        return `<img ${newAttrs} ${otherAttrs} />`;
      });

      // 2. Defer video playback: a bare `autoplay` attribute makes the browser
      // ignore preload="metadata" and download every video on page load.
      // Swap it for data-autoplay; ClientScripts plays/pauses videos via
      // IntersectionObserver so only in-viewport videos are fetched.
      node.value = node.value.replace(
        /<video([^>]*?)\sautoplay([^>]*)>/g,
        '<video$1 data-autoplay$2>',
      );
    });
  };
}
