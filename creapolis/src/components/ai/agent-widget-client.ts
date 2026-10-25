/**
 * AgentWidget client — loaded lazily on first interaction with the widget.
 * Keeps ~6KB of agent logic off the critical path of every page.
 */
import { sendAgentMessage, type AgentMessage, type AgentSessionPayload } from '../../lib/ai-agent/connector';

function initAgentWidgets() {
  const widgets = document.querySelectorAll<HTMLElement>('[data-agent-widget]:not([data-agent-init])');
  widgets.forEach((widget) => {
    widget.setAttribute('data-agent-init', 'true');
    const lang = (widget.getAttribute('data-lang') || 'es') as 'es' | 'en' | 'pt';
    const toggleBtn = widget.querySelector('[data-agent-toggle]');
    const closeBtn = widget.querySelector('[data-agent-close]');
    const form = widget.querySelector<HTMLFormElement>('[data-agent-form]');
    const input = widget.querySelector<HTMLInputElement>('[data-agent-input]');
    const msgContainer = widget.querySelector<HTMLElement>('[data-agent-messages]');
    const chipBtns = widget.querySelectorAll<HTMLButtonElement>('[data-chip-text]');

    const sessionId = `sess-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const messages: AgentMessage[] = [];

    // Open/close toggle
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const isActive = widget.classList.toggle('active');
        toggleBtn.setAttribute('aria-expanded', String(isActive));
        const openIcon = toggleBtn.querySelector('.launcher-icon-open') as HTMLElement;
        const closeIcon = toggleBtn.querySelector('.launcher-icon-close') as HTMLElement;
        if (openIcon && closeIcon) {
          openIcon.style.display = isActive ? 'none' : 'block';
          closeIcon.style.display = isActive ? 'block' : 'none';
        }
        if (isActive && input) {
          setTimeout(() => input.focus(), 150);
        }
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        widget.classList.remove('active');
        if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
      });
    }

    function appendMessage(role: 'user' | 'assistant', text: string, actionCard?: any) {
      if (!msgContainer) return;
      const msgDiv = document.createElement('div');
      msgDiv.className = `agent-msg ${role}`;

      let cardHtml = '';
      if (actionCard && actionCard.type === 'calendar_slots' && actionCard.slots) {
        const slotsHtml = actionCard.slots.map((s: any) => `
          <button type="button" class="slot-btn" data-slot-iso="${s.iso}">
            <span>${s.label}</span>
            <span>${s.time}</span>
          </button>
        `).join('');
        cardHtml = `
          <div class="agent-action-card">
            <strong style="font-size:0.75rem; color:#18181b;">Horarios disponibles en tiempo real:</strong>
            <div class="agent-slots-grid">${slotsHtml}</div>
            ${actionCard.bookingUrl ? `<a href="${actionCard.bookingUrl}" target="_blank" rel="noopener" class="action-calendar-link">O abre el calendario completo de Tiago →</a>` : ''}
          </div>
        `;
      }

      msgDiv.innerHTML = `
        <div class="msg-bubble">
          <p>${text.replace(/\n/g, '<br>')}</p>
          ${cardHtml}
        </div>
      `;
      msgContainer.appendChild(msgDiv);
      msgContainer.scrollTop = msgContainer.scrollHeight;

      // Slot click listeners
      const slotButtons = msgDiv.querySelectorAll('.slot-btn');
      slotButtons.forEach((sBtn) => {
        sBtn.addEventListener('click', () => {
          const slotIso = sBtn.getAttribute('data-slot-iso') || '';
          submitMessage(`He seleccionado el horario: ${slotIso}. Por favor confirma mi llamada.`);
        });
      });
    }

    async function submitMessage(userText: string) {
      if (!userText.trim()) return;
      appendMessage('user', userText);
      messages.push({
        id: `usr-${Date.now()}`,
        role: 'user',
        content: userText,
        timestamp: new Date().toISOString(),
      });

      if (input) input.value = '';

      const payload: AgentSessionPayload = {
        sessionId,
        locale: lang,
        pageUrl: window.location.href,
        messages,
      };

      const reply = await sendAgentMessage(payload);
      messages.push(reply);
      appendMessage('assistant', reply.content, reply.actionCard);
    }

    if (form && input) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        submitMessage(input.value);
      });
    }

    chipBtns.forEach((chip) => {
      chip.addEventListener('click', () => {
        const text = chip.getAttribute('data-chip-text') || chip.innerText;
        submitMessage(text);
      });
    });
  });
}

// Init on lazy load and after view transitions (guarded by data-agent-init)
initAgentWidgets();
document.addEventListener('astro:page-load', initAgentWidgets);

export {};
