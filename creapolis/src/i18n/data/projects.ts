import type { Lang } from '../ui';

export interface ProjectFeature { letter: string; title: string; desc: string }
export interface ProjectStoryChapter { title: string; text: string }
export interface ProjectStat { v: string; l: string }
export interface ProjectMockupItem { color: string; name: string; tag: string }
export interface ProjectResource { icon: string; title: string; desc: string; href: string }
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
  storeLinks: { apple?: string; google?: string };
  resources?: ProjectResource[];
}

const projects: Record<Lang, Record<string, ProjectDataEntry>> = {
  es: {
    pepinillo: {
      name: 'Pepinillo',
      tagline: 'Enfoque sin fricción',
      subtitle: 'Pomodoro, tareas y timer para Android',
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
        { letter: 'P', title: 'Pomodoro configurable', desc: 'Ajustá duración de focus, descansos cortos y largos. Vinculá una tarea a la sesión y concentrarte en una sola cosa.' },
        { letter: 'T', title: 'Tareas con prioridad', desc: 'Lista con prioridades, fechas de vencimiento y subtasks como checklist. Buscá y filtrá por estado: pendientes, completadas, hoy, vencidas.' },
        { letter: 'C', title: 'Vista calendario', desc: 'Organizá tus tareas por fecha. Tocá un día y mirá qué tenés que hacer. Sin fricción, sin menús anidados.' },
        { letter: 'S', title: 'Estadísticas honestas', desc: 'Dashboard con actividad, promedios y horas de focus reales. Sin gamificación ni streaks que estresan.' },
        { letter: '⏱', title: 'Timer + Stopwatch', desc: 'Cuando no necesitás Pomodoro, usá el countdown configurable o el cronómetro. Todo en una sola app.' },
        { letter: '◐', title: 'Temas y personalización', desc: 'Light/dark automático, colores personalizables. La versión Premium desbloquea temas extra y sincronización multi-dispositivo.' },
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
        { title: 'El problema', text: 'Las apps de productividad están llenas de funciones que nadie usa. Menús anidados, etiquetas, gamificación, racha de días. Todo para que abras la app, no para que trabajes.' },
        { title: 'El enfoque', text: 'Pepinillo arrancó con dos cosas: Pomodoro y tareas. Cada feature nuevo responde a "¿esto me ayuda a terminar la tarea, o me distrae?". El calendario, el timer, las subtasks — todo entró porque lo necesitaba yo primero.' },
        { title: 'Lo que aprendí', text: 'Menos es más cuando cada elemento tiene un propósito. La app más usada es la que no tenés que pensar para abrir. Jetpack Compose me permitió iterar el diseño cinco veces sin reescribir la lógica. Crashlytics me enseña dónde se rompe antes de que el usuario me escriba.' },
      ],
      tech: ['Kotlin', 'Jetpack Compose', 'Room', 'Coroutines', 'Material You', 'WorkManager', 'Firebase Crashlytics'],
      storeLinks: { google: 'https://play.google.com/store/apps/details?id=dev.creapolis.pepinillo' },
      resources: [
        { icon: '📖', title: 'Guía rápida', desc: 'Configurá tu primera sesión en menos de 2 minutos.', href: '/proyectos/pepinillo/guide' },
        { icon: '🧠', title: 'Tips de enfoque', desc: 'Dominá el deep work con estrategias probadas.', href: '/proyectos/pepinillo/tips' },
        { icon: '💬', title: 'Feedback y soporte', desc: '¿Bug? ¿Idea? ¿Duda? Acá estamos.', href: '/proyectos/pepinillo/feedback' },
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
        { letter: 'E', title: 'Explorá catálogo', desc: 'Miles de películas y series, desde los estrenos hasta los clásicos. Buscá por título, actor, director o género.' },
        { letter: 'L', title: 'Listas personalizadas', desc: 'Crea listas por géneros, décadas, o lo que se te ocurra. "Para el domingo", "Con mi vieja", como quieras. Tus favoritos con un tap.' },
        { letter: 'Q', title: 'Búsqueda avanzada', desc: 'Filtrá por año, género, calificación, actores o duración. Encontrá exactamente lo que tenés ganas de ver.' },
        { letter: 'i', title: 'Detalles completos', desc: 'Reparto, puntuación, trailer, trivia y sinopsis. Todo en una vista, sin abrir cinco apps. Recomendaciones basadas en lo que guardaste.' },
        { letter: '⟳', title: 'Sync multi-dispositivo', desc: 'Tus listas y favoritos en cualquier dispositivo. Tu cuenta, tu colección, donde estés.' },
        { letter: '⚡', title: 'Rápida y moderna', desc: 'Interfaz fluida con cache agresivo de posters, transiciones animadas, y soporte para Android 15. Sin lag, sin esperas.' },
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
        { title: 'El problema', text: 'Querés ver una película y terminás viendo tres apps de streaming en paralelo para averiguar dónde está. Una lista que te armaste en una app no sirve en otra. Caos.' },
        { title: 'El enfoque', text: 'Películas es una capa propia sobre datos abiertos de cine. Guardás lo que te importa, creás listas con el criterio que quieras, y la app te dice dónde mirarla. El catálogo sigue siendo infinito — pero tu selección es tuya.' },
        { title: 'Lo que aprendí', text: 'Las imágenes son todo en este tipo de app. Coil con cache agresivo, posters pre-cargados, transiciones animadas entre lista y detalle. La app se siente rápida porque nunca ves un hueco donde debería ir una portada. Android 15 me obligó a repensar permisos y batería — y el resultado fue mejor para el usuario.' },
      ],
      tech: ['Kotlin', 'Jetpack Compose', 'Retrofit', 'Coil', 'Room', 'Hilt'],
      storeLinks: { google: 'https://play.google.com/store/apps/details?id=mx.creapolis.peliculas' },
    },
  },
  en: {
    pepinillo: {
      name: 'Pepinillo',
      tagline: 'Focus without friction',
      subtitle: 'Pomodoro, tasks & timer for Android',
      lead: 'A productivity app that doesn\'t ask you to learn it. Open, pick the task, start the Pomodoro. That simple.',
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
        { letter: 'P', title: 'Configurable Pomodoro', desc: 'Adjust focus length, short and long breaks. Link a task to the session and focus on one thing.' },
        { letter: 'T', title: 'Tasks with priority', desc: 'List with priorities, due dates, and subtasks as checklists. Search and filter by state: pending, done, today, overdue.' },
        { letter: 'C', title: 'Calendar view', desc: 'Organize your tasks by date. Tap a day and see what you need to do. No friction, no nested menus.' },
        { letter: 'S', title: 'Honest stats', desc: 'Dashboard with real activity, averages, and focus hours. No gamification, no stressful streaks.' },
        { letter: '⏱', title: 'Timer + Stopwatch', desc: 'When you don\'t need Pomodoro, use the configurable countdown or the stopwatch. Everything in one app.' },
        { letter: '◐', title: 'Themes and personalization', desc: 'Automatic light/dark, customizable colors. The Premium version unlocks extra themes and multi-device sync.' },
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
        { title: 'The problem', text: 'Productivity apps are full of features nobody uses. Nested menus, labels, gamification, day streaks. All so you open the app, not so you work.' },
        { title: 'The approach', text: 'Pepinillo started with two things: Pomodoro and tasks. Every new feature answers: "does this help me finish the task, or distract me?". The calendar, the timer, the subtasks — they all shipped because I needed them first.' },
        { title: 'What I learned', text: 'Less is more when every element has a purpose. The most-used app is the one you don\'t have to think about to open. Jetpack Compose let me iterate the design five times without rewriting logic. Crashlytics shows me where things break before the user writes me.' },
      ],
      tech: ['Kotlin', 'Jetpack Compose', 'Room', 'Coroutines', 'Material You', 'WorkManager', 'Firebase Crashlytics'],
      storeLinks: { google: 'https://play.google.com/store/apps/details?id=dev.creapolis.pepinillo' },
      resources: [
        { icon: '📖', title: 'Quick Start Guide', desc: 'Set up your first session in under 2 minutes.', href: '/proyectos/pepinillo/guide' },
        { icon: '🧠', title: 'Focus Tips & Techniques', desc: 'Master deep work with proven strategies.', href: '/proyectos/pepinillo/tips' },
        { icon: '💬', title: 'Feedback & Support', desc: 'Bug report? Feature idea? We\'re here.', href: '/proyectos/pepinillo/feedback' },
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
        { letter: 'E', title: 'Browse catalog', desc: 'Thousands of movies and series, from new releases to classics. Search by title, actor, director, or genre.' },
        { letter: 'L', title: 'Custom lists', desc: 'Create lists by genre, decade, or whatever you dream up. "For Sundays", "With mom", whatever you want. Your favorites one tap away.' },
        { letter: 'Q', title: 'Advanced search', desc: 'Filter by year, genre, rating, cast, or duration. Find exactly what you feel like watching.' },
        { letter: 'i', title: 'Full details', desc: 'Cast, rating, trailer, trivia, and synopsis. All in one view, without opening five apps. Recommendations based on what you saved.' },
        { letter: '⟳', title: 'Multi-device sync', desc: 'Your lists and favorites on any device. Your account, your collection, wherever you are.' },
        { letter: '⚡', title: 'Fast and modern', desc: 'Fluid UI with aggressive poster caching, animated transitions, and Android 15 support. No lag, no waiting.' },
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
        { title: 'The problem', text: 'You want to watch a movie and end up running three streaming apps in parallel just to figure out where it\'s available. A list you built in one app is useless in another. Chaos.' },
        { title: 'The approach', text: 'Películas is a custom layer over open movie data. You save what matters to you, build lists with whatever criteria you want, and the app tells you where to watch them. The catalog stays infinite — but your selection is yours.' },
        { title: 'What I learned', text: 'Images are everything in this kind of app. Coil with aggressive caching, pre-loaded posters, animated transitions between list and detail. The app feels fast because you never see an empty slot where a poster should be. Android 15 forced me to rethink permissions and battery — and the result was better for the user.' },
      ],
      tech: ['Kotlin', 'Jetpack Compose', 'Retrofit', 'Coil', 'Room', 'Hilt'],
      storeLinks: { google: 'https://play.google.com/store/apps/details?id=mx.creapolis.peliculas' },
    },
  },
};

export function getProjectData(lang: Lang, slug: string): ProjectDataEntry | undefined {
  return projects[lang]?.[slug];
}

export const PROJECT_SLUGS = ['pepinillo', 'peliculas'] as const;
