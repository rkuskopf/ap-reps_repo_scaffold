
# ISSUE
**Title:** [Gallery margins]: Remove right/bottom gap from .sqs-block-gallery tiles
**Labels:** ai-draft, ready

## Goal
- Neutralize extra right and bottom margins around gallery items caused by `.margin-wrapper` / slide shells.
- Ensure gallery grid has **no trailing white gap** at any breakpoint.
- Keep captions left-aligned and aspect-ratio rules intact.

## Acceptance criteria
- At 390 / 1024 / 1440: no visible rightmost gap; last column aligns flush with section gutter.
- At 390 / 1024 / 1440: no bottom white gap under gallery; grid computes to content height.
- Ratios preserved (3:4 portrait, 4:3 landscape); flush-top cropping holds; captions left.
- No regression to lightbox/anchor behavior inside slides.

## Allowed paths
assets/**/*.css, assets/**/*.js

## Preview URL
<!-- TODO: add preview URL -->



# ISSUE
**Title:** [Section gutters]: Make bottom padding equal side margins (±2 px)
**Labels:** ai-draft, ready

## Goal
- Normalize **section side gutters** and enforce **bottom padding == side margin (±2 px)** across breakpoints.
- Remove any FE/“Fill Screen” or row-template forces that create tall empty sections.

## Acceptance criteria
- At 390 / 1024 / 1440: computed bottom padding equals the computed side gutter (±2 px).
- Sections shrink-wrap content: no viewport-height sections unless an explicit opt-in class is present.
- No layout shift to adjacent sections; footer spacing matches gutters.

## Allowed paths
assets/**/*.css, assets/**/*.js

## Preview URL
<!-- TODO: add preview URL -->



# ISSUE
**Title:** [Mobile behavior]: Eliminate gallery height expansion from sticky siblings
**Labels:** ai-draft, ready

## Goal
- Stop mobile layout jumps caused by sticky elements (e.g., artist names/tabs) expanding section height once scrolled past the gallery.
- On ≤ 767 px, either disable stickiness or remove sticky elements from normal flow per spec.

## Acceptance criteria
- 390 px: no extra white space appears below the gallery after scrolling; no “double stack” effect from sticky siblings.
- 1024 / 1440: intended sticky behavior remains unchanged on larger viewports.
- Ratios/flush-top/captions left remain intact.

## Allowed paths
assets/**/*.css, assets/**/*.js

## Preview URL
<!-- TODO: add preview URL -->



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



# ISSUE
**Title:** [Regression check]: Gallery + footer spacing at key widths
**Labels:** ai-draft, ready

## Goal
- Run a sweep to confirm gallery tile margins and footer spacing are correct at 390 / 1024 / 1440 and adjacent widths.

## Acceptance criteria
- No right/bottom gaps in gallery tiles at test widths and ±80px around each breakpoint.
- Footer spacing equals side gutter (±2 px); no early translation or unexpected extra gap.
- No duplicate gallery instances on narrow tabs pages; no sticky-induced expansion on mobile.

## Allowed paths
assets/**/*.css, assets/**/*.js

## Preview URL
<!-- TODO: add preview URL -->



How to run the drill
	1.	Save the blocks above into inbox/issues.md.
	2.	Use the bulk creator we set up (or paste by hand) so each issue gets labels ai-draft, ready.
	3.	Your ai-pr.yml will fire, create branches, draft patches, and open PRs.
	4.	You review diffs/screens, merge, then paste final CSS/JS into Squarespace.

Want me to spit these into a single issues.md file you can drop straight in? I can also add a tiny “Epic” issue that links the four.