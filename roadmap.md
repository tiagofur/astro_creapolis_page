# Creapolis V2 — Roadmap de ejecución

Este roadmap convierte `review.md` en una ruta de trabajo ejecutable. La meta no es «hacer una web bonita»: es construir el sitio de un **independent product studio** que demuestre producto real, reduzca el riesgo percibido de contratar a una sola persona y convierta dos audiencias distintas: clientes de servicios y usuarios de productos.

## Ruta rápida

1. Abrir `feature_list.json` y elegir la primera tarea `pending` cuyas dependencias estén en `done`.
2. Cambiar solo esa tarea a `in_progress`; nunca ejecutar dos tareas a la vez.
3. Implementar sus criterios de aceptación sin ampliar el alcance.
4. Ejecutar todas sus verificaciones y guardar evidencia concreta.
5. Marcarla `done` únicamente cuando aceptación, pruebas y evidencia estén completas.
6. Cerrar la fase solo cuando su **gate de salida** esté satisfecho.

`feature_list.json` es la fuente de verdad operativa. Este documento explica la estrategia, el orden y los gates; no duplica el estado de cada tarea.

## Resultado buscado

La experiencia final debe provocar esta secuencia:

| Tiempo | Percepción objetivo |
|---|---|
| 3 segundos | «Esta persona construye productos serios.» |
| 10 segundos | «Tiene software real publicado.» |
| 30 segundos | «Entiende producto, diseño e ingeniería.» |
| 2 minutos | «Su proceso reduce riesgo; puedo confiarle un proyecto.» |

## Decisiones no negociables

- **Posicionamiento:** «Creapolis — Quiet Confidence»: preciso, tecnológico, tranquilo, premium, humano y centrado en producto.
- **Dos funnels:** `Home → Services → Case study → Contact` y `Home → Products → Product → Store`.
- **Una sola voz:** estudio de una persona; primera persona singular y español LATAM neutral.
- **Verdad antes que marketing:** no inventar métricas, testimonios, clientes, descargas ni resultados.
- **Producto real antes que decoración:** screenshots y datos auténticos; ningún dashboard ficticio presentado como real.
- **Una sola fuente de verdad:** precios, plataformas, estados, enlaces y contadores no se hardcodean en múltiples páginas.
- **Astro primero:** HTML, CSS, SVG y JavaScript mínimo; no React, canvas, Three.js ni librerías de motion sin necesidad demostrable.
- **Sistema propio:** no copiar Apple, no mezclar tendencias y no convertir la web en bento/glass/gradient genérico.
- **Accesibilidad y rendimiento son features:** no son una fase cosmética posterior.

## Hechos de producto ya confirmados

| Producto | Hecho que debe respetarse |
|---|---|
| Pepinillo | Está publicado también en App Store: `https://apps.apple.com/mx/app/pepinillo-timer-de-enfoque/id6760687424`. |
| Subscription Guardian | Será compra única de USD 4.99 y todavía no está en producción. |
| Solennix | La moneda del precio y el nombre final del plan deben verificarse antes de publicar copy nuevo. |

Si aparece nueva información, se actualiza primero la fuente de verdad de producto y después las vistas derivadas.

## Modelo de ejecución

### Estados

| Estado | Significado |
|---|---|
| `pending` | Lista pero aún no iniciada. |
| `in_progress` | Única tarea activa del backlog. |
| `blocked` | No puede continuar; `blocked_by` explica el impedimento y la decisión necesaria. |
| `done` | Cumple aceptación, verificación y evidencia. |

### Definition of Ready

Una tarea puede comenzar solo si:

- todas sus `dependencies` están en `done`;
- no existe otra tarea `in_progress`;
- sus referencias y archivos objetivo fueron localizados;
- los datos de producto que utiliza están confirmados;
- no requiere inventar contenido, métricas o activos.

### Definition of Done por tarea

Para cambiar una tarea a `done`:

1. Cumplir todos los elementos de `acceptance`.
2. Ejecutar todos los elementos de `verification`.
3. Añadir evidencia en `evidence` —por ejemplo: comandos, rutas, capturas, informe Lighthouse o URL de preview—.
4. Completar `completed_at` en ISO 8601.
5. Confirmar que no introdujo contradicciones en ES/EN/PT ni rompió rutas existentes.

Un commit, una captura bonita o «se ve bien en mi máquina» NO sustituyen la verificación.

### Cómo bloquear una tarea

Cambiar `status` a `blocked` solo cuando exista una dependencia externa o decisión real. Documentar en `blocked_by`:

- qué falta;
- quién puede resolverlo;
- qué evidencia desbloquea el trabajo;
- si existe una parte segura que pueda ejecutarse sin esa decisión.

### Unidad de trabajo recomendada

- Una tarea por rama o commit reviewable.
- No mezclar refactor de arquitectura, copy y rediseño visual en la misma tarea.
- Mantener tests y documentación junto al cambio que validan.
- Si una tarea crece más allá de su aceptación, dividirla antes de continuar.

## Secuencia de fases

### Fase 0 — Baseline y decisiones

**Objetivo:** convertir opiniones del review en decisiones verificables y obtener una línea base del sitio actual.

**Incluye:** F001–F005.

**Gate de salida:** inventario de rutas, datos, contenido, métricas técnicas y decisiones abiertas; ninguna suposición crítica oculta.

### Fase 1 — Integridad de datos

**Objetivo:** eliminar contradicciones y crear una fuente de verdad reutilizable para productos, navegación y estadísticas.

**Incluye:** F006–F013.

**Gate de salida:** precio, estado, plataformas, stores, copy y enlaces de cada producto coinciden en todas las páginas e idiomas.

### Fase 2 — Arquitectura de información y routing

**Objetivo:** separar servicios y productos, normalizar URLs y proteger SEO mediante redirects y metadata coherente.

**Incluye:** F014–F019.

**Gate de salida:** ambos funnels se pueden recorrer sin callejones, enlaces rotos ni duplicados indexables.

### Fase 3 — Fundación visual y de interacción

**Objetivo:** crear el sistema «Quiet Confidence» antes de rediseñar páginas.

**Incluye:** F020–F028.

**Gate de salida:** tokens, tipografía, grid, componentes base, navegación, motion, responsive y accesibilidad funcionan aislados y documentados.

### Fase 4 — Núcleo de conversión

**Objetivo:** reconstruir las páginas que explican, demuestran y venden Creapolis.

**Incluye:** F029–F035.

**Gate de salida:** una persona nueva entiende la oferta en 5–8 segundos, encuentra evidencia real y puede iniciar un contacto con expectativas claras.

### Fase 5 — Sistema de productos y case studies

**Objetivo:** convertir cada producto en evidencia de criterio de producto e ingeniería, además de darle soporte profesional.

**Incluye:** F036–F042.

**Gate de salida:** los cuatro productos tienen narrativa diferenciada, rutas coherentes, datos verdaderos y soporte mantenible.

### Fase 6 — Contenido y autoridad

**Objetivo:** transformar el blog de archivo pasivo a sistema editorial que genera autoridad y oportunidades.

**Incluye:** F043–F048.

**Gate de salida:** contenido validado por schema, navegación editorial clara, lectura larga usable y CTAs contextuales honestos.

### Fase 7 — Calidad transversal

**Objetivo:** demostrar el nivel premium con SEO, accesibilidad, rendimiento y robustez reales.

**Incluye:** F049–F056.

**Gate de salida:** build limpio, enlaces válidos, pruebas de teclado/lector, metadata completa y presupuestos de rendimiento cumplidos.

### Fase 8 — Medición y lanzamiento

**Objetivo:** publicar de forma controlada y medir si el rediseño mejora comprensión y conversión.

**Incluye:** F057–F062.

**Gate de salida:** eventos comprobados, smoke tests aprobados, checklist de lanzamiento firmado y revisión post-lanzamiento programada.

## Gates globales de producto

El proyecto completo no termina hasta cumplir TODOS estos criterios:

- La propuesta de Creapolis se entiende en 5–8 segundos.
- Servicios y productos tienen CTAs y funnels distintos.
- Ningún precio, plataforma, estado o enlace se contradice.
- ES/EN/PT comparten modelo de contenido; cualquier contenido no traducido se declara con honestidad.
- Todos los CTAs y formularios tienen estados y destinos válidos.
- Navegación completa por teclado y soporte de `prefers-reduced-motion`.
- Responsive desde 320 px hasta ultrawide sin pérdida de jerarquía.
- Canonical, hreflang, Open Graph y datos estructurados correctos por página.
- Redirects conservan las rutas antiguas.
- Objetivos de campo: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 en p75 cuando exista suficiente tráfico.
- Analytics mide conversión sin registrar datos personales innecesarios.
- La web contiene únicamente productos, resultados, reviews y cifras demostrables.

## Estrategia de prueba

| Capa | Evidencia mínima |
|---|---|
| Datos | Validación de schema, typecheck y tests de valores derivados. |
| Rutas | Build, link checker, redirects y pruebas de canonical/hreflang. |
| UI | Capturas desktop/mobile, teclado, reduced motion y contraste. |
| Formularios | Estados loading/success/error, validación, fallo de red y envío real en staging. |
| SEO | Inspección HTML generado, sitemap, robots, OG y structured data. |
| Rendimiento | Lighthouse reproducible y, después del lanzamiento, datos de campo. |
| Conversión | Eventos visibles en modo debug y recorrido completo de ambos funnels. |

Los comandos exactos se confirman en F001; no se inventan en el roadmap.

## Riesgos y controles

| Riesgo | Control |
|---|---|
| Rediseñar sobre datos incorrectos | Fase 1 bloquea el trabajo visual. |
| Scope creep por «hacerlo WOW» | Aceptación atómica y una tarea activa. |
| Romper SEO al mover rutas | Mapa de redirects + pruebas antes de cambiar navegación pública. |
| Crear una identidad genérica | Tokens y principios aprobados antes de páginas. |
| Usar métricas o testimonios falsos | Registro de fuentes; sin fuente, no se publica. |
| i18n superficial | Matriz por página/componente y gate de paridad. |
| Blog demasiado grande para migrar de una vez | Migración incremental con schema y reporte de excepciones. |
| Performance degradada por el hero | Presupuesto de assets/JS y medición del LCP desde el prototipo. |
| Sobreprometer siendo estudio de una persona | Explicar repo, infraestructura, documentación, handover y continuidad. |
| Legal insuficiente por producto | Apéndices específicos y revisión profesional cuando aplique. |

## Artefactos de evidencia

Guardar la evidencia fuera del JSON cuando sea grande y enlazarla desde `evidence`:

```text
docs/evidence/creapolis-v2/
├── baseline/
├── content-audit/
├── screenshots/
├── accessibility/
├── seo/
├── performance/
└── release/
```

Los informes generados no sustituyen decisiones humanas de producto; sirven para demostrar que cada criterio se verificó.

## Qué queda fuera hasta tener evidencia

- Contadores públicos de usuarios, descargas, países o conversión.
- Testimonios o logos no autorizados.
- Resultados de case studies sin medición real.
- Página `/work/` con clientes ficticios o trabajo bajo NDA sin copy aprobado.
- Claims de cumplimiento legal no revisados.
- Animaciones, dark mode o experimentos que retrasen los gates principales sin aportar conversión o claridad.

## Próximo paso

Empezar por F001. No diseñar Home, tokens ni screenshots antes de cerrar F001–F019: una fachada premium construida sobre información contradictoria solo hace el problema más caro.
