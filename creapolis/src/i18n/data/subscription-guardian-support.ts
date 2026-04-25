import type { Lang } from '../ui';

export interface GuideStep { num: string; title: string; desc: string }
export interface Tip { icon: string; title: string; desc: string }
export interface SupportOption { icon: string; title: string; desc: string; link: string; linkText: string }
export interface FaqItem { q: string; a: string }
export interface NextCard { icon: string; title: string; desc: string; href: string }

interface SGSupportData {
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

const data: Record<Lang, SGSupportData> = {
  es: {
    nav: { features: 'Funciones', guide: 'Guía', tips: 'Tips', support: 'Soporte' },
    cta: 'Descargar',
    guide: {
      eyebrow: 'Guía rápida',
      title: 'Bienvenido a',
      titleSerif: 'Subscription Guardian',
      subtitle: 'Empezá a controlar tus suscripciones en menos de 2 minutos. Así se configura:',
      steps: [
        { num: '01', title: 'Agregá tu primera suscripción', desc: 'Tocá el botón + y elegí un preset popular (Netflix, Spotify, Disney+) o creá una custom. Ingresá el monto, la frecuencia y la fecha del próximo cobro.' },
        { num: '02', title: 'Configurá las alertas', desc: 'Subscription Guardian te avisa T-48h y T-24h antes de cada cobro. Activá las notificaciones críticas para montos mayores a $50 USD.' },
        { num: '03', title: 'Revisá tu Burn Rate', desc: 'Abrí el Dashboard y mirá cuánto "quemás" por mes y por año. Los gráficos de dona te muestran el gasto por categoría de un vistazo.' },
        { num: '04', title: 'Personalizá tus widgets', desc: 'Agregá el widget a tu Lock Screen o Home Screen para ver el próximo cobro sin abrir la app. Actualización en tiempo real.' },
      ],
      tipTitle: 'Pro tip:Ghost Detector',
      tipText: 'Próximamente, el Ghost Detector va a identificar las suscripciones que no usás hace más de 30 días y te va a sugerir cuáles cancelar. Todo con ML local — sin enviar datos a nadie.',
      nextTitle: '¿Y ahora?',
      nextCards: [
        { icon: '💡', title: 'Tips de suscripciones', desc: 'Estrategias para reducir tu gasto mensual sin perder lo que valorás.', href: '/proyectos/subscription-guardian/tips' },
        { icon: '💬', title: 'Feedback y soporte', desc: '¿Preguntas? Acá estamos para ayudarte.', href: '/proyectos/subscription-guardian/feedback' },
      ],
    },
    tips: {
      eyebrow: 'Tips de suscripciones',
      title: 'Dominá tus',
      titleSerif: 'gastos',
      subtitle: 'Estrategias prácticas para reducir la fatiga de suscripciones sin sacrificar lo que te importa.',
      items: [
        { icon: '🔍', title: 'Auditá cada 3 meses', desc: 'Abrí Subscription Guardian y revisá tu lista completa. Preguntate: "¿Usé esto en los últimos 90 días?". Si la respuesta es no, cancelá.' },
        { icon: '🏷️', title: 'Aprovechá los planes familiares', desc: 'Netflix, Spotify y Disney+ ofrecen planes para compartir. Dividí el costo con familia o amigos y reducí hasta un 50%.' },
        { icon: '📅', title: 'Estacionalizá', desc: '¿Solo usás Disney+ cuando sale una serie nueva? Cancelá entre temporadas. Suscribite, mirá, cancelá. No hay penalidad.' },
        { icon: '🔔', title: 'Nunca ignores una alerta', desc: 'Las notificaciones T-48h existen por un motivo. Tocá, evaluá y decidí en el momento. Después se te olvida y te cobran.' },
        { icon: '📊', title: 'Mirá el anual, no el mensual', desc: '$15/mes parece poco. Pero son $180/año. El Burn Rate Dashboard te muestra el impacto real anual para que decidas con perspectiva.' },
        { icon: '🆓', title: 'Probá la versión gratis primero', desc: 'Muchos servicios ofrecen free trial. Usá el trial, evaluá si realmente lo necesitás, y recién ahí suscribite. Subscription Guardian te avisa antes de que termine el trial.' },
      ],
      nextTitle: 'Seguí aprendiendo',
      nextCards: [
        { icon: '📖', title: 'Guía rápida', desc: 'Configurá tu primera suscripción en menos de 2 minutos.', href: '/proyectos/subscription-guardian/guide' },
        { icon: '💬', title: 'Feedback y soporte', desc: '¿Tenés una pregunta? Te ayudamos.', href: '/proyectos/subscription-guardian/feedback' },
      ],
    },
    feedback: {
      eyebrow: 'Feedback y soporte',
      title: 'Acá estamos para',
      titleSerif: 'ayudarte',
      subtitle: '¿Bug? ¿Sugerencia? ¿Sólo querés decir hola? Escribinos — leemos todo y contestamos rápido.',
      options: [
        { icon: '✉️', title: 'Soporte por email', desc: 'Para bugs, sugerencias o cualquier consulta — leemos cada email.', link: 'mailto:hola@creapolis.dev?subject=Subscription%20Guardian%20-%20Soporte', linkText: 'hola@creapolis.dev' },
        { icon: '𝕏', title: 'X (Twitter)', desc: 'Escribinos público o por DM. Estamos activos y contestamos.', link: 'https://x.com/creapolisdev', linkText: '@creapolisdev' },
      ],
      faqTitle: 'Preguntas frecuentes',
      faqItems: [
        { q: '¿Es pago único o suscripción?', a: 'Subscription Guardian es compra única de $4.99 USD. Sin suscripción, sin pagos recurrentes, sin sorpresas. Una vez que lo comprás, es tuyo para siempre.' },
        { q: '¿Mis datos están seguros?', a: 'Totalmente. Subscription Guardian no tiene servidores externos. Tus datos se guardan localmente en tu dispositivo y se sincronizan vía iCloud con CloudKit de Apple. Nosotros nunca vemos tus datos.' },
        { q: '¿Necesito crear una cuenta?', a: 'No. No hay login, no hay registro, no hay cuenta. Abrís la app y listo. Si querés sync entre dispositivos, se hace automático con tu iCloud.' },
        { q: '¿Puedo usar FaceID para proteger la app?', a: 'Sí. Activá el bloqueo con FaceID o TouchID desde la configuración de la app. Así nadie más ve tus suscripciones si te prestan el teléfono.' },
        { q: '¿Cómo pido un reembolso?', a: 'Los reembolsos los maneja Apple directamente. Visitá reportaproblem.apple.com, ingresá con tu Apple ID, buscá la compra de Subscription Guardian y seleccioná "Solicitar un reembolso".' },
        { q: '¿Funciona en iPad y Mac?', a: 'Sí. Subscription Guardian es Universal — funciona en iPhone, iPad y Mac (Apple Silicon e Intel). Una sola compra para todos tus dispositivos.' },
      ],
    },
  },
  en: {
    nav: { features: 'Features', guide: 'Guide', tips: 'Tips', support: 'Support' },
    cta: 'Download',
    guide: {
      eyebrow: 'Quick Start',
      title: 'Welcome to',
      titleSerif: 'Subscription Guardian',
      subtitle: 'Start controlling your subscriptions in under 2 minutes. Here\'s how to set it up:',
      steps: [
        { num: '01', title: 'Add your first subscription', desc: 'Tap the + button and pick a popular preset (Netflix, Spotify, Disney+) or create a custom one. Enter the amount, frequency, and next charge date.' },
        { num: '02', title: 'Set up alerts', desc: 'Subscription Guardian notifies you T-48h and T-24h before each charge. Enable critical alerts for amounts over $50 USD.' },
        { num: '03', title: 'Check your Burn Rate', desc: 'Open the Dashboard and see how much you "burn" per month and per year. Donut charts show spending by category at a glance.' },
        { num: '04', title: 'Customize your widgets', desc: 'Add the widget to your Lock Screen or Home Screen to see your next charge without opening the app. Real-time updates.' },
      ],
      tipTitle: 'Pro tip: Ghost Detector',
      tipText: 'Coming soon: Ghost Detector will identify subscriptions you haven\'t used in 30+ days and suggest which ones to cancel. All with on-device ML — no data sent anywhere.',
      nextTitle: 'What\'s next?',
      nextCards: [
        { icon: '💡', title: 'Subscription Tips', desc: 'Strategies to cut monthly spending without losing what you value.', href: '/proyectos/subscription-guardian/tips' },
        { icon: '💬', title: 'Feedback & Support', desc: 'Questions? We\'re here to help.', href: '/proyectos/subscription-guardian/feedback' },
      ],
    },
    tips: {
      eyebrow: 'Subscription Tips',
      title: 'Master your',
      titleSerif: 'spending',
      subtitle: 'Practical strategies to reduce subscription fatigue without sacrificing what matters.',
      items: [
        { icon: '🔍', title: 'Audit every 3 months', desc: 'Open Subscription Guardian and review your full list. Ask yourself: "Did I use this in the last 90 days?". If the answer is no, cancel.' },
        { icon: '🏷️', title: 'Use family plans', desc: 'Netflix, Spotify, and Disney+ all offer sharing plans. Split the cost with family or friends and save up to 50%.' },
        { icon: '📅', title: 'Seasonalize', desc: 'Only use Disney+ when a new series drops? Cancel between seasons. Subscribe, binge, cancel. No penalty.' },
        { icon: '🔔', title: 'Never ignore an alert', desc: 'T-48h notifications exist for a reason. Tap, evaluate, and decide in the moment. After that, you forget and get charged.' },
        { icon: '📊', title: 'Look at annual, not monthly', desc: '$15/month sounds small. But it\'s $180/year. The Burn Rate Dashboard shows the real annual impact so you decide with perspective.' },
        { icon: '🆓', title: 'Try free trials first', desc: 'Many services offer free trials. Use the trial, evaluate if you actually need it, then subscribe. Subscription Guardian alerts you before the trial ends.' },
      ],
      nextTitle: 'Keep going',
      nextCards: [
        { icon: '📖', title: 'Quick Start Guide', desc: 'Set up your first subscription in under 2 minutes.', href: '/proyectos/subscription-guardian/guide' },
        { icon: '💬', title: 'Feedback & Support', desc: 'Have a question? We\'re here to help.', href: '/proyectos/subscription-guardian/feedback' },
      ],
    },
    feedback: {
      eyebrow: 'Feedback & Support',
      title: 'We\'re here to',
      titleSerif: 'help',
      subtitle: 'Bug? Feature request? Just want to say hi? Reach out — we read everything and reply fast.',
      options: [
        { icon: '✉️', title: 'Email Support', desc: 'For bugs, suggestions, or any questions — we read every email.', link: 'mailto:hola@creapolis.dev?subject=Subscription%20Guardian%20-%20Support', linkText: 'hola@creapolis.dev' },
        { icon: '𝕏', title: 'X (Twitter)', desc: 'Reach out publicly or via DM. We\'re active and responsive.', link: 'https://x.com/creapolisdev', linkText: '@creapolisdev' },
      ],
      faqTitle: 'Common Questions',
      faqItems: [
        { q: 'Is it a one-time purchase or subscription?', a: 'Subscription Guardian is a one-time purchase of $4.99 USD. No subscription, no recurring payments, no surprises. Once you buy it, it\'s yours forever.' },
        { q: 'Is my data safe?', a: 'Absolutely. Subscription Guardian has no external servers. Your data is stored locally on your device and syncs via iCloud using Apple\'s CloudKit. We never see your data.' },
        { q: 'Do I need to create an account?', a: 'No. No login, no registration, no account. Open the app and you\'re done. If you want sync across devices, it happens automatically via your iCloud.' },
        { q: 'Can I use FaceID to protect the app?', a: 'Yes. Enable FaceID or TouchID lock from the app\'s settings. That way no one else sees your subscriptions if they borrow your phone.' },
        { q: 'How do I request a refund?', a: 'Refunds are handled directly by Apple. Visit reportaproblem.apple.com, sign in with your Apple ID, find your Subscription Guardian purchase, and select "Request a Refund".' },
        { q: 'Does it work on iPad and Mac?', a: 'Yes. Subscription Guardian is Universal — it works on iPhone, iPad, and Mac (Apple Silicon and Intel). One purchase for all your devices.' },
      ],
    },
  },
  pt: {
    nav: { features: 'Funções', guide: 'Guia', tips: 'Dicas', support: 'Suporte' },
    cta: 'Baixar',
    guide: {
      eyebrow: 'Guia rápido',
      title: 'Bem-vindo ao',
      titleSerif: 'Subscription Guardian',
      subtitle: 'Comece a controlar suas assinaturas em menos de 2 minutos. Assim configura:',
      steps: [
        { num: '01', title: 'Adicione sua primeira assinatura', desc: 'Toque no botão + e escolha um preset popular (Netflix, Spotify, Disney+) ou crie um customizado. Insira o valor, a frequência e a data da próxima cobrança.' },
        { num: '02', title: 'Configure os alertas', desc: 'O Subscription Guardian te avisa T-48h e T-24h antes de cada cobrança. Ative as notificações críticas para valores acima de $50 USD.' },
        { num: '03', title: 'Veja seu Burn Rate', desc: 'Abra o Dashboard e veja quanto se "queima" por mês e por ano. Gráficos de rosca mostram o gasto por categoria em um olhar.' },
        { num: '04', title: 'Personalize seus widgets', desc: 'Adicione o widget à Tela de Bloqueio ou Home Screen para ver a próxima cobrança sem abrir o app. Atualização em tempo real.' },
      ],
      tipTitle: 'Pro tip: Ghost Detector',
      tipText: 'Em breve: o Ghost Detector vai identificar assinaturas que você não usa há mais de 30 dias e sugerir quais cancelar. Tudo com ML local — sem enviar dados para ninguém.',
      nextTitle: 'E agora?',
      nextCards: [
        { icon: '💡', title: 'Dicas de assinaturas', desc: 'Estratégias para reduzir seu gasto mensal sem perder o que você valoriza.', href: '/projetos/subscription-guardian/tips' },
        { icon: '💬', title: 'Feedback e suporte', desc: 'Perguntas? Estamos aqui para ajudar.', href: '/projetos/subscription-guardian/feedback' },
      ],
    },
    tips: {
      eyebrow: 'Dicas de assinaturas',
      title: 'Domine seus',
      titleSerif: 'gastos',
      subtitle: 'Estratégias práticas para reduzir a fadiga de assinaturas sem sacrificar o que importa.',
      items: [
        { icon: '🔍', title: 'Audite a cada 3 meses', desc: 'Abra o Subscription Guardian e revise sua lista completa. Pergunte: "Usei isso nos últimos 90 dias?". Se a resposta é não, cancele.' },
        { icon: '🏷️', title: 'Use planos familiares', desc: 'Netflix, Spotify e Disney+ oferecem planos para compartilhar. Divida o custo com família ou amigos e economize até 50%.' },
        { icon: '📅', title: 'Sazonalize', desc: 'Só usa Disney+ quando sai uma série nova? Cancele entre temporadas. Assine, assista, cancele. Sem penalidade.' },
        { icon: '🔔', title: 'Nunca ignore um alerta', desc: 'As notificações T-48h existem por um motivo. Toque, avalie e decida no momento. Depois esquece e te cobram.' },
        { icon: '📊', title: 'Olhe o anual, não o mensal', desc: '$15/mês parece pouco. Mas são $180/ano. O Burn Rate Dashboard mostra o impacto real anual para você decidir com perspectiva.' },
        { icon: '🆓', title: 'Experimente a versão grátis primeiro', desc: 'Muitos serviços oferecem free trial. Use o trial, avalie se realmente precisa, e só então assine. O Subscription Guardian te avisa antes do trial acabar.' },
      ],
      nextTitle: 'Continue aprendendo',
      nextCards: [
        { icon: '📖', title: 'Guia rápido', desc: 'Configure sua primeira assinatura em menos de 2 minutos.', href: '/projetos/subscription-guardian/guide' },
        { icon: '💬', title: 'Feedback e suporte', desc: 'Tem uma pergunta? Ajudamos.', href: '/projetos/subscription-guardian/feedback' },
      ],
    },
    feedback: {
      eyebrow: 'Feedback e suporte',
      title: 'Estamos aqui para',
      titleSerif: 'ajudar',
      subtitle: 'Bug? Sugestão? Só quer dizer olá? Escreva — lemos tudo e respondemos rápido.',
      options: [
        { icon: '✉️', title: 'Suporte por email', desc: 'Para bugs, sugestões ou qualquer dúvida — lemos cada email.', link: 'mailto:hola@creapolis.dev?subject=Subscription%20Guardian%20-%20Suporte', linkText: 'hola@creapolis.dev' },
        { icon: '𝕏', title: 'X (Twitter)', desc: 'Escreva público ou por DM. Estamos ativos e respondemos.', link: 'https://x.com/creapolisdev', linkText: '@creapolisdev' },
      ],
      faqTitle: 'Perguntas frequentes',
      faqItems: [
        { q: 'É compra única ou assinatura?', a: 'O Subscription Guardian é compra única de $4.99 USD. Sem assinatura, sem pagamentos recorrentes, sem surpresas. Uma vez que comprar, é seu para sempre.' },
        { q: 'Meus dados estão seguros?', a: 'Totalmente. O Subscription Guardian não tem servidores externos. Seus dados ficam salvos localmente no dispositivo e sincronizam via iCloud com CloudKit da Apple. Nunca vemos seus dados.' },
        { q: 'Preciso criar uma conta?', a: 'Não. Sem login, sem registro, sem conta. Abra o app e pronto. Se quiser sync entre dispositivos, acontece automático pelo seu iCloud.' },
        { q: 'Posso usar FaceID para proteger o app?', a: 'Sim. Ative o bloqueio com FaceID ou TouchID nas configurações do app. Assim ninguém mais vê suas assinaturas se emprestarem seu telefone.' },
        { q: 'Como peço reembolso?', a: 'Os reembolsos são tratados diretamente pela Apple. Visite reportaproblem.apple.com, entre com seu Apple ID, encontre a compra do Subscription Guardian e selecione "Solicitar reembolso".' },
        { q: 'Funciona no iPad e Mac?', a: 'Sim. O Subscription Guardian é Universal — funciona no iPhone, iPad e Mac (Apple Silicon e Intel). Uma só compra para todos os seus dispositivos.' },
      ],
    },
  },
};

export function getSGSupportData(lang: Lang) {
  return data[lang];
}
