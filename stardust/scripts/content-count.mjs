// Content-count acceptance (fidelity-tiers.md § Content-count acceptance).
// Compares role-classified content between the captured source DOM and a rendered page's <main>.
// usage: node content-count.mjs <slug> <rendered.html> [--json] [--allow <role:reason>]...
import fs from 'fs'; import { JSDOM } from 'jsdom';
const [slug, file, ...rest] = process.argv.slice(2);
const allow = {}; for (let i = 0; i < rest.length; i++) if (rest[i] === '--allow') { const [r, ...why] = rest[++i].split(':'); allow[r] = why.join(':'); }
const norm = s => (s || '').replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"').replace(/[\u2013\u2014]/g, '-').replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase();
const CHROME = 'script,style,noscript,template,svg,header,footer,nav,[role=banner],[role=contentinfo],[role=navigation],dialog,[aria-modal],[hidden],[aria-hidden=true],.modal,[class*="modal"],[id*="modal"],[class*="cookie"],[class*="navbar"],[class*="footer"],[class*="header-"],[class*="-header"],[class*="mega"],[class*="dropdown"]';
function strip(doc) { doc.querySelectorAll(CHROME).forEach(e => e.remove()); doc.querySelectorAll('[style]').forEach(e => { if (/display:\s*none|visibility:\s*hidden/.test(e.getAttribute('style'))) e.remove(); }); }
const src = new JSDOM(fs.readFileSync(`stardust/current/pages/${slug}.html`, 'utf8')).window.document; strip(src);
const out = new JSDOM(fs.readFileSync(file, 'utf8')).window.document; const main = out.querySelector('main') || out.body;
main.querySelectorAll('script,style,template,svg').forEach(e => e.remove());
const cmp = t => t.replace(/[\s:;,.!?]/g, '');
const outText = cmp(norm(main.textContent));
const heads = [...new Set([...src.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(e => norm(e.textContent)).filter(t => t.length > 2))];
const body = [...new Set([...src.querySelectorAll('p,li,td,blockquote,figcaption,dd')].filter(e => !e.querySelector('p,li')).map(e => norm(e.textContent)).filter(t => t.length >= 30))];
const key = t => t.length > 160 ? t.slice(0, 160) : t;
const miss = arr => arr.filter(t => !outText.includes(cmp(key(t))));
const imgUrl = u => { try { const x = new URL(u, 'https://www.playbook.com/'); if (x.hostname === 'img.playbook.com') { const i = x.pathname.indexOf('/Z3M6'); if (i >= 0) return 'pb:' + x.pathname.slice(i).replace(/\//g, ''); } return x.hostname + x.pathname.replace(/\/size\/w\d+\//, '/'); } catch { return u; } };
const srcImgs = [...new Set([...src.querySelectorAll('img')].filter(i => { const w = +i.getAttribute('width') || 999; return w >= 120 && !/logo|icon|avatar|emoji|badge|star/i.test((i.className || '') + (i.getAttribute('src') || '') + (i.alt || '')); }).map(i => imgUrl(i.getAttribute('src') || '')).filter(u => u && !u.startsWith('data')))];
const outImgs = new Set([...main.querySelectorAll('img,video[poster],source')].map(i => imgUrl(i.getAttribute('src') || i.getAttribute('poster') || i.getAttribute('srcset')?.split(' ')[0] || '')));
const imgMiss = srcImgs.filter(u => !outImgs.has(u));
const srcCtas = [...new Set([...src.querySelectorAll('a[href]')].map(a => norm(a.textContent)).filter(t => t.length > 2 && t.length < 40))];
const ctaMiss = srcCtas.filter(t => !outText.includes(cmp(t)) && !/get started|start free|try now|sign up|book a demo|get a demo|request a demo/.test(t));
const roles = { headings: [heads.length, miss(heads)], body: [body.length, miss(body)], images: [srcImgs.length, imgMiss], ctas: [srcCtas.length, ctaMiss] };
const thr = { headings: .95, body: .9, images: .8, ctas: .75 };
const res = {}; let pass = true;
for (const [r, [n, m]] of Object.entries(roles)) { const cov = n ? (n - m.length) / n : 1; const ok = cov >= thr[r] || !!allow[r]; if (!ok) pass = false; res[r] = { source: n, missing: m.length, coverage: +cov.toFixed(3), ok, ...(allow[r] ? { allowed: allow[r] } : {}), sample: m.slice(0, 4).map(s => s.slice(0, 90)) }; }
if (rest.includes('--json')) console.log(JSON.stringify({ slug, pass, res })); else { console.log(`${pass ? 'PASS' : 'FAIL'} ${slug}  ` + Object.entries(res).map(([r, v]) => `${r} ${v.source - v.missing}/${v.source}${v.ok ? '' : '✗'}`).join('  ')); if (!pass) for (const [r, v] of Object.entries(res)) if (!v.ok) v.sample.forEach(s => console.log(`   ${r} missing: ${s}`)); }
process.exit(pass ? 0 : 1);
