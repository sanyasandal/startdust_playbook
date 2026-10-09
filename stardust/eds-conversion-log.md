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

## 2026-10-08 local visual fix pass
- Added `stardust/scripts/eds/blog-pairing-probe.mjs`; it compares all 101 migrated blog cards against `content/blog.html` by title, image `src`, excerpt, and meta. Current result: `BLOG PAIRING OK: 101/101 cards`.
- Blog listing remains `cards listing`; card titles are rendered as bold headings with anchors removed during decoration so the card body is the click target, and meta stays the small eyebrow above each title.
- Program-template nits were handled in `cards` CSS: try-tile headings are reduced to small card-title scale and crosspromo tile labels are single-line, small labels; FAQ/closing CTA continue to render through `accordion` and default `cta-band`.
- Contact/pricing source sections that already carry migrated structure are now either preserved by their owning blocks or re-encoded into safer author rows before decoration; pricing calculator/table/logos keep their migrated structures as local no-JS fallbacks.
- Privacy remains default content per the locked model; local EDS flattens inner policy wrappers, so foundation CSS restores the red date and side-rail/table-of-contents structure from the flattened default-content shape.
- Experience Workspace exemptions are explicit on template-owned hero/contact/table rows where migrated fallback markup is intentionally transformed into form controls, link cards, or pricing comparison UI.

## 2026-10-09 nexcent (Figma node 5:573)
- Blocks: `nx-header`, `nx-hero`, `nx-clients`, `nx-features`, `nx-split` (×2), `nx-stats`, `nx-testimonial`, `nx-posts`, `nx-cta`, `nx-footer`. All are new; no existing block matched the design.
- Model-lint 🟡 justifications:
  - D1 `nx-header`: page-owned chrome that moves itself into `body > header`; needs the brand logo, the mobile toggle and `aria-current`.
  - D1 `nx-clients`: renders an evenly distributed logo strip from icon tokens, with per-logo sizing.
  - D1 `nx-cta`: full-bleed band; appends the arrow icon to the button.
  - D3 `nx-posts`: the intro row (1 cell) heads the card rows (2 cells: picture | text). The block recognises rows by content.
- Repo quirks absorbed:
  - `body > header`/`footer` carry `.header-wrapper`/`.footer-wrapper`.
  - The global heading font, letter-spacing and `text-wrap: balance` are neutralised per block.
  - `decorateButtons` turns `<strong>` links into `p.button-wrapper > a.button.primary`.
- The `nx-stat-clubs` icon was rebuilt; the Figma SVG export rendered only one of the three hands.
