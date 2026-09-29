<!-- stardust:provenance
  writtenBy:        stardust:prototype/shape
  writtenAt:        2026-09-29T06:52:34Z
  page:             blog-brand-portal-api
  pageUrl:          https://www.playbook.com/blog/brand-portal-api/
  againstDirection: stardust/direction.md (Active 2026-09-29T06:30:00Z)
  consumedBy:       stardust:prototype render (hands-off; impeccable context loaded)
  readArtifacts:
    - stardust/current/pages/blog-brand-portal-api.json
    - stardust/current/pages/blog-brand-portal-api.html
    - stardust/current/_brand-extraction.json
    - DESIGN.md
    - DESIGN.json
    - stardust/direction.md
    - stardust/canon/header.html
    - stardust/canon/footer.html
    - stardust/canon/canon.css
    - stardust/canon/modules/cta-band.html
    - stardust/canon/modules/related-posts.html
  _provenance:
    capturedSourceLineage:
      - section: header
        source: site-wide canon from stardust/canon/header.html (home canon author)
      - section: article-hero
        source: current/pages/blog-brand-portal-api.html#article.post > header.post-header plus JSON slots.headline/deck; captured date July 14, 2026; no author and no lead-image present
      - section: article-body
        source: current/pages/blog-brand-portal-api.html#post-toc-content paragraphs, headings, figures, links and code snippets
      - section: feature-grid
        source: current/pages/blog-brand-portal-api.html#what-powers-it list items; module confirmed in JSON slots.modules
      - section: faq
        source: current/pages/blog-brand-portal-api.html#developer-faq paragraphs; module confirmed in JSON slots.modules
      - section: related-posts
        source: current/pages/blog-brand-portal-api.html#read-more list; structure starts from stardust/canon/modules/related-posts.html
      - section: closing-cta
        source: site-wide canon module stardust/canon/modules/cta-band.html
      - section: footer
        source: site-wide canon from stardust/canon/footer.html (home canon author)
    antiTemplatePass:
      - pattern: article hero
        defaultReflex: centered headline plus abstract gradient blob
        alternatives:
          - sticky editorial rail beside a compact title block
          - split media hero with invented illustration
          - source-faithful masthead with TOC rail and no fabricated hero image
        picked: source-faithful masthead with TOC rail
        rationale: captured page has a Ghost article masthead, date, deck, and no lead image; adding a decorative hero would violate no-invented-copy/assets.
      - pattern: feature-grid
        defaultReflex: generic three equal SaaS cards
        alternatives:
          - keep the endpoint list as prose bullets inside the article
          - promote each captured bullet to a compact API ledger tile
          - render a wide comparison table
        picked: compact API ledger tile grid
        rationale: the captured “What powers it” section is a list of seven implementation moves; tiles preserve all text while making the confirmed feature-grid module explicit.
      - pattern: faq
        defaultReflex: loose Q/A text stack
        alternatives:
          - canonical details accordion
          - tabbed FAQ switcher
          - two-column static Q/A grid
        picked: canonical details accordion
        rationale: user explicitly required FAQ as canonical details accordion with data-module="faq"; questions and answers remain captured verbatim.
      - pattern: related-posts
        defaultReflex: three image cards with unrelated stock art
        alternatives:
          - no related section
          - text-only related cards in the canon story-card structure
          - pull unrelated customer story images from home canon
        picked: text-only related cards in the canon story-card structure
        rationale: captured read-more links provide titles and URLs but no related images; text-only cards avoid fabricated media.
    substrateTransitions:
      default: white article canvas
      exceptions:
        - section: related-posts
          substrate: paper
          reason: canon related-posts structure uses pb-stories paper surface
        - section: closing-cta
          substrate: ink-strong
          reason: canonical cta-band uses dark pre-footer band
    voiceClassification:
      - section: header
        classification: captured-verbatim via canon, with CTA labels direction-authorized rewrite from improvements #2
        source: stardust/canon/header.html
      - section: article-hero
        classification: captured-verbatim
        source: current/pages/blog-brand-portal-api.html post-header and JSON slots.deck
      - section: article-body
        classification: captured-verbatim
        source: current/pages/blog-brand-portal-api.html#post-toc-content
      - section: feature-grid
        classification: captured-verbatim
        source: current/pages/blog-brand-portal-api.html#what-powers-it ul
      - section: faq
        classification: captured-verbatim
        source: current/pages/blog-brand-portal-api.html#developer-faq
      - section: related-posts
        classification: captured-verbatim
        source: current/pages/blog-brand-portal-api.html#read-more
      - section: closing-cta
        classification: captured-verbatim via canon, with CTA labels direction-authorized rewrite from improvements #2
        source: stardust/canon/modules/cta-band.html
      - section: footer
        classification: captured-verbatim via canon
        source: stardust/canon/footer.html
    signatureElements:
      - kind: editorial sticky TOC
        capturedSource: current/pages/blog-brand-portal-api.html .post-toc-sidebar
        mechanism: CSS sticky side rail at desktop, inline scroll chips on mobile
        fallback: TOC appears before body in normal document flow
    surpriseTier_typeScaleYields: []
  stardustVersion: 0.25.0
-->
---
slug: blog-brand-portal-api
url: https://www.playbook.com/blog/brand-portal-api/
register: brand
surprise: low
dominantDimension: editorial/api-ledger
---

# Page shape: blog-brand-portal-api

## Sections (in render order)

1. **header** (system-component role: `header`) — site-wide canon header injected verbatim from `stardust/canon/header.html`; captured-source lineage: home canon author / Astro IA.
2. **article-hero** — compact editorial masthead with captured date `July 14, 2026`, H1 `Your Brand Portal Should Be an API Call`, and captured deck from `current/pages/blog-brand-portal-api.json#description`; captured-source lineage: `blog-brand-portal-api.html#article.post header.post-header` plus JSON description. No author or hero image is rendered because the capture has `byline: null` and `lead-image: null`.
3. **article-body** — readable ~68ch article column with sticky “On this page” rail sourced from the captured TOC and all captured prose, links, code snippets, figures and captions verbatim; captured-source lineage: `blog-brand-portal-api.html#post-toc-content`.
4. **feature-grid** (`data-module="feature-grid"`) — the captured `What powers it` list becomes a compact API ledger grid, preserving each bullet title and body verbatim; captured-source lineage: `blog-brand-portal-api.html#what-powers-it + ul`.
5. **faq** (`data-module="faq"`) — canonical `<details>` accordion from captured Developer FAQ question/answer paragraphs; captured-source lineage: `blog-brand-portal-api.html#developer-faq`.
6. **related-posts** (`data-module="related-posts"`) — reuse the canon related-posts story-card structure as text-only cards because captured Read more links have no images; captured-source lineage: `blog-brand-portal-api.html#read-more`.
7. **closing-cta** (`data-module="cta-band"`) — canonical cta-band injected verbatim from `stardust/canon/modules/cta-band.html`.
8. **footer** — site-wide canon footer injected verbatim from `stardust/canon/footer.html`.

## Layout strategy

- Brand-faithful article pattern: 1200px container, left sticky TOC rail, 68ch reading measure, figures widened just enough to show product UI without breaking reading rhythm.
- The source Ghost article is preserved as an editorial document, but the confirmed module surfaces are made explicit for migrate: feature-grid, FAQ, related-posts, then canonical CTA.
- Substrate is mostly white; only related-posts uses paper and closing CTA uses the canonical ink-strong band.

## Key states

- Default: static article page with sticky TOC on desktop.
- Mobile: TOC becomes a horizontal chip list before the article; feature and related grids collapse to one column; header uses the canon hamburger.
- Empty/error states: N/A for static captured article content.

## Interaction model

- Header, footer and cta-band links use canon targets.
- TOC links jump to captured H2 anchors.
- FAQ uses native `<details>` accordions; no custom JS.
- Related cards link to captured Read more URLs.

## Data attributes

- `main[data-template="article"]`
- `header[data-section="header"][data-intent="navigation"][data-layout="contained"][data-module="site-header"]`
- `section[data-section="article-hero"][data-intent="orient reader"][data-layout="contained"]`
- `section[data-section="article-body"][data-intent="educate"][data-layout="side-rail"][data-slot="article-body"]`
- `section[data-section="api-building-blocks"][data-intent="explain mechanic"][data-layout="grid"][data-module="feature-grid"]`
- `section[data-section="developer-faq"][data-intent="answer objections"][data-layout="stack"][data-module="faq"][data-interactive="accordion"]`
- `section[data-section="related-posts"][data-intent="continue reading"][data-layout="grid"][data-module="related-posts"]`
- `section[data-section="closing-cta"][data-intent="drive action"][data-layout="contained"][data-module="cta-band"]`
- `footer[data-section="footer"][data-intent="navigation"][data-layout="mega"][data-module="site-footer"]`

## Unsourced content (placeholder list)

(none)

## Open questions for craft

- None. Hands-off mode resolves the page as a source-faithful editorial archetype with no invented copy, no fabricated media, and canonical chrome.
