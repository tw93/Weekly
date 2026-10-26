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

    const autolink = line.match(AUTOLINK);
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
