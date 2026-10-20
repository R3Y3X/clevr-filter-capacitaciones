const KIT_ZIP_PATH = 'downloads/Kit-Demo-Filter-Clevr.zip';
const KIT_ZIP_FILENAME = 'Kit-Demo-Filter-Clevr.zip';

const chapters = [...document.querySelectorAll('.chapter')].filter(
  (ch) => !ch.hasAttribute('data-presentation-hidden')
);
const navButtons = [...document.querySelectorAll('.nav-btn')];
const prog = document.querySelector('#progress');
const scrollLabel = document.querySelector('#scroll-label');
const drawer = document.querySelector('.sidebar');
const notes = document.querySelector('#speaker-notes');
const root = document.documentElement;
const sidebarToggle = document.querySelector('#sidebar-toggle');
const sidebarCollapseHandle = document.querySelector('#sidebar-collapse-handle');
const sidebarEdgeToggle = document.querySelector('#sidebar-edge-toggle');
const SIDEBAR_COLLAPSED_KEY = 'clevr-sidebar-collapsed';
const sidebarMobileMq = window.matchMedia('(max-width: 820px)');

function isSidebarMobile() {
  return sidebarMobileMq.matches;
}

function readSidebarCollapsedPref() {
  try {
    return localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === '1';
  } catch {
    return false;
  }
}

function writeSidebarCollapsedPref(collapsed) {
  try {
    localStorage.setItem(SIDEBAR_COLLAPSED_KEY, collapsed ? '1' : '0');
  } catch {
    /* ignore */
  }
}

function updateSidebarCollapseUi(collapsed) {
  const desktop = !isSidebarMobile();
  const effective = desktop && collapsed;
  root.classList.toggle('nav-collapsed', effective);
  const expanded = !effective;
  const labelHide = 'Ocultar menú lateral';
  const labelShow = 'Mostrar menú lateral';
  sidebarToggle?.setAttribute('aria-expanded', String(expanded));
  sidebarToggle?.setAttribute('aria-label', effective ? labelShow : labelHide);
  if (sidebarToggle) {
    sidebarToggle.textContent = effective ? '▶ Panel' : '◀ Panel';
  }
  sidebarCollapseHandle?.setAttribute('aria-expanded', String(expanded));
  sidebarCollapseHandle?.setAttribute('aria-label', effective ? labelShow : labelHide);
  sidebarEdgeToggle?.setAttribute('aria-expanded', String(expanded));
  if (sidebarEdgeToggle) {
    if (effective) sidebarEdgeToggle.removeAttribute('hidden');
    else sidebarEdgeToggle.setAttribute('hidden', '');
  }
}

function setSidebarCollapsed(collapsed, persist = true) {
  if (persist) writeSidebarCollapsedPref(collapsed);
  updateSidebarCollapseUi(collapsed);
}

function toggleSidebarCollapsed() {
  if (isSidebarMobile()) return;
  setSidebarCollapsed(!root.classList.contains('nav-collapsed'));
}

setSidebarCollapsed(readSidebarCollapsedPref(), false);
sidebarMobileMq.addEventListener('change', () => {
  updateSidebarCollapseUi(readSidebarCollapsedPref());
  if (isSidebarMobile()) drawer.classList.remove('open');
});

const phaseAnchors = {};
navButtons.forEach((btn) => {
  const phase = +btn.dataset.phase;
  const chapter = chapters.find((ch) => +ch.dataset.phase === phase);
  if (chapter) phaseAnchors[phase] = chapter;
});

function chapterTitle(ch) {
  const h2 = ch.querySelector('h2');
  if (h2) return h2.textContent.replace(/\s+/g, ' ').trim();
  if (ch.id === 'portada') return 'Portada';
  if (ch.id === 'agenda') return 'Agenda';
  return ch.id || 'Capítulo';
}

function scrollToChapter(el) {
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  drawer.classList.remove('open');
}

function scrollToId(id) {
  const el = document.getElementById(id);
  if (el?.hasAttribute('data-presentation-hidden')) return;
  scrollToChapter(el);
}

function updateNotes(ch) {
  if (!notes) return;
  const text = ch?.dataset.notes || 'Sin notas adicionales para esta pantalla.';
  notes.innerHTML = '<strong>Notas para presentar</strong>' + text;
}

function setActivePhase(phase) {
  navButtons.forEach((b) => b.classList.toggle('active', +b.dataset.phase === phase));
}

function updateScrollProgress() {
  const doc = document.documentElement;
  const max = doc.scrollHeight - doc.clientHeight;
  const pct = max > 0 ? (doc.scrollTop / max) * 100 : 0;
  if (prog) prog.style.width = pct + '%';
}

let visibleChapter = chapters[0];

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((e) => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
    if (!visible.length) return;
    const ch = visible[0].target;
    visibleChapter = ch;
    const phase = +ch.dataset.phase;
    if (phase >= 0) setActivePhase(phase);
    if (scrollLabel) scrollLabel.textContent = chapterTitle(ch);
    updateNotes(ch);
  },
  { root: null, rootMargin: '-20% 0px -55% 0px', threshold: [0, 0.15, 0.35, 0.55] }
);

chapters.forEach((ch) => observer.observe(ch));

navButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    scrollToChapter(phaseAnchors[+btn.dataset.phase]);
  });
});

document.querySelector('#menu-btn')?.addEventListener('click', () => drawer.classList.toggle('open'));

sidebarToggle?.addEventListener('click', toggleSidebarCollapsed);
sidebarCollapseHandle?.addEventListener('click', toggleSidebarCollapsed);
sidebarEdgeToggle?.addEventListener('click', toggleSidebarCollapsed);

document.querySelector('#notes-btn')?.addEventListener('click', () => notes?.classList.toggle('open'));

document.querySelector('#back-top')?.addEventListener('click', () => scrollToId('portada'));

document.querySelectorAll('[data-scroll]').forEach((btn) => {
  btn.addEventListener('click', () => scrollToId(btn.dataset.scroll));
});

window.addEventListener('scroll', updateScrollProgress, { passive: true });
updateScrollProgress();
updateNotes(chapters[0]);
if (scrollLabel) scrollLabel.textContent = chapterTitle(chapters[0]);

document.addEventListener('keydown', (e) => {
  const tag = (document.activeElement?.tagName || '').toLowerCase();
  if (['input', 'textarea', 'select'].includes(tag)) return;
  if (e.key === 'Escape') {
    drawer.classList.remove('open');
    notes?.classList.remove('open');
  }
  if (e.key === 'n' && !e.metaKey && !e.ctrlKey) notes?.classList.toggle('open');
  if (e.key === '[' && !e.metaKey && !e.ctrlKey && !isSidebarMobile()) toggleSidebarCollapsed();
});

function toast(msg) {
  const n = document.querySelector('#toast');
  if (!n) return;
  n.textContent = msg;
  n.classList.add('show');
  clearTimeout(toast.t);
  toast.t = setTimeout(() => n.classList.remove('show'), 2600);
}

document.querySelectorAll('[data-copy]').forEach((b) =>
  b.addEventListener('click', async () => {
    const text = b.getAttribute('data-copy');
    try {
      await navigator.clipboard.writeText(text);
      toast('Prompt copiado');
      b.classList.add('copied');
      setTimeout(() => b.classList.remove('copied'), 1000);
    } catch (e) {
      const t = document.createElement('textarea');
      t.value = text;
      document.body.appendChild(t);
      t.select();
      const ok = document.execCommand('copy');
      t.remove();
      toast(ok ? 'Prompt copiado' : 'Selecciona y copia el texto manualmente');
    }
  })
);

document.querySelectorAll('[data-tip]').forEach((b) =>
  b.addEventListener('click', () => toast(b.getAttribute('data-tip')))
);

async function downloadKit(trigger) {
  const url = new URL(KIT_ZIP_PATH, document.baseURI).href;
  if (trigger) trigger.setAttribute('aria-busy', 'true');
  try {
    const res = await fetch(url, { credentials: 'same-origin' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const blob = await res.blob();
    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = objectUrl;
    a.download = KIT_ZIP_FILENAME;
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(objectUrl);
    toast('Descarga iniciada');
  } catch (err) {
    console.error(err);
    toast('No se pudo descargar el ZIP. Usa el enlace directo o contacta al facilitador.');
    if (trigger) {
      window.location.href = new URL(KIT_ZIP_PATH, document.baseURI).href;
    }
  } finally {
    if (trigger) trigger.removeAttribute('aria-busy');
  }
}

document.querySelectorAll('[data-kit-download]').forEach((link) => {
  link.addEventListener('click', (e) => {
    if (!window.fetch) return;
    e.preventDefault();
    downloadKit(link);
  });
});

if (location.hash) {
  const id = location.hash.slice(1);
  const target = document.getElementById(id);
  if (target) requestAnimationFrame(() => target.scrollIntoView({ behavior: 'instant', block: 'start' }));
}
