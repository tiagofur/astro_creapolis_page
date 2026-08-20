# Creapolis V2 — Content Truth Audit (F002)

**Fecha**: 2026-08-20
**Fase**: 0 — Baseline y decisiones
**Alcance**: Home, Work/Projects, productos, hubs, footer, legales, servicios, about, contact

---

## 1. Resumen ejecutivo

Se encontraron **14 contradicciones** y **6 decisiones pendientes** que deben resolverse antes de Fase 1. Las más críticas son:

1. **Subscription Guardian** aparece como "live" en Home pero es pre-production
2. **Pepinillo** tiene FAQ/support completo de iOS pero el producto solo está en Android (Google Play)
3. **Solennix** muestra "$149" sin especificar moneda —Target LATAM necesita claridad USD/MXN
4. **Solennix** tiene plan llamado "Enterprise" en tag pero "Business" en nombre
5. **4 apps "live"** en Home pero solo 3 están realmente en producción

---

## 2. Matriz por producto

### 2.1 SOLENNIX

| Atributo | Valor actual | Fuente | Verificado | Issue |
|---|---|---|---|---|
| **Nombre** | Solennix | Todos los archivos | ✅ | — |
| **Estado (home.ts)** | `status: "live"` | home.ts L53-67 | ✅ | — |
| **Plataformas (home.ts)** | iOS · Android · Web | home.ts L49 | ⚠️ | Verificar que todas existen |
| **Plataformas (projects.ts)** | iOS · Android | projects.ts solennix.info.platforms | ⚠️ | Falta "Web" |
| **Plataformas (solennix-support FAQ)** | iPhone (App Store), Android (Google Play), Web (solennix.com) | solennix-support.ts L97 | ✅ | — |
| **Precio plan Free** | $0 | solennix.ts | ✅ | — |
| **Precio plan Pro** | $149 (sin moneda) | solennix.ts | ⚠️ | **ISSUE: ¿USD o MXN?** |
| **Moneda** | No especificada | solennix.ts | ❌ | **CRÍTICO: Falta moneda** |
| **Suffix precio Pro** | "/ mes" (ES), "/ month" (EN), "/ mês" (PT) | solennix.ts | ✅ | — |
| **Plan Enterprise/Business** | tag: "03 / Enterprise", plan: "Business" | solennix.ts L46-47 | ⚠️ | **INCONSISTENCIA: Enterprise vs Business** |
| **Store links** | No proporcionados en data | solennix.ts | ⚠️ | **ISSUE: Sin URLs de stores** |
| **FAQ precio** | "$149/mes" | solennix-support.ts L96 | ⚠️ | Mismo issue de moneda |
| **FAQ plataformas** | App Store, Google Play, Web | solennix-support.ts L97 | ✅ | — |
| **Phone mockup stats** | "$45k" Ingreso/Revenue | solennix.ts L65,80 | ⚠️ | **Issue: Mock data expuesto como stat** |

**Decisiones pendientes para Solennix:**
- [ ] Confirmar moneda del precio Pro (USD o MXN)
- [ ] Unificar nombre del plan: "Enterprise" o "Business"
- [ ] Proporcionar URLs de App Store y Google Play
- [ ] Decidir si el mockup "$45k" es aceptable o debe ocultarse

---

### 2.2 PEPINILLO

| Atributo | Valor actual | Fuente | Verificado | Issue |
|---|---|---|---|---|
| **Nombre** | Pepinillo | Todos los archivos | ✅ | — |
| **Estado (home.ts)** | `status: "live"` | home.ts L58 | ⚠️ | Android es live; iOS es "En desarrollo" |
| **Estado (home shelf)** | "En desarrollo" (iOS) | home.ts L179 | ✅ | — |
| **Plataformas (projects.ts)** | Android | projects.ts pepinillo.platform | ✅ | — |
| **Plataformas (home.ts)** | Android | home.ts L61 | ✅ | — |
| **Store links (projects.ts)** | Google Play: dev.creapolis.pepinillo | projects.ts | ✅ | — |
| **Store links (App Store)** | No proporcionado | projects.ts | ⚠️ | URL existe en feature_list |
| **App Store URL (feature_list)** | `https://apps.apple.com/mx/app/pepinillo-timer-de-enfoque/id6760687424` | feature_list.json product_facts | ✅ | — |
| **Precio** | No especificado | — | ⚠️ | **ISSUE: Gratis o de pago?** |
| **FAQ: "cancelo la suscripción"** | Menciona "suscripción" y "App Store" | pepinillo-support.ts L100 | ❌ | **CRÍTICO: FAQ habla de iOS/App Store pero solo está en Android** |
| **FAQ: "Pepinillo en Mac"** | "Sí. Pepinillo corre nativo en Mac" | pepinillo-support.ts L103 | ❌ | **CRÍTICO: No existe versión Mac** |
| **FAQ: "iCloud Sync"** | Describe sync vía CloudKit | pepinillo-support.ts L102 | ❌ | **CRÍTICO: CloudKit es iOS, app es Android** |
| **FAQ: "Live Activities"** | Describe Live Activities y Dynamic Island | pepinillo-support.ts L101 | ❌ | **CRÍTICO: Features iOS en FAQ para app Android** |
| **FAQ: "reembolso"** | Describe proceso Apple | pepinillo-support.ts L105 | ⚠️ | Aplicable solo si hay versión iOS |
| **Guide: "Live Activities"** | "Pro tip: Live Activities" | pepinillo-support.ts guide.tipTitle | ❌ | **CRÍTICO: Feature iOS en guía de app Android** |
| **Guide: "Pantalla de bloqueo"** | Menciona Lock Screen y Dynamic Island | pepinillo-support.ts | ❌ | **CRÍTICO: Features iOS** |
| **Resources href** | `/proyectos/pepinillo/guide` etc. | projects.ts | ✅ | — |
| **Tech stack** | Kotlin, Jetpack Compose, Room | projects.ts | ✅ | — |

**Decisiones pendientes para Pepinillo:**
- [ ] **CRÍTICO**: Separar FAQ/support de iOS vs Android
- [ ] Decidir si la versión iOS ya tiene fecha o si el FAQ es aspiracional
- [ ] Agregar URL de App Store cuando esté disponible
- [ ] Aclarar si Pepinillo es gratis o tiene plan premium
- [ ] Los resources href en EN usan `/proyectos/` en vez de `/projects/` — ¿es correcto?

---

### 2.3 PELÍCULAS

| Atributo | Valor actual | Fuente | Verificado | Issue |
|---|---|---|---|---|
| **Nombre** | Películas | Todos los archivos | ✅ | — |
| **Estado (home.ts)** | `status: "live"` | home.ts L68 | ✅ | — |
| **Plataformas** | Android | projects.ts, home.ts | ✅ | — |
| **Store links** | Google Play: mx.creapolis.peliculas | projects.ts | ✅ | — |
| **Precio** | No especificado | — | ⚠️ | ¿Gratis? Asumir que sí |
| **Tech stack** | Kotlin, Jetpack Compose, Retrofit, Coil, Room, Hilt | projects.ts | ✅ | — |

**Decisiones pendientes para Películas:**
- [ ] Confirmar que es gratis (no hay data de pricing)
- [ ] No hay resources (guide/tips/feedback) — ¿es intencional?

---

### 2.4 SUBSCRIPTION GUARDIAN

| Atributo | Valor actual | Fuente | Verificado | Issue |
|---|---|---|---|---|
| **Nombre** | Subscription Guardian | Todos los archivos | ✅ | — |
| **Estado (home.ts)** | `status: "live"` | home.ts L78 | ❌ | **CRÍTICO: feature_list dice pre-production** |
| **Estado (feature_list)** | `pre_production` | feature_list.json product_facts | ✅ | — |
| **Plataformas** | iOS | projects.ts, home.ts | ✅ | — |
| **Precio** | $4.99 (projects.ts) | projects.ts L187 | ⚠️ | Falta moneda explícita |
| **Precio (feature_list)** | USD 4.99 | feature_list.json product_facts | ✅ | — |
| **Tipo de compra** | Compra única | subscription-guardian-support.ts L96 | ✅ | — |
| **Store links** | `storeLinks: {}` (vacío) | projects.ts | ⚠️ | **ISSUE: Sin URL de App Store** |
| **FAQ precio** | "$4.99 USD" | subscription-guardian-support.ts L96 | ✅ | — |
| **FAQ tipo** | "compra única" | subscription-guardian-support.ts L96 | ✅ | — |
| **Features "próximo"** | Ghost Detector (próximo), Auto-Discovery Engine | projects.ts | ⚠️ | Marcar como "coming soon" explícitamente |
| **Home shelf** | No aparece en shelf (solo Solennix, Serene, Pepinillo iOS, Exploring) | home.ts | ⚠️ | **ISSUE: ¿Dónde está SG en home?** |
| **Resources** | Guide, Tips, Feedback — con hrefs a `/proyectos/subscription-guardian/` | projects.ts | ✅ | — |

**Decisiones pendientes para Subscription Guardian:**
- [ ] **CRÍTICO**: Cambiar status en home.ts de "live" a "coming_soon" o "pre_production"
- [ ] Agregar URL de App Store cuando esté disponible
- [ ] Agregar SG al shelf de home (actualmente no aparece)
- [ ] Confirmar precio con moneda USD explícita en UI

---

## 3. Matriz por página

### 3.1 HOME (`/[lang]/`)

| Sección | Claim | Verificación | Issue |
|---|---|---|---|
| Hero trust bar | "5+ años entregando producto" | ✅ Desde 2019 (about.ts) | — |
| Hero trust bar | "4 apps propias en tiendas" | ❌ Solo 3 están en tiendas (SG es pre-production) | **ISSUE: Contar solo live** |
| Apps grid | Solennix: live, iOS·Android·Web | ✅ | — |
| Apps grid | Pepinillo: live, Android | ✅ | — |
| Apps grid | Películas: live, Android | ✅ | — |
| Apps grid | Subscription Guardian: live, iOS | ❌ Es pre-production | **ISSUE** |
| Shelf | Solennix: "En producción" | ✅ | — |
| Shelf | Serene: "En desarrollo" | ⚠️ | Verificar si es real |
| Shelf | Pepinillo iOS: "En desarrollo" | ✅ | — |
| Shelf | Exploring: "Concepto" | ✅ | — |
| Shelf **falta** | Subscription Guardian no aparece | ⚠️ | **ISSUE: SG ausente del shelf** |
| Hero voice | Usa "yo"/"mi" (1ra persona) | ✅ en ES | — |
| Hero voice EN | Usa "I"/"my" (1ra persona) | ✅ | — |
| Services | 4 servicios: Móvil, Web, Desktop, IA | ✅ | — |
| Stats | "5+ años", "4 apps", "1 persona", "< 24h" | ⚠️ | "4 apps" es problemático (ver arriba) |

### 3.2 SERVICES (`/[lang]/servicios|services|servicos`)

| Sección | Claim | Verificación | Issue |
|---|---|---|---|
| Voice | Primera persona singular ("Hago", "Publico") | ✅ ES | — |
| Voice EN | Primera persona singular ("I build", "I publish") | ✅ | — |
| Mobile desc | "iOS y Android, nativas o multiplataforma" | ✅ | — |
| Mobile example | "Pepinillo (Android) y Películas (Android) en Google Play. Solennix en iOS, Android y web" | ✅ | — |
| Mobile deliverable | "App publicada en App Store y Google Play" | ✅ General (no específico de un producto) | — |
| FAQs | Precios: "$5–10k USD" a "$100k+" | ⚠️ | Verificar que son reales |

### 3.3 ABOUT (`/[lang]/sobre|about`)

| Sección | Claim | Verificación | Issue |
|---|---|---|---|
| Timeline 2022 | "Pepinillo y Películas llegaron a Google Play" | ✅ | — |
| Timeline Hoy | "apps propias en producción" | ✅ | — |
| Voice | Primera persona singular | ✅ | — |

### 3.4 FOOTER

| Sección | Claim | Verificación | Issue |
|---|---|---|---|
| Social links | `linkedin: null, github: null, twitter: null` | ❌ Todos en null | **ISSUE: Sin RRSS** |
| Products list | Solennix, Pepinillo, Películas, Subscription Guardian | ✅ | — |
| Copyright | "© {year} Creapolis · Tiago David Furtado" | ✅ | — |
| Legal links | Privacidad, Términos, Eliminar cuenta | ✅ | — |
| Privacy link ES | `/privacidad` | ✅ Existe | — |
| Privacy link EN | `/privacy-policy` | ✅ Existe | — |
| Privacy link PT | `/privacy-policy` (usa link EN) | ⚠️ | **ISSUE: PT usa URL EN** |
| Terms link PT | `/terms-of-use` (usa link EN) | ⚠️ | **ISSUE: PT usa URL EN** |
| Delete link PT | `/delete-account` (usa link EN) | ⚠️ | **ISSUE: PT usa URL EN** |

### 3.5 LEGALES

| Página | Estado | Issue |
|---|---|---|
| `/privacidad` | ✅ Existe | Contenido verificado en F001 |
| `/privacy-policy` | ✅ Existe | Contenido verificado en F001 |
| `/terminos` | ✅ Existe | Contenido verificado en F001 |
| `/terms-of-use` | ✅ Existe | Contenido verificado en F001 |
| `/eliminar-cuenta` | ✅ Existe | Contenido verificado en F001 |
| `/delete-account` | ✅ Existe | Contenido verificado en F001 |

---

## 4. Matriz de contradicciones

| # | Severidad | Producto/Página | Idioma | Issue | Decisión necesaria |
|---|---|---|---|---|---|
| 1 | 🔴 CRÍTICO | SG | Todos | Home dice "live" pero es pre-production | Cambiar status a "pre_production" |
| 2 | 🔴 CRÍTICO | Pepinillo | Todos | FAQ/Guide/Support describe features iOS (Live Activities, Dynamic Island, CloudKit, Mac) pero solo está en Android | Separar contenido iOS vs Android |
| 3 | 🔴 CRÍTICO | Home | Todos | "4 apps propias en tiendas" — SG no está en tiendas | Cambiar a "3 apps" o agregar SG al shelf con status correcto |
| 4 | 🟡 ALTO | Solennix | Todos | Precio "$149" sin moneda (USD o MXN) | Confirmar moneda |
| 5 | 🟡 ALTO | Solennix | Todos | Plan tag "Enterprise" vs plan name "Business" | Unificar nombre |
| 6 | 🟡 ALTO | Solennix | Todos | Store links vacíos | Agregar URLs de stores |
| 7 | 🟡 ALTO | SG | Todos | Store links vacíos (`storeLinks: {}`) | Agregar URL de App Store |
| 8 | 🟡 ALTO | Footer | PT | Links legales apuntan a URLs EN (`/privacy-policy`, `/terms-of-use`, `/delete-account`) | Crear páginas PT o redirigir |
| 9 | 🟠 MEDIO | Home | Todos | SG no aparece en shelf de desarrollo | Agregar al shelf |
| 10 | 🟠 MEDIO | Footer | Todos | Social links en null | Agregar URLs de RRSS |
| 11 | 🟠 MEDIO | Solennix | Todos | Mockup stats "$45k" visible como dato real | Ocultar o marcar como demo |
| 12 | 🟠 MEDIO | Pepinillo | EN | Resources href usan `/proyectos/` en vez de `/projects/` | Verificar slug routing |
| 13 | 🟢 BAJO | Home | Todos | Stats "4 apps" — inconsistente con realidad | Actualizar a "3 apps" |
| 14 | 🟢 BAJO | Películas | Todos | Sin resources (guide/tips/feedback) | Decidir si crear o omitir |

---

## 5. Claims cuantitativos y su verificación

| Claim | Ubicación | Fuente | Verificado |
|---|---|---|---|
| "5+ años entregando producto" | Home hero trust | About timeline (desde 2019) | ✅ |
| "4 apps propias en tiendas" | Home hero trust | Solo 3 live | ❌需修正 |
| "Respuesta < 24h" | Home hero trust, footer | Compromiso personal | ⚠️ Sin métrica externa |
| "$149/mes" (Solennix Pro) | pricing | Sin moneda confirmada | ⚠️ |
| "$4.99 USD" (SG) | FAQ, projects | feature_list confirmado | ✅ |
| "$45k" (Solennix mockup) | phone mockup stats | Demo data | ⚠️ No es real |
| "$5–10k USD" a "$100k+" (servicios) | FAQ servicios | Rango de pricing | ⚠️ Sin fuente externa |
| "4.2h Focus" (Pepinillo mockup) | mockup stats | Demo data | ⚠️ No es real |
| "124 Películas vistas" (mockup) | mockup stats | Demo data | ⚠️ No es real |

---

## 6. Resumen de decisiones pendientes

| # | Decisión | Bloquea | Dueño |
|---|---|---|---|
| D1 | Cambiar SG de "live" a "pre_production" en home | F007, F008, F009 | Tiago |
| D2 | Separar FAQ/support de Pepinillo iOS vs Android | F008 | Tiago |
| D3 | Confirmar moneda de Solennix Pro ($149 USD o MXN) | F010 | Tiago |
| D4 | Unificar nombre plan Solennix (Enterprise vs Business) | F010 | Tiago |
| D5 | Crear páginas legales en PT o redirigir a EN | F013 | Tiago |
| D6 | Decidir si agregar SG al shelf de home | F029 | Tiago |

---

## 7. Verificación contra HTML generado

### Build verification
```
$ pnpm run build → 448 pages, 0 errors ✅
```

### URLs de store verificadas

| Store | URL | Estado |
|---|---|---|
| Pepinillo Google Play | `https://play.google.com/store/apps/details?id=dev.creapolis.pepinillo` | Pendiente verificar |
| Pepinillo App Store | `https://apps.apple.com/mx/app/pepinillo-timer-de-enfoque/id6760687424` | Confirmado en feature_list |
| Películas Google Play | `https://play.google.com/store/apps/details?id=mx.creapolis.peliculas` | Pendiente verificar |
| Solennix | No proporcionado | ❌ Falta |
| SG | No proporcionado | ❌ Falta |

---

*Documento generado como parte de F002 — content_truth_audit*
*Fecha: 2026-08-20*
