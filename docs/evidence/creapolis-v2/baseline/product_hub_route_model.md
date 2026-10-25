# Product Hub & Store Compliance Route Model (Creapolis V3)

**Updated**: 2026-10-24  
**Purpose**: Standardize all product pages, user help hubs, and Apple App Store / Google Play compliance routes while keeping the Home page strictly focused on B2B conversion.

---

## 1. Role of Product Pages in Creapolis V3

1. **On the Home Page (`/[lang]/`)**:
   - Own products are presented concisely as **Production Engineering Proof**:
     - **Solennix** is highlighted as a full-stack B2B Vertical CRM & Operations case study.
     - **Pepinillo**, **Películas**, and **Subscription Guardian** appear as compact editorial rows (index, one-line architecture summary, platform pills, live status dot, and quick-view `<dialog>` / hub link).
2. **Inside `/[lang]/proyectos/[slug]/*`**:
   - Each product has a comprehensive, self-contained **Product Hub** serving both end users and App Store / Google Play compliance reviewers.

---

## 2. Standardized Route Matrix Per Product

Every product in `src/i18n/data/products.ts` (`solennix`, `pepinillo`, `peliculas`, `subscription-guardian`) exposes the following routes across `es`, `en`, and `pt`:

```text
/[lang]/proyectos/[slug]             — Product Overview, Features, Architecture Case Study, Store Badges & Compliance Summary
/[lang]/proyectos/[slug]/guide       — Step-by-step User Guide & Onboarding
/[lang]/proyectos/[slug]/tips        — Best Practices & Power-User Tips
/[lang]/proyectos/[slug]/feedback    — User Support, Bug Reporting, Feature Requests & Direct Support Email
/[lang]/proyectos/[slug]/changelog   — Version History & Release Notes
/[lang]/proyectos/[slug]/privacy     — App-Specific Data Safety, Permissions, Third-Party SDKs & Deletion Policy
```

### Complete 4-App Parity in V3
- **Solennix**: Full Hub (`overview`, `guide`, `tips`, `feedback`, `changelog`, `privacy`) + App Store & Google Play links.
- **Pepinillo**: Full Hub (`overview`, `guide`, `tips`, `feedback`, `changelog`, `privacy`) + App Store & Google Play links.
- **Películas**: Upgraded in V3 with `src/i18n/data/peliculas-support.ts` so `/guide`, `/tips`, `/feedback`, `/changelog`, and `/privacy` are 100% populated.
- **Subscription Guardian**: Full Hub (`overview`, `guide`, `tips`, `feedback`, `changelog`, `privacy`) with pre-production status and USD $4.99 one-time pricing disclosure.

---

## 3. Apple App Store & Google Play Store Compliance Architecture

To prevent store rejections under **Apple App Store Review Guidelines 5.1.1(v) (Account Deletion)** and **Google Play User Data & Data Safety Policies**, every Product Hub and Legal route enforces:

1. **Data Collection & Third-Party SDK Transparency**:
   - Each product's `/privacy` page and the global `/privacidad` + `/privacy-policy` pages explicitly document what data is stored locally on-device vs. in the cloud, encryption standards (TLS 1.3 / AES-256), and third-party processors.
2. **Self-Service Account & Data Deletion (`/eliminar-cuenta` & `/delete-account`)**:
   - Accessible directly from every Product Hub sidebar, footer, and `/privacy` page via `?app=[slug]`.
   - Displays a clear side-by-side comparison:
     - **What is permanently deleted**: Profile, credentials, cloud preferences, workspaces, and user-generated records.
     - **What is retained**: Anonymized tax/billing records required by law and aggregate crash telemetry.
   - Displays a prominent warning box detailing the **30-day deletion SLA**, **7-day grace window to cancel**, and instructions to **cancel active App Store / Google Play billing subscriptions** before deleting the account.
3. **Root Canonical Legal URLs Fixed**:
   - `/privacy-policy` and `/terms-of-use` serve the complete multi-product Creapolis policy in English (matching `/privacidad` and `/terminos` in Spanish), with dedicated product appendices for `Solennix`, `Pepinillo`, `Películas`, and `Subscription Guardian`.
