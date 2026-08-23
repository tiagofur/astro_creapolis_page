# Asset Pipeline — Creapolis

## Directory Structure

```
public/
├── og/                    # Open Graph images (1200×630)
│   ├── home.svg           # Home page
│   ├── servicios.svg      # Services page
│   ├── solennix.svg       # Product: Solennix
│   ├── pepinillo.svg      # Product: Pepinillo
│   ├── peliculas.svg      # Product: Películas
│   └── subscription-guardian.svg  # Product: SG
├── og-default.png         # Fallback OG (1200×630 PNG)
├── favicon.svg            # Site favicon
└── robots.txt             # Search engine directives
```

## OG Images

### Format
- **SVG** for product/service OG images (vector, small, crisp at any size)
- **PNG** for fallback `og-default.png` (compatibility)

### Size
- All OG images: **1200×630px** (standard for Twitter/Facebook/LinkedIn)

### Naming Convention
```
og/{slug}.svg
```
Where `{slug}` matches the product slug from `products.ts`.

### How to Assign
In the product page (`[slug].astro`), pass `ogImage` to Layout:
```astro
const ogImage = `/og/${slug}.svg`;
<Layout ogImage={ogImage}>...</Layout>
```

### Adding a New Product
1. Create `public/og/{new-slug}.svg` using the template (see existing files)
2. The product detail page already derives `ogImage` from slug — no code change needed
3. Verify with `pnpm run build` and check the generated `<meta>` tags

## Product Screenshots (Future)

When real screenshots are available:

```
public/products/
├── solennix/
│   ├── ios-6.7.png        # iPhone Pro Max
│   ├── ios-6.1.png        # iPhone standard
│   ├── android.png         # Android phone
│   ├── web.png             # Web dashboard
│   └── desktop.png         # Desktop app
├── pepinillo/
│   ├── ios-6.7.png
│   ├── android.png
│   ├── macos.png
│   └── web.png
├── peliculas/
│   └── android.png
└── subscription-guardian/
    └── ios-6.7.png
```

### Naming Convention
```
{platform}-{variant}.{ext}
```

| Platform | Variants | Format |
|----------|----------|--------|
| iOS | `6.7` (Pro Max), `6.1` (standard), `5.5` (SE) | PNG/WebP |
| Android | (default) | PNG/WebP |
| Web | (default) | PNG/WebP |
| Desktop | (default) | PNG/WebP |
| macOS | (default) | PNG |

### Responsive Sizes
| Size | Width | Use |
|------|-------|-----|
| `@2x` | 1200px | Retina / high-DPI |
| `@1x` | 600px | Standard |
| `thumb` | 400px | Cards / previews |

### Alt Text Pattern
```
{Product name} — {Screen description} on {Platform}
```
Examples:
- "Solennix — Dashboard showing event revenue on iPhone"
- "Pepinillo — Pomodoro timer with task list on Android"
- "Películas — Movie catalog grid on Android"

## SVG OG Image Template

Each product OG image follows this structure:
1. **Background** — dark gradient matching product accent
2. **Glow** — subtle radial gradient in accent color
3. **Ribbon** — decorative SVG path (brand motif)
4. **Product name** — large, white, system font
5. **Category** — accent-colored subtitle
6. **Tagline** — muted description
7. **Brand** — "CREAPOLIS.DEV" footer
8. **Device hint** — abstract outline suggesting a screen

### Color Map
| Product | Accent | Dark BG |
|---------|--------|---------|
| Solennix | `#7c5cff` (iris) | `#1a1625` |
| Pepinillo | `#6abf4a` (lime) | `#141a12` |
| Películas | `#e8705a` (coral) | `#1a1410` |
| SG | `#5a9ed6` (sky) | `#10161a` |
| Services | gradient iris→coral | `#1a1625` |
| Home | multi ribbon | `#1a1625` |
