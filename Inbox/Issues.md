



# ISSUE
**Title:** [Image sizing]: Ensure images resize correctly within enforced aspect ratios
**Labels:** ai-draft, ready

## Goal
- Make gallery images **size to their container** while enforcing: portrait = 3:4 (`.ratio-3-4`), landscape = 4:3 (`.ratio-4-3`).
- Prevent distortion or overflow when the container changes size across breakpoints.

## Acceptance criteria
- At 390 / 1024 / 1440: no stretching; images fill their ratio boxes via `object-fit`/intrinsic ratio utilities.
- Flush-top cropping holds; no unexpected top/bottom padding inside tiles.
- Captions remain left-aligned and do not collide with imagery.

## Allowed paths
assets/**/*.css, assets/**/*.js

## Preview URL
<!-- TODO: add preview URL -->






