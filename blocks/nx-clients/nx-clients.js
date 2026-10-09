/**
 * nx-clients — Nexcent client logo strip.
 *
 * Content model (one cell per row; rows recognised by content):
 *   heading cell → <h2>title</h2> + optional <p>intro</p>
 *   logo cell    → a paragraph of icons (:nx-client-1: …) or images
 */

function cellsOf(block) {
  return [...block.querySelectorAll(':scope > div > div')];
}

export default function decorate(block) {
  const inner = document.createElement('div');
  inner.className = 'nx-clients-inner';
  cellsOf(block).forEach((cell) => {
    const isIntro = !!cell.querySelector('h1, h2, h3, h4, h5, h6');
    cell.className = isIntro ? 'nx-clients-intro' : 'nx-clients-logos';
    inner.append(cell);
  });
  block.replaceChildren(inner);
}
