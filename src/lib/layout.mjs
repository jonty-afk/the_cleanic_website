import { site } from '../data/site.mjs';
import { airbnb, services, groups } from '../data/services.mjs';
import { esc, icon, mark } from './html.mjs';

const nav = [
  ['/airbnb-cleaning', 'Airbnb cleaning'],
  ['/services', 'Services'],
  ['/how-it-works', 'How it works'],
  ['/about', 'About'],
  ['/contact', 'Contact'],
];

export const businessSchema = () => ({
  '@type': 'LocalBusiness',
  '@id': `${site.url}/#business`,
  name: site.name,
  description: 'Airbnb and short-stay turnover cleaning, plus home and property cleaning, in Auckland.',
  url: `${site.url}/`,
  logo: `${site.url}/assets/brand/icon-512.png`,
  image: `${site.url}/assets/img/og.jpg`,
  telephone: site.phone.schema,
  email: site.email,
  address: { '@type': 'PostalAddress', addressLocality: 'Auckland', addressRegion: 'Auckland', addressCountry: 'NZ' },
  areaServed: { '@type': 'City', name: 'Auckland' },
  openingHoursSpecification: site.hours.map((h) => ({
    '@type': 'OpeningHoursSpecification', dayOfWeek: h.schema.days, opens: h.schema.opens, closes: h.schema.closes,
  })),
  paymentAccepted: site.payment.join(', '),
  sameAs: site.social.map((s) => s.url),
});

const breadcrumbSchema = (crumbs) => ({
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map(([path, name], i) => ({ '@type': 'ListItem', position: i + 1, name, item: `${site.url}${path}` })),
});

function head(p, assets) {
  const canonical = `${site.url}${p.path === '/' ? '/' : p.path}`;
  const ogImage = `${site.url}${p.ogImage || '/assets/img/og.jpg'}`;
  const graph = [...(p.schema || [])];
  if (p.crumbs) graph.push(breadcrumbSchema([['/', 'Home'], ...p.crumbs]));
  const ld = graph.length ? `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}</script>` : '';
  const preload = (p.preload || []).map((h) => `<link rel="preload" as="image" ${h}>`).join('');
  return `<!doctype html>
<html lang="en-NZ">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.description)}">
${p.noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${canonical}">`}
<meta name="theme-color" content="#F5F1EA">
<meta property="og:type" content="website">
<meta property="og:site_name" content="The Cleanic">
<meta property="og:locale" content="en_NZ">
<meta property="og:title" content="${esc(p.ogTitle || p.title)}">
<meta property="og:description" content="${esc(p.description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${ogImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="A freshly made bed in a calm, sunlit bedroom">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(p.ogTitle || p.title)}">
<meta name="twitter:description" content="${esc(p.description)}">
<meta name="twitter:image" content="${ogImage}">
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/assets/brand/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/assets/brand/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preload" href="/assets/fonts/instrument-serif.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/hanken-grotesk-var.woff2" as="font" type="font/woff2" crossorigin>
${preload}
<link rel="stylesheet" href="/assets/css/site.css?v=${assets.css}">
<script>document.documentElement.classList.add('js')</script>
<script src="/assets/js/site.js?v=${assets.js}" defer></script>
<script>window.va=window.va||function(){(window.vaq=window.vaq||[]).push(arguments)};if(!/^(localhost|127\.)/.test(location.hostname)){var s=document.createElement('script');s.defer=1;s.src='/_vercel/insights/script.js';document.head.appendChild(s)}</script>
${ld}
</head>`;
}

const servicesDropdown = (cur) => `
<li class="has-dropdown relative">
  <a class="nav-link inline-flex items-center gap-1.5" href="/services"${cur}>Services<svg class="h-2 w-2.5" viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="m1 1 4 4 4-4"/></svg></a>
  <div class="dropdown-panel absolute left-1/2 top-full w-[54rem] -translate-x-1/2 pt-5">
    <div class="grid grid-cols-[15rem_1fr] border border-line bg-linen shadow-[0_24px_48px_-24px_rgba(27,32,38,.25)]">
      <a href="/airbnb-cleaning" class="group flex flex-col justify-between gap-6 bg-night p-7 text-linen">
        <span><span class="eyebrow !text-night-mute">Our speciality</span><span class="mt-4 block font-serif text-[1.75rem] leading-tight">Airbnb &amp; short-stay turnovers</span></span>
        <span class="inline-flex items-center gap-2 text-[0.875rem] font-semibold">From ${airbnb.price.replace('From ', '')} ${icon.arrow}</span>
      </a>
      <div class="grid grid-cols-3 gap-6 p-7">
        ${groups.map((g) => `<div><p class="fine font-semibold uppercase tracking-[0.12em]">${g}</p><ul class="mt-3 grid gap-2" role="list">${services.filter((sv) => sv.group === g).map((sv) => `<li><a class="text-[0.9375rem] text-ink-soft transition-colors hover:text-ink" href="/${sv.slug}">${sv.name}</a></li>`).join('')}</ul></div>`).join('')}
      </div>
    </div>
  </div>
</li>`;

function header(p) {
  const current = (href) => (p.path === href || (href !== '/' && p.path.startsWith(href + '/')) || (href === '/services' && p.isService) ? ' aria-current="page"' : '');
  return `
<a href="#main" class="sr-only-focusable fixed left-4 top-3 z-[80] bg-ink px-4 py-2 text-sm font-semibold text-linen">Skip to content</a>
<header class="site-header fixed inset-x-0 top-0 z-50 border-b border-transparent" data-header>
  <div class="wrap flex h-full items-center justify-between gap-6">
    <a href="/" class="flex items-center gap-3 text-ink" aria-label="The Cleanic — home">
      ${mark('h-8 w-auto text-navy', 'm-head')}
      <span class="font-serif text-[1.625rem] leading-none tracking-[-0.01em]">The Cleanic</span>
    </a>
    <nav aria-label="Main" class="hidden lg:block">
      <ul class="flex items-center gap-7 xl:gap-9" role="list">
        ${nav.map(([h, l]) => (h === '/services' ? servicesDropdown(current(h)) : `<li><a class="nav-link" href="${h}"${current(h)}>${l}</a></li>`)).join('')}
      </ul>
    </nav>
    <div class="flex items-center gap-3 sm:gap-5">
      <a href="tel:${site.phone.tel}" class="hidden items-center gap-2 text-[0.9375rem] font-medium text-ink-soft transition-colors hover:text-ink xl:inline-flex">${icon.phone}${site.phone.display}</a>
      <a href="/get-a-quote" class="btn btn-primary btn-sm hidden sm:inline-flex"${p.path === '/get-a-quote' ? ' aria-current="page"' : ''}>Get a quote</a>
      <button type="button" class="-mr-2 flex h-11 items-center gap-3 px-2 text-[0.9375rem] font-medium text-ink lg:hidden" aria-expanded="false" aria-controls="site-menu" data-menu-toggle>
        <span data-menu-label>Menu</span>
        <span class="menu-icon grid gap-[6px]" aria-hidden="true"><span></span><span></span></span>
      </button>
    </div>
  </div>
</header>
<div id="site-menu" class="menu-panel fixed inset-0 z-40 flex flex-col overflow-y-auto bg-linen pt-[76px] lg:hidden" role="dialog" aria-modal="true" aria-label="Menu" data-menu>
  <nav aria-label="Mobile" class="wrap flex flex-1 flex-col pb-8 pt-6">
    <ul class="border-t border-line" role="list">
      ${[['/', 'Home'], ...nav, ['/get-a-quote', 'Get a quote']].map(([h, l], i) => `<li class="menu-item border-b border-line" style="transition-delay:${60 + i * 45}ms"><a href="${h}" class="flex items-center justify-between py-4 font-serif text-[2rem] leading-tight text-ink"${current(h)}>${l}${icon.arrow}</a></li>`).join('')}
    </ul>
    <div class="menu-item pt-8" style="transition-delay:330ms">
      <p class="eyebrow">All services</p>
      <ul class="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-[0.9375rem]" role="list">
        ${[['/airbnb-cleaning', 'Airbnb & short-stay'], ...services.map((sv) => [`/${sv.slug}`, sv.name])].map(([h, l]) => `<li><a class="text-ink-soft" href="${h}">${l}</a></li>`).join('')}
      </ul>
    </div>
    <div class="menu-item mt-auto grid gap-4 pt-10" style="transition-delay:360ms">
      <a href="/get-a-quote" class="btn btn-primary w-full">Get a quote ${icon.arrow}</a>
      <a href="tel:${site.phone.tel}" class="btn btn-outline w-full">${icon.phone} Call ${site.phone.display}</a>
      <p class="fine text-center">${site.hours.map((h) => `${h.short} ${h.time}`).join(' · ')}</p>
    </div>
  </nav>
</div>`;
}

function footer() {
  const svc = services.filter((s) => s.slug !== 'commercial-cleaning');
  return `
<footer class="on-dark bg-night text-linen" data-footer>
  <div class="wrap pb-28 pt-20 md:pb-12 md:pt-28">
    <div class="grid gap-14 lg:grid-cols-12">
      <div class="lg:col-span-5">
        <a href="/" class="inline-flex items-center gap-3" aria-label="The Cleanic — home">
          ${mark('h-9 w-auto text-linen', 'm-foot')}
          <span class="font-serif text-[1.75rem] leading-none">The Cleanic</span>
        </a>
        <p class="mt-8 max-w-sm font-serif text-[1.75rem] leading-[1.15] text-linen/90">Airbnb &amp; short-stay cleaning in Auckland.</p>
        <a href="/get-a-quote" class="btn btn-light mt-9">Get a quote ${icon.arrow}</a>
      </div>
      <div class="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-7">
        <div>
          <h2 class="eyebrow">Speciality</h2>
          <ul class="mt-6 grid gap-3 text-[0.9375rem]" role="list">
            <li><a class="text-linen/80 transition-colors hover:text-linen" href="/airbnb-cleaning">Airbnb &amp; short-stay</a></li>
            <li><a class="text-linen/80 transition-colors hover:text-linen" href="/airbnb-turnover-checklist">Host turnover checklist</a></li>
            <li><a class="text-linen/80 transition-colors hover:text-linen" href="/commercial-cleaning">Commercial cleaning</a></li>
            <li><a class="text-linen/80 transition-colors hover:text-linen" href="/services">All services</a></li>
          </ul>
        </div>
        <div>
          <h2 class="eyebrow">Company</h2>
          <ul class="mt-6 grid gap-3 text-[0.9375rem]" role="list">
            ${[['/about', 'About'], ['/how-it-works', 'How it works'], ['/contact', 'Contact'], ['/get-a-quote', 'Get a quote'], ['/terms', 'Terms & conditions']].map(([h, l]) => `<li><a class="text-linen/80 transition-colors hover:text-linen" href="${h}">${l}</a></li>`).join('')}
          </ul>
        </div>
        <div class="col-span-2 sm:col-span-1">
          <h2 class="eyebrow">Contact</h2>
          <ul class="mt-6 grid gap-3 text-[0.9375rem]" role="list">
            <li><a class="text-linen/80 transition-colors hover:text-linen" href="tel:${site.phone.tel}">${site.phone.display}</a></li>
            <li><a class="break-all text-linen/80 transition-colors hover:text-linen" href="mailto:${site.email}">${site.email}</a></li>
            <li class="pt-2 text-night-mute">${site.hours.map((h) => `${h.short}<br><span class="text-linen/80">${h.time}</span>`).join('<br>')}</li>
          </ul>
        </div>
      </div>
    </div>
    <nav aria-label="All services" class="rule mt-16 grid gap-4 pt-8 sm:grid-cols-[9rem_1fr]">
      <h2 class="eyebrow pt-1">Services</h2>
      <ul class="flex flex-wrap gap-x-5 gap-y-2 text-[0.875rem]" role="list">
        ${svc.map((sv) => `<li><a class="text-linen/70 transition-colors hover:text-linen" href="/${sv.slug}">${sv.name}</a></li>`).join('')}
      </ul>
    </nav>
    <div class="rule mt-8 flex flex-col-reverse gap-6 pt-8 text-[0.8125rem] text-night-mute sm:flex-row sm:items-center sm:justify-between">
      <p>© ${new Date().getFullYear()} The Cleanic · Auckland, New Zealand</p>
      <ul class="flex items-center gap-2" role="list">
        ${site.social.map((s) => `<li><a href="${s.url}" class="grid h-10 w-10 place-items-center text-linen/75 transition-colors hover:text-linen" target="_blank" rel="noopener" aria-label="The Cleanic on ${s.name}">${icon[s.name.toLowerCase()]}</a></li>`).join('')}
      </ul>
    </div>
  </div>
</footer>`;
}

function mobileCta(p) {
  if (p.hideMobileCta) return '';
  return `
<div class="mobile-cta fixed inset-x-0 bottom-0 z-30 border-t border-line bg-linen/95 backdrop-blur md:hidden" data-mobile-cta aria-hidden="true">
  <div class="flex gap-3 px-4 py-3">
    <a href="tel:${site.phone.tel}" class="btn btn-outline btn-sm flex-none px-4" tabindex="-1" aria-label="Call ${site.phone.display}">${icon.phone}<span>Call</span></a>
    <a href="/get-a-quote${p.quoteService ? `?service=${p.quoteService}` : ''}" class="btn btn-primary btn-sm flex-1" tabindex="-1">Get a quote ${icon.arrow}</a>
  </div>
</div>`;
}

export function page(p, assets) {
  return `${head(p, assets)}
<body${p.bodyClass ? ` class="${p.bodyClass}"` : ''}>
${header(p)}
<main id="main" tabindex="-1" class="outline-none">
${p.body.replace('<section', '<section data-hero')}
</main>
${p.hideFooter ? '' : footer()}
${mobileCta(p)}
</body>
</html>
`;
}

export { nav, airbnb };
