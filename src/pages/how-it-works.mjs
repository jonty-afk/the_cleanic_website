import { site } from '../data/site.mjs';
import { films } from '../data/films.mjs';
import { icon, rv } from '../lib/html.mjs';
import { quoteBand, breadcrumb } from '../lib/sections.mjs';

const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}`;
const entries = Object.entries(films);
const [featured, ...rest] = entries;

export const meta = {
  path: '/how-it-works',
  out: 'how-it-works.html',
  title: 'How It Works | Airbnb Turnover Cleaning Explained | The Cleanic',
  description: 'How The Cleanic works, in four short films: what happens in an Airbnb turnover, what every clean covers, and how to get a quote in Auckland.',
  crumbs: [['/how-it-works', 'How it works']],
  schema: entries.map(([slug, f]) => ({
    '@type': 'VideoObject',
    name: f.title,
    description: f.description,
    thumbnailUrl: `${site.url}/assets/video/${slug}-poster-1280.webp`,
    contentUrl: `${site.url}/assets/video/${slug}.mp4`,
    uploadDate: '2026-10-01',
    duration: `PT${Math.round(f.duration)}S`,
    publisher: { '@id': `${site.url}/#business` },
  })),
};

const player = (slug, f, { priority = false, sizes = '' } = {}) => `
<div class="video-frame media aspect-video bg-night" data-video data-tilt="4">
  <video class="absolute inset-0 h-full w-full object-cover" preload="none" playsinline
    poster="/assets/video/${slug}-poster-${priority ? 1280 : 640}.webp"
    aria-label="${f.title} — ${fmt(f.duration)} film, no sound. Transcript below.">
    <source src="/assets/video/${slug}.mp4" type="video/mp4">
  </video>
  <button type="button" class="video-play group absolute inset-0 grid place-items-center" data-video-play aria-label="Play: ${f.title} (${fmt(f.duration)})">
    <span class="grid h-20 w-20 place-items-center rounded-full bg-linen/95 text-ink transition-transform duration-500 ease-soft group-hover:scale-105 sm:h-24 sm:w-24">
      <svg class="ml-1 h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15l12.5-7.5z"/></svg>
    </span>
    <span class="absolute right-4 top-4 bg-ink/70 px-2.5 py-1 text-[0.8125rem] font-semibold text-linen">${fmt(f.duration)}</span>
  </button>
</div>`;

const transcript = (f) => `
<details class="faq-item mt-4 border-b border-line">
  <summary class="!py-4 !font-sans !text-[0.9375rem] !font-semibold"><span>Read the transcript</span><span class="plus" aria-hidden="true"></span></summary>
  <ol class="answer grid gap-2 text-[0.9375rem]" role="list">${f.transcript.map((l) => `<li>${l}</li>`).join('')}</ol>
</details>`;

export const render = () => `
<section class="pt-[calc(var(--header-h)+2rem)] sm:pt-[calc(var(--header-h)+3.5rem)]" aria-labelledby="hero-title">
  <div class="wrap">
    ${breadcrumb([['/how-it-works', 'How it works']])}
    <div class="mt-10 grid gap-8 lg:grid-cols-12">
      <div class="lg:col-span-8">
        <p class="eyebrow">How it works</p>
        <h1 id="hero-title" class="display mt-7 max-w-[13ch]">How we work, in <em>four short films</em>.</h1>
      </div>
      <div class="self-end lg:col-span-4">
        <p class="lead">Short explainers on how we clean and reset short-stay properties between guests, what every clean covers, and how to get started.</p>
      </div>
    </div>

    <article class="mt-14 sm:mt-20" aria-labelledby="film-${featured[0]}">
      ${player(featured[0], featured[1], { priority: true })}
      <div class="mt-8 grid gap-6 lg:grid-cols-12">
        <div class="lg:col-span-5">
          <p class="eyebrow">Featured · ${fmt(featured[1].duration)}</p>
          <h2 id="film-${featured[0]}" class="h2 mt-4">${featured[1].title}</h2>
        </div>
        <div class="lg:col-span-6 lg:col-start-7">
          <p class="text-ink-soft">${featured[1].description}</p>
          ${transcript(featured[1])}
        </div>
      </div>
    </article>
  </div>
</section>

<section class="section" aria-labelledby="more-films">
  <div class="wrap">
    <h2 id="more-films" class="h2" ${rv()}>More explainers</h2>
    <div class="mt-12 grid gap-14 md:grid-cols-3 md:gap-8">
      ${rest.map(([slug, f], i) => `
      <article ${rv(i * 90)} aria-labelledby="film-${slug}">
        ${player(slug, f)}
        <p class="fine mt-6">${fmt(f.duration)}</p>
        <h3 id="film-${slug}" class="h3 mt-1">${f.title}</h3>
        <p class="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">${f.description}</p>
        ${transcript(f)}
      </article>`).join('')}
    </div>
    <p class="fine mt-16 max-w-2xl" ${rv()}>These explainer films were made for The Cleanic using licensed stock photography (Unsplash). They show how we work and are not footage of specific properties or jobs.</p>
  </div>
</section>

${quoteBand({ image: null, service: 'airbnb' })}
`;
