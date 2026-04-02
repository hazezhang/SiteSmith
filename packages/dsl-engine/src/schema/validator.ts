import type { DesignDSL, ValidationResult, ValidationError } from '../types';

const VALID_STYLES = ['minimal', 'modern', 'creative', 'editorial', 'product', 'cyberpunk', 'portfolio', 'warm'];
const VALID_LAYOUTS = ['single-column', 'grid', 'asymmetric', 'reading-column', 'split', 'magazine'];
const VALID_DENSITIES = ['low', 'medium', 'high'];
const VALID_COLOR_MODES = ['monochrome', 'neutral', 'soft', 'vibrant', 'dark'];
const VALID_HOVERS = ['opacity', 'scale', 'shadow-lift', 'color-shift', 'underline', 'none'];
const VALID_MOTION_TYPES = ['none', 'subtle-fade', 'fade-in', 'slide-up', 'stagger', 'scroll-driven', 'micro-interaction'];

export function validate(dsl: DesignDSL): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];

  // Required fields
  if (!dsl.style) errors.push({ field: 'style', message: 'style is required', severity: 'error' });
  if (!dsl.layout) errors.push({ field: 'layout', message: 'layout is required', severity: 'error' });
  if (!dsl.density) errors.push({ field: 'density', message: 'density is required', severity: 'error' });
  if (!dsl.typography) errors.push({ field: 'typography', message: 'typography is required', severity: 'error' });
  if (!dsl.color) errors.push({ field: 'color', message: 'color is required', severity: 'error' });
  if (!dsl.interaction) errors.push({ field: 'interaction', message: 'interaction is required', severity: 'error' });
  if (!dsl.motion) errors.push({ field: 'motion', message: 'motion is required', severity: 'error' });

  if (errors.length > 0) return { valid: false, errors, warnings };

  // Enum validation
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

  // Cross-dimension conflict rules
  if (dsl.density === 'low' && dsl.layout.type === 'grid' && (dsl.layout.columns ?? 2) > 3)
    warnings.push({ field: 'density+layout', message: 'Low density with >3 grid columns may feel empty', severity: 'warning' });

  if (dsl.color.mode === 'monochrome' && dsl.color.contrast === 'low')
    warnings.push({ field: 'color', message: 'Monochrome + low contrast may hurt readability', severity: 'warning' });

  if (dsl.motion.reduced_motion === false)
    warnings.push({ field: 'motion.reduced_motion', message: 'reduced_motion should be true for accessibility', severity: 'warning' });

  const pw = parseInt(dsl.typography.paragraph_width ?? '65ch', 10);
  if (pw > 75)
    warnings.push({ field: 'typography.paragraph_width', message: `${pw}ch exceeds recommended 75ch max for readability`, severity: 'warning' });

  return { valid: errors.length === 0, errors, warnings };
}
