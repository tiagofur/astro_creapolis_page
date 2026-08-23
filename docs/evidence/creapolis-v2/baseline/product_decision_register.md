# Creapolis V2 — Product Decision Register (F003)

**Fecha**: 2026-08-20
**Fase**: 0 — Baseline y decisiones
**Responsable**: Tiago David Furtado (Creapolis)

---

## 1. Resumen de estados verificados

| Producto | Estado real | Estado en sitio | Store URLs verificadas | Issue |
|---|---|---|---|---|
| **Pepinillo** | ✅ LIVE en AMBAS tiendas | "Android" (desactualizado) | Google Play ✅, App Store ✅ | La data dice solo Android |
| **Películas** | ✅ LIVE en Google Play | "Android" ✅ | Google Play ✅ | — |
| **Solennix** | ⚠️ Sin stores públicos | "live" en home | ❌ Ninguna URL verificada | **CRÍTICO: Dice live pero no está en stores** |
| **Subscription Guardian** | ✅ Pre-production | "pre_production" (corregido en D1) | ❌ Sin URL | Correcto |

---

## 2. Decisiones confirmadas

### 2.1 Pepinillo

| Decisión | Valor | Fuente | Fecha |
|---|---|---|---|
| Estado | **Live** en Google Play Y App Store | Verificación manual de ambas tiendas | 2026-08-20 |
| Nombre Google Play | "Pikle - Pomodoro & Tasks" | play.google.com/store/apps/details?id=dev.creapolis.pepinillo | 2026-08-20 |
| Nombre App Store | "Pepinillo — Timer de Enfoque" | apps.apple.com/mx/app/pepinillo-timer-de-enfoque/id6760687424 | 2026-08-20 |
| Pricing | **Gratis** con compras in-app (Premium) | Ambas stores | 2026-08-20 |
| Plataformas | **Android + iOS** (iPhone, iPad, Mac, Apple Watch, Wear OS) | App Store listing + Google Play listing | 2026-08-20 |
| Google Play URL | `https://play.google.com/store/apps/details?id=dev.creapolis.pepinillo` | Verificado ✅ | 2026-08-20 |
| App Store URL | `https://apps.apple.com/mx/app/pepinillo-timer-de-enfoque/id6760687424` | Verificado ✅ | 2026-08-20 |
| Developer | Tiago David Furtado | Ambas stores | 2026-08-20 |
| Features iOS confirmadas | Live Activities, Dynamic Island, iCloud Sync, Apple Watch, Siri Shortcuts, Control Center, Apple Health | App Store listing | 2026-08-20 |
| Features Android confirmadas | Wear OS, Pomodoro, Flow, Blocks, Chronometer | Google Play listing | 2026-08-20 |

**⚠️ ACCIÓN REQUERIDA**: Actualizar projects.ts y home.ts para reflejar que Pepinillo está en AMBAS plataformas, no solo Android.

### 2.2 Películas

| Decisión | Valor | Fuente | Fecha |
|---|---|---|---|
| Estado | **Live** en Google Play | play.google.com/store/apps/details?id=mx.creapolis.peliculas | 2026-08-20 |
| Nombre | "Peliculas" | Google Play listing | 2026-08-20 |
| Pricing | **Gratis** (sin compras in-app mencionadas) | Google Play listing | 2026-08-20 |
| Plataformas | **Android** (solo Google Play verificado) | Verificado ✅ | 2026-08-20 |
| Google Play URL | `https://play.google.com/store/apps/details?id=mx.creapolis.peliculas` | Verificado ✅ | 2026-08-20 |
| Developer | Creapolis MX | Google Play listing | 2026-08-20 |

### 2.3 Solennix

| Decisión | Valor | Fuente | Fecha |
|---|---|---|---|
| Estado | ⚠️ **No verificado en stores** | Búsqueda web sin resultados | 2026-08-20 |
| Nombre del plan Pro | **Pro** | Decisión D4 (feature_list) | 2026-08-20 |
| Precio plan Pro | **$149 MXN/mes** | Decisión D3 (confirma Tiago) | 2026-08-20 |
| Plan Enterprise/Business | **Business** | Decisión D4 (confirma Tiago) | 2026-08-20 |
| Plan Free | Gratis (funciones esenciales, hasta 3 eventos) | solennix.ts | 2026-08-20 |
| Plataformas declaradas | iOS, Android, Web (solennix.com) | solennix-support FAQ | 2026-08-20 |
| Store URLs | **NINGUNA PROPORCIONADA** | — | — |

**⚠️ DECISIÓN PENDIENTE**: ¿Solennix está realmente en producción? Si no, el status "live" en home.ts es incorrecto. Necesitamos confirmación.

### 2.4 Subscription Guardian

| Decisión | Valor | Fuente | Fecha |
|---|---|---|---|
| Estado | **Pre-production** | Decisión D1 (confirma Tiago) | 2026-08-20 |
| Pricing | **USD $4.99** | feature_list.json product_facts | 2026-08-20 |
| Tipo de compra | **Compra única** (one-time) | feature_list.json + FAQ | 2026-08-20 |
| Plataformas | **iOS** (solo) | projects.ts | 2026-08-20 |
| Store URL | **NINGUNA** (aún no lanzado) | — | 2026-08-20 |
| Moneda | USD | feature_list.json | 2026-08-20 |

---

## 3. Decisiones de negocio

| Decisión | Valor | Fuente | Fecha |
|---|---|---|---|
| Voz del sitio | **Primera persona singular** (yo, mi, mis) | roadmap.md | 2026-08-20 |
| Idiomas | ES (default), EN, PT | astro.config.mjs | 2026-08-20 |
| PT cobertura | ~61% — contenido faltante se hereda de ES | F001 baseline | 2026-08-20 |
| Legales PT | Links apuntan a páginas EN (labels en PT) | Footer.astro | 2026-08-20 |
| Email de contacto | hola@creapolis.dev | Layout.astro, forms | 2026-08-20 |
| Ubicación | Monterrey, Nuevo León, México | Layout.astro JSON-LD | 2026-08-20 |
| Desarrollador | Tiago David Furtado | Layout.astro, stores | 2026-08-20 |
| Social links | **PENDIENTE** — todos en null | Footer.astro | — |
| Blog | Solo en español (publicado ×3 locales) | F001 baseline | 2026-08-20 |

---

## 4. Presupuesto de productos (pricing summary)

| Producto | Precio | Moneda | Tipo | Verificado |
|---|---|---|---|---|
| Pepinillo | Gratis + Premium (in-app) | — | Freemium | ✅ Ambas stores |
| Películas | Gratis | — | Free | ✅ Google Play |
| Solennix Free | $0 | — | Free tier | ⚠️ No verificado en stores |
| Solennix Pro | $149 | MXN | Suscripción mensual | ⚠️ No verificado en stores |
| Solennix Business | Custom | — | Contact sales | ⚠️ No verificado en stores |
| Subscription Guardian | $4.99 | USD | Compra única | ✅ (pre-production) |

---

## 5. Valores que NO deben publicarse sin verificación

| Valor | Razón |
|---|---|
| Número de usuarios/descargas | No tenemos datos verificables |
| Reseñas/calificaciones | No verificadas externamente |
| Ingresos/revenue | Datos privados |
| Fechas de lanzamiento de SG | Aún en pre-production |
| Claims de "5+ años" | Verificado (desde 2019) ✅ |
| Claims de "4 apps en tiendas" | Solo 3 están en tiendas (SG pre-production) — corregir a "3" |

---

## 6. Pendientes que bloquean Fase 1

| # | Pendiente | Quién resuelve | Bloquea |
|---|---|---|---|
| P1 | Confirmar si Solennix está en producción o pre-production | Tiago | F007, F010 |
| P2 | Proporcionar URLs de stores para Solennix (si existen) | Tiago | F007, F010 |
| P3 | Actualizar data de Pepinillo para incluir iOS/App Store | Desarrollo | F008 |
| P4 | Actualizar "4 apps" a "3 apps" en home hero trust bar | Desarrollo | F029 |
| P5 | Agregar social links (LinkedIn, GitHub, X) | Tiago | F024 |

---

*Documento generado como parte de F003 — product_decision_register*
*Fecha: 2026-08-20*
