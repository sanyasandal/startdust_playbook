<!-- stardust:provenance
writtenBy: stardust:dynamics (prepare-migration Phase 4.5, hands-off)
writtenAt: 2026-09-29T07:10:00Z
readArtifacts: stardust/current/_dynamics.json, stardust/dynamics/dynamic-features.generated-plan.json, stardust/current/pages/{contact,pricing,gifmaker,blog}.html, live probe https://www.playbook.com/demo-request
curation: 30 detected rows + 2 manual rows (contact demo iframe, pricing calculator) -> 16 features; noise merged/dropped with reason below
-->

# Dynamic features — www.playbook.com

## Listings contract

- **Blog listing (`/blog/`)**: it is **document-first**. Migrate authors every captured post card (image, title, link) as rows in the `post-list` block, so the listing works statically with no index. Wiring it to the query index is deferred. This repo's `AGENTS.md` says `helix-query.yaml` is retired and index config lives at tools.aem.live (the config service). That is an admin write, and no admin token exists in this run, so the step is recorded as decision D2.
- Metadata that each article page must emit so a later index can read it: `title`, `description`, `og:image` → `image`, `publication-date` (captured `article:published_time`), and `template: article`.
- Related-posts rails on articles are the captured text lists and are authored as content. They are not index-driven.

## Features

| # | id | feature | class | reach | disposition | reproducibility | status | pattern | decision / owner | evidence |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | demo-request-form | "Book a demo" demo-request form: iframe → first-party `/demo-request` app page (5 fields, JS submit) on /contact/ and as a site-wide modal on 44 captured pages | F / M | 44/68 | embed-passthrough (contact) + rebuild-native (modal → link to /contact/) | self | planned | iframe embed on contact; canonical "Book a demo" CTA links to /contact/ instead of opening a modal | none: the form stays live on the app origin | `iframe#contactDemoIframe`, `iframe#demo-iframe`; live probe fields match prototype labels |
| 2 | pricing-billing-toggle | Monthly / Yearly billing toggle (radio `plans-billing`, `compare-billing`) | F | 1 (pricing) | client-only | self | planned | client-compute | none | pricing.html `.pb-pricing-toggle` |
| 3 | pricing-calculator | "Your monthly cost" calculator (need checkboxes → total) | F | 1 (pricing) | client-only | self | planned | client-compute | none — price table captured into block config | pricing.html `.pb-calc__box` + inline i18n strings |
| 4 | header-mega-menu | Header nav dropdowns (`aria-haspopup`, target mounted on open) | M | 68/68 | rebuild-native | self | planned | chrome-interaction | none | modal-trigger rows ×2 merged |
| 5 | blog-listing | Blog post feed (~100 cards, category chips as links) | L | 1 (+ category pages) | static-snapshot | self | planned | document-first list | D2 index wiring — reason: "document-first; index via config service when admin access exists" | blog.html |
| 6 | article-toc | In-article "On this page" TOC (6/17 anchors) | L→static | articles, legal | static-snapshot | self | planned | authored anchor list | none — detector false-positive listing | `post-toc-list` |
| 7 | tool-tiles | Free-tool "Try it now" / "Upload any files" tiles (gifmaker, logomaker, …) | static | 8 program pages | static-snapshot | self | planned | authored info tiles | none: source tiles are non-interactive; creating happens in the app after sign-up | gifmaker.html `.ai-try-boxes` |
| 8 | hero-video-mux | Hero `<video>` HLS from stream.mux.com | V | 1 (gifmaker) | static-snapshot | self | skipped-source-broken | poster image | none — playlist, renditions, thumbnail 404 on source | `state.site.sourceDefects[0]` |
| 9 | blog-content-ghost | Blog body served from Ghost (`playbook-at.ghost.io`, `storage.ghost.io` images) | A | articles | static-snapshot | self | planned | captured DOM as content; images hot-linked | none — images resolve 200 (54/54 checked) | 3rd-party host rows ×2 merged |
| 10 | tags-analytics | GTM, GA/Ads, DoubleClick, Cloudflare Insights, New Relic, Sentry, PostHog, Apollo, UnifyIntent (tag + api), aplo-evnt | T | 68/68 | embed-passthrough (not installed) | needs-business-decision | scaffolded-awaiting-owner | consent-gated-tags | D1 — which tags + property ids on the new host | 13 host rows merged |
| 11 | consent-termly | Termly CMP | T | 68/68 | embed-passthrough (not installed) | needs-business-decision | scaffolded-awaiting-owner | consent-gated-tags | D1 | app.termly.io |
| 12 | chat-front | Front chat widget + Statuspage | T | 4/7 | embed-passthrough (not installed) | needs-business-decision | scaffolded-awaiting-owner | consent-gated-tags | D1 | chat-assets.frontapp.com, statuspage.io |
| 13 | locale-trees | 17 locale variants of /pricing/ (de, es, fr, …) | I18N | pricing | decided-out (this wave) | needs-business-decision | interim | locale-tree | D3 — locale scope; EN-only wave, hreflang removed | pricing hreflang |
| 14 | auth-links | Sign-in / sign-up / account links | X | 68/68 | decided-out | needs-backend | planned | absolute links to app origin | none — links keep `https://www.playbook.com/login/`, `/sign-up/` | x-sign-in row |
| 15 | airtable-embed | static.airtable.com (1 page) | T | 1 | embed-passthrough | self | planned | iframe as authored | none | airtable host row |
| 16 | pricing-commerce | Price strings (23), no cart | X | pricing | static-snapshot | self | planned | captured prices as content | none — no cart/checkout on source | x-commerce row |

**Dropped as noise (with reason):**
- `d-first-party-data-file…_clientMiddlewareManifest.json` is framework internals of the Next.js app shell. There is no consumer on the migrated pages.
- `a-cms-app-settings-object-datalayer` belongs to the tags row (#10).
- `i18n-locale-variants-en-us` is an outbound support.apple.com link, not a locale tree.
- `t-www-google-co-in` is the regional endpoint of the GA/Ads beacon (#10).

## Decision batch (one message to the owner; hands-off → interim shipped, recorded)

- **D1: tags and consent.** Decide which of GTM, GA/Ads, DoubleClick, Cloudflare Insights, New Relic, Sentry, PostHog, Apollo, UnifyIntent, Termly and Front chat run on the EDS host, and supply their property ids.
  - *Interim:* none installed; `scripts/delayed.js` gets a disabled, commented config stub.
- **D2: blog index wiring.** A query-index config via tools.aem.live needs an admin token.
  - *Interim:* the document-first static list.
- **D3: locale scope.** The 17 locale variants of pricing were never crawled.
  - *Interim:* EN-only; locale roots are listed as scope debt.

## Register (decided-out)

| feature | reason | production statement |
|---|---|---|
| auth-links | session-bound app on www.playbook.com | "Sign in / Start free go to the Playbook app; the marketing site links there." |
| locale-trees (this wave) | out of crawl scope | "English only in this migration wave; locales tracked as scope debt D3." |
