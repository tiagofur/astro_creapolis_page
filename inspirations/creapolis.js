// Creapolis shared JS
(function () {
  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  // Nav scroll state
  const nav = document.querySelector('.nav-shell');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Ribbon subtle parallax
  const ribbons = document.querySelectorAll('.ribbon');
  if (ribbons.length) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      ribbons.forEach((r) => {
        const rect = r.getBoundingClientRect();
        const rel = (rect.top + rect.height / 2) / window.innerHeight;
        r.style.setProperty('--rib-y', (rel * 20).toFixed(1) + 'px');
      });
    }, { passive: true });
  }

  // ─── TWEAKS ───
  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "accent": "iris",
    "density": "comfortable",
    "ribbons": true,
    "serifHero": true
  }/*EDITMODE-END*/;

  const state = { ...TWEAK_DEFAULTS };
  const accentMap = {
    iris:  'oklch(0.62 0.2 285)',
    coral: 'oklch(0.72 0.18 32)',
    lime:  'oklch(0.72 0.18 145)',
    sky:   'oklch(0.68 0.14 235)',
    amber: 'oklch(0.75 0.16 70)',
    ink:   'oklch(0.2 0.015 265)'
  };

  function applyTweaks() {
    document.documentElement.style.setProperty('--brand-accent', accentMap[state.accent] || accentMap.iris);
    document.documentElement.dataset.density = state.density;
    document.documentElement.dataset.ribbons = state.ribbons ? 'on' : 'off';
    document.documentElement.dataset.serifHero = state.serifHero ? 'on' : 'off';
  }
  applyTweaks();

  function buildPanel() {
    if (document.getElementById('tweaks')) return;
    const panel = document.createElement('div');
    panel.id = 'tweaks';
    panel.innerHTML = `
      <h6>Tweaks</h6>
      <div class="row">
        <label>Accent</label>
        <div class="swatches" id="tw-swatches">
          ${Object.entries(accentMap).map(([k, v]) => `<button class="sw${state.accent===k?' on':''}" data-a="${k}" style="background:${v}" aria-label="${k}"></button>`).join('')}
        </div>
      </div>
      <div class="row">
        <label>Ribbons</label>
        <button class="toggle${state.ribbons?' on':''}" id="tw-rib" aria-pressed="${state.ribbons}"></button>
      </div>
      <div class="row">
        <label>Serif italics</label>
        <button class="toggle${state.serifHero?' on':''}" id="tw-serif" aria-pressed="${state.serifHero}"></button>
      </div>
      <div class="row">
        <label>Density</label>
        <div style="display:flex;gap:6px">
          <button class="chip${state.density==='cozy'?' live':''}" data-d="cozy">Cozy</button>
          <button class="chip${state.density==='comfortable'?' live':''}" data-d="comfortable">Comfort</button>
        </div>
      </div>`;
    document.body.appendChild(panel);
    panel.addEventListener('click', (ev) => {
      const sw = ev.target.closest('[data-a]');
      const d = ev.target.closest('[data-d]');
      if (sw) {
        state.accent = sw.dataset.a;
        panel.querySelectorAll('.sw').forEach(x => x.classList.toggle('on', x.dataset.a === state.accent));
      } else if (ev.target.id === 'tw-rib') {
        state.ribbons = !state.ribbons;
        ev.target.classList.toggle('on', state.ribbons);
      } else if (ev.target.id === 'tw-serif') {
        state.serifHero = !state.serifHero;
        ev.target.classList.toggle('on', state.serifHero);
      } else if (d) {
        state.density = d.dataset.d;
        panel.querySelectorAll('[data-d]').forEach(x => x.classList.toggle('live', x.dataset.d === state.density));
      } else return;
      applyTweaks();
      try {
        window.parent.postMessage({ type: '__edit_mode_set_keys', edits: state }, '*');
      } catch {}
    });
  }

  window.addEventListener('message', (ev) => {
    const d = ev.data || {};
    if (d.type === '__activate_edit_mode') { buildPanel(); document.getElementById('tweaks').classList.add('on'); }
    if (d.type === '__deactivate_edit_mode') { const p = document.getElementById('tweaks'); if (p) p.classList.remove('on'); }
  });
  try { window.parent.postMessage({ type: '__edit_mode_available' }, '*'); } catch {}
})();
