import type { Lang } from '../ui';

export interface ServiceDeliverable {
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
  price?: string;
  timeline?: string;
  audience: string;
  outcome: string;
  desc: string;
  deliverables: ServiceDeliverable[];
  tech: string[];
  proof: ServiceProof;
  ctaLabel: string;
  ctaLink: string;
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
      id: 'ai-agents',
      title: 'Agentes de IA, Citas & CRM',
      tagline: 'Atención 24/7, calificación de prospectos y agendamiento automático en tu calendario',
      price: 'Desde $2,500 USD',
      timeline: '2 a 4 semanas',
      audience:
        'Empresas que pierden prospectos por responder tarde o invierten horas coordinando citas manualmente por WhatsApp y correo.',
      outcome:
        'Un agente autónomo conectado a tu WhatsApp/Web, calendario y CRM que responde en segundos, califica al cliente y agenda reuniones sin intervención humana.',
      desc: 'Diseño e integro flujos completos de agentes con IA (para atención externa o uso interno con RAG). El agente conversa de forma natural, consulta disponibilidad real en Google Calendar / Cal.com, agenda la cita, envía recordatorios y registra todo el contexto en tu CRM.',
      deliverables: [
        {
          title: 'Agente omnicanal (WhatsApp / Web)',
          desc: 'Entrenado con tus reglas de negocio, precios y preguntas frecuentes reales.',
        },
        {
          title: 'Flujo de agendamiento en calendario',
          desc: 'Integración directa con Google Calendar, Outlook o Cal.com con confirmación y recordatorios.',
        },
        {
          title: 'Sincronización con CRM y base de datos',
          desc: 'Registro automático de leads, resumen de conversación y estado del trato (HubSpot, Pipedrive o CRM propio).',
        },
        {
          title: 'Agente interno / RAG y traspaso humano',
          desc: 'Consulta de documentos internos/inventario y escalado inmediato a tu equipo cuando un caso requiere atención humana.',
        },
      ],
      tech: ['OpenAI / Claude / Gemini', 'WhatsApp Business API', 'Google Calendar / Cal.com', 'RAG & Vector DB', 'Webhooks & CRM API'],
      proof: {
        label: 'Demo interactiva en vivo',
        text: 'Puedes probar ahora mismo el asistente de Creapolis en la esquina inferior derecha de esta web para ver cómo califica y muestra horarios de calendario en tiempo real.',
        link: '/contacto',
        linkLabel: 'Solicitar demo para tu negocio',
      },
      ctaLabel: 'Cotizar mi agente de IA',
      ctaLink: '/contacto',
    },
    {
      id: 'discovery',
      title: 'Discovery & AI Architecture Sprint',
      tagline: 'Valida tu idea o audita tus procesos con un plan técnico y presupuesto exacto',
      price: '$1,200 – $2,000 USD',
      timeline: '1 a 2 semanas · 100% acreditable al desarrollo',
      audience:
        'Directores y fundadores que quieren automatizar operaciones o lanzar un producto nuevo sin arriesgar presupuesto a ciegas.',
      outcome:
        'Un prototipo navegable, arquitectura técnica de IA/software y presupuesto cerrado listo para ejecutar.',
      desc: 'En 5 a 10 días mapeo tus cuellos de botella o tu idea de producto, diseño los flujos principales en Figma, defino la arquitectura exacta y calculo el retorno de inversión. Si decides construir conmigo, el 100% de este sprint se abona al proyecto.',
      deliverables: [
        {
          title: 'Auditoría de procesos y mercado',
          desc: 'Mapeo de cuellos de botella operativos, oportunidades de ahorro con IA y análisis competitivo.',
        },
        {
          title: 'Prototipo interactivo en Figma',
          desc: 'Pantallas y flujos clave navegables para validar la experiencia antes de programar.',
        },
        {
          title: 'Arquitectura y roadmap cerrado',
          desc: 'Selección de stack, integraciones (APIs, calendario, ERP), fases y presupuesto fijo por entregable.',
        },
        {
          title: 'Estimación de ROI y recomendación honesta',
          desc: 'Cálculo claro de horas ahorradas, costos de infraestructura y viabilidad real.',
        },
      ],
      tech: ['Figma', 'Arquitectura de Sistemas', 'Auditoría de Procesos', 'Modelado de Datos'],
      proof: {
        label: 'Caso real',
        text: 'Discovery para Solennix: se validó la arquitectura de CRM + inventario en tiempo real antes de escribir código, ahorrando meses de retrabajo.',
        link: '/proyectos/solennix',
        linkLabel: 'Ver caso Solennix',
      },
      ctaLabel: 'Agendar Discovery Sprint',
      ctaLink: '/contacto',
    },
    {
      id: 'mvp',
      title: 'Software, CRMs & Apps a Medida (MVP Build)',
      tagline: 'De concepto a plataforma en producción (Web, iOS, Android) en semanas',
      price: 'Desde $6,500 USD',
      timeline: '6 a 10 semanas',
      audience:
        'Empresas que operan en hojas de cálculo fragmentadas o equipos que necesitan lanzar un producto digital robusto al mercado.',
      outcome:
        'Tu plataforma web, CRM interno o aplicación móvil publicada en App Store y Google Play, con código 100% tuyo.',
      desc: 'Construyo tu sistema completo de punta a punta: diseño de interfaz, backend escalable, base de datos, panel administrativo y aplicaciones móviles. Entregas cada 2 semanas con demo en vivo cada viernes.',
      deliverables: [
        {
          title: 'Aplicación Web, iOS y/o Android en producción',
          desc: 'Desplegada en tu infraestructura cloud y publicada en Apple App Store y Google Play.',
        },
        {
          title: 'Código 100% en tu repositorio',
          desc: 'Propiedad intelectual íntegra desde el día uno, sin licencias por usuario ni cajas negras.',
        },
        {
          title: 'Integraciones y pagos listos',
          desc: 'Pasarelas de pago (Stripe, RevenueCat), facturación, notificaciones push y sincronización offline.',
        },
        {
          title: 'CI/CD, documentación y 30 días de garantía',
          desc: 'Despliegues automatizados, manual de arquitectura y soporte post-lanzamiento incluido.',
        },
      ],
      tech: ['Astro', 'Next.js', 'Flutter', 'React Native', 'Swift / Kotlin', 'Go / Node.js', 'PostgreSQL'],
      proof: {
        label: 'Producto en producción',
        text: 'Solennix y Pepinillo: aplicaciones multiplataforma reales publicadas en App Store y Google Play con sincronización en la nube y operación offline.',
        link: '/proyectos/solennix',
        linkLabel: 'Ver Solennix en detalle',
      },
      ctaLabel: 'Iniciar mi proyecto a medida',
      ctaLink: '/contacto',
    },
    {
      id: 'rescue',
      title: 'Codebase Rescue & Modernización',
      tagline: 'Estabiliza proyectos estancados, lentos o con deuda técnica crítica',
      price: 'Desde $2,000 USD',
      timeline: '2 a 4 semanas',
      audience:
        'Empresas con un sistema o app a medio terminar, con errores constantes en producción o abandonado por un proveedor anterior.',
      outcome:
        'Un código estabilizado, rápido, documentado y con despliegues seguros para volver a crecer sin reescribir desde cero.',
      desc: 'Audito el repositorio actual, corrijo los fallos críticos de rendimiento y seguridad, automatizo el despliegue y dejo la arquitectura limpia y documentada.',
      deliverables: [
        {
          title: 'Diagnóstico forense de código',
          desc: 'Mapa claro de bugs críticos, cuellos de botella en base de datos y riesgos de seguridad.',
        },
        {
          title: 'Estabilización y refactorización incremental',
          desc: 'Corrección de errores en producción y mejora de rendimiento sin detener la operación.',
        },
        {
          title: 'Automatización de CI/CD y tests',
          desc: 'Pipeline de pruebas y despliegue confiable para evitar regresiones futuras.',
        },
        {
          title: 'Documentación para tu equipo',
          desc: 'Guía clara de arquitectura y handover técnico.',
        },
      ],
      tech: ['TypeScript', 'React / Flutter', 'Node.js / Go', 'PostgreSQL / SQL', 'Docker & CI/CD'],
      proof: {
        label: 'Resultado comprobado',
        text: 'Transformación de sistemas con despliegues manuales rotos a pipelines automatizados con tiempos de respuesta óptimos.',
        link: '/contacto',
        linkLabel: 'Cuéntame el estado de tu proyecto',
      },
      ctaLabel: 'Solicitar rescate técnico',
      ctaLink: '/contacto',
    },
    {
      id: 'continuous',
      title: 'Desarrollo Continuo & AI Ops',
      tagline: 'Ingeniería senior dedicada mes a mes sin el costo fijo de agrandar tu nómina',
      price: '$1,200 – $2,500 USD / mes',
      timeline: 'Mensual · Sin plazos forzosos',
      audience:
        'Empresas que ya tienen su plataforma o agentes en marcha y requieren evolución constante, nuevas integraciones y soporte prioritario.',
      outcome:
        'Un socio tecnológico senior que lanza mejoras cada quincena y mantiene tus sistemas y agentes operando al 100%.',
      desc: 'Capacidad de ingeniería predecible mediante sprints quincenales. Incluye evolución de features, ajuste continuo de prompts y modelos de IA, monitoreo de servidores y mantenimiento en tiendas.',
      deliverables: [
        {
          title: 'Sprints quincenales con demo cada viernes',
          desc: 'Priorización continua de nuevas funcionalidades y automatizaciones según impacto en el negocio.',
        },
        {
          title: 'AI Ops y mejora de agentes',
          desc: 'Revisión de conversaciones reales, ajuste de precisión, nuevos conectores y optimización de costos de tokens.',
        },
        {
          title: 'Mantenimiento de infraestructura y tiendas',
          desc: 'Actualizaciones de iOS/Android, parches de seguridad, backups y monitoreo de disponibilidad.',
        },
        {
          title: 'Comunicación directa y SLA prioritario',
          desc: 'Acceso directo sin tickets burocráticos y respuesta prioritaria.',
        },
      ],
      tech: ['Full-Stack', 'AI Ops & LLMs', 'Cloud & DevOps', 'App Store & Play Store Ops'],
      proof: {
        label: 'Operación continua',
        text: 'Mantenimiento y evolución multi-anual del ecosistema de productos de Creapolis con cero caídas críticas.',
        link: '/proyectos',
        linkLabel: 'Ver ecosistema en producción',
      },
      ctaLabel: 'Consultar disponibilidad mensual',
      ctaLink: '/contacto',
    },
    {
      id: 'web-desktop',
      title: 'Web & Escritorio a Medida',
      tagline: 'Plataformas web, paneles internos y apps de escritorio que se adaptan a tu operación',
      price: 'Desde $4,000 USD',
      timeline: '4 a 8 semanas',
      audience:
        'Equipos que trabajan con hojas de cálculo desconectadas, procesos en papel o herramientas genéricas que no se ajustan a su flujo real.',
      outcome:
        'Una plataforma web o app de escritorio propia — panel de control, cotizador, inventario o sistema interno — que digitaliza tu operación sin mensualidades por usuario.',
      desc: 'Construyo sistemas web y de escritorio a la medida: dashboards, cotizadores, inventarios, paneles administrativos y herramientas internas. Arquitectura sencilla de mantener, roles y permisos, exportaciones y todo lo que tu equipo necesita para dejar los Excel detrás.',
      deliverables: [
        {
          title: 'Plataforma web o app de escritorio',
          desc: 'Aplicación responsive o nativa (Electron/Tauri) lista para usarse en los equipos de tu empresa.',
        },
        {
          title: 'Panel de administración y roles',
          desc: 'Vistas por perfil, permisos, auditoría de cambios y métricas de operación en un solo lugar.',
        },
        {
          title: 'Integraciones con tus sistemas',
          desc: 'Conexión con tu ERP, facturación, WhatsApp, correo o APIs de terceros donde ya viven tus datos.',
        },
        {
          title: 'Migración y capacitación',
          desc: 'Mudamos tus datos actuales y dejamos a tu equipo trabajando con documentación y sesiones de apoyo.',
        },
      ],
      tech: ['React / Astro', 'Node / NestJS', 'PostgreSQL / MariaDB', 'Electron / Tauri', 'APIs & Webhooks'],
      proof: {
        label: 'Caso real en producción',
        text: 'Solennix, nuestra plataforma de gestión de eventos, nació exactamente así: un sistema web propio con cotizaciones, contratos, inventario y finanzas.',
        link: '/proyectos/solennix',
        linkLabel: 'Ver Solennix en producción',
      },
      ctaLabel: 'Cotizar mi plataforma web',
      ctaLink: '/contacto',
    },
  ],
  en: [
    {
      id: 'ai-agents',
      title: 'AI Agents, Automated Scheduling & CRM',
      tagline: '24/7 lead response, qualification, and automatic calendar booking',
      price: 'From $2,500 USD',
      timeline: '2 to 4 weeks',
      audience:
        'Businesses losing leads to slow response times or spending hours manually coordinating appointments over WhatsApp and email.',
      outcome:
        'An autonomous AI agent connected to WhatsApp/Web, your calendar, and CRM that replies in seconds, qualifies prospects, and books meetings automatically.',
      desc: 'I architect and integrate end-to-end AI agent workflows (for customer-facing support or internal RAG operations). The agent chats naturally, checks real-time availability in Google Calendar / Cal.com, books the slot, sends reminders, and logs the deal in your CRM.',
      deliverables: [
        {
          title: 'Omnichannel AI Agent (WhatsApp / Web)',
          desc: 'Configured with your exact business rules, pricing, and qualification criteria.',
        },
        {
          title: 'Automated Calendar Booking Flow',
          desc: 'Real-time sync with Google Calendar, Outlook, or Cal.com including confirmations and reminders.',
        },
        {
          title: 'CRM & Database Synchronization',
          desc: 'Automatic lead creation, conversation summaries, and pipeline updates (HubSpot, Pipedrive, or custom CRM).',
        },
        {
          title: 'Internal RAG Copilot & Human Handoff',
          desc: 'Queries internal docs/inventory and seamlessly escalates complex cases to your human team.',
        },
      ],
      tech: ['OpenAI / Claude / Gemini', 'WhatsApp Business API', 'Google Calendar / Cal.com', 'RAG & Vector DB', 'Webhooks & CRM API'],
      proof: {
        label: 'Live interactive demo',
        text: 'Test the Creapolis AI Concierge right now in the bottom-right corner of this site to experience live qualification and calendar slot selection.',
        link: '/contacto',
        linkLabel: 'Request a custom demo',
      },
      ctaLabel: 'Scope my AI agent',
      ctaLink: '/contacto',
    },
    {
      id: 'discovery',
      title: 'Discovery & AI Architecture Sprint',
      tagline: 'Validate your product or audit workflows with a fixed technical roadmap',
      price: '$1,200 – $2,000 USD',
      timeline: '1 to 2 weeks · 100% credited toward build',
      audience:
        'Founders and operations leaders who want to automate processes or launch new software without risking budget blindly.',
      outcome:
        'A clickable prototype, complete AI/software architecture blueprint, and fixed-price implementation quote.',
      desc: 'In 5 to 10 days I map your operational bottlenecks or product vision, design key flows in Figma, define the architecture, and calculate expected ROI. 100% of this sprint is credited if you proceed with the build.',
      deliverables: [
        {
          title: 'Process & market audit',
          desc: 'Bottleneck mapping, AI automation opportunities, and competitive analysis.',
        },
        {
          title: 'Interactive Figma prototype',
          desc: 'Clickable core user flows to validate UX before writing code.',
        },
        {
          title: 'Technical architecture & fixed roadmap',
          desc: 'Stack selection, API/calendar/CRM integrations, milestones, and fixed pricing.',
        },
        {
          title: 'ROI projection & Go/No-go',
          desc: 'Clear estimate of hours saved, infrastructure costs, and honest feasibility.',
        },
      ],
      tech: ['Figma', 'System Architecture', 'Workflow Audit', 'Data Modeling'],
      proof: {
        label: 'Real case',
        text: 'Discovery for Solennix: validated the multi-platform CRM + inventory architecture before MVP, saving months of rework.',
        link: '/proyectos/solennix',
        linkLabel: 'See Solennix case study',
      },
      ctaLabel: 'Book Discovery Sprint',
      ctaLink: '/contacto',
    },
    {
      id: 'mvp',
      title: 'Custom Software, CRMs & Apps (MVP Build)',
      tagline: 'From concept to production platform (Web, iOS, Android) in weeks',
      price: 'From $6,500 USD',
      timeline: '6 to 10 weeks',
      audience:
        'Companies running critical operations on fragmented spreadsheets or teams ready to launch a commercial digital product.',
      outcome:
        'Your custom web platform, internal CRM, or mobile app live on App Store and Google Play with 100% code ownership.',
      desc: 'End-to-end engineering: UI/UX design, scalable backend, database, admin dashboard, and mobile apps. Delivered in 2-week sprints with live Friday demos.',
      deliverables: [
        {
          title: 'Production Web, iOS & Android apps',
          desc: 'Deployed on your cloud and published to Apple App Store and Google Play.',
        },
        {
          title: '100% code in your repository',
          desc: 'Full IP ownership from day one with zero per-seat licensing fees.',
        },
        {
          title: 'Payments & core integrations',
          desc: 'Stripe/RevenueCat billing, push notifications, and offline-first sync.',
        },
        {
          title: 'CI/CD, docs & 30-day warranty',
          desc: 'Automated deployment pipelines, architecture guide, and included post-launch support.',
        },
      ],
      tech: ['Astro', 'Next.js', 'Flutter', 'React Native', 'Swift / Kotlin', 'Go / Node.js', 'PostgreSQL'],
      proof: {
        label: 'Live production proof',
        text: 'Solennix & Pepinillo: cross-platform production apps published on App Store and Google Play.',
        link: '/proyectos/solennix',
        linkLabel: 'Explore Solennix',
      },
      ctaLabel: 'Start custom build',
      ctaLink: '/contacto',
    },
    {
      id: 'rescue',
      title: 'Codebase Rescue & Modernization',
      tagline: 'Stabilize stalled, slow, or broken software projects without starting over',
      price: 'From $2,000 USD',
      timeline: '2 to 4 weeks',
      audience:
        'Teams with an unfinished codebase, recurring production bugs, or software abandoned by a previous vendor.',
      outcome:
        'A clean, documented, tested, and stable codebase ready to scale safely.',
      desc: 'I audit your repository, fix critical performance and security bottlenecks, set up automated deployments, and document the architecture.',
      deliverables: [
        {
          title: 'Forensic code audit',
          desc: 'Full breakdown of critical bugs, technical debt, and security risks.',
        },
        {
          title: 'Incremental stabilization',
          desc: 'High-impact fixes and refactoring without disrupting active users.',
        },
        {
          title: 'Automated CI/CD & testing',
          desc: 'Reliable build and test pipelines to prevent future regressions.',
        },
        {
          title: 'Architecture documentation',
          desc: 'Clear technical documentation and team handover.',
        },
      ],
      tech: ['TypeScript', 'React / Flutter', 'Node.js / Go', 'PostgreSQL / SQL', 'Docker & CI/CD'],
      proof: {
        label: 'Proven outcome',
        text: 'Legacy web and mobile projects stabilized with automated CI/CD and 80%+ test coverage.',
        link: '/contacto',
        linkLabel: 'Discuss your codebase',
      },
      ctaLabel: 'Schedule code audit',
      ctaLink: '/contacto',
    },
    {
      id: 'continuous',
      title: 'Continuous Development & AI Ops',
      tagline: 'Dedicated monthly senior engineering without full-time hiring overhead',
      price: '$1,200 – $2,500 USD / mo',
      timeline: 'Monthly · No long-term lock-in',
      audience:
        'Companies with live software or AI agents that need ongoing features, maintenance, and optimization.',
      outcome:
        'A senior technical partner shipping improvements every sprint and keeping your systems running smoothly.',
      desc: 'Predictable bi-weekly sprints covering new product features, LLM prompt/model tuning, cloud monitoring, and app store updates.',
      deliverables: [
        {
          title: 'Bi-weekly sprints & Friday demos',
          desc: 'Continuous delivery of high-impact features and workflow automations.',
        },
        {
          title: 'AI Ops & agent optimization',
          desc: 'Conversation quality review, prompt tuning, new tool integrations, and token cost optimization.',
        },
        {
          title: 'Cloud & App Store maintenance',
          desc: 'OS updates, security patches, database backups, and uptime monitoring.',
        },
        {
          title: 'Direct senior communication',
          desc: 'Zero agency bureaucracy with priority response SLA.',
        },
      ],
      tech: ['Full-Stack', 'AI Ops & LLMs', 'Cloud & DevOps', 'App Store & Play Store Ops'],
      proof: {
        label: 'Continuous operation',
        text: 'Multi-year continuous evolution across the Creapolis product suite with zero critical downtime.',
        link: '/proyectos',
        linkLabel: 'See live products',
      },
      ctaLabel: 'Check monthly availability',
      ctaLink: '/contacto',
    },
    {
      id: 'web-desktop',
      title: 'Custom Web & Desktop',
      tagline: 'Web platforms, internal dashboards, and desktop apps tailored to your operation',
      price: 'From $4,000 USD',
      timeline: '4 to 8 weeks',
      audience:
        "Teams running on disconnected spreadsheets, paper processes, or generic tools that don't fit their real workflow.",
      outcome:
        'Your own web platform or desktop app — dashboard, quoting engine, inventory, or internal system — that digitizes your operation with zero per-seat fees.',
      desc: 'I build custom web and desktop systems: dashboards, quoting tools, inventories, admin panels, and internal utilities. Maintainable architecture, roles and permissions, exports, and everything your team needs to finally leave the spreadsheets behind.',
      deliverables: [
        {
          title: 'Web platform or desktop app',
          desc: 'Responsive web application or native desktop build (Electron/Tauri) ready to roll out across your company.',
        },
        {
          title: 'Admin panel with roles',
          desc: 'Per-profile views, permissions, change auditing, and operations metrics in one place.',
        },
        {
          title: 'Integrations with your systems',
          desc: 'Connection to your ERP, invoicing, WhatsApp, email, or third-party APIs where your data already lives.',
        },
        {
          title: 'Migration and onboarding',
          desc: 'We migrate your current data and get your team working with documentation and support sessions.',
        },
      ],
      tech: ['React / Astro', 'Node / NestJS', 'PostgreSQL / MariaDB', 'Electron / Tauri', 'APIs & Webhooks'],
      proof: {
        label: 'Real case in production',
        text: 'Solennix, our event-management platform, started exactly this way: an owned web system with quotes, contracts, inventory, and billing.',
        link: '/proyectos/solennix',
        linkLabel: 'See Solennix in production',
      },
      ctaLabel: 'Quote my web platform',
      ctaLink: '/contacto',
    },
  ],
  pt: [
    {
      id: 'ai-agents',
      title: 'Agentes de IA, Agendamento & CRM',
      tagline: 'Atendimento 24/7, qualificação de leads e agendamento automático no calendário',
      price: 'A partir de $2,500 USD',
      timeline: '2 a 4 semanas',
      audience:
        'Empresas que perdem vendas por demora no atendimento ou gastam horas agendando reuniões manualmente no WhatsApp.',
      outcome:
        'Um agente autônomo integrado ao WhatsApp/Web, calendário e CRM que responde em segundos, qualifica e agenda reuniões sozinho.',
      desc: 'Projeto e integro fluxos completos de agentes de IA (atendimento externo ou uso interno com RAG). O agente conversa naturalmente, consulta horários no Google Calendar / Cal.com, confirma a reunião e registra tudo no CRM.',
      deliverables: [
        {
          title: 'Agente omnichannel (WhatsApp / Web)',
          desc: 'Treinado com suas regras de negócio, preços e dúvidas frequentes.',
        },
        {
          title: 'Agendamento automático no calendário',
          desc: 'Integração em tempo real com Google Calendar, Outlook ou Cal.com com lembretes.',
        },
        {
          title: 'Sincronização com CRM e banco de dados',
          desc: 'Criação automática de leads, resumo da conversa e atualização de funil.',
        },
        {
          title: 'Agente interno / RAG e transbordo humano',
          desc: 'Consulta a documentos internos/estoque e encaminhamento inteligente para sua equipe.',
        },
      ],
      tech: ['OpenAI / Claude / Gemini', 'WhatsApp Business API', 'Google Calendar / Cal.com', 'RAG & Vector DB', 'Webhooks & CRM API'],
      proof: {
        label: 'Demo interativa ao vivo',
        text: 'Teste agora mesmo o assistente da Creapolis no canto inferior direito do site para ver o agendamento em tempo real.',
        link: '/contacto',
        linkLabel: 'Solicitar demo para sua empresa',
      },
      ctaLabel: 'Orçar meu agente de IA',
      ctaLink: '/contacto',
    },
    {
      id: 'discovery',
      title: 'Discovery & AI Architecture Sprint',
      tagline: 'Valide sua ideia ou audite processos com plano técnico e orçamento fechado',
      price: '$1,200 – $2,000 USD',
      timeline: '1 a 2 semanas · 100% creditável ao build',
      audience:
        'Diretores e fundadores que desejam automatizar operações ou lançar um produto sem arriscar orçamento às cegas.',
      outcome:
        'Protótipo navegável, arquitetura técnica de IA/software e orçamento fechado pronto para execução.',
      desc: 'Em 5 a 10 dias mapeio seus processos, desenho os fluxos no Figma, defino a arquitetura e calculo o ROI. 100% do valor é abatido caso avance para o desenvolvimento.',
      deliverables: [
        {
          title: 'Auditoria de processos e mercado',
          desc: 'Mapeamento de gargalos operacionais e oportunidades reais de automação.',
        },
        {
          title: 'Protótipo navegável no Figma',
          desc: 'Fluxos principais interativos para validar antes de programar.',
        },
        {
          title: 'Arquitetura e roadmap fechado',
          desc: 'Definição de stack, integrações, fases e investimento exato.',
        },
        {
          title: 'Projeção de ROI',
          desc: 'Estimativa clara de horas economizadas e viabilidade técnica.',
        },
      ],
      tech: ['Figma', 'Arquitetura de Sistemas', 'Auditoria de Processos', 'Modelagem de Dados'],
      proof: {
        label: 'Caso real',
        text: 'Discovery para Solennix: validou o CRM + inventário antes do código, economizando meses de retrabalho.',
        link: '/projetos/solennix',
        linkLabel: 'Ver Solennix',
      },
      ctaLabel: 'Agendar Discovery Sprint',
      ctaLink: '/contacto',
    },
    {
      id: 'mvp',
      title: 'Software, CRMs & Apps sob Medida (MVP Build)',
      tagline: 'Do conceito à plataforma em produção (Web, iOS, Android) em semanas',
      price: 'A partir de $6,500 USD',
      timeline: '6 a 10 semanas',
      audience:
        'Empresas que operam em planilhas desconectadas ou precisam lançar um produto digital próprio.',
      outcome:
        'Sua plataforma web, CRM interno ou aplicativo publicado na App Store e Google Play com código 100% seu.',
      desc: 'Construo seu sistema de ponta a ponta: interface, backend, banco de dados e apps mobile em sprints de 2 semanas com demo toda sexta-feira.',
      deliverables: [
        {
          title: 'App Web, iOS e/ou Android publicado',
          desc: 'Em produção na sua nuvem e nas lojas oficiais Apple App Store e Google Play.',
        },
        {
          title: 'Código 100% no seu repositório',
          desc: 'Propriedade intelectual total desde o primeiro dia, sem mensalidades por usuário.',
        },
        {
          title: 'Pagamentos e integrações',
          desc: 'Stripe, RevenueCat, notificações push e sincronização offline.',
        },
        {
          title: 'CI/CD, documentação e 30 dias de garantia',
          desc: 'Deploy automático, documentação de arquitetura e suporte pós-lançamento.',
        },
      ],
      tech: ['Astro', 'Next.js', 'Flutter', 'React Native', 'Swift / Kotlin', 'Go / Node.js', 'PostgreSQL'],
      proof: {
        label: 'Produto em produção',
        text: 'Solennix e Pepinillo: apps multiplataforma publicados na App Store e Google Play.',
        link: '/projetos/solennix',
        linkLabel: 'Ver Solennix',
      },
      ctaLabel: 'Começar meu projeto',
      ctaLink: '/contacto',
    },
    {
      id: 'rescue',
      title: 'Codebase Rescue & Modernização',
      tagline: 'Estabilize projetos travados, lentos ou com dívida técnica crítica',
      price: 'A partir de $2,000 USD',
      timeline: '2 a 4 semanas',
      audience:
        'Equipes com código existente que apresenta falhas constantes ou foi abandonado por outro fornecedor.',
      outcome:
        'Código limpo, documentado, testado e estável — pronto para voltar a evoluir sem reescrever do zero.',
      desc: 'Reviso seu código, corrijo problemas críticos de performance e segurança, configuro deploy automático e documento a arquitetura.',
      deliverables: [
        {
          title: 'Auditoria técnica de código',
          desc: 'Análise completa de bugs críticos, dívida técnica e riscos.',
        },
        {
          title: 'Refatoração incremental',
          desc: 'Correções seguras sem interromper a operação atual.',
        },
        {
          title: 'CI/CD e testes automatizados',
          desc: 'Pipeline confiável para evitar novas regressões.',
        },
        {
          title: 'Documentação de arquitetura',
          desc: 'Guia claro de manutenção e handover.',
        },
      ],
      tech: ['TypeScript', 'React / Flutter', 'Node.js / Go', 'PostgreSQL / SQL', 'Docker & CI/CD'],
      proof: {
        label: 'Exemplo real',
        text: 'Resgate de sistemas legados transformados em pipelines CI/CD automatizados e estáveis.',
        link: '/contacto',
        linkLabel: 'Conte seu caso',
      },
      ctaLabel: 'Solicitar auditoria',
      ctaLink: '/contacto',
    },
    {
      id: 'continuous',
      title: 'Desenvolvimento Contínuo & AI Ops',
      tagline: 'Engenharia sênior dedicada mês a mês sem custos fixos de contratação',
      price: '$1,200 – $2,500 USD / mês',
      timeline: 'Mensal · Sem fidelidade forçada',
      audience:
        'Empresas que precisam evoluir seu produto e seus agentes de IA continuamente.',
      outcome:
        'Um parceiro técnico sênior entregando novas funcionalidades e mantendo seus sistemas 100% operacionais.',
      desc: 'Sprints quinzenais com entregas constantes, otimização de agentes de IA, monitoramento proativo e atualizações nas lojas.',
      deliverables: [
        {
          title: 'Sprints regulares com demo toda sexta',
          desc: 'Evolução contínua priorizada pelo retorno para o negócio.',
        },
        {
          title: 'AI Ops e ajuste de agentes',
          desc: 'Melhoria contínua de prompts, precisão, novas integrações e redução de custos.',
        },
        {
          title: 'Monitoramento e manutenção',
          desc: 'Atualizações de sistema, segurança, backups e performance.',
        },
        {
          title: 'Comunicação direta sênior',
          desc: 'Acesso direto sem burocracia.',
        },
      ],
      tech: ['Full-Stack', 'AI Ops & LLMs', 'Cloud & DevOps', 'App Store & Play Store Ops'],
      proof: {
        label: 'Operação contínua',
        text: 'Evolução contínua da suíte de aplicativos Creapolis com zero downtime.',
        link: '/projetos',
        linkLabel: 'Ver produtos',
      },
      ctaLabel: 'Consultar disponibilidade',
      ctaLink: '/contacto',
    },
    {
      id: 'web-desktop',
      title: 'Web & Desktop sob Medida',
      tagline: 'Plataformas web, painéis internos e apps de desktop adaptados à sua operação',
      price: 'A partir de $4,000 USD',
      timeline: '4 a 8 semanas',
      audience:
        'Equipes que trabalham com planilhas desconectadas, processos no papel ou ferramentas genéricas que não se encaixam no fluxo real.',
      outcome:
        'Uma plataforma web ou app de desktop própria — painel, orçador, inventário ou sistema interno — que digitaliza sua operação sem mensalidade por usuário.',
      desc: 'Construo sistemas web e de desktop sob medida: dashboards, orçadores, inventários, painéis administrativos e ferramentas internas. Arquitetura fácil de manter, perfis e permissões, exportações e tudo o que sua equipe precisa para deixar as planilhas para trás.',
      deliverables: [
        {
          title: 'Plataforma web ou app de desktop',
          desc: 'Aplicação responsiva ou nativa (Electron/Tauri) pronta para uso nos computadores da empresa.',
        },
        {
          title: 'Painel administrativo com perfis',
          desc: 'Visões por perfil, permissões, auditoria de alterações e métricas de operação em um só lugar.',
        },
        {
          title: 'Integrações com seus sistemas',
          desc: 'Conexão com seu ERP, faturamento, WhatsApp, e-mail ou APIs de terceiros onde seus dados já vivem.',
        },
        {
          title: 'Migração e treinamento',
          desc: 'Migramos seus dados atuais e deixamos sua equipe trabalhando com documentação e sessões de apoio.',
        },
      ],
      tech: ['React / Astro', 'Node / NestJS', 'PostgreSQL / MariaDB', 'Electron / Tauri', 'APIs & Webhooks'],
      proof: {
        label: 'Caso real em produção',
        text: 'A Solennix, nossa plataforma de gestão de eventos, nasceu exatamente assim: um sistema web próprio com orçamentos, contratos, inventário e finanças.',
        link: '/projetos/solennix',
        linkLabel: 'Ver a Solennix em produção',
      },
      ctaLabel: 'Orçar minha plataforma web',
      ctaLink: '/contacto',
    },
  ],
};

const process: Record<Lang, ProcessStep[]> = {
  es: [
    {
      n: '01',
      title: 'Diagnóstico',
      desc: 'Escucho cómo opera tu negocio hoy, dónde pierdes tiempo y qué resultado necesitas lograr.',
      details: [
        'Llamada de 30 min sin costo',
        'Mapeo del flujo actual',
        'Definición de objetivos claros',
        'Evaluación de integraciones',
      ],
    },
    {
      n: '02',
      title: 'Arquitectura y Propuesta',
      desc: 'Recibes un plan claro con entregables exactos, fechas y presupuesto cerrado antes de empezar.',
      details: [
        'Alcance y entregables fijos',
        'Cronograma por hitos',
        'Presupuesto sin letra chica',
        'Diseño de flujo / prototipo',
      ],
    },
    {
      n: '03',
      title: 'Construcción por Sprints',
      desc: 'Avances funcionales cada semana. Ves el agente o software funcionando en vivo cada viernes.',
      details: [
        'Demo en vivo cada viernes',
        'Código en tu repositorio',
        'Integración con tus sistemas',
        'Pruebas con casos reales',
      ],
    },
    {
      n: '04',
      title: 'Despliegue y Garantía',
      desc: 'Puesta en producción, capacitación a tu equipo y 30 días de garantía incluidos sin costo.',
      details: [
        'Publicación en Cloud / Tiendas',
        'Documentación y capacitación',
        'Monitoreo post-lanzamiento',
        '30 días de garantía incluidos',
      ],
    },
  ],
  en: [
    {
      n: '01',
      title: 'Diagnostic',
      desc: 'We review how your operation runs today, where time is lost, and the exact outcome you need.',
      details: [
        'Free 30-min discovery call',
        'Current workflow mapping',
        'Clear business targets',
        'Integration assessment',
      ],
    },
    {
      n: '02',
      title: 'Architecture & Proposal',
      desc: 'You get a clear plan with exact deliverables, milestones, and fixed pricing upfront.',
      details: [
        'Fixed scope & deliverables',
        'Milestone timeline',
        'Transparent budget',
        'Flow / prototype design',
      ],
    },
    {
      n: '03',
      title: 'Sprint Execution',
      desc: 'Working software every week. You test the live agent or application every Friday.',
      details: [
        'Weekly Friday live demo',
        'Code in your repository',
        'Real stack integration',
        'Real-world QA testing',
      ],
    },
    {
      n: '04',
      title: 'Launch & Warranty',
      desc: 'Production deployment, team training, and 30 days of post-launch warranty included.',
      details: [
        'Cloud / App Store release',
        'Documentation & training',
        'Post-launch monitoring',
        '30-day warranty included',
      ],
    },
  ],
  pt: [
    {
      n: '01',
      title: 'Diagnóstico',
      desc: 'Analisamos como sua operação funciona hoje, onde há gargalos e qual resultado você precisa.',
      details: [
        'Chamada de 30 min sem custo',
        'Mapeamento do fluxo atual',
        'Objetivos de negócio claros',
        'Avaliação de integrações',
      ],
    },
    {
      n: '02',
      title: 'Arquitetura e Proposta',
      desc: 'Você recebe um plano claro com entregáveis exatos, prazos e orçamento fechado.',
      details: [
        'Escopo e entregáveis fixos',
        'Cronograma por marcos',
        'Orçamento transparente',
        'Desenho de fluxo / protótipo',
      ],
    },
    {
      n: '03',
      title: 'Execução em Sprints',
      desc: 'Entregas funcionais toda semana. Você testa o agente ou sistema ao vivo toda sexta-feira.',
      details: [
        'Demo ao vivo toda sexta',
        'Código no seu repositório',
        'Integração com seus sistemas',
        'Testes com casos reais',
      ],
    },
    {
      n: '04',
      title: 'Entrega e Garantia',
      desc: 'Deploy em produção, treinamento da equipe e 30 dias de garantia incluídos.',
      details: [
        'Publicação na Nuvem / Lojas',
        'Documentação e treinamento',
        'Monitoramento pós-lançamento',
        '30 dias de garantia incluídos',
      ],
    },
  ],
};

export function getServicesData(lang: Lang) {
  return { services: services[lang], process: process[lang] };
}
