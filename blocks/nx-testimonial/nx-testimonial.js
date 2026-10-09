/**
 * nx-testimonial — Nexcent customer quote with photo, logo row and "see all" link.
 *
 * Content model (one cell per row, or cells side by side; recognised by content):
 *   picture                         → photo
 *   <p>quote</p>, <p><strong>Name</strong></p>, <p>organisation</p> → quote
 *   <p>:nx-cust-1: :nx-cust-2: …</p> → customer logos (icons or images, no text)
 *   <p><a>Meet all customers</a></p> → link (arrow added)
 */

const ICON_BASE = `${window.hlx?.codeBasePath || ''}/icons`;

function cellsOf(block) {
  return [...block.querySelectorAll(':scope > div > div')];
}

function isLogos(cell) {
  return !!cell.querySelector('.icon, img') && !cell.textContent.trim();
}

function isLinkOnly(cell) {
  const links = [...cell.querySelectorAll('a[href]')];
  return links.length > 0 && !cell.querySelector('picture')
    && links.map((a) => a.textContent).join('').trim() === cell.textContent.trim();
}

function arrow() {
  const img = document.createElement('img');
  img.src = `${ICON_BASE}/nx-arrow-right.svg`;
  img.alt = '';
  img.width = 24;
  img.height = 24;
  return img;
}

export default function decorate(block) {
  const cells = cellsOf(block);
  const media = cells.find((c) => c.querySelector('picture') && !c.textContent.trim());
  const logos = cells.find((c) => c !== media && isLogos(c));
  const cta = cells.find((c) => c !== media && c !== logos && isLinkOnly(c));
  const quotes = cells.filter((c) => ![media, logos, cta].includes(c));

  const inner = document.createElement('div');
  inner.className = 'nx-testimonial-inner';
  if (media) {
    media.className = 'nx-testimonial-media';
    inner.append(media);
  }

  const body = document.createElement('div');
  body.className = 'nx-testimonial-body';
  const [quote, ...more] = quotes;
  if (quote) {
    quote.className = 'nx-testimonial-quote';
    more.forEach((c) => quote.append(...c.childNodes));
    body.append(quote);
  }

  if (logos || cta) {
    const footer = document.createElement('div');
    footer.className = 'nx-testimonial-footer';
    if (logos) {
      logos.className = 'nx-testimonial-logos';
      footer.append(logos);
    }
    if (cta) {
      cta.className = 'nx-testimonial-cta';
      cta.querySelectorAll('a[href]').forEach((a) => a.append(arrow()));
      footer.append(cta);
    }
    body.append(footer);
  }

  inner.append(body);
  block.replaceChildren(inner);
}
