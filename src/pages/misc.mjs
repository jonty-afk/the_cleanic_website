import { site } from '../data/site.mjs';
import { icon, rv, picture } from '../lib/html.mjs';
import { breadcrumb } from '../lib/sections.mjs';

const simple = ({ eyebrow, title, text, actions, image }) => `
<section class="pb-24 pt-[calc(var(--header-h)+3rem)] sm:pb-32 sm:pt-[calc(var(--header-h)+5rem)]">
  <div class="wrap grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-12">
    <div class="lg:col-span-6">
      <p class="eyebrow" ${rv()}>${eyebrow}</p>
      <h1 class="display mt-7 max-w-[12ch]" ${rv(80)}>${title}</h1>
      <p class="lead mt-7 max-w-md" ${rv(160)}>${text}</p>
      <div class="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8" ${rv(240)}>${actions}</div>
    </div>
    <div class="media aspect-[4/3] lg:col-span-5 lg:col-start-8 lg:aspect-[4/5]" ${rv(0, 'image')}>${picture(image, { sizes: '(min-width: 1024px) 40vw, 100vw', className: 'absolute inset-0', priority: true })}</div>
  </div>
</section>`;

export const thankYou = {
  meta: {
    path: '/thank-you', out: 'thank-you.html', noindex: true, hideMobileCta: true,
    title: 'Thank You | The Cleanic',
    description: 'Thanks for getting in touch with The Cleanic.',
  },
  render: () => simple({
    eyebrow: 'Request received',
    title: 'Thank you.',
    text: `We’ve received your details and will be in touch. If it’s urgent, call ${site.phone.display}.`,
    actions: `<a href="/" class="btn btn-primary">Back to home ${icon.arrow}</a><a href="tel:${site.phone.tel}" class="link-arrow">${icon.phone}<span>Call ${site.phone.display}</span></a>`,
    image: 'bed-sunlit',
  }),
};

export const notFound = {
  meta: {
    path: '/404', out: '404.html', noindex: true,
    title: 'Page Not Found | The Cleanic',
    description: 'This page doesn’t exist.',
  },
  render: () => simple({
    eyebrow: 'Page not found',
    title: 'This page has <em>checked out</em>.',
    text: 'The page you’re looking for has moved or no longer exists.',
    actions: `<a href="/" class="btn btn-primary">Go to home ${icon.arrow}</a><a href="/services" class="link-arrow">View services ${icon.arrow}</a>`,
    image: 'bed-stripes',
  }),
};

// Terms: original wording from the previous services page, reorganised into sections.
// Text is unchanged apart from light formatting.
const terms = [
  ['Agreement', 'Welcome to The Cleanic! By engaging our services, you agree to the following terms and conditions. All cleaning services are provided by The Cleanic, a registered business in New Zealand, operating under the highest standards of professionalism.'],
  ['Payment', 'Payments are due within 7 days of service completion via the accepted payment methods (Visa, Mastercard, Amex) unless otherwise agreed.'],
  ['Cancellations', 'Cancellations must be made 48 hours prior to the scheduled appointment to avoid a 50% cancellation fee.'],
  ['Pre-existing conditions', 'We are not liable for pre-existing damages or conditions not disclosed prior to service.'],
  ['Products and special requests', 'All cleaning products used are eco-friendly unless specified otherwise by the client, and any special requests must be communicated at booking.'],
  ['Liability', 'Our liability is limited to the cost of the service provided, and we do not accept responsibility for theft or loss of personal items.'],
  ['Pricing and availability', 'Services are subject to availability, and pricing may vary based on location, property size, and specific requirements. We reserve the right to refuse service at our discretion.'],
  ['Emergency services', 'For emergency services, a 20% surcharge applies.'],
  ['Privacy', 'All personal data collected is handled in compliance with the Privacy Act 2020, and you may request data removal by contacting us.'],
  ['Changes to these terms', 'These terms may be updated, and the latest version will apply to all ongoing services.'],
  ['Disputes', `For disputes, contact us within 14 days of service at <a class="link-underline" href="mailto:${site.email}">${site.email}</a>.`],
];

export const termsPage = {
  meta: {
    path: '/terms', out: 'terms.html',
    title: 'Terms & Conditions | The Cleanic',
    description: 'The Cleanic’s terms and conditions — payment, cancellations, liability, pricing and privacy.',
    crumbs: [['/terms', 'Terms & conditions']],
  },
  render: () => `
<section class="pb-24 pt-[calc(var(--header-h)+2rem)] sm:pb-32 sm:pt-[calc(var(--header-h)+3.5rem)]">
  <div class="wrap">
    ${breadcrumb([['/terms', 'Terms & conditions']])}
    <div class="mt-10 grid gap-12 lg:grid-cols-12">
      <div class="lg:col-span-4">
        <p class="eyebrow">Legal</p>
        <h1 class="h1 mt-6">Terms &amp; conditions</h1>
        <p class="mt-6 text-ink-soft">Questions about these terms? Email <a class="link-underline" href="mailto:${site.email}">${site.email}</a>.</p>
      </div>
      <ol class="lg:col-span-7 lg:col-start-6" role="list">
        ${terms.map(([h, t], i) => `
        <li class="grid gap-3 border-t border-line py-7 last:border-b sm:grid-cols-[3rem_13rem_1fr] sm:gap-6">
          <span class="num text-[1.25rem]">${String(i + 1).padStart(2, '0')}</span>
          <h2 class="h4">${h}</h2>
          <p class="text-ink-soft">${t}</p>
        </li>`).join('')}
      </ol>
    </div>
  </div>
</section>`,
};
