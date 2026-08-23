import type { Lang } from '../ui';

export interface SolennixFeature {
  icon: string;
  letter: string;
  title: string;
  desc: string;
}
export interface SolennixPricingPlan {
  tag: string;
  plan: string;
  price: string;
  priceNoSuffix?: boolean;
  features: string[];
  btn: string;
}
export interface SolennixPhoneItem {
  color: string;
  name: string;
  date: string;
}

const features: Record<Lang, SolennixFeature[]> = {
  es: [
    {
      icon: '📅',
      letter: 'E',
      title: 'Gestión de Eventos',
      desc: 'Calendario con todos tus eventos, detalles completos, checklist de tareas y estados claros.',
    },
    {
      icon: '👥',
      letter: 'C',
      title: 'CRM de Clientes',
      desc: 'Base de datos completa con historial, notas, contactos y eventos asociados.',
    },
    {
      icon: '💰',
      letter: '$',
      title: 'Cotizaciones y Contratos',
      desc: 'Genera cotizaciones profesionales en segundos y conviértelas en contratos.',
    },
    {
      icon: '📦',
      letter: 'I',
      title: 'Inventario',
      desc: 'Control de equipos reutilizables e insumos con tracking de stock en tiempo real.',
    },
    {
      icon: '📊',
      letter: 'D',
      title: 'Dashboard',
      desc: 'KPIs clave: ingresos, eventos del mes, clientes activos y visión clara del negocio.',
    },
    {
      icon: '🎨',
      letter: 'P',
      title: 'Diseño Premium',
      desc: 'Interfaz cálida y profesional. Light y Dark mode incluido.',
    },
  ],
  en: [
    {
      icon: '📅',
      letter: 'E',
      title: 'Event Management',
      desc: 'Calendar with all your events, full details, task checklists, and clear states.',
    },
    {
      icon: '👥',
      letter: 'C',
      title: 'Client CRM',
      desc: 'Complete database with history, notes, contacts, and linked events.',
    },
    {
      icon: '💰',
      letter: '$',
      title: 'Quotes & Contracts',
      desc: 'Generate professional quotes in seconds and turn them into contracts.',
    },
    {
      icon: '📦',
      letter: 'I',
      title: 'Inventory',
      desc: 'Track reusable gear and supplies with real-time stock control.',
    },
    {
      icon: '📊',
      letter: 'D',
      title: 'Dashboard',
      desc: 'Key KPIs: revenue, events this month, active clients, and a clear business view.',
    },
    {
      icon: '🎨',
      letter: 'P',
      title: 'Premium Design',
      desc: 'Warm, professional interface. Light and Dark mode included.',
    },
  ],
  pt: [
    {
      icon: '📅',
      letter: 'E',
      title: 'Gestão de Eventos',
      desc: 'Calendário com todos os seus eventos, detalhes completos, checklist de tarefas e estados claros.',
    },
    {
      icon: '👥',
      letter: 'C',
      title: 'CRM de Clientes',
      desc: 'Base de dados completa com histórico, notas, contatos e eventos associados.',
    },
    {
      icon: '💰',
      letter: '$',
      title: 'Orçamentos e Contratos',
      desc: 'Gere orçamentos profissionais em segundos e converta em contratos.',
    },
    {
      icon: '📦',
      letter: 'I',
      title: 'Inventário',
      desc: 'Controle de equipamentos reutilizáveis e insumos com tracking de stock em tempo real.',
    },
    {
      icon: '📊',
      letter: 'D',
      title: 'Dashboard',
      desc: 'KPIs chave: receita, eventos do mês, clientes ativos e visão clara do negócio.',
    },
    {
      icon: '🎨',
      letter: 'P',
      title: 'Design Premium',
      desc: 'Interface calorosa e profissional. Light e Dark mode incluídos.',
    },
  ],
};

const pricing: Record<Lang, SolennixPricingPlan[]> = {
  es: [
    {
      tag: '01 / Gratis',
      plan: 'Gratis',
      price: '$0',
      priceNoSuffix: true,
      features: [
        'Funciones esenciales',
        'Gestión básica de eventos',
        'Hasta 3 eventos',
      ],
      btn: 'Descargar gratis',
    },
    {
      tag: '02 / Pro',
      plan: 'Pro',
      price: '$149 MXN',
      features: [
        'Cotizaciones ilimitadas',
        'Inventario avanzado',
        'Eventos ilimitados',
        'Exportar PDF',
      ],
      btn: 'Comenzar prueba',
    },
    {
      tag: '03 / Business',
      plan: 'Business',
      price: 'Custom',
      priceNoSuffix: true,
      features: [
        'Equipo multiusuario',
        'Reportes avanzados',
        'API access',
        'Soporte prioritario',
      ],
      btn: 'Contactar ventas',
    },
  ],
  en: [
    {
      tag: '01 / Free',
      plan: 'Free',
      price: '$0',
      priceNoSuffix: true,
      features: [
        'Essential features',
        'Basic event management',
        'Up to 3 events',
      ],
      btn: 'Download free',
    },
    {
      tag: '02 / Pro',
      plan: 'Pro',
      price: '$149 MXN',
      features: [
        'Unlimited quotes',
        'Advanced inventory',
        'Unlimited events',
        'Export PDF',
      ],
      btn: 'Start trial',
    },
    {
      tag: '03 / Business',
      plan: 'Business',
      price: 'Custom',
      priceNoSuffix: true,
      features: [
        'Multi-user team',
        'Advanced reports',
        'API access',
        'Priority support',
      ],
      btn: 'Contact sales',
    },
  ],
  pt: [
    {
      tag: '01 / Grátis',
      plan: 'Grátis',
      price: '$0',
      priceNoSuffix: true,
      features: [
        'Funções essenciais',
        'Gestão básica de eventos',
        'Até 3 eventos',
      ],
      btn: 'Baixar grátis',
    },
    {
      tag: '02 / Pro',
      plan: 'Pro',
      price: '$149 MXN',
      features: [
        'Orçamentos ilimitados',
        'Inventário avançado',
        'Eventos ilimitados',
        'Exportar PDF',
      ],
      btn: 'Iniciar teste',
    },
    {
      tag: '03 / Business',
      plan: 'Business',
      price: 'Custom',
      priceNoSuffix: true,
      features: [
        'Equipe multiusuário',
        'Relatórios avançados',
        'API access',
        'Suporte prioritário',
      ],
      btn: 'Contatar vendas',
    },
  ],
};

const phone: Record<
  Lang,
  {
    headTitle: string;
    headSub: string;
    stats: { v: string; l: string }[];
    label: string;
    items: SolennixPhoneItem[];
  }
> = {
  es: {
    headTitle: 'Marzo',
    headSub: '3 eventos activos',
    stats: [
      { v: '12', l: 'Eventos' },
      { v: '$45k', l: 'Ingreso' },
      { v: '8', l: 'Clientes' },
    ],
    label: 'Próximos',
    items: [
      { color: 'var(--coral)', name: 'Boda García', date: '15 Feb' },
      { color: 'var(--lime)', name: 'XV de María', date: '22 Feb' },
      { color: 'var(--sky)', name: 'Corporativo Tech', date: '1 Mar' },
    ],
  },
  en: {
    headTitle: 'March',
    headSub: '3 active events',
    stats: [
      { v: '12', l: 'Events' },
      { v: '$45k', l: 'Revenue' },
      { v: '8', l: 'Clients' },
    ],
    label: 'Upcoming',
    items: [
      { color: 'var(--coral)', name: 'García Wedding', date: 'Feb 15' },
      { color: 'var(--lime)', name: "María's XV", date: 'Feb 22' },
      { color: 'var(--sky)', name: 'Tech Corporate', date: 'Mar 1' },
    ],
  },
  pt: {
    headTitle: 'Março',
    headSub: '3 eventos ativos',
    stats: [
      { v: '12', l: 'Eventos' },
      { v: '$45k', l: 'Receita' },
      { v: '8', l: 'Clientes' },
    ],
    label: 'Próximos',
    items: [
      { color: 'var(--coral)', name: 'Casamento García', date: '15 Fev' },
      { color: 'var(--lime)', name: 'XV da María', date: '22 Fev' },
      { color: 'var(--sky)', name: 'Corporativo Tech', date: '1 Mar' },
    ],
  },
};

export function getSolennixData(lang: Lang) {
  return {
    features: features[lang],
    pricing: pricing[lang],
    phone: phone[lang],
  };
}
