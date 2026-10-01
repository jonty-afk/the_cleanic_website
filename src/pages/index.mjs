import { site } from '../data/site.mjs';
import { services, groups } from '../data/services.mjs';
import { businessSchema } from '../lib/layout.mjs';
import { picture, icon, checklist, rv } from '../lib/html.mjs';
import { quoteBand, turnoverSteps } from '../lib/sections.mjs';

export const meta = {
  path: '/',
  out: 'index.html',
  title: 'Airbnb & Short-Stay Cleaning in Auckland | The Cleanic',
  ogTitle: 'The Cleanic — Airbnb & short-stay cleaning in Auckland',
  description: 'Airbnb and short-stay turnover cleaning in Auckland. Beds remade, kitchens and bathrooms cleaned, floors done — guest-ready between every stay. From $120 per clean.',
  schema: [businessSchema(), { '@type': 'WebSite', '@id': `${site.url}/#website`, url: `${site.url}/`, name: 'The Cleanic', publisher: { '@id': `${site.url}/#business` } }],
  preload: [`href="/assets/img/bedroom-linen-1280.avif" imagesrcset="/assets/img/bedroom-linen-640.avif 640w, /assets/img/bedroom-linen-1280.avif 1280w, /assets/img/bedroom-linen-1920.avif 1920w" imagesizes="(min-width: 1024px) 50vw, 100vw" type="image/avif"`],
  quoteService: 'airbnb',
};

const covered = [
  ['Bedrooms', ['Bed linen changed and beds made', 'Surfaces dusted and wiped']],
  ['Bathrooms', ['Toilet, basin, shower and tiles cleaned and sanitised', 'Fresh towels set out']],
  ['Kitchen', ['Benches, sink and appliances cleaned', 'Rubbish removed']],
  ['Living areas & floors', ['Surfaces wiped down', 'Floors vacuumed and mopped']],
];

const propertyTypes = [
  ['apartment-bedroom', 'Apartments & studios', 'City apartments and compact studios, where every surface is on show.'],
  ['house-living', 'Houses & townhouses', 'Larger homes with more bedrooms, bathrooms and living space to turn over.'],
  ['holiday-attic', 'Holiday homes', 'Holiday rentals and baches that need to be ready whenever the next booking arrives.'],
];

export const render = () => `
<!-- Hero -->
<section class="relative pt-[calc(var(--header-h)+1.5rem)] sm:pt-[calc(var(--header-h)+3rem)] lg:pt-[calc(var(--header-h)+2rem)]" aria-labelledby="hero-title">
  <div class="wrap grid gap-8 sm:gap-10 lg:min-h-[calc(100svh-var(--header-h)-2rem)] lg:grid-cols-12 lg:grid-rows-[1fr_auto] lg:gap-x-12 lg:gap-y-0 lg:pb-14">
    <div class="lg:col-span-6 lg:row-start-1 lg:self-end">
      <p class="eyebrow" ${rv()}>Airbnb &amp; short-stay cleaning · Auckland</p>
      <h1 id="hero-title" class="display mt-6 sm:mt-7" ${rv(80)}>Guest-ready between <em>every</em> stay.</h1>
    </div>
    <div class="relative lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1" data-depth-scene>
      <div class="media aspect-[16/11] lg:absolute lg:inset-0 lg:aspect-auto" data-depth="-10" ${rv(0, 'image')}>
        ${picture('bedroom-linen', { sizes: '(min-width: 1024px) 50vw, 100vw', priority: true, className: 'absolute inset-0', position: '50% 60%' })}
      </div>
      <div class="media depth-shadow absolute -bottom-10 right-4 hidden aspect-square w-[30%] border-[10px] border-linen sm:block lg:-left-8 lg:bottom-10 lg:right-auto lg:w-[30%] xl:-left-16 xl:w-[36%]" data-depth="26" ${rv(300, 'image')}>
        ${picture('bedside-tray', { sizes: '(min-width: 1024px) 18vw, 30vw', className: 'absolute inset-0' })}
      </div>
    </div>
    <div class="lg:col-span-6 lg:row-start-2 lg:pb-2">
      <p class="lead max-w-[34rem] lg:mt-7" ${rv(160)}>The Cleanic cleans Airbnb and short-stay properties across Auckland. When one guest checks out, we turn the property around — beds, bathrooms, kitchen and floors — ready for the next arrival.</p>
      <div class="mt-8 flex flex-col gap-4 sm:mt-9 sm:flex-row sm:items-center sm:gap-8" ${rv(240)}>
        <a href="/get-a-quote?service=airbnb" class="btn btn-primary">Get a quote ${icon.arrow}</a>
        <a href="#turnover" class="link-arrow self-start sm:self-auto">How a turnover works ${icon.arrow}</a>
      </div>
      <dl class="mt-12 grid grid-cols-2 gap-y-5 border-t border-line pt-6 sm:grid-cols-3 lg:mt-14" ${rv(320)}>
        <div><dt class="fine">Turnovers</dt><dd class="mt-1 text-[0.9375rem] font-semibold">From ${site.airbnbFrom} per clean</dd></div>
        <div><dt class="fine">Service area</dt><dd class="mt-1 text-[0.9375rem] font-semibold">Auckland</dd></div>
        <div class="col-span-2 sm:col-span-1"><dt class="fine">Talk to us</dt><dd class="mt-1 text-[0.9375rem] font-semibold"><a href="tel:${site.phone.tel}" class="link-underline">${site.phone.display}</a></dd></div>
      </dl>
    </div>
  </div>
  <div class="wrap mt-12 sm:mt-16 lg:mt-0">
    <nav aria-label="Other services" class="flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-line py-5">
      <span class="eyebrow">Also available</span>
      ${['regular-cleaning', 'spring-cleaning', 'end-of-tenancy-cleaning', 'carpet-cleaning', 'window-cleaning', 'commercial-cleaning'].map((slug) => { const sv = services.find((x) => x.slug === slug); return `<a href="/${slug}" class="text-[0.9375rem] font-medium text-ink-soft underline decoration-line underline-offset-4 transition-colors hover:text-ink hover:decoration-ink">${sv.name}</a>`; }).join('')}
      <a href="/services" class="link-arrow text-[0.9375rem] sm:ml-auto">All services ${icon.arrow}</a>
    </nav>
  </div>
</section>

<!-- The host problem -->
<section class="section" aria-labelledby="gap-title">
  <div class="wrap grid gap-12 lg:grid-cols-12 lg:gap-12">
    <div class="lg:col-span-7">
      <p class="eyebrow" ${rv()}>The gap between guests</p>
      <h2 id="gap-title" class="h1 mt-6 max-w-[17ch]" ${rv(80)}>One guest leaves. The next is already on the way.</h2>
    </div>
    <div class="grid content-end gap-6 text-ink-soft lg:col-span-4 lg:col-start-9" ${rv(160)}>
      <p>Every stay leaves the same jobs behind: beds to strip and remake, a bathroom and kitchen to reset, floors to do and rubbish to clear. It all has to be done properly, and it has to be done before the next check-in.</p>
      <p>That turnover is what we focus on. We schedule around your bookings and clean to the same standard each time, so every guest walks into a property that looks the way your listing promised.</p>
    </div>
  </div>
  <div class="wrap mt-16 grid grid-cols-12 gap-4 sm:mt-24 sm:gap-6">
    <div class="media zoom col-span-12 aspect-[16/10] sm:col-span-8 sm:aspect-[16/10]" ${rv(0, 'image')}>
      ${picture('kitchen-dining', { sizes: '(min-width: 640px) 66vw, 100vw', className: 'absolute inset-0' })}
    </div>
    <div class="col-span-12 flex flex-col gap-4 sm:col-span-4 sm:gap-5">
      <div class="media zoom aspect-[4/3] sm:aspect-auto sm:flex-1" ${rv(120, 'image')}>
        ${picture('soap-detail', { sizes: '(min-width: 640px) 33vw, 100vw', className: 'absolute inset-0' })}
      </div>
      <p class="fine max-w-xs" ${rv(200)}>Kitchens, bathrooms and beds are what guests notice first — so that’s where every turnover starts.</p>
    </div>
  </div>
</section>

<!-- Turnover process -->
<section id="turnover" class="on-dark section bg-night text-linen" aria-labelledby="turnover-title">
  <div class="wrap">
    <div class="grid gap-8 lg:grid-cols-12">
      <div class="lg:col-span-6">
        <p class="eyebrow" ${rv()}>How a turnover works</p>
        <h2 id="turnover-title" class="h1 mt-6 max-w-[14ch]" ${rv(80)}>From check-out to <em>guest-ready</em>.</h2>
      </div>
      <p class="lead self-end lg:col-span-4 lg:col-start-9" ${rv(160)}>Four stages, the same way every time. You get a property that’s ready for the next arrival.</p>
    </div>

    <div class="mt-16 grid gap-12 sm:mt-24 lg:grid-cols-12 lg:gap-12" data-steps>
      <div class="hidden lg:col-span-6 lg:block">
        <div class="step-stage sticky top-[calc(var(--header-h)+2rem)]">
          <div class="media aspect-[4/5] bg-night-line" ${rv(0, 'image')}>
            ${turnoverSteps.map((s, i) => `<div class="step-img absolute inset-0 ${i ? 'opacity-0' : ''}" data-step-img="${i}">${picture(s.image, { sizes: '45vw', className: 'absolute inset-0' })}</div>`).join('')}
          </div>
        </div>
      </div>
      <ol class="lg:col-span-5 lg:col-start-8" role="list">
        ${turnoverSteps.map((s, i) => `
        <li class="border-t border-night-line py-10 lg:flex lg:min-h-[56vh] lg:flex-col lg:justify-center lg:py-16" data-step="${i}">
          <div class="media mb-8 aspect-[16/10] lg:hidden" ${rv(0, 'image')}>${picture(s.image, { sizes: '100vw', className: 'absolute inset-0' })}</div>
          <p class="num text-[3.5rem] leading-none sm:text-[4.5rem]" ${rv()}>${s.n}</p>
          <h3 class="h2 mt-5" ${rv(60)}>${s.title}</h3>
          <p class="mt-5 max-w-md text-night-mute" ${rv(120)}>${s.text}</p>
        </li>`).join('')}
      </ol>
    </div>
  </div>
</section>

<!-- What every turnover covers -->
<section class="section" aria-labelledby="covers-title">
  <div class="wrap grid gap-14 lg:grid-cols-12 lg:gap-12">
    <div class="lg:col-span-5">
      <div class="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
        <p class="eyebrow" ${rv()}>Included</p>
        <h2 id="covers-title" class="h1 mt-6 max-w-[12ch]" ${rv(80)}>What every turnover covers</h2>
        <div class="media zoom mt-10 aspect-[4/5] max-w-md" ${rv(160, 'image')}>
          ${picture('bathroom-bath', { sizes: '(min-width: 1024px) 34vw, 100vw', className: 'absolute inset-0' })}
        </div>
      </div>
    </div>
    <div class="lg:col-span-6 lg:col-start-7">
      <div class="grid gap-12 sm:grid-cols-2 sm:gap-x-10">
        ${covered.map(([room, items], i) => `
        <div ${rv(i * 80)}>
          <h3 class="h3 mb-5">${room}</h3>
          ${checklist(items)}
        </div>`).join('')}
      </div>
      <div class="mt-14 border border-line bg-paper p-7 sm:p-9" ${rv()}>
        <p class="font-serif text-[1.75rem] leading-tight">From ${site.airbnbFrom} per clean.</p>
        <p class="mt-3 text-ink-soft">The final price depends on the size of the property and what it needs. Tell us about yours and we’ll quote it.</p>
        <div class="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
          <a href="/get-a-quote?service=airbnb" class="btn btn-primary">Get a quote ${icon.arrow}</a>
          <a href="/airbnb-cleaning" class="link-arrow">Airbnb cleaning in detail ${icon.arrow}</a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Property types -->
<section class="section rule bg-sand/40" aria-labelledby="types-title">
  <div class="wrap">
    <div class="grid gap-8 lg:grid-cols-12">
      <div class="lg:col-span-7">
        <p class="eyebrow" ${rv()}>Property types</p>
        <h2 id="types-title" class="h1 mt-6 max-w-[15ch]" ${rv(80)}>Short-stay properties, large and small</h2>
      </div>
      <p class="self-end text-ink-soft lg:col-span-4 lg:col-start-9" ${rv(160)}>Whatever the size of the listing, the job is the same: get it ready for the next guest, and get it right every time.</p>
    </div>
    <div class="mt-14 grid gap-12 sm:mt-20 md:grid-cols-3 md:gap-8">
      ${propertyTypes.map(([img, title, text], i) => `
      <article class="${i === 1 ? 'md:mt-24' : ''}" ${rv(i * 100)}>
        <div class="media zoom aspect-[4/5]" ${rv(i * 100, 'image')}>${picture(img, { sizes: '(min-width: 768px) 33vw, 100vw', className: 'absolute inset-0' })}</div>
        <h3 class="h3 mt-6">${title}</h3>
        <p class="mt-3 max-w-sm text-ink-soft">${text}</p>
      </article>`).join('')}
    </div>
  </div>
</section>

<!-- Other services -->
<section class="section rule" aria-labelledby="more-title">
  <div class="wrap">
    <div class="grid gap-8 lg:grid-cols-12">
      <div class="lg:col-span-7">
        <p class="eyebrow" ${rv()}>Beyond turnovers</p>
        <h2 id="more-title" class="h1 mt-6 max-w-[14ch]" ${rv(80)}>Every other clean, done properly</h2>
      </div>
      <div class="self-end lg:col-span-4 lg:col-start-9" ${rv(160)}>
        <p class="text-ink-soft">Airbnb turnovers are our focus, and we take on the rest too — deep cleans, move-outs, regular home cleaning and workplaces across Auckland.</p>
        <a href="/services" class="link-arrow mt-5">All services ${icon.arrow}</a>
      </div>
    </div>
    <div class="mt-14 grid gap-12 sm:mt-20 md:grid-cols-3 md:gap-8 lg:gap-12">
      ${groups.map((g, gi) => `
      <div ${rv(gi * 90)}>
        <h3 class="eyebrow">${g}</h3>
        <ul class="mt-6 border-t border-line" role="list">
          ${services.filter((sv) => sv.group === g).map((sv) => `
          <li><a href="/${sv.slug}" class="group flex items-baseline justify-between gap-4 border-b border-line py-5">
            <span><span class="block font-serif text-[1.5rem] leading-tight text-ink transition-colors group-hover:text-navy">${sv.name}</span><span class="mt-1 block text-[0.875rem] text-ink-mute">${sv.price}</span></span>
            <span class="text-ink transition-transform duration-500 ease-soft group-hover:translate-x-1">${icon.arrow}</span>
          </a></li>`).join('')}
        </ul>
      </div>`).join('')}
    </div>
  </div>
</section>

${quoteBand({ service: 'airbnb' })}
`;
