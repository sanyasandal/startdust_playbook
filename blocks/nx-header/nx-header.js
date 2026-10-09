/**
 * nx-header — Nexcent top bar: logo, centred navigation, login / sign-up actions.
 *
 * Content model (one cell per row; rows are recognised by their content):
 *   <ul> of links                          → main navigation
 *   <p><a>Login</a> <strong><a>…</a></strong></p> → actions (strong link = filled button)
 *   <p><a href="/">Brand</a></p>           → logo link (artwork added, text kept for
 *                                            screen readers)
 *
 * The block moves its wrapper into `body > header`; the site header is hidden on
 * pages that use it.
 */

const ICON_BASE = `${window.hlx?.codeBasePath || ''}/icons`;

function cellsOf(block) {
  return [...block.querySelectorAll(':scope > div > div')];
}

function logoLink(cell) {
  const a = cell.querySelector('a[href]');
  if (!a) return;
  const label = document.createElement('span');
  label.className = 'nx-sr';
  label.append(...a.childNodes);
  const img = document.createElement('img');
  img.src = `${ICON_BASE}/nx-logo.svg`;
  img.alt = '';
  img.width = 155;
  img.height = 24;
  a.append(img, label);
}

function markCurrent(nav) {
  nav.querySelectorAll('a[href]').forEach((a) => {
    let url;
    try {
      url = new URL(a.getAttribute('href'), window.location.href);
    } catch {
      return;
    }
    if (url.origin === window.location.origin && url.pathname === window.location.pathname
      && !url.hash) {
      a.setAttribute('aria-current', 'page');
    }
  });
}

export default function decorate(block) {
  const cells = cellsOf(block);
  const navCell = cells.find((c) => c.querySelector('ul'));
  const actionCell = cells.find((c) => c !== navCell && c.querySelector('strong a, a strong'));
  const brandCell = cells.find((c) => c !== navCell && c !== actionCell && c.querySelector('a[href]'));

  const bar = document.createElement('div');
  bar.className = 'nx-header-bar';

  if (brandCell) {
    brandCell.className = 'nx-header-brand';
    logoLink(brandCell);
    bar.append(brandCell);
  }

  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'nx-header-toggle';
  toggle.setAttribute('aria-controls', 'nx-header-menu');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Open menu');
  toggle.append(document.createElement('span'));
  bar.append(toggle);

  if (navCell) {
    const nav = document.createElement('nav');
    nav.className = 'nx-header-nav';
    nav.id = 'nx-header-menu';
    nav.setAttribute('aria-label', 'Main');
    nav.append(navCell);
    markCurrent(nav);
    bar.append(nav);
  }

  if (actionCell) {
    actionCell.className = 'nx-header-actions';
    bar.append(actionCell);
  }

  block.replaceChildren(bar);

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    block.classList.toggle('nx-header-open', open);
  };
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  block.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });

  const header = document.querySelector('body > header');
  const wrapper = block.parentElement;
  if (header && wrapper?.classList.contains('nx-header-wrapper')) header.prepend(wrapper);
}
