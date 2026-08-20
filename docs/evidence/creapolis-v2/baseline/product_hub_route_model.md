# Product Hub Route Model

**Date**: 2026-08-20  
**Feature**: F017 — product_hub_route_model

## Current State

### Route Pattern
All products live under `/proyectos/[slug]/` with optional subpages:

```
/proyectos/[slug]/              — Landing page (hero, features, stores, CTA)
/proyectos/[slug]/guide         — User guide / getting started
/proyectos/[slug]/tips          — Tips, tricks, advanced usage
/proyectos/[slug]/feedback      — Bug reports, feature requests, support
```

### Per-Product Coverage

| Product | Status | Landing | Guide | Tips | Feedback | Stores |
|---------|--------|---------|-------|------|----------|--------|
| Solennix | live | ✅ | ✅ | ✅ | ✅ | iOS + Android |
| Pepinillo | live | ✅ | ✅ | ✅ | ✅ | iOS + Android |
| Películas | live | ✅ | ❌ | ❌ | ❌ | Android only |
| Subscription Guardian | pre_production | ✅ | ✅ | ✅ | ✅ | None (correct) |

## Design Principles

### 1. No Empty Pages
Every published page must have real content. Don't create route stubs for future content.

**Rule**: If a product doesn't have enough content for a page, don't create the page.

### 2. Dynamic Route for Subpages
All subpages use `[slug].astro` with content components, not individual page files:

```
src/pages/[lang]/proyectos/[slug].astro          — Dynamic landing
src/pages/[lang]/proyectos/[slug]/guide.astro    — Dynamic guide
src/pages/[lang]/proyectos/[slug]/tips.astro     — Dynamic tips
src/pages/[lang]/proyectos/[slug]/feedback.astro — Dynamic feedback
```

Each subpage imports a content component:
```
PepinilloGuideContent.astro   → pepinillo/guide
PepinilloTipsContent.astro    → pepinillo/tips
SGGuideContent.astro          → subscription-guardian/guide
```

### 3. Route Visibility via Schema
Product visibility is controlled by `products.ts`:
- `resources[].available: true` → page is published
- `resources[].available: false` → page is not built
- `status: 'live'` → stores section shown
- `status: 'pre_production'` → "Coming soon" CTA

### 4. Consistent Navigation
Every product page has:
- **Breadcrumb**: Home → Proyectos → [Product] → [Section]
- **Back link**: "← Volver a [Product]"
- **Next/Prev**: Links to other sections of same product
- **Footer**: Links to all products

## Proposed Route Model

### For Live Products (Solennix, Pepinillo, Películas)
```
/proyectos/[slug]/           — Landing (hero, features, stores, pricing)
/proyectos/[slug]/guide      — Getting started guide
/proyectos/[slug]/tips       — Tips and tricks
/proyectos/[slug]/feedback   — Support, bug reports, feature requests
```

### For Pre-Production (Subscription Guardian)
```
/proyectos/[slug]/           — Landing (hero, features, "Coming soon")
/proyectos/[slug]/guide      — Feature preview / roadmap
/proyectos/[slug]/tips       — Usage tips (for beta testers)
/proyectos/[slug]/feedback   — Beta feedback, feature requests
```

### Not Recommended (No Content Yet)
```
/features   — Would be empty for most products
/changelog  — No changelog data source yet
/privacy    — Handled at site level (/privacidad), not per-product
```

## Películas Gap Analysis

Películas currently has only a landing page. Recommended additions:

| Page | Content | Priority |
|------|---------|----------|
| `/proyectos/peliculas/guide` | How to use the app, features walkthrough | P1 |
| `/proyectos/peliculas/tips` | Movie discovery tips, list management | P2 |
| `/proyectos/peliculas/feedback` | Bug reports, feature requests | P1 |

## Breadcrumb Pattern

```astro
<nav aria-label="Breadcrumb">
  <ol>
    <li><a href={getLocalizedPath(lang, '/')}>Home</a></li>
    <li><a href={getLocalizedPath(lang, '/proyectos')}>Proyectos</a></li>
    <li><a href={getLocalizedPath(lang, `/proyectos/${slug}`)}>{productName}</a></li>
    <li aria-current="page">{sectionName}</li>
  </ol>
</nav>
```

## Implementation Notes

- All subpages use the same `[slug].astro` pattern with `getStaticPaths()`
- Content is loaded via dynamic imports based on slug
- `products.ts` controls which pages are generated
- No individual page files per product (DRY)
