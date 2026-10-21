import type { APIRoute } from 'astro';

// Every public page. Add new pages here; the 404 page stays out.
const pages = [
  { path: '/', priority: '1.0' },
  { path: '/weave/', priority: '0.9' },
  { path: '/about/', priority: '0.7' },
  { path: '/press/', priority: '0.6' },
  { path: '/support/', priority: '0.6' },
  { path: '/privacy/', priority: '0.3' },
  { path: '/terms/', priority: '0.3' },
  { path: '/content-policy/', priority: '0.3' },
];
const lastmod = new Date().toISOString().slice(0, 10);

export const GET: APIRoute = ({ site }) => new Response(
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages
    .map((p) => `  <url><loc>${new URL(p.path, site).href}</loc><lastmod>${lastmod}</lastmod><priority>${p.priority}</priority></url>`)
    .join('\n')}\n</urlset>\n`,
  { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
);
