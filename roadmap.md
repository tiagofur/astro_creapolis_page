# Creapolis V3 — Master Execution Roadmap (B2B AI Automation & Custom Software Studio)

This roadmap defines the execution blueprint for **Creapolis V3**, transforming `creapolis.dev` from an overloaded consumer-app portfolio into a **high-converting B2B AI Automation & Custom Software Studio** built with Astro 5 (`creapolis/`), while preserving full App Store and Google Play compliance for Creapolis's published products inside their dedicated Product Hubs.

---

## 1. Executive Diagnosis: Why V2 (`creapolis/`) Fails to Convert Cold B2B Prospects

An audit of `creapolis/src/pages/[lang]/index.astro`, `ProjectsListContent.astro`, `ServicesContent.astro`, `Footer.astro`, and comparison against the prototype in `zai/src/` revealed **7 critical conversion blockers**:

1. **Consumer App Overload on the Home Page**: Over 60% of the Home page vertical scroll is consumed by personal indie mobile apps (`Pepinillo`, `Películas`, `Subscription Guardian`) and an unfinished 5-card "Taller abierto" shelf with arbitrary percentage rings (`85%`, `60%`, `40%`, `15%`). Even the Hero right-hand visual is a static Open Graph banner for `Solennix` (`/og/solennix.svg`). A B2B decision-maker receiving a cold outbound email perceives an indie hobbyist rather than a B2B engineering & AI partner.
2. **Broken & Outdated Services Section on Home**: While `creapolis/src/i18n/data/services.ts` defines 5 outcome-based services (`Discovery Sprint`, `MVP Build`, `Codebase Rescue`, `AI Audit`, `Continuous Development`), the Home page (`[lang]/index.astro` + `data/home.ts`) still renders 4 generic legacy platform buckets (`01 / Móvil`, `02 / Web`, `03 / Desktop`, `04 / IA`) linking to non-existent anchors (`#mobile`, `#web`, `#desktop`, `#ai`).
3. **Under-Positioned AI & Automation Capabilities**: AI Agents, WhatsApp/Web customer service automation, automated appointment scheduling with Calendar sync, and CRM workflows are buried as vague consulting bullets instead of being showcased as concrete, visual, high-ROI B2B systems.
4. **Zero Live AI Proof ("Eat Your Own Dogfood")**: A prospect visiting an AI & software studio expects to experience an intelligent system firsthand. Currently, there is no interactive AI Agent widget on the site—only static forms whose client-side fallback still contains a placeholder `'YOUR_WEB3FORMS_ACCESS_KEY'`.
5. **Severe Visual & Structural Clutter**:
   - The Home page stacks **9 heavy blocks**, including **two consecutive full-width Contact CTA banners** at the bottom (one at the end of `index.astro` and a second identical CTA embedded inside `Footer.astro`).
   - Three thick multi-hue `<Ribbon>` SVG bezier curves and simultaneous 5-color OKLCH accents (`--iris`, `--coral`, `--lime`, `--sky`, `--amber`) create visual noise that contradicts the "Quiet Confidence" design system.
   - `/proyectos` (`ProjectsListContent.astro`) duplicates the entire Home page (re-rendering Services, Process, Mission, Stats, and Contact CTA).
6. **Defensive "1-Person" Copywriting**: Repeating *"1 persona"*, *"Sin equipo"*, *"Cero agencias"* 8+ times on the Home page triggers B2B buyer anxiety around capacity and continuity. The narrative must shift from *"I am alone"* to **"Direct Senior Principal Engineering + Autonomous AI Systems — zero agency bureaucracy"**.
7. **Legal & App Store Compliance Gaps**:
   - Root `/privacy-policy` and `/terms-of-use` are hardcoded exclusively for `Pepinillo` rather than general Creapolis + multi-app coverage.
   - `eliminar-cuenta.astro` is missing `Subscription Guardian` in the app selector and lacks the clear side-by-side deletion matrix and active-subscription warning implemented in `zai/src/components/creapolis/views/legal.tsx`.
   - `CookieConsent.astro` is hardcoded in English across all locales.

---

## 2. Competitive Market Intelligence (2026 B2B AI Automation & Custom Software Studios)

### 2.1 How Top Agencies Position AI Agents + Custom Software
High-converting B2B studios in 2026 do not sell "hours of code" or generic "AI chatbots." They sell **Autonomous Operational Systems** with measurable payback periods:

| Core B2B Pillar | Business Problem Solved | System Architecture Showcased | Target Buyer ROI |
| :--- | :--- | :--- | :--- |
| **1. Autonomous Lead Qualification & Calendar Scheduling Agent** | Companies lose 40–60% of leads due to slow responses (4–24h) and manual WhatsApp/email back-and-forth to book meetings. | **Inbound (WhatsApp / IG / Web)** → **AI Agent (<30s response)** → **Qualifies budget & need** → **Checks real-time Google Calendar / Cal.com / Outlook** → **Books meeting + syncs deal to HubSpot / Pipedrive / Custom CRM**. | Speed-to-lead `< 1 min`; `80%+` of qualified appointments scheduled with zero human intervention. |
| **2. Internal Operations & Customer Support AI Agents (RAG + Tool Calling)** | Support and ops teams spend 100+ hrs/month answering repetitive status, policy, inventory, or quoting questions. | **Multi-channel AI Agent** connected to internal documentation (RAG), SQL databases, ERP/inventory APIs, and quoting engines, with human-in-the-loop escalation (`confidence < 90%`) to Slack/WhatsApp. | `70%–80%` autonomous resolution of Tier-1 operational and customer requests 24/7. |
| **3. Custom Operational Software, CRMs & Cross-Platform Apps** | Growing businesses run critical workflows on fragmented spreadsheets, manual copy-pasting, or rigid SaaS tools that don't fit their operation. | **End-to-end Web, Mobile (iOS/Android), and Desktop systems** with clean architecture, offline-first sync, automated billing, and native AI integration (proven by **Solennix**). | Full IP ownership (`100% client code`), zero per-seat SaaS tax, built in 2-week sprints. |

### 2.2 Competitive Pricing & Productized Packaging Strategy
To convert cold email prospects and remove fear of open-ended billing, Creapolis will present a **3-Stage Productized Offer Architecture** (with transparent reference tiers in USD / MXN):

1. **Stage 1 — Entry / Low-Risk Diagnostic: `Discovery & AI Architecture Sprint` (1–2 Weeks)**
   - **Deliverables**: Audit of current workflows/bottlenecks, clickable UI prototype or AI agent conversation & tool-calling blueprint, ROI projection, and fixed-price implementation quote.
   - **Market Reference**: **$1,200 – $2,500 USD** *(100% credited toward implementation if the client proceeds within 30 days).*
2. **Stage 2 — Fixed-Scope Build: `AI Agent & Workflow System` (2–4 Weeks) / `Custom Software & App MVP` (6–10 Weeks)**
   - **AI Agent & Automation System** (WhatsApp/Web Agent + Calendar Booking + CRM Integration + Testing): **$2,500 – $6,000 USD** fixed scope.
   - **Custom Web / Mobile / Internal System MVP** (Full-stack production build, CI/CD, client repo from Day 1, 30-day warranty): **$6,500 – $18,000+ USD** by milestone.
   - **Codebase Rescue & Modernization** (Audit + critical fixes + stabilization): **$2,000 – $5,000 USD**.
3. **Stage 3 — Recurring Partnership: `Continuous AI Ops & Product Retainer` (Monthly)**
   - **Deliverables**: Model/prompt optimization, API & integration maintenance, cloud monitoring, and new workflow/feature iterations every month.
   - **Market Reference**: **$750 – $2,500 USD / month** (no forced annual lock-in).

---

## 3. What We Will Borrow from `/zai` into Astro (`/creapolis`)

We keep **Astro 5 SSG + vanilla CSS/TS** (preserving our `< 5 KB` JS budget, multi-page SEO, `hreflang`, and fast LCP) while porting the best design and UX patterns from `zai/src/`:

1. **Geometric CMYK Brand Signature (`CubePyramid` & `CmyDots`)**: Port `zai/src/components/creapolis/logo.tsx` as pure zero-dependency `.astro` SVG components with subtle CSS animations, replacing noisy `<Ribbon>` bezier curves.
2. **High-Discipline Surface & Accent System**: Crisp light surfaces (`--paper`, `--chalk`), `1px` hairline borders (`rgba(0,0,0,0.06)`), high-contrast typography with muted secondary clauses, and `3px` top card accent bars (`h-[3px]`) instead of full-bleed rainbow gradients.
3. **Compact Editorial Proof List for Own Apps on Home**: Port `zai`'s scannable editorial table (`01 Solennix`, `02 Pepinillo`, `03 Películas`, `04 Subscription Guardian`) with a native `<dialog>` quick-view drawer and direct links to `/[lang]/proyectos/[slug]`. On Home, these apps act strictly as **engineering proof ("Lo que construimos y operamos en producción")**, not the main commercial pitch.
4. **6-Cell Promise Strip**: Replace the scrolling marquee ticker with `zai`'s calm 6-cell architectural promise grid (`Trato directo senior`, `Código 100% tuyo`, `Demos cada viernes`, `Garantía 30 días`, `IA con retorno medible`, `Privacidad desde el diseño`).
5. **2-Column Outcome Service Cards**: Port `zai/src/components/creapolis/views/services.tsx` (`lg:grid-cols-[5fr_6fr]`) showing *Para quién / Qué obtienes* on the left and a 2×2 grid of *Entregables + Stack + Caso real* on the right.
6. **Clean `/proyectos` Index & Data-Driven Legal/Store Compliance**: Remove duplicated Home sections from `/proyectos`, and port `zai`'s side-by-side `DeleteAccountView` (`¿Qué se elimina?` vs `¿Qué NO se elimina?` + active subscription warning) into Astro.

---

## 4. Target Information Architecture & Page-by-Page Redesign

### 4.1 Home Page (`creapolis/src/pages/[lang]/index.astro`) — Streamlined from 9 Cluttered Blocks to 6 High-Converting B2B Sections
1. **Section 1: B2B Hero + Interactive AI Agent Preview**
   - **Left Column**: Eyebrow (`Ingeniería de Software & Agentes de IA para Empresas`), Outcome Headline (*"Automatiza tu operación con agentes de IA y software a medida — en semanas, no meses"*), clear mechanism copy (WhatsApp, Calendar, CRM, Web & Mobile Apps), primary CTA (`Probar agente / Agendar diagnóstico`), secondary CTA (`Ver sistemas y precios`), and the **6-Cell Promise Strip**.
   - **Right Column**: Interactive **AI Workflow & Agent Simulator Card** (showing live message flow → qualification → Google Calendar slot selection → CRM sync, with 1-click toggle to open the live Creapolis AI Agent).
2. **Section 2: Flagship Section — B2B AI Agents & Workflow Automation (`#agentes-ia`)**
   - Visual architecture cards for the **3 high-demand B2B systems**:
     1. *Agente de Atención, Calificación y Agendamiento Automático (WhatsApp / Web + Calendario + CRM)*.
     2. *Agente Interno de Operaciones, Soporte y Cotizaciones (RAG + ERP/DB)*.
     3. *Automatización de Procesos y Flujos End-to-End (n8n / APIs propias / Webhooks)*.
   - Includes a visual pipeline diagram (`Lead entra → Agente responde en 15s → Califica → Revisa Calendario → Agenda cita → Registra en CRM`) and ROI metrics.
3. **Section 3: Productized Services & Transparent Investment Tiers (`#servicios`)**
   - Synchronized with `data/services.ts` (fixing the broken `#mobile`/`#web` links):
     - `01 / Discovery & AI Sprint` (1–2 weeks)
     - `02 / Implementación de Agentes de IA y Automatización` (2–4 weeks)
     - `03 / Desarrollo de Software y Apps a Medida (MVP Build)` (6–10 weeks)
     - `04 / Rescate y Modernización de Código` (2–4 weeks)
     - `05 / Desarrollo y Evolución Continua` (Mensual)
4. **Section 4: Production Engineering Proof — Own Products (`#evidencia`)**
   - Framed explicitly for B2B prospects: *"No solo aconsejo: diseño, publico y opero software propio en App Store, Google Play y la nube."*
   - **Featured B2B Case Study Card**: **Solennix** framed as a real-world multi-platform vertical CRM & operations platform.
   - **Compact Editorial Rows** (ported from `zai`): `Pepinillo`, `Películas`, and `Subscription Guardian` in a clean 3-row table with quick-view `<dialog>` and links to their full Product Hubs (removing the 5-card "Taller abierto" progress-ring shelf from Home).
5. **Section 5: How We Work (`#proceso`) + Senior Engineering Authority (`#sobre`)**
   - Unified 4-step hairline grid (`01 Diagnóstico`, `02 Arquitectura y Prototipo`, `03 Sprints con Demo Semanal`, `04 Despliegue, Handover y Garantía`) + concise Senior Principal credential block.
6. **Section 6: Single High-Conversion Closing CTA + Clean White Footer**
   - One dark `FinalCta` card (with direct AI Agent trigger + Contact/Calendar CTA), followed by a clean 4-column light `Footer.astro` (eliminating the duplicate stacked CTA).

### 4.2 Dedicated Product Hubs & App Store / Google Play Compliance (`/[lang]/proyectos/[slug]/*`)
While the Home page becomes a focused B2B conversion engine, the **Product Pages (`/proyectos/[slug]`) and Sub-Routes (`/guide`, `/tips`, `/feedback`, `/changelog`, `/privacy`)** become even stronger for **end users and App Store / Google Play reviewers**:
- Every app (`Solennix`, `Pepinillo`, `Películas`, `Subscription Guardian`) gets a complete, self-contained **App Store & Google Play Compliance Block** on its hub and `/privacy` route:
  - **Data Safety & Collection Summary** (exact data collected, encryption in transit/at rest, third-party processors like RevenueCat/Firebase/TMDB/Supabase).
  - **Permissions Justification** (camera, notifications, local storage, network).
  - **Account & Data Deletion Direct Link** (`/eliminar-cuenta?app=[slug]` / `/delete-account?app=[slug]`) pre-selecting the app, with clear 30-day SLA, 7-day cancellation grace period, and instructions for canceling App Store / Play Store subscriptions.
  - **User Support & Help Center**: Add missing `/guide`, `/tips`, and `/feedback` support data for **Películas** (`creapolis/src/i18n/data/peliculas-support.ts`) so all 4 apps have 100% hub parity.
- Fix root `/privacy-policy` and `/terms-of-use` so they render the comprehensive multi-app Creapolis legal documents instead of the legacy Pepinillo-only text.

---

## 5. Embedded AI Agent Widget & Pluggable Connector Architecture

We will build an Astro-native, ultra-fast **Creapolis AI Concierge & Booking Agent** (`creapolis/src/components/ai/AgentWidget.astro` + `creapolis/src/lib/ai-agent/connector.ts`) that appears both as an **interactive trigger in the Hero/AI sections** and as a **floating bottom-right launcher pill** across commercial pages.

### 5.1 Pluggable Connector Pattern (Ready for Your External Agent Workflow)
All UI states, message streaming/typing indicators, quick-reply chips, lead qualification state, and calendar slot cards are 100% implemented in the frontend. The network layer is isolated in a single clean adapter (`creapolis/src/lib/ai-agent/connector.ts`):

```ts
export interface AgentMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  actionCard?: {
    type: 'calendar_slots' | 'lead_captured' | 'handoff';
    slots?: Array<{ iso: string; label: string }>;
    bookingUrl?: string;
  };
}

export interface AgentSessionPayload {
  sessionId: string;
  locale: 'es' | 'en' | 'pt';
  pageUrl: string;
  messages: AgentMessage[];
  leadContext?: {
    name?: string;
    email?: string;
    company?: string;
    intent?: 'ai_agent' | 'appointment_flow' | 'custom_software' | 'rescue';
  };
}

export interface AgentConnectorConfig {
  mode: 'webhook' | 'local_demo_fallback';
  endpointUrl: string; // e.g. import.meta.env.PUBLIC_AI_AGENT_WEBHOOK_URL || '/api/agent/chat'
  calendarBookingUrl: string;
}
```

- **How It Works Out-of-the-Box & When Connected**:
  - When `PUBLIC_AI_AGENT_WEBHOOK_URL` is configured, every message and slot selection sends a structured JSON payload (`AgentSessionPayload`) to your agent orchestration workflow (n8n, LangGraph, FastAPI, or Go proxy) and renders the agent's text + calendar/action cards.
  - Until you plug in the final live webhook URL at the end, the connector includes a **Smart Interactive Fallback Mode** that guides visitors through qualifying their need (*Agente de IA / Flujo de Citas / Software a medida*), demonstrates an interactive appointment booking preview, and forwards captured leads directly to `/api/contact`.

---

## 6. Phased Execution Plan (Phases V3-1 through V3-6)

| Phase | Scope | Target Files | Exit Gate |
| :--- | :--- | :--- | :--- |
| **Phase V3-1: Design System & Brand Polish (`zai` → Astro)** | Port `CubePyramid`, `CmyDots`, hairline surface utilities, `3px` accent bars, and localize `CookieConsent.astro`. Remove redundant `<Ribbon>` clutter and duplicate `Footer.astro` CTA. | `src/components/brand/*`, `src/components/Nav.astro`, `src/components/Footer.astro`, `src/components/CookieConsent.astro`, `src/styles/global.css` | Clean visual hierarchy, single closing CTA per page, localized cookie banner (`es`/`en`/`pt`). |
| **Phase V3-2: B2B Copy, AI Systems & Pricing Data Layer** | Upgrade `data/home.ts`, `data/services.ts`, and `ui.ts` (`es`/`en`/`pt`) with B2B outcome headlines, the 3 AI Agent & Automation architectures, reference pricing tiers, and synchronized service anchors. | `src/i18n/data/home.ts`, `src/i18n/data/services.ts`, `src/i18n/ui.ts` | Zero broken service anchors; full ES/EN/PT parity for AI Agent offerings and productized pricing. |
| **Phase V3-3: Home, Services & Projects Page Redesign** | Rebuild `[lang]/index.astro` into the 6-section B2B funnel (Hero + AI Systems + Outcome Services + Compact App Proof Rows + Process + Single CTA). Upgrade `ServicesContent.astro` (2-column deliverables layout) and de-duplicate `ProjectsListContent.astro`. | `src/pages/[lang]/index.astro`, `src/components/pages/ServicesContent.astro`, `src/components/pages/ProjectsListContent.astro` | Home page converts B2B prospects in <10 seconds; consumer apps are compact proof rows; `/proyectos` has zero duplicated Home sections. |
| **Phase V3-4: Product Hubs & App Store / Play Store Compliance** | Add `peliculas-support.ts` + routes so all 4 apps have complete Guide/Tips/Feedback/Privacy hubs. Upgrade `eliminar-cuenta.astro`, `delete-account.astro`, `privacidad.astro`, `privacy-policy.astro`, and `terms-of-use.astro` with full multi-app compliance and `zai`'s deletion matrix. | `src/i18n/data/peliculas-support.ts`, `src/i18n/data/privacy.ts`, `src/pages/eliminar-cuenta.astro`, `src/pages/delete-account.astro`, `src/pages/privacy-policy.astro`, `src/pages/terms-of-use.astro` | 100% Apple App Store & Google Play compliance for all 4 apps; `?app=` pre-selection works on account deletion pages. |
| **Phase V3-5: Embedded AI Agent Widget & Connector** | Build `AgentWidget.astro` + `src/lib/ai-agent/connector.ts` with quick-intent chips, interactive calendar slot preview, lead capture fallback, and pluggable webhook adapter. | `src/components/ai/AgentWidget.astro`, `src/lib/ai-agent/connector.ts`, `src/layouts/Layout.astro` | Widget opens from Hero, AI section, and floating pill; keyboard accessible; ready for 1-line webhook URL connection. |
| **Phase V3-6: Verification, CWV Budget & Build Sign-Off** | Run full Astro build (`npm run build`), verify all 470+ static routes, check mobile/desktop responsiveness, and validate JS/CSS asset budgets. | `creapolis/docs/final-review-report.md` | `0` build errors, `0` broken links/anchors, JS budget respected, all acceptance criteria verified. |
