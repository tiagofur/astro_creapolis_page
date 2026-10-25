# PRD — Creapolis V3 (B2B AI Automation & Custom Software Studio)

## 1. Product Vision & Strategic Repositioning

**Objective**: Transform `creapolis.dev` into a high-converting B2B sales and authority asset that allows Tiago to confidently send outbound campaigns to business owners, COOs, and founders—converting prospects into **AI Agent / Workflow Automation** and **Custom Software Development** clients—while providing comprehensive, compliant Product Hubs for end users and App Store / Google Play reviewers.

### Core Positioning Shift
- **Before (V1/V2 Problem)**: The Home page looked like an indie mobile developer showcase dominated by personal apps (`Pepinillo`, `Películas`, `Subscription Guardian`), a 5-card "in-development" progress ring shelf, legacy platform buckets (`Móvil`, `Web`, `Desktop`, `IA`), and duplicated sections across `/proyectos` and the footer.
- **After (V3 Solution)**:
  1. **Home & Services = B2B Conversion Engine**: Leads with quantifiable business outcomes—autonomous AI Agents for customer service and internal operations, automated appointment scheduling integrated with Calendar + CRM, and custom production software (Web, Mobile, Desktop)—backed by transparent productized sprints and a live interactive AI Agent on the page.
  2. **Own Apps on Home = Concise Production Proof**: Presented in a compact, high-density editorial format (inspired by `/zai`), proving that Creapolis ships, scales, and maintains real software in production (`Solennix` as flagship B2B vertical CRM case study, plus compact rows for `Pepinillo`, `Películas`, and `Subscription Guardian`).
  3. **Product Hub Pages (`/[lang]/proyectos/[slug]/*`) = Complete User & App Store Ecosystem**: Deep product landing pages, user guides (`/guide`), tips (`/tips`), support/feedback (`/feedback`), changelog (`/changelog`), per-app privacy/data safety (`/privacy`), and account deletion (`/eliminar-cuenta`, `/delete-account`) tailored for Apple App Store and Google Play compliance.

---

## 2. Target Audiences & Dual-Funnel Architecture

| Funnel | Target Persona | Primary Needs | Journey on `creapolis.dev` |
| :--- | :--- | :--- | :--- |
| **Funnel A: B2B Prospects (Primary Revenue)** | Founders, SMB/Mid-Market Directors, Operations & Commercial Leaders | Automate lead response & appointment scheduling, reduce manual operational load with AI agents, build custom CRMs/ERPs or mobile/web MVPs without agency bloat. | `Home` (Hero + Live AI Agent + AI Systems + Services & Pricing + Production Proof) → `Interactive AI Agent / Servicios` → `Contacto / Agendar Diagnóstico` |
| **Funnel B: App Users & Store Reviewers** | End users of `Solennix`, `Pepinillo`, `Películas`, `Subscription Guardian` & Apple/Google review teams | Understand app features, download from official stores, read tutorials/FAQs, request support, inspect data safety, or request account/data deletion. | `Direct App Link / Proyectos` → `/proyectos/[slug]` → `/guide` · `/tips` · `/feedback` · `/privacy` · `/eliminar-cuenta` |

---

## 3. Core B2B Offer & AI Automation Systems

### 3.1 Flagship AI & Automation Capabilities (Highlighted on Home & Services)
1. **Agentes de Atención a Clientes y Agendamiento Automático (WhatsApp / Web + Calendario + CRM)**
   - Instant 24/7 response (`< 30s`), lead qualification, real-time availability check on Google Calendar / Cal.com / Outlook, automatic meeting creation, reminders, and bidirectional sync with HubSpot, Pipedrive, or custom CRMs.
2. **Agentes de IA para Uso Interno y Operaciones (RAG + Tool Calling)**
   - Internal copilot and workflow agents connected securely to company documents, databases, inventory, and quoting rules to automate repetitive back-office tasks and support tickets.
3. **Automatización de Procesos End-to-End e Integración de Sistemas**
   - Connecting islands of information (ERP, billing, WhatsApp, email, spreadsheets) into reliable, audited workflows with error handling and human-in-the-loop approvals.
4. **Desarrollo de Software y Aplicaciones a Medida (Web, iOS, Android, Desktop)**
   - Full-lifecycle product engineering from architecture and UI/UX to App Store / Play Store deployment and cloud infrastructure.

### 3.2 Productized Service Tiers
1. **01 / Discovery & AI Architecture Sprint (1–2 Weeks)** — Fixed-scope audit, clickable prototype or agent blueprint, ROI calculation, and implementation roadmap.
2. **02 / AI Agent & Workflow Automation Sprint (2–4 Weeks)** — End-to-end implementation of customer/internal AI agents, calendar booking flows, and CRM integrations.
3. **03 / Custom Software & App MVP Build (6–10 Weeks)** — Production web, mobile, or internal vertical system delivered in 2-week sprints with Friday demos.
4. **04 / Codebase Rescue & Modernization (2–4 Weeks)** — Technical audit, stabilization, performance optimization, and bug elimination for stalled projects.
5. **05 / Continuous Development & AI Ops (Monthly Retainer)** — Dedicated senior engineering and AI optimization capacity without long-term lock-in.

---

## 4. UI/UX & Visual Design Specification (Astro + Best of `/zai`)

- **Brand Identity**: Geometric CMYK `CubePyramid` and 3-dot `CmyDots` signature (`#00AEEF`, `#EC008C`, `#FFC400`, `#111111`) ported from `/zai` into pure zero-JS Astro SVG components.
- **Surface & Color Discipline**:
  - High-contrast light editorial canvas (`--paper`, `--chalk`) with `1px solid rgba(0,0,0,0.06)` hairline borders.
  - Accent colors restricted to `3px` top card bars, status dots, and interactive badges—eliminating overlapping `<Ribbon>` SVG waves on content sections.
  - Single dark (`--ink`) closing CTA card per page, followed by a clean light 4-column `Footer.astro` (removing the duplicate footer CTA banner).
- **Interactive AI Agent Widget (`AgentWidget.astro`)**:
  - Accessible from the Hero, the AI Systems section, and a floating bottom-right pill.
  - Includes pre-built scenario chips (*"Agente de citas + Calendario"*, *"Agente interno / CRM"*, *"App o software a medida"*, *"Cotizar proyecto"*), interactive calendar slot selection preview, and a clean connector (`src/lib/ai-agent/connector.ts`) ready to plug into Tiago's live agent workflow.

---

## 5. App Store & Google Play Compliance Requirements

Every published or pre-production application (`Solennix`, `Pepinillo`, `Películas`, `Subscription Guardian`) must satisfy strict Apple App Store (Guidelines 5.1.1 / 5.1.2) and Google Play (Data Safety & Account Deletion) policies:

1. **Dedicated Product Hub (`/proyectos/[slug]`)**: Accurate pricing, platform availability, official store badges, architecture overview, and screenshots.
2. **User Help & Documentation (`/guide`, `/tips`, `/feedback`)**: Complete for all 4 apps (including adding `peliculas-support.ts` for `Películas`).
3. **Per-App Privacy & Data Safety (`/proyectos/[slug]/privacy` + `/privacidad` + `/privacy-policy`)**:
   - Explicit breakdown of data collected, purpose, encryption, third-party SDKs, and retention policies across ES, EN, and PT.
   - Root `/privacy-policy` and `/terms-of-use` updated to cover all Creapolis services and apps (fixing the legacy Pepinillo-only hardcoding).
4. **Self-Service Account & Data Deletion (`/eliminar-cuenta` & `/delete-account`)**:
   - Selector covering all apps (`Solennix`, `Pepinillo`, `Películas`, `Subscription Guardian`, `Otra app`).
   - Clear side-by-side matrix: **What gets deleted** vs. **What is retained for legal/tax compliance**.
   - Explicit warning on **30-day processing SLA**, **7-day grace window**, and **mandatory cancellation of active App Store / Google Play subscriptions**.
