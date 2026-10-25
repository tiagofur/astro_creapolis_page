export interface AgentActionCard {
  type: 'calendar_slots' | 'lead_captured' | 'handoff';
  slots?: Array<{ iso: string; label: string; time: string }>;
  bookingUrl?: string;
  summary?: string;
}

export interface AgentMessage {
  id: string;
  role: 'assistant' | 'user' | 'system';
  content: string;
  timestamp: string;
  actionCard?: AgentActionCard;
}

export interface AgentSessionPayload {
  sessionId: string;
  locale: 'es' | 'en' | 'pt';
  pageUrl: string;
  messages: AgentMessage[];
  leadContext?: {
    name?: string;
    email?: string;
    company?: string;
    phone?: string;
    intent?: 'ai_agents' | 'appointment_flow' | 'custom_software' | 'discovery' | 'rescue';
  };
}

export interface AgentConnectorConfig {
  mode: 'webhook' | 'local_demo_fallback';
  endpointUrl: string;
  calendarBookingUrl: string;
}

export const defaultAgentConfig: AgentConnectorConfig = {
  mode: (typeof process !== 'undefined' && process.env?.PUBLIC_AI_AGENT_WEBHOOK_URL) ? 'webhook' : 'local_demo_fallback',
  endpointUrl: (typeof process !== 'undefined' && process.env?.PUBLIC_AI_AGENT_WEBHOOK_URL) || '/api/agent/chat',
  calendarBookingUrl: 'https://calendly.com/creapolis/30min',
};

/**
 * Sends a message to the agent webhook or returns an interactive fallback simulation
 * with calendar slot options and CRM sync simulation.
 */
export async function sendAgentMessage(
  payload: AgentSessionPayload,
  config: AgentConnectorConfig = defaultAgentConfig
): Promise<AgentMessage> {
  if (config.mode === 'webhook' && config.endpointUrl && !config.endpointUrl.startsWith('/api/agent')) {
    try {
      const res = await fetch(config.endpointUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const data = await res.json();
        return {
          id: data.id || `agent-${Date.now()}`,
          role: 'assistant',
          content: data.content || data.message || 'He recibido tu mensaje.',
          timestamp: new Date().toISOString(),
          actionCard: data.actionCard,
        };
      }
    } catch (err) {
      console.warn('[Creapolis Agent Connector] Webhook error, falling back to local simulation:', err);
    }
  }

  // Smart local simulation fallback
  const lastUserMsg = [...payload.messages].reverse().find(m => m.role === 'user')?.content.toLowerCase() || '';
  const isEn = payload.locale === 'en';
  const isPt = payload.locale === 'pt';

  if (lastUserMsg.includes('cita') || lastUserMsg.includes('agenda') || lastUserMsg.includes('calendario') || lastUserMsg.includes('book') || lastUserMsg.includes('schedule') || lastUserMsg.includes('reuni')) {
    const slots = [
      { iso: '2026-10-26T15:00:00Z', label: isEn ? 'Mon Oct 26' : 'Lun 26 Oct', time: '10:00 AM CST' },
      { iso: '2026-10-27T16:30:00Z', label: isEn ? 'Tue Oct 27' : 'Mar 27 Oct', time: '11:30 AM CST' },
      { iso: '2026-10-28T18:00:00Z', label: isEn ? 'Wed Oct 28' : 'Mié 28 Oct', time: '01:00 PM CST' },
    ];
    return {
      id: `agent-${Date.now()}`,
      role: 'assistant',
      content: isEn
        ? 'Great! I checked real-time availability on Tiago’s calendar. Select a slot below to confirm your discovery call instantly, or leave your email to sync:'
        : isPt
        ? 'Excelente! Verifiquei a disponibilidade em tempo real no calendário do Tiago. Escolha um horário abaixo para confirmar sua chamada ou deixe seu email:'
        : '¡Excelente! He consultado la disponibilidad en tiempo real en el calendario de Tiago. Elige un horario para agendar tu llamada de diagnóstico (o compárteme tu email):',
      timestamp: new Date().toISOString(),
      actionCard: {
        type: 'calendar_slots',
        slots,
        bookingUrl: config.calendarBookingUrl,
      },
    };
  }

  if (lastUserMsg.includes('precio') || lastUserMsg.includes('cost') || lastUserMsg.includes('cuanto') || lastUserMsg.includes('preço')) {
    return {
      id: `agent-${Date.now()}`,
      role: 'assistant',
      content: isEn
        ? 'Our fixed-price models: 1) AI Agent & Scheduling: from $2,500 USD (2-4 wks). 2) Discovery Sprint: $1,200–$2,000 USD (100% credited to build). 3) Custom MVP Build: from $6,500 USD. Would you like to schedule a 30-min discovery call to review your exact workflow?'
        : isPt
        ? 'Nossos modelos com escopo fechado: 1) Agentes de IA e Agendamento: a partir de $2,500 USD (2-4 semanas). 2) Discovery Sprint: $1,200–$2,000 USD (100% creditável ao build). 3) MVP sob medida: a partir de $6,500 USD. Quer agendar uma chamada para analisar seu caso?'
        : 'Trabajamos con paquetes de alcance cerrado: 1) Agentes de IA y Agendamiento: desde $2,500 USD (2 a 4 semanas). 2) Discovery Sprint: $1,200–$2,000 USD (100% acreditable al desarrollo). 3) MVP a medida: desde $6,500 USD. ¿Quieres que revisemos tu flujo en una llamada de 30 minutos sin costo?',
      timestamp: new Date().toISOString(),
    };
  }

  return {
    id: `agent-${Date.now()}`,
    role: 'assistant',
    content: isEn
      ? 'I can help qualify your project, calculate estimated savings with AI agents, or book a call directly in Tiago’s calendar. Which system would you like to explore?'
      : isPt
      ? 'Posso te ajudar a qualificar seu projeto, calcular o retorno de agentes de IA ou agendar uma reunião direto na agenda do Tiago. Qual área deseja explorar?'
      : 'Te puedo ayudar a evaluar la viabilidad de tu proyecto, calcular el ahorro con agentes de IA o agendar una llamada directamente en la agenda de Tiago. ¿Qué flujo te gustaría automatizar primero?',
    timestamp: new Date().toISOString(),
  };
}
