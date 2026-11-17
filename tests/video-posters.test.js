import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

// A video without a poster shows a blank box until it loads, and a poster on
// <source> is ignored; 24 tags carried theirs there until 2026-11-17.
test('every issue video has a poster on the video element', () => {
  const missing = [];
  for (const dir of ['src/pages/posts', 'src/pages/en/posts']) {
    for (const name of fs.readdirSync(dir).filter((file) => file.endsWith('.md'))) {
      const source = fs.readFileSync(path.join(dir, name), 'utf8');
      for (const open of source.match(/<video\b[^>]*>/g) ?? []) {
        const poster = open.match(/\bposter="([^"]+)"/)?.[1];
        if (!poster) missing.push(`${name}: no poster`);
        else if (poster.startsWith('https://weekly.tw93.fun/assets/posters/') && !fs.existsSync(path.join('public', new URL(poster).pathname))) missing.push(`${name}: ${poster} not in public/`);
      }
    }
  }
  assert.deepEqual(missing, [], 'run node scripts/add-video-posters.js');
});
