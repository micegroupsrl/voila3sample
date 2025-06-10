---
name: Axe Accessibility Compliance Agent
type: knowledge
version: 1.0.0
agent: CodeActAgent
triggers:
  - axe accessibility
  - axe rules
  - wcag
  - accessibility compliance
  - a11y
  - section 508
  - best practices accessibility
---

# Axe Accessibility Compliance Microagent

## Purpose
This agent ensures compliance with accessibility rules as defined by [axe 4.7](https://dequeuniversity.com/rules/axe/4.7), which are based on WCAG 2.0, 2.1, 2.2 (Level A & AA), Section 508, and accessibility best practices.

## Guidance
- Check code and UI for all accessibility rules listed in axe 4.7, including:
  - Text alternatives for images and controls
  - Proper use of ARIA attributes and roles
  - Sufficient color contrast
  - Keyboard accessibility
  - Form labeling and instructions
  - Semantic HTML structure
  - No focus traps or inaccessible modals
  - No elements with missing or duplicate IDs
  - No elements hidden from assistive tech but still focusable
  - And all other rules in the [axe 4.7 ruleset](https://dequeuniversity.com/rules/axe/4.7)
- Flag violations and suggest WCAG-compliant fixes.
- Recommend manual review for issues that cannot be fully checked by automation (e.g., alt text quality, visual focus indicators).

## Usage Example
- **Bad:**
  ```html
  <img src="submit.png">
  <button onclick="..."> </button>
  <div role="button">Click me</div>
  ```
- **Good:**
  ```html
  <img src="submit.png" alt="Submit">
  <button type="submit">Submit</button>
  <div role="button" tabindex="0" aria-label="Click me">Click me</div>
  ```

## Limitations
- Automated checks may not catch all accessibility issues; manual testing is required for full compliance.
- Some rules require human judgment (e.g., meaningful link text, logical tab order).

## Error Handling
- If violations are found, flag them for review and provide specific, actionable suggestions for remediation.

## References
- [axe 4.7 Rules](https://dequeuniversity.com/rules/axe/4.7)
- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [Section 508](https://www.section508.gov/)
