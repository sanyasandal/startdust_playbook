# Stardust journal — playbook.com

## extract --prep (hands-off)
- Roster: 68 English pages from 2,238 sitemap URLs (caps 100 overall / 20 per template).
- **Assumption (hands-off):** excluded 196 locale variants (14 locales × 14 Astro pages), 1,481 `/s/` user share pages, and 124 `/p/tag-*` pages. Locales are content-pending for rollout, not redesign templates.
- Provenance: 68/68 live, medium wait, 0 failures.
- Source defects: `/freelancers/` has 5 illustration 404s on playbook-beta.imgix.net; `/publish/` is an empty Ghost page.
- Two chrome generations (Astro mega-menu vs Ghost legacy nav). The redesign unifies them onto the Astro chrome.
- Module candidates: faq-accordion, related-posts, closing-cta, app-crosspromo, logo-marquee, feature-grid, comparison-table.

## nexcent — Figma → EDS via stardust deploy, hands-off (2026-10-09)
- Prompt: "use stardust and migrate <Figma InuUNDoinVB9983TrvNlY8 node 5-573> to EDS in auto mode". The figma-to-content skill was **not** used.
- Source: Figma REST API (user PAT, never committed). Exported `full.json` and `full.png` (1440×4376), SVG icons, and PNG@2x illustrations (absolute bounds). Raw image fills came from `/files/:key/images`.
- Flow: hand-built prototype `stardust/prototypes/nexcent/index.html` with per-block `<style data-block>`, lifted mechanically into 10 isolated `nx-*` blocks. Content: `content/nexcent.html`, created in DA at `/nexcent`.
- Gates passed:
  - davids-model-lint: 0 🔴, 4 🟡, justified in the conversion log
  - block round-trip: closed for 10/10 blocks
  - EW probe: 65/65 editable, 0 dead
  - Stage B (1440, 768, 390): every block loaded, no errors or overflow
- Fixes made during Stage B, each now absorbed into the block CSS:
  - The repo's `body > header` is itself `.header-wrapper`, so the site chrome is now hidden with `:not(.nx-*-wrapper)`.
  - The global `h1–h6` font-family, letter-spacing and `text-wrap: balance` are neutralised per block.
  - The prototype now loads `/styles/styles.css`, so it reflects those globals.
  - Footer list metrics corrected.
  - The `nx-stat-clubs` SVG export was broken (inside-stroke masks), so it was rebuilt from `nx-feat-clubs`'s hand paths.
  - The feature h3 width is pinned to 231px, as in Figma.
- Result: 1440 page height 4374 vs Figma 4376.
- Steps by phase:
  - 7-blocks: nx-header, nx-hero, nx-clients, nx-features, nx-split, nx-stats, nx-testimonial, nx-posts, nx-cta, nx-footer.
  - 9-content: 7 images uploaded to DA `.nexcent/` from Figma URLs; page created and previewed.
  - local-qa: lint, round-trip and EW probe as above.
  - 10-reconcile: branch preview verified, and the mobile nav smoke test passed (opens, Escape closes, `aria-current`).
