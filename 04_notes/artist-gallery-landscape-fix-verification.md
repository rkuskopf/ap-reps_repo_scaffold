# Artist Gallery Landscape Thumbnail Fix - Verification Guide

## Issue Summary

**Problem**: Landscape images in the Artist gallery (campaign section) were being over-cropped in grid thumbnails, appearing more portrait-like than intended.

**Section ID**: `68e11345c03be95a4deeb967`

**Root Cause**: The gallery was configured in Squarespace with a 3:4 (portrait) aspect ratio, but many images are landscape (~3:2). Squarespace's inline absolute positioning was forcing these landscape images into an overly tight vertical crop.

## Solution Implemented

Added section-scoped CSS overrides in `02_styles/custom.css` (lines 1147-1193) that:

1. **Override the aspect ratio**: Changes from 3:4 (portrait) to 4:3 (landscape) for this specific section
2. **Neutralize inline positioning**: Resets Squarespace's absolute positioning on images
3. **Ensure proper object-fit**: Uses `object-fit: cover` with centered positioning

## CSS Changes

```css
/* Override aspect ratio for the Artist campaign gallery section */
section[data-section-id="68e11345c03be95a4deeb967"] .slide {
  --ap-aspect: 4 / 3 !important;
}

section[data-section-id="68e11345c03be95a4deeb967"] .slide .margin-wrapper {
  aspect-ratio: 4 / 3 !important;
}

/* Neutralize Squarespace's inline absolute positioning on images */
section[data-section-id="68e11345c03be95a4deeb967"] img.thumb-image {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  object-position: center center !important;
  transform: none !important;
}

/* Ensure wrapper containers support the new aspect ratio */
section[data-section-id="68e11345c03be95a4deeb967"] .image-slide-anchor,
section[data-section-id="68e11345c03be95a4deeb967"] .js-gallery-lightbox-opener,
section[data-section-id="68e11345c03be95a4deeb967"] .image-wrapper,
section[data-section-id="68e11345c03be95a4deeb967"] .thumb-image-wrapper {
  position: relative !important;
  display: block !important;
  width: 100% !important;
  height: 100% !important;
}
```

## Verification Checklist

### On Live/Staging Site

After deploying the CSS changes to Squarespace, verify:

- [ ] **Landscape thumbnails**: Look more landscape (wider), not pseudo-portrait
- [ ] **Composition match**: Thumbnails should closely match the lightbox image composition
- [ ] **No excessive cropping**: Heads/edges should not be cut off compared to lightbox
- [ ] **Portrait images**: Still display correctly (should work with 4:3 as well)
- [ ] **Other galleries remain unchanged**:
  - [ ] Overview tab gallery
  - [ ] Editorial tab gallery  
  - [ ] Travel tab gallery
- [ ] **Lightbox still works**: Images open correctly in the lightbox
- [ ] **Mobile view**: Check that the fix works on mobile devices
- [ ] **No visual regressions**: No new gaps, overlaps, or alignment issues

### Visual Comparison

Compare the "BEFORE" and "AFTER" states:

**BEFORE (Bad)**:
- Landscape images appear cropped horizontally
- Feels "zoomed and chopped"
- Doesn't match lightbox composition

**AFTER (Good)**:
- Landscape images appear in proper 4:3 landscape format
- Composition matches lightbox view
- Similar framing to Figma reference

### Browser Testing

Test in multiple browsers to ensure consistency:
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari (desktop)
- [ ] Safari (iOS)
- [ ] Chrome (Android)

## Deployment Steps

1. Copy the entire contents of `02_styles/custom.css`
2. Paste into Squarespace CSS editor (Design > Custom CSS)
3. Save changes
4. Verify on staging/preview first
5. Publish to live site

## Rollback Plan

If issues arise, the fix can be easily removed by:

1. Deleting lines 1147-1193 in `02_styles/custom.css`
2. Re-deploying the CSS to Squarespace

Or temporarily disable by adding at the start of the fix:

```css
/* TEMPORARILY DISABLED
section[data-section-id="68e11345c03be95a4deeb967"] .slide {
...
*/
```

## Notes

- This fix is **section-scoped** and should not affect other galleries
- Uses `!important` to override Squarespace's inline styles
- No JavaScript changes required
- No changes to Squarespace gallery settings needed
- The fix works purely through CSS cascade and specificity

## Related Files

- **CSS File**: `02_styles/custom.css` (lines 1147-1193)
- **Issue Reference**: AP–REPS: Landscape thumbnails in Artist gallery (campaign section) are over-cropped / forced into portrait
- **Section ID**: `68e11345c03be95a4deeb967`
