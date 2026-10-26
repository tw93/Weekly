// Splits one issue's Markdown body into the items it recommends, so agents can
// answer "which terminal tools did the Weekly recommend" from one file instead
// of fetching every issue. Plain JS with no dependencies: the Astro build and
// the node tests both import it.
//
// Two layouts exist in the archive:
// - early issues and roundups such as 165 list items as `- [Title - note](url)` or
//   `1. **[Title](url)**：note` under `###` headings;
// - later issues give each item a `**Title**` line, an optional `<url>` line
//   and the author's note below it, under `##` headings.

const HEADING = /^#{2,3}\s+(.+?)\s*#*\s*$/;
const BOLD_TITLE = /^\*\*(.+?)\*\*\s*\\?\s*$/;
const LIST_LINK =
  /^(?:[-*]|\d+\.)\s+(?:\*\*)?\[(.+?)\]\((\S+?)\)(?:\*\*)?\s*[：:]?\s*(.*)$/;
const AUTOLINK = /^<(https?:\/\/[^>\s]+)>\s*\\?\s*$/;
// Some translations turned the `<url>` line into `[Watch on YouTube](url)`.
const LINK_LINE = /^\[[^\]]+\]\((https?:\/\/[^)\s]+)\)\s*\\?\s*$/;
const FENCE = /^(```|~~~)/;
const MEDIA = /^<(img|video|iframe|source|picture|div|p|br|small|audio)\b|^<\/|^!\[/i;

const stripFrontmatter = (raw) =>
  raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, "");

/** Turns inline Markdown and HTML into plain text for the item note. */
export const plainText = (line) =>
  line
    .replace(/<[^>]+>/g, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, "$1")
    .replace(/<(https?:\/\/[^>\s]+)>/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\\([$*_`\\])/g, "$1")
    .replace(/\s+\\$/, "")
    .replace(/\s+/g, " ")
    .trim();

/**
 * @param {string} markdown issue source, frontmatter optional
 * @returns {{section: string | null, title: string, url: string | null, note: string}[]}
 */
export function parseIssueItems(markdown) {
  const lines = stripFrontmatter(markdown).split(/\r?\n/);
  const items = [];
  let section = null;
  let current = null;
  let inFence = false;

  const close = () => {
    if (!current) return;
    current.note = current.note.join(" ").trim();
    items.push(current);
    current = null;
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (FENCE.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence || !line) continue;

    const heading = line.match(HEADING);
    if (heading) {
      close();
      section = plainText(heading[1]);
      continue;
    }

    const bold = line.match(BOLD_TITLE);
    // Issue 37 writes one link as `**https://...**` under its title.
    if (
      bold &&
      current &&
      !current.url &&
      current.note.length === 0 &&
      /^https?:\/\/\S+$/.test(bold[1])
    ) {
      current.url = bold[1];
      continue;
    }
    if (bold && section) {
      close();
      current = { section, title: plainText(bold[1]), url: null, note: [] };
      continue;
    }

    const listed = line.match(LIST_LINK);
    if (listed && section) {
      close();
      const tail = plainText(listed[3]);
      items.push({
        section,
        title: plainText(listed[1]),
        url: listed[2],
        note: tail,
      });
      continue;
    }

    if (!current) continue;

    const autolink = line.match(AUTOLINK) ?? line.match(LINK_LINE);
    if (autolink && !current.url && current.note.length === 0) {
      current.url = autolink[1];
      continue;
    }
    if (MEDIA.test(line)) continue;

    const text = plainText(line.replace(/^>\s?/, ""));
    if (text) current.note.push(text);
  }

  close();
  return items.filter((item) => item.title);
}

/**
 * Pairs the items of a translation with the items of its original. Items whose
 * link appears on both sides anchor the pairing (longest common subsequence of
 * links); between two anchors, items whose link was moved elsewhere are set
 * aside and the rest pair up in order, but only when both sides are left with
 * the same count. Positions alone are not enough: issue 257's translation
 * moved LobsterAI two slots up, and pairing by index gave its link to the
 * item after it.
 *
 * @returns {number[]} for each translated item, the index of its original, or -1
 */
export function alignTranslation(original, translated) {
  const n = original.length;
  const m = translated.length;
  const same = (i, j) =>
    Boolean(original[i].url) && original[i].url === translated[j].url;

  const lcs = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i -= 1) {
    for (let j = m - 1; j >= 0; j -= 1) {
      lcs[i][j] = same(i, j)
        ? lcs[i + 1][j + 1] + 1
        : Math.max(lcs[i + 1][j], lcs[i][j + 1]);
    }
  }
  const originalUrls = new Set(original.map((item) => item.url).filter(Boolean));
  const translatedUrls = new Set(
    translated.map((item) => item.url).filter(Boolean),
  );

  // When a link moved, either side of it can be the anchor, so both tie
  // breaks are tried and the one that pairs more items wins.
  const pairUp = (preferOriginal) => {
    const anchors = [];
    for (let i = 0, j = 0; i < n && j < m; ) {
      if (same(i, j)) {
        anchors.push([i, j]);
        i += 1;
        j += 1;
      } else if (
        lcs[i + 1][j] > lcs[i][j + 1] ||
        (lcs[i + 1][j] === lcs[i][j + 1] && preferOriginal)
      ) {
        i += 1;
      } else {
        j += 1;
      }
    }

    const anchored = new Set(anchors.map(([i]) => original[i].url));
    // A shared link that is not an anchor moved; it pairs by link alone and
    // leaves the gaps it sits in.
    const moved = (url) => Boolean(url) && !anchored.has(url) &&
      originalUrls.has(url) && translatedUrls.has(url);
    const result = new Array(m).fill(-1);
    translated.forEach((item, j) => {
      if (moved(item.url)) result[j] = original.findIndex((o) => o.url === item.url);
    });

    const bounds = [[-1, -1], ...anchors, [n, m]];
    for (let k = 0; k < bounds.length - 1; k += 1) {
      const [i0, j0] = bounds[k];
      const [i1, j1] = bounds[k + 1];
      if (k > 0) result[j0] = i0;
      const left = [];
      for (let i = i0 + 1; i < i1; i += 1) {
        if (!moved(original[i].url)) left.push(i);
      }
      const right = [];
      for (let j = j0 + 1; j < j1; j += 1) {
        if (!moved(translated[j].url)) right.push(j);
      }
      if (left.length === right.length) {
        right.forEach((j, index) => {
          result[j] = left[index];
        });
      }
    }
    return result;
  };

  const paired = (result) => result.filter((index) => index >= 0).length;
  const a = pairUp(true);
  const b = pairUp(false);
  return paired(b) > paired(a) ? b : a;
}
