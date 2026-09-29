<!-- stardust:provenance
  writtenBy:        stardust:prototype/shape
  writtenAt:        2026-09-29T06:35:00Z
  page:             index
  pageUrl:          https://www.playbook.com/
  againstDirection: stardust/direction.md (Active 2026-09-29T06:30:00Z)
  consumedBy:       stardust:prototype/craft
  readArtifacts:
    - stardust/current/pages/index.json
    - stardust/current/pages/index.html
    - DESIGN.md
    - DESIGN.json
    - stardust/direction.md
  stardustVersion:  0.25.0
  _provenance:
    capturedSourceLineage:
      - "header: site-wide system-component derived from captured index.html header; canon author cleanup"
      - "hero: captured pb-hero copy + pb-hero__img landscape from index.html"
      - "logo-marquee: captured pb-marquee logos and heading from index.html"
      - "product-tabs: captured Upload & organize / Search & AI Actions / Review & approvals sections from index.html"
      - "mcp-connect: captured Built to connect section, connector steps, URL, and chat exchange from index.html"
      - "enterprise: captured enterprise DAM comparison and export stats from index.html"
      - "customer-stories: captured 10 story cards, images, and The Vault Stock quote from index.html"
      - "pricing-teaser: captured four plans, prices, features, and security line from index.html"
      - "closing-cta: captured closing headline from index.html with direction-authorized primary CTA label"
      - "footer: captured home footer link grid, comparison pills, legal, and social links from index.html"
    antiTemplatePass:
      - pattern: "home hero with product promise and large media"
        defaultReflex: "centered SaaS text over gradient blob"
        alternatives: ["centered text + generic dashboard mock", "split hero with card stack", "type-first top + full-bleed captured landscape that scroll-insets"]
        picked: "type-first top + full-bleed captured landscape that scroll-insets"
        rationale: "The captured hero signature is the photographic landscape pb-hero__img with inset-on-scroll behavior; carrying it forward is signature preservation, not added divergence."
      - pattern: "feature explanations"
        defaultReflex: "three identical cards"
        alternatives: ["three equal cards", "single tabbed product canvas", "modular catalogue of three feature chapters with distinct media ratios"]
        picked: "modular catalogue of three feature chapters with distinct media ratios"
        rationale: "dominantDimension is composition/modular-catalogue; this keeps the captured three-feature IA while avoiding indistinguishable cards."
      - pattern: "customer proof"
        defaultReflex: "logo strip plus 3 testimonials"
        alternatives: ["3-card testimonial row", "all 10 story cards in horizontal scroll", "editorial proof wall with all 10 cards plus quote"]
        picked: "editorial proof wall with all 10 cards plus quote"
        rationale: "The captured page has 10 story cards; a proof wall preserves the catalogue rather than condensing important proof."
      - pattern: "pricing preview"
        defaultReflex: "four identical pricing boxes"
        alternatives: ["flat 4-up boxes", "compact plan ledger", "four bento cards with security footer"]
        picked: "four bento cards with security footer"
        rationale: "Keeps captured plan copy verbatim while aligning with the target modular/bento craft."
    substrateTransitions:
      default: "white canvas"
      exceptions:
        - { section: "mcp-connect", substrate: "paper", purpose: "developer/MCP track needs a distinct technical-integration moment" }
        - { section: "footer", substrate: "ink", purpose: "canonical site-end chrome and link density" }
    voiceClassification:
      - { section: "header", classification: "direction-authorized rewrite", source: "canonical chrome brief; top-level labels from captured nav" }
      - { section: "hero", classification: "captured-verbatim + direction-authorized CTA rewrite", source: "index.html pb-hero" }
      - { section: "logo-marquee", classification: "captured-verbatim", source: "index.html pb-marquee" }
      - { section: "product-tabs", classification: "captured-verbatim", source: "index.html feature sections" }
      - { section: "mcp-connect", classification: "captured-verbatim", source: "index.html connect section" }
      - { section: "enterprise", classification: "captured-verbatim", source: "index.html enterprise section" }
      - { section: "customer-stories", classification: "captured-verbatim", source: "index.html stories + quote" }
      - { section: "pricing-teaser", classification: "captured-verbatim", source: "index.html pricing section" }
      - { section: "closing-cta", classification: "captured-verbatim + direction-authorized CTA rewrite", source: "index.html closing section + DESIGN.md CTA rule" }
      - { section: "footer", classification: "captured-verbatim", source: "index.html footer" }
    signatureElements:
      - { kind: "hero photographic landscape + scroll-inset", capturedSource: "index.html .pb-hero__img s:1920:1080 URL", mechanism: "CSS view-timeline animation inside @supports (animation-timeline: view()) and prefers-reduced-motion:no-preference", fallback: "static rounded inset frame" }
-->
---
slug: index
url: https://www.playbook.com/
register: brand
surprise: low
dominantDimension: composition/modular-catalogue
---

# Page shape: index

## Sections (in render order)

1. **header** — site-wide canonical chrome. Clean `<header data-section="header">` with inline wordmark, Product / API & SDK / Solutions / Resources / Pricing, and right-side Book a demo + Start free.
2. **hero** — captured eyebrow, H1, lede, CTAs, and `.pb-hero__img` landscape. Render text first, then a full-bleed photo frame that is rounded/inset by default and gains a scroll-driven inset treatment when supported.
3. **logo-marquee** — captured heading and brand logos; CSS-only marquee with reduced-motion static fallback.
4. **product-tabs** — three captured product chapters: Upload & organize, Search & AI Actions, Review & approvals, with captured images/Mux poster and review feature bullets.
5. **mcp-connect** — captured Built to connect section, H2, lede, three setup steps, connector URL, developer links, and captured chat exchange.
6. **enterprise** — captured DAM comparison lists and captured no-lock-in export panel.
7. **customer-stories** — all ten captured story cards and the captured quote with attribution (Anna Hamilton, Creative 2IC at The Vault Stock).
8. **pricing-teaser** — captured Free / Pro / Team / Business prices and features, verbatim, with security line.
9. **closing-cta** — captured closing headline with canonical CTA pair.
10. **footer** — captured footer links, comparison pills, legal links, and social links.

## Layout strategy

Balanced density (64 / 48 / 32), 1200px content container, modular catalogue composition: each section is a reusable module root with explicit slots. The landing page keeps conversion CTAs in the first viewport, Solutions audience routing in nav, and the developer/MCP track as a dedicated band.

## Key states

Default static page. Mobile uses stock hamburger collapse at ≤760px. Logo marquee pauses to static wrapping under `prefers-reduced-motion: reduce`. Hero scroll-inset has a static rounded-frame fallback.

## Interaction model

Navigation and cards link to captured targets. Product chapters use semantic non-JS cards (not hidden tabs) to preserve content. Header mobile nav uses checkbox + ≤10-line script for aria-expanded/Escape.

## Data attributes

- `header[data-section="header"][data-module="site-header"][data-nav-collapse="hamburger"]`
- `main[data-template="landing"]`
- `section[data-section="hero"][data-module="hero"]`
- `section[data-section="logo-marquee"][data-module="logo-marquee"]`
- `section[data-section="product-tabs"][data-module="product-tabs"]`
- `section[data-section="mcp-connect"][data-module="tool-crosspromo"]`
- `section[data-section="enterprise"][data-module="comparison-table"]`
- `section[data-section="customer-stories"][data-module="related-posts"]`
- `section[data-section="pricing-teaser"][data-module="pricing-teaser"]`
- `section[data-section="closing-cta"][data-module="cta-band"]`
- `footer[data-section="footer"][data-module="site-footer"]`

## Unsourced content

(none)

## Open questions for craft

None under hands-off mode. Assumption recorded: render all ten story cards rather than condensing to six because the canon author should preserve the richest reusable story-card module.
