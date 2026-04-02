# SiteSmith

**Controllable Creativity + Executable Pipeline for Personal Website Generation**

> "Not just another website builder — SiteSmith turns the design thinking process into a structured DSL, reusable skills, and interactive human-in-the-loop workflows."

SiteSmith is a Claude Code-powered agent system that helps you build personal websites **like collaborating with a designer**: AI proposes directions, explains trade-offs, and you make decisions at every critical checkpoint. All design decisions are captured in a **7-dimension Design DSL** that compiles deterministically to CSS — style refinements are DSL diffs, never regeneration.

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
Design DSL (7-dimension structured representation)
   ├── style / layout / density / typography / color / interaction / motion
   ├── 8 presets: minimal, modern, creative, editorial, product, cyberpunk, portfolio, warm
   ├── 5 GitHub Pages archetypes: academic, developer, project, writing, hybrid
   └── DSL Compiler          → /translate-design-to-code
   ↓
Skill Router (/website-pipeline)
   ↓
Execution Layer (component / page / style generation)
```

## Key Innovations

### 1. Design DSL — A Structured Language for Design Decisions

Every website inspiration can be decomposed into 7 dimensions:

| Dimension | Meaning | Examples |
|-----------|---------|---------|
| `style` | Overall aesthetic | minimal / creative / editorial |
| `layout` | Page structure | grid / single-column / asymmetric |
| `density` | Information density | low / medium / high |
| `typography` | Type strategy | font pairing, scale, weight |
| `color` | Color strategy | monochrome / vibrant / soft / dark |
| `interaction` | Interaction intensity | hover / click / scroll behaviors |
| `motion` | Animation type | none / subtle-fade / scroll-driven |

```json
{
  "style": "minimal",
  "layout": { "type": "single-column", "max_width": "720px" },
  "density": "low",
  "typography": { "font_pairing": ["Inter", "Inter"], "scale": "1.25" },
  "color": { "mode": "monochrome", "accent": "#007aff" },
  "interaction": { "level": "low", "hover": "opacity" },
  "motion": { "type": "subtle-fade", "duration": "200ms" },
  "personality": "clean, calm, premium"
}
```

When you say *"too flashy, make it simpler"*, SiteSmith computes a **DSL diff**:

```diff
- "color": { "mode": "vibrant" }
+ "color": { "mode": "monochrome" }
- "interaction": { "level": "high" }
+ "interaction": { "level": "low" }
```

Then compiles the diff to CSS variable changes — the entire site updates automatically.

### 2. Human-in-the-Loop as First-Class Citizen

Three types of gates woven into the pipeline:

| Gate | When | Purpose |
|------|------|---------|
| **Design Approval** | Before code generation | Confirm DSL parameters, prevent AI "self-indulgent designing" |
| **Style Editing Loop** | Anytime during build | Natural language → DSL diff → CSS diff → incremental update |
| **Preview → Feedback → Patch** | After each page | Local diff fix, never full regeneration |

### 3. Design Intelligence Engine

Five advisor skills that mimic how a real designer thinks:
- **`/suggest-style`** — Recommends DSL presets with trade-off tables
- **`/analyze-layout`** — "No visual anchor in your hero section"
- **`/suggest-interaction`** — Button hover easing, scroll reveal timing, transition "damping feel"
- **`/critique-design`** — 7-dimension scored review like a senior designer
- **`/enforce-design-consistency`** — Scans for hardcoded values bypassing design tokens

### 4. GitHub Pages First-Class Support

5 built-in **archetypes** designed specifically for `username.github.io`:

| Archetype | For | Style |
|-----------|-----|-------|
| **Academic Profile** | Professors, PhD students, researchers | Minimal, serif, no motion, credibility-first |
| **Developer Portfolio** | Software/AI engineers | Modern, grid, dark mode, shadow-lift |
| **Project Showcase** | Open source projects, competitions | Product, storytelling, strong CTA |
| **Writing Site** | Tech blogs, research notes | Editorial, reading-column, Jekyll-native |
| **Hybrid Brand** | Job seekers, multi-faceted profiles | Modern, modular, person > projects |

```bash
/classify-github-pages-archetype    # AI asks: "Is this about who you are, or what you've built?"
/recommend-pages-publishing-mode    # Branch publish vs Actions vs Jekyll
/generate-pages-workflow            # Actions workflow + .nojekyll + CNAME
```

### 5. Design Memory

The system accumulates preferences across sessions:
```json
{
  "confirmed_choices": ["amber primary", "Playfair Display headings"],
  "rejected_patterns": ["heavy gradients", "neon colors", "parallax"],
  "style_refinements": [{"input": "warmer", "result": "approved"}]
}
```

---

## 33 Skills in 9 Categories

| Category | Count | Skills |
|----------|-------|--------|
| **Intent Layer** | 3 | `capture-design-intent`, `refine-design-intent`, `website-pipeline` |
| **Design Intelligence** | 5 | `suggest-style`, `analyze-layout`, `suggest-interaction`, `critique-design`, `enforce-design-consistency` |
| **DSL Layer** | 3 | `translate-design-to-code`, `refine-design-dsl`, `critique-design-dsl` |
| **Planning** | 2 | `plan-website-structure`, `generate-design-system` |
| **Execution** | 7 | `project-scaffold`, `generate-page`, `generate-component`, `generate-navbar`, `generate-hero`, `generate-footer`, `apply-responsive-design` |
| **Refinement** | 3 | `refine-design-style`, `patch-component`, `refactor-layout` |
| **Content** | 4 | `write-copy`, `generate-bio`, `curate-portfolio`, `setup-blog` |
| **Quality & Deploy** | 5 | `accessibility-audit`, `performance-check`, `seo-optimizer`, `deploy-setup`, `pre-launch-checklist` |
| **GitHub Pages** | 5 | `classify-github-pages-archetype`, `recommend-pages-publishing-mode`, `generate-pages-workflow`, `generate-404-page`, `generate-cname-config` |

Each skill follows the [ARIS](https://github.com/wanshuiyin/Auto-claude-code-research-in-sleep) skill format.

---

## Quick Start

```bash
# Full guided pipeline
/website-pipeline

# GitHub Pages mode
/classify-github-pages-archetype
/website-pipeline

# Step by step
/capture-design-intent "I want a minimal portfolio site"
/critique-design-dsl              # Validate DSL before compile
/translate-design-to-code         # DSL → CSS variables
/project-scaffold
/generate-page "index"

# Refine anytime (DSL diff, not regeneration)
/refine-design-dsl "warmer, more friendly"
/patch-component "hero" "make the CTA more prominent"
/critique-design "all"
```

---

## Pipeline Flow

```
/classify-github-pages-archetype (optional)
        │
/capture-design-intent → Design DSL JSON
        │
/critique-design-dsl → validate
        │
   🚦 HITL-1: Design Approval Gate (confirm DSL parameters)
        │
/translate-design-to-code → CSS variables
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
   └── 🚦 HITL-3: Page Review
        │    ├── /refine-design-dsl "more warm" → DSL diff → CSS diff
        │    ├── /patch-component → local fix
        │    └── /refactor-layout → restructure
        │
/write-copy + /generate-bio + /curate-portfolio
        │
   🚦 HITL-4: Content Review
        │
Quality: /accessibility-audit + /performance-check + /seo-optimizer
        │
   🚦 HITL-5: Quality Review
        │
/generate-pages-workflow → /deploy-setup
        │
   🎉 Live at username.github.io!
```

---

## Data Flow

```
Natural Language → Design DSL JSON → CSS Variables → HTML/Components
     ↑                  ↑                 ↑
  "warmer"      /refine-design-dsl  /translate-design-to-code
                (DSL parameter diff)  (deterministic compile)
```

---

## Project Structure

```
SiteSmith/
├── CLAUDE.md                              # Project dashboard + skill index
├── .claude/settings.local.json            # Tool permissions
│
├── .designurpage/
│   ├── dsl/                               # Design DSL specification
│   │   ├── schema.md                      # Full schema + validation rules
│   │   ├── presets.md                     # 8 style presets with complete DSL
│   │   ├── archetypes.md                  # 5 GitHub Pages archetypes
│   │   └── code-mapping.md               # DSL → CSS/HTML/JS mapping rules
│   │
│   └── skills/                            # 33 skills (ARIS format)
│       ├── shared-references/             # Design knowledge base
│       ├── capture-design-intent/         # Intent Layer
│       ├── suggest-style/                 # Design Intelligence
│       ├── translate-design-to-code/      # DSL Compiler
│       ├── classify-github-pages-archetype/ # GitHub Pages
│       └── ...
│
├── templates/                             # Page & component templates
├── deploy/                                # Deployment templates
│   ├── pages-actions/deploy.yml           # GitHub Actions workflow
│   └── pages-branch/SETUP.md             # Branch publish guide
├── docs/                                  # Documentation
├── examples/                              # Example sites
└── eval/                                  # Evaluation framework
```

---

## Design Principles

1. **DSL-driven** — All design decisions are 7-dimension DSL parameters, deterministically compiled to code
2. **Diff, not regenerate** — Style changes = DSL diff → CSS variable diff → entire site auto-updates
3. **Structured intent** — "Like Apple but more playful" → specific DSL parameter changes, not vague prompts
4. **Proactive suggestions** — AI proposes directions with trade-offs, users decide
5. **Design Memory** — Accumulated preferences (confirmed + rejected) across sessions
6. **GitHub Pages native** — 5 archetypes with deployment-aware design decisions

---

## Acknowledgments

- Skill architecture inspired by [ARIS (Auto-claude-code-research-in-sleep)](https://github.com/wanshuiyin/Auto-claude-code-research-in-sleep)
- Built on [Claude Code](https://docs.anthropic.com/en/docs/claude-code) by Anthropic

---

## License

MIT
