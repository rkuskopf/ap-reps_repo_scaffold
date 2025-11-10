✅ done
🧩 partial
🐞 bug
❌ pending




# Outstanding Issues

## Group A — Deliverable 1: Gallery function regressions
Context: These issues arose directly from the aspect-ratio / flush-top gallery implementation (D1).

### A1. Gallery crops from top only
**Status:** ❌ unresolved
**Observed:** Images within `.sqs-gallery.sqs-gallery-design-grid` default to `object-position: top center`, causing off-center crops.  
**Goal:** Center imagery within each tile while preserving `object-fit: cover`.  
**Fix:** Adjust `object-position` to `center center` globally; add `.crop-top` utility for intentional overrides.  

**Update::** no fixes have worked so far. branch: center-image-crop

---

### A2. Mobile: tabs switch to dropdown and header shrinks
**Status:** ✅ resolved  
**Observed:** At ≤767 px, Will-Myers tabs revert to `<select>` dropdown; header height collapses.  
**Goal:** Maintain horizontal scroll tabs and consistent header padding.  
**Root cause:** Height resets in D1 affected header min-height.  
**Next step:** Scope FE resets to exclude header; inspect tab script for mobile override.

---

### A3. Header collapse 
**Status:**  ✅ resolved  
**Origin:** Deliverable 1 — gallery flush-top height resets.  
**Goal:** Reinstate header’s intended height/padding while keeping D1 fixes.  
**Notes:** Guard `.site-header`, `.Header-inner` from min-height resets.

---
### A1. Gallery crops from top only
**Status:** ❌ unresolved
**Observed:** side margins on mobile appear bigger.  
**Goal:** 
**Fix:** 

**Update::** no fixes have worked so far. branch: center-image-crop

---

## Group B - Deliverable 2: Blend-mode compatibility

### B1. Mobile menu overlay blend mode inheritance - NEEDS FRESH START
**Status:** 🐞 critical bug
**Origin:** Deliverable 2 - header blend mode implementation
**Observed:** 
- Mobile hamburger icon not getting white blend mode effect (invisible on dark backgrounds)
- Mobile menu overlay inheriting blend mode, appearing transparent/black instead of solid white
- Menu overlay covering header elements instead of positioning below them
- Menu text unreadable due to blend mode inheritance

**Root Problem:** 
Header `mix-blend-mode: difference` rules are too broad and affect mobile overlay elements. Attempts to exclude mobile menu from blend mode rules using complex selectors have failed.

**Requirements for Fix:**
1. **Header elements** (site title "AP—REPS" + hamburger): Must have white blend mode effect on both desktop and mobile
2. **Mobile overlay**: Must be solid white background with black text, positioned below header
3. **No coverage**: Header must remain visible and functional when mobile menu is open
4. **Clean CSS**: Avoid complex conditional logic, state management, or nuclear overrides

**Previous Attempts (all failed):**
- Complex `:not()` selectors to exclude mobile overlay
- Body class state management (`body.mobile-menu-open`)
- Media query separation of desktop/mobile rules  
- High-specificity "nuclear" overrides
- Z-index and positioning adjustments

**Next Steps:**
- Start fresh with minimal, targeted blend mode rules
- Test header blend mode with simple selectors first
- Add mobile overlay isolation as separate, independent rules
- Verify in actual mobile environment (not just desktop dev tools)

**Files Affected:** `02_styles/custom.css` (lines 307-394)
**Branch:** main (needs cleanup before new implementation)
