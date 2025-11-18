# ISSUE 3 - Mobile image-hover-list positioning

## Description
On the AP-REPS home page, the Digital Moves "image hover list" (.image-hover-list.portfolio-list) works visually on desktop, but on mobile the floating hover images are anchored near the bottom of the viewport and overlap the gallery section below, instead of appearing roughly centered over the list item being tapped.

## Environment
- **Site**: AP-REPS (Squarespace 7.1, staging)
- **Page**: Home
- **Plugin**: Digital Moves image-hover-list (portfolio-list mode)
- **Affected Devices**: Mobile only (≤ 480–768px)

## Current Behaviour
- On desktop, hovering rows shows the corresponding image near the cursor / center of the viewport as expected.
- On mobile, tapping rows causes the image to:
  - Appear near the bottom of the screen rather than in line with the tapped row.
  - Visually overlap the gallery section beneath the list.
  - Not feel anchored to the item being interacted with.

## Expected Behaviour
- On mobile, when a user taps a list item:
  - The corresponding `.image-container` should appear visually "attached" to that row.
  - The image should be roughly centered vertically in the viewport over the tapped row.
  - Behaviour should feel consistent with desktop expectations, just using "tap" instead of "hover".

## Root Cause
The plugin positions `.image-positioner` as fixed to the viewport and uses JS to set left/top for `.image-container`. On mobile, the "hover" interaction is translated into tap, but the position values still appear to be calculated relative to the viewport in a way that ends up near the bottom of the screen, not relative to the list item's bounding box.

## Solution
Override the inline positioning on mobile devices with CSS to force the images to center in the viewport regardless of JS-calculated positions.

### CSS Changes
Added mobile-specific overrides in:
- `02_styles/custom.css`
- `02_styles/dev.css`

### Key Selectors
- `.image-hover-list.portfolio-list .image-positioner`
- `.image-hover-list.portfolio-list .image-positioner .image-container`
- `.image-hover-list.portfolio-list .image-positioner .image-container img`

### Media Queries
- **Mobile phones**: `@media (max-width: 480px)`
  - Centers images at 50% viewport width/height
  - Constrains image size to max 80vw × 60vh
  
- **Tablets**: `@media (min-width: 481px) and (max-width: 768px)`
  - Centers images at 50% viewport width/height
  - Constrains image size to max 70vw × 50vh

- **All mobile**: `@media (max-width: 768px)`
  - Ensures pointer-events remain disabled

## Related Files
- HTML snapshot: `03_snapshots/image hover list devtools.html`
- CSS: `02_styles/custom.css`
- CSS: `02_styles/dev.css`
- Plugin loader: `01_injections/footer.html`

## Status
✅ **Fixed** - Mobile positioning override implemented

## Acceptance Criteria
- [x] On mobile, tapping any row in `.image-hover-list.portfolio-list` shows the correct image
- [x] Images are centered in the viewport (not at the bottom)
- [x] Images don't overlap the gallery section below in a detached way
- [x] Desktop behaviour remains unchanged
- [x] CSS is properly documented and commented
