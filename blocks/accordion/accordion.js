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
  wrap.append(...authoredNodes(block).filter((node) => node.tagName === 'DETAILS'));
  block.classList.add('pb-section', 'pb-faq');
  block.replaceChildren(wrap);
}
