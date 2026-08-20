import type { Lang } from '../ui';
import { products } from './products';

export interface ProjectFeature {
  letter: string;
  title: string;
  desc: string;
}
export interface ProjectStoryChapter {
  title: string;
  text: string;
}
export interface ProjectStat {
  v: string;
  l: string;
}
export interface ProjectMockupItem {
  color: string;
  name: string;
  tag: string;
}
export interface ProjectResource {
  icon: string;
  title: string;
  desc: string;
  href: string;
}
export interface ProjectDataEntry {
  name: string;
  tagline: string;
  subtitle: string;
  lead: string;
  color: string;
  colorSoft: string;
  ribbonStops: { offset: string; color: string; opacity: string }[];
  category: string;
  platform: string;
  languages: string;
  featureLabel: string;
  headline: string;
  headlineAccent: string;
  features: ProjectFeature[];
  mockup: {
    headTitle: string;
    headSub: string;
    stats: ProjectStat[];
    listLabel: string;
    listItems: ProjectMockupItem[];
  };
  story: ProjectStoryChapter[];
  tech: string[];
  price?: string;
  storeLinks: { apple?: string; google?: string };
  resources?: ProjectResource[];
}

const projects: Record<Lang, Record<string, ProjectDataEntry>> = {
  es: {
    pepinillo: {
      name: 'Pepinillo',
      tagline: 'Enfoque sin fricción',
      subtitle: 'Pomodoro, tareas y timer para iOS y Android',
      lead: 'Una app de productividad que no te pide aprenderla. Abrís, elegís la tarea, arranca el Pomodoro. Así de simple.',
      color: 'var(--lime)',
      colorSoft: 'var(--lime-soft)',
      ribbonStops: [
        { offset: '0%', color: 'oklch(0.84 0.18 128)', opacity: '0.4' },
        { offset: '100%', color: 'oklch(0.72 0.14 235)', opacity: '0.3' },
      ],
      category: 'Productividad',
      platform: 'Android',
      languages: 'ES · EN',
      featureLabel: 'Módulos · Lo que hace',
      headline: 'Productividad sin ceremonia.',
      headlineAccent: 'Sólo lo que usás todos los días.',
      features: [
        {
          letter: 'P',
          title: 'Pomodoro configurable',
          desc: 'Ajustá duración de focus, descansos cortos y largos. Vinculá una tarea a la sesión y concentrarte en una sola cosa.',
        },
        {
          letter: 'T',
          title: 'Tareas con prioridad',
          desc: 'Lista con prioridades, fechas de vencimiento y subtasks como checklist. Buscá y filtrá por estado: pendientes, completadas, hoy, vencidas.',
        },
        {
          letter: 'C',
          title: 'Vista calendario',
          desc: 'Organizá tus tareas por fecha. Tocá un día y mirá qué tenés que hacer. Sin fricción, sin menús anidados.',
        },
        {
          letter: 'S',
          title: 'Estadísticas honestas',
          desc: 'Dashboard con actividad, promedios y horas de focus reales. Sin gamificación ni streaks que estresan.',
        },
        {
          letter: '⏱',
          title: 'Timer + Stopwatch',
          desc: 'Cuando no necesitás Pomodoro, usá el countdown configurable o el cronómetro. Todo en una sola app.',
        },
        {
          letter: '◐',
          title: 'Temas y personalización',
          desc: 'Light/dark automático, colores personalizables. La versión Premium desbloquea temas extra y sincronización multi-dispositivo.',
        },
      ],
      mockup: {
        headTitle: 'Hoy',
        headSub: '3 tareas activas',
        stats: [
          { v: '12', l: 'Pomodoros' },
          { v: '4.2h', l: 'Focus' },
          { v: '8', l: 'Tareas' },
        ],
        listLabel: 'En progreso',
        listItems: [
          { color: 'var(--lime)', name: 'Diseño landing', tag: '25 min' },
          { color: 'var(--iris)', name: 'Revisar PRs', tag: '10 min' },
          { color: 'var(--amber)', name: 'Email cliente', tag: '5 min' },
        ],
      },
      story: [
        {
          title: 'El problema',
          text: 'Las apps de productividad están llenas de funciones que nadie usa. Menús anidados, etiquetas, gamificación, racha de días. Todo para que abras la app, no para que trabajes.',
        },
        {
          title: 'El enfoque',
          text: 'Pepinillo arrancó con dos cosas: Pomodoro y tareas. Cada feature nuevo responde a "¿esto me ayuda a terminar la tarea, o me distrae?". El calendario, el timer, las subtasks — todo entró porque lo necesitaba yo primero.',
        },
        {
          title: 'Lo que aprendí',
          text: 'Menos es más cuando cada elemento tiene un propósito. La app más usada es la que no tenés que pensar para abrir. Jetpack Compose me permitió iterar el diseño cinco veces sin reescribir la lógica. Crashlytics me enseña dónde se rompe antes de que el usuario me escriba.',
        },
      ],
      tech: [
        'Kotlin',
        'Jetpack Compose',
        'Room',
        'Coroutines',
        'Material You',
        'WorkManager',
        'Firebase Crashlytics',
      ],
      storeLinks: {
        google:
          'https://play.google.com/store/apps/details?id=dev.creapolis.pepinillo',
      },
      resources: [
        {
          icon: '📖',
          title: 'Guía rápida',
          desc: 'Configurá tu primera sesión en menos de 2 minutos.',
          href: '/proyectos/pepinillo/guide',
        },
        {
          icon: '🧠',
          title: 'Tips de enfoque',
          desc: 'Dominá el deep work con estrategias probadas.',
          href: '/proyectos/pepinillo/tips',
        },
        {
          icon: '💬',
          title: 'Feedback y soporte',
          desc: '¿Bug? ¿Idea? ¿Duda? Acá estamos.',
          href: '/proyectos/pepinillo/feedback',
        },
      ],
    },
    peliculas: {
      name: 'Películas',
      tagline: 'Tu cine, a tu manera',
      subtitle: 'Catálogo, listas y recomendaciones para Android',
      lead: 'Descubrí qué mirar esta noche, guardá lo que te gustó, y olvidate de buscar en tres apps distintas qué película era esa.',
      color: 'var(--coral)',
      colorSoft: 'var(--coral-soft)',
      ribbonStops: [
        { offset: '0%', color: 'oklch(0.72 0.18 32)', opacity: '0.4' },
        { offset: '100%', color: 'oklch(0.78 0.16 70)', opacity: '0.3' },
      ],
      category: 'Entretenimiento',
      platform: 'Android',
      languages: 'ES · EN',
      featureLabel: 'Módulos · Lo que hace',
      headline: 'Todo tu cine,',
      headlineAccent: 'en una sola app.',
      features: [
        {
          letter: 'E',
          title: 'Explorá catálogo',
          desc: 'Miles de películas y series, desde los estrenos hasta los clásicos. Buscá por título, actor, director o género.',
        },
        {
          letter: 'L',
          title: 'Listas personalizadas',
          desc: 'Crea listas por géneros, décadas, o lo que se te ocurra. "Para el domingo", "Con mi vieja", como quieras. Tus favoritos con un tap.',
        },
        {
          letter: 'Q',
          title: 'Búsqueda avanzada',
          desc: 'Filtrá por año, género, calificación, actores o duración. Encontrá exactamente lo que tenés ganas de ver.',
        },
        {
          letter: 'i',
          title: 'Detalles completos',
          desc: 'Reparto, puntuación, trailer, trivia y sinopsis. Todo en una vista, sin abrir cinco apps. Recomendaciones basadas en lo que guardaste.',
        },
        {
          letter: '⟳',
          title: 'Sync multi-dispositivo',
          desc: 'Tus listas y favoritos en cualquier dispositivo. Tu cuenta, tu colección, donde estés.',
        },
        {
          letter: '⚡',
          title: 'Rápida y moderna',
          desc: 'Interfaz fluida con cache agresivo de posters, transiciones animadas, y soporte para Android 15. Sin lag, sin esperas.',
        },
      ],
      mockup: {
        headTitle: 'Tu lista',
        headSub: '24 películas guardadas',
        stats: [
          { v: '124', l: 'Vistas' },
          { v: '4.6', l: 'Promedio' },
          { v: '8', l: 'Listas' },
        ],
        listLabel: 'Para ver',
        listItems: [
          { color: 'var(--coral)', name: 'El padrino', tag: '1972' },
          { color: 'var(--iris)', name: 'Interstellar', tag: '2014' },
          { color: 'var(--amber)', name: 'Whiplash', tag: '2014' },
        ],
      },
      story: [
        {
          title: 'El problema',
          text: 'Querés ver una película y terminás viendo tres apps de streaming en paralelo para averiguar dónde está. Una lista que te armaste en una app no sirve en otra. Caos.',
        },
        {
          title: 'El enfoque',
          text: 'Películas es una capa propia sobre datos abiertos de cine. Guardás lo que te importa, creás listas con el criterio que quieras, y la app te dice dónde mirarla. El catálogo sigue siendo infinito — pero tu selección es tuya.',
        },
        {
          title: 'Lo que aprendí',
          text: 'Las imágenes son todo en este tipo de app. Coil con cache agresivo, posters pre-cargados, transiciones animadas entre lista y detalle. La app se siente rápida porque nunca ves un hueco donde debería ir una portada. Android 15 me obligó a repensar permisos y batería — y el resultado fue mejor para el usuario.',
        },
      ],
      tech: ['Kotlin', 'Jetpack Compose', 'Retrofit', 'Coil', 'Room', 'Hilt'],
      storeLinks: {
        google:
          'https://play.google.com/store/apps/details?id=mx.creapolis.peliculas',
      },
    },
    'subscription-guardian': {
      name: 'Subscription Guardian',
      tagline: 'Tu centinela financiero',
      subtitle: 'Control de suscripciones para iOS',
      lead: 'La app que te avisa antes de que te cobren. Eliminá la fatiga de suscripciones con alertas inteligentes, dashboard de gastos y privacidad total.',
      color: 'var(--sky)',
      colorSoft: 'var(--sky-soft)',
      ribbonStops: [
        { offset: '0%', color: 'oklch(0.72 0.14 235)', opacity: '0.4' },
        { offset: '100%', color: 'oklch(0.62 0.2 285)', opacity: '0.3' },
      ],
      category: 'Finanzas',
      platform: 'iOS',
      languages: 'ES · EN',
      featureLabel: 'Módulos · Lo que hace',
      headline: 'Cancelá antes',
      headlineAccent: 'de que te cobren.',
      features: [
        {
          letter: '🔔',
          title: 'Alertas Sentinel',
          desc: 'Notificaciones T-48h y T-24h antes de cada cobro. Alertas críticas para montos mayores a $50 USD. El tiempo justo para decidir si cancelar o mantener.',
        },
        {
          letter: '📊',
          title: 'Dashboard Burn Rate',
          desc: 'Visualizá cuánto se "quema" por mes y por año. Gráficos de dona por categoría, análisis de tendencias y métricas de gasto real al instante.',
        },
        {
          letter: '⚡',
          title: 'Presets inteligentes',
          desc: 'Selección rápida de servicios populares (Netflix, Spotify, Disney+) con logos y colores oficiales. Registro en segundos, sin fricción.',
        },
        {
          letter: '🔒',
          title: 'Privacidad por diseño',
          desc: 'Cero servidores externos. Cero vinculación bancaria. iCloud sync automático vía CloudKit y bloqueo nativo con FaceID. Tus datos son tuyos.',
        },
        {
          letter: '📱',
          title: 'Widgets Lock Screen',
          desc: 'Vistazo rápido del próximo cobro sin abrir la app. Widgets para Home Screen y Lock Screen con actualización en tiempo real.',
        },
        {
          letter: '👻',
          title: 'Ghost Detector (próximo)',
          desc: 'Detecta suscripciones que no usás hace más de 30 días. Motor ML local que predice cuáles podés cancelar sin perder valor. Sin enviar datos a nadie.',
        },
      ],
      mockup: {
        headTitle: 'Próximo cobro',
        headSub: '3 suscripciones activas',
        stats: [
          { v: '$47', l: '/mes' },
          { v: '$564', l: '/año' },
          { v: '3', l: 'Activas' },
        ],
        listLabel: 'Esta semana',
        listItems: [
          { color: 'var(--sky)', name: 'Netflix', tag: '$15.99' },
          { color: 'var(--iris)', name: 'Spotify', tag: '$11.99' },
          { color: 'var(--amber)', name: 'Disney+', tag: '$7.99' },
        ],
      },
      story: [
        {
          title: 'El problema',
          text: 'Tenés 5, 10, 15 suscripciones activas y no sabés cuándo te cobran cada una. Terminás pagando servicios que no usás porque olvidaste cancelar. Las apps bancarias no te avisan — te muestran el gasto después de que ya te cobraron.',
        },
        {
          title: 'El enfoque',
          text: 'Subscription Guardian no es una app de presupuestos. Es un centinela: te avisa ANTES del cobro para que puedas decidir. Presets de marcas conocidas para registro sin fricción, dashboard claro con el "burn rate" real, y alertas locales que no dependen de servidores. SwiftUI + SwiftData para una experiencia 100% nativa Apple.',
        },
        {
          title: 'Lo que viene',
          text: 'Auto-Discovery Engine para detectar suscripciones automáticamente desde el App Store. Ghost Detector con ML local para identificar servicios sin uso. Dashboard elevado con iOS 26 Liquid Glass. Todo sin comprometer la privacidad — sin servidores, sin login, sin compartir datos con terceros.',
        },
      ],
      tech: [
        'Swift',
        'SwiftUI',
        'SwiftData',
        'CloudKit',
        'WidgetKit',
        'UserNotifications',
        'Charts',
        'SF Symbols',
      ],
      storeLinks: {},
      price: '$4.99',
      resources: [
        {
          icon: '📖',
          title: 'Guía rápida',
          desc: 'Configurá tu primera suscripción en menos de 2 minutos.',
          href: '/proyectos/subscription-guardian/guide',
        },
        {
          icon: '💡',
          title: 'Tips de suscripciones',
          desc: 'Estrategias para reducir tu gasto mensual sin perder lo que valorás.',
          href: '/proyectos/subscription-guardian/tips',
        },
        {
          icon: '💬',
          title: 'Feedback y soporte',
          desc: '¿Bug? ¿Idea? ¿Duda? Acá estamos.',
          href: '/proyectos/subscription-guardian/feedback',
        },
      ],
    },
  },
  en: {
    pepinillo: {
      name: 'Pepinillo',
      tagline: 'Focus without friction',
      subtitle: 'Pomodoro, tasks & timer for iOS and Android',
      lead: "A productivity app that doesn't ask you to learn it. Open, pick the task, start the Pomodoro. That simple.",
      color: 'var(--lime)',
      colorSoft: 'var(--lime-soft)',
      ribbonStops: [
        { offset: '0%', color: 'oklch(0.84 0.18 128)', opacity: '0.4' },
        { offset: '100%', color: 'oklch(0.72 0.14 235)', opacity: '0.3' },
      ],
      category: 'Productivity',
      platform: 'Android',
      languages: 'ES · EN',
      featureLabel: 'Modules · What it does',
      headline: 'Productivity without ceremony.',
      headlineAccent: 'Just what you use every day.',
      features: [
        {
          letter: 'P',
          title: 'Configurable Pomodoro',
          desc: 'Adjust focus length, short and long breaks. Link a task to the session and focus on one thing.',
        },
        {
          letter: 'T',
          title: 'Tasks with priority',
          desc: 'List with priorities, due dates, and subtasks as checklists. Search and filter by state: pending, done, today, overdue.',
        },
        {
          letter: 'C',
          title: 'Calendar view',
          desc: 'Organize your tasks by date. Tap a day and see what you need to do. No friction, no nested menus.',
        },
        {
          letter: 'S',
          title: 'Honest stats',
          desc: 'Dashboard with real activity, averages, and focus hours. No gamification, no stressful streaks.',
        },
        {
          letter: '⏱',
          title: 'Timer + Stopwatch',
          desc: "When you don't need Pomodoro, use the configurable countdown or the stopwatch. Everything in one app.",
        },
        {
          letter: '◐',
          title: 'Themes and personalization',
          desc: 'Automatic light/dark, customizable colors. The Premium version unlocks extra themes and multi-device sync.',
        },
      ],
      mockup: {
        headTitle: 'Today',
        headSub: '3 active tasks',
        stats: [
          { v: '12', l: 'Pomodoros' },
          { v: '4.2h', l: 'Focus' },
          { v: '8', l: 'Tasks' },
        ],
        listLabel: 'In progress',
        listItems: [
          { color: 'var(--lime)', name: 'Landing design', tag: '25 min' },
          { color: 'var(--iris)', name: 'Review PRs', tag: '10 min' },
          { color: 'var(--amber)', name: 'Email client', tag: '5 min' },
        ],
      },
      story: [
        {
          title: 'The problem',
          text: 'Productivity apps are full of features nobody uses. Nested menus, labels, gamification, day streaks. All so you open the app, not so you work.',
        },
        {
          title: 'The approach',
          text: 'Pepinillo started with two things: Pomodoro and tasks. Every new feature answers: "does this help me finish the task, or distract me?". The calendar, the timer, the subtasks — they all shipped because I needed them first.',
        },
        {
          title: 'What I learned',
          text: "Less is more when every element has a purpose. The most-used app is the one you don't have to think about to open. Jetpack Compose let me iterate the design five times without rewriting logic. Crashlytics shows me where things break before the user writes me.",
        },
      ],
      tech: [
        'Kotlin',
        'Jetpack Compose',
        'Room',
        'Coroutines',
        'Material You',
        'WorkManager',
        'Firebase Crashlytics',
      ],
      storeLinks: {
        google:
          'https://play.google.com/store/apps/details?id=dev.creapolis.pepinillo',
      },
      resources: [
        {
          icon: '📖',
          title: 'Quick Start Guide',
          desc: 'Set up your first session in under 2 minutes.',
          href: '/proyectos/pepinillo/guide',
        },
        {
          icon: '🧠',
          title: 'Focus Tips & Techniques',
          desc: 'Master deep work with proven strategies.',
          href: '/proyectos/pepinillo/tips',
        },
        {
          icon: '💬',
          title: 'Feedback & Support',
          desc: "Bug report? Feature idea? We're here.",
          href: '/proyectos/pepinillo/feedback',
        },
      ],
    },
    peliculas: {
      name: 'Películas',
      tagline: 'Your movies, your way',
      subtitle: 'Catalog, lists, and recommendations for Android',
      lead: 'Discover what to watch tonight, save what you liked, and stop searching across three different apps for what that movie was called.',
      color: 'var(--coral)',
      colorSoft: 'var(--coral-soft)',
      ribbonStops: [
        { offset: '0%', color: 'oklch(0.72 0.18 32)', opacity: '0.4' },
        { offset: '100%', color: 'oklch(0.78 0.16 70)', opacity: '0.3' },
      ],
      category: 'Entertainment',
      platform: 'Android',
      languages: 'ES · EN',
      featureLabel: 'Modules · What it does',
      headline: 'All your movies,',
      headlineAccent: 'in a single app.',
      features: [
        {
          letter: 'E',
          title: 'Browse catalog',
          desc: 'Thousands of movies and series, from new releases to classics. Search by title, actor, director, or genre.',
        },
        {
          letter: 'L',
          title: 'Custom lists',
          desc: 'Create lists by genre, decade, or whatever you dream up. "For Sundays", "With mom", whatever you want. Your favorites one tap away.',
        },
        {
          letter: 'Q',
          title: 'Advanced search',
          desc: 'Filter by year, genre, rating, cast, or duration. Find exactly what you feel like watching.',
        },
        {
          letter: 'i',
          title: 'Full details',
          desc: 'Cast, rating, trailer, trivia, and synopsis. All in one view, without opening five apps. Recommendations based on what you saved.',
        },
        {
          letter: '⟳',
          title: 'Multi-device sync',
          desc: 'Your lists and favorites on any device. Your account, your collection, wherever you are.',
        },
        {
          letter: '⚡',
          title: 'Fast and modern',
          desc: 'Fluid UI with aggressive poster caching, animated transitions, and Android 15 support. No lag, no waiting.',
        },
      ],
      mockup: {
        headTitle: 'Your list',
        headSub: '24 movies saved',
        stats: [
          { v: '124', l: 'Watched' },
          { v: '4.6', l: 'Average' },
          { v: '8', l: 'Lists' },
        ],
        listLabel: 'To watch',
        listItems: [
          { color: 'var(--coral)', name: 'The Godfather', tag: '1972' },
          { color: 'var(--iris)', name: 'Interstellar', tag: '2014' },
          { color: 'var(--amber)', name: 'Whiplash', tag: '2014' },
        ],
      },
      story: [
        {
          title: 'The problem',
          text: "You want to watch a movie and end up running three streaming apps in parallel just to figure out where it's available. A list you built in one app is useless in another. Chaos.",
        },
        {
          title: 'The approach',
          text: 'Películas is a custom layer over open movie data. You save what matters to you, build lists with whatever criteria you want, and the app tells you where to watch them. The catalog stays infinite — but your selection is yours.',
        },
        {
          title: 'What I learned',
          text: 'Images are everything in this kind of app. Coil with aggressive caching, pre-loaded posters, animated transitions between list and detail. The app feels fast because you never see an empty slot where a poster should be. Android 15 forced me to rethink permissions and battery — and the result was better for the user.',
        },
      ],
      tech: ['Kotlin', 'Jetpack Compose', 'Retrofit', 'Coil', 'Room', 'Hilt'],
      storeLinks: {
        google:
          'https://play.google.com/store/apps/details?id=mx.creapolis.peliculas',
      },
    },
    'subscription-guardian': {
      name: 'Subscription Guardian',
      tagline: 'Your financial sentinel',
      subtitle: 'Subscription control for iOS',
      lead: 'The app that warns you before you get charged. Eliminate subscription fatigue with smart alerts, spending dashboard, and total privacy.',
      color: 'var(--sky)',
      colorSoft: 'var(--sky-soft)',
      ribbonStops: [
        { offset: '0%', color: 'oklch(0.72 0.14 235)', opacity: '0.4' },
        { offset: '100%', color: 'oklch(0.62 0.2 285)', opacity: '0.3' },
      ],
      category: 'Finance',
      platform: 'iOS',
      languages: 'ES · EN',
      featureLabel: 'Modules · What it does',
      headline: 'Cancel before',
      headlineAccent: 'you get charged.',
      features: [
        {
          letter: '🔔',
          title: 'Sentinel Alerts',
          desc: 'T-48h and T-24h notifications before each charge. Critical alerts for amounts over $50 USD. Just enough time to decide whether to cancel or keep.',
        },
        {
          letter: '📊',
          title: 'Burn Rate Dashboard',
          desc: 'See how much you "burn" per month and per year. Donut charts by category, trend analysis, and real spending metrics at a glance.',
        },
        {
          letter: '⚡',
          title: 'Smart presets',
          desc: 'Quick selection of popular services (Netflix, Spotify, Disney+) with official logos and colors. Log a subscription in seconds, zero friction.',
        },
        {
          letter: '🔒',
          title: 'Privacy by design',
          desc: 'Zero external servers. Zero bank linking. Automatic iCloud sync via CloudKit and native FaceID lock. Your data stays yours.',
        },
        {
          letter: '📱',
          title: 'Lock Screen Widgets',
          desc: 'Quick glance at your next charge without opening the app. Home Screen and Lock Screen widgets with real-time updates.',
        },
        {
          letter: '👻',
          title: 'Ghost Detector (coming)',
          desc: "Detects subscriptions you haven't used in 30+ days. Local ML engine predicts which ones you can safely cancel. No data sent anywhere.",
        },
      ],
      mockup: {
        headTitle: 'Next charge',
        headSub: '3 active subscriptions',
        stats: [
          { v: '$47', l: '/month' },
          { v: '$564', l: '/year' },
          { v: '3', l: 'Active' },
        ],
        listLabel: 'This week',
        listItems: [
          { color: 'var(--sky)', name: 'Netflix', tag: '$15.99' },
          { color: 'var(--iris)', name: 'Spotify', tag: '$11.99' },
          { color: 'var(--amber)', name: 'Disney+', tag: '$7.99' },
        ],
      },
      story: [
        {
          title: 'The problem',
          text: "You have 5, 10, 15 active subscriptions and don't know when each one charges. You end up paying for services you don't use because you forgot to cancel. Banking apps don't warn you — they show the expense after you've already been charged.",
        },
        {
          title: 'The approach',
          text: "Subscription Guardian isn't a budgeting app. It's a sentinel: it alerts you BEFORE the charge so you can decide. Brand presets for frictionless sign-up, a clear dashboard showing real \"burn rate\", and local notifications that don't depend on servers. SwiftUI + SwiftData for a 100% native Apple experience.",
        },
        {
          title: "What's coming",
          text: 'Auto-Discovery Engine to detect subscriptions automatically from the App Store. Ghost Detector with local ML to identify unused services. Elevated dashboard with iOS 26 Liquid Glass. All without compromising privacy — no servers, no login, no sharing data with third parties.',
        },
      ],
      tech: [
        'Swift',
        'SwiftUI',
        'SwiftData',
        'CloudKit',
        'WidgetKit',
        'UserNotifications',
        'Charts',
        'SF Symbols',
      ],
      storeLinks: {},
      price: '$4.99',
      resources: [
        {
          icon: '📖',
          title: 'Quick Start',
          desc: 'Set up your first subscription in under 2 minutes.',
          href: '/proyectos/subscription-guardian/guide',
        },
        {
          icon: '💡',
          title: 'Subscription Tips',
          desc: 'Strategies to cut monthly spending without losing what you value.',
          href: '/proyectos/subscription-guardian/tips',
        },
        {
          icon: '💬',
          title: 'Feedback & Support',
          desc: "Bug? Idea? Question? We're here.",
          href: '/proyectos/subscription-guardian/feedback',
        },
      ],
    },
  },
  pt: {
    pepinillo: {
      name: 'Pepinillo',
      tagline: 'Foco sem atrito',
      subtitle: 'Pomodoro, tarefas e timer para iOS e Android',
      lead: 'Um app de produtividade que não pede para você aprendê-lo. Abra, escolha a tarefa, comece o Pomodoro. Simples assim.',
      color: 'var(--lime)',
      colorSoft: 'var(--lime-soft)',
      ribbonStops: [
        { offset: '0%', color: 'oklch(0.84 0.18 128)', opacity: '0.4' },
        { offset: '100%', color: 'oklch(0.72 0.14 235)', opacity: '0.3' },
      ],
      category: 'Produtividade',
      platform: 'Android',
      languages: 'ES · EN',
      featureLabel: 'Módulos · O que faz',
      headline: 'Produtividade sem cerimônia.',
      headlineAccent: 'Só o que você usa todo dia.',
      features: [
        {
          letter: 'P',
          title: 'Pomodoro configurável',
          desc: 'Ajuste o tempo de foco, pausas curtas e longas. Vincule uma tarefa à sessão e concentre-se em uma coisa.',
        },
        {
          letter: 'T',
          title: 'Tarefas com prioridade',
          desc: 'Lista com prioridades, datas de vencimento e subtarefas como checklists. Busca e filtro por estado: pendente, feito, hoje, atrasado.',
        },
        {
          letter: 'C',
          title: 'Vista de calendário',
          desc: 'Organize suas tarefas por data. Toque em um dia e veja o que precisa fazer. Sem atrito, sem menus aninhados.',
        },
        {
          letter: 'S',
          title: 'Estatísticas honestas',
          desc: 'Dashboard com atividade real, médias e horas de foco. Sem gamificação, sem streaks estressantes.',
        },
        {
          letter: '⏱',
          title: 'Timer + Cronômetro',
          desc: 'Quando não precisa de Pomodoro, use a contagem regressiva configurável ou o cronômetro. Tudo em um app.',
        },
        {
          letter: '◐',
          title: 'Temas e personalização',
          desc: 'Claro/escuro automático, cores customizáveis. A versão Premium desbloqueia temas extras e sync multi-dispositivo.',
        },
      ],
      mockup: {
        headTitle: 'Hoje',
        headSub: '3 tarefas ativas',
        stats: [
          { v: '12', l: 'Pomodoros' },
          { v: '4,2h', l: 'Foco' },
          { v: '8', l: 'Tarefas' },
        ],
        listLabel: 'Em andamento',
        listItems: [
          { color: 'var(--lime)', name: 'Design da landing', tag: '25 min' },
          { color: 'var(--iris)', name: 'Revisar PRs', tag: '10 min' },
          { color: 'var(--amber)', name: 'Email ao cliente', tag: '5 min' },
        ],
      },
      story: [
        {
          title: 'O problema',
          text: 'Apps de produtividade estão cheios de funcionalidades que ninguém usa. Menus aninhados, labels, gamificação, streaks de dias. Tudo para você abrir o app, não para você trabalhar.',
        },
        {
          title: 'A abordagem',
          text: 'O Pepinillo começou com duas coisas: Pomodoro e tarefas. Cada nova funcionalidade responde: "isso me ajuda a terminar a tarefa, ou me distrai?". O calendário, o timer, as subtarefas — todos saíram porque eu precisava primeiro.',
        },
        {
          title: 'O que aprendi',
          text: 'Menos é mais quando cada elemento tem um propósito. O app mais usado é aquele que você não precisa pensar para abrir. Jetpack Compose me permitiu iterar o design cinco vezes sem reescrever lógica. Crashlytics mostra onde as coisas quebram antes do usuário me escrever.',
        },
      ],
      tech: [
        'Kotlin',
        'Jetpack Compose',
        'Room',
        'Coroutines',
        'Material You',
        'WorkManager',
        'Firebase Crashlytics',
      ],
      storeLinks: {
        google:
          'https://play.google.com/store/apps/details?id=dev.creapolis.pepinillo',
      },
      resources: [
        {
          icon: '📖',
          title: 'Guia rápido',
          desc: 'Configure sua primeira sessão em menos de 2 minutos.',
          href: '/projetos/pepinillo/guide',
        },
        {
          icon: '🧠',
          title: 'Dicas de foco',
          desc: 'Domine o deep work com estratégias comprovadas.',
          href: '/projetos/pepinillo/tips',
        },
        {
          icon: '💬',
          title: 'Feedback e suporte',
          desc: 'Bug? Ideia? Dúvida? Estamos aqui.',
          href: '/projetos/pepinillo/feedback',
        },
      ],
    },
    peliculas: {
      name: 'Películas',
      tagline: 'Seu cinema, do seu jeito',
      subtitle: 'Catálogo, listas e recomendações para Android',
      lead: 'Descubra o que assistir hoje, salve o que gostou e pare de procurar em três apps diferentes como se chamava aquele filme.',
      color: 'var(--coral)',
      colorSoft: 'var(--coral-soft)',
      ribbonStops: [
        { offset: '0%', color: 'oklch(0.72 0.18 32)', opacity: '0.4' },
        { offset: '100%', color: 'oklch(0.78 0.16 70)', opacity: '0.3' },
      ],
      category: 'Entretenimento',
      platform: 'Android',
      languages: 'ES · EN',
      featureLabel: 'Módulos · O que faz',
      headline: 'Todos os seus filmes,',
      headlineAccent: 'em um só app.',
      features: [
        {
          letter: 'E',
          title: 'Navegue o catálogo',
          desc: 'Milhares de filmes e séries, de lançamentos a clássicos. Busca por título, ator, diretor ou gênero.',
        },
        {
          letter: 'L',
          title: 'Listas customizadas',
          desc: 'Crie listas por gênero, década ou o que quiser inventar. "Para domingos", "Com a mãe", o que for. Seus favoritos a um toque.',
        },
        {
          letter: 'Q',
          title: 'Busca avançada',
          desc: 'Filtre por ano, gênero, nota, elenco ou duração. Encontre exatamente o que quer assistir.',
        },
        {
          letter: 'i',
          title: 'Detalhes completos',
          desc: 'Elenco, nota, trailer, curiosidades e sinopse. Tudo em uma vista, sem abrir cinco apps. Recomendações baseadas no que você salvou.',
        },
        {
          letter: '⟳',
          title: 'Sync multi-dispositivo',
          desc: 'Suas listas e favoritos em qualquer dispositivo. Sua conta, sua coleção, onde estiver.',
        },
        {
          letter: '⚡',
          title: 'Rápido e moderno',
          desc: 'UI fluida com cache agressivo de posters, transições animadas e suporte a Android 15. Sem lag, sem espera.',
        },
      ],
      mockup: {
        headTitle: 'Sua lista',
        headSub: '24 filmes salvos',
        stats: [
          { v: '124', l: 'Assistidos' },
          { v: '4.6', l: 'Média' },
          { v: '8', l: 'Listas' },
        ],
        listLabel: 'Para assistir',
        listItems: [
          { color: 'var(--coral)', name: 'O Poderoso Chefão', tag: '1972' },
          { color: 'var(--iris)', name: 'Interestelar', tag: '2014' },
          { color: 'var(--amber)', name: 'Whiplash', tag: '2014' },
        ],
      },
      story: [
        {
          title: 'O problema',
          text: 'Você quer assistir um filme e acaba rodando três apps de streaming em paralelo só pra descobrir onde está disponível. Uma lista que fez em um app é inútil em outro. Caos.',
        },
        {
          title: 'A abordagem',
          text: 'Películas é uma camada customizada sobre dados abertos de filmes. Você salva o que importa, constrói listas com os critérios que quiser, e o app te diz onde assistir. O catálogo continua infinito — mas sua seleção é sua.',
        },
        {
          title: 'O que aprendi',
          text: 'Imagens são tudo nesse tipo de app. Coil com cache agressivo, posters pré-carregados, transições animadas entre lista e detalhe. O app parece rápido porque você nunca vê um espaço vazio onde deveria ter um poster. Android 15 me forçou a repensar permissões e bateria — e o resultado ficou melhor para o usuário.',
        },
      ],
      tech: ['Kotlin', 'Jetpack Compose', 'Retrofit', 'Coil', 'Room', 'Hilt'],
      storeLinks: {
        google:
          'https://play.google.com/store/apps/details?id=mx.creapolis.peliculas',
      },
    },
    'subscription-guardian': {
      name: 'Subscription Guardian',
      tagline: 'Seu sentinela financeiro',
      subtitle: 'Controle de assinaturas para iOS',
      lead: 'O app que te avisa antes de te cobrarem. Elimine a fadiga de assinaturas com alertas inteligentes, dashboard de gastos e privacidade total.',
      color: 'var(--sky)',
      colorSoft: 'var(--sky-soft)',
      ribbonStops: [
        { offset: '0%', color: 'oklch(0.72 0.14 235)', opacity: '0.4' },
        { offset: '100%', color: 'oklch(0.62 0.2 285)', opacity: '0.3' },
      ],
      category: 'Finanças',
      platform: 'iOS',
      languages: 'ES · EN',
      featureLabel: 'Módulos · O que faz',
      headline: 'Cancele antes',
      headlineAccent: 'de te cobrarem.',
      features: [
        {
          letter: '🔔',
          title: 'Alertas Sentinel',
          desc: 'Notificações T-48h e T-24h antes de cada cobrança. Alertas críticos para valores acima de $50 USD. Tempo suficiente para decidir se cancela ou mantém.',
        },
        {
          letter: '📊',
          title: 'Dashboard Burn Rate',
          desc: 'Visualize quanto se "queima" por mês e por ano. Gráficos de rosca por categoria, análise de tendências e métricas de gasto real na hora.',
        },
        {
          letter: '⚡',
          title: 'Presets inteligentes',
          desc: 'Seleção rápida de serviços populares (Netflix, Spotify, Disney+) com logos e cores oficiais. Cadastro em segundos, sem atrito.',
        },
        {
          letter: '🔒',
          title: 'Privacidade por design',
          desc: 'Zero servidores externos. Zero vinculação bancária. Sync automático via iCloud com CloudKit e bloqueio nativo com FaceID. Seus dados são seus.',
        },
        {
          letter: '📱',
          title: 'Widgets Lock Screen',
          desc: 'Olhada rápida na próxima cobrança sem abrir o app. Widgets para Home Screen e Lock Screen com atualização em tempo real.',
        },
        {
          letter: '👻',
          title: 'Ghost Detector (em breve)',
          desc: 'Detecta assinaturas que você não usa há mais de 30 dias. Motor ML local que prevê quais pode cancelar sem perder valor. Sem enviar dados para ninguém.',
        },
      ],
      mockup: {
        headTitle: 'Próxima cobrança',
        headSub: '3 assinaturas ativas',
        stats: [
          { v: '$47', l: '/mês' },
          { v: '$564', l: '/ano' },
          { v: '3', l: 'Ativas' },
        ],
        listLabel: 'Esta semana',
        listItems: [
          { color: 'var(--sky)', name: 'Netflix', tag: '$15.99' },
          { color: 'var(--iris)', name: 'Spotify', tag: '$11.99' },
          { color: 'var(--amber)', name: 'Disney+', tag: '$7.99' },
        ],
      },
      story: [
        {
          title: 'O problema',
          text: 'Você tem 5, 10, 15 assinaturas ativas e não sabe quando te cobram cada uma. Acaba pagando por serviços que não usa porque esqueceu de cancelar. Apps bancários não te avisam — mostram o gasto depois que já te cobraram.',
        },
        {
          title: 'A abordagem',
          text: 'Subscription Guardian não é um app de orçamento. É um sentinela: te avisa ANTES da cobrança para você decidir. Presets de marcas conhecidas para cadastro sem atrito, dashboard claro com o "burn rate" real, e notificações locais que não dependem de servidores. SwiftUI + SwiftData para uma experiência 100% nativa Apple.',
        },
        {
          title: 'O que vem',
          text: 'Auto-Discovery Engine para detectar assinaturas automaticamente da App Store. Ghost Detector com ML local para identificar serviços sem uso. Dashboard elevado com iOS 26 Liquid Glass. Tudo sem comprometer a privacidade — sem servidores, sem login, sem compartilhar dados com terceiros.',
        },
      ],
      tech: [
        'Swift',
        'SwiftUI',
        'SwiftData',
        'CloudKit',
        'WidgetKit',
        'UserNotifications',
        'Charts',
        'SF Symbols',
      ],
      storeLinks: {},
      price: '$4.99',
      resources: [
        {
          icon: '📖',
          title: 'Guia rápido',
          desc: 'Configure sua primeira assinatura em menos de 2 minutos.',
          href: '/projetos/subscription-guardian/guide',
        },
        {
          icon: '💡',
          title: 'Dicas de assinaturas',
          desc: 'Estratégias para reduzir seu gasto mensal sem perder o que você valoriza.',
          href: '/projetos/subscription-guardian/tips',
        },
        {
          icon: '💬',
          title: 'Feedback e suporte',
          desc: 'Bug? Ideia? Dúvida? Estamos aqui.',
          href: '/projetos/subscription-guardian/feedback',
        },
      ],
    },
  },
};

export function getProjectData(
  lang: Lang,
  slug: string,
): ProjectDataEntry | undefined {
  const localized = projects[lang]?.[slug];
  if (!localized) return undefined;

  // Enrich with canonical product data
  const canonical = products.find((p) => p.slug === slug);
  if (!canonical) return localized;

  const availablePlatforms = canonical.platforms
    .filter((pl) => pl.available)
    .map((pl) => pl.id.toUpperCase());
  const platformStr = availablePlatforms.join(' · ');

  return {
    ...localized,
    // Override with canonical data where it matters
    platform: platformStr || localized.platform,
    price: canonical.pricing.amount
      ? `$${canonical.pricing.amount} ${canonical.pricing.currency}`
      : localized.price,
    storeLinks: {
      apple:
        canonical.stores.find((s) => s.platform === 'ios')?.url ||
        localized.storeLinks.apple,
      google:
        canonical.stores.find((s) => s.platform === 'android')?.url ||
        localized.storeLinks.google,
    },
  };
}

export const PROJECT_SLUGS = [
  'pepinillo',
  'peliculas',
  'subscription-guardian',
] as const;
