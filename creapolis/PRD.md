# PRD — Creapolis Website

## Product Requirements Document

---

## 1. Vision

**Objective**: Create a professional, corporate website that:
- Convinces users to use our apps or request quotes for custom app development
- Showcases AI implementation consulting services for enterprises
- Provides a blog for content marketing and thought leadership
- Projects credibility and trust (like Apple/Google style)

**Tone**: Professional, minimal, serious, trustworthy. Not a landing page — a real corporate website.

---

## 2. Target Audience

| Segment | Needs |
|---------|-------|
| Startups | MVPs, mobile apps, web platforms |
| SMEs | Process automation, internal tools, AI integration |
| Enterprises | Consulting, custom software, digital transformation |
| Individual users | Our published apps (Pepinillo, Peliculas, Solennix) |

---

## 3. Services Offered

### Core Services

1. **Aplicaciones Móviles** — iOS & Android (native or cross-platform)
2. **Aplicaciones Web** — SPAs, portals, e-commerce, dashboards
3. **Software de Escritorio** — macOS, Windows, Linux
4. **Desarrollo Multiplataforma** — One code, all platforms

### New Service

5. **Consultorías de IA** — Implementation of AI in business processes to:
   - Minimize errors
   - Improve productivity
   - Do more with the same team

---

## 4. Pages Structure

| Page | Purpose |
|------|---------|
| `/` | Home — Hero, apps showcase, services, process, about, contact |
| `/blog` | Blog listing |
| `/blog/[slug]` | Individual blog post |
| `/proyectos` | Portfolio of our apps |
| `/proyectos/[slug]` | Individual project detail |
| `/privacidad` | Privacy policy |
| `/terminos` | Terms and conditions |

---

## 5. Design System

### Colors

```
--color-bg: #FFFFFF
--color-bg-alt: #F5F5F7
--color-text: #1D1D1F
--color-text-secondary: #6E6E73
--color-accent: #0071E3
--color-border: #E8E8ED
```

### Typography

- **Font**: System fonts (`-apple-system`, `SF Pro`, `system-ui`)
- **Headings**: 700-800 weight, tight letter-spacing
- **Body**: 400 weight, 1.6 line-height

### Layout

- Max width: 1120px
- Generous whitespace
- Alternating section backgrounds

---

## 6. Blog System

### Technology

- Astro Content Collections
- Markdown for content
- Type-safe with Zod schemas

### Schema

```ts
{
  title: string,
  description: string,
  pubDate: date,
  author: string,
  tags: string[],
  draft: boolean
}
```

### Content Strategy

- Articles on development best practices
- Tech stack comparisons
- Case studies from our projects
- AI implementation insights

---

## 7. Roadmap

### Phase 1 — MVP (COMPLETED)
- [x] Setup Astro project
- [x] Design system (CSS variables)
- [x] Home page with all sections
- [x] Blog system with content collections
- [x] Projects pages
- [x] Legal pages (privacy, terms)

### Phase 2 — Content (IN PROGRESS)
- [ ] Write 5-10 blog posts
- [ ] Add OG images for social sharing
- [ ] RSS feed

### Phase 3 — SEO & Performance
- [ ] Sitemap
- [ ] Meta tags optimization
- [ ] Performance audit

### Phase 4 — Enhancements
- [ ] Animation improvements
- [ ] More project details
- [ ] Contact form (optional)

---

## 8. Success Metrics

- Pages load under 2 seconds
- Lighthouse score > 90
- Mobile-friendly (responsive)
- All links working
- Blog posts indexed by search engines

---

## 9. Future Enhancements

- Add a contact form with backend
- Add analytics (optional)
- Multi-language support (English/Spanish)
- Dark mode toggle
- More project case studies
- Testimonials section

---

## 10. Competitors / Inspiration

- Apple.com — Minimal, product-focused
- Google.dev — Clean, developer-centric
- Linear — Premium, understated
- Vercel — Modern, fast

---

*Document version: 1.0*  
*Last updated: {new Date().getFullYear()}*