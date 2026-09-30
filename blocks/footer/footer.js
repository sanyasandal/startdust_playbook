import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

export default async function decorate(block) {
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);
  const root = document.createElement('div');
  root.className = 'pb-footer';
  const wrap = document.createElement('div');
  wrap.className = 'wrap';
  fragment?.querySelectorAll('.section').forEach((sec) => {
    const wrapper = sec.querySelector('.default-content-wrapper') || sec;
    while (wrapper.firstChild) wrap.append(wrapper.firstChild);
  });
  root.append(wrap);
  block.replaceChildren(root);
}
