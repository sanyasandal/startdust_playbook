<!-- stardust:provenance
  writtenBy:        stardust:prototype/shape
  writtenAt:        2026-09-29T06:50:43Z
  page:             contact
  pageUrl:          https://www.playbook.com/contact/
  againstDirection: stardust/direction.md (Active 2026-09-29T06:30:00Z)
  consumedBy:       impeccable:craft
  readArtifacts:
    - stardust/current/pages/contact.json
    - stardust/current/pages/contact.html
    - https://www.playbook.com/demo-request (rendered form probe)
    - stardust/current/_brand-extraction.json
    - DESIGN.md
    - DESIGN.json
    - stardust/direction.md
  stardustVersion:  0.25.0
  _provenance:
    capturedSourceLineage:
      - section: header
        source: site-wide system-component from stardust/canon/header.html
      - section: contact-demo
        source: contact.html .contact-page-demo + iframe src https://www.playbook.com/demo-request rendered form
      - section: logo-marquee
        source: contact.html .contact-page-marquee-bleed (first 12 captured logos per long repeated-item rule)
      - section: footer
        source: site-wide system-component from stardust/canon/footer.html
    antiTemplatePass:
      - pattern: form hero
        defaultReflex: centered hero above generic form card
        alternatives:
          - split persuasion rail plus form card (keeps captured two-column contact layout)
          - form-first card with proof below
          - full-page embedded iframe mimic
        picked: split persuasion rail plus form card
        rationale: contact.html captures left persuasion copy, quote and resource cards beside right demo form iframe; this preserves that product-specific shape while removing iframe dependency.
      - pattern: logo marquee
        defaultReflex: static 5-up logo grid
        alternatives:
          - canon marquee track with contact logos
          - two-row staggered logo wall
          - compact trust row inside form card
        picked: canon marquee track with contact logos
        rationale: DESIGN.json confirms logo-marquee as module and contact.html captures the trust band heading.
      - pattern: closing CTA
        defaultReflex: append canon cta-band to every page
        alternatives:
          - append cta-band
          - omit cta-band because the page's primary form is already the conversion moment
        picked: omit cta-band
        rationale: user explicitly requested not ending with cta-band if it duplicates the form's purpose; contact form already captures lead intent.
    substrateTransitions:
      default: canvas
      exceptions:
        - section: logo-marquee
          substrate: paper border band
          purpose: separates trust proof after the form without introducing a second CTA ground
    voiceClassification:
      - section: header
        classification: captured-verbatim + direction-authorized CTA rewrite
        source: canon header
      - section: contact-demo
        classification: captured-verbatim
        source: contact.json body/headings + contact.html + demo-request rendered form
      - section: logo-marquee
        classification: captured-verbatim
        source: contact.html heading and logo alt text
      - section: footer
        classification: captured-verbatim
        source: canon footer
    signatureElements:
      - kind: cursor illustration trio
        capturedSource: contact.html .cursor-animation image URLs
        mechanism: static layered rounded image chips; hover lift only
        fallback: same images remain visible with reduced motion
    surpriseTier_typeScaleYields: []
-->
---
slug: contact
url: https://www.playbook.com/contact/
register: brand
surprise: low
dominantDimension: composition/form-split-proof
---

# Page shape: contact

## Sections (in render order)

1. **header** (site-wide system-component from `stardust/canon/header.html`) — canonical Playbook chrome, injected verbatim with first provenance comment stripped.
2. **contact-demo** (derived from `contact.html .contact-page-demo` and `https://www.playbook.com/demo-request`) — two-column conversion section: captured persuasion copy, quote, and two resource link cards on the left; captured demo form card on the right. Form fields are rendered directly rather than as an iframe, with `data-dynamic="form"` and action `https://www.playbook.com/demo-request`.
3. **logo-marquee** (derived from `contact.html .contact-page-marquee-bleed`) — canonical `logo-marquee` module structure using this page's captured heading and first 12 captured logo images; remaining captured logos are recorded for migrate via `data-slot="remaining-logos"` note.
4. **footer** (site-wide system-component from `stardust/canon/footer.html`) — canonical footer, injected verbatim with first provenance comment stripped.

## Layout strategy

- Desktop: 12-column split with the persuasion rail spanning five columns and form card spanning seven columns.
- Tablet/mobile: stack persuasion, form, then logo marquee. The form stays first actionable surface after the H1.
- Substrate: canvas throughout; logo marquee gets a paper-bordered band as the sole transition.
- No closing `cta-band`: it would duplicate the demo form's purpose and the user asked to record this decision.

## Key states

- Default: empty form with visible labels and captured placeholders.
- Focus: 2px signal ring with offset.
- Error: invalid required controls get signal-deep border/background styling using `:invalid:not(:placeholder-shown)` and `[aria-invalid="true"]`; no invented error copy.
- Loading/error backend states: not authored in the capture; migrate/dynamics owns real form submission behavior.

## Interaction model

- Form submits to captured action `https://www.playbook.com/demo-request` with `method="get"` and `data-dynamic="form"`.
- Required fields (captured by trailing `*` in labels): `Work email *`, `How big is your team? *`, `Where are you located? *`, `What are you looking for? *`.
- Optional field: `How did you hear about Playbook?`.
- Submit label: `Submit`.
- Link cards route to captured `https://playbook-assets.navattic.com/7kh00ao` and `/customers/`.

## Data attributes

- `header[data-section="header"][data-intent="navigation"][data-layout="contained"][data-module="site-header"]`
- `main[data-template="form"]`
- `section[data-section="contact-demo"][data-intent="capture lead"][data-layout="split-media"][data-interactive="form"]`
- `form[data-dynamic="form"][data-slot="demo-request-form"]`
- `section[data-section="logo-marquee"][data-intent="build trust"][data-layout="full-bleed"][data-module="logo-marquee"]`
- `footer[data-section="footer"][data-intent="navigation"][data-layout="mega"][data-module="site-footer"]`

## Unsourced content (placeholder list)

(none)

## Open questions for craft

(none — hands-off run; all assumptions are recorded above.)
