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
      id: 'discovery',
      title: 'Discovery Sprint',
      tagline: 'Validar tu idea antes de construir',
      audience:
        'Emprendedores y equipos que tienen una idea pero no saben si vale la pena construirla.',
      outcome:
        'Un roadmap técnico confeccionado, priorizado y costeado — listo para decidir sí o no.',
      desc: 'En 5 días analizo tu mercado, reviso la competencia, defino los flujos clave y armo un plan técnico realista. Sin humo, sin vendor lock-in.',
      deliverables: [
        {
          title: 'Análisis de mercado',
          desc: 'Competencia directa, indirecta y oportunidades reales.',
        },
        {
          title: 'Prototipo navegable',
          desc: 'Wireframes de los flujos principales en Figma.',
        },
        {
          title: 'Roadmap técnico',
          desc: 'Stack recomendado, fases, estimación de tiempo y costo.',
        },
        {
          title: 'Go/No-go',
          desc: 'Recomendación honesta basada en datos, no en ganar el proyecto.',
        },
      ],
      tech: ['Figma', 'Miro', 'Documentos técnicos', 'Análisis de mercado'],
      proof: {
        label: 'Ejemplo real',
        text: 'Discovery para Solennix: se validó la necesidad de CRM + inventario antes del MVP, evitando construir features que nadie pedía.',
        link: '/proyectos/solennix',
        linkLabel: 'Ver Solennix',
      },
      ctaLabel: 'Agendar Discovery Sprint',
      ctaLink: '/contacto',
    },
    {
      id: 'mvp',
      title: 'MVP Build',
      tagline: 'Tu primer versión en el mercado',
      audience:
        'Equipos que ya validaron su idea y necesitan construir la primera versión funcional.',
      outcome:
        'Una app publicada en stores o desplegada en web, lista para recibir usuarios reales.',
      desc: 'Construyo tu MVP con las features core, publicado y funcionando. El stack se elige según el problema, no según la moda.',
      deliverables: [
        {
          title: 'App o sitio publicado',
          desc: 'En App Store, Google Play o desplegado en web.',
        },
        {
          title: 'Código en tu repositorio',
          desc: 'Sin black box — el código es tuyo desde el día uno.',
        },
        {
          title: 'CI/CD configurado',
          desc: 'Tests, linting y deploy automático.',
        },
        {
          title: 'Documentación',
          desc: 'Guía de uso, arquitectura y decisiones técnicas.',
        },
      ],
      tech: [
        'React Native',
        'Flutter',
        'Swift',
        'Kotlin',
        'Astro',
        'Next.js',
        'TypeScript',
      ],
      proof: {
        label: 'Ejemplo real',
        text: 'Pepinillo: de idea a Google Play en 8 semanas. Android nativo con Jetpack Compose, sync offline y widgets de enfoque.',
        link: '/proyectos/pepinillo',
        linkLabel: 'Ver Pepinillo',
      },
      ctaLabel: 'Empezar tu MVP',
      ctaLink: '/contacto',
    },
    {
      id: 'rescue',
      title: 'Codebase Rescue',
      tagline: 'Rescatar proyectos estancados o rotos',
      audience:
        'Equipos con código existente que no funciona, no escala o nadie entiende.',
      outcome:
        'Un codebase limpio, documentado, testeado y mantenido — listo para que tu equipo siga construyendo.',
      desc: 'Reviso tu código, identifico los problemas críticos, refactorizo lo que hace falta y dejo todo documentado. Sin reescribir todo desde cero.',
      deliverables: [
        {
          title: 'Auditoría de código',
          desc: 'Análisis completo de deuda técnica, bugs críticos y riesgos.',
        },
        {
          title: 'Plan de refactorización',
          desc: 'Priorizado por impacto, con estimación de esfuerzo.',
        },
        {
          title: 'Código refactorizado',
          desc: 'Cambios incrementales, testeables, sin romper funcionalidad.',
        },
        {
          title: 'Documentación de arquitectura',
          desc: 'Cómo funciona, por qué se decidió así, cómo mantenerlo.',
        },
      ],
      tech: [
        'TypeScript',
        'React',
        'Node.js',
        'PostgreSQL',
        'Testing',
        'CI/CD',
      ],
      proof: {
        label: 'Ejemplo real',
        text: 'Rescate de proyecto web con dependencias obsoletas, sin tests y deploy manual. Transformado a CI/CD automatizado con coverage del 80%.',
        link: '/contacto',
        linkLabel: 'Contar tu caso',
      },
      ctaLabel: 'Agendar auditoría',
      ctaLink: '/contacto',
    },
    {
      id: 'ai-audit',
      title: 'AI Audit',
      tagline: 'Dónde la IA ahorra tiempo real',
      audience:
        'Equipos que quieren usar IA pero no saben dónde tiene sentido o cómo empezar.',
      outcome:
        'Un mapa de oportunidades con casos de uso concretos, estimación de ahorro y plan de implementación.',
      desc: 'Analizo tus flujos de trabajo, identifico dónde un LLM bien integrado puede ahorrar horas semanales, y te doy un plan paso a paso.',
      deliverables: [
        {
          title: 'Mapa de procesos',
          desc: 'Tus flujos actuales, con tiempo y costo estimado.',
        },
        {
          title: 'Oportunidades de IA',
          desc: 'Casos de uso concretos, no "transformación digital" genérica.',
        },
        {
          title: 'Estimación de ROI',
          desc: 'Horas ahorradas, costo de implementación, payback period.',
        },
        {
          title: 'Plan de implementación',
          desc: 'Pasos concretos, tecnología recomendada, timeline.',
        },
      ],
      tech: ['OpenAI', 'Anthropic', 'LangChain', 'Python', 'Vector DBs', 'RAG'],
      proof: {
        label: 'Ejemplo real',
        text: 'Auditoría para equipo de soporte: chatbot con RAG que maneja el 80% de consultas recurrentes, liberando al equipo para casos complejos.',
        link: '/contacto',
        linkLabel: 'Agendar tu auditoría',
      },
      ctaLabel: 'Agendar AI Audit',
      ctaLink: '/contacto',
    },
    {
      id: 'continuous',
      title: 'Continuous Development',
      tagline: 'Tu producto crece sin contratar equipo',
      audience:
        'Equipos que necesitan desarrollo constante pero no pueden costear un equipo completo.',
      outcome:
        'Un socio técnico que mantiene, mejora y hace crecer tu producto mes a mes.',
      desc: 'Desarrollo continuo con sprints regulares. Bug fixes, features nuevas, optimización de performance, monitoreo. Como tener un equipo de desarrollo dedicado, sin los costos fijos.',
      deliverables: [
        {
          title: 'Sprints regulares',
          desc: '2 semanas de desarrollo, demo cada viernes.',
        },
        {
          title: 'Monitoreo proactivo',
          desc: 'Performance, errores, uso — detecto problemas antes de que tus usuarios los vean.',
        },
        {
          title: 'Mejoras continuas',
          desc: 'Refactorización, optimización, features nuevas priorizadas por impacto.',
        },
        {
          title: 'Reportes mensuales',
          desc: 'Qué se hizo, qué impactó, qué viene next.',
        },
      ],
      tech: ['El stack de tu producto', 'CI/CD', 'Monitoreo', 'Analytics'],
      proof: {
        label: 'Ejemplo real',
        text: 'Solennix: desarrollo continuo con sprints de 2 semanas. Features nuevas cada mes, 0 downtime, performance optimizado.',
        link: '/proyectos/solennix',
        linkLabel: 'Ver Solennix',
      },
      ctaLabel: 'Empezar continuous dev',
      ctaLink: '/contacto',
    },
  ],
  en: [
    {
      id: 'discovery',
      title: 'Discovery Sprint',
      tagline: 'Validate your idea before building',
      audience:
        "Entrepreneurs and teams with an idea who aren't sure if it's worth building.",
      outcome:
        'A prioritized, costed technical roadmap — ready to decide yes or no.',
      desc: 'In 5 days I analyze your market, review competitors, define key flows, and build a realistic technical plan. No smoke, no vendor lock-in.',
      deliverables: [
        {
          title: 'Market analysis',
          desc: 'Direct and indirect competition, real opportunities.',
        },
        {
          title: 'Navigable prototype',
          desc: 'Wireframes of key flows in Figma.',
        },
        {
          title: 'Technical roadmap',
          desc: 'Recommended stack, phases, time and cost estimate.',
        },
        {
          title: 'Go/No-go',
          desc: 'Honest recommendation based on data, not on winning the project.',
        },
      ],
      tech: ['Figma', 'Miro', 'Technical documentation', 'Market analysis'],
      proof: {
        label: 'Real example',
        text: 'Discovery for Solennix: validated the need for CRM + inventory before MVP, avoiding building features nobody asked for.',
        link: '/proyectos/solennix',
        linkLabel: 'See Solennix',
      },
      ctaLabel: 'Schedule Discovery Sprint',
      ctaLink: '/contacto',
    },
    {
      id: 'mvp',
      title: 'MVP Build',
      tagline: 'Your first version in the market',
      audience:
        'Teams who validated their idea and need to build the first functional version.',
      outcome:
        'An app published in stores or deployed on web, ready for real users.',
      desc: 'I build your MVP with core features, published and working. The stack is chosen for the problem, not for the trend.',
      deliverables: [
        {
          title: 'Published app or site',
          desc: 'On App Store, Google Play, or deployed on web.',
        },
        {
          title: 'Code in your repo',
          desc: 'No black box — the code is yours from day one.',
        },
        {
          title: 'CI/CD configured',
          desc: 'Tests, linting, and automated deploy.',
        },
        {
          title: 'Documentation',
          desc: 'Usage guide, architecture, and technical decisions.',
        },
      ],
      tech: [
        'React Native',
        'Flutter',
        'Swift',
        'Kotlin',
        'Astro',
        'Next.js',
        'TypeScript',
      ],
      proof: {
        label: 'Real example',
        text: 'Pepinillo: from idea to Google Play in 8 weeks. Native Android with Jetpack Compose, offline sync, and focus widgets.',
        link: '/proyectos/pepinillo',
        linkLabel: 'See Pepinillo',
      },
      ctaLabel: 'Start your MVP',
      ctaLink: '/contacto',
    },
    {
      id: 'rescue',
      title: 'Codebase Rescue',
      tagline: 'Rescue stuck or broken projects',
      audience:
        "Teams with existing code that doesn't work, doesn't scale, or nobody understands.",
      outcome:
        'A clean, documented, tested, maintainable codebase — ready for your team to keep building.',
      desc: 'I review your code, identify critical issues, refactor what needs it, and document everything. No rewriting from scratch.',
      deliverables: [
        {
          title: 'Code audit',
          desc: 'Complete analysis of technical debt, critical bugs, and risks.',
        },
        {
          title: 'Refactoring plan',
          desc: 'Prioritized by impact, with effort estimate.',
        },
        {
          title: 'Refactored code',
          desc: 'Incremental, testable changes without breaking functionality.',
        },
        {
          title: 'Architecture documentation',
          desc: 'How it works, why it was decided this way, how to maintain it.',
        },
      ],
      tech: [
        'TypeScript',
        'React',
        'Node.js',
        'PostgreSQL',
        'Testing',
        'CI/CD',
      ],
      proof: {
        label: 'Real example',
        text: 'Web project rescue with obsolete dependencies, no tests, and manual deploy. Transformed to automated CI/CD with 80% coverage.',
        link: '/contacto',
        linkLabel: 'Tell us your case',
      },
      ctaLabel: 'Schedule audit',
      ctaLink: '/contacto',
    },
    {
      id: 'ai-audit',
      title: 'AI Audit',
      tagline: 'Where AI saves real time',
      audience:
        "Teams who want to use AI but don't know where it makes sense or how to start.",
      outcome:
        'A map of opportunities with concrete use cases, estimated savings, and an implementation plan.',
      desc: 'I analyze your workflows, identify where a well-integrated LLM can save weekly hours, and give you a step-by-step plan.',
      deliverables: [
        {
          title: 'Process map',
          desc: 'Your current flows, with time and cost estimates.',
        },
        {
          title: 'AI opportunities',
          desc: 'Concrete use cases, not generic "digital transformation".',
        },
        {
          title: 'ROI estimate',
          desc: 'Hours saved, implementation cost, payback period.',
        },
        {
          title: 'Implementation plan',
          desc: 'Concrete steps, recommended tech, timeline.',
        },
      ],
      tech: ['OpenAI', 'Anthropic', 'LangChain', 'Python', 'Vector DBs', 'RAG'],
      proof: {
        label: 'Real example',
        text: 'Audit for support team: RAG chatbot handling 80% of recurring queries, freeing the team for complex cases.',
        link: '/contacto',
        linkLabel: 'Schedule your audit',
      },
      ctaLabel: 'Schedule AI Audit',
      ctaLink: '/contacto',
    },
    {
      id: 'continuous',
      title: 'Continuous Development',
      tagline: 'Your product grows without hiring a team',
      audience:
        "Teams who need ongoing development but can't afford a full team.",
      outcome:
        'A technical partner who maintains, improves, and grows your product month after month.',
      desc: 'Continuous development with regular sprints. Bug fixes, new features, performance optimization, monitoring. Like having a dedicated dev team, without the fixed costs.',
      deliverables: [
        {
          title: 'Regular sprints',
          desc: '2 weeks of development, demo every Friday.',
        },
        {
          title: 'Proactive monitoring',
          desc: 'Performance, errors, usage — I catch issues before your users see them.',
        },
        {
          title: 'Continuous improvements',
          desc: 'Refactoring, optimization, new features prioritized by impact.',
        },
        {
          title: 'Monthly reports',
          desc: 'What was done, what impacted, what comes next.',
        },
      ],
      tech: ["Your product's stack", 'CI/CD', 'Monitoring', 'Analytics'],
      proof: {
        label: 'Real example',
        text: 'Solennix: continuous development with 2-week sprints. New features every month, 0 downtime, optimized performance.',
        link: '/proyectos/solennix',
        linkLabel: 'See Solennix',
      },
      ctaLabel: 'Start continuous dev',
      ctaLink: '/contacto',
    },
  ],
  pt: [
    {
      id: 'discovery',
      title: 'Discovery Sprint',
      tagline: 'Validar sua ideia antes de construir',
      audience:
        'Empreendedores e equipes com uma ideia que não sabem se vale a pena construir.',
      outcome:
        'Um roadmap técnico priorizado e com custo estimado — pronto para decidir sim ou não.',
      desc: 'Em 5 dias analiso seu mercado, reviso concorrência, defino fluxos chave e monto um plano técnico realista. Sem fumaça, sem vendor lock-in.',
      deliverables: [
        {
          title: 'Análise de mercado',
          desc: 'Concorrência direta, indireta e oportunidades reais.',
        },
        {
          title: 'Protótipo navegável',
          desc: 'Wireframes dos fluxos principais no Figma.',
        },
        {
          title: 'Roadmap técnico',
          desc: 'Stack recomendado, fases, estimativa de tempo e custo.',
        },
        {
          title: 'Go/No-go',
          desc: 'Recomendação honesta baseada em dados, não em ganhar o projeto.',
        },
      ],
      tech: ['Figma', 'Miro', 'Documentação técnica', 'Análise de mercado'],
      proof: {
        label: 'Exemplo real',
        text: 'Discovery para Solennix: validou a necessidade de CRM + inventário antes do MVP, evitando construir features que ninguém pediu.',
        link: '/projetos/solennix',
        linkLabel: 'Ver Solennix',
      },
      ctaLabel: 'Agendar Discovery Sprint',
      ctaLink: '/contacto',
    },
    {
      id: 'mvp',
      title: 'MVP Build',
      tagline: 'Sua primeira versão no mercado',
      audience:
        'Equipes que já validaram sua ideia e precisam construir a primeira versão funcional.',
      outcome:
        'Um app publicado nas lojas ou deployado na web, pronto para receber usuários reais.',
      desc: 'Construo seu MVP com as features core, publicado e funcionando. O stack é escolhido para o problema, não para a tendência.',
      deliverables: [
        {
          title: 'App ou site publicado',
          desc: 'Na App Store, Google Play ou deployado na web.',
        },
        {
          title: 'Código no seu repositório',
          desc: 'Sem black box — o código é seu desde o dia um.',
        },
        {
          title: 'CI/CD configurado',
          desc: 'Tests, linting e deploy automático.',
        },
        {
          title: 'Documentação',
          desc: 'Guia de uso, arquitetura e decisões técnicas.',
        },
      ],
      tech: [
        'React Native',
        'Flutter',
        'Swift',
        'Kotlin',
        'Astro',
        'Next.js',
        'TypeScript',
      ],
      proof: {
        label: 'Exemplo real',
        text: 'Pepinillo: de ideia ao Google Play em 8 semanas. Android nativo com Jetpack Compose, sync offline e widgets de foco.',
        link: '/projetos/pepinillo',
        linkLabel: 'Ver Pepinillo',
      },
      ctaLabel: 'Começar seu MVP',
      ctaLink: '/contacto',
    },
    {
      id: 'rescue',
      title: 'Codebase Rescue',
      tagline: 'Resgatar projetos travados ou quebrados',
      audience:
        'Equipes com código existente que não funciona, não escala ou ninguém entende.',
      outcome:
        'Um codebase limpo, documentado, testado e mantido — pronto para sua equipe continuar construindo.',
      desc: 'Reviso seu código, identifico problemas críticos, refatoro o que precisa e documento tudo. Sem reescrever do zero.',
      deliverables: [
        {
          title: 'Auditoria de código',
          desc: 'Análise completa de dívida técnica, bugs críticos e riscos.',
        },
        {
          title: 'Plano de refatoração',
          desc: 'Priorizado por impacto, com estimativa de esforço.',
        },
        {
          title: 'Código refatorado',
          desc: 'Mudanças incrementais, testáveis, sem quebrar funcionalidade.',
        },
        {
          title: 'Documentação de arquitetura',
          desc: 'Como funciona, por que foi decidido assim, como manter.',
        },
      ],
      tech: [
        'TypeScript',
        'React',
        'Node.js',
        'PostgreSQL',
        'Testing',
        'CI/CD',
      ],
      proof: {
        label: 'Exemplo real',
        text: 'Resgate de projeto web com dependências obsoletas, sem tests e deploy manual. Transformado para CI/CD automatizado com 80% de cobertura.',
        link: '/contacto',
        linkLabel: 'Conte seu caso',
      },
      ctaLabel: 'Agendar auditoria',
      ctaLink: '/contacto',
    },
    {
      id: 'ai-audit',
      title: 'AI Audit',
      tagline: 'Onde a IA economiza tempo real',
      audience:
        'Equipes que querem usar IA mas não sabem onde faz sentido ou como começar.',
      outcome:
        'Um mapa de oportunidades com casos de uso concretos, estimativa de economia e plano de implementação.',
      desc: 'Analiso seus fluxos de trabalho, identifico onde um LLM bem integrado pode economizar horas semanais e te dou um plano passo a passo.',
      deliverables: [
        {
          title: 'Mapa de processos',
          desc: 'Seus fluxos atuais, com tempo e custo estimado.',
        },
        {
          title: 'Oportunidades de IA',
          desc: 'Casos de uso concretos, não "transformação digital" genérica.',
        },
        {
          title: 'Estimativa de ROI',
          desc: 'Horas economizadas, custo de implementação, payback period.',
        },
        {
          title: 'Plano de implementação',
          desc: 'Passos concretos, tecnologia recomendada, timeline.',
        },
      ],
      tech: ['OpenAI', 'Anthropic', 'LangChain', 'Python', 'Vector DBs', 'RAG'],
      proof: {
        label: 'Exemplo real',
        text: 'Auditoria para equipe de suporte: chatbot com RAG atendendo 80% das consultas recorrentes, liberando a equipe para casos complexos.',
        link: '/contacto',
        linkLabel: 'Agendar sua auditoria',
      },
      ctaLabel: 'Agendar AI Audit',
      ctaLink: '/contacto',
    },
    {
      id: 'continuous',
      title: 'Continuous Development',
      tagline: 'Seu produto cresce sem contratar equipe',
      audience:
        'Equipes que precisam de desenvolvimento constante mas não podem custear uma equipe completa.',
      outcome:
        'Um parceiro técnico que mantém, melhora e faz crescer seu produto mês a mês.',
      desc: 'Desenvolvimento contínuo com sprints regulares. Bug fixes, features novas, otimização de performance, monitoramento. Como ter uma equipe de desenvolvimento dedicada, sem os custos fixos.',
      deliverables: [
        {
          title: 'Sprints regulares',
          desc: '2 semanas de desenvolvimento, demo toda sexta.',
        },
        {
          title: 'Monitoramento proativo',
          desc: 'Performance, erros, uso — detecto problemas antes de seus usuários verem.',
        },
        {
          title: 'Melhorias contínuas',
          desc: 'Refatoração, otimização, features novas priorizadas por impacto.',
        },
        {
          title: 'Relatórios mensais',
          desc: 'O que foi feito, o que impactou, o que vem next.',
        },
      ],
      tech: ['O stack do seu produto', 'CI/CD', 'Monitoramento', 'Analytics'],
      proof: {
        label: 'Exemplo real',
        text: 'Solennix: desenvolvimento contínuo com sprints de 2 semanas. Features novas a cada mês, 0 downtime, performance otimizada.',
        link: '/projetos/solennix',
        linkLabel: 'Ver Solennix',
      },
      ctaLabel: 'Começar continuous dev',
      ctaLink: '/contacto',
    },
  ],
};

const process: Record<Lang, ProcessStep[]> = {
  es: [
    {
      n: '01',
      title: 'Conversación',
      desc: 'Escucho tu situación, entiendo tus constraints y defino qué éxito significa para vos.',
      details: [
        'Llamada de 30–45 min',
        'Contexto del negocio',
        'Restricciones técnicas',
        'Expectativas de resultado',
      ],
    },
    {
      n: '02',
      title: 'Propuesta',
      desc: 'Armo un plan claro con entregables, timeline y presupuesto. Sin sorpresas.',
      details: [
        'Alcance definido',
        'Timeline con hitos',
        'Presupuesto transparente',
        'Preguntas antes de empezar',
      ],
    },
    {
      n: '03',
      title: 'Ejecución',
      desc: 'Sprints de 2 semanas con demo cada viernes. Código en tu repo desde el día uno.',
      details: [
        'Demo semanal en vivo',
        'Código en tu repositorio',
        'Feedback constante',
        'Ajustes sin drama',
      ],
    },
    {
      n: '04',
      title: 'Entrega',
      desc: 'QA, documentación, handover. 30 días de soporte incluido post-entrega.',
      details: [
        'QA completo',
        'Documentación técnica',
        'Handover a tu equipo',
        'Soporte 30 días',
      ],
    },
  ],
  en: [
    {
      n: '01',
      title: 'Conversation',
      desc: 'I listen to your situation, understand your constraints, and define what success means for you.',
      details: [
        '30–45 min call',
        'Business context',
        'Technical constraints',
        'Expected outcomes',
      ],
    },
    {
      n: '02',
      title: 'Proposal',
      desc: 'I build a clear plan with deliverables, timeline, and budget. No surprises.',
      details: [
        'Defined scope',
        'Milestone timeline',
        'Transparent budget',
        'Questions before starting',
      ],
    },
    {
      n: '03',
      title: 'Execution',
      desc: '2-week sprints with demos every Friday. Code in your repo from day one.',
      details: [
        'Weekly live demo',
        'Code in your repo',
        'Constant feedback',
        'Adjustments without drama',
      ],
    },
    {
      n: '04',
      title: 'Delivery',
      desc: 'QA, documentation, handover. 30 days of support included post-delivery.',
      details: [
        'Complete QA',
        'Technical documentation',
        'Handover to your team',
        '30 days of support',
      ],
    },
  ],
  pt: [
    {
      n: '01',
      title: 'Conversa',
      desc: 'Ouço sua situação, entendo suas restrições e defino o que sucesso significa para você.',
      details: [
        'Ligação de 30–45 min',
        'Contexto do negócio',
        'Restrições técnicas',
        'Expectativas de resultado',
      ],
    },
    {
      n: '02',
      title: 'Proposta',
      desc: 'Monto um plano claro com entregables, timeline e orçamento. Sem surpresas.',
      details: [
        'Escopo definido',
        'Timeline com marcos',
        'Orçamento transparente',
        'Perguntas antes de começar',
      ],
    },
    {
      n: '03',
      title: 'Execução',
      desc: 'Sprints de 2 semanas com demo toda sexta. Código no seu repo desde o dia um.',
      details: [
        'Demo semanal ao vivo',
        'Código no seu repositório',
        'Feedback constante',
        'Ajustes sem drama',
      ],
    },
    {
      n: '04',
      title: 'Entrega',
      desc: 'QA, documentação, handover. 30 dias de suporte incluídos pós-entrega.',
      details: [
        'QA completo',
        'Documentação técnica',
        'Handover para sua equipe',
        '30 dias de suporte',
      ],
    },
  ],
};

export function getServicesData(lang: Lang) {
  return { services: services[lang], process: process[lang] };
}
