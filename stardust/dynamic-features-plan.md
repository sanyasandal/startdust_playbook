<!-- stardust:provenance
writtenBy: stardust:dynamics (prepare-migration Phase 4.5, hands-off)
writtenAt: 2026-09-29T07:20:00Z
readArtifacts: stardust/dynamic-features.md
-->

# Dynamic features — plan

Static first, then wire. Every row already degrades to a working static page. Phases run at migrate, deploy or rollout.

## Phase A: client-only (self, ships autonomously at migrate/deploy)

| feature | deliverable | authoring contract | verification |
|---|---|---|---|
| pricing-billing-toggle | `pricing` block: a Monthly / Yearly radio pair swaps the captured monthly and yearly price strings | the block table carries both captured prices per plan | toggle flips every plan price at 1440/360 (parity `click-changes-text`) |
| pricing-calculator | `pricing-calculator` block: need-checkboxes → "Your monthly cost" total, with inline JS and no network | the captured per-need prices are authored as block rows | checking or unchecking a need changes the total (parity) |
| header-mega-menu | header block dropdowns built from the nav fragment (`aria-expanded`, Esc, click-outside) | nav fragment lists | keyboard open/close; hamburger below 900px |
| demo-request-form | `embed` of `https://www.playbook.com/demo-request` on /contact/; "Book a demo" links to /contact/ | the contact doc carries the embed URL | iframe loads with 200 and shows 5 fields |

Effort: about half a day. Owner decision: none.

## Phase B: static content (self)

These ship as authored content at migrate:
- blog-listing: document-first `post-list` rows
- article-toc
- tool-tiles
- blog-content-ghost: images hot-linked; 54/54 resolve
- pricing-commerce
- hero-video-mux: poster only (skipped-source-broken)

Verification: rollout content and link audit.

## Phase C: owner decision batch (interim shipped; recorded under hands-off)

- **D1: tags and consent.** Interim: nothing installed; `scripts/delayed.js` gets a disabled stub listing the source vendors.
- **D2: blog index wiring.** Interim: the static list. Unfreeze when a tools.aem.live admin token exists: configure the index and switch `post-list` to top-up mode.
- **D3: locale scope.** Interim: EN-only; hreflang is dropped on pricing.

## Parity (Phase 5, after deploy)

Write `stardust/dynamics/parity.json` with checks for:
- the pricing toggle
- the calculator
- mega-menu keyboard behaviour
- the demo iframe load

Replay with `dynamics-check.mjs --origin https://main--startdust_playbook--sanyasandal.aem.page`.
