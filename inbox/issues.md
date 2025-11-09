
# ISSUE
**Title:** [Regression][D1] Mobile tabs switched to dropdown & header shrinks
**Labels:** ai-draft, ready
**Origin:** Deliverable 1 — Gallery Function (see: context/06-outstanding-issues.md → Group A)

## Goal
Maintain horizontal scroll tabs on mobile and preserve header padding, without breaking D1 (gallery ratio/flush-top fixes).

## Acceptance criteria
- 390 px: WM Tabs render as a horizontal, scrollable strip; no `<select>` dropdown visible.
- 390 px: header height/padding stable on load and scroll (no “over-shrink”).
- 390 / 1024 / 1440: no reappearance of gallery bottom gap or FE height expansion.
- No change to desktop/tablet tab behavior.

## Allowed paths
assets/**/*.css, assets/**/*.js

## Preview URL
<!-- TODO -->


# ISSUE
**Title:** [Follow-up][D1] Center image crops; add .crop-top utility
**Labels:** ai-draft, ready
**Origin:** Deliverable 1 — Gallery Function (see: context/06-outstanding-issues.md → Group A)

## Goal
Default gallery imagery to `object-position:center center` and provide `.crop-top` utility for intentional top-biased crops.

## Acceptance criteria
- 390 / 1024 / 1440: tiles fill cleanly; subjects appear centered by default.
- Applying `.crop-top` on a slide/wrapper restores top-biased crop for specific images.
- No change to D1 aspect-ratio/flush-top logic.

## Allowed paths
assets/**/*.css, assets/**/*.js

## Preview URL
<!-- TODO -->





