// A playable Weave loom. Rules from Weave's design.md: orthogonal steps only,
// no reused cell, words of 3-8 letters, score = base x (length + bends).
// Markup contract: [data-loom] holds .loom-grid, svg.loom-path, [data-out=*] fields
// and optional [data-act=submit|clear] buttons. Styling belongs to the page.
import { LOOM, LETTER_VALUES } from '../data/loom.mjs';
import WORDS from '../data/loom-words.json';

const DICTIONARY = new Set(WORDS);
const STEPS = [[1, 0], [-1, 0], [0, 1], [0, -1]];
const DEMO = [[0, 1], [0, 2], [0, 3], [1, 3], [2, 3], [2, 4]]; // THREAD

export function countBends(path) {
  let bends = 0;
  for (let i = 1; i < path.length - 1; i++) {
    const a = [path[i][0] - path[i - 1][0], path[i][1] - path[i - 1][1]];
    const b = [path[i + 1][0] - path[i][0], path[i + 1][1] - path[i][1]];
    if (a[0] !== b[0] || a[1] !== b[1]) bends++;
  }
  return bends;
}

export function scorePath(path) {
  const word = path.map(([r, c]) => LOOM[r][c]).join('');
  const base = [...word].reduce((sum, ch) => sum + LETTER_VALUES[ch], 0);
  const bends = countBends(path);
  const mult = word.length + bends;
  return { word, base, bends, length: word.length, mult, score: base * mult };
}

function bendIndexes(path) {
  const out = new Set();
  for (let i = 1; i < path.length - 1; i++) {
    const a = [path[i][0] - path[i - 1][0], path[i][1] - path[i - 1][1]];
    const b = [path[i + 1][0] - path[i][0], path[i + 1][1] - path[i][1]];
    if (a[0] !== b[0] || a[1] !== b[1]) out.add(i);
  }
  return out;
}

// Rounded-corner path through cell centres; the corner radius reads as track.
function pathData(points, radius) {
  if (points.length === 0) return '';
  if (points.length === 1) return `M${points[0].x} ${points[0].y}l0.01 0`;
  let d = `M${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length - 1; i++) {
    const p = points[i], prev = points[i - 1], next = points[i + 1];
    const inX = Math.sign(p.x - prev.x), inY = Math.sign(p.y - prev.y);
    const outX = Math.sign(next.x - p.x), outY = Math.sign(next.y - p.y);
    if (inX === outX && inY === outY) { d += `L${p.x} ${p.y}`; continue; }
    d += `L${p.x - inX * radius} ${p.y - inY * radius}Q${p.x} ${p.y} ${p.x + outX * radius} ${p.y + outY * radius}`;
  }
  const last = points[points.length - 1];
  return d + `L${last.x} ${last.y}`;
}

export function mountLoom(root) {
  if (root.dataset.loomReady) return;
  root.dataset.loomReady = 'true';
  root.classList.add('is-fresh'); // lets pages animate the opening demo trace once
  const settle = () => root.classList.remove('is-fresh');
  root.addEventListener('pointerdown', settle, { once: true });
  root.addEventListener('keydown', settle, { once: true });
  const grid = root.querySelector('.loom-grid');
  const svg = root.querySelector('svg.loom-path');
  const out = (name) => root.querySelectorAll(`[data-out="${name}"]`);
  const set = (name, value) => out(name).forEach((el) => { el.textContent = value; });
  const rows = LOOM.length, cols = LOOM[0].length;
  const cells = [];
  let path = [];
  let dragging = false;
  let moved = false;
  let committed = false; // the drawn path has already been scored
  const found = new Map();
  const maskId = `sew-${Math.random().toString(36).slice(2, 8)}`;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  grid.style.setProperty('--cols', cols);
  grid.style.setProperty('--rows', rows);
  LOOM.forEach((row, r) => row.forEach((ch, c) => {
    const cell = document.createElement(ch ? 'button' : 'span');
    cell.className = ch ? 'cell' : 'cell is-hole';
    cell.dataset.r = r;
    cell.dataset.c = c;
    if (ch) {
      cell.type = 'button';
      cell.innerHTML = `<span class="cell-letter">${ch}</span><span class="cell-value">${LETTER_VALUES[ch]}</span>`;
      cell.setAttribute('aria-label', `${ch}, worth ${LETTER_VALUES[ch]}, row ${r + 1} column ${c + 1}`);
      cell.tabIndex = r === 0 && c === 0 ? 0 : -1;
    } else {
      cell.setAttribute('aria-hidden', 'true');
    }
    grid.appendChild(cell);
    cells.push(cell);
  }));
  const cellAt = (r, c) => cells[r * cols + c];
  const inPath = (r, c) => path.findIndex(([pr, pc]) => pr === r && pc === c);
  const adjacent = (a, b) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) === 1;

  function draw() {
    const bends = bendIndexes(path);
    cells.forEach((cell) => cell.classList.remove('is-traced', 'is-bend', 'is-head', 'is-start'));
    path.forEach(([r, c], i) => {
      const cell = cellAt(r, c);
      cell.classList.add('is-traced');
      if (i === 0) cell.classList.add('is-start');
      if (bends.has(i)) cell.classList.add('is-bend');
      if (i === path.length - 1) cell.classList.add('is-head');
    });
    if (svg) {
      const box = grid.getBoundingClientRect();
      svg.setAttribute('viewBox', `0 0 ${box.width} ${box.height}`);
      const points = path.map(([r, c]) => {
        const rect = cellAt(r, c).getBoundingClientRect();
        return { x: rect.left - box.left + rect.width / 2, y: rect.top - box.top + rect.height / 2 };
      });
      const radius = cells[0].getBoundingClientRect().width * 0.32;
      const d = pathData(points, radius);
      const fresh = root.classList.contains('is-fresh') && !reducedMotion;
      svg.innerHTML = fresh
        ? `<mask id="${maskId}" maskUnits="userSpaceOnUse"><path class="trace-sew" d="${d}" pathLength="1"/></mask><path class="trace-casing" d="${d}" mask="url(#${maskId})"/><path class="trace" d="${d}" mask="url(#${maskId})"/>`
        : `<path class="trace-casing" d="${d}"/><path class="trace" d="${d}"/>`;
    }
    const s = scorePath(path);
    set('word', s.word || '—');
    set('base', path.length ? s.base : 0);
    set('length', s.length);
    set('bends', s.bends);
    set('mult', path.length ? s.mult : 0);
    set('score', path.length ? s.score : 0);
    root.toggleAttribute('data-tracing', path.length > 0);
  }

  function status(text, tone = '', spoken = text) {
    set('status', text);
    set('announce', spoken);
    out('status').forEach((el) => { el.dataset.tone = tone; });
  }

  function renderFound() {
    const total = [...found.values()].reduce((sum, s) => sum + s.score, 0);
    set('total', total);
    set('count', found.size);
    out('found').forEach((list) => {
      list.innerHTML = [...found.values()].reverse().slice(0, 6).map((s) =>
        `<li><span class="found-word">${s.word}</span><span class="found-bends">${s.bends} ${s.bends === 1 ? 'bend' : 'bends'}</span><span class="found-score">${s.score}</span></li>`,
      ).join('');
    });
  }

  function submit() {
    if (!path.length) return;
    const s = scorePath(path);
    const key = s.word.toLowerCase();
    if (s.length < 3) status('Words need at least 3 letters.', 'warn');
    else if (!DICTIONARY.has(key)) status(`${s.word} isn't in Weave's dictionary.`, 'warn');
    else if (found.has(key)) status(`${s.word} already scored. A word scores once per loom.`, 'warn');
    else {
      found.set(key, s);
      committed = true;
      status(`Scored. Find another.`, 'ok', `${s.word} scores ${s.base} times ${s.mult}, ${s.score}.`);
      renderFound();
      root.dispatchEvent(new CustomEvent('loom:score', { detail: s }));
      root.classList.remove('just-scored');
      void root.offsetWidth;
      root.classList.add('just-scored');
      return;
    }
    root.classList.remove('just-missed');
    void root.offsetWidth;
    root.classList.add('just-missed');
  }

  function extendTo(r, c) {
    if (!LOOM[r][c]) return;
    const i = inPath(r, c);
    if (i !== -1 && i === path.length - 2) { path.pop(); draw(); return; } // backtrack
    if (i !== -1) return;
    const last = path[path.length - 1];
    if (last && !adjacent(last, [r, c])) return;
    if (path.length >= 8) return;
    path.push([r, c]);
    draw();
  }

  const cellFromEvent = (e) => e.target.closest?.('.cell:not(.is-hole)');
  let down = null;

  grid.addEventListener('pointerdown', (e) => {
    const cell = cellFromEvent(e);
    if (!cell) return;
    down = [+cell.dataset.r, +cell.dataset.c];
    dragging = true;
    moved = false;
    grid.setPointerCapture(e.pointerId);
  });

  grid.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const hit = document.elementFromPoint(e.clientX, e.clientY)?.closest('.cell:not(.is-hole)');
    if (!hit || !grid.contains(hit)) return;
    // Only count a cell once the finger is well inside it, so corners don't slip diagonally.
    const rect = hit.getBoundingClientRect();
    const dx = Math.abs(e.clientX - (rect.left + rect.width / 2)) / rect.width;
    const dy = Math.abs(e.clientY - (rect.top + rect.height / 2)) / rect.height;
    if (dx > 0.38 || dy > 0.38) return;
    const r = +hit.dataset.r, c = +hit.dataset.c;
    if (!moved) {
      if (r === down[0] && c === down[1]) return;
      // The pointer left its first cell: this is a drag, so start a fresh trace there.
      moved = true;
      committed = false;
      path = [down];
      status('Keep going: up, down, left or right. Lift to score.');
    }
    extendTo(r, c);
  });

  grid.addEventListener('pointerup', (e) => {
    if (!dragging) return;
    dragging = false;
    if (grid.hasPointerCapture?.(e.pointerId)) grid.releasePointerCapture(e.pointerId);
    if (moved) { if (path.length > 1) submit(); else draw(); return; }
    // A tap: score on the head, step back on the previous cell, extend to a neighbour, else start over.
    const [r, c] = down;
    if (committed) { committed = false; path = [[r, c]]; draw(); status('Tap a neighbouring letter to continue. Tap the last letter again to score.'); return; }
    const last = path[path.length - 1];
    if (last && last[0] === r && last[1] === c && path.length > 1) { submit(); return; }
    if (inPath(r, c) === path.length - 2 && path.length > 1) { path.pop(); draw(); return; }
    if (last && adjacent(last, [r, c]) && inPath(r, c) === -1 && path.length < 8) { path.push([r, c]); draw(); }
    else { path = [[r, c]]; draw(); }
    status('Tap a neighbouring letter to continue. Tap the last letter again to score.');
  });
  grid.addEventListener('pointercancel', () => { dragging = false; draw(); });

  // Keyboard: arrows move focus, Enter or Space adds the letter, Enter on the head scores.
  grid.addEventListener('keydown', (e) => {
    const cell = e.target.closest('.cell');
    if (!cell) return;
    let r = +cell.dataset.r, c = +cell.dataset.c;
    const moves = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] };
    if (moves[e.key]) {
      e.preventDefault();
      do { r += moves[e.key][0]; c += moves[e.key][1]; } while (r >= 0 && r < rows && c >= 0 && c < cols && !LOOM[r][c]);
      if (r < 0 || r >= rows || c < 0 || c >= cols) return;
      cells.forEach((el) => { if (el.tabIndex === 0) el.tabIndex = -1; });
      cellAt(r, c).tabIndex = 0;
      cellAt(r, c).focus();
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const last = path[path.length - 1];
      if (last && last[0] === r && last[1] === c) { submit(); return; }
      if (last && adjacent(last, [r, c]) && inPath(r, c) === -1) extendTo(r, c);
      else { path = [[r, c]]; draw(); }
      status('Arrow to a neighbour and press Enter. Enter on the last letter scores.');
    } else if (e.key === 'Escape') {
      path = []; draw(); status('Cleared.');
    }
  });

  root.querySelectorAll('[data-act="submit"]').forEach((b) => b.addEventListener('click', submit));
  root.querySelectorAll('[data-act="clear"]').forEach((b) => b.addEventListener('click', () => {
    path = []; draw(); status('Cleared. Drag across the letters to trace a word.');
  }));

  // Open on THREAD so the mechanism is visible before anyone touches it.
  path = DEMO.map((p) => [...p]);
  const demo = scorePath(path);
  found.set('thread', demo);
  renderFound();
  committed = true;
  draw();
  status('Your turn: drag a word.', 'ok', `THREAD is traced with two bends: ${demo.base} times ${demo.mult}, ${demo.score}. Your turn: drag a word.`);
  // The opening score counts up as the trace finishes sewing.
  if (!reducedMotion) {
    const targets = [...out('score')];
    const start = performance.now() + 700;
    const tick = (now) => {
      const t = Math.min(1, Math.max(0, (now - start) / 600));
      if (!root.classList.contains('is-fresh') && t < 1) { targets.forEach((el) => { el.textContent = scorePath(path).score; }); return; }
      targets.forEach((el) => { el.textContent = Math.round(demo.score * (1 - (1 - t) ** 3)); });
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  new ResizeObserver(() => draw()).observe(grid);
}

export function mountAllLooms(scope = document) {
  scope.querySelectorAll('[data-loom]').forEach(mountLoom);
}
