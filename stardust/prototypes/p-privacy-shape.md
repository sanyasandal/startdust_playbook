<!-- stardust:provenance
  writtenBy:        stardust:prototype/shape
  writtenAt:        2026-09-29T12:17:39.065+05:30
  page:             p-privacy
  pageUrl:          https://www.playbook.com/p/privacy/
  againstDirection: stardust/direction.md (Active 2026-09-29T06:30:00Z)
  consumedBy:       stardust:prototype render
  readArtifacts:
    - stardust/current/pages/p-privacy.json
    - stardust/current/pages/p-privacy.html
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
      capturedSource: "site-wide canon from stardust/canon/header.html"
    - section: legal-hero
      capturedSource: "p-privacy.html article.post header: post-eyebrow + h1"
    - section: policy-body
      capturedSource: "p-privacy.html #post-toc-content, copied verbatim for all paragraphs, headings and lists"
    - section: policy-toc
      capturedSource: "p-privacy.html .post-toc-list and current/pages/p-privacy.json headings H2 entries"
    - section: footer
      capturedSource: "site-wide canon from stardust/canon/footer.html"
  antiTemplatePass:
    - pattern: legal-reading-layout
      defaultReflex: "plain centered legal wall"
      alternatives:
        - "single prose column only"
        - "sticky captured-H2 side table of contents + 72ch prose column"
        - "policy cards per H2 section"
      picked: "sticky captured-H2 side table of contents + 72ch prose column"
      rationale: "Captured source has a TOC and the archetype instruction explicitly allows it at ≥1200px."
    - pattern: closing-conversion
      defaultReflex: "append canonical cta-band"
      alternatives:
        - "cta-band"
        - "canonical footer directly after legal copy"
        - "related legal links"
      picked: "canonical footer directly after legal copy"
      rationale: "Legal page instruction says no cta-band needed; source does not provide a related-links module."
  substrateTransitions:
    default: canvas
    exceptions:
      - section: policy-body
        substrate: paper shell with white prose card
        citation: "DESIGN.md editorial article pattern and captured Ghost TOC sidebar"
  voiceClassification:
    - { section: header, classification: canon-verbatim, source: "stardust/canon/header.html" }
    - { section: legal-hero, classification: captured-verbatim, source: "p-privacy.html article header + page JSON description" }
    - { section: policy-body, classification: captured-verbatim, source: "p-privacy.html #post-toc-content" }
    - { section: policy-toc, classification: captured-verbatim, source: "captured H2 labels" }
    - { section: footer, classification: canon-verbatim, source: "stardust/canon/footer.html" }
  signatureElements: []
  surpriseTier_typeScaleYields: []
-->
---
slug: p-privacy
url: https://www.playbook.com/p/privacy/
register: brand
surprise: low
dominantDimension: composition/legal-readable-column
---

# Page shape: p-privacy

## Sections (in render order)

1. **header** (system-component role: `header`) — site-wide canon from `stardust/canon/header.html`; injected verbatim except the first provenance comment line. Lineage: site-wide system-component.
2. **legal-hero** — captured article header, retaining `August 16, 2021`, one H1 `Privacy Policy`, and the captured page description as the lede. Lineage: `p-privacy.html article.post header` + `current/pages/p-privacy.json#description`.
3. **policy-body** — full captured privacy-policy DOM from `p-privacy.html #post-toc-content`, including all paragraphs, H2/H3 headings, lists and inline links, rendered in a readable ~72ch prose column. Lineage: captured DOM.
4. **policy-toc** — optional sticky side rail at ≥1200px built only from captured H2 labels and anchors. Lineage: captured `.post-toc-list` / H2 ids.
5. **footer** (system-component role: `footer`) — site-wide canon from `stardust/canon/footer.html`; injected verbatim except the first provenance comment line. Lineage: site-wide system-component.

## Layout strategy

- Template: `<main data-template="static">`.
- Static legal page uses the editorial article rule in `DESIGN.md`: a 72ch prose column, generous line-height and sticky TOC at wide viewports.
- The TOC disappears below 1200px so the policy remains a single reading path.
- No `cta-band` appears: legal pages should not introduce conversion pressure between the policy text and legal footer. This decision is recorded in proposed-file provenance.

## Key states

- Default: complete policy text visible without JavaScript.
- Reduced motion: header nav transition only; no reveal-hiding or scroll animation is used.
- Empty/loading/error: N/A for captured static legal content.

## Interaction model

- Header nav and footer links use canonical targets.
- TOC links jump to captured H2 ids.
- Inline policy links retain captured hrefs.
- Mobile nav uses the canonical `pb-nav-toggle` script copied verbatim from `index-proposed.html`.

## Data attributes

- `header[data-section="header"][data-intent="navigation"][data-layout="contained"][data-module="site-header"][data-canon]`
- `main[data-template="static"]`
- `section[data-section="legal-hero"][data-intent="orient reader"][data-layout="contained"][data-module="static-hero"]`
- `section[data-section="policy-body"][data-intent="legal disclosure"][data-layout="side-rail"][data-items="17"]`
- `aside[data-section="policy-toc"][data-intent="navigate policy"][data-layout="side-rail"][data-items="17"]`
- `footer[data-section="footer"][data-intent="navigation"][data-layout="mega"][data-module="site-footer"][data-canon]`

## Captured H2 table of contents

  - `about` — ABOUT
  - `scope` — SCOPE
  - `personal-information-we-collect` — PERSONAL INFORMATION WE COLLECT
  - `how-we-use-your-information` — HOW WE USE YOUR INFORMATION
  - `disclosing-your-information-to-third-parties` — DISCLOSING YOUR INFORMATION TO THIRD PARTIES
  - `international-data-transfers` — INTERNATIONAL DATA TRANSFERS
  - `your-choices` — YOUR CHOICES
  - `your-privacy-rights` — YOUR PRIVACY RIGHTS
  - `your-right-to-be-forgotten` — YOUR RIGHT TO BE FORGOTTEN
  - `data-retention` — DATA RETENTION
  - `data-responsibility-with-ai-models` — DATA RESPONSIBILITY WITH AI MODELS
  - `security-of-your-information` — SECURITY OF YOUR INFORMATION
  - `third-party-websitesapplications` — THIRD PARTY WEBSITES/APPLICATIONS
  - `children%E2%80%99s-information` — CHILDREN’S INFORMATION
  - `supervisory-authority` — SUPERVISORY AUTHORITY
  - `changes-to-our-privacy-policy` — CHANGES TO OUR PRIVACY POLICY
  - `contact-us` — CONTACT US

## Unsourced content (placeholder list)

(none)

## Open questions for craft

(none — hands-off render; assumptions recorded in provenance)
