/**
 * nx-features — Nexcent "who is it for" intro plus a row of feature cards.
 *
 * Content model (rows recognised by content; authors may add or remove cards):
 *   intro row → <h2>title</h2> + optional <p>intro</p> (no icon, no h3)
 *   card row  → <p>:icon:</p>, <h3>title</h3>, <p>text</p>
 *               (extra cells in a card row are merged into the card)
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
  inner.className = 'nx-features-inner';
  const list = document.createElement('div');
  list.className = 'nx-features-list';

  [...block.children].forEach((row) => {
    const cell = rowCell(row);
    if (!cell) return;
    const isIntro = !!cell.querySelector('h1, h2') && !cell.querySelector('h3, .icon, picture');
    if (isIntro && !inner.querySelector('.nx-features-intro')) {
      cell.className = 'nx-features-intro';
      inner.append(cell);
    } else {
      cell.className = 'nx-features-card';
      list.append(cell);
    }
  });

  if (list.children.length) inner.append(list);
  block.replaceChildren(inner);
}
