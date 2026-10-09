# Stardust journal — playbook.com

## extract --prep (hands-off)
- Roster: 68 English pages from 2,238 sitemap URLs (caps 100 overall / 20 per template).
- **Assumption (hands-off):** excluded 196 locale variants (14 locales × 14 Astro pages), 1,481 `/s/` user share pages, and 124 `/p/tag-*` pages. Locales are content-pending for rollout, not redesign templates.
- Provenance: 68/68 live, medium wait, 0 failures.
- Source defects: `/freelancers/` has 5 illustration 404s on playbook-beta.imgix.net; `/publish/` is an empty Ghost page.
- Two chrome generations (Astro mega-menu vs Ghost legacy nav). The redesign unifies them onto the Astro chrome.
- Module candidates: faq-accordion, related-posts, closing-cta, app-crosspromo, logo-marquee, feature-grid, comparison-table.

## deploy — login-stardust (One AZ, hands-off)
- Prototype `prototypes/login-stardust/index.html` hand-derived from decoded Figma frame `13496:10760`.
- Schema: 1 section (`sign-in`, 12 items). Prototype aligned to the design after the first round-trip: Login became an anchor CTA (role swap), and the eye reveal icon was added.
- Gates: davids-model-lint 0🔴/0🟡; block-roundtrip closed, 0 structural 🔴; EW sign-in editable 11/13, dead 0, dup 0, exempt 2 (placeholders → attributes), edit drift 0.
- Known: `az-header`/`az-footer` (reused, pre-existing) are textContent-rebuild blocks — 22 authored texts are not EW-editable; out of scope.
- Deployed to DA `login-stardust`, previewed on `az-login-stardust`. Stage B: decorated at 1440/768/390, form behaviour verified, visual diff vs `/login` reference fixed (full-width alternatives).
