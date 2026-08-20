import type { Lang } from '../ui';

export interface GuideStep {
  num: string;
  title: string;
  desc: string;
}
export interface Tip {
  icon: string;
  title: string;
  desc: string;
}
export interface SupportOption {
  icon: string;
  title: string;
  desc: string;
  link: string;
  linkText: string;
}
export interface FaqItem {
  q: string;
  a: string;
}
export interface NextCard {
  icon: string;
  title: string;
  desc: string;
  href: string;
}

interface PepinilloSupportData {
  nav: { features: string; guide: string; tips: string; support: string };
  cta: string;
  guide: {
    eyebrow: string;
    title: string;
    titleSerif: string;
    subtitle: string;
    steps: GuideStep[];
    tipTitle: string;
    tipText: string;
    lockScreen: string;
    dynamicIsland: string;
    nextTitle: string;
    nextCards: NextCard[];
  };
  tips: {
    eyebrow: string;
    title: string;
    titleSerif: string;
    subtitle: string;
    items: Tip[];
    nextTitle: string;
    nextCards: NextCard[];
  };
  feedback: {
    eyebrow: string;
    title: string;
    titleSerif: string;
    subtitle: string;
    options: SupportOption[];
    faqTitle: string;
    faqItems: FaqItem[];
  };
}

const data: Record<Lang, PepinilloSupportData> = {
  es: {
    nav: {
      features: 'Funciones',
      guide: 'Guía',
      tips: 'Tips',
      support: 'Soporte',
    },
    cta: 'Descargar',
    guide: {
      eyebrow: 'Guía rápida',
      title: 'Bienvenido a',
      titleSerif: 'Pepinillo',
      subtitle:
        'Pepinillo está diseñada para ser simple pero potente. Así arrancás:',
      steps: [
        {
          num: '01',
          title: 'Elegí un modo',
          desc: 'Deslizá entre Pomodoro, Flowtime, Time Block o Cronómetro. Cada modo está pensado para un estilo distinto de trabajo profundo.',
        },
        {
          num: '02',
          title: 'Vinculá una tarea',
          desc: 'Tocá "Vincular tarea" para elegir en qué estás trabajando. Esto te ayuda a saber a dónde se va tu tiempo.',
        },
        {
          num: '03',
          title: 'Empezá a enfocarte',
          desc: 'Tocá el botón grande de Start y metele. Pepinillo se encarga del resto — incluyendo tus descansos.',
        },
        {
          num: '04',
          title: 'Descansos conscientes',
          desc: 'Cuando termina el timer, seguí las actividades de descanso sugeridas. Estirate, respirá, hidratate.',
        },
      ],
      tipTitle: 'Pro tip: Live Activities y notificaciones',
      tipText:
        'No necesitás tener la app abierta. En iOS, tu timer aparece en la Pantalla de bloqueo y Dynamic Island. En Android, sigue corriendo en segundo plano con notificaciones. Arrancá la sesión y dejá el teléfono.',
      lockScreen: 'Pantalla de bloqueo / Notificaciones',
      dynamicIsland: 'Dynamic Island / Segundo plano',
      nextTitle: '¿Y ahora?',
      nextCards: [
        {
          icon: '🧠',
          title: 'Tips de enfoque',
          desc: 'Dominá el deep work con estrategias probadas.',
          href: '/proyectos/pepinillo/tips',
        },
        {
          icon: '💬',
          title: 'Feedback y soporte',
          desc: '¿Preguntas? Acá estamos para ayudarte.',
          href: '/proyectos/pepinillo/feedback',
        },
      ],
    },
    tips: {
      eyebrow: 'Técnicas de enfoque',
      title: 'Dominá tu',
      titleSerif: 'enfoque',
      subtitle:
        'Estrategias probadas para rendir más con menos distracciones. Elegí la que te funcione.',
      items: [
        {
          icon: '⏰',
          title: 'La regla de los 5 minutos',
          desc: 'Si una tarea te da pereza, ponete un timer de 5 minutos. En general, una vez que arrancás querés seguir. Lo difícil es empezar.',
        },
        {
          icon: '📦',
          title: 'Batching',
          desc: 'Usá Time Blocks para agrupar tareas chicas similares. Terminás más rápido enfocándote en un solo tipo de trabajo a la vez.',
        },
        {
          icon: '🌊',
          title: 'La ventaja de Flowtime',
          desc: 'Si los descansos del Pomodoro te distraen, probá Flowtime. Te deja trabajar mientras estés "en flow" y sólo sugiere descanso cuando tu concentración baja.',
        },
        {
          icon: '🧘',
          title: 'Acepta el aburrimiento',
          desc: 'No saques el teléfono en los descansos. Sentate, estirate o respirá. Entrená tu cerebro a descansar sin distracción.',
        },
        {
          icon: '🔄',
          title: 'Creá rituales',
          desc: 'Empezá y terminá las sesiones con un ritual simple. Le avisa a tu cerebro cuándo enfocarse y cuándo descansar. La constancia crea el hábito.',
        },
        {
          icon: '📊',
          title: 'Revisá tu semana',
          desc: 'Mirá tu historial de focus al final de la semana. Ves a dónde se fue tu tiempo y ajustás. Lo que se mide, se puede mejorar.',
        },
      ],
      nextTitle: 'Seguí aprendiendo',
      nextCards: [
        {
          icon: '📖',
          title: 'Guía rápida',
          desc: 'Configurá tu primera sesión en menos de 2 minutos.',
          href: '/proyectos/pepinillo/guide',
        },
        {
          icon: '💬',
          title: 'Feedback y soporte',
          desc: '¿Tenés una pregunta? Te ayudo.',
          href: '/proyectos/pepinillo/feedback',
        },
      ],
    },
    feedback: {
      eyebrow: 'Feedback y soporte',
      title: 'Acá estamos para',
      titleSerif: 'ayudarte',
      subtitle:
        '¿Bug? ¿Feature request? ¿Sólo saludar? Escribinos — leemos todo y contestamos rápido.',
      options: [
        {
          icon: '✉️',
          title: 'Soporte por email',
          desc: 'Para bugs, feature requests o problemas de cuenta — leemos cada email.',
          link: 'mailto:hola@creapolis.dev?subject=Pepinillo%20-%20Soporte',
          linkText: 'hola@creapolis.dev',
        },
        {
          icon: '𝕏',
          title: 'X (Twitter)',
          desc: 'Escribinos público o por DM. Estamos activos y contestamos.',
          link: 'https://x.com/creapolisdev',
          linkText: '@creapolisdev',
        },
      ],
      faqTitle: 'Preguntas frecuentes',
      faqItems: [
        {
          q: 'Mi timer se detuvo en segundo plano. ¿Qué hago?',
          a: 'En iOS: verificá que las Live Activities estén habilitadas en Ajustes → Pepinillo. En Android: asegurate de que Pepinillo no esté restringido por batería (Ajustes → Aplicaciones → Pepinillo → Batería → Sin restricciones).',
        },
        {
          q: '¿Cómo sincronizo mis datos entre dispositivos?',
          a: 'En iOS, la sincronización es automática vía iCloud (CloudKit). Tus tareas e historial se mantienen al día en iPhone, iPad y Mac. En Android, los datos se almacenan localmente — estamos trabajando en sincronización cruzada.',
        },
        {
          q: '¿Cómo cancelo la suscripción Premium?',
          a: 'En iOS: Ajustes → Tu nombre → Suscripciones → Pepinillo → Cancelar. En Google Play: Tu perfil → Pagos y suscripciones → Suscripciones → Pepinillo → Cancelar. Mantenés el acceso Premium hasta que termine el ciclo.',
        },
        {
          q: '¿Puedo usar Pepinillo en Mac?',
          a: 'Sí. En Apple Silicon e Intel, descargalo desde la Mac App Store — viene incluido con tu compra de iOS, sin costo extra.',
        },
        {
          q: '¿Cómo reporto un bug?',
          a: 'Escribinos a hola@creapolis.dev con una descripción del problema, tu modelo de dispositivo y versión del sistema operativo. Lo revisamos y te contestamos en menos de 24 horas.',
        },
      ],
    },
  },
  en: {
    nav: {
      features: 'Features',
      guide: 'Guide',
      tips: 'Tips',
      support: 'Support',
    },
    cta: 'Download',
    guide: {
      eyebrow: 'Quick Start',
      title: 'Welcome to',
      titleSerif: 'Pepinillo',
      subtitle:
        'Pepinillo is designed to be simple yet powerful. Here is how to get started:',
      steps: [
        {
          num: '01',
          title: 'Pick a Mode',
          desc: 'Swipe between Pomodoro, Flowtime, Time Block, or Stopwatch. Each mode is designed for a different style of deep work.',
        },
        {
          num: '02',
          title: 'Link a Task',
          desc: 'Tap "Link Task" to select what you\'re working on. This helps you track where your time goes.',
        },
        {
          num: '03',
          title: 'Start Focusing',
          desc: 'Hit the big Start button and dive in. Pepinillo takes care of the rest — including your breaks.',
        },
        {
          num: '04',
          title: 'Mindful Breaks',
          desc: 'When the timer ends, follow the suggested break activities to recharge. Stretch, breathe, hydrate.',
        },
      ],
      tipTitle: 'Pro Tip: Live Activities & Notifications',
      tipText:
        "You don't need to keep the app open. On iOS, your timer appears on the Lock Screen and Dynamic Island. On Android, it keeps running in the background with notifications. Start a session and put your phone down.",
      lockScreen: 'Lock Screen / Notifications',
      dynamicIsland: 'Dynamic Island / Background',
      nextTitle: "What's next?",
      nextCards: [
        {
          icon: '🧠',
          title: 'Focus Tips & Techniques',
          desc: 'Master deep work with proven strategies.',
          href: '/proyectos/pepinillo/tips',
        },
        {
          icon: '💬',
          title: 'Feedback & Support',
          desc: "Questions? We're here to help.",
          href: '/proyectos/pepinillo/feedback',
        },
      ],
    },
    tips: {
      eyebrow: 'Focus Techniques',
      title: 'Mastering your',
      titleSerif: 'focus',
      subtitle:
        'Proven strategies to get more done with less distraction. Pick what works for you.',
      items: [
        {
          icon: '⏰',
          title: 'The 5-Minute Rule',
          desc: "If a task feels daunting, set a 5-minute timer. Usually, once you start, you'll want to keep going. The hardest part is starting.",
        },
        {
          icon: '📦',
          title: 'Batching',
          desc: 'Use Time Blocks to group similar small tasks together. Get things done faster by focusing on one type of work at a time.',
        },
        {
          icon: '🌊',
          title: 'The Flowtime Advantage',
          desc: 'If you find Pomodoro breaks distracting, try Flowtime mode. It lets you work as long as you\'re in "flow" and only suggests a break when your concentration dips.',
        },
        {
          icon: '🧘',
          title: 'Embrace Boredom',
          desc: "Don't reach for your phone during breaks. Sit, stretch, or just breathe. Train your brain to rest without distraction.",
        },
        {
          icon: '🔄',
          title: 'Create Rituals',
          desc: 'Start and end work sessions with a simple ritual. It signals to your brain when to focus and when to rest. Consistency builds habits.',
        },
        {
          icon: '📊',
          title: 'Review Your Week',
          desc: 'Check your focus history at the end of each week. See where your time went and adjust. What gets measured gets managed.',
        },
      ],
      nextTitle: 'Keep going',
      nextCards: [
        {
          icon: '📖',
          title: 'Quick Start Guide',
          desc: 'Set up your first session in under 2 minutes.',
          href: '/proyectos/pepinillo/guide',
        },
        {
          icon: '💬',
          title: 'Feedback & Support',
          desc: "Have a question? We're here to help.",
          href: '/proyectos/pepinillo/feedback',
        },
      ],
    },
    feedback: {
      eyebrow: 'Feedback & Support',
      title: "We're here to",
      titleSerif: 'help',
      subtitle:
        'Bug? Feature request? Just want to say hi? Reach out — we read everything and reply fast.',
      options: [
        {
          icon: '✉️',
          title: 'Email Support',
          desc: 'For bugs, feature requests, or account issues — we read every email.',
          link: 'mailto:hola@creapolis.dev?subject=Pepinillo%20-%20Support',
          linkText: 'hola@creapolis.dev',
        },
        {
          icon: '𝕏',
          title: 'X (Twitter)',
          desc: "Reach out publicly or via DM. We're active and responsive.",
          link: 'https://x.com/creapolisdev',
          linkText: '@creapolisdev',
        },
      ],
      faqTitle: 'Common Questions',
      faqItems: [
        {
          q: 'My timer stopped running in the background. What do I do?',
          a: "On iOS: make sure Live Activities are enabled in Settings → Pepinillo. On Android: ensure Pepinillo isn't battery-restricted (Settings → Apps → Pepinillo → Battery → Unrestricted).",
        },
        {
          q: 'How do I sync my data across devices?',
          a: "On iOS, sync is automatic via iCloud (CloudKit). Your tasks and focus history stay up to date across iPhone, iPad, and Mac. On Android, data is stored locally — we're working on cross-device sync.",
        },
        {
          q: 'How do I cancel my Premium subscription?',
          a: 'On iOS: Settings → Your name → Subscriptions → Pepinillo → Cancel. On Google Play: Your profile → Payments & subscriptions → Subscriptions → Pepinillo → Cancel. You keep Premium access until the end of the billing period.',
        },
        {
          q: 'Can I use Pepinillo on Mac?',
          a: "Yes. On Apple Silicon and Intel, download it from the Mac App Store — it's included with your iOS purchase, no extra cost.",
        },
        {
          q: 'How do I report a bug?',
          a: "Email us at hola@creapolis.dev with a description of the issue, your device model, and OS version. We'll review it and reply within 24 hours.",
        },
      ],
    },
  },
  pt: {
    nav: {
      features: 'Funções',
      guide: 'Guia',
      tips: 'Dicas',
      support: 'Suporte',
    },
    cta: 'Baixar',
    guide: {
      eyebrow: 'Guia rápido',
      title: 'Bem-vindo ao',
      titleSerif: 'Pepinillo',
      subtitle:
        'Pepinillo é projetado para ser simples mas poderoso. Assim você começa:',
      steps: [
        {
          num: '01',
          title: 'Escolha um modo',
          desc: 'Deslize entre Pomodoro, Flowtime, Time Block ou Cronômetro. Cada modo é pensado para um estilo diferente de trabalho profundo.',
        },
        {
          num: '02',
          title: 'Vincule uma tarefa',
          desc: 'Toque em "Vincular tarefa" para escolher no que está trabalhando. Isso ajuda a saber para onde vai seu tempo.',
        },
        {
          num: '03',
          title: 'Comece a focar',
          desc: 'Toque no botão grande de Start e mande ver. Pepinillo cuida do resto — incluindo suas pausas.',
        },
        {
          num: '04',
          title: 'Pausas conscientes',
          desc: 'Quando o timer termina, siga as atividades de pausa sugeridas. Alongue, respire, hidrate.',
        },
      ],
      tipTitle: 'Pro tip: Live Activities e notificações',
      tipText:
        'Não precisa manter o app aberto. No iOS, seu timer aparece na Tela de bloqueio e Dynamic Island. No Android, continua rodando em segundo plano com notificações. Comece a sessão e deixe o telefone.',
      lockScreen: 'Tela de bloqueio / Notificações',
      dynamicIsland: 'Dynamic Island / Segundo plano',
      nextTitle: 'E agora?',
      nextCards: [
        {
          icon: '🧠',
          title: 'Dicas de foco',
          desc: 'Domine o deep work com estratégias comprovadas.',
          href: '/projetos/pepinillo/tips',
        },
        {
          icon: '💬',
          title: 'Feedback e suporte',
          desc: 'Perguntas? Estamos aqui para ajudar.',
          href: '/projetos/pepinillo/feedback',
        },
      ],
    },
    tips: {
      eyebrow: 'Técnicas de foco',
      title: 'Domine seu',
      titleSerif: 'foco',
      subtitle:
        'Estratégias comprovadas para render mais com menos distrações. Escolha a que funciona para você.',
      items: [
        {
          icon: '⏰',
          title: 'A regra dos 5 minutos',
          desc: 'Se uma tarefa dá preguiça, coloque um timer de 5 minutos. Em geral, uma vez que começa, quer continuar. O difícil é começar.',
        },
        {
          icon: '📦',
          title: 'Batching',
          desc: 'Use Time Blocks para agrupar tarefas pequenas parecidas. Termina mais rápido focando em um só tipo de trabalho por vez.',
        },
        {
          icon: '🌊',
          title: 'A vantagem do Flowtime',
          desc: 'Se as pausas do Pomodoro te distraem, experimente o Flowtime. Deixa trabalhar enquanto estiver "em flow" e só sugere pausa quando a concentração baixa.',
        },
        {
          icon: '🧘',
          title: 'Aceite o tédio',
          desc: 'Não pegue o celular nas pausas. Sente, alongue ou respire. Treine seu cérebro a descansar sem distração.',
        },
        {
          icon: '🔄',
          title: 'Crie rituais',
          desc: 'Comece e termine as sessões com um ritual simples. Avisa ao cérebro quando focar e quando descansar. A constância cria o hábito.',
        },
        {
          icon: '📊',
          title: 'Revise sua semana',
          desc: 'Olhe seu histórico de foco no final da semana. Veja para onde foi seu tempo e ajuste. O que se mede, se pode melhorar.',
        },
      ],
      nextTitle: 'Continue aprendendo',
      nextCards: [
        {
          icon: '📖',
          title: 'Guia rápido',
          desc: 'Configure sua primeira sessão em menos de 2 minutos.',
          href: '/projetos/pepinillo/guide',
        },
        {
          icon: '💬',
          title: 'Feedback e suporte',
          desc: 'Tem uma pergunta? Ajudo.',
          href: '/projetos/pepinillo/feedback',
        },
      ],
    },
    feedback: {
      eyebrow: 'Feedback e suporte',
      title: 'Estamos aqui para',
      titleSerif: 'ajudar',
      subtitle:
        'Bug? Sugestão de feature? Só quer dizer olá? Escreva — lemos tudo e respondemos rápido.',
      options: [
        {
          icon: '✉️',
          title: 'Suporte por email',
          desc: 'Para bugs, sugestões ou problemas de conta — lemos cada email.',
          link: 'mailto:hola@creapolis.dev?subject=Pepinillo%20-%20Suporte',
          linkText: 'hola@creapolis.dev',
        },
        {
          icon: '𝕏',
          title: 'X (Twitter)',
          desc: 'Escreva público ou por DM. Estamos ativos e respondemos.',
          link: 'https://x.com/creapolisdev',
          linkText: '@creapolisdev',
        },
      ],
      faqTitle: 'Perguntas frequentes',
      faqItems: [
        {
          q: 'Meu timer parou em segundo plano. O que faço?',
          a: 'No iOS: verifique se as Live Activities estão habilitadas em Ajustes → Pepinillo. No Android: certifique-se de que o Pepinillo não está restrito por bateria (Ajustes → Aplicativos → Pepinillo → Bateria → Sem restrições).',
        },
        {
          q: 'Como sincronizo meus dados entre dispositivos?',
          a: 'No iOS, a sincronização é automática via iCloud (CloudKit). Suas tarefas e histórico de foco ficam atualizados no iPhone, iPad e Mac. No Android, os dados são armazenados localmente — estamos trabalhando em sincronização cruzada.',
        },
        {
          q: 'Como cancelo a assinatura Premium?',
          a: 'No iOS: Ajustes → Seu nome → Assinaturas → Pepinillo → Cancelar. No Google Play: Seu perfil → Pagamentos e assinaturas → Assinaturas → Pepinillo → Cancelar. Você mantém o acesso Premium até o fim do ciclo.',
        },
        {
          q: 'Posso usar o Pepinillo no Mac?',
          a: 'Sim. No Apple Silicon e Intel, baixe da Mac App Store — vem incluído com sua compra de iOS, sem custo extra.',
        },
        {
          q: 'Como reporto um bug?',
          a: 'Escreva para hola@creapolis.dev com uma descrição do problema, modelo do dispositivo e versão do sistema operacional. Revisamos e respondemos em menos de 24 horas.',
        },
      ],
    },
  },
};

export function getPepinilloSupportData(lang: Lang) {
  return data[lang];
}
