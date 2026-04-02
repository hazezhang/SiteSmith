/**
 * SiteSmith Evaluation Metrics — Automated Design Quality Assessment
 *
 * Zero external dependencies. Parses CSS/HTML with regex patterns for evaluation purposes.
 * Computes DQS (Design Quality Score) and IFS (Intent Fidelity Score).
 *
 * @module @sitesmith/eval
 */

import type { DesignDSL, CompileResult } from '../packages/dsl-engine/src/types';

// ─── Public Types ───

export interface DQSResult {
  total: number;              // 0-100
  hierarchy_clarity: number;
  color_harmony: number;
  typography_quality: number;
  layout_precision: number;
  interaction_polish: number;
  responsiveness: number;
  consistency: number;
}

export interface IFSResult {
  total: number;              // 0-100
  style_match: boolean;
  section_coverage: number;   // 0-1
  color_accuracy: number;     // 0-1
  typography_match: boolean;
  layout_compliance: boolean;
}

export interface EvalDetails {
  contrast_violations: string[];
  token_violations: string[];
  missing_sections: string[];
  hardcoded_values: number;
}

export interface EvalResult {
  dqs: DQSResult;
  ifs: IFSResult;
  details: EvalDetails;
}

// ─── Color Utilities (inline, zero deps) ───

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  if (h.length !== 6) return [0, 0, 0];
  return [
    parseInt(h.substring(0, 2), 16),
    parseInt(h.substring(2, 4), 16),
    parseInt(h.substring(4, 6), 16),
  ];
}

function relativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map(c => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(hex1: string, hex2: string): number {
  const l1 = relativeLuminance(hex1);
  const l2 = relativeLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function hexToHue(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map(v => v / 255);
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  if (max === min) return 0;
  const d = max - min;
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return h * 360;
}

function hexToLightness(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map(v => v / 255);
  return (Math.max(r, g, b) + Math.min(r, g, b)) / 2;
}

function hexToSaturation(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map(v => v / 255);
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return 0;
  const d = max - min;
  return l > 0.5 ? d / (2 - max - min) : d / (max + min);
}

function hexDistance(hex1: string, hex2: string): number {
  const [r1, g1, b1] = hexToRgb(hex1);
  const [r2, g2, b2] = hexToRgb(hex2);
  return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
}

// ─── CSS/HTML Parsing Helpers ───

function extractAllHexColors(css: string): string[] {
  const matches = css.match(/#[0-9a-fA-F]{6}\b/g) || [];
  return [...new Set(matches)];
}

function extractCssVariable(css: string, varName: string): string | null {
  const pattern = new RegExp(`${varName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*:\\s*([^;]+)`, 'i');
  const m = css.match(pattern);
  return m ? m[1].trim() : null;
}

function extractAllCssVariables(css: string): Record<string, string> {
  const vars: Record<string, string> = {};
  const matches = css.matchAll(/--([\w-]+)\s*:\s*([^;]+)/g);
  for (const m of matches) {
    vars[`--${m[1]}`] = m[2].trim();
  }
  return vars;
}

function countMatches(text: string, pattern: RegExp): number {
  return (text.match(pattern) || []).length;
}

function extractHeadings(html: string): Array<{ level: number; text: string }> {
  const headings: Array<{ level: number; text: string }> = [];
  const pattern = /<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi;
  let m: RegExpExecArray | null;
  while ((m = pattern.exec(html)) !== null) {
    headings.push({ level: parseInt(m[1], 10), text: m[2].replace(/<[^>]*>/g, '').trim() });
  }
  return headings;
}

function extractSections(html: string): string[] {
  const sections: string[] = [];
  const pattern = /<section[^>]*(?:id=["']([^"']+)["']|class=["']([^"']+)["'])[^>]*>/gi;
  let m: RegExpExecArray | null;
  while ((m = pattern.exec(html)) !== null) {
    sections.push(m[1] || m[2] || '');
  }
  return sections;
}

function parseMaxWidth(value: string): number | null {
  const m = value.match(/(\d+)\s*(px|rem)/);
  if (!m) return null;
  const num = parseInt(m[1], 10);
  return m[2] === 'rem' ? num * 16 : num;
}

function parseCh(value: string): number | null {
  const m = value.match(/(\d+)\s*ch/);
  return m ? parseInt(m[1], 10) : null;
}

// ─── DQS Sub-dimension Evaluators ───

/**
 * Evaluate visual hierarchy clarity from HTML heading structure.
 * Checks: h1 uniqueness, level sequence, heading count, focal point.
 */
export function evaluateHierarchy(html: string): number {
  const headings = extractHeadings(html);
  let score = 0;

  // Check 1: H1 exists and is unique (20 pts)
  const h1Count = headings.filter(h => h.level === 1).length;
  if (h1Count === 1) score += 20;
  else if (h1Count > 1) score += 5; // Multiple h1s: partial credit

  // Check 2: Heading levels are monotonic (no skipped levels) (20 pts)
  if (headings.length > 0) {
    let skips = 0;
    for (let i = 1; i < headings.length; i++) {
      const diff = headings[i].level - headings[i - 1].level;
      if (diff > 1) skips++; // Skipped a level (h1 -> h3)
    }
    if (skips === 0) score += 20;
    else if (skips === 1) score += 12;
    else score += Math.max(0, 20 - skips * 5);
  }

  // Check 3: Heading size ratios follow reasonable scale (20 pts)
  // In absence of computed styles, check that heading levels are diverse enough
  const usedLevels = new Set(headings.map(h => h.level));
  if (usedLevels.size >= 3) score += 20;
  else if (usedLevels.size === 2) score += 12;
  else if (usedLevels.size === 1 && headings.length > 0) score += 5;

  // Check 4: Focal point exists (20 pts)
  // Heuristic: h1 with substantive text = focal point
  const h1 = headings.find(h => h.level === 1);
  if (h1 && h1.text.length > 2) score += 20;
  else if (headings.length > 0) score += 8;

  // Check 5: Heading count is reasonable (20 pts)
  const count = headings.length;
  if (count >= 3 && count <= 8) score += 20;
  else if (count >= 2 && count <= 15) score += 12;
  else if (count >= 1) score += 5;

  return Math.min(100, score);
}

/**
 * Evaluate color harmony from CSS and DSL specification.
 * Checks: WCAG contrast, hue spread, color mode compliance.
 */
export function evaluateColorHarmony(css: string, dsl: DesignDSL): number {
  let score = 0;
  const details: string[] = [];

  const textColor = dsl.color.text || extractCssVariable(css, '--color-text') || '#000000';
  const bgColor = dsl.color.background || extractCssVariable(css, '--color-background') || '#ffffff';
  const primaryColor = dsl.color.primary || extractCssVariable(css, '--color-primary') || '#000000';
  const accentColor = dsl.color.accent || extractCssVariable(css, '--color-accent') || '#000000';

  // Check 1: Text/background contrast >= 4.5:1 (30 pts)
  const textContrast = contrastRatio(textColor, bgColor);
  if (textContrast >= 4.5) score += 30;
  else if (textContrast >= 3.0) score += 15;
  else details.push(`Text contrast ${textContrast.toFixed(2)}:1 < 4.5:1`);

  // Check 2: Large text (headings) contrast >= 3:1 (10 pts)
  // Use primary or text color against background
  const headingContrast = contrastRatio(primaryColor, bgColor);
  if (headingContrast >= 3.0) score += 10;
  else if (headingContrast >= 2.0) score += 5;

  // Check 3: Accent vs background contrast >= 3:1 (10 pts)
  const accentContrast = contrastRatio(accentColor, bgColor);
  if (accentContrast >= 3.0) score += 10;
  else if (accentContrast >= 2.0) score += 5;

  // Check 4: Hue angle spread appropriate for color mode (20 pts)
  const hues = [hexToHue(primaryColor), hexToHue(accentColor), hexToHue(textColor)];
  const hueSpread = Math.max(...hues) - Math.min(...hues);

  switch (dsl.color.mode) {
    case 'monochrome':
      score += hueSpread < 30 ? 20 : (hueSpread < 60 ? 10 : 0);
      break;
    case 'vibrant':
      score += hueSpread > 60 ? 20 : (hueSpread > 30 ? 10 : 5);
      break;
    case 'soft':
      score += (hueSpread >= 20 && hueSpread <= 120) ? 20 : 10;
      break;
    case 'dark':
      // Dark mode: hue spread less critical, focus on lightness
      score += 15;
      break;
    case 'neutral':
      score += (hueSpread < 90) ? 20 : 10;
      break;
    default:
      score += 10;
  }

  // Check 5: No clashing complementary without buffer (15 pts)
  const primaryHue = hexToHue(primaryColor);
  const accentHue = hexToHue(accentColor);
  const hueDiff = Math.abs(primaryHue - accentHue);
  // Adjacent hues should differ by > 15 deg or be intentionally complementary (150-210)
  if (hueDiff > 15 || (hueDiff > 150 && hueDiff < 210)) {
    score += 15;
  } else if (hueDiff > 5) {
    score += 8;
  }

  // Check 6: DSL color mode compliance (15 pts)
  const bgLightness = hexToLightness(bgColor);
  const bgSaturation = hexToSaturation(bgColor);
  switch (dsl.color.mode) {
    case 'dark':
      score += bgLightness < 0.15 ? 15 : (bgLightness < 0.3 ? 8 : 0);
      break;
    case 'monochrome':
      score += bgSaturation < 0.1 ? 15 : (bgSaturation < 0.2 ? 10 : 5);
      break;
    case 'soft':
      score += bgSaturation < 0.5 ? 15 : 8;
      break;
    default:
      score += 12; // Most modes are less restrictive on background
  }

  return Math.min(100, score);
}

/**
 * Evaluate typography quality from CSS and HTML.
 * Checks: line length, type scale, line height, font pairing, base size.
 */
export function evaluateTypography(css: string, html: string): number {
  let score = 0;

  // Check 1: Body line length 45-75 characters (25 pts)
  const paragraphWidth = extractCssVariable(css, '--paragraph-width');
  if (paragraphWidth) {
    const ch = parseCh(paragraphWidth);
    if (ch !== null) {
      if (ch >= 45 && ch <= 75) score += 25;
      else if (ch >= 35 && ch <= 85) score += 15;
      else score += 5;
    } else {
      // Might be px-based
      const px = parseMaxWidth(paragraphWidth);
      if (px !== null) {
        // Rough estimate: 1ch ~ 8-10px, so 65ch ~ 520-650px
        if (px >= 400 && px <= 750) score += 20;
        else score += 8;
      } else {
        score += 10; // Has some paragraph width control
      }
    }
  } else {
    // Check p max-width in CSS
    const pMaxWidth = css.match(/p\s*\{[^}]*max-width\s*:\s*([^;]+)/);
    if (pMaxWidth) score += 15;
  }

  // Check 2: Type scale adherence (25 pts)
  // Check that heading sizes use CSS variables (systematic scale)
  const hasTextVars = countMatches(css, /--text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl)/g);
  if (hasTextVars >= 6) score += 25;
  else if (hasTextVars >= 4) score += 18;
  else if (hasTextVars >= 2) score += 10;

  // Check 3: Line height in readable range (20 pts)
  const lineHeight = extractCssVariable(css, '--leading-normal');
  if (lineHeight) {
    const lh = parseFloat(lineHeight);
    if (!isNaN(lh)) {
      if (lh >= 1.4 && lh <= 1.8) score += 20;
      else if (lh >= 1.2 && lh <= 2.0) score += 12;
      else score += 5;
    } else {
      score += 10;
    }
  } else {
    // Check body line-height
    const bodyLh = css.match(/body\s*\{[^}]*line-height\s*:\s*([\d.]+)/);
    if (bodyLh) {
      const lh = parseFloat(bodyLh[1]);
      if (lh >= 1.4 && lh <= 1.8) score += 20;
      else if (lh >= 1.2 && lh <= 2.0) score += 12;
    }
  }

  // Check 4: Font pairing quality (15 pts)
  const fontHeading = extractCssVariable(css, '--font-heading');
  const fontBody = extractCssVariable(css, '--font-body');
  if (fontHeading && fontBody) {
    const headingClean = fontHeading.replace(/["']/g, '').split(',')[0].trim().toLowerCase();
    const bodyClean = fontBody.replace(/["']/g, '').split(',')[0].trim().toLowerCase();

    if (headingClean !== bodyClean) {
      // Different fonts = intentional pairing
      score += 15;
    } else {
      // Same font family: can be good (e.g., Inter for minimal) but less contrast
      score += 10;
    }
  } else if (fontHeading || fontBody) {
    score += 8;
  }

  // Check 5: Base font size >= 16px (15 pts)
  const baseSize = extractCssVariable(css, '--text-base');
  if (baseSize) {
    const px = parseMaxWidth(baseSize);
    if (px !== null && px >= 16) score += 15;
    else if (px !== null && px >= 14) score += 8;
    else score += 3;
  } else {
    // Check body font-size
    const bodyFs = css.match(/body\s*\{[^}]*font-size\s*:\s*(\d+)/);
    if (bodyFs && parseInt(bodyFs[1], 10) >= 16) score += 15;
    else score += 5;
  }

  return Math.min(100, score);
}

/**
 * Evaluate layout precision from CSS, HTML, and DSL.
 * Checks: token usage in spacing, max-width, grid columns, alignment, section spacing.
 */
export function evaluateLayout(css: string, html: string, dsl: DesignDSL): number {
  let score = 0;

  // Check 1: Spacing values use design tokens (30 pts)
  const varSpaceUsages = countMatches(css, /var\(--space-\w+\)/g);
  const hardcodedSpacing = countMatches(css, /(?:margin|padding|gap)\s*:\s*(?!var\()[\d]+(?:px|rem)/g);
  const totalSpacing = varSpaceUsages + hardcodedSpacing;
  if (totalSpacing > 0) {
    const tokenRatio = varSpaceUsages / totalSpacing;
    score += Math.round(tokenRatio * 30);
  } else {
    score += 15; // No spacing declarations found — neutral
  }

  // Check 2: Container max-width matches DSL (20 pts)
  if (dsl.layout.max_width) {
    const dslMaxWidth = dsl.layout.max_width;
    const cssMaxWidth = extractCssVariable(css, '--container-max-width') ||
                         extractCssVariable(css, '--max-width');
    if (cssMaxWidth && cssMaxWidth.includes(dslMaxWidth.replace('px', ''))) {
      score += 20;
    } else if (css.includes(dslMaxWidth)) {
      score += 15;
    } else {
      score += 5;
    }
  } else {
    score += 15; // No max_width specified in DSL
  }

  // Check 3: Grid column count matches DSL (20 pts)
  if (dsl.layout.columns) {
    const gridCols = css.match(/grid-template-columns\s*:[^;]*/g) || [];
    const expectedCols = dsl.layout.columns;
    let matched = false;
    for (const decl of gridCols) {
      const repeatMatch = decl.match(/repeat\(\s*(\d+)/);
      if (repeatMatch && parseInt(repeatMatch[1], 10) === expectedCols) {
        matched = true;
        break;
      }
      // Count explicit column definitions
      const frCount = (decl.match(/\d+fr/g) || []).length;
      if (frCount === expectedCols) {
        matched = true;
        break;
      }
    }
    score += matched ? 20 : (gridCols.length > 0 ? 8 : 0);
  } else {
    score += 15; // No column requirement in DSL
  }

  // Check 4: Consistent alignment (15 pts)
  if (dsl.layout.alignment) {
    const alignment = dsl.layout.alignment;
    const alignDecls = css.match(/text-align\s*:\s*(\w+)/g) || [];
    if (alignment === 'mixed') {
      // Mixed alignment: multiple alignment values = good
      const values = new Set(alignDecls.map(d => d.split(':')[1].trim()));
      score += values.size >= 2 ? 15 : 10;
    } else {
      const matching = alignDecls.filter(d => d.includes(alignment)).length;
      const ratio = alignDecls.length > 0 ? matching / alignDecls.length : 0.5;
      score += Math.round(ratio * 15);
    }
  } else {
    score += 10;
  }

  // Check 5: Section spacing uses token (15 pts)
  const sectionGapUsage = countMatches(css, /var\(--section-gap\)/g);
  if (sectionGapUsage > 0) score += 15;
  else {
    // Check if sections use any var() for padding
    const sectionVarPadding = css.match(/section\s*\{[^}]*var\(/);
    score += sectionVarPadding ? 10 : 3;
  }

  return Math.min(100, score);
}

/**
 * Evaluate interaction polish from CSS.
 * Checks: hover rules, focus-visible, transitions, active states.
 */
export function evaluateInteraction(css: string): number {
  let score = 0;

  // Check 1: Interactive elements have :hover rules (30 pts)
  const hoverRules = countMatches(css, /:hover\s*\{/g);
  if (hoverRules >= 4) score += 30;
  else if (hoverRules >= 2) score += 20;
  else if (hoverRules >= 1) score += 10;

  // Check 2: :focus-visible coverage (30 pts)
  const focusVisible = countMatches(css, /:focus-visible\s*\{/g);
  const focusRules = countMatches(css, /:focus\s*\{/g);
  const totalFocus = focusVisible + focusRules;
  if (totalFocus >= 3) score += 30;
  else if (totalFocus >= 1) score += 15;

  // Check 3: Transitions are smooth (20 pts)
  const transitions = countMatches(css, /transition\s*:[^;]*\d+m?s/g);
  if (transitions >= 3) score += 20;
  else if (transitions >= 1) score += 12;

  // Check 4: :active state for buttons (20 pts)
  const activeRules = countMatches(css, /:active\s*\{/g);
  if (activeRules >= 2) score += 20;
  else if (activeRules >= 1) score += 12;

  return Math.min(100, score);
}

/**
 * Evaluate responsiveness from CSS.
 * Checks: breakpoint count, mobile/tablet breakpoints, overflow safety.
 */
export function evaluateResponsiveness(css: string): number {
  let score = 0;

  // Extract all media query breakpoints
  const mediaQueries = css.match(/@media[^{]*/g) || [];
  const breakpoints: number[] = [];
  for (const mq of mediaQueries) {
    const widthMatch = mq.match(/(?:max|min)-width\s*:\s*(\d+)/);
    if (widthMatch) breakpoints.push(parseInt(widthMatch[1], 10));
  }

  // Check 1: At least 2 breakpoints defined (25 pts)
  if (breakpoints.length >= 3) score += 25;
  else if (breakpoints.length >= 2) score += 20;
  else if (breakpoints.length >= 1) score += 10;

  // Check 2: Mobile breakpoint <= 480px exists (25 pts)
  const hasMobile = breakpoints.some(bp => bp <= 480);
  if (hasMobile) score += 25;
  else if (breakpoints.some(bp => bp <= 640)) score += 15;

  // Check 3: Tablet breakpoint ~768px exists (25 pts)
  const hasTablet = breakpoints.some(bp => bp >= 640 && bp <= 1024);
  if (hasTablet) score += 25;

  // Check 4: No overflow indicators + image safety (25 pts)
  const hasImgMaxWidth = css.includes('max-width: 100%') || css.includes('max-width:100%');
  const hasBoxSizing = css.includes('box-sizing: border-box') || css.includes('box-sizing:border-box');
  if (hasImgMaxWidth && hasBoxSizing) score += 25;
  else if (hasImgMaxWidth || hasBoxSizing) score += 15;
  else score += 5;

  return Math.min(100, score);
}

/**
 * Evaluate design system consistency from CSS and HTML.
 * Checks: var() usage ratio, inline styles, consistent radii, hardcoded colors.
 */
export function evaluateConsistency(css: string, html: string): number {
  let score = 0;

  // Check 1: var() usage ratio >= 0.8 for color and spacing values (40 pts)
  const varUsages = countMatches(css, /var\(--[\w-]+\)/g);
  // Count hardcoded hex colors outside :root
  const rootBlock = css.match(/:root\s*\{[^}]*\}/s);
  const cssWithoutRoot = rootBlock ? css.replace(rootBlock[0], '') : css;
  const hardcodedHex = countMatches(cssWithoutRoot, /#[0-9a-fA-F]{3,8}\b/g);
  // Count hardcoded px values for spacing (not in :root or var declarations)
  const hardcodedPx = countMatches(cssWithoutRoot, /:\s*\d+px(?!\s*\))/g);
  const hardcodedTotal = hardcodedHex + hardcodedPx;
  const totalValues = varUsages + hardcodedTotal;

  let tokenRatio = 1;
  if (totalValues > 0) {
    tokenRatio = varUsages / totalValues;
  }
  if (tokenRatio >= 0.8) score += 40;
  else if (tokenRatio >= 0.6) score += 25;
  else if (tokenRatio >= 0.4) score += 15;
  else score += 5;

  // Check 2: No inline styles in HTML (20 pts)
  const inlineStyles = countMatches(html, /style\s*=\s*["']/g);
  if (inlineStyles === 0) score += 20;
  else if (inlineStyles <= 2) score += 12;
  else if (inlineStyles <= 5) score += 5;

  // Check 3: Consistent border-radius values use tokens (20 pts)
  const varRadii = countMatches(css, /var\(--radius-[\w-]+\)/g);
  const hardcodedRadii = countMatches(cssWithoutRoot, /border-radius\s*:\s*(?!var\()[\d]+/g);
  const totalRadii = varRadii + hardcodedRadii;
  if (totalRadii === 0) {
    score += 15; // No radii used — neutral
  } else {
    const radiiRatio = varRadii / totalRadii;
    score += Math.round(radiiRatio * 20);
  }

  // Check 4: Consistent color references (20 pts)
  // Colors outside :root should use var() not raw hex
  if (hardcodedHex <= 2) score += 20;
  else if (hardcodedHex <= 5) score += 12;
  else if (hardcodedHex <= 10) score += 5;

  return Math.min(100, score);
}

/**
 * Evaluate Intent Fidelity: how well the output matches the DSL input.
 */
export function evaluateIntentFidelity(
  css: string,
  html: string,
  dsl: DesignDSL,
  compiled: CompileResult
): IFSResult {
  // 1. Style variable match — compare CSS vars against compiled output
  const compiledVars = extractAllCssVariables(compiled.variablesCss);
  const generatedVars = extractAllCssVariables(css);
  let matchCount = 0;
  let totalChecked = 0;
  for (const [key, expectedVal] of Object.entries(compiledVars)) {
    totalChecked++;
    if (generatedVars[key] !== undefined) {
      // Allow minor whitespace/formatting differences
      if (generatedVars[key].replace(/\s/g, '') === expectedVal.replace(/\s/g, '')) {
        matchCount++;
      }
    }
  }
  const style_match = totalChecked > 0 ? (matchCount / totalChecked) > 0.9 : true;

  // 2. Section coverage
  const expectedSections = dsl.sections || [];
  const foundSections = extractSections(html);
  const htmlLower = html.toLowerCase();
  let sectionsFound = 0;
  const missingSections: string[] = [];
  for (const sec of expectedSections) {
    const secLower = sec.toLowerCase().replace(/[^a-z0-9]/g, '');
    const found = foundSections.some(fs =>
      fs.toLowerCase().replace(/[^a-z0-9]/g, '').includes(secLower)
    ) || htmlLower.includes(`id="${sec.toLowerCase()}"`) || htmlLower.includes(secLower);
    if (found) sectionsFound++;
    else missingSections.push(sec);
  }
  const section_coverage = expectedSections.length > 0
    ? sectionsFound / expectedSections.length
    : 1; // No sections specified = full coverage by default

  // 3. Color accuracy
  const colorChecks = [
    { key: '--color-primary', expected: dsl.color.primary },
    { key: '--color-accent', expected: dsl.color.accent },
    { key: '--color-background', expected: dsl.color.background },
    { key: '--color-text', expected: dsl.color.text },
  ].filter(c => c.expected);

  let colorMatches = 0;
  for (const { key, expected } of colorChecks) {
    const actual = generatedVars[key];
    if (actual && expected) {
      const dist = hexDistance(actual.trim(), expected.trim());
      if (dist <= 15) colorMatches++; // Tolerance: ~5 per RGB channel
    }
  }
  const color_accuracy = colorChecks.length > 0 ? colorMatches / colorChecks.length : 1;

  // 4. Typography match
  const fontPairing = dsl.typography.font_pairing;
  const cssLower = css.toLowerCase();
  const typography_match =
    cssLower.includes(fontPairing[0].toLowerCase()) &&
    cssLower.includes(fontPairing[1].toLowerCase());

  // 5. Layout compliance
  let layout_compliance = true;
  if (dsl.layout.max_width && dsl.layout.max_width !== 'full') {
    layout_compliance = css.includes(dsl.layout.max_width) ||
      css.includes(dsl.layout.max_width.replace('px', ''));
  }

  // Compute total
  const total = Math.round(
    (style_match ? 25 : 0) +
    section_coverage * 25 +
    color_accuracy * 20 +
    (typography_match ? 15 : 0) +
    (layout_compliance ? 15 : 0)
  );

  return {
    total,
    style_match,
    section_coverage,
    color_accuracy,
    typography_match,
    layout_compliance,
  };
}

// ─── Diversity Score ───

export interface DiversityResult {
  score: number;                      // 0-1, mean pairwise cosine distance
  css_variable_uniqueness: number;    // 0-1
  min_pairwise_distance: number;      // 0-1, most similar pair
  most_similar_pair: [string, string];
}

interface PresetFeatureVector {
  name: string;
  features: number[];
}

const FONT_CATEGORY: Record<string, number> = {};

function fontCategory(fontName: string): number {
  const lower = fontName.toLowerCase();
  if (lower.includes('mono') || lower.includes('jetbrains') || lower.includes('fira code')) return 2;
  if (lower.includes('serif') && !lower.includes('sans')) return 1;
  if (lower.includes('playfair') || lower.includes('lora') || lower.includes('dm serif')) return 1;
  return 0; // sans-serif default
}

const LAYOUT_TYPE_INDEX: Record<string, number> = {
  'single-column': 0, 'grid': 1, 'asymmetric': 2,
  'reading-column': 3, 'split': 4, 'magazine': 5,
};

const MOTION_TYPE_INDEX: Record<string, number> = {
  'none': 0, 'subtle-fade': 1, 'fade-in': 2, 'slide-up': 3,
  'stagger': 4, 'scroll-driven': 5, 'micro-interaction': 6,
};

const DENSITY_INDEX: Record<string, number> = {
  'low': 0, 'medium': 1, 'high': 2,
};

function extractFeatureVector(dsl: DesignDSL): number[] {
  const primary = dsl.color.primary || '#000000';
  const accent = dsl.color.accent || '#000000';
  const bg = dsl.color.background || '#ffffff';

  return [
    hexToHue(primary) / 360,
    hexToHue(accent) / 360,
    hexToLightness(bg),
    fontCategory(dsl.typography.font_pairing[0]),
    fontCategory(dsl.typography.font_pairing[1]),
    LAYOUT_TYPE_INDEX[dsl.layout.type] ?? 0,
    MOTION_TYPE_INDEX[dsl.motion.type] ?? 0,
    (dsl.layout.columns || 1) / 4,
    (() => {
      if (!dsl.layout.max_width || dsl.layout.max_width === 'full') return 1;
      const px = parseMaxWidth(dsl.layout.max_width);
      return px ? (px - 720) / (1440 - 720) : 0.5;
    })(),
    (DENSITY_INDEX[dsl.density] ?? 1) / 2,
  ];
}

function cosineDistance(a: number[], b: number[]): number {
  let dot = 0, magA = 0, magB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }
  magA = Math.sqrt(magA);
  magB = Math.sqrt(magB);
  if (magA === 0 || magB === 0) return 1;
  const similarity = dot / (magA * magB);
  return 1 - similarity;
}

/**
 * Compute diversity across a set of DSL presets and their compiled outputs.
 */
export function evaluateDiversity(
  presets: Array<{ name: string; dsl: DesignDSL; compiled: CompileResult }>
): DiversityResult {
  // 1. Feature vectors + pairwise cosine distance
  const vectors = presets.map(p => ({
    name: p.name,
    features: extractFeatureVector(p.dsl),
  }));

  let sumDistance = 0;
  let minDistance = Infinity;
  let minPair: [string, string] = ['', ''];
  let pairCount = 0;

  for (let i = 0; i < vectors.length; i++) {
    for (let j = i + 1; j < vectors.length; j++) {
      const d = cosineDistance(vectors[i].features, vectors[j].features);
      sumDistance += d;
      pairCount++;
      if (d < minDistance) {
        minDistance = d;
        minPair = [vectors[i].name, vectors[j].name];
      }
    }
  }

  const meanDistance = pairCount > 0 ? sumDistance / pairCount : 0;

  // 2. CSS variable uniqueness
  const allVarSets: Set<string>[] = presets.map(p => {
    const vars = extractAllCssVariables(p.compiled.variablesCss);
    return new Set(Object.values(vars).map(v => v.trim()));
  });

  const allValuesFlat = allVarSets.flatMap(s => [...s]);
  const uniqueValues = new Set(allValuesFlat);
  const css_variable_uniqueness = allValuesFlat.length > 0
    ? uniqueValues.size / allValuesFlat.length
    : 0;

  return {
    score: Math.min(1, meanDistance),
    css_variable_uniqueness,
    min_pairwise_distance: minDistance === Infinity ? 0 : minDistance,
    most_similar_pair: minPair,
  };
}

// ─── Main Entry Point ───

const DQS_WEIGHTS = {
  hierarchy_clarity: 0.20,
  color_harmony: 0.15,
  typography_quality: 0.15,
  layout_precision: 0.20,
  interaction_polish: 0.10,
  responsiveness: 0.10,
  consistency: 0.10,
} as const;

/**
 * Evaluate a generated website against its Design DSL specification.
 *
 * @param html - The generated HTML string
 * @param css - The generated CSS string (all stylesheets concatenated)
 * @param dsl - The input Design DSL
 * @param compiled - The deterministic compile output from dsl-engine
 * @returns EvalResult with DQS, IFS, and detailed findings
 */
export function evaluate(
  html: string,
  css: string,
  dsl: DesignDSL,
  compiled: CompileResult
): EvalResult {
  // Compute DQS sub-dimensions
  const hierarchy_clarity = evaluateHierarchy(html);
  const color_harmony = evaluateColorHarmony(css, dsl);
  const typography_quality = evaluateTypography(css, html);
  const layout_precision = evaluateLayout(css, html, dsl);
  const interaction_polish = evaluateInteraction(css);
  const responsiveness = evaluateResponsiveness(css);
  const consistency = evaluateConsistency(css, html);

  const dqsTotal = Math.round(
    DQS_WEIGHTS.hierarchy_clarity * hierarchy_clarity +
    DQS_WEIGHTS.color_harmony * color_harmony +
    DQS_WEIGHTS.typography_quality * typography_quality +
    DQS_WEIGHTS.layout_precision * layout_precision +
    DQS_WEIGHTS.interaction_polish * interaction_polish +
    DQS_WEIGHTS.responsiveness * responsiveness +
    DQS_WEIGHTS.consistency * consistency
  );

  const dqs: DQSResult = {
    total: dqsTotal,
    hierarchy_clarity,
    color_harmony,
    typography_quality,
    layout_precision,
    interaction_polish,
    responsiveness,
    consistency,
  };

  // Compute IFS
  const ifs = evaluateIntentFidelity(css, html, dsl, compiled);

  // Collect details
  const contrast_violations: string[] = [];
  const textColor = dsl.color.text || '#000000';
  const bgColor = dsl.color.background || '#ffffff';
  const textContrast = contrastRatio(textColor, bgColor);
  if (textContrast < 4.5) {
    contrast_violations.push(
      `Text (${textColor}) vs Background (${bgColor}): ${textContrast.toFixed(2)}:1 < 4.5:1 required`
    );
  }
  if (dsl.color.accent) {
    const accentContrast = contrastRatio(dsl.color.accent, bgColor);
    if (accentContrast < 3.0) {
      contrast_violations.push(
        `Accent (${dsl.color.accent}) vs Background (${bgColor}): ${accentContrast.toFixed(2)}:1 < 3.0:1 required`
      );
    }
  }

  // Token violations
  const rootBlock = css.match(/:root\s*\{[^}]*\}/s);
  const cssWithoutRoot = rootBlock ? css.replace(rootBlock[0], '') : css;
  const hardcodedHexMatches = cssWithoutRoot.match(/#[0-9a-fA-F]{3,8}\b/g) || [];
  const token_violations = hardcodedHexMatches.map(hex => `Hardcoded color: ${hex}`);

  // Missing sections
  const missing_sections = ifs.section_coverage < 1
    ? (dsl.sections || []).filter(sec => {
        const htmlLower = html.toLowerCase();
        return !htmlLower.includes(sec.toLowerCase().replace(/[^a-z0-9]/g, ''));
      })
    : [];

  const hardcoded_values = hardcodedHexMatches.length +
    countMatches(cssWithoutRoot, /(?:margin|padding|gap)\s*:\s*(?!var\()[\d]+(?:px|rem)/g);

  return {
    dqs,
    ifs,
    details: {
      contrast_violations,
      token_violations,
      missing_sections,
      hardcoded_values,
    },
  };
}
