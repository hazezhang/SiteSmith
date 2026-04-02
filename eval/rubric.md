# SiteSmith Human Evaluation Rubric

> 5-point scale per dimension. Designed for inter-rater reliability (target Krippendorff's alpha >= 0.67).
> Maps 1:1 to the automated DQS sub-dimensions for cross-validation.

## Instructions for Evaluators

1. Open the generated website in a browser at 1440px viewport width
2. Score each dimension independently (do not let one dimension influence another)
3. Use the specific criteria below --- do not rely on overall impression
4. Score first, then read other raters' scores (blind evaluation)
5. For each score, write a 1-sentence justification

## Scoring Scale

| Score | Label | General Meaning |
|-------|-------|-----------------|
| 1 | Poor | Fundamentally broken or missing |
| 2 | Below Average | Present but with significant issues |
| 3 | Adequate | Functional, meets minimum standards |
| 4 | Good | Well-executed with minor issues |
| 5 | Excellent | Professional quality, no visible issues |

---

## Dimension 1: Hierarchy Clarity (HC)

*Does the page guide the eye through a clear visual hierarchy?*

| Score | Criteria |
|-------|----------|
| **5** | Immediately clear focal point; heading sizes create obvious reading order; never confused about what to read next; heading levels are semantically correct (h1 > h2 > h3) |
| **4** | Clear hierarchy with one minor issue (e.g., one heading level slightly too similar to the next); easy to scan |
| **3** | Hierarchy exists but requires effort to parse; some headings feel same-weight; focal point exists but is not compelling |
| **2** | Flat hierarchy --- multiple elements compete for attention; heading sizes are inconsistent or skip levels; no clear entry point |
| **1** | No discernible hierarchy; all text appears similar weight/size; heading tags are missing or misused (e.g., h4 before h2) |

**Anchor examples:**
- Score 5: Apple.com product page --- one hero headline, clear size decrease through sections
- Score 3: A WordPress blog with default theme --- adequate but generic hierarchy
- Score 1: A wall of same-sized paragraphs with no headings

---

## Dimension 2: Color Harmony (CH)

*Is the color palette cohesive, accessible, and appropriate for the stated style?*

| Score | Criteria |
|-------|----------|
| **5** | Palette feels intentional and cohesive; all text passes WCAG AA contrast; accent color draws attention without clashing; color usage matches the DSL style (e.g., monochrome feels monochrome) |
| **4** | Cohesive palette with one minor issue (e.g., one low-contrast secondary text); style-appropriate |
| **3** | Colors are functional but feel generic or slightly mismatched; all critical text is readable; one contrast issue on non-critical elements |
| **2** | Noticeable color clashes or inappropriate palette for the style; some text is hard to read; color feels random |
| **1** | Colors actively harm usability; text is unreadable against background; palette is incoherent (random hues with no relationship) |

**Anchor examples:**
- Score 5: Stripe.com --- sophisticated gradient palette, perfect contrast, intentional color coding
- Score 3: Generic Bootstrap default colors --- functional but unremarkable
- Score 1: Yellow text on white background, clashing neon accents

---

## Dimension 3: Typography Quality (TQ)

*Is the text pleasant to read with appropriate size, spacing, and font choices?*

| Score | Criteria |
|-------|----------|
| **5** | Body text is effortless to read; line length is 45-75 characters; line height provides comfortable rhythm; font pairing is harmonious (contrast between heading and body); base size >= 16px |
| **4** | Comfortable reading experience with one minor issue (e.g., slightly tight line height or one font feels generic) |
| **3** | Readable but not optimized; line length or line height slightly outside ideal range; fonts are safe but uninspired |
| **2** | Reading requires effort; lines too long (>80ch) or too short (<40ch); inconsistent font usage; base size too small |
| **1** | Painful to read; very long or very short lines; no font hierarchy; tiny or illegible text |

**Anchor examples:**
- Score 5: Medium.com articles --- optimized reading column, beautiful serif/sans pairing
- Score 3: Default GitHub README rendering --- adequate but not designed for reading
- Score 1: Full-width paragraph spanning 1440px viewport with 12px font

---

## Dimension 4: Layout Precision (LP)

*Is the spatial organization precise, consistent, and intentional?*

| Score | Criteria |
|-------|----------|
| **5** | All elements feel precisely placed; spacing is consistent throughout; grid alignment is pixel-perfect; whitespace distribution creates rhythm; layout matches DSL specification exactly |
| **4** | Well-structured layout with one minor misalignment or spacing inconsistency |
| **3** | Layout is functional; some spacing feels inconsistent (e.g., different margins between similar sections); grid is approximately correct |
| **2** | Noticeable alignment issues; spacing is inconsistent across the page; elements feel loosely placed rather than designed |
| **1** | Layout is broken or chaotic; overlapping elements; huge unexplained gaps; no grid structure visible |

**Anchor examples:**
- Score 5: Linear.app --- meticulous grid alignment, consistent spacing rhythm
- Score 3: A basic HTML page with centered content and reasonable margins
- Score 1: Elements floating randomly with overlapping text

---

## Dimension 5: Interaction Polish (IP)

*Are interactive elements well-crafted with appropriate feedback?*

| Score | Criteria |
|-------|----------|
| **5** | All links/buttons have visible hover states; focus indicators are clear and styled; transitions are smooth (not jarring); active states provide click feedback; interactions feel intentional and match the style |
| **4** | Good interaction coverage with one missing state (e.g., no active state on secondary buttons) |
| **3** | Basic hover effects present; focus states exist but are browser defaults; transitions are present but generic |
| **2** | Inconsistent interactions; some buttons have hover states, others don't; no focus indicators; abrupt transitions |
| **1** | No interactive feedback; links indistinguishable from text; no hover/focus/active states; jarring or no transitions |

**Anchor examples:**
- Score 5: Vercel dashboard --- every interactive element has polished hover, focus, and active states with smooth transitions
- Score 3: Bootstrap default buttons --- functional hover/focus but generic
- Score 1: Plain HTML links with no styling changes on interaction

---

## Dimension 6: Responsiveness (RS)

*Does the layout adapt gracefully across viewport sizes?*

| Score | Criteria |
|-------|----------|
| **5** | Layout adapts seamlessly at 375px, 768px, 1024px, 1440px; no horizontal scroll; touch targets >= 44px; text remains readable at all sizes; images scale properly |
| **4** | Good adaptation with one minor issue at one breakpoint (e.g., slightly tight spacing on mobile) |
| **3** | Major layout works at mobile and desktop; one breakpoint has noticeable issues (e.g., tablet has awkward column width); text is readable everywhere |
| **2** | Desktop layout is acceptable but mobile is poorly adapted; horizontal scroll appears; some touch targets are too small |
| **1** | Only works at one viewport size; mobile is completely broken; content overflows or is hidden |

**Test procedure:** Check at exactly 375px, 768px, 1024px, 1440px viewport widths.

---

## Dimension 7: Consistency (CS)

*Is the design system applied uniformly across all components?*

| Score | Criteria |
|-------|----------|
| **5** | Every component uses the same design tokens; colors, spacing, radii, and shadows are uniform; no one-off values; style feels like one coherent system |
| **4** | Highly consistent with one minor deviation (e.g., one component uses a slightly different shadow) |
| **3** | Mostly consistent; a few components feel like they belong to a different system; some hardcoded values visible |
| **2** | Inconsistent --- different components use different spacing scales or color values; design feels assembled from parts |
| **1** | No consistency; each component looks independently styled; no shared design language |

---

## Composite Score

```
Human DQS = 0.20 * HC + 0.15 * CH + 0.15 * TQ + 0.20 * LP + 0.10 * IP + 0.10 * RS + 0.10 * CS
```

Normalize from 1-5 scale to 0-100: `DQS_100 = (Human_DQS - 1) * 25`

---

## Evaluation Sheet Template

| Preset | HC | CH | TQ | LP | IP | RS | CS | DQS | Notes |
|--------|----|----|----|----|----|----|-----|-----|-------|
| minimal | | | | | | | | | |
| modern | | | | | | | | | |
| creative | | | | | | | | | |
| editorial | | | | | | | | | |
| product | | | | | | | | | |
| cyberpunk | | | | | | | | | |
| portfolio | | | | | | | | | |
| warm | | | | | | | | | |

**Rater ID:** ___
**Date:** ___
**Browser/OS:** ___
**Session duration:** ___
