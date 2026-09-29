<!-- stardust provenance: skill=stardust:dynamics · phase=plan draft · 2026-09-29T07:05:11.742Z · input stardust/current/_dynamics.json (7 pages, 30 findings) -->
# Dynamic features — draft inventory (curate into `stardust/dynamic-features.md`)

One row per detected finding. Merge duplicates, drop noise, keep every axis honest. Columns: disposition = what we do · reproducibility = what it needs · status = where it stands (reference/triage.md).

| # | id | class | feature | pages | disposition | reproducibility | status | pattern | decision needed | notes |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | a-unknown-third-party-host-playbook-at-ghost-io | A | unknown third-party host playbook-at.ghost.io | 6/7 | static-snapshot | needs-human-capture | pending | inspect | inspect the XHR, add a vendor row |  |
| 2 | a-cms-app-settings-object-datalayer | A | CMS / app settings object dataLayer | 6/7 | static-snapshot | self | pending | read-settings | — (keys name endpoints, ids, vendors) |  |
| 3 | a-unknown-third-party-host-aplo-evnt-com | A | unknown third-party host aplo-evnt.com | 3/7 | static-snapshot | needs-human-capture | pending | inspect | inspect the XHR, add a vendor row |  |
| 4 | a-unknown-third-party-host-api-unifyintent-com | A | unknown third-party host api.unifyintent.com | 3/7 | static-snapshot | needs-human-capture | pending | inspect | inspect the XHR, add a vendor row |  |
| 5 | d-first-party-data-file-get-next-static-rtihamax8hnh9gv-uy6z | D | first-party data file GET /_next/static/RtihaMAX8hnh9gv_uY6ZE/_clientMiddlewareManifest.json | 4/7 | data-fed | self | pending | sheet-sync | none (sync from the source origin) |  |
| 6 | f-form-less-control-group-in-section-pb-section-2-controls | F | form-less control group in section.pb-section (2 controls) | 1/7 | client-only | self | pending | client-compute | none |  |
| 7 | i18n-locale-variants-en-us | I18N | locale variants en-us | 1/7 | rebuild-native | needs-business-decision | pending | locale-tree | scope of the locale trees |  |
| 8 | i18n-locale-variants-en-de-es-fr-hi-it-ja-ko-nl-nb-pt-br-pt- | I18N | locale variants en,de,es,fr,hi,it,ja,ko,nl,nb,pt-BR,pt,pt-PT,vi,zh-Hans,zh,zh-Hant,x-default | 1/7 | rebuild-native | needs-business-decision | pending | locale-tree | scope of the locale trees |  |
| 9 | l-listing-candidate-post-toc-list-6-cards | L | listing candidate post-toc-list (6 cards) | 1/7 | index-backed | needs-business-decision | pending | listing-index-backed | index-driven or editorially curated? |  |
| 10 | l-listing-candidate-post-toc-list-17-cards | L | listing candidate post-toc-list (17 cards) | 1/7 | index-backed | needs-business-decision | pending | listing-index-backed | index-driven or editorially curated? |  |
| 11 | m-modal-trigger-aria-haspopup-target-outside-dom-at-capture | M | modal trigger aria-haspopup → target outside DOM at capture | 6/7 (reach 69/68) | rebuild-native | self | pending | modal-loader | none |  |
| 12 | m-modal-trigger-aria-haspopup-chrome-only-button-content | M | modal trigger aria-haspopup (chrome only) → button:content | 1/7 (reach 69/68) | rebuild-native | self | pending | chrome-interaction | none (motion-observe evidence) |  |
| 13 | t-unknown-third-party-host-static-cloudflareinsights-com | T | unknown third-party host static.cloudflareinsights.com | 7/7 | embed-passthrough | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 14 | t-unknown-third-party-host-app-termly-io | T | unknown third-party host app.termly.io | 6/7 | embed-passthrough | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 15 | t-tag-manager-google-tag-manager | T | tag manager: Google Tag Manager | 6/7 | embed-passthrough | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 16 | t-analytics-google-analytics-ads | T | analytics: Google Analytics / Ads | 6/7 | embed-passthrough | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 17 | t-unknown-third-party-host-www-google-co-in | T | unknown third-party host www.google.co.in | 6/7 | embed-passthrough | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 18 | t-marketing-ad-retargeting-pixel | T | marketing: ad / retargeting pixel | 6/7 | embed-passthrough | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 19 | t-rum-new-relic | T | RUM: New Relic | 4/7 | embed-passthrough | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 20 | t-rum-error-monitoring | T | RUM: error monitoring | 4/7 | embed-passthrough | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 21 | t-unknown-third-party-host-chat-assets-frontapp-com | T | unknown third-party host chat-assets.frontapp.com | 4/7 | embed-passthrough | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 22 | t-unknown-third-party-host-s10f30zk779j-statuspage-io | T | unknown third-party host s10f30zk779j.statuspage.io | 4/7 | embed-passthrough | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 23 | t-unknown-third-party-host-assets-apollo-io | T | unknown third-party host assets.apollo.io | 3/7 | embed-passthrough | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 24 | t-unknown-third-party-host-tag-unifyintent-com | T | unknown third-party host tag.unifyintent.com | 3/7 | embed-passthrough | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 25 | t-unknown-third-party-host-storage-ghost-io | T | unknown third-party host storage.ghost.io | 1/7 | embed-passthrough | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 26 | t-unknown-third-party-host-static-airtable-com | T | unknown third-party host static.airtable.com | 1/7 | embed-passthrough | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 27 | t-unknown-third-party-host-us-assets-i-posthog-com | T | unknown third-party host us-assets.i.posthog.com | 1/7 | embed-passthrough | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 28 | v-video-hosted-player | V | video: hosted player | 1/7 | embed-passthrough | self | pending | media-as-url | none (player ids are public) |  |
| 29 | x-sign-in-account-links | X | sign-in / account links | 7/7 | decided-out | needs-backend | pending | decided-out | auth / commerce on the new host? |  |
| 30 | x-commerce-signals-cart-false-prices-23 | X | commerce signals (cart: false, prices: 23) | 1/7 | decided-out | needs-backend | pending | decided-out | auth / commerce on the new host? |  |

## Triage

- **Ships autonomously (reproducibility `self`):** 6 row(s) — read-settings, sheet-sync, client-compute, modal-loader, chrome-interaction, media-as-url.
- **One owner decision batch:** 22 row(s) — inspect the XHR, add a vendor row · scope of the locale trees · index-driven or editorially curated? · which tags run on the new host; property ids.
- **Already delivered by the capture pipeline:** 0 row(s) — no work.
- **Host-bound on the target:** 0 of 0 probed API paths — the off-origin data work.

## Phases

- **tags** — 15
- **detect** — 4
- **locale wave** — 2
- **listings** — 2
- **interactive** — 2
- **register** — 2
- **data** — 1
- **client tools** — 1
- **media** — 1
