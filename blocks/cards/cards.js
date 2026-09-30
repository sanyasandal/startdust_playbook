/**
 * @ew-exempt all — foundation encoder keeps migrated section as no-JS fallback;
 * later per-row encoders will remove this exemption while preserving pixels.
 */
function authoredNodes(block) {
  const nodes = [...block.querySelectorAll(':scope > div > div > *')];
  return nodes.length ? nodes : [...block.children];
}

function addButtonClasses(container) {
  container?.querySelectorAll('a').forEach((a, i) => {
    a.classList.add('pb-button', i === 0 ? 'pb-button--primary' : 'pb-button--secondary');
  });
}

function wrap() { const el = document.createElement('div'); el.className = 'wrap'; return el; }

function decorateTabs(block) {
  const nodes = authoredNodes(block);
  const root = wrap();
  const grid = document.createElement('div');
  grid.className = 'pb-product-tabs__grid';
  for (let i = 0; i < nodes.length; i += 4) {
    const [mediaNode, eyebrow, heading, body] = nodes.slice(i, i + 4);
    const media = mediaNode?.querySelector?.('img');
    const card = document.createElement('article');
    card.className = 'pb-card pb-product-tabs__card';
    const mediaBox = document.createElement('div');
    mediaBox.className = 'pb-product-tabs__media';
    if (media) mediaBox.append(media);
    const bodyBox = document.createElement('div');
    bodyBox.className = 'pb-product-tabs__body';
    if (eyebrow) { eyebrow.className = 'pb-eyebrow'; bodyBox.append(eyebrow); }
    if (heading) bodyBox.append(heading);
    if (body) { if (body.tagName === 'UL') body.className = 'pb-review-list'; bodyBox.append(body); }
    card.append(mediaBox, bodyBox);
    grid.append(card);
  }
  root.append(grid);
  block.replaceChildren(root);
}

function decorateMcp(block) {
  const nodes = authoredNodes(block);
  const root = document.createElement('div');
  root.className = 'wrap pb-mcp__shell';
  const intro = document.createElement('div');
  intro.className = 'pb-mcp__intro';
  const [eyebrow, heading, lede, links, ...rest] = nodes;
  if (eyebrow) { eyebrow.className = 'pb-eyebrow'; intro.append(eyebrow); }
  if (heading) intro.append(heading);
  if (lede) { lede.className = 'pb-lede'; intro.append(lede); }
  if (links) { links.className = 'pb-mcp__links'; addButtonClasses(links); intro.append(links); }
  const chat = document.createElement('div');
  chat.className = 'pb-chat';
  rest.filter((n) => n.tagName === 'P' && !n.querySelector('a')).slice(0, 3).forEach((p, i) => {
    p.className = 'pb-chat__msg';
    p.dataset.role = ['user', 'status', 'assistant'][i];
    chat.append(p);
  });
  intro.append(chat);
  const ol = rest.find((n) => n.tagName === 'OL');
  if (ol) {
    ol.className = 'pb-mcp__steps';
    [...ol.children].forEach((li, i) => {
      li.className = 'pb-mcp-step';
      const num = document.createElement('span');
      num.className = 'pb-mcp-step__num';
      num.textContent = String(i + 1);
      li.prepend(num);
    });
  }
  root.append(intro);
  if (ol) root.append(ol);
  block.replaceChildren(root);
}

function decoratePosts(block) {
  const nodes = authoredNodes(block);
  const root = wrap();
  const head = document.createElement('div');
  head.className = 'pb-section__head';
  const eyebrow = nodes.shift();
  const h2 = nodes.shift();
  const more = nodes.shift();
  if (eyebrow) { eyebrow.className = 'pb-eyebrow'; head.append(eyebrow); }
  if (h2) head.append(h2);
  if (more) { addButtonClasses(more); head.append(more); }
  root.append(head);
  const grid = document.createElement('div');
  grid.className = 'pb-stories__grid';
  while (nodes.length && nodes[0].querySelector?.('img')) {
    const imgP = nodes.shift();
    const title = nodes.shift();
    const a = document.createElement('a');
    const href = title?.querySelector('a')?.href || imgP.querySelector('a')?.href || '#';
    a.className = 'pb-story-card';
    a.href = href;
    const img = imgP.querySelector('img');
    if (img) a.append(img);
    if (title) {
      const link = title.querySelector('a');
      link?.replaceWith(...link.childNodes);
      a.append(title);
    }
    grid.append(a);
  }
  root.append(grid);
  const quote = nodes.find((n) => n.tagName === 'BLOCKQUOTE');
  const cap = nodes.find((n) => n.tagName === 'P');
  if (quote) {
    const fig = document.createElement('figure');
    fig.className = 'pb-quote';
    fig.append(quote);
    if (cap) {
      const fc = document.createElement('figcaption');
      fc.append(...cap.childNodes);
      fig.append(fc);
    }
    root.append(fig);
  }
  block.replaceChildren(root);
}

function decoratePricing(block) {
  const nodes = authoredNodes(block);
  const root = wrap();
  const head = document.createElement('div');
  head.className = 'pb-section__head';
  head.dataset.align = 'center';
  head.append(nodes.shift(), nodes.shift());
  const link = nodes.shift();
  if (link) { addButtonClasses(link); head.append(link); }
  root.append(head);
  const grid = document.createElement('div');
  grid.className = 'pb-pricing__grid';
  while (nodes.length && nodes[0].tagName === 'H3') {
    const card = document.createElement('article');
    card.className = 'pb-card pb-plan-card';
    const h3 = nodes.shift();
    const price = nodes.shift();
    const note = nodes.shift();
    const ul = nodes.shift();
    if (price) price.className = 'pb-plan-card__price';
    card.append(h3, price, note, ul);
    grid.append(card);
  }
  root.append(grid);
  const trust = nodes.find((n) => n.tagName === 'P');
  if (trust) { trust.className = 'pb-pricing__trust'; root.append(trust); }
  block.replaceChildren(root);
}

export default function decorate(block) {
  block.classList.add('pb-section');
  if (block.classList.contains('tabs')) {
    block.classList.add('pb-product-tabs');
    decorateTabs(block);
  }
  if (block.classList.contains('mcp')) {
    block.classList.add('pb-mcp');
    decorateMcp(block);
  }
  if (block.classList.contains('posts')) {
    block.classList.add('pb-stories');
    decoratePosts(block);
  }
  if (block.classList.contains('pricing')) {
    block.classList.add('pb-pricing');
    decoratePricing(block);
  }
}
