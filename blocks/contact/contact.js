function authoredNodes(block) {
  const nodes = [...block.querySelectorAll(':scope > div > div > *')];
  return nodes.length ? nodes : [...block.children];
}

export default function decorate(block) {
  const wrap = document.createElement('div');
  wrap.className = 'wrap pb-contact-hero__grid';
  wrap.append(...authoredNodes(block));
  block.classList.add('pb-section', 'pb-contact-hero');
  block.replaceChildren(wrap);
}
