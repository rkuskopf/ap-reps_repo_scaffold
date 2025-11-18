# Custom.css Refactoring Notes

## Overview
This document details the refactoring of `custom.css` to improve maintainability, reduce conflicts, and stabilize problematic areas.

## Key Changes

### 1. Structure & Organization
**Before:** Rules scattered throughout file, multiple deliverables mixed together, overlapping selectors
**After:** Clear sections with table of contents:
1. Header & Navigation (blend-mode, mobile menu)
2. Will Myers Tabs Plugin (layout, sticky behavior)
3. Gallery Ratios & Layout (consolidated)
4. Sticky Artist Names (blend mode)
5. Mobile Hero Collage
6. Digital Moves Plugins (cursor, auto-scroll, image-hover-list)
7. Footer Newsletter
8. Utilities & Misc Fixes

### 2. Gallery CSS Simplification

#### Problem Identified:
- Multiple overlapping rules for `.apreps .sqs-gallery` (lines 159-318 in original)
- Duplicate aspect-ratio declarations
- Conflicting position rules (absolute vs static vs relative)
- Rules repeated in D4 breakpoints section (lines 867-941)

#### Solution:
- Consolidated all gallery rules into Section 3
- Single source of truth for aspect ratios
- Clear hierarchy: Global → AP-REPS scoped → Tabs scoped
- Removed duplicate rules from breakpoints section
- Kept only essential Fluid Engine height fixes

#### Removed Duplicates:
```css
/* REMOVED - duplicate aspect-ratio rules at lines 273-280 */
/* REMOVED - duplicate image positioning at lines 282-290 */
/* REMOVED - duplicate from D4 section at lines 867-874 */
```

### 3. Cursor Override Scoping

#### Problem:
Original had aggressive global cursor override:
```css
body, a, button, * {
  cursor: none !important;
}
```

This affected:
- Form inputs (making them hard to use)
- Admin areas
- Any interactive elements

#### Solution:
Scoped cursor override to specific contexts only:
```css
/* Only hide cursor in hero section and AP-REPS tabs */
section[data-section-id="68e1a8f1e44bd1493a1074d2"],
section[data-section-id="68e1a8f1e44bd1493a1074d2"] *,
.apreps .wm-tabs,
.apreps .wm-tabs * {
  cursor: none !important;
}
```

Benefits:
- Forms work normally
- Admin interface unaffected
- Custom cursor only where intended

### 4. Mobile Hero Collage Stabilization

#### Changes:
- Moved all hero collage rules to Section 5
- Clear documentation of z-index layering
- Consolidated overflow and positioning rules
- Added comments explaining interaction with hero text

#### Key fixes:
- Hero section: `z-index: 2` (sits behind text which is z-index: 3 via blend-mode isolation)
- Proper overflow handling on hero section containers
- Image visibility forced to override Squarespace lazy-load

### 5. Header Blend-Mode Optimization

#### Review Results:
The existing header blend-mode implementation is **already minimal and correct**. No changes needed.

Key parts confirmed:
- ✅ Safari compatibility via `transform: translate3d(0,0,0)`
- ✅ Mobile menu properly resets blend-mode with `.header--menu-open` state
- ✅ Hamburger lines correctly styled for both states
- ✅ Logo inversion handled properly

### 6. Documentation Improvements

Each section now includes:
- **Purpose statement** explaining what the section does
- **Key requirements** or features
- **Technical notes** where relevant (e.g., Safari quirks)

Example:
```css
/* ============================================================================
   3. GALLERY RATIOS & LAYOUT (CONSOLIDATED)
   ============================================================================
   
   Single source of truth for gallery aspect ratios and image cropping.
   Removes duplicate rules and conflicts from original custom.css.
   
   Key features:
   - Consistent 4:3 aspect ratio (customizable via --ap-aspect)
   - object-fit: cover for all gallery images
   - Left-aligned captions
   - Proper spacing (via --ap-gap-x)
============================================================================ */
```

## Regression Prevention

### What Was Preserved:
1. ✅ All header blend-mode logic (no visual changes)
2. ✅ All mobile menu behavior (no visual changes)
3. ✅ All gallery aspect ratios and crops (consolidated but identical behavior)
4. ✅ All tab plugin configurations
5. ✅ All mobile hero collage animations
6. ✅ All footer newsletter styling
7. ✅ All Digital Moves plugin integrations

### What Was Changed:
1. ✅ Cursor override scoped to hero/galleries only (fixes form usability)
2. ✅ Gallery rules consolidated (same visual output, cleaner code)
3. ✅ Better organization (no visual changes)
4. ✅ Improved documentation (no visual changes)

## Testing Checklist

### Desktop
- [ ] Header blend-mode over hero slideshow
- [ ] Header logo inverted correctly
- [ ] Gallery aspect ratios 4:3 in tabs
- [ ] Sticky artist names visible over galleries
- [ ] Tabs switch without layout jump
- [ ] Custom cursor in hero/gallery areas
- [ ] Normal cursor in footer form
- [ ] Newsletter form styled correctly

### Mobile
- [ ] Mobile menu opens with white background
- [ ] Mobile menu text is dark/readable
- [ ] Hamburger icon animates correctly
- [ ] Mobile hero collage animates smoothly
- [ ] Hero text positioned correctly over collage
- [ ] Gallery aspect ratios maintained
- [ ] Image-hover-list positioned at 30% viewport
- [ ] No custom cursor (touch devices)
- [ ] Newsletter form responsive

### Cross-browser
- [ ] Safari - blend-mode rendering
- [ ] Chrome - all features
- [ ] Firefox - all features
- [ ] Mobile Safari - mobile hero
- [ ] Mobile Chrome - mobile features

## Files Changed

1. `02_styles/custom-refactored.css` - New refactored version
2. `02_styles/REFACTORING-NOTES.md` - This document

## Migration Plan

1. Review `custom-refactored.css` in staging
2. Test all checklist items above
3. If all tests pass, rename:
   - `custom.css` → `custom-backup.css`
   - `custom-refactored.css` → `custom.css`
4. Deploy to production
5. Monitor for 48 hours
6. Delete backup if no issues

## Open Questions / Future Work

1. **Mobile hero collage**: Current gap of 600px is hard-coded. Consider making this a CSS variable for easier adjustment.

2. **Gallery aspect ratios**: Currently defaults to 4:3. Could expose `--ap-aspect` per-tab for mixed aspect ratios.

3. **Fluid Engine overrides**: Many `!important` rules to fight Squarespace inline styles. Monitor if Squarespace changes their FE implementation.

4. **Block-specific IDs**: Several rules target specific block IDs:
   - `#block-yui_3_17_2_1_1759615106072_8520` (hero heading)
   - `#block-yui_3_17_2_1_1761719139659_4074` (newsletter)
   - `#block-85f3ea5586bbbcb4af7b` (contact page)
   
   These may break if blocks are recreated. Consider adding class names via Code Injection.

5. **Artist bio section**: `.fe-68e8ff90b8c8d26cc4ad65d9` is also a specific ID. Same concern as above.

## Benefits Achieved

✅ **Maintainability**: Clear sections, easy to find specific rules
✅ **No Duplicates**: Gallery rules consolidated from ~160 lines to ~100 lines
✅ **Better Scoping**: Cursor override no longer global
✅ **Documentation**: Every section explains purpose
✅ **Stability**: Mobile hero collage rules grouped together
✅ **Performance**: Removed redundant selectors
✅ **Future-proof**: Clear structure for adding new features
