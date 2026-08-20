Sí. Revisé la web como si fuera a prepararla para una etapa nueva de Creapolis: **de portfolio personal/proyecto propio a estudio profesional capaz de vender desarrollo de software y, al mismo tiempo, hacer crecer sus propios productos**.

Mi conclusión principal es buena: **no tiraría la web actual y empezaría de cero**. Ya existe una identidad bastante diferenciada. La idea de “estudio de una persona”, “producto real”, “sin intermediarios” y mostrar apps realmente publicadas es mucho más interesante que la típica web de desarrollador con “Hola, soy X, sé React, Flutter, Node…”. La Home ya cuenta que tienes cuatro productos, un proceso de trabajo, servicios y una filosofía propia. ([creapolis.dev][1])

Lo que falta es subir varios niveles en **credibilidad, consistencia, dirección artística, storytelling, conversión y pulido**.

Y hay algunas inconsistencias que ahora mismo deben corregirse **antes incluso del rediseño visual**, porque un potencial cliente técnico puede encontrarlas.

---

# 1. La dirección que recomiendo para Creapolis

No haría una web “estilo Apple”.

Tampoco una web “Material Design”.

Crearía un lenguaje propio que podríamos llamar internamente:

## Creapolis — Quiet Confidence

La sensación debería ser:

**preciso + tecnológico + tranquilo + premium + humano + obsesionado por producto.**

Apple acaba de volver a enfatizar principios como propósito, simplicidad, familiaridad, craft y delight. Y deja algo muy claro: **simplicidad no significa minimalismo vacío**; significa que cada elemento tiene una razón para existir. ([Apple Developer][2])

Google, por otro lado, está empujando Material 3 Expressive hacia experiencias más emocionales, adaptativas, con mejor movimiento, tipografía flexible y formas expresivas. ([Material Design][3])

Yo tomaría:

**De Apple:** jerarquía, espacio, tipografía, silencio visual, precisión, narrativa de producto, microdetalles, materiales usados con enorme moderación.

**De Google:** adaptabilidad, claridad de interacción, feedback, motion, color funcional y algunos momentos expresivos.

Pero no mezclaría:

Material cards + botones Material + glass Apple + gradients + bento grid + blobs + iconos gigantes.

Eso produciría exactamente el Frankenstein visual que quieres evitar.

Creapolis necesita **un sistema visual único**, no una colección de tendencias.

---

# 2. Antes de diseñar: hay problemas P0 que corregiría YA

Estos son más importantes que cambiar colores.

| Problema              | Qué ocurre actualmente                                                                                                                     | Qué haría                                                                        |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------- |
| Pepinillo             | La página principal dice Android/Google Play, pero sus páginas de ayuda hablan de Dynamic Island, Live Activities, App Store, iCloud y Mac | Separar contenido Android actual del futuro iOS o actualizar toda la información | *** ya tenemos la app en Apple Store liberada en https://apps.apple.com/mx/app/pepinillo-timer-de-enfoque/id6760687424
| Subscription Guardian | Aparece con precio de $4.99, pero la landing dice después “Gratis”                                                                         | Definir claramente Free, $4.99 o modelo real                                     | *** sera 1 solo pago de 4.99 y todavia no esta en produccion
| Voz                   | Unas páginas dicen “yo”, otras “nosotros”, “cuéntanos”, “respondemos”                                                                      | Creapolis debe hablar consistentemente como estudio de una persona               |
| Español               | Mezclas voseo, tú y plural empresarial                                                                                                     | Elegir una voz LATAM consistente                                                 |
| Inglés/portugués      | Hay secciones traducidas pero componentes internos siguen en español                                                                       | Localización completa o no aparentar traducción completa                         |
| Footer                | “Apps” está llevando a Home en varias páginas                                                                                              | Debe llevar a `/es/proyectos/` o a nueva `/es/apps/`                             |
| Arquitectura URL      | Solennix vive en `/es/solennix/`, mientras otras apps están en `/es/proyectos/...`                                                         | Normalizar rutas y hacer redirects 301                                           |
| Home                  | `/` y `/es/` muestran esencialmente la misma página                                                                                        | Revisar canonical/hreflang y evitar duplicados indexables                        |

Por ejemplo, la landing actual de Pepinillo presenta la app como Android y enlaza Google Play. ([Creapolis][4]) Pero su guía habla de Live Activities y Dynamic Island, y el soporte explica cancelaciones mediante App Store, sincronización iCloud y una versión Mac. ([Creapolis][5])

Un cliente técnico que abra varias páginas puede preguntarse:

> “¿Esta información es real o algunas secciones fueron generadas antes de tener el producto terminado?”

Eso hay que eliminar completamente.

Subscription Guardian tiene otro problema parecido: su página muestra **$4.99**, mientras más abajo aparece “Gratis, sin cuentas…”, y la sección de soporte confirma que es una compra única de $4.99. ([Creapolis][6])

Estos detalles pequeños destruyen más percepción premium que una sombra mal diseñada.

---

# 3. El problema estratégico más importante: tienes DOS clientes diferentes

Actualmente creapolis.dev intenta hacer dos cosas:

**A. Venderte a ti como desarrollador/estudio.**

y

**B. Promocionar tus propias aplicaciones.**

Ambas cosas pueden coexistir.

Pero deben existir dos funnels diferentes.

Un CEO que llega buscando:

> “Necesito desarrollar un SaaS.”

no tiene la misma intención que alguien buscando:

> “Quiero una app para controlar mis suscripciones.”

Por eso organizaría Creapolis alrededor de dos grandes caminos:

**Servicios**

`Home → Servicios → Caso de estudio → Contacto`

y

**Productos**

`Home → Productos → App → App Store / Play Store`

La Home puede unir ambos mundos porque precisamente esa es tu ventaja:

> “No solo desarrollo productos para clientes. Construyo, lanzo y mantengo los míos.”

Eso es buen posicionamiento.

---

# 4. HOME — debe convertirse en la pieza WOW

Actualmente el mensaje:

> Software que transforma ideas en productos.

funciona. No lo eliminaría alegremente. ([Creapolis][1])

Pero el hero todavía podría comunicar mucho mejor **por qué elegirte a ti**.

Yo lo reorganizaría así.

## Primera pantalla

Eyebrow:

**Independent Product Studio · Monterrey / Remote**

H1:

**Diseño y construyo software que llega a producción.**

Subheadline:

**Apps móviles, web y desktop desde la idea hasta el lanzamiento. Trabajo directamente contigo: estrategia, diseño, desarrollo, publicación y evolución del producto.**

CTA principal:

**Cuéntame qué quieres construir →**

CTA secundario:

**Ver productos reales**

Y debajo:

`4 productos publicados · Mobile / Web / Desktop · Respuesta <24h`

Esto explica mucho más rápido quién eres.

---

# 5. El hero necesita producto REAL, no decoración

Ahora aparece una especie de dashboard de Solennix con “Mes récord +42%” y “Tráfico 7 días”. ([Creapolis][1])

Visualmente puede funcionar.

Pero conceptualmente hay un peligro.

Si esos números son mock data, **parecen métricas comerciales reales**.

Yo cambiaría esa idea.

El hero debería mostrar una composición visual auténtica:

un iPhone con Subscription Guardian,

un Android con Pepinillo,

un browser con Solennix,

y quizá una ventana desktop.

No cuatro screenshots iguales.

Una composición editorial elegante.

Algo que diga inmediatamente:

> “Esta persona construye producto multiplataforma.”

Y cada screenshot debe venir del producto verdadero.

Nada genera más confianza que software real.

---

# 6. Después del hero: prueba inmediatamente

No pondría primero una larga explicación.

Pondría:

## “Esto ya está en producción.”

Con cuatro productos.

Solennix, Pepinillo, Películas, Subscription Guardian.

Cada tarjeta debería enseñar solo:

nombre,

frase de una línea,

plataformas,

estado,

una imagen espectacular,

y “Ver caso →”.

No diez badges.

No 25 tecnologías.

No demasiado texto.

Apple insiste en que una interfaz simple debe establecer claramente qué importa primero; el diseño no debe competir con el contenido. ([Apple Developer][2])

Ese principio encaja perfectamente aquí.

---

# 7. Después: prueba de capacidad, no lista de tecnologías

Actualmente dedicas bastante espacio a explicar mobile/web/desktop/IA.

Eso está bien, pero lo convertiría en:

## “De idea a producción.”

Y cuatro capacidades:

**Mobile**

Productos iOS y Android nativos o multiplataforma.

**Web**

Aplicaciones, SaaS, dashboards y sitios de alto rendimiento.

**Desktop**

Software para macOS, Windows y workflows especializados.

**AI**

IA integrada donde aporta valor medible.

Luego:

**Ver todos los servicios →**

La Home debe vender.

La página Servicios puede explicar.

---

# 8. Añadir algo que ahora falta muchísimo: PRUEBA SOCIAL

Tienes productos.

Eso es excelente.

Pero clientes quieren evidencias externas.

En cuanto tengas material auténtico, agregaría:

“Lo que dicen usuarios”.

“Resultados”.

“Clientes”.

“Reviews de App Store”.

“GitHub”.

“Productos descargados”.

“Usuarios activos”.

“Países”.

Pero únicamente datos reales.

Nunca inventaría:

“+10.000 usuarios”

“99% satisfacción”

“40% más conversión”

sin poder demostrarlo.

Si todavía no tienes testimonios de clientes, utiliza **reviews reales de tus aplicaciones**.

Eso convierte tus apps propias en social proof.

---

# 9. HOME: eliminaría repetición

Actualmente aparecen varias veces ideas como:

“sin intermediarios”,

“una persona”,

“yo escribo el código”,

“producto real”,

“te respondo rápido”.

Todas son buenas.

Pero repetidas demasiado empiezan a sonar defensivas.

Hay que decirlas una vez, muy bien.

Después demostrarlas.

Por ejemplo:

## Una relación directa

**Hablas con la persona que diseña y desarrolla tu producto.**

Y debajo:

`Tu repositorio desde el día 1`

`Demo semanal`

`Documentación incluida`

`30 días de soporte`

Eso convierte el “soy solo” en una ventaja operacional.

---

# 10. El mayor miedo de contratar a una persona sola

Esto es importante.

Tu argumento actual dice repetidamente:

> “Una persona. Sin agencia. Sin intermediarios.”

La página About lo convierte incluso en la idea central. ([Creapolis][7])

Pero un cliente puede pensar automáticamente:

> “¿Y si se enferma?”

> “¿Quién mantiene esto?”

> “¿Qué sucede si desaparece?”

> “¿Mi código depende completamente de él?”

Hay que responder esa objeción antes de que aparezca.

Yo agregaría:

## Sin dependencia del proveedor.

**El código vive en tu repositorio.**

**Infraestructura en tus cuentas.**

**Documentación de arquitectura.**

**CI/CD reproducible.**

**Backups y credenciales bajo tu control.**

**Handover documentado.**

Eso cambia radicalmente la percepción.

De:

“freelancer que puede desaparecer”

a:

“estudio pequeño con proceso profesional”.

---

# 11. PROYECTOS — esta página debería convertirse en CASE STUDIES

La página actual dice:

> “Apps que demuestran mi capacidad.”

Es bastante buena como concepto. ([Creapolis][8])

Pero yo cambiaría “Proyectos” visualmente a:

# Trabajo seleccionado

o

# Productos que he llevado a producción

Cada proyecto debería mostrar cuatro dimensiones:

**Problema**

**Solución**

**Mi papel**

**Resultado**

Ahora las cards explican principalmente qué hace cada app.

Para vender desarrollo, necesitamos que también expliquen:

> ¿qué decisiones tomó Tiago?

> ¿qué problema técnico resolvió?

> ¿por qué eligió determinada arquitectura?

> ¿qué aprendió en producción?

> ¿qué resultado tuvo?

Eso demuestra seniority muchísimo mejor que listar tecnologías.

---

# 12. SOLENNIX — debe ser tu case study B2B estrella

Solennix es probablemente el caso con mayor capacidad de vender servicios porque muestra:

CRM,

cotizaciones,

inventario,

dashboard,

mobile,

web,

suscripciones,

producto B2B.

La página ya comunica esa amplitud. ([Creapolis][9])

Pero actualmente parece más **landing comercial de Solennix** que **case study Creapolis**.

Yo haría las dos cosas.

## Primer bloque

Solennix.

**Operating system for event businesses.**

Screenshot grande.

App Store / Play Store / Web.

## Después

### El problema

Organizadores manejando eventos entre WhatsApp, Excel, notas y herramientas separadas.

### La decisión

Unificar operación sin crear un ERP gigantesco.

### Lo que construí

CRM.

Events.

Inventory.

Quotes.

Contracts.

Analytics.

Mobile + web.

### Ingeniería

Arquitectura.

sync.

auth.

database.

PDF.

notifications.

stores.

### Producto

Cómo se priorizaron funciones.

### Resultado

Datos reales cuando existan.

### Próxima evolución

Roadmap.

Y al final:

## ¿Necesitas construir un producto B2B?

**Hablemos →**

Eso vende muchísimo mejor.

---

# 13. Solennix tiene un detalle importante: pricing

Ahora aparece:

`$149/mes`

pero no queda claro inmediatamente si son MXN, USD u otra moneda. ([Creapolis][9])

Eso debe ser inequívoco.

También aparece “Enterprise” y luego “Business”.

Elegir uno.

Pequeños detalles = percepción de calidad.

---

# 14. PEPINILLO — convertirlo en un case study de product craft

Pepinillo tiene una historia muy buena:

> “Productividad sin ceremonia.”

y:

> “Construida con criterio, no con un checklist.”

([Creapolis][4])

Eso tiene personalidad.

Aquí enfatizaría:

**Focus experience**

**Offline-first/local-first**

**background work**

**notifications**

**timers**

**state management**

**performance**

**native platform decisions**

Y sobre todo:

## Por qué decidiste hacer ciertas cosas nativas

Eso sirve como demostración técnica excelente.

Pero primero hay que solucionar las contradicciones Android/iOS que comenté.

---

# 15. PELÍCULAS — necesita más diferenciación visual

La página está bien estructurada y explica catálogo, listas, búsqueda y recomendaciones. ([Creapolis][10])

Pero como portfolio tiene un riesgo:

“app de películas” es un proyecto muy común entre desarrolladores.

Hay que demostrar que **no es un tutorial de TMDB**.

Por eso destacaría:

cache,

offline,

image pipeline,

performance,

state,

search architecture,

recommendation logic,

deep links,

Android platform features.

Y mostraría métricas técnicas si existen:

cold launch,

cache hit rate,

APK size,

crash-free sessions,

rendimiento scroll.

Eso convierte:

“hice una app de películas”

en:

“sé diseñar una experiencia media-heavy rápida y escalable”.

---

# 16. SUBSCRIPTION GUARDIAN — puede ser visualmente tu app estrella

Por el tipo de producto, esta puede ser la página que más aproveche una estética premium.

La propuesta de privacidad local, CloudKit, SwiftUI, widgets, Face ID y funcionamiento sin servidores es muy potente. ([Creapolis][6])

Visualmente haría algo diferente al resto.

Mucho espacio.

Screenshots iPhone grandes.

Burn-rate animado.

Widget de Lock Screen.

Una sección:

## Your money. Your device.

Y después:

**No bank connection**

**No Creapolis account**

**No tracking of your financial data**

**iCloud private sync**

Es un gran showcase de producto Apple-first.

Pero arreglaría primero la inconsistencia $4.99 vs Gratis.

---

# 17. Las páginas Guide / Tips / Support son una MUY buena idea

Aquí tienes una oportunidad que no desperdiciaría.

Pepinillo y Subscription Guardian ya tienen:

`guide`

`tips`

`feedback/support`

([Creapolis][5])

Yo formalizaría esto como:

# Product Hub

Por ejemplo:

`/apps/pepinillo/`

`/apps/pepinillo/features/`

`/apps/pepinillo/guide/`

`/apps/pepinillo/tips/`

`/apps/pepinillo/support/`

`/apps/pepinillo/changelog/`

`/apps/pepinillo/privacy/`

Esto tiene dos beneficios.

Uno: SEO para cada producto.

Dos: soporte profesional.

Incluso agregaría:

**Changelog**

**Known issues**

**Release notes**

**Roadmap público selectivo**

Eso genera confianza y contenido para redes sociales.

---

# 18. SERVICIOS — esta página tiene mucho valor, pero necesita madurar el tono

La página es bastante completa. Describe mobile, web, desktop, IA, stacks, entregables y proceso. ([Creapolis][11])

Pero hay frases que yo quitaría.

Por ejemplo la crítica a WordPress:

> “ese barco ya se hundió…”

Puede resultar divertida entre developers, pero un cliente quizá tiene una empresa que depende de WordPress.

No quieres decirle indirectamente:

> “La tecnología que elegiste es basura.”

Mejor:

**“Cuando WordPress deja de responder a las necesidades de rendimiento, seguridad o mantenimiento, puedo migrarlo a una arquitectura moderna preservando URLs y SEO.”**

Más profesional.

Mismo mensaje.

Cero agresividad.

---

# 19. Servicios no debería vender tecnologías primero

Un cliente no compra:

Flutter.

Tauri.

Rust.

Astro.

LangChain.

Compra:

**un MVP**

**un SaaS**

**una app**

**una automatización**

**una modernización**

**una auditoría**

Por eso reorganizaría Servicios en dos capas.

Primero:

## Lo que puedo resolver

Build a new product.

Modernize an existing product.

Take over an existing codebase.

Add AI to a workflow.

Ship mobile.

Build internal software.

Después:

## Cómo lo construyo

Aquí sí tecnologías.

---

# 20. Crearía servicios “comprables”

Actualmente todo parece proyecto custom.

Eso genera fricción.

Yo introduciría ofertas claras:

### Product Discovery Sprint

Arquitectura + scope + roadmap + prototype.

### MVP Build

Producto funcional para validar.

### Codebase Rescue

Auditoría + estabilización + roadmap.

### AI Opportunity Audit

Identificar automatizaciones útiles.

### Continuous Product Development

Retainer mensual para evolución.

Esto permite que alguien piense:

> “Eso es exactamente lo que necesito.”

en lugar de:

> “Tengo que escribirle para saber qué vende.”

---

# 21. ABOUT — hay autenticidad, pero ahora vende demasiado “solo developer”

La página comienza:

> “Una persona. Un estudio. Cero intermediarios.”

([Creapolis][7])

Es memorable.

La conservaría.

Pero después cambiaría el equilibrio.

Actualmente hay expresiones como:

“hobby obsesivo”

“la infraestructura me la enseñó equivocarme”

“la IA me la está enseñando…”

Estas frases son honestas y simpáticas, pero ahora que quieres buscar clientes, necesitamos proyectar:

**curiosidad + experiencia**

y no:

**todavía estoy aprendiendo a hacer esto.**

Todo buen developer aprende continuamente.

Pero el cliente te está pagando para reducir incertidumbre.

---

# 22. Nueva estructura de About

Hero:

**Una persona. Un estudio. Responsabilidad completa.**

Después una foto profesional tuya.

Esto es importante.

No avatar.

No ilustración.

Una fotografía buena, simple, real.

Luego:

## Cómo llegué aquí

Historia corta.

## Cómo trabajo

Principios.

## Cómo reduzco riesgo

repo, documentation, backups, QA.

## Qué construyo

productos reales.

## Lo que creo sobre software

una especie de manifesto pequeño.

## Fuera del código

Una línea humana.

Eso crea conexión.

No necesitas convertir About en CV.

---

# 23. BLOG — tienes un activo enorme mal aprovechado

La página muestra **127 artículos**. ([Creapolis][12])

Eso es muchísimo contenido.

Pero hoy parece principalmente un archivo de posts.

Debería convertirse en una máquina de:

**autoridad**

→ **SEO**

→ **LinkedIn**

→ **newsletter**

→ **clientes**

→ **usuarios**

Hay una oportunidad enorme aquí.

---

# 24. El Blog necesita categorías editoriales, no una nube enorme de tags

Ahora aparecen muchos tags con contadores:

Flutter, Dart, desarrollo, mobile, UI, web, desktop, etc. ([Creapolis][12])

Yo crearía cinco colecciones editoriales:

**Engineering**

**Product**

**Mobile**

**AI**

**Building Creapolis**

Los tags todavía pueden existir internamente.

Pero el usuario necesita entender dónde entrar.

---

# 25. Hay además un problema de percepción de actualidad

A fecha de agosto de 2026, el Blog muestra como artículo más reciente uno del **9 de febrero de 2026**. ([Creapolis][12])

Para una empresa que quiere presentarse como activa en desarrollo e IA, seis meses sin publicaciones recientes puede dar una sensación equivocada.

No necesitas publicar diariamente.

Yo apuntaría a:

**2 artículos importantes/mes**

y utilizar cada artículo para crear:

LinkedIn post,

X thread,

short video,

carousel,

newsletter,

GitHub example.

Un artículo = cinco piezas de marketing.

---

# 26. ARTÍCULO INDIVIDUAL — necesita un rediseño fuerte

Revisé como ejemplo el artículo largo de Shift-Left.

Tiene muchísimo contenido y supera ampliamente las mil líneas en la representación textual. ([Creapolis][13])

Pero no encontré un índice/TOC visible, newsletter, compartir o artículos relacionados. Al final sí existe autor y CTA comercial. ([Creapolis][13])

Para artículos largos propondría desktop:

```text
┌────────────────────────────────────────────────────────────┐
│ Header                                                     │
├───────────────┬───────────────────────────┬────────────────┤
│ TOC sticky    │ Article                   │ Meta / actions │
│               │                           │                │
│ 1 Intro       │                           │ Copy link      │
│ 2 Architecture│                           │ LinkedIn       │
│ 3 Example     │                           │ GitHub         │
│ ...           │                           │                │
└───────────────┴───────────────────────────┴────────────────┘
```

En mobile el TOC pasa a collapsible.

---

# 27. Cada artículo debería tener CTA contextual

No pongas siempre:

> “¿Necesitas ayuda? Hablemos.”

Eso es demasiado genérico.

Un artículo Flutter:

**¿Tu app Flutter está creciendo demasiado? Puedo auditar arquitectura y performance.**

Un artículo AI:

**¿Quieres saber dónde IA puede reducir trabajo en tu empresa?**

Un artículo Astro:

**¿Tu sitio tarda demasiado en cargar? Puedo migrarlo a una arquitectura estática moderna.**

Eso convierte contenido en negocio.

---

# 28. CONTACTO — muy cerca, pero hay que arreglar la identidad

La página actual tiene buena información:

respuesta <24h,

qué ocurre después,

presupuesto,

tipo de proyecto,

FAQ. ([Creapolis][14])

Pero aparece:

> “Cuéntanos”

> “Respondemos”

> “Dos minutos tuyos, 24 horas nuestras”

cuando todo el resto de tu posicionamiento insiste en:

> “Soy una persona.”

Eso hay que unificar.

Yo pondría:

# Cuéntame qué quieres construir.

**Leo personalmente cada mensaje y respondo normalmente el mismo día hábil.**

---

# 29. Simplificaría el formulario

Mantendría:

Nombre.

Email.

Qué quieres construir.

Presupuesto aproximado.

Descripción.

Pero cambiaría presupuesto de:

`<$10k`

a algo más útil comercialmente:

`Menos de $5k`

`$5k–15k`

`$15k–30k`

`$30k–60k`

`$60k+`

`No lo sé todavía`

dependiendo de los proyectos que realmente quieres captar.

Si solamente quieres proyectos grandes, mantén el filtro actual.

Pero si ahora quieres comenzar a captar trabajos, tener un escalón menor abre oportunidades para:

auditorías,

consultoría,

prototipos,

rescues,

migraciones.

---

# 30. Añadiría Calendar después del formulario, no antes

No convertiría el hero entero en “Book a call”.

Primero recopila contexto.

Después del envío:

**Gracias. Si quieres adelantar el proceso, reserva 30 minutos.**

Así llegan llamadas mejor calificadas.

---

# 31. PRIVACIDAD, TÉRMINOS y ELIMINAR CUENTA

Visualmente deberían ser extremadamente simples.

Nada de decoración.

Ancho aproximado 720–780px.

TOC lateral desktop.

Tipografía impecable.

Fecha actualizada.

Headings claros.

La privacidad actual intenta cubrir sitio y múltiples productos. ([Creapolis][15])

Aquí haría una recomendación importante:

## Crear apéndices por producto.

Porque Solennix, Pepinillo, Películas y Subscription Guardian no procesan necesariamente los mismos datos.

Y eso ya empieza a provocar inconsistencias.

Por ejemplo, Subscription Guardian afirma no necesitar cuenta ni servidores propios. ([Creapolis][16])

Una privacy policy universal diciendo genéricamente qué almacenan “las apps” termina siendo difícil de mantener.

Además, antes de presentar afirmaciones como cumplimiento de GDPR/CCPA o políticas globales, recomendaría revisión legal profesional. No basta con una implementación web elegante.

---

# 32. Ojo con Serene y la política global

La web menciona Serene como producto relacionado con ansiedad, burnout y depresión. ([Creapolis][8])

Mientras la privacidad actual afirma que no se recopilan determinados datos sensibles, incluido salud. ([Creapolis][15])

Puede no ser contradicción hoy porque Serene aún está en desarrollo.

Pero antes de lanzarlo necesitarás **una política específica del producto y revisión seria de tratamiento de datos**.

No dejaría ese tema cubierto por una política genérica.

---

# 33. INTERNACIONALIZACIÓN — actualmente parece incompleta

Tu Home inglesa está traducida.

Pero el dashboard que aparece dentro conserva:

“INGRESOS”

“MES RÉCORD”

“TRÁFICO”.

Y los artículos mostrados siguen en español. ([Creapolis][17])

Portugués tiene el mismo problema. ([Creapolis][18])

Eso hace que la traducción se sienta superficial.

Tienes dos alternativas profesionales.

## Opción que recomiendo

Traducir completamente:

Home.

Services.

About.

Projects.

Contact.

Product pages.

Pero mantener el Blog originalmente en español.

En EN/PT simplemente mostrar:

**Articles currently published in Spanish →**

No fingir que están localizados.

Es mejor una traducción parcial declarada que una traducción visualmente incompleta.

---

# 34. Elegir una voz en español

Actualmente hay mezcla de:

“contame”

“querés”

“hablás”

“cuéntanos”

“puedes”

“te damos”.

Yo escogería español LATAM neutral, especialmente estando Creapolis en Monterrey.

Por ejemplo:

“Cuéntame”

“quieres”

“hablas”

“puedes”

“te respondo”

No perderás personalidad.

La personalidad debe venir de **cómo dices las cosas**, no de variar conjugaciones accidentalmente.

---

# 35. HEADER nuevo

Lo haría flotante pero extremadamente simple.

Desktop:

```text
C Creapolis        Work   Services   Notes   About       ES⌄   Start a project
```

Tras scroll:

una superficie ligeramente translúcida.

Nada más.

Apple recomienda los materiales translúcidos como una capa funcional para controles/navegación, no como material decorativo repetido sobre todo el contenido. ([Apple Developer][19])

Ese es exactamente el criterio que usaría.

**Glass solo navbar/modales.**

No veinte glass cards.

---

# 36. FOOTER nuevo

Actualmente el footer funciona, pero tiene demasiada duplicación y el enlace “Apps” necesita corregirse.

Haría:

```text
Creapolis
Independent product studio.

Build
Mobile
Web
Desktop
AI

Products
Solennix
Pepinillo
Películas
Subscription Guardian

Explore
Work
Notes
About
Contact

Elsewhere
LinkedIn
GitHub
X

© Creapolis
Privacy · Terms
```

Y un gran cierre arriba:

# Have something worth building?

**Tell me about it →**

---

# 37. Diseño visual concreto que le daría a Codex

No usaría blanco puro constante.

Base light:

`oklch(98% 0.006 260)`

Texto:

`oklch(18% 0.015 260)`

Surface:

`oklch(96% 0.008 260)`

Accent principal:

un azul-violeta profundo.

No utilizaría cinco colores de marca.

Cada producto sí puede tener su accent:

Solennix → cálido.

Pepinillo → verde fresco.

Películas → rojo/cinema.

Guardian → azul/violeta financiero.

Creapolis permanece neutral.

Eso permite que **los productos den color a la marca**.

---

# 38. Tipografía

No imitaría SF Pro.

Eso sería justamente acercarnos demasiado a Apple.

Usaría una familia propia.

Mi combinación:

**Inter Variable / Geist** para UI y texto.

**JetBrains Mono** únicamente para elementos técnicos, metadata y stack.

El efecto premium vendrá más de:

line-height,

tracking,

jerarquía,

espaciado,

peso,

anchos máximos,

que de buscar una fuente extravagante.

---

# 39. Escala tipográfica

Hero desktop:

`clamp(3.8rem, 7vw, 6.5rem)`

Hero mobile:

aprox. `3rem`.

H2:

`clamp(2.4rem, 4vw, 4.5rem)`

Body principal:

18–20px.

Body normal:

16–18px.

Captions:

13–14px.

Pero pocas variantes.

No 14 estilos tipográficos distintos.

---

# 40. Grid

Usaría:

`max-width: 1280px`

12 columnas desktop.

padding 24px mobile.

40px tablet.

64px desktop.

Y mucho espacio vertical.

Sections aproximadamente:

96–160px desktop.

64–96px mobile.

El “look Apple” muchas veces no viene de las sombras.

Viene de tener el valor de **no llenar cada hueco**.

---

# 41. Cards

Ahora evitaría el típico:

`border-radius: 24px`

en absolutamente todo.

Usaría tres niveles:

12px para controles.

20px para cards.

28–32px para grandes product stages.

Algunas secciones ni siquiera tendrán card.

Solo texto + imagen + espacio.

Eso hará que los cards importantes destaquen.

---

# 42. Motion: aquí sí tomaría algo de Google

Material 3 Expressive pone mucho énfasis actual en movimiento y componentes adaptativos. ([Material Design][3])

Para Creapolis:

hover 160ms.

transiciones 220–280ms.

page transitions 300–400ms.

screenshots con pequeñas transformaciones.

parallax mínimo.

No scroll-jacking.

No cursor custom.

No texto entrando cada tres segundos.

No animaciones que retrasen lectura.

Y siempre:

```css
@media (prefers-reduced-motion: reduce) {
  /* disable non-essential motion */
}
```

---

# 43. No haría una web “bento”

Esto merece decirlo explícitamente.

El bento grid fue una estética atractiva.

Pero ahora miles de SaaS, portfolios y páginas generadas por IA parecen iguales:

cards,

gradients,

glows,

badges,

bento,

floating icons.

Creapolis debería tener más aspecto de:

**editorial product studio**

que:

**AI SaaS landing template #472**.

Hero editorial.

Producto grande.

Texto grande.

Screenshots reales.

Espacio.

Detalles.

Eso envejecerá mejor.

---

# 44. Astro — aquí tenemos una enorme ventaja

Astro encaja muy bien con este proyecto porque la mayoría del sitio es contenido, portfolio y marketing.

Su sistema de Content Collections está precisamente pensado para conjuntos estructurados como artículos y productos, con schemas, TypeScript e introspección segura. ([Astro Documentation][20])

Yo reorganizaría aproximadamente así:

```text
src/
├── components/
│   ├── ui/
│   │   ├── Button.astro
│   │   ├── Badge.astro
│   │   ├── Icon.astro
│   │   └── Container.astro
│   │
│   ├── layout/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   └── LanguageSwitcher.astro
│   │
│   ├── sections/
│   │   ├── Hero.astro
│   │   ├── ProductShowcase.astro
│   │   ├── ServicesPreview.astro
│   │   ├── Process.astro
│   │   ├── SocialProof.astro
│   │   └── FinalCTA.astro
│   │
│   ├── project/
│   │   ├── ProjectHero.astro
│   │   ├── ProjectGallery.astro
│   │   ├── ProjectMetrics.astro
│   │   ├── ProjectStory.astro
│   │   └── StoreButtons.astro
│   │
│   └── blog/
│       ├── ArticleCard.astro
│       ├── ArticleTOC.astro
│       ├── ArticleAuthor.astro
│       └── RelatedArticles.astro
│
├── layouts/
│   ├── BaseLayout.astro
│   ├── MarketingLayout.astro
│   ├── ProjectLayout.astro
│   ├── ProductSupportLayout.astro
│   ├── ArticleLayout.astro
│   └── LegalLayout.astro
│
├── content/
│   ├── projects/
│   ├── blog/
│   ├── services/
│   └── testimonials/
│
├── data/
│   ├── site.ts
│   ├── navigation.ts
│   ├── social.ts
│   └── technologies.ts
│
├── i18n/
│   ├── es.ts
│   ├── en.ts
│   └── pt.ts
│
└── pages/
    └── [lang]/
        ├── index.astro
        ├── servicios.astro
        ├── sobre.astro
        ├── contacto.astro
        ├── proyectos/
        │   ├── index.astro
        │   └── [slug].astro
        └── blog/
            ├── index.astro
            └── [...slug].astro
```

---

# 45. El contenido de productos NO debería estar hardcoded en páginas

Este cambio evitaría muchos de los errores que ahora encontré.

Tendrías una estructura aproximadamente:

```ts
{
  name: "Subscription Guardian",
  slug: "subscription-guardian",
  status: "live",

  platforms: ["ios", "ipad", "macos"],

  pricing: {
    type: "one_time",
    amount: 4.99,
    currency: "USD"
  },

  stores: {
    appStore: "...",
    playStore: null
  },

  features: [...],

  stack: [...],

  locale: "es",

  featured: true
}
```

Entonces la landing, Projects, Home, footer y support pages utilizan **la misma fuente de verdad**.

No vuelves a tener:

“$4.99 aquí”

y:

“Gratis allá”.

---

# 46. Igual con las estadísticas globales

No escribir:

`4 apps`

a mano en diez páginas.

El código debe calcular:

```ts
const liveProjects = projects.filter(
  project => project.status === "live"
);
```

y mostrar:

```text
{liveProjects.length} productos publicados
```

Cuando publiques el quinto:

toda la web se actualiza.

Este detalle es exactamente el tipo de cosas que un buen sistema debe resolver.

---

# 47. Astro Content Collections también para Blog

Los 127 artículos son claramente candidatos ideales.

Schemas obligatorios:

```text
title
description
publishedAt
updatedAt
author
category
tags
locale
featured
cover
seoTitle
seoDescription
canonical
draft
```

Astro recomienda Content Collections precisamente cuando varios contenidos comparten una estructura, porque permiten validación y type safety. ([Astro Documentation][20])

---

# 48. SEO técnico

Codex debería revisar:

canonical.

hreflang `es`, `en`, `pt`.

sitemap.

robots.txt.

RSS.

Open Graph.

Twitter cards.

Article schema.

SoftwareApplication schema.

Person/Organization schema.

BreadcrumbList.

404.

redirects.

Y particularmente:

`/`

vs

`/es/`.

El crawler está viendo ambos con contenido equivalente. ([Creapolis][21])

Preferiría:

`/ → /es/`

con redirect.

Y:

`/en/`

`/pt/`

como idiomas alternativos.

---

# 49. Normalizar Solennix

Ahora tienes:

`/es/solennix/`

mientras las demás viven en:

`/es/proyectos/pepinillo/`

`/es/proyectos/peliculas/`

`/es/proyectos/subscription-guardian/`

([Creapolis][9])

Movería Solennix a:

`/es/proyectos/solennix/`

y pondría:

`301 /es/solennix → /es/proyectos/solennix/`

Mucho más limpio.

---

# 50. Performance: el “WOW” no puede costar velocidad

No perseguiría un Lighthouse 100 únicamente por vanidad.

Pero sí exigiría Core Web Vitals buenos.

Google sigue recomendando aproximadamente:

LCP ≤ 2.5 s,

INP ≤ 200 ms,

CLS ≤ 0.1,

medidos en percentil 75. ([web.dev][22])

Con Astro esto debería ser perfectamente alcanzable.

Reglas para Codex:

imágenes con `astro:assets`.

AVIF/WebP.

`width` y `height` siempre.

preload solo hero/LCP.

fuentes self-hosted.

JavaScript mínimo.

islands únicamente donde exista interacción.

lazy load fuera del viewport.

cero librerías enormes solo para una animación.

---

# 51. Y cuidaría especialmente el hero

Google recomienda que el recurso LCP pueda descubrirse cuanto antes desde el HTML inicial y no retrasar su carga innecesariamente. ([web.dev][23])

Por eso no haría el hero mediante:

React client-side.

canvas pesado.

video 15 MB.

three.js.

animation library gigante.

Se puede hacer algo precioso con:

HTML.

CSS.

SVG.

imágenes optimizadas.

150 líneas de JS.

No necesitamos construir una demo de GPU para demostrar que sabemos programar.

---

# 52. Integración con redes sociales

Aquí la web puede ayudarte muchísimo.

Cada Project debería tener Open Graph espectacular.

Cada artículo también.

Cuando compartas:

“Cómo construí sync offline-first para X”

LinkedIn debería mostrar automáticamente una tarjeta Creapolis profesional.

Crearía también una sección:

## Build Notes

Posts cortos:

“Lo que aprendí esta semana.”

“Por qué eliminé esta feature.”

“Cómo resolví X.”

“No usaría Flutter para esto, y esta es la razón.”

Ese tipo de contenido es muchísimo más diferenciador que:

“5 tips para aprender Flutter”.

---

# 53. Crearía una página nueva: `/now/` o `/lab/`

Algo como:

# Creapolis Lab

## Building now

Solennix v…

Pepinillo iOS…

Serene…

experimentos…

último commit público / changelog cuando corresponda.

Esto alimenta directamente redes.

Y demuestra algo muy poderoso:

**Creapolis está vivo.**

---

# 54. Crearía otra página cuando tengas material: `/work/`

No necesariamente solo tus aplicaciones.

Cuando hagas trabajos para clientes:

```text
Selected Work

Own products
Client products
Technical engagements
Audits
Migrations
```

Incluso con NDA:

> “B2B logistics platform — React / PostgreSQL — NDA”

Problema.

Qué hiciste.

Qué mejoró.

Sin revelar empresa.

---

# 55. Qué NO debe hacer Codex

Esto para mí es importantísimo.

No quiero que Codex interprete “hacerlo WOW” como:

* poner gradients en todo;
* agregar glassmorphism a todas las cards;
* poner blobs detrás de cada título;
* crear un bento grid gigante;
* animar cada texto al entrar;
* introducir Framer Motion/React sin necesidad;
* duplicar componentes para ES/EN/PT;
* hardcodear información de productos;
* inventar testimonios;
* inventar métricas;
* inventar clientes;
* inventar downloads;
* reemplazar contenido auténtico por marketing genérico;
* copiar layout, tipografía o visuales de Apple.

Esa es la única lista que realmente le entregaría como “prohibiciones”.

---

# 56. Orden de ejecución que le daría a Codex

Yo no empezaría diciendo:

> “Rediseña creapolis.dev.”

Eso permite demasiadas decisiones arbitrarias.

Lo dividiría en etapas.

### Fase 1 — Data integrity

Corregir inconsistencias de productos, precios, plataformas, links, traducciones, footer y rutas.

### Fase 2 — Foundation

Design tokens.

Typography.

Grid.

Button.

Header.

Footer.

Container.

Motion.

Accessibility.

### Fase 3 — Marketing core

Home.

Services.

Projects.

About.

Contact.

### Fase 4 — Product system

Project template.

Product navigation.

Guide.

Tips.

Support.

Changelog.

### Fase 5 — Content

Blog index.

Article template.

TOC.

Related posts.

Contextual CTA.

### Fase 6 — SEO/performance

Canonical.

hreflang.

OG.

structured data.

sitemap.

Core Web Vitals.

Analytics.

---

# 57. Definition of Done que pondría en el PRD

No consideraría el rediseño terminado solo porque “se ve bonito”.

Debe cumplir:

Home permite entender en 5–8 segundos qué hace Creapolis.

Existe CTA distinto para contratar y para descargar productos.

Ninguna plataforma/precio/estado se contradice entre páginas.

ES/EN/PT utilizan el mismo modelo de contenido.

Todo producto tiene una única fuente de verdad.

Todos los CTAs funcionan.

Todos los formularios tienen estados loading/success/error.

Navegación completa por teclado.

`prefers-reduced-motion`.

dark mode si decides conservarlo.

responsive 320px → ultrawide.

SEO metadata por página.

OG image por página importante.

Core Web Vitals dentro de objetivos.

404 profesional.

redirects antiguos.

analytics de conversión.

---

# 58. Eventos que mediría

Para saber si el rediseño realmente funciona:

`start_project_click`

`contact_form_started`

`contact_form_completed`

`project_viewed`

`service_viewed`

`app_store_click`

`play_store_click`

`blog_service_cta_click`

`linkedin_click`

`github_click`

`language_changed`

Después puedes responder:

“¿Qué producto convierte mejor?”

“¿Qué artículo produce leads?”

“¿Qué servicio recibe más interés?”

“¿La gente abre About antes de contactarme?”

Diseño profesional también significa poder medirlo.

---

# 59. Mi propuesta final de navegación

Desktop:

**Creapolis**

`Work`

`Services`

`Notes`

`About`

`ES`

**Start a project**

Yo eliminaría “Contacto” del menú principal porque el botón ya cumple esa función.

Y sustituiría “Proyectos” por “Work” o “Trabajo”.

“Trabajo” se siente más profesional y permite incluir mañana:

apps propias,

clientes,

consultoría,

experimentos destacados.

---

# 60. Mi propuesta de arquitectura de negocio para la Home

Así la imagino de arriba abajo:

**Hero**

↓

**4 productos reales**

↓

**Selected case study — Solennix**

↓

**Capabilities**

↓

**How I work**

↓

**Proof / reviews / metrics reales**

↓

**About Tiago**

↓

**Latest Notes**

↓

**Final CTA**

Es una narrativa.

No una colección de componentes.

Eso es una diferencia enorme.

---

# 61. Lo que conservaría de la web actual

Esto también es importante: **no quiero que Codex destruya lo que ya funciona**.

Conservaría el concepto:

“producto real”.

La franqueza del copy.

El foco en una persona.

Las aplicaciones propias.

El proceso visible.

La idea de taller/building in public.

La mezcla de ingeniería + producto.

El enfoque multiplataforma.

La promesa de contacto directo.

Y especialmente frases como:

> “Construida con criterio, no con un checklist.”

Ese tipo de lenguaje tiene identidad. ([Creapolis][4])

No lo sustituiría por:

> “Innovative digital experiences that empower businesses.”

Eso mataría completamente Creapolis.

---

# 62. Cómo debería sentirse después del rediseño

Cuando alguien entre no quiero que piense:

> “Qué web tan bonita.”

Quiero esta secuencia mental:

**3 segundos**

“Esta persona hace productos serios.”

**10 segundos**

“Ah, además tiene varios publicados.”

**30 segundos**

“Entiende producto además de programar.”

**2 minutos**

“Su proceso es claro y puedo confiarle un proyecto.”

Y después:

**Start a project.**

Ese es el verdadero “WOW”.

Apple lo explica muy bien en sus principios actuales: delight no es añadir confeti; aparece como resultado de hacer bien intención, claridad, familiaridad, flexibilidad y detalle. ([Apple Developer][2])

Esa debería ser la filosofía del rediseño.

---

# 63. Lo que yo haría ahora contigo

Este review ya me deja una dirección bastante clara.

El siguiente paso más útil **no sería empezar a modificar páginas al azar**.

Yo convertiría todo esto en un documento técnico extremadamente concreto para Codex:

**“CREAPOLIS V2 — Product Website Redesign PRD”**

con:

arquitectura Astro definitiva,

design tokens,

componentes,

estructura de carpetas,

modelo de Content Collections,

routing ES/EN/PT,

wireframe textual completo de cada página,

copy recomendado de cada sección,

responsive behavior,

motion system,

SEO,

analytics,

performance,

accessibility,

acceptance criteria,

y tareas implementables por fases.

Eso permitiría decirle a Codex básicamente:

> “Implementa esta especificación. No inventes diseño ni requisitos.”

Y ahí sí podemos llegar a una web muy, muy profesional sin que el agente se desvíe hacia una plantilla genérica de IA.

**Mi recomendación sería hacer ese PRD antes de tocar el código**, y hacerlo página por página empezando por **Home → Work → Project Template → Services → About → Contact → Blog**, porque esas son las páginas que primero van a convertir visitas en trabajos.

También te diría algo importante: **la base actual está bastante más cerca de una buena web profesional de lo que quizá imaginas**. El salto grande no necesita más componentes; necesita menos inconsistencias, mejor jerarquía, mejores imágenes reales, un sistema visual más disciplinado y convertir tus productos en evidencia de capacidad profesional. ([Creapolis][1])

Cuando publiques la versión nueva, tiene mucho sentido volver a revisarla después de unos días con datos reales de rendimiento y conversión.

[1]: https://creapolis.dev/es/ "Creapolis — Software que transforma ideas en productos"
[2]: https://developer.apple.com/design/human-interface-guidelines/design-principles?utm_source=chatgpt.com "Design principles | Apple Developer Documentation"
[3]: https://m3.material.io/?region=japan&utm_source=chatgpt.com "Material Design 3 - Google's latest open source design system"
[4]: https://creapolis.dev/es/proyectos/pepinillo "Pepinillo — Creapolis"
[5]: https://creapolis.dev/es/proyectos/pepinillo/guide "Guía rápida — Pepinillo — Creapolis"
[6]: https://creapolis.dev/es/proyectos/subscription-guardian "Subscription Guardian — Creapolis"
[7]: https://creapolis.dev/es/sobre "Sobre — Creapolis"
[8]: https://creapolis.dev/es/proyectos "Proyectos — Creapolis"
[9]: https://creapolis.dev/es/solennix "Solennix — Creapolis"
[10]: https://creapolis.dev/es/proyectos/peliculas "Películas — Creapolis"
[11]: https://creapolis.dev/es/servicios "Servicios — Creapolis"
[12]: https://creapolis.dev/es/blog "Notas — Creapolis"
[13]: https://creapolis.dev/es/blog/ciberseguridad-shift-left-2026-fin-a-la-fatiga-de-alertas-con-ia-y-vex "Ciberseguridad Shift-Left 2026: Fin a la fatiga de alertas con IA y VEX — Creapolis"
[14]: https://creapolis.dev/es/contacto "Contacto — Creapolis"
[15]: https://creapolis.dev/privacidad "Aviso de privacidad — Creapolis"
[16]: https://creapolis.dev/es/proyectos/subscription-guardian/feedback "Feedback y soporte — Subscription Guardian — Creapolis"
[17]: https://creapolis.dev/en "Creapolis — Software que transforma ideas en productos"
[18]: https://creapolis.dev/pt "Creapolis — Software que transforma ideas en productos"
[19]: https://developer.apple.com/design/human-interface-guidelines/materials?changes=l_8_1&utm_source=chatgpt.com "Materials | Apple Developer Documentation"
[20]: https://docs.astro.build/it/guides/content-collections/?utm_source=chatgpt.com "Content collections | Docs"
[21]: https://creapolis.dev/ "Creapolis — Software que transforma ideas en productos"
[22]: https://web.dev/articles/vitals?hl=es-419&utm_source=chatgpt.com "Web Vitals  |  Articles  |  web.dev"
[23]: https://web.dev/articles/optimize-lcp?utm_source=chatgpt.com "Optimize Largest Contentful Paint  |  Articles  |  web.dev"
