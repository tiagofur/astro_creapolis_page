import type { Lang } from '../ui';

export interface GuideStep { num: string; title: string; desc: string }
export interface Tip { icon: string; title: string; desc: string }
export interface SupportOption { icon: string; title: string; desc: string; link: string; linkText: string }
export interface FaqItem { q: string; a: string }
export interface NextCard { icon: string; title: string; desc: string; href: string }

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
    nav: { features: 'Funciones', guide: 'Guía', tips: 'Tips', support: 'Soporte' },
    cta: 'Descargar',
    guide: {
      eyebrow: 'Guía rápida',
      title: 'Bienvenido a',
      titleSerif: 'Pepinillo',
      subtitle: 'Pepinillo está diseñada para ser simple pero potente. Así arrancás:',
      steps: [
        { num: '01', title: 'Elegí un modo', desc: 'Deslizá entre Pomodoro, Flowtime, Time Block o Cronómetro. Cada modo está pensado para un estilo distinto de trabajo profundo.' },
        { num: '02', title: 'Vinculá una tarea', desc: 'Tocá "Vincular tarea" para elegir en qué estás trabajando. Esto te ayuda a saber a dónde se va tu tiempo.' },
        { num: '03', title: 'Empezá a enfocarte', desc: 'Tocá el botón grande de Start y metele. Pepinillo se encarga del resto — incluyendo tus descansos.' },
        { num: '04', title: 'Descansos conscientes', desc: 'Cuando termina el timer, seguí las actividades de descanso sugeridas. Estirate, respirá, hidratate.' },
      ],
      tipTitle: 'Pro tip: Live Activities',
      tipText: 'No necesitás tener la app abierta. Tu timer aparece automáticamente en la Pantalla de bloqueo y en la Dynamic Island. Arrancá la sesión y dejá el teléfono.',
      lockScreen: 'Pantalla de bloqueo',
      dynamicIsland: 'Dynamic Island',
      nextTitle: '¿Y ahora?',
      nextCards: [
        { icon: '🧠', title: 'Tips de enfoque', desc: 'Dominá el deep work con estrategias probadas.', href: '/proyectos/pepinillo/tips' },
        { icon: '💬', title: 'Feedback y soporte', desc: '¿Preguntas? Acá estamos para ayudarte.', href: '/proyectos/pepinillo/feedback' },
      ],
    },
    tips: {
      eyebrow: 'Técnicas de enfoque',
      title: 'Dominá tu',
      titleSerif: 'enfoque',
      subtitle: 'Estrategias probadas para rendir más con menos distracciones. Elegí la que te funcione.',
      items: [
        { icon: '⏰', title: 'La regla de los 5 minutos', desc: 'Si una tarea te da pereza, ponete un timer de 5 minutos. En general, una vez que arrancás querés seguir. Lo difícil es empezar.' },
        { icon: '📦', title: 'Batching', desc: 'Usá Time Blocks para agrupar tareas chicas similares. Terminás más rápido enfocándote en un solo tipo de trabajo a la vez.' },
        { icon: '🌊', title: 'La ventaja de Flowtime', desc: 'Si los descansos del Pomodoro te distraen, probá Flowtime. Te deja trabajar mientras estés "en flow" y sólo sugiere descanso cuando tu concentración baja.' },
        { icon: '🧘', title: 'Acepta el aburrimiento', desc: 'No saques el teléfono en los descansos. Sentate, estirate o respirá. Entrená tu cerebro a descansar sin distracción.' },
        { icon: '🔄', title: 'Creá rituales', desc: 'Empezá y terminá las sesiones con un ritual simple. Le avisa a tu cerebro cuándo enfocarse y cuándo descansar. La constancia crea el hábito.' },
        { icon: '📊', title: 'Revisá tu semana', desc: 'Mirá tu historial de focus al final de la semana. Ves a dónde se fue tu tiempo y ajustás. Lo que se mide, se puede mejorar.' },
      ],
      nextTitle: 'Seguí aprendiendo',
      nextCards: [
        { icon: '📖', title: 'Guía rápida', desc: 'Configurá tu primera sesión en menos de 2 minutos.', href: '/proyectos/pepinillo/guide' },
        { icon: '💬', title: 'Feedback y soporte', desc: '¿Tenés una pregunta? Te ayudamos.', href: '/proyectos/pepinillo/feedback' },
      ],
    },
    feedback: {
      eyebrow: 'Feedback y soporte',
      title: 'Acá estamos para',
      titleSerif: 'ayudarte',
      subtitle: '¿Bug? ¿Feature request? ¿Sólo saludar? Escribinos — leemos todo y contestamos rápido.',
      options: [
        { icon: '✉️', title: 'Soporte por email', desc: 'Para bugs, feature requests o problemas de cuenta — leemos cada email.', link: 'mailto:hola@creapolis.dev?subject=Pepinillo%20-%20Soporte', linkText: 'hola@creapolis.dev' },
        { icon: '𝕏', title: 'X (Twitter)', desc: 'Escribinos público o por DM. Estamos activos y contestamos.', link: 'https://x.com/creapolisdev', linkText: '@creapolisdev' },
      ],
      faqTitle: 'Preguntas frecuentes',
      faqItems: [
        { q: '¿Cómo cancelo la suscripción?', a: 'Las suscripciones se gestionan desde la App Store. Andá a Ajustes → Apple ID → Suscripciones en tu iPhone o iPad, buscá Pepinillo y tocá Cancelar. Mantenés el acceso Pro hasta que termine el ciclo facturado.' },
        { q: 'Mi timer se detuvo en segundo plano. ¿Qué hago?', a: 'Asegurate que la "Actualización en segundo plano" esté activada para Pepinillo: Ajustes → Pepinillo → Actualización en segundo plano → On. También verificá que las Live Activities estén habilitadas en Ajustes → Pepinillo → Live Activities.' },
        { q: '¿Cómo funciona el sync con iCloud?', a: 'Si estás logueado con iCloud en todos tus dispositivos, tus tareas e historial de focus se sincronizan solos. Usamos CloudKit de Apple — tus datos pasan por los servidores de Apple, no por los nuestros. Nunca los vemos.' },
        { q: '¿Puedo usar Pepinillo en Mac?', a: 'Sí. Pepinillo corre nativo en Mac (Apple Silicon e Intel). Descargala desde la Mac App Store — viene incluida con tu compra, sin costo extra.' },
        { q: '¿Cómo pido un reembolso?', a: 'Los reembolsos los maneja Apple directo. Visitá reportaproblem.apple.com, ingresá con tu Apple ID, buscá la compra de Pepinillo y seleccioná "Solicitar un reembolso".' },
      ],
    },
  },
  en: {
    nav: { features: 'Features', guide: 'Guide', tips: 'Tips', support: 'Support' },
    cta: 'Download',
    guide: {
      eyebrow: 'Quick Start',
      title: 'Welcome to',
      titleSerif: 'Pepinillo',
      subtitle: 'Pepinillo is designed to be simple yet powerful. Here is how to get started:',
      steps: [
        { num: '01', title: 'Pick a Mode', desc: 'Swipe between Pomodoro, Flowtime, Time Block, or Stopwatch. Each mode is designed for a different style of deep work.' },
        { num: '02', title: 'Link a Task', desc: 'Tap "Link Task" to select what you\'re working on. This helps you track where your time goes.' },
        { num: '03', title: 'Start Focusing', desc: 'Hit the big Start button and dive in. Pepinillo takes care of the rest — including your breaks.' },
        { num: '04', title: 'Mindful Breaks', desc: 'When the timer ends, follow the suggested break activities to recharge. Stretch, breathe, hydrate.' },
      ],
      tipTitle: 'Pro Tip: Live Activities',
      tipText: 'You don\'t need to keep the app open. Your timer will appear on your Lock Screen and in the Dynamic Island automatically. Just start a session and put your phone down.',
      lockScreen: 'Lock Screen',
      dynamicIsland: 'Dynamic Island',
      nextTitle: 'What\'s next?',
      nextCards: [
        { icon: '🧠', title: 'Focus Tips & Techniques', desc: 'Master deep work with proven strategies.', href: '/proyectos/pepinillo/tips' },
        { icon: '💬', title: 'Feedback & Support', desc: 'Questions? We\'re here to help.', href: '/proyectos/pepinillo/feedback' },
      ],
    },
    tips: {
      eyebrow: 'Focus Techniques',
      title: 'Mastering your',
      titleSerif: 'focus',
      subtitle: 'Proven strategies to get more done with less distraction. Pick what works for you.',
      items: [
        { icon: '⏰', title: 'The 5-Minute Rule', desc: 'If a task feels daunting, set a 5-minute timer. Usually, once you start, you\'ll want to keep going. The hardest part is starting.' },
        { icon: '📦', title: 'Batching', desc: 'Use Time Blocks to group similar small tasks together. Get things done faster by focusing on one type of work at a time.' },
        { icon: '🌊', title: 'The Flowtime Advantage', desc: 'If you find Pomodoro breaks distracting, try Flowtime mode. It lets you work as long as you\'re in "flow" and only suggests a break when your concentration dips.' },
        { icon: '🧘', title: 'Embrace Boredom', desc: 'Don\'t reach for your phone during breaks. Sit, stretch, or just breathe. Train your brain to rest without distraction.' },
        { icon: '🔄', title: 'Create Rituals', desc: 'Start and end work sessions with a simple ritual. It signals to your brain when to focus and when to rest. Consistency builds habits.' },
        { icon: '📊', title: 'Review Your Week', desc: 'Check your focus history at the end of each week. See where your time went and adjust. What gets measured gets managed.' },
      ],
      nextTitle: 'Keep going',
      nextCards: [
        { icon: '📖', title: 'Quick Start Guide', desc: 'Set up your first session in under 2 minutes.', href: '/proyectos/pepinillo/guide' },
        { icon: '💬', title: 'Feedback & Support', desc: 'Have a question? We\'re here to help.', href: '/proyectos/pepinillo/feedback' },
      ],
    },
    feedback: {
      eyebrow: 'Feedback & Support',
      title: 'We\'re here to',
      titleSerif: 'help',
      subtitle: 'Bug? Feature request? Just want to say hi? Reach out — we read everything and reply fast.',
      options: [
        { icon: '✉️', title: 'Email Support', desc: 'For bugs, feature requests, or account issues — we read every email.', link: 'mailto:hola@creapolis.dev?subject=Pepinillo%20-%20Support', linkText: 'hola@creapolis.dev' },
        { icon: '𝕏', title: 'X (Twitter)', desc: 'Reach out publicly or via DM. We\'re active and responsive.', link: 'https://x.com/creapolisdev', linkText: '@creapolisdev' },
      ],
      faqTitle: 'Common Questions',
      faqItems: [
        { q: 'How do I cancel my subscription?', a: 'Subscriptions are managed through the App Store. Go to Settings → Apple ID → Subscriptions on your iPhone or iPad, find Pepinillo, and tap Cancel Subscription. You\'ll keep Pro access until the end of your billing period.' },
        { q: 'My timer stopped running in the background. What do I do?', a: 'Make sure Background App Refresh is enabled for Pepinillo: Settings → Pepinillo → Background App Refresh → On. Also check that Live Activities are enabled in Settings → Pepinillo → Live Activities.' },
        { q: 'How does iCloud Sync work?', a: 'If you\'re signed into iCloud on all your devices, your tasks and focus history sync automatically. We use Apple\'s CloudKit — your data goes through Apple\'s servers, not ours. We never see it.' },
        { q: 'Can I use Pepinillo on Mac?', a: 'Yes. Pepinillo runs natively on Mac (Apple Silicon and Intel). Download it from the Mac App Store — it\'s included with your purchase, no extra cost.' },
        { q: 'How do I request a refund?', a: 'Refunds are handled directly by Apple. Visit reportaproblem.apple.com, sign in with your Apple ID, find your Pepinillo purchase, and select "Request a Refund".' },
      ],
    },
  },
  pt: {
    nav: { features: 'Funções', guide: 'Guia', tips: 'Dicas', support: 'Suporte' },
    cta: 'Baixar',
    guide: {
      eyebrow: 'Guia rápido',
      title: 'Bem-vindo ao',
      titleSerif: 'Pepinillo',
      subtitle: 'Pepinillo é projetado para ser simples mas poderoso. Assim você começa:',
      steps: [
        { num: '01', title: 'Escolha um modo', desc: 'Deslize entre Pomodoro, Flowtime, Time Block ou Cronômetro. Cada modo é pensado para um estilo diferente de trabalho profundo.' },
        { num: '02', title: 'Vincule uma tarefa', desc: 'Toque em "Vincular tarefa" para escolher no que está trabalhando. Isso ajuda a saber para onde vai seu tempo.' },
        { num: '03', title: 'Comece a focar', desc: 'Toque no botão grande de Start e mande ver. Pepinillo cuida do resto — incluindo suas pausas.' },
        { num: '04', title: 'Pausas conscientes', desc: 'Quando o timer termina, siga as atividades de pausa sugeridas. Alongue, respire, hidrate.' },
      ],
      tipTitle: 'Pro tip: Live Activities',
      tipText: 'Não precisa manter o app aberto. Seu timer aparece automaticamente na Tela de bloqueio e na Dynamic Island. Comece a sessão e deixe o telefone.',
      lockScreen: 'Tela de bloqueio',
      dynamicIsland: 'Dynamic Island',
      nextTitle: 'E agora?',
      nextCards: [
        { icon: '🧠', title: 'Dicas de foco', desc: 'Domine o deep work com estratégias comprovadas.', href: '/projetos/pepinillo/tips' },
        { icon: '💬', title: 'Feedback e suporte', desc: 'Perguntas? Estamos aqui para ajudar.', href: '/projetos/pepinillo/feedback' },
      ],
    },
    tips: {
      eyebrow: 'Técnicas de foco',
      title: 'Domine seu',
      titleSerif: 'foco',
      subtitle: 'Estratégias comprovadas para render mais com menos distrações. Escolha a que funciona para você.',
      items: [
        { icon: '⏰', title: 'A regra dos 5 minutos', desc: 'Se uma tarefa dá preguiça, coloque um timer de 5 minutos. Em geral, uma vez que começa, quer continuar. O difícil é começar.' },
        { icon: '📦', title: 'Batching', desc: 'Use Time Blocks para agrupar tarefas pequenas parecidas. Termina mais rápido focando em um só tipo de trabalho por vez.' },
        { icon: '🌊', title: 'A vantagem do Flowtime', desc: 'Se as pausas do Pomodoro te distraem, experimente o Flowtime. Deixa trabalhar enquanto estiver "em flow" e só sugere pausa quando a concentração baixa.' },
        { icon: '🧘', title: 'Aceite o tédio', desc: 'Não pegue o celular nas pausas. Sente, alongue ou respire. Treine seu cérebro a descansar sem distração.' },
        { icon: '🔄', title: 'Crie rituais', desc: 'Comece e termine as sessões com um ritual simples. Avisa ao cérebro quando focar e quando descansar. A constância cria o hábito.' },
        { icon: '📊', title: 'Revise sua semana', desc: 'Olhe seu histórico de foco no final da semana. Veja para onde foi seu tempo e ajuste. O que se mede, se pode melhorar.' },
      ],
      nextTitle: 'Continue aprendendo',
      nextCards: [
        { icon: '📖', title: 'Guia rápido', desc: 'Configure sua primeira sessão em menos de 2 minutos.', href: '/projetos/pepinillo/guide' },
        { icon: '💬', title: 'Feedback e suporte', desc: 'Tem uma pergunta? Ajudamos.', href: '/projetos/pepinillo/feedback' },
      ],
    },
    feedback: {
      eyebrow: 'Feedback e suporte',
      title: 'Estamos aqui para',
      titleSerif: 'ajudar',
      subtitle: 'Bug? Sugestão de feature? Só quer dizer olá? Escreva — lemos tudo e respondemos rápido.',
      options: [
        { icon: '✉️', title: 'Suporte por email', desc: 'Para bugs, sugestões ou problemas de conta — lemos cada email.', link: 'mailto:hola@creapolis.dev?subject=Pepinillo%20-%20Suporte', linkText: 'hola@creapolis.dev' },
        { icon: '𝕏', title: 'X (Twitter)', desc: 'Escreva público ou por DM. Estamos ativos e respondemos.', link: 'https://x.com/creapolisdev', linkText: '@creapolisdev' },
      ],
      faqTitle: 'Perguntas frequentes',
      faqItems: [
        { q: 'Como cancelo a assinatura?', a: 'As assinaturas são gerenciadas pela App Store. Vá em Ajustes → Apple ID → Assinaturas no seu iPhone ou iPad, encontre Pepinillo e toque em Cancelar. Você mantém o acesso Pro até o fim do ciclo faturado.' },
        { q: 'Meu timer parou em segundo plano. O que faço?', a: 'Certifique-se que "Atualização em segundo plano" está ativada para o Pepinillo: Ajustes → Pepinillo → Atualização em segundo plano → On. Também verifique que as Live Activities estão habilitadas em Ajustes → Pepinillo → Live Activities.' },
        { q: 'Como funciona o sync com iCloud?', a: 'Se estiver logado com iCloud em todos os seus dispositivos, suas tarefas e histórico de foco sincronizam automaticamente. Usamos o CloudKit da Apple — seus dados passam pelos servidores da Apple, não pelos nossos. Nunca os vemos.' },
        { q: 'Posso usar o Pepinillo no Mac?', a: 'Sim. Pepinillo roda nativo no Mac (Apple Silicon e Intel). Baixe da Mac App Store — vem incluído com sua compra, sem custo extra.' },
        { q: 'Como peço reembolso?', a: 'Os reembolsos são tratados diretamente pela Apple. Visite reportaproblem.apple.com, entre com seu Apple ID, encontre a compra do Pepinillo e selecione "Solicitar reembolso".' },
      ],
    },
  },
};

export function getPepinilloSupportData(lang: Lang) {
  return data[lang];
}
