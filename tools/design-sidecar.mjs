// Writes .impeccable/design.json (Impeccable's design sidecar) from DESIGN.md.
// Re-run after editing DESIGN.md: node tools/design-sidecar.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const md = readFileSync('DESIGN.md', 'utf8');
const colors = Object.fromEntries([...md.split('---')[1].matchAll(/^  ([a-z0-9-]+): "(#[0-9A-Fa-f]{6})"$/gm)].map((m) => [m[1], m[2]]));

const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const toHex = (c) => '#' + c.map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0')).join('').toUpperCase();
const mix = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);
// Eight steps dark to light: shades toward near-black, the token itself, then tints toward cream.
const ramp = (h) => {
  const c = hex(h);
  return [0.7, 0.5, 0.3, 0.12].map((t) => toHex(mix(c, [8, 12, 10], t)))
    .concat([0, 0.3, 0.55, 0.8].map((t) => toHex(mix(c, [252, 248, 240], t))));
};
const roleOf = (k) => (k.startsWith('cozy') ? 'cozy'
  : ['forest-aida', 'saffron-aida'].includes(k) ? 'primary'
  : k === 'oxblood-aida' ? 'secondary'
  : k === 'vermilion-floss' ? 'tertiary' : 'neutral');
const titleCase = (k) => k.replace(/-/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase());
const colorMeta = Object.fromEntries(Object.entries(colors).map(([k, v]) => [k, { role: roleOf(k), displayName: titleCase(k), canonical: v, tonalRamp: ramp(v) }]));

const section = (title) => {
  const a = md.indexOf(`## ${title}`);
  const b = md.indexOf('\n## ', a + 3);
  return md.slice(a, b === -1 ? undefined : b);
};
const rules = [];
for (const [title, key] of [['Colors', 'colors'], ['Typography', 'typography'], ['Elevation & Depth', 'elevation']]) {
  for (const m of section(title).matchAll(/\*\*(The [^*]+ Rule)\.\*\* ([^\n]+)/g)) rules.push({ name: m[1], body: m[2], section: key });
}
const bullets = (heading) => [...md.slice(md.indexOf(heading)).split('\n###')[0].matchAll(/^- (.+)$/gm)].map((m) => m[1]);
const overview = section('Overview');

const font = '"Nunito Variable",Nunito,system-ui,sans-serif';
const press = 'transition:transform 160ms cubic-bezier(.23,1,.32,1),background-color 160ms';
const button = (cls, bg, fg, hover, ring) => `.${cls}{display:inline-flex;align-items:center;min-height:54px;padding:0 28px;background:${bg};color:${fg};font:800 17px ${font};text-decoration:none;border-radius:0;${press}}.${cls}:hover{background:${hover}}.${cls}:active{transform:scale(.97)}.${cls}:focus-visible{outline:3px solid ${ring};outline-offset:3px}`;

const sidecar = {
  schemaVersion: 2,
  generatedAt: new Date().toISOString(),
  title: 'Design System: ThreadBind Studios',
  extensions: {
    colorMeta,
    typographyMeta: {
      display: { displayName: 'Stitched display', purpose: 'The page name or one formula per screen, as SVG cross-stitch.' },
      headline: { displayName: 'Headline', purpose: 'Section headings in Fraunces Soft.' },
      title: { displayName: 'Title', purpose: 'Sub-headings, page-head statement lines, FAQ questions.' },
      lead: { displayName: 'Lead', purpose: 'The one sentence under a heading.' },
      body: { displayName: 'Body', purpose: 'Running text, 64-68ch.' },
      label: { displayName: 'Label', purpose: 'Captions, fact terms and notes, in sentence case.' },
    },
    shadows: [],
    motion: [
      { name: 'ease-out', value: 'cubic-bezier(0.23, 1, 0.32, 1)', purpose: 'Every state transition and press.' },
      { name: 'stitch-in', value: '420ms ease-out, staggered 2-10ms per stitch', purpose: 'Top-of-page stitched lettering sewing in.' },
      { name: 'sew', value: '1100ms cubic-bezier(0.45, 0, 0.25, 1), 200ms delay', purpose: 'The opening loom trace drawn along an SVG mask.' },
      { name: 'press', value: 'scale(0.97), 160ms', purpose: 'Button press feedback.' },
    ],
    breakpoints: [
      { name: 'phone-header', value: '520px' },
      { name: 'patches', value: '760px' },
      { name: 'nav', value: '860px' },
      { name: 'stack', value: '900px' },
    ],
  },
  components: [
    { name: 'Primary Button', kind: 'button', refersTo: 'button-primary', description: 'The main action on dark cloth.', html: '<a class="ds-btn" href="#">Join the waitlist</a>', css: button('ds-btn', '#F2B705', '#0E3A25', '#FFC92E', '#F2B705') },
    { name: 'Forest Button', kind: 'button', refersTo: 'button-forest', description: 'The action on saffron cloth.', html: '<a class="ds-btn-forest" href="#">Open the contact form</a>', css: button('ds-btn-forest', '#0E3A25', '#F6EBD3', '#134A30', '#F2B705') },
    { name: 'Trace Button', kind: 'button', refersTo: 'button-trace', description: 'The action on the Weave page, like the game Start button.', html: '<a class="ds-btn-trace" href="#">Join the waitlist</a>', css: button('ds-btn-trace', '#C83A1E', '#FCF5EB', '#A93018', '#F2B8A1') },
    { name: 'Navigation', kind: 'nav', description: 'Wordmark, four links, current page dashed-underlined.', html: '<nav class="ds-nav"><a class="ds-brand" href="#">ThreadBind Studios</a><a href="#" aria-current="page">Weave</a><a href="#">Studio</a><a href="#">Press</a><a href="#">Support</a></nav>', css: `.ds-nav{display:flex;gap:28px;align-items:center;padding:22px 32px;background:#0E3A25;color:#F6EBD3;font:700 18px ${font}}.ds-nav a{color:inherit;text-decoration:none}.ds-nav .ds-brand{font-weight:800;margin-right:auto}.ds-nav a:hover,.ds-nav a[aria-current]{color:#F2B705;text-decoration:underline dashed 2px;text-underline-offset:8px}.ds-nav a:focus-visible{outline:3px solid #F2B705;outline-offset:3px}` },
    { name: 'Cloth Section', kind: 'card', description: 'A full-bleed section of aida cloth with its hole grid.', html: '<section class="ds-cloth"><h2>Bends are the whole trick.</h2><p>Mult is the word length plus one for every 90 degree turn.</p></section>', css: `.ds-cloth{padding:64px 40px;background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='9' height='9'%3E%3Ccircle cx='4.5' cy='4.5' r='1.25' fill='%23462800' fill-opacity='.2'/%3E%3C/svg%3E") 0 0/9px 9px,#F2B705;color:#0E3A25;font:500 18px/1.55 ${font}}.ds-cloth h2{margin:0 0 12px;font:800 40px/1.02 "Fraunces Soft",Georgia,serif}` },
    { name: 'Cozy Loom Tile', kind: 'custom', refersTo: 'loom-tile-cozy', description: 'A letter tile from the Weave loom; traced tiles turn salmon.', html: '<span class="ds-tile">T<small>2</small></span><span class="ds-tile is-traced">H<small>3</small></span>', css: `.ds-tile{position:relative;display:inline-grid;place-items:center;width:56px;height:56px;margin:2px;background:#F9EBD7;color:#023019;border:2px solid #E0D4C2;border-radius:8px;font:800 28px "Fraunces Soft",Georgia,serif}.ds-tile small{position:absolute;right:5px;bottom:2px;font:800 11px ${font};color:#046A38}.ds-tile.is-traced{background:#F2B8A1;color:#F9EBD7}.ds-tile.is-traced small{color:#023019}` },
  ],
  narrative: {
    northStar: 'The Studio Sampler',
    overview: overview.split('**Key Characteristics:**')[0].split('\n\n').slice(2).join('\n\n').trim(),
    keyCharacteristics: [...overview.matchAll(/^- (.+)$/gm)].map((m) => m[1]),
    rules,
    dos: bullets('### Do:'),
    donts: bullets("### Don't:"),
  },
};

writeFileSync('.impeccable/design.json', JSON.stringify(sidecar, null, 2) + '\n');
console.log(`${Object.keys(colorMeta).length} colors, ${rules.length} rules, ${sidecar.narrative.dos.length} dos, ${sidecar.narrative.donts.length} donts, ${sidecar.components.length} components`);
