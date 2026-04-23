import type { Lang } from '../ui';

export interface TimelineItem { year: string; title: string; desc: string }
export interface ValueItem { letter: string; title: string; desc: string }
export interface StackGroup { group: string; items: string[] }

const timeline: Record<Lang, TimelineItem[]> = {
  es: [
    { year: '2019', title: 'Primer commit en Flutter', desc: 'Arranqué con Flutter buscando un stack que me dejara enviar a iOS y Android sin duplicar esfuerzo. Paralelo: Node.js para backend.' },
    { year: '2020', title: 'Nace Creapolis', desc: 'Empecé a firmar trabajo bajo el nombre Creapolis. Proyectos personales, experimentos, y primeras colaboraciones.' },
    { year: '2022', title: 'Primeras apps en tiendas', desc: 'Pepinillo y Películas llegaron a Google Play. No son unicornios — son ejercicios honestos de producto: ¿qué pasa cuando una sola persona decide y construye?' },
    { year: '2024', title: 'Solennix', desc: 'La primera app propia pensada como producto comercial. iOS, Android y web. Gestión de eventos para LATAM. Acá el estudio dejó de ser sólo código y empezó a ser producto con usuarios reales.' },
    { year: 'Hoy', title: 'Estudio de una persona', desc: 'Consultoría directa, apps propias en producción, y varios productos en el horno. Sin intermediarios, sin agencia, sin handoffs.' },
  ],
  en: [
    { year: '2019', title: 'First Flutter commit', desc: 'I started with Flutter looking for a stack that would let me ship to iOS and Android without duplicating effort. In parallel: Node.js for backend.' },
    { year: '2020', title: 'Creapolis is born', desc: 'I began signing work under the Creapolis name. Personal projects, experiments, and first collaborations.' },
    { year: '2022', title: 'First apps in stores', desc: 'Pepinillo and Películas reached Google Play. They\'re not unicorns — they\'re honest product exercises: what happens when one person decides and builds?' },
    { year: '2024', title: 'Solennix', desc: 'The first own app conceived as a commercial product. iOS, Android, and web. Event management for LATAM. This is where the studio stopped being just code and started being product with real users.' },
    { year: 'Today', title: 'One-person studio', desc: 'Direct consulting, own apps in production, and several products in the oven. No middlemen, no agency, no handoffs.' },
  ],
};

const values: Record<Lang, ValueItem[]> = {
  es: [
    { letter: 'C', title: 'Conceptos antes que código', desc: 'No escribo una línea hasta entender el problema. Si no podés explicar por qué existe una feature, no debería existir.' },
    { letter: 'D', title: 'Directo, sin intermediarios', desc: 'Hablás con quien escribe el código. Sin project managers, sin traducciones, sin "pregunto al equipo y te aviso".' },
    { letter: 'H', title: 'Honestidad sobre marketing', desc: 'Te digo qué puedo y qué no. Si algo no lo sé, lo investigo. Si algo no se puede, te lo digo antes de cobrarte.' },
    { letter: 'P', title: 'Producto sobre brief', desc: 'El brief es el punto de partida, no la Biblia. Construyo lo que la gente va a usar, no lo que está escrito en un PDF.' },
  ],
  en: [
    { letter: 'C', title: 'Concepts before code', desc: 'I don\'t write a line until I understand the problem. If you can\'t explain why a feature exists, it shouldn\'t exist.' },
    { letter: 'D', title: 'Direct, no middlemen', desc: 'You talk to whoever writes the code. No project managers, no translations, no "let me ask the team and get back to you".' },
    { letter: 'H', title: 'Honesty over marketing', desc: 'I tell you what I can and can\'t do. If I don\'t know something, I research it. If something can\'t be done, I tell you before billing you.' },
    { letter: 'P', title: 'Product over brief', desc: 'The brief is the starting point, not the Bible. I build what people will actually use, not what\'s written in a PDF.' },
  ],
};

const stack: Record<Lang, StackGroup[]> = {
  es: [
    { group: 'Mobile', items: ['Flutter', 'Swift', 'Kotlin', 'Jetpack Compose', 'SwiftUI'] },
    { group: 'Backend', items: ['Node.js', 'TypeScript', 'Go', 'Firebase', 'PostgreSQL'] },
    { group: 'Web', items: ['Astro', 'Next.js', 'React', 'Tailwind'] },
    { group: 'IA', items: ['OpenAI API', 'Anthropic', 'LangChain', 'Prompt engineering'] },
  ],
  en: [
    { group: 'Mobile', items: ['Flutter', 'Swift', 'Kotlin', 'Jetpack Compose', 'SwiftUI'] },
    { group: 'Backend', items: ['Node.js', 'TypeScript', 'Go', 'Firebase', 'PostgreSQL'] },
    { group: 'Web', items: ['Astro', 'Next.js', 'React', 'Tailwind'] },
    { group: 'AI', items: ['OpenAI API', 'Anthropic', 'LangChain', 'Prompt engineering'] },
  ],
};

const heroChips: Record<Lang, { dev: string; location: string }> = {
  es: { dev: 'Solo dev', location: 'Monterrey · MX' },
  en: { dev: 'Solo dev', location: 'Monterrey · MX' },
};

export function getAboutData(lang: Lang) {
  return { timeline: timeline[lang], values: values[lang], stack: stack[lang], heroChips: heroChips[lang] };
}
