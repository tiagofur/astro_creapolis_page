# Creapolis V2 — Voice & Localization Policy (F004)

**Fecha**: 2026-08-20
**Fase**: 0 — Baseline y decisiones

---

## 1. Política de voz

### 1.1 Identidad

Creapolis es un **estudio de una sola persona**. Toda la comunicación usa **primera persona singular**.

| Correcto | Incorrecto |
|---|---|
| "Diseño y construyo" | "Diseñamos y construimos" |
| "Mi proceso" | "Nuestro proceso" |
| "Te contesto yo" | "Te contestamos" |
| "Hago producto de cabo a rabo" | "Hacemos producto" |
| "Lo escribí yo" | "Lo escribimos" |

**Excepción**: En contextos donde el "nosotros" es natural y no engaña (ej: "somos un estudio"), se acepta si se refiere a Creapolis como entidad, no como equipo. Pero se prefiere la primera persona.

### 1.2 Voseo (Argentina/Uruguay/Paraguay)

El sitio **usa voseo** de forma consistente en español. Esto es una **decisión de producto**: el tono es cercano, directo, y refleja la voz real del autor.

| Voseo usado | Equivalente tuteo |
|---|---|
| "querés" | "quieres" |
| "podés" | "puedes" |
| "hacés" | "haces" |
| "escribinos" | "escríbenos" |
| "contanos" | "cuéntanos" |
| "avisame" | "avísame" |
| "seguila" | "síguela" |
| "ponete" | "ponte" |
| "arrancás" | "empiezas" |
| "metele" | "ponte las pilas" |

**Regla**: Si el sitio ya usa voseo en un contexto, mantenerlo. No mezclar voseo y tuteo en la misma página.

### 1.3 Español LATAM neutral

El español es **LATAM neutral** con flavor rioplatense (voseo). No se usa español de España.

| LATAM ✅ | España ❌ |
|---|---|
| "computadora" | "ordenador" |
| "celular" | "móvil" |
| "aplicación" / "app" | "aplicación" |
| "correo" | "correo electrónico" / "e-mail" |
| "internet" | "internet" |
| "contacto" | "contacto" |
| "disqueros" ← ⚠️ NO USAR | — |

### 1.4 Términos técnicos

| Término | Uso |
|---|---|
| "app" / "apps" | Siempre aceptable, no traducir |
| "stack" | Siempre en inglés |
| "repo" | Siempre en inglés |
| "deploy" / "deployar" | Aceptable en contexto técnico |
| "feature" | Aceptable en contexto técnico |
| "feedback" | Aceptable |
| "CTA" | No usar directamente — usar "botón", "acción" |
| "landing" | Aceptable en contexto |
| "case study" | Traducir como "caso de estudio" |
| "sprint" | Aceptable |
| "AI" / "IA" | Usar "IA" en ES, "AI" en EN |

---

## 2. Política de localización

### 2.1 Idiomas soportados

| Idioma | Locale | Cobertura | Fuente |
|---|---|---|---|
| Español | `es` (default) | 100% | Idioma primario |
| English | `en` | 100% de keys UI | Traducido |
| Português (BR) | `pt` | ~61% de keys UI | Parcial — hereda de ES |

### 2.2 Qué exige paridad total (debe traducirse)

| Contenido | Razón |
|---|---|
| UI strings (navegación, botones, labels) | Experiencia de usuario |
| Home page copy | Primera impresión |
| Services page | Conversión de clientes |
| Contact page | Conversión de clientes |
| About page | Confianza |
| Product descriptions | Experiencia de usuario |
| Footer | Navegación |
| 404 page | Experiencia de usuario |
| FAQ | Soporte |

### 2.3 Qué PUEDE quedarse en español (no necesita traducción)

| Contenido | Razón |
|---|---|
| Blog articles (127 posts) | Contenido editorial, declarado como "en español" |
| Legal pages (privacy, terms) | Contenido legal,-linkar a EN desde PT |
| Case studies técnicos | Contenido niche |

### 2.4 Cómo declarar contenido no traducido

Cuando el contenido está solo en español y se muestra en otro idioma, **se declara honestamente**:

**Banner de blog (ya implementado)**:
- EN: "This blog is in Spanish. For now, article content is only available in Spanish."
- PT: "Os artigos estão em espanhol. O conteúdo dos artigos só está disponível em espanhol."

**Regla**: Nunca aparentar traducción completa cuando no existe. Mejor un banner honesto que contenido mal traducido.

### 2.5 PT: Reglas especiales

- PT es **portugués brasileño** (pt-BR)
- Las keys faltantes en PT (133 de 344) heredan de ES automáticamente via `useTranslations()`
- Esto significa que el usuario PT ve **español** para las keys no traducidas — es aceptable mientras se note que es contenido parcial
- **No se debe traducir contenido legal a PT** — linkar a páginas EN

---

## 3. Auditoría de voz actual

### 3.1 Inconsistencias encontradas

| # | Ubicación | Issue | Severidad |
|---|---|---|---|
| 1 | ui.ts L65 | "Nuestros proyectos" — debería ser "Mis proyectos" | 🟡 |
| 2 | ui.ts L146 | "Cómo trabajamos" — debería ser "Cómo trabajo" | 🟡 |
| 3 | ui.ts L195 | "24 horas nuestras" — debería ser "24 horas mías" | 🟡 |
| 4 | ui.ts L251 | "Hacemos demos" — debería ser "Hago demos" | 🟡 |
| 5 | ui.ts L255 | "Hacemos auditorías" — debería ser "Hago auditorías" | 🟡 |
| 6 | ui.ts L337 | "Hacemos estas cosas" — debería ser "Hago estas cosas" | 🟡 |
| 7 | sg-support.ts L97 | "Nosotros nunca vemos" — debería ser "Yo nunca veo" | 🟡 |
| 8 | pepinillo-support.ts L103 | "nuestro canal" — debería ser "mi canal" | 🟡 |
| 9 | ui.ts (faq.a1) | "Te damos un presupuesto" — debería ser "Te doy" | 🟡 |
| 10 | ui.ts (faq.a3) | "Los primeros 30 días los cubrimos" — debería ser "los cubro" | 🟡 |
| 11 | services.ts L48 | "Publico en App Store" — correcto (1ra persona) ✅ | — |
| 12 | about.ts | Todo en 1ra persona singular ✅ | — |

### 3.2 Voz consistente (correcta)

| Página | Voz | Estado |
|---|---|---|
| About | 1ra persona singular, voseo | ✅ |
| Hero (home) | 1ra persona singular | ✅ |
| Contact | 1ra persona singular | ✅ |
| Products (stories) | 1ra persona singular, voseo | ✅ |
| FAQ | ❌ Mezcla nosotros/yo | Corregir |
| Services | 1ra persona singular | ✅ |
| Process | ❌ "Trabajamos" | Corregir |

---

## 4. Muestras validadas

### 4.1 Home — Hero (ES)
> "Diseño y desarrollo apps móviles, web y escritorio con el cuidado de quien las va a mantener y la velocidad de quien entrega cada semana."

✅ 1ra persona implícita, tono directo, sin "nosotros".

### 4.2 Home — Hero (EN)
> "I design and develop mobile, web, and desktop apps with the care of someone who maintains them and the speed of someone who ships every week."

✅ 1ra persona explícita "I".

### 4.3 Contact (ES)
> "Sin formularios de 20 campos ni telenovelas. Escribime en 2 minutos, te respondo en menos de 24 horas con próximos pasos concretos."

✅ Voseo ("Escribime"), 1ra persona, tono directo.

### 4.4 Product — Pepinillo Story (ES)
> "Pepinillo arrancó con dos cosas: Pomodoro y tareas. Cada feature nuevo responde a '¿esto me ayuda a terminar la tarea, o me distrae?'"

✅ 1ra persona en voz del producto, voseo implícito.

---

## 5. Reglas de aplicación

| Regla | Aplicación |
|---|---|
| Primera persona singular | Todo el copy del sitio (excepto blog editorial) |
| Voseo | Todo el ES del sitio |
| LATAM neutral | Sin regionalismos de España |
| Blog solo ES | Declarado con banner, no traducido |
| Legales PT → EN | Links a páginas EN, labels en PT |
| Keys faltantes PT | Heredan de ES (aceptable, no ocultar) |
| No fabricar traducciones | Mejor honestidad que calidad dudosa |

---

*Documento generado como parte de F004 — voice_and_localization_policy*
*Fecha: 2026-08-20*
