/**
 * @ew-exempt all — foundation encoder keeps migrated section as no-JS fallback;
 * later per-row encoders will remove this exemption while preserving pixels.
 */
function stripInstrumentation(el) {
  el.querySelectorAll('[data-prose-index], [data-image-index]').forEach((n) => {
    n.removeAttribute('data-prose-index');
    n.removeAttribute('data-image-index');
  });
  return el;
}

export default function decorate(block) {
  const title = block.querySelector('p:not(:has(img))');
  const imgs = [...block.querySelectorAll('img')];
  const frame = document.createElement('div');
  frame.className = 'pb-logo-marquee__frame';
  if (title) { title.className = 'pb-logo-marquee__title'; frame.append(title); }
  const track = document.createElement('div');
  track.className = 'pb-logo-marquee__track';
  const set = document.createElement('div');
  set.className = 'pb-logo-marquee__set';
  imgs.forEach((img) => { const span = document.createElement('span'); span.className = 'pb-logo-marquee__item'; span.append(img); set.append(span); });
  const clone = stripInstrumentation(set.cloneNode(true));
  clone.setAttribute('aria-hidden', 'true');
  track.append(set, clone);
  frame.append(track);
  block.classList.add('pb-section', 'pb-logo-marquee');
  block.replaceChildren(frame);
}
