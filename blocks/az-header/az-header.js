const ICON_BASE = `${window.hlx?.codeBasePath || ''}/icons`;

function key(row) {
  return row.children[0]?.textContent.trim().toLowerCase().replace(/[^a-z]/g, '') || '';
}

function readRows(block) {
  const rows = new Map();
  [...block.children].forEach((row) => {
    const name = key(row);
    if (name && row.children.length > 1 && !rows.has(name)) rows.set(name, row.children[1]);
  });
  return rows;
}

function safeHref(href) {
  if (!href) return null;
  try {
    const url = new URL(href, window.location.href);
    return ['http:', 'https:', 'mailto:', 'tel:'].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}

function link(source, className) {
  const a = document.createElement('a');
  const href = safeHref(source.getAttribute('href'));
  if (href) a.href = href;
  if (className) a.className = className;
  a.textContent = source.textContent.trim();
  return a;
}

function icon(name, alt = '', size = 20) {
  const img = document.createElement('img');
  img.src = `${ICON_BASE}/${name}.svg`;
  img.alt = alt;
  img.width = size;
  img.height = size;
  return img;
}

function linkList(cell, className, label) {
  const links = [...(cell?.querySelectorAll('a[href]') || [])];
  if (!links.length) return null;
  const ul = document.createElement('ul');
  ul.className = className;
  if (label) ul.setAttribute('aria-label', label);
  links.forEach((source) => {
    const li = document.createElement('li');
    const a = link(source);
    if (source.closest('strong, b')) a.setAttribute('aria-current', 'true');
    li.append(a);
    ul.append(li);
  });
  return ul;
}

function closeAll(scope, except) {
  scope.querySelectorAll('.az-header-nav button[aria-expanded="true"]').forEach((button) => {
    if (button !== except) button.setAttribute('aria-expanded', 'false');
  });
}

function buildNav(cell, block) {
  const list = cell?.querySelector('ul, ol');
  if (!list) return null;
  const nav = document.createElement('nav');
  nav.className = 'az-header-nav';
  nav.id = 'az-header-nav';
  nav.setAttribute('aria-label', 'Main');
  const ul = document.createElement('ul');
  [...list.children].forEach((item, index) => {
    const sub = item.querySelector(':scope > ul, :scope > ol');
    const anchor = [...item.children].find((child) => child.matches('a[href]'))
      || item.querySelector(':scope > p > a[href]');
    const text = anchor?.textContent.trim()
      || [...item.childNodes].filter((node) => node !== sub).map((node) => node.textContent).join('').trim();
    if (!text) return;
    const li = document.createElement('li');
    if (sub) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'az-header-nav-item';
      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('aria-controls', `az-header-sub-${index}`);
      const span = document.createElement('span');
      span.textContent = text;
      button.append(span, icon('az-chevron-down'));
      button.addEventListener('click', () => {
        const open = button.getAttribute('aria-expanded') !== 'true';
        closeAll(block, button);
        button.setAttribute('aria-expanded', String(open));
      });
      const menu = document.createElement('ul');
      menu.className = 'az-header-submenu';
      menu.id = `az-header-sub-${index}`;
      sub.querySelectorAll(':scope > li').forEach((subItem) => {
        const subLink = subItem.querySelector('a[href]');
        if (!subLink) return;
        const subLi = document.createElement('li');
        subLi.append(link(subLink));
        menu.append(subLi);
      });
      li.append(button, menu);
    } else if (anchor) {
      li.append(link(anchor, 'az-header-nav-item'));
    } else {
      return;
    }
    ul.append(li);
  });
  nav.append(ul);
  return nav;
}

function buildActions(cell) {
  const links = [...(cell?.querySelectorAll('a[href]') || [])];
  if (!links.length) return null;
  const actions = document.createElement('div');
  actions.className = 'az-header-actions';
  links.forEach((source) => {
    const text = source.textContent.trim();
    if (/search/i.test(text)) {
      const a = link(source, 'az-header-search');
      a.textContent = '';
      a.setAttribute('aria-label', text);
      a.append(icon('az-search'));
      actions.append(a);
    } else {
      actions.append(link(source, 'az-header-button'));
    }
  });
  return actions;
}

export default function decorate(block) {
  const rows = readRows(block);
  const children = [];

  const utilityLinks = linkList(rows.get('utility'), 'az-header-utility-links', 'Utility');
  const languages = linkList(rows.get('languages'), 'az-header-languages', 'Language');
  if (utilityLinks || languages) {
    const utility = document.createElement('div');
    utility.className = 'az-header-utility';
    const inner = document.createElement('div');
    inner.className = 'az-header-inner';
    inner.append(...[utilityLinks, languages].filter(Boolean));
    utility.append(inner);
    children.push(utility);
  }

  const bar = document.createElement('div');
  bar.className = 'az-header-bar';
  const inner = document.createElement('div');
  inner.className = 'az-header-inner';

  const logoCell = rows.get('logo');
  const logoSource = logoCell?.querySelector('a[href]');
  const brand = document.createElement('a');
  brand.className = 'az-header-logo';
  brand.href = safeHref(logoSource?.getAttribute('href')) || '/';
  brand.append(icon('az-logo', logoCell?.textContent.trim() || 'AstraZeneca', 126));
  inner.append(brand);

  const nav = buildNav(rows.get('navigation'), block);
  const actions = buildActions(rows.get('actions')) || document.createElement('div');
  actions.classList.add('az-header-actions');
  if (nav) {
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'az-header-toggle';
    toggle.setAttribute('aria-controls', nav.id);
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
    toggle.append(document.createElement('span'));
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      block.classList.toggle('az-header-open', open);
    });
    actions.append(toggle);
    inner.append(nav);
  }
  inner.append(actions);
  bar.append(inner);
  children.push(bar);

  block.replaceChildren(...children);

  block.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    const open = block.querySelector('.az-header-nav button[aria-expanded="true"]');
    if (open) {
      open.setAttribute('aria-expanded', 'false');
      open.focus();
    }
  });
  document.addEventListener('click', (event) => {
    if (!block.contains(event.target)) closeAll(block);
  });

  const header = document.querySelector('body > header');
  const wrapper = block.parentElement;
  if (header && wrapper?.classList.contains('az-header-wrapper')) header.prepend(wrapper);
}
