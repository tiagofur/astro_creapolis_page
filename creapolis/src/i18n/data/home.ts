import type { Lang } from '../ui';
import { getPublishedCount, products } from './products';

export interface HomeApps {
  name: string;
  tagline: string;
  desc: string;
  href: string;
  platform: string;
  color: string;
  status: string;
  deviceRows: number[][];
}

export interface HomeShelf {
  ring: string;
  name: string;
  status: string;
  statusLabel: string;
  desc: string;
  progress: number;
  color: string;
  bg: string;
}

export interface HomeService {
  id: string;
  num: string;
  mark: string;
  title: string;
  desc: string;
  tagline?: string;
  price?: string;
}

export interface HomeStep {
  n: string;
  title: string;
  desc: string;
}

export interface HomeStat {
  n: string;
  label: string;
  color: string;
}

const apps: Record<Lang, HomeApps[]> = {
  es: [
    {
      name: 'Solennix',
      tagline: 'todo-en-uno para eventos',
      desc: 'CRM, cotizaciones, inventario y dashboard para organizadores profesionales en Latinoamérica.',
      href: '/proyectos/solennix',
      platform: 'iOS · Android · Web',
      color: 'var(--iris)',
      status: 'live',
      deviceRows: [[3], [2], [1]],
    },
    {
      name: 'Pepinillo',
      tagline: 'Pomodoro, tareas y timer',
      desc: 'Productividad todo-en-uno: Pomodoro configurable, tareas con prioridades y subtasks, calendario, timer y estadísticas.',
      href: '/proyectos/pepinillo',
      platform: 'Android',
      color: 'var(--lime)',
      status: 'live',
      deviceRows: [[2], [3]],
    },
    {
      name: 'Películas',
      tagline: 'tu cine, a tu manera',
      desc: 'Catálogo de películas y series, listas personalizadas, búsqueda avanzada y recomendaciones basadas en tus gustos.',
      href: '/proyectos/peliculas',
      platform: 'Android',
      color: 'var(--coral)',
      status: 'live',
      deviceRows: [[3], [2]],
    },
    {
      name: 'Subscription Guardian',
      tagline: 'tu centinela financiero',
      desc: 'Controlá tus suscripciones desde iOS. Alertas antes de cada cobro, dashboard de gastos y privacidad total sin servidores externos.',
      href: '/proyectos/subscription-guardian',
      platform: 'iOS',
      color: 'var(--sky)',
      status: 'pre_production',
      deviceRows: [[2], [3]],
    },
  ],
  en: [
    {
      name: 'Solennix',
      tagline: 'all-in-one for events',
      desc: 'CRM, quotes, inventory, and dashboard for professional event organizers in Latin America.',
      href: '/proyectos/solennix',
      platform: 'iOS · Android · Web',
      color: 'var(--iris)',
      status: 'live',
      deviceRows: [[3], [2], [1]],
    },
    {
      name: 'Pepinillo',
      tagline: 'Pomodoro, tasks & timer',
      desc: 'All-in-one productivity: configurable Pomodoro, tasks with priorities and subtasks, calendar, timer, and statistics.',
      href: '/proyectos/pepinillo',
      platform: 'Android',
      color: 'var(--lime)',
      status: 'live',
      deviceRows: [[2], [3]],
    },
    {
      name: 'Películas',
      tagline: 'your movies, your way',
      desc: 'Movies and series catalog, custom lists, advanced search, and recommendations based on your taste.',
      href: '/proyectos/peliculas',
      platform: 'Android',
      color: 'var(--coral)',
      status: 'live',
      deviceRows: [[3], [2]],
    },
    {
      name: 'Subscription Guardian',
      tagline: 'your financial sentinel',
      desc: 'Control your subscriptions from iOS. Alerts before each charge, spending dashboard, and total privacy with no external servers.',
      href: '/proyectos/subscription-guardian',
      platform: 'iOS',
      color: 'var(--sky)',
      status: 'pre_production',
      deviceRows: [[2], [3]],
    },
  ],
  pt: [
    {
      name: 'Solennix',
      tagline: 'tudo-em-um para eventos',
      desc: 'CRM, orçamentos, inventário e dashboard para organizadores profissionais na América Latina.',
      href: '/proyectos/solennix',
      platform: 'iOS · Android · Web',
      color: 'var(--iris)',
      status: 'live',
      deviceRows: [[3], [2], [1]],
    },
    {
      name: 'Pepinillo',
      tagline: 'Pomodoro, tarefas e timer',
      desc: 'Produtividade tudo-em-um: Pomodoro configurável, tarefas com prioridades e subtarefas, calendário, timer e estatísticas.',
      href: '/projetos/pepinillo',
      platform: 'Android',
      color: 'var(--lime)',
      status: 'live',
      deviceRows: [[2], [3]],
    },
    {
      name: 'Películas',
      tagline: 'seu cinema, do seu jeito',
      desc: 'Catálogo de filmes e séries, listas personalizadas, busca avançada e recomendações baseadas no seu gosto.',
      href: '/projetos/peliculas',
      platform: 'Android',
      color: 'var(--coral)',
      status: 'live',
      deviceRows: [[3], [2]],
    },
    {
      name: 'Subscription Guardian',
      tagline: 'seu sentinela financeiro',
      desc: 'Controle suas assinaturas do iOS. Alertas antes de cada cobrança, dashboard de gastos e privacidade total sem servidores externos.',
      href: '/projetos/subscription-guardian',
      platform: 'iOS',
      color: 'var(--sky)',
      status: 'pre_production',
      deviceRows: [[2], [3]],
    },
  ],
};

const shelf: Record<Lang, HomeShelf[]> = {
  es: [
    {
      ring: 'Sx',
      name: 'Solennix · Mejora continua',
      status: 'active',
      statusLabel: 'En producción',
      desc: 'Iteración constante: nuevas features por feedback de usuarios reales, estabilidad y preparación para escalar.',
      progress: 92,
      color: 'var(--iris)',
      bg: 'var(--iris-soft)',
    },
    {
      ring: 'Se',
      name: 'Serene · Diario de gratitud',
      status: 'dev',
      statusLabel: 'En desarrollo',
      desc: 'Diario de gratitud con IA consciente para ansiedad, burnout y depresión. Feedback terapéutico responsable — sin alucinaciones, sin diagnósticos, sin dañar.',
      progress: 40,
      color: 'var(--coral)',
      bg: 'var(--coral-soft)',
    },
    {
      ring: 'Pe',
      name: 'Pepinillo para iOS',
      status: 'dev',
      statusLabel: 'En desarrollo',
      desc: 'La app de productividad que ya funciona en Android, camino al iPhone. Próximo paso: migrar Android a nativo y construir versión desktop.',
      progress: 28,
      color: 'var(--lime)',
      bg: 'var(--lime-soft)',
    },
    {
      ring: 'SG',
      name: 'Subscription Guardian',
      status: 'pre',
      statusLabel: 'Pre-lanzamiento',
      desc: 'Control de suscripciones para iOS. Alertas antes de cada cobro, dashboard de gastos y privacidad total. Próximamente en App Store.',
      progress: 70,
      color: 'var(--sky)',
      bg: 'var(--sky-soft)',
    },
    {
      ring: '?',
      name: 'En exploración · Asistente conectado',
      status: 'soon',
      statusLabel: 'Concepto',
      desc: 'Idea explorando: un asistente que unifica WhatsApp, correo y CRM en un solo hilo para PyMEs. Todavía sin nombre definido.',
      progress: 10,
      color: 'var(--amber)',
      bg: 'var(--amber-soft)',
    },
  ],
  en: [
    {
      ring: 'Sx',
      name: 'Solennix · Continuous improvement',
      status: 'active',
      statusLabel: 'In production',
      desc: 'Constant iteration: new features from real user feedback, stability, and preparing to scale.',
      progress: 92,
      color: 'var(--iris)',
      bg: 'var(--iris-soft)',
    },
    {
      ring: 'Se',
      name: 'Serene · Gratitude journal',
      status: 'dev',
      statusLabel: 'In development',
      desc: 'Gratitude journal with conscious AI for anxiety, burnout, and depression. Responsible therapeutic feedback — no hallucinations, no diagnoses, no harm.',
      progress: 40,
      color: 'var(--coral)',
      bg: 'var(--coral-soft)',
    },
    {
      ring: 'Pe',
      name: 'Pepinillo for iOS',
      status: 'dev',
      statusLabel: 'In development',
      desc: 'The productivity app that already works on Android, heading to iPhone. Next step: migrate Android to native and build desktop version.',
      progress: 28,
      color: 'var(--lime)',
      bg: 'var(--lime-soft)',
    },
    {
      ring: 'SG',
      name: 'Subscription Guardian',
      status: 'pre',
      statusLabel: 'Pre-launch',
      desc: 'Subscription control for iOS. Alerts before each charge, spending dashboard, and total privacy. Coming soon to the App Store.',
      progress: 70,
      color: 'var(--sky)',
      bg: 'var(--sky-soft)',
    },
    {
      ring: '?',
      name: 'Exploring · Connected assistant',
      status: 'soon',
      statusLabel: 'Concept',
      desc: 'Exploring an idea: an assistant that unifies WhatsApp, email, and CRM into a single thread for SMBs. Still no defined name.',
      progress: 10,
      color: 'var(--amber)',
      bg: 'var(--amber-soft)',
    },
  ],
  pt: [
    {
      ring: 'Sx',
      name: 'Solennix · Melhoria contínua',
      status: 'active',
      statusLabel: 'Em produção',
      desc: 'Iteração constante: novas features a partir do feedback de usuários reais, estabilidade e preparação para escalar.',
      progress: 92,
      color: 'var(--iris)',
      bg: 'var(--iris-soft)',
    },
    {
      ring: 'Se',
      name: 'Serene · Diário de gratidão',
      status: 'dev',
      statusLabel: 'Em desenvolvimento',
      desc: 'Diário de gratidão com IA consciente para ansiedade, burnout e depressão. Feedback terapêutico responsável — sem alucinações, sem diagnósticos, sem danos.',
      progress: 40,
      color: 'var(--coral)',
      bg: 'var(--coral-soft)',
    },
    {
      ring: 'Pe',
      name: 'Pepinillo para iOS',
      status: 'dev',
      statusLabel: 'Em desenvolvimento',
      desc: 'O app de produtividade que já funciona no Android, a caminho do iPhone. Próximo passo: migrar Android para nativo e construir versão desktop.',
      progress: 28,
      color: 'var(--lime)',
      bg: 'var(--lime-soft)',
    },
    {
      ring: 'SG',
      name: 'Subscription Guardian',
      status: 'pre',
      statusLabel: 'Pré-lançamento',
      desc: 'Controle de assinaturas para iOS. Alertas antes de cada cobrança, dashboard de gastos e privacidade total. Em breve na App Store.',
      progress: 70,
      color: 'var(--sky)',
      bg: 'var(--sky-soft)',
    },
    {
      ring: '?',
      name: 'Em exploração · Assistente conectado',
      status: 'soon',
      statusLabel: 'Conceito',
      desc: 'Explorando uma ideia: um assistente que unifica WhatsApp, email e CRM em um único fluxo para PMEs. Ainda sem nome definido.',
      progress: 10,
      color: 'var(--amber)',
      bg: 'var(--amber-soft)',
    },
  ],
};

const services: Record<Lang, HomeService[]> = {
  es: [
    {
      id: 'ai-agents',
      num: '01 / IA',
      mark: 'a',
      title: 'Agentes de IA & Citas',
      desc: 'Atención 24/7 en WhatsApp/Web, calificación de prospectos, agendamiento automático en Google Calendar/Cal.com y sincronización con tu CRM.',
      tagline: '2 a 4 semanas · Flujos autónomos',
      price: 'Desde $2,500 USD',
    },
    {
      id: 'discovery',
      num: '02 / Sprint',
      mark: 'd',
      title: 'Discovery & Arquitectura',
      desc: 'Auditoría de procesos manuales, roadmap técnico con costos fijos, prototipo interactivo y cálculo de ROI antes de escribir código.',
      tagline: '1 a 2 semanas · 100% acreditable al build',
      price: '$1,200 – $2,000 USD',
    },
    {
      id: 'mvp',
      num: '03 / MVP',
      mark: 'm',
      title: 'Software & Apps a Medida',
      desc: 'Desarrollo full-stack de Web, iOS y Android. Código 100% tuyo desde el día uno, sprints de 2 semanas y demos cada viernes.',
      tagline: '6 a 10 semanas · Producción garantizada',
      price: 'Desde $6,500 USD',
    },
    {
      id: 'rescue',
      num: '04 / Rescate',
      mark: 'r',
      title: 'Rescate de Código',
      desc: 'Auditoría profunda y estabilización de proyectos estancados, bugs críticos, deuda técnica y modernización de arquitectura sin reescribir desde cero.',
      tagline: '2 a 4 semanas · Estabilización urgente',
      price: 'Desde $2,000 USD',
    },
    {
      id: 'continuous',
      num: '05 / Retainer',
      mark: 'c',
      title: 'Desarrollo Continuo & AI Ops',
      desc: 'Capacidad de ingeniería senior dedicada mes a mes. Mantenimiento de agentes, optimización de modelos, nuevas features y SLA de respuesta rápida.',
      tagline: 'Mensual · Sin contratos forzosos',
      price: '$1,200 – $2,500 USD/mes',
    },
    {
      id: 'web-desktop',
      num: '06 / Web',
      mark: 'w',
      title: 'Web & Escritorio a Medida',
      desc: 'Plataformas web, paneles internos y apps de escritorio propias: dashboards, cotizadores e inventarios sin mensualidades por usuario.',
      tagline: '4 a 8 semanas · Sin licencias por usuario',
      price: 'Desde $4,000 USD',
    },
  ],
  en: [
    {
      id: 'ai-agents',
      num: '01 / AI',
      mark: 'a',
      title: 'AI Agents & Scheduling',
      desc: '24/7 WhatsApp & Web support, lead qualification, automatic Google Calendar/Cal.com booking, and real-time CRM deal synchronization.',
      tagline: '2 to 4 weeks · Autonomous workflows',
      price: 'From $2,500 USD',
    },
    {
      id: 'discovery',
      num: '02 / Sprint',
      mark: 'd',
      title: 'Discovery & Architecture',
      desc: 'Process bottleneck audit, fixed-cost technical roadmap, interactive prototype, and ROI calculation before writing code.',
      tagline: '1 to 2 weeks · 100% credited to build',
      price: '$1,200 – $2,000 USD',
    },
    {
      id: 'mvp',
      num: '03 / MVP',
      mark: 'm',
      title: 'Custom Software & Apps',
      desc: 'End-to-end Web, iOS, and Android development. 100% client code ownership, 2-week sprints, and weekly Friday progress demos.',
      tagline: '6 to 10 weeks · Production guaranteed',
      price: 'From $6,500 USD',
    },
    {
      id: 'rescue',
      num: '04 / Rescue',
      mark: 'r',
      title: 'Codebase Rescue',
      desc: 'In-depth audit and stabilization for stalled codebases, critical bugs, technical debt reduction, and modern CI/CD without full rewrites.',
      tagline: '2 to 4 weeks · Urgent stabilization',
      price: 'From $2,000 USD',
    },
    {
      id: 'continuous',
      num: '05 / Retainer',
      mark: 'c',
      title: 'Continuous Dev & AI Ops',
      desc: 'Dedicated monthly senior engineering capacity. Agent maintenance, LLM prompt optimization, new product features, and fast SLA.',
      tagline: 'Monthly · No long-term lock-in',
      price: '$1,200 – $2,500 USD/mo',
    },
    {
      id: 'web-desktop',
      num: '06 / Web',
      mark: 'w',
      title: 'Custom Web & Desktop',
      desc: 'Web platforms, internal dashboards, and desktop apps you own outright: dashboards, quoting tools, and inventories with zero per-seat fees.',
      tagline: '4 to 8 weeks · Zero per-seat licenses',
      price: 'From $4,000 USD',
    },
  ],
  pt: [
    {
      id: 'ai-agents',
      num: '01 / IA',
      mark: 'a',
      title: 'Agentes de IA & Agendamento',
      desc: 'Atendimento 24/7 no WhatsApp e Web, qualificação de leads, agendamento automático no Google Calendar/Cal.com e sincronização com CRM.',
      tagline: '2 a 4 semanas · Fluxos autônomos',
      price: 'A partir de $2,500 USD',
    },
    {
      id: 'discovery',
      num: '02 / Sprint',
      mark: 'd',
      title: 'Discovery & Arquitetura',
      desc: 'Auditoria de gargalos operacionais, roadmap técnico com custos fixos, protótipo interativo e cálculo de ROI antes de programar.',
      tagline: '1 a 2 semanas · 100% creditável ao build',
      price: '$1,200 – $2,000 USD',
    },
    {
      id: 'mvp',
      num: '03 / MVP',
      mark: 'm',
      title: 'Software & Apps sob Medida',
      desc: 'Desenvolvimento full-stack de Web, iOS e Android. Código 100% seu desde o primeiro dia, sprints quinzenais e demos toda sexta-feira.',
      tagline: '6 a 10 semanas · Produção garantida',
      price: 'A partir de $6,500 USD',
    },
    {
      id: 'rescue',
      num: '04 / Resgate',
      mark: 'r',
      title: 'Resgate de Código',
      desc: 'Auditoria profunda e estabilização de projetos travados, bugs críticos, dívida técnica e modernização sem reescrever do zero.',
      tagline: '2 a 4 semanas · Estabilização urgente',
      price: 'A partir de $2,000 USD',
    },
    {
      id: 'continuous',
      num: '05 / Retainer',
      mark: 'c',
      title: 'Desenvolvimento Contínuo & IA Ops',
      desc: 'Capacidade sênior dedicada mês a mês. Manutenção de agentes, ajuste fino de modelos, novas features e resposta rápida.',
      tagline: 'Mensal · Sem contratos forçados',
      price: '$1,200 – $2,500 USD/mês',
    },
    {
      id: 'web-desktop',
      num: '06 / Web',
      mark: 'w',
      title: 'Web & Desktop sob Medida',
      desc: 'Plataformas web, painéis internos e apps de desktop próprios: dashboards, orçadores e inventários sem mensalidade por usuário.',
      tagline: '4 a 8 semanas · Sem licenças por usuário',
      price: 'A partir de $4,000 USD',
    },
  ],
};

const steps: Record<Lang, HomeStep[]> = {
  es: [
    {
      n: '1',
      title: 'Descubrir',
      desc: 'Llamada de 45 min, lectura del mercado, roadmap con fechas realistas y presupuesto.',
    },
    {
      n: '2',
      title: 'Diseñar',
      desc: 'Wireframes, prototipo navegable en Figma y sistema de diseño documentado.',
    },
    {
      n: '3',
      title: 'Construir',
      desc: 'Sprints de 2 semanas. Demo cada viernes. Código en tu repo desde el día uno.',
    },
    {
      n: '4',
      title: 'Lanzar',
      desc: 'QA, publicación en stores, métricas. 30 días de soporte incluidos post-lanzamiento.',
    },
  ],
  en: [
    {
      n: '1',
      title: 'Discover',
      desc: '45-min call, market research, roadmap with realistic dates and budget.',
    },
    {
      n: '2',
      title: 'Design',
      desc: 'Wireframes, navigable prototype in Figma, and documented design system.',
    },
    {
      n: '3',
      title: 'Build',
      desc: '2-week sprints. Demo every Friday. Code in your repo from day one.',
    },
    {
      n: '4',
      title: 'Launch',
      desc: 'QA, store publishing, metrics. 30 days of included post-launch support.',
    },
  ],
  pt: [
    {
      n: '1',
      title: 'Descobrir',
      desc: 'Ligação de 45 min, análise de mercado, roadmap com datas realistas e orçamento.',
    },
    {
      n: '2',
      title: 'Design',
      desc: 'Wireframes, protótipo navegável no Figma e sistema de design documentado.',
    },
    {
      n: '3',
      title: 'Construir',
      desc: 'Sprints de 2 semanas. Demo toda sexta. Código no seu repo desde o dia um.',
    },
    {
      n: '4',
      title: 'Lançar',
      desc: 'QA, publicação nas lojas, métricas. 30 dias de suporte incluídos pós-lançamento.',
    },
  ],
};

const stats: Record<Lang, HomeStat[]> = {
  es: [
    { n: '5+ años', label: 'Construyendo producto', color: 'c1' },
    { n: 'apps', label: 'Propias en tiendas', color: 'c2' },
    { n: '1 persona', label: 'Cero intermediarios', color: 'c3' },
    { n: '< 24h', label: 'Respuesta a cada mensaje', color: 'c4' },
  ],
  en: [
    { n: '5+ years', label: 'Building product', color: 'c1' },
    { n: 'apps', label: 'Own apps in stores', color: 'c2' },
    { n: '1 person', label: 'Zero middlemen', color: 'c3' },
    { n: '< 24h', label: 'Response to every message', color: 'c4' },
  ],
  pt: [
    { n: '5+ anos', label: 'Construindo produto', color: 'c1' },
    { n: 'apps', label: 'Próprios nas lojas', color: 'c2' },
    { n: '1 pessoa', label: 'Zero intermediários', color: 'c3' },
    { n: '< 24h', label: 'Resposta a cada mensagem', color: 'c4' },
  ],
};

export function getHomeServices(lang: Lang): HomeService[] {
  return services[lang];
}

export function getHomeSteps(lang: Lang): HomeStep[] {
  return steps[lang];
}

export function getHomeStats(lang: Lang): HomeStat[] {
  const publishedCount = getPublishedCount();
  return stats[lang].map((stat) => {
    if (
      stat.label.includes('tiendas') ||
      stat.label.includes('stores') ||
      stat.label.includes('lojas')
    ) {
      return { ...stat, n: `${publishedCount} apps` };
    }
    return stat;
  });
}
