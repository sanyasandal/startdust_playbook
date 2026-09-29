---
_provenance:
  writtenBy: stardust:direct (--prep, hands-off)
  writtenAt: 2026-09-29T06:30:00Z
  readArtifacts: [stardust/current/brand-review.html, stardust/.work/extract/tensions.json, stardust/current/_computed-styles.json]
---

# Improvements list: site-wide (variant A brief)

1. **[cluttered IA] Two chrome generations.**
   - Weakness: 14 Astro pages use the mega-menu nav, but 54 Ghost pages use a legacy nav with different Product items (T-chrome-generations).
   - Fix: use one header and footer, built on the Astro IA, for every page type.
2. **[cluttered IA] CTA vocabulary sprawl.**
   - Weakness: the same `/sign-up/` target is labelled "Get started for free" (54 pages), "Get started" (18), "Start free", "Try now" and "Create Playbook free" (T-cta-vocab).
   - Fix: one primary, "Start free" → `/sign-up/`, and one secondary, "Book a demo" → `/contact/`.
3. **[contrast] Accent fails AA as a button fill.**
   - Weakness: white text on `#ff2753` is 3.71:1 at 17px/600, which does not qualify as large text.
   - Fix: fill buttons with the captured hover colour `#e01f47` (4.71:1). Keep `#ff2753` for non-text marks and for display type 44px and larger.
4. **[dated pattern] Ad-hoc type scale and font triple.**
   - Weakness: headings use 58, 50, 40, 32, 28, 24, 20 and 18px with no ratio between them (T-scale), and AktivGrotesk still sets 661 Ghost headings (T-font-triple).
   - Fix: set everything in stabil_grotesk on a 1.25 scale: 18 / 22 / 28 / 35 / 44 / 56px.
5. **[cliché] Gradient text on headlines.**
   - Weakness: the spectrum gradient fills hero headline fragments (68 uses). It risks failing contrast and reads as a 2021 SaaS cliché.
   - Fix: keep the spectrum as a signature 4px band (under the eyebrow or along a card's top edge) and on illustration grounds. Never use it as a text fill.
