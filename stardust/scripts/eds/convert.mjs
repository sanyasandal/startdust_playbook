import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { JSDOM } from 'jsdom';
import hero from './encoders/hero.mjs';
import logos from './encoders/logos.mjs';
import cards from './encoders/cards.mjs';
import table from './encoders/table.mjs';
import defaultContent from './encoders/default-content.mjs';

const root = process.cwd();
const migratedRoot = path.join(root, 'stardust/migrated');
const reportPath = path.join(root, 'stardust/eds-convert-report.json');
const sourceHost = 'www.playbook.com';
const registry = {
  hero,
  logos,
  cards,
  table,
  defaultContent,
};

function readHtml(file) {
  return fs.readFileSync(path.join(root, file), 'utf8');
}

function ensureDir(file) {
  fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
}

function pagePathFromFile(file) {
  const rel = path.relative(migratedRoot, file).replaceAll(path.sep, '/');
  const page = rel.replace(/\/index\.html$/, '').replace(/^index\.html$/, '');
  return page ? `/${page}` : '/';
}

function contentPathFromPage(pagePath) {
  if (pagePath === '/') return 'content/index.html';
  return `content${pagePath}.html`;
}

function normalizePathname(pathname) {
  let out = pathname.replace(/\/index\.html$/, '').replace(/\.html$/, '');
  out = out.replace(/\/$/, '');
  return out || '/';
}

function migratedSet() {
  const files = fs.readdirSync(migratedRoot, { recursive: true })
    .filter((name) => name.endsWith('/index.html') || name === 'index.html')
    .map((name) => pagePathFromFile(path.join(migratedRoot, name)));
  return new Set(files);
}

const localPages = migratedSet();

function localizeHref(raw, basePage = '/') {
  if (!raw || raw.startsWith('#') || raw.startsWith('mailto:') || raw.startsWith('tel:')) return raw;
  try {
    const url = new URL(raw, `https://${sourceHost}${basePage === '/' ? '/' : `${basePage}/`}`);
    if (url.hostname === sourceHost || url.hostname === 'playbook.com') {
      const normalized = normalizePathname(url.pathname);
      if (localPages.has(normalized)) return `${normalized}${url.search}${url.hash}`;
      if (normalized === '/sign-up') return raw;
    }
    if (raw.startsWith('.') || raw.startsWith('/')) {
      const normalized = normalizePathname(url.pathname);
      if (localPages.has(normalized)) return `${normalized}${url.search}${url.hash}`;
    }
  } catch {
    return raw;
  }
  return raw;
}

function localize(html, basePage = '/') {
  return html.replace(/(^|\s)href="([^"]*)"/g, (match, prefix, href) => (
    `${prefix}href="${localizeHref(href, basePage)}"`
  ));
}

function cleanSectionInner(section, basePage) {
  section.querySelectorAll('script, style').forEach((el) => el.remove());
  section.querySelectorAll('[data-astro-cid-tv6l4wcq]').forEach((el) => {
    el.removeAttribute('data-astro-cid-tv6l4wcq');
  });
  section.querySelectorAll('a[href]').forEach((a) => {
    a.setAttribute('href', localizeHref(a.getAttribute('href'), basePage));
  });
  return localize(section.innerHTML.trim(), basePage)
    .replace(/&amp;lt;([^&<>]{1,80})&amp;gt;/g, '$1')
    .replace(/&amp;lt;|&amp;gt;/g, '')
    .replace(/&lt;([^&<>]{1,80})&gt;/g, '$1')
    .replace(/&lt;|&gt;/g, '')
    .replace(/<\/?div([^>]*)>/g, (match, attrs) => (
      match.startsWith('</') ? '</section>' : `<section${attrs}>`
    ));
}

function createBlock(doc, section, className, basePage) {
  const outer = doc.createElement('div');
  const block = doc.createElement('div');
  block.setAttribute('class', className);
  const row = doc.createElement('div');
  const cell = doc.createElement('div');
  cell.innerHTML = cleanSectionInner(section, basePage);
  row.append(cell);
  block.append(row);
  outer.append(block);
  return outer;
}

function encodeBlogHero(section, ctx) {
  const outer = ctx.doc.createElement('div');
  const block = ctx.doc.createElement('div');
  block.className = 'hero blog';
  const row = ctx.doc.createElement('div');
  const cell = ctx.doc.createElement('div');
  const eyebrow = section.querySelector('.pb-eyebrow, p')?.cloneNode(true);
  const heading = section.querySelector('h1')?.cloneNode(true);
  const filters = ctx.doc.createElement('ul');
  section.querySelectorAll('.pb-filter-row span').forEach((span) => {
    const li = ctx.doc.createElement('li');
    li.textContent = span.textContent.trim();
    filters.append(li);
  });
  [eyebrow, heading, filters].filter(Boolean).forEach((node) => cell.append(node));
  row.append(cell);
  block.append(row);
  outer.append(block);
  return outer;
}

function encodeContact(section, ctx) {
  const outer = ctx.doc.createElement('div');
  const block = ctx.doc.createElement('div');
  block.className = 'contact';
  const row = ctx.doc.createElement('div');
  const cell = ctx.doc.createElement('div');
  const cursor = ctx.doc.createElement('p');
  section.querySelectorAll('.pb-cursor-stack img').forEach((img) => cursor.append(img.cloneNode(true)));
  const links = ctx.doc.createElement('p');
  section.querySelectorAll('.pb-contact-links a').forEach((a) => {
    const clone = a.cloneNode(true);
    clone.setAttribute('href', localizeHref(clone.getAttribute('href'), '/contact'));
    links.append(clone);
  });
  [
    cursor,
    section.querySelector('h1')?.cloneNode(true),
    section.querySelector('.pb-lede')?.cloneNode(true),
    section.querySelector('blockquote')?.cloneNode(true),
    section.querySelector('figcaption')?.cloneNode(true),
    links,
    section.querySelector('.pb-form-card__title')?.cloneNode(true),
  ].filter(Boolean).forEach((node) => cell.append(node));
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

function titleFor(source, pagePath) {
  const h1 = source.window.document.querySelector('main h1')?.textContent.trim();
  if (pagePath === '/') return 'Playbook | Creative asset management for modern teams';
  if (!h1) return 'Playbook | Creative asset management';
  const title = `${h1} | Playbook`;
  return title.length <= 62 ? title : h1;
}

function descriptionFor(source) {
  const meta = source.window.document.querySelector('meta[name="description"]')?.content?.trim();
  if (meta) return meta;
  const p = source.window.document.querySelector('main p:not(:has(a)):not(:empty)')?.textContent.trim();
  return (p || 'Explore Playbook resources, tools, pricing, and creative asset management workflows.')
    .replace(/\s+/g, ' ')
    .slice(0, 160);
}

function defaultStyle(section) {
  const name = section.getAttribute('data-section') || '';
  if (name.includes('hero')) return name.includes('article') ? 'article-hero' : 'page-hero';
  if (name.includes('body') || name.includes('policy')) return 'prose';
  if (section.classList.contains('pb-sibling-hero') || section.classList.contains('pb-legal-hero')) return 'page-hero';
  if (section.classList.contains('pb-article-hero')) return 'article-hero';
  return 'prose';
}

function addStyleMetadata(doc, outer, style) {
  const meta = doc.createElement('div');
  meta.className = 'section-metadata';
  meta.innerHTML = `<div><div>style</div><div>${style}</div></div>`;
  outer.append(meta);
}

function encodeDefault(section, ctx, style) {
  const outer = registry.defaultContent(section, ctx, style);
  addStyleMetadata(ctx.doc, outer, style);
  return outer;
}

function blockFor(section) {
  const module = section.getAttribute('data-module') || '';
  const dataSection = section.getAttribute('data-section') || '';
  const classes = [...section.classList];
  if (module === 'hero' && section.classList.contains('pb-program-hero')) {
    return { name: 'hero program', fn: (s, ctx) => ctx.block(s, 'hero program'), fallback: false };
  }
  if (module === 'hero') return { name: 'hero', fn: (s, ctx) => registry.hero(s, ctx), fallback: false };
  if (module === 'logo-marquee') return { name: 'logos', fn: (s, ctx) => registry.logos(s, ctx), fallback: false };
  if (module === 'product-tabs') return { name: 'cards tabs', fn: (s, ctx) => registry.cards(s, ctx, 'tabs'), fallback: false };
  if (module === 'related-posts') return { name: 'cards related', fn: (s, ctx) => registry.cards(s, ctx, 'related'), fallback: false };
  if (module === 'post-list') return { name: 'cards listing', fn: (s, ctx) => registry.cards(s, ctx, 'listing'), fallback: false };
  if (module === 'pricing-teaser') return { name: 'cards pricing', fn: (s, ctx) => registry.cards(s, ctx, 'pricing'), fallback: false };
  if (module === 'tool-widget') return { name: 'cards tiles', fn: (s, ctx) => registry.cards(s, ctx, 'tiles'), fallback: false };
  if (module === 'feature-grid') return { name: 'cards features', fn: (s, ctx) => registry.cards(s, ctx, 'features'), fallback: false };
  if (module === 'tool-crosspromo' && classes.includes('pb-mcp')) {
    return { name: 'cards mcp', fn: (s, ctx) => registry.cards(s, ctx, 'mcp'), fallback: false };
  }
  if (module === 'tool-crosspromo') return { name: 'cards tools', fn: (s, ctx) => registry.cards(s, ctx, 'tools'), fallback: false };
  if (module === 'faq') return { name: 'accordion', fn: (s, ctx) => ctx.block(s, 'accordion'), fallback: false };
  if (module === 'comparison-table') return { name: 'table comparison', fn: (s, ctx) => registry.table(s, ctx), fallback: false };
  if (module === 'pricing-calculator') return { name: 'pricing-calculator', fn: (s, ctx) => ctx.block(s, 'pricing-calculator'), fallback: false };
  if (module === 'cta-band') return { name: 'default cta-band', fn: (s, ctx) => registry.defaultContent(s, ctx, 'pb-cta-band'), fallback: false };
  if (section.classList.contains('pb-sibling-hero')) return { name: 'hero blog', fn: encodeBlogHero, fallback: false };
  if (dataSection === 'contact-demo') return { name: 'contact', fn: encodeContact, fallback: false };
  if (dataSection === 'value-split') return { name: 'cards value', fn: (s, ctx) => registry.cards(s, ctx, 'value'), fallback: false };
  if (dataSection === 'features') return { name: 'cards feature-rows', fn: (s, ctx) => registry.cards(s, ctx, 'feature-rows'), fallback: false };
  if (classes.includes('pb-feature-stack')) return { name: 'cards feature-rows', fn: (s, ctx) => registry.cards(s, ctx, 'feature-rows'), fallback: false };
  return {
    name: `default ${defaultStyle(section)}`,
    fn: (s, ctx) => encodeDefault(s, ctx, defaultStyle(s)),
    fallback: !['article-hero', 'article-body', 'legal-hero', 'policy-body'].includes(dataSection),
  };
}

// DA turns an inline <table> into a block named by its first row, so emit an explicit
// "Table (article)" name row; category rows keep only their label cell.
function encodeInlineTables(main, doc) {
  main.querySelectorAll('table').forEach((source) => {
    if (source.closest('div.table, div[class^="table "]')) return;
    const rows = [...source.querySelectorAll('tr')];
    if (!rows.length) return;
    const hasHead = !!source.querySelector('thead tr, tr:first-child th');
    const width = Math.max(...rows.map((tr) => tr.children.length));
    const table = doc.createElement('table');
    const tbody = doc.createElement('tbody');
    const nameRow = doc.createElement('tr');
    nameRow.innerHTML = `<td colspan="${width}">Table (article${hasHead ? ', header' : ''})</td>`;
    tbody.append(nameRow);
    rows.forEach((tr) => {
      const out = doc.createElement('tr');
      let cells = [...tr.children];
      if (tr.classList.contains('comp-cat-row')) cells = cells.slice(0, 1);
      cells.forEach((cell) => {
        const td = doc.createElement('td');
        td.innerHTML = cell.innerHTML.trim();
        if (cells.length === 1 && width > 1) td.setAttribute('colspan', String(width));
        out.append(td);
      });
      tbody.append(out);
    });
    table.append(tbody);
    source.replaceWith(table);
  });
}

function encodePage(file) {
  const pagePath = pagePathFromFile(file);
  const source = new JSDOM(fs.readFileSync(file, 'utf8'));
  const out = bodyDoc();
  const main = out.querySelector('main');
  main.append(metadata(out, {
    Title: titleFor(source, pagePath),
    Description: descriptionFor(source),
    template: pagePath === '/' ? 'home' : 'page',
  }));
  const mapped = [];
  const fallbacks = [];
  const ctx = {
    doc: out,
    localize: (html) => localize(html, pagePath),
    block: (section, className) => createBlock(out, section, className, pagePath),
  };
  const directSections = [...source.window.document.querySelectorAll('main > section')];
  const sections = directSections.length
    ? directSections
    : [...source.window.document.querySelectorAll('main .pb-section')];
  sections.forEach((section, index) => {
    const picked = blockFor(section);
    main.append(picked.fn(section, ctx));
    const entry = {
      index: index + 1,
      section: section.getAttribute('data-section') || section.className || `section-${index + 1}`,
      module: section.getAttribute('data-module') || null,
      mappedTo: picked.name,
    };
    mapped.push(entry);
    if (picked.fallback) fallbacks.push(entry);
  });
  encodeInlineTables(main, out);
  const contentPath = contentPathFromPage(pagePath);
  ensureDir(contentPath);
  fs.writeFileSync(path.join(root, contentPath), `${out.body.outerHTML}\n`);
  return { page: pagePath, source: path.relative(root, file), output: contentPath, sections: mapped, fallbacks };
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
  fs.writeFileSync(path.join(root, 'content/nav.html'), `${out.body.outerHTML}\n`);
}

function writeFooter() {
  const out = bodyDoc();
  const main = out.querySelector('main');
  main.append(metadata(out, { Title: 'Footer', Description: 'Footer fragment.', Robots: 'noindex' }));
  const div = out.createElement('div');
  div.innerHTML = `
    <h2>Playbook</h2>
    <p>Creative asset management for modern teams.</p>
    <ul>
      <li><a href="/product">Product</a></li>
      <li><a href="/pricing">Pricing</a></li>
      <li><a href="/blog">Blog</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>
    <p>
      <a href="https://twitter.com/playbook">Twitter</a>
      <a href="https://www.instagram.com/playbook">Instagram</a>
      <a href="https://www.linkedin.com/company/playbook-com/">LinkedIn</a>
    </p>
    <p>© Playbook Digital, Inc. <a href="/p/privacy">Privacy</a> <a href="/p/terms">Terms</a></p>`;
  main.append(div);
  fs.writeFileSync(path.join(root, 'content/footer.html'), `${out.body.outerHTML}\n`);
}

function runLint(contentPath) {
  const lintScript = '/Users/ssandal/.copilot/installed-plugins/adobe-skills/stardust/skills/deploy/scripts/davids-model-lint.mjs';
  if (!fs.existsSync(lintScript)) return { status: 'skipped', red: null, output: 'lint script unavailable' };
  const result = spawnSync(process.execPath, [lintScript, contentPath], {
    cwd: root,
    encoding: 'utf8',
  });
  const output = `${result.stdout || ''}${result.stderr || ''}`.trim();
  const redMatch = output.match(/(\d+)\s*🔴/u);
  return {
    status: result.status === 0 ? 'pass' : 'fail',
    red: redMatch ? Number(redMatch[1]) : null,
    output: output.split('\n').slice(-8).join('\n'),
  };
}

function main() {
  const args = process.argv.slice(2);
  const all = args.includes('--all');
  const target = args.find((arg) => !arg.startsWith('--'));
  const files = all || !target
    ? fs.readdirSync(migratedRoot, { recursive: true })
      .filter((name) => name.endsWith('/index.html') || name === 'index.html')
      .map((name) => path.join(migratedRoot, name))
      .sort()
    : [path.join(migratedRoot, target.replace(/^\/+/, ''), 'index.html')];
  const pages = files.map(encodePage);
  writeNav();
  writeFooter();
  pages.forEach((page) => { page.lint = runLint(page.output); });
  const summary = {
    generatedAt: new Date().toISOString(),
    pageCount: pages.length,
    lintClean: pages.filter((page) => page.lint.status === 'pass').length,
    fallbackCount: pages.reduce((sum, page) => sum + page.fallbacks.length, 0),
  };
  fs.writeFileSync(reportPath, `${JSON.stringify({ summary, pages }, null, 2)}\n`);
  console.log(JSON.stringify(summary, null, 2));
}

main();
