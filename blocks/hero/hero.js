/**
 * @ew-exempt all — hero variants keep migrated/template structures as fallback
 * rows while the block owns the visual slotting.
 */
function authoredNodes(block) {
  const nodes = [...block.querySelectorAll(':scope > div > div > *')];
  return nodes.length ? nodes : [...block.children];
}

function actionize(paragraph) {
  paragraph?.querySelectorAll('a').forEach((a, i) => {
    a.classList.add('pb-button', i === 0 ? 'pb-button--primary' : 'pb-button--secondary');
  });
}

function preserveMediaHero(block) {
  const source = block.querySelector('.pb-media-hero__wrap');
  const mediaHeading = [...block.querySelectorAll('h1, h2')]
    .find((h) => /Playbook for Media/i.test(h.textContent));
  if (!source && !mediaHeading) return false;
  block.classList.add('pb-media-hero');
  if (source) {
    source.querySelectorAll('img').forEach((img, i) => {
      if (i === 0) {
        img.setAttribute('loading', 'eager');
        img.setAttribute('fetchpriority', 'high');
      }
    });
    block.replaceChildren(source);
    return true;
  }
  const nodes = authoredNodes(block);
  const ps = nodes.filter((n) => n.tagName === 'P');
  const actions = ps.find((p) => p.querySelector('a'));
  const lede = ps.find((p) => !p.querySelector('a, img') && !/playbook\.com|AI Shot/i.test(p.textContent));
  const caption = ps.find((p) => /playbook\.com/i.test(p.textContent));
  const media = nodes.find((n) => n.querySelector?.('img'));
  const railLabels = [
    'AI Shot Tagging',
    'Natural Language Search',
    '3D Spatial Review',
    'Version Control',
    'Agentic Upload',
    'Permissions & Access',
    'Partner App Ecosystem',
    'BYOS Storage',
  ];
  mediaHeading.innerHTML = mediaHeading.innerHTML.replace(
    /^Playbook for Media\s*/i,
    '<span>Playbook for Media</span> ',
  );
  const root = document.createElement('section');
  root.className = 'wrap pb-media-hero__wrap';
  const copy = document.createElement('section');
  copy.className = 'pb-media-hero__copy';
  copy.append(mediaHeading);
  if (lede) copy.append(lede);
  if (actions) {
    actions.className = 'pb-media-actions';
    actionize(actions);
    copy.append(actions);
  }
  const fig = document.createElement('figure');
  fig.className = 'pb-media-hero__stage';
  if (caption) {
    const fc = document.createElement('figcaption');
    fc.textContent = caption.textContent;
    fig.append(fc);
  }
  const win = document.createElement('section');
  win.className = 'pb-media-window';
  win.innerHTML = '<span></span><span></span><span></span>';
  fig.append(win);
  [...(media?.querySelectorAll('img') || [])].forEach((img, i) => {
    img.className = i === 0 ? 'pb-media-hero__image' : 'pb-media-hero__float';
    if (i === 0) {
      img.setAttribute('loading', 'eager');
      img.setAttribute('fetchpriority', 'high');
    }
    fig.append(img);
  });
  const rail = document.createElement('section');
  rail.className = 'pb-media-rail';
  railLabels.forEach((label) => {
    const span = document.createElement('span');
    span.textContent = label;
    rail.append(span);
  });
  fig.append(rail);
  root.append(copy, fig);
  block.replaceChildren(root);
  return true;
}

export default function decorate(block) {
  if (block.classList.contains('blog')) {
    const nodes = authoredNodes(block);
    const root = document.createElement('div');
    root.className = 'wrap pb-blog-hero__shell';
    const eyebrow = nodes.find((n) => n.tagName === 'P');
    const heading = nodes.find((n) => n.matches('h1, h2'));
    const filters = nodes.find((n) => n.matches('ul, ol'));
    if (eyebrow) {
      eyebrow.className = 'pb-eyebrow';
      root.append(eyebrow);
    }
    if (heading) root.append(heading);
    if (filters) {
      filters.className = 'pb-filter-row';
      [...filters.children].forEach((li) => {
        const span = document.createElement('span');
        span.textContent = li.textContent;
        li.replaceChildren(span);
      });
      root.append(filters);
    }
    block.classList.add('pb-sibling-hero');
    block.replaceChildren(root);
    return;
  }

  if (block.classList.contains('program')) {
    const nodes = authoredNodes(block);
    const heading = nodes.find((n) => n.matches('h1, h2'));
    const lede = nodes.find((n) => n.tagName === 'P' && !n.querySelector('a, img'));
    const ctas = nodes.find((n) => n.tagName === 'P' && n.querySelector('a'));
    const media = nodes.find((n) => n.querySelector('img, video'));
    const grid = document.createElement('div');
    grid.className = 'wrap pb-program-hero__grid';
    const copy = document.createElement('div');
    copy.className = 'pb-program-hero__copy';
    if (heading) copy.append(heading);
    if (lede) {
      lede.className = 'pb-lede';
      copy.append(lede);
    }
    if (ctas) {
      actionize(ctas);
      ctas.className = 'pb-program-hero__actions';
      copy.append(ctas);
    }
    const mediaBox = document.createElement('div');
    mediaBox.className = 'pb-program-hero__media';
    const visual = media?.querySelector('img, video');
    if (visual) {
      visual.setAttribute('loading', 'eager');
      if (visual.tagName === 'IMG') visual.setAttribute('fetchpriority', 'high');
      mediaBox.append(visual);
    }
    grid.append(copy, mediaBox);
    block.classList.add('pb-program-hero');
    block.replaceChildren(grid);
    return;
  }

  const sourceHero = block.querySelector('.pb-hero__copy');
  if (sourceHero) {
    block.classList.add('pb-hero');
    block.replaceChildren(sourceHero);
    return;
  }

  const programHero = block.querySelector('.pb-program-hero__grid');
  if (programHero) {
    block.classList.add('pb-program-hero');
    programHero.querySelectorAll('a').forEach((a, i) => {
      a.classList.add('pb-button', i === 0 ? 'pb-button--primary' : 'pb-button--secondary');
    });
    const media = programHero.querySelector('img, video');
    media?.setAttribute('loading', 'eager');
    if (media?.tagName === 'IMG') media.setAttribute('fetchpriority', 'high');
    block.replaceChildren(programHero);
    return;
  }

  if (preserveMediaHero(block)) return;

  const nodes = authoredNodes(block);
  const heading = nodes.find((n) => n.matches('h1')) || nodes.find((n) => n.matches('h2'));
  const headingIndex = heading ? nodes.indexOf(heading) : -1;
  const beforeHeading = headingIndex > 0 ? nodes.slice(0, headingIndex) : [];
  const afterHeading = headingIndex >= 0 ? nodes.slice(headingIndex + 1) : nodes;
  const eyebrow = beforeHeading.find((n) => (
    n.matches?.('h2, h3') || (n.tagName === 'P' && !n.querySelector('a, img'))
  ));
  const lede = afterHeading.find((n) => n.tagName === 'P' && !n.querySelector('a, img'));
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
