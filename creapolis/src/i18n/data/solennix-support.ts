import type { Lang } from '../ui';

export interface GuideStep { num: string; title: string; desc: string }
export interface Tip { icon: string; title: string; desc: string }
export interface SupportOption { icon: string; title: string; desc: string; link: string; linkText: string }
export interface FaqItem { q: string; a: string }
export interface NextCard { icon: string; title: string; desc: string; href: string }

interface SolennixSupportData {
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

const data: Record<Lang, SolennixSupportData> = {
  es: {
    nav: { features: 'Funciones', guide: 'Guía', tips: 'Tips', support: 'Soporte' },
    cta: 'Descargar',
    guide: {
      eyebrow: 'Guía rápida',
      title: 'Empezá a organizar',
      titleSerif: 'con Solennix',
      subtitle: 'De la descarga al primer evento en menos de 10 minutos. Así se arranca:',
      steps: [
        { num: '01', title: 'Creá tu cuenta', desc: 'Descargá Solennix del App Store o Google Play. Abrí la app y completá tu perfil: nombre, tipo de eventos que organizás y zona de trabajo. Así las cotizaciones se ajustan a tu realidad.' },
        { num: '02', title: 'Cargá tu primer cliente', desc: 'Tocá "Nuevo cliente" y completá nombre, teléfono, email y tipo de evento. Solennix lo asocia automáticamente al evento cuando lo creés. Todo queda vinculado desde el minuto uno.' },
        { num: '03', title: 'Armá la cotización', desc: 'Desde el perfil del cliente, tocá "Nueva cotización". Agregá ítems (alquiler, catering, decoración, DJ), cantidades, precios unitarios y descuentos. El total se calcula solo. Un toque y se convierte en contrato.' },
        { num: '04', title: 'Gestioná el inventario', desc: 'Antes del evento, cargá los equipos que vas a usar: luces, manteles, tarima, sonido. Solennix marca qué está disponible y qué ya está asignado a otro evento. Sin duplicados, sin sorpresas.' },
      ],
      tipTitle: 'Pro tip: Dashboard',
      tipText: 'El Dashboard te muestra en un vistazo los ingresos del mes, cuántos eventos tenés confirmados y cuántos clientes activos. Entrá al inicio de la app cada lunes para planificar la semana con datos reales, no con estimaciones.',
      nextTitle: '¿Y ahora?',
      nextCards: [
        { icon: '💡', title: 'Tips para organizadores', desc: 'Estrategias para cobrar más, organizar mejor y no quemarte en temporada alta.', href: '/solennix/tips' },
        { icon: '💬', title: 'Feedback y soporte', desc: '¿Preguntas? Acá estamos para ayudarte.', href: '/solennix/feedback' },
      ],
    },
    tips: {
      eyebrow: 'Tips para organizadores',
      title: 'Organizá como',
      titleSerif: 'pro',
      subtitle: 'Estrategias prácticas para cobrar mejor, controlar costos y no quemarte en temporada alta.',
      items: [
        { icon: '📋', title: 'Cotizá antes de hablar precio', desc: 'El cliente pregunta "¿cuánto sale?" y vos respondés con número. Mal. Mandá la cotización por Solennix DESPUÉS de la primera llamada. Así mostrás profesionalismo y el PDF habla por vos.' },
        { icon: '📦', title: 'Inventariá todo antes de temporada', desc: 'Antes de que arranque la temporada alta, hacé un inventario completo en Solennix. Así sabés exactamente qué tenés y qué necesitás alquilar o comprar. Ahorrás compras duplicadas.' },
        { icon: '📊', title: 'Revisá el Dashboard los lunes', desc: 'Abrí el Dashboard cada lunes. Mirá los ingresos del mes vs. el mes anterior. Si un tipo de evento genera más plata, enfocate ahí. Los datos no mienten — tu intuición sí.' },
        { icon: '💰', title: 'Separá tu ganancia desde la cotización', desc: 'Cuando armes la cotización, incluí una línea "Servicio de organización" que sea TU ganancia. No la escondas en el markup de los proveedores. Es tu trabajo, cobrálo con claridad.' },
        { icon: '🔄', title: 'Convertí cotizaciones en contratos ya', desc: 'La cotización aprobada NO es un contrato. En Solennix, un toque convierte la cotización en contrato con fecha, firmas y condiciones. Cerrá en el momento, no después.' },
        { icon: '⏰', title: 'Automatizá lo repetitivo', desc: '¿Siempre cotizás lo mismo para XV? Usá plantillas de cotización en Solennix. Cambiá el nombre del cliente, ajustá dos números y enviá. Menos tiempo en Excel, más tiempo vendiendo.' },
      ],
      nextTitle: 'Seguí aprendiendo',
      nextCards: [
        { icon: '📖', title: 'Guía rápida', desc: 'Configurá tu primer evento en menos de 10 minutos.', href: '/solennix/guide' },
        { icon: '💬', title: 'Feedback y soporte', desc: '¿Tenés una pregunta? Te ayudamos.', href: '/solennix/feedback' },
      ],
    },
    feedback: {
      eyebrow: 'Feedback y soporte',
      title: 'Acá estamos para',
      titleSerif: 'ayudarte',
      subtitle: '¿Bug? ¿Sugerencia? ¿Sólo querés decir hola? Escribinos — leemos todo y contestamos rápido.',
      options: [
        { icon: '✉️', title: 'Soporte por email', desc: 'Para bugs, sugerencias o cualquier consulta — leemos cada email.', link: 'mailto:hola@creapolis.dev?subject=Solennix%20-%20Soporte', linkText: 'hola@creapolis.dev' },
        { icon: '𝕏', title: 'X (Twitter)', desc: 'Escribinos público o por DM. Estamos activos y contestamos.', link: 'https://x.com/creapolisdev', linkText: '@creapolisdev' },
      ],
      faqTitle: 'Preguntas frecuentes',
      faqItems: [
        { q: '¿Es gratis Solennix?', a: 'Solennix tiene un plan Gratis que incluye funciones esenciales y hasta 3 eventos. El plan Pro ($149/mes) desbloquea cotizaciones ilimitadas, inventario avanzado, exportar PDF y más. Sin contratos anuales.' },
        { q: '¿En qué plataformas está disponible?', a: 'Solennix funciona en iPhone (App Store), Android (Google Play) y Web (solennix.com). Tu información se sincroniza entre todos tus dispositivos automáticamente.' },
        { q: '¿Puedo compartir cotizaciones con el cliente?', a: 'Sí. Generás la cotización en la app y la compartís por WhatsApp, email o link directo. El cliente la ve en formato profesional sin necesidad de descargar nada.' },
        { q: '¿Mis datos están seguros?', a: 'Tus datos se sincronizan de forma encriptada y están protegidos con autenticación segura. No compartimos tu información con terceros. Jamás.' },
        { q: '¿Puedo cancelar el plan Pro cuando quiera?', a: 'Sí, cancelás desde la app en un toque. Sin letra chica, sin penalidades, sin preguntas. Si cancelás a mitad de mes, seguís teniendo acceso hasta que termine el período.' },
        { q: '¿Solennix sirve para cualquier tipo de evento?', a: 'Diseñado para bodas, XV, corporativos, sociales y más. Si organizás eventos, Solennix te sirve. Las plantillas de cotización se adaptan al tipo de evento que elijas.' },
      ],
    },
  },
  en: {
    nav: { features: 'Features', guide: 'Guide', tips: 'Tips', support: 'Support' },
    cta: 'Download',
    guide: {
      eyebrow: 'Quick Start',
      title: 'Start organizing',
      titleSerif: 'with Solennix',
      subtitle: 'From download to your first event in under 10 minutes. Here\'s how to get going:',
      steps: [
        { num: '01', title: 'Create your account', desc: 'Download Solennix from the App Store or Google Play. Open the app and fill in your profile: name, event types you organize, and work area. This way quotes adapt to your reality.' },
        { num: '02', title: 'Add your first client', desc: 'Tap "New client" and fill in name, phone, email, and event type. Solennix auto-links them to the event when you create it. Everything stays connected from minute one.' },
        { num: '03', title: 'Build the quote', desc: 'From the client profile, tap "New quote". Add items (rental, catering, decor, DJ), quantities, unit prices, and discounts. The total calculates itself. One tap and it becomes a contract.' },
        { num: '04', title: 'Manage inventory', desc: 'Before the event, load the equipment you\'ll use: lights, tablecloths, stage, sound. Solennix marks what\'s available and what\'s already assigned to another event. No duplicates, no surprises.' },
      ],
      tipTitle: 'Pro tip: Dashboard',
      tipText: 'The Dashboard shows you at a glance: monthly revenue, confirmed events, and active clients. Open the app\'s home screen every Monday to plan the week with real data, not guesswork.',
      nextTitle: 'What\'s next?',
      nextCards: [
        { icon: '💡', title: 'Organizer Tips', desc: 'Strategies to charge more, organize better, and avoid burning out in high season.', href: '/solennix/tips' },
        { icon: '💬', title: 'Feedback & Support', desc: 'Questions? We\'re here to help.', href: '/solennix/feedback' },
      ],
    },
    tips: {
      eyebrow: 'Organizer Tips',
      title: 'Organize like a',
      titleSerif: 'pro',
      subtitle: 'Practical strategies to charge better, control costs, and avoid burning out in high season.',
      items: [
        { icon: '📋', title: 'Quote before discussing price', desc: 'The client asks "how much?" and you blurt out a number. Bad. Send the quote through Solennix AFTER the first call. Show professionalism — let the PDF speak for you.' },
        { icon: '📦', title: 'Inventory everything before season', desc: 'Before high season kicks in, do a full inventory in Solennix. Know exactly what you have and what you need to rent or buy. Save on duplicate purchases.' },
        { icon: '📊', title: 'Check the Dashboard every Monday', desc: 'Open the Dashboard every Monday. Look at this month\'s revenue vs. last month. If one event type generates more revenue, focus there. Data doesn\'t lie — your gut does.' },
        { icon: '💰', title: 'Separate your profit in the quote', desc: 'When building the quote, include an "Organizer service" line that is YOUR profit. Don\'t hide it in vendor markup. It\'s your work — charge it clearly.' },
        { icon: '🔄', title: 'Convert quotes to contracts now', desc: 'An approved quote is NOT a contract. In Solennix, one tap converts the quote to a contract with date, signatures, and terms. Close the deal in the moment, not later.' },
        { icon: '⏰', title: 'Automate the repetitive stuff', desc: 'Always quoting the same thing for XV parties? Use quote templates in Solennix. Change the client name, tweak two numbers, and send. Less time in Excel, more time selling.' },
      ],
      nextTitle: 'Keep going',
      nextCards: [
        { icon: '📖', title: 'Quick Start Guide', desc: 'Set up your first event in under 10 minutes.', href: '/solennix/guide' },
        { icon: '💬', title: 'Feedback & Support', desc: 'Have a question? We\'re here to help.', href: '/solennix/feedback' },
      ],
    },
    feedback: {
      eyebrow: 'Feedback & Support',
      title: 'We\'re here to',
      titleSerif: 'help',
      subtitle: 'Bug? Feature request? Just want to say hi? Reach out — we read everything and reply fast.',
      options: [
        { icon: '✉️', title: 'Email Support', desc: 'For bugs, suggestions, or any questions — we read every email.', link: 'mailto:hola@creapolis.dev?subject=Solennix%20-%20Support', linkText: 'hola@creapolis.dev' },
        { icon: '𝕏', title: 'X (Twitter)', desc: 'Reach out publicly or via DM. We\'re active and responsive.', link: 'https://x.com/creapolisdev', linkText: '@creapolisdev' },
      ],
      faqTitle: 'Common Questions',
      faqItems: [
        { q: 'Is Solennix free?', a: 'Solennix has a Free plan that includes essential features and up to 3 events. The Pro plan ($149/month) unlocks unlimited quotes, advanced inventory, PDF export, and more. No annual contracts.' },
        { q: 'What platforms is it available on?', a: 'Solennix works on iPhone (App Store), Android (Google Play), and Web (solennix.com). Your data syncs across all your devices automatically.' },
        { q: 'Can I share quotes with the client?', a: 'Yes. Generate the quote in the app and share it via WhatsApp, email, or direct link. The client sees it in a professional format without downloading anything.' },
        { q: 'Is my data safe?', a: 'Your data syncs with encryption and is protected with secure authentication. We never share your information with third parties. Period.' },
        { q: 'Can I cancel Pro whenever I want?', a: 'Yes, cancel from the app in one tap. No fine print, no penalties, no questions. If you cancel mid-month, you keep access until the period ends.' },
        { q: 'Does Solennix work for any event type?', a: 'Designed for weddings, XV parties, corporate events, social gatherings, and more. If you organize events, Solennix works for you. Quote templates adapt to the event type you choose.' },
      ],
    },
  },
  pt: {
    nav: { features: 'Funções', guide: 'Guia', tips: 'Dicas', support: 'Suporte' },
    cta: 'Baixar',
    guide: {
      eyebrow: 'Guia rápido',
      title: 'Comece a organizar',
      titleSerif: 'com Solennix',
      subtitle: 'Do download ao primeiro evento em menos de 10 minutos. Veja como começar:',
      steps: [
        { num: '01', title: 'Crie sua conta', desc: 'Baixe o Solennix da App Store ou Google Play. Abra o app e preencha seu perfil: nome, tipo de eventos que organiza e área de trabalho. Assim os orçamentos se ajustam à sua realidade.' },
        { num: '02', title: 'Cadastre seu primeiro cliente', desc: 'Toque em "Novo cliente" e preencha nome, telefone, email e tipo de evento. O Solennix vincula automaticamente ao evento quando você criá-lo. Tudo conectado desde o primeiro minuto.' },
        { num: '03', title: 'Monte o orçamento', desc: 'No perfil do cliente, toque em "Novo orçamento". Adicione itens (aluguel, catering, decoração, DJ), quantidades, preços unitários e descontos. O total calcula sozinho. Um toque e vira contrato.' },
        { num: '04', title: 'Gerencie o inventário', desc: 'Antes do evento, carregue os equipamentos que vai usar: luzes, toalhas, palco, som. O Solennix marca o que está disponível e o que já está alocado para outro evento. Sem duplicatas, sem surpresas.' },
      ],
      tipTitle: 'Pro tip: Dashboard',
      tipText: 'O Dashboard mostra em um olhar: receita mensal, eventos confirmados e clientes ativos. Abra a tela inicial do app toda segunda-feira para planejar a semana com dados reais, não com estimativas.',
      nextTitle: 'E agora?',
      nextCards: [
        { icon: '💡', title: 'Dicas para organizadores', desc: 'Estratégias para cobrar mais, organizar melhor e não se queimar na alta temporada.', href: '/solennix/tips' },
        { icon: '💬', title: 'Feedback e suporte', desc: 'Perguntas? Estamos aqui para ajudar.', href: '/solennix/feedback' },
      ],
    },
    tips: {
      eyebrow: 'Dicas para organizadores',
      title: 'Organize como um',
      titleSerif: 'profissional',
      subtitle: 'Estratégias práticas para cobrar melhor, controlar custos e não se queimar na alta temporada.',
      items: [
        { icon: '📋', title: 'Orçumente antes de falar preço', desc: 'O cliente pergunta "quanto custa?" e você solta um número. Errado. Envie o orçamento pelo Solennix DEPOIS da primeira ligação. Mostre profissionalismo — deixe o PDF falar por você.' },
        { icon: '📦', title: 'Inventarie tudo antes da temporada', desc: 'Antes da alta temporada começar, faça um inventário completo no Solennix. Saiba exatamente o que tem e o que precisa alugar ou comprar. Economize em compras duplicadas.' },
        { icon: '📊', title: 'Revise o Dashboard toda segunda', desc: 'Abra o Dashboard toda segunda-feira. Veja a receita do mês vs. mês anterior. Se um tipo de evento gera mais receita, foque ali. Dados não mentem — sua intuição sim.' },
        { icon: '💰', title: 'Separe seu lucro no orçamento', desc: 'Quando montar o orçamento, inclua uma linha "Serviço de organização" que é o SEU lucro. Não esconda no markup dos fornecedores. É seu trabalho — cobre com clareza.' },
        { icon: '🔄', title: 'Converta orçamentos em contratos já', desc: 'Orçamento aprovado NÃO é contrato. No Solennix, um toque converte o orçamento em contrato com data, assinaturas e condições. Feche na hora, não depois.' },
        { icon: '⏰', title: 'Automatize o repetitivo', desc: 'Sempre orçamenta a mesma coisa para XV? Use templates de orçamento no Solennix. Troque o nome do cliente, ajuste dois números e envie. Menos tempo no Excel, mais tempo vendendo.' },
      ],
      nextTitle: 'Continue aprendendo',
      nextCards: [
        { icon: '📖', title: 'Guia rápido', desc: 'Configure seu primeiro evento em menos de 10 minutos.', href: '/solennix/guide' },
        { icon: '💬', title: 'Feedback e suporte', desc: 'Tem uma pergunta? Ajudamos.', href: '/solennix/feedback' },
      ],
    },
    feedback: {
      eyebrow: 'Feedback e suporte',
      title: 'Estamos aqui para',
      titleSerif: 'ajudar',
      subtitle: 'Bug? Sugestão? Só quer dizer olá? Escreva — lemos tudo e respondemos rápido.',
      options: [
        { icon: '✉️', title: 'Suporte por email', desc: 'Para bugs, sugestões ou qualquer dúvida — lemos cada email.', link: 'mailto:hola@creapolis.dev?subject=Solennix%20-%20Suporte', linkText: 'hola@creapolis.dev' },
        { icon: '𝕏', title: 'X (Twitter)', desc: 'Escreva público ou por DM. Estamos ativos e respondemos.', link: 'https://x.com/creapolisdev', linkText: '@creapolisdev' },
      ],
      faqTitle: 'Perguntas frequentes',
      faqItems: [
        { q: 'O Solennix é grátis?', a: 'O Solennix tem um plano Grátis que inclui funções essenciais e até 3 eventos. O plano Pro ($149/mês) desbloqueia orçamentos ilimitados, inventário avançado, exportar PDF e mais. Sem contratos anuais.' },
        { q: 'Em quais plataformas está disponível?', a: 'O Solennix funciona no iPhone (App Store), Android (Google Play) e Web (solennix.com). Suas informações sincronizam entre todos os seus dispositivos automaticamente.' },
        { q: 'Posso compartilhar orçamentos com o cliente?', a: 'Sim. Você gera o orçamento no app e compartilha por WhatsApp, email ou link direto. O cliente vê em formato profissional sem precisar baixar nada.' },
        { q: 'Meus dados estão seguros?', a: 'Seus dados sincronizam de forma criptografada e estão protegidos com autenticação segura. Não compartilhamos suas informações com terceiros. Nunca.' },
        { q: 'Posso cancelar o plano Pro quando quiser?', a: 'Sim, cancele pelo app em um toque. Sem letra pequena, sem penalidades, sem perguntas. Se cancelar no meio do mês, continua com acesso até o período terminar.' },
        { q: 'O Solennix serve para qualquer tipo de evento?', a: 'Projetado para casamentos, XV, corporativos, sociais e mais. Se você organiza eventos, o Solennix serve para você. Os templates de orçamento se adaptam ao tipo de evento que escolher.' },
      ],
    },
  },
};

export function getSolennixSupportData(lang: Lang) {
  return data[lang];
}
