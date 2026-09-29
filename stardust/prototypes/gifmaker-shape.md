<!-- stardust:provenance
  writtenBy:        stardust:prototype/shape
  writtenAt:        2026-09-29T06:55:00Z
  page:             gifmaker
  pageUrl:          https://www.playbook.com/gifmaker/
  againstDirection: stardust/direction.md (Active 2026-09-29T06:30:00Z)
  consumedBy:       impeccable:craft
  readArtifacts:
    - stardust/current/pages/gifmaker.json
    - stardust/current/pages/gifmaker.html
    - stardust/current/_brand-extraction.json
    - DESIGN.md
    - DESIGN.json
    - stardust/direction.md
    - stardust/canon/header.html
    - stardust/canon/footer.html
    - stardust/canon/skip-link.html
    - stardust/canon/canon.css
    - stardust/canon/modules/tool-crosspromo.html
    - stardust/canon/modules/cta-band.html
  stardustVersion:  0.25.0
  _provenance:
    capturedSourceLineage:
      - { section: header, source: "site-wide canon from index prototype" }
      - { section: hero, source: "gifmaker.html hero h1, lede, Create free CTA, and Mux video" }
      - { section: tool-widget, source: "gifmaker.html Try it now / Upload any files cards + captured sign-up mini-app link; dynamic shell only" }
      - { section: value-split, source: "gifmaker.html secondaryHero headline + body" }
      - { section: feature-strip, source: "gifmaker.html Say it with a GIF / Combine with other Playbook apps / Customize GIF speed and loop count blocks" }
      - { section: tool-crosspromo, source: "gifmaker.html crosspromo heading/body plus captured footer/product links" }
      - { section: closing-cta, source: "gifmaker.html It takes seconds to sign up and try. + Try now; canonical CTA labels are direction-authorized" }
      - { section: faq, source: "gifmaker.html faq ul/li questions and answers" }
      - { section: footer, source: "site-wide canon from index prototype" }
    antiTemplatePass:
      - pattern: hero
        defaultReflex: "centered SaaS hero plus gradient blob"
        alternatives: ["video-as-product-frame with left copy", "poster-like centered headline over tool shell", "two-column copy and motion panel"]
        picked: "left copy plus video/tool frame"
        rationale: "source hero is video-led; Playbook canon says product media carries heroes"
      - pattern: tool-widget
        defaultReflex: "generic upload form with invented generate labels"
        alternatives: ["static shell using captured labels only", "omit widget and show video only", "pricing card only"]
        picked: "static shell using captured labels only"
        rationale: "tool is dynamic; brief requires static shell and placeholder signature without invented copy"
      - pattern: crosspromo
        defaultReflex: "three identical icon cards"
        alternatives: ["canon MCP split", "compact pb-card tile grid from captured links", "footer-link pill row"]
        picked: "compact pb-card tile grid"
        rationale: "canon MCP copy is home-specific; tile grid preserves module structure without unsourced copy"
      - pattern: faq
        defaultReflex: "loose Q/A cards"
        alternatives: ["details accordion", "two-column Q/A list", "side-rail FAQ"]
        picked: "details accordion"
        rationale: "requested canonical details accordion and source FAQ is exactly three Q/A items"
    substrateTransitions:
      default: canvas
      exceptions:
        - { section: tool-widget, substrate: paper, purpose: "dynamic shell needs app-surface separation", citation: "captured tool app area and canon paper card ground" }
        - { section: closing-cta, substrate: ink-strong, purpose: "canonical cta-band emphasis", citation: "stardust/canon/modules/cta-band.html" }
    voiceClassification:
      - { section: header, classification: captured-verbatim, source: "canon/header.html" }
      - { section: hero, classification: captured-verbatim, copy: "Create GIFs in seconds / Transform moments into motion with GIF Maker, now available in Playbook / Create free", source: "gifmaker.html" }
      - { section: tool-widget, classification: captured-verbatim + placeholder, source: "gifmaker.html labels; dynamic function placeholder recorded" }
      - { section: value-split, classification: captured-verbatim, source: "gifmaker.html" }
      - { section: feature-strip, classification: captured-verbatim, source: "gifmaker.html" }
      - { section: tool-crosspromo, classification: captured-verbatim, source: "gifmaker.html + captured footer links" }
      - { section: closing-cta, classification: captured-verbatim + direction-authorized rewrite, source: "gifmaker.html + direction CTA vocabulary" }
      - { section: faq, classification: captured-verbatim, source: "gifmaker.html faq" }
      - { section: footer, classification: captured-verbatim, source: "canon/footer.html" }
    signatureElements:
      - { kind: "hero video", capturedSource: "gifmaker.html video#videoPRVideo src=https://stream.mux.com/yrTbzwcTag01g5XvlFIT8WGq0274vFhRfYxVNtQiRKqcs.m3u8", mechanism: "autoplay muted loop playsinline video in rounded product frame", fallback: "captured og:image poster plus source text remains readable if media fails" }
    surpriseTier_typeScaleYields: []
-->
---
slug: gifmaker
url: https://www.playbook.com/gifmaker/
register: brand
surprise: low
dominantDimension: composition/program-tool-shell
---

# Page shape: gifmaker

## Sections (in render order)

1. **header** — site-wide canon chrome from `stardust/canon/header.html`.
2. **hero** — captured H1, lede and `Create free` CTA paired with the captured Mux video. Lineage: `gifmaker.html` hero section.
3. **tool-widget** — dynamic app surface rendered as a static shell. Visible labels are captured (`Try it now`, `Upload any files`, `Create free`). Mark root `data-dynamic="tool-widget"` and include a PLACEHOLDER signature comment. Lineage: `gifmaker.html` try boxes and sign-up mini-app link.
4. **value-split** — captured headline `Playbook GIF Maker for instant, creative loops` and body. Lineage: `gifmaker.html` secondaryHero.
5. **feature-strip** — three captured feature moments with captured images: `Say it with a GIF`, `Combine with other Playbook apps to boost productivity`, `Customize GIF speed and loop count`. Lineage: `gifmaker.html` feature-ai sections and CSS image URLs.
6. **tool-crosspromo** — use `data-module="tool-crosspromo"`; canonical MCP structure does not fit because it contains unrelated MCP copy, so render a `.pb-card` tile grid from captured site links.
7. **closing-cta** — canonical `cta-band` structure with captured headline `It takes seconds to sign up and try.` and direction-authorized CTA labels `Start free` / `Book a demo`.
8. **faq** — canonical `<details>` accordion with the three captured Q/A pairs.
9. **footer** — site-wide canon chrome from `stardust/canon/footer.html`.

## Layout strategy

- Balanced density: 64 / 48 / 32px section padding, 1200px container.
- Program template keeps the tool visible early: hero media + app shell before explanatory feature bands.
- Feature strip alternates image/text but remains one canvas substrate; the only substrate exceptions are the tool shell and cta-band.

## Key states

- Default static state: all captured content visible without JS.
- Dynamic widget: static placeholder shell only; migrate/dynamics must implement upload/generate behavior.
- Reduced motion: no reveal hiding; hover lift only under `prefers-reduced-motion: no-preference`.

## Interaction model

- `Create free` links to `/sign-up?openMiniApp=gifmaker` (captured).
- Static widget controls are disabled by design and marked dynamic; they do not submit.
- FAQ uses native `<details>`.
- Header mobile menu uses canon script verbatim.

## Data attributes

- `header[data-section="header"][data-intent="navigation"][data-layout="contained"][data-module="site-header"]`
- `main[data-template="program"]`
- `section[data-section="hero"][data-intent="primary action"][data-layout="split-media"][data-media="video"][data-module="hero"]`
- `section[data-section="tool-widget"][data-intent="try tool"][data-layout="contained"][data-dynamic="tool-widget"][data-module="tool-widget"]`
- `section[data-section="value-split"][data-intent="explain value"][data-layout="split"]`
- `section[data-section="features"][data-intent="explain mechanic"][data-layout="stack"][data-items="3"]`
- `section[data-section="tool-crosspromo"][data-intent="cross-promo"][data-layout="grid"][data-items="4"][data-module="tool-crosspromo"]`
- `section[data-section="closing-cta"][data-intent="drive action"][data-layout="contained"][data-module="cta-band"]`
- `section[data-section="faq"][data-intent="answer objections"][data-layout="accordion"][data-items="3"][data-module="faq"]`
- `footer[data-section="footer"][data-intent="navigation"][data-layout="mega"][data-module="site-footer"]`

## Unsourced content (placeholder list)

- `section[data-section="tool-widget"]` — type `other`; the upload/generate behavior is dynamic and not present in the static capture. Render static shell only with a PLACEHOLDER signature comment and record `data-dynamic="tool-widget"`.

## Open questions for craft

- None. Hands-off run; assumptions are recorded above.
