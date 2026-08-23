# Core Web Vitals Budget — Creapolis.dev

## Target Metrics (Google "Good" thresholds)

| Metric | Target | Lab Estimate | Field Target (p75) |
|---|---|---|---|
| **LCP** | ≤ 2.5s | ~1.5s | ≤ 2.5s |
| **INP** | ≤ 200ms | ~50ms | ≤ 200ms |
| **CLS** | ≤ 0.1 | ~0.05 | ≤ 0.1 |

## Current State (Lab)

### LCP (Largest Contentful Paint)
- **LCP Element**: `<h1>` hero heading (text-only, no images)
- **Font Loading**: Non-blocking (`media="print" onload="this.media='all'"`)
- **Font Fallback**: `size-adjust`, `ascent-override`, `descent-override` for CLS reduction
- **Preconnect**: `fonts.googleapis.com` + `fonts.gstatic.com`
- **Estimated**: ~1.5s (text renders immediately, fonts swap in)

### INP (Interaction to Next Paint)
- **Total JS**: 2.2 KB (1 module file)
- **Inline Scripts**: ~1.5 KB (nav, language, scroll)
- **Event Listeners**: Passive scroll, click handlers
- **Long Tasks**: None (all scripts < 50ms)
- **Estimated**: ~50ms

### CLS (Cumulative Layout Shift)
- **Font Metrics Fallback**: 6 override properties per font
- **Image Dimensions**: SVGs (intrinsic sizing), raster images lazy loaded
- **Dynamic Content**: Reveal animations use transforms (no layout shift)
- **content-visibility: auto**: Applied to below-fold sections
- **Estimated**: ~0.05

## Optimizations Applied

### 1. Font Loading (LCP)
- Removed redundant `rel="preload"` (was duplicate of stylesheet)
- Changed to `media="print" onload="this.media='all'"` (non-blocking)
- Added `<noscript>` fallback for no-JS users
- **Impact**: Fonts no longer block initial render

### 2. Content Visibility (LCP/Rendering)
- Added `content-visibility: auto` to below-fold sections
- Sections: stamps, mission, notes, contact-cta
- **Impact**: Browser skips rendering off-screen content until needed

### 3. Font Metrics Fallback (CLS)
- `size-adjust: 105%` (Geist) / `108%` (Geist Mono)
- `ascent-override: 90%` / `88%`
- `descent-override: 22%` / `22%`
- `line-gap-override: 0%` / `0%`
- **Impact**: Fallback fonts match web font metrics, reducing CLS

### 4. Image Optimization (CLS)
- All images: `loading="lazy"` + `decoding="async"`
- SVGs: Intrinsic sizing (no dimensions needed)
- Blog images: `display: block; max-width: 100%; height: auto;`
- **Impact**: No layout shift from images

### 5. Script Loading (INP)
- All scripts: `type="module"` (non-blocking, deferred)
- No render-blocking JavaScript
- **Impact**: Main thread free for user interactions

## Measurement Plan

### Lab Testing (Local)
```bash
# Build and serve locally
cd creapolis && pnpm run build && pnpm run preview

# Run Lighthouse
npx lighthouse http://localhost:4321/es/ --output=json --output-path=./lighthouse-report.json
```

### Field Testing (Production)
- **Chrome UX Report (CrUX)**: Automatic via Chrome browser
- **PageSpeed Insights**: https://pagespeed.web.dev/analysis/https-creapolis-dev/
- **Search Console**: Core Web Vitals report

### Key Pages to Test
1. `/es/` (Homepage) — Most traffic
2. `/es/blog/` (Blog index) — Content-heavy
3. `/es/blog/[slug]` (Blog post) — Article layout
4. `/es/proyectos/solennix/` (Product) — Showcase
5. `/es/servicios/` (Services) — Conversion

### Monitoring Schedule
- **Weekly**: Check CrUX data in Search Console
- **Monthly**: Run Lighthouse on key pages
- **Per Deploy**: Verify no regressions in build size

## Accessibility Note

**No CWV optimization should sacrifice accessibility:**
- `content-visibility: auto` is safe (content still accessible to screen readers)
- Font loading fallback maintains readability
- Lazy loading doesn't hide content from assistive tech
- All interactive elements remain keyboard accessible

## Regression Prevention

### Build Budget Alerts
| Metric | Budget | Alert Threshold |
|---|---|---|
| Total JS | < 5 KB | > 4 KB |
| Total CSS | < 200 KB | > 180 KB |
| Total Images | < 500 KB | > 400 KB |
| HTML Size | < 100 KB avg | > 80 KB avg |

### CI Checks
- `pnpm run build` must succeed
- `pnpm run typecheck` must pass (0 errors)
- `pnpm run lint` must pass (0 issues)
