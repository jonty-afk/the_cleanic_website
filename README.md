# The Cleanic — website

Airbnb & short-stay cleaning in Auckland. Static site deployed on Vercel.

## How it works

Pages are written as small JavaScript templates in `src/` and built into plain HTML files at the project root (the folder Vercel serves). There is no framework and no client-side rendering.

```
src/
  data/site.mjs        Business facts (phone, email, hours, socials, Getform endpoints) — edit here once
  data/services.mjs    Service content and prices
  data/images.json     Image manifest (sizes, alt text, source)
  lib/layout.mjs       <head>, header, mobile menu, footer, sticky mobile CTA, structured data
  lib/sections.mjs     Shared sections (FAQ, quote band, service index, turnover steps)
  lib/html.mjs         Helpers: responsive <picture>, icons, logo mark
  pages/*.mjs          One file per page; _service.mjs renders every service page
  styles.css           Design system (Tailwind v3 + component classes)
assets/
  css/site.css         Built CSS (generated)
  js/site.js           All site behaviour: menu, reveals, forms (no dependencies)
  img/                 AVIF + WebP at 640/1280/1920 widths
  fonts/               Self-hosted Instrument Serif + Hanken Grotesk (latin subset)
  brand/               Logo mark (SVG), app icons, original logo
scripts/build.mjs      Renders pages, sitemap.xml, robots.txt, site.webmanifest
scripts/serve.mjs      Local server with Vercel-style clean URLs
```

## Commands

```bash
npm install
npm run build   # CSS + HTML
npm run dev     # build, then serve at http://localhost:3000
```

Generated files (root `*.html`, `assets/css/site.css`, `sitemap.xml`, `robots.txt`) are committed so the site deploys even if Vercel skips the build step. Run `npm run build` before committing changes to `src/`.

## Forms

Both original Getform endpoints are kept exactly as they were wired before the redesign:

- Quote form (`/get-a-quote`) → `https://getform.io/f/bxoykmza`
- Contact form (`/contact`) → `https://getform.io/f/bmdmrdga`

Submissions are sent in the background and the visitor sees an on-site thank-you state. Without JavaScript the forms post normally and redirect to `/thank-you`.

## Waiting on confirmation from the business

These were left out or kept conservative because the old site's claims could not be verified:

- **Airbnb service:** bed linen changes and towels are shown. A **linen service** (fresh, washed and pressed linen supplied; used linen laundered via the owner's laundry partner) and **single-use guest toiletries** were confirmed by the owner in October 2026 and are offered as add-ons, priced with the quote (`addOns` in `src/data/pricing.mjs`). Final inspections, key/lock handling and same-day turnovers are **not** claimed.
- **Removed claims:** 24/7 availability, flood extraction, biohazard cleanup, water blasting, laundry pickup/delivery, 48-hour and deposit-return guarantees, safety certifications, secure payment portal, insurance, and eco-friendly products (in marketing copy).
- **Terms & conditions:** kept word for word from the original site. They still say products are "eco-friendly unless specified otherwise" and describe The Cleanic as "a registered business in New Zealand" — please confirm or edit.
- **Phone number:** the old site used 021 175 9393; 022 154 2994 also appeared once, but its link dialled 021 175 9393. Both have been replaced by 021 0260 6025 (confirmed by the owner, October 2026).
- **Company history:** the old About page said founded 2018 and nationwide (Auckland, Wellington, Christchurch, Hamilton); other pages said Auckland only. History has been removed and the site now says Auckland only.
- **Testimonials:** the four old homepage quotes are not shown until their source is confirmed. Genuine Google or Airbnb reviews can be added with a link to the source.
- **Promotion:** the 20% first-clean popup has been removed.
- **Domain:** canonical URLs, sitemap and structured data use `https://the-cleanic-website.vercel.app`. Change `site.url` in `src/data/site.mjs` if a custom domain is added.

## How it works (films)

`/how-it-works` (previously `/videos`, which now redirects) shows four short films (`assets/video/*.mp4`, H.264 1080p, silent, 20–28 seconds each) with poster images and on-page transcripts. They were produced for the site from licensed stock photography with on-screen text, and the page says so: they illustrate the process and are **not** footage of real jobs. Titles, descriptions and transcripts live in `src/data/films.mjs`; if a film is re-edited, update that file to match.

To add real footage later, drop an `.mp4` and a poster into `assets/video/` and add an entry to `src/data/films.mjs`.

## Images

Every photo on the site is used exactly once — no image appears on more than one page or twice on the same page (the home turnover section shows one image per step, swapped between mobile and desktop layouts). When adding a page, pick an unused image or add a new one to `src/data/images.json`.

## Services

Airbnb & short-stay turnovers are the headline service. The other 11 services are grouped as *Deep & specialist cleans*, *Homes & moving* and *Business & events* (`groups` in `src/data/services.mjs`) and appear in the Services dropdown, mobile menu, footer, homepage and `/services`. Commercial cleaning was listed on the original homepage and now has its own page; it shows "Quote on request" because the original site gave no price.

## Pricing

All public prices live in `src/data/pricing.mjs` — change a number there and run `npm run build`; every page, FAQ, meta description and structured-data entry updates. Prices are cleaning-only starting prices ("From …"); Commercial, Emergency and 5+ bedroom Airbnb are quote on request. No GST wording is shown because GST status hasn't been confirmed.

The "What every turnover covers" film (`assets/video/what-every-turnover-covers.mp4`) has "from $120 per clean" baked into its end card — re-render it if the 1-bedroom Airbnb price changes.

## Analytics

Vercel Web Analytics is wired in (it is skipped on localhost). It starts collecting once it is switched on in the Vercel dashboard: Project → Analytics → Enable. No cookies are used.

## Host turnover checklist

`/airbnb-turnover-checklist` is a free, printable guide for hosts. Items tagged "The Cleanic" are only those included in every turnover on `/airbnb-cleaning`; everything else is presented as a host task. Keep the two lists in step if the service changes.

## Image credits

All photography is from Unsplash under the free Unsplash Licence (commercial use permitted; no Unsplash+ images). Images were downloaded, colour-graded consistently and re-encoded locally.

| File | Source |
| --- | --- |
| bedroom-linen | https://unsplash.com/photos/white-bed-pillow-on-brown-wooden-bed-frame-gVKmonDbotU |
| towels-on-bed | https://unsplash.com/photos/a-stack-of-brown-paper-Zlm38pirg54 |
| bedroom-window | https://unsplash.com/photos/vacant-white-bed-near-the-window-B4rEJ09-Puo |
| bathroom-bath | https://unsplash.com/photos/a-luxurious-bathroom-with-a-freestanding-bathtub-JGfXR2a8RNg |
| bathroom-vanity | https://unsplash.com/photos/clear-glass-jar-with-brown-sticks-JShZUXLqjcM |
| bathroom-timber | https://unsplash.com/photos/a-bathroom-with-a-toilet-sink-and-mirror-bZDWpKYCCao |
| kitchen-galley | https://unsplash.com/photos/white-wooden-kitchen-island-and-cupboard-cabinets-near-glass-panel-door-AQl-J19ocWE |
| kitchen-dining | https://unsplash.com/photos/brown-wooden-table-with-chairs-nzGV4YQ5fII |
| kitchen-open | https://unsplash.com/photos/a-kitchen-with-a-refrigerator-freezer-sitting-next-to-a-counter-KYM5QsbRsxk |
| living-neutral | https://unsplash.com/photos/a-living-room-with-a-couch-and-a-table-g_5UyVBIX_k |
| living-curved | https://unsplash.com/photos/white-sofa-near-round-table-eNHZC6dEi0Y |
| linen-light | https://unsplash.com/photos/gray-textile-on-white-textile-rH2V_fAozGo |
| holiday-bedroom | https://unsplash.com/photos/a-bedroom-with-a-bed-and-a-large-window-p6pfOaavscc |
| auckland | https://unsplash.com/photos/people-riding-on-boat-on-sea-near-city-buildings-during-daytime-ieU1BWQJEmI |
| dining | https://unsplash.com/photos/a-dining-room-with-a-table-and-chairs-aYjdg6wZrOU |
| empty-room | https://unsplash.com/photos/white-wooden-framed-glass-window-Cu2xZLKgn10 |
| renovated-room | https://unsplash.com/photos/ladder-stool-and-snake-plant-DLD5LvnFblU |
| window-light | https://unsplash.com/photos/white-plastic-trash-bin-beside-white-curtain-lZfBkUqknEI |
| curtain-light | https://unsplash.com/photos/white-and-brown-window-curtain-LdPzzJcrPLM |
| living-rug | https://unsplash.com/photos/white-sofa-near-brown-wooden-chair-nQBc6clG3X4 |
| linen-stack | https://unsplash.com/photos/white-textile-on-brown-wooden-table-AXWyDjC_Y3U |
| living-calm | https://unsplash.com/photos/a-living-room-filled-with-furniture-and-a-large-window-OtXADkUh3-I |
| checkout-bed | https://unsplash.com/photos/black-android-smartphone-on-bed-Q4KQWFKX0Gs |
| bed-making | https://unsplash.com/photos/a-woman-putting-a-blue-blanket-on-top-of-a-bed-Y9xl0rnRd1I |
| clean-products | https://unsplash.com/photos/two-brown-spray-bottles-on-brown-table-uooMllXe6gE |
| towels-rolled | https://unsplash.com/photos/a-pair-of-white-gloves-Q_cAsBDLEI0 |
| bedside-tray | https://unsplash.com/photos/white-and-brown-ceramic-mug-on-brown-wooden-round-table-FTMpAmPRSdg |
| soap-detail | https://unsplash.com/photos/ribbed-glass-soap-dispenser-with-gold-pump-on-a-windowsill-7gYlkoV1e1A |
| apartment-bedroom | https://unsplash.com/photos/a-bed-with-a-lamp-on-it-kQjEq2bNFS0 |
| house-living | https://unsplash.com/photos/a-living-room-filled-with-furniture-and-a-large-window--_eNaluvWv0 |
| holiday-attic | https://unsplash.com/photos/a-bedroom-with-two-beds-and-a-desk-rP0OTFdVaak |
| sheets-unmade | https://unsplash.com/photos/white-pillows-and-bed-comforter--R2uNyGmeM4 |
| pillows-fresh | https://unsplash.com/photos/a-bed-with-a-lamp-on-it-999xEzwi7oA |
| bath-amber | https://unsplash.com/photos/a-bottle-of-soap-sitting-on-a-bathroom-counter-00l8o8UJI_Y |
| made-bed-warm | https://unsplash.com/photos/a-bed-with-a-white-comforter-and-pillows-9Cmony35LOE |
| hotel-pillows | https://unsplash.com/photos/white-bed-pillow-on-white-bed-6MYm-cUJRB0 |
| bedroom-pendant | https://unsplash.com/photos/a-bed-with-white-sheets-and-pillows-in-a-room-qifUgNsrWmU |
| entry-hall | https://unsplash.com/photos/a-cozy-entryway-with-wooden-stairs-and-a-glass-door-NfyeP5Bcvd8 |
| bath-light | https://unsplash.com/photos/a-bathtub-in-a-bathroom-nYfx6BtdEeE |
| entry-modern | https://unsplash.com/photos/modern-hallway-with-an-organic-mirror-and-ocean-view-jaz2BueLsEc |
| window-seat | https://unsplash.com/photos/window-curtain-open-wide-Fd9tUmRBJzk |
| living-sage | https://unsplash.com/photos/a-living-room-with-a-large-green-couch-VZ2z8ozzy10 |
| kitchen-warm | https://unsplash.com/photos/brown-wooden-desk-with-chair-K-ndOjMfxKs |
| kitchen-minimal | https://unsplash.com/photos/a-kitchen-with-white-cabinets-and-a-wooden-ceiling-PkepZpGteGQ |
| empty-bright | https://unsplash.com/photos/an-empty-room-with-a-washer-and-dryer-rgfbZBhnxqQ |
| reno-kitchen | https://unsplash.com/photos/kitchen-renovation-with-white-cabinets-UqNEbyRQ660 |
| rug-round | https://unsplash.com/photos/blue-and-white-pillows-on-white-couch-and-round-white-area-mat-on-floor-Tp7kc0p0W8c |
| window-bright | https://unsplash.com/photos/white-framed-glass-window-during-daytime-z3drmcczVTc |
| shirts | https://unsplash.com/photos/white-dress-shirt-hangign-on-clothes-gkbAYJIMVDA |
| table-glasses | https://unsplash.com/photos/clear-wine-glasses-on-top-of-dining-table-PCE0T5i4pDI |
| living-sunny | https://unsplash.com/photos/green-potted-plant-on-table-HmHArS-HvNw |
| bathroom-bright | https://unsplash.com/photos/a-bathroom-with-a-toilet-sink-and-bathtub-vTj_dmFGB1Y |
| bed-sunlit | https://unsplash.com/photos/white-bed-linen-near-green-plant-gSOdp7YlgNQ |
| bed-stripes | https://unsplash.com/photos/a-bed-with-white-sheets-and-white-pillows-pl3sj3DigxM |

Photography used in the films:

- https://unsplash.com/photos/a-bathroom-with-a-sink-mirror-toilet-and-tub-Ofidz3G8k0Y
- https://unsplash.com/photos/a-bathroom-with-a-sink-toilet-and-shower-cxpB9IPVjDM
- https://unsplash.com/photos/a-bed-in-a-room-Lbb7GlLjsHA
- https://unsplash.com/photos/a-bed-with-pillows-nCtNbhzYVVE
- https://unsplash.com/photos/a-dining-room-with-a-table-and-chairs-1Uw-a7Os5rk
- https://unsplash.com/photos/a-kitchen-with-a-sink-refrigerator-stove-and-dishwasher-CwnPmtA2NHc
- https://unsplash.com/photos/a-kitchen-with-a-table-and-chairs-next-to-a-window-E7yGIdzNE3k
- https://unsplash.com/photos/a-large-kitchen-with-a-center-island-and-bar-stools-cYeCxtKpTTQ
- https://unsplash.com/photos/a-living-room-filled-with-furniture-and-a-kitchen-PE4pFgcYzoQ
- https://unsplash.com/photos/a-living-room-with-a-couch-a-table-and-chairs-vYlmRFIsCIk
- https://unsplash.com/photos/a-room-with-a-door-and-a-plant-in-it-wKrfpXTN07Q
- https://unsplash.com/photos/living-room-with-television-and-armchair-AB-q9lwCVv8
- https://unsplash.com/photos/three-assorted-color-pillows-fQ2XuWjSzfE
- https://unsplash.com/photos/white-and-brown-floral-bed-linen-EAri64dQlF4
- https://unsplash.com/photos/white-bed-linen-near-white-wooden-door-wH2aFGo-Rt0
- https://unsplash.com/photos/white-bed-linen-on-bed-Kqpw00namok
- https://unsplash.com/photos/white-ceramic-bathtub-near-green-potted-plant-Aac7IlKnYX8
