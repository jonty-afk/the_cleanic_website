import { site } from '../data/site.mjs';
import { serviceBySlug, airbnb, quoteKeyBySlug } from '../data/services.mjs';
import { picture, icon, checklist, rv } from '../lib/html.mjs';
import { quoteBand, faqList, faqSchema, breadcrumb } from '../lib/sections.mjs';

export const serviceMeta = (s) => ({
  path: `/${s.slug}`,
  out: `${s.slug}.html`,
  title: s.title,
  description: s.description,
  isService: true,
  crumbs: [['/services', 'Services'], [`/${s.slug}`, s.name]],
  quoteService: quoteKeyBySlug[s.slug],
  schema: [
    {
      '@type': 'Service',
      name: s.name,
      serviceType: s.name,
      description: s.short,
      provider: { '@id': `${site.url}/#business` },
      areaServed: { '@type': 'City', name: 'Auckland' },
      url: `${site.url}/${s.slug}`,
      ...(s.minPrice ? { offers: { '@type': 'Offer', priceCurrency: 'NZD', priceSpecification: { '@type': 'PriceSpecification', minPrice: s.minPrice, priceCurrency: 'NZD' } } } : {}),
    },
    ...(s.faq?.length ? [faqSchema(s.faq)] : []),
  ],
  preload: [`href="/assets/img/${s.image}-1280.avif" imagesrcset="/assets/img/${s.image}-640.avif 640w, /assets/img/${s.image}-1280.avif 1280w, /assets/img/${s.image}-1920.avif 1920w" imagesizes="${s.layout === 'wide' ? '100vw' : '(min-width: 1024px) 45vw, 100vw'}" type="image/avif"`],
});

const hero = (s) => {
  const q = quoteKeyBySlug[s.slug];
  const actions = `
    <div class="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-7" ${rv(240)}>
      <a href="/get-a-quote?service=${q}" class="btn btn-primary">Get a quote ${icon.arrow}</a>
      <span class="text-[0.9375rem] font-semibold">${s.price}</span>
    </div>`;
  if (s.layout === 'wide') {
    return `
<section class="pt-[calc(var(--header-h)+2rem)] sm:pt-[calc(var(--header-h)+3.5rem)]" aria-labelledby="hero-title">
  <div class="wrap">
    ${breadcrumb([['/services', 'Services'], [`/${s.slug}`, s.name]])}
    <div class="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-12">
      <div class="lg:col-span-7">
        <p class="eyebrow" ${rv()}>${s.group} · Auckland</p>
        <h1 id="hero-title" class="h1 mt-6 max-w-[16ch]" ${rv(80)}>${s.h1}</h1>
      </div>
      <div class="self-end lg:col-span-4 lg:col-start-9">
        <p class="lead" ${rv(160)}>${s.lead}</p>
        ${actions}
      </div>
    </div>
  </div>
  <div class="wrap mt-12 sm:mt-16">
    <div class="media aspect-[4/3] sm:aspect-[21/9]" ${rv(0, 'image')}>
      ${picture(s.image, { sizes: '(min-width: 1320px) 1240px, 100vw', priority: true, className: 'absolute inset-0' })}
    </div>
  </div>
</section>`;
  }
  return `
<section class="pt-[calc(var(--header-h)+2rem)] sm:pt-[calc(var(--header-h)+3.5rem)]" aria-labelledby="hero-title">
  <div class="wrap">
    ${breadcrumb([['/services', 'Services'], [`/${s.slug}`, s.name]])}
    <div class="mt-10 grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-12">
      <div class="lg:col-span-6 lg:pb-8">
        <p class="eyebrow" ${rv()}>${s.group} · Auckland</p>
        <h1 id="hero-title" class="h1 mt-6 max-w-[14ch]" ${rv(80)}>${s.h1}</h1>
        <p class="lead mt-7 max-w-lg" ${rv(160)}>${s.lead}</p>
        ${actions}
      </div>
      <div class="lg:col-span-5 lg:col-start-8">
        <div class="media aspect-[4/3] lg:aspect-[4/5]" ${rv(0, 'image')}>
          ${picture(s.image, { sizes: '(min-width: 1024px) 42vw, 100vw', priority: true, className: 'absolute inset-0' })}
        </div>
      </div>
    </div>
  </div>
</section>`;
};

export const renderService = (s) => {
  const related = (s.related || []).map((r) => serviceBySlug[r]).filter(Boolean);
  return `
${hero(s)}

<!-- Overview + inclusions -->
<section class="section" aria-labelledby="included-title">
  <div class="wrap grid gap-14 lg:grid-cols-12 lg:gap-12">
    <div class="lg:col-span-5">
      <p class="eyebrow" ${rv()}>Overview</p>
      <div class="mt-6 grid gap-5 font-serif text-[1.5rem] leading-[1.3] text-ink sm:text-[1.75rem]" ${rv(80)}>
        ${s.intro.map((p) => `<p>${p}</p>`).join('')}
      </div>
    </div>
    <div class="lg:col-span-6 lg:col-start-7">
      <h2 id="included-title" class="h3" ${rv()}>${s.includedTitle}</h2>
      <div class="mt-6" ${rv(80)}>${checklist(s.included)}</div>
      <div class="mt-12 grid gap-4 sm:grid-cols-[10rem_1fr]" ${rv(120)}>
        <h2 class="eyebrow pt-1">Suited to</h2>
        <ul class="flex flex-wrap gap-2" role="list">${s.forWho.map((w) => `<li class="border border-line px-3 py-1.5 text-[0.875rem] text-ink-soft">${w}</li>`).join('')}</ul>
      </div>
      <div class="mt-4 grid gap-4 sm:grid-cols-[10rem_1fr]" ${rv(160)}>
        <h2 class="eyebrow pt-1">Pricing</h2>
        <p class="text-[0.9375rem]"><span class="font-semibold">${s.price}.</span> <span class="text-ink-soft">Final pricing depends on the property and the work involved.</span></p>
      </div>
    </div>
  </div>
</section>

${s.process ? `
<!-- Process -->
<section class="section-sm rule bg-paper" aria-labelledby="process-title">
  <div class="wrap">
    <h2 id="process-title" class="h2" ${rv()}>How it works</h2>
    <ol class="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-8" role="list">
      ${s.process.map(([t, d], i) => `
      <li class="border-t border-ink/80 pt-6" ${rv(i * 90)}>
        <span class="num text-[1.5rem]">${String(i + 1).padStart(2, '0')}</span>
        <h3 class="h3 mt-3">${t}</h3>
        <p class="mt-3 max-w-xs text-ink-soft">${d}</p>
      </li>`).join('')}
    </ol>
  </div>
</section>` : ''}

${s.faq?.length ? `
<!-- FAQ -->
<section class="section-sm${s.process ? '' : ' rule bg-paper'}" aria-labelledby="faq-title">
  <div class="wrap grid gap-10 lg:grid-cols-12">
    <div class="lg:col-span-4"><h2 id="faq-title" class="h2" ${rv()}>Questions</h2></div>
    <div class="lg:col-span-7 lg:col-start-6">${faqList(s.faq)}</div>
  </div>
</section>` : ''}

<!-- Airbnb cross-link + related -->
<section class="section-sm rule" aria-labelledby="related-title">
  <div class="wrap grid gap-12 lg:grid-cols-12">
    <a href="/airbnb-cleaning" class="group block border-l-2 border-navy pl-6 sm:pl-8 lg:col-span-7" ${rv()}>
      <div>
        <p class="eyebrow">Our speciality</p>
        <p class="h3 mt-4">Airbnb &amp; short-stay turnover cleaning</p>
        <p class="mt-3 text-[0.9375rem] text-ink-soft">${airbnb.short}</p>
        <span class="link-arrow mt-4">Airbnb cleaning ${icon.arrow}</span>
      </div>
    </a>
    <div class="lg:col-span-4 lg:col-start-9" ${rv(100)}>
      <h2 id="related-title" class="eyebrow">Related services</h2>
      <ul class="mt-5 border-t border-line" role="list">
        ${related.map((r) => `<li><a href="/${r.slug}" class="flex items-center justify-between gap-4 border-b border-line py-4 font-serif text-[1.375rem] transition-colors hover:text-navy">${r.name}${icon.arrow}</a></li>`).join('')}
        <li><a href="/services" class="flex items-center justify-between gap-4 border-b border-line py-4 text-[0.9375rem] font-semibold">All services${icon.arrow}</a></li>
      </ul>
    </div>
  </div>
</section>

${quoteBand({ title: s.ctaTitle || `Get a quote for ${s.name.toLowerCase()}.`, text: s.ctaText || 'Tell us about the property and what you need. We’ll come back to you with a price.', service: quoteKeyBySlug[s.slug], image: s.ctaImage })}
`;
};
