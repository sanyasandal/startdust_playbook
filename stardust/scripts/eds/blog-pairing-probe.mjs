import fs from 'fs';
import { JSDOM } from 'jsdom';

const [, , migratedPath = 'stardust/migrated/blog/index.html',
  contentPath = 'content/blog.html'] = process.argv;

function normalize(text = '') {
  return text.replace(/\s+/g, ' ').trim();
}

function articleModel(article, index) {
  const title = normalize(article.querySelector('h2, h3')?.textContent);
  const img = article.querySelector('img')?.getAttribute('src') || '';
  const excerpt = normalize([...article.querySelectorAll('p')]
    .find((p) => !p.closest('.pb-sibling-meta') && normalize(p.textContent))?.textContent);
  const meta = normalize(article.querySelector('.pb-sibling-meta')?.textContent);
  return {
    index: index + 1,
    title,
    img,
    excerpt,
    meta,
  };
}

function contentRowModel(row, index) {
  const title = normalize(row.querySelector('h2, h3')?.textContent);
  const img = row.querySelector('img')?.getAttribute('src') || '';
  const excerpt = normalize([...row.querySelectorAll('p')]
    .find((p) => !p.classList.contains('pb-sibling-meta') && normalize(p.textContent))?.textContent);
  const meta = normalize(row.querySelector('.pb-sibling-meta')?.textContent);
  return {
    index: index + 1,
    title,
    img,
    excerpt,
    meta,
  };
}

function readDocument(path) {
  return new JSDOM(fs.readFileSync(path, 'utf8')).window.document;
}

const migrated = readDocument(migratedPath);
const content = readDocument(contentPath);

const expected = [...migrated.querySelectorAll('.pb-blog-card')].map(articleModel);
const actual = [...content.querySelectorAll('.cards.listing > div > div')].map(contentRowModel);

const failures = expected.flatMap((want, i) => {
  const got = actual[i];
  if (!got) return [{ index: want.index, field: 'row', expected: 'present', actual: 'missing' }];
  return ['title', 'img', 'excerpt', 'meta'].flatMap((field) => (
    want[field] === got[field] ? [] : [{
      index: want.index,
      field,
      expected: want[field],
      actual: got[field],
    }]
  ));
});

if (actual.length !== expected.length) {
  failures.unshift({
    index: 0,
    field: 'count',
    expected: String(expected.length),
    actual: String(actual.length),
  });
}

if (failures.length) {
  console.error(`BLOG PAIRING FAIL: ${expected.length - failures.length}/${expected.length} cards`);
  console.error(JSON.stringify(failures.slice(0, 20), null, 2));
  process.exit(1);
}

console.log(`BLOG PAIRING OK: ${actual.length}/${expected.length} cards`);
