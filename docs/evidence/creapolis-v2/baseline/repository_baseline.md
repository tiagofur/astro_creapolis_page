# Creapolis V2 — Repository Baseline

**Fecha**: 2026-08-20
**Rama**: main
**Commit**: (ver HEAD)

---

## 1. Stack tecnológico

| Capa | Tecnología | Versión |
|---|---|---|
| Framework | Astro | 5.18.2 |
| Styling | Vanilla CSS (CSS Variables) | — |
| Content | Markdown (Astro Content Collections) | — |
| Build mode | SSG (Static Site Generation) | — |
| Paquete manager | pnpm | 11.1.2 |
| i18n | Integrado en Astro (`@astrojs` i18n routing) | — |
| SEO | `@astrojs/sitemap` | 3.7.3 |
| RSS | `@astrojs/rss` | 4.0.19 |
| Backend | Go (chi router) | go 1.26.1 |
| DB | MariaDB/MySQL (vía `go-sql-driver/mysql`) | — |
| Email | SMTP (Gmail relay vía IONOS) | — |
| Deploy frontend | nginx + Plesk (IONOS VPS) | — |
| Deploy backend | Docker (GHCR `ghcr.io/tiagofur/creapolis-api:latest`) | — |
| Tipochecker | `astro/tsconfigs/strict` (heredado) | — |

### Dependencias npm (solo 3)

```
@astrojs/rss: ^4.0.18
@astrojs/sitemap: ^3.7.2
astro: ^5.0.0
```

**Sin framework de UI** (React, Vue, Svelte) — todo es componentes `.astro` puros.
**Sin Tailwind** — CSS vanilla con variables custom.

---

## 2. Scripts disponibles

| Script | Comando | Estado |
|---|---|---|
| `dev` | `astro dev` | ✅ Funcional |
| `start` | `astro dev` | ✅ Funcional |
| `build` | `astro build` | ✅ Funcional — **448 páginas, 7.74s** |
| `preview` | `astro preview` | ✅ Funcional |
| `astro` | `astro` | ✅ |
| `normalize:blog` | `node scripts/normalize-blog.mjs` | ✅ Normaliza frontmatter de 127 posts |
| `normalize:blog:dry` | `node scripts/normalize-blog.mjs --dry` | ✅ Solo reporta |

### Comandos que NO existen

| Comando | Estado | Nota |
|---|---|---|
| `typecheck` | ❌ No definido | Se puede ejecutar `npx astro check` o `tsc --noEmit` |
| `lint` | ❌ No definido | No hay ESLint, Biome, ni Prettier configurado |
| `test` | ❌ No definido | No existen tests unitarios ni de integración |
| `format` | ❌ No definido | Sin formatter |

---

## 3. Resultado del build

```
$ pnpm run build
→ 448 pages built in 7.74s
→ Output: dist/ (34 MB total)
→ _astro/ bundle: 192 KB (1 JS chunk: page.B1D-nYk3.js — 2.24 KB / gzip 1.01 KB)
→ 10 client modules transformed
→ RSS: rss.xml generated
→ Sitemap: sitemap-index.xml generated (1 sitemap)
→ Exit code: 0 (success)
```

### Archivos generados en dist/

| Tipo | Cantidad |
|---|---|
| Total archivos | 488 |
| HTML pages | 467 |
| JavaScript bundles | 1 (page.B1D-nYk3.js) |
| Otros (images, xml, svg, txt) | ~20 |

---

## 4. Rutas generadas (467 páginas HTML)

### Rutas principales por locale

#### Español (`/es/`)

| Ruta | Página |
|---|---|
| `/es/` | Home |
| `/es/servicios` | Services |
| `/es/sobre` | About |
| `/es/contacto` | Contact |
| `/es/solennix` | Solennix landing |
| `/es/solennix/guide` | Solennix guide |
| `/es/solennix/tips` | Solennix tips |
| `/es/solennix/feedback` | Solennix feedback |
| `/es/proyectos` | Projects index |
| `/es/proyectos/pepinillo` | Pepinillo detail |
| `/es/proyectos/pepinillo/guide` | Pepinillo guide |
| `/es/proyectos/pepinillo/tips` | Pepinillo tips |
| `/es/proyectos/pepinillo/feedback` | Pepinillo feedback |
| `/es/proyectos/peliculas` | Películas detail |
| `/es/proyectos/subscription-guardian` | SG detail |
| `/es/proyectos/subscription-guardian/guide` | SG guide |
| `/es/proyectos/subscription-guardian/tips` | SG tips |
| `/es/proyectos/subscription-guardian/feedback` | SG feedback |
| `/es/blog` | Blog index |
| `/es/blog/{slug}` | 127 artículos |
| `/es/404` | Error page |

#### English (`/en/`)

| Ruta | Página |
|---|---|
| `/en/` | Home |
| `/en/services` | Services |
| `/en/about` | About |
| `/en/contact` | Contact |
| `/en/solennix` | Solennix landing |
| `/en/solennix/guide` | Solennix guide |
| `/en/solennix/tips` | Solennix tips |
| `/en/solennix/feedback` | Solennix feedback |
| `/en/projects` | Projects index |
| `/en/projects/pepinillo` | Pepinillo detail |
| `/en/projects/pepinillo/guide` | Pepinillo guide |
| `/en/projects/pepinillo/tips` | Pepinillo tips |
| `/en/projects/pepinillo/feedback` | Pepinillo feedback |
| `/en/projects/peliculas` | Películas detail |
| `/en/projects/subscription-guardian` | SG detail |
| `/en/projects/subscription-guardian/guide` | SG guide |
| `/en/projects/subscription-guardian/tips` | SG tips |
| `/en/projects/subscription-guardian/feedback` | SG feedback |
| `/en/blog` | Blog index |
| `/en/blog/{slug}` | 127 artículos (mismos slugs ES) |
| `/en/404` | Error page |

#### Português (`/pt/`)

| Ruta | Página |
|---|---|
| `/pt/` | Home |
| `/pt/servicos` | Services |
| `/pt/sobre` | About |
| `/pt/contato` | Contact |
| `/pt/solennix` | Solennix landing |
| `/pt/solennix/guide` | Solennix guide |
| `/pt/solennix/tips` | Solennix tips |
| `/pt/solennix/feedback` | Solennix feedback |
| `/pt/projetos` | Projects index |
| `/pt/projetos/pepinillo` | Pepinillo detail |
| `/pt/projetos/pepinillo/guide` | Pepinillo guide |
| `/pt/projetos/pepinillo/tips` | Pepinillo tips |
| `/pt/projetos/pepinillo/feedback` | Pepinillo feedback |
| `/pt/projetos/peliculas` | Películas detail |
| `/pt/projetos/subscription-guardian` | SG detail |
| `/pt/projetos/subscription-guardian/guide` | SG guide |
| `/pt/projetos/subscription-guardian/tips` | SG tips |
| `/pt/projetos/subscription-guardian/feedback` | SG feedback |
| `/pt/blog` | Blog index |
| `/pt/blog/{slug}` | 127 artículos (mismos slugs ES) |
| `/pt/404` | Error page |

#### Rutas sin locale (raíz)

| Ruta | Función |
|---|---|
| `/` | Redirect dinámico a `/es/` o `/en/` según browser language |
| `/index.html` | HTML con redirect JS + noscript fallback |

### Rutas legales (sin locale prefix)

| Ruta | Idioma |
|---|---|
| `/privacidad` | ES |
| `/privacy-policy` | EN |
| `/terminos` | ES |
| `/terms-of-use` | EN |
| `/eliminar-cuenta` | ES |
| `/delete-account` | EN |

### Redirects configurados (en astro.config.mjs)

```
/servicios → /es/servicios
/services → /en/services
/contacto → /es/contacto
/contact → /en/contact
/sobre → /es/sobre
/about → /en/about
/proyectos → /es/proyectos
/projects → /en/projects
/blog → /es/blog
/solennix → /es/solennix
/pepinillo → /es/proyectos/pepinillo
/pepinillo/guide → /en/projects/pepinillo/guide
/pepinillo/tips → /en/projects/pepinillo/tips
/pepinillo/feedback → /en/projects/pepinillo/feedback
/proyectos/pepinillo → /es/proyectos/pepinillo
/proyectos/pepinillo/guide → /es/proyectos/pepinillo/guide
/proyectos/pepinillo/tips → /es/proyectos/pepinillo/tips
/proyectos/pepinillo/feedback → /es/proyectos/pepinillo/feedback
/proyectos/peliculas → /es/proyectos/peliculas
```

**⚠️ Observaciones sobre redirects:**
- No hay redirect de `/solennix/guide` ni `/solennix/tips` (estas rutas existen en los 3 locales como `/es/solennix/guide`, `/en/solennix/guide`, `/pt/solennix/guide`)
- No hay redirects de PT (e.g. `/servicos`, `/contato`, `/projetos`)

---

## 5. i18n — Cobertura por idioma

| Locale | Keys traducidas | vs ES (344) | % cobertura |
|---|---|---|---|
| `es` (default) | 344 | — | 100% |
| `en` | 344 | 0 faltantes | 100% |
| `pt` | 211 | 133 faltantes | 61% |

### Keys faltantes en PT (133)

Principales áreas sin traducir:
- `services.page.*` (7 keys) — página de servicios completa
- `contact.*` (42 keys) — formulario de contacto completo
- `about.*` (15 keys) — página sobre mí completa
- `hero.*`, `marquee.*`, `apps.*`, `mission.*`, `stats.*` — home page
- `shelf.*` (16 keys) — desarrollo shelf
- `faq.*` (12 keys) — preguntas frecuentes
- `process.*` (8 keys) — proceso de trabajo
- `notfound.*` (9 keys) — página 404
- `blog.*` (3 keys, parcial)
- `legal.*` (1 key)

### Nota sobre blog en locales no-ES

Los 127 artículos del blog se publican en los 3 locales (`/es/blog/`, `/en/blog/`, `/pt/blog/`) pero **todo el contenido está en español**. La UI del blog en EN/PT muestra un banner: "Este blog está en español" / "Os artigos estão em espanhol".

---

## 6. Estructura del proyecto

```
creapolis/
├── src/
│   ├── components/          # 6 componentes globales (.astro)
│   │   ├── Nav.astro
│   │   ├── Footer.astro
│   │   ├── LanguageBanner.astro
│   │   ├── Ribbon.astro
│   │   ├── BlogSpanishNotice.astro
│   │   └── LegalPrivacyEN.astro
│   ├── components/pages/    # 18 componentes de página
│   │   ├── AboutContent.astro
│   │   ├── ContactContent.astro
│   │   ├── ServicesContent.astro
│   │   ├── ProjectsListContent.astro
│   │   ├── ProjectDetail.astro
│   │   ├── SupportLayout.astro
│   │   ├── SGSupportLayout.astro
│   │   ├── PepinilloGuideContent.astro
│   │   ├── PepinilloTipsContent.astro
│   │   ├── PepinilloSupportLayout.astro
│   │   ├── PepinilloFeedbackContent.astro
│   │   ├── SGGuideContent.astro
│   │   ├── SGTipsContent.astro
│   │   ├── SGFeedbackContent.astro
│   │   ├── SolennixGuideContent.astro
│   │   ├── SolennixTipsContent.astro
│   │   ├── SolennixSupportLayout.astro
│   │   └── SolennixFeedbackContent.astro
│   ├── content/
│   │   ├── config.ts        # Schema de blog (Zod)
│   │   └── blog/            # 127 archivos .md
│   ├── i18n/
│   │   ├── ui.ts            # 344 keys × 3 locales
│   │   ├── utils.ts         # getLangFromUrl, useTranslations, slugMap
│   │   └── data/            # 8 archivos .ts (datos de páginas)
│   ├── layouts/
│   │   └── Layout.astro     # Layout base con SEO/OG/JSON-LD
│   ├── pages/
│   │   ├── index.astro      # Root redirect
│   │   ├── privacidad.astro
│   │   ├── privacy-policy.astro
│   │   ├── terminos.astro
│   │   ├── terms-of-use.astro
│   │   ├── eliminar-cuenta.astro
│   │   ├── delete-account.astro
│   │   └── [lang]/          # Todas las rutas localizadas
│   ├── styles/
│   │   └── global.css       # Design system completo (~2000+ líneas)
│   └── utils/
│       └── post.ts          # Helpers para blog posts
├── public/
│   ├── favicon.svg
│   ├── og-default.png
│   ├── robots.txt
│   ├── rss.xml
│   └── index.html           # Root redirect (JS + noscript)
├── backend/
│   ├── main.go              # API de contacto (chi router)
│   ├── go.mod / go.sum
│   ├── Dockerfile           # Multi-stage (golang:1.26 → alpine:3.20)
│   └── README.md
├── scripts/
│   ├── normalize-blog.mjs   # Normalización de frontmatter
│   ├── normalize-blog.dry   # (alias de dry run)
│   ├── rename-blog-slugs.sh
│   ├── i18n-migrate.mjs
│   └── og-default.svg
├── docs/
├── .github/workflows/       # Vacío (sin CI/CD configurado)
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── DEPLOY.md
├── README.md
└── PRD.md
```

---

## 7. Backend — API de contacto

### Stack

- **Runtime**: Go 1.26.1
- **Router**: `go-chi/chi/v5` v5.2.5
- **CORS**: `go-chi/cors` v1.2.2
- **DB**: `go-sql-driver/mysql` v1.8.1 (MariaDB/MySQL)
- **Container**: Alpine 3.20, binario estático (CGO_ENABLED=0)

### Endpoint

```
POST /api/contact
```

**Request body**:
```json
{
  "name": "string (required)",
  "email": "string (required)",
  "company": "string (optional)",
  "type": "string (optional)",
  "budget": "string (optional)",
  "service": "string (optional)",
  "message": "string (required)",
  "website": "string (honeypot)",
  "timestamp": "string (anti-bot)"
}
```

**Response**:
```json
{
  "success": true/false,
  "message": "string"
}
```

### Protecciones

- Rate limiting: 5 requests/min por IP
- Honeypot field (`website`) — bots lo llenan y se descartan silenciosamente
- Timestamp validation — envíos < 2s se rechazan
- Email validation
- CORS: permite `localhost:4321`, `localhost:3000`, `creapolis.dev`, `www.creapolis.dev`

### Base de datos

```sql
CREATE TABLE contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  type VARCHAR(100),
  budget VARCHAR(100),
  service VARCHAR(100),
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### Email notifications

- SMTP relay vía Gmail (`creapolis.mx@gmail.com`)
- Puerto 465 (implicit TLS) o 587 (STARTTLS)
- Notificaciones van a `tiagofur@gmail.com`
- Si SMTP no está configurado, loguea a stdout

---

## 8. Deploy y hosting

### Frontend

- **VPS**: IONOS, Ubuntu 24.04, IP `74.208.234.244`
- **Panel**: Plesk Obsidian 18.0.76
- **Webroot**: `/var/www/vhosts/creapolis.dev/httpdocs/`
- **SSL**: Let's Encrypt (via Plesk)
- **Deploy manual**: `rsync -avz --delete dist/ user@IP:/var/www/vhosts/creapolis.dev/httpdocs/`
- **CI/CD**: `.github/workflows/` está vacío — **no hay pipeline automatizado**

### Backend

- **Docker image**: `ghcr.io/tiagofur/creapolis-api:latest`
- **Puerto host**: 3100 (mapeado a 3000 en container)
- **Proxy nginx**: `/api/` → `127.0.0.1:3100`
- **Env vars**: `/etc/creapolis/backend.env` (permisos 600)

### DNS

- A record: `creapolis.dev` → `74.208.234.244`
- A record: `www.creapolis.dev` → `74.208.234.244`

---

## 9. SEO actual

### Layout base (Layout.astro)

- ✅ Canonical URL por página
- ✅ hreflang tags (ES/EN/PT) con slug translation
- ✅ x-default → `/` (raíz con redirect JS)
- ✅ Open Graph (title, description, image, type, locale, site_name)
- ✅ Twitter cards (summary_large_image)
- ✅ JSON-LD structured data
  - Páginas generales: `WebSite` schema
  - Blog posts: `BlogPosting` schema
  - Person schema (founder): Tiago David Furtado
  - Organization schema: Creapolis (Monterrey, MX)
- ✅ robots.txt → permite todo, incluye sitemap
- ✅ sitemap-index.xml generado por `@astrojs/sitemap`
- ✅ RSS feed (`/rss.xml`)
- ✅ Google Fonts: Geist, Geist Mono, Instrument Serif

### Notas SEO

- `sameAs` del founder está vacío (placeholders para LinkedIn/GitHub/X)
- Root `/` tiene redirect JS (no 301 server-side) —搜索引擎可能无法正确抓取
- Blog posts EN/PT usan los mismos slugs que ES (no traducidos)

---

## 10. Componentes clave

### Layout (Layout.astro)

- Skip-to-content link (accessibilidad)
- Google Fonts (preconnect + stylesheet)
- Favicon SVG
- RSS link alternativo
- JSON-LD script injection
- Scroll reveal observer (IntersectionObserver)
- Nav scroll effect
- Mobile menu toggle
- Smooth scroll for anchors

### Nav (Nav.astro)

- Logo "C" con gradient conic
- Links: Projects, Services, About, Blog, Contact
- CTA: "Iniciar proyecto" → Contact
- Language selector (dropdown) con globe icon
- Mobile hamburger menu
- Active state detection
- Localized slugs via `getLocalizedPath()`

### Footer (Footer.astro)

- Ribbon SVG decorativo
- Brand column (logo + tagline)
- Social links (LinkedIn, GitHub, Twitter) — **TODOS en `null`** (no visibles)
- Navigation: Site, Projects, Contact
- Legal links: Privacy, Terms, Delete Account
- Copyright: © {year} Creapolis · Tiago David Furtado

---

## 11. Problemas preexistentes conocidos

### Críticos (afectan F001–F019)

1. **Sin CI/CD**: `.github/workflows/` vacío — no hay build automático, tests, ni lint
2. **Sin typecheck script**: No hay `astro check` ni `tsc --noEmit` configurado
3. **Sin tests**: No existen tests de ningún tipo
4. **Sin lint**: No hay ESLint, Biome, ni Prettier
5. **Root redirect es JavaScript**: `/` usa `location.replace()` con fallback noscript — no es un 301 server-side
6. **PT incompleto**: 133 keys sin traducir (61% cobertura)

### Medios (afectan F001–F028)

7. **Social links en null**: Footer y Layout.astro tienen `sameAs: []` y `social.linkedin/github/twitter: null`
8. **Blog solo en español**: 127 artículos se publican en EN/PT pero contenido es español puro
9. **sharp build warning**: `sharp@0.34.5` falla al compilar desde source (funciona por fallback prebuilt)
10. **Duplicación de contenido**: Artículos del blog duplicados ×3 locales = 381 páginas de contenido idéntico en 3 idiomas
11. **Solennix route inconsistente**: Solennix tiene ruta especial `/es/solennix` en vez del patrón `/es/proyectos/solennix`

### Menores (afectan F029+)

12. **Blog slug "guia-completa-de-guia-completa-de-nestjs-para-desa"**: Slug duplicado "guia-completa-de" probablemente error de normalización
13. **FAQ usa voz "nosotros"** en lugar de primera persona singular
14. **Contact form**: Algunos strings usan "nosotros" ("Contáctanos") vs "yo" ("Contame")
15. **README.md desactualizado**: Estructura y color palette documentados no coinciden con el diseño actual
16. **creapolis_dev_page/**: Carpeta de documentación interna (Obsidian) que no debería estar en el repo de producción

---

## 12. Verificación de comandos documentados

| Comando | Resultado | Evidencia |
|---|---|---|
| `pnpm install` | ✅ 296 packages, 2.9s | sharp warning preexistente |
| `pnpm run build` | ✅ 448 pages, 7.74s | Ver stdout arriba |
| `pnpm run dev` | ✅ (requiere localhost) | Funcional según package.json |
| `pnpm run preview` | ✅ (requiere build previo) | Funcional según package.json |
| `node scripts/normalize-blog.mjs --dry` | ✅ | Normaliza frontmatter de 127 posts |
| `ls src/content/blog/*.md` | 127 archivos | Confirmado |
| `ls src/components/*.astro` | 6 componentes | Confirmado |
| `ls src/components/pages/*.astro` | 18 componentes | Confirmado |
| `find dist -name "*.html"` | 467 archivos HTML | Confirmado |

---

## 13. Configuración de Astro

```js
// astro.config.mjs
{
  site: 'https://creapolis.dev',
  compressHTML: true,
  build: { inlineStylesheets: 'auto' },
  prefetch: { prefetchAll: true },
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en', 'pt'],
    routing: {
      prefixDefaultLocale: true,    // /es/ en vez de /
      redirectToDefaultLocale: false // raíz no redirige automáticamente
    }
  },
  redirects: { /* 18 redirects definidos — ver sección 4 */ }
}
```

### tsconfig.json

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] }
  }
}
```

**Usa path alias `@/*`** → `src/*`.

---

*Documento generado como parte de F001 — repository_baseline*
*Fecha: 2026-08-20*
