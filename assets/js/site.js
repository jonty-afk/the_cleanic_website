/* The Cleanic — site behaviour. No dependencies. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Header: condense on scroll */
  const header = $('[data-header]');
  const onScroll = () => {
    const y = window.scrollY;
    header?.classList.toggle('is-condensed', y > 24);
    updateMobileCta(y);
  };

  /* Sticky mobile CTA: appears once the visitor has scrolled past the first screen */
  const cta = $('[data-mobile-cta]');
  let ctaVisible = false;
  function updateMobileCta(y) {
    if (!cta) return;
    const show = y > window.innerHeight * 0.7 && !root.classList.contains('menu-open');
    if (show === ctaVisible) return;
    ctaVisible = show;
    cta.classList.toggle('is-visible', show);
    cta.setAttribute('aria-hidden', String(!show));
    $$('a', cta).forEach((a) => (show ? a.removeAttribute('tabindex') : a.setAttribute('tabindex', '-1')));
  }

  /* Mobile menu: accessible dialog with focus trap, Escape to close, scroll lock */
  const toggle = $('[data-menu-toggle]');
  const menu = $('[data-menu]');
  const label = $('[data-menu-label]');
  const main = $('#main');
  const footer = $('[data-footer]');
  let lastFocus = null;

  const setInert = (on) => [main, footer, cta].forEach((el) => el && (on ? el.setAttribute('inert', '') : el.removeAttribute('inert')));

  function openMenu() {
    lastFocus = document.activeElement;
    root.classList.add('menu-open');
    root.style.overflow = 'hidden';
    toggle.setAttribute('aria-expanded', 'true');
    label.textContent = 'Close';
    setInert(true);
    updateMobileCta(window.scrollY);
    setTimeout(() => $('a', menu)?.focus({ preventScroll: true }), 60);
  }
  function closeMenu(restore = true) {
    root.classList.remove('menu-open');
    root.style.overflow = '';
    toggle.setAttribute('aria-expanded', 'false');
    label.textContent = 'Menu';
    setInert(false);
    updateMobileCta(window.scrollY);
    if (restore) (lastFocus && document.contains(lastFocus) ? lastFocus : toggle).focus({ preventScroll: true });
  }
  if (toggle && menu) {
    toggle.addEventListener('click', () => (root.classList.contains('menu-open') ? closeMenu() : openMenu()));
    menu.addEventListener('click', (e) => { if (e.target.closest('a')) closeMenu(false); });
    document.addEventListener('keydown', (e) => {
      if (!root.classList.contains('menu-open')) return;
      if (e.key === 'Escape') { e.preventDefault(); closeMenu(); return; }
      if (e.key !== 'Tab') return;
      const items = [toggle, ...$$('a, button', menu)].filter((el) => el.offsetParent !== null);
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    window.matchMedia('(min-width: 1024px)').addEventListener('change', (m) => { if (m.matches && root.classList.contains('menu-open')) closeMenu(false); });
  }

  /* Services dropdown: Escape closes it until the pointer/focus leaves */
  $$('.has-dropdown').forEach((dd) => {
    dd.addEventListener('keydown', (e) => { if (e.key === 'Escape') { dd.classList.add('is-closed'); $('a', dd).focus(); } });
    dd.addEventListener('mouseleave', () => dd.classList.remove('is-closed'));
    dd.addEventListener('focusout', (e) => { if (!dd.contains(e.relatedTarget)) dd.classList.remove('is-closed'); });
  });

  /* 3D: pointer tilt on photos and cards, layered depth in the hero.
     Only for mouse/trackpad users who haven't asked for reduced motion. */
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (fine && !reduceMotion) {
    const targets = new Set([...$$('.media.zoom'), ...$$('[data-tilt]')]);
    targets.forEach((el) => {
      const max = parseFloat(el.dataset.tilt || 5);
      el.classList.add('tilt');
      let raf = 0;
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          el.style.transition = 'transform .2s ease-out';
          el.style.transform = `perspective(1100px) rotateX(${(0.5 - y) * max}deg) rotateY(${(x - 0.5) * max}deg) translateZ(0)`;
        });
      });
      el.addEventListener('pointerleave', () => {
        cancelAnimationFrame(raf);
        el.style.transition = 'transform .9s cubic-bezier(.2,.7,.2,1)';
        el.style.transform = '';
      });
    });

    $$('[data-depth-scene]').forEach((scene) => {
      const layers = $$('[data-depth]', scene);
      const area = scene.closest('section') || scene;
      let raf = 0;
      area.addEventListener('pointermove', (e) => {
        const r = area.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => layers.forEach((l) => {
          const d = parseFloat(l.dataset.depth);
          l.style.transition = 'transform .6s cubic-bezier(.2,.7,.2,1)';
          l.style.transform = `perspective(1400px) translate3d(${x * d}px, ${y * d}px, 0) rotateY(${x * d * 0.12}deg) rotateX(${-y * d * 0.12}deg)`;
        }));
      });
      area.addEventListener('pointerleave', () => layers.forEach((l) => { l.style.transition = 'transform 1.2s cubic-bezier(.2,.7,.2,1)'; l.style.transform = ''; }));
    });
  }

  /* Print button (checklist page) */
  $$('[data-print]').forEach((b) => b.addEventListener('click', () => window.print()));

  /* Reveal on scroll */
  const reveals = $$('[data-reveal]');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach((el) => el.classList.add('is-in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.08 });
    reveals.forEach((el) => io.observe(el));
  }

  /* Turnover sequence: crossfade the sticky image as each step reaches the middle of the viewport */
  const stepsWrap = $('[data-steps]');
  if (stepsWrap && 'IntersectionObserver' in window) {
    const imgs = $$('[data-step-img]', stepsWrap);
    const setActive = (i) => imgs.forEach((im) => im.classList.toggle('opacity-0', im.dataset.stepImg !== String(i)));
    const sio = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) setActive(en.target.dataset.step); });
    }, { rootMargin: '-45% 0px -45% 0px' });
    $$('[data-step]', stepsWrap).forEach((el) => sio.observe(el));
  }

  /* Forms: validation, multi-step quote, background submission to Getform */
  const messages = {
    name: 'Please enter your name.',
    email: 'Please enter a valid email address.',
    phone: 'Please enter a phone number we can reach you on.',
    suburb: 'Please tell us the suburb.',
    message: 'Please write a short message.',
    service: 'Please choose a service.',
    property_type: 'Please choose a property type.',
    bedrooms: 'Please choose the number of bedrooms.',
    bathrooms: 'Please choose the number of bathrooms.',
    frequency: 'Please choose how often.',
  };

  function showError(el, errEl, msg) {
    if (!errEl) return;
    if (msg) {
      errEl.innerHTML = `<svg class="h-4 w-4 flex-none" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><circle cx="8" cy="8" r="6.5"/><path d="M8 4.5v4.2M8 10.8v.7"/></svg><span></span>`;
      errEl.querySelector('span').textContent = msg;
      errEl.hidden = false;
      el.setAttribute('aria-invalid', 'true');
    } else {
      errEl.hidden = true;
      el.removeAttribute('aria-invalid');
    }
  }

  function validateField(input) {
    const v = input.value.trim();
    let msg = '';
    if (input.required && !v) msg = messages[input.name] || 'This field is required.';
    else if (v && input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) msg = messages.email;
    else if (v && input.type === 'tel' && v.replace(/\D/g, '').length < 7) msg = messages.phone;
    showError(input, document.getElementById(`${input.id}-error`), msg);
    return !msg;
  }

  function validateGroup(group) {
    const name = group.dataset.group;
    const ok = !!$(`input[name="${name}"]:checked`, group);
    showError(group, document.getElementById(`${name}-error`), ok ? '' : messages[name]);
    return ok;
  }

  function validateScope(scope) {
    let firstBad = null;
    $$('[data-group]', scope).forEach((g) => { if (!validateGroup(g) && !firstBad) firstBad = $('input', g); });
    $$('input:not([type=radio]):not([type=hidden]):not([name=_gotcha]), select, textarea', scope).forEach((i) => {
      if (!validateField(i) && !firstBad) firstBad = i;
    });
    return firstBad;
  }

  $$('form[data-form]').forEach((form) => {
    const card = form.parentElement;
    const success = $('[data-form-success]', card);
    const formError = $('[data-form-error]', form);
    const submit = $('[data-submit]', form);
    const submitHTML = submit.innerHTML;

    // live re-validation once a field has been marked invalid
    form.addEventListener('input', (e) => { if (e.target.getAttribute('aria-invalid') === 'true') validateField(e.target); });
    form.addEventListener('change', (e) => {
      const g = e.target.closest('[data-group]');
      if (g && g.getAttribute('aria-invalid') === 'true') validateGroup(g);
      else if (e.target.getAttribute('aria-invalid') === 'true') validateField(e.target);
    });
    $$('input:not([type=radio]), textarea, select', form).forEach((i) => i.addEventListener('blur', () => { if (i.value.trim()) validateField(i); }));

    // Multi-step behaviour (quote form)
    const steps = $$('[data-step]', form);
    const multi = form.hasAttribute('data-steps-form') && steps.length > 1;
    let current = 0;
    const progress = $('[data-progress]', card);
    const prev = $('[data-prev]', form);
    const next = $('[data-next]', form);

    function goTo(i, focus = true) {
      current = i;
      steps.forEach((s, n) => (s.hidden = n !== i));
      prev.hidden = i === 0;
      next.hidden = i === steps.length - 1;
      submit.hidden = i !== steps.length - 1;
      if (progress) {
        $$('[data-progress-item]', progress).forEach((item, n) => {
          $('[data-bar]', item).classList.toggle('bg-navy', n <= i);
          $('[data-bar]', item).classList.toggle('bg-line', n > i);
          $('[data-label]', item).classList.toggle('text-ink', n <= i);
          $('[data-label]', item).classList.toggle('text-ink-mute', n > i);
          if (n === i) item.setAttribute('aria-current', 'step'); else item.removeAttribute('aria-current');
        });
        $('[data-progress-live]', progress).textContent = `Step ${i + 1} of ${steps.length}`;
      }
      if (focus) {
        const t = $('[data-step-title]', steps[i]);
        const top = card.getBoundingClientRect().top + window.scrollY - 96;
        if (window.scrollY > top) window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
        t?.focus({ preventScroll: true });
      }
    }

    if (multi) {
      progress && (progress.hidden = false);
      goTo(0, false);
      next.addEventListener('click', () => {
        const bad = validateScope(steps[current]);
        if (bad) { bad.focus(); return; }
        goTo(current + 1);
      });
      prev.addEventListener('click', () => goTo(current - 1));
      // Enter in a text field moves forward rather than submitting early
      form.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.target.tagName === 'INPUT' && current < steps.length - 1) { e.preventDefault(); next.click(); }
      });
      // Preselect service from ?service=
      const svc = new URLSearchParams(location.search).get('service');
      const sel = $('select[name="service"]', form);
      if (svc && sel && $(`option[value="${CSS.escape(svc)}"]`, sel)) sel.value = svc;
      const date = $('input[type="date"]', form);
      if (date) date.min = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      formError.hidden = true;
      const bad = validateScope(form);
      if (bad) {
        if (multi) {
          const stepIndex = steps.findIndex((s) => s.contains(bad));
          if (stepIndex !== current) goTo(stepIndex);
        }
        bad.focus();
        return;
      }
      const data = new FormData(form);
      const first = String(data.get('name') || '').trim().split(/\s+/)[0];
      const done = () => {
        form.hidden = true;
        progress && (progress.hidden = true);
        $('[data-success-name]', success).textContent = first ? `, ${first}` : '';
        success.classList.remove('hidden');
        success.focus();
        const top = card.getBoundingClientRect().top + window.scrollY - 96;
        if (window.scrollY > top) window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
      };
      if (data.get('_gotcha')) { done(); return; } // spam trap: pretend success

      submit.disabled = true;
      submit.setAttribute('aria-busy', 'true');
      submit.textContent = 'Sending…';
      try {
        const res = await fetch(form.action, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
        if (!res.ok) throw new Error(String(res.status));
        done();
      } catch (err) {
        formError.innerHTML = '<span></span>';
        formError.firstChild.textContent = 'Sorry — your request didn’t send. Please try again, or call us on 021 0260 6025.';
        formError.hidden = false;
      } finally {
        submit.disabled = false;
        submit.removeAttribute('aria-busy');
        submit.innerHTML = submitHTML;
      }
    });
  });

  /* Films: play overlay; only one plays at a time */
  $$('[data-video]').forEach((wrap) => {
    const video = $('video', wrap);
    const btn = $('[data-video-play]', wrap);
    btn.addEventListener('click', () => {
      $$('[data-video] video').forEach((v) => { if (v !== video) v.pause(); });
      video.controls = true;
      btn.hidden = true;
      video.play().catch(() => {});
      video.focus({ preventScroll: true });
    });
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
