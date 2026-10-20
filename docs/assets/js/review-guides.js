const REVIEW_BANNER_KEY = 'clevr-review-banner-dismissed';

const SKILL_GUIDE = {
  id: 'skill-guide',
  title: 'Crear e importar una Skill en Claude',
  subtitle:
    'Pasos según la documentación oficial de Anthropic. Los menús pueden variar según plan (Free, Pro, Team) y políticas de tu organización.',
  sourceHref: 'https://support.claude.com/en/articles/12512180-use-skills-in-claude',
  sourceLabel: 'Use skills in Claude (Anthropic)',
  steps: [
    {
      title: 'Activa la ejecución de código',
      lead: 'Las Skills necesitan el entorno de código y archivos. Sin esto, no verás la sección Skills o aparecerá deshabilitada.',
      bullets: [
        'Cuentas personales: Configuración → Capacidades (Capabilities).',
        'Team / Enterprise: el administrador debe habilitar Skills en Organización → Plugins y skills → pestaña Policy.',
        'Activa «Code execution and file creation» (ejecución de código y creación de archivos).',
      ],
      tip: 'Si trabajas en Filter con cuenta corporativa, pide a TI que confirme la política antes del hands-on.',
      visual: {
        type: 'image',
        src: 'assets/images/guides/claude-skills/ref-habilitar-skills.png',
        alt: 'Documentación: cómo habilitar Skills en Claude',
        caption: 'Captura del centro de ayuda de Claude — requisitos por tipo de cuenta.',
      },
    },
    {
      title: 'Abre Personalizar → Skills',
      lead: 'Desde la app web de Claude, entra a la zona donde gestionas instrucciones reutilizables.',
      bullets: [
        'Menú lateral o avatar → Personalizar (Customize).',
        'Pestaña o sección Skills.',
        'Verás skills de Anthropic y las tuyas (personales o del equipo).',
      ],
      visual: {
        type: 'mock',
        html: `
          <div class="claude-ui-mock">
            <div class="claude-ui-mock__bar">Claude <span>·</span> Personalizar</div>
            <div class="claude-ui-mock__body">
              <div class="claude-ui-mock__path">Ruta: <em>Personalizar</em> → <em>Skills</em></div>
              <div class="claude-ui-mock__row"><div><b>Excel</b><small>Skill de Anthropic</small></div><span class="claude-ui-toggle" aria-hidden="true"></span></div>
              <div class="claude-ui-mock__row"><div><b>PowerPoint</b><small>Skill de Anthropic</small></div><span class="claude-ui-toggle off" aria-hidden="true"></span></div>
            </div>
          </div>`,
      },
    },
    {
      title: 'Sube la Skill del kit',
      lead: 'Para el ejercicio Filter usa el ZIP del material de práctica. También puedes empaquetar tu propia carpeta con SKILL.md.',
      bullets: [
        'Botón + → «Create skill» → «Upload a skill».',
        'Selecciona Skill-Analisis-Filtros.zip (carpeta 02_skill del kit).',
        'Espera a que aparezca en la lista sin errores de formato.',
      ],
      tip: 'Errores frecuentes: ZIP sin SKILL.md, nombre de carpeta distinto al de la skill, o archivo demasiado grande.',
      visual: {
        type: 'image',
        src: 'assets/images/guides/claude-skills/ref-subir-skill.png',
        alt: 'Pasos para subir una skill personalizada en Claude',
        caption: 'Documentación oficial: empaquetar ZIP, Personalizar → Skills, subir archivo.',
      },
    },
    {
      title: 'Activa el interruptor',
      lead: 'Una skill importada no hace nada hasta que la enciendes para tu cuenta.',
      bullets: [
        'Busca «Análisis preliminar de filtros» (o el nombre de tu ZIP).',
        'Activa el toggle a la derecha.',
        'Si está en gris, revisa de nuevo Capacidades o políticas del equipo.',
      ],
      visual: {
        type: 'mock',
        html: `
          <div class="claude-ui-mock">
            <div class="claude-ui-mock__bar">Skills</div>
            <div class="claude-ui-mock__body">
              <div class="claude-ui-mock__row"><div><b>Análisis preliminar de filtros</b><small>Skill personal · Filter demo</small></div><span class="claude-ui-toggle" aria-hidden="true"></span></div>
              <div class="claude-ui-mock__row"><div><b>PDF</b><small>Skill de Anthropic</small></div><span class="claude-ui-toggle off" aria-hidden="true"></span></div>
            </div>
          </div>`,
      },
    },
    {
      title: 'Úsala con el mismo Project',
      lead: 'La Skill define el método; el Project sigue aportando catálogo y reglas. Juntos repiten el ejercicio del hands-on.',
      bullets: [
        'Abre el Project «Filter · Demo comercial».',
        'Pega el prompt del ejercicio 02 o pide explícitamente usar la skill de análisis.',
        'Compara el formato de salida con y sin skill.',
      ],
      tip: 'Si no puedes importar ZIP, copia el contenido de SKILL.md al chat como plan B del facilitador.',
      visual: {
        type: 'mock',
        html: `
          <div class="claude-ui-mock">
            <div class="claude-ui-mock__bar">Project · Filter · Demo comercial</div>
            <div class="claude-ui-mock__body">
              <div class="claude-ui-mock__path">Prompt: «Utiliza la Skill de análisis preliminar…»</div>
              <div class="claude-ui-mock__row"><div><b>Tabla con fuentes</b><small>Formato consistente con la receta</small></div></div>
            </div>
          </div>`,
      },
    },
    {
      title: 'Administrar o quitar',
      lead: 'Puedes desactivar, descargar o eliminar una skill que subiste.',
      bullets: [
        'Abre el detalle de la skill en la lista.',
        'Desactiva con el toggle superior si solo quieres pausarla.',
        'Menú … → Delete para borrarla por completo.',
      ],
      visual: {
        type: 'image',
        src: 'assets/images/guides/claude-skills/ref-gestionar-skill.png',
        alt: 'Menú de opciones de una skill en Claude',
        caption: 'Centro de ayuda: desactivar y eliminar skills personalizadas.',
      },
    },
  ],
};

function initReviewBanner() {
  const banner = document.getElementById('post-review-banner');
  const dismiss = document.getElementById('post-review-banner-dismiss');
  if (!banner) return;
  try {
    if (localStorage.getItem(REVIEW_BANNER_KEY) === '1') banner.setAttribute('hidden', '');
  } catch {
    /* ignore */
  }
  dismiss?.addEventListener('click', () => {
    banner.classList.add('is-dismissed');
    try {
      localStorage.setItem(REVIEW_BANNER_KEY, '1');
    } catch {
      /* ignore */
    }
    setTimeout(() => banner.setAttribute('hidden', ''), 400);
  });
}

function renderGuideVisual(step, container) {
  if (!container) return;
  const v = step.visual;
  if (!v) {
    container.innerHTML = '';
    return;
  }
  if (v.type === 'image') {
    container.innerHTML = `<figure class="visual-guide__figure">
      <img src="${v.src}" alt="${v.alt || ''}" loading="lazy" decoding="async" />
      ${v.caption ? `<figcaption>${v.caption}</figcaption>` : ''}
    </figure>`;
    return;
  }
  if (v.type === 'mock') {
    container.innerHTML = v.html || '';
  }
}

function createGuideController(config) {
  const root = document.getElementById(config.id);
  if (!root) return null;

  const titleEl = root.querySelector('[data-guide-title]');
  const subtitleEl = root.querySelector('[data-guide-subtitle]');
  const stepBadge = root.querySelector('[data-guide-step-badge]');
  const stepTitle = root.querySelector('[data-guide-step-title]');
  const stepLead = root.querySelector('[data-guide-lead]');
  const bulletsEl = root.querySelector('[data-guide-bullets]');
  const tipEl = root.querySelector('[data-guide-tip]');
  const visualEl = root.querySelector('[data-guide-visual]');
  const dotsEl = root.querySelector('[data-guide-dots]');
  const prevBtn = root.querySelector('[data-guide-prev]');
  const nextBtn = root.querySelector('[data-guide-next]');
  const sourceEl = root.querySelector('[data-guide-source]');
  let index = 0;
  let lastFocus = null;
  let docKeyHandler = null;

  if (titleEl) titleEl.textContent = config.title;
  if (subtitleEl) subtitleEl.textContent = config.subtitle;
  if (sourceEl) {
    sourceEl.innerHTML = `<a href="${config.sourceHref}" target="_blank" rel="noopener">${config.sourceLabel} ↗</a>`;
  }

  dotsEl.innerHTML = '';
  config.steps.forEach((_, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-label', `Paso ${i + 1}`);
    b.addEventListener('click', () => go(i));
    dotsEl.appendChild(b);
  });

  function go(i) {
    index = Math.max(0, Math.min(config.steps.length - 1, i));
    const step = config.steps[index];
    const n = config.steps.length;
    if (stepBadge) stepBadge.textContent = `Paso ${index + 1} de ${n}`;
    if (stepTitle) stepTitle.textContent = step.title;
    if (stepLead) stepLead.textContent = step.lead;
    if (bulletsEl) {
      bulletsEl.innerHTML = (step.bullets || []).map((li) => `<li>${li}</li>`).join('');
    }
    if (tipEl) {
      if (step.tip) {
        tipEl.hidden = false;
        tipEl.textContent = step.tip;
      } else {
        tipEl.hidden = true;
      }
    }
    renderGuideVisual(step, visualEl);
    dotsEl.querySelectorAll('button').forEach((btn, j) => {
      btn.setAttribute('aria-current', j === index ? 'step' : 'false');
    });
    if (prevBtn) prevBtn.disabled = index === 0;
    if (nextBtn) {
      nextBtn.disabled = index === n - 1;
      nextBtn.textContent = index === n - 1 ? 'Listo' : 'Siguiente';
    }
  }

  function open(start = 0) {
    lastFocus = document.activeElement;
    root.hidden = false;
    root.setAttribute('aria-hidden', 'false');
    document.body.classList.add('guide-open');
    go(start);
    root.querySelector('.visual-guide__close')?.focus();
    docKeyHandler = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') go(index - 1);
      if (e.key === 'ArrowRight') go(index + 1);
    };
    document.addEventListener('keydown', docKeyHandler);
  }

  function close() {
    root.hidden = true;
    root.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('guide-open');
    if (docKeyHandler) {
      document.removeEventListener('keydown', docKeyHandler);
      docKeyHandler = null;
    }
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  }

  root.querySelectorAll('[data-guide-close]').forEach((el) => el.addEventListener('click', close));
  prevBtn?.addEventListener('click', () => go(index - 1));
  nextBtn?.addEventListener('click', () => {
    if (index < config.steps.length - 1) go(index + 1);
    else close();
  });

  go(0);
  return { open, close };
}

function initReviewGuides() {
  initReviewBanner();
  const skillGuide = createGuideController(SKILL_GUIDE);

  document.querySelectorAll('[data-guide-open="skills"]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const start = parseInt(btn.getAttribute('data-guide-step') || '0', 10);
      skillGuide?.open(Number.isFinite(start) ? start : 0);
    });
  });

  if (location.hash === '#skills-guia' || location.hash === '#skills-guide') {
    requestAnimationFrame(() => skillGuide?.open(0));
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initReviewGuides);
} else {
  initReviewGuides();
}
