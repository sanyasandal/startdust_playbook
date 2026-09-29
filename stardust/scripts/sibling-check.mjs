// One-shot acceptance for a migrated sibling page. usage: node stardust/scripts/sibling-check.mjs <slug> <file.html> [--allow role:reason]...
import fs from 'fs'; import { execFileSync } from 'child_process'; import { chromium } from 'playwright';
const [slug, file, ...rest] = process.argv.slice(2); const html = fs.readFileSync(file, 'utf8'); const fails = [];
const run = (cmd, args) => { try { return { ok: true, out: execFileSync(cmd, args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }) }; } catch (e) { return { ok: false, out: (e.stdout || '') + (e.stderr || '') }; } };
const cc = run('node', ['stardust/scripts/content-count.mjs', slug, file, ...rest]); process.stdout.write('content-count: ' + cc.out); if (!cc.ok) fails.push('content-count');
// signed image URLs must exist byte-for-byte in the capture or an archetype
const pool = [fs.readFileSync(`stardust/current/pages/${slug}.html`, 'utf8'), fs.readFileSync(`stardust/current/pages/${slug}.json`, 'utf8'), ...fs.readdirSync('stardust/prototypes').filter(f => f.endsWith('-proposed.html')).map(f => fs.readFileSync('stardust/prototypes/' + f, 'utf8'))].join('\n');
const urls = [...new Set([...html.matchAll(/https:\/\/(?:img\.playbook\.com|storage\.ghost\.io|[a-z0-9.-]*imgix\.net)\/[^"'\s)]+/g)].map(m => m[0].replace(/&amp;/g, '&')))];
const bad = urls.filter(u => !pool.includes(u) && !pool.includes(u.replace(/&/g, '&amp;'))); console.log(`image-urls: ${urls.length - bad.length}/${urls.length} verbatim`); bad.slice(0, 3).forEach(u => console.log('   not in capture:', u.slice(0, 110))); if (bad.length) fails.push('image-urls');
const h1 = (html.match(/<h1[\s>]/g) || []).length; if (h1 !== 1) fails.push(`h1=${h1}`);
for (const r of ['header', 'footer']) { const c = fs.readFileSync(`stardust/canon/${r}.html`, 'utf8').split('\n').slice(1).join('\n').trim(); if (!html.includes(c)) fails.push(`canon-${r}-drift`); }
if (!/<main[^>]*data-template="/.test(html)) fails.push('main-data-template');
if (/data-placeholder|PLACEHOLDER/.test(html.replace(/<!--[\s\S]*?-->/g, ''))) fails.push('placeholder');
if (/<!--\s*stardust:canon/.test(html.split('<body')[0].split('<style')[1] || '')) fails.push('html-comment-inside-style');
const b = await chromium.launch(); const p = await b.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
for (const w of [360, 1440]) { await p.setViewportSize({ width: w, height: 900 }); await p.goto('file://' + fs.realpathSync(file)); const o = await p.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.clientWidth, getComputedStyle(document.querySelector('.skip-link') || document.body).position]); if (o[0] > o[1]) fails.push(`overflow@${w}:${o[0]}`); if (w === 360 && o[2] !== 'fixed' && document) {} }
const skip = await p.evaluate(() => { const e = document.querySelector('.skip-link'); return e ? e.getBoundingClientRect().bottom : -1; }); if (skip > 0) fails.push('skip-link-visible');
if (errs.length) fails.push('js-errors:' + errs[0].slice(0, 60)); await b.close();
const nav = run('node', ['stardust/scripts/mobile-nav-audit.mjs', file]); if (!nav.ok) fails.push('mobile-nav-audit');
console.log(fails.length ? `FAIL ${slug}: ${fails.join(', ')}` : `PASS ${slug}`); process.exit(fails.length ? 1 : 0);
