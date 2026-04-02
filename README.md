# SiteSmith

**Controllable Creativity + Executable Pipeline for Personal Website Generation**

> "Not just another website builder — SiteSmith turns the design thinking process into structured, reusable, interactive skills."

SiteSmith is a Claude Code-powered agent system that helps you build personal websites **like collaborating with a designer**: AI proposes directions, explains trade-offs, and you make decisions at every critical checkpoint. Style refinements are incremental CSS diffs — never regenerating the entire site.

---

## Architecture

```
User (Human-in-the-loop)
   ↓
Design Conversation Layer
   ↓
Design Intelligence Engine
   ├── Style Advisor         — proactive style recommendations + trade-off analysis
   ├── Layout Advisor        — visual hierarchy, anchor points, spatial analysis
   ├── Interaction Advisor   — micro-interactions, "damping feel" tuning
   ├── Design Critic         — 7-dimension scoring like a senior designer
   └── Consistency Guard     — design system compliance scanner + auto-fix
   ↓
Skill Router (/website-pipeline)
   ↓
Execution Layer (component / page / style generation)
```

## Key Innovations

### 1. Skill-Based Website Generation
Every capability is a self-contained skill with explicit inputs, outputs, HITL checkpoints, and composition rules — far more controllable than a monolithic agent.

### 2. Human-in-the-Loop as First-Class Citizen
Three types of gates are woven into the pipeline — not bolted on as an afterthought:

| Gate | When | Purpose |
|------|------|---------|
| **Design Approval** | Before code generation | Prevent AI from "self-indulgent designing" |
| **Style Editing Loop** | Anytime during build | Natural language → CSS variable diff → incremental update |
| **Preview → Feedback → Patch** | After each page | Local diff fix, never full regeneration |

### 3. Incremental Style Refinement via CSS Variable Diff
When you say *"warmer"*, SiteSmith doesn't regenerate. It:
1. Maps your feedback to specific design tokens via a style vocabulary
2. Computes a minimal CSS Custom Properties diff
3. Updates `variables.css` — the entire site updates automatically via CSS cascade

### 4. Design Intelligence Engine
Five advisor skills that mimic how a real designer thinks:
- **`/suggest-style`** — "Your content fits minimal editorial better than cyberpunk" + trade-off table
- **`/analyze-layout`** — "No visual anchor in your hero section, consider adding one"
- **`/suggest-interaction`** — Button hover easing, scroll reveal timing, transition damping
- **`/critique-design`** — Scored review across visual hierarchy, color, typography, spacing, consistency, responsiveness, and polish
- **`/enforce-design-consistency`** — Scans for hardcoded values that bypass design tokens

### 5. Design Memory
The system remembers your preferences across sessions:
```json
{
  "confirmed_choices": ["amber primary", "Playfair Display headings"],
  "rejected_patterns": ["heavy gradients", "neon colors", "parallax"],
  "style_refinements": [{"input": "warmer", "result": "approved"}]
}
```
Next time, it starts with *"I remember you prefer warm, minimal styles..."*

---

## 25 Skills in 7 Categories

| Category | Count | Skills |
|----------|-------|--------|
| **Intent Layer** | 3 | `capture-design-intent`, `refine-design-intent`, `website-pipeline` |
| **Design Intelligence** | 5 | `suggest-style`, `analyze-layout`, `suggest-interaction`, `critique-design`, `enforce-design-consistency` |
| **Planning** | 2 | `plan-website-structure`, `generate-design-system` |
| **Execution** | 7 | `project-scaffold`, `generate-page`, `generate-component`, `generate-navbar`, `generate-hero`, `generate-footer`, `apply-responsive-design` |
| **Refinement** | 3 | `refine-design-style`, `patch-component`, `refactor-layout` |
| **Content** | 4 | `write-copy`, `generate-bio`, `curate-portfolio`, `setup-blog` |
| **Quality & Deploy** | 5 | `accessibility-audit`, `performance-check`, `seo-optimizer`, `deploy-setup`, `pre-launch-checklist` |

Each skill follows the [ARIS](https://github.com/wanshuiyin/Auto-claude-code-research-in-sleep) skill format: YAML frontmatter (`name`, `description`, `argument-hint`, `allowed-tools`) + structured Markdown body with workflow phases, checkpoints, key rules, and composition hints.

---

## Quick Start

### Prerequisites
- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) (CLI, Desktop App, or IDE extension)
- A browser (for preview)
- Node.js (optional, if choosing Tailwind/React stack)

### Usage

Open Claude Code in the project directory, then:

```bash
# Option 1: Full guided pipeline (recommended for first-time users)
/website-pipeline

# Option 2: Step by step
/capture-design-intent "I want a minimal portfolio site"
/suggest-style "portfolio"
/plan-website-structure
/generate-design-system
/project-scaffold
/generate-page "index"

# Refine anytime
/refine-design-style "warmer, more friendly"
/patch-component "hero" "make the CTA more prominent"
/critique-design "all"
```

---

## Pipeline Flow

```
/capture-design-intent
        │
   🚦 HITL-1: Design Approval Gate
        │
/plan-website-structure + /generate-design-system
        │
   🚦 HITL-2: Structure & Style Confirmation
        │
/project-scaffold → /generate-navbar → /generate-footer
        │
   For each page:
   ├── /generate-page "page-name"
   ├── Preview screenshot (desktop + mobile)
   └── 🚦 HITL-3: Page Review → /patch-component or /refine-design-style
        │
/write-copy + /generate-bio + /curate-portfolio
        │
   🚦 HITL-4: Content Review
        │
/accessibility-audit + /performance-check + /seo-optimizer
        │
   🚦 HITL-5: Quality Review
        │
/pre-launch-checklist → /deploy-setup
        │
   🎉 Your website is live!
```

---

## State Files

Skills communicate through Markdown state files in the project root:

| File | Created by | Purpose |
|------|-----------|---------|
| `DESIGN_INTENT.md` | `capture-design-intent` | Structured design intent (style, colors, layout, inspiration) |
| `SITE_BLUEPRINT.md` | `plan-website-structure` | Site map + component plan |
| `DESIGN_SYSTEM.md` | `generate-design-system` | Typography, spacing, colors, shadows as CSS variables |
| `BUILD_LOG.md` | All generation skills | Build progress and completed components |
| `DESIGN_MEMORY.json` | System (accumulated) | User style preferences across sessions |

---

## Project Structure

```
SiteSmith/
├── CLAUDE.md                              # Project dashboard + skill index
├── .claude/settings.local.json            # Tool permissions
├── .designurpage/skills/                  # 25 skills (ARIS format)
│   ├── shared-references/                 # Design knowledge base
│   │   ├── design-principles.md           # Visual design principles
│   │   ├── web-best-practices.md          # Web development standards
│   │   └── style-vocabulary.md            # Style words → CSS mapping
│   ├── capture-design-intent/SKILL.md
│   ├── suggest-style/SKILL.md
│   ├── ... (25 skill directories)
│   └── website-pipeline/SKILL.md
├── templates/                             # Page & component templates
│   └── design-system/DESIGN_SYSTEM_TEMPLATE.md
├── tools/                                 # Utility scripts
├── docs/                                  # Documentation
│   ├── GETTING_STARTED.md
│   ├── WORKFLOW_GUIDE.md
│   ├── SKILL_REFERENCE.md
│   └── DESIGN_MEMORY_SPEC.md
├── examples/                              # Example sites
└── eval/                                  # Evaluation framework
```

---

## Design Principles

1. **Diff, not regenerate** — Style tweaks and component fixes are always incremental updates via CSS variable cascade
2. **Structured intent** — Vague expressions ("like Apple but more playful") are translated into structured specs via a style vocabulary
3. **Proactive suggestions > passive questions** — AI proposes directions with trade-offs, users decide
4. **Design Memory** — The system accumulates confirmed preferences and rejected patterns across sessions
5. **Every component is independent** — Decoupled, individually testable, replaceable, patchable

---

## Acknowledgments

- Skill architecture inspired by [ARIS (Auto-claude-code-research-in-sleep)](https://github.com/wanshuiyin/Auto-claude-code-research-in-sleep)
- Built on [Claude Code](https://docs.anthropic.com/en/docs/claude-code) by Anthropic

---

## License

MIT
