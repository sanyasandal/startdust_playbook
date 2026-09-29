<!-- stardust:provenance
  writtenBy:        stardust:direct (--prep, hands-off)
  writtenAt:        2026-09-29T06:30:00Z
  readArtifacts:
    - stardust/current/DESIGN.md
    - stardust/current/_brand-extraction.json
    - stardust/prototypes/index-improvements.md
  synthesizedInputs: []
  stardustVersion:  0.25.0
-->

---
name: Playbook
description: Brand-faithful refresh — charcoal on white, one hot accent, the spectrum as a signature band, one grotesk on a 1.25 scale, one chrome across every page.
colors:
  ink: "#292929"
  ink-strong: "#1a1a1a"
  ink-soft: "#434140"
  muted: "#666666"
  hairline-warm: "rgb(82 74 62 / 0.16)"
  canvas: "#ffffff"
  paper: "#fafafa"
  paper-deep: "#eeeeee"
  border: "#dadbdf"
  signal: "#ff2753"
  signal-deep: "#e01f47"
  spectrum-blue: "#6cb4ee"
  spectrum-violet: "#d46bca"
  spectrum-pink: "#ff3c8e"
  spectrum-orange: "#ff6b35"
typography:
  display:
    fontFamily: "stabil_grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.5rem, 4.6vw, 3.5rem)"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  h2:
    fontFamily: "stabil_grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2rem, 3.4vw, 2.75rem)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  h3:
    fontFamily: "stabil_grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.5rem, 2.2vw, 2.1875rem)"
    fontWeight: 500
    lineHeight: 1.2
  h4:
    fontFamily: "stabil_grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 500
    lineHeight: 1.3
  body:
    fontFamily: "stabil_grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.55
  small:
    fontFamily: "stabil_grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.45
  accent-serif:
    fontFamily: "victor_serif, Georgia, serif"
    fontSize: "inherit"
    fontWeight: 400
    lineHeight: 1.05
rounded:
  sm: "8px"
  md: "10px"
  lg: "14px"
  pill: "999px"
spacing:
  base: "4px"
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "40px"
  xl: "64px"
  sectionPadding:
    desktop: "64px"
    tablet: "48px"
    mobile: "32px"
components:
  button-primary:
    backgroundColor: "{colors.signal-deep}"
    textColor: "{colors.canvas}"
    rounded: "{rounded.md}"
    padding: "12px 22px"
  button-secondary:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    borderColor: "{colors.border}"
    rounded: "{rounded.md}"
    padding: "12px 22px"
  button-dark:
    backgroundColor: "{colors.ink-strong}"
    textColor: "{colors.canvas}"
    rounded: "{rounded.md}"
    padding: "12px 22px"
  card:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.lg}"
    padding: "24px"
  badge:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink-soft}"
    borderColor: "{colors.hairline-warm}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
  link:
    textColor: "{colors.ink}"
    decoration: "underline 1px, offset 3px; hover color {colors.signal-deep}"
---

# Design System: Playbook

## Overview

Playbook, refreshed rather than replaced. The captured brand stays pinned: charcoal ink on white, warm-grey paper, one hot signal red and the four-stop spectrum. Execution is tightened in five places:

- One chrome (the Astro IA) replaces the two site generations.
- One grotesk on a true 1.25 scale.
- One CTA pair: Start free and Book a demo.
- A deeper button red that passes AA.
- The spectrum becomes a signature band instead of gradient text.

Product imagery and UI screenshots remain the colour of the page. The layout is modular-catalogue: bento cards, tabbed product panels and a quiet editorial column for articles. Density is balanced, with 64px desktop section padding.

## Colors

- **Signal** `#ff2753` is the brand's single chromatic voice. Use it for non-text marks (dots, underlines, focus rings) and display type 44px and larger.
- **Signal deep** `#e01f47` fills primary buttons and marks links on hover. White on it measures 4.71:1.
- **Ink** `#292929`, **ink strong** `#1a1a1a` and **ink soft** `#434140` cover text and dark bands. **Muted** `#666666` measures 5.74:1 on white.
- **Canvas** `#ffffff`, **paper** `#fafafa`, **paper deep** `#eeeeee` and **border** `#dadbdf` are the grounds and lines. The warm hairline `rgb(82 74 62 / .16)` edges chips.
- **Spectrum** (`#6cb4ee` → `#d46bca` → `#ff3c8e` → `#ff6b35`, 90deg) is reserved as a signature band (max 4px) and for illustration grounds. It is never a text fill and never a full section surface.

### Named Rules

- **One signal per band.** A section carries at most one signal-coloured element plus the primary button.
- **Vestigial blue retired.** `#599ffe` does not ship.

## Typography

stabil_grotesk is the only UI family, served from the brand's own files at weights 300, 400 and 500. The captured 600 is rendered as 500, because the heavier 600 file is not published. AktivGrotesk is retired. victor_serif is allowed as a one-word italic accent inside a display headline, at most once per page.

The scale is a 1.25 ratio on an 18px body: 18 / 22 / 28 / 35 / 44 / 56. Headings use tight tracking (−0.02 to −0.025em). Body text runs at 1.55 line-height with a 68ch measure in article columns.

## Layout

- Container: 1200px, 24px gutters, 12-column grid.
- Section padding: 64 / 48 / 32px (balanced; the multi-audience hard floor applies).
- Page patterns:
  - Hero: left-anchored copy with the product image beside or below it.
  - Bento feature grid: asymmetric 2+3.
  - Tabbed product panel.
  - Logo marquee.
  - Editorial article: a 720px column with a sticky table of contents at ≥1024px.
  - Listing: card grid, 3 columns → 2 → 1.

## Elevation & Depth

The system is flat by default. Two captured shadows are allowed:

- `0 10px 24px rgb(60 60 60 / .05)` for menus and popovers.
- `0 10px 30px rgb(22 22 22 / .10)` for the card hover lift, paired with translateY(−4px).

Photography and product UI supply the rest of the depth.

## Shapes

- Buttons and inputs: 10px.
- Cards and panels: 14px.
- Images inside cards: 8px.
- Chips, badges and competitor pills: 999px.
- Avatars: 50%.

## Components

- **Buttons:** primary (signal-deep fill), secondary (white fill with a border), dark (ink-strong, for dark bands). Labels are sentence case at weight 500.
- **Card:** paper ground at 14px radius, image on top, then title (h4) and one line of body. The optional spectrum top edge is used on feature cards only.
- **Badge / chip:** a warm hairline pill, used for eyebrows, tags and competitor links.
- **Link:** ink with an underline; turns signal-deep on hover.
- **Header:** logo, then Product / API & SDK / Solutions / Resources / Pricing, with Book a demo (secondary) and Start free (primary) on the right. Collapses to a drawer below 900px.
- **Footer:** a 4-column link grid, the competitor pill row and a legal row.

## Do's and Don'ts

### Do

- Lead every hero with real product imagery.
- Use exactly two CTA labels site-wide.
- Keep one signal accent per band.

### Don't

- Fill text with gradients.
- Put white text on `#ff2753`.
- Revive AktivGrotesk or `#599ffe`.
- Build centered-hero plus three-identical-cards SaaS silhouettes.
