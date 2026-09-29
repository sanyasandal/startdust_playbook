<!-- stardust:provenance
  writtenBy:        stardust:prototype/shape
  writtenAt:        2026-09-29T06:49:39.418921Z
  page:             blog
  pageUrl:          https://www.playbook.com/blog/
  againstDirection: stardust/direction.md (Active 2026-09-29T06:18:34.248Z)
  consumedBy:       stardust:prototype render
  readArtifacts:
    - stardust/current/pages/blog.json
    - stardust/current/pages/blog.html
    - stardust/current/_brand-extraction.json
    - DESIGN.md
    - DESIGN.json
    - stardust/direction.md
    - stardust/canon/header.html
    - stardust/canon/footer.html
    - stardust/canon/skip-link.html
    - stardust/canon/canon.css
  stardustVersion:  0.25.0
  _provenance:
    capturedSourceLineage:
      - section: header
        source: site-wide system-component carried from stardust/canon/header.html
      - section: blog-hero
        source: pages/blog.html article.post.no-image.single-post; heading "Blog" and captured blog icon image
      - section: blog-filters
        source: pages/blog.html .pill-group links Latest / Artist Spotlight ✨ / Design Resources 🔥 / Company News 👍
      - section: featured-post
        source: pages/blog.html .featured-container first post card
      - section: post-list
        source: pages/blog.html .post-feed; first 12 of 100 parsed article cards rendered, rest deferred to migrate
      - section: closing-cta
        source: site-wide system-component carried from stardust/canon/modules/cta-band.html
      - section: footer
        source: site-wide system-component carried from stardust/canon/footer.html
    antiTemplatePass:
      - pattern: listing hero
        defaultReflex: centered-stack hero with two-button CTA pair
        alternatives:
          - captured-title-card with icon and filters immediately below
          - oversized editorial masthead with invented explanatory copy
          - media-heavy feature hero consuming the first post image
        picked: captured-title-card with icon and filters immediately below
        rationale: source page hero is a compact linked Blog title and icon; no captured hero prose exists, so the brief preserves the title-only listing identity and avoids invented copy.
      - pattern: post listing cards
        defaultReflex: uniform 3-up image card grid as category nav
        alternatives:
          - one featured editorial card followed by dense card grid
          - masonry wall of all cards
          - text-only list with thumbnails removed
        picked: one featured editorial card followed by dense card grid
        rationale: source page has .featured-container followed by .post-feed cards; the canon card vocabulary lets the listing modernize while preserving that structure.
      - pattern: category filters
        defaultReflex: decorative pill nav detached from content
        alternatives:
          - filters as captured pill row directly under hero
          - filters as sidebar facets
          - filters hidden inside a dropdown
        picked: filters as captured pill row directly under hero
        rationale: source .pill-group is captured as the listing's category navigation, so links remain visible and verbatim.
    surprise: low
    signatureElements:
      - kind: site-wide motif
        capturedSource: DESIGN.md spectrum signature band rule
        mechanism: thin spectrum rule above the listing grid and canon card hover lift
        fallback: static border and grid with no JS reveal-hiding
    substrateTransitions:
      default: canvas/paper catalogue substrate
      exceptions:
        - section: closing-cta
          purpose: canon pre-footer conversion band uses ink-strong substrate from home canon
    voiceClassification:
      - section: header
        classification: captured-verbatim plus direction-authorized CTA rewrite
        source: stardust/canon/header.html
      - section: blog-hero
        classification: captured-verbatim
        copy: Blog
        source: pages/blog.html h2.h2-style
      - section: blog-filters
        classification: captured-verbatim
        copy: Latest; Artist Spotlight ✨; Design Resources 🔥; Company News 👍
        source: pages/blog.html .pill-group
      - section: featured-post
        classification: captured-verbatim
        copy: Featured · 9 months ago; Finding that Shot from Memory: Introducing Multimodal Search for Production-Quality Video
        source: pages/blog.html .featured-container
      - section: post-list
        classification: captured-verbatim for cards; direction-authorized operational note for migrate-fill-rest
        source: pages/blog.html .post-feed first 12 article cards
      - section: closing-cta
        classification: captured-verbatim plus direction-authorized CTA rewrite
        source: stardust/canon/modules/cta-band.html
      - section: footer
        classification: captured-verbatim
        source: stardust/canon/footer.html
    surpriseTier_typeScaleYields: []
-->
---
slug: blog
url: https://www.playbook.com/blog/
register: brand
surprise: low
dominantDimension: listing/editorial-catalogue
---

# Page shape: blog

## Sections (in render order)

1. **header** (system-component role: `header`) — site-wide chrome injected verbatim from `stardust/canon/header.html` after stripping only the provenance comment.
2. **blog-hero** — captured source `pages/blog.html` title card: the blog icon image and the single heading `Blog`. Composition: compact left-anchored masthead, no invented subcopy.
3. **blog-filters** — captured `.pill-group` category links rendered as pills: `Latest`, `Artist Spotlight ✨`, `Design Resources 🔥`, `Company News 👍`.
4. **featured-post** — captured `.featured-container` lead card with image, label, title, excerpt and link preserved verbatim.
5. **post-list** — captured `.post-feed` card grid. Render first 12 cards with image, title and link verbatim. Mark `data-module="post-list"` and `data-slot="items"`; include the user-authorized operational note that migrate fills the rest.
6. **closing-cta** (system-component role: `cta-band`) — canonical pre-footer conversion band injected from `stardust/canon/modules/cta-band.html`.
7. **footer** (system-component role: `footer`) — site-wide footer injected verbatim from `stardust/canon/footer.html` after stripping only the provenance comment.

## Layout strategy

- Brand-faithful listing: canvas hero, paper listing substrate, 1200px container and 24px gutters.
- Featured post uses `.pb-story-card` vocabulary at a larger editorial scale; regular posts use `.pb-card` vocabulary in a 3 → 2 → 1 grid.
- The filter row remains directly adjacent to the title card so category routing is not buried.
- No scroll reveal or JS-hidden state; only canon hover lift under `prefers-reduced-motion: no-preference`.

## Key states

- Default — hero, filters, featured lead card, first 12 post cards, canonical CTA band and footer.
- Long-list continuation — migrate expands `data-slot="items"` with the remaining captured post cards.
- Empty/loading/error — N/A for the static captured listing prototype.

## Interaction model

- Header and footer links use canonical chrome targets.
- Filters link to captured category URLs.
- Featured post and every grid card link to the captured article URL.
- Primary/secondary conversion actions use the direction-authorized CTA pair from canon.

## Data attributes

- `header.pb-header[data-section="header"][data-intent="navigation"][data-layout="contained"][data-module="site-header"]`
- `main[data-template="listing"]`
- `section[data-section="blog-hero"][data-intent="identify listing"][data-layout="contained"][data-media="image"]`
- `nav[data-section="blog-filters"][data-intent="filter content"][data-layout="contained"][data-interactive="filter"]`
- `section[data-section="featured-post"][data-intent="feature content"][data-layout="split-media"][data-media="image"][data-items="1"]`
- `section[data-section="post-list"][data-intent="content discovery"][data-layout="grid"][data-items="12"][data-module="post-list"]`
- `section.pb-cta-band[data-section="closing-cta"][data-intent="drive action"][data-layout="contained"][data-module="cta-band"]`
- `footer.pb-footer[data-section="footer"][data-intent="navigation"][data-layout="mega"][data-module="site-footer"]`

## Unsourced content (placeholder list)

(none)

## Open questions for craft

(none — hands-off mode; the canonical chrome, captured listing structure and first-12 policy are explicit.)
