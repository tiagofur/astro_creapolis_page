# 🎨 Design System — Creapolis v2

> Warm-minimal + multi-hue accents + ribbon motif
> Inspirado en la síntesis de Apple (minimalismo) + Google (alegría visual)
> Basado en el prototipo `inspirations/` → migrado a Astro

---

## Filosofía

```
Apple nos da:   _whitespace, tipografía premium, sutileza_
Google nos da:  _color bold, movimiento, personalidad_
Creapolis es:   _lo mejor de ambos — cálido, mínimo, con carácter_
```

**3 pilares:**
1. **Warm-minimal** — Off-white `oklch(0.985)` no blanco puro, ink ligeramente frío
2. **Multi-hue accents** — 5 colores con cromancia igual, cada uno con su soft
3. **Ribbon motif** — SVG curvo decorativo, marca registrada visual del sitio

---

## Paleta de Colores (oklch)

### Neutros — Base cálida, ink frío

| Token | oklch | Aprox Hex | Uso |
|-------|-------|-----------|-----|
| `--ink` | `oklch(0.18 0.015 265)` | `#1D1D2C` | Headings, texto principal |
| `--ink-2` | `oklch(0.34 0.015 265)` | `#4A4A5A` | Body text |
| `--ink-3` | `oklch(0.52 0.012 265)` | `#7E7E8C` | Captions, secondary |
| `--ink-4` | `oklch(0.68 0.01 265)` | `#A0A0AC` | Disabled, hints |
| `--paper` | `oklch(0.985 0.003 85)` | `#FCFBF8` | Fondo principal |
| `--chalk` | `oklch(0.965 0.006 85)` | `#F5F3EE` | Fondo alternativo |
| `--chalk-2` | `oklch(0.935 0.008 85)` | `#EBE8E2` | Fondo深 |
| `--line` | `oklch(0.9 0.008 85)` | `#E2DFD8` | Bordes principales |
| `--line-2` | `oklch(0.82 0.01 85)` | `#CCC9C0` | Bordes hover |

> **Nota**: El paper es OFF-WHITE cálido (hue 85, amber), no blanco puro.
> El ink es LIGERAMENTE frío (hue 265, blue). Esto crea contraste cálido-frío.

### Acentos — Multi-hue, cromancia ~0.18

| Token | oklch | Hex | Soft (bg) | Personalidad |
|-------|-------|-----|-----------|-------------|
| `--iris` | `oklch(0.62 0.2 285)` | `#5856D6` | `oklch(0.94 0.04 285)` | Principal, brand, tech |
| `--coral` | `oklch(0.72 0.18 32)` | `#E85D3A` | `oklch(0.94 0.05 32)` | Energía, urgencia, warm |
| `--lime` | `oklch(0.84 0.18 128)` | `#5AC44B` | `oklch(0.96 0.06 128)` | Crecimiento, live, éxito |
| `--sky` | `oklch(0.72 0.14 235)` | `#3A8FE8` | `oklch(0.95 0.04 235)` | Confianza, info, calma |
| `--amber` | `oklch(0.78 0.16 70)` | `#E8A83A` | `oklch(0.96 0.05 70)` | Alerta, featured, premium |

### Regla de color

```
███ iris   → Brand principal, nav CTA, links internos
███ coral   → Acento secundario, urgency, featured items
███ lime    → Status "live", success, growth metrics
███ sky     → Info, trust, servicios web
███ amber   → Warnings, "próximamente", premium tier
```

> **Jamás** usar iris Y sky juntos como colores vecinos — son muy similares.
> Mejor: iris + coral, lime + amber, coral + sky.

---

## Tipografía

### Fonts (Google Fonts)

```css
--font-sans: 'Geist', 'Geist Sans', ui-sans-serif, system-ui, -apple-system, sans-serif;
--font-serif: 'Instrument Serif', 'Cormorant Garamond', 'Georgia', serif;
--font-mono: 'Geist Mono', ui-monospace, 'SFMono-Regular', monospace;
```

### Carga de fonts

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap" />
```

### Escala Tipográfica

| Element | Mobile | Desktop | Weight | Line Height | Spacing |
|---------|--------|---------|--------|-------------|---------|
| `h1` | `clamp(3rem, 8vw, 6.2rem)` | — | 500 | 0.95 | -0.055em |
| `h2` | `clamp(2rem, 5vw, 3.6rem)` | — | 500 | 1.02 | -0.04em |
| `h3` | `clamp(1.3rem, 2.2vw, 1.75rem)` | — | 500 | 1.02 | -0.02em |
| `h4` | `1.0625rem` | — | 500 | — | -0.015em |
| `body` | `1rem` | — | 400 | 1.55 | — |
| `lead` | `clamp(1.1rem, 1.5vw, 1.3rem)` | — | 400 | — | — |

### Serif Accents (KEY PATTERN)

El contraste **sans-serif + serif italic** es la firma visual:

```html
<h1>Software que<br/><span class="serif">transforma</span> ideas<br/>en productos.</h1>
```

```css
.serif {
  font-family: var(--font-serif);
  font-style: italic;
  font-weight: 400;
  letter-spacing: -0.02em;
  color: var(--iris); /* u otro accent */
}
```

> **Regla**: Serif en títulos para palabras clave (máximo 1-2 por heading).
> Nunca serif en body text. Nunca serif sin italic.

### Eyebrow Labels

```css
.eyebrow {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-3);
}
.eyebrow::before {
  content: "";
  width: 6px; height: 6px;
  border-radius: 50%;
  background: currentColor;
  opacity: 0.5;
}
```

---

## Espaciado y Layout

### Gutter (espaciado responsive)

```css
--gutter: clamp(20px, 4vw, 40px);
--max: 1200px;
```

### Sections

```css
.section {
  padding: clamp(80px, 10vw, 140px) 0;
  position: relative;
}
```

### Container

```css
.wrap {
  max-width: var(--max);
  margin: 0 auto;
  padding: 0 var(--gutter);
}
```

---

## Radii

| Token | Valor | Uso |
|-------|-------|-----|
| `--r-sm` | `8px` | Badges, small elements |
| `--r-md` | `14px` | Inputs, feature cards |
| `--r-lg` | `22px` | Cards, service boxes |
| `--r-xl` | `32px` | Sections, big containers |
| `--r-pill` | `999px` | Buttons, nav, chips |

---

## Sombras (warm, soft)

| Token | CSS | Uso |
|-------|-----|-----|
| `--sh-1` | `0 1px 0 oklch(0 0 0 / 0.04), 0 1px 2px oklch(0 0 0 / 0.04)` | Nav |
| `--sh-2` | `0 2px 0 oklch(0 0 0 / 0.03), 0 8px 20px oklch(0.2 0.02 265 / 0.06)` | Card hover |
| `--sh-3` | `0 4px 0 oklch(0 0 0 / 0.03), 0 20px 50px oklch(0.2 0.02 265 / 0.1)` | Featured |
| `--sh-glow` | `0 20px 60px oklch(0.62 0.2 285 / 0.2)` | Hero elements |

---

## Componentes

### Nav — Pill flotante

```
┌─────────────────────────────────────────────────────┐
│ [C] Creapolis    Apps  Servicios  Proceso   [CTA →] │
└─────────────────────────────────────────────────────┘
```

- `position: fixed` centrada
- `background: oklch(0.985 0.003 85 / 0.72)` + `backdrop-filter: blur(16px)`
- `border: 1px solid var(--line)`
- `border-radius: var(--r-pill)` — cápsula
- CTA: `background: var(--ink)`, color `var(--paper)`
- Logo mark: square con "C" + conic gradient overlay

### Logo Mark

```css
.logo-mark {
  width: 28px; height: 28px;
  border-radius: 9px;
  background: var(--ink);
  color: var(--paper);
  position: relative;
  overflow: hidden;
}
.logo-mark::after {
  background: conic-gradient(
    from 210deg,
    transparent 0deg,
    var(--iris) 60deg,
    var(--coral) 160deg,
    var(--lime) 260deg,
    transparent 340deg
  );
  mix-blend-mode: screen;
  opacity: 0.55;
}
```

### Buttons

| Variant | Background | Text | Border |
|---------|-----------|------|--------|
| `.btn-primary` | `var(--ink)` | `var(--paper)` | none |
| `.btn-ghost` | transparent | `var(--ink)` | `1px solid var(--line-2)` |
| `.btn-accent` | `var(--iris)` | white | none |

```css
.btn {
  padding: 14px 22px;
  border-radius: var(--r-pill);
  font-size: 0.95rem;
  font-weight: 500;
  transition: transform 0.2s var(--ease), box-shadow 0.2s;
}
.btn:hover { transform: translateY(-1px); }
```

### Chips — Status badges

| Variant | Color | Background | Uso |
|---------|-------|-----------|-----|
| `.chip.live` | `--lime` | `--lime-soft` | En producción |
| `.chip.beta` | `--iris` | `--iris-soft` | Beta cerrada |
| `.chip.dev` | `--coral` | `--coral-soft` | En desarrollo |
| `.chip.soon` | `--amber` | `--amber-soft` | Próximamente |

Los chips `.live` tienen un dot con animación pulse.

### Ribbon — Motivo decorativo SVG

```html
<div class="ribbon" aria-hidden="true">
  <svg viewBox="0 0 1400 800" preserveAspectRatio="none">
    <defs>
      <linearGradient id="rib1" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="oklch(0.72 0.18 32)" stop-opacity="0.45"/>
        <stop offset="50%" stop-color="oklch(0.62 0.2 285)" stop-opacity="0.4"/>
        <stop offset="100%" stop-color="oklch(0.84 0.18 128)" stop-opacity="0.35"/>
      </linearGradient>
    </defs>
    <path d="M -100,500 C 200,300 400,700 700,450 C 1000,200 1200,600 1500,380"
          fill="none" stroke="url(#rib1)" stroke-width="120" stroke-linecap="round" opacity="0.7"/>
  </svg>
</div>
```

- Position: `absolute`, z-index: 0
- `mix-blend-mode: multiply`
- Parallax sutil en scroll
- Cada página tiene variaciones del path

### Product Cards

```
┌─────────────────────────┐
│  ╭─────╮                │  ← Glow radial con --product-color
│  │phone│                │
│  ╰─────╯                │
├─────────────────────────┤
│  App Name    [● Live]   │
│  tagline serif          │
│  Description text...    │
│  ─────────────────────  │
│  iOS · Android    Ver → │
└─────────────────────────┘
```

- `border: 1px solid var(--line)` + hover shadow
- Visual area con `radial-gradient` del product color
- Tagline en `var(--font-serif)` italic + `var(--product-color)`

### Marquee Strip

```
█████ Código propio ✦ Diseño en cada pixel ✦ Sprints de 2 semanas ✦ ... █████
```

- Background: `var(--ink)`, color: `var(--paper)`
- `animation: marquee 32s linear infinite`
- Font: `var(--font-mono)`, tamaño `0.82rem`
- Separador: ✦ en `var(--coral)`

---

## Animaciones

### Easing curves

```css
--ease: cubic-bezier(0.2, 0.7, 0.2, 1);          /* Default smooth */
--ease-bounce: cubic-bezier(0.34, 1.4, 0.64, 1);  /* Bouncy entrance */
```

### Reveal on scroll

```css
.reveal {
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 0.8s var(--ease), transform 0.8s var(--ease);
}
.reveal.in { opacity: 1; transform: translateY(0); }
.reveal-delay-1 { transition-delay: 0.08s; }
.reveal-delay-2 { transition-delay: 0.16s; }
.reveal-delay-3 { transition-delay: 0.24s; }
.reveal-delay-4 { transition-delay: 0.32s; }
```

Observer: `threshold: 0.08`, `rootMargin: '0px 0px -40px 0px'`

---

## Dark Mode (pendiente)

```css
[data-theme="dark"] {
  --paper: oklch(0.15 0.01 265);
  --chalk: oklch(0.2 0.012 265);
  --ink: oklch(0.95 0.005 85);
  --ink-2: oklch(0.75 0.01 85);
  --line: oklch(0.3 0.01 265);
  --line-2: oklch(0.4 0.01 265);
}
```

> Estado: **No implementado**. Variables preparadas, falta toggle + persist.

---

## Responsive Breakpoints

| Name | Min Width | Uso principal |
|------|-----------|--------------|
| Mobile | — | 1 col, nav burger |
| Tablet | `720px` | 2 col grids |
| Desktop | `880px` | Nav links visible |
| Wide | `980px` | Hero 2 col grid |
| Full | `1080px` | 3-4 col grids |

---

## Per-product identity colors

| Producto | Accent | Soft | Uso |
|----------|--------|------|-----|
| Solennix | `--iris` | `--iris-soft` | CRM, tech, profesional |
| Pepinillo | `--lime` | `--lime-soft` | Productividad, enfoque |
| Películas | `--coral` | `--coral-soft` | Entretenimiento, pasión |
| Aether | `--sky` | `--sky-soft` | IA, inteligencia |
| Vida | `--amber` | `--amber-soft` | Finanzas, cuidado |

---

## Accesibilidad

- ✅ Focus ring: `0 0 0 4px color-mix(in oklch, var(--iris) 20%, transparent)`
- ✅ `prefers-reduced-motion: reduce` — kills all animations
- ✅ Ribbons con `aria-hidden="true"`
- ✅ Chip dots con `color: currentColor` (heredan contraste)
- 🔲 Skip-to-content link (falta)
- 🔲 ARIA labels en nav (falta)
- 🔲 Focus visible en cards (falta)

---

## Migración: Old → New

| Aspecto | Antes (Apple copy) | Ahora (Creapolis v2) |
|---------|-------------------|---------------------|
| Fondo | `#FFFFFF` (blanco puro) | `oklch(0.985 0.003 85)` (off-white warm) |
| Texto | `#1D1D1F` | `oklch(0.18 0.015 265)` (ink con tinte blue) |
| Accent | `#0071E3` (1 solo azul) | 5 colores multi-hue oklch |
| Font | System stack | Geist + Instrument Serif + Geist Mono |
| Nav | Full-width glass bar | Pill flotante centrada |
| Headings | Solo sans, weight 800 | Sans + **serif italic** para keywords |
| Decor | Ninguno | Ribbon SVG curvo con gradient |
| Shadows | `rgba(0,0,0)` | `oklch(0.2 0.02 265)` (con tinte) |
| Chips | Ninguno | live/beta/dev/soon con colores |
| Max-width | `1120px` | `1200px` |
| Gutter | `24px` fijo | `clamp(20px, 4vw, 40px)` |

---

## TODO

- [ ] Implementar dark mode toggle
- [ ] Crear componentización en Astro (Nav, Footer, Ribbon)
- [ ] Documentar form components con estilos nuevos
- [ ] Crear page transition presets
- [ ] Añadir animation tokens para GSAP ScrollTrigger

---

## Tags

#design-system #css #oklch #components #creapolis-v2 #year-2026
