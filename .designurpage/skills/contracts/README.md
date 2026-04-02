# Skill Contracts

> Machine-verifiable input/output schemas for every SiteSmith skill.

## What Are Contracts?

A **contract** is a JSON file that formally declares what a skill needs (inputs), what it produces (outputs), and what guarantees it makes (postconditions). While `SKILL.md` tells an agent *how* to execute a skill, the contract tells the system *what to expect* -- enabling automated validation, routing, and testing.

## Why Contracts Matter

### 1. Skill Routing

The pipeline reads `routing.triggers` from every contract to match natural language input to the correct skill. When a user says "generate CSS for my design", the router scans all contracts and finds `translate-design-to-code` because its triggers include "generate CSS".

### 2. Dependency Resolution

`routing.prev` and `routing.next` define a directed graph of skill execution. When a precondition fails (e.g., "DESIGN_INTENT.md does not exist"), the system can look at `routing.prev` to suggest the skill that produces the missing file.

### 3. Automated Evaluation

Postconditions are test assertions. A verification harness can:

```
for each postcondition in contract.postconditions:
    assert postcondition holds for the generated output
```

Combined with `output_schema.files[].must_contain` and `must_not_contain`, this enables fully automated quality checks after every skill execution.

### 4. Scaling to More Skills

As SiteSmith grows beyond 33 skills, contracts prevent integration chaos. New skills declare their dependencies explicitly, and the system can validate that no two skills claim to produce the same file with conflicting content.

## How to Read a Contract

Every `.contract.json` has this structure:

```
{
  "name":           skill identifier (matches directory name)
  "version":        semantic version of the contract

  "input_schema": {
    "required_files":  files that MUST exist before the skill runs
    "optional_files":  files that enhance output but aren't required
    "arguments":       the $ARGUMENTS parameter spec
  }

  "output_schema": {
    "files":           files created/modified, with content assertions
    "state_updates":   side effects on shared state files (BUILD_LOG, etc.)
    "report":          (optional) structured output for analysis skills
  }

  "constraints":     invariants maintained during execution
  "preconditions":   what must be true BEFORE running
  "postconditions":  what must be true AFTER running

  "routing": {
    "triggers":        natural language phrases that activate this skill
    "next":            skills that typically follow
    "prev":            skills that typically precede
    "conflicts_with":  skills that conflict
  }
}
```

## How Contracts Enable Automated Evaluation

Each postcondition maps to a testable assertion:

| Postcondition | Test Strategy |
|---------------|---------------|
| "DESIGN_INTENT.md exists" | File existence check |
| "Embedded DSL JSON passes validate()" | JSON schema validation |
| "All 7 required DSL dimensions are present" | Parse JSON, check keys |
| "variables.css contains all DSL dimension variables" | Substring search |
| "Color contrast meets WCAG AA" | Computed style analysis |
| "No hardcoded color/font values in HTML" | Regex scan for `style="color:` etc. |
| "All img tags have alt attributes" | HTML parser check |

The `must_contain` and `must_not_contain` arrays in `output_schema.files` provide the simplest level of verification -- substring matching. Postconditions provide higher-level semantic checks that may require parsing or computation.

## Contract Index

| Contract | Skill | Layer |
|----------|-------|-------|
| `capture-design-intent.contract.json` | /capture-design-intent | Intent |
| `translate-design-to-code.contract.json` | /translate-design-to-code | DSL Compilation |
| `generate-page.contract.json` | /generate-page | Execution |
| `critique-design.contract.json` | /critique-design | Design Intelligence |
| `refine-design-dsl.contract.json` | /refine-design-dsl | DSL Layer |
| `manage-assets.contract.json` | /manage-assets | Execution |

## Full Specification

See `../SKILL_SCHEMA.md` for the complete field reference and validation rules.
