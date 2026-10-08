function localizeLinks(el, ctx) {
  const links = [
    ...(el.matches?.('a[href]') ? [el] : []),
    ...(el.querySelectorAll?.('a[href]') || []),
  ];
  links.forEach((a) => {
    const href = a.getAttribute('href');
    const localized = ctx.localize(`href="${href}"`).match(/href="([^"]*)"/)?.[1];
    if (localized) a.setAttribute('href', localized);
  });
  return el;
}

function encodeListing(section, ctx, variant) {
  const outer = ctx.doc.createElement('div');
  const block = ctx.doc.createElement('div');
  block.className = `cards ${variant}`;
  section.querySelectorAll('article').forEach((article) => {
    const row = ctx.doc.createElement('div');
    const cell = ctx.doc.createElement('div');
    const metaText = article.querySelector('.pb-sibling-meta')?.textContent.trim();
    const meta = metaText ? ctx.doc.createElement('p') : null;
    if (meta) {
      meta.className = 'pb-sibling-meta';
      meta.textContent = metaText;
    }
    const heading = article.querySelector('h2, h3')?.cloneNode(true);
    const excerpt = [...article.querySelectorAll('p')]
      .find((p) => !p.closest('.pb-sibling-meta') && p.textContent.trim())?.cloneNode(true);
    const media = article.querySelector('.pb-sibling-card__media')?.cloneNode(true);
    [meta, heading, excerpt, media].filter(Boolean).forEach((node) => cell.append(localizeLinks(node, ctx)));
    row.append(cell);
    block.append(row);
  });
  outer.append(block);
  return outer;
}

export default function encode(section, ctx, variant) {
  if (variant === 'listing') return encodeListing(section, ctx, variant);
  return ctx.block(section, `cards ${variant}`);
}
