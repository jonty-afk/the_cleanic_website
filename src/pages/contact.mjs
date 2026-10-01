import { site } from '../data/site.mjs';
import { businessSchema } from '../lib/layout.mjs';
import { icon, rv, picture } from '../lib/html.mjs';
import { breadcrumb } from '../lib/sections.mjs';

export const meta = {
  path: '/contact',
  out: 'contact.html',
  title: 'Contact The Cleanic | Auckland Cleaning',
  description: 'Call The Cleanic on 021 0260 6025, email thecleanicnz@gmail.com or send a message. Airbnb, short-stay and home cleaning across Auckland, seven days.',
  crumbs: [['/contact', 'Contact']],
  schema: [{ '@type': 'ContactPage', url: `${site.url}/contact`, about: { '@id': `${site.url}/#business` } }, businessSchema()],
  hideMobileCta: true,
};

const field = (id, label, input, { optional = false, hint = '' } = {}) => `
<div class="field">
  <label class="label" for="${id}">${label}${optional ? ' <span class="opt">(optional)</span>' : ''}</label>
  ${hint ? `<p class="hint" id="${id}-hint">${hint}</p>` : ''}
  ${input}
  <p class="error" id="${id}-error" hidden></p>
</div>`;

export const render = () => `
<section class="pb-20 pt-[calc(var(--header-h)+2rem)] sm:pb-28 sm:pt-[calc(var(--header-h)+3.5rem)]" aria-labelledby="hero-title">
  <div class="wrap">
    ${breadcrumb([['/contact', 'Contact']])}
    <div class="mt-10 grid gap-16 lg:grid-cols-12 lg:gap-12">
      <div class="lg:col-span-5">
        <p class="eyebrow" ${rv()}>Contact</p>
        <h1 id="hero-title" class="h1 mt-6 max-w-[11ch]" ${rv(80)}>Talk to The Cleanic</h1>
        <p class="lead mt-6 max-w-md" ${rv(160)}>The quickest way to reach us is by phone. For anything else, send a message and we’ll get back to you.</p>

        <dl class="mt-12 border-t border-line" ${rv(220)}>
          <div class="grid gap-1 border-b border-line py-5 sm:grid-cols-[8rem_1fr]">
            <dt class="fine pt-0.5">Phone</dt>
            <dd><a href="tel:${site.phone.tel}" class="font-serif text-[1.75rem] leading-tight hover:text-navy">${site.phone.display}</a></dd>
          </div>
          <div class="grid gap-1 border-b border-line py-5 sm:grid-cols-[8rem_1fr]">
            <dt class="fine pt-0.5">Email</dt>
            <dd><a href="mailto:${site.email}" class="break-all font-semibold hover:text-navy">${site.email}</a></dd>
          </div>
          <div class="grid gap-1 border-b border-line py-5 sm:grid-cols-[8rem_1fr]">
            <dt class="fine pt-0.5">Hours</dt>
            <dd class="grid gap-1">${site.hours.map((h) => `<span class="flex justify-between gap-4 sm:justify-start sm:gap-8"><span class="text-ink-soft sm:w-40">${h.days}</span><span class="font-semibold">${h.time}</span></span>`).join('')}</dd>
          </div>
          <div class="grid gap-1 border-b border-line py-5 sm:grid-cols-[8rem_1fr]">
            <dt class="fine pt-0.5">Area</dt>
            <dd class="font-semibold">Auckland</dd>
          </div>
          <div class="grid gap-1 border-b border-line py-4 sm:grid-cols-[8rem_1fr] sm:items-center">
            <dt class="fine">Social</dt>
            <dd class="-ml-3 flex gap-1">${site.social.map((s) => `<a href="${s.url}" class="grid h-11 w-11 place-items-center text-ink-soft hover:text-ink" target="_blank" rel="noopener" aria-label="The Cleanic on ${s.name}">${icon[s.name.toLowerCase()]}</a>`).join('')}</dd>
          </div>
        </dl>
        <div class="media mt-12 hidden aspect-[16/10] lg:block" ${rv(0, 'image')}>${picture('window-seat', { sizes: '40vw', className: 'absolute inset-0' })}</div>
      </div>

      <div class="lg:col-span-6 lg:col-start-7">
        <div class="border border-line bg-paper p-6 sm:p-10" ${rv(120)}>
          <h2 class="h3">Send a message</h2>
          <p class="mt-2 text-[0.9375rem] text-ink-soft">Looking for a price? The <a class="link-underline" href="/get-a-quote">quote form</a> asks the right questions.</p>
          <form class="mt-8 grid gap-6" action="${site.forms.contact}" method="POST" novalidate data-form="contact">
            <input type="hidden" name="_subject" value="New message from The Cleanic website">
            <input type="hidden" name="form" value="contact">
            <input type="hidden" name="_next" value="${site.url}/thank-you">
            <div class="hidden" aria-hidden="true"><label for="c-gotcha">Leave this empty</label><input type="text" id="c-gotcha" name="_gotcha" tabindex="-1" autocomplete="off"></div>
            ${field('c-name', 'Your name', `<input class="input" id="c-name" name="name" type="text" autocomplete="name" required aria-describedby="c-name-error">`)}
            <div class="grid gap-6 sm:grid-cols-2">
              ${field('c-email', 'Email', `<input class="input" id="c-email" name="email" type="email" autocomplete="email" required aria-describedby="c-email-error">`)}
              ${field('c-phone', 'Phone', `<input class="input" id="c-phone" name="phone" type="tel" autocomplete="tel" aria-describedby="c-phone-error">`, { optional: true })}
            </div>
            ${field('c-message', 'Message', `<textarea class="input" id="c-message" name="message" rows="6" required aria-describedby="c-message-error"></textarea>`)}
            <div class="grid gap-4 pt-2">
              <button type="submit" class="btn btn-primary w-full sm:w-auto sm:justify-self-start" data-submit>Send message ${icon.arrow}</button>
              <p class="error" data-form-error role="alert" hidden></p>
            </div>
          </form>
          <div class="hidden" data-form-success tabindex="-1">
            <p class="eyebrow">Message sent</p>
            <p class="h2 mt-5">Thank you<span data-success-name></span>.</p>
            <p class="mt-4 text-ink-soft">We’ve received your message and will get back to you. If it’s urgent, call <a class="link-underline" href="tel:${site.phone.tel}">${site.phone.display}</a>.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
`;
