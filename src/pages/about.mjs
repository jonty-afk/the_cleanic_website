import { site } from '../data/site.mjs';
import { picture, icon, rv } from '../lib/html.mjs';
import { quoteBand, breadcrumb } from '../lib/sections.mjs';

export const meta = {
  path: '/about',
  out: 'about.html',
  title: 'About The Cleanic | Auckland Airbnb & Short-Stay Cleaning',
  description: 'The Cleanic is an Auckland cleaning business focused on Airbnb and short-stay turnovers, with home and property cleaning alongside. Here’s how we work.',
  crumbs: [['/about', 'About']],
};

const values = [
  ['Attention to detail', 'The difference between clean and guest-ready is in the details — the corners, the fixtures, the way a bed is made. We take the time to get them right.'],
  ['Consistency', 'A good clean once isn’t enough. The standard should be the same on the tenth visit as it was on the first.'],
  ['Honesty', 'Clear prices, straight answers, and no promises we can’t keep.'],
];

export const render = () => `
<section class="pt-[calc(var(--header-h)+2rem)] sm:pt-[calc(var(--header-h)+3.5rem)]" aria-labelledby="hero-title">
  <div class="wrap">
    ${breadcrumb([['/about', 'About']])}
    <div class="mt-10 grid gap-10 lg:grid-cols-12">
      <div class="lg:col-span-9">
        <p class="eyebrow" ${rv()}>About The Cleanic</p>
        <h1 id="hero-title" class="display mt-7 max-w-[16ch]" ${rv(80)}>An Auckland cleaning team, focused on <em>short-stay</em> properties.</h1>
      </div>
    </div>
  </div>
  <div class="wrap mt-14 grid grid-cols-12 gap-4 sm:mt-20 sm:gap-6">
    <div class="media col-span-12 aspect-[4/3] sm:col-span-7 sm:aspect-[5/4]" ${rv(0, 'image')}>
      ${picture('entry-hall', { sizes: '(min-width: 640px) 58vw, 100vw', priority: true, className: 'absolute inset-0' })}
    </div>
    <div class="col-span-12 flex flex-col justify-end gap-8 sm:col-span-5 sm:pl-6 lg:pl-12">
      <p class="lead" ${rv(120)}>The Cleanic cleans homes and properties across Auckland. Our focus is Airbnb and short-stay turnovers — cleaning and resetting a property between guests so it’s ready for the next arrival.</p>
      <p class="text-ink-soft" ${rv(200)}>Alongside turnovers we take on regular and deep cleans, end of tenancy and after builders cleans, and specialist jobs like carpets and windows. <a class="link-underline" href="/services">See all services</a>.</p>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="values-title">
  <div class="wrap grid gap-12 lg:grid-cols-12">
    <div class="lg:col-span-4">
      <p class="eyebrow" ${rv()}>What matters to us</p>
      <h2 id="values-title" class="h1 mt-6" ${rv(80)}>How we work</h2>
    </div>
    <ol class="lg:col-span-7 lg:col-start-6" role="list">
      ${values.map(([t, d], i) => `
      <li class="grid gap-3 border-t border-line py-9 last:border-b sm:grid-cols-[4rem_14rem_1fr] sm:gap-6" ${rv(i * 80)}>
        <span class="num text-[1.5rem] leading-none">${String(i + 1).padStart(2, '0')}</span>
        <h3 class="h3">${t}</h3>
        <p class="text-ink-soft">${d}</p>
      </li>`).join('')}
    </ol>
  </div>
</section>

<section class="on-dark section bg-night text-linen" aria-labelledby="presentation-title">
  <div class="wrap grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-12">
    <div class="lg:col-span-5">
      <p class="eyebrow" ${rv()}>Why presentation matters</p>
      <h2 id="presentation-title" class="h1 mt-6" ${rv(80)}>For a short-stay property, the clean <em>is</em> the first impression.</h2>
      <div class="mt-8 grid gap-5 text-night-mute" ${rv(160)}>
        <p>When a guest opens the door, the state of the place tells them what kind of stay it’s going to be. A made bed, a clean bathroom and clear benches say the property is looked after.</p>
        <p>That’s why turnovers are our focus: making sure that first impression is right, every time.</p>
      </div>
      <a href="/airbnb-cleaning" class="link-arrow mt-9" ${rv(220)}>Airbnb &amp; short-stay cleaning ${icon.arrow}</a>
    </div>
    <div class="grid grid-cols-2 gap-4 sm:gap-6 lg:col-span-6 lg:col-start-7">
      <div class="media aspect-[3/4]" ${rv(0, 'image')}>${picture('linen-light', { sizes: '(min-width: 1024px) 25vw, 50vw', className: 'absolute inset-0' })}</div>
      <div class="media mt-16 aspect-[3/4]" ${rv(140, 'image')}>${picture('bath-light', { sizes: '(min-width: 1024px) 25vw, 50vw', className: 'absolute inset-0' })}</div>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="work-title">
  <div class="wrap">
    <p class="eyebrow" ${rv()}>Working with us</p>
    <h2 id="work-title" class="h1 mt-6 max-w-[16ch]" ${rv(80)}>Getting started is simple</h2>
    <ol class="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8" role="list">
      ${[
        ['Request a quote', 'Tell us about the property, the service you need and when.'],
        ['Confirm the details', 'We come back to you with a price and agree timing.'],
        ['We clean', 'The property is cleaned and ready for you — or your next guest.'],
      ].map(([t, d], i) => `
      <li class="border-t border-ink/80 pt-6" ${rv(i * 90)}>
        <span class="num text-[1.5rem]">${String(i + 1).padStart(2, '0')}</span>
        <h3 class="h3 mt-3">${t}</h3>
        <p class="mt-3 max-w-xs text-ink-soft">${d}</p>
      </li>`).join('')}
    </ol>
    <div class="mt-14 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8" ${rv()}>
      <a href="/get-a-quote" class="btn btn-primary">Get a quote ${icon.arrow}</a>
      <a href="tel:${site.phone.tel}" class="link-arrow">${icon.phone}<span>Call ${site.phone.display}</span></a>
    </div>
  </div>
</section>

${quoteBand({ image: 'entry-modern' })}
`;
