---
name: axe_compliance
version: 1.0.0
type: knowledge
agent: CodeActAgent
triggers:
  - axe compliance
  - accessibility rules
  - wcag
  - static accessibility audit
  - axe rules
---

# Axe Accessibility Compliance Microagent

## Purpose
This agent autonomously ensures codebase compliance with the [axe-core 4.7 accessibility rules](https://dequeuniversity.com/rules/axe/4.7). It fetches the latest rules, analyzes the repository for violations, and independently applies fixes. It makes a very deep search of all accessibility rules.

## Capabilities
- Fetches and parses all accessibility rules from the axe-core 4.7 documentation
- Performs static analysis of the entire repository for code that may violate these rules
- Applies fixes directly to the codebase without user confirmation
- Operates at scale, handling large codebases and many violations
- Does not require or request user approval for any changes

## Usage
- Trigger with: "axe compliance", "accessibility rules", "wcag", "static accessibility audit", "axe rules"
- The agent will:
  1. Fetch and parse all rules from https://dequeuniversity.com/rules/axe/4.7 with a very deep research, use fetch until you find all information.
  2. Analyze all code in the repository for possible violations
  3. Apply full fixes directly to the codebase without user confirmation. If fixes require more steps, do them without confirmation.
  4. Commit changes with descriptive messages

## Limitations
- Static analysis may not catch all runtime or dynamic accessibility issues
- Some fixes may require developer review for context-specific solutions
- Large-scale changes may impact code style or structure

## Example
User: "Run axe compliance audit and fix all violations."
Agent: (Fetches rules, audits code, applies fixes, commits changes)

## Error Handling
- If a rule cannot be statically checked, the agent will skip it
- If a fix cannot be applied automatically, the agent will log the issue and continue

## Environment
- No special credentials required
- Internet access required to fetch rules
