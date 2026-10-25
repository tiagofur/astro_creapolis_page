# Site Architecture — Creapolis V3 (B2B Conversion + App Store Compliance Hubs)

**Updated**: 2026-10-24  
**Status**: Master Architecture Blueprint (V3)

---

## 1. Architectural Principles

1. **Home Page = B2B Conversion Engine**: The Home page (`/[lang]/`) is designed for B2B prospects (founders, operations directors, commercial leaders) evaluating Creapolis from outbound emails, LinkedIn, or search. It leads with **B2B AI Automation Systems (Customer Support, Calendar Scheduling, CRM Sync)** and **Custom Software Engineering**, using Creapolis's own apps strictly as concise production proof.
2. **Product Hubs = Complete User & App Store Ecosystem**: Detailed consumer/user documentation, tutorials, changelogs, privacy disclosures, and store compliance live inside `/[lang]/proyectos/[slug]/*` so end users and Apple/Google reviewers find everything they need without cluttering the B2B Home page.
3. **Zero Duplication Between Routes**:
   - `/[lang]/proyectos` lists only the published products, case studies, and the R&D workshop—never re-rendering the Home page's Services, Process, or Mission blocks.
   - `Footer.astro` provides clean sitemap navigation without duplicating the page's closing CTA banner.
4. **Live AI Dogfooding**: Every commercial page integrates the pluggable `AgentWidget.astro` concierge (`src/lib/ai-agent/connector.ts`), allowing prospects to test an AI qualification & appointment-scheduling flow live on the site.

---

## 2. Sitemap (`es` / `en` / `pt` + Root Compliance Routes)

```text
/ (Locale detector → /es/, /en/, /pt/)
├── /[lang]/ (B2B Home: Hero + Live AI Simulator + AI Systems + Services + Compact App Proof + Process + Final CTA)
├── /[lang]/servicios (en: /services, pt: /servicos)
│   ├── #discovery-sprint (01 Discovery & AI Architecture Sprint)
│   ├── #ai-agents (02 AI Agents, Calendar Scheduling & CRM Automation)
│   ├── #mvp-build (03 Custom Software & App MVP Build)
│   ├── #codebase-rescue (04 Codebase Rescue & Modernization)
│   └── #continuous-development (05 Continuous Evolution & AI Ops)
├── /[lang]/proyectos (en: /projects, pt: /projetos — Clean Product & Case Study Index)
│   ├── /[lang]/proyectos/solennix (Flagship Vertical CRM & Event Ops SaaS)
│   │   ├── /guide · /tips · /feedback · /changelog · /privacy
│   ├── /[lang]/proyectos/pepinillo (Cross-Platform Focus Timer — iOS & Android)
│   │   ├── /guide · /tips · /feedback · /changelog · /privacy
│   ├── /[lang]/proyectos/peliculas (Entertainment Catalog — Android)
│   │   ├── /guide · /tips · /feedback · /changelog · /privacy
│   └── /[lang]/proyectos/subscription-guardian (iOS Privacy-First Subscription Tracker)
│       ├── /guide · /tips · /feedback · /changelog · /privacy
├── /[lang]/sobre (en: /about — Senior Principal Engineering Model, Stack & Operational Guarantees)
├── /[lang]/blog (127 Technical & Architecture Articles + Contextual B2B CTAs)
├── /[lang]/contacto (en: /contact, pt: /contato — Direct Brief + AI Concierge + Calendar Booking)
└── Legal & Store Compliance Routes (Localized + Root Canonical URLs for Play Store / App Store)
    ├── /privacidad & /[lang]/privacidad (en: /privacy-policy & /en/privacy-policy)
    ├── /terminos & /[lang]/terminos (en: /terms-of-use & /en/terms-of-use)
    └── /eliminar-cuenta & /[lang]/eliminar-cuenta (en: /delete-account & /en/delete-account)
```

---

## 3. Funnel 1: B2B Prospect Conversion Funnel (Outbound Email → Signed Sprint)

```text
Outbound Email / LinkedIn / Organic Search
  ↓
Home (/es/ or /en/)
  ├─ [3 sec] Hero communicates B2B AI Automation + Custom Software + Direct Senior Execution
  ├─ [10 sec] Interactive AI Agent & Workflow Preview demonstrates WhatsApp/Web → Calendar → CRM flow
  ├─ [30 sec] 3 Concrete B2B AI Architectures + 5 Productized Service Tiers with transparent scope
  ├─ [60 sec] Compact Production Proof (Solennix B2B CRM + 3 live store apps) proves engineering authority
  ↓
Conversion Touchpoints (Multiple Low-Friction Paths):
  ├─ Path A (Interactive): Open Creapolis AI Agent Widget → Qualify need + Preview Calendar Slot → Submit / Book
  ├─ Path B (Service Deep-Dive): Click Service Card → /[lang]/servicios#[slug] → Scoped Contact Form
  └─ Path C (Direct Contact): Click "Agendar diagnóstico" → /[lang]/contacto → API submit + Instant Calendar link
```

---

## 4. Funnel 2: Product Users & App Store / Google Play Compliance Funnel

| Product | Status | Store Links | Guide | Tips | Feedback | Changelog | Privacy | Account Deletion |
| :--- | :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Solennix** | `live` | App Store + Google Play | ✅ | ✅ | ✅ | ✅ | ✅ | `/eliminar-cuenta?app=solennix` |
| **Pepinillo** | `live` | App Store + Google Play | ✅ | ✅ | ✅ | ✅ | ✅ | `/eliminar-cuenta?app=pepinillo` |
| **Películas** | `live` | Google Play | ✅ *(Added in V3)* | ✅ *(Added in V3)* | ✅ *(Added in V3)* | ✅ | ✅ | `/eliminar-cuenta?app=peliculas` |
| **Subscription Guardian** | `pre_production` | iOS (Pre-launch) | ✅ | ✅ | ✅ | ✅ | ✅ | `/eliminar-cuenta?app=subscription-guardian` |
