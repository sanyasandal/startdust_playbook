import fs from 'node:fs';
import path from 'node:path';
import { JSDOM } from 'jsdom';
import hero from './encoders/hero.mjs';
import logos from './encoders/logos.mjs';
import cards from './encoders/cards.mjs';
import table from './encoders/table.mjs';
import defaultContent from './encoders/default-content.mjs';

const root = process.cwd();
const sourceHost = 'www.playbook.com';
const registry = { hero, logos, cards, table, defaultContent };

function readHtml(file) {
  return fs.readFileSync(path.join(root, file), 'utf8');
}

function ensureDir(file) {
  fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
}

function normalizePathname(pathname) {
  let out = pathname.replace(/\/index\.html$/, '').replace(/\.html$/, '');
  out = out.replace(/\/$/, '');
  return out || '/';
}

function localize(html) {
  return html
    .replaceAll('href="./index.html"', 'href="/"')
    .replace(/href="\.\/([^"#?]+?)\/index\.html([#?][^"]*)?"/g, (m, p, q = '') => 'href="/' + p + q + '"')
    .replace(/href="https:\/\/www\.playbook\.com\/([^"#?]*?)\/?([#?][^"]*)?"/g, (m, p, q = '') => {
      if (!p || p === 'sign-up') return m;
      return 'href="' + normalizePathname('/' + p) + (q || '') + '"';
    });
}

function cleanSectionInner(section) {
  section.querySelectorAll('script, style').forEach((el) => el.remove());
  return localize(section.innerHTML.trim()).replace(/<\/?div([^>]*)>/g, (m, attrs) => m.startsWith('</') ? '</section>' : '<section' + attrs + '>');
}

function createBlock(doc, section, className) {
  const outer = doc.createElement('div');
  const block = doc.createElement('div');
  block.setAttribute('class', className);
  const row = doc.createElement('div');
  const cell = doc.createElement('div');
  cell.innerHTML = cleanSectionInner(section);
  row.append(cell);
  block.append(row);
  outer.append(block);
  return outer;
}

function metadata(doc, extra = {}) {
  const outer = doc.createElement('div');
  const block = doc.createElement('div');
  block.className = 'metadata';
  const entries = {
    Title: extra.Title || 'Playbook | Creative asset management for modern teams',
    Description: extra.Description || 'Store, search, review, and share every creative asset in one secure visual library built for teams and AI workflows.',
    template: extra.template || 'landing',
    ...extra,
  };
  Object.entries(entries).forEach(([key, value]) => {
    const row = doc.createElement('div');
    const k = doc.createElement('div');
    const v = doc.createElement('div');
    k.textContent = key;
    v.textContent = value;
    row.append(k, v);
    block.append(row);
  });
  outer.append(block);
  return outer;
}

function bodyDoc() {
  const dom = new JSDOM('<body><header></header><main></main><footer></footer></body>');
  return dom.window.document;
}

function encodeHome() {
  const source = new JSDOM(readHtml('stardust/migrated/index.html'));
  const out = bodyDoc();
  const main = out.querySelector('main');
  main.append(metadata(out, {
    Title: 'Playbook | Creative asset management for modern teams',
    Description: 'Store, search, review, and share photos, videos, design files, and brand assets in one secure, AI-ready visual library.',
  }));
  const ctx = { doc: out, localize, block: (section, className) => createBlock(out, section, className) };
  source.window.document.querySelectorAll('main > section').forEach((section) => {
    const module = section.getAttribute('data-module') || '';
    let encoded;
    if (module === 'hero') encoded = registry.hero(section, ctx);
    else if (module === 'logo-marquee') encoded = registry.logos(section, ctx);
    else if (module === 'product-tabs') encoded = registry.cards(section, ctx, 'tabs');
    else if (module === 'tool-crosspromo') encoded = registry.cards(section, ctx, 'mcp');
    else if (module === 'comparison-table') encoded = registry.table(section, ctx);
    else if (module === 'related-posts') encoded = registry.cards(section, ctx, 'posts');
    else if (module === 'pricing-teaser') encoded = registry.cards(section, ctx, 'pricing');
    else if (module === 'cta-band') encoded = registry.defaultContent(section, ctx, 'pb-cta-band');
    else encoded = registry.defaultContent(section, ctx, 'prose');
    main.append(encoded);
  });
  ensureDir('content/index.html');
  fs.writeFileSync(path.join(root, 'content/index.html'), out.body.outerHTML + '\n');
}

function writeNav() {
  const out = bodyDoc();
  const main = out.querySelector('main');
  main.append(metadata(out, { Title: 'Navigation', Description: 'Navigation fragment.', Robots: 'noindex' }));
  const brand = out.createElement('div');
  brand.innerHTML = '<p><a class="pb-wordmark" href="/"><span class="pb-wordmark__mark" aria-hidden="true">P</span><span>Playbook</span></a></p>';
  main.append(brand);
  const links = out.createElement('div');
  links.innerHTML = '<p><a href="/product">Product</a></p><p><a href="/sdk">API &amp; SDK</a></p><p><a href="/enterprise">Solutions</a></p><p><a href="/blog">Resources</a></p><p><a href="/pricing">Pricing</a></p>';
  main.append(links);
  const actions = out.createElement('div');
  actions.innerHTML = '<p><em><a href="/contact">Book a demo</a></em></p><p><strong><a href="https://www.playbook.com/sign-up/">Start free</a></strong></p>';
  main.append(actions);
  fs.writeFileSync(path.join(root, 'content/nav.html'), out.body.outerHTML + '\n');
}

function writeFooter() {
  const source = new JSDOM(readHtml('stardust/canon/footer.html'));
  const footer = source.window.document.querySelector('footer');
  const out = bodyDoc();
  const main = out.querySelector('main');
  main.append(metadata(out, { Title: 'Footer', Description: 'Footer fragment.', Robots: 'noindex' }));
  const div = out.createElement('div');
  div.innerHTML = localize(footer.innerHTML);
  main.append(div);
  fs.writeFileSync(path.join(root, 'content/footer.html'), out.body.outerHTML + '\n');
}

function main() {
  const args = process.argv.slice(2);
  if (!args.length || args.includes('--all') || args.includes('index')) {
    encodeHome();
    writeNav();
    writeFooter();
  }
}

main();
