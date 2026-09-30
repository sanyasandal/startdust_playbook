import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

function section(fragment, index) {
  return fragment?.querySelectorAll(':scope > .section')[index] || null;
}

function moveChildren(from, to) {
  if (!from) return;
  [...from.querySelectorAll('.default-content-wrapper, div')][0]?.childNodes.forEach(() => {});
  while (from.firstChild) to.append(from.firstChild);
}

export default async function decorate(block) {
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(navPath);
  const brandSource = section(fragment, 1)?.querySelector('.default-content-wrapper')
    || section(fragment, 1) || fragment;
  const linkSource = section(fragment, 2)?.querySelector('.default-content-wrapper')
    || section(fragment, 2) || fragment;
  const actionSource = section(fragment, 3)?.querySelector('.default-content-wrapper')
    || section(fragment, 3) || fragment;

  const root = document.createElement('div');
  root.className = 'pb-header';
  const inner = document.createElement('div');
  inner.className = 'wrap pb-header__inner';
  const brand = document.createElement('div');
  brand.className = 'pb-header__brand';
  moveChildren(brandSource, brand);
  const button = document.createElement('button');
  button.className = 'pb-nav-burger';
  button.type = 'button';
  button.setAttribute('aria-expanded', 'false');
  button.innerHTML = '<span class="pb-nav-burger__icon" aria-hidden="true"></span><span>Menu</span>';
  const nav = document.createElement('nav');
  nav.className = 'pb-nav';
  nav.id = 'pb-main-nav';
  nav.setAttribute('aria-label', 'Main');
  moveChildren(linkSource, nav);
  const actions = document.createElement('div');
  actions.className = 'pb-header__actions';
  moveChildren(actionSource, actions);
  inner.append(brand, button, nav, actions);
  root.append(inner);
  block.replaceChildren(root);
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
    root.classList.toggle('is-open', !expanded);
  });
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      button.setAttribute('aria-expanded', 'false');
      root.classList.remove('is-open');
    }
  });
}
