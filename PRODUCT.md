<!-- stardust:provenance
  writtenBy:        stardust:direct (--prep, hands-off)
  writtenAt:        2026-09-29T06:30:00Z
  readArtifacts:
    - stardust/current/PRODUCT.md
    - stardust/current/_brand-extraction.json
    - stardust/current/pages/*.json (68)
  synthesizedInputs: []
  stardustVersion:  0.25.0
-->

# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

People in creative operations who spend their days in visual files:

- in-house brand and marketing teams
- creative agencies
- media and entertainment production
- game studios
- consumer brands
- freelancers and photographers

Developers (API/SDK, MCP, GPT) form a parallel track and need their own route through the IA. All of them are addressed in the same plain-spoken, confident voice.

## Product Purpose

One visual library that covers the whole creative-ops lifecycle, from upload to final. The site exists to turn visitors into a free sign-up or a booked demo, and to earn search traffic through the blog, tutorials and free tools.

## Positioning

Playbook is the friendly, AI-native alternative to both folder-based cloud storage and heavyweight enterprise DAMs. Files are shown rather than listed, they organize themselves, and AI agents can reach them over MCP. "From upload to final. One library for your entire creative ops."

## Capabilities and Constraints

- Target platform is AEM Edge Delivery Services. There is no build step, and blocks come from authored content.
- Migration scope is 68 English pages across 7 types. Locales, `/s/` share pages and tag archives are out of scope.
- Conversion happens off-site at `/sign-up/` and the `/contact/` demo form. The free tools are app surfaces embedded on marketing pages.
- The brand fonts (stabil_grotesk, victor_serif) are proprietary. They are served from the brand's own files, and the licence must be confirmed before go-live.
- Constraint: `a11y-first` (WCAG 2.2 AA).

## Brand Commitments

- **Register:** brand.
- **Personality:** confident, plain-spoken, creative-community warm, AI-forward, product, SaaS, modular-catalogue.
- **Anti-references:**
  - enterprise-grey DAM portals
  - nested-folder cloud storage
  - the Generic-2026-SaaS silhouette (centered hero, three identical feature cards, gradient blob)
  - gradient-filled body text

## Evidence on Hand

- `stardust/current/pages/*.json` holds the full copy for all 68 live pages.
- `stardust/current/assets/screenshots/` holds the page screenshots.
- The home hero (`img.playbook.com`, 1920×1080) and the customer logos are available through their public URLs.
- Font files are in `stardust/current/assets/fonts/`.
- Do not fabricate:
  - testimonial quotes on marketing pages beyond captured copy
  - pricing numbers other than those on `/pricing/`
  - team photos beyond `/about-us/`

## Product Principles

1. **Show the files.** Imagery and product UI carry every hero and feature band.
2. **One path to start.** Every page offers the same two actions: Start free and Book a demo.
3. **One site, one chrome.** Marketing pages, the blog and the tools read as one product.
4. **Say it once, plainly.** Keep headlines short and declarative, with no stacked hype.

## Accessibility & Inclusion

The site holds WCAG 2.2 AA:

- White text never sits on `#ff2753` (3.71:1). The filled-button accent is `#e01f47` (4.71:1).
- Copy never uses gradient text.
- Icons are labelled inline SVG, not an icon font.
- `prefers-reduced-motion` is honoured.
