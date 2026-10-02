import { site } from '../data/site.mjs';
import { pricing, money, PRICE_NOTE, AIRBNB_SCOPE_NOTE, addOnPrice } from '../data/pricing.mjs';
import { picture, icon, checklist, rv } from '../lib/html.mjs';
import { quoteBand, faqList, faqSchema, turnoverSteps, breadcrumb, airbnbTiers } from '../lib/sections.mjs';

const faq = [
  ['How much does an Airbnb clean cost?', `Turnovers start from ${pricing.airbnb.tiers.filter((t) => t.from != null).map((t) => `${money(t.from)} for ${t.label.toLowerCase()}`).join(', ')}; 5+ bedrooms are quoted on request. ${PRICE_NOTE} ${AIRBNB_SCOPE_NOTE}`],
  ['Can you work around my booking calendar?', 'Yes. Turnovers are scheduled to fit the gap between your guests. When you request a quote, let us know your usual check-out and check-in times.'],
  ['What’s included in a turnover?', 'Beds changed and made, bathrooms cleaned and sanitised, fresh towels set out, the kitchen cleaned, rubbish removed, surfaces wiped and floors vacuumed and mopped.'],
  ['Which areas do you cover?', 'We clean short-stay properties in Auckland. Tell us the suburb when you request a quote.'],
  ['Do you provide linen and towels?', 'Yes — our linen service can be added to any turnover. We bring fresh, washed and pressed bed linen and towels, make up the beds, and take the used set away to be laundered. It’s priced with your quote.'],
  ['Can you restock guest toiletries?', 'Yes. We can restock single-use guest toiletries, such as small soaps, at each turnover. Add it to your quote request and we’ll include it in the price.'],
  ['What if the property needs a deeper clean?', 'We also offer <a class="link-underline" href="/spring-cleaning">spring cleaning</a>, <a class="link-underline" href="/one-off-cleaning">one-off deep cleans</a>, <a class="link-underline" href="/carpet-cleaning">carpet cleaning</a> and <a class="link-underline" href="/window-cleaning">window cleaning</a> for the jobs a regular turnover doesn’t cover.'],
  ['What is your cancellation policy?', 'Please give us 48 hours’ notice to cancel a booking. Cancellations with less notice incur a 50% cancellation fee.'],
  ['How do I pay?', `Payment is due within 7 days of the clean. We accept ${site.payment.join(', ').replace(/, ([^,]*)$/, ' and $1')}.`],
  ['When can I reach you?', `Call ${site.phone.display} or ${site.phone2.display}, or email ${site.email}. We’re available ${site.hours.map((h) => `${h.days} ${h.time}`).join(', and ')}.`],
];

export const meta = {
  path: '/airbnb-cleaning',
  out: 'airbnb-cleaning.html',
  title: 'Airbnb Cleaning Auckland | Short-Stay Turnovers | The Cleanic',
  ogTitle: 'Airbnb & short-stay turnover cleaning in Auckland — The Cleanic',
  description: `Airbnb turnover cleaning in Auckland. Beds changed, bathrooms and kitchens cleaned, floors done — scheduled around your bookings so the property is guest-ready. From ${site.airbnbFrom}.`,
  crumbs: [['/airbnb-cleaning', 'Airbnb cleaning']],
  schema: [
    {
      '@type': 'Service',
      name: 'Airbnb & short-stay turnover cleaning',
      serviceType: 'Airbnb cleaning',
      description: 'Turnover cleaning between guests for Airbnb and short-stay properties in Auckland.',
      provider: { '@id': `${site.url}/#business` },
      areaServed: { '@type': 'City', name: 'Auckland' },
      url: `${site.url}/airbnb-cleaning`,
      offers: { '@type': 'Offer', priceCurrency: 'NZD', priceSpecification: { '@type': 'PriceSpecification', minPrice: 120, priceCurrency: 'NZD' } },
    },
    faqSchema(faq),
  ],
  preload: [`href="/assets/img/holiday-bedroom-1920.avif" imagesrcset="/assets/img/holiday-bedroom-640.avif 640w, /assets/img/holiday-bedroom-1280.avif 1280w, /assets/img/holiday-bedroom-1920.avif 1920w" imagesizes="100vw" type="image/avif"`],
  quoteService: 'airbnb',
};

const reasons = [
  ['The first look', 'Guests notice the kitchen, the bathroom and the bed before anything else. Those are the areas every turnover starts with.'],
  ['The listing sets the standard', 'Your photos are a promise. A consistent clean means each guest walks into the property they booked.'],
  ['Every stay counts', 'One missed detail can end up in a review. Doing it the same way every time is how you avoid that.'],
];

const areas = [
  ['towels-rolled', 'Bedrooms', ['Beds stripped and remade with fresh linen', 'Surfaces and bedside tables dusted', 'Floors vacuumed']],
  ['bathroom-timber', 'Bathrooms', ['Toilet, basin, shower and tiles cleaned and sanitised', 'Mirrors and fixtures wiped', 'Fresh towels set out']],
  ['kitchen-galley', 'Kitchen', ['Benches and splashbacks wiped down', 'Sink and appliances cleaned', 'Rubbish removed']],
  ['dining', 'Living & dining', ['Surfaces, tables and furniture wiped', 'Floors vacuumed and mopped', 'The space reset for arrival']],
];

const why = [
  ['Short-stay is our focus', 'Turnover cleaning for Airbnb and short-stay properties is the centre of what we do.'],
  ['Linen and toiletries available', 'Add our linen service and single-use guest toiletries, so the whole turnover is taken care of.'],
  ['Scheduled around your bookings', 'Cleans are arranged to fit the gap between check-out and check-in.'],
  ['Local and easy to reach', `We’re based in Auckland. Call ${site.phone.display} or email — seven days a week during business hours.`],
];

export const render = () => `
<!-- Hero -->
<section class="pt-[calc(var(--header-h)+2rem)] sm:pt-[calc(var(--header-h)+3.5rem)]" aria-labelledby="hero-title">
  <div class="wrap">
    ${breadcrumb([['/airbnb-cleaning', 'Airbnb cleaning']])}
    <div class="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
      <div class="lg:col-span-8">
        <p class="eyebrow" ${rv()}>Airbnb &amp; short-stay cleaning · Auckland</p>
        <h1 id="hero-title" class="display mt-7 max-w-[13ch]" ${rv(80)}>Airbnb turnover cleaning in <em>Auckland</em></h1>
      </div>
      <div class="self-end lg:col-span-4" ${rv(160)}>
        <p class="lead">We clean and reset short-stay properties between guests, so each one arrives to a property that’s ready for them.</p>
        <div class="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-7">
          <a href="/get-a-quote?service=airbnb" class="btn btn-primary">Get a quote ${icon.arrow}</a>
          <span class="text-[0.9375rem] font-semibold">From ${site.airbnbFrom} per clean</span>
        </div>
      </div>
    </div>
  </div>
  <div class="wrap mt-12 sm:mt-16">
    <div class="media aspect-[4/3] sm:aspect-[21/10]" ${rv(0, 'image')}>
      ${picture('holiday-bedroom', { sizes: '(min-width: 1320px) 1240px, 100vw', priority: true, className: 'absolute inset-0', position: '50% 62%' })}
    </div>
  </div>
</section>

<!-- Why turnover cleaning matters -->
<section class="section" aria-labelledby="why-title">
  <div class="wrap grid gap-12 lg:grid-cols-12">
    <div class="lg:col-span-5">
      <p class="eyebrow" ${rv()}>Why it matters</p>
      <h2 id="why-title" class="h1 mt-6 max-w-[12ch]" ${rv(80)}>Consistency is the job.</h2>
      <p class="lead mt-6 max-w-md" ${rv(160)}>A short-stay clean isn’t a regular house clean. It happens on a deadline, and it has to look the same for every guest.</p>
    </div>
    <ol class="grid gap-0 lg:col-span-6 lg:col-start-7" role="list">
      ${reasons.map(([t, d], i) => `
      <li class="grid grid-cols-[3.5rem_1fr] gap-4 border-t border-line py-8 last:border-b" ${rv(i * 80)}>
        <span class="num text-[1.75rem] leading-none">${['i', 'ii', 'iii'][i]}</span>
        <div><h3 class="h3">${t}</h3><p class="mt-3 text-ink-soft">${d}</p></div>
      </li>`).join('')}
    </ol>
  </div>
</section>

<!-- What's covered -->
<section class="section rule bg-paper" aria-labelledby="covered-title">
  <div class="wrap grid gap-14 lg:grid-cols-12 lg:gap-12">
    <div class="order-2 lg:order-1 lg:col-span-5">
      <div class="media zoom aspect-[4/5]" ${rv(0, 'image')}>
        ${picture('bathroom-vanity', { sizes: '(min-width: 1024px) 40vw, 100vw', className: 'absolute inset-0' })}
      </div>
    </div>
    <div class="order-1 lg:order-2 lg:col-span-6 lg:col-start-7 lg:self-center">
      <p class="eyebrow" ${rv()}>What’s covered</p>
      <h2 id="covered-title" class="h1 mt-6 max-w-[13ch]" ${rv(80)}>Included in every turnover</h2>
      <div class="mt-10" ${rv(160)}>
        ${checklist([
          'Bed linen changed and beds made',
          'Fresh towels set out',
          'Bathrooms cleaned and sanitised',
          'Kitchen benches, sink and appliances cleaned',
          'Surfaces dusted and wiped throughout',
          'Floors vacuumed and mopped',
          'Rubbish removed',
        ])}
      </div>
      <p class="fine mt-6" ${rv(200)}>Need something specific for your property? Add it to your quote request and we’ll let you know.</p>
      <div class="mt-10" ${rv(220)}>
        <h3 class="h4">Starting prices</h3>
        ${airbnbTiers('mt-4')}
        <p class="fine mt-4">${PRICE_NOTE} ${AIRBNB_SCOPE_NOTE}</p>
      </div>
      <a href="/airbnb-turnover-checklist" class="link-arrow mt-6" ${rv(240)}>Free guide: the full host turnover checklist ${icon.arrow}</a>
    </div>
  </div>
</section>

<!-- Linen & guest supplies -->
<section class="section" aria-labelledby="linen-title">
  <div class="wrap grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-12">
    <div class="lg:col-span-6">
      <div class="media zoom aspect-[4/3]" ${rv(0, 'image')}>
        ${picture('linen-folded', { sizes: '(min-width: 1024px) 50vw, 100vw', className: 'absolute inset-0' })}
      </div>
    </div>
    <div class="lg:col-span-5 lg:col-start-8">
      <p class="eyebrow" ${rv()}>Add-ons</p>
      <h2 id="linen-title" class="h1 mt-6 max-w-[12ch]" ${rv(80)}>Linen and guest supplies, handled</h2>
      <p class="lead mt-6" ${rv(160)}>Add our linen service and guest toiletries to your turnovers, so there’s one less thing to organise between stays.</p>
      <dl class="mt-10 border-t border-line" ${rv(220)}>
        <div class="grid gap-2 border-b border-line py-6 sm:grid-cols-[1fr_auto] sm:gap-6">
          <div><dt class="h4">Linen service</dt><dd class="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">Fresh, washed and pressed bed linen and towels brought to each turnover. Beds made up, and the used set taken away to be laundered.</dd></div>
          <dd class="text-[0.875rem] font-semibold sm:pt-0.5 sm:text-right">${addOnPrice('linen')}</dd>
        </div>
        <div class="grid gap-2 border-b border-line py-6 sm:grid-cols-[1fr_auto] sm:gap-6">
          <div><dt class="h4">Guest toiletries</dt><dd class="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">Single-use guest toiletries, such as small soaps, restocked at each turnover.</dd></div>
          <dd class="text-[0.875rem] font-semibold sm:pt-0.5 sm:text-right">${addOnPrice('amenities')}</dd>
        </div>
      </dl>
      <a href="/get-a-quote?service=airbnb" class="btn btn-primary mt-10" ${rv(260)}>Get an Airbnb quote ${icon.arrow}</a>
    </div>
  </div>
</section>

<!-- Process (horizontal timeline) -->
<section class="on-dark section bg-night text-linen" aria-labelledby="process-title">
  <div class="wrap">
    <div class="grid gap-8 lg:grid-cols-12">
      <div class="lg:col-span-7">
        <p class="eyebrow" ${rv()}>The process</p>
        <h2 id="process-title" class="h1 mt-6 max-w-[14ch]" ${rv(80)}>Check-out to check-in, in four steps</h2>
      </div>
    </div>
    <ol class="mt-16 grid gap-12 sm:grid-cols-2 sm:gap-x-8 lg:mt-24 lg:grid-cols-4" role="list">
      ${turnoverSteps.map((s, i) => ({ ...s, image: ['sheets-unmade', 'pillows-fresh', 'bath-amber', 'made-bed-warm'][i] })).map((s, i) => `
      <li ${rv(i * 90)}>
        <div class="media zoom aspect-[4/5]">${picture(s.image, { sizes: '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw', className: 'absolute inset-0' })}</div>
        <div class="mt-6 flex items-baseline gap-4 border-t border-night-line pt-5">
          <span class="num text-[1.5rem]">${s.n}</span>
          <h3 class="h3">${s.title}</h3>
        </div>
        <p class="mt-3 text-[0.9375rem] leading-relaxed text-night-mute">${s.text}</p>
      </li>`).join('')}
    </ol>
  </div>
</section>

<!-- Areas cleaned -->
<section class="section" aria-labelledby="areas-title">
  <div class="wrap">
    <div class="grid gap-8 lg:grid-cols-12">
      <div class="lg:col-span-6">
        <p class="eyebrow" ${rv()}>Room by room</p>
        <h2 id="areas-title" class="h1 mt-6 max-w-[12ch]" ${rv(80)}>Areas we clean</h2>
      </div>
    </div>
    <div class="mt-14 grid gap-x-8 gap-y-16 sm:mt-20 sm:grid-cols-2">
      ${areas.map(([img, room, items], i) => `
      <article class="grid gap-7 ${i % 2 ? 'sm:mt-20' : ''}" ${rv(i % 2 ? 100 : 0)}>
        <div class="media zoom aspect-[5/4]" ${rv(0, 'image')}>${picture(img, { sizes: '(min-width: 640px) 50vw, 100vw', className: 'absolute inset-0' })}</div>
        <div class="grid gap-5 sm:grid-cols-[10rem_1fr]">
          <h3 class="h3">${room}</h3>
          ${checklist(items, 'text-[0.9375rem]')}
        </div>
      </article>`).join('')}
    </div>
  </div>
</section>

<!-- Property types -->
<section class="section rule bg-sand/40" aria-labelledby="types-title">
  <div class="wrap grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-12">
    <div class="lg:col-span-6">
      <div class="media zoom aspect-[4/3]" ${rv(0, 'image')}>
        ${picture('bedroom-window', { sizes: '(min-width: 1024px) 50vw, 100vw', className: 'absolute inset-0' })}
      </div>
    </div>
    <div class="lg:col-span-5 lg:col-start-8">
      <p class="eyebrow" ${rv()}>Property types</p>
      <h2 id="types-title" class="h2 mt-6" ${rv(80)}>From city studios to holiday homes</h2>
      <dl class="mt-10 border-t border-line" ${rv(160)}>
        ${[
          ['Apartments & studios', 'Compact spaces where every surface is on show.'],
          ['Houses & townhouses', 'More bedrooms, bathrooms and living space to turn over.'],
          ['Holiday homes', 'Holiday rentals and baches, ready for the next booking.'],
        ].map(([t, d]) => `<div class="grid gap-1 border-b border-line py-5 sm:grid-cols-[13rem_1fr] sm:gap-6"><dt class="font-semibold">${t}</dt><dd class="text-ink-soft">${d}</dd></div>`).join('')}
      </dl>
    </div>
  </div>
</section>

<!-- Why hosts work with us -->
<section class="section" aria-labelledby="hosts-title">
  <div class="wrap">
    <div class="grid gap-8 lg:grid-cols-12">
      <div class="lg:col-span-7">
        <p class="eyebrow" ${rv()}>For hosts</p>
        <h2 id="hosts-title" class="h1 mt-6 max-w-[15ch]" ${rv(80)}>Why hosts work with The Cleanic</h2>
      </div>
    </div>
    <div class="mt-14 grid border-t border-line sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
      ${why.map(([t, d], i) => `
      <div class="border-b border-line py-8 sm:px-0 sm:pr-8 lg:border-b-0 lg:border-r lg:px-8 lg:first:pl-0 lg:last:border-r-0" ${rv(i * 80)}>
        <h3 class="h4">${t}</h3>
        <p class="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">${d}</p>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- FAQ -->
<section class="section rule bg-paper" aria-labelledby="faq-title">
  <div class="wrap grid gap-12 lg:grid-cols-12">
    <div class="lg:col-span-4">
      <p class="eyebrow" ${rv()}>FAQ</p>
      <h2 id="faq-title" class="h1 mt-6" ${rv(80)}>Questions from hosts</h2>
      <p class="mt-6 text-ink-soft" ${rv(160)}>Something else? Call <a class="link-underline" href="tel:${site.phone.tel}">${site.phone.display}</a> or <a class="link-underline" href="/contact">send us a message</a>.</p>
    </div>
    <div class="lg:col-span-7 lg:col-start-6">${faqList(faq)}</div>
  </div>
</section>

${quoteBand({ title: 'Get your property guest-ready.', text: 'Tell us about the property, your usual turnover times and where it is. We’ll come back to you with a quote.', service: 'airbnb', image: 'hotel-pillows' })}
`;
