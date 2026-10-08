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
  const sourceShell = block.querySelector('.pb-pricing-calculator__shell');
  if (sourceShell) {
    block.replaceChildren(sourceShell);
    block.querySelectorAll('input').forEach((field) => {
      field.addEventListener('input', () => updateTotal(block));
    });
    return;
  }

  const nodes = authoredNodes(block);
  const wrap = document.createElement('div');
  wrap.className = 'wrap pb-pricing-calculator__shell';
  const head = document.createElement('div');
  head.className = 'pb-section__head';
  const heading = nodes.find((node) => node.matches?.('h2'));
  const lede = nodes.find((node) => (
    node.tagName === 'P' && /Tell us/i.test(node.textContent)
  ));
  if (heading) head.append(heading);
  if (lede) {
    lede.className = 'pb-lede';
    head.append(lede);
  }

  const calc = document.createElement('div');
  calc.className = 'pb-calc';
  const input = document.createElement('div');
  input.className = 'pb-calc__in';
  const title = document.createElement('p');
  title.className = 'pb-calc__needs-title';
  title.textContent = 'Which features matter most to you?';
  const features = nodes.find((node) => node.tagName === 'UL');
  if (features) {
    features.className = 'pb-calc__need-list';
    [...features.children].forEach((li) => {
      li.className = 'pb-calc__need';
      const checked = li.textContent.includes('[x]');
      li.textContent = li.textContent.replace(/\[[ x]\]/i, '').trim();
      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.checked = checked;
      li.prepend(cb);
    });
  }
  input.innerHTML = '<div class="pb-calc__sliders">'
    + '<label class="pb-slider"><span class="pb-slider__label">How many members?</span>'
    + '<input class="pb-slider__input" type="range" min="1" max="50" value="3"></label>'
    + '<label class="pb-slider"><span class="pb-slider__label">How much storage?</span>'
    + '<input class="pb-slider__input" type="range" min="1" max="15" value="2"></label></div>';
  input.append(title);
  if (features) input.append(features);

  const out = document.createElement('div');
  out.className = 'pb-calc__out';
  out.innerHTML = '<div class="pb-calc__verdict"><p class="pb-calc__eyebrow">Your best fit</p>'
    + '<p class="pb-calc__plan">Team</p><p class="pb-calc__billing">Billed yearly — save 20%</p>'
    + '<p class="pb-calc__amount pb-calc-total">$60/mo</p></div>';
  const cta = nodes.find((node) => node.querySelector?.('a'));
  if (cta) {
    cta.querySelectorAll('a').forEach((a) => a.classList.add('pb-button', 'pb-button--primary'));
    out.append(cta);
  }
  calc.append(input, out);
  wrap.append(head, calc);
  block.replaceChildren(wrap);
  block.querySelectorAll('input').forEach((field) => {
    field.addEventListener('input', () => updateTotal(block));
  });
  updateTotal(block);
}
