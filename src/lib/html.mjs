import { readFileSync } from 'node:fs';

const images = JSON.parse(readFileSync(new URL('../data/images.json', import.meta.url)));

export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * Responsive <picture> with AVIF + WebP sources.
 * @param {string} slug  key in images.json
 * @param {object} o     { sizes, className, imgClass, priority, alt, ratio }
 */
export function picture(slug, o = {}) {
  const im = images[slug];
  if (!im) throw new Error(`Unknown image: ${slug}`);
  const sizes = o.sizes || '100vw';
  const set = (ext) => im.widths.map((w) => `/assets/img/${slug}-${w}.${ext} ${w}w`).join(', ');
  const fallbackW = im.widths.includes(1280) ? 1280 : im.widths[im.widths.length - 1];
  const w = 1280;
  const h = Math.round(w / im.ratio);
  const alt = o.alt ?? im.alt;
  const load = o.priority ? 'fetchpriority="high" loading="eager"' : 'loading="lazy"';
  return `<picture${o.className ? ` class="${o.className}"` : ''}>` +
    `<source type="image/avif" srcset="${set('avif')}" sizes="${sizes}">` +
    `<source type="image/webp" srcset="${set('webp')}" sizes="${sizes}">` +
    `<img src="/assets/img/${slug}-${fallbackW}.webp" alt="${esc(alt)}" width="${w}" height="${h}" ${load} decoding="async"${o.imgClass ? ` class="${o.imgClass}"` : ''}${o.position ? ` style="object-position:${o.position}"` : ''}>` +
    `</picture>`;
}

export const imageUrl = (slug, w = 1280) => `/assets/img/${slug}-${w}.webp`;

export const icon = {
  arrow: `<svg class="arrow h-3 w-3.5" viewBox="0 0 14 12" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M0 6h12.5M8 1.2 12.8 6 8 10.8"/></svg>`,
  tick: `<svg class="tick" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m2 7.4 3.2 3.1L12 3.5"/></svg>`,
  phone: `<svg class="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="M5.6 1.8 3.4 2.3c-.8.2-1.3 1-1.2 1.8.9 5 4.7 8.8 9.7 9.7.8.1 1.6-.4 1.8-1.2l.5-2.2-3-1.4-1.4 1.6a8.4 8.4 0 0 1-3.8-3.8L7.6 5.4 6.2 2.4z"/></svg>`,
  mail: `<svg class="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><rect x="1.5" y="3" width="13" height="10" rx="1"/><path d="m2 4 6 5 6-5"/></svg>`,
  alert: `<svg class="h-4 w-4 flex-none" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><circle cx="8" cy="8" r="6.5"/><path d="M8 4.5v4.2M8 10.8v.7"/></svg>`,
  instagram: `<svg class="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".6" fill="currentColor"/></svg>`,
  facebook: `<svg class="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-7.6h2.6l.4-3h-3V8.5c0-.9.3-1.5 1.5-1.5h1.6V4.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1z"/></svg>`,
  tiktok: `<svg class="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.6 3h-3v12.2a2.7 2.7 0 1 1-2.7-2.7c.3 0 .6 0 .8.1V9.5a5.8 5.8 0 1 0 4.9 5.7V9a7.4 7.4 0 0 0 4.2 1.3v-3A4.3 4.3 0 0 1 16.6 3z"/></svg>`,
};

export const mark = (cls = 'h-8 w-auto text-navy', id = 'cm') =>
  `<svg class="${cls}" viewBox="0 0 86 128" fill="currentColor" aria-hidden="true"><defs><mask id="${id}"><rect width="86" height="128" fill="#fff"/><path d="M-2 103 L62 51 L92 76" fill="none" stroke="#000" stroke-width="7.5"/><rect x="24" y="96" width="8.5" height="40" fill="#000"/><g fill="#000"><rect x="52.5" y="92.5" width="8.6" height="8.6"/><rect x="63.4" y="92.5" width="8.6" height="8.6"/><rect x="52.5" y="103.4" width="8.6" height="8.6"/><rect x="63.4" y="103.4" width="8.6" height="8.6"/></g></mask></defs><path mask="url(#${id})" d="M41 0C29 22 0 52 0 85a43 43 0 0 0 86 0c0-8-2-15-6-24Z"/></svg>`;

export const checklist = (items, cls = '') =>
  `<ul class="checklist ${cls}" role="list">${items.map((i) => `<li>${icon.tick}<span>${i}</span></li>`).join('')}</ul>`;

/** Reveal attribute helper with optional stagger delay (ms). */
export const rv = (d = 0, type = '') => `data-reveal${type ? `="${type}"` : ''}${d ? ` style="--d:${d}ms"` : ''}`;
