// ─── Design DSL Type System ───
// Mirrors .designurpage/dsl/schema.md exactly
// 10-dimension design language: style, layout, density, typography, color, interaction, motion, hierarchy, spacing, information

export type StyleName =
  | 'minimal' | 'modern' | 'creative' | 'editorial'
  | 'product' | 'cyberpunk' | 'portfolio' | 'warm';

export type LayoutType =
  | 'single-column' | 'grid' | 'asymmetric'
  | 'reading-column' | 'split' | 'magazine';

export type DensityLevel = 'low' | 'medium' | 'high';

export type WeightStrategy = 'uniform' | 'contrast' | 'heavy-headings';

export type ColorMode = 'monochrome' | 'neutral' | 'soft' | 'vibrant' | 'dark';

export type ContrastLevel = 'low' | 'medium' | 'high';

export type HoverStyle =
  | 'opacity' | 'scale' | 'shadow-lift'
  | 'color-shift' | 'underline' | 'none';

export type ClickFeedback = 'none' | 'subtle-scale' | 'ripple';

export type FocusStyle = 'ring' | 'outline' | 'glow';

export type ScrollBehavior = 'auto' | 'smooth';

export type InteractionLevel = 'low' | 'medium' | 'high';

export type MotionType =
  | 'none' | 'subtle-fade' | 'fade-in' | 'slide-up'
  | 'stagger' | 'scroll-driven' | 'micro-interaction';

export type LetterSpacing = 'tight' | 'normal' | 'wide';

export type SectionSpacing = 'compact' | 'default' | 'generous';

export type Alignment = 'left' | 'center' | 'right' | 'mixed';

// ─── New dimension types (v0.2) ───

export type HierarchyDepth = 'flat' | 'moderate' | 'deep';

export type ContrastStrategy = 'typography' | 'color' | 'space' | 'mixed';

export type SpacingBase = '4px' | '8px';

export type Rhythm = 'tight' | 'balanced' | 'airy';

export type ContentStructure = 'linear' | 'modular' | 'hub';

export type Scannability = 'low' | 'medium' | 'high';

export type NavigationPattern = 'top' | 'side' | 'minimal' | 'hidden';

export type Discoverability = 'explicit' | 'progressive' | 'implicit';

export type CognitiveLoad = 'low' | 'medium' | 'high';

export type FeedbackStrength = 'none' | 'subtle' | 'medium' | 'strong';

export type PersonalityTrait =
  | 'calm' | 'energetic' | 'premium' | 'playful'
  | 'rational' | 'expressive' | 'warm' | 'cool'
  | 'minimal' | 'bold' | 'elegant' | 'technical'
  | 'friendly' | 'authoritative' | 'artistic' | 'clean';

// ─── Dimension Configs ───

export interface LayoutConfig {
  type: LayoutType;
  grid?: boolean;
  columns?: number;
  alignment?: Alignment;
  max_width?: string;
  section_spacing?: SectionSpacing;
}

export interface TypographyConfig {
  font_pairing: [string, string];
  scale?: string;
  base_size?: string;
  line_height?: string;
  weight_strategy?: WeightStrategy;
  letter_spacing?: LetterSpacing;
  paragraph_width?: string;
}

export interface ColorConfig {
  mode: ColorMode;
  primary?: string;
  accent?: string;
  background?: string;
  text?: string;
  contrast?: ContrastLevel;
  dark_mode?: boolean;
}

export interface InteractionConfig {
  level?: InteractionLevel;
  hover?: HoverStyle;
  click_feedback?: ClickFeedback;
  focus?: FocusStyle;
  scroll_behavior?: ScrollBehavior;
  discoverability?: Discoverability;
  cognitive_load?: CognitiveLoad;
}

export interface MotionConfig {
  type: MotionType;
  duration?: string;
  easing?: string;
  reduced_motion?: boolean;
  entrance?: string;
  feedback_strength?: FeedbackStrength;
}

export interface HierarchyConfig {
  depth: HierarchyDepth;
  primary_focus?: string;
  contrast_strategy?: ContrastStrategy;
}

export interface SpacingConfig {
  base: SpacingBase;
  rhythm: Rhythm;
  alignment?: Alignment;
}

export interface InformationConfig {
  structure: ContentStructure;
  scannability?: Scannability;
  navigation?: NavigationPattern;
}

// ─── Top-level DSL ───

export interface DesignDSL {
  $schema?: string;
  style: StyleName;
  layout: LayoutConfig;
  density: DensityLevel;
  typography: TypographyConfig;
  color: ColorConfig;
  interaction: InteractionConfig;
  motion: MotionConfig;
  hierarchy?: HierarchyConfig;
  spacing?: SpacingConfig;
  information?: InformationConfig;
  personality?: string | PersonalityTrait[];
  sections?: string[];
}

// ─── Output Types ───

export interface CompileResult {
  variablesCss: string;
  baseCss: string;
  interactionsCss: string;
  interactionsJs: string;
  fontImportUrl: string;
  warnings: string[];
}

export interface ValidationError {
  field: string;
  message: string;
  severity: 'error' | 'warning';
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
}
