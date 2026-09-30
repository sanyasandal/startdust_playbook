export default function encode(section, ctx, wrapperClass) {
  const div = ctx.doc.createElement('div');
  if (wrapperClass === 'pb-cta-band') {
    const heading = section.querySelector('h2')?.cloneNode(true);
    const p = ctx.doc.createElement('p');
    const links = [...section.querySelectorAll('a')];
    links.forEach((link, i) => {
      const a = ctx.doc.createElement('a');
      const rawHref = link.getAttribute('href') || '#';
      a.href = ctx.localize('href="' + rawHref + '"').replace(/^href="|"$/g, '');
      a.textContent = link.textContent;
      const mark = ctx.doc.createElement(i === 0 ? 'strong' : 'em');
      mark.append(a);
      p.append(mark, ctx.doc.createTextNode(' '));
    });
    const meta = ctx.doc.createElement('div');
    meta.className = 'section-metadata';
    meta.innerHTML = '<div><div>style</div><div>cta-band</div></div>';
    if (heading) div.append(heading);
    div.append(p, meta);
    return div;
  }
  const wrap = ctx.doc.createElement('section');
  wrap.className = wrapperClass;
  wrap.innerHTML = ctx.localize(section.innerHTML)
    .replace(/&amp;lt;([^&<>]{1,80})&amp;gt;/g, '$1')
    .replace(/&amp;lt;|&amp;gt;/g, '')
    .replace(/&lt;([^&<>]{1,80})&gt;/g, '$1')
    .replace(/&lt;|&gt;/g, '')
    .replace(/<\/?div([^>]*)>/g, (match, attrs) => (match.startsWith('</') ? '</section>' : '<section' + attrs + '>'));
  div.append(wrap);
  return div;
}
