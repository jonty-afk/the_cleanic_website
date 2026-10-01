import { site } from '../data/site.mjs';
import { services, groups, airbnb } from '../data/services.mjs';
import { picture, icon, rv } from '../lib/html.mjs';
import { quoteBand, serviceIndex, breadcrumb } from '../lib/sections.mjs';

export const meta = {
  path: '/services',
  out: 'services.html',
  title: 'Cleaning Services in Auckland | The Cleanic',
  description: 'Airbnb and short-stay turnovers, plus regular, spring, end of tenancy, after builders, carpet and window cleaning across Auckland. See what’s included and starting prices.',
  crumbs: [['/services', 'Services']],
  schema: [{
    '@type': 'ItemList',
    itemListElement: [{ slug: 'airbnb-cleaning', name: airbnb.name }, ...services].map((s, i) => ({ '@type': 'ListItem', position: i + 1, name: s.name, url: `${site.url}/${s.slug}` })),
  }],
};

export const render = () => `
<section class="pt-[calc(var(--header-h)+2rem)] sm:pt-[calc(var(--header-h)+3.5rem)]" aria-labelledby="hero-title">
  <div class="wrap">
    ${breadcrumb([['/services', 'Services']])}
    <div class="mt-10 grid gap-8 lg:grid-cols-12">
      <div class="lg:col-span-8">
        <p class="eyebrow" ${rv()}>Services · Auckland</p>
        <h1 id="hero-title" class="display mt-7 max-w-[12ch]" ${rv(80)}>Cleaning, <em>properly</em> done.</h1>
      </div>
      <p class="lead self-end lg:col-span-4" ${rv(160)}>Airbnb and short-stay turnovers are our focus. We also take on deeper cleans, move-outs and specialist jobs across Auckland.</p>
    </div>
  </div>
</section>

<!-- Featured: Airbnb -->
<section class="section-sm" aria-labelledby="featured-title">
  <div class="wrap">
    <a href="/airbnb-cleaning" data-tilt="3" class="group relative grid overflow-hidden bg-night text-linen lg:grid-cols-12" ${rv()}>
      <div class="media zoom aspect-[4/3] lg:col-span-7 lg:aspect-auto lg:min-h-[32rem]">
        ${picture('bedroom-pendant', { sizes: '(min-width: 1024px) 58vw, 100vw', className: 'absolute inset-0' })}
      </div>
      <div class="on-dark flex flex-col justify-between gap-10 p-8 sm:p-12 lg:col-span-5">
        <div>
          <p class="eyebrow">Our speciality</p>
          <h2 id="featured-title" class="h1 mt-6">Airbnb &amp; short-stay turnovers</h2>
          <p class="mt-6 max-w-sm text-night-mute">Cleaning and resetting short-stay properties between guests — beds, bathrooms, kitchen and floors — ready for the next arrival.</p>
        </div>
        <div class="flex items-end justify-between gap-6 border-t border-night-line pt-6">
          <span class="text-[0.9375rem] font-semibold">From ${site.airbnbFrom} per clean</span>
          <span class="link-arrow">Explore ${icon.arrow}</span>
        </div>
      </div>
    </a>
  </div>
</section>

<!-- All services by group -->
<section class="section pt-10 sm:pt-16" aria-label="All services">
  <div class="wrap grid gap-16 sm:gap-20">
    ${groups.map((g) => `
    <div class="grid gap-8 lg:grid-cols-12">
      <h2 class="h2 lg:col-span-3" ${rv()}>${g}</h2>
      <div class="lg:col-span-9">${serviceIndex(services.filter((s) => s.group === g), { numbered: false })}</div>
    </div>`).join('')}
    <p class="fine max-w-2xl lg:ml-[25%]" ${rv()}>Prices are starting points or typical ranges. Your quote depends on the size of the property, its condition and what you need. Services are subject to availability — see our <a class="link-underline" href="/terms">terms &amp; conditions</a>.</p>
  </div>
</section>

${quoteBand({ title: 'Not sure which service you need?', text: 'Tell us about the property and what you’d like done. We’ll recommend the right clean and send you a quote.', image: 'living-neutral' })}
`;
