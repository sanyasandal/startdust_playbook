/**
 * nx-split — Nexcent illustration + article teaser, image on the left.
 *
 * Content model (one row; cells recognised by content):
 *   image cell → picture (illustration)
 *   text cell  → <h2>title</h2>, <p>body</p>, <p><strong><a>CTA</a></strong></p>
 * A picture authored inside the text cell is moved into its own media column.
 */

function cellsOf(block) {
  return [...block.querySelectorAll(':scope > div > div')];
}

export default function decorate(block) {
  const cells = cellsOf(block);
  let media = cells.find((c) => c.querySelector('picture, img') && !c.querySelector('h1, h2, h3'));
  const text = cells.filter((c) => c !== media);
  if (!media) {
    const pic = text.map((c) => c.querySelector('picture, img')).find(Boolean);
    if (pic) {
      media = document.createElement('div');
      media.append(pic.closest('p') || pic.closest('picture') || pic);
    }
  }

  const inner = document.createElement('div');
  inner.className = 'nx-split-inner';
  if (media) {
    media.className = 'nx-split-media';
    inner.append(media);
  }
  const [first, ...rest] = text;
  if (first) {
    first.className = 'nx-split-text';
    rest.forEach((c) => first.append(...c.childNodes));
    inner.append(first);
  }
  block.replaceChildren(inner);
}
