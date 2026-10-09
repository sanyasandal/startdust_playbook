<!-- stardust:provenance
  writtenBy:        stardust:direct (--prep, hands-off)
  writtenAt:        2026-09-29T06:30:00Z
  readArtifacts:    [stardust/current/*, stardust/.work/extract/tensions.json]
  stardustVersion:  0.25.0
-->

# Active direction (2026-09-29T06:30:00Z)

## Phrase

> "please do a fresh stardust migration for the site https://www.playbook.com/"

This is a hands-off run. The phrase carries migration intent with flow=redesign, chosen by the user in the flow question. It pins no visual axis.

## Restatement

Re-platform playbook.com onto AEM Edge Delivery as a **brand-faithful refresh**. Keep palette, type family, imagery and IA pillars. Fix the execution gaps the extraction measured (chrome split, CTA sprawl, accent contrast, type scale, gradient text). This is not a zero-movement replica, because the user chose the redesign flow over replica.

## Movements

- expressive: unchanged (committed)
- distinctiveness: unchanged
- tone: unchanged (plain-spoken, confident)
- density: balanced (hands-off default; multi-audience floor fired: >5 sections, 3 audience tracks)
- ia-fidelity: reimagined (hands-off default; chrome unification needs section-level moves)
- register: brand (inherited from current/PRODUCT.md)
- audience: creative-ops teams plus a developer track (derived from the Solutions and API/SDK menus)

## Gaps and questions

No questions were asked (hands-off). Every answer below was derived from captured evidence:

- Q density: resolved to balanced, as a named assumption.
- Q ia-fidelity: resolved to reimagined, as a named assumption.

## Anchor references

None were researched. Mode A pins palette and type, and the non-pinned seed dimensions were reasoned from the capture (see DESIGN.json § divergence.seed).

## Anti-references

- Enterprise-grey DAM portals
- Nested-folder cloud storage
- Generic-2026-SaaS silhouette
- Gradient text

## Divergence inputs

Brand-faithful mode (Mode A, signal-strong):

| Dimension | How it was set | Value |
|---|---|---|
| decade | rolled | 2025-now |
| craft | reasoned | product-UI photography |
| register | reasoned | modular catalogue |
| ground-family | inherited | stark-white (brand-faithful override) |
| font deck | inherited | stabil_grotesk (AktivGrotesk retired) |
| palette | inherited | captured set, role-renamed signal/ink/paper/canvas |

Mode A+ refinements (evidence-gated):

- Button fill `#ff2753` → `#e01f47` (the captured hover colour). Contrast goes from 3.71 to 4.71.
- Heading weight 600 → 500, because no 600 file is published.

Signature preservation: the home hero's photographic ground that insets on scroll (`voice.heroMedium`) is reproduced. It is exempt from the kinetic-grid no-parallax rule because it is an inset, not parallax.

Motion register: kinetic-grid (SaaS, modular-catalogue).

## Command sequence (proposed)

1. prototype --prep: one archetype per type, plus canon from home.
2. impeccable critique, audit and adapt on each archetype.
3. assets, then the dynamics gate.
4. migrate.
5. rollout to EDS.

## User confirmation

Hands-off: confirmation was auto-resolved by these named assumptions:

- Type catalog accepted as inferred.
- All 7 module candidates confirmed and renamed: faq, related-posts, cta-band, tool-crosspromo, logo-marquee, feature-grid, comparison-table.
- Roster exclusions (locales, /s/, tags) recorded as scope debt.

## Pages in scope

68 pages: landing 21 · article 32 · listing 4 · program 6 · form 1 · static 3 · unique 1.

## Prep: wider re-evaluation

The full 68-page crawl confirms the brand register. The blog and tutorials (45 pages) pull toward editorial, so the article archetype gets a reading column, but the site-level register holds. No new tensions came out of the wider crawl beyond T-source-defects: freelancers has 5 imgix 404s, and publish is an empty page. Both are carried as known source defects, not fabricated over.

## nexcent (Figma community landing) — hands-off, 2026-10-09
- **Named deviation:** a Figma REST decoder (files/images API + `use_absolute_bounds` exports) and a hand-built prototype replace `extract` and `prototype` for this page.
  - Why: the source is a Figma frame, not a live site, so `extract` has nothing to crawl. The figma-to-content skill was excluded by the user.
  - Where: `stardust/prototypes/nexcent/` (prototype) and `stardust/.work/ds/` (helpers; gitignored).
- **Assumption (hands-off):** the Figma design is the source of truth. Flow `redesign` is retained, with the design kept 1:1.
- **Assumption (hands-off):** lorem copy is kept verbatim as authored in Figma.
- **Assumption (hands-off):** the page path is `/nexcent`.
- **Assumption (hands-off):** isolated `nx-*` blocks, so the playbook blocks are not affected.
- **Assumption (hands-off):** the Inter variable font (OFL) is self-hosted as `fonts/inter-var-latin.woff2`.
- **Assumption (hands-off):** the newsletter form is presentational. No backend was specified; submit calls `preventDefault`.
- **Assumption (hands-off):** nav anchors (#service, #feature …) and the CTA links are `#` placeholders, as in the design.
