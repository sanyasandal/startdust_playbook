function authoredNodes(block) {
  const nodes = [...block.querySelectorAll(':scope > div > div > *')];
  return nodes.length ? nodes : [...block.children];
}

function addButtonClasses(container) {
  container?.querySelectorAll('a').forEach((a) => a.classList.add('pb-button', 'pb-button--secondary'));
}

export default function decorate(block) {
  const nodes = authoredNodes(block);
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
    card.append(nodes.shift(), nodes.shift());
    if (i === 1 && nodes[0]?.textContent.includes('controls')) card.append(nodes.shift());
    grid.append(card);
  }
  root.append(grid);
  const exp = document.createElement('article'); exp.className = 'pb-export';
  const copy = document.createElement('div');
  copy.append(nodes.shift(), nodes.shift(), nodes.shift());
  const cta = nodes.shift(); if (cta) { addButtonClasses(cta); copy.append(cta); }
  const panel = document.createElement('div'); panel.className = 'pb-export__panel';
  const label = nodes.shift(); const stat = nodes.shift(); const foot = nodes.shift();
  if (stat) stat.className = 'pb-export__stat';
  panel.append(label, stat, foot);
  exp.append(copy, panel); root.append(exp);
  block.classList.add('pb-section', 'pb-enterprise');
  block.replaceChildren(root);
}
