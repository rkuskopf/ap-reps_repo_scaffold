# FILE: ai/context/01-project-overview.md
## Project overview
- Scope: AP-REPS Squarespace 7.1 site fixes and polish for artist pages, gallery, footer, breakpoints, blend-mode, and mobile behaviors.
- Deliverables:
Done:
  - Gallery: force images in the will meyers plugin gallery to be portrait or landscape
  - Footer and breakpoints: fix unidentified space below the will meyers gallery and page section
  - Blend-mode hygiene: Safari and Firefox fallbacks while maintaining WCAG AA.
  - Mobile hero layout rules.
  - Pointer and hover consistency.
  To do
  Gallery: images resize into container
- Out of scope:
  - Server-side or backend changes (Squarespace SaaS only).
  - Content entry and editorial production not explicitly listed as tasks.
  - Template redesign beyond CSS/JS behavior and minor layout constraints.
- Workflow:
  - Code in GitHub repository → produce CSS/JS diffs.
  - Paste CSS/JS into Squarespace Code Injection and/or Site Styles.
  - Validate on preview URLs and target breakpoints (390, 1024, 1440 px).
- Constraints:
  - Preserve agreed aspect ratios (portrait 3:4, landscape 4:3).
  - Enforce flush-top cropping where required.
  - Keep captions left-aligned.
  - Keep bottom padding equal to side margin (±2 px).
  - Maintain Safari/Firefox fallbacks for mix-blend-mode.
- Known blockers:
  - Confirm intended mobile design for artist pages with client (Lulu). <!-- TODO: clarify -->
- References:
  - Apreps project page context and working notes captured here. 
  - Pinned preview/editor links exist for quick testing. <!-- TODO: clarify URLs if needed -->


  ### 1. Gallery function
- ✅ Aspect-ratio utilities implemented (3:4 portrait, 4:3 landscape).
- ⚠️ Flush-top alignment still inconsistent on tablet.
- ⏳ Caption alignment under review for mobile.

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
  - Artist names and sub-header tabs on artist pages.
  - Homepage hero text (SVG/PNG assets).
  - Global headers and nav.
- Add Safari and Firefox fallback styles per WCAG AA contrast rules.

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