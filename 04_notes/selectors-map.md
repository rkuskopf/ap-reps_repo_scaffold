Pending — will fill once DOM or console snippet results are provided.

---

## Issue 1: Secondary Nav Underline Alignment (Mobile)

### Diagram: Artist Page Layout with Tabs Header Underline

```
┌─────────────────────────────────────────────────────────┐
│  ← 17px →                                    ← 17px →   │
│  ┌───────────────────────────────────────────────────┐  │
│  │                    HEADER                         │  │
│  │              AP REPS logo | menu                  │  │
│  └───────────────────────────────────────────────────┘  │
│                                                         │
│  ┌───────────────────────────────────────────────────┐  │
│  │         TABS HEADER NAV (.tabs-header nav)        │  │
│  │  OVERVIEW  EDITORIAL  BEAUTY  CAMPAIGN  →         │  │
│  │  ┌─────────────────────────────────────────────┐  │  │
│  │  │      .indicator-track                       │  │  │
│  │  │  ▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │  │  │
│  │  │  ↑ .active-indicator (under active tab)     │  │  │
│  │  └─────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────┘  │
│  ↑                                                   ↑  │
│  │← margin-left: 17px        margin-right: 17px →│  │
│                                                         │
│  ┌───────────────────────────────────────────────────┐  │
│  │                                                   │  │
│  │    ┌─────────────┐    ┌─────────────┐            │  │
│  │    │             │    │             │            │  │
│  │    │   IMAGE 1   │    │   IMAGE 2   │            │  │
│  │    │             │    │             │            │  │
│  │    └─────────────┘    └─────────────┘            │  │
│  │                                                   │  │
│  │    ┌─────────────┐    ┌─────────────┐            │  │
│  │    │  CAT SMITH  │    │   MAKEUP    │            │  │
│  │    │   IMAGE 3   │    │   IMAGE 4   │            │  │
│  │    └─────────────┘    └─────────────┘            │  │
│  │                                                   │  │
│  └───────────────────────────────────────────────────┘  │
│  ↑                                                   ↑  │
│  │← Content aligns with indicator-track margins  →│  │
│                                                         │
└─────────────────────────────────────────────────────────┘

Legend:
  ▓▓▓ = Active indicator underline (black bar under active tab)
  ░░░ = Indicator track background (light gray track)
```

### HTML Structure Reference (Dev Tools)

The Will-Myers Tabs plugin generates this DOM structure:

```html
<div class="wm-tabs" data-navigation-type="horizontal">
  
  <!-- TABS HEADER (contains navigation) -->
  <div class="tabs-header">
    <nav>
      <!-- Tab buttons -->
      <button role="tab" aria-selected="true">OVERVIEW</button>
      <button role="tab">EDITORIAL</button>
      <button role="tab">BEAUTY</button>
      <button role="tab">CAMPAIGN</button>
      
      <!-- INDICATOR TRACK (the underline container) -->
      <div class="indicator-track">
        <!-- ACTIVE INDICATOR (the colored underline bar) -->
        <div class="active-indicator"></div>
      </div>
      
      <!-- Scroll indicators (arrows) -->
      <div class="scroll-indicator indicator-start">‹</div>
      <div class="scroll-indicator indicator-end">›</div>
    </nav>
  </div>
  
  <!-- TABS CONTENT -->
  <div class="tabs-content">
    <div class="tab-panel" role="tabpanel" aria-hidden="false">
      <!-- Artist gallery content here -->
    </div>
  </div>
  
</div>
```

### CSS Selectors Used

| Selector | Purpose |
|----------|---------|
| `.wm-tabs` | Root container for Will-Myers tabs plugin |
| `.wm-tabs .tabs-header` | Header containing navigation |
| `.wm-tabs .tabs-header nav` | Navigation wrapper |
| `.wm-tabs .tabs-header nav .indicator-track` | Container for the underline track |
| `.wm-tabs .tabs-header nav .indicator-track .active-indicator` | The actual colored underline bar |

### Fix Applied (Issue 1)

```css
@media (max-width: 767px) {
  /* Add margins to the indicator track to match content margins */
  .wm-tabs .tabs-header nav .indicator-track {
    margin-left: 17px !important;
    margin-right: 17px !important;
    /* Constrain indicator track width so it doesn't trail off the right edge */
    /* 34px = 17px left margin + 17px right margin */
    max-width: calc(100vw - 34px) !important;
  }
  
  /* Adjust the active indicator width variable */
  .wm-tabs .tabs-header nav .indicator-track .active-indicator {
    --tab-button-active-width: calc(100% - 34px);
  }
}
```

### Before/After

**Before:** The `.indicator-track` extended edge-to-edge (0px margins), causing the underline to appear misaligned with the content grid. The underline could also trail off the right side of the screen when tabs scroll.

**After:** The `.indicator-track` has 17px left/right margins AND a max-width constraint of `calc(100vw - 34px)`, ensuring the underline aligns flush with the image grid edges and never trails off the screen on either side. The tab headings can still scroll horizontally beyond the viewport, but the underline remains contained within the content area.
