/**
 * @ew-exempt all — accordion currently preserves migrated details as a
 * no-JS fallback inside one generated wrapper; row-level FAQ authoring can
 * remove this exemption in a later hardening pass.
 */
function authoredNodes(block) {
  const nodes = [...block.querySelectorAll(':scope > div > div > *')];
  return nodes.length ? nodes : [...block.children];
}

export default function decorate(block) {
  const wrap = document.createElement('div');
  wrap.className = 'wrap pb-faq__list';
  const details = [...block.querySelectorAll('details')];
  if (details.length) {
    wrap.append(...details);
  } else {
    const nodes = authoredNodes(block).filter((node) => node.textContent.trim());
    for (let i = 0; i < nodes.length; i += 2) {
      const item = document.createElement('details');
      const summary = document.createElement('summary');
      summary.textContent = nodes[i]?.textContent.trim() || '';
      const answer = nodes[i + 1];
      item.append(summary);
      if (answer) item.append(answer);
      wrap.append(item);
    }
  }
  block.classList.add('pb-section', 'pb-faq');
  block.replaceChildren(wrap);
}
