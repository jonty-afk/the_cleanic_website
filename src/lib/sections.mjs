import { site } from '../data/site.mjs';
import { airbnb, services } from '../data/services.mjs';
import { pricing, money, QUOTE } from '../data/pricing.mjs';
import { icon, picture, rv, esc } from './html.mjs';

export const faqSchema = (faq) => ({
  '@type': 'FAQPage',
  mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a.replace(/<[^>]+>/g, '') } })),
});

export const faqList = (faq) => `
<div class="border-t border-line">
  ${faq.map(([q, a]) => `
  <details class="faq-item border-b border-line" ${rv()}>
    <summary><span>${q}</span><span class="plus" aria-hidden="true"></span></summary>
    <div class="answer"><p>${a}</p></div>
  </details>`).join('')}
</div>`;

/** Closing call to action used at the end of most pages. */
export const quoteBand = ({ title = 'Tell us about your property.', text = 'Share a few details — the property, the service and when you need it — and we’ll come back to you with a quote.', service = '', image = 'auckland', imageAlt } = {}) => `
<section class="on-dark bg-navy-deep text-linen" aria-labelledby="cta-title">
  <div class="grid ${image ? 'lg:grid-cols-2' : ''}">
    <div class="wrap flex flex-col justify-center py-20 sm:py-24 lg:mx-0 lg:max-w-none ${image ? 'lg:py-32 lg:pl-[max(2.5rem,calc((100vw-1320px)/2+2.5rem))] lg:pr-16' : 'lg:py-32'}">
      <p class="eyebrow" ${rv()}>Get a quote</p>
      <h2 id="cta-title" class="h1 mt-6 max-w-[14ch]" ${rv(80)}>${title}</h2>
      <p class="lead mt-6 max-w-md" ${rv(160)}>${text}</p>
      <div class="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8" ${rv(240)}>
        <a href="/get-a-quote${service ? `?service=${service}` : ''}" class="btn btn-light">Request a quote ${icon.arrow}</a>
        <a href="tel:${site.phone.tel}" class="link-arrow">${icon.phone}<span>Or call ${site.phone.display}</span></a>
      </div>
    </div>
    ${image ? `<div class="media min-h-[18rem] sm:min-h-[26rem] lg:min-h-full" ${rv(0, 'image')}>
      ${picture(image, { sizes: '(min-width: 1024px) 50vw, 100vw', className: 'absolute inset-0', alt: imageAlt })}
    </div>` : ''}
  </div>
</section>`;

/** Typographic index of services (used on home + services page). */
export const serviceIndex = (list = services, { numbered = true } = {}) => `
<ul class="border-t border-line" role="list">
  ${list.map((s, i) => `
  <li ${rv(i * 40)}>
    <a href="/${s.slug}" class="index-row group">
      ${numbered ? `<span class="num hidden text-[1.125rem] sm:block">${String(i + 1).padStart(2, '0')}</span>` : '<span class="hidden sm:block"></span>'}
      <span class="font-serif text-[1.625rem] leading-tight text-ink sm:text-[1.875rem]">${s.name}</span>
      <span class="col-span-2 row-start-2 max-w-md text-[0.9375rem] leading-relaxed text-ink-soft sm:col-span-1 sm:row-start-auto">${s.short}</span>
      <span class="col-start-2 row-start-1 whitespace-nowrap text-right text-[0.875rem] font-medium text-ink-soft sm:col-start-auto sm:row-start-auto">${s.price}</span>
      <span class="hidden text-ink transition-transform duration-500 ease-soft group-hover:translate-x-1 sm:block">${icon.arrow}</span>
    </a>
  </li>`).join('')}
</ul>`;

/** Four-step turnover sequence content (shared by home + Airbnb page). */
export const turnoverSteps = [
  { n: '01', title: 'Check-out', image: 'checkout-bed', text: 'Your guest leaves. We work to your booking calendar, so the clean is lined up for the gap between stays.' },
  { n: '02', title: 'Reset', image: 'bed-making', text: 'Beds are stripped and remade with fresh linen, towels are replaced and the rubbish goes out.' },
  { n: '03', title: 'Clean', image: 'clean-products', text: 'Kitchen and bathrooms cleaned and sanitised, surfaces wiped down, floors vacuumed and mopped.' },
  { n: '04', title: 'Guest-ready', image: 'towels-on-bed', text: 'The property is presented and ready for the next arrival.' },
];


export const breadcrumb = (items) => `
<nav aria-label="Breadcrumb" class="fine">
  <ol class="flex flex-wrap items-center gap-2" role="list">
    <li><a href="/" class="hover:text-ink">Home</a></li>
    ${items.map(([h, l], i) => `<li aria-hidden="true">/</li><li>${i === items.length - 1 ? `<span aria-current="page" class="text-ink-soft">${l}</span>` : `<a href="${h}" class="hover:text-ink">${l}</a>`}</li>`).join('')}
  </ol>
</nav>`;

/** Airbnb starting prices by property size (from ../data/pricing.mjs). */
export const airbnbTiers = (cls = '') => `
<dl class="border-t border-line ${cls}">
  ${pricing.airbnb.tiers.map((t) => `<div class="flex items-baseline justify-between gap-4 border-b border-line py-3"><dt class="text-[0.9375rem] text-ink-soft">${t.label}</dt><dd class="text-[0.9375rem] font-semibold">${t.from == null ? QUOTE : `From ${money(t.from)}`}</dd></div>`).join('')}
</dl>`;

export { airbnb, esc };
