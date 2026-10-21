// Builds the favicon set and press logo files from the ThreadBind lattice geometry
// (the same bars as src/components/Mark.astro). Run: node tools/brand-assets.mjs
import sharp from 'sharp';
import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { stitchText, stitchLattice } from '../src/lib/stitch.mjs';

const FOREST = '#0E3A25', SAFFRON = '#F2B705', OXBLOOD = '#5C2230', FLOSS = '#F6EBD3';

function latticeRects() {
  const N = 4, cell = 17, origin = 50 - (N * cell) / 2, out = [];
  for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
    const cx = origin + j * cell + cell / 2, cy = origin + i * cell + cell / 2;
    for (const o of [-3.6, 3.6]) {
      out.push((i + j) % 2 === 0
        ? `<rect x="${cx - 7}" y="${cy + o - 2.3}" width="14" height="4.6"/>`
        : `<rect x="${cx + o - 2.3}" y="${cy - 7}" width="4.6" height="14"/>`);
    }
  }
  return out.join('');
}

// scale: how much of the canvas the lattice fills; bg: optional rounded tile behind it.
function svg({ fg, bg, scale = 1, radius = 0 }) {
  const s = scale, t = (100 - 100 * s) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">${bg ? `<rect width="100" height="100" rx="${radius}" fill="${bg}"/>` : ''}<g transform="translate(${t} ${t}) scale(${s})"><g transform="rotate(45 50 50)" fill="${fg}">${latticeRects()}</g></g></svg>`;
}

const png = (markup, size) => sharp(Buffer.from(markup), { density: 72 * (size / 100) * 4 }).resize(size, size).png().toBuffer();

// A .ico is a small directory of PNGs.
function ico(images) {
  const header = Buffer.alloc(6 + images.length * 16);
  header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(images.length, 4);
  let offset = header.length;
  images.forEach(({ size, data }, i) => {
    const e = 6 + i * 16;
    header.writeUInt8(size >= 256 ? 0 : size, e); header.writeUInt8(size >= 256 ? 0 : size, e + 1);
    header.writeUInt16LE(1, e + 4); header.writeUInt16LE(32, e + 6);
    header.writeUInt32LE(data.length, e + 8); header.writeUInt32LE(offset, e + 12);
    offset += data.length;
  });
  return Buffer.concat([header, ...images.map((i) => i.data)]);
}

mkdirSync('public/press', { recursive: true });
const tile = svg({ fg: SAFFRON, bg: FOREST, scale: 1.12, radius: 18 });
writeFileSync('public/favicon.svg', tile);
writeFileSync('public/favicon.ico', ico(await Promise.all([16, 32, 48].map(async (size) => ({ size, data: await png(tile, size) })))));
const square = svg({ fg: SAFFRON, bg: FOREST, scale: 1.0 });
writeFileSync('public/apple-touch-icon.png', await png(square, 180));
writeFileSync('public/icon-192.png', await png(square, 192));
writeFileSync('public/icon-512.png', await png(square, 512));
writeFileSync('public/icon-maskable-512.png', await png(svg({ fg: SAFFRON, bg: FOREST, scale: 0.78 }), 512));
writeFileSync('public/site.webmanifest', JSON.stringify({
  name: 'ThreadBind Studios', short_name: 'ThreadBind', start_url: '/', display: 'browser',
  background_color: FOREST, theme_color: FOREST,
  icons: [
    { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
  ],
}, null, 2));

const plain = svg({ fg: OXBLOOD, scale: 1.12 });
writeFileSync('public/press/threadbind-lattice.svg', plain);
writeFileSync('public/press/threadbind-lattice-saffron-on-forest-1024.png', await png(svg({ fg: SAFFRON, bg: FOREST, scale: 0.9 }), 1024));
// The stitched logo: the lattice in half-stitches, with the cross-stitched wordmark below it.
const sewn = (geo, color, x, y, scale) => `<g transform="translate(${x} ${y}) scale(${scale})" fill="none" stroke="${color}" stroke-width="${geo.strokeWidth}" stroke-linecap="round">${geo.stitches.flat().map((d) => `<path d="${d}"/>`).join('')}</g>`;
const lattice = stitchLattice(), word = stitchText('ThreadBind'), studios = stitchText('Studios');
const markSvg = (color, bg) => {
  const pad = 40, size = lattice.width + pad * 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">${bg ? `<rect width="${size}" height="${size}" fill="${bg}"/>` : ''}${sewn(lattice, color, pad, pad, 1)}</svg>`;
};
const logoSvg = (mark, letters, accent, bg) => {
  const W = 760, markSize = 420, wordW = 640, wordScale = wordW / word.width, subScale = wordScale * 0.62;
  const wordY = 80 + markSize + 70, subY = wordY + word.height * wordScale + 34, H = subY + studios.height * subScale + 80;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">${bg ? `<rect width="${W}" height="${H}" fill="${bg}"/>` : ''}`
    + sewn(lattice, mark, (W - markSize) / 2, 80, markSize / lattice.width)
    + sewn(word, letters, (W - wordW) / 2, wordY, wordScale)
    + sewn(studios, accent, (W - studios.width * subScale) / 2, subY, subScale) + '</svg>';
};
const pngAt = (markup, width) => sharp(Buffer.from(markup), { density: 300 }).resize({ width }).png().toBuffer();
const files = {
  'threadbind-mark-stitched.svg': markSvg(FLOSS, FOREST),
  'threadbind-mark-stitched-transparent.svg': markSvg(OXBLOOD),
  'threadbind-logo-stitched.svg': logoSvg(FLOSS, FLOSS, SAFFRON, FOREST),
  'threadbind-logo-stitched-transparent.svg': logoSvg(OXBLOOD, OXBLOOD, '#B83420'),
};
for (const [name, markup] of Object.entries(files)) {
  writeFileSync(`public/press/${name}`, markup);
  writeFileSync(`public/press/${name.replace('.svg', '-2048.png')}`, await pngAt(markup, 2048));
}
rmSync('public/press/threadbind-logo-splash.png', { force: true });
console.log('brand assets written');
