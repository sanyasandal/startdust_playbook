/**
 * nx-footer — Nexcent dark footer: brand, social links, link columns, newsletter.
 *
 * Content model (one cell per row; rows recognised by content):
 *   <p><a>Brand</a></p><p>copyright…</p>  → brand (logo artwork added)
 *   <p><a>Instagram</a> <a>Twitter</a> …</p> → social links (icons by link text)
 *   <h3>Column</h3><ul>links</ul>         → link column (any number)
 *   <h3>Stay up to date</h3><p>Your email address</p> → newsletter field
 *
 * @ew-exempt <p> newsletter placeholder — rendered as the input's placeholder
 *   attribute; the paragraph stays in the DOM as the input's accessible label
 *
 * The block moves its wrapper into `body > footer`; the site footer is hidden on
 * pages that use it.
 */

const ICON_BASE = `${window.hlx?.codeBasePath || ''}/icons`;
const SOCIAL = ['instagram', 'dribbble', 'twitter', 'youtube'];

function icon(name, width, height = width) {
  const img = document.createElement('img');
  img.src = `${ICON_BASE}/${name}.svg`;
  img.alt = '';
  img.width = width;
  img.height = height;
  return img;
}

function hideText(a) {
  const label = document.createElement('span');
  label.className = 'nx-sr';
  label.append(...a.childNodes);
  a.append(label);
  return label;
}

function socialName(a) {
  const text = a.textContent.trim().toLowerCase();
  return SOCIAL.find((n) => text.includes(n));
}

function isSocial(cell) {
  const links = [...cell.querySelectorAll('a[href]')];
  return links.length > 0 && !cell.querySelector('ul') && links.every((a) => socialName(a));
}

function buildNewsletter(cell) {
  const p = [...cell.querySelectorAll('p')].find((el) => !el.querySelector('a'));
  if (!p) return;
  p.id = 'nx-footer-email-label';
  p.classList.add('nx-sr');
  const form = document.createElement('form');
  const input = document.createElement('input');
  input.type = 'email';
  input.name = 'email';
  input.autocomplete = 'email';
  input.placeholder = p.textContent.trim();
  input.setAttribute('aria-labelledby', p.id);
  const button = document.createElement('button');
  button.type = 'submit';
  button.setAttribute('aria-label', 'Subscribe');
  button.append(icon('nx-send', 18));
  form.append(p, input, button);
  form.addEventListener('submit', (event) => event.preventDefault());
  cell.append(form);
}

export default function decorate(block) {
  const cells = [...block.querySelectorAll(':scope > div > div')];
  const social = cells.find(isSocial);
  const cols = cells.filter((c) => c !== social && c.querySelector('ul'));
  const newsletter = cells.find((c) => c !== social && !cols.includes(c)
    && c.querySelector('h2, h3, h4') && !c.querySelector('a[href]'));
  const brand = cells.find((c) => ![social, newsletter, ...cols].includes(c));

  const info = document.createElement('div');
  info.className = 'nx-footer-info';
  if (brand) {
    brand.className = 'nx-footer-brand';
    const a = brand.querySelector('a[href]');
    if (a) {
      hideText(a);
      a.prepend(icon('nx-logo-white', 191, 29));
    }
    info.append(brand);
  }
  if (social) {
    social.className = 'nx-footer-social';
    social.querySelectorAll('a[href]').forEach((a) => {
      hideText(a);
      a.prepend(icon(`nx-social-${socialName(a)}`, 32));
    });
    info.append(social);
  }

  const links = document.createElement('div');
  links.className = 'nx-footer-links';
  cols.forEach((c) => {
    c.className = 'nx-footer-col';
    links.append(c);
  });
  if (newsletter) {
    newsletter.className = 'nx-footer-newsletter';
    buildNewsletter(newsletter);
    links.append(newsletter);
  }

  const inner = document.createElement('div');
  inner.className = 'nx-footer-inner';
  inner.append(info, links);
  block.replaceChildren(inner);

  const footer = document.querySelector('body > footer');
  const wrapper = block.parentElement;
  if (footer && wrapper?.classList.contains('nx-footer-wrapper')) footer.prepend(wrapper);
}
