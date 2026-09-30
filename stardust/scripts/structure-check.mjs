// Structural acceptance for a rendered page — catches what content-count cannot: a page that carries
// every string but as a dump. usage: node structure-check.mjs <slug> <file.html>
// Fails on: (1) dump sections (source-copy / captured-media / "More from this page");
// (2) text duplicated in <main> more often than on the source; (3) source headings out of order
// (longest in-order run < 85% of matched headings); (4) crop distortion — an <img> rendered with
// object-fit:cover whose box aspect differs from the intrinsic aspect by > 2x (logos cropped to cards).
import fs from 'fs'; import { JSDOM } from 'jsdom'; import { chromium } from 'playwright';
const [slug, file] = process.argv.slice(2); const fails = [];
const norm = (s) => (s || '').replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"').replace(/[\u2013\u2014]/g, '-').replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase();
const CHROME = 'script,style,noscript,template,svg,header,footer,nav,[role=banner],[role=contentinfo],[role=navigation],dialog,[aria-modal],[hidden],[aria-hidden=true],.modal,[class*="modal"],[id*="modal"],[class*="cookie"],[class*="navbar"],[class*="footer"],[class*="header-"],[class*="-header"],[class*="mega"],[class*="dropdown"]';
const html = fs.readFileSync(file, 'utf8');
const src = new JSDOM(fs.readFileSync(`stardust/current/pages/${slug}.html`, 'utf8')).window.document;
src.querySelectorAll(CHROME).forEach((e) => e.remove());
const main = new JSDOM(html).window.document.querySelector('main');
const fullMainText = main.textContent;
main.querySelectorAll('script,style,template,svg,[aria-hidden=true],nav,aside,[class*=toc],[class*=on-this-page],[data-module=related-posts]').forEach((e) => e.remove());

if (/data-section="(source-copy|captured-media)"|pb-sibling-copy|pb-sibling-media-grid|>\s*More from this page\s*</i.test(html)) fails.push('dump-section');

const texts = (root) => [...root.querySelectorAll('h1,h2,h3,h4,h5,h6,p,li,blockquote,figcaption')].filter((e) => !e.querySelector('p,li,h1,h2,h3,h4,h5,h6')).map((e) => norm(e.textContent)).filter((t) => t.length >= 25);
const count = (arr) => arr.reduce((m, t) => m.set(t, (m.get(t) || 0) + 1), new Map());
const sc = count(texts(src.body)); const oc = count(texts(main));
const dups = [...oc].filter(([t, n]) => n > Math.max(1, sc.get(t) || 0));
if (dups.length) { fails.push(`duplicated-text:${dups.length}`); dups.slice(0, 3).forEach(([t, n]) => console.log(`   dup x${n}: ${t.slice(0, 80)}`)); }

const sh = [...new Set([...src.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((e) => norm(e.textContent)).filter((t) => t.length > 3))];
const oh = [...main.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((e) => norm(e.textContent));
const seq = oh.map((t) => sh.indexOf(t)).filter((i) => i >= 0);
const lis = (a) => { const d = []; for (const x of a) { let lo = 0; let hi = d.length; while (lo < hi) { const m = (lo + hi) >> 1; if (d[m] < x) lo = m + 1; else hi = m; } d[lo] = x; } return d.length; };
const inOrder = seq.length ? lis(seq) / seq.length : 1;
console.log(`structure: headings in source order ${(inOrder * 100).toFixed(0)}% (${seq.length} matched)`);
if (seq.length >= 4 && inOrder < 0.85) fails.push(`heading-order:${(inOrder * 100).toFixed(0)}%`);

// (5) image context: each image must sit under the same nearest-preceding heading as on the source
// (a portrait stays with its person, a feature image with its feature — no detached image grids).
const imgKey = (u) => { try { const x = new URL(u, 'https://www.playbook.com/'); if (x.hostname === 'img.playbook.com') { const i = x.pathname.indexOf('/Z3M6'); if (i >= 0) return 'pb:' + x.pathname.slice(i).replace(/\//g, ''); } return x.hostname + x.pathname.replace(/\/size\/w\d+\//, '/'); } catch { return u; } };
const ctx = (root, only) => { const m = new Map(); let h = ''; for (const e of root.querySelectorAll('h1,h2,h3,h4,h5,h6,img')) { if (e.tagName !== 'IMG') { const t = norm(e.textContent); if (!only || only.includes(t)) h = t; continue; } if (e.closest('[class*=marquee],[class*=logo],[class*=Logo]')) continue; const k = imgKey(e.getAttribute('src') || ''); if (k && !m.has(k)) m.set(k, h); } return m; };
const sctx = ctx(src.body); const octx = ctx(main, sh);
const shared = [...octx.keys()].filter((k) => sctx.has(k) && sctx.get(k) && oh.includes(sctx.get(k)));
const moved = shared.filter((k) => octx.get(k) !== sctx.get(k));
console.log(`structure: images under their source heading ${shared.length - moved.length}/${shared.length}`);
if (shared.length >= 3 && moved.length / shared.length > 0.2) { fails.push(`image-context:${moved.length}/${shared.length}`); moved.slice(0, 3).forEach((k) => console.log(`   moved: src "${sctx.get(k).slice(0, 50)}" → out "${octx.get(k).slice(0, 50)}"`)); }

// (6) empty sections: a section whose only content is a heading (or nothing).
const empties = [...main.querySelectorAll(':scope > section, :scope > div > section')].filter((s) => { if (s.querySelector('h1')) return false; const c = s.cloneNode(true); c.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach((h) => h.remove()); return norm(c.textContent).length < 15 && !c.querySelector('img,video,iframe,a[href],form,table'); });
if (empties.length) fails.push(`empty-section:${empties.length}`);
if ([...main.querySelectorAll('.pb-cta-band__box')].some((x) => !x.querySelector('h2,h3,p'))) fails.push('cta-band-without-copy');

// (7) chrome-in-main: header/footer/mega-menu link labels dumped into the page body.
const chromeLabels = new Set(['header', 'footer'].flatMap((r) => [...new JSDOM(fs.readFileSync(`stardust/canon/${r}.html`, 'utf8')).window.document.querySelectorAll('a')].map((a) => norm(a.textContent)).filter((t) => t.length > 3)));
const srcChrome = [...src.body.querySelectorAll('main a, [class*=section] a')].filter((a) => chromeLabels.has(norm(a.textContent))).length;
const outChrome = [...main.querySelectorAll('a, li')].filter((a) => chromeLabels.has(norm(a.textContent))).length;
if (outChrome > 12 && outChrome > srcChrome * 1.5) fails.push(`chrome-in-main:${outChrome}`);
// (8) heading stacks: 3+ consecutive headings with no content between them.
const stack = (root) => { let run = 0; let mx = 0; for (const e of root.querySelectorAll('h1,h2,h3,h4,h5,h6,p,li,img,figure,blockquote,table,a,iframe,video,button')) { if (/^H[1-6]$/.test(e.tagName)) { run += 1; mx = Math.max(mx, run); } else if (norm(e.textContent).length > 0 || /IMG|IFRAME|VIDEO|FIGURE/.test(e.tagName)) run = 0; } return mx; };
const stackMain = new JSDOM(html).window.document.querySelector('main'); stackMain.querySelectorAll('script,style,template,nav,aside,[class*=toc]').forEach((e) => e.remove());
const maxRun = stack(stackMain); const srcRun = stack(src.body);
if (maxRun >= 3 && maxRun > srcRun) fails.push(`heading-stack:${maxRun}>src ${srcRun}`);

// (9) short-text coverage: stats, names, labels (4–29 chars) that content-count's body floor misses.
const leaf = (root) => [...root.querySelectorAll('p,li,span,div,h1,h2,h3,h4,h5,h6,dt,dd,strong,em,figcaption,blockquote')].filter((e) => !e.closest('a,button,label,select,option,form') && ![...e.children].some((c) => norm(c.textContent))).map((e) => norm(e.textContent)).filter((t) => t.length >= 4 && t.length < 30 && /[a-z0-9]/.test(t));
const cmpT = (t) => t.replace(/[\s:;,.!?'"()]/g, '');
const outAll = cmpT(norm(fullMainText));
const shortSrc = [...new Set(leaf(src.body))].filter((t) => !chromeLabels.has(t));
const shortMiss = shortSrc.filter((t) => !outAll.includes(cmpT(t)));
console.log(`structure: short texts ${shortSrc.length - shortMiss.length}/${shortSrc.length}`);
if (shortSrc.length >= 5 && shortMiss.length / shortSrc.length > 0.2) { fails.push(`short-text:${shortSrc.length - shortMiss.length}/${shortSrc.length}`); shortMiss.slice(0, 6).forEach((t) => console.log(`   missing: ${t}`)); }

const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('file://' + fs.realpathSync(file), { waitUntil: 'load' });
await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 800) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 30)); } });
await p.waitForTimeout(600);
const crops = await p.evaluate(() => [...document.querySelectorAll('main img')].filter((i) => i.naturalWidth && getComputedStyle(i).objectFit === 'cover').map((i) => { const r = i.getBoundingClientRect(); const a = i.naturalWidth / i.naturalHeight; const bx = r.width / Math.max(1, r.height); return { q: Math.max(a / bx, bx / a), src: i.currentSrc.slice(0, 80), w: r.width }; }).filter((x) => x.q > 2 && x.w > 60));
await b.close();
if (crops.length) { fails.push(`crop-distortion:${crops.length}`); crops.slice(0, 3).forEach((c) => console.log(`   crop x${c.q.toFixed(1)}: ${c.src}`)); }
console.log(fails.length ? `structure FAIL: ${fails.join(', ')}` : 'structure OK');
process.exit(fails.length ? 1 : 0);
