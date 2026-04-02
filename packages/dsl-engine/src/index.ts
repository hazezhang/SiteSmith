/**
 * @sitesmith/dsl-engine
 *
 * Deterministic Design DSL compiler.
 * 7-dimension design language → CSS variables / base styles / interactions / JS.
 * Zero runtime dependencies. LLM-agnostic. Platform-independent.
 */

export { compile } from './compiler/index';
export { validate } from './schema/validator';
export { getPreset, listPresets, resolveWithPreset } from './presets/index';

// Re-export all types
export type {
  DesignDSL,
  StyleName,
  LayoutConfig,
  TypographyConfig,
  ColorConfig,
  InteractionConfig,
  MotionConfig,
  CompileResult,
  ValidationResult,
  ValidationError,
  LayoutType,
  DensityLevel,
  ColorMode,
  HoverStyle,
  MotionType,
  WeightStrategy,
  InteractionLevel,
} from './types';
