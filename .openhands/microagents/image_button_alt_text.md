---
name: image_button_alt_text
version: 1.0.0
type: knowledge
agent: CodeActAgent
triggers:
  - image button alt text
  - input type image alt
  - image button accessibility
  - image button alternate text
---

# Image Button Alternate Text Microagent

## Rule
Ensures `<input type="image">` elements have accessible alternate text.

## Algorithm
- Every `<input type="image">` must have an accessible name.
- Accessible name can be provided by a non-empty `alt`, `aria-label`, or `aria-labelledby` attribute.
- If using `aria-labelledby`, the referenced ID must exist and not be hidden (`display: none` or `aria-hidden="true"`).

## How to Fix
- Add a clear, concise, and action-representative `alt` attribute: `<input type="image" alt="Submit">`
- Or use `aria-label`: `<input type="image" aria-label="Submit">`
- Or use `aria-labelledby` with a valid, visible element: `<input type="image" aria-labelledby="submitLabel">`

## Tips for Writing Alt Text
- Describe the intent, purpose, and meaning of the button.
- Avoid words like "image", "button", or file names.
- Make the text useful and action-oriented.

## Why it Matters
Screen reader users need alternate text to understand the button's purpose. Text next to the button is not sufficient; the label must be programmatically associated.

## Example (Correct)
```html
<input type="image" src="submit.png" alt="Submit order">
```

## Example (Incorrect)
```html
<input type="image" src="submit.png">
<!-- Missing alt, aria-label, or aria-labelledby -->
```

## Error Handling
- If no accessible name is found, flag as a violation.
- If `aria-labelledby` references a missing or hidden element, flag as a violation.

## Limitations
- Only applies to `<input type="image">` elements.
- Does not check `<button>` or `<img>` elements.

## Usage
This agent scans frontend code for `<input type="image">` elements and ensures they have accessible alternate text as described above.
