export const languages = {
  es: 'Español',
  en: 'English',
  pt: 'Português',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'es';

export const ui = {
  es: {
    'nav.projects': 'Proyectos',
    'nav.services': 'Servicios',
    'nav.about': 'Sobre',
    'nav.blog': 'Blog',
    'nav.contact': 'Contacto',
    'nav.cta': 'Iniciar proyecto',
    'nav.menu': 'Menú',
    'nav.lang': 'Idioma',

    'footer.site': 'Sitio',
    'footer.home': 'Inicio',
    'footer.apps': 'Apps',
    'footer.services': 'Servicios',
    'footer.about': 'Sobre',
    'footer.blog': 'Blog',
    'footer.projects': 'Proyectos',
    'footer.all': 'Todos',
    'footer.contact': 'Contacto',
    'footer.form': 'Formulario',
    'footer.tagline':
      'Estudio de una persona. Diseño, codeo y publico software que la gente de verdad usa.',
    'footer.location': 'Monterrey · MX',
    'footer.response': 'Respuesta < 24h',
    'footer.copyright': 'Hecho con',
    'footer.care': 'cuidado',
    'footer.cta.title': 'Construyamos algo juntos',
    'footer.cta.desc': 'Contame tu idea y te respondo en menos de 24 horas.',
    'footer.cta.btn': 'Iniciar proyecto',
    'footer.cta.btn2': 'hola@creapolis.dev',

    'hero.eyebrow': 'Estudio de producto para PyMEs · Monterrey',
    'hero.title': 'Software que',
    'hero.title.serif': 'transforma',
    'hero.title.cont': 'ideas en productos.',
    'hero.lead':
      'Diseño y desarrollo apps móviles, web y escritorio para empresas que necesitan producto propio sin contratar un equipo completo. Consultoría de IA incluida.',
    'hero.cta': 'Iniciar proyecto',
    'hero.ghost': 'Ver mi trabajo ↓',
    'hero.trust.years': '5+ años',
    'hero.trust.years.label': 'entregando producto',
    'hero.trust.apps': '3 apps propias',
    'hero.trust.apps.label': 'en tiendas',
    'hero.trust.response': 'Respuesta <24h',
    'hero.trust.response.label': 'a cada mensaje',

    'marquee.1': 'Código propio, no plantillas',
    'marquee.2': 'Diseño en cada pixel',
    'marquee.3': 'Sprints de dos semanas',
    'marquee.4': 'Cero agencias intermedias',
    'marquee.5': 'Producto real, no slides',
    'marquee.6': 'Soporte post-lanzamiento',

    'apps.eyebrow': 'Mis apps · En producción',
    'apps.title': 'Producto propio,',
    'apps.title.serif': 'en las tiendas',
    'apps.desc':
      'Antes de hacer el tuyo, hice el mío. Estas son apps creadas, mantenidas y operadas por mí. Usuarios reales, reseñas reales, código propio.',

    'home.meta.title': 'Proyectos — Creapolis',
    'home.meta.desc':
      'Mis proyectos y aplicaciones desarrolladas en producción.',
    'home.hero.eyebrow': 'Proyectos · En producción',
    'home.hero.title.p1': 'Apps que demuestran',
    'home.hero.title.serif': 'mi capacidad',
    'home.hero.lead':
      'Proyectos propios en producción, disponibles en las tiendas. Tecnología real, usuarios reales.',
    'apps.shelf.eyebrow': 'En desarrollo · Taller abierto',
    'apps.shelf.title': 'Lo que estoy construyendo ahora mismo.',
    'apps.shelf.cta': 'Síguelo de cerca →',
    'apps.details': 'Ver detalles →',
    'apps.live': 'Live',
    'apps.pre': 'Pre-lanzamiento',
    'apps.dev': 'En desarrollo',
    'apps.all': 'Ver todos los proyectos →',

    'solennix.tagline': 'todo-en-uno para eventos',
    'solennix.desc':
      'CRM, cotizaciones, inventario y dashboard para organizadores profesionales en Latinoamérica.',
    'pepinillo.tagline': 'Pomodoro, tareas y timer',
    'pepinillo.desc':
      'Productividad todo-en-uno: Pomodoro configurable, tareas con prioridades y subtasks, calendario, timer y estadísticas.',
    'peliculas.tagline': 'tu cine, a tu manera',
    'peliculas.desc':
      'Catálogo de películas y series, listas personalizadas, búsqueda avanzada y recomendaciones basadas en tus gustos.',
    'subscription-guardian.tagline': 'tu centinela financiero',
    'subscription-guardian.desc':
      'Controlá tus suscripciones desde iOS. Alertas antes de cada cobro, dashboard de gastos y privacidad total sin servidores externos.',

    'shelf.solennix': 'Solennix · Mejora continua',
    'shelf.solennix.status': 'En producción',
    'shelf.solennix.desc':
      'Iteración constante: nuevas features por feedback de usuarios reales, estabilidad y preparación para escalar.',
    'shelf.serene': 'Serene · Diario de gratitud',
    'shelf.serene.status': 'En desarrollo',
    'shelf.serene.desc':
      'Diario de gratitud con IA consciente para ansiedad, burnout y depresión. Feedback terapéutico responsable — sin alucinaciones, sin diagnósticos, sin dañar.',
    'shelf.pepinillo': 'Pepinillo para iOS',
    'shelf.pepinillo.status': 'En desarrollo',
    'shelf.pepinillo.desc':
      'La app de productividad que ya funciona en Android, camino al iPhone. Próximo paso: migrar Android a nativo y construir versión desktop.',
    'shelf.sg': 'Subscription Guardian',
    'shelf.sg.status': 'Pre-lanzamiento',
    'shelf.sg.desc':
      'Control de suscripciones para iOS. Alertas antes de cada cobro, dashboard de gastos y privacidad total. Próximamente en App Store.',
    'shelf.exploring': 'En exploración · Asistente conectado',
    'shelf.exploring.status': 'Concepto',
    'shelf.exploring.desc':
      'Idea explorando: un asistente que unifica WhatsApp, correo y CRM en un solo hilo para PyMEs. Todavía sin nombre definido.',

    'services.eyebrow': 'Servicios',
    'services.title': 'Hago producto',
    'services.title.serif': 'de cabo a rabo.',
    'services.desc':
      'Descubrimiento, diseño, código y despliegue. Un solo responsable de punta a punta, una sola factura. Sin agencias intermedias ni handoffs rotos.',

    'services.meta.title': 'Servicios — Creapolis',
    'services.meta.desc':
      'Desarrollo apps móviles, web y de escritorio. Consultoría de IA práctica para empresas en México y LATAM.',
    'services.page.eyebrow': 'Servicios',
    'services.page.title.p1': 'Producto de cabo a rabo,',
    'services.page.title.serif': 'sin intermediarios',
    'services.page.lead':
      'Cinco formas de trabajar juntos — desde validar una idea hasta mantener un producto en producción. Cada servicio tiene un resultado claro, entregables concretos y un proceso transparente.',
    'services.page.audience': 'Para quién',
    'services.page.outcome': 'Qué obtenés',
    'services.page.deliverables': 'Entregables',
    'services.page.method': 'Método y stack',
    'services.page.how.eyebrow': 'Cómo trabajo',
    'services.page.how.title.p1': 'Un proceso con',
    'services.page.how.title.serif': 'pocas sorpresas',
    'services.page.how.lead':
      'Entregas visibles cada dos semanas. Canal directo con quien escribe el código. Sin intermediarios que pierdan contexto — ni sorpresas al final.',

    'contact.cta.eyebrow': 'Hablemos',
    'contact.cta.title.p1': 'Contame tu idea.',
    'contact.cta.title.p2': 'Te contesto',
    'contact.cta.title.serif': 'el mismo día',
    'contact.cta.lead':
      'Sin formularios de 20 campos ni telenovelas. Escribime en 2 minutos, te respondo en menos de 24 horas con próximos pasos concretos.',
    'contact.cta.email.hint': 'o escribe a',
    'contact.cta.sent': 'Enviado — te escribo pronto',
    'contact.cta.form.type.consult': 'Todavía no lo sé · necesito asesoría',
    'contact.cta.form.message.placeholder':
      'Una o dos líneas bastan. El contexto que tengas.',
    'contact.cta.form.error.wait': 'Espera un momento antes de enviar.',
    'contact.cta.form.error.conn':
      'Error de conexión. Escribimos a hola@creapolis.dev',
    'contact.cta.form.success.hp': 'Mensaje enviado. Te respondo pronto.',
    'services.mobile.num': '01 / Móvil',
    'services.mobile.title': 'Apps móviles',
    'services.mobile.desc':
      'iOS y Android, nativas o multiplataforma. Publico, doy soporte y mantengo stores.',
    'services.web.num': '02 / Web',
    'services.web.title': 'Apps web',
    'services.web.desc':
      'SPAs, e-commerce y dashboards con Next.js y Astro. Rápidas, seguras y medibles.',
    'services.desktop.num': '03 / Desktop',
    'services.desktop.title': 'Software de escritorio',
    'services.desktop.desc':
      'macOS, Windows y Linux. Tauri + Rust para rendimiento nativo y bundles pequeños.',
    'services.ai.num': '04 / IA',
    'services.ai.title': 'Consultoría de IA',
    'services.ai.desc':
      'Automatización de procesos, chatbots, análisis. Implementación práctica, no teoría.',
    'services.more': 'Ver servicios y tarifas',

    'process.eyebrow': 'Cómo trabajo',
    'process.title': 'Un proceso con',
    'process.title.serif': 'pocas sorpresas',
    'process.desc':
      'Entregas visibles cada dos semanas. Canal directo con quien escribe el código — nunca un intermediario. Así construyo confianza: mostrando avance real, no promesas.',
    'process.discover': 'Descubrir',
    'process.discover.desc':
      'Llamada de 45 min, lectura del mercado, roadmap con fechas realistas y presupuesto.',
    'process.design': 'Diseñar',
    'process.design.desc':
      'Wireframes, prototipo navegable en Figma y sistema de diseño documentado.',
    'process.build': 'Construir',
    'process.build.desc':
      'Sprints de 2 semanas. Demo cada viernes. Código en tu repo desde el día uno.',
    'process.launch': 'Lanzar',
    'process.launch.desc':
      'QA, publicación en stores, métricas. 30 días de soporte incluidos post-lanzamiento.',

    'mission.eyebrow': 'Sobre mí',
    'mission.title.p1': 'No es una agencia.',
    'mission.title.p2': 'Es un',
    'mission.title.serif': 'desarrollador que vive en el producto',
    'mission.desc':
      'Desde 2019 construyo software — al principio como experimento, ahora como trabajo. Hablás conmigo, te contesto yo, escribo el código yo. Sin agencias, sin equipos que cambian a mitad de proyecto, sin nadie que te traduzca lo que ya dijiste bien.',
    'mission.cta': 'Conocé más sobre mí',
    'stats.years': '5+ años',
    'stats.years.label': 'Construyendo producto',
    'stats.apps': '3 apps',
    'stats.apps.label': 'Propias en tiendas',
    'stats.person': '1 persona',
    'stats.person.label': 'Cero intermediarios',
    'stats.response': '< 24h',
    'stats.response.label': 'Respuesta a cada mensaje',

    'blog.enOnly.title': 'Este blog está en español',
    'blog.enOnly.desc':
      'Por ahora el contenido de artículos sólo está disponible en español. El resto del sitio sí.',
    'blog.enOnly.cta': 'Ver en español',
    'blog.sidebar.author': 'Escrito por',
    'blog.sidebar.authorBio':
      'Estudio de software en Monterrey. Construyo producto con diseño premium.',
    'blog.sidebar.helpTitle': '¿Necesitas ayuda?',
    'blog.sidebar.helpDesc': 'Agenda una llamada y te asesoró sin compromiso.',
    'blog.sidebar.cta': 'Hablemos',
    'blog.sidebar.back': 'Todas las notas',
    'blog.sidebar.share': 'Compartir',
    'blog.toc.title': 'En este artículo',
    'blog.toc.reading': 'min de lectura',
    'blog.share.twitter': 'Twitter',
    'blog.share.linkedin': 'LinkedIn',
    'blog.share.whatsapp': 'WhatsApp',
    'blog.share.copy': 'Copiar link',
    'blog.share.copied': '¡Copiado!',

    // Blog contextual CTAs per editorial category
    'blog.cta.engineering.title': '¿Tenés un código que necesita orden?',
    'blog.cta.engineering.desc':
      'Auditoría de código, refactorización y documentación de arquitectura.',
    'blog.cta.engineering.service': 'Codebase Rescue',
    'blog.cta.mobile.title': '¿Querés lanzar tu app móvil?',
    'blog.cta.mobile.desc':
      'De la idea al App Store: MVP, diseño y desarrollo con Flutter.',
    'blog.cta.mobile.service': 'MVP Build',
    'blog.cta.aiml.title': '¿Querés integrar IA en tu producto?',
    'blog.cta.aiml.desc':
      'Mapa de procesos, selección de modelos y roadmap de implementación.',
    'blog.cta.aiml.service': 'AI Audit',
    'blog.cta.product.title': '¿Tenés una idea y no sabés por dónde empezar?',
    'blog.cta.product.desc':
      'Discovery Sprint: análisis de mercado, prototipo y go/no-go en una semana.',
    'blog.cta.product.service': 'Discovery Sprint',
    'blog.cta.building.title': '¿Querés construir algo similar?',
    'blog.cta.building.desc':
      'Conversemos sobre tu proyecto. Te respondo el mismo día.',
    'blog.cta.building.service': 'Contacto',
    'blog.cta.default.title': '¿Necesitás ayuda con tu proyecto?',
    'blog.cta.default.desc': 'Agenda una llamada y te asesoró sin compromiso.',
    'blog.cta.default.service': 'Hablemos',
    'blog.cta.tracking': 'blog_cta_click',

    'notes.eyebrow': 'Notas',
    'notes.title': 'Pensamos en voz alta',
    'notes.title.serif': 'sobre producto',
    'notes.desc':
      'Lo que aprendo construyendo apps reales — decisiones técnicas, errores que pagué, y lo que funciona cuando el hype se apaga.',
    'notes.cta': 'Ver todas las notas',
    'notes.read': 'Leer nota',

    'contact.eyebrow': 'Hablemos',
    'contact.title.p1': 'Contame tu idea.',
    'contact.title.p2': 'Te contesto',
    'contact.title.serif': 'el mismo día',
    'contact.lead':
      'Sin formularios de 20 campos ni disqueros. Escribime en 2 minutos, te respondo en menos de 24 horas con próximos pasos.',
    'contact.cta': 'Iniciar conversación',

    'contact.page.eyebrow': 'Contacto',
    'contact.page.title.p1': 'Cuéntanos tu idea.',
    'contact.page.title.p2': 'Respondemos el',
    'contact.page.title.serif': 'mismo día',
    'contact.page.subtitle':
      'Sin formularios eternos ni vueltas. Dos minutos tuyos, 24 horas mías, una propuesta concreta en tu bandeja.',
    'contact.promise.title': 'Mi promesa',
    'contact.promise.subtitle': 'Contesto rápido. De verdad.',
    'contact.promise.desc':
      'No sos un ticket en un helpdesk. Tu mensaje me llega a mí directo — y te contesto ese mismo día hábil.',
    'contact.promise.metric': 'Tiempo de respuesta · últimos 90 días',
    'contact.write.title': 'O escribe directo',
    'contact.write.desc': 'Si prefieres email sin formulario:',
    'contact.write.office.label': 'Oficina',
    'contact.write.office.value': 'Monterrey, México',
    'contact.write.hours.label': 'Horario',
    'contact.write.hours.value': 'Lun–Vie · 9–18 CST',
    'contact.write.lang.label': 'Idioma',
    'contact.write.lang.value': 'Español · English',
    'contact.meta.title': 'Contacto — Creapolis',
    'contact.meta.desc':
      'Cuéntanos tu proyecto. Respondemos en menos de 24 horas.',
    'contact.form.company.placeholder': 'Nombre de tu empresa',
    'contact.after.title': 'Qué pasa después',
    'contact.after.step1': 'Leo tu mensaje',
    'contact.after.step1.sub': 'Mismo día hábil',
    'contact.after.step2': 'Llamada de 30 min',
    'contact.after.step2.sub': 'Entiendo contexto y alcance',
    'contact.after.step3': 'Propuesta concreta',
    'contact.after.step3.sub': 'Precio, tiempos y entregables',
    'contact.form.title': 'Empecemos',
    'contact.form.title.serif': 'aquí',
    'contact.form.intro':
      'Sólo lo mínimo. Lo demás lo resolvemos en la llamada.',
    'contact.form.name': 'Nombre',
    'contact.form.email': 'Email',
    'contact.form.company': 'Empresa',
    'contact.form.company.optional': '· opcional',
    'contact.form.type': '¿Qué quieres construir?',
    'contact.form.type.mobile': 'App móvil',
    'contact.form.type.web': 'Aplicación web',
    'contact.form.type.desktop': 'Software de escritorio',
    'contact.form.type.ai': 'Integración de IA',
    'contact.form.type.design': 'Diseño / UI',
    'contact.form.type.unknown': 'No lo sé aún',
    'contact.form.budget': 'Presupuesto aproximado',
    'contact.form.budget.under': '< $10k',
    'contact.form.budget.mid': '$10–25k',
    'contact.form.budget.high': '$25–50k',
    'contact.form.budget.higher': '$50–100k',
    'contact.form.budget.top': '$100k+',
    'contact.form.budget.unknown': 'Aún no lo sé',
    'contact.form.message': 'Cuéntanos un poco más',
    'contact.form.message.placeholder':
      'Dos líneas bastan: qué quieres construir, para quién, y cualquier fecha importante.',
    'contact.form.submit': 'Enviar mensaje',
    'contact.form.sending': 'Enviando...',
    'contact.form.response': 'Te respondo < 24h',
    'contact.form.ok': '¡Recibido! Te escribo hoy',
    'contact.form.type.placeholder': 'Seleccionar...',

    'contact.success.title': 'Mensaje enviado',
    'contact.success.title.serif': 'correctamente',
    'contact.success.desc':
      'Gracias por escribir. Te respondo en menos de 24 horas con próximos pasos concretos.',
    'contact.success.calendar': 'Agendar una llamada',
    'contact.success.cal.title': '30 min — sin compromiso',
    'contact.success.cal.desc':
      'Si preferís hablar directo, elegí un horario que te sirva. Sin ventas, sin presentaciones — solo una conversación sobre tu proyecto.',
    'contact.success.cal.cta': 'Agendar en Calendly',
    'contact.success.email': 'O escribir a hola@creapolis.dev',

    'faq.title': 'Lo que suelen preguntarnos',
    'faq.title.serif': 'antes',
    'faq.q1': '¿Cuánto cuesta desarrollar una app?',
    'faq.a1':
      'Depende del alcance. Una app sencilla arranca en $5–10k USD; una plataforma compleja puede ir de $25k a $100k+. Tras el descubrimiento te doy un presupuesto cerrado con fechas.',
    'faq.q2': '¿Cuánto tarda?',
    'faq.a2':
      '4–8 semanas para una app simple; 3–6 meses para proyectos grandes. Hago demos cada viernes, así sabés exactamente dónde estamos.',
    'faq.q3': '¿Ofrecen soporte después del lanzamiento?',
    'faq.a3':
      'Sí. Los primeros 30 días post-lanzamiento los cubro sin costo. Después podés contratar un retainer mensual o pagar por horas — vos decidís.',
    'faq.q4': '¿Pueden trabajar con código existente?',
    'faq.a4':
      'Sí. Hago auditorías técnicas, refactors y continuación de proyectos. Primero evalúo el código actual para que sepás qué conviene mantener y qué reemplazar.',
    'faq.q5': '¿Firman NDA?',
    'faq.a5':
      'Sin problema. Tengo una plantilla estándar mutua, o puedo firmar la tuya. Me lo enviás por email y lo devuelvo firmado el mismo día.',

    'about.meta.title': 'Sobre — Creapolis',
    'about.meta.desc':
      'Creapolis es un estudio de una persona: código propio, consultoría directa, y apps que la gente de verdad usa.',
    'about.portrait.alt': 'Foto de Tiago',
    'about.cta.btn': 'Iniciar conversación',
    'about.eyebrow': 'Hola',
    'about.hero.chip1': 'Solo dev',
    'about.hero.chip2': 'Monterrey · MX',
    'about.hero.title.p1': 'Una persona.',
    'about.hero.title.p2': 'Un estudio.',
    'about.hero.title.p3': 'Cero intermediarios.',
    'about.hero.lead':
      'Responsabilidad completa. Diseño, codeo, publico y mantengo. Cada proyecto tiene repo propio, CI/CD, documentación y handover. Sin intermediarios que filtren lo que digo — ni sorpresas al final.',
    'about.intro': 'Soy',
    'about.intro.serif': 'Tiago',
    'about.intro.p1':
      'Desde 2019 estoy construyendo software — al principio como estudio, después como hobby obsesivo, y ahora como trabajo. Arranqué con Flutter porque quería enviar a iOS y Android sin duplicar código, y me quedé en mobile porque es donde se ve si sabés producto o sólo tirás features.',
    'about.intro.p2':
      'El backend me lo enseñó Node. La infraestructura me la enseñó equivocarme. La IA me la está enseñando el hype vs. lo que realmente funciona en producción — estoy aprendiendo en vivo, y te cuento lo que vale y lo que no.',
    'about.intro.p3':
      'Creapolis no es una agencia disfrazada. Es una persona — yo — que diseña, codea, publica y mantiene. Si me contratás, hablás conmigo. Si te entrego algo, lo escribí yo. No hay equipo detrás que vaya a cambiar el juego a mitad de proyecto.',

    'about.timeline.eyebrow': 'Trayectoria',
    'about.timeline.title.p1': 'De un repo vacío',
    'about.timeline.title.serif': 'a apps en tiendas',
    'about.timeline.desc':
      'No es una línea recta. Cada proyecto es una decisión técnica: qué stack, qué arquitectura, qué sacrifices. Algunos llegaron a producción, otros murieron en el commit 47. Todo aportó.',

    'about.values.eyebrow': 'Cómo trabajo',
    'about.values.title.p1': 'Cuatro principios',
    'about.values.title.serif': 'no negociables',
    'about.values.desc':
      'Ninguno es revolucionario. Todos son raros en la industria. Acá te los dejo por escrito para que sepas qué esperar antes de contratarme.',

    'about.stack.eyebrow': 'Stack',
    'about.stack.title.p1': 'Lo que uso',
    'about.stack.title.serif': 'a diario',
    'about.stack.desc':
      'No es una lista de lo que puse en el CV hace tres años. Es lo que escribo esta semana. Si no está acá, o no lo domino o no vale la pena.',

    'about.ops.eyebrow': 'Cómo opero',
    'about.ops.title.p1': 'Infraestructura',
    'about.ops.title.serif': 'real, no promesas',
    'about.ops.desc':
      'Lo que separa un proyecto profesional de uno amateur: no es el código, es cómo se mantiene después del lanzamiento.',

    'about.cta.title.p1': '¿Te suena',
    'about.cta.title.serif': 'esta forma de trabajar',
    'about.cta.title.p2': '?',
    'about.cta.lead':
      'Si buscás un colaborador directo, que pregunta antes de codear y que te contesta el mismo día — estamos en la misma página.',

    'legal.eyebrow': 'Legal',

    'notfound.title.p1': 'Acá no hay nada.',
    'notfound.title.serif': 'Todavía',
    'notfound.lead':
      'La URL que pediste no existe, o movimos algo de lugar y se nos olvidó dejar señal. Lo que es seguro es que no querés quedarte mirando este 404 — te dejo tres caminos.',
    'notfound.opt1.title': 'Al inicio',
    'notfound.opt1.desc': 'Ver apps, servicios, blog y todo lo demás.',
    'notfound.opt1.cta': 'Ir al home',
    'notfound.opt2.title': 'Notas de taller',
    'notfound.opt2.desc': 'Lo que aprendo construyendo apps reales.',
    'notfound.opt2.cta': 'Ver el blog',
    'notfound.opt3.title': 'Contame qué pasó',
    'notfound.opt3.desc':
      'Si llegaste acá por un link roto, avisame y lo arreglo.',
    'notfound.opt3.cta': 'Escribir',

    'solennix.hero.chip1': 'En producción',
    'solennix.hero.chip2': 'Por Creapolis',
    'solennix.hero.title.serif': 'Solennix.',
    'solennix.hero.title.p1': 'Eventos',
    'solennix.hero.title.p2': 'sin caos.',
    'solennix.hero.desc':
      'La app todo-en-uno para organizadores profesionales en Latinoamérica. CRM, cotizaciones, inventario y dashboard en un mismo lugar. Bodas, XV, corporativos — lo que se te ocurra.',
    'solennix.download': 'Descarga en',
    'solennix.features.eyebrow': 'Funciones · Lo que hace',
    'solennix.features.title.p1': 'Todo lo que necesitás,',
    'solennix.features.title.serif': 'en un mismo lugar.',
    'solennix.features.desc':
      'Una suite pensada por y para organizadores de eventos. Sin módulos inútiles, sin curvas de aprendizaje de dos semanas.',
    'solennix.case.eyebrow': 'Case Study',
    'solennix.case.title.p1': 'Del Excel al sistema.',
    'solennix.case.title.serif': 'Así nació Solennix.',
    'solennix.case.stack': 'Stack técnico',
    'solennix.case.chapters': [
      {
        title: 'El problema',
        text: 'Los organizadores de eventos profesionales en LATAM gestionan todo en Excel: clientes, cotizaciones, inventario, pagos. Cada evento es un archivo nuevo. No hay historial, no hay métricas, no hay escalabilidad.',
      },
      {
        title: 'La decisión',
        text: 'Construir un CRM vertical para eventos, no un ERP genérico. Un solo producto que cubra el ciclo completo: captación, cotización, ejecución y cierre. Mobile-first porque los organizadores trabajan en campo.',
      },
      {
        title: 'Mi papel',
        text: 'Diseño, desarrollo y operación completa. Desde la arquitectura de datos hasta la publicación en stores. Sin equipo, sin agencia, sin intermediarios.',
      },
      {
        title: 'La solución',
        text: 'Seis módulos integrados: Gestión de eventos, CRM de clientes, Cotizaciones, Inventario, Dashboard y Notificaciones. Disponible en iOS, Android y web. Offline-first para campo sin señal.',
      },
      {
        title: 'Ingeniería',
        text: 'App nativa con React Native para iOS/Android, backend en Node.js, base de datos PostgreSQL. Sincronización offline con resolución de conflictos. Push notifications para recordatorios de eventos.',
      },
      {
        title: 'Resultados',
        text: 'App en producción con usuarios reales en Latinoamérica. Calificación 4.8 en App Store. Soporte directo con tiempo de respuesta menor a 24 horas.',
      },
    ],
    'solennix.case.tech': [
      'React Native',
      'Node.js',
      'PostgreSQL',
      'Push Notifications',
      'Offline-first',
      'iOS',
      'Android',
      'Web',
    ],
    'solennix.pricing.eyebrow': 'Planes',
    'solennix.pricing.title.p1': 'Empieza gratis.',
    'solennix.pricing.title.serif': 'Crece cuando quieras.',
    'solennix.pricing.desc':
      'Sin contratos anuales, sin letra chica. Cambia de plan o cancela cuando quieras desde la app.',
    'solennix.pricing.popular': 'Más popular',
    'solennix.pricing.free': 'Gratis',
    'solennix.pricing.pro': 'Pro',
    'solennix.pricing.business': 'Business',
    'solennix.pricing.custom': 'Custom',
    'solennix.download.title.p1': 'Empezá',
    'solennix.download.title.serif': 'hoy mismo',
    'solennix.download.desc':
      'Tu primer evento organizado en minutos. Sin tarjeta, sin compromiso.',
    'solennix.cta.eyebrow': '¿Algo parecido?',
    'solennix.cta.title.p1': '¿Necesitás algo',
    'solennix.cta.title.serif': 'igual de bueno',
    'solennix.cta.lead':
      'Si te gustó Solennix y querés algo similar para tu industria, hablamos. Hago estas cosas todos los días.',

    'project.back': 'Volver a proyectos',
    'project.chip.live': 'En producción',
    'project.chip.dev': 'En desarrollo',
    'project.chip.by': 'Por Creapolis',
    'project.info.platform': 'Plataforma',
    'project.info.category': 'Categoría',
    'project.info.languages': 'Idiomas',
    'project.info.price': 'Precio',
    'project.info.free': 'Gratis',
    'project.features.title.p1': 'Construida',
    'project.features.title.serif': 'con criterio',
    'project.features.title.p2': ', no con un checklist.',
    'project.features.lead':
      'Cada módulo responde a un uso real. Nada de funciones decorativas que suman en la demo y estorban en el día a día.',
    'project.case.eyebrow': 'Cómo la construí',
    'project.case.title.p1': 'Decisiones que',
    'project.case.title.serif': 'importaron',
    'project.case.stack': 'Stack',
    'project.download.eyebrow': 'Descargá',
    'project.download.title.p1': 'Probala',
    'project.download.title.serif': 'hoy mismo',
    'project.download.desc':
      'Gratis, sin cuentas, sin anuncios molestos. Abrís y usás.',
    'project.download.eyebrow.dev': 'Próximamente',
    'project.download.title.p1.dev': 'Estamos',
    'project.download.title.serif.dev': 'construyendo',
    'project.download.desc.dev':
      'Esta app está en desarrollo. Estamos trabajando en ella y pronto estará disponible.',
    'project.download.store.small': 'Descargá en',
    'project.download.store.soon': 'Próximamente en',
    'project.resources.eyebrow': 'Recursos',
    'project.resources.title.p1': 'Sacá el máximo de',
    'project.resources.read': 'Leer más →',
    'project.cta.eyebrow': '¿Algo parecido?',
    'project.cta.title.p1': '¿Necesitás algo',
    'project.cta.title.serif': 'similar',
    'project.cta.title.p2': '?',
    'project.cta.lead':
      'Si te gustó esta app y querés una para tu industria o tu idea, hablamos. Construyo cosas así todos los días.',
    'project.cta.primary': 'Iniciar proyecto',
    'project.cta.secondary': 'Ver otros proyectos',

    'solennix.info.platforms.value': 'iOS · Android',
    'solennix.info.platforms.label': 'Plataformas',
    'solennix.info.size.label': 'Tamaño',
    'solennix.info.plans.value': 'Gratis + Pro',
    'solennix.info.plans.label': 'Planes',
    'solennix.info.langs.value': 'ES · EN',
    'solennix.info.langs.label': 'Idiomas',
    'solennix.hero.chip.prod': 'En producción',
    'solennix.hero.chip.by': 'Por Creapolis',
    'solennix.pricing.pro.suffix': '/ mes',
    'solennix.cta.btn': 'Iniciar proyecto',

    'postdate.locale': 'es-MX',

    // Hub navigation
    'hub.nav.overview': 'Resumen',
    'hub.nav.guide': 'Guía rápida',
    'hub.nav.tips': 'Tips',
    'hub.nav.support': 'Soporte',
    'hub.nav.changelog': 'Changelog',
    'hub.nav.privacy': 'Privacidad',
    'hub.breadcrumb.projects': 'Proyectos',
    'changelog.title': 'Changelog',

    // Blog editorial categories
    'blog.cat.all': 'Todas',
    'blog.cat.engineering': 'Engineering',
    'blog.cat.mobile': 'Mobile',
    'blog.cat.aiml': 'AI/ML',
    'blog.cat.product': 'Product',
    'blog.cat.building': 'Building Creapolis',
    'blog.featured.badge': 'Artículo destacado',
    'blog.spanish.notice': 'Este contenido está en español',
  },

  en: {
    'nav.projects': 'Projects',
    'nav.services': 'Services',
    'nav.about': 'About',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.cta': 'Start a project',
    'nav.menu': 'Menu',
    'nav.lang': 'Language',

    'footer.site': 'Site',
    'footer.home': 'Home',
    'footer.apps': 'Apps',
    'footer.services': 'Services',
    'footer.about': 'About',
    'footer.blog': 'Blog',
    'footer.projects': 'Projects',
    'footer.all': 'All',
    'footer.contact': 'Contact',
    'footer.form': 'Contact form',
    'footer.tagline':
      'A one-person studio. I design, code, and ship software people actually use.',
    'footer.location': 'Monterrey · MX',
    'footer.response': 'Response < 24h',
    'footer.copyright': 'Made with',
    'footer.care': 'care',
    'footer.cta.title': "Let's build something together",
    'footer.cta.desc': 'Tell me your idea and I will respond within 24 hours.',
    'footer.cta.btn': 'Start a project',
    'footer.cta.btn2': 'hola@creapolis.dev',

    'hero.eyebrow': 'Product studio for SMBs · Monterrey',
    'hero.title': 'Software that',
    'hero.title.serif': 'transforms',
    'hero.title.cont': 'ideas into products.',
    'hero.lead':
      'I design and develop mobile, web, and desktop apps for companies that need their own product without hiring a full team. AI consulting included.',
    'hero.cta': 'Start a project',
    'hero.ghost': 'See my work ↓',
    'hero.trust.years': '5+ years',
    'hero.trust.years.label': 'shipping product',
    'hero.trust.apps': '3 own apps',
    'hero.trust.apps.label': 'in the stores',
    'hero.trust.response': 'Response <24h',
    'hero.trust.response.label': 'to every message',

    'marquee.1': 'Custom code, no templates',
    'marquee.2': 'Design in every pixel',
    'marquee.3': 'Two-week sprints',
    'marquee.4': 'Zero middlemen agencies',
    'marquee.5': 'Real product, not slides',
    'marquee.6': 'Post-launch support',

    'apps.eyebrow': 'My apps · In production',
    'apps.title': 'Own products,',
    'apps.title.serif': 'in the stores',
    'apps.desc':
      'Before building yours, I built mine. These are apps created, maintained, and operated by me. Real users, real reviews, custom code.',

    'home.meta.title': 'Projects — Creapolis',
    'home.meta.desc': 'Our projects and applications shipping in production.',
    'home.hero.eyebrow': 'Projects · Live',
    'home.hero.title.p1': 'Apps that prove',
    'home.hero.title.serif': 'my capability',
    'home.hero.lead':
      'Own projects in production, available in the stores. Real tech, real users.',
    'apps.shelf.eyebrow': 'In development · Open workshop',
    'apps.shelf.title': "What I'm building right now.",
    'apps.shelf.cta': 'Follow along →',
    'apps.details': 'See details →',
    'apps.live': 'Live',
    'apps.pre': 'Pre-launch',
    'apps.dev': 'In development',
    'apps.all': 'See all projects →',

    'solennix.tagline': 'all-in-one for events',
    'solennix.desc':
      'CRM, quotes, inventory, and dashboard for professional event organizers in Latin America.',
    'pepinillo.tagline': 'Pomodoro, tasks & timer',
    'pepinillo.desc':
      'All-in-one productivity: configurable Pomodoro, tasks with priorities and subtasks, calendar, timer, and statistics.',
    'peliculas.tagline': 'your movies, your way',
    'peliculas.desc':
      'Movies and series catalog, custom lists, advanced search, and recommendations based on your taste.',
    'subscription-guardian.tagline': 'your financial sentinel',
    'subscription-guardian.desc':
      'Control your subscriptions from iOS. Alerts before each charge, spending dashboard, and total privacy with no external servers.',

    'shelf.solennix': 'Solennix · Continuous improvement',
    'shelf.solennix.status': 'In production',
    'shelf.solennix.desc':
      'Constant iteration: new features from real user feedback, stability, and preparing to scale.',
    'shelf.serene': 'Serene · Gratitude journal',
    'shelf.serene.status': 'In development',
    'shelf.serene.desc':
      'Gratitude journal with conscious AI for anxiety, burnout, and depression. Responsible therapeutic feedback — no hallucinations, no diagnoses, no harm.',
    'shelf.pepinillo': 'Pepinillo for iOS',
    'shelf.pepinillo.status': 'In development',
    'shelf.pepinillo.desc':
      'The productivity app that already works on Android, heading to iPhone. Next step: migrate Android to native and build desktop version.',
    'shelf.sg': 'Subscription Guardian',
    'shelf.sg.status': 'Pre-launch',
    'shelf.sg.desc':
      'Subscription control for iOS. Alerts before each charge, spending dashboard, and total privacy. Coming soon to the App Store.',
    'shelf.exploring': 'Exploring · Connected assistant',
    'shelf.exploring.status': 'Concept',
    'shelf.exploring.desc':
      'Exploring an idea: an assistant that unifies WhatsApp, email, and CRM into a single thread for SMBs. Still no defined name.',

    'services.eyebrow': 'Services',
    'services.title': 'I build product',
    'services.title.serif': 'end to end.',
    'services.desc':
      'Discovery, design, code, and deployment. One person responsible from start to finish, one invoice. No middlemen agencies or broken handoffs.',

    'services.meta.title': 'Services — Creapolis',
    'services.meta.desc':
      'Mobile, web, and desktop app development. Practical AI consulting for businesses in Mexico and LATAM.',
    'services.page.eyebrow': 'Services',
    'services.page.title.p1': 'Product end-to-end,',
    'services.page.title.serif': 'no middlemen',
    'services.page.lead':
      'Five ways to work together — from validating an idea to keeping a product in production. Each service has a clear outcome, concrete deliverables, and a transparent process.',
    'services.page.audience': "Who it's for",
    'services.page.outcome': 'What you get',
    'services.page.deliverables': 'Deliverables',
    'services.page.method': 'Method & stack',
    'services.page.how.eyebrow': 'How I work',
    'services.page.how.title.p1': 'A process with',
    'services.page.how.title.serif': 'few surprises',
    'services.page.how.lead':
      'Visible deliveries every two weeks. Direct channel with whoever writes the code. No middlemen losing context — no surprises at the end.',

    'contact.cta.eyebrow': "Let's talk",
    'contact.cta.title.p1': 'Tell me your idea.',
    'contact.cta.title.p2': 'I reply',
    'contact.cta.title.serif': 'the same day',
    'contact.cta.lead':
      'No 20-field forms, no soap operas. Write me in 2 minutes, I reply in under 24 hours with concrete next steps.',
    'contact.cta.email.hint': 'or write to',
    'contact.cta.sent': "Sent — I'll write you soon",
    'contact.cta.form.type.consult': 'Not sure yet · I need advice',
    'contact.cta.form.message.placeholder':
      'One or two lines will do. Whatever context you have.',
    'contact.cta.form.error.wait': 'Wait a moment before sending.',
    'contact.cta.form.error.conn':
      'Connection error. You can write to hola@creapolis.dev',
    'contact.cta.form.success.hp': "Message sent. I'll reply soon.",
    'services.mobile.num': '01 / Mobile',
    'services.mobile.title': 'Mobile apps',
    'services.mobile.desc':
      'iOS and Android, native or cross-platform. I publish, support, and maintain stores.',
    'services.web.num': '02 / Web',
    'services.web.title': 'Web apps',
    'services.web.desc':
      'SPAs, e-commerce, and dashboards with Next.js and Astro. Fast, secure, and measurable.',
    'services.desktop.num': '03 / Desktop',
    'services.desktop.title': 'Desktop software',
    'services.desktop.desc':
      'macOS, Windows, and Linux. Tauri + Rust for native performance and small bundles.',
    'services.ai.num': '04 / AI',
    'services.ai.title': 'AI consulting',
    'services.ai.desc':
      'Process automation, chatbots, analytics. Practical implementation, not theory.',
    'services.more': 'View services and pricing',

    'process.eyebrow': 'How we work',
    'process.title': 'A process with',
    'process.title.serif': 'few surprises',
    'process.desc':
      "Visible deliveries every two weeks. Direct channel with whoever writes the code — never a middleman. That's how trust is built: showing real progress, not promises.",
    'process.discover': 'Discover',
    'process.discover.desc':
      '45-min call, market research, roadmap with realistic dates and budget.',
    'process.design': 'Design',
    'process.design.desc':
      'Wireframes, navigable prototype in Figma, and documented design system.',
    'process.build': 'Build',
    'process.build.desc':
      '2-week sprints. Demo every Friday. Code in your repo from day one.',
    'process.launch': 'Launch',
    'process.launch.desc':
      'QA, store publishing, metrics. 30 days of included post-launch support.',

    'mission.eyebrow': 'About me',
    'mission.title.p1': "It's not an agency.",
    'mission.title.p2': "It's a",
    'mission.title.serif': 'developer who lives in the product',
    'mission.desc':
      "Since 2019 I've been building software — at first as an experiment, now as my job. You talk to me, I answer, I write the code. No agencies, no teams that change mid-project, no one translating what you already said clearly.",
    'mission.cta': 'Learn more about me',
    'stats.years': '5+ years',
    'stats.years.label': 'Building product',
    'stats.apps': '3 apps',
    'stats.apps.label': 'Own apps in stores',
    'stats.person': '1 person',
    'stats.person.label': 'Zero middlemen',
    'stats.response': '< 24h',
    'stats.response.label': 'Response to every message',

    'blog.enOnly.title': 'This blog is in Spanish',
    'blog.enOnly.desc':
      "For now, article content is only available in Spanish. The rest of the site isn't.",
    'blog.enOnly.cta': 'View in Spanish',
    'blog.sidebar.author': 'Written by',
    'blog.sidebar.authorBio':
      'Software studio in Monterrey. I build product with premium design.',
    'blog.sidebar.helpTitle': 'Need help?',
    'blog.sidebar.helpDesc':
      'Schedule a call and I will advise you, no strings attached.',
    'blog.sidebar.cta': "Let's talk",
    'blog.sidebar.back': 'All posts',
    'blog.sidebar.share': 'Share',
    'blog.toc.title': 'In this article',
    'blog.toc.reading': 'min read',
    'blog.share.twitter': 'Twitter',
    'blog.share.linkedin': 'LinkedIn',
    'blog.share.whatsapp': 'WhatsApp',
    'blog.share.copy': 'Copy link',
    'blog.share.copied': 'Copied!',

    // Blog contextual CTAs per editorial category
    'blog.cta.engineering.title': 'Got code that needs sorting out?',
    'blog.cta.engineering.desc':
      'Code audit, refactoring and architecture documentation.',
    'blog.cta.engineering.service': 'Codebase Rescue',
    'blog.cta.mobile.title': 'Ready to launch your mobile app?',
    'blog.cta.mobile.desc':
      'From idea to App Store: MVP, design and Flutter development.',
    'blog.cta.mobile.service': 'MVP Build',
    'blog.cta.aiml.title': 'Want to integrate AI into your product?',
    'blog.cta.aiml.desc':
      'Process mapping, model selection and implementation roadmap.',
    'blog.cta.aiml.service': 'AI Audit',
    'blog.cta.product.title': "Have an idea but don't know where to start?",
    'blog.cta.product.desc':
      'Discovery Sprint: market analysis, prototype and go/no-go in one week.',
    'blog.cta.product.service': 'Discovery Sprint',
    'blog.cta.building.title': 'Want to build something like this?',
    'blog.cta.building.desc':
      "Let's talk about your project. I reply the same day.",
    'blog.cta.building.service': 'Contact',
    'blog.cta.default.title': 'Need help with your project?',
    'blog.cta.default.desc':
      "Book a call and I'll advise you with no strings attached.",
    'blog.cta.default.service': "Let's talk",
    'blog.cta.tracking': 'blog_cta_click',

    'notes.eyebrow': 'Notes',
    'notes.title': 'I think out loud',
    'notes.title.serif': 'about product',
    'notes.desc':
      'What I learn building real apps — technical decisions, mistakes I paid for, and what works when the hype fades.',
    'notes.cta': 'See all notes',
    'notes.read': 'Read note',

    'contact.eyebrow': "Let's talk",
    'contact.title.p1': 'Tell me your idea.',
    'contact.title.p2': 'I respond',
    'contact.title.serif': 'the same day',
    'contact.lead':
      "No 20-field forms or endless back-and-forth. Write me in 2 minutes, I'll respond in under 24 hours with next steps.",
    'contact.cta': 'Start a conversation',

    'contact.page.eyebrow': 'Contact',
    'contact.page.title.p1': 'Tell us your idea.',
    'contact.page.title.p2': 'I respond',
    'contact.page.title.serif': 'the same day',
    'contact.page.subtitle':
      'No endless forms or runarounds. Two minutes of your time, 24 hours of ours, a concrete proposal in your inbox.',
    'contact.promise.title': 'My promise',
    'contact.promise.subtitle': 'I respond fast. For real.',
    'contact.promise.desc':
      "You're not a ticket in a helpdesk. Your message goes straight to me — and I respond that same business day.",
    'contact.promise.metric': 'Response time · last 90 days',
    'contact.write.title': 'Or write directly',
    'contact.write.desc': 'If you prefer email without a form:',
    'contact.write.office.label': 'Office',
    'contact.write.office.value': 'Monterrey, Mexico',
    'contact.write.hours.label': 'Hours',
    'contact.write.hours.value': 'Mon–Fri · 9–18 CST',
    'contact.write.lang.label': 'Languages',
    'contact.write.lang.value': 'Español · English',
    'contact.meta.title': 'Contact — Creapolis',
    'contact.meta.desc':
      'Tell us about your project. I respond within 24 hours.',
    'contact.form.company.placeholder': 'Your company name',
    'contact.after.title': 'What happens next',
    'contact.after.step1': 'I read your message',
    'contact.after.step1.sub': 'Same business day',
    'contact.after.step2': '30-min call',
    'contact.after.step2.sub': 'I understand context and scope',
    'contact.after.step3': 'Concrete proposal',
    'contact.after.step3.sub': 'Price, timeline, and deliverables',
    'contact.form.title': "Let's start",
    'contact.form.title.serif': 'here',
    'contact.form.intro':
      'Just the essentials. I figure out the rest on the call.',
    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.company': 'Company',
    'contact.form.company.optional': '· optional',
    'contact.form.type': 'What do you want to build?',
    'contact.form.type.mobile': 'Mobile app',
    'contact.form.type.web': 'Web app',
    'contact.form.type.desktop': 'Desktop software',
    'contact.form.type.ai': 'AI integration',
    'contact.form.type.design': 'Design / UI',
    'contact.form.type.unknown': "I'm not sure yet",
    'contact.form.budget': 'Approximate budget',
    'contact.form.budget.under': '< $10k',
    'contact.form.budget.mid': '$10–25k',
    'contact.form.budget.high': '$25–50k',
    'contact.form.budget.higher': '$50–100k',
    'contact.form.budget.top': '$100k+',
    'contact.form.budget.unknown': 'Not sure yet',
    'contact.form.message': 'Tell us a bit more',
    'contact.form.message.placeholder':
      'Two lines will do: what you want to build, for whom, and any important dates.',
    'contact.form.submit': 'Send message',
    'contact.form.sending': 'Sending...',
    'contact.form.response': 'I respond < 24h',
    'contact.form.ok': "Received! I'll write you today",
    'contact.form.type.placeholder': 'Select...',

    'contact.success.title': 'Message sent',
    'contact.success.title.serif': 'successfully',
    'contact.success.desc':
      'Thanks for writing. I will reply in less than 24 hours with concrete next steps.',
    'contact.success.calendar': 'Schedule a call',
    'contact.success.cal.title': '30 min — no commitment',
    'contact.success.cal.desc':
      'If you prefer to talk directly, pick a time that works for you. No sales, no presentations — just a conversation about your project.',
    'contact.success.cal.cta': 'Schedule on Calendly',
    'contact.success.email': 'Or write to hola@creapolis.dev',

    'faq.title': 'What people usually ask',
    'faq.title.serif': 'before',
    'faq.q1': 'How much does it cost to develop an app?',
    'faq.a1':
      'It depends on scope. A simple app starts at $5–10k USD; a complex platform can range from $25k to $100k+. After discovery, I give you a fixed budget with dates.',
    'faq.q2': 'How long does it take?',
    'faq.a2':
      '4–8 weeks for a simple app; 3–6 months for large projects. I do demos every Friday so you know exactly where we stand.',
    'faq.q3': 'Do you offer post-launch support?',
    'faq.a3':
      'Yes. The first 30 days post-launch are covered at no cost. After that, you can hire a monthly retainer or pay by the hour — you decide.',
    'faq.q4': 'Can you work with existing code?',
    'faq.a4':
      "Yes. I do technical audits, refactors, and project continuations. First I evaluate the current code so you know what's worth keeping and what to replace.",
    'faq.q5': 'Do you sign NDAs?',
    'faq.a5':
      "No problem. I have a standard mutual template, or I can sign yours. Send it by email and I'll return it signed the same day.",

    'about.meta.title': 'About — Creapolis',
    'about.meta.desc':
      'Creapolis is a one-person studio: own code, direct consulting, and apps people actually use.',
    'about.portrait.alt': 'Photo of Tiago',
    'about.cta.btn': 'Start a conversation',
    'about.eyebrow': 'Hi',
    'about.hero.chip1': 'Solo dev',
    'about.hero.chip2': 'Monterrey · MX',
    'about.hero.title.p1': 'One person.',
    'about.hero.title.p2': 'One studio.',
    'about.hero.title.p3': 'Zero middlemen.',
    'about.hero.lead':
      'Complete ownership. I design, code, ship, and maintain. Every project has its own repo, CI/CD, documentation, and handover. No intermediaries filtering what I say — no surprises at the end.',
    'about.intro': "I'm",
    'about.intro.serif': 'Tiago',
    'about.intro.p1':
      "Since 2019 I've been building software — at first as a studio, then as an obsessive hobby, and now as my job. I started with Flutter because I wanted to ship to iOS and Android without duplicating code, and I stayed in mobile because that's where you see if you know product or just throw features at the wall.",
    'about.intro.p2':
      "Backend was taught to me by Node. Infrastructure was taught to me by making mistakes. AI is being taught to me by hype vs. what actually works in production — I'm learning live, and I tell you what's worth it and what's not.",
    'about.intro.p3':
      "Creapolis is not a disguised agency. It's one person — me — who designs, codes, publishes, and maintains. If you hire me, you talk to me. If I deliver something, I wrote it. There's no team behind that's going to change the game mid-project.",

    'about.timeline.eyebrow': 'Timeline',
    'about.timeline.title.p1': 'From an empty repo',
    'about.timeline.title.serif': 'to apps in stores',
    'about.timeline.desc':
      "It's not a straight line. Every project is a technical decision: which stack, which architecture, what to sacrifice. Some made it to production, others died at commit 47. Everything contributed.",

    'about.values.eyebrow': 'How I work',
    'about.values.title.p1': 'Four non-negotiable',
    'about.values.title.serif': 'principles',
    'about.values.desc':
      'None of these are revolutionary. All of them are rare in the industry. Here they are in writing so you know what to expect before hiring me.',

    'about.stack.eyebrow': 'Stack',
    'about.stack.title.p1': 'What I use',
    'about.stack.title.serif': 'daily',
    'about.stack.desc':
      "This isn't a list of what I put on my CV three years ago. It's what I write this week. If it's not here, either I don't know it or it's not worth it.",

    'about.ops.eyebrow': 'How I operate',
    'about.ops.title.p1': 'Real',
    'about.ops.title.serif': 'infrastructure',
    'about.ops.desc':
      'What separates a professional project from an amateur one: not the code, but how it is maintained after launch.',

    'about.cta.title.p1': 'Does this way',
    'about.cta.title.serif': 'of working resonate',
    'about.cta.title.p2': '?',
    'about.cta.lead':
      "If you're looking for a direct collaborator who asks before coding and responds the same day — we're on the same page.",

    'legal.eyebrow': 'Legal',

    'notfound.title.p1': 'Nothing here.',
    'notfound.title.serif': 'Yet',
    'notfound.lead':
      "The URL you requested doesn't exist, or we moved something and forgot to leave a trail. What's certain is you don't want to stare at this 404 — here are three paths.",
    'notfound.opt1.title': 'Go home',
    'notfound.opt1.desc': 'See apps, services, blog, and everything else.',
    'notfound.opt1.cta': 'Go to home',
    'notfound.opt2.title': 'Workshop notes',
    'notfound.opt2.desc': 'What I learn building real apps.',
    'notfound.opt2.cta': 'See the blog',
    'notfound.opt3.title': 'Tell me what happened',
    'notfound.opt3.desc':
      "If you got here from a broken link, let me know and I'll fix it.",
    'notfound.opt3.cta': 'Write me',

    'solennix.hero.chip1': 'In production',
    'solennix.hero.chip2': 'By Creapolis',
    'solennix.hero.title.serif': 'Solennix.',
    'solennix.hero.title.p1': 'Events',
    'solennix.hero.title.p2': 'without chaos.',
    'solennix.hero.desc':
      'The all-in-one app for professional event organizers in Latin America. CRM, quotes, inventory, and dashboard in one place. Weddings, quinceañeras, corporate — whatever you need.',
    'solennix.download': 'Download on',
    'solennix.features.eyebrow': 'Features · What it does',
    'solennix.features.title.p1': 'Everything you need,',
    'solennix.features.title.serif': 'in one place.',
    'solennix.features.desc':
      'A suite designed by and for event organizers. No useless modules, no two-week learning curves.',
    'solennix.case.eyebrow': 'Case Study',
    'solennix.case.title.p1': 'From Excel to system.',
    'solennix.case.title.serif': 'How Solennix was born.',
    'solennix.case.stack': 'Tech stack',
    'solennix.case.chapters': [
      {
        title: 'The problem',
        text: 'Professional event organizers in LATAM manage everything in Excel: clients, quotes, inventory, payments. Each event is a new file. No history, no metrics, no scalability.',
      },
      {
        title: 'The decision',
        text: 'Build a vertical CRM for events, not a generic ERP. One product covering the full cycle: acquisition, quoting, execution, and closing. Mobile-first because organizers work in the field.',
      },
      {
        title: 'My role',
        text: 'Design, development, and full operation. From data architecture to store publishing. No team, no agency, no middlemen.',
      },
      {
        title: 'The solution',
        text: 'Six integrated modules: Event management, Client CRM, Quotes, Inventory, Dashboard, and Notifications. Available on iOS, Android, and web. Offline-first for field work without signal.',
      },
      {
        title: 'Engineering',
        text: 'Native app with React Native for iOS/Android, Node.js backend, PostgreSQL database. Offline sync with conflict resolution. Push notifications for event reminders.',
      },
      {
        title: 'Results',
        text: 'App in production with real users in Latin America. 4.8 rating on App Store. Direct support with response time under 24 hours.',
      },
    ],
    'solennix.case.tech': [
      'React Native',
      'Node.js',
      'PostgreSQL',
      'Push Notifications',
      'Offline-first',
      'iOS',
      'Android',
      'Web',
    ],
    'solennix.pricing.eyebrow': 'Plans',
    'solennix.pricing.title.p1': 'Start for free.',
    'solennix.pricing.title.serif': 'Grow when you want.',
    'solennix.pricing.desc':
      'No annual contracts, no fine print. Change plans or cancel anytime from the app.',
    'solennix.pricing.popular': 'Most popular',
    'solennix.pricing.free': 'Free',
    'solennix.pricing.pro': 'Pro',
    'solennix.pricing.business': 'Business',
    'solennix.pricing.custom': 'Custom',
    'solennix.download.title.p1': 'Start',
    'solennix.download.title.serif': 'today',
    'solennix.download.desc':
      'Your first event organized in minutes. No card, no commitment.',
    'solennix.cta.eyebrow': 'Something similar?',
    'solennix.cta.title.p1': 'Need something',
    'solennix.cta.title.serif': 'just as good',
    'solennix.cta.lead':
      "If you liked Solennix and want something similar for your industry, let's talk. I build these things every day.",

    'project.back': 'Back to projects',
    'project.chip.live': 'In production',
    'project.chip.dev': 'In development',
    'project.chip.by': 'By Creapolis',
    'project.info.platform': 'Platform',
    'project.info.category': 'Category',
    'project.info.languages': 'Languages',
    'project.info.price': 'Price',
    'project.info.free': 'Free',
    'project.features.title.p1': 'Built with',
    'project.features.title.serif': 'judgment',
    'project.features.title.p2': ', not a checklist.',
    'project.features.lead':
      'Every module answers a real use case. No decorative features that look great in the demo and get in the way day-to-day.',
    'project.case.eyebrow': 'How I built it',
    'project.case.title.p1': 'Decisions that',
    'project.case.title.serif': 'mattered',
    'project.case.stack': 'Stack',
    'project.download.eyebrow': 'Download',
    'project.download.title.p1': 'Try it',
    'project.download.title.serif': 'today',
    'project.download.desc':
      'Free, no accounts, no annoying ads. Open and use.',
    'project.download.eyebrow.dev': 'Coming soon',
    'project.download.title.p1.dev': 'We are',
    'project.download.title.serif.dev': 'building it',
    'project.download.desc.dev':
      'This app is in development. We are working on it and it will be available soon.',
    'project.download.store.small': 'Download on',
    'project.download.store.soon': 'Coming soon to',
    'project.resources.eyebrow': 'Resources',
    'project.resources.title.p1': 'Get the most out of',
    'project.resources.read': 'Read more →',
    'project.cta.eyebrow': 'Something similar?',
    'project.cta.title.p1': 'Need something',
    'project.cta.title.serif': 'similar',
    'project.cta.title.p2': '?',
    'project.cta.lead':
      "If you liked this app and want one for your industry or your idea, let's talk. I build things like this every day.",
    'project.cta.primary': 'Start a project',
    'project.cta.secondary': 'See other projects',

    'solennix.info.platforms.value': 'iOS · Android',
    'solennix.info.platforms.label': 'Platforms',
    'solennix.info.size.label': 'Size',
    'solennix.info.plans.value': 'Free + Pro',
    'solennix.info.plans.label': 'Plans',
    'solennix.info.langs.value': 'ES · EN',
    'solennix.info.langs.label': 'Languages',
    'solennix.hero.chip.prod': 'In production',
    'solennix.hero.chip.by': 'By Creapolis',
    'solennix.pricing.pro.suffix': '/ month',
    'solennix.cta.btn': 'Start a project',

    'postdate.locale': 'en-US',

    // Hub navigation
    'hub.nav.overview': 'Overview',
    'hub.nav.guide': 'Quick start',
    'hub.nav.tips': 'Tips',
    'hub.nav.support': 'Support',
    'hub.nav.changelog': 'Changelog',
    'hub.nav.privacy': 'Privacy',
    'hub.breadcrumb.projects': 'Projects',
    'changelog.title': 'Changelog',

    // Blog editorial categories
    'blog.cat.all': 'All',
    'blog.cat.engineering': 'Engineering',
    'blog.cat.mobile': 'Mobile',
    'blog.cat.aiml': 'AI/ML',
    'blog.cat.product': 'Product',
    'blog.cat.building': 'Building Creapolis',
    'blog.featured.badge': 'Featured article',
    'blog.spanish.notice': 'This content is in Spanish',
  },
  pt: {
    'nav.projects': 'Projetos',
    'nav.services': 'Serviços',
    'nav.about': 'Sobre',
    'nav.blog': 'Blog',
    'nav.contact': 'Contato',
    'nav.cta': 'Iniciar projeto',
    'nav.menu': 'Menu',
    'nav.lang': 'Idioma',

    'footer.site': 'Site',
    'footer.home': 'Início',
    'footer.apps': 'Apps',
    'footer.services': 'Serviços',
    'footer.about': 'Sobre',
    'footer.blog': 'Blog',
    'footer.projects': 'Projetos',
    'footer.all': 'Todos',
    'footer.contact': 'Contato',
    'footer.form': 'Formulário',
    'footer.tagline':
      'Estúdio de uma pessoa. Design, código e publico software que as pessoas de verdade usam.',
    'footer.copyright': 'Feito com',
    'footer.care': 'cuidado',
    'footer.cta.title': 'Vamos construir juntos',
    'footer.cta.desc': 'Me conta sua ideia e eu respondo em menos de 24 horas.',
    'footer.cta.btn': 'Iniciar projeto',
    'footer.cta.btn2': 'hola@creapolis.dev',
    'footer.location': 'Monterrey · MX',
    'footer.response': 'Resposta < 24h',

    'home.meta.title': 'Projetos — Creapolis',
    'home.meta.desc': 'Meus projetos e aplicações desenvolvidos em produção.',
    'home.hero.eyebrow': 'Projetos · Em produção',
    'home.hero.title.p1': 'Apps que demonstram',
    'home.hero.title.serif': 'minha capacidade',
    'home.hero.lead':
      'Projetos próprios em produção, disponíveis nas lojas. Tecnologia real, usuários reais.',

    'apps.eyebrow': 'Meus apps · Em produção',
    'apps.title': 'Produto próprio,',
    'apps.title.serif': 'nas lojas',
    'apps.desc':
      'Antes de fazer o seu, fiz o meu. Estes são apps criados, mantidos e operados por mim. Usuários reais, avaliações reais, código próprio.',
    'apps.shelf.eyebrow': 'Em desenvolvimento · Oficina aberta',
    'apps.shelf.title': 'O que estou construindo agora.',
    'apps.shelf.cta': 'Acompanhe →',
    'apps.details': 'Ver detalhes →',
    'apps.live': 'Live',
    'apps.pre': 'Pré-lançamento',
    'apps.dev': 'Em desenvolvimento',
    'apps.all': 'Ver todos os projetos →',

    'about.meta.title': 'Sobre — Creapolis',
    'about.meta.desc':
      'Estúdio de software em Monterrey. Apps móveis, web e desktop com consultoria de IA prática.',
    'about.portrait.alt': 'Foto do Tiago',
    'about.cta.btn': 'Iniciar conversa',
    'about.eyebrow': 'Olá',
    'about.hero.chip1': 'Solo dev',
    'about.hero.chip2': 'Monterrey · MX',
    'about.hero.title.p1': 'Uma pessoa.',
    'about.hero.title.p2': 'Um estúdio.',
    'about.hero.title.p3': 'Zero intermediários.',
    'about.hero.lead':
      'Responsabilidade completa. Projeto, codifico, publico e mantenho. Cada projeto tem repo próprio, CI/CD, documentação e handover. Sem intermediários filtrando o que digo — nem surpresas no final.',
    'about.intro': 'Sou',
    'about.intro.serif': 'Tiago',
    'about.intro.p1':
      'Desde 2019 construindo software — no início como estudo, depois como hobby obsessivo, e agora como trabalho. Comecei com Flutter porque queria enviar para iOS e Android sem duplicar código, e fiquei em mobile porque é onde se vê se você sabe produto ou só lança features.',
    'about.intro.p2':
      'O backend me ensinou Node. A infraestrutura me ensinou a errar. A IA me está ensinando o hype vs. o que realmente funciona em produção — estou aprendendo em tempo real, e te conto o que vale e o que não.',
    'about.intro.p3':
      'Creapolis não é uma agência disfarçada. É uma pessoa — eu — que projeta, codifica, publica e mantém. Se me contrata, fala comigo. Se te entrego algo, escrevi eu. Não tem equipe atrás que vai mudar o jogo no meio do projeto.',

    'about.timeline.eyebrow': 'Trajetória',
    'about.timeline.title.p1': 'De um repo vazio',
    'about.timeline.title.serif': 'a apps nas lojas',
    'about.timeline.desc':
      'Não é uma linha reta. Cada projeto é uma decisão técnica: qual stack, qual arquitetura, o que sacrificar. Alguns chegaram à produção, outros morreram no commit 47. Tudo contribuiu.',

    'about.values.eyebrow': 'Como trabalho',
    'about.values.title.p1': 'Quatro princípios',
    'about.values.title.serif': 'não negociáveis',
    'about.values.desc':
      'Nenhum é revolucionário. Todos são raros na indústria. Aqui estão por escrito para que saiba o que esperar antes de me contratar.',

    'about.stack.eyebrow': 'Stack',
    'about.stack.title.p1': 'O que uso',
    'about.stack.title.serif': 'todo dia',
    'about.stack.desc':
      'Não é uma lista do que coloquei no CV três anos atrás. É o que escrevo esta semana. Se não está aqui, ou não domino ou não vale a pena.',

    'about.ops.eyebrow': 'Como opero',
    'about.ops.title.p1': 'Infraestrutura',
    'about.ops.title.serif': 'real, não promessas',
    'about.ops.desc':
      'O que separa um projeto profissional de um amador: não é o código, é como se mantém depois do lançamento.',

    'about.cta.title.p1': 'Essa forma',
    'about.cta.title.serif': 'de trabalhar',
    'about.cta.title.p2': ' faz sentido?',
    'about.cta.lead':
      'Se procura um colaborador direto, que pergunta antes de codar e que responde no mesmo dia — estamos na mesma página.',

    'services.meta.title': 'Serviços — Creapolis',
    'services.meta.desc':
      'Desenvolvimento de apps móveis, web e desktop. Consultoria de IA prática. Do conceito ao lançamento.',

    'contact.meta.title': 'Contato — Creapolis',
    'contact.meta.desc':
      'Vamos conversar sobre seu projeto. Resposta em menos de 24 horas.',

    'contact.page.eyebrow': 'Contato',
    'contact.page.title.p1': 'Conte sua ideia.',
    'contact.page.title.p2': 'Respondemos no',
    'contact.page.title.serif': 'mesmo dia',
    'contact.page.subtitle':
      'Sem formulários longos. Escreva em 2 minutos, respondo em menos de 24 horas com próximos passos concretos.',
    'contact.promise.title': 'Minha promessa',
    'contact.promise.subtitle': 'Respondo rápido. De verdade.',
    'contact.promise.desc':
      'Sem intermediários. Sem "vou perguntar pro time". Você fala comigo, eu respondo, eu escrevo o código.',
    'contact.promise.metric': 'Tempo de resposta · últimos 90 dias',
    'contact.write.title': 'Ou escreva direto',
    'contact.write.desc': 'Se prefere email sem formulário:',
    'contact.write.office.label': 'Escritório',
    'contact.write.office.value': 'Monterrey, MX',
    'contact.write.hours.label': 'Horário',
    'contact.write.hours.value': 'Seg–Sex, 9–18 CDT',
    'contact.write.lang.label': 'Idiomas',
    'contact.write.lang.value': 'ES · EN · PT',
    'contact.after.title': 'O que acontece depois',
    'contact.after.step1': 'Resposta em < 24h',
    'contact.after.step1.sub': 'Com próximos passos concretos',
    'contact.after.step2': 'Ligação de 30 min',
    'contact.after.step2.sub': 'Sem compromisso, sem vendas',
    'contact.after.step3': 'Proposta em 48h',
    'contact.after.step3.sub': 'Escopo, timeline e orçamento',
    'contact.form.title': 'Começar',
    'contact.form.title.serif': 'aqui',
    'contact.form.intro': 'Só o mínimo. O resto resolvemos na ligação.',
    'contact.form.name': 'Nome',
    'contact.form.email': 'Email',
    'contact.form.type': 'O que quer construir?',
    'contact.form.type.placeholder': 'Selecionar...',
    'contact.form.type.mobile': 'App mobile',
    'contact.form.type.web': 'Aplicação web',
    'contact.form.type.desktop': 'Software desktop',
    'contact.form.type.ai': 'Integração de IA',
    'contact.cta.form.type.consult': 'Ainda não sei · preciso de assessoria',
    'contact.form.message': 'Conte um pouco mais',
    'contact.cta.form.message.placeholder':
      'Duas linhas bastam: o que quer construir, para quem, e qualquer data importante.',
    'contact.form.submit': 'Enviar mensagem',
    'contact.form.sending': 'Enviando...',
    'contact.form.response': 'Respondo < 24h',
    'contact.form.ok': 'Recebido! Te escrevo hoje',

    'contact.success.title': 'Mensagem enviada',
    'contact.success.title.serif': 'com sucesso',
    'contact.success.desc':
      'Obrigado por escrever. Respondo em menos de 24 horas com próximos passos concretos.',
    'contact.success.calendar': 'Agendar uma ligação',
    'contact.success.cal.title': '30 min — sem compromisso',
    'contact.success.cal.desc':
      'Se prefere falar direto, escolha um horário que funcione. Sem vendas, sem apresentações — só uma conversa sobre seu projeto.',
    'contact.success.cal.cta': 'Agendar no Calendly',
    'contact.success.email': 'Ou escrever para hola@creapolis.dev',

    'contact.cta.form.error.wait': 'Espere um momento antes de enviar.',
    'contact.cta.form.error.conn':
      'Erro de conexão. Escreva para hola@creapolis.dev',
    'contact.cta.form.success.hp': 'Mensagem enviada. Respondo em breve.',

    'blog.enOnly.title': 'Os artigos estão em espanhol',
    'blog.enOnly.desc':
      'O blog é escrito em espanhol, mas você pode ver a versão em espanhol da página.',
    'blog.enOnly.cta': 'Ver em espanhol',
    'blog.sidebar.author': 'Escrito por',
    'blog.sidebar.authorBio':
      'Estúdio de software em Monterrey. Construo produto com design premium.',
    'blog.sidebar.helpTitle': 'Precisa de ajuda?',
    'blog.sidebar.helpDesc':
      'Agende uma ligação e te aconselho sem compromisso.',
    'blog.sidebar.cta': 'Vamos conversar',
    'blog.sidebar.back': 'Todas as notas',
    'blog.sidebar.share': 'Compartilhar',
    'blog.toc.title': 'Neste artigo',
    'blog.toc.reading': 'min de leitura',
    'blog.share.twitter': 'Twitter',
    'blog.share.linkedin': 'LinkedIn',
    'blog.share.whatsapp': 'WhatsApp',
    'blog.share.copy': 'Copiar link',
    'blog.share.copied': 'Copiado!',

    // Blog contextual CTAs per editorial category
    'blog.cta.engineering.title': 'Tem código que precisa de ordem?',
    'blog.cta.engineering.desc':
      'Auditoria de código, refatoração e documentação de arquitetura.',
    'blog.cta.engineering.service': 'Codebase Rescue',
    'blog.cta.mobile.title': 'Quer lançar seu app móvel?',
    'blog.cta.mobile.desc':
      'Da ideia à loja: MVP, design e desenvolvimento com Flutter.',
    'blog.cta.mobile.service': 'MVP Build',
    'blog.cta.aiml.title': 'Quer integrar IA no seu produto?',
    'blog.cta.aiml.desc':
      'Mapeamento de processos, seleção de modelos e roadmap de implementação.',
    'blog.cta.aiml.service': 'AI Audit',
    'blog.cta.product.title': 'Tem uma ideia e não sabe por onde começar?',
    'blog.cta.product.desc':
      'Discovery Sprint: análise de mercado, protótipo e go/no-go em uma semana.',
    'blog.cta.product.service': 'Discovery Sprint',
    'blog.cta.building.title': 'Quer construir algo parecido?',
    'blog.cta.building.desc':
      'Vamos conversar sobre seu projeto. Respondo no mesmo dia.',
    'blog.cta.building.service': 'Contato',
    'blog.cta.default.title': 'Precisa de ajuda com seu projeto?',
    'blog.cta.default.desc':
      'Agende uma ligação e te aconselho sem compromisso.',
    'blog.cta.default.service': 'Vamos conversar',
    'blog.cta.tracking': 'blog_cta_click',

    'solennix.hero.title.serif': 'Solennix',
    'solennix.hero.title.p1': 'Organize eventos',
    'solennix.hero.title.p2': 'como um profissional',
    'solennix.hero.desc':
      'CRM, orçamentos, inventário e dashboard para organizadores profissionais. Tudo em um app.',
    'solennix.hero.chip.prod': 'Em produção',
    'solennix.hero.chip.by': 'Por Creapolis',
    'solennix.download': 'Baixar',
    'solennix.features.eyebrow': 'Funções',
    'solennix.features.title.p1': 'Tudo que você',
    'solennix.features.title.serif': 'precisa',
    'solennix.features.desc':
      'Cada função resolve um problema real. Nada de features decorativas que atrapalham.',
    'solennix.case.eyebrow': 'Case Study',
    'solennix.case.title.p1': 'Do Excel ao sistema.',
    'solennix.case.title.serif': 'Como nasceu o Solennix.',
    'solennix.case.stack': 'Stack técnico',
    'solennix.case.chapters': [
      {
        title: 'O problema',
        text: 'Organizadores de eventos profissionais na LATAM gerenciam tudo no Excel: clientes, orçamentos, inventário, pagos. Cada evento é um arquivo novo. Sem histórico, sem métricas, sem escalabilidade.',
      },
      {
        title: 'A decisão',
        text: 'Construir um CRM vertical para eventos, não um ERP genérico. Um único produto cobrindo o ciclo completo: captação, orçamento, execução e fechamento. Mobile-first porque os organizadores trabalham em campo.',
      },
      {
        title: 'Meu papel',
        text: 'Design, desenvolvimento e operação completa. Da arquitetura de dados à publicação nas lojas. Sem equipe, sem agência, sem intermediários.',
      },
      {
        title: 'A solução',
        text: 'Seis módulos integrados: Gestão de eventos, CRM de clientes, Orçamentos, Inventário, Dashboard e Notificações. Disponível em iOS, Android e web. Offline-first para campo sem sinal.',
      },
      {
        title: 'Engenharia',
        text: 'App nativa com React Native para iOS/Android, backend em Node.js, banco PostgreSQL. Sincronização offline com resolução de conflitos. Push notifications para lembretes de eventos.',
      },
      {
        title: 'Resultados',
        text: 'App em produção com usuários reais na América Latina. Nota 4.8 na App Store. Suporte direto com tempo de resposta menor que 24 horas.',
      },
    ],
    'solennix.case.tech': [
      'React Native',
      'Node.js',
      'PostgreSQL',
      'Push Notifications',
      'Offline-first',
      'iOS',
      'Android',
      'Web',
    ],
    'solennix.pricing.eyebrow': 'Planos',
    'solennix.pricing.title.p1': 'Preços',
    'solennix.pricing.title.serif': 'simples',
    'solennix.pricing.desc':
      'Sem surpresas. Comece grátis e faça upgrade quando precisar.',
    'solennix.pricing.popular': 'Mais popular',
    'solennix.pricing.pro.suffix': '/ mês',
    'solennix.download.title.p1': 'Baixe',
    'solennix.download.title.serif': 'hoje',
    'solennix.download.desc':
      'Seu primeiro evento organizado em minutos. Sem cartão, sem compromisso.',
    'solennix.cta.eyebrow': 'Algo parecido?',
    'solennix.cta.title.p1': 'Precisa de algo',
    'solennix.cta.title.serif': 'tão bom',
    'solennix.cta.lead':
      'Se gostou do Solennix e quer algo parecido para seu segmento, vamos conversar. Construímos essas coisas todos os dias.',
    'solennix.cta.btn': 'Iniciar projeto',

    'solennix.info.platforms.value': 'iOS · Android',
    'solennix.info.platforms.label': 'Plataformas',
    'solennix.info.size.label': 'Tamanho',
    'solennix.info.plans.value': 'Grátis + Pro',
    'solennix.info.plans.label': 'Planos',
    'solennix.info.langs.value': 'ES · EN',
    'solennix.info.langs.label': 'Idiomas',

    'project.back': 'Voltar aos projetos',
    'project.chip.live': 'Em produção',
    'project.chip.dev': 'Em desenvolvimento',
    'project.chip.by': 'Por Creapolis',
    'project.info.platform': 'Plataforma',
    'project.info.category': 'Categoria',
    'project.info.languages': 'Idiomas',
    'project.info.price': 'Preço',
    'project.info.free': 'Grátis',
    'project.features.title.p1': 'Construído com',
    'project.features.title.serif': 'critério',
    'project.features.title.p2': ', não com uma checklist.',
    'project.features.lead':
      'Cada módulo responde a um caso de uso real. Sem features decorativas que parecem boas na demo e atrapalham no dia a dia.',
    'project.case.eyebrow': 'Como construí',
    'project.case.title.p1': 'Decisões que',
    'project.case.title.serif': 'importaram',
    'project.case.stack': 'Stack',
    'project.download.eyebrow': 'Download',
    'project.download.title.p1': 'Experimente',
    'project.download.title.serif': 'hoje',
    'project.download.desc':
      'Grátis, sem contas, sem anúncios chatos. Abra e use.',
    'project.download.eyebrow.dev': 'Em breve',
    'project.download.title.p1.dev': 'Estamos',
    'project.download.title.serif.dev': 'construindo',
    'project.download.desc.dev':
      'Este app está em desenvolvimento. Estamos trabalhando nele e em breve estará disponível.',
    'project.download.store.small': 'Baixar no',
    'project.download.store.soon': 'Em breve no',
    'project.resources.eyebrow': 'Recursos',
    'project.resources.title.p1': 'Aproveite ao máximo',
    'project.resources.read': 'Ler mais →',
    'project.cta.eyebrow': 'Algo parecido?',
    'project.cta.title.p1': 'Precisa de algo',
    'project.cta.title.serif': 'parecido',
    'project.cta.title.p2': '?',
    'project.cta.lead':
      'Se gostou deste app e quer um para seu segmento ou sua ideia, vamos conversar. Construo coisas assim todos os dias.',
    'project.cta.primary': 'Iniciar projeto',
    'project.cta.secondary': 'Ver outros projetos',

    'postdate.locale': 'pt-BR',

    'services.eyebrow': 'Serviços',
    'services.title': 'Faço produto',
    'services.title.serif': 'de ponta a ponta.',
    'services.desc':
      'Descoberta, design, código e deploy. Um único responsável do início ao fim, uma única fatura. Sem agências intermediárias.',
    'services.more': 'Ver serviços e preços',

    'services.page.eyebrow': 'Serviços',
    'services.page.title.p1': 'Produto de ponta a ponta,',
    'services.page.title.serif': 'sem intermediários',
    'services.page.lead':
      'Cinco formas de trabalhar juntos — desde validar uma ideia até manter um produto em produção. Cada serviço tem um resultado claro, entregáveis concretos e um processo transparente.',
    'services.page.audience': 'Para quem',
    'services.page.outcome': 'O que você ganha',
    'services.page.deliverables': 'Entregáveis',
    'services.page.method': 'Método e stack',
    'services.page.how.eyebrow': 'Como trabalho',
    'services.page.how.title.p1': 'Um processo com',
    'services.page.how.title.serif': 'poucas surpresas',
    'services.page.how.lead':
      'Entregas visíveis a cada duas semanas. Canal direto com quem escreve o código. Sem intermediários que percam contexto — nem surpresas no final.',

    'process.eyebrow': 'Como trabalho',
    'process.title': 'Um processo com',
    'process.title.serif': 'poucas surpresas',
    'process.desc':
      'Entregas visíveis a cada duas semanas. Canal direto com quem escreve o código — nunca um intermediário. Assim se constrói confiança: mostrando avanço real, não promessas.',

    'mission.eyebrow': 'Sobre mim',
    'mission.title.p1': 'Não é uma agência.',
    'mission.title.p2': 'É um',
    'mission.title.serif': 'desenvolvedor que vive no produto',
    'mission.desc':
      'Desde 2019 construo software — no início como experimento, agora como trabalho. Você fala comigo, eu respondo, eu escrevo o código. Sem agências, sem equipes que mudam no meio do projeto, sem ninguém que traduza o que você já disse bem.',
    'mission.cta': 'Conheça mais sobre mim',

    'contact.cta.eyebrow': 'Vamos conversar',
    'contact.cta.title.p1': 'Me conte sua ideia.',
    'contact.cta.title.p2': 'Eu respondo',
    'contact.cta.title.serif': 'no mesmo dia',
    'contact.cta.lead':
      'Sem formulários longos. Escreva em 2 minutos, respondo em menos de 24 horas com próximos passos concretos.',

    'hero.eyebrow': 'Estúdio de produto para PMEs · Monterrey',
    'hero.title': 'Software que',
    'hero.title.serif': 'transforma',
    'hero.title.cont': 'ideias em produtos.',
    'hero.lead':
      'Eu desenho e desenvolvo apps móveis, web e desktop para empresas que precisam de produto próprio sem contratar um time completo. Consultoria de IA incluída.',
    'hero.cta': 'Iniciar projeto',
    'hero.ghost': 'Ver meu trabalho ↓',
    'hero.trust.years': '5+ anos',
    'hero.trust.years.label': 'entregando produto',
    'hero.trust.apps': '3 apps próprios',
    'hero.trust.apps.label': 'nas lojas',
    'hero.trust.response': 'Resposta <24h',
    'hero.trust.response.label': 'para cada mensagem',

    'marquee.1': 'Código próprio, sem templates',
    'marquee.2': 'Design em cada pixel',
    'marquee.3': 'Sprints de duas semanas',
    'marquee.4': 'Zero agências intermediárias',
    'marquee.5': 'Produto real, não slides',
    'marquee.6': 'Suporte pós-lançamento',

    'solennix.tagline': 'tudo-em-um para eventos',
    'solennix.desc':
      'CRM, orçamentos, inventário e dashboard para organizadores profissionais na América Latina.',
    'pepinillo.tagline': 'Pomodoro, tarefas e timer',
    'pepinillo.desc':
      'Produtividade tudo-em-um: Pomodoro configurável, tarefas com prioridades e subtarefas, calendário, timer e estatísticas.',
    'peliculas.tagline': 'seu cinema, do seu jeito',
    'peliculas.desc':
      'Catálogo de filmes e séries, listas personalizadas, busca avançada e recomendações baseadas no seu gosto.',
    'subscription-guardian.tagline': 'seu sentinela financeiro',
    'subscription-guardian.desc':
      'Controle suas assinaturas pelo iOS. Alertas antes de cada cobrança, dashboard de gastos e privacidade total sem servidores externos.',

    'shelf.solennix': 'Solennix · Melhoria contínua',
    'shelf.solennix.status': 'Em produção',
    'shelf.solennix.desc':
      'Iteração constante: novas features a partir do feedback de usuários reais, estabilidade e preparação para escalar.',
    'shelf.serene': 'Serene · Diário de gratidão',
    'shelf.serene.status': 'Em desenvolvimento',
    'shelf.serene.desc':
      'Diário de gratidão com IA consciente para ansiedade, burnout e depressão. Feedback terapêutico responsável — sem alucinações, sem diagnósticos, sem prejudicar.',
    'shelf.pepinillo': 'Pepinillo para iOS',
    'shelf.pepinillo.status': 'Em desenvolvimento',
    'shelf.pepinillo.desc':
      'O app de produtividade que já funciona no Android, a caminho do iPhone. Próximo passo: migrar Android para nativo e construir versão desktop.',
    'shelf.sg': 'Subscription Guardian',
    'shelf.sg.status': 'Pré-lançamento',
    'shelf.sg.desc':
      'Controle de assinaturas para iOS. Alertas antes de cada cobrança, dashboard de gastos e privacidade total. Em breve na App Store.',
    'shelf.exploring': 'Em exploração · Assistente conectado',
    'shelf.exploring.status': 'Conceito',
    'shelf.exploring.desc':
      'Ideia em exploração: um assistente que unifica WhatsApp, e-mail e CRM em um único fio para PMEs. Ainda sem nome definido.',

    'services.mobile.num': '01 / Móvel',
    'services.mobile.title': 'Apps móveis',
    'services.mobile.desc':
      'iOS e Android, nativos ou multiplataforma. Publico, dou suporte e mantengo nas lojas.',
    'services.web.num': '02 / Web',
    'services.web.title': 'Apps web',
    'services.web.desc':
      'SPAs, e-commerce e dashboards com Next.js e Astro. Rápidos, seguros e mensuráveis.',
    'services.desktop.num': '03 / Desktop',
    'services.desktop.title': 'Software desktop',
    'services.desktop.desc':
      'macOS, Windows e Linux. Tauri + Rust para desempenho nativo e bundles pequenos.',
    'services.ai.num': '04 / IA',
    'services.ai.title': 'Consultoria de IA',
    'services.ai.desc':
      'Automação de processos, chatbots, análise. Implementação prática, não teoria.',

    'process.discover': 'Descobrir',
    'process.discover.desc':
      'Chamada de 45 min, análise de mercado, roadmap com datas realistas e orçamento.',
    'process.design': 'Desenhar',
    'process.design.desc':
      'Wireframes, protótipo navegável no Figma e sistema de design documentado.',
    'process.build': 'Construir',
    'process.build.desc':
      'Sprints de 2 semanas. Demo toda sexta. Código no seu repositório desde o dia um.',
    'process.launch': 'Lançar',
    'process.launch.desc':
      'QA, publicação nas lojas, métricas. 30 dias de suporte incluídos pós-lançamento.',

    'stats.years': '5+ anos',
    'stats.years.label': 'Construindo produto',
    'stats.apps': '3 apps',
    'stats.apps.label': 'Próprios nas lojas',
    'stats.person': '1 pessoa',
    'stats.person.label': 'Zero intermediários',
    'stats.response': '< 24h',
    'stats.response.label': 'Resposta a cada mensagem',

    'notes.eyebrow': 'Notas',
    'notes.title': 'Pensamos em voz alta',
    'notes.title.serif': 'sobre produto',
    'notes.desc':
      'O que aprendo construindo apps reais — decisões técnicas, erros que paguei, e o que funciona quando o hype some.',
    'notes.cta': 'Ver todas as notas',
    'notes.read': 'Ler nota',

    'contact.eyebrow': 'Vamos conversar',
    'contact.title.p1': 'Me conte sua ideia.',
    'contact.title.p2': 'Eu respondo',
    'contact.title.serif': 'no mesmo dia',
    'contact.lead':
      'Sem formulários longos. Escreva em 2 minutos, respondo em menos de 24 horas com próximos passos.',
    'contact.cta': 'Iniciar conversa',

    // Hub navigation
    'hub.nav.overview': 'Resumo',
    'hub.nav.guide': 'Guia rápido',
    'hub.nav.tips': 'Dicas',
    'hub.nav.support': 'Suporte',
    'hub.nav.changelog': 'Changelog',
    'hub.nav.privacy': 'Privacidade',
    'hub.breadcrumb.projects': 'Projetos',
    'changelog.title': 'Changelog',

    // Blog editorial categories
    'blog.cat.all': 'Todas',
    'blog.cat.engineering': 'Engineering',
    'blog.cat.mobile': 'Mobile',
    'blog.cat.aiml': 'AI/ML',
    'blog.cat.product': 'Product',
    'blog.cat.building': 'Building Creapolis',
    'blog.featured.badge': 'Artigo destaque',
    'blog.spanish.notice': 'Este conteúdo está em espanhol',
  },
} as const;

export type UIKey = keyof (typeof ui)[typeof defaultLang];
