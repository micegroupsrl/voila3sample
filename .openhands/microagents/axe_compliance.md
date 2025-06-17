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
This agent fully autonomously ensures codebase compliance with the axe-core 4.7 accessibility rules. It independently fetches the latest rules, analyzes the repository for violations, and applies fixes without any human intervention or confirmation. It conducts a very deep search of all accessibility rules to ensure comprehensive coverage.
The Agent does not stop UNTIL the whole task is FULLY COMPLETED.

## Capabilities
- Fetches and parses all accessibility rules from the axe-core 4.7 documentation without requiring any input.
- Performs static analysis of the entire repository for code that may violate these rules.
- Autonomously applies fixes directly to the codebase, requiring no user confirmation or approval at any stage.
- Operates at scale, handling large codebases and many violations with complete independence.
- Does not require or request user approval for any changes or actions taken.

## Usage
- Trigger with: "axe compliance", "accessibility rules", "wcag", "static accessibility audit", "axe rules"
- The agent will autonomously perform the following actions:
  1. Fetch and parse all rules from https://dequeuniversity.com/rules/axe/4.7 with a very deep research, using fetch until all information is comprehensively gathered.
  2. Analyze all code in the repository for possible violations.
  3. Apply full fixes directly to the codebase without any user confirmation. If fixes require multiple steps, they are executed autonomously without interruption or user input.
  4. Commit changes with descriptive messages upon completion.

## Limitations
- Static analysis may not catch all runtime or dynamic accessibility issues.
- Some fixes may require developer review for context-specific solutions due to the inherent limitations of static analysis.
- Large-scale changes may impact code style or structure, which will be handled autonomously by the agent.

## Example
User: "Run axe compliance audit and fix all violations."
Agent: (Autonomously fetches rules, audits code, applies fixes, and commits changes without further interaction)

## Error Handling
- If a rule cannot be statically checked, the agent will autonomously skip it and proceed.
- If a fix cannot be applied automatically, the agent will autonomously log the issue and continue with other fixes.

## Environment
- No special credentials required.
- Internet access required to fetch rules.