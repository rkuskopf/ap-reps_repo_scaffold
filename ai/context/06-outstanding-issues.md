# Outstanding Issues

## Group A — Deliverable 1: Gallery function regressions
Context: These issues arose directly from the aspect-ratio / flush-top gallery implementation (D1).

### A1. Gallery crops from top only
**Status:** ❌ unresolved  
**Observed:** Images within `.sqs-gallery.sqs-gallery-design-grid` default to `object-position: top center`, causing off-center crops.  
**Goal:** Center imagery within each tile while preserving `object-fit: cover`.  
**Fix:** Adjust `object-position` to `center center` globally; add `.crop-top` utility for intentional overrides.  
**Failed attempt**: see commit: 2


---

### A2. Mobile: tabs switch to dropdown and header shrinks
**Status:** ❌ unresolved  
**Observed:** At ≤767 px, Will-Myers tabs revert to `<select>` dropdown; header height collapses.  
**Goal:** Maintain horizontal scroll tabs and consistent header padding.  
**Root cause:** Height resets in D1 affected header min-height.  
**Next step:** Scope FE resets to exclude header; inspect tab script for mobile override.

---

### A3. Header collapse 
**Status:** ❌ pending  
**Origin:** Deliverable 1 — gallery flush-top height resets.  
**Goal:** Reinstate header’s intended height/padding while keeping D1 fixes.  
**Notes:** Guard `.site-header`, `.Header-inner` from min-height resets.

---


