# Revised Final Fixes Tasks

## Navigation & Menu Layout

- **Mobile Secondary Navigation Styling:** On the gallery pages’ mobile view, the secondary navigation bar (the tab menu under the header) is styled inconsistently. The underline (active tab indicator) should align with page margins, but currently it extends past or is too narrow. The letter-spacing (“font tracking”) of the nav text should match the footer text style, yet it does not. The gradient background should apply only to the underline, not beyond it. Also, add vertical spacing below the header on mobile to mirror the desktop layout. The task is to adjust the CSS for the `.wm-tabs` component so that the underline width and text tracking match the design spec, and to insert the missing top/bottom padding. (Include side-by-side screenshots of the current vs. expected nav styling, and refer to the site’s design guidelines or CSS rules for `.wm-tabs`.)
- **Artist Menu Text Insets:** In the artist page menu, the menu item text is flush against the screen edges. The task is to add consistent left and right padding or margin so that all menu items are indented from the viewport edges by the same amount. Identify the CSS selector (likely the `.artist-menu` or `.header` style) that controls item padding and update it (e.g. `padding: 0 16px;`) to center the text. Provide screenshots showing current misalignment and expected alignment, and link to the relevant HTML/CSS in the codebase.
- **Category List Alignment:** The list of artist categories (e.g. filter buttons or links) is right-aligned on some breakpoints, causing an inconsistent layout. Ensure that the category list items remain left-aligned (or centered) consistently on all screen sizes. Review the responsive CSS or flex/grid settings for the category list container and adjust alignment (possibly by removing a `float: right` or adding a consistent `justify-content`) so items line up uniformly. Include examples of the layout at different breakpoints and point to the related markup in code.

## Gallery Display & Interaction

- **Sticky Artist Name Position:** On each artist’s gallery page (with tabbed categories), the sticky header block containing the artist’s name and discipline shifts vertically between tabs. In short-content tabs the name sits higher, so it appears out of place. The problem is that the sticky block has no fixed offset and is affected by varying tab panel heights[Notion](https://www.notion.so/Final-Fixes-2b55fc23214f8046a0a3e8a99289893c?pvs=21). To fix this, enforce a consistent top offset (for example, using the existing CSS variable `-ap-artist-sticky-offset` defined in the AP-REPS stylesheet[GitHub](https://github.com/rkuskopf/ap-reps_repo_scaffold/blob/6d64e711c86e2248d9e8ed0f17fdf07406e3f86a/02_styles/dev.css#L200-L203)) or add a minimum height spacer so all tabs have the same starting point. The result should be that the sticky name block is always the same distance from the top of the viewport. Provide screenshots of two tabs (short vs long content) to illustrate the misalignment, and reference the CSS rules (e.g. in `dev.css`) that control the sticky positioning.
- **Caption/Subtitle Visibility:** Some gallery image tiles have subtitles (captions) that are being cut off in the UI. The caption container currently has a fixed height or hidden overflow, so longer titles get clipped[Notion](https://www.notion.so/Gallery-Ensure-subtitle-is-not-cut-off-same-size-as-footer-text-4099e104f24a4cb092bb3ddb8e21ed8a?pvs=21). Additionally, the caption text is styled with a smaller font size/tracking than the footer, making it appear cramped[Notion](https://www.notion.so/Gallery-Ensure-subtitle-is-not-cut-off-same-size-as-footer-text-4099e104f24a4cb092bb3ddb8e21ed8a?pvs=21). The task is to allow captions to wrap to multiple lines and ensure the caption box expands accordingly: remove or relax any fixed height/max-height and disable overflow:hidden on the caption wrapper. Also update the typography so the font size and letter-spacing match the footer style. (See Notion Issue 1.6 for details: captions should be fully visible on all devices[NotionNotion](https://www.notion.so/Gallery-Ensure-subtitle-is-not-cut-off-same-size-as-footer-text-4099e104f24a4cb092bb3ddb8e21ed8a?pvs=21).) Include a screenshot of a clipped caption and a snippet of the CSS (or dev tools inspection) showing the wrapper dimensions.
- **Infinite-Scroll Gallery Linking:** In the infinite-scroll gallery view, each artwork tile includes a link button to the artist page. Currently, the button is hidden with `display:none`, which unfortunately removes the link from the DOM and makes the tile unclickable[Notion](https://www.notion.so/Final-Fixes-2b55fc23214f8046a0a3e8a99289893c?pvs=21). The desired behavior is that clicking anywhere on the tile should navigate to the artist page. To fix this, keep the button or anchor element in place but hide it visually (for example, set it to `position:absolute; top:0; left:0; width:100%; height:100%` and `opacity:0` with `pointer-events:auto`). This ensures the entire tile remains a clickable link[Notion](https://www.notion.so/Final-Fixes-2b55fc23214f8046a0a3e8a99289893c?pvs=21). Provide a CSS snippet of the proposed change and a screenshot showing how the tile should be clickable.

## Page Load & UX

- **Footer/Bio Load Timing (Artist Pages):** On artist pages, the Squarespace footer (and possibly the bio) is appearing before the gallery plugin content finishes loading, causing a layout shift. As described in the Notion summary, the footer briefly flashes at the top and then is pushed down as images load[Notion](https://www.notion.so/Final-Fixes-2b55fc23214f8046a0a3e8a99289893c?pvs=21). The expected UX is that the footer stays hidden or invisible until all AP-REPS content is rendered. One solution is to apply `opacity: 0` to the footer initially and remove it (or fade it in) after the plugin signals that content is ready[Notion](https://www.notion.so/Final-Fixes-2b55fc23214f8046a0a3e8a99289893c?pvs=21). This may involve listening to the gallery’s load event or adding a slight delay (e.g. via `setTimeout`). Include details of any existing JS events/hooks for AP-REPS load, and a screenshot or step-by-step showing the before-and-after behavior.

## Mobile Enhancements

- **Mobile Hero Slideshow:** The mobile version of the homepage hero (top section) should feature an image slideshow derived from plugin data. The requirement is to create a hover-enabled slideshow on mobile using the plugin’s images, but with slower transitions for better UX (the current implementation “needs to go slower”[Notion](https://www.notion.so/Final-Fixes-2b55fc23214f8046a0a3e8a99289893c?pvs=21)). Since hover isn’t a native mobile interaction, clarify whether the slideshow should auto-play or advance on tap. Then implement the slideshow with a reasonable timing (e.g. 3–5 seconds per slide). Provide example code or a reference to the existing hero component, and link to any design guidelines for slide speed.

## Documentation & Context Checklist

- **Screenshots/Design References:** For each UI task, gather screenshots comparing the current state with the expected result (e.g. mobile nav vs desktop, clipped caption vs full caption). If available, include Figma/mockup references or style guide links for spacing, fonts, and colors.
- **Code References:** Link to relevant CSS/JS in the AP-REPS codebase that governs the issue. For example, note that the sticky header offset is controlled by `-ap-artist-sticky-offset` in `dev.css`[GitHub](https://github.com/rkuskopf/ap-reps_repo_scaffold/blob/6d64e711c86e2248d9e8ed0f17fdf07406e3f86a/02_styles/dev.css#L200-L203). Point to the CSS rules for `.wm-tabs` underlines, the caption wrapper class, and the menu container as needed.
- **Issue Context Links:** Provide links to the Notion issue pages (like Issue 1.5 and 1.6) or GitHub tickets that describe the problem, so that developers see the full context and reproduction steps (e.g. the detailed caption issue page[NotionNotion](https://www.notion.so/Gallery-Ensure-subtitle-is-not-cut-off-same-size-as-footer-text-4099e104f24a4cb092bb3ddb8e21ed8a?pvs=21)).
- **Definitions/Explanations:** Clarify any ambiguous terms in the task descriptions. For instance, define “secondary navigation” (the tab bar under the header) and “infinite scroll gallery” (the auto-loading grid of images). If domain-specific terms are used (like “AP-REPS plugin”), provide a brief description or link to its documentation.
- **Additional Data:** Note if there are any console errors, logs, or analytics relevant to the issue. Suggest running browser dev tools to inspect element dimensions or event timings. If performance is a factor (e.g. in the footer load), mention any timing info or user flow to watch for.
- **Dependencies/Related Tasks:** Identify if one fix depends on another (e.g. caption size and container height are related), and if there are existing tasks that should be marked as related. Document these relationships so that a GitHub issue can cross-reference them.

Each revised task above is now phrased as a clear, self-contained issue description. Use the checklist to ensure all necessary details (images, code refs, etc.) are added before creating the GitHub issues. The citations point to the Notion source content and code snippets that inform each problem and proposed solution.

Sources

### You said:

can you write me github issues for each?

### ChatGPT said:

Sure thing. I’ll now create GitHub-ready issues for each of the revised tasks. Each issue will include a clear title, problem description, steps to reproduce (if applicable), expected behavior, and implementation notes (like CSS selectors or links to Notion/context). I’ll let you know when they’re ready for review.

Research completed in 10m · 26 sources · 15 searches

### ChatGPT said:

### Secondary Nav: Underline should match content margin width

**Description:** On mobile, the secondary navigation underline currently extends beyond the intended content width, misaligned with the page margins. The Notion “Final Fixes” board explicitly lists “Nav underline to be same width to margin” as a required change[Notion](https://www.notion.so/Final-Fixes-2b55fc23214f8046a0a3e8a99289893c?pvs=21). In other words, the underline below each nav item should align exactly with the left/right margins of the content (matching the horizontal padding used elsewhere).

**Steps to Reproduce:** On a mobile device or narrow browser width, navigate to a category page with the secondary nav. Inspect the underline under a menu item – you will see it extends beyond the expected margin.

**Expected Behavior:** The colored underline under each active secondary nav item should start and end at the same horizontal position as the page content (same left/right margin). It should appear flush with the content edges, just like on desktop.

**Implementation Notes:** Adjust the CSS for the secondary nav underline (often implemented via a pseudo-element or border). For example, ensure any underline element or `::after` pseudo-element has its `width` or `left/right` properties calculated as `100%` of the nav container minus the page padding. If the page has `padding: 20px`, the underline could use `left: 20px; right: 20px;` or `width: calc(100% - 40px)`. No display changes should leak outside the nav container. The goal is for the underline’s horizontal span to match the content’s padding exactly.

**Assets/References:** Notion “Final Fixes” board listing the task[Notion](https://www.notion.so/Final-Fixes-2b55fc23214f8046a0a3e8a99289893c?pvs=21).

### Secondary Nav: Letter-spacing should match footer text

**Description:** The letter-spacing (“font tracking”) of the secondary navigation links on mobile is currently different from the site’s footer text. Per the Final Fixes board, “Font tracking to be same as footer text”[Notion](https://www.notion.so/Final-Fixes-2b55fc23214f8046a0a3e8a99289893c?pvs=21). This inconsistency makes the nav text look mismatched in spacing and weight compared to the rest of the site typography (especially the footer).

**Steps to Reproduce:** View the secondary nav on mobile and compare to the footer text on any page. Note the horizontal space between letters – it is tighter or looser in the nav than in the footer.

**Expected Behavior:** The secondary nav links should use the same letter-spacing (and font weight/style) as the footer text. For example, if the footer text uses a letter-spacing of `.05em` (as in the site’s body text), then apply the same `.05em` spacing to the nav links. This ensures visual consistency.

**Implementation Notes:** Identify the CSS rule for the secondary nav link text (e.g. `.apreps .secondary-nav a` or similar). Add or adjust `letter-spacing` (also called `tracking`) to match the footer. For instance, if the site uses `letter-spacing: .05em` (see custom CSS[Notion](https://www.notion.so/Issue-1-6-Caption-Styles-ea844e08e3894e0fa2508155eb8d2a1a?pvs=21) for the base body font), apply that to the nav links. No layout changes; just adjust the `letter-spacing` property.

**Assets/References:** Notion “Final Fixes” board listing the task[Notion](https://www.notion.so/Final-Fixes-2b55fc23214f8046a0a3e8a99289893c?pvs=21).

### Secondary Nav: Underline gradient should be limited to the underline

**Description:** The gradient effect on the secondary nav’s underline currently bleeds outside the underline itself. The board notes “Gradient to be contained in underline only”[Notion](https://www.notion.so/Final-Fixes-2b55fc23214f8046a0a3e8a99289893c?pvs=21). In practice, the linear gradient fill should be clipped so that it only appears on the underline element (not on surrounding areas).

**Steps to Reproduce:** On mobile, inspect a nav link’s underline (often a bottom border or pseudo-element). You may see the gradient extending beyond its bounds or onto adjacent text.

**Expected Behavior:** The gradient should be fully contained within the underline element. It should not overlap or bleed into the surrounding background or text. Only the underline segment itself should display the gradient.

**Implementation Notes:** If using a pseudo-element (like `::after`) for the underline, ensure `overflow: hidden` on the parent or adjust the pseudo-element’s `background-clip`. For example, use `background-clip: padding-box` or clip the gradient to the width of the underline. Alternatively, wrap the underline in a container and apply the gradient only to that container’s background, ensuring it doesn’t extend past the element’s width.

**Assets/References:** Notion “Final Fixes” board listing the task[Notion](https://www.notion.so/Final-Fixes-2b55fc23214f8046a0a3e8a99289893c?pvs=21).

### Secondary Nav: Add spacing below header

**Description:** On mobile, the secondary navigation bar is too close to the page header; the board instructs to “Add in space below header (replicate desktop)”[Notion](https://www.notion.so/Final-Fixes-2b55fc23214f8046a0a3e8a99289893c?pvs=21). This means there should be a vertical gap beneath the main header so the secondary nav is positioned slightly lower (as it is on desktop). Currently they are flush together, which breaks the intended layout.

**Steps to Reproduce:** On a mobile device, visit a gallery page. Note that the secondary nav (e.g. “Overview”, “Beauty”, etc.) is immediately below the header image/text.

**Expected Behavior:** There should be a visible margin or padding between the header section and the secondary nav, matching the desktop design. For example, if the desktop shows 20px of gap below the header, the mobile should do the same.

**Implementation Notes:** Add top margin or padding to the secondary nav container (or bottom margin to the header). For example, if the header block has a fixed height, you might set `.secondary-nav { margin-top: 1rem; }` or similar. Check the desktop CSS for the exact spacing and apply that value for mobile (perhaps in a `max-width: 767px` media query).

**Assets/References:** Notion “Final Fixes” board listing the task[Notion](https://www.notion.so/Final-Fixes-2b55fc23214f8046a0a3e8a99289893c?pvs=21).

### Sticky Artist Name: Enforce consistent top offset across categories

**Description:** On artist gallery pages, the sticky artist name block currently shifts up and down depending on the gallery content height. In short tabs (categories with little content), the name sits higher; in longer tabs, it sits lower. This inconsistency is noted in the Final Fixes board (“Sticky artist name position” issue). The Notion task comments that the name “appears at inconsistent vertical positions” when gallery content height varies[Notion](https://www.notion.so/Issue-1-5-Sticky-Artist-Name-HTML-cdb681c087a74947a2dafc277450e1a4?pvs=21). We need a fixed offset so the name is always at the same distance from the top of the viewport regardless of tab content.

**Steps to Reproduce:** On a desktop or mobile browser, go to an artist page with multiple tabs (e.g. Cat Smith – Overview vs. Beauty). Open the same artist’s page in two tabs and select “Overview” in one and “Beauty” in the other. Compare the vertical position of the sticky name – it will differ.

**Expected Behavior:** The sticky artist name should always start at a consistent vertical offset (e.g. 120px below the top) on every category tab. It should not jump up or down when switching tabs.

**Implementation Notes:** In the custom CSS, there is a CSS variable for this:

```css
.apreps {
  --ap-artist-sticky-offset: clamp(120px, 16vw, 260px);
}

```

Apply this variable to the sticky element. For example:

```css
.apreps .fe-block.sqs-position-sticky {
  top: var(--ap-artist-sticky-offset);
}

```

This ensures a fixed top offset (responsive via `clamp()`) for the sticky block. You may also normalize the parent container height to avoid collapsing; for instance, ensure the `.tab-panel > .tab-content` has a minimum height so short content doesn’t pull the sticky block up. Reference the HTML structure and classes from Notion (the `.fe-block` with `.sqs-position-sticky`)[Notion](https://www.notion.so/Issue-1-5-Sticky-Artist-Name-HTML-cdb681c087a74947a2dafc277450e1a4?pvs=21).

**Assets/References:** Notion “Issue 1.5 – Sticky Artist Name HTML” for HTML structure[Notion](https://www.notion.so/Issue-1-5-Sticky-Artist-Name-HTML-cdb681c087a74947a2dafc277450e1a4?pvs=21); AP-REPS CSS reference for the `--ap-artist-sticky-offset` variable[Notion](https://www.notion.so/AP-REPS-Custom-CSS-Full-Reference-3232d208174c47b6a4974e043fae3497?pvs=21).

### Gallery Caption: Allow full subtitle and match footer text style

**Description:** Some gallery image captions (subtitles) are being cut off, and the caption text is styled smaller and tighter than the footer text. The Notion task “Caption Styles (Issue 1.6)” describes that the caption container has a fixed height/overflow hidden, clipping longer titles[Notion](https://www.notion.so/Gallery-Ensure-subtitle-is-not-cut-off-same-size-as-footer-text-4099e104f24a4cb092bb3ddb8e21ed8a?pvs=21). It also notes the caption’s font size/letter-spacing is smaller than the footer. We must allow captions to wrap fully and expand their box, and update their typography to match the footer.

**Steps to Reproduce:** On any gallery page with images that have multi-line captions, inspect an image caption. You will see longer captions clipped (with `overflow: hidden`) and the text appearing cramped. Compare that text to the footer – the footer is more readable (larger or looser letter-spacing).

**Expected Behavior:** Captions should not be cut off. The caption box should auto-expand or allow multiple lines (no fixed height, no hidden overflow). Typography for captions (font size and letter-spacing) should match the footer’s style (e.g. if footer text is 12px at .05em, so should the caption). As a result, all caption text should be fully visible and consistent.

**Implementation Notes:** Remove any CSS like `height: Xpx` or `max-height: Xpx` from the caption wrapper, and set `overflow: visible` (instead of `hidden`). Allow the caption container to grow (e.g. `display: block` with auto height). Update the caption text style – for example, use the same variables as the footer (see CSS ref: footer uses `.9rem` font with `.05em` spacing[Notion](https://www.notion.so/Issue-1-6-Caption-Styles-ea844e08e3894e0fa2508155eb8d2a1a?pvs=21)[Notion](https://www.notion.so/Gallery-Ensure-subtitle-is-not-cut-off-same-size-as-footer-text-4099e104f24a4cb092bb3ddb8e21ed8a?pvs=21)). For instance:

```css
.apreps .gallery-caption {
  font-size: var(--base-font-size);
  letter-spacing: var(--body-font-letter-spacing);
  line-height: 1.3em;
}
.apreps .gallery-caption-wrapper {
  height: auto !important;
  overflow: visible !important;
}

```

Include a screenshot (if available) and relevant CSS from dev tools showing the old fixed height.

**Assets/References:** Notion task “Ensure subtitle is not cut off & same size as footer text”[Notion](https://www.notion.so/Gallery-Ensure-subtitle-is-not-cut-off-same-size-as-footer-text-4099e104f24a4cb092bb3ddb8e21ed8a?pvs=21) (describes the clipping and needed fix).

### Footer Loading: Delay footer/bio until plugin content loads

**Description:** On artist pages, the Squarespace footer (and possibly artist bio) currently appears before the AP-REPS plugin content has loaded. This causes a layout shift: the footer briefly displays at the top of the page, then is pushed down once the gallery/plugin content renders[Notion](https://www.notion.so/Gallery-Function-Fix-footer-bio-loading-in-before-gallery-d24ae62df4ec4166bba5a72b92ea5701?pvs=21). The task describes that “Footer appears too early… causing layout shift”[Notion](https://www.notion.so/Gallery-Function-Fix-footer-bio-loading-in-before-gallery-d24ae62df4ec4166bba5a72b92ea5701?pvs=21). We need to prevent that jump by delaying or hiding the footer until the plugin is ready.

**Steps to Reproduce:** On an artist page load, observe that the footer or bottom content flashes into view too soon. You may see footer links before the images load. This is the disruptive behavior to fix.

**Expected Behavior:** The footer (and lower-page content) should stay hidden or invisible until the AP-REPS content is fully loaded and the layout final. There should be no flash of the footer content above the gallery. Only after the plugin inserts its content should the footer become visible.

**Implementation Notes:** Introduce a delay or use a load event hook. For example, initially apply `opacity: 0` or `visibility: hidden` to the footer (using a high selector like `footer, #footer-block { opacity: 0; transition: opacity 0.3s; }`). In JavaScript, once AP-REPS reports it has finished rendering (or after a short `setTimeout` if no hook is available), remove that style to fade the footer in. Alternatively, add a wrapper around the plugin content and on its load event, toggle a class on the `<body>` (e.g. `.apreps-loaded`) that then shows the footer (`.apreps-loaded footer { opacity: 1; }`). The key is to prevent the footer from rendering visibly above the plugin content.

**Assets/References:** Notion task “Fix footer/bio loading in before gallery”[Notion](https://www.notion.so/Gallery-Function-Fix-footer-bio-loading-in-before-gallery-d24ae62df4ec4166bba5a72b92ea5701?pvs=21).

### Mobile Hero: Enable image slideshow on tap/hover

**Description:** The site’s mobile hero section (the large banner/hero images) currently lacks the interactive slideshow behavior found on desktop. The task specifies “Create a hover image slideshow on mobile based off plugin”[Notion](https://www.notion.so/Final-Fixes-2b55fc23214f8046a0a3e8a99289893c?pvs=21). In other words, swiping or tapping on the hero should cycle through images just like the desktop hover animation. This is needed to replicate the plugin-driven animation on mobile.

**Steps to Reproduce:** On a mobile device, land on the homepage or relevant section. Observe that the hero images are static and do not change on tap/swipe.

**Expected Behavior:** The hero area should auto-advance or respond to taps with a smooth slideshow effect. Ideally, it uses the same image set as the desktop plugin. For example, a tap could trigger a CSS animation or class swap that fades to the next image.

**Implementation Notes:** This likely involves duplicating the plugin’s keyframes for mobile, then triggering them on tap. For example, you could apply a CSS animation (like a fade or slide) to the hero image container on `:active` or use JavaScript swipe detection. If using the existing plugin library, configure it to autoplay on mobile (if supported). Otherwise, a simplified approach: add a CSS animation (e.g. `animation: fade 10s infinite`) to the hero container in a `@media (max-width: 767px)` block, or use JS to toggle a class at intervals. Ensure any `cursor: none` code (from mobile hero CSS) is removed so taps register. (No existing CSS reference to cite directly.)

**Assets/References:** Notion “Final Fixes” board listing the task[Notion](https://www.notion.so/Final-Fixes-2b55fc23214f8046a0a3e8a99289893c?pvs=21).

### Artist Menu: Add horizontal padding to text

**Description:** The text in the artist menu (the list of artists) is currently edge-to-edge on both mobile and desktop. The task “Artist Menu – Inset text to margin on both sides”[Notion](https://www.notion.so/Final-Fixes-2b55fc23214f8046a0a3e8a99289893c?pvs=21) indicates that the menu item text should be inset (padded) from the edges, aligning with the site’s content margins. This will prevent the text from touching the screen edges.

**Steps to Reproduce:** Open the site’s artist menu on mobile (and desktop) and look at a menu item name; currently the text starts right at the left edge with no left padding, and similarly at the right edge.

**Expected Behavior:** Artist menu item text should have the same left/right padding as the rest of the page content. For example, if the page content has 20px side padding, apply that to the menu items as well. The text should no longer be flush against the edge.

**Implementation Notes:** Modify the CSS for the menu item container. For example, if menu items are `.artist-menu li`, set `padding: 0 20px;` (or the equivalent responsive padding). Ensure both mobile and desktop styles include this padding. If a specific Squarespace block ID is used for the menu, target it (e.g. `#artist-menu { padding: 0 20px; }`). The goal is consistent horizontal padding.

**Assets/References:** Notion “Artist Menu – Inset text to margin on both sides” task[Notion](https://www.notion.so/Final-Fixes-2b55fc23214f8046a0a3e8a99289893c?pvs=21).

### Hover Image List: Consistent item layout across breakpoints

**Description:** The layout of items in the hover image list (e.g. artist categories with images) is not consistent on different screen sizes. The Final Fixes board notes “Ensure layout of the line items remain consistent across breakpoints” and specifically that the “Artist category [is] right aligned” incorrectly[Notion](https://www.notion.so/Final-Fixes-2b55fc23214f8046a0a3e8a99289893c?pvs=21). This suggests that on some breakpoints, list items have misalignment. We need to ensure all list items (titles/images) align uniformly (usually left-aligned) on all devices.

**Steps to Reproduce:** View the hover image list on both desktop and mobile sizes. Notice if any text or image is shifted or aligned differently (e.g. one category name appears right-aligned on desktop but left on mobile).

**Expected Behavior:** Each list item in the hover image list should use the same alignment/justification on all breakpoints. If the design calls for left-aligned text/icons, ensure that stays true on mobile and desktop. The “Artist” category in particular should line up with the others instead of drifting right.

**Implementation Notes:** Check the CSS for the list container (e.g. `.image-hover-list`, `.artist-category-list`) and its items. Remove any breakpoint-specific overrides that change text alignment or flex/grid properties. For example, ensure `.image-hover-list` has `text-align: left;` (or appropriate flex settings) at all widths. If a particular class is pushing one item to the right (like `.artist-category { float: right; }`), remove it. The fix is likely an adjustment to flexbox or grid alignment so items keep the same flow.

**Assets/References:** Notion “Ensure layout of line items remain consistent across breakpoints” task[Notion](https://www.notion.so/Final-Fixes-2b55fc23214f8046a0a3e8a99289893c?pvs=21).

### Infinite Scroll Gallery: Make tiles clickable even when button is hidden

**Description:** In the infinite scroll gallery, image tiles currently lose their link to the artist page when the overlay button is hidden. The Notion task explains that the button is hidden via `display: none`, which removes it from the layout and breaks clickability[Notion](https://www.notion.so/Infinite-Scroll-gallery-Allow-container-to-be-linkable-to-artist-page-163334c006394d539ae5c7bee3526153?pvs=21). As a result, clicking the tile does nothing. The fix is to keep the button in the DOM (so the tile is still a link) but hide it visually.

**Steps to Reproduce:** Visit a page with the infinite scroll gallery. Notice that the gallery tiles should link to artist pages, but clicks have no effect because the actual `<button>` link is `display: none`. Inspect the HTML/CSS for the tiles; see that the link is hidden.

**Expected Behavior:** Each gallery tile should remain fully clickable to its artist page, even if the button isn’t visibly shown. The user should not notice any change in link functionality when the overlay is toggled.

**Implementation Notes:** Change the CSS that hides the button. Instead of `display: none`, use absolute positioning and opacity. For example:

```css
.image-hover-list .button-class {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  opacity: 0;
  pointer-events: auto;
  z-index: 10;
}

```

This keeps the button in the DOM (so links work) but visually invisible and occupying the full tile. You may also need to hide inner text/icon inside the button if necessary (e.g. `visibility: hidden` on the icon). In the provided CSS reference, this is the recommended approach[Notion](https://www.notion.so/Infinite-Scroll-gallery-Allow-container-to-be-linkable-to-artist-page-163334c006394d539ae5c7bee3526153?pvs=21). Be sure the tile’s `z-index` stacking places the invisible button above other content so clicks register.

**Assets/References:** Notion “Infinite Scroll gallery: Allow container to be linkable to artist page”[Notion](https://www.notion.so/Infinite-Scroll-gallery-Allow-container-to-be-linkable-to-artist-page-163334c006394d539ae5c7bee3526153?pvs=21) (describes the issue) and suggested CSS fix[Notion](https://www.notion.so/Infinite-Scroll-gallery-Allow-container-to-be-linkable-to-artist-page-163334c006394d539ae5c7bee3526153?pvs=21).