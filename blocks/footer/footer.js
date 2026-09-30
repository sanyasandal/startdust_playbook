const footerGroups = [
  ['Product', [
    ['Digital asset management', '/features'],
    ['Playbook Intelligence', '/launch'],
    ['MCP for creative teams', '/mcp'],
    ['Developer API', 'https://dev.playbook.com/docs/getting_started/'],
    ['Tools and integrations', '/integrations-all'],
    ['Pricing', '/pricing'],
  ]],
  ['Playbook for', [
    ['Enterprise', '/enterprise'],
    ['Media and entertainment', '/media-and-entertainment'],
    ['Creative agencies', '/creative-agency'],
    ['Consumer brands', '/consumer-brands'],
    ['Game studios', '/games'],
  ]],
  ['Resources', [
    ['Blog', '/blog'],
    ['Customer stories', '/customers'],
    ['Help center', '/tutorial'],
    ['Discord community', 'https://discord.com/invite/MKpZvuvqg3'],
    ['For students', '/school'],
  ]],
  ['Company', [
    ['About us', '/about-us'],
    ['Story of Playbook', '/the-story-of-playbook'],
    ['Contact us', '/contact'],
  ]],
];

const comparisons = [
  ['Playbook vs Plytix', 'https://www.playbook.com/blog/best-plytix-alternatives-for-cpg-teams/'],
  ['Playbook vs Air', 'https://www.playbook.com/blog/best-air-alternative-for-digital-asset-management/'],
  ['Playbook vs Tagbox', 'https://www.playbook.com/blog/best-tagbox-alternative-for-digital-asset-management/'],
  ['Playbook vs Dropbox', 'https://www.playbook.com/blog/best-dropbox-alternative-for-creative-teams/'],
  ['Playbook vs Google Drive', 'https://www.playbook.com/blog/best-google-drive-alternative-for-creative-teams/'],
];

function link(label, href) {
  const a = document.createElement('a');
  a.href = href;
  a.textContent = label;
  return a;
}

function wordmark() {
  const a = link('Playbook', '/');
  a.className = 'pb-wordmark';
  a.innerHTML = '<span class="pb-wordmark__mark" aria-hidden="true">P</span><span>Playbook</span>';
  return a;
}

export default async function decorate(block) {
  const root = document.createElement('div');
  root.className = 'pb-footer';
  const wrap = document.createElement('div');
  wrap.className = 'wrap';
  const top = document.createElement('div');
  top.className = 'pb-footer__top';
  const brand = document.createElement('div');
  brand.className = 'pb-footer__brand';
  brand.append(wordmark());
  const social = document.createElement('div');
  social.className = 'pb-footer__social';
  social.setAttribute('aria-label', 'Social links');
  [['Twitter', 'https://www.twitter.com/playbook_hq'], ['Instagram', 'https://www.instagram.com/playbook_hq'], ['LinkedIn', 'https://www.linkedin.com/company/playbook-hq']]
    .forEach(([label, href]) => social.append(link(label, href)));
  brand.append(social);
  const grid = document.createElement('div');
  grid.className = 'pb-footer__grid';
  footerGroups.forEach(([title, items]) => {
    const col = document.createElement('div');
    col.className = 'pb-footer__col';
    const h3 = document.createElement('h3');
    h3.textContent = title;
    const ul = document.createElement('ul');
    items.forEach(([label, href]) => {
      const li = document.createElement('li');
      li.append(link(label, href));
      ul.append(li);
    });
    col.append(h3, ul);
    grid.append(col);
  });
  top.append(brand, grid);
  const compare = document.createElement('nav');
  compare.className = 'pb-footer__compare';
  compare.setAttribute('aria-label', 'Product comparisons');
  comparisons.forEach(([label, href]) => compare.append(link(label, href)));
  const legal = document.createElement('div');
  legal.className = 'pb-footer__legal';
  const copy = document.createElement('span');
  copy.textContent = '© 2026 Playbook Digital, Inc. All rights reserved.';
  const legalNav = document.createElement('nav');
  legalNav.setAttribute('aria-label', 'Legal');
  [['Privacy', '/p/privacy'], ['Terms', '/p/terms'], ['Consent Preferences', '#'], ['Platform Status', 'https://status.playbook.com']]
    .forEach(([label, href]) => legalNav.append(link(label, href)));
  legal.append(copy, legalNav);
  wrap.append(top, compare, legal);
  root.append(wrap);
  block.replaceChildren(root);
}
