// Helper function to extract and decode the title part from the URL
export const extractTitlePart = (currentPage: string) => {
  const [, raw = ""] = currentPage.split("/posts/");
  return decodeURIComponent(raw.replace(/\/$/, ""));
};

export const getSlugParts = (slug: string) => {
  const [numberPart = "", ...nameParts] = slug.split("-");
  return {
    numberPart,
    name: nameParts.join("-"),
  };
};

export const getIndex = (currentPage: string) => {
  const { numberPart } = getSlugParts(extractTitlePart(currentPage));
  return Number.parseInt(numberPart, 10);
};

export const sortPosts = (allPosts: any) => {
  return allPosts.sort((a: any, b: any) => getIndex(b.url) - getIndex(a.url));
};

export const toNumericUrl = (currentPage: string) => {
  const index = getIndex(currentPage);
  return Number.isNaN(index) ? currentPage : `/posts/${index}`;
};

export const parseTitle = (
  currentPage: string,
  legacySlug?: string,
  fallbackName = "",
  lang = "zh",
  isSidebar = false,
) => {
  const slug = legacySlug ?? extractTitlePart(currentPage);
  const { numberPart, name } = getSlugParts(slug);
  const displayName = name || fallbackName;

  if (lang === "en") {
    if (isSidebar) {
      return `${numberPart}.`;
    }
    const cleanName = displayName.replace(/-/g, " ");
    return `${numberPart}.${cleanName ? ` ${cleanName}` : ""}`;
  }

  let title = `第${numberPart}期`;
  if (displayName) {
    title += ` - ${displayName}`;
  }
  return title;
};

// Resize a cover image through the CDN it lives on. Cloudflare R2
// (cdn.tw93.fun) ignores Aliyun's ?x-oss-process= and would serve the
// multi-megabyte original, so it gets its own /cdn-cgi/image/ transform.
const R2_PREFIX = "https://cdn.tw93.fun/";
// Already 2000px WebP without EXIF, made locally; served as is.
const R2_PRESIZED = `${R2_PREFIX}blog/2000/`;
const OSS_HOST =
  /^https:\/\/(?:cdn\.fliggy\.com|cdn\.alipayobjects\.com|gw\.alipayobjects\.com|gw\.alicdn\.com|img\.alicdn\.com)\//;

export const resizeImage = (url: string, width: number, quality = 80) => {
  if (url.startsWith(R2_PRESIZED)) return url;
  if (url.startsWith(R2_PREFIX) && !url.includes("/cdn-cgi/image/")) {
    return `${R2_PREFIX}cdn-cgi/image/width=${width},quality=${quality},format=auto,fit=scale-down/${url.slice(R2_PREFIX.length)}`;
  }
  if (OSS_HOST.test(url) && !url.includes("x-oss-process")) {
    return `${url}${url.includes("?") ? "&" : "?"}x-oss-process=image/resize,w_${width}/quality,q_${quality}/format,webp`;
  }
  return url;
};

// Card covers at quality 90: 800 stays above every desktop column (320 to 390
// CSS px) at 2x, 1200 keeps single-column phones sharp at 3x. The old 640 sat
// exactly at 2x on the four-column grid at the CDN's default quality and read
// soft. Sizes follow the feed grid in index.css.
export const cardImage = (url: string) => ({
  src: resizeImage(url, 800, 90),
  srcset: `${resizeImage(url, 800, 90)} 800w, ${resizeImage(url, 1200, 90)} 1200w`,
  sizes:
    "(min-width: 1300px) 320px, (min-width: 1000px) 364px, (min-width: 640px) 390px, min(calc(100vw - 32px), 544px)",
});
