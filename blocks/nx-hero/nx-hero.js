/**
 * nx-hero — Nexcent hero: headline, intro, CTA beside an illustration.
 *
 * Content model (one row; cells recognised by content):
 *   text cell   → <h1>Headline <em>accent line</em></h1>, <p>intro</p>,
 *                 <p><strong><a>CTA</a></strong></p>
 *   image cell  → picture (illustration)
 * A picture authored inside the text cell is moved into its own media column.
 */

function cellsOf(block) {
  return [...block.querySelectorAll(':scope > div > div')];
}

function splitMedia(cells) {
  let media = cells.find((c) => c.querySelector('picture, img') && !c.querySelector('h1, h2, h3'));
  const text = cells.filter((c) => c !== media);
  if (!media) {
    const pic = text.map((c) => c.querySelector('picture, img')).find(Boolean);
    if (pic) {
      media = document.createElement('div');
      const holder = pic.closest('p') || pic.closest('picture') || pic;
      media.append(holder);
    }
  }
  return { media, text };
}

export default function decorate(block) {
  const { media, text } = splitMedia(cellsOf(block));
  const inner = document.createElement('div');
  inner.className = 'nx-hero-inner';
  const [first, ...rest] = text;
  if (first) {
    first.className = 'nx-hero-text';
    rest.forEach((c) => first.append(...c.childNodes));
    inner.append(first);
  }
  if (media) {
    media.className = 'nx-hero-media';
    inner.append(media);
  }

  const dots = document.createElement('div');
  dots.className = 'nx-hero-dots';
  dots.setAttribute('aria-hidden', 'true');
  dots.append(...[0, 1, 2].map(() => document.createElement('span')));

  block.replaceChildren(inner, dots);
}
