## APREPS Artist Name Blend Selectors

### Sticky Wrapper
`.apreps .fe-block.sqs-position-sticky[style*="mix-blend-mode"]`
- Purpose: Wrapper for sticky artist name heading
- Blend properties: mix-blend-mode: difference, background: transparent, transform: translate3d(0,0,0)
- Location: D2: mix blend.css (2 occurrences)

### Artist Name Headings
`.apreps .sqs-block.html-block .sqs-html-content h3`
`.apreps .sqs-block.html-block .sqs-html-content h3 *`
`.apreps .sqs-block.html-block .sqsrte-text-color--black`
- Purpose: Artist name h3 headings above AP-REPS gallery
- Blend properties: mix-blend-mode: difference, color: #fff, background: transparent, text-shadow: none, transform: translate3d(0,0,0)
- Location: D2: mix blend.css (2 occurrences)
- Note: transform: translate3d(0,0,0) is critical for Safari to properly render blend-mode across different backgrounds

### Pattern Reference
These selectors follow the canonical pattern from header blend rules:
- Header container: lines 772-782
- Header elements: lines 784-803
