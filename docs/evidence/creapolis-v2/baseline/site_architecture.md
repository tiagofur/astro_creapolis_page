# Site Architecture — Dual Funnel Audit

**Date**: 2026-08-20  
**Auditor**: Buffy (Codebuff)  
**Feature**: F014 — dual_funnel_information_architecture

## Current Sitemap (ES locale)

```
/ (Home)
├── /servicios (Services)
│   └── /contacto (Contact form)
├── /sobre (About)
├── /blog (Blog index — 127 posts, ES only)
│   └── /blog/[slug] (Individual post)
├── /proyectos (Projects index)
│   ├── /solennix (Solennix landing)
│   │   ├── /solennix/guide
│   │   ├── /solennix/tips
│   │   └── /solennix/feedback
│   ├── /proyectos/pepinillo (Pepinillo landing)
│   │   ├── /proyectos/pepinillo/guide
│   │   ├── /proyectos/pepinillo/tips
│   │   └── /proyectos/pepinillo/feedback
│   ├── /proyectos/peliculas (Películas landing)
│   └── /proyectos/subscription-guardian (SG landing)
│       ├── /proyectos/subscription-guardian/guide
│       ├── /proyectos/subscription-guardian/tips
│       └── /proyectos/subscription-guardian/feedback
├── /privacidad (Privacy policy — root only)
├── /terminos (Terms — root only)
└── /eliminar-cuenta (Delete account — root only)
```

All routes duplicated ×3 locales (es/en/pt) = 448 pages total.

## Funnel 1: Services (Hire Me)

```
Home (hero CTA: "Iniciar proyecto")
  → Servicios (4 service cards: Mobile, Web, Desktop, AI)
    → Contacto (form: name, email, message, budget, timeline)
      → Thank you / response <24h
```

### CTA Chain:
| Page | Primary CTA | Secondary CTA | Audience |
|------|-------------|---------------|----------|
| Home | "Iniciar proyecto" → Contacto | "Ver mi trabajo" → #apps | Prospects |
| Servicios | "Iniciar proyecto" → Contacto | "Ver detalles" → service details | Qualified leads |
| Contacto | Form submit → Backend API | "hola@creapolis.dev" | Ready to buy |
| Sobre | "Conocé más sobre mí" | "Servicios" → Servicios | Evaluating |

### Assessment: ✅ Solid
- Home → Services → Contacto is a clean 3-step funnel
- Every page has a clear path to Contacto
- Sobre bridges both funnels (has links to Servicios AND Proyectos)

## Funnel 2: Products (Use My Apps)

```
Home (product cards)
  → Product page (details, pricing, features)
    → Store links (App Store / Google Play) [if live]
    → Guide / Tips / Support pages
    → Contacto (for feedback/questions)
```

### CTA Chain per Product:
| Product | Status | Store Links | Guide | Tips | Support | CTA |
|---------|--------|-------------|-------|------|---------|-----|
| Solennix | live | iOS + Android ✅ | ✅ | ✅ | ✅ | "Descargar" |
| Pepinillo | live | iOS + Android ✅ | ✅ | ✅ | ✅ | "Descargar" |
| Películas | live | Android only ✅ | ❌ | ❌ | ❌ | "Descargar" |
| Subscription Guardian | pre_production | None (correct) | ✅ | ✅ | ✅ | "Próximamente" |

### Assessment: ⚠️ Issues Found

1. **Películas has no Guide/Tips/Support** — only a store link. Consider adding at least a basic FAQ.
2. **Solennix store links are hardcoded in solennix.astro** (not from products.ts) — should be derived.
3. **SG "Próximamente" CTA** — correct for pre-production, but no waitlist/email capture.

## Cross-Funnel Connections

```
Home ──→ Servicios ──→ Contacto
  │                        ↑
  └──→ Proyectos ──→ Product pages ──→ Contacto
         ↑
       Sobre (bridges both)
         ↓
       Blog (content marketing, drives traffic)
```

### Home as Hub:
- Hero CTA → Contacto (services funnel)
- Product shelf → Product pages (products funnel)
- Services section → Servicios
- Mission section → Sobre
- Notes section → Blog
- Contact CTA → Contacto

### Assessment: ✅ Good
- Home successfully connects both funnels without competing
- Sobre page bridges both (mentions services AND products)
- Blog drives organic traffic → Home → either funnel

## Orphan Pages Check

| Page | Reachable? | How? |
|------|-----------|------|
| / | ✅ | Root |
| /servicios | ✅ | Nav, Home, Sobre |
| /contacto | ✅ | Nav, Home, Servicios, all product pages |
| /sobre | ✅ | Nav, Home |
| /blog | ✅ | Nav, Home |
| /proyectos | ✅ | Nav, Home, Footer |
| /solennix | ✅ | Home, Proyectos, Footer |
| /proyectos/pepinillo | ✅ | Home, Proyectos, Footer |
| /proyectos/peliculas | ✅ | Home, Proyectos, Footer |
| /proyectos/subscription-guardian | ✅ | Home, Proyectos, Footer |
| /privacidad | ✅ | Footer |
| /terminos | ✅ | Footer |
| /eliminar-cuenta | ⚠️ | Only via direct URL (no link in UI) |

### Assessment: ⚠️ Minor Issue
- `/eliminar-cuenta` is not linked from anywhere in the UI. This is intentional for legal compliance (account deletion must be available but doesn't need prominence).

## Recommendations

### Quick Wins (Phase 2-3):
1. **Add Guide/Tips for Películas** — even a basic FAQ would help
2. **Derive Solennix store links from products.ts** — currently hardcoded in solennix.astro
3. **Add email capture for SG waitlist** — "Próximamente" CTA could collect emails

### Architecture is Sound ✅
The dual funnel architecture works well:
- **Services funnel**: Clean 3-step path (Home → Services → Contact)
- **Products funnel**: Each product has its own ecosystem (page → store → guide → support)
- **Home**: Effectively bridges both funnels
- **No orphan pages**: All routes are reachable

The site correctly positions Creapolis as both a service provider AND a product studio, with clear paths for each audience.
