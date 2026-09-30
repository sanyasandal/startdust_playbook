#!/usr/bin/env node
// Post-render link resolution for stardust/migrated. The driver flags every origin link whose target
// is not in the inventory (data-broken-link). Here each one is resolved deterministically:
//   1. source redirect alias of an inventory page (/p/tutorial/x → /tutorial/x, /p/blog/x → /blog/x,
//      /p/<customer>/ → /blog/<customer>/, /integrations → /integrations-all/, /p/pricing → /pricing/)
//      → depth-relative link to the migrated page;
//   2. anything else (app routes, uncrawled posts, /launch/, /school/, /s/*) → absolute source URL,
//      recorded as scope debt in stardust/migrate/link-debt.json.
// Idempotent: anchors without data-broken-link are never touched.
import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';

const ROOT = 'stardust/migrated';
const ORIGIN = 'https://www.playbook.com';
const state = JSON.parse(readFileSync('stardust/state.json', 'utf8'));
const inv = new Map();
for (const p of state.pages) {
  const path = new URL(p.url).pathname;
  const out = path === '/' ? 'index.html' : `${path.replace(/^\/|\/$/g, '')}/index.html`;
  inv.set(path, out);
}
const norm = (p) => (p.endsWith('/') ? p : `${p}/`);
function alias(pathname) {
  const p = norm(pathname);
  const cands = [p];
  let m;
  if ((m = p.match(/^\/p\/tutorial\/(.+)$/))) cands.push(`/tutorial/${m[1]}`);
  if ((m = p.match(/^\/p\/blog\/(.+)$/))) cands.push(`/blog/${m[1]}`);
  if ((m = p.match(/^\/p\/([^/]+)\/$/))) cands.push(`/blog/${m[1]}/`);
  if (p === '/integrations/') cands.push('/integrations-all/');
  if (p === '/p/pricing/') cands.push('/pricing/');
  return cands.find((c) => inv.has(c)) || null;
}

const metas = [];
(function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) { if (f !== 'assets') walk(p); } else if (f === '_meta.json') metas.push(p);
  }
}(ROOT));

const debt = {};
let internal = 0; let external = 0;
for (const mp of metas) {
  const meta = JSON.parse(readFileSync(mp, 'utf8'));
  const list = meta.brokenInternalLinks || [];
  const htmlPath = join(dirname(mp), 'index.html');
  let html = readFileSync(htmlPath, 'utf8');
  const depth = meta.outputPath.split('/').length - 1;
  const prefix = depth ? '../'.repeat(depth) : './';
  let i = 0;
  html = html.replace(/<(a|area)\b([^>]*?)\s+data-broken-link="true"([^>]*)>/gi, (m, tag, pre, post) => {
    const entry = list[i++];
    if (!entry) throw new Error(`${htmlPath}: more flagged anchors than _meta entries`);
    const u = new URL(entry.href.replace(/&amp;/g, '&'), `${ORIGIN}/`);
    const target = alias(u.pathname);
    let next;
    if (target) { next = `${prefix}${inv.get(target)}${u.search}${u.hash}`; internal++; entry.resolved = { kind: 'alias', to: target }; } else {
      next = `${ORIGIN}${u.pathname}${u.search}${u.hash}`; external++; entry.resolved = { kind: 'source-absolute', to: next };
    }
    const attrs = `${pre}${post}`.replace(/(?<![\w-])href\s*=\s*(["'])(.*?)\1/s, (_, q) => `href=${q}${next.replace(/&/g, '&amp;')}${q}`);
    return `<${tag}${attrs}>`;
  });
  if (i !== list.length) throw new Error(`${htmlPath}: ${i} flagged anchors vs ${list.length} _meta entries`);
  if (list.length) meta.resolvedLinks = list;
  for (const r of meta.resolvedLinks || []) if (r.resolved?.kind === 'source-absolute') { const k = new URL(r.resolved.to).pathname; debt[k] = (debt[k] || 0) + 1; }
  meta.brokenInternalLinks = [];
  writeFileSync(htmlPath, html);
  writeFileSync(mp, `${JSON.stringify(meta, null, 2)}\n`);
}
mkdirSync('stardust/migrate', { recursive: true });
writeFileSync('stardust/migrate/link-debt.json', `${JSON.stringify({ note: 'Out-of-inventory origin links pointed at the live source (scope debt).', targets: Object.fromEntries(Object.entries(debt).sort((a, b) => b[1] - a[1])) }, null, 2)}\n`);
console.log(`pages ${metas.length} · aliased→internal ${internal} · source-absolute ${external} · distinct debt targets ${Object.keys(debt).length}`);
