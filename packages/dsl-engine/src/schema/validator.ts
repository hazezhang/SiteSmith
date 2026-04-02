import type { DesignDSL, ValidationResult, ValidationError } from '../types';

const VALID_STYLES = ['minimal', 'modern', 'creative', 'editorial', 'product', 'cyberpunk', 'portfolio', 'warm'];
const VALID_LAYOUTS = ['single-column', 'grid', 'asymmetric', 'reading-column', 'split', 'magazine'];
const VALID_DENSITIES = ['low', 'medium', 'high'];
const VALID_COLOR_MODES = ['monochrome', 'neutral', 'soft', 'vibrant', 'dark'];
const VALID_HOVERS = ['opacity', 'scale', 'shadow-lift', 'color-shift', 'underline', 'none'];
const VALID_MOTION_TYPES = ['none', 'subtle-fade', 'fade-in', 'slide-up', 'stagger', 'scroll-driven', 'micro-interaction'];
const VALID_HIERARCHY_DEPTHS = ['flat', 'moderate', 'deep'];
const VALID_CONTRAST_STRATEGIES = ['typography', 'color', 'space', 'mixed'];
const VALID_SPACING_BASES = ['4px', '8px'];
const VALID_RHYTHMS = ['tight', 'balanced', 'airy'];
const VALID_CONTENT_STRUCTURES = ['linear', 'modular', 'hub'];
const VALID_SCANNABILITIES = ['low', 'medium', 'high'];
const VALID_NAVIGATION_PATTERNS = ['top', 'side', 'minimal', 'hidden'];
const VALID_DISCOVERABILITIES = ['explicit', 'progressive', 'implicit'];
const VALID_COGNITIVE_LOADS = ['low', 'medium', 'high'];
const VALID_FEEDBACK_STRENGTHS = ['none', 'subtle', 'medium', 'strong'];

export function validate(dsl: DesignDSL): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];

  // Required fields (original 7 dimensions)
  if (!dsl.style) errors.push({ field: 'style', message: 'style is required', severity: 'error' });
  if (!dsl.layout) errors.push({ field: 'layout', message: 'layout is required', severity: 'error' });
  if (!dsl.density) errors.push({ field: 'density', message: 'density is required', severity: 'error' });
  if (!dsl.typography) errors.push({ field: 'typography', message: 'typography is required', severity: 'error' });
  if (!dsl.color) errors.push({ field: 'color', message: 'color is required', severity: 'error' });
  if (!dsl.interaction) errors.push({ field: 'interaction', message: 'interaction is required', severity: 'error' });
  if (!dsl.motion) errors.push({ field: 'motion', message: 'motion is required', severity: 'error' });

  if (errors.length > 0) return { valid: false, errors, warnings };

  // Enum validation — original 7 dimensions
  if (!VALID_STYLES.includes(dsl.style))
    errors.push({ field: 'style', message: `Invalid style: ${dsl.style}. Must be one of: ${VALID_STYLES.join(', ')}`, severity: 'error' });
  if (!VALID_LAYOUTS.includes(dsl.layout.type))
    errors.push({ field: 'layout.type', message: `Invalid layout type: ${dsl.layout.type}`, severity: 'error' });
  if (!VALID_DENSITIES.includes(dsl.density))
    errors.push({ field: 'density', message: `Invalid density: ${dsl.density}`, severity: 'error' });
  if (!VALID_COLOR_MODES.includes(dsl.color.mode))
    errors.push({ field: 'color.mode', message: `Invalid color mode: ${dsl.color.mode}`, severity: 'error' });
  if (dsl.interaction.hover && !VALID_HOVERS.includes(dsl.interaction.hover))
    errors.push({ field: 'interaction.hover', message: `Invalid hover: ${dsl.interaction.hover}`, severity: 'error' });
  if (!VALID_MOTION_TYPES.includes(dsl.motion.type))
    errors.push({ field: 'motion.type', message: `Invalid motion type: ${dsl.motion.type}`, severity: 'error' });

  // Enum validation — new dimensions (optional, validate if present)
  if (dsl.hierarchy) {
    if (!VALID_HIERARCHY_DEPTHS.includes(dsl.hierarchy.depth))
      errors.push({ field: 'hierarchy.depth', message: `Invalid hierarchy depth: ${dsl.hierarchy.depth}`, severity: 'error' });
    if (dsl.hierarchy.contrast_strategy && !VALID_CONTRAST_STRATEGIES.includes(dsl.hierarchy.contrast_strategy))
      errors.push({ field: 'hierarchy.contrast_strategy', message: `Invalid contrast strategy: ${dsl.hierarchy.contrast_strategy}`, severity: 'error' });
  }

  if (dsl.spacing) {
    if (!VALID_SPACING_BASES.includes(dsl.spacing.base))
      errors.push({ field: 'spacing.base', message: `Invalid spacing base: ${dsl.spacing.base}. Must be 4px or 8px`, severity: 'error' });
    if (!VALID_RHYTHMS.includes(dsl.spacing.rhythm))
      errors.push({ field: 'spacing.rhythm', message: `Invalid rhythm: ${dsl.spacing.rhythm}`, severity: 'error' });
  }

  if (dsl.information) {
    if (!VALID_CONTENT_STRUCTURES.includes(dsl.information.structure))
      errors.push({ field: 'information.structure', message: `Invalid content structure: ${dsl.information.structure}`, severity: 'error' });
    if (dsl.information.scannability && !VALID_SCANNABILITIES.includes(dsl.information.scannability))
      errors.push({ field: 'information.scannability', message: `Invalid scannability: ${dsl.information.scannability}`, severity: 'error' });
    if (dsl.information.navigation && !VALID_NAVIGATION_PATTERNS.includes(dsl.information.navigation))
      errors.push({ field: 'information.navigation', message: `Invalid navigation pattern: ${dsl.information.navigation}`, severity: 'error' });
  }

  // Expanded interaction fields
  if (dsl.interaction.discoverability && !VALID_DISCOVERABILITIES.includes(dsl.interaction.discoverability))
    errors.push({ field: 'interaction.discoverability', message: `Invalid discoverability: ${dsl.interaction.discoverability}`, severity: 'error' });
  if (dsl.interaction.cognitive_load && !VALID_COGNITIVE_LOADS.includes(dsl.interaction.cognitive_load))
    errors.push({ field: 'interaction.cognitive_load', message: `Invalid cognitive_load: ${dsl.interaction.cognitive_load}`, severity: 'error' });
  if (dsl.motion.feedback_strength && !VALID_FEEDBACK_STRENGTHS.includes(dsl.motion.feedback_strength))
    errors.push({ field: 'motion.feedback_strength', message: `Invalid feedback_strength: ${dsl.motion.feedback_strength}`, severity: 'error' });

  // ─── Cross-dimension conflict rules ───

  // Original rules
  if (dsl.density === 'low' && dsl.layout.type === 'grid' && (dsl.layout.columns ?? 2) > 3)
    warnings.push({ field: 'density+layout', message: 'Low density with >3 grid columns may feel empty', severity: 'warning' });

  if (dsl.color.mode === 'monochrome' && dsl.color.contrast === 'low')
    warnings.push({ field: 'color', message: 'Monochrome + low contrast may hurt readability', severity: 'warning' });

  if (dsl.motion.reduced_motion === false)
    warnings.push({ field: 'motion.reduced_motion', message: 'reduced_motion should be true for accessibility', severity: 'warning' });

  const pw = parseInt(dsl.typography.paragraph_width ?? '65ch', 10);
  if (pw > 75)
    warnings.push({ field: 'typography.paragraph_width', message: `${pw}ch exceeds recommended 75ch max for readability`, severity: 'warning' });

  // New cross-dimension rules
  if (dsl.hierarchy?.depth === 'deep' && dsl.density === 'high')
    warnings.push({ field: 'hierarchy+density', message: 'Deep hierarchy with high density creates visual overload — consider reducing one', severity: 'warning' });

  if (dsl.spacing?.rhythm === 'tight' && dsl.density === 'low')
    warnings.push({ field: 'spacing+density', message: 'Tight rhythm conflicts with low density — content may feel cramped despite sparse data', severity: 'warning' });

  if (dsl.information?.navigation === 'hidden' && dsl.interaction?.cognitive_load === 'low')
    warnings.push({ field: 'information+interaction', message: 'Hidden navigation increases cognitive load — conflicts with low cognitive_load goal', severity: 'warning' });

  if (dsl.information?.scannability === 'high' && dsl.information?.structure === 'linear')
    warnings.push({ field: 'information', message: 'High scannability works better with modular structure — linear layout reduces scan efficiency', severity: 'warning' });

  if (dsl.motion?.feedback_strength === 'strong' && dsl.interaction?.level === 'low')
    warnings.push({ field: 'motion+interaction', message: 'Strong feedback strength may feel excessive with low interaction level', severity: 'warning' });

  return { valid: errors.length === 0, errors, warnings };
}
