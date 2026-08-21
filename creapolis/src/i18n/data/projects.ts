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
  status?: string;
  price?: string;
  storeLinks: { apple?: string; google?: string };
  /** Which platforms the product is available on. */
  availablePlatforms?: string[];
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
          text: 'Las apps de productividad están llenas de funciones que nadie usa. Menús anidados, etiquetas, gamificación, racha de días. Todo para que abras la app, no para que trabajes. El 70% de las apps de Pomodoro se abandonan en la primera semana porque piden configuración antes de dejarte trabajar.',
        },
        {
          title: 'La decisión de stack',
          text: 'Android: Kotlin + Jetpack Compose. No Flutter, porque necesitaba WorkManager para timers en background, Room para persistencia local, y Material You para integración nativa con el sistema. iOS: Swift + SwiftUI. No React Native porque las Live Activities y Dynamic Island no tienen equivalente cross-platform.',
        },
        {
          title: 'Offline-first por necesidad',
          text: 'Pepinillo funciona sin internet. Tus datos viven en Room (Android) o SwiftData (iOS). No hay servidor, no hay sync, no hay login. Esto fue una decisión de diseño: una app de productividad no debería depender de la red para funcionar. El tradeoff: no hay sync entre dispositivos en la versión free.',
        },
        {
          title: 'Timers que sobreviven al background',
          text: 'El problema más duro: un Pomodoro de 25 minutos no puede morir cuando el usuario minimiza la app. En Android, WorkManager con Foreground Service mantiene el timer vivo. En iOS, es una combinación de Background Tasks + suena la alarma aunque la app esté cerrada. Ambas plataformas requieren lógica completamente diferente.',
        },
        {
          title: 'Notificaciones que no molestan',
          text: 'Notificaciones de Pomodoro: solo cuando termina una sesión. No hay push marketing, no hay "¿ya hiciste tu Pomodoro hoy?". En Android, WorkManager programa la alarma exacta. En iOS, UserNotifications con Critical Alerts para el timer. La diferencia: iOS requiere permiso explícito para Critical Alerts, Android no.',
        },
        {
          title: 'iOS: Live Activities y Dynamic Island',
          text: 'En iOS 17+, el timer aparece en Dynamic Island y Lock Screen via Live Activities. Esto requiere WidgetKit, ActivityKit, y una arquitectura completamente diferente al timer normal. El tradeoff: más visibilidad para el usuario, más complejidad para el developer. Solo vale la pena si el timer es el core de la app.',
        },
        {
          title: 'Android: Material You y Wear OS',
          text: 'Android se beneficia de Material You: colores dinámicos que se adaptan al wallpaper del usuario. Wear OS extiende el timer al reloj — control de sesiones sin sacar el teléfono. Jetpack Compose hace que la UI se adapte a pantallas pequeñas sin duplicar código.',
        },
        {
          title: 'Performance y métricas reales',
          text: 'Cold start: < 400ms en ambos plataformas. Memory: < 30MB con timer activo. Crash rate: < 0.5% (Firebase Crashlytics). Batería: < 2% por hora de Pomodoro activo. Estas métricas se miden en dispositivos reales, no en emuladores.',
        },
        {
          title: 'Lo que aprendí',
          text: 'Menos es más cuando cada elemento tiene un propósito. La app más usada es la que no tenés que pensar para abrir. Jetpack Compose me permitió iterar el diseño cinco veces sin reescribir la lógica. SwiftUI me enseñó que las plataformas de Apple tienen opiniones fuertes — y a veces es mejor seguir las tuyas propias.',
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
        'Swift',
        'SwiftUI',
      ],
      storeLinks: {
        google:
          'https://play.google.com/store/apps/details?id=dev.creapolis.pepinillo',
        apple:
          'https://apps.apple.com/mx/app/pepinillo-timer-de-enfoque/id6760687424',
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
          text: 'Querés ver una película y terminás viendo tres apps de streaming en paralelo para averiguar dónde está. Una lista que te armaste en una app no sirve en otra. Caos. El 60% de los usuarios abandonan la búsqueda después de 2 apps.',
        },
        {
          title: 'Arquitectura de datos',
          text: 'Películas es una capa propia sobre datos abiertos de cine (TMDB). No hay backend propio — Retrofit consume la API, Room cachea todo localmente. El catálogo es infinito pero tu selección es tuya. El tradeoff: sin backend no hay sync entre dispositivos.',
        },
        {
          title: 'Cache agresivo de imágenes',
          text: 'Coil con cache en memoria + disco. Posters pre-cargados en background scroll. Transiciones animadas entre lista y detalle: el poster se "expande" de su posición. La app se siente rápida porque nunca ves un hueco donde debería ir una portada. Métrica: 0 posters vacíos en scroll normal.',
        },
        {
          title: 'Búsqueda que no bloquea',
          text: 'Búsqueda local con Room + FTS (Full Text Search). Sin debounce innecesario: cada keystroke filtra en < 50ms. Búsqueda avanzada: año, género, calificación, actores, duración. Filtros combinables sin lag. El tradeoff: búsqueda local limitada al catálogo cacheado.',
        },
        {
          title: 'Deep links y navegación',
          text: 'Cada película tiene un deep link estable: /peliculas/{id}. Esto permite compartir directo a una película, volver de un push, o abrir desde un widget. Navigation Compose maneja el stack de navegación con protección contra back-stack corruption.',
        },
        {
          title: 'Offline: lo que funciona y lo que no',
          text: 'Con conexión: catálogo completo, búsqueda, trailers, recomendaciones. Sin conexión: tus listas, favoritos y posters cacheados. Room almacena todo el catálogo visto. El tradeoff: no podés explorar películas nuevas sin red, pero tu colección siempre está disponible.',
        },
        {
          title: 'Performance reales',
          text: 'Cold start: < 500ms. Scroll de catálogo: 60fps con posters de alta resolución. Búsqueda: < 50ms por query. Memoria: < 80MB con 500 posters cacheados. Tamaño APK: < 12MB. Estas métricas se miden en un Xiaomi Redmi Note 11 (gama media), no en un Pixel 7.',
        },
        {
          title: 'Lo que aprendí',
          text: 'Las imágenes son todo en este tipo de app. Coil con cache agresivo, posters pre-cargados, transiciones animadas entre lista y detalle. Android 15 me obligó a repensar permisos y batería — y el resultado fue mejor para el usuario. Hilt simplificó la inyección de dependencias pero agregó complejidad al build.',
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
          text: 'Tenés 5, 10, 15 suscripciones activas y no sabés cuándo te cobran cada una. Terminás pagando servicios que no usás porque olvidaste cancelar. Las apps bancarias no te avisan — te muestran el gasto después de que ya te cobraron. Y los servicios que sí te avisan lo hacen con emails que terminan en spam.',
        },
        {
          title: 'Por qué no cross-platform',
          text: 'Subscription Guardian apunta solo a iOS. Flutter o React Native habrían dado soporte Android, pero el resultado habría sido un wrapper genérico. SwiftData + CloudKit dan sync nativo sin backend. WidgetKit da widgets reales en Lock Screen. Los alerts críticos solo existen en iOS. La alternativa era hacer algo mediocre para dos plataformas, o algo excelente para una.',
        },
        {
          title: 'Privacidad: zero servers',
          text: 'No hay base de datos externa. No hay login. No hay analytics que envíe datos a terceros. Tus suscripciones viven en SwiftData y se sincronizan a través de iCloud vía CloudKit — el mismo sistema que usa Apple Notes. Si Apple no puede leer tus datos, nosotros tampoco. Face ID protege el acceso. El modelo de negocio es compra única (USD 4.99), no freemium con upsell.',
        },
        {
          title: 'Arquitectura local-first',
          text: 'SwiftData maneja la persistencia. CloudKit sincroniza entre dispositivos. Las notificaciones se programan localmente con UserNotifications — no hay servidor que las envíe. Los datos de facturación se procesan en el dispositivo. Si no tenés WiFi, la app funciona igual. Es lo que Apple llama "on-device intelligence" — nosotros lo llamamos "no hay excusa para no respetar tu privacidad".',
        },
        {
          title: 'Widgets y notificaciones',
          text: 'WidgetKit genera widgets para Home Screen y Lock Screen. El widget del Lock Screen muestra el próximo cobro sin desbloquear el teléfono. Las alertas T-48h y T-24h se programan al registrar la suscripción. Alertas críticas para montos mayores a $50 USD. Todo se calcula y almacena localmente — no hay push server.',
        },
        {
          title: 'Face ID y seguridad',
          text: 'Face ID (o Touch ID en iPads antiguos) protege la app al abrir. La data biométrica nunca sale del Secure Enclave. La app no tiene contraseña porque Face ID es la contraseña. Si alguien toma tu teléfono desbloqueado, al menos no ve tus gastos en suscripciones. Es una capa extra que las apps de finanzas bancarias no ofrecen.',
        },
        {
          title: 'Los presets y el onboarding',
          text: 'Registrar una suscripción manualmente toma 30 segundos. Con los presets (Netflix, Spotify, Disney+, iCloud, YouTube Premium) toma 5. Elegís el servicio, el monto se pre-llena, la fecha se calcula. Ghost Detector analiza patrones de uso para sugerir cancelaciones. Todo con ML local — Core ML, no un API externo.',
        },
        {
          title: 'Dónde está hoy',
          text: 'Subscription Guardian está en fase de pre-lanzamiento. No es gratuito ni está disponible en la App Store. Pricing confirmado: USD 4.99 compra única, sin suscripciones, sin anuncios, sin upsell. La arquitectura está construida y verificada. El dashboard y las alertas funcionan. Quedan los tests de aceptación, el TestFlight público y la revisión de Apple.',
        },
      ],
      tech: [
        'Swift',
        'SwiftUI',
        'SwiftData',
        'CloudKit',
        'WidgetKit',
        'UserNotifications',
        'Core ML',
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
          text: 'Productivity apps are full of features nobody uses. Nested menus, labels, gamification, day streaks. All so you open the app, not so you work. 70% of Pomodoro apps are abandoned in the first week because they ask for setup before letting you work.',
        },
        {
          title: 'The stack decision',
          text: 'Android: Kotlin + Jetpack Compose. Not Flutter, because I needed WorkManager for background timers, Room for local persistence, and Material You for native system integration. iOS: Swift + SwiftUI. Not React Native because Live Activities and Dynamic Island have no cross-platform equivalent.',
        },
        {
          title: 'Offline-first by necessity',
          text: 'Pepinillo works without internet. Your data lives in Room (Android) or SwiftData (iOS). No server, no sync, no login. This was a design decision: a productivity app should not depend on the network to function. The tradeoff: no cross-device sync in the free version.',
        },
        {
          title: 'Timers that survive the background',
          text: 'The hardest problem: a 25-minute Pomodoro cannot die when the user minimizes the app. On Android, WorkManager with Foreground Service keeps the timer alive. On iOS, it is a combination of Background Tasks plus the alarm sounds even when the app is closed. Both platforms require completely different logic.',
        },
        {
          title: 'Notifications that do not bother',
          text: 'Pomodoro notifications: only when a session ends. No push marketing, no "did you do your Pomodoro today?". On Android, WorkManager schedules the exact alarm. On iOS, UserNotifications with Critical Alerts for the timer. The difference: iOS requires explicit permission for Critical Alerts, Android does not.',
        },
        {
          title: 'iOS: Live Activities and Dynamic Island',
          text: 'On iOS 17+, the timer appears in Dynamic Island and Lock Screen via Live Activities. This requires WidgetKit, ActivityKit, and a completely different architecture from the normal timer. The tradeoff: more visibility for the user, more complexity for the developer. Only worth it if the timer is the core of the app.',
        },
        {
          title: 'Android: Material You and Wear OS',
          text: 'Android benefits from Material You: dynamic colors that adapt to the user wallpaper. Wear OS extends the timer to the watch — session control without taking out the phone. Jetpack Compose makes the UI adapt to small screens without duplicating code.',
        },
        {
          title: 'Performance and real metrics',
          text: 'Cold start: < 400ms on both platforms. Memory: < 30MB with active timer. Crash rate: < 0.5% (Firebase Crashlytics). Battery: < 2% per hour of active Pomodoro. These metrics are measured on real devices, not emulators.',
        },
        {
          title: 'What I learned',
          text: 'Less is more when every element has a purpose. The most-used app is the one you do not have to think about to open. Jetpack Compose let me iterate the design five times without rewriting logic. SwiftUI taught me that Apple platforms have strong opinions — and sometimes it is better to follow your own.',
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
        'Swift',
        'SwiftUI',
      ],
      storeLinks: {
        google:
          'https://play.google.com/store/apps/details?id=dev.creapolis.pepinillo',
        apple:
          'https://apps.apple.com/mx/app/pepinillo-timer-de-enfoque/id6760687424',
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
          text: 'You want to watch a movie and end up running three streaming apps in parallel just to figure out where it is available. A list you built in one app is useless in another. Chaos. 60% of users abandon the search after 2 apps.',
        },
        {
          title: 'Data architecture',
          text: 'Películas is a custom layer over open movie data (TMDB). No custom backend — Retrofit consumes the API, Room caches everything locally. The catalog is infinite but your selection is yours. The tradeoff: without a backend there is no cross-device sync.',
        },
        {
          title: 'Aggressive image caching',
          text: 'Coil with memory + disk cache. Posters pre-loaded in background scroll. Animated transitions between list and detail: the poster expands from its position. The app feels fast because you never see an empty slot where a poster should be. Metric: 0 empty posters during normal scroll.',
        },
        {
          title: 'Search that does not block',
          text: 'Local search with Room + FTS (Full Text Search). No unnecessary debounce: every keystroke filters in < 50ms. Advanced search: year, genre, rating, cast, duration. Combinable filters without lag. The tradeoff: local search limited to the cached catalog.',
        },
        {
          title: 'Deep links and navigation',
          text: 'Every movie has a stable deep link: /peliculas/{id}. This enables sharing directly to a movie, returning from a push, or opening from a widget. Navigation Compose handles the navigation stack with protection against back-stack corruption.',
        },
        {
          title: 'Offline: what works and what does not',
          text: 'With connection: full catalog, search, trailers, recommendations. Without connection: your lists, favorites, and cached posters. Room stores the entire viewed catalog. The tradeoff: you cannot explore new movies without network, but your collection is always available.',
        },
        {
          title: 'Real performance',
          text: 'Cold start: < 500ms. Catalog scroll: 60fps with high-resolution posters. Search: < 50ms per query. Memory: < 80MB with 500 cached posters. APK size: < 12MB. These metrics are measured on a Xiaomi Redmi Note 11 (mid-range), not a Pixel 7.',
        },
        {
          title: 'What I learned',
          text: 'Images are everything in this kind of app. Coil with aggressive caching, pre-loaded posters, animated transitions between list and detail. Android 15 forced me to rethink permissions and battery — and the result was better for the user. Hilt simplified dependency injection but added complexity to the build.',
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
          text: "You have 5, 10, 15 active subscriptions and don't know when each one charges. You end up paying for services you don't use because you forgot to cancel. Banking apps don't warn you — they show the expense after you've already been charged. And the services that do notify you send emails that end up in spam.",
        },
        {
          title: 'Why not cross-platform',
          text: 'Subscription Guardian targets iOS only. Flutter or React Native would have given Android support, but the result would have been a generic wrapper. SwiftData + CloudKit give native sync without a backend. WidgetKit gives real Lock Screen widgets. Critical alerts only exist on iOS. The alternative was building something mediocre for two platforms, or something excellent for one.',
        },
        {
          title: 'Privacy: zero servers',
          text: "No external database. No login. No analytics sending data to third parties. Your subscriptions live in SwiftData and sync through iCloud via CloudKit — the same system Apple Notes uses. If Apple can't read your data, neither can we. Face ID protects access. The business model is a one-time purchase (USD 4.99), not freemium with upsell.",
        },
        {
          title: 'Local-first architecture',
          text: 'SwiftData handles persistence. CloudKit syncs across devices. Notifications are scheduled locally with UserNotifications — no server sending them. Billing data is processed on-device. No WiFi? The app still works. This is what Apple calls "on-device intelligence" — we call it "no excuse for not respecting your privacy".',
        },
        {
          title: 'Widgets and notifications',
          text: 'WidgetKit generates Home Screen and Lock Screen widgets. The Lock Screen widget shows the next charge without unlocking the phone. T-48h and T-24h alerts are scheduled when you add a subscription. Critical alerts for charges over $50 USD. Everything is calculated and stored locally — no push server.',
        },
        {
          title: 'Face ID and security',
          text: "Face ID (or Touch ID on older iPads) protects the app on launch. Biometric data never leaves the Secure Enclave. The app has no password because Face ID is the password. If someone takes your unlocked phone, they at least can't see your subscription spending. It's an extra layer that banking finance apps don't offer.",
        },
        {
          title: 'Presets and onboarding',
          text: 'Registering a subscription manually takes 30 seconds. With presets (Netflix, Spotify, Disney+, iCloud, YouTube Premium) it takes 5. Pick the service, the amount pre-fills, the date calculates. Ghost Detector analyzes usage patterns to suggest cancellations. All with local ML — Core ML, not an external API.',
        },
        {
          title: 'Where it stands today',
          text: 'Subscription Guardian is in pre-launch. It is not free and is not available on the App Store. Pricing confirmed: USD 4.99 one-time purchase, no subscriptions, no ads, no upsell. The architecture is built and verified. The dashboard and alerts work. What remains: acceptance testing, public TestFlight, and Apple review.',
        },
      ],
      tech: [
        'Swift',
        'SwiftUI',
        'SwiftData',
        'CloudKit',
        'WidgetKit',
        'UserNotifications',
        'Core ML',
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
          text: 'Apps de produtividade estão cheias de funcionalidades que ninguém usa. Menus aninhados, labels, gamificação, streaks de dias. Tudo para você abrir o app, não para você trabalhar. 70% dos apps de Pomodoro são abandonados na primeira semana porque pedem configuração antes de deixar você trabalhar.',
        },
        {
          title: 'A decisão de stack',
          text: 'Android: Kotlin + Jetpack Compose. Não Flutter, porque precisava de WorkManager para timers em background, Room para persistência local, e Material You para integração nativa com o sistema. iOS: Swift + SwiftUI. Não React Native porque Live Activities e Dynamic Island não têm equivalente cross-platform.',
        },
        {
          title: 'Offline-first por necessidade',
          text: 'O Pepinillo funciona sem internet. Seus dados vivem no Room (Android) ou SwiftData (iOS). Sem servidor, sem sync, sem login. Isso foi uma decisão de design: um app de produtividade não deveria depender da rede para funcionar. O tradeoff: sem sync entre dispositivos na versão free.',
        },
        {
          title: 'Timers que sobrevivem ao background',
          text: 'O problema mais difícil: um Pomodoro de 25 minutos não pode morrer quando o usuário minimiza o app. No Android, WorkManager com Foreground Service mantém o timer vivo. No iOS, é uma combinação de Background Tasks + o alarme toca mesmo com o app fechado. Ambas as plataformas requerem lógica completamente diferente.',
        },
        {
          title: 'Notificações que não incomodam',
          text: 'Notificações de Pomodoro: só quando uma sessão termina. Sem push marketing, sem "você fez seu Pomodoro hoje?". No Android, WorkManager agenda o alarme exato. No iOS, UserNotifications com Critical Alerts para o timer. A diferença: iOS requer permissão explícita para Critical Alerts, Android não.',
        },
        {
          title: 'iOS: Live Activities e Dynamic Island',
          text: 'No iOS 17+, o timer aparece no Dynamic Island e Lock Screen via Live Activities. Isso requer WidgetKit, ActivityKit, e uma arquitetura completamente diferente do timer normal. O tradeoff: mais visibilidade para o usuário, mais complexidade para o developer. Só vale a pena se o timer é o core do app.',
        },
        {
          title: 'Android: Material You e Wear OS',
          text: 'Android se beneficia do Material You: cores dinâmicas que se adaptam ao wallpaper do usuário. Wear OS estende o timer ao relógio — controle de sessões sem tirar o telefone. Jetpack Compose faz a UI se adaptar a telas pequenas sem duplicar código.',
        },
        {
          title: 'Performance e métricas reais',
          text: 'Cold start: < 400ms em ambas as plataformas. Memory: < 30MB com timer ativo. Crash rate: < 0.5% (Firebase Crashlytics). Bateria: < 2% por hora de Pomodoro ativo. Essas métricas são medidas em dispositivos reais, não em emuladores.',
        },
        {
          title: 'O que aprendi',
          text: 'Menos é mais quando cada elemento tem um propósito. O app mais usado é aquele que você não precisa pensar para abrir. Jetpack Compose me permitiu iterar o design cinco vezes sem reescrever lógica. SwiftUI me ensinou que as plataformas da Apple têm opiniões fortes — e às vezes é melhor seguir as suas próprias.',
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
        'Swift',
        'SwiftUI',
      ],
      storeLinks: {
        google:
          'https://play.google.com/store/apps/details?id=dev.creapolis.pepinillo',
        apple:
          'https://apps.apple.com/mx/app/pepinillo-timer-de-enfoque/id6760687424',
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
          text: 'Você quer assistir um filme e acaba rodando três apps de streaming em paralelo só pra descobrir onde está disponível. Uma lista que fez em um app é inútil em outro. Caos. 60% dos usuários abandonam a busca após 2 apps.',
        },
        {
          title: 'Arquitetura de dados',
          text: 'Películas é uma camada própria sobre dados abertos de filmes (TMDB). Sem backend próprio — Retrofit consome a API, Room armazena tudo localmente. O catálogo é infinito mas sua seleção é sua. O tradeoff: sem backend não há sync entre dispositivos.',
        },
        {
          title: 'Cache agressivo de imagens',
          text: 'Coil com cache em memória + disco. Posters pré-carregados em scroll de background. Transições animadas entre lista e detalhe: o poster se expande de sua posição. O app parece rápido porque você nunca vê um espaço vazio onde deveria ter um poster. Métrica: 0 posters vazios em scroll normal.',
        },
        {
          title: 'Busca que não bloqueia',
          text: 'Busca local com Room + FTS (Full Text Search). Sem debounce desnecessário: cada keystroke filtra em < 50ms. Busca avançada: ano, gênero, nota, elenco, duração. Filtros combináveis sem lag. O tradeoff: busca local limitada ao catálogo armazenado.',
        },
        {
          title: 'Deep links e navegação',
          text: 'Cada filme tem um deep link estável: /peliculas/{id}. Isso permite compartilhar direto para um filme, voltar de um push, ou abrir de um widget. Navigation Compose gerencia o stack de navegação com proteção contra corrupção de back-stack.',
        },
        {
          title: 'Offline: o que funciona e o que não',
          text: 'Com conexão: catálogo completo, busca, trailers, recomendações. Sem conexão: suas listas, favoritos e posters armazenados. Room armazena todo o catálogo visto. O tradeoff: não pode explorar filmes novos sem rede, mas sua coleção sempre está disponível.',
        },
        {
          title: 'Performance reais',
          text: 'Cold start: < 500ms. Scroll do catálogo: 60fps com posters de alta resolução. Busca: < 50ms por query. Memória: < 80MB com 500 posters armazenados. Tamanho APK: < 12MB. Essas métricas são medidas em um Xiaomi Redmi Note 11 (gama média), não em um Pixel 7.',
        },
        {
          title: 'O que aprendi',
          text: 'Imagens são tudo nesse tipo de app. Coil com cache agressivo, posters pré-carregados, transições animadas entre lista e detalhe. Android 15 me forçou a repensar permissões e bateria — e o resultado ficou melhor para o usuário. Hilt simplificou a injeção de dependências mas adicionou complexidade ao build.',
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
          title: 'O problema',
          text: 'Você tem 5, 10, 15 assinaturas ativas e não sabe quando te cobram cada uma. Acaba pagando por serviços que não usa porque esqueceu de cancelar. Apps bancários não te avisam — mostram o gasto depois que já te cobraram. E os serviços que avisam mandam emails que acabam no spam.',
        },
        {
          title: 'Por que não cross-platform',
          text: 'Subscription Guardian aponta apenas para iOS. Flutter ou React Native dariam suporte ao Android, mas o resultado seria um wrapper genérico. SwiftData + CloudKit dão sync nativo sem backend. WidgetKit dá widgets reais no Lock Screen. Alertas críticos só existem no iOS. A alternativa era fazer algo medíocre para duas plataformas, ou algo excelente para uma.',
        },
        {
          title: 'Privacidade: zero servidores',
          text: 'Não há banco de dados externo. Não há login. Não há analytics enviando dados para terceiros. Suas assinaturas vivem no SwiftData e sincronizam via iCloud com CloudKit — o mesmo sistema que o Apple Notes usa. Se a Apple não pode ler seus dados, nós também não. Face ID protege o acesso. O modelo de negócio é compra única (USD 4.99), não freemium com upsell.',
        },
        {
          title: 'Arquitetura local-first',
          text: 'SwiftData gerencia a persistência. CloudKit sincroniza entre dispositivos. Notificações são programadas localmente com UserNotifications — não há servidor enviando. Dados de cobrança são processados no dispositivo. Sem WiFi? O app funciona igual. É o que a Apple chama de "on-device intelligence" — nós chamamos de "não há desculpa para não respeitar sua privacidade".',
        },
        {
          title: 'Widgets e notificações',
          text: 'WidgetKit gera widgets para Home Screen e Lock Screen. O widget do Lock Screen mostra a próxima cobrança sem desbloquear o celular. Alertas T-48h e T-24h são programados ao adicionar a assinatura. Alertas críticos para cobranças acima de $50 USD. Tudo calculado e armazenado localmente — sem push server.',
        },
        {
          title: 'Face ID e segurança',
          text: 'Face ID (ou Touch ID em iPads antigos) protege o app ao abrir. Dados biométricos nunca saem do Secure Enclave. O app não tem senha porque o Face ID é a senha. Se alguém pega seu celular desbloqueado, pelo menos não vê seus gastos com assinaturas. É uma camada extra que apps de finanças bancárias não oferecem.',
        },
        {
          title: 'Presets e onboarding',
          text: 'Registrar uma assinatura manualmente leva 30 segundos. Com presets (Netflix, Spotify, Disney+, iCloud, YouTube Premium) leva 5. Escolha o serviço, o valor preenche, a data calcula. Ghost Detector analisa padrões de uso para sugerir cancelamentos. Tudo com ML local — Core ML, não uma API externa.',
        },
        {
          title: 'Onde está hoje',
          text: 'Subscription Guardian está em fase de pré-lançamento. Não é gratuito e não está disponível na App Store. Preço confirmado: USD 4.99 compra única, sem assinaturas, sem anúncios, sem upsell. A arquitetura está construída e verificada. O dashboard e os alertas funcionam. O que falta: testes de aceitação, TestFlight público e revisão da Apple.',
        },
      ],
      tech: [
        'Swift',
        'SwiftUI',
        'SwiftData',
        'CloudKit',
        'WidgetKit',
        'UserNotifications',
        'Core ML',
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
    status: canonical.status,
    platform: platformStr || localized.platform,
    price: canonical.pricing.amount
      ? `$${canonical.pricing.amount} ${canonical.pricing.currency}`
      : localized.price,
    availablePlatforms: canonical.platforms
      .filter((pl) => pl.available)
      .map((pl) => pl.id),
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
