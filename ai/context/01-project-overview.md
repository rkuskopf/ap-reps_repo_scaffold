

✅ done
🧩 partial
⚠️ problem
❌ pending

# Project overview

## Scope
Squarespace 7.1 site (AP-REPS). Front-end fixes, refinements, and cross-browser hygiene for galleries, blend-mode overlays, breakpoints, and mobile layout behavior.

## Deliverables

### 1. Gallery function
- ✅ Apply custom aspect-ratio logic for mixed portrait and landscape imagery.  
- ✅ Enforce 3:4 for portrait and 4:3 for landscape.  
- ✅ Ensure cropped, flush-top alignment and left-aligned captions.  
- ✅ Captions left-aligned across all gallery instances.
- ⚠️ Images need to fill their container correctly 
- ⚠️ tabs are now in a drop down instead of the horizontal scroll and the header shrinks for some reason. 

### 2. Blend-mode compatibility
- Implement mix-blend-mode effects on:
  - ✅ Artist names and sub-header tabs on artist pages.
  - ✅ Homepage hero text (SVG/PNG assets).
  - ✅ Global headers and nav.
- ❌ Add Safari and Firefox fallback styles per WCAG AA contrast rules.

### 3. Overscroll
- Remove overscroll behavior for smoother scroll boundaries and reduced UI jitter on iOS/Android.

### 4. Footer & breakpoints
- Fix layout breakage across desktop, tablet, and mobile widths.  
- Ensure consistent responsive behavior and equal padding/margin relationships at 390 px, 1024 px, 1440 px.

### 5. Mobile view: homepage hero section
- Create rules to accommodate alternate mobile hero layout.  
- Maintain layout consistency between mobile and desktop hero presentations.

### 6. Mouse pointer & hover states
- Resolve inconsistent pointer visibility across pages.  
- Adjust mobile hover image alignment for artist menu images.

### 7. Unexpected block on page load
- Identify and remove stray block or wrapper appearing at initial paint without affecting intentional elements.

## Constraints
- Squarespace SaaS only — no backend or server-side modifications.  
- Use `.apreps` namespace to isolate overrides.  
- Maintain 3:4 / 4:3 ratios, flush-top crop, and caption alignment.  
- Preserve Safari/Firefox fallbacks for blend-mode.  

## Testing
- Validate at 390 px / 1024 px / 1440 px breakpoints in Chrome, Safari, Firefox.  
- Verify ratio integrity, caption alignment, and padding equality (bottom = side ± 2 px).  
- Capture before/after screenshots for each fix.

## References
- Client: Lulu (AP-REPS)  
- Related context files:  
  - 02-css-architecture.md  
  - 03-sqs-quirks.md  
  - 04-browser-policy.md  
  - 05-layout-rules.md  
  - 06-spacing.md  
  - 07-testing.md