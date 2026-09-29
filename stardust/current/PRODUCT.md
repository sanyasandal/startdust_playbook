<!-- stardust:provenance
  writtenBy:        stardust:extract
  writtenAt:        2026-09-28T10:15:00Z
  readArtifacts:
    - stardust/current/_brand-extraction.json
    - stardust/current/_computed-styles.json
    - stardust/current/pages/*.json (68)
  synthesizedInputs: []
  stardustVersion:  0.25.0
-->

# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Creative professionals and teams who manage visual media: in-house brand and marketing teams, creative agencies, media and entertainment production teams, game studios, consumer-goods brands, freelancers and photographers. A developer audience is served too: the API/SDK and MCP pages, plus the "API call" blog series.

_provenance: inferred. Basis: the Solutions mega-menu (Enterprise Marketing, Media & Entertainment, Creative Agency, Consumer Brands, Game Studios), the freelancers and photo-gallery pages, and the /sdk, /mcp and /gpt pages._

## Product Purpose

Playbook is a visual-first digital asset management (DAM) and media library. It covers upload, auto-tagging, AI visual search, review and approvals, sharing as galleries or portals, and a desktop sync app. An MCP server lets AI agents search, tag and move assets.

## Positioning

"From upload to final. One library for your entire creative ops." Playbook positions itself as the friendlier, AI-native alternative to both generic cloud storage (Dropbox, Google Drive) and heavyweight DAMs (Air, Perforce, Simian, Wiredrive, Plytix, Tagbox). The comparison pages and footer pills make that competitive framing explicit. The site reports "Over two million creatives, and world-class brands" (logo marquee: Warner Bros, Opendoor, Australian Sailing and others).

## Capabilities and Constraints

- Marketing site split across two stacks: an **Astro** set of 14 marketing pages (new chrome, served in 15 locales) and a **Ghost** set for the blog, tutorials, legal and legacy landing pages (older chrome).
- Six free "mini-app" tool pages (GIF maker, logo maker, vectorizer, video captions, video converter, watermarks) share one template.
- Sign-up and demo booking happen off-site (`/sign-up/`, `/contact/`). The contact page carries the demo form.
- 1,481 user-generated `/s/` share pages are product surface, not marketing. They are out of scope for this migration.
- Brand fonts (stabil_grotesk, AktivGrotesk, victor_serif) are proprietary, so a licensing check is required before go-live.

## Brand Commitments

- **Register:** `brand` (marketing / landing).
- **Personality observed:** confident, plain-spoken, creative-community warm, AI-forward. Short declarative headlines. Warm greys (`#524a3e` alpha tints) sit alongside charcoal ink (`#292929`), with one hot accent (`#ff2753`) plus a spectrum gradient (blue → magenta → pink → orange) for heroes.
- **Anti-references observed:** enterprise-grey DAM portals and "nested folder" cloud storage, the pain the story page names outright ("designers were quitting because file management was giving them so much anxiety").

## Evidence on Hand

- `stardust/current/pages/` holds 68 live Playwright captures (JSON + rendered HTML).
- `stardust/current/assets/screenshots/` holds 68 full-page 1440px screenshots.
- `stardust/current/_computed-styles.json`: style census, 68 pages × 2 widths.
- `stardust/current/_brand-extraction.json`: the consolidated brand surface.
- `stardust/current/_crawl-log.json`: discovery, capture gaps, dynamic surface, vision check.
- `stardust/current/assets/logo.png` and `assets/favicon.ico`.

## Product Principles

_provenance: inferred. Basis: recurring homepage/product copy._

1. Visual first: files are shown, not listed ("ready to share as a gallery — not a zip folder").
2. Organize itself: auto-tagging, versioning and AI Actions remove busywork.
3. Connected: MCP, API and integrations with Figma, Adobe and Slack.
4. Approachable: free to start, with seconds-to-sign-up messaging on every tool page.

## Accessibility & Inclusion

_provenance: inferred._ On the observed surfaces:

- Headline text uses gradient fills, which put contrast at risk.
- Secondary text uses warm grey at 72% alpha.
- Social icons are drawn with a private icon font (Alto) instead of labelled SVG.

The redesign should hold WCAG 2.2 AA.
