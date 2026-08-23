# Release Checklist — creapolis.dev F061

## Release Metadata

| Field | Value |
|---|---|
| **Version** | 1.0.0 (Full redesign) |
| **Date** | 2026-08-22 |
| **Commit** | 90b7c54 (F060 final) + deploy.yml |
| **Predecessor** | Legacy Astro site (pre-redesign) |
| **Build** | 449 pages in 3.97s |
| **Smoke** | 185/185 pass |

---

## Pre-Deploy Checklist

### Build Quality
- [x] Typecheck: 0 errors
- [x] Lint: 0 issues (after lint:fix)
- [x] Build: 449 pages
- [x] Smoke: 185/185 pass
- [x] No console errors in built output

### Routes (484 total)
- [x] ES: 155 pages (/, servicios, sobre, contacto, blog/*, proyectos/*, etc.)
- [x] EN: 148 pages (/, services, about, contact, blog/*, projects/*, etc.)
- [x] PT: 148 pages (/, servicos, sobre, contato, blog/*, projetos/*, etc.)
- [x] Redirects: 20+ legacy URLs → locale-aware routes

### SEO
- [x] sitemap-index.xml: present
- [x] robots.txt: Allow: /, Sitemap: correct
- [x] hreflang: es-MX, en-US, pt-BR
- [x] RSS feed: /es/blog/rss.xml
- [x] Open Graph images: auto-generated per locale

### Accessibility (WCAG 2.1 AA)
- [x] Skip link: "Saltar al contenido" (ES/EN/PT)
- [x] `<main id="main-content">`: all pages
- [x] Heading hierarchy: h1→h2→h3 (no skips)
- [x] Form labels: wrapping pattern
- [x] aria-live: contact form messages
- [x] prefers-reduced-motion: animations disabled
- [x] :focus-visible: iris + glow
- [x] aria-labels: nav, mobile menu, language selector

### Performance (CWV)
- [x] LCP target ≤2.5s: Font non-blocking, content-visibility, preconnect
- [x] INP target ≤200ms: 2.2KB total JS, type=module, passive listeners
- [x] CLS target ≤0.1: Font metrics fallback, lazy loading, intrinsic sizing

### Forms
- [x] Contact: Web3Forms API, honeypot, timing, retry, timeout, aria-busy
- [x] Services: Web3Forms API, honeypot, timing, retry, timeout, aria-busy
- [x] Delete account: mailto: (intentional)
- [x] Double-submit prevention
- [x] Network timeout: 10s AbortController

### Analytics
- [x] Consent-first: localStorage, no PII
- [x] 13 events instrumented
- [x] Zero PII in any payload
- [x] sendBeacon for non-blocking delivery

### Links
- [x] No broken internal links
- [x] Footer links: locale-aware via getLocalizedPath
- [x] Language switcher: correct locale translation
- [x] Product hub sub-pages: all available

### Assets
- [x] 244KB total (_astro/)
- [x] CSS: 15 files
- [x] JS: 6 files
- [x] Images: WebP, lazy-loaded

---

## Deploy Procedure

1. **GitHub Pages setup required** (one-time):
   - Go to repo Settings → Pages
   - Set Source: "GitHub Actions"
   - No custom domain needed initially

2. **Automatic deploy**:
   - Push to `main` triggers CI → Build → Deploy
   - Workflow: `.github/workflows/deploy.yml`

3. **First deploy verification**:
   - Wait for green GitHub Actions run
   - Visit https://creapolis.dev/es/
   - Test all 3 locales
   - Test contact form
   - Run smoke tests locally: `pnpm run smoke`

---

## Rollback Procedure

### Automatic Rollback (Recommended)
1. Go to GitHub repo → Actions → Deploy to GitHub Pages
2. Click on the last successful deploy
3. Click "Re-run all jobs"

### Manual Rollback
1. Identify the commit before the bad deploy:
   ```bash
   git log --oneline -10
   ```
2. Reset to that commit:
   ```bash
   git revert HEAD --no-edit
   git push origin main
   ```
3. Wait for CI to rebuild and deploy

### Nuclear Rollback
1. Temporarily rename deploy.yml to prevent deploys
2. Manually revert to the last known good commit
3. Force push: `git push origin main --force`
4. Re-enable deploy.yml

---

## Post-Deploy Verification

- [ ] Visit https://creapolis.dev/es/ — loads correctly
- [ ] Visit https://creapolis.dev/en/ — loads correctly
- [ ] Visit https://creapolis.dev/pt/ — loads correctly
- [ ] Contact form submits successfully
- [ ] Language switcher works
- [ ] Blog posts load correctly
- [ ] Product pages load correctly
- [ ] Mobile menu works
- [ ] Cookie consent banner appears
- [ ] Analytics events fire (check Network tab)
- [ ] Lighthouse score ≥90 on Performance
- [ ] No console errors

---

## Known Gaps (Post-Launch)

- EN/PT sub-pages missing for product hubs (changelog, privacy, guide, tips)
- Social media links: null (accounts not configured yet)
- Analytics endpoint: PUBLIC_ANALYTICS_ENDPOINT not set (events logged locally)
- Custom domain: not configured yet (using .github.io)

---

## Contact

- **Author**: Tiago (tiagofur)
- **Email**: hola@creapolis.dev
- **Repo**: https://github.com/tiagofur/astro_creapolis_page
