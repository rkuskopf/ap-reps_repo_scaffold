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

## Group B - Deliverable 2: Blend-mode compatibility

### B1. Mobile menu, are not mix blend and are appearing just white.
**Status:** 🐞 bug
**Origin:** Deliverable 2, commit: 'merge from mix-2'
**Observed:** Mobile hamburger menu is white, and the menu overlay is see through
**Goal:** hamburger needs to be visible, like the site title on the left. 
the overlay menu needs to have a solid background so the menu items can be seen
**Notes:** mix blend is required for the #header nav 'dev copy', but not the hero text below it

