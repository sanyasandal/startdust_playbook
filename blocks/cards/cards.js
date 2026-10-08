/**
 * @ew-exempt all — foundation encoder keeps migrated section as no-JS fallback;
 * later per-row encoders will remove this exemption while preserving pixels.
 */
function authoredNodes(block) {
  const nodes = [...block.querySelectorAll(':scope > div > div > *')];
  return nodes.length ? nodes : [...block.children];
}

function addButtonClasses(container, first = 'primary') {
  container?.querySelectorAll('a').forEach((a, i) => {
    const variant = i === 0 ? first : 'secondary';
    a.classList.add('pb-button', `pb-button--${variant}`);
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
  if (links) { links.className = 'pb-mcp__links'; addButtonClasses(links, 'secondary'); intro.append(links); }
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
      [...li.querySelectorAll(':scope > p')].find((p) => p.textContent.trim() === String(i + 1))?.remove();
      const num = document.createElement('span');
      num.className = 'pb-mcp-step__num';
      num.textContent = String(i + 1);
      const body = document.createElement('div');
      body.append(...li.childNodes);
      li.append(num, body);
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
  if (more) { addButtonClasses(more, 'secondary'); head.append(more); }
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
  const sourceGrid = block.querySelector('.pb-pricing__grid');
  if (sourceGrid) {
    const sourceWrap = sourceGrid.closest('.wrap') || sourceGrid;
    block.replaceChildren(sourceWrap);
    return;
  }

  const nodes = authoredNodes(block);
  const root = wrap();
  const head = document.createElement('div');
  head.className = 'pb-section__head';
  head.dataset.align = 'center';
  const intro = [];
  while (nodes[0] && !nodes[0].matches?.('h2, h3')) intro.push(nodes.shift());
  const billing = document.createElement('div');
  billing.className = 'pb-pricing-toggle-static';
  billing.innerHTML = '<span>Monthly</span><strong>Yearly</strong>';
  head.append(billing);
  const savings = intro.find((node) => /save/i.test(node.textContent));
  if (savings) {
    savings.className = 'pb-pricing__savings';
    head.append(savings);
  }
  root.append(head);
  const grid = document.createElement('div');
  grid.className = 'pb-pricing__grid';
  while (nodes.length && ['H2', 'H3'].includes(nodes[0].tagName)) {
    const card = document.createElement('article');
    card.className = 'pb-card pb-plan-card';
    const h3 = nodes.shift();
    const group = [];
    while (nodes[0] && !nodes[0].matches?.('h2, h3')) group.push(nodes.shift());
    const badge = group.find((node) => (
      node.tagName === 'P' && /Unlimited members/i.test(node.textContent)
    ));
    const priceIndex = group.findIndex((node) => (
      node.tagName === 'P' && /^(\$|Custom)/.test(node.textContent.trim())
    ));
    const desc = group.find((node, index) => (
      node.tagName === 'P'
      && index !== priceIndex
      && node !== badge
      && !node.querySelector('a')
      && !node.querySelector('strong')
      && !/per year|No credit|Only pay/i.test(node.textContent)
    ));
    const price = priceIndex >= 0 ? group[priceIndex] : null;
    const note = group.find((node, index) => (
      node.tagName === 'P' && index > priceIndex && !node.querySelector('a')
    ));
    const ctas = group.find((node) => node.querySelector?.('a'));
    const label = group.find((node) => node.querySelector?.('strong'));
    const ul = group.find((node) => node.tagName === 'UL');
    if (price) {
      price.className = 'pb-plan-card__price';
      const [, amount, unitText] = price.textContent.trim().match(/^(\S+)\s*(.*)$/) || [];
      if (unitText) {
        price.textContent = `${amount} `;
        const unit = document.createElement('span');
        unit.textContent = unitText;
        price.append(unit);
      }
    }
    const cardHead = document.createElement('div');
    cardHead.className = 'pb-plan-card__head';
    if (h3) cardHead.append(h3);
    if (badge) {
      badge.className = 'pb-plan-card__badge';
      cardHead.append(badge);
    }
    card.append(cardHead);
    if (desc) card.append(desc);
    if (price) card.append(price);
    if (note && note !== desc) card.append(note);
    if (ctas) {
      addButtonClasses(ctas, 'primary');
      card.append(ctas);
    }
    if (label) card.append(label);
    if (ul) card.append(ul);
    grid.append(card);
  }
  root.append(grid);
  const trust = nodes.find((n) => n.tagName === 'P');
  if (trust) { trust.className = 'pb-pricing__trust'; root.append(trust); }
  block.replaceChildren(root);
}

function decorateListing(block) {
  const rows = [...block.children];
  if (rows.length > 1) {
    const root = wrap();
    const rule = document.createElement('div');
    rule.className = 'pb-blog-list__rule';
    const grid = document.createElement('div');
    grid.className = 'pb-blog-grid pb-sibling-grid';
    rows.forEach((row) => {
      const cell = row.firstElementChild;
      if (!cell) return;
      const card = document.createElement('article');
      card.className = 'pb-card pb-sibling-card pb-blog-card';
      const title = cell.querySelector('h2, h3');
      const mediaLink = cell.querySelector('.pb-sibling-card__media, a:has(img)');
      const href = mediaLink?.getAttribute('href') || title?.querySelector('a')?.href;
      if (href) card.dataset.href = href;
      if (mediaLink) {
        mediaLink.className = 'pb-sibling-card__media';
        card.append(mediaLink);
      }
      const body = document.createElement('div');
      body.className = 'pb-sibling-card__body';
      const textParagraphs = [...cell.querySelectorAll('p')]
        .filter((p) => p.textContent.trim() && !p.querySelector('img, h1, h2, h3, a'));
      const meta = cell.querySelector('.pb-sibling-meta')
        || textParagraphs.find((p) => /·/.test(p.textContent) && p.textContent.length < 80);
      if (meta) meta.className = 'pb-sibling-meta';
      if (meta) body.append(meta);
      if (title) {
        title.querySelectorAll('a').forEach((link) => link.replaceWith(...link.childNodes));
        body.append(title);
      }
      const desc = textParagraphs.find((p) => p !== meta);
      if (desc) body.append(desc);
      card.append(body);
      card.addEventListener('click', (event) => {
        if (event.target.closest('a')) return;
        if (card.dataset.href) window.location.href = card.dataset.href;
      });
      grid.append(card);
    });
    root.append(grid);
    block.replaceChildren(rule, root);
    return;
  }

  const sourceGrid = block.querySelector('.pb-sibling-grid');
  if (sourceGrid) {
    const root = wrap();
    const rule = block.querySelector('.pb-blog-list__rule') || document.createElement('div');
    rule.className = 'pb-blog-list__rule';
    sourceGrid.classList.add('pb-blog-grid');
    sourceGrid.querySelectorAll('.pb-sibling-card').forEach((card) => {
      card.classList.add('pb-blog-card');
      const title = card.querySelector('h2, h3');
      const href = card.querySelector('.pb-sibling-card__media')?.href
        || title?.querySelector('a')?.href;
      if (href) card.dataset.href = href;
      title?.querySelectorAll('a').forEach((link) => {
        link.replaceWith(...link.childNodes);
      });
      card.addEventListener('click', (event) => {
        if (event.target.closest('a')) return;
        if (card.dataset.href) window.location.href = card.dataset.href;
      });
    });
    root.append(sourceGrid);
    block.replaceChildren(rule, root);
    return;
  }

  const nodes = authoredNodes(block);
  const root = wrap();
  const rule = document.createElement('div');
  rule.className = 'pb-blog-list__rule';
  const grid = document.createElement('div');
  grid.className = 'pb-blog-grid pb-sibling-grid';
  while (nodes.length) {
    const media = nodes[0]?.querySelector?.('img') ? nodes.shift() : null;
    const heading = nodes.find((n) => n.matches?.('h2, h3'));
    if (!heading) break;
    nodes.splice(nodes.indexOf(heading), 1);
    const descIndex = nodes.findIndex((n) => n.tagName === 'P' && !n.querySelector('img, a'));
    const desc = descIndex >= 0 ? nodes.splice(descIndex, 1)[0] : null;
    const card = document.createElement('article');
    card.className = 'pb-card pb-sibling-card pb-blog-card';
    if (media) {
      const a = media.querySelector('a') || document.createElement('a');
      a.className = 'pb-sibling-card__media';
      if (!a.parentElement) a.append(media.querySelector('img'));
      card.append(a);
    }
    const body = document.createElement('div');
    body.className = 'pb-sibling-card__body';
    body.append(heading);
    if (desc) body.append(desc);
    card.append(body);
    grid.append(card);
  }
  root.append(grid);
  block.prepend(rule);
  block.append(root);
}

function decorateRelated(block) {
  const nodes = authoredNodes(block);
  const root = wrap();
  const head = document.createElement('div');
  head.className = 'pb-section__head';
  const first = nodes.shift();
  if (first) head.append(first);
  const grid = document.createElement('div');
  grid.className = 'pb-stories__grid';
  nodes.filter((n) => n.matches?.('h2, h3')).forEach((heading) => {
    const link = heading.querySelector('a');
    const a = document.createElement('a');
    a.className = 'pb-story-card';
    a.href = link?.href || '#';
    if (link) link.replaceWith(...link.childNodes);
    a.append(heading);
    grid.append(a);
  });
  root.append(head, grid);
  block.replaceChildren(root);
}

function decorateSimpleGrid(block, className = 'pb-feature-grid') {
  const sourceGrid = block.querySelector('.pb-try-tiles__grid, .pricing-bento');
  if (sourceGrid) {
    const sourceWrap = sourceGrid.closest('.wrap') || sourceGrid;
    block.replaceChildren(sourceWrap);
    return;
  }

  const nodes = authoredNodes(block);
  const root = wrap();
  const head = document.createElement('div');
  head.className = 'pb-section__head';
  while (nodes[0] && !nodes[0].querySelector?.('img') && !nodes[0].matches?.('h3')) {
    head.append(nodes.shift());
    if (head.children.length > 3) break;
  }
  if (head.children.length) root.append(head);
  const grid = document.createElement('div');
  grid.className = className;
  while (nodes.length) {
    const card = document.createElement('article');
    card.className = 'pb-card pb-feature-item';
    const media = nodes[0]?.querySelector?.('img') ? nodes.shift() : null;
    const heading = nodes.find((n) => n.matches?.('h2, h3'));
    if (heading) nodes.splice(nodes.indexOf(heading), 1);
    const para = nodes.find((n) => n.tagName === 'P' && !n.querySelector('a, img'));
    if (para) nodes.splice(nodes.indexOf(para), 1);
    if (media) card.append(media.querySelector('img') || media);
    if (heading) card.append(heading);
    if (para) card.append(para);
    if (!card.children.length) break;
    grid.append(card);
  }
  root.append(grid);
  block.replaceChildren(root);
}

function decorateValue(block) {
  const nodes = authoredNodes(block);
  const root = wrap();
  const grid = document.createElement('div');
  grid.className = 'pb-value__grid';
  nodes.filter((n) => n.matches?.('h2, p')).slice(0, 2).forEach((node) => {
    if (node.tagName === 'P') node.className = 'pb-value__body';
    grid.append(node);
  });
  root.append(grid);
  block.replaceChildren(root);
}

function decorateTiles(block) {
  const nodes = authoredNodes(block);
  const root = wrap();
  const grid = document.createElement('div');
  grid.className = 'pb-try-tiles__grid';
  for (let i = 0; i < nodes.length; i += 2) {
    const heading = nodes[i];
    const body = nodes[i + 1];
    if (heading?.matches?.('h2, h3')) {
      const card = document.createElement('article');
      card.className = 'pb-card pb-try-tiles__item';
      heading.className = 'pb-try-tiles__title';
      card.append(heading);
      if (body) card.append(body);
      grid.append(card);
    }
  }
  root.append(grid);
  block.replaceChildren(root);
}

function decorateFeatureRows(block) {
  const nodes = authoredNodes(block);
  const root = wrap();
  const stack = document.createElement('div');
  stack.className = 'pb-feature-stack';
  let i = 0;
  while (i < nodes.length) {
    let media = null;
    let heading = null;
    let body = null;
    if (nodes[i]?.querySelector?.('img')) {
      media = nodes[i];
      i += 1;
    }
    if (nodes[i]?.matches?.('h2, h3')) {
      heading = nodes[i];
      i += 1;
    }
    if (nodes[i]?.tagName === 'P' && !nodes[i].querySelector('img, a')) {
      body = nodes[i];
      i += 1;
    }
    if (heading || media) {
      const row = document.createElement('article');
      row.className = 'pb-feature-row';
      const mediaBox = document.createElement('div');
      mediaBox.className = 'pb-feature-row__media';
      const img = media?.querySelector('img');
      if (img) mediaBox.append(img);
      const copy = document.createElement('div');
      copy.className = 'pb-feature-row__copy';
      if (heading) copy.append(heading);
      if (body) copy.append(body);
      row.append(mediaBox, copy);
      stack.append(row);
    } else {
      i += 1;
    }
  }
  root.append(stack);
  block.replaceChildren(root);
}

function decorateToolCrosspromo(block) {
  const sourceGrid = block.querySelector('.pb-tool-crosspromo__grid');
  if (sourceGrid) {
    const sourceWrap = sourceGrid.closest('.wrap') || sourceGrid;
    block.replaceChildren(sourceWrap);
    return;
  }

  const nodes = authoredNodes(block);
  const root = wrap();
  const grid = document.createElement('div');
  grid.className = 'pb-tool-crosspromo__grid';
  nodes.filter((n) => n.matches?.('h2, h3') || n.querySelector?.('a')).forEach((node) => {
    const link = node.querySelector('a') || document.createElement('a');
    const a = document.createElement('a');
    a.className = 'pb-card pb-tool-tile';
    a.href = link.href || '#';
    if (node.matches?.('h2, h3')) {
      link.replaceWith(...link.childNodes);
      a.append(node);
    } else a.textContent = link.textContent;
    grid.append(a);
  });
  root.append(grid);
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
  if (block.classList.contains('listing')) {
    block.classList.add('pb-blog-list');
    decorateListing(block);
  }
  if (block.classList.contains('related')) {
    block.classList.add('pb-stories', 'pb-related');
    decorateRelated(block);
  }
  if (block.classList.contains('value')) {
    decorateValue(block);
  }
  if (block.classList.contains('tiles')) {
    decorateTiles(block);
  }
  if (block.classList.contains('feature-rows')) {
    decorateFeatureRows(block);
  }
  if (block.classList.contains('features')) {
    decorateSimpleGrid(block);
  }
  if (block.classList.contains('tools')) {
    decorateToolCrosspromo(block);
  }
}
