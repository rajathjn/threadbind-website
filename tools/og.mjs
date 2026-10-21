// Renders the Open Graph images to public/og/*.png with headless Chrome.
// Needs the dev server running (astro dev --background). Run: node tools/og.mjs
import { copyFileSync, mkdirSync, rmSync, existsSync, statSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const chrome = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const route = 'src/pages/og-card/[name].astro';
mkdirSync('src/pages/og-card', { recursive: true });
mkdirSync('public/og', { recursive: true });
copyFileSync('tools/og-card.astro', route);
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
try {
  // Wait until the dev server serves the new route.
  for (let i = 0; i < 60; i++) {
    const res = await fetch('http://localhost:4321/og-card/default/').catch(() => null);
    if (res?.ok) break;
    await wait(500);
  }
  for (const name of ['default', 'weave']) {
    const out = resolve(`public/og/${name}.png`);
    rmSync(out, { force: true });
    const profile = join(tmpdir(), `og-chrome-${name}-${Date.now()}`);
    spawn(chrome, ['--headless=new', `--user-data-dir=${profile}`, '--hide-scrollbars', '--force-device-scale-factor=1',
      '--window-size=1200,630', '--virtual-time-budget=4000', `--screenshot=${out}`, `http://localhost:4321/og-card/${name}/`], { stdio: 'ignore' });
    // Chrome's launcher may hand off and exit early, so wait for the file instead.
    for (let i = 0; i < 100 && !(existsSync(out) && statSync(out).size > 0); i++) await wait(200);
    await wait(400);
    console.log(existsSync(out) ? `wrote ${out}` : `FAILED ${name}`);
  }
} finally {
  rmSync('src/pages/og-card', { recursive: true, force: true });
}
