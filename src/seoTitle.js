// Article pages prefix the site name onto the issue title.
// Other pages pass their own document title through unchanged.
// Re-prefixing those turns "关于潮流周刊" into "潮流周刊关于".
export function socialTitle({ isArticle, lang, siteTitle, contentTitle }) {
  if (!contentTitle) return siteTitle;
  if (!isArticle) return contentTitle;
  return lang === "en" ? `${siteTitle} ${contentTitle}` : `${siteTitle}${contentTitle}`;
}
