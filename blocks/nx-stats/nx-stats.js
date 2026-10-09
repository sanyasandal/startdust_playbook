/**
 * nx-stats — Nexcent achievements band: heading on the left, 2×2 figures on the right.
 *
 * Content model (rows recognised by content; any number of figures):
 *   intro row  → <h2>Lead <em>accent</em></h2> + optional <p>intro</p>
 *   figure row → <p>:icon:</p>, <p><strong>2,245,341</strong></p>, <p>label</p>
 */

function rowCell(row) {
  const [first, ...rest] = [...row.children];
  if (!first) return null;
  rest.forEach((c) => {
    first.append(...c.childNodes);
    c.remove();
  });
  return first;
}

export default function decorate(block) {
  const inner = document.createElement('div');
  inner.className = 'nx-stats-inner';
  const grid = document.createElement('div');
  grid.className = 'nx-stats-grid';

  [...block.children].forEach((row) => {
    const cell = rowCell(row);
    if (!cell) return;
    if (cell.querySelector('h1, h2, h3') && !inner.querySelector('.nx-stats-intro')) {
      cell.className = 'nx-stats-intro';
      inner.prepend(cell);
    } else {
      cell.className = 'nx-stats-item';
      grid.append(cell);
    }
  });

  if (grid.children.length) inner.append(grid);
  block.replaceChildren(inner);
}
