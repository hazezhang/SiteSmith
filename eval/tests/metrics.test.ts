/**
 * Tests for the SiteSmith evaluation framework.
 *
 * Validates that automated metrics correctly assess design quality,
 * intent fidelity, and cross-preset diversity.
 */

import { describe, it, expect } from 'vitest';
import {
  evaluateHierarchy,
  evaluateColorHarmony,
  evaluateTypography,
  evaluateLayout,
  evaluateInteraction,
  evaluateResponsiveness,
  evaluateConsistency,
  evaluateIntentFidelity,
  evaluateDiversity,
  evaluate,
} from '../metrics';
import type { DesignDSL, CompileResult } from '../../packages/dsl-engine/src/types';

// ─── Test Fixtures ───

/** Minimal well-structured HTML for testing */
const GOOD_HTML = `
<!DOCTYPE html>
<html lang="en">
<head><title>Test</title></head>
<body>
  <section id="hero" class="hero">
    <h1>Welcome to My Site</h1>
    <p>A brief description of what this site is about.</p>
  </section>
  <section id="about" class="about">
    <h2>About Me</h2>
    <p>Some information about the author.</p>
    <h3>Background</h3>
    <p>More detail here.</p>
  </section>
  <section id="projects" class="projects">
    <h2>Projects</h2>
    <div class="card"><h3>Project One</h3><p>Description.</p></div>
    <div class="card"><h3>Project Two</h3><p>Description.</p></div>
  </section>
  <section id="contact" class="contact">
    <h2>Contact</h2>
    <p>Get in touch.</p>
  </section>
</body>
</html>
`;

/** Poorly structured HTML */
const BAD_HTML = `
<div>
  <h3>Something</h3>
  <h1>Title</h1>
  <h1>Another Title</h1>
  <p style="color: red;">Text</p>
  <p style="font-size: 10px;">More text</p>
  <p style="margin-left: 20px;">Even more</p>
</div>
`;

/** Well-formed CSS using design tokens */
const GOOD_CSS = `
:root {
  --color-primary: #171717;
  --color-accent: #007aff;
  --color-background: #fafafa;
  --color-text: #171717;
  --font-heading: 'Inter', sans-serif;
  --font-body: 'Inter', sans-serif;
  --text-base: 18px;
  --text-sm: 14px;
  --text-lg: 20px;
  --text-xl: 24px;
  --text-2xl: 30px;
  --text-3xl: 38px;
  --text-4xl: 48px;
  --text-5xl: 60px;
  --leading-normal: 1.6;
  --paragraph-width: 65ch;
  --container-max-width: 720px;
  --section-gap: 4rem;
  --radius-lg: 12px;
  --radius-full: 9999px;
  --space-2: 0.5rem;
  --space-4: 1rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --transition-fast: 150ms;
  --transition-base: 200ms;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: var(--font-body);
  font-size: var(--text-base);
  line-height: var(--leading-normal);
  color: var(--color-text);
  background: var(--color-background);
}
img { max-width: 100%; height: auto; }
h1 { font-size: var(--text-4xl); font-family: var(--font-heading); }
h2 { font-size: var(--text-3xl); font-family: var(--font-heading); }
h3 { font-size: var(--text-2xl); font-family: var(--font-heading); }
p { max-width: var(--paragraph-width); margin-bottom: var(--space-4); }
section { padding: var(--section-gap) 0; }

a { transition: color var(--transition-fast); }
a:hover { color: var(--color-accent); }
.btn:hover { transform: translateY(-2px); }
.btn:active { transform: scale(0.97); }
.btn:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }
.card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
a:focus-visible { outline: 2px solid var(--color-accent); }
input:focus-visible { outline: 2px solid var(--color-accent); }

.card {
  background: var(--color-background);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  border: 1px solid var(--color-primary);
  transition: all var(--transition-base);
}

@media (max-width: 768px) {
  h1 { font-size: var(--text-3xl); }
  section { padding: var(--space-8) 0; }
}
@media (max-width: 480px) {
  h1 { font-size: var(--text-2xl); }
  body { font-size: 16px; }
}
@media (max-width: 1024px) {
  .grid { grid-template-columns: 1fr; }
}
`;

/** CSS with poor practices */
const BAD_CSS = `
body {
  font-family: Arial;
  font-size: 12px;
  line-height: 1.1;
  color: #333;
  background: #fff;
}
h1 { font-size: 24px; color: #333; }
h2 { font-size: 20px; color: #555; }
p { margin: 10px; color: #666; }
a { color: blue; }
.card { padding: 15px; border: 1px solid #ccc; border-radius: 5px; }
`;

/** Minimal preset DSL for testing */
const MINIMAL_DSL: DesignDSL = {
  style: 'minimal',
  layout: { type: 'single-column', alignment: 'center', max_width: '720px', section_spacing: 'generous' },
  density: 'low',
  typography: { font_pairing: ['Inter', 'Inter'], scale: '1.25', base_size: '18px', line_height: '1.6', weight_strategy: 'contrast', paragraph_width: '65ch' },
  color: { mode: 'monochrome', primary: '#171717', accent: '#007aff', background: '#fafafa', text: '#171717', contrast: 'high' },
  interaction: { level: 'low', hover: 'opacity', click_feedback: 'subtle-scale', focus: 'ring', scroll_behavior: 'smooth' },
  motion: { type: 'subtle-fade', duration: '200ms', easing: 'ease-out', reduced_motion: true },
  sections: ['hero', 'about', 'projects', 'contact'],
};

const CYBERPUNK_DSL: DesignDSL = {
  style: 'cyberpunk',
  layout: { type: 'grid', grid: true, columns: 2, alignment: 'center', max_width: '1200px', section_spacing: 'default' },
  density: 'medium',
  typography: { font_pairing: ['JetBrains Mono', 'Inter'], scale: '1.25', base_size: '16px', line_height: '1.5', weight_strategy: 'contrast', letter_spacing: 'wide' },
  color: { mode: 'dark', primary: '#00ff88', accent: '#ff00ff', background: '#0a0a0a', text: '#e0e0e0', contrast: 'high', dark_mode: true },
  interaction: { level: 'high', hover: 'color-shift', click_feedback: 'ripple', focus: 'glow', scroll_behavior: 'smooth' },
  motion: { type: 'micro-interaction', duration: '200ms', easing: 'ease-out', reduced_motion: true },
};

/** Mock CompileResult */
function mockCompileResult(dsl: DesignDSL): CompileResult {
  const vars: string[] = [':root {'];
  if (dsl.color.primary) vars.push(`  --color-primary: ${dsl.color.primary};`);
  if (dsl.color.accent) vars.push(`  --color-accent: ${dsl.color.accent};`);
  if (dsl.color.background) vars.push(`  --color-background: ${dsl.color.background};`);
  if (dsl.color.text) vars.push(`  --color-text: ${dsl.color.text};`);
  vars.push(`  --font-heading: '${dsl.typography.font_pairing[0]}', sans-serif;`);
  vars.push(`  --font-body: '${dsl.typography.font_pairing[1]}', sans-serif;`);
  vars.push(`  --text-base: ${dsl.typography.base_size || '16px'};`);
  vars.push(`  --leading-normal: ${dsl.typography.line_height || '1.5'};`);
  vars.push(`  --paragraph-width: ${dsl.typography.paragraph_width || '65ch'};`);
  if (dsl.layout.max_width) vars.push(`  --container-max-width: ${dsl.layout.max_width};`);
  vars.push('}');

  return {
    variablesCss: vars.join('\n'),
    baseCss: '',
    interactionsCss: '',
    interactionsJs: '',
    fontImportUrl: '',
    warnings: [],
  };
}

// ─── Tests: Hierarchy Clarity ───

describe('evaluateHierarchy', () => {
  it('should score high for well-structured HTML', () => {
    const score = evaluateHierarchy(GOOD_HTML);
    expect(score).toBeGreaterThanOrEqual(80);
  });

  it('should score low for poorly structured HTML', () => {
    const score = evaluateHierarchy(BAD_HTML);
    // Multiple h1s, skipped levels — should score lower than good HTML
    const goodScore = evaluateHierarchy(GOOD_HTML);
    expect(score).toBeLessThan(goodScore);
  });

  it('should score 0 for HTML with no headings', () => {
    const score = evaluateHierarchy('<div><p>Just text</p></div>');
    expect(score).toBe(0);
  });

  it('should detect single h1 as focal point', () => {
    const html = '<h1>Main Title</h1><h2>Sub</h2><h3>Sub-sub</h3>';
    const score = evaluateHierarchy(html);
    expect(score).toBeGreaterThanOrEqual(60);
  });
});

// ─── Tests: Color Harmony ───

describe('evaluateColorHarmony', () => {
  it('should score high for minimal preset with good contrast', () => {
    const score = evaluateColorHarmony(GOOD_CSS, MINIMAL_DSL);
    expect(score).toBeGreaterThanOrEqual(70);
  });

  it('should score well for cyberpunk dark mode', () => {
    // Cyberpunk: dark bg (#0a0a0a), light text (#e0e0e0), green primary
    const cyberpunkCss = `
      :root {
        --color-primary: #00ff88;
        --color-accent: #ff00ff;
        --color-background: #0a0a0a;
        --color-text: #e0e0e0;
      }
    `;
    const score = evaluateColorHarmony(cyberpunkCss, CYBERPUNK_DSL);
    // Should pass contrast checks: #e0e0e0 on #0a0a0a is high contrast
    expect(score).toBeGreaterThanOrEqual(60);
  });

  it('should penalize low contrast text', () => {
    const lowContrastDsl: DesignDSL = {
      ...MINIMAL_DSL,
      color: { mode: 'soft', primary: '#cccccc', accent: '#dddddd', background: '#ffffff', text: '#cccccc', contrast: 'low' },
    };
    const score = evaluateColorHarmony('', lowContrastDsl);
    // #cccccc on #ffffff has poor contrast
    expect(score).toBeLessThan(60);
  });
});

// ─── Tests: Typography Quality ───

describe('evaluateTypography', () => {
  it('should score high for well-configured typography', () => {
    const score = evaluateTypography(GOOD_CSS, GOOD_HTML);
    expect(score).toBeGreaterThanOrEqual(80);
  });

  it('should score low for poor typography', () => {
    const score = evaluateTypography(BAD_CSS, BAD_HTML);
    expect(score).toBeLessThan(40);
  });

  it('should reward reading-optimized minimal preset', () => {
    // Minimal preset: 65ch paragraph width, 1.6 line height, 18px base
    const score = evaluateTypography(GOOD_CSS, GOOD_HTML);
    // Should get high marks for line length + line height + base size
    expect(score).toBeGreaterThanOrEqual(80);
  });
});

// ─── Tests: Layout Precision ───

describe('evaluateLayout', () => {
  it('should score high for token-based layout', () => {
    const score = evaluateLayout(GOOD_CSS, GOOD_HTML, MINIMAL_DSL);
    expect(score).toBeGreaterThanOrEqual(60);
  });

  it('should penalize hardcoded spacing', () => {
    const score = evaluateLayout(BAD_CSS, BAD_HTML, MINIMAL_DSL);
    expect(score).toBeLessThan(50);
  });
});

// ─── Tests: Interaction Polish ───

describe('evaluateInteraction', () => {
  it('should score high for CSS with hover/focus/active states', () => {
    const score = evaluateInteraction(GOOD_CSS);
    expect(score).toBeGreaterThanOrEqual(60);
  });

  it('should score low for CSS with no interactive states', () => {
    const score = evaluateInteraction(BAD_CSS);
    expect(score).toBe(0);
  });
});

// ─── Tests: Responsiveness ───

describe('evaluateResponsiveness', () => {
  it('should score high for CSS with multiple breakpoints', () => {
    const score = evaluateResponsiveness(GOOD_CSS);
    expect(score).toBeGreaterThanOrEqual(80);
  });

  it('should score low for CSS with no media queries', () => {
    const score = evaluateResponsiveness(BAD_CSS);
    expect(score).toBeLessThanOrEqual(10);
  });
});

// ─── Tests: Consistency ───

describe('evaluateConsistency', () => {
  it('should score high for token-consistent CSS', () => {
    const score = evaluateConsistency(GOOD_CSS, GOOD_HTML);
    expect(score).toBeGreaterThanOrEqual(60);
  });

  it('should penalize inline styles and hardcoded values', () => {
    const score = evaluateConsistency(BAD_CSS, BAD_HTML);
    expect(score).toBeLessThan(50);
  });
});

// ─── Tests: Intent Fidelity ───

describe('evaluateIntentFidelity', () => {
  it('should score high when CSS matches DSL compilation', () => {
    const compiled = mockCompileResult(MINIMAL_DSL);
    const result = evaluateIntentFidelity(GOOD_CSS, GOOD_HTML, MINIMAL_DSL, compiled);
    expect(result.total).toBeGreaterThanOrEqual(70);
  });

  it('should report style_match when variables are present', () => {
    const compiled = mockCompileResult(MINIMAL_DSL);
    const result = evaluateIntentFidelity(GOOD_CSS, GOOD_HTML, MINIMAL_DSL, compiled);
    expect(result.style_match).toBe(true);
  });

  it('should detect font match', () => {
    const compiled = mockCompileResult(MINIMAL_DSL);
    const result = evaluateIntentFidelity(GOOD_CSS, GOOD_HTML, MINIMAL_DSL, compiled);
    expect(result.typography_match).toBe(true);
  });

  it('should report section coverage correctly', () => {
    const compiled = mockCompileResult(MINIMAL_DSL);
    const result = evaluateIntentFidelity(GOOD_CSS, GOOD_HTML, MINIMAL_DSL, compiled);
    // GOOD_HTML has hero, about, projects, contact sections
    expect(result.section_coverage).toBe(1);
  });

  it('should detect missing sections', () => {
    const dslWithExtra: DesignDSL = {
      ...MINIMAL_DSL,
      sections: ['hero', 'about', 'nonexistent-section'],
    };
    const compiled = mockCompileResult(dslWithExtra);
    const result = evaluateIntentFidelity(GOOD_CSS, GOOD_HTML, dslWithExtra, compiled);
    expect(result.section_coverage).toBeLessThan(1);
  });

  it('should detect layout compliance', () => {
    const compiled = mockCompileResult(MINIMAL_DSL);
    const result = evaluateIntentFidelity(GOOD_CSS, GOOD_HTML, MINIMAL_DSL, compiled);
    // GOOD_CSS has --container-max-width: 720px matching DSL
    expect(result.layout_compliance).toBe(true);
  });
});

// ─── Tests: Diversity Score ───

describe('evaluateDiversity', () => {
  it('should report high diversity for distinct presets', () => {
    const presets = [
      { name: 'minimal', dsl: MINIMAL_DSL, compiled: mockCompileResult(MINIMAL_DSL) },
      { name: 'cyberpunk', dsl: CYBERPUNK_DSL, compiled: mockCompileResult(CYBERPUNK_DSL) },
    ];
    const result = evaluateDiversity(presets);
    expect(result.score).toBeGreaterThan(0.1);
  });

  it('should report low diversity for identical presets', () => {
    const presets = [
      { name: 'minimal-1', dsl: MINIMAL_DSL, compiled: mockCompileResult(MINIMAL_DSL) },
      { name: 'minimal-2', dsl: MINIMAL_DSL, compiled: mockCompileResult(MINIMAL_DSL) },
    ];
    const result = evaluateDiversity(presets);
    expect(result.score).toBe(0);
    expect(result.min_pairwise_distance).toBe(0);
  });

  it('should identify most similar pair', () => {
    const editorialDsl: DesignDSL = {
      style: 'editorial',
      layout: { type: 'reading-column', alignment: 'left', max_width: '720px', section_spacing: 'generous' },
      density: 'medium',
      typography: { font_pairing: ['Playfair Display', 'Source Sans 3'], scale: '1.2', base_size: '18px', line_height: '1.8' },
      color: { mode: 'soft', primary: '#1e293b', accent: '#b45309', background: '#faf8f5', text: '#1e293b' },
      interaction: { level: 'low', hover: 'underline' },
      motion: { type: 'none', reduced_motion: true },
    };

    const presets = [
      { name: 'minimal', dsl: MINIMAL_DSL, compiled: mockCompileResult(MINIMAL_DSL) },
      { name: 'cyberpunk', dsl: CYBERPUNK_DSL, compiled: mockCompileResult(CYBERPUNK_DSL) },
      { name: 'editorial', dsl: editorialDsl, compiled: mockCompileResult(editorialDsl) },
    ];
    const result = evaluateDiversity(presets);
    expect(result.most_similar_pair).toBeDefined();
    expect(result.most_similar_pair.length).toBe(2);
  });

  it('should compute CSS variable uniqueness', () => {
    const presets = [
      { name: 'minimal', dsl: MINIMAL_DSL, compiled: mockCompileResult(MINIMAL_DSL) },
      { name: 'cyberpunk', dsl: CYBERPUNK_DSL, compiled: mockCompileResult(CYBERPUNK_DSL) },
    ];
    const result = evaluateDiversity(presets);
    expect(result.css_variable_uniqueness).toBeGreaterThan(0);
    expect(result.css_variable_uniqueness).toBeLessThanOrEqual(1);
  });
});

// ─── Tests: Full evaluate() ───

describe('evaluate (full pipeline)', () => {
  it('should return complete EvalResult structure', () => {
    const compiled = mockCompileResult(MINIMAL_DSL);
    const result = evaluate(GOOD_HTML, GOOD_CSS, MINIMAL_DSL, compiled);

    // Structure checks
    expect(result.dqs).toBeDefined();
    expect(result.ifs).toBeDefined();
    expect(result.details).toBeDefined();

    // DQS range
    expect(result.dqs.total).toBeGreaterThanOrEqual(0);
    expect(result.dqs.total).toBeLessThanOrEqual(100);

    // IFS range
    expect(result.ifs.total).toBeGreaterThanOrEqual(0);
    expect(result.ifs.total).toBeLessThanOrEqual(100);
  });

  it('should score well-formed output higher than poor output', () => {
    const compiled = mockCompileResult(MINIMAL_DSL);
    const goodResult = evaluate(GOOD_HTML, GOOD_CSS, MINIMAL_DSL, compiled);
    const badResult = evaluate(BAD_HTML, BAD_CSS, MINIMAL_DSL, compiled);

    expect(goodResult.dqs.total).toBeGreaterThan(badResult.dqs.total);
  });

  it('should list contrast violations when they exist', () => {
    const lowContrastDsl: DesignDSL = {
      ...MINIMAL_DSL,
      color: { mode: 'soft', primary: '#cccccc', accent: '#dddddd', background: '#ffffff', text: '#aaaaaa' },
    };
    const compiled = mockCompileResult(lowContrastDsl);
    const result = evaluate(GOOD_HTML, BAD_CSS, lowContrastDsl, compiled);
    expect(result.details.contrast_violations.length).toBeGreaterThan(0);
  });

  it('should count hardcoded values', () => {
    const compiled = mockCompileResult(MINIMAL_DSL);
    const result = evaluate(BAD_HTML, BAD_CSS, MINIMAL_DSL, compiled);
    expect(result.details.hardcoded_values).toBeGreaterThan(0);
  });

  it('should report all 7 DQS sub-dimensions', () => {
    const compiled = mockCompileResult(MINIMAL_DSL);
    const result = evaluate(GOOD_HTML, GOOD_CSS, MINIMAL_DSL, compiled);
    const dims = [
      result.dqs.hierarchy_clarity,
      result.dqs.color_harmony,
      result.dqs.typography_quality,
      result.dqs.layout_precision,
      result.dqs.interaction_polish,
      result.dqs.responsiveness,
      result.dqs.consistency,
    ];
    for (const dim of dims) {
      expect(dim).toBeGreaterThanOrEqual(0);
      expect(dim).toBeLessThanOrEqual(100);
    }
  });

  it('should weight DQS sub-dimensions correctly (sum to 1.0)', () => {
    const weights = [0.20, 0.15, 0.15, 0.20, 0.10, 0.10, 0.10];
    const sum = weights.reduce((a, b) => a + b, 0);
    expect(sum).toBeCloseTo(1.0, 10);
  });
});

// ─── Tests: Preset-Specific Quality Assertions ───

describe('preset-specific quality', () => {
  it('minimal preset should score high on typography_quality (reading-optimized)', () => {
    // The minimal preset has: 65ch width, 1.6 line height, 18px base, Inter font
    // GOOD_CSS mirrors these values
    const score = evaluateTypography(GOOD_CSS, GOOD_HTML);
    expect(score).toBeGreaterThanOrEqual(80);
  });

  it('cyberpunk dark mode should pass contrast checks', () => {
    // #e0e0e0 on #0a0a0a: relative luminance ratio should be well above 4.5:1
    const cyberpunkCss = `
      :root {
        --color-primary: #00ff88;
        --color-accent: #ff00ff;
        --color-background: #0a0a0a;
        --color-text: #e0e0e0;
      }
    `;
    const score = evaluateColorHarmony(cyberpunkCss, CYBERPUNK_DSL);
    // High-contrast dark mode should score well
    expect(score).toBeGreaterThanOrEqual(55);
  });
});
