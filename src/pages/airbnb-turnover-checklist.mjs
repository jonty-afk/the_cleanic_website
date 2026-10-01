import { site } from '../data/site.mjs';
import { picture, icon, rv } from '../lib/html.mjs';
import { quoteBand, breadcrumb } from '../lib/sections.mjs';

// General guidance for hosts. Items marked `ours: true` are part of every
// Cleanic turnover (matches /airbnb-cleaning); the rest are host tasks.
const rooms = [
  ['Bedrooms', 'checklist-bedside', [
    ['Strip beds and remake with fresh linen', true],
    ['Check under beds and in drawers for left-behind items', false],
    ['Dust bedside tables, headboards and surfaces', true],
    ['Vacuum floors and rugs', true],
    ['Check pillows and duvets for marks; rotate as needed', false],
  ]],
  ['Bathrooms', 'checklist-towels', [
    ['Clean and sanitise toilet, basin, shower and tiles', true],
    ['Wipe mirrors, taps and fixtures', true],
    ['Set out fresh towels', true],
    ['Top up toilet paper, soap and toiletries', false],
    ['Check drains and extractor fan', false],
  ]],
  ['Kitchen', null, [
    ['Wipe benches and splashbacks', true],
    ['Clean the sink and appliance fronts', true],
    ['Empty rubbish and recycling', true],
    ['Check the fridge for leftover food', false],
    ['Run and empty the dishwasher; put everything back where guests expect it', false],
    ['Top up coffee, tea and basics', false],
  ]],
  ['Living areas & floors', null, [
    ['Wipe tables, surfaces and furniture', true],
    ['Vacuum and mop floors', true],
    ['Straighten cushions, throws and chairs', false],
    ['Check remotes, chargers and the Wi-Fi card are in place', false],
  ]],
  ['Before the next guest', null, [
    ['Walk through as if you were the guest arriving', false],
    ['Note anything broken, damaged or running low', false],
    ['Check heating or cooling, lights and windows', false],
    ['Confirm keys, lockbox or access details for the next booking', false],
  ]],
];

const tips = [
  ['Leave enough time', 'Block a cleaning window between check-out and check-in in your calendar, so the turnover is never rushed.'],
  ['Keep a spare set', 'Have at least two full sets of linen and towels per bed, so one set can be washed while the other is in use.'],
  ['Same order, every time', 'Working through rooms in the same order is how nothing gets missed — the guest should never be able to tell which stay they are.'],
  ['Photograph your standard', 'Take photos of each room set up exactly how you want it. It makes the standard easy to repeat and to share with whoever cleans.'],
];

export const meta = {
  path: '/airbnb-turnover-checklist',
  out: 'airbnb-turnover-checklist.html',
  title: 'Airbnb Turnover Cleaning Checklist for Auckland Hosts | The Cleanic',
  ogTitle: 'The Airbnb turnover checklist — a free guide for hosts',
  description: 'A free, room-by-room Airbnb turnover checklist for hosts: bedrooms, bathrooms, kitchen, living areas and final checks before the next guest arrives.',
  crumbs: [['/airbnb-cleaning', 'Airbnb cleaning'], ['/airbnb-turnover-checklist', 'Turnover checklist']],
  schema: [{
    '@type': 'Article',
    headline: 'The Airbnb turnover checklist',
    description: 'A room-by-room checklist for preparing a short-stay property between guests.',
    image: `${site.url}/assets/img/checklist-bedroom-1280.webp`,
    datePublished: '2026-10-01',
    author: { '@id': `${site.url}/#business` },
    publisher: { '@id': `${site.url}/#business` },
    mainEntityOfPage: `${site.url}/airbnb-turnover-checklist`,
  }],
  quoteService: 'airbnb',
};

const item = ([text, ours]) => `
  <li class="flex items-start gap-3 border-b border-line py-3.5">
    <span class="mt-[5px] h-4 w-4 flex-none border border-ink/40 print:border-ink" aria-hidden="true"></span>
    <span class="flex-1">${text}${ours ? ' <span class="ml-1 whitespace-nowrap text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-navy">The Cleanic</span>' : ''}</span>
  </li>`;

export const render = () => `
<article>
<section class="pt-[calc(var(--header-h)+2rem)] sm:pt-[calc(var(--header-h)+3.5rem)]" aria-labelledby="hero-title">
  <div class="wrap">
    ${breadcrumb([['/airbnb-cleaning', 'Airbnb cleaning'], ['/airbnb-turnover-checklist', 'Turnover checklist']])}
    <div class="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
      <div class="lg:col-span-7">
        <p class="eyebrow">Free guide for hosts</p>
        <h1 id="hero-title" class="display mt-7 max-w-[13ch]">The Airbnb turnover <em>checklist</em></h1>
        <p class="lead mt-7 max-w-xl">Everything that should happen between one guest leaving and the next arriving — room by room, in the order that works. Use it yourself, or hand it to whoever cleans your property.</p>
        <div class="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8 print:hidden">
          <button type="button" class="btn btn-outline" data-print>Print this checklist</button>
          <a href="#checklist" class="link-arrow self-start sm:self-auto">Go to the checklist ${icon.arrow}</a>
        </div>
      </div>
      <div class="lg:col-span-5 print:hidden">
        <div class="media zoom aspect-[4/3] lg:aspect-[4/5]" ${rv(0, 'image')}>
          ${picture('checklist-bedroom', { sizes: '(min-width: 1024px) 40vw, 100vw', priority: true, className: 'absolute inset-0' })}
        </div>
      </div>
    </div>
  </div>
</section>

<section id="checklist" class="section" aria-labelledby="list-title">
  <div class="wrap grid gap-14 lg:grid-cols-12 lg:gap-12">
    <aside class="lg:col-span-4">
      <div class="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
        <h2 id="list-title" class="h2">Room by room</h2>
        <p class="mt-5 text-ink-soft">Tick each item off as you go. Items marked <span class="whitespace-nowrap text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-navy">The Cleanic</span> are included in every turnover we do — the rest are usually handled by the host.</p>
        <nav aria-label="Checklist sections" class="mt-8 hidden border-t border-line lg:block print:hidden">
          <ol class="grid" role="list">
            ${rooms.map(([r], i) => `<li><a href="#room-${i}" class="flex items-baseline gap-4 border-b border-line py-3 text-[0.9375rem] text-ink-soft hover:text-ink"><span class="num">${String(i + 1).padStart(2, '0')}</span>${r}</a></li>`).join('')}
          </ol>
        </nav>
      </div>
    </aside>
    <div class="grid gap-16 lg:col-span-7 lg:col-start-6">
      ${rooms.map(([room, img, items], i) => `
      <section id="room-${i}" aria-labelledby="room-${i}-title" class="break-inside-avoid" ${rv()}>
        <div class="flex items-baseline gap-4">
          <span class="num text-[1.5rem]">${String(i + 1).padStart(2, '0')}</span>
          <h3 id="room-${i}-title" class="h3">${room}</h3>
        </div>
        ${img ? `<div class="media zoom mt-6 aspect-[16/9] print:hidden" ${rv(0, 'image')}>${picture(img, { sizes: '(min-width: 1024px) 55vw, 100vw', className: 'absolute inset-0' })}</div>` : ''}
        <ul class="mt-5 border-t border-line" role="list">${items.map(item).join('')}</ul>
      </section>`).join('')}
    </div>
  </div>
</section>

<section class="section-sm rule bg-paper print:hidden" aria-labelledby="tips-title">
  <div class="wrap">
    <h2 id="tips-title" class="h2" ${rv()}>Four habits of hosts with consistent turnovers</h2>
    <div class="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
      ${tips.map(([t, d], i) => `
      <div class="border-t border-ink/80 pt-6" ${rv(i * 80)}>
        <h3 class="h4">${t}</h3>
        <p class="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">${d}</p>
      </div>`).join('')}
    </div>
  </div>
</section>
</article>

<div class="print:hidden">
${quoteBand({ title: 'Rather not do it yourself?', text: 'We handle Airbnb and short-stay turnovers across Auckland — beds, bathrooms, kitchen and floors, ready for the next arrival. From $120 per clean.', service: 'airbnb', image: null })}
</div>
`;
