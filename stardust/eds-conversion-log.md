# EDS conversion log — Playbook

## Runtime contract
- Runtime: vanilla-eds.
- Block wrapper class: `block`; wrappers are `.<name>-wrapper`, sections gain `.<name>-container`.
- Buttons: formatted-only; `strong` => `.button.primary`, `em` => `.button.secondary`, both => `.button.accent`, parent `p.button-wrapper`.
- Fragment script policy: inert innerHTML via fragment fetch/decorate; authored scripts are not used.
- Empty section collapse: true; foundation includes `main .section:empty { display: none }`.

## Locked block content models
- `header`: authored `/nav`; metadata noindex, brand section, link section, action section. Tier: template-slotted.
- `footer`: authored `/footer`; metadata noindex, one default-content footer structure section. Tier: template-slotted.
- `hero`: collection hero; one cell carrying media, eyebrow, h1, lede, CTAs; node-slotted into the canon hero DOM. Variants: default/split/centered. Tier: template-slotted.
- `cards`: one canonical repeating/content-card block; current variants `tabs`, `mcp`, `posts`, `pricing`, `listing`, `related`, `tiles`, `features`, `tools`; section heads remain in the copied/default head region before repeated units. Tier: reconstructive except `mcp` template-slotted.
- `logos`: one heading plus one logo item per authored logo; variants `default`, `contact-trust`, `pricing-trust`; duplicate marquee set is presentational. Tier: reconstructive.
- `columns`: rows are paired rich cells, optional image cell; variants `feature-row`, `value-split`. Tier: reconstructive.
- `accordion`: block-collection FAQ; current variants `program-faq`, `pricing-faq`; each row is question cell + answer cell. Tier: reconstructive.
- `table`: genuine data/comparison table model; variants `comparison`, `enterprise-addons`, `pricing-compare`; home enterprise also carries export panel. Tier: template-slotted.
- `quote`: quote/attribution cells, optional logo/image. Tier: template-slotted.
- `stats`: one row per stat, number + label + optional description. Tier: reconstructive.
- `tabs`: block-collection tabs model; tab label + panel rich content per row. Tier: reconstructive.
- `contact`: contact/demo lead capture section; source form markup is preserved locally, with dynamic-feature disposition recorded as embed/native contact passthrough. Tier: template-slotted.
- `pricing-calculator`: client-only keyed rows for options/rates plus fallback totals; block JS owns state. Tier: reconstructive interactive.
- `static-hero`: default content with section style `page-hero`; date/eyebrow paragraph before `h1`.
- `article-hero`: default content with section style `article-hero`; date eyebrow paragraph before `h1`.
- `article-body`/`policy-body`: default content with section style `prose`; figures and captions stay native.
- `cta-band`: default content with section style/content wrapper `cta-band`; `h2` plus primary/secondary CTAs.

## Home section mapping
- `pb-hero` (`hero`) => `hero` block, template-slotted, LCP image eager/high.
- `pb-logo-marquee` (`logo-marquee`) => `logos` block, reconstructive, marquee duplicate is presentational.
- `pb-product-tabs` (`product-tabs`) => `cards tabs`, reconstructive, three rich cards.
- `pb-mcp` (`tool-crosspromo`) => `cards mcp`, template-slotted split panel and steps.
- `pb-enterprise` (`comparison-table`) => `table comparison`, template-slotted comparison/export panel.
- `pb-stories` (`related-posts`) => `cards posts`, reconstructive, ten story cards plus quote.
- `pb-pricing` (`pricing-teaser`) => `cards pricing`, reconstructive, four plan cards.
- `pb-cta-band` (`cta-band`) => default content `cta-band` wrapper/style.

## Archetype and unique-page section mapping
- `blog/brand-portal-api`: `pb-article-hero` => default `article-hero`; `pb-article-layout` => default `prose` with native Ghost figures/pre/code/details; `related-posts` => `cards related`; `cta-band` => default `cta-band`.
- `blog`: `pb-sibling-hero` => default `page-hero`; `post-list` => `cards listing` with one authored article/card stream.
- `gifmaker`: `hero` => `hero`; `value-split` and unmoduled feature stack => default `prose` / `cards features`; `tool-widget` => `cards tiles`; `tool-crosspromo` => `cards tools`; `faq` => `accordion`; `cta-band` => default `cta-band`.
- `contact`: `contact-demo` => `contact`; `logo-marquee` => `logos contact-trust`.
- `p/privacy`: `legal-hero` => default `page-hero`; `policy-body` => default `prose` with native policy TOC and body.
- `pricing`: `hero` => `hero`; `pricing-teaser` => `cards pricing`; `comparison-table` sections => `table comparison`; `logo-marquee` => `logos pricing-trust`; `feature-grid` => `cards features`; `pricing-calculator` => `pricing-calculator`; `faq` => `accordion`; `cta-band` => default `cta-band`.

## Unmoduled section rules
Use `stardust/.work/secsurvey.txt` as the source of truth. `∅ article-hero` maps to default content `article-hero`; `∅ article-body` maps to `prose`; unmoduled prose, policy, and legal areas map to default content with `prose` or `page-hero`. Any unmoduled repeat group maps to the closest locked block (`cards`, `columns`, `accordion`, `quote`, `stats`, `logos`, `table`) with a variant recorded before implementation. New block names are prohibited unless no locked model can author the structure.

## Converter status
- `node stardust/scripts/eds/convert.mjs --all` generates all 68 migrated pages to `content/**.html` plus `content/nav.html` and `content/footer.html`.
- Per-page mapping, fallback use, and David lint status are recorded in `stardust/eds-convert-report.json`.
- Unknown/unmoduled sections fall back to default-content `prose`/`page-hero`/`article-hero`; no fallback is silent.

## Site-specific notes
- `content/` is ignored from code publishing via `.hlxignore`; local-only, no DA writes.
- Fonts are self-hosted from captured assets. Licensing must be confirmed before live publish; see `fonts/LICENSING.md` and the banner in `styles/styles.css`.
- Source media URLs remain fully-qualified; internal Playbook links are normalized root-relative extensionless by the converter/localize stage.
