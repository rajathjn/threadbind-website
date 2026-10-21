// Checks every built page for the launch basics. Run after `npm run build`: node tools/audit-dist.mjs
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const walk = (d) => readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(d, e.name)) : [join(d, e.name)]));
let problems = 0;
for (const file of walk('dist').filter((f) => f.endsWith('.html'))) {
  const html = readFileSync(file, 'utf8');
  const imgs = [...html.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
  const checks = {
    'google tag first in head': /<head>\s*<!-- Google tag \(gtag\.js\) -->\s*<script async src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-7149QJJGP9">/.test(html),
    'exactly one google tag': (html.match(/gtag\/js\?id=/g) || []).length === 1,
    title: /<title>[^<]{10,}<\/title>/.test(html),
    description: /<meta name="description" content="[^"]{50,}"/.test(html),
    canonical: /<link rel="canonical" href="https:\/\/threadbindstudios\.com\//.test(html),
    'og:image': /<meta property="og:image" content="https:\/\/threadbindstudios\.com\/og\/[a-z]+\.png"/.test(html),
    favicon: /rel="icon" href="\/favicon\.svg"/.test(html),
    'alt on every image': imgs.every((i) => /\balt="[^"]+"/.test(i)),
  };
  const failed = Object.entries(checks).filter(([, ok]) => !ok).map(([k]) => k);
  problems += failed.length;
  console.log(`${failed.length ? 'FAIL' : 'ok  '} ${file.split(join('a', 'b').slice(1, -1)).join('/')}  (${imgs.length} images)${failed.length ? '  -> ' + failed.join(', ') : ''}`);
}
process.exitCode = problems ? 1 : 0;
