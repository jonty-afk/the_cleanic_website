// Builds the static site: renders every page in src/pages to plain HTML at the
// project root (the directory Vercel serves), then writes sitemap.xml, robots.txt
// and site.webmanifest. Run `npm run build` (CSS first, then this script).
import { writeFileSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { site } from '../src/data/site.mjs';
import { services } from '../src/data/services.mjs';
import { page } from '../src/lib/layout.mjs';
import * as home from '../src/pages/index.mjs';
import * as airbnbPage from '../src/pages/airbnb-cleaning.mjs';
import * as servicesPage from '../src/pages/services.mjs';
import * as about from '../src/pages/about.mjs';
import * as contact from '../src/pages/contact.mjs';
import * as quote from '../src/pages/get-a-quote.mjs';
import * as howItWorks from '../src/pages/how-it-works.mjs';
import * as checklist from '../src/pages/airbnb-turnover-checklist.mjs';
import { thankYou, notFound, termsPage } from '../src/pages/misc.mjs';
import { serviceMeta, renderService } from '../src/pages/_service.mjs';

const root = new URL('../', import.meta.url);
const hash = (p) => createHash('sha1').update(readFileSync(new URL(p, root))).digest('hex').slice(0, 10);
const assets = { css: hash('assets/css/site.css'), js: hash('assets/js/site.js') };

const pages = [
  home, airbnbPage, servicesPage, howItWorks, checklist, about, contact, quote, thankYou, notFound, termsPage,
  ...services.map((s) => ({ meta: serviceMeta(s), render: () => renderService(s) })),
];

const minify = (html) => html.replace(/\n\s*\n/g, '\n').replace(/>\s+</g, (m) => (m.includes('\n') ? '>\n<' : m));

for (const p of pages) {
  const html = page({ ...p.meta, body: p.render() }, assets);
  writeFileSync(new URL(p.meta.out, root), minify(html));
}

// Sitemap (indexable pages only)
const today = new Date().toISOString().slice(0, 10);
const priority = (path) => (path === '/' ? '1.0' : path === '/airbnb-cleaning' ? '0.9' : path === '/get-a-quote' || path === '/services' || path === '/how-it-works' ? '0.8' : '0.6');
const urls = pages.filter((p) => !p.meta.noindex).map((p) => p.meta.path);
writeFileSync(new URL('sitemap.xml', root), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${site.url}${u === '/' ? '/' : u}</loc><lastmod>${today}</lastmod><priority>${priority(u)}</priority></url>`).join('\n')}
</urlset>
`);

writeFileSync(new URL('robots.txt', root), `User-agent: *
Allow: /
Disallow: /thank-you

Sitemap: ${site.url}/sitemap.xml
`);

writeFileSync(new URL('site.webmanifest', root), JSON.stringify({
  name: 'The Cleanic', short_name: 'The Cleanic', start_url: '/', display: 'browser',
  background_color: '#F5F1EA', theme_color: '#F5F1EA',
  icons: [{ src: '/assets/brand/icon-192.png', sizes: '192x192', type: 'image/png' }, { src: '/assets/brand/icon-512.png', sizes: '512x512', type: 'image/png' }],
}, null, 2) + '\n');

if (site.forms.accessKey.startsWith('REPLACE')) console.warn('WARNING: Web3Forms access key not set in src/data/site.mjs — forms will not deliver.');
console.log(`Built ${pages.length} pages · css ${assets.css} · js ${assets.js}`);
