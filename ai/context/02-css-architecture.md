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

**Mix blend**

<div class="header-menu-nav-wrapper">
  


Do-not list (AI must respect)
	•	Do not edit HTML/DOM structure.
	•	Do not remove Safari/Firefox fallbacks for blend-mode.
	•	Do not introduce fixed heights on galleries/sections (use intrinsic sizing).
	•	Do not change unrelated pages/sections to “fix” a local bug. Scope with .apreps and the smallest necessary chain.