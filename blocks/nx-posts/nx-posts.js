/**
 * nx-posts — Nexcent blog teaser: intro plus image cards with an overlapping caption.
 *
 * Content model (rows recognised by content; any number of cards):
 *   intro row → <h2>title</h2> + optional <p>intro</p> (no picture)
 *   card row  → picture | <h3>title</h3>, <p><a>Readmore</a></p>
 *               (one cell with picture + text also works)
 */

const ICON_BASE = `${window.hlx?.codeBasePath || ''}/icons`;

function arrow() {
  const img = document.createElement('img');
  img.src = `${ICON_BASE}/nx-arrow-right.svg`;
  img.alt = '';
  img.width = 24;
  img.height = 24;
  return img;
}

function buildCard(row) {
  const cells = [...row.children];
  let media = cells.find((c) => c.querySelector('picture') && !c.querySelector('h1, h2, h3, h4'));
  const text = cells.filter((c) => c !== media);
  if (!media) {
    const pic = text.map((c) => c.querySelector('picture')).find(Boolean);
    if (pic) {
      media = document.createElement('div');
      media.append(pic.closest('p') || pic);
    }
  }
  const [body, ...rest] = text;
  rest.forEach((c) => {
    body.append(...c.childNodes);
    c.remove();
  });

  row.className = 'nx-posts-card';
  if (media) {
    media.className = 'nx-posts-media';
    row.prepend(media);
  }
  if (body) {
    body.className = 'nx-posts-body';
    body.querySelectorAll('p > a[href]:only-child').forEach((a) => a.append(arrow()));
    row.append(body);
  }
  return row;
}

export default function decorate(block) {
  const inner = document.createElement('div');
  inner.className = 'nx-posts-inner';
  const list = document.createElement('div');
  list.className = 'nx-posts-list';

  [...block.children].forEach((row) => {
    const isIntro = !row.querySelector('picture') && !!row.querySelector('h1, h2');
    if (isIntro && !inner.querySelector('.nx-posts-intro')) {
      const [cell, ...rest] = [...row.children];
      rest.forEach((c) => cell.append(...c.childNodes));
      cell.className = 'nx-posts-intro';
      inner.append(cell);
    } else if (row.children.length) {
      list.append(buildCard(row));
    }
  });

  if (list.children.length) inner.append(list);
  block.replaceChildren(inner);
}
