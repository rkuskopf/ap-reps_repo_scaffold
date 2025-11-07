
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