# Creapolis V3 — "CMYK Studio" Style Guide

This is the canonical style guide for the V3 redesign (ported from the `/zai` prototype).
Foundation files already implement it — use them as reference before touching anything:

- `src/styles/tokens.css` — the full token system (READ FIRST)
- `src/styles/global.css` — base styles, buttons, cards, chips, focus rings
- `src/components/Nav.astro` — fixed bar nav
- `src/components/Footer.astro` — light 4-column footer
- `src/pages/[lang]/index.astro` — the redesigned home (canonical page example)

## The 10 rules

1. **White canvas, ink type.** Page background pure white (`--paper`). Text in `--ink` / `--ink-2` / `--ink-3` / `--ink-4`. NO warm/gray page backgrounds, NO dark sections except the single closing CTA card.
2. **Three accents only**: `--c-cyan` #00AEEF, `--c-magenta` #EC008C, `--c-yellow` #FFC400 (+ `--key` #111 as "Key"). NEVER any other saturated color (no purple, no green, no orange, no #10b981). Legacy tokens `--iris/--coral/--sky/--amber/--lime` are aliased to CMYK — replace usages with the CMYK tokens when you touch them.
3. **Color in small, fixed doses only**: 6px dots, 3px card top-bars (`.card-bar` global class with `--accent-color`), ~8% tinted icon tiles (accent-soft bg + darker shade glyph), and one ambient blurred halo on the page's dark CTA card. NEVER colored headlines/buttons/body text/borders (except zinc).
4. **Two-tone headlines**: main phrase in `--ink`, trailing fragment muted `--ink-4` (`<span class="tone-muted">` global, or local `.tone` pattern from home). Section H2: `clamp(1.9rem, 3.6vw, 2.75rem)`, weight 600, `letter-spacing: -0.03em`, `line-height: 1.08`, `text-wrap: balance`.
5. **Mono as the label voice**: Geist Mono (`--font-mono`), 11px, weight 500, UPPERCASE, `letter-spacing: var(--ls-mono)` (0.22em), color `--ink-3`/`--ink-4`. Use for eyebrows (global `.eyebrow` + inline `style="--accent-color: var(--c-cyan)"`), indices (`01`, `02`…), metadata, prices, chips, years, footer/column titles.
6. **Flat = hairlines, not shadows**: borders `1px solid var(--line)` (rgba(0,0,0,0.06)). Cards `background: #fff; border: 1px solid var(--line); border-radius: var(--r-xl)` (24px). Shadows ONLY on hover (`--sh-hover` + `translateY(-4px)`) and floating layers (dropdowns/modals `--sh-3`). Icon tiles `--r-lg` (16px), nested `--r-md` (12px), inputs `--r-sm` (8px).
7. **Hairline grids as a component**: `display: grid; gap: 1px; background: var(--line); border: 1px solid var(--line); border-radius: var(--r-xl); overflow: hidden;` with white cells — for stats, steps, promise strips, comparison tables (copy `.hairline-grid`/`.hairline-cell` from home).
8. **Black pill buttons**: use global `.btn .btn-primary` (ink bg, white text, h-48px, press scale 0.98) / `.btn .btn-secondary` (white bg, zinc-200 border). NO colored buttons. Arrows nudge on hover.
9. **One dark CTA card per page** (closing section): `background: #09090b; border-radius: var(--r-mega)` (40px), white H2, `#a1a1aa` paragraph, white pill button + mono outline email pill, optional two blurred CMY radial glows at 25% opacity (copy `.cta-card` from home). Remove any OTHER dark section (replace with white/chalk).
10. **Restrained motion**: keep existing `.reveal` classes (Layout runs the observer). Transitions 0.2–0.25s `var(--ease)`. Respect `prefers-reduced-motion`. NO auto-advancing carousels, NO marquee, NO infinite animations except tiny status-dot ping.

## Conventions

- **Sections**: `.section` (clamped 72–120px), `.section-tight`, `.section-alt` (bg `--chalk`). Content in `.wrap` (max 1152px).
- **Accent assignment (fixed)**: products — Solennix=cyan, Pepinillo=yellow, Películas=magenta, Subscription Guardian=key(ink). Product zones may use `--sol-accent`/`--pep-accent`/`--pel-accent`/`--sg-accent` tokens. Generic sections cycle cyan → magenta → yellow.
- **Text-safe accent shades** (for small text on white): `--c-cyan-3` #007196, `--c-magenta-3` #930057, `--c-yellow-3` #A47A00. Never set body text in pure cyan/magenta/yellow.
- **Forms**: white inputs, `border: 1px solid var(--line-2)`, `border-radius: var(--r-sm)`, focus = black outline + `box-shadow: 0 0 0 4px rgba(24,24,27,0.1)`. Invalid state: `border-color: rgba(236,0,140,0.6)`, error text `#C40075`.
- **Focus rings**: global black outline is already handled — do not add colored focus rings.
- **The old `Ribbon.astro` motif and any wave/grandient overlays are REMOVED** — delete imports/usages when you encounter them. `.gradient-text` is now plain ink; do not add new usages.
- **Serif is gone**: `--font-serif` resolves to sans. Remove `font-family: var(--font-serif)` italic styling when touched; plain italic `em` is fine.
- **Status chips**: global `.chip` (mono 10px uppercase zinc pill), `.chip.live` (cyan + ping dot), `.chip.beta` (magenta), `.chip.dev` (yellow), `.chip.soon` (zinc).
- **Dates/numbers metadata**: mono, `--ink-4`.

## Hard constraints (DO NOT BREAK)

1. **Never delete or rename content, i18n keys, routes, forms, `data-track-*` attributes, JSON-LD, SEO props, or accessibility attributes.** This is a re-skin: structure/markup may be adjusted for layout, but every piece of information must survive.
2. Keep Astro scoped `<style>` blocks; no Tailwind classes (this project has no Tailwind).
3. Keep all `id="..."` anchors that other pages link to (e.g. `/servicios#ai-agents`, `#apps`).
4. Keep `class="reveal"` / `reveal-stagger` / `reveal-delay-N` animation hooks where present.
5. Mobile: every grid must collapse gracefully (test mentally at 360px). Nav height is 64px; page top padding must clear it (`padding-top` ≥ 120px for heroes).
6. After editing, run `npx astro check` from `creapolis/` and fix any errors YOU introduced.
