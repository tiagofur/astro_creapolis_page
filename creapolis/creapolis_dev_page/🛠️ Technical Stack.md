# 🛠️ Technical Stack — Creapolis v2

> Documentación del stack técnico, arquitectura y decisiones del redesign
> **Actualizado**: Abril 2026

---

## ⚡ Stack Actual

### Core

| Tecnología | Versión | Uso |
|------------|--------|-----|
| **Astro** | 5.0+ | Framework SSG principal |
| **TypeScript** | strict | Type safety |
| **CSS** | Native (oklch) | Estilos con custom properties |
| **Node.js** | 18+ | Runtime |
| **Go** | — | Backend API (contact form) |

### Dependencies

```json
{
  "dependencies": {
    "astro": "^5.0.0",
    "@astrojs/rss": "^4.0.18"
  }
}
```

### Por agregar (redesign)

| Paquete | Propósito | Estado |
|---------|----------|--------|
| Google Fonts | Geist + Instrument Serif + Geist Mono | 🔲 Pendiente |
| GSAP | ScrollTrigger animations | 🔲 FASE 5 |

---

## 🏗️ Arquitectura v2

### Componentes Astro (nuevos)

```
src/components/
├── Nav.astro         # Nav pill flotante + mobile menu
├── Footer.astro      # Footer con columns + links
└── Ribbon.astro      # SVG decorativo reutilizable
```

**Por qué**: El nav y footer estaban copiados en las 8 páginas. Un cambio requería editar 8 archivos. Con componentes, se edita una sola vez.

### Layout.astro (actualizar)

```astro
---
import '../styles/global.css';
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';
---
<html lang="es">
  <head>
    <!-- Google Fonts preconnect -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?..." />
    <!-- Meta -->
    <meta name="theme-color" content="#FCFBF8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  </head>
  <body>
    <Nav />
    <slot />
    <Footer />
  </body>
</html>
<script>
  // Reveal observer + nav scroll + ribbon parallax
</script>
```

### CSS Architecture (nueva)

```
src/styles/
└── global.css
    ├── :root tokens (oklch colors)
    ├── Reset & Base
    ├── Typography (Geist system)
    │   ├── Headings (sans)
    │   ├── .serif (Instrument Serif italic)
    │   └── .eyebrow (Geist Mono uppercase)
    ├── Layout (.wrap, .section, .gutter)
    ├── Components
    │   ├── Nav (pill flotante)
    │   ├── Buttons (primary, ghost, accent)
    │   ├── Cards (hover, shadow)
    │   ├── Chips (live, beta, dev, soon)
    │   ├── Footer (columns)
    │   └── Ribbon (SVG motif)
    ├── Animations
    │   ├── .reveal (scroll fade-up)
    │   ├── .marquee (ticker)
    │   └── .pulse (status dot)
    └── Dark mode (prefers-color-scheme + [data-theme])
```

---

## 📁 Estructura del Proyecto

```
apple_style/
├── src/
│   ├── components/          # ← NUEVO: shared UI
│   │   ├── Nav.astro
│   │   ├── Footer.astro
│   │   └── Ribbon.astro
│   ├── content/
│   │   ├── blog/            # 12 posts en Markdown
│   │   │   ├── automatizacion-procesos-ia.md
│   │   │   ├── costo-desarrollo-app.md
│   │   │   ├── flutter-vs-react-native-vs-nativo.md
│   │   │   ├── herramientas-desarrollo-importan.md
│   │   │   ├── ia-analisis-datos.md
│   │   │   ├── ia-atencion-cliente.md
│   │   │   ├── implementar-ia-empresa.md
│   │   │   ├── modelo-precio-desarrollo.md
│   │   │   ├── mvp-validar-idea.md
│   │   │   ├── por-que-dejar-wordpress.md
│   │   │   ├── por-que-desarrollo-nativo.md
│   │   │   └── proceso-desarrollo-apps.md
│   │   ├── proyectos/       # ← MIGRAR data aquí
│   │   └── config.ts        # Zod schemas
│   ├── layouts/
│   │   └── Layout.astro     # Base con Nav/Footer
│   ├── pages/
│   │   ├── index.astro      # Home (rediseñar)
│   │   ├── servicios.astro  # Servicios (rediseñar)
│   │   ├── contacto.astro   # Contacto (rediseñar)
│   │   ├── solennix.astro   # Solennix landing
│   │   ├── terminos.astro   # Legal
│   │   ├── privacidad.astro # Legal
│   │   ├── blog/
│   │   │   ├── index.astro  # Listing
│   │   │   └── [slug].astro # Post detail
│   │   └── proyectos/
│   │       ├── index.astro  # Catalog
│   │       └── [slug].astro # Project detail
│   └── styles/
│       └── global.css       # Design system v2
├── backend/                 # Go API server
│   ├── main.go              # /api/contact endpoint
│   ├── go.mod
│   └── server/              # Compiled binary
├── public/
│   ├── favicon.svg          # Logo mark "C" + gradient
│   ├── robots.txt
│   ├── rss.xml
│   └── sitemap.xml
├── creapolis_dev_page/      # Obsidian vault (docs)
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── PRD.md
```

---

## 🧩 Content Collections

### Blog Schema (existente, OK)

```typescript
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string().default('Creapolis'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});
```

### Proyectos Schema (actualizar)

```typescript
const proyectos = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    desc: z.string(),
    fullDesc: z.string().optional(),
    platform: z.string(),
    color: z.string(),              // oklch o named: iris/lime/coral
    featured: z.boolean().default(false),
    status: z.enum(['live', 'beta', 'dev', 'soon']).default('live'),
    tech: z.array(z.string()).default([]),
    features: z.array(z.string()).default([]),
    storeLinks: z.object({
      apple: z.string().optional(),
      google: z.string().optional(),
      web: z.string().optional(),
    }).optional(),
    pricing: z.array(z.object({
      plan: z.string(),
      price: z.string(),
      features: z.array(z.string()),
    })).optional(),
  }),
});
```

---

## 🔧 Configuración

### astro.config.mjs

```javascript
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://creapolis.dev',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
  prefetch: {
    prefetchAll: true,
  },
});
```

---

## 🎨 Design Tokens v2 (CSS)

### Antes → Después

```css
/* ANTES (Apple copy) */
:root {
  --color-bg: #FFFFFF;
  --color-text: #1D1D1F;
  --color-accent: #0071E3;
  --font-sans: -apple-system, system-ui, sans-serif;
  --container-max: 1120px;
}

/* DESPUÉS (Creapolis v2) */
:root {
  --paper: oklch(0.985 0.003 85);
  --ink: oklch(0.18 0.015 265);
  --iris: oklch(0.62 0.2 285);
  --coral: oklch(0.72 0.18 32);
  --lime: oklch(0.84 0.18 128);
  --sky: oklch(0.72 0.14 235);
  --amber: oklch(0.78 0.16 70);
  --font-sans: 'Geist', ui-sans-serif, system-ui, sans-serif;
  --font-serif: 'Instrument Serif', Georgia, serif;
  --font-mono: 'Geist Mono', ui-monospace, monospace;
  --max: 1200px;
  --gutter: clamp(20px, 4vw, 40px);
}
```

---

## 🚀 Commands

```bash
# Development
npm run dev          # http://localhost:4321
npm run preview      # Preview production build

# Build
npm run build        # Output: dist/

# Backend (contact form)
cd backend && go run main.go   # http://localhost:3000
```

---

## 📎 Links

- [Astro Docs](https://docs.astro.build)
- [Content Collections](https://docs.astro.build/en/guides/content-collections)
- [oklch Color Picker](https://oklch.com)
- [Geist Font](https://vercel.com/font)

---

## TODO

- [ ] Crear `src/components/` directory
- [ ] Agregar proyectos a content collection
- [ ] Actualizar proyectos schema con status/tech/storeLinks
- [ ] Crear 404 page
- [ ] Setup View Transitions
- [ ] Considerar satori para OG images

---

## Tags

#technical #stack #architecture #astro #creapolis-v2 #year-2026
