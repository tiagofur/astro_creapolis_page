import type { Lang } from '../ui';

export interface ServiceFeature {
  title: string;
  desc: string;
}

export interface ServiceProof {
  label: string;
  text: string;
  link: string;
  linkLabel: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  desc: string;
  fullDesc: string;
  color: string;
  features: ServiceFeature[];
  tech: string[];
  deliverable: string;
  proof: ServiceProof;
}

export interface ProcessStep {
  n: string;
  title: string;
  desc: string;
  details: string[];
}

const services: Record<Lang, ServiceItem[]> = {
  es: [
    {
      id: 'moviles',
      title: 'Apps móviles',
      tagline: 'Apps que la gente abre todos los días',
      desc: 'Mobile es mi terreno. Diseño, codeo y publico apps nativas y cross-platform — eligiendo la tecnología según el problema, no según la moda.',
      fullDesc: 'Flutter para MVP rápido o cuando querés cubrir iOS + Android con una sola codebase. Swift o Kotlin nativo cuando el rendimiento, la integración con hardware, o los patterns de cada plataforma lo exigen. No existe un "stack universal" — existe el stack que sirve a tu caso.',
      color: '#5856D6',
      features: [
        { title: 'Flutter · MVP rápido', desc: 'Una codebase, dos tiendas. Ideal para validar una idea o cubrir ambas plataformas con presupuesto ajustado.' },
        { title: 'iOS nativo', desc: 'Swift + SwiftUI cuando necesitás integración profunda con el sistema, 60fps garantizados, o tu mercado es Apple-first.' },
        { title: 'Android nativo', desc: 'Kotlin + Jetpack Compose para Android-first (LATAM, retail, workforce), Material You, o features del SDK que Flutter no cubre.' },
        { title: 'Stores + soporte', desc: 'Publico en App Store y Google Play, respondo reviews, publico updates. No te entrego el APK y desaparezco.' },
      ],
      tech: ['Flutter', 'Swift', 'SwiftUI', 'Kotlin', 'Jetpack Compose', 'Firebase', 'Room'],
      deliverable: 'App publicada en App Store y Google Play, lista para recibir usuarios',
      proof: {
        label: 'Dónde lo apliqué',
        text: 'Pepinillo (Android, Jetpack Compose) y Películas (Android, Kotlin) en Google Play. Solennix en iOS, Android y web — gestión real de eventos con CRM e inventario.',
        link: '/proyectos',
        linkLabel: 'Ver proyectos reales',
      },
    },
    {
      id: 'web',
      title: 'Apps web',
      tagline: 'Sitios que cargan rápido y convierten',
      desc: 'Web es marketing, producto y ventas en un solo artefacto. Construyo experiencias que cargan en menos de un segundo, posicionan en Google, y convierten a visitantes en clientes.',
      fullDesc: 'Astro para sitios de contenido o marketing. Next.js cuando hay SSR o estado complejo. React puro cuando es una SPA de verdad. Nada de WordPress — ese barco ya se hundió y llevarte ahí es condenarte a plugins rotos y velocidad de 2012.',
      color: '#34C759',
      features: [
        { title: 'Sitios marketing', desc: 'Astro + Tailwind. 95+ Lighthouse en mobile, SEO técnico, cargás en menos de 1s en conexión promedio.' },
        { title: 'Apps con estado', desc: 'Next.js + tRPC + Postgres. Auth, dashboards, portales internos, e-commerce con checkout propio.' },
        { title: 'Headless CMS', desc: 'Sanity/Contentful/Decap + front en Astro o Next. Editorial feliz, developer feliz, build time aceptable.' },
        { title: 'Migración desde WP', desc: 'WordPress → stack moderno sin perder SEO. Redirects 301, sitemap, schema markup, monitoreo post-migración.' },
      ],
      tech: ['Astro', 'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'tRPC', 'PostgreSQL', 'Vercel'],
      deliverable: 'Sitio desplegado, monitoreado y con guía de edición para vos',
      proof: {
        label: 'Dónde lo apliqué',
        text: 'Este mismo sitio. Astro + oklch + Google Fonts + backend en Go para el formulario. Tokens de diseño custom, animaciones con Intersection Observer, performance-first.',
        link: '/',
        linkLabel: 'Ver el sitio (sos vos ahora)',
      },
    },
    {
      id: 'escritorio',
      title: 'Software de escritorio',
      tagline: 'Cuando una web no alcanza',
      desc: 'Escritorio es nicho, pero brutal cuando aplica. Punto de venta offline, herramientas internas, apps que manejan archivos grandes, workflows que no aguantan la latencia de una web.',
      fullDesc: 'Tauri + Rust es mi default para desktop nuevo — apps de 5 a 15MB con rendimiento nativo, contra los 120MB de Electron que arrancan medio minuto. Nativo (Swift, Kotlin) cuando necesitás integración profunda con el sistema. Electron sólo si hay que compartir código con una web existente.',
      color: '#FF9500',
      features: [
        { title: 'Tauri + Rust', desc: 'Mi default 2025. Bundles de ~10MB, cold start en ms, memoria mínima. Web stack adentro, binario nativo afuera.' },
        { title: 'macOS nativo', desc: 'SwiftUI para apps que se sienten como Apple las haría. Integración con Spotlight, Shortcuts, Continuity.' },
        { title: 'Herramientas internas', desc: 'Punto de venta, gestión de inventario, tools para tu operación. A veces la mejor app no es una web.' },
        { title: 'Distribución', desc: 'Code signing, auto-updater, instaladores firmados para Windows, macOS y Linux. Sin warnings de "developer desconocido".' },
      ],
      tech: ['Tauri', 'Rust', 'Swift', 'SwiftUI', '.NET', 'Electron'],
      deliverable: 'Instaladores firmados para Windows, macOS y Linux — listos para distribuir',
      proof: {
        label: 'Dónde lo apliqué',
        text: 'Pepinillo Desktop (en desarrollo, Tauri + Rust) — versión de escritorio con sincronización y widgets de enfoque. Herramientas internas para flujos de eventos.',
        link: '/#shelf',
        linkLabel: 'Ver qué está en construcción',
      },
    },
    {
      id: 'ia',
      title: 'Consultoría de IA',
      tagline: 'IA práctica, sin humo',
      desc: 'La IA está en todos lados y la mitad es marketing. Te ayudo a separar lo que sirve de lo que es hype, y a integrar lo que vale la pena en tu flujo real.',
      fullDesc: 'No vengo a venderte "transformación digital con IA". Vengo a ver dónde podés ahorrar horas semanales con un LLM bien integrado, o dónde un chatbot honesto puede manejar el 80% de consultas recurrentes. Lo demás es fricción disfrazada de innovación.',
      color: '#0071E3',
      features: [
        { title: 'Auditoría de procesos', desc: 'Miro tus flujos, te digo qué tiene sentido automatizar con IA y qué no. Dos días de trabajo. Sin compromiso posterior.' },
        { title: 'Chatbots honestos', desc: 'LLM + tus datos con RAG. Contestan sobre lo que saben, derivan lo que no. Sin alucinaciones sueltas al cliente.' },
        { title: 'Automatización', desc: 'Clasificación de correo, resúmenes de reuniones, extracción de datos de PDFs. Tareas donde el LLM es mejor que una persona por 30 veces.' },
        { title: 'IA en tu producto', desc: 'Feature de IA integrada en tu app existente. Desde search semántico hasta generación de contenido asistida.' },
      ],
      tech: ['OpenAI', 'Anthropic', 'LangChain', 'Python', 'Vector DBs', 'RAG'],
      deliverable: 'IA integrada en tu stack, con límites claros y monitoreo de costo',
      proof: {
        label: 'Dónde lo apliqué',
        text: 'Serene (en desarrollo) — diario de gratitud con IA consciente para ansiedad y burnout. IA con límites definidos: no diagnostica, no alucina, no reemplaza un terapeuta.',
        link: '/#shelf',
        linkLabel: 'Ver Serene en desarrollo',
      },
    },
  ],
  en: [
    {
      id: 'mobile',
      title: 'Mobile apps',
      tagline: 'Apps people open every day',
      desc: 'Mobile is my home turf. I design, code, and ship native and cross-platform apps — picking the tech for the problem, not for the trend.',
      fullDesc: 'Flutter for a fast MVP or when you need iOS + Android on a single codebase. Native Swift or Kotlin when performance, hardware integration, or platform conventions demand it. There\'s no "universal stack" — there\'s the stack that fits your case.',
      color: '#5856D6',
      features: [
        { title: 'Flutter · Fast MVP', desc: 'One codebase, two stores. Ideal to validate an idea or cover both platforms on a tight budget.' },
        { title: 'Native iOS', desc: 'Swift + SwiftUI when you need deep system integration, guaranteed 60fps, or your market is Apple-first.' },
        { title: 'Native Android', desc: 'Kotlin + Jetpack Compose for Android-first (LATAM, retail, workforce), Material You, or SDK features Flutter doesn\'t cover.' },
        { title: 'Stores + support', desc: 'I publish to the App Store and Google Play, answer reviews, and ship updates. I don\'t hand you an APK and disappear.' },
      ],
      tech: ['Flutter', 'Swift', 'SwiftUI', 'Kotlin', 'Jetpack Compose', 'Firebase', 'Room'],
      deliverable: 'App published in the App Store and Google Play, ready for real users',
      proof: {
        label: 'Where I applied it',
        text: 'Pepinillo (Android, Jetpack Compose) and Películas (Android, Kotlin) live on Google Play. Solennix on iOS, Android, and web — real event management with CRM and inventory.',
        link: '/proyectos',
        linkLabel: 'See real projects',
      },
    },
    {
      id: 'web',
      title: 'Web apps',
      tagline: 'Sites that load fast and convert',
      desc: 'Web is marketing, product, and sales in a single artifact. I build experiences that load in under a second, rank on Google, and convert visitors into customers.',
      fullDesc: 'Astro for content or marketing sites. Next.js when there\'s SSR or complex state. Plain React when it\'s truly a SPA. No WordPress — that ship sank. Taking you there means broken plugins and 2012 speed.',
      color: '#34C759',
      features: [
        { title: 'Marketing sites', desc: 'Astro + Tailwind. 95+ Lighthouse on mobile, technical SEO, under 1s load on an average connection.' },
        { title: 'Apps with state', desc: 'Next.js + tRPC + Postgres. Auth, dashboards, internal portals, e-commerce with custom checkout.' },
        { title: 'Headless CMS', desc: 'Sanity/Contentful/Decap + Astro or Next front-end. Happy editors, happy devs, acceptable build time.' },
        { title: 'WP migration', desc: 'WordPress → modern stack without losing SEO. 301 redirects, sitemap, schema markup, post-migration monitoring.' },
      ],
      tech: ['Astro', 'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'tRPC', 'PostgreSQL', 'Vercel'],
      deliverable: 'Site deployed, monitored, and with an editing guide for you',
      proof: {
        label: 'Where I applied it',
        text: 'This very site. Astro + oklch + Google Fonts + a Go backend for the form. Custom design tokens, Intersection Observer animations, performance-first.',
        link: '/',
        linkLabel: 'See the site (you\'re on it)',
      },
    },
    {
      id: 'desktop',
      title: 'Desktop software',
      tagline: 'When the web isn\'t enough',
      desc: 'Desktop is niche, but brutal when it fits. Offline point-of-sale, internal tools, apps that handle large files, workflows that can\'t take web latency.',
      fullDesc: 'Tauri + Rust is my default for new desktop — 5–15MB apps with native performance, versus the 120MB Electron apps that take half a minute to start. Native (Swift, Kotlin) when deep system integration is needed. Electron only if you need to share code with an existing web app.',
      color: '#FF9500',
      features: [
        { title: 'Tauri + Rust', desc: 'My 2025 default. ~10MB bundles, millisecond cold start, minimal memory. Web stack inside, native binary outside.' },
        { title: 'Native macOS', desc: 'SwiftUI for apps that feel like Apple made them. Spotlight, Shortcuts, and Continuity integration.' },
        { title: 'Internal tools', desc: 'Point-of-sale, inventory management, tools for your operation. Sometimes the best app isn\'t a web app.' },
        { title: 'Distribution', desc: 'Code signing, auto-updater, signed installers for Windows, macOS, and Linux. No "unknown developer" warnings.' },
      ],
      tech: ['Tauri', 'Rust', 'Swift', 'SwiftUI', '.NET', 'Electron'],
      deliverable: 'Signed installers for Windows, macOS, and Linux — ready to ship',
      proof: {
        label: 'Where I applied it',
        text: 'Pepinillo Desktop (in development, Tauri + Rust) — desktop version with sync and focus widgets. Internal tools for event workflows.',
        link: '/#shelf',
        linkLabel: 'See what\'s in progress',
      },
    },
    {
      id: 'ai',
      title: 'AI consulting',
      tagline: 'Practical AI, no smoke',
      desc: 'AI is everywhere and half of it is marketing. I help you separate what\'s useful from what\'s hype, and integrate what\'s worth it into your real workflow.',
      fullDesc: 'I\'m not here to sell you "digital transformation with AI". I\'m here to find where you can save weekly hours with a well-integrated LLM, or where an honest chatbot can handle 80% of recurring questions. The rest is friction disguised as innovation.',
      color: '#0071E3',
      features: [
        { title: 'Process audit', desc: 'I look at your flows and tell you what makes sense to automate with AI and what doesn\'t. Two days of work. No commitment afterwards.' },
        { title: 'Honest chatbots', desc: 'LLM + your data with RAG. They answer what they know and escalate what they don\'t. No hallucinations loose on your customers.' },
        { title: 'Automation', desc: 'Email classification, meeting summaries, data extraction from PDFs. Tasks where an LLM beats a person 30x over.' },
        { title: 'AI in your product', desc: 'An AI feature integrated into your existing app. From semantic search to assisted content generation.' },
      ],
      tech: ['OpenAI', 'Anthropic', 'LangChain', 'Python', 'Vector DBs', 'RAG'],
      deliverable: 'AI integrated into your stack, with clear limits and cost monitoring',
      proof: {
        label: 'Where I applied it',
        text: 'Serene (in development) — a gratitude journal with conscious AI for anxiety and burnout. AI with defined limits: no diagnosing, no hallucinating, no replacing a therapist.',
        link: '/#shelf',
        linkLabel: 'See Serene in development',
      },
    },
  ],
};

const process: Record<Lang, ProcessStep[]> = {
  es: [
    {
      n: '01',
      title: 'Descubrir',
      desc: 'Escucho tu idea, leo tu mercado y armo un roadmap con fechas realistas.',
      details: ['Llamada de 45 min', 'Análisis de competencia', 'Definición de KPIs', 'Propuesta técnica y presupuesto'],
    },
    {
      n: '02',
      title: 'Diseñar',
      desc: 'Wireframes primero, prototipo navegable después, sistema de diseño documentado al final.',
      details: ['Wireframes en papel digital', 'Prototipo en Figma', 'Diseño UI/UX', 'Design tokens y guía'],
    },
    {
      n: '03',
      title: 'Construir',
      desc: 'Sprints de 2 semanas con demo cada viernes. Código en tu repo desde el día uno — sin black box.',
      details: ['Demo semanal en vivo', 'Código en tu repositorio', 'Tests en lo crítico', 'CI/CD configurado'],
    },
    {
      n: '04',
      title: 'Lanzar',
      desc: 'QA, publicación en tiendas, métricas conectadas. 30 días de soporte incluido post-lanzamiento.',
      details: ['QA cruzado por dispositivo', 'Publicación en stores', 'Analytics y monitoring', 'Soporte 30 días incluido'],
    },
  ],
  en: [
    {
      n: '01',
      title: 'Discover',
      desc: 'I listen to your idea, read your market, and build a roadmap with realistic dates.',
      details: ['45-min call', 'Competitive analysis', 'KPI definition', 'Technical proposal and budget'],
    },
    {
      n: '02',
      title: 'Design',
      desc: 'Wireframes first, navigable prototype second, documented design system at the end.',
      details: ['Digital paper wireframes', 'Figma prototype', 'UI/UX design', 'Design tokens and guide'],
    },
    {
      n: '03',
      title: 'Build',
      desc: '2-week sprints with demos every Friday. Code in your repo from day one — no black box.',
      details: ['Weekly live demo', 'Code in your repo', 'Tests on the critical path', 'CI/CD configured'],
    },
    {
      n: '04',
      title: 'Launch',
      desc: 'QA, store publishing, metrics connected. 30 days of post-launch support included.',
      details: ['Cross-device QA', 'Store publishing', 'Analytics and monitoring', '30 days of included support'],
    },
  ],
};

export function getServicesData(lang: Lang) {
  return { services: services[lang], process: process[lang] };
}
