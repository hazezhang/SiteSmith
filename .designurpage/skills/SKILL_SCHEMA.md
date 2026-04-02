# Skill Schema Specification v1.0

> Formal contract for every SiteSmith skill: machine-verifiable inputs, outputs, constraints, and routing.

## Purpose

Every skill in SiteSmith follows a dual representation:

1. **SKILL.md** (human-readable) -- the existing Markdown file with workflow instructions, examples, and design rationale.
2. **Contract JSON** (machine-readable) -- a `.contract.json` file in `contracts/` that declares the skill's formal input/output schema, preconditions, postconditions, and routing metadata.

The contract enables:
- **Automated validation**: check that a skill produced the files it promised with the required content.
- **Skill routing**: the pipeline (`/website-pipeline`) can match user intent to the correct skill via `routing.triggers`.
- **Dependency resolution**: `routing.prev` / `routing.next` define the DAG of skill execution.
- **Regression testing**: `postconditions` are directly translatable into test assertions.

---

## SKILL.md Front-Matter (Extended)

Every `SKILL.md` already has YAML front-matter. The extended format adds optional machine-verifiable fields:

```yaml
---
# === Identity (existing) ===
name: skill-name
version: "1.0"
description: "Bilingual description (Chinese + English)"
argument-hint: [args]
allowed-tools: Tool1, Tool2

# === Machine-Verifiable Contract (new) ===
input_schema:
  required_files:
    - name: "DESIGN_INTENT.md"
      contains: "Design DSL JSON block"
  required_args: []
  optional_args:
    - name: "style"
      type: "StyleName"
      default: null

output_schema:
  files:
    - path: "src/styles/variables.css"
      format: "css"
      must_contain: [":root", "--color-primary"]
  state_updates:
    - file: "BUILD_LOG.md"
      action: "append"

constraints:
  - "Deterministic: same DSL input -> same CSS output"
  - "All values via CSS custom properties, no hardcoding"

preconditions:
  - "DESIGN_INTENT.md exists and contains valid DSL JSON"

postconditions:
  - "All CSS variables from DSL are present in variables.css"
  - "Output passes WCAG AA contrast check"

routing:
  when_to_use:
    - "After /capture-design-intent or /refine-design-dsl"
    - "When user says 'compile', 'generate CSS', 'build styles'"
  when_not_to_use:
    - "Before design intent is captured"
    - "When user wants to modify existing styles (use /refine-design-style)"
  next_skills:
    - "/project-scaffold"
    - "/generate-design-system"
  prev_skills:
    - "/capture-design-intent"
    - "/refine-design-dsl"
---
```

The full contract lives in `contracts/<skill-name>.contract.json`. The YAML front-matter can reference it or inline a subset.

---

## Contract JSON Schema — Field Reference

Each `.contract.json` file follows this structure:

### `name` (string, required)

The skill identifier. Must match the directory name under `.designurpage/skills/`.

```json
"name": "translate-design-to-code"
```

### `version` (string, required)

Semantic version of the contract. Bump when inputs/outputs change.

```json
"version": "1.0"
```

---

### `input_schema` (object, required)

Declares everything the skill needs before it can run.

#### `input_schema.required_files` (array)

Files that **must exist** for the skill to execute.

| Field | Type | Description |
|-------|------|-------------|
| `path` | string | File path relative to project root. Supports glob (`src/*.html`). |
| `must_contain` | string[] | Substrings that must be present in the file content. |
| `purpose` | string | Human-readable explanation of why this file is needed. |
| `type` | string | Optional: `"file"` (default) or `"directory"`. |

```json
"required_files": [
  { "path": "DESIGN_INTENT.md", "must_contain": ["\"style\":"], "purpose": "DSL source" }
]
```

#### `input_schema.optional_files` (array)

Files that enhance the skill's output but are not required.

```json
"optional_files": [
  { "path": "DESIGN_MEMORY.json", "purpose": "historical preferences" }
]
```

#### `input_schema.arguments` (object)

The `$ARGUMENTS` passed when invoking the skill.

| Field | Type | Description |
|-------|------|-------------|
| `type` | string | `"string"`, `"enum"`, `"json"` |
| `values` | string[] | Only for `type: "enum"` -- allowed values. |
| `description` | string | What the argument represents. |
| `required` | boolean | Whether the skill fails without it. |
| `default` | any | Default value if not provided. |

```json
"arguments": {
  "type": "string",
  "description": "Page name (e.g., 'index', 'about')",
  "required": true
}
```

---

### `output_schema` (object, required)

Declares what the skill produces. This is the **verification target**.

#### `output_schema.files` (array)

Files created or modified by the skill.

| Field | Type | Description |
|-------|------|-------------|
| `path` | string | Output file path. Supports `{arg}` interpolation (e.g., `src/{page_name}.html`). |
| `format` | string | `"html"`, `"css"`, `"javascript"`, `"json"`, `"markdown"` |
| `action` | string | `"create"` (default), `"update"`, `"append"` |
| `must_contain` | string[] | Substrings that must appear in the output. |
| `must_not_contain` | string[] | Substrings that must NOT appear (anti-patterns). |

```json
"files": [
  {
    "path": "src/styles/variables.css",
    "format": "css",
    "must_contain": [":root", "--color-primary"],
    "must_not_contain": ["!important"]
  }
]
```

#### `output_schema.state_updates` (array)

Side effects on shared state files.

| Field | Type | Description |
|-------|------|-------------|
| `file` | string | State file path. |
| `action` | string | `"create"`, `"update"`, `"append"`, `"merge"` |
| `condition` | string | Optional: `"if_exists"`, `"always"` |

```json
"state_updates": [
  { "file": "BUILD_LOG.md", "action": "append" }
]
```

#### `output_schema.report` (object, optional)

For skills that produce analysis/critique output (not files).

| Field | Type | Description |
|-------|------|-------------|
| `format` | string | `"markdown"`, `"json"` |
| `structure` | object | Expected shape of the report. |

---

### `constraints` (string[], required)

Invariants that the skill must maintain during execution. These are rules the skill follows, not things that can be mechanically checked post-hoc.

```json
"constraints": [
  "Deterministic: same DSL input -> identical CSS output",
  "All values via CSS custom properties -- zero hardcoded colors/sizes",
  "Maximum 5 conversation rounds"
]
```

---

### `preconditions` (string[], required)

Conditions that must be true **before** the skill runs. The pipeline checks these before dispatching.

```json
"preconditions": [
  "DESIGN_INTENT.md exists with valid DSL JSON block"
]
```

If a precondition fails, the pipeline should suggest the skill that produces the missing artifact (via `routing.prev`).

---

### `postconditions` (string[], required)

Conditions that must be true **after** the skill completes. These are the basis for automated evaluation.

```json
"postconditions": [
  "variables.css contains all DSL dimension variables",
  "Color contrast meets WCAG AA (4.5:1 for text)",
  "Font import URL is valid Google Fonts URL"
]
```

**Postconditions map directly to test assertions.** A verification harness can:
1. Check `output_schema.files[].must_contain` substrings.
2. Run `postconditions` as higher-level semantic checks.

---

### `routing` (object, required)

Metadata for the skill router and pipeline orchestrator.

#### `routing.triggers` (string[])

Natural language phrases that should activate this skill.

```json
"triggers": ["compile", "generate CSS", "build styles", "translate to code"]
```

#### `routing.next` (string[])

Skills that typically follow this one.

#### `routing.prev` (string[])

Skills that typically precede this one (and produce its required inputs).

#### `routing.conflicts_with` (string[])

Skills that should NOT run concurrently or in sequence with this one.

---

## Validation Rules

A contract is **valid** if:

1. `name` matches the skill directory name.
2. `input_schema` and `output_schema` are both present.
3. Every file in `required_files` has a `path`.
4. Every file in `output_schema.files` has a `path` and `format`.
5. `preconditions` and `postconditions` are non-empty arrays.
6. `routing.triggers` is a non-empty array.
7. Every skill in `routing.next` and `routing.prev` exists in the skills directory.

## How the Pipeline Uses Contracts

```
User says "generate CSS for my design"
  |
  v
Router: match "generate CSS" against all routing.triggers
  -> hits translate-design-to-code
  |
  v
Precondition check: DESIGN_INTENT.md exists? has "style"?
  -> FAIL: suggest /capture-design-intent (from routing.prev)
  -> PASS: execute skill
  |
  v
Postcondition check: variables.css has :root? has --color-primary?
  -> FAIL: report which postcondition failed
  -> PASS: suggest routing.next skills
```

## File Organization

```
.designurpage/skills/
  SKILL_SCHEMA.md              <- this file (specification)
  contracts/
    README.md                  <- overview + how to read contracts
    capture-design-intent.contract.json
    translate-design-to-code.contract.json
    generate-page.contract.json
    critique-design.contract.json
    refine-design-dsl.contract.json
    manage-assets.contract.json
    ...
  capture-design-intent/
    SKILL.md                   <- existing workflow instructions
  translate-design-to-code/
    SKILL.md
  ...
```
