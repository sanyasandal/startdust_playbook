function authoredNodes(block) {
  const nodes = [...block.querySelectorAll(':scope > div > div > *')];
  return nodes.length ? nodes : [...block.children];
}

function updateTotal(block) {
  const checked = block.querySelectorAll('input[type="checkbox"]:checked').length;
  const members = Number(block.querySelector('input[type="range"]')?.value || 1);
  const total = block.querySelector('.pb-calc-total, [data-total]');
  if (total) total.textContent = `$${10 * Math.max(1, members) + checked * 15}/mo`;
}

export default function decorate(block) {
  const wrap = document.createElement('div');
  wrap.className = 'wrap pb-pricing-calculator__shell';
  wrap.append(...authoredNodes(block));
  block.replaceChildren(wrap);
  block.querySelectorAll('input').forEach((input) => input.addEventListener('input', () => updateTotal(block)));
  updateTotal(block);
}
