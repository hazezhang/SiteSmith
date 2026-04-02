# SiteSmith Evaluation Framework

> Research-grade evaluation system for automated website generation quality.
> Inspired by SimulMT's LQ/EXP/LAT multi-dimensional metric design: each dimension is independently measurable, jointly informative, and maps to both automated computation and human annotation.

## Overview

SiteSmith evaluation operates on four orthogonal axes:

| Axis | Abbreviation | Nature | Range |
|------|-------------|--------|-------|
| **Design Quality Score** | DQS | Automated, intrinsic quality | 0-100 |
| **Intent Fidelity Score** | IFS | Automated, extrinsic compliance | 0-100 |
| **Diversity Score** | DS | Automated, cross-preset variation | 0-1 |
| **User Satisfaction Proxy** | USP | Human-in-the-loop, behavioral | 0-1 |

All automated metrics are computed from generated HTML + CSS + the input Design DSL, with zero external dependencies. Human metrics are collected at HITL checkpoints.

---

## 1. Design Quality Score (DQS) --- Automated Intrinsic Quality (0-100)

DQS measures the inherent design quality of generated output, independent of user intent. It decomposes into 7 sub-dimensions, each with explicit computation rules.

### 1.1 Sub-dimension Definitions

| # | Metric | Abbr | Weight | What it measures |
|---|--------|------|--------|-----------------|
| 1 | **Hierarchy Clarity** | HC | 20% | Visual hierarchy depth, heading structure, focal point presence |
| 2 | **Color Harmony** | CH | 15% | Palette coherence, WCAG contrast compliance, hue distribution |
| 3 | **Typography Quality** | TQ | 15% | Readability, typographic scale consistency, vertical rhythm |
| 4 | **Layout Precision** | LP | 20% | Alignment consistency, spacing token adherence, grid compliance |
| 5 | **Interaction Polish** | IP | 10% | Hover/focus/active state completeness, transition coverage |
| 6 | **Responsiveness** | RS | 10% | Breakpoint coverage, overflow safety, touch target sizing |
| 7 | **Consistency** | CS | 10% | Design token usage vs hardcoded values, cross-component uniformity |

**Formula:**

```
DQS = 0.20 * HC + 0.15 * CH + 0.15 * TQ + 0.20 * LP + 0.10 * IP + 0.10 * RS + 0.10 * CS
```

### 1.2 Computation Rules

#### HC --- Hierarchy Clarity (0-100)

| Check | Points | Method |
|-------|--------|--------|
| H1 exists and is unique | 20 | Count `<h1>` elements; exactly 1 = full points |
| Heading level sequence is monotonic | 20 | No skipped levels (h1 -> h3 without h2 = violation) |
| Heading size ratios follow type scale | 20 | Compare computed h1/h2/h3/h4 sizes against DSL `typography.scale` ratio |
| Focal point exists | 20 | At least one element with significantly larger font-size or distinct visual weight |
| Heading count is reasonable (3-8 for single page) | 20 | Deduct points for <3 or >15 headings |

#### CH --- Color Harmony (0-100)

| Check | Points | Method |
|-------|--------|--------|
| Text/background contrast >= 4.5:1 (WCAG AA) | 30 | Compute relative luminance ratio for `color-text` vs `color-background` |
| Large text contrast >= 3:1 (WCAG AA) | 10 | Headings against background |
| Accent vs background contrast >= 3:1 | 10 | Accent color usability |
| Hue angle spread appropriate for color mode | 20 | Monochrome: spread < 30deg; Vibrant: spread > 60deg; Soft: spread 30-90deg |
| No clashing complementary without buffer | 15 | Adjacent hues should differ by > 15deg or be intentionally complementary |
| DSL color mode compliance | 15 | Dark mode -> background lightness < 0.15; Soft -> saturation < 0.5 |

#### TQ --- Typography Quality (0-100)

| Check | Points | Method |
|-------|--------|--------|
| Body line length 45-75 characters | 25 | Parse `max-width` / `paragraph_width`; 65ch is optimal center |
| Type scale adherence | 25 | All heading sizes should follow geometric ratio from DSL `scale` |
| Line height in readable range (1.4-1.8 for body) | 20 | Extract `--leading-normal` CSS variable |
| Font pairing quality | 15 | Serif+Sans = good contrast; Same family = neutral; Random = poor |
| Base font size >= 16px | 15 | Accessibility minimum |

#### LP --- Layout Precision (0-100)

| Check | Points | Method |
|-------|--------|--------|
| All spacing values use design tokens (var()) | 30 | Count `var(--space-*)` vs hardcoded px/rem in margin/padding |
| Container max-width matches DSL | 20 | Extract max-width from CSS, compare to `layout.max_width` |
| Grid column count matches DSL | 20 | Extract `grid-template-columns`, compare to `layout.columns` |
| Consistent alignment | 15 | Text-align values should match DSL `layout.alignment` |
| Section spacing uses token | 15 | `section` padding uses `var(--section-gap)` |

#### IP --- Interaction Polish (0-100)

| Check | Points | Method |
|-------|--------|--------|
| Interactive elements have `:hover` rules | 30 | Count hover rules for `a`, `.btn`, `.card` |
| `:focus-visible` coverage | 30 | All interactive elements should have focus styles |
| Transitions are smooth (duration > 0) | 20 | Count `transition:` declarations with non-zero duration |
| `:active` state exists for buttons | 20 | `.btn:active` or equivalent rules present |

#### RS --- Responsiveness (0-100)

| Check | Points | Method |
|-------|--------|--------|
| At least 2 breakpoints defined | 25 | Count `@media` queries with `max-width` or `min-width` |
| Mobile breakpoint <= 480px exists | 25 | At least one query targeting small screens |
| Tablet breakpoint ~768px exists | 25 | Mid-range query |
| No horizontal overflow indicators | 25 | Absence of `overflow-x: hidden` on body (symptom of overflow bugs); presence of `max-width: 100%` on images |

#### CS --- Consistency (0-100)

| Check | Points | Method |
|-------|--------|--------|
| var() usage ratio >= 0.8 | 40 | `count(var(...))` / `count(all color/spacing values)` |
| No inline styles in HTML | 20 | Count `style=` attributes in HTML |
| Consistent border-radius values | 20 | All radii should use `var(--radius-*)` tokens |
| Consistent color references | 20 | Direct hex in CSS (outside :root) = violation |

---

## 2. Intent Fidelity Score (IFS) --- DSL Compliance (0-100)

IFS measures how faithfully the generated output implements the Design DSL specification. This is the extrinsic quality measure --- a perfect score means the system did exactly what was asked.

### 2.1 Checks

| Check | Weight | Method | Pass Criteria |
|-------|--------|--------|---------------|
| **Style variable match** | 25% | Compare generated CSS variables against `compile(dsl).variablesCss` | Variables section is identical or superset |
| **Section coverage** | 25% | All entries in `dsl.sections[]` appear as `<section>` elements in HTML | Coverage ratio (found / expected) |
| **Color accuracy** | 20% | Extract `--color-primary`, `--color-accent`, `--color-background`, `--color-text` from CSS; compare to DSL palette | Hex values match within +/-5 per RGB channel |
| **Typography match** | 15% | Font families in generated CSS/HTML match `dsl.typography.font_pairing` | Both heading and body fonts present |
| **Layout compliance** | 15% | Container `max-width` matches `dsl.layout.max_width`; column count matches | Exact match |

**Formula:**

```
IFS = 0.25 * style_match_score + 0.25 * section_coverage + 0.20 * color_accuracy + 0.15 * typography_match + 0.15 * layout_compliance
```

Each sub-check produces 0 or 100 (binary) or a 0-100 continuous score, then weighted.

---

## 3. Diversity Score (DS) --- Cross-Preset Variation (0-1)

Measures whether different presets produce meaningfully different designs. A system that generates the same layout regardless of style input scores low.

### 3.1 Feature Vector

For each preset, extract a feature vector:

```
v = [
  hue_primary (0-360, normalized to 0-1),
  hue_accent (0-360, normalized to 0-1),
  background_lightness (0-1),
  font_category_heading (0=sans, 1=serif, 2=mono),
  font_category_body (0=sans, 1=serif, 2=mono),
  layout_type_index (0-5, one-hot would be ideal but index suffices),
  motion_type_index (0-6),
  columns (1-4, normalized),
  max_width_px (normalized to 0-1 over range 720-1440),
  density_index (0=low, 1=medium, 2=high),
]
```

### 3.2 Computation

1. Compute pairwise cosine distance for all `C(8,2) = 28` preset pairs
2. DS = mean pairwise distance
3. Also report:
   - CSS variable uniqueness ratio: `|unique_values| / |total_values|` across all 8 compiled outputs
   - Min pairwise distance (identifies the most similar pair)

### 3.3 Interpretation

| DS Range | Interpretation |
|----------|---------------|
| 0.0-0.2 | Poor: presets are nearly identical |
| 0.2-0.4 | Moderate: some variation but many shared patterns |
| 0.4-0.6 | Good: meaningful visual differentiation |
| 0.6-1.0 | Excellent: strong identity per preset |

---

## 4. User Satisfaction Proxy (USP) --- HITL Behavioral Metrics

Collected from HITL checkpoint interactions (HITL-1, HITL-2, HITL-3).

### 4.1 Metrics

| Metric | How Collected | Formula |
|--------|--------------|---------|
| **First-attempt approval rate** | HITL-1 (Design Approval Gate) | `approved_first_try / total_sessions` |
| **Mean refinement count** | HITL-2 (Style Editing Loop) | `sum(refinement_rounds) / total_sessions` |
| **Rejection rate by dimension** | HITL-1 rejects | Categorize rejections by DSL dimension |
| **Convergence speed** | HITL-2 iterations to satisfaction | Fewer = better |

### 4.2 Composite USP

```
USP = 0.4 * first_attempt_approval + 0.3 * (1 - clamp(mean_refinements / 5, 0, 1)) + 0.3 * convergence_score
```

Where `convergence_score = 1 - (mean_iterations_to_satisfaction / max_iterations)`.

---

## 5. Comparative Benchmark Protocol

### 5.1 Systems Under Test

| System | Description | Input Method |
|--------|-------------|--------------|
| **SiteSmith** | Full pipeline with DSL | Design DSL JSON |
| **Raw GPT-4 prompt** | Single prompt to GPT-4 | Natural language description equivalent to DSL |
| **Wix ADI** | Commercial ADI system | Questionnaire answers matching DSL intent |
| **v0.dev** | Vercel's AI code generation | Natural language prompt |

### 5.2 Test Protocol

1. **Input normalization**: For each of 8 presets, generate an equivalent natural-language description for non-DSL systems
2. **Generation**: Each system generates output from equivalent input
3. **Evaluation**: Apply DQS + IFS (where applicable) + human rubric scoring
4. **Reporting**: Mean and std across all 8 presets

### 5.3 Results Template

| System | DQS (mean +/- std) | IFS (mean +/- std) | DS | USP | Notes |
|--------|---------------------|---------------------|----|-----|-------|
| SiteSmith | - | - | - | - | |
| Raw GPT-4 | - | N/A (no DSL) | - | - | |
| Wix ADI | - | N/A | - | - | |
| v0.dev | - | N/A | - | - | |

---

## 6. Statistical Methodology

### 6.1 Significance Testing

- For DQS/IFS comparisons across systems: paired t-test or Wilcoxon signed-rank test (8 presets = 8 paired samples)
- For DS: bootstrap confidence interval (resample preset pairs)
- For USP: binomial test for approval rates; Mann-Whitney U for refinement counts

### 6.2 Effect Size

Report Cohen's d for all pairwise system comparisons.

### 6.3 Inter-rater Reliability

For human rubric scoring (see `rubric.md`):
- Minimum 2 raters per sample
- Report Krippendorff's alpha (target >= 0.67)
- Resolve disagreements > 1 point via discussion

---

## 7. File Structure

```
eval/
  EVALUATION.md          ← This document
  rubric.md              ← Human evaluation rubric (5-point scale)
  metrics.ts             ← Automated metric computation (TypeScript)
  tests/
    metrics.test.ts      ← Vitest tests for eval framework
  package.json           ← Dependencies (vitest)
  tsconfig.json          ← TypeScript configuration
  user_study/            ← (Future) User study data collection
```

---

## References

- WCAG 2.1 Success Criterion 1.4.3 (Contrast Minimum)
- Material Design spacing and type scale systems
- Butterick's Practical Typography (line length, type scale)
- SimulMT evaluation methodology: orthogonal dimensions, automated + human, composite scoring
