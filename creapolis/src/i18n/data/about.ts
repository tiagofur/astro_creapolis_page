import type { Lang } from '../ui';

export interface TimelineItem {
  year: string;
  title: string;
  desc: string;
}
export interface ValueItem {
  letter: string;
  title: string;
  desc: string;
}
export interface StackGroup {
  group: string;
  items: string[];
}
export interface OpsItem {
  icon: string;
  title: string;
  desc: string;
}

const timeline: Record<Lang, TimelineItem[]> = {
  es: [
    {
      year: '2019',
      title: 'Flutter y Node.js',
      desc: 'Arranqué con Flutter para enviar a iOS y Android desde una sola codebase. Node.js para backend. El stack que definiría los próximos años.',
    },
    {
      year: '2020',
      title: 'Nace Creapolis',
      desc: 'Empecé a firmar trabajo bajo el nombre Creapolis. Proyectos propios, experimentos y primeras colaboraciones con clientes reales.',
    },
    {
      year: '2022',
      title: 'Apps en tiendas',
      desc: 'Pepinillo y Películas llegaron a Google Play. Ejercicios honestos de producto: qué pasa cuando una sola persona decide, construye y publica.',
    },
    {
      year: '2024',
      title: 'Solennix',
      desc: 'La primera app propia como producto comercial. iOS, Android y web. Gestión de eventos para LATAM. El estudio dejó de ser sólo código y empezó a ser producto con usuarios reales.',
    },
    {
      year: 'Hoy',
      title: 'Estudio de una persona',
      desc: 'Consultoría directa, apps en producción, y productos en desarrollo. Cada proyecto tiene repo propio, CI/CD, docs y handover. Sin intermediarios.',
    },
  ],
  en: [
    {
      year: '2019',
      title: 'Flutter & Node.js',
      desc: 'Started with Flutter to ship to iOS and Android from a single codebase. Node.js for backend. The stack that would define the next years.',
    },
    {
      year: '2020',
      title: 'Creapolis is born',
      desc: 'I began signing work under the Creapolis name. Own projects, experiments, and first collaborations with real clients.',
    },
    {
      year: '2022',
      title: 'Apps in stores',
      desc: 'Pepinillo and Películas reached Google Play. Honest product exercises: what happens when one person decides, builds, and publishes?',
    },
    {
      year: '2024',
      title: 'Solennix',
      desc: 'The first own app as a commercial product. iOS, Android, and web. Event management for LATAM. The studio stopped being just code and became product with real users.',
    },
    {
      year: 'Today',
      title: 'One-person studio',
      desc: 'Direct consulting, apps in production, and products in development. Every project has its own repo, CI/CD, docs, and handover. No middlemen.',
    },
  ],
  pt: [
    {
      year: '2019',
      title: 'Flutter & Node.js',
      desc: 'Comecei com Flutter para enviar para iOS e Android de uma única base de código. Node.js para backend. O stack que definiria os próximos anos.',
    },
    {
      year: '2020',
      title: 'Nasce a Creapolis',
      desc: 'Comecei a assinar trabalho sob o nome Creapolis. Projetos próprios, experimentos e primeiras colaborações com clientes reais.',
    },
    {
      year: '2022',
      title: 'Apps nas lojas',
      desc: 'Pepinillo e Películas chegaram ao Google Play. Exercícios honestos de produto: o que acontece quando uma só pessoa decide, constrói e publica?',
    },
    {
      year: '2024',
      title: 'Solennix',
      desc: 'O primeiro app próprio como produto comercial. iOS, Android e web. Gestão de eventos para LATAM. O estúdio deixou de ser só código e começou a ser produto com usuários reais.',
    },
    {
      year: 'Hoje',
      title: 'Estúdio de uma pessoa',
      desc: 'Consultoria direta, apps em produção e produtos em desenvolvimento. Cada projeto tem repo próprio, CI/CD, docs e handover. Sem intermediários.',
    },
  ],
};

const values: Record<Lang, ValueItem[]> = {
  es: [
    {
      letter: 'C',
      title: 'Conceptos antes que código',
      desc: 'No escribo una línea hasta entender el problema. Si no podés explicar por qué existe una feature, no debería existir.',
    },
    {
      letter: 'D',
      title: 'Directo, sin intermediarios',
      desc: 'Hablás con quien escribe el código. Sin project managers, sin traducciones, sin "pregunto al equipo y te aviso".',
    },
    {
      letter: 'H',
      title: 'Honestidad sobre marketing',
      desc: 'Te digo qué puedo y qué no. Si algo no lo sé, lo investigo. Si algo no se puede, te lo digo antes de cobrarte.',
    },
    {
      letter: 'P',
      title: 'Producto sobre brief',
      desc: 'El brief es el punto de partida, no la Biblia. Construyo lo que la gente va a usar, no lo que está escrito en un PDF.',
    },
  ],
  en: [
    {
      letter: 'C',
      title: 'Concepts before code',
      desc: "I don't write a line until I understand the problem. If you can't explain why a feature exists, it shouldn't exist.",
    },
    {
      letter: 'D',
      title: 'Direct, no middlemen',
      desc: 'You talk to whoever writes the code. No project managers, no translations, no "let me ask the team and get back to you".',
    },
    {
      letter: 'H',
      title: 'Honesty over marketing',
      desc: "I tell you what I can and can't do. If I don't know something, I research it. If something can't be done, I tell you before billing you.",
    },
    {
      letter: 'P',
      title: 'Product over brief',
      desc: "The brief is the starting point, not the Bible. I build what people will actually use, not what's written in a PDF.",
    },
  ],
  pt: [
    {
      letter: 'C',
      title: 'Conceitos antes do código',
      desc: 'Não escrevo uma linha até entender o problema. Se não consegue explicar por que uma feature existe, não deveria existir.',
    },
    {
      letter: 'D',
      title: 'Direto, sem intermediários',
      desc: 'Você fala com quem escreve o código. Sem gerentes de projeto, sem traduções, sem "deixo perguntar ao time e te aviso".',
    },
    {
      letter: 'H',
      title: 'Honestidade sobre marketing',
      desc: 'Te digo o que posso e o que não posso. Se não sei algo, pesquiso. Se algo não dá, te digo antes de te cobrar.',
    },
    {
      letter: 'P',
      title: 'Produto sobre brief',
      desc: 'O brief é o ponto de partida, não a Bíblia. Construo o que as pessoas vão usar, não o que está escrito em um PDF.',
    },
  ],
};

const stack: Record<Lang, StackGroup[]> = {
  es: [
    {
      group: 'Mobile',
      items: ['Flutter', 'Swift', 'Kotlin', 'Jetpack Compose', 'SwiftUI'],
    },
    {
      group: 'Backend',
      items: ['Node.js', 'TypeScript', 'Go', 'Firebase', 'PostgreSQL'],
    },
    { group: 'Web', items: ['Astro', 'Next.js', 'React', 'Tailwind'] },
    {
      group: 'IA',
      items: ['OpenAI API', 'Anthropic', 'LangChain', 'Prompt engineering'],
    },
  ],
  en: [
    {
      group: 'Mobile',
      items: ['Flutter', 'Swift', 'Kotlin', 'Jetpack Compose', 'SwiftUI'],
    },
    {
      group: 'Backend',
      items: ['Node.js', 'TypeScript', 'Go', 'Firebase', 'PostgreSQL'],
    },
    { group: 'Web', items: ['Astro', 'Next.js', 'React', 'Tailwind'] },
    {
      group: 'AI',
      items: ['OpenAI API', 'Anthropic', 'LangChain', 'Prompt engineering'],
    },
  ],
  pt: [
    {
      group: 'Mobile',
      items: ['Flutter', 'Swift', 'Kotlin', 'Jetpack Compose', 'SwiftUI'],
    },
    {
      group: 'Backend',
      items: ['Node.js', 'TypeScript', 'Go', 'Firebase', 'PostgreSQL'],
    },
    { group: 'Web', items: ['Astro', 'Next.js', 'React', 'Tailwind'] },
    {
      group: 'IA',
      items: ['OpenAI API', 'Anthropic', 'LangChain', 'Prompt engineering'],
    },
  ],
};

const heroChips: Record<Lang, { dev: string; location: string }> = {
  es: { dev: 'Solo dev', location: 'Monterrey · MX' },
  en: { dev: 'Solo dev', location: 'Monterrey · MX' },
  pt: { dev: 'Solo dev', location: 'Monterrey · MX' },
};

const ops: Record<Lang, OpsItem[]> = {
  es: [
    {
      icon: 'repo',
      title: 'Repo propio por proyecto',
      desc: 'Cada cliente tiene su repositorio. Código versionado, historial completo, sin dependencia de nadie.',
    },
    {
      icon: 'ci',
      title: 'CI/CD automatizado',
      desc: 'Tests, linting y deploy automático en cada push. Sin "probalo en tu máquina" — si pasa el CI, funciona.',
    },
    {
      icon: 'docs',
      title: 'Documentación técnica',
      desc: 'Arquitectura, decisiones, setup local, troubleshooting. Tu equipo puede mantenerlo sin preguntarme cada vez.',
    },
    {
      icon: 'backup',
      title: 'Backups y monitoreo',
      desc: 'Base de datos con backups automáticos. Monitoreo de uptime y performance. Alertas antes de que tus usuarios noten.',
    },
    {
      icon: 'handover',
      title: 'Handover completo',
      desc: 'Al finalizar, entrego documentación, acceso a todos los servicios y una sesión de transferencia. No desaparezco.',
    },
    {
      icon: 'support',
      title: 'Soporte post-entrega',
      desc: '30 días de soporte incluido después del lanzamiento. Bugs, ajustes menores, preguntas — sin costo adicional.',
    },
  ],
  en: [
    {
      icon: 'repo',
      title: 'Own repo per project',
      desc: 'Each client gets their own repository. Versioned code, complete history, no dependency on anyone.',
    },
    {
      icon: 'ci',
      title: 'Automated CI/CD',
      desc: 'Tests, linting, and automated deploy on every push. No "try it on your machine" — if CI passes, it works.',
    },
    {
      icon: 'docs',
      title: 'Technical documentation',
      desc: 'Architecture, decisions, local setup, troubleshooting. Your team can maintain it without asking me every time.',
    },
    {
      icon: 'backup',
      title: 'Backups & monitoring',
      desc: 'Database with automatic backups. Uptime and performance monitoring. Alerts before your users notice.',
    },
    {
      icon: 'handover',
      title: 'Complete handover',
      desc: "At project end, I deliver documentation, access to all services, and a transfer session. I don't disappear.",
    },
    {
      icon: 'support',
      title: 'Post-delivery support',
      desc: '30 days of included support after launch. Bugs, minor adjustments, questions — no extra cost.',
    },
  ],
  pt: [
    {
      icon: 'repo',
      title: 'Repo próprio por projeto',
      desc: 'Cada cliente tem seu repositório. Código versionado, histórico completo, sem dependência de ninguém.',
    },
    {
      icon: 'ci',
      title: 'CI/CD automatizado',
      desc: 'Tests, linting e deploy automático em cada push. Sem "teste na sua máquina" — se passa no CI, funciona.',
    },
    {
      icon: 'docs',
      title: 'Documentação técnica',
      desc: 'Arquitetura, decisões, setup local, troubleshooting. Sua equipe pode manter sem me perguntar cada vez.',
    },
    {
      icon: 'backup',
      title: 'Backups e monitoramento',
      desc: 'Banco de dados com backups automáticos. Monitoramento de uptime e performance. Alertas antes de seus usuários perceberem.',
    },
    {
      icon: 'handover',
      title: 'Handover completo',
      desc: 'Ao finalizar, entrego documentação, acesso a todos os serviços e uma sessão de transferência. Não desapareço.',
    },
    {
      icon: 'support',
      title: 'Suporte pós-entrega',
      desc: '30 dias de suporte incluídos após o lançamento. Bugs, ajustes menores, perguntas — sem custo adicional.',
    },
  ],
};

export function getAboutData(lang: Lang) {
  return {
    timeline: timeline[lang],
    values: values[lang],
    stack: stack[lang],
    heroChips: heroChips[lang],
    ops: ops[lang],
  };
}
