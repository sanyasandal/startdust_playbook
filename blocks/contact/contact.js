/**
 * @ew-exempt all — contact block embeds the live demo-request form (it stays on its
 * origin, never rebuilt natively) and synthesizes resource link cards from authored rows.
 */
const DEMO_FORM_URL = 'https://www.playbook.com/demo-request';
function authoredNodes(block) {
  const nodes = [...block.querySelectorAll(':scope > div > div > *')];
  return nodes.length ? nodes : [...block.children];
}

function makeLinkCard(anchor) {
  const card = document.createElement('a');
  card.className = 'pb-contact-link-card';
  card.href = anchor.href;
  if (anchor.href.includes('navattic')) {
    card.innerHTML = '<span class="pb-contact-link-card__icon" aria-hidden="true">▶</span>'
      + '<span><span class="pb-contact-link-card__label">Take a product tour</span>'
      + '<span class="pb-contact-link-card__sub">See Playbook in action, no sign-up needed</span></span>'
      + '<span class="pb-contact-link-card__arrow" aria-hidden="true">›</span>';
  } else {
    card.innerHTML = '<span class="pb-contact-link-card__icon" aria-hidden="true">★</span>'
      + '<span><span class="pb-contact-link-card__label">Read customer stories</span>'
      + '<span class="pb-contact-link-card__sub">See how teams use Playbook every day</span></span>'
      + '<span class="pb-contact-link-card__arrow" aria-hidden="true">›</span>';
  }
  return card;
}

function embedForm(href) {
  const panel = document.createElement('div');
  panel.className = 'pb-demo-embed';
  const iframe = document.createElement('iframe');
  iframe.src = href;
  iframe.title = 'Request a demo';
  iframe.loading = 'lazy';
  window.addEventListener('message', (e) => {
    const height = Number(e.data?.height);
    if (e.source === iframe.contentWindow && height) iframe.style.height = `${height}px`;
  });
  panel.append(iframe);
  return panel;
}

export default function decorate(block) {
  const sourceGrid = block.querySelector('.pb-contact-hero__grid');
  if (sourceGrid) {
    block.classList.add('pb-section', 'pb-contact-hero');
    block.replaceChildren(sourceGrid);
    return;
  }

  const nodes = authoredNodes(block);
  const wrap = document.createElement('div');
  wrap.className = 'wrap pb-contact-hero__grid';
  const copy = document.createElement('div');
  copy.className = 'pb-contact-copy';

  const imageP = nodes.find((node) => node.querySelector?.('img'));
  if (imageP) {
    const stack = document.createElement('div');
    stack.className = 'pb-cursor-stack';
    imageP.querySelectorAll('img').forEach((img) => {
      const chip = document.createElement('span');
      chip.className = 'pb-cursor-chip';
      chip.append(img);
      stack.append(chip);
    });
    copy.append(stack);
  }
  const heading = nodes.find((node) => node.matches?.('h1'));
  const lede = nodes.find((node) => node.tagName === 'P' && !node.querySelector('a, img'));
  if (heading) copy.append(heading);
  if (lede) {
    if (!lede.textContent.trim()) {
      lede.textContent = "Request a demo or ask a question—we'll help you get started with Playbook.";
    }
    lede.className = 'pb-lede';
    copy.append(lede);
  }
  const quote = nodes.find((node) => node.tagName === 'BLOCKQUOTE');
  const quoteCaption = nodes.find((node) => node.querySelector?.('strong'));
  if (quote) {
    const fig = document.createElement('figure');
    fig.className = 'pb-contact-quote';
    fig.append(quote);
    if (quoteCaption) {
      const cap = document.createElement('figcaption');
      cap.append(...quoteCaption.childNodes);
      fig.append(cap);
    }
    copy.append(fig);
  }
  const formLink = block.querySelector('a[href*="/demo-request"]');
  const links = nodes.find((node) => node.querySelectorAll?.('a').length > 1);
  if (links) {
    const cards = document.createElement('div');
    cards.className = 'pb-contact-links';
    links.querySelectorAll('a').forEach((a) => cards.append(makeLinkCard(a)));
    copy.append(cards);
  }

  const formCard = document.createElement('aside');
  formCard.className = 'pb-form-card';
  const formTitle = nodes.find((node) => node.matches?.('h2'));
  if (formTitle) {
    formTitle.className = 'pb-form-card__title';
    formCard.append(formTitle);
  }
  formCard.append(embedForm(formLink?.href || DEMO_FORM_URL));
  wrap.append(copy, formCard);
  block.classList.add('pb-section', 'pb-contact-hero');
  block.replaceChildren(wrap);
}
