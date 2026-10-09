/**
 * nx-cta — Nexcent closing call-to-action band.
 *
 * Content model (one cell): <h2>headline</h2>, <p><strong><a>CTA</a></strong></p>
 * The button gets a decorative arrow.
 */

const ICON_BASE = `${window.hlx?.codeBasePath || ''}/icons`;

export default function decorate(block) {
  const cells = [...block.querySelectorAll(':scope > div > div')];
  const [inner, ...rest] = cells;
  if (!inner) return;
  rest.forEach((c) => inner.append(...c.childNodes));
  inner.className = 'nx-cta-inner';
  inner.querySelectorAll('a.button').forEach((a) => {
    const img = document.createElement('img');
    img.src = `${ICON_BASE}/nx-arrow-right-small.svg`;
    img.alt = '';
    img.width = 16;
    img.height = 16;
    a.append(img);
  });
  block.replaceChildren(inner);
}
