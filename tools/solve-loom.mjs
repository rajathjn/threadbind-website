// Finds every word traceable on the demo loom with Weave's rules (orthogonal,
// no reused cell, length 3-8) against Weave's validation lexicon.
// Usage: node tools/solve-loom.mjs <path to Weave/data/words.gd> > src/data/loom-words.json
import { readFileSync } from 'node:fs';
import { LOOM } from '../src/data/loom.mjs';

const words = new Set();
for (const m of readFileSync(process.argv[2], 'utf8').matchAll(/^"([a-z]+)": true,$/gm)) {
  if (m[1].length >= 3 && m[1].length <= 8) words.add(m[1]);
}
const prefixes = new Set();
for (const w of words) for (let i = 1; i <= w.length; i++) prefixes.add(w.slice(0, i));

const rows = LOOM.length, cols = LOOM[0].length;
const found = new Set();
function walk(r, c, word, seen) {
  const ch = LOOM[r][c];
  if (!ch) return;
  const next = word + ch.toLowerCase();
  if (!prefixes.has(next)) return;
  if (words.has(next)) found.add(next);
  if (next.length === 8) return;
  seen.add(r * cols + c);
  for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
    const nr = r + dr, nc = c + dc;
    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !seen.has(nr * cols + nc)) walk(nr, nc, next, seen);
  }
  seen.delete(r * cols + c);
}
for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) walk(r, c, '', new Set());
process.stdout.write(JSON.stringify([...found].sort()));
