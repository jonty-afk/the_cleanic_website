import { site } from '../data/site.mjs';
import { quoteServices } from '../data/services.mjs';
import { icon, rv } from '../lib/html.mjs';

export const meta = {
  path: '/get-a-quote',
  out: 'get-a-quote.html',
  title: 'Get a Quote | Airbnb & Home Cleaning Auckland | The Cleanic',
  description: 'Request a cleaning quote from The Cleanic. Tell us about your Auckland property, the service you need and when — it takes about a minute.',
  crumbs: [['/get-a-quote', 'Get a quote']],
  hideMobileCta: true,
};

const err = (id) => `<p class="error" id="${id}-error" hidden></p>`;

const choices = (name, opts, { cls = '', lg = false, required = true } = {}) =>
  opts.map(([v, l, sub], i) => `
  <label class="choice ${lg ? 'choice-lg' : ''} ${cls}">
    <input type="radio" name="${name}" value="${v}"${required && i === 0 ? ' required' : ''}>
    <span>${l}${sub ? `<small>${sub}</small>` : ''}</span>
  </label>`).join('');

const stepHead = (n, title, text) => `
<div class="mb-8">
  <p class="fine">Step ${n} of 3</p>
  <h2 class="h2 mt-2" tabindex="-1" data-step-title>${title}</h2>
  ${text ? `<p class="mt-3 text-[0.9375rem] text-ink-soft">${text}</p>` : ''}
</div>`;

export const render = () => `
<section class="pb-20 pt-[calc(var(--header-h)+2rem)] sm:pb-28 sm:pt-[calc(var(--header-h)+3.5rem)]" aria-labelledby="hero-title">
  <div class="wrap grid gap-14 lg:grid-cols-12 lg:gap-12">
    <aside class="lg:col-span-4">
      <div class="lg:sticky lg:top-[calc(var(--header-h)+2.5rem)]">
        <p class="eyebrow" ${rv()}>Get a quote</p>
        <h1 id="hero-title" class="h1 mt-6 max-w-[10ch]" ${rv(80)}>Tell us about your property</h1>
        <p class="lead mt-6 max-w-sm" ${rv(160)}>Three short steps. We’ll use the details to prepare your quote and get back to you.</p>
        <div class="mt-10 hidden border-t border-line pt-8 lg:block" ${rv(220)}>
          <h2 class="eyebrow">What happens next</h2>
          <ol class="mt-5 grid gap-4 text-[0.9375rem] text-ink-soft" role="list">
            <li class="grid grid-cols-[1.75rem_1fr]"><span class="num">1</span>We review your details.</li>
            <li class="grid grid-cols-[1.75rem_1fr]"><span class="num">2</span>We get in touch with a price, or any questions.</li>
            <li class="grid grid-cols-[1.75rem_1fr]"><span class="num">3</span>We book in a time that suits you.</li>
          </ol>
          <p class="mt-8 text-[0.9375rem]">Prefer to talk? <a class="link-underline font-semibold" href="tel:${site.phone.tel}">${site.phone.display}</a></p>
        </div>
      </div>
    </aside>

    <div class="lg:col-span-7 lg:col-start-6">
      <div class="border border-line bg-paper" ${rv(120)}>
        <!-- Progress -->
        <div class="border-b border-line px-6 py-5 sm:px-10" data-progress hidden>
          <ol class="grid grid-cols-3 gap-3" role="list">
            ${['Property', 'Service', 'Your details'].map((l, i) => `
            <li class="grid gap-2" data-progress-item="${i}">
              <span class="block h-[2px] w-full bg-line transition-colors duration-500" data-bar></span>
              <span class="text-[0.8125rem] font-semibold text-ink-mute transition-colors" data-label>${l}</span>
            </li>`).join('')}
          </ol>
          <p class="sr-only" aria-live="polite" data-progress-live></p>
        </div>

        <form class="p-6 sm:p-10" action="${site.forms.endpoint}" method="POST" novalidate data-form="quote" data-steps-form>
          <input type="hidden" name="access_key" value="${site.forms.accessKey}">
            <input type="hidden" name="subject" value="New quote request from The Cleanic website">
            <input type="hidden" name="from_name" value="The Cleanic website">
            <input type="hidden" name="form" value="quote">
            <input type="hidden" name="redirect" value="${site.url}/thank-you">
            <input type="checkbox" name="botcheck" id="q-botcheck" class="hidden" style="display:none" tabindex="-1" autocomplete="off" aria-hidden="true">

          <!-- Step 1 -->
          <fieldset class="grid gap-7" data-step="0">
            <legend class="sr-only">Property details</legend>
            ${stepHead(1, 'The property', 'What kind of place is it, and where?')}
            <fieldset class="grid gap-3" data-group="property_type" aria-describedby="property_type-error">
              <legend class="label mb-3">Property type</legend>
              <div class="grid grid-cols-2 gap-3">
                ${choices('property_type', [['apartment', 'Apartment or studio'], ['house', 'House or townhouse'], ['holiday-home', 'Holiday home'], ['commercial', 'Office or commercial']], { lg: true })}
              </div>
              ${err('property_type')}
            </fieldset>
            <div class="field">
              <label class="label" for="q-suburb">Suburb</label>
              <input class="input" id="q-suburb" name="suburb" type="text" autocomplete="address-level2" placeholder="e.g. Ponsonby" required aria-describedby="q-suburb-error">
              ${err('q-suburb')}
            </div>
            <div class="grid gap-7 sm:grid-cols-2 sm:gap-6">
              <fieldset class="grid gap-3" data-group="bedrooms" aria-describedby="bedrooms-error">
                <legend class="label mb-3">Bedrooms</legend>
                <div class="grid grid-cols-5 gap-2">${choices('bedrooms', [['studio', 'Studio'], ['1', '1'], ['2', '2'], ['3', '3'], ['4+', '4+']], { cls: 'text-[0.8125rem]' })}</div>
                ${err('bedrooms')}
              </fieldset>
              <fieldset class="grid gap-3" data-group="bathrooms" aria-describedby="bathrooms-error">
                <legend class="label mb-3">Bathrooms</legend>
                <div class="grid grid-cols-4 gap-2">${choices('bathrooms', [['1', '1'], ['2', '2'], ['3', '3'], ['4+', '4+']])}</div>
                ${err('bathrooms')}
              </fieldset>
            </div>
          </fieldset>

          <!-- Step 2 -->
          <fieldset class="grid gap-7" data-step="1">
            <legend class="sr-only">Service and timing</legend>
            ${stepHead(2, 'The service', 'What do you need, and when?')}
            <div class="field">
              <label class="label" for="q-service">Service</label>
              <select class="input" id="q-service" name="service" required aria-describedby="q-service-error">
                ${quoteServices.map(([v, l], i) => `<option value="${v}"${i === 0 ? ' selected' : ''}>${l}</option>`).join('')}
              </select>
              ${err('q-service')}
            </div>
            <fieldset class="grid gap-3" data-group="frequency" aria-describedby="frequency-error">
              <legend class="label mb-3">How often?</legend>
              <div class="grid grid-cols-2 gap-2 sm:grid-cols-3">
                ${choices('frequency', [['one-off', 'One-off'], ['each-turnover', 'Every guest turnover'], ['weekly', 'Weekly'], ['fortnightly', 'Fortnightly'], ['monthly', 'Monthly'], ['not-sure', 'Not sure yet']], { cls: 'text-[0.875rem]' })}
              </div>
              ${err('frequency')}
            </fieldset>
            <div class="field">
              <label class="label" for="q-date">Preferred date <span class="opt">(optional)</span></label>
              <input class="input" id="q-date" name="date" type="date" aria-describedby="q-date-hint">
              <p class="hint" id="q-date-hint">Leave blank if you’re flexible or it’s ongoing.</p>
            </div>
            <fieldset class="grid gap-3">
              <legend class="label mb-3">Airbnb add-ons <span class="opt">(optional)</span></legend>
              <div class="grid gap-2 sm:grid-cols-2">
                <label class="choice"><input type="checkbox" name="addon_linen_service" value="yes"><span>Linen service</span></label>
                <label class="choice"><input type="checkbox" name="addon_guest_toiletries" value="yes"><span>Guest toiletries</span></label>
              </div>
            </fieldset>
            <div class="field">
              <label class="label" for="q-notes">Anything we should know? <span class="opt">(optional)</span></label>
              <textarea class="input" id="q-notes" name="requests" rows="4" placeholder="e.g. usual check-out and check-in times, access, pets, specific areas"></textarea>
            </div>
          </fieldset>

          <!-- Step 3 -->
          <fieldset class="grid gap-7" data-step="2">
            <legend class="sr-only">Your details</legend>
            ${stepHead(3, 'Your details', 'So we can send your quote.')}
            <div class="field">
              <label class="label" for="q-name">Full name</label>
              <input class="input" id="q-name" name="name" type="text" autocomplete="name" required aria-describedby="q-name-error">
              ${err('q-name')}
            </div>
            <div class="grid gap-7 sm:grid-cols-2 sm:gap-6">
              <div class="field">
                <label class="label" for="q-email">Email</label>
                <input class="input" id="q-email" name="email" type="email" autocomplete="email" required aria-describedby="q-email-error">
                ${err('q-email')}
              </div>
              <div class="field">
                <label class="label" for="q-phone">Phone</label>
                <input class="input" id="q-phone" name="phone" type="tel" autocomplete="tel" required aria-describedby="q-phone-error">
                ${err('q-phone')}
              </div>
            </div>
            <p class="fine">We only use your details to respond to this request. See our <a class="link-underline" href="/terms">terms</a>.</p>
          </fieldset>

          <!-- Actions -->
          <div class="mt-10 flex flex-col-reverse gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
            <button type="button" class="btn btn-outline" data-prev hidden>Back</button>
            <div class="flex flex-col gap-4 sm:ml-auto sm:flex-row sm:items-center">
              <button type="button" class="btn btn-primary" data-next hidden>Continue ${icon.arrow}</button>
              <button type="submit" class="btn btn-primary" data-submit>Send quote request ${icon.arrow}</button>
            </div>
          </div>
          <p class="error mt-5" data-form-error role="alert" hidden></p>
        </form>

        <div class="hidden p-6 sm:p-12" data-form-success tabindex="-1">
          <p class="eyebrow">Request received</p>
          <p class="h1 mt-6">Thank you<span data-success-name></span>.</p>
          <p class="lead mt-6 max-w-md">We’ve received your quote request and will be in touch using the details you gave us.</p>
          <p class="mt-4 text-ink-soft">If it’s urgent, call <a class="link-underline font-semibold" href="tel:${site.phone.tel}">${site.phone.display}</a> — ${site.hours.map((h) => `${h.short} ${h.time}`).join(', ')}.</p>
          <div class="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
            <a href="/" class="btn btn-outline">Back to home</a>
            <a href="/airbnb-cleaning" class="link-arrow">Airbnb cleaning ${icon.arrow}</a>
          </div>
        </div>
      </div>
      <p class="mt-6 text-[0.9375rem] lg:hidden">Prefer to talk? <a class="link-underline font-semibold" href="tel:${site.phone.tel}">${site.phone.display}</a></p>
    </div>
  </div>
</section>
`;
