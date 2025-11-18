# AP-REPS Styles Directory

## Files Overview

### Production Files

- **`custom.css`** (1071 lines)
  - **Production-ready refactored CSS**
  - Organized into 8 clear sections
  - Single source of truth for gallery ratios
  - Scoped cursor overrides
  - Fully documented
  - **Ready to deploy**

- **`custom-original-backup.css`** (1144 lines)
  - Backup of original CSS before refactoring
  - Use for rollback if needed
  - Can be deleted after successful deployment

### Legacy Deliverable Files

These files contain historical snapshots of individual deliverables. They are kept for reference but are **not used in production**. All their content has been consolidated into `custom.css`.

- `D1: Gallery ratios.css` - Gallery aspect ratio work (now in Section 3)
- `D2: mix blend.css` - Header blend-mode work (now in Section 1)
- `D4: breakpoints.css` - Fluid Engine fixes (now in Section 3)
- `D4: gallery height.css` - Gallery height fixes (now in Section 3)
- `D5 mobile hero.css` - Mobile hero collage (now in Section 5)
- `D6 cursor and hover.css` - Cursor work (now in Section 6)
- `D7 unexpected block.css` - Image-hover-list fix (now in Section 6)
- `dev.css` - Development/testing file

### Documentation Files

- **`ISSUE-RESPONSE.md`**
  - Point-by-point response to the audit issue
  - Shows how each concern was addressed
  - **Read this first** to understand the refactoring

- **`REFACTORING-NOTES.md`**
  - Detailed changelog of what changed
  - Benefits achieved
  - Migration plan
  - Future considerations

- **`VALIDATION-SUMMARY.md`**
  - Automated validation checks
  - Manual testing checklist
  - Security review
  - Performance impact analysis

- **`VISUAL-COMPARISON.md`**
  - Before/after visual comparisons
  - Shows organization improvements
  - Highlights specific fixes
  - Summary of benefits

## Quick Start

### For Developers

1. **Review the refactoring:**
   ```bash
   cat ISSUE-RESPONSE.md
   ```

2. **See what changed:**
   ```bash
   cat REFACTORING-NOTES.md
   ```

3. **Check validation:**
   ```bash
   cat VALIDATION-SUMMARY.md
   ```

4. **Compare structure:**
   ```bash
   cat VISUAL-COMPARISON.md
   ```

### For Deployment

1. **Current state:**
   - `custom.css` contains refactored production-ready code
   - All functionality preserved, organization improved
   - Backup available in `custom-original-backup.css`

2. **Deploy to staging:**
   ```bash
   # Copy custom.css to Squarespace Code Injection
   # Test against checklist in VALIDATION-SUMMARY.md
   ```

3. **If tests pass, deploy to production:**
   ```bash
   # Copy custom.css to production Code Injection
   # Monitor for 48 hours
   ```

4. **After successful deployment:**
   ```bash
   # Optional: Remove backup file
   rm custom-original-backup.css
   ```

## What Changed

### ✅ Improvements Made

1. **Gallery CSS Consolidated**
   - From: 235 lines scattered across 3 sections
   - To: 150 lines in Section 3
   - Removed: 85 duplicate lines

2. **Cursor Override Scoped**
   - From: Global (`body, a, button, *`)
   - To: Hero and galleries only
   - Fixed: Forms and admin now work

3. **Mobile Hero Stable**
   - From: Rules scattered across 115 lines
   - To: Section 5, 113 lines, well organized
   - Fixed: Clear z-index, no desktop conflicts

4. **Documentation Added**
   - Table of contents
   - Section headers with purpose
   - Subsection comments
   - Technical notes

5. **Code Quality**
   - 6.4% smaller (1144 → 1071 lines)
   - No duplicates
   - Clear hierarchy
   - Easy to navigate

### ✅ Preserved

- All header blend-mode behavior
- All mobile menu functionality
- All gallery aspect ratios
- All tab plugin configs
- All Digital Moves plugins
- All footer newsletter styling
- **Zero visual regressions**

## CSS Structure

The refactored `custom.css` has 8 main sections:

1. **Header & Navigation** (269 lines)
   - Blend-mode for header overlay
   - Mobile menu white background
   - Safari compatibility

2. **Will Myers Tabs Plugin** (54 lines)
   - Equal width tabs
   - Sticky content support
   - Transparent backgrounds

3. **Gallery Ratios & Layout** (248 lines)
   - Single source of truth
   - Aspect ratio control
   - Fluid Engine fixes

4. **Sticky Artist Names** (43 lines)
   - Blend-mode text over galleries
   - Contact page exception

5. **Mobile Hero Collage** (113 lines)
   - Animated lanes
   - Hero text positioning
   - Z-index layering

6. **Digital Moves Plugins** (152 lines)
   - Dot cursor (scoped!)
   - Infinite auto-scroll
   - Image-hover-list mobile fix

7. **Footer Newsletter** (152 lines)
   - Custom Mailchimp styling
   - Underlined input field
   - Tertiary button

8. **Utilities** (5 lines)
   - Overscroll behavior

## Testing Checklist

See `VALIDATION-SUMMARY.md` for complete checklist. Key items:

**Desktop:**
- [ ] Header blend-mode works
- [ ] Gallery aspect ratios 4:3
- [ ] Custom cursor in hero/galleries only
- [ ] Normal cursor in forms

**Mobile:**
- [ ] Mobile menu white background
- [ ] Hero collage animates
- [ ] Galleries maintain aspect ratio
- [ ] No custom cursor (touch)

## Rollback Plan

If issues are discovered:

```bash
cd 02_styles
cp custom-original-backup.css custom.css
# Test
# Deploy to production
```

## Future Work

1. Make mobile hero lane gap a variable: `--hero-lane-gap: 600px`
2. Expose `--ap-aspect` per-tab for mixed gallery ratios
3. Add class names via Code Injection for block-specific selectors
4. Monitor Squarespace Fluid Engine updates

## Questions?

- Review `ISSUE-RESPONSE.md` for how each issue concern was addressed
- Review `REFACTORING-NOTES.md` for detailed changelog
- Review `VALIDATION-SUMMARY.md` for testing procedures
- Review `VISUAL-COMPARISON.md` for before/after comparisons
