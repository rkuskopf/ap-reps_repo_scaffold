## CSS Architecture

### Purpose
Define where code lives, how selectors are structured, and the guardrails for editing styles in a Squarespace 7.1 (Fluid Engine) site. The AI must follow these paths, naming rules, and specificity constraints.

---

### File + folder layout (repo)
- `assets/css/custom.css` — **primary overrides** (global layout fixes, galleries, spacing, footer).


> The `.apreps` namespace applies specifically to the Will Myers tabs context (artist gallery sections). Global elements such as the header, footer, or hero are not wrapped in `.apreps` and should be targeted without this namespace.

---

### Load / injection order (Squarespace 7.1)
1) Theme styles (Site Styles)
2) **Custom CSS panel**
3) **Code Injection** (Header/Footer)
4) Page-level header/footer code
- We assume **repo CSS is pasted into Code Injection** (global). Page-specific tweaks go after, in page header if absolutely necessary.

---

### Naming + scope
- **Namespace:** prefix all custom rules with `.apreps`.
  - Example: `.apreps .sqs-block-gallery { … }`
- **Aspect utilities:**  
  - `.ratio-3-4` → portrait 3:4  
  - `.ratio-4-3` → landscape 4:3
- **No invented HTML.** Target existing SQS wrappers and plugin hooks only.
- **Specificity policy:** prefer a **max of 3 levels** (`.apreps .sqs-gallery .slide`). Use `!important` sparingly to override inline FE styles.

---

### Core selector map (targets the AI can safely touch)
> Keep this short and durable. Page-specific selectors belong in `ai/context/selectors-map.md`.

**Galleries**
## Selector reference — Gallery aspect-ratio fix

### Active scope
- `.apreps .wm-tabs .tab-panel > .tab-content`
  - contains all artist tab content and nested gallery blocks.
- `.sqs-gallery.sqs-gallery-design-grid`
  - main Squarespace grid gallery pattern.

### Key elements touched
| Purpose | Selector | Notes |
|----------|-----------|-------|
| Anchor shells | `.image-slide-anchor`, `.js-gallery-lightbox-opener` | forced block layout, overflow hidden |
| Image fill | `.thumb-image` | `object-fit: cover`, `position:absolute`, flush top |
| Wrapper ratios | `.margin-wrapper`, `.image-wrapper`, `.thumb-image-wrapper` | `aspect-ratio` control, `overflow:hidden` |
| Section padding | `.page-section:first-of-type` | top padding removed for flush-top |
| Caption alignment | `.image-slide-title`, `.image-slide-description` | left-aligned across tabs |
| Chrome cleanup | `.section-border` | hidden inside tabs |
| Grid gap | `.gallery-grid-item`, `figure`, `.meta` | zeroed top margins |
| Gutter control | `.slide` etc. | `padding-right:10px`, box-sizing fixes |


### Summary
This block establishes custom aspect-ratio logic (3:4 / 4:3), removes Squarespace’s stray top/bottom margins, and enforces left-aligned captions within **tabbed gallery sections**.  
It is **tab-scoped** (Will-Myers Tabs only) and should not affect standalone galleries outside `.wm-tabs`.

### Status
✅ implemented and stable in `custom.css`
⚠️ monitor tablet breakpoints for minor crop offset

**Fluid Engine / layout shells**
- `.page-section`, `.fe-section`, `[data-fluid-engine] .fluid-engine`
- `.fe-block`, `.fluid-engine-block-contents`
- `.fe-block.sqs-position-sticky` (sticky siblings)

**Tabs (Will-Myers)**
- `[data-wm-plugin="tabs"]`
- `.wm-tabs-nav`, `.wm-tab-content`

**Header / hero / footer**
- `.site-header`, `.page-section.hero`
- `.site-footer`, `.footer-section[data-section-id]`

---

**DELIVERABLE 2: MIX BLEND MODE COMPATIBILITY**

### Problem Context
The header uses `mix-blend-mode: difference` to create a white-text-on-dark-background effect when overlaying content. However, this creates conflicts with Squarespace's mobile menu overlay, which inherits the blend mode and becomes transparent/unreadable.

### Key Selectors and Their Roles

**Header Elements (require blend mode)**
| Selector | Purpose | Blend Mode Needed |
|----------|---------|------------------|
| `#header` | Main header container | Yes - transparent background |
| `#header .header-title` | Site title "AP—REPS" | Yes - white text effect |
| `#header .header-title-text a` | Title link element | Yes - white text effect |
| `#header .header-burger` | Mobile hamburger button | Yes - white lines |
| `#header .burger-inner` | Hamburger button container | Yes - affects line visibility |
| `#header .burger-inner .top-bun` | Hamburger line (top) | Yes - white background |
| `#header .burger-inner .patty` | Hamburger line (middle) | Yes - white background |
| `#header .burger-inner .bottom-bun` | Hamburger line (bottom) | Yes - white background |

**Mobile Menu Elements (must NOT inherit blend mode)**
| Selector | Purpose | Blend Mode | Background |
|----------|---------|------------|------------|
| `#overlay-nav` | Primary mobile menu container | Normal | Solid white |
| `[data-section-id="overlay-nav"]` | Alternative mobile menu selector | Normal | Solid white |
| `#overlay-nav *` | All menu content | Normal | Transparent |
| `#overlay-nav a` | Menu links | Normal | Transparent, black text |

**Positioning Requirements**
- **Header**: `z-index: 100000` (stays visible above overlay)
- **Mobile overlay**: `z-index: 99999` (below header, above content)
- **Mobile overlay positioning**: `top: 60px` (starts below header)
- **Mobile overlay sizing**: `height: calc(100vh - 60px)` (fills remaining space)

### Key Learnings from Implementation Attempts

#### What We Discovered:
1. **Blend Mode Inheritance**: `mix-blend-mode: difference` on header containers affects all nested elements, including mobile overlays
2. **Squarespace Mobile Menu Structure**: Uses `#overlay-nav` and `[data-section-id="overlay-nav"]` containers
3. **Z-index Layering**: Mobile overlay needs to be below header but above content
4. **Positioning Requirements**: Mobile overlay should start below header rather than covering it

#### Failed Approaches:
- **Complex `:not()` selectors**: Too fragile and browser-specific
- **Body class state management**: `body.mobile-menu-open` logic became overly complex
- **Nuclear overrides**: High-specificity rules (`html body #overlay-nav`) created conflicts
- **Media query separation**: Desktop/mobile separation didn't solve inheritance issues

#### Root Cause:
The fundamental issue is that broad blend mode rules for header elements inevitably affect mobile menu overlays. Any solution needs to:
1. Keep header blend mode effects for desktop AND mobile (when menu closed)
2. Ensure mobile overlay is completely isolated from blend mode inheritance
3. Position overlay correctly below header without covering navigation elements

### Recommended Approach for Fresh Start:
1. **Minimal header blend mode rules** - target only specific text elements, not containers
2. **Complete mobile overlay isolation** - use `isolation: isolate` and explicit positioning
3. **Simple selector strategy** - avoid complex state management and conditional logic
4. **Test in actual mobile environment** - desktop dev tools may not show true mobile behavior

### Target CSS Pattern:
```css
/* Header blend mode - keep minimal */
#header .header-title,
#header .header-title-text a,
#header .header-burger,
#header .burger-inner * {
  mix-blend-mode: difference !important;
  color: #fff !important;
}

/* Mobile overlay isolation */
#overlay-nav,
[data-section-id="overlay-nav"] {
  background: white !important;
  mix-blend-mode: normal !important;
  isolation: isolate !important;
  position: fixed !important;
  top: 60px !important;
  height: calc(100vh - 60px) !important;
  z-index: 99999 !important;
}
```



  


Do-not list (AI must respect)
	•	Do not edit HTML/DOM structure.
	•	Do not remove Safari/Firefox fallbacks for blend-mode.
	•	Do not introduce fixed heights on galleries/sections (use intrinsic sizing).
	•	Do not change unrelated pages/sections to “fix” a local bug. Scope with .apreps and the smallest necessary chain.