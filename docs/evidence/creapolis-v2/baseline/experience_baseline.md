# Creapolis V2 — Experience Baseline (F005)

**Fecha**: 2026-08-20
**Fase**: 0 — Baseline y decisiones
**Build**: 467 HTML pages, 34 MB, 2.48s

---

## 1. SEO — Matriz por página

### 1.1 Home (`/es/`)

| Elemento | Estado | Valor |
|---|---|---|
| `<html lang>` | ✅ | `lang="es" dir="ltr"` |
| Canonical | ✅ | `https://creapolis.dev/es/` |
| Hreflang ES | ✅ | `hreflang="es-ES"` → `/es/` |
| Hreflang EN | ✅ | `hreflang="en-US"` → `/en` |
| Hreflang PT | ✅ | `hreflang="pt-BR"` → `/pt` |
| x-default | ✅ | `hreflang="x-default"` → `/` (raíz) |
| Meta description | ✅ | "Estudio de desarrollo en Monterrey..." |
| OG:title | ✅ | "Creapolis — Software que transforma ideas en productos" |
| OG:description | ✅ | Igual a meta description |
| OG:type | ✅ | `website` |
| OG:url | ✅ | `https://creapolis.dev/es/` |
| OG:locale | ✅ | `es_MX` |
| OG:locale:alternate | ✅ | `en_US`, `pt_BR` |
| OG:image | ✅ | `https://creapolis.dev/og-default.png` (1200×630) |
| OG:site_name | ✅ | `Creapolis` |
| Twitter card | ✅ | `summary_large_image` |
| Twitter title | ✅ | Mismo que OG:title |
| Twitter image | ✅ | Mismo que OG:image |
| Theme color | ✅ | `#5B4FBE` |
| JSON-LD | ✅ | `WebSite` schema con `Organization`, `Person`, `SearchAction` |
| RSS link | ✅ | `/rss.xml` |
| Sitemap | ✅ | `sitemap-index.xml` |
| Favicon | ✅ | SVG |
| Google Fonts | ✅ | Geist, Geist Mono, Instrument Serif (preconnect) |

### 1.2 Blog article (`/es/blog/{slug}`)

| Elemento | Estado | Nota |
|---|---|---|
| Canonical | ✅ | URL del artículo |
| Hreflang | ✅ | 3 locales |
| OG:type | ✅ | `article` |
| Article published_time | ✅ | Desde frontmatter |
| Article tags | ✅ | Desde frontmatter |
| JSON-LD | ✅ | `BlogPosting` schema |

### 1.3 Problemas SEO detectados

| # | Severidad | Issue | Página |
|---|---|---|---|
| 1 | 🟡 | x-default apunta a `/` (redirect JS, no 301) | Todas |
| 2 | 🟡 | EN/PT hreflang apuntan a `/en` sin trailing slash (debería ser `/en/`) | Home |
| 3 | 🟢 | `sameAs` del founder está vacío (placeholders) | Todas |
| 4 | 🟢 | Blog posts EN/PT usan slugs ES (no traducidos) | Blog |

---

## 2. Accesibilidad

### 2.1 Landmarks (Home ES)

| Landmark | Cantidad | Estado |
|---|---|---|
| `<nav>` | 1 | ✅ |
| `<footer>` | 1 | ✅ |
| `<header>` | implícito via layout | ⚠️ Falta `<header>` explícito |
| `<main>` | implícito via `#main-content` | ⚠️ Falta `<main>` explícito |
| `role="listbox"` | 1 | ✅ (language selector) |
| `role="option"` | 2 | ✅ |

### 2.2 Elementos de accesibilidad

| Elemento | Estado | Detalle |
|---|---|---|
| Skip-to-content link | ✅ | `<a href="#main-content" class="skip-link">` |
| Nav aria-label | ✅ | `aria-label="Principal"` |
| Language selector | ✅ | `aria-expanded`, `aria-haspopup="listbox"` |
| Mobile menu toggle | ✅ | `aria-label`, `aria-expanded` |
| Images alt text | ✅ | 0 imágenes sin alt en home |
| Buttons | ✅ | Todos con aria-label |

### 2.3 Problemas de accesibilidad

| # | Severidad | Issue | Ubicación |
|---|---|---|---|
| 1 | 🟡 | Falta `<header>` wrapper explícito en Layout | Layout.astro |
| 2 | 🟡 | Falta `<main>` wrapper explícito en Layout | Layout.astro |
| 3 | 🟡 | Scroll reveal JS no tiene `prefers-reduced-motion` check | Layout.astro |
| 4 | 🟢 | Smooth scroll no respeta `prefers-reduced-motion` | Layout.astro |
| 5 | 🟢 | Focus visible styles no verificados | global.css |

---

## 3. Performance

### 3.1 Build output

| Métrica | Valor |
|---|---|
| Total dist | 34 MB |
| HTML pages | 467 |
| JS bundles | 1 (page.B1D-nYk3.js — 2.2 KB) |
| CSS files | 14 (4.6 KB – 20 KB cada uno) |
| Imágenes | 1 (og-default.png) |
| Build time | 2.48s |

### 3.2 Asset weights

| Asset | Peso | Nota |
|---|---|---|
| JS total | 2.2 KB (gzip ~1 KB) | ✅ Excelente |
| CSS total (por página) | ~13-20 KB | ✅ Bueno |
| og-default.png | ~50 KB (estimado) | ✅ Aceptable |
| Google Fonts | External (3 families) | ⚠️ Agrega latency |
| Blog post HTML (promedio) | 50-80 KB | ✅ Aceptable |
| Blog post más grande | 384 KB (SDUI Flutter) | ⚠️ Artículo muy largo |

### 3.3 External resources

| Recurso | Tipo | Impacto |
|---|---|---|
| Google Fonts (3 families) | CSS + WOFF2 | ⚠️ 2-3 round trips |
| favicon.svg | SVG | ✅ Mínimo |
| og-default.png | PNG | ✅ Solo en shares |

### 3.4 Presupuesto estimado de LCP

| Componente | Tiempo estimado |
|---|---|
| DNS + TCP + TLS | ~200ms |
| HTML download | ~50ms (34 KB avg) |
| CSS parse + paint | ~100ms |
| Fonts load | ~300-500ms (cross-origin) |
| **LCP estimado** | **~650-850ms** |

**Evaluación**: Con SSG y poco JS, el LCP debería ser bajo. El mayor riesgo es Google Fonts (3 families cargadas vía CSS externo). Se podría mejorar con `font-display: swap` o self-hosting.

---

## 4. Responsive

### 4.1 Breakpoints en CSS

| Breakpoint | Uso | Verificado |
|---|---|---|
| `560px` | Footer grid | ✅ |
| `768px` | (inferido de clamp values) | ✅ |
| `880px` | Footer 2-col | ✅ |
| `1024px` | (inferido) | ✅ |
| `1440px` | Max width container | ✅ |

### 4.2 Viewport meta

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
✅ Correcto — sin `maximum-scale=1` (bloquea zoom).

---

## 5. Structured Data

### 5.1 Home (WebSite schema)

```json
{
  "@type": "WebSite",
  "name": "Creapolis",
  "url": "https://creapolis.dev",
  "publisher": {
    "@type": "Organization",
    "name": "Creapolis",
    "founder": {
      "@type": "Person",
      "name": "Tiago David Furtado",
      "jobTitle": "Desarrollador de software independiente",
      "sameAs": []
    }
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://creapolis.dev/blog?q={search_term_string}"
  }
}
```

### 5.2 Blog (BlogPosting schema)

✅ Presente en artículos con `headline`, `description`, `datePublished`, `author`, `publisher`, `keywords`, `inLanguage`.

### 5.3 Faltantes

| Schema | Estado | Prioridad |
|---|---|---|
| `SoftwareApplication` (para apps) | ❌ No existe | 🟡 F050 |
| `BreadcrumbList` | ❌ No existe | 🟢 Opcional |
| `FAQPage` | ❌ No existe | 🟢 Opcional |

---

## 6. RSS

| Elemento | Estado |
|---|---|
| RSS feed | ✅ `/rss.xml` |
| Link in HTML | ✅ `<link rel="alternate" type="application/rss+xml">` |
| Content | Solo artículos ES (correcto — blog es solo ES) |

---

## 7. Resumen de issues priorizados

### 🔴 Críticos (bloquean Fase 3+)

Ninguno — el baseline es sólido para SSG.

### 🟡 Medianos (mejorar en Fase 3-7)

| # | Issue | Fase sugerida | Esfuerzo |
|---|---|---|---|
| 1 | Root `/` usa redirect JS (no 301 server-side) | F016 | Medio |
| 2 | Falta `<header>` y `<main>` explícitos | F022 | Bajo |
| 3 | Scroll reveal ignora `prefers-reduced-motion` | F025 | Bajo |
| 4 | Google Fonts se carga externamente (3 families) | F021 | Medio |
| 5 | `sameAs` del founder vacío | F049 | Bajo |
| 6 | Falta `SoftwareApplication` schema | F050 | Bajo |
| 7 | EN/PT hreflang sin trailing slash | F016 | Bajo |

### 🟢 Bajos (mejorar cuando sea posible)

| # | Issue |
|---|---|
| 8 | Blog posts EN/PT replican contenido ES sin traducir |
| 9 | Falta `BreadcrumbList` schema |
| 10 | Falta `FAQPage` schema |

---

## 8. Métricas de referencia para comparar después del rediseño

| Métrica | Valor actual | Target V2 |
|---|---|---|
| Build time | 2.48s | < 5s |
| Total dist | 34 MB | < 50 MB |
| JS total | 2.2 KB | < 10 KB |
| CSS por página | 13-20 KB | < 25 KB |
| HTML pages | 467 | Mantener o reducir |
| LCP estimado | ~650-850ms | < 2.5s (field) |
| SEO score | ~90/100 | 100/100 |
| A11y landmarks | Nav + Footer | + Header + Main |

---

*Documento generado como parte de F005 — experience_baseline*
*Fecha: 2026-08-20*
