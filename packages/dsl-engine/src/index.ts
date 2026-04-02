/**
 * @sitesmith/dsl-engine
 *
 * Deterministic Design DSL compiler.
 * 10-dimension design language → CSS variables / base styles / interactions / JS.
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
  HierarchyConfig,
  SpacingConfig,
  InformationConfig,
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
  HierarchyDepth,
  ContrastStrategy,
  SpacingBase,
  Rhythm,
  ContentStructure,
  Scannability,
  NavigationPattern,
  Discoverability,
  CognitiveLoad,
  FeedbackStrength,
  PersonalityTrait,
} from './types';
