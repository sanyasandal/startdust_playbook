function authoredNodes(block) {
  const nodes = [...block.querySelectorAll(':scope > div > div > *')];
  return nodes.length ? nodes : [...block.children];
}

function actionize(paragraph) {
  paragraph?.querySelectorAll('a').forEach((a, i) => {
    a.classList.add('pb-button', i === 0 ? 'pb-button--primary' : 'pb-button--secondary');
  });
}

export default function decorate(block) {
  const nodes = authoredNodes(block);
  const eyebrow = nodes.find((n) => n.tagName === 'P' && !n.querySelector('a, img'));
  const heading = nodes.find((n) => n.matches('h1, h2'));
  const lede = nodes.find((n) => n.tagName === 'P' && n !== eyebrow && !n.querySelector('a, img'));
  const ctas = nodes.find((n) => n.tagName === 'P' && n.querySelector('a'));
  const media = nodes.find((n) => n.querySelector('img'));
  const copy = document.createElement('div');
  copy.className = 'wrap pb-hero__copy';
  if (eyebrow) { eyebrow.className = 'pb-eyebrow'; copy.append(eyebrow); }
  if (heading) copy.append(heading);
  if (lede) { lede.className = 'pb-lede'; copy.append(lede); }
  if (ctas) { actionize(ctas); ctas.className = 'pb-hero__actions'; copy.append(ctas); }
  const mediaWrap = document.createElement('div');
  mediaWrap.className = 'pb-hero__media-wrap';
  if (media) {
    const figure = document.createElement('figure');
    figure.className = 'pb-hero__frame';
    const img = media.querySelector('img');
    img.className = 'pb-hero__img';
    img.setAttribute('loading', 'eager');
    img.setAttribute('fetchpriority', 'high');
    figure.append(img);
    mediaWrap.append(figure);
  }
  block.classList.add('pb-hero');
  block.replaceChildren(copy, mediaWrap);
}
