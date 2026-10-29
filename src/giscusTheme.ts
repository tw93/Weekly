import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// /styles/ is cached for a day, so the comment theme URLs carry a hash of both
// themes and a regenerated theme reaches readers on the next deploy.
export const GISCUS_THEME_VERSION = createHash('sha256')
  .update(['light', 'dark'].map((theme) => readFileSync(join(process.cwd(), `public/styles/giscus-${theme}.css`), 'utf8')).join(''))
  .digest('hex')
  .slice(0, 8);
