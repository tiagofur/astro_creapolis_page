# Asset Budget — Creapolis.dev

## Current Budget (as of F052)

| Asset Type | Budget | Current | Status |
|---|---|---|---|
| **Total JS** | < 5 KB | 2.2 KB | ✅ |
| **Total CSS** | < 200 KB | 184 KB | ✅ |
| **Total Images** | < 500 KB | ~300 KB | ✅ |
| **Total Build** | < 50 MB | 38 MB | ✅ |

## Per-Page Budget

| Page Type | JS | CSS | Images |
|---|---|---|---|
| **Home** | 2.2 KB (nav) | ~20 KB | 1 SVG (~4 KB) |
| **Blog Index** | 2.2 KB | ~20 KB | 0 |
| **Blog Post** | 2.2 KB + inline | ~16 KB | 0 (content images lazy) |
| **Product** | 2.2 KB | ~16 KB | 1 SVG (~4 KB) |
| **Services** | 2.2 KB | ~20 KB | 0 |

## Image Guidelines

### Formats
- **OG images**: SVG (vector, tiny, scalable)
- **Product images**: SVG (vector, tiny)
- **Blog content**: PNG/JPG (legacy WordPress, not yet migrated)
- **Default OG**: WebP (20KB, was 236KB PNG)

### Loading Strategy
- **Above fold**: No lazy loading (hero images, first visible content)
- **Below fold**: `loading="lazy"` + `decoding="async"`
- **Blog content images**: Lazy loaded via JavaScript (markdown-rendered)

### Dimensions
- **SVGs**: No width/height needed (intrinsic sizing)
- **Raster images**: Always include width/height attributes to prevent CLS
- **Responsive**: Use `max-width: 100%; height: auto;` in CSS

## JavaScript Budget

### External Scripts
- `page.B1D-nYk3.js`: ~2.2 KB (nav, language selector, scroll behavior)

### Inline Scripts (per page)
- **Nav**: ~1.5 KB (scroll hide/show, language dropdown, mobile menu)
- **Language Banner**: ~0.5 KB (locale detection, dismiss logic)
- **Intersection Observer**: ~0.3 KB (reveal animations)
- **TOC Generator**: ~0.5 KB (blog posts only)
- **Share Buttons**: ~0.3 KB (blog posts only)

### Total per page: ~3-4 KB JS

## CSS Budget

### Strategy
- **Critical CSS**: Inlined for above-the-fold content
- **Non-critical**: Loaded via `<link rel="stylesheet">`
- **Chunked**: Separate CSS files per page type

### Current Chunks
- `index.css`: ~20 KB (home page)
- `about.css`: ~20 KB (about page)
- `blog.css`: ~16 KB (blog pages)
- `solennix.css`: ~16 KB (product pages)

## Performance Targets

| Metric | Target | Current |
|---|---|---|
| **LCP** | < 2.5s | ~1.5s (text hero) |
| **FID** | < 100ms | ~50ms |
| **CLS** | < 0.1 | ~0.05 |
| **Total Weight** | < 500 KB | ~300 KB |

## Notes

1. **No large dependencies**: Site uses zero runtime JS frameworks
2. **SVG-first**: All decorative images are SVGs (tiny, scalable)
3. **Lazy loading**: All below-fold images use `loading="lazy"`
4. **Font optimization**: Geist font preloaded with fallback metrics
5. **HTML compression**: Enabled via `compressHTML: true`
