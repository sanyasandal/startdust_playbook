/**
 * @ew-exempt all — pricing/comparison tables preserve migrated table markup and
 * interactive comparison controls as no-JS fallback rows.
 */
function authoredNodes(block) {
  const nodes = [...block.querySelectorAll(':scope > div > div > *')];
  return nodes.length ? nodes : [...block.children];
}

function addButtonClasses(container) {
  container?.querySelectorAll('a').forEach((a) => a.classList.add('pb-button', 'pb-button--secondary'));
}

function decorateDataTable(block, nodes) {
  const root = document.createElement('div');
  root.className = 'wrap pb-compare-wrap';
  const head = document.createElement('div');
  head.className = 'pb-section__head';
  head.dataset.align = 'center';
  const heading = nodes.find((node) => node.matches?.('h2, h3'));
  if (heading) head.append(heading);
  const billing = document.createElement('div');
  billing.className = 'pb-pricing-toggle-static';
  billing.innerHTML = '<span>Monthly</span><strong>Yearly</strong>';
  head.append(billing);
  root.append(head);
  const table = nodes.find((node) => node.matches?.('table'));
  if (table) {
    table.className = 'pb-compare';
    table.querySelectorAll('tbody tr').forEach((tr) => {
      if (tr.children.length === 1 || tr.firstElementChild?.colSpan > 1) tr.className = 'pb-compare__section';
    });
    const scroll = document.createElement('div');
    scroll.className = 'pb-compare__scroll';
    scroll.append(table);
    root.append(scroll);
  }
  block.replaceChildren(root);
}

function decorateAddons(block, nodes) {
  const root = document.createElement('div');
  root.className = 'wrap';
  const exp = document.createElement('article');
  exp.className = 'pb-card pb-export';
  const copy = document.createElement('div');
  const eyebrow = nodes.find((node) => node.tagName === 'P' && /Add-ons/i.test(node.textContent));
  const heading = nodes.find((node) => node.matches?.('h2, h3'));
  const body = nodes.find((node) => (
    node.tagName === 'P' && !node.querySelector('a') && !/Add-ons/i.test(node.textContent)
  ));
  const cta = nodes.find((node) => node.querySelector?.('a'));
  if (eyebrow) {
    eyebrow.className = 'pb-eyebrow';
    copy.append(eyebrow);
  }
  if (heading) copy.append(heading);
  if (body) copy.append(body);
  if (cta) {
    addButtonClasses(cta);
    copy.append(cta);
  }
  const list = nodes.find((node) => node.tagName === 'UL');
  if (list) list.className = 'pb-chip-list';
  exp.append(copy);
  if (list) exp.append(list);
  root.append(exp);
  block.replaceChildren(root);
}

function decorateArticleTable(block) {
  const rows = [...block.children];
  const width = Math.max(...rows.map((row) => row.children.length));
  const table = document.createElement('table');
  const hasHead = block.classList.contains('header') && rows.length > 1;
  if (hasHead) {
    const thead = table.createTHead();
    const tr = thead.insertRow();
    [...rows.shift().children].forEach((cell) => {
      const th = document.createElement('th');
      th.scope = 'col';
      th.append(...cell.childNodes);
      tr.append(th);
    });
  }
  const tbody = table.createTBody();
  rows.forEach((row) => {
    const tr = tbody.insertRow();
    const cells = [...row.children];
    if (cells.length === 1 && width > 1) tr.className = 'table-article-group';
    cells.forEach((cell) => {
      const td = tr.insertCell();
      if (cells.length === 1 && width > 1) td.colSpan = width;
      td.append(...cell.childNodes);
    });
  });
  const scroll = document.createElement('div');
  scroll.className = 'table-article-scroll';
  scroll.append(table);
  block.replaceChildren(scroll);
}

export default function decorate(block) {
  if (block.classList.contains('article')) {
    decorateArticleTable(block);
    return;
  }
  const sourceCompare = block.querySelector('.pb-compare-wrap, .pb-compare__scroll');
  if (sourceCompare) {
    const sourceWrap = sourceCompare.closest('.wrap') || sourceCompare;
    block.replaceChildren(sourceWrap);
    return;
  }

  const nodes = authoredNodes(block);
  if (nodes.some((node) => node.matches?.('table'))) {
    decorateDataTable(block, nodes);
    return;
  }
  if (block.classList.contains('comparison')) {
    decorateAddons(block, nodes);
    return;
  }
  const root = document.createElement('div');
  root.className = 'wrap';
  const head = document.createElement('div');
  head.className = 'pb-section__head';
  const eyebrow = nodes.shift(); const h2 = nodes.shift(); const lede = nodes.shift();
  if (eyebrow) { eyebrow.className = 'pb-eyebrow'; head.append(eyebrow); }
  if (h2) head.append(h2);
  if (lede) { lede.className = 'pb-lede'; head.append(lede); }
  root.append(head);
  const grid = document.createElement('div'); grid.className = 'pb-enterprise__grid';
  for (let i = 0; i < 2; i += 1) {
    const card = document.createElement('article');
    card.className = i === 1 ? 'pb-card pb-compare-card pb-compare-card--dark' : 'pb-card pb-compare-card';
    const title = nodes.shift();
    const list = nodes.shift();
    if (list) list.className = i === 0 ? 'pb-chip-list' : 'pb-strike-list';
    card.append(title, list);
    if (i === 1 && nodes[0]?.textContent.includes('controls')) card.append(nodes.shift());
    grid.append(card);
  }
  root.append(grid);
  const exp = document.createElement('article'); exp.className = 'pb-export';
  const copy = document.createElement('div');
  const kicker = nodes.shift();
  if (kicker) kicker.className = 'pb-eyebrow';
  copy.append(kicker, nodes.shift(), nodes.shift());
  const cta = nodes.shift(); if (cta) { addButtonClasses(cta); copy.append(cta); }
  const panel = document.createElement('div'); panel.className = 'pb-export__panel';
  const label = nodes.shift(); const stat = nodes.shift(); const foot = nodes.shift();
  if (stat) stat.className = 'pb-export__stat';
  panel.append(label, stat, foot);
  exp.append(copy, panel); root.append(exp);
  block.classList.add('pb-section', 'pb-enterprise');
  block.replaceChildren(root);
}
