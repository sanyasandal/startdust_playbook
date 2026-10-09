export default function decorate(block) {
  const rows = [...block.children];
  const headingRow = rows.find((row) => row.querySelector('h1, h2, h3, h4, h5, h6'));
  const heading = headingRow?.querySelector('h1, h2, h3, h4, h5, h6');
  const gallery = document.createElement('div');
  gallery.className = 'discovery-social-gallery';
  gallery.setAttribute('role', 'region');
  gallery.setAttribute('aria-label', heading?.textContent.trim() || 'Social images');
  gallery.tabIndex = 0;

  const list = document.createElement('ul');
  list.className = 'discovery-social-list';
  rows.filter((row) => row !== headingRow).forEach((row) => {
    const media = row.querySelector('picture') || row.querySelector('img');
    const item = document.createElement('li');
    item.className = 'discovery-social-item';
    if (media) item.append(media);
    [...row.children].forEach((cell) => {
      if (cell.textContent.trim()) item.append(...cell.childNodes);
    });
    if (item.childNodes.length) list.append(item);
  });
  gallery.append(list);
  block.replaceChildren(...(heading ? [heading] : []), gallery);
}
