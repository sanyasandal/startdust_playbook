const ICON_BASE = `${window.hlx?.codeBasePath || ''}/icons`;
const SOCIAL_ICONS = ['linkedin', 'facebook', 'youtube', 'instagram', 'x'];

function key(row) {
  return row.children[0]?.textContent.trim().toLowerCase().replace(/[^a-z]/g, '') || '';
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

function link(source) {
  const a = document.createElement('a');
  const href = safeHref(source.getAttribute('href'));
  if (href) a.href = href;
  a.textContent = source.textContent.trim();
  return a;
}

function icon(name, alt, size) {
  const img = document.createElement('img');
  img.src = `${ICON_BASE}/${name}.svg`;
  img.alt = alt;
  img.width = size;
  img.height = size;
  return img;
}

function socialName(source) {
  const text = source.textContent.trim().toLowerCase();
  const fromText = SOCIAL_ICONS.find((name) => (name === 'x' ? /^(x|twitter)$/.test(text) : text.includes(name)));
  if (fromText) return fromText;
  try {
    const host = new URL(source.href).hostname;
    if (/(^|\.)(x|twitter)\.com$/.test(host)) return 'x';
    return SOCIAL_ICONS.find((name) => host.includes(name)) || null;
  } catch {
    return null;
  }
}

export default function decorate(block) {
  const data = { links: [] };
  [...block.children].forEach((row) => {
    const name = key(row);
    const cells = [...row.children].slice(1);
    if (!name || !cells.length) return;
    if (name === 'links') data.links.push(cells);
    else if (!data[name]) [data[name]] = cells;
  });

  const main = document.createElement('div');
  main.className = 'az-footer-main';

  const brand = document.createElement('div');
  brand.className = 'az-footer-brand';
  const logoSource = data.logo?.querySelector('a[href]');
  const logo = document.createElement('a');
  logo.className = 'az-footer-logo';
  logo.href = safeHref(logoSource?.getAttribute('href')) || '/';
  logo.append(icon('az-logo', data.logo?.textContent.trim() || 'AstraZeneca', 126));
  brand.append(logo);
  const aboutText = data.about?.textContent.trim();
  if (aboutText) {
    const about = document.createElement('p');
    about.textContent = aboutText;
    brand.append(about);
  }
  main.append(brand);

  data.links.forEach((cells) => {
    const anchors = cells.flatMap((cell) => [...cell.querySelectorAll('a[href]')]);
    if (!anchors.length) return;
    const ul = document.createElement('ul');
    ul.className = 'az-footer-links';
    anchors.forEach((source) => {
      const li = document.createElement('li');
      li.append(link(source));
      ul.append(li);
    });
    main.append(ul);
  });

  const bottom = document.createElement('div');
  bottom.className = 'az-footer-bottom';
  const socialLinks = [...(data.social?.querySelectorAll('a[href]') || [])];
  if (socialLinks.length) {
    const ul = document.createElement('ul');
    ul.className = 'az-footer-social';
    socialLinks.forEach((source) => {
      const name = socialName(source);
      const a = link(source);
      if (name) {
        const label = a.textContent;
        a.textContent = '';
        a.setAttribute('aria-label', label);
        a.append(icon(`az-${name}`, '', 20));
      }
      const li = document.createElement('li');
      li.append(a);
      ul.append(li);
    });
    bottom.append(ul);
  }
  const codeText = data.code?.textContent.trim();
  if (codeText) {
    const code = document.createElement('p');
    code.className = 'az-footer-code';
    code.textContent = codeText;
    bottom.append(code);
  }

  const inner = document.createElement('div');
  inner.className = 'az-footer-inner';
  inner.append(main);
  if (bottom.children.length) inner.append(bottom);
  block.replaceChildren(inner);

  const footer = document.querySelector('body > footer');
  const wrapper = block.parentElement;
  if (footer && wrapper?.classList.contains('az-footer-wrapper')) footer.prepend(wrapper);
}
