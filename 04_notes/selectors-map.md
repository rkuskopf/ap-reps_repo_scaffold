## APREPS Artist Name Blend Selectors (custom.css)

### Sticky Wrapper
`.apreps .fe-block.sqs-position-sticky[style*="mix-blend-mode"]`
- Purpose: Wrapper for sticky artist name heading
- Blend properties: mix-blend-mode: difference, background: transparent, color: #fff, transform: translate3d(0,0,0)
- Location: custom.css (line ~462)
- Status: ✅ Already correct

### Artist Name Headings  
`.apreps .sqs-block.html-block .sqs-html-content h3`
`.apreps .sqs-block.html-block .sqs-html-content h3 *`
`.apreps .sqs-block.html-block .sqsrte-text-color--black`
- Purpose: Artist name h3 headings above AP-REPS gallery
- Blend properties: mix-blend-mode: difference, color: #fff, background: transparent, text-shadow: none
- Location: custom.css (line ~473)
- **Fix applied**: Changed from `mix-blend-mode: normal` to `mix-blend-mode: difference` to enable inversion over white backgrounds
