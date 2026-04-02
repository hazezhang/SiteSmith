import type { DesignDSL, CompileResult } from '../types';
import { compileLayoutVars, compileLayoutClasses } from './layout';
import { compileDensityVars } from './density';
import { compileTypographyVars, buildFontImportUrl } from './typography';
import { compileColorVars } from './color';
import { compileInteractionVars, compileInteractionCss } from './interaction';
import { compileMotionVars, compileMotionCss, compileMotionJs } from './motion';
import { rootBlock, section, comment } from '../utils/css-builder';

const SPACING_SCALE: Record<string, string> = {
  '--space-1': '0.25rem', '--space-2': '0.5rem', '--space-3': '0.75rem',
  '--space-4': '1rem', '--space-6': '1.5rem', '--space-8': '2rem',
  '--space-12': '3rem', '--space-16': '4rem', '--space-24': '6rem',
};

export function compile(dsl: DesignDSL): CompileResult {
  const warnings: string[] = [];

  // 1. Compile all dimension variables
  const layoutVars = compileLayoutVars(dsl.layout);
  const densityVars = compileDensityVars(dsl.density);
  const typoVars = compileTypographyVars(dsl.typography);
  const colorVars = compileColorVars(dsl.color);
  const interactionVars = compileInteractionVars(dsl.interaction);
  const motionVars = compileMotionVars(dsl.motion);

  // 2. Build font import URL
  const fontImportUrl = buildFontImportUrl(
    dsl.typography.font_pairing,
    dsl.typography.weight_strategy ?? 'contrast'
  );

  // 3. Assemble variables.css
  const allVars = {
    ...layoutVars,
    ...densityVars,
    ...typoVars,
    ...colorVars,
    ...interactionVars,
    ...motionVars,
    ...SPACING_SCALE,
  };

  const variablesCss = [
    comment(`Design DSL → CSS Variables (Auto-compiled by @sitesmith/dsl-engine)`),
    comment(`Style: ${dsl.style} | Color: ${dsl.color.mode} | Personality: ${dsl.personality ?? ''}`),
    '',
    `@import url('${fontImportUrl}');`,
    '',
    rootBlock(allVars),
  ].join('\n');

  // 4. Assemble base.css
  const baseCss = [
    comment('Base Styles — Reset + Global (Auto-compiled)'),
    '',
    BASE_RESET,
    section('Layout', compileLayoutClasses(dsl.layout)),
    section('Components', BASE_COMPONENTS),
  ].join('\n');

  // 5. Assemble interactions.css
  const interactionsCss = [
    comment('Interaction & Motion Styles (Auto-compiled)'),
    section('Hover / Click / Focus', compileInteractionCss(dsl.interaction)),
    section('Entrance Animation', compileMotionCss(dsl.motion)),
  ].join('\n');

  // 6. interactions.js
  const interactionsJs = compileMotionJs(dsl.motion);

  return { variablesCss, baseCss, interactionsCss, interactionsJs, fontImportUrl, warnings };
}

// ─── Static base reset + component styles ───

const BASE_RESET = `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
body {
  font-family: var(--font-body);
  font-size: var(--text-base);
  line-height: var(--leading-normal);
  color: var(--color-text);
  background: var(--color-background);
  -webkit-font-smoothing: antialiased;
}
img { max-width: 100%; height: auto; display: block; }
a { color: var(--color-primary); text-decoration: none; transition: color var(--transition-fast); }
a:hover { color: var(--color-primary-dark); }
h1, h2, h3, h4, h5, h6 { font-family: var(--font-heading); font-weight: var(--weight-heading); line-height: var(--leading-tight); }
h1 { font-size: var(--text-4xl); }
h2 { font-size: var(--text-3xl); }
h3 { font-size: var(--text-2xl); }
h4 { font-size: var(--text-xl); }
p { max-width: var(--paragraph-width); margin-bottom: var(--space-4); }
p:last-child { margin-bottom: 0; }
section { padding: var(--section-gap) 0; }`;

const BASE_COMPONENTS = `.card {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  padding: var(--card-padding);
  border: 1px solid var(--color-border);
  transition: all var(--transition-base);
}
.btn {
  display: inline-flex; align-items: center; gap: var(--space-2);
  padding: 0.75rem 1.75rem; border-radius: var(--radius-full);
  font-family: var(--font-heading); font-weight: 600; font-size: var(--text-sm);
  cursor: pointer; border: none; transition: all var(--transition-base);
}
.btn-primary { background: var(--gradient-primary); color: #fff; box-shadow: var(--shadow-primary); }
.btn-primary:hover { transform: translateY(-2px); box-shadow: var(--shadow-xl); }
.btn-primary:active { transform: scale(0.97); }
.btn-outline { background: transparent; color: var(--color-primary); border: 2px solid var(--color-primary); }
.btn-outline:hover { background: var(--color-primary); color: #fff; }
.tag {
  display: inline-block; padding: 0.25rem 0.75rem;
  border-radius: var(--radius-full); font-size: var(--text-sm); font-weight: 500;
  background: var(--gradient-subtle); color: var(--color-primary-700);
}
.section-header { text-align: center; margin-bottom: var(--space-12); }
.section-header h2 { margin-bottom: var(--space-3); }
.section-header p { color: var(--color-text-muted); font-size: var(--text-lg); margin: 0 auto; }
.gradient-text {
  background: var(--gradient-primary);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}`;
