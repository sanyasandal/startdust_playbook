<!-- stardust:provenance
  writtenBy:        stardust:extract
  writtenAt:        2026-09-28T10:18:00Z
  readArtifacts:
    - stardust/current/_brand-extraction.json
    - stardust/current/_computed-styles.json
  synthesizedInputs: []
  stardustVersion:  0.25.0
-->

---
name: Playbook (current state)
description: Visual-first, AI-native media library / DAM — clean charcoal-on-white SaaS with one hot accent and a spectrum gradient
colors:
  ink: "#292929"
  ink-strong: "#1a1a1a"
  ink-soft: "#434140"
  muted: "#666666"
  muted-warm: "rgb(82 74 62 / 0.82)"
  hairline-warm: "rgb(82 74 62 / 0.16)"
  surface: "#eeeeee"
  surface-soft: "#fafafa"
  background: "#ffffff"
  border: "#dadbdf"
  accent: "#ff2753"
  accent-hover: "#e01f47"
typography:
  display:
    fontFamily: "stabil_grotesk, AktivGrotesk, Helvetica, Arial, sans-serif"
    fontSize: "clamp(2.25rem, 4.2vw, 3.625rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  h2:
    fontFamily: "stabil_grotesk, Helvetica, Arial, sans-serif"
    fontSize: "clamp(1.75rem, 3vw, 2.5rem)"
    fontWeight: 600
    lineHeight: 1.15
  h3:
    fontFamily: "stabil_grotesk, Helvetica, Arial, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.25
  body:
    fontFamily: "stabil_grotesk, Helvetica, Arial, sans-serif"
    fontSize: "17px"
    fontWeight: 500
    lineHeight: 1.5
  small:
    fontFamily: "stabil_grotesk, Helvetica, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: 1.4
  accent-serif:
    fontFamily: "victor_serif, Georgia, serif"
    fontSize: "inherit"
    fontWeight: 400
    lineHeight: 1.1
rounded:
  sm: "8px"
  md: "10px"
  lg: "14px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "48px"
  xl: "96px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.background}"
    rounded: "{rounded.md}"
    padding: "12px 20px"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
  button-dark:
    backgroundColor: "{colors.ink-strong}"
    textColor: "{colors.background}"
    rounded: "{rounded.md}"
    padding: "12px 20px"
  button-secondary:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.md}"
    padding: "12px 20px"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "24px"
  chip:
    backgroundColor: "{colors.background}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.pill}"
    padding: "6px 14px"
---

# Design System: Playbook (current state)

## Overview

Playbook's live site is a clean, charcoal-on-white SaaS surface. Photographic heroes and product-UI mockups carry most of the visual weight. The type is one confident grotesk (stabil_grotesk) set heavy (600) at display sizes, with no tracking theatrics. Colour is restrained: warm-grey neutrals plus a single hot pink-red accent, `#ff2753`, on primary CTAs and eyebrows. On the newer Astro industry pages a blue → magenta → pink → orange spectrum gradient appears as gradient-filled headline text.

The site is mid-migration between two generations:

- **Astro** (14 marketing pages): new mega-menu, landscape-photo heroes that inset on scroll, bento solution cards, logo marquee.
- **Ghost** (blog, tutorials, legal, legacy landings): older nav, AktivGrotesk on some headings, TOC sidebars, warm-grey hairline chips.

The cross-page tokens below favour the dominant (element-count) values.

## Colors

### Primary
- **Accent** `#ff2753` (hover `#e01f47`): primary CTA fill (Start free / Create Playbook free), eyebrows, inline links. 1,290 weighted uses; it is the only chromatic brand colour.

### Neutral
- **Ink** `#292929`: body text and headings (8,045 uses).
- **Ink strong** `#1a1a1a`: dark hero surfaces (enterprise, games, sdk, media-and-entertainment) and dark buttons.
- **Ink soft** `#434140`: nav links and secondary button text.
- **Muted** `#666666` and **muted warm** `rgb(82 74 62 / .82)`: secondary copy. The warm-grey family also draws hairlines at 16% alpha.
- **Surface** `#eeeeee` and **surface soft** `#fafafa`: card and section grounds, secondary buttons.
- **Border** `#dadbdf`: button and input outlines.

### Named Rules
- **The spectrum rule.** `linear-gradient(90deg, #6cb4ee, #d46bca, #ff3c8e, #ff6b35)` is reserved for hero headline fragments and feature accents on industry pages (68 instances). It never fills a surface.
- **Vestigial blue.** `--primary-color: #599ffe` exists as a token but has only 8 uses. It is not part of the brand.

## Typography

- **stabil_grotesk** is the workhorse: 3,848 measured elements covering headings, body and buttons. **AktivGrotesk** (975) survives on legacy Ghost headings. **victor_serif** (6 uses) supplies italic serif accents. All three are proprietary.
- Weights: 600 dominates headings and buttons, 500 is body, 700/800 are occasional display weights, and 400 is rare.

### Hierarchy
- Display: 50px (195 instances), up to 58px on Astro heroes.
- H2: 40/32px.
- H3: 28/24px (24px is the most common heading size, 478 instances).
- H4: 20/18px.
- Body: 17–19px Astro, 16px Ghost.
- Small: 13–14px.

## Layout

- Centered container around 1200px with 24px gutters.
- Section rhythm is 96–128px desktop and 64px mobile on Astro pages.
- Ghost articles use a narrow reading column (~720px) with a sticky TOC sidebar.
- Common grid patterns: bento solution cards (2+3), tab panels with a screenshot beside step lists, 4-column footer link grid, pricing 4-card row.

## Elevation & Depth

Mostly flat. There are two soft shadows:

- `rgba(60,60,60,.05) 0 10px 24px` on mega-menu cards (122 instances).
- `rgba(22,22,22,.1) 0 10px 30px` as a card hover lift (55 instances).

Depth otherwise comes from photography and UI mockups, not from chrome.

## Shapes

- Radius: 10px on buttons and nav (mode, 1,299), 14px on cards and panels (largest area), 8px on images inside panels.
- Pill `999px` for chips, competitor-comparison links and tags (758).
- Avatars and icon discs use `50%`.

## Components

### Buttons
- Primary: accent fill, white text, 10px radius, weight 600.
- Dark: `#1a1a1a` fill (Schedule a demo).
- Secondary: `#fafafa` with `#dadbdf` border, hovering to `#efefef` with a `#262626` border.

### Chips
- Pill with a warm hairline border `rgb(82 74 62 / .16)`, hovering to a 6% warm tint. Used for competitor links in the footer and for tags.

### Cards / Containers
- 14px radius on `#eeeeee` or white. Bento solution cards pair an image with a title and one line of copy. Hover lifts the card with a shadow.

### Navigation
- **Astro:** logo, then Product / API/SDK / Solutions / Resources mega-menus and Pricing, with Schedule a demo (dark) and Get started for free (outline) on the right.
- **Ghost:** an older menu with a different Product drop-down (Playbook 101, Visual storage…).
- Footer: a 4-column link grid (Product · Playbook for · Resources · Company), a QR app-download card, the vs-competitor pill row and a legal row.

### Logo marquee (signature)
- Two rows of client logos scrolling in opposite directions under "Over two million creatives, and world-class brands".

## Do's and Don'ts

### Do:
- Keep one accent per band; charcoal carries the rest.
- Let product UI and photography supply the colour.

### Don't:
- Mix the two chrome generations on one page.
- Promote `#599ffe`.
- Set body copy in gradient text.
