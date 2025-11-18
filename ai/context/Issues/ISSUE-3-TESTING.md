# Testing Guide - ISSUE 3: Mobile Image Hover List Fix

## Overview
This guide helps test the mobile image-hover-list positioning fix for ISSUE 3.

## What Was Fixed
On mobile devices, the Digital Moves image-hover-list plugin was showing hover images at the bottom of the viewport instead of centered over the tapped list item. This fix forces images to center in the viewport on mobile while leaving desktop behavior unchanged.

## Testing Instructions

### Desktop Testing (Should See NO Changes)
1. Open the AP-REPS staging site on a desktop browser (viewport > 768px)
2. Navigate to the home page
3. Hover over items in the image-hover-list (portfolio list)
4. **Expected**: Images should appear near cursor position as before
5. **Verify**: No change in behavior from before the fix

### Mobile Phone Testing (≤480px)
1. Open the AP-REPS staging site on a mobile phone or use browser DevTools mobile emulation
2. Set viewport to 480px width or less
3. Navigate to the home page
4. Tap on items in the image-hover-list (portfolio list)
5. **Expected**: 
   - Images appear centered in the viewport (both horizontally and vertically)
   - Images are constrained to max 80vw wide × 60vh tall
   - Images don't appear stuck at the bottom of the screen
   - Images don't inappropriately overlap the gallery section below
6. **Verify**: Consistent, predictable positioning on tap

### Tablet Testing (481px - 768px)
1. Open the AP-REPS staging site on a tablet or use browser DevTools
2. Set viewport between 481px and 768px width
3. Navigate to the home page
4. Tap on items in the image-hover-list (portfolio list)
5. **Expected**:
   - Images appear centered in the viewport (both horizontally and vertically)
   - Images are constrained to max 70vw wide × 50vh tall
   - Images don't appear stuck at the bottom of the screen
6. **Verify**: Consistent positioning with slightly larger allowed image size than phones

## Test Cases

### Test Case 1: Mobile Phone - Center Positioning
- **Device**: iPhone/Android or 375px viewport
- **Action**: Tap first list item
- **Expected**: Image appears at center of viewport (50% from left, 50% from top)
- **Pass/Fail**: ___

### Test Case 2: Mobile Phone - Size Constraints
- **Device**: iPhone/Android or 375px viewport
- **Action**: Tap list item with large image
- **Expected**: Image scales to fit within 80vw × 60vh
- **Pass/Fail**: ___

### Test Case 3: Tablet - Center Positioning
- **Device**: iPad or 768px viewport
- **Action**: Tap any list item
- **Expected**: Image appears at center of viewport
- **Pass/Fail**: ___

### Test Case 4: Desktop - Unchanged Behavior
- **Device**: Desktop or 1920px viewport
- **Action**: Hover over list items
- **Expected**: Images follow cursor as before (no change)
- **Pass/Fail**: ___

### Test Case 5: Mobile - No Gallery Overlap
- **Device**: Mobile phone
- **Action**: Tap bottom-most list item
- **Expected**: Image doesn't visually overlap gallery section inappropriately
- **Pass/Fail**: ___

### Test Case 6: Interaction - Pointer Events
- **Device**: Any mobile device
- **Action**: Tap on image when visible
- **Expected**: Tap goes through image to content below (pointer-events: none)
- **Pass/Fail**: ___

## Browser/Device Matrix

| Browser/Device | Viewport | Status | Notes |
|---------------|----------|--------|-------|
| Chrome Mobile | 375px | ⬜ |  |
| Safari iOS | iPhone | ⬜ |  |
| Chrome Desktop | 1920px | ⬜ |  |
| Safari Desktop | 1920px | ⬜ |  |
| Firefox Mobile | 414px | ⬜ |  |
| Edge Desktop | 1920px | ⬜ |  |
| Chrome Tablet | 768px | ⬜ |  |
| Safari iPad | iPad | ⬜ |  |

## Rollback Instructions
If issues are found, the fix can be easily rolled back by removing the CSS blocks marked with:
```
/* ### BEGIN ISSUE 3: Mobile image-hover-list positioning 18/11/25 */
...
/* ### END ISSUE 3: Mobile image-hover-list positioning 18/11/25 */
```

From these files:
- `02_styles/custom.css`
- `02_styles/dev.css`

## Known Limitations
- Fix relies on CSS overrides of JavaScript-calculated inline styles
- Plugin update might require CSS adjustments if inline style generation changes
- Very small viewports (<320px) may still see some constraint issues

## Success Criteria
✅ Mobile users can tap list items and see images centered in viewport  
✅ Desktop hover behavior remains exactly as before  
✅ Images don't appear stuck at bottom of viewport  
✅ Images scale appropriately for different device sizes  
✅ No unintended visual overlaps with other page sections  

## Reporting Issues
If you find any issues during testing, please note:
1. Device/browser combination
2. Viewport size
3. Specific list item tapped
4. Screenshot of unexpected behavior
5. Expected vs actual result
