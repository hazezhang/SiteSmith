import type { DesignDSL, StyleName } from '../types';

const minimal: DesignDSL = {
  style: 'minimal',
  layout: { type: 'single-column', alignment: 'center', max_width: '720px', section_spacing: 'generous' },
  density: 'low',
  typography: { font_pairing: ['Inter', 'Inter'], scale: '1.25', base_size: '18px', line_height: '1.6', weight_strategy: 'contrast', paragraph_width: '65ch' },
  color: { mode: 'monochrome', primary: '#171717', accent: '#007aff', background: '#fafafa', text: '#171717', contrast: 'high' },
  interaction: { level: 'low', hover: 'opacity', click_feedback: 'subtle-scale', focus: 'ring', scroll_behavior: 'smooth', discoverability: 'explicit', cognitive_load: 'low' },
  motion: { type: 'subtle-fade', duration: '200ms', easing: 'ease-out', reduced_motion: true, feedback_strength: 'subtle' },
  hierarchy: { depth: 'flat', contrast_strategy: 'space' },
  spacing: { base: '8px', rhythm: 'airy', alignment: 'center' },
  information: { structure: 'linear', scannability: 'high', navigation: 'minimal' },
  personality: ['calm', 'premium', 'clean'],
};

const modern: DesignDSL = {
  style: 'modern',
  layout: { type: 'grid', grid: true, columns: 2, alignment: 'center', max_width: '1200px', section_spacing: 'default' },
  density: 'medium',
  typography: { font_pairing: ['Plus Jakarta Sans', 'Inter'], scale: '1.25', base_size: '16px', line_height: '1.5', weight_strategy: 'contrast', paragraph_width: '65ch' },
  color: { mode: 'neutral', primary: '#2563eb', accent: '#f59e0b', background: '#ffffff', text: '#1e293b', contrast: 'high' },
  interaction: { level: 'medium', hover: 'shadow-lift', click_feedback: 'subtle-scale', focus: 'ring', scroll_behavior: 'smooth', discoverability: 'explicit', cognitive_load: 'low' },
  motion: { type: 'fade-in', duration: '200ms', easing: 'ease-out', reduced_motion: true, entrance: 'slide-up', feedback_strength: 'medium' },
  hierarchy: { depth: 'moderate', contrast_strategy: 'mixed' },
  spacing: { base: '8px', rhythm: 'balanced', alignment: 'center' },
  information: { structure: 'modular', scannability: 'high', navigation: 'top' },
  personality: ['rational', 'friendly', 'clean'],
};

const creative: DesignDSL = {
  style: 'creative',
  layout: { type: 'asymmetric', grid: true, alignment: 'mixed', max_width: 'full', section_spacing: 'generous' },
  density: 'medium',
  typography: { font_pairing: ['Space Grotesk', 'DM Sans'], scale: '1.333', base_size: '18px', line_height: '1.5', weight_strategy: 'heavy-headings', letter_spacing: 'tight', paragraph_width: '55ch' },
  color: { mode: 'vibrant', primary: '#7c3aed', accent: '#f43f5e', background: '#fafafa', text: '#0f172a', contrast: 'high' },
  interaction: { level: 'high', hover: 'scale', click_feedback: 'ripple', focus: 'glow', scroll_behavior: 'smooth', discoverability: 'progressive', cognitive_load: 'high' },
  motion: { type: 'scroll-driven', duration: '300ms', easing: 'spring', reduced_motion: true, entrance: 'clip', feedback_strength: 'strong' },
  hierarchy: { depth: 'deep', contrast_strategy: 'color' },
  spacing: { base: '8px', rhythm: 'airy', alignment: 'mixed' },
  information: { structure: 'hub', scannability: 'medium', navigation: 'hidden' },
  personality: ['expressive', 'bold', 'artistic'],
};

const editorial: DesignDSL = {
  style: 'editorial',
  layout: { type: 'reading-column', alignment: 'left', max_width: '720px', section_spacing: 'generous' },
  density: 'medium',
  typography: { font_pairing: ['Playfair Display', 'Source Sans 3'], scale: '1.2', base_size: '18px', line_height: '1.8', weight_strategy: 'contrast', letter_spacing: 'normal', paragraph_width: '65ch' },
  color: { mode: 'soft', primary: '#1e293b', accent: '#b45309', background: '#faf8f5', text: '#1e293b', contrast: 'medium' },
  interaction: { level: 'low', hover: 'underline', click_feedback: 'none', focus: 'outline', scroll_behavior: 'auto', discoverability: 'explicit', cognitive_load: 'low' },
  motion: { type: 'none', reduced_motion: true, feedback_strength: 'none' },
  hierarchy: { depth: 'moderate', contrast_strategy: 'typography' },
  spacing: { base: '8px', rhythm: 'airy', alignment: 'left' },
  information: { structure: 'linear', scannability: 'low', navigation: 'minimal' },
  personality: ['elegant', 'calm', 'authoritative'],
};

const product: DesignDSL = {
  style: 'product',
  layout: { type: 'grid', grid: true, columns: 3, alignment: 'center', max_width: '1280px', section_spacing: 'default' },
  density: 'high',
  typography: { font_pairing: ['Inter', 'Inter'], scale: '1.2', base_size: '16px', line_height: '1.5', weight_strategy: 'uniform', paragraph_width: '55ch' },
  color: { mode: 'neutral', primary: '#2563eb', accent: '#10b981', background: '#ffffff', text: '#111827', contrast: 'high' },
  interaction: { level: 'medium', hover: 'shadow-lift', click_feedback: 'subtle-scale', focus: 'ring', scroll_behavior: 'smooth', discoverability: 'explicit', cognitive_load: 'medium' },
  motion: { type: 'micro-interaction', duration: '150ms', easing: 'ease-out', reduced_motion: true, entrance: 'fade', feedback_strength: 'medium' },
  hierarchy: { depth: 'moderate', contrast_strategy: 'mixed' },
  spacing: { base: '8px', rhythm: 'tight', alignment: 'center' },
  information: { structure: 'modular', scannability: 'high', navigation: 'top' },
  personality: ['rational', 'clean', 'technical'],
};

const cyberpunk: DesignDSL = {
  style: 'cyberpunk',
  layout: { type: 'grid', grid: true, columns: 2, alignment: 'center', max_width: '1200px', section_spacing: 'default' },
  density: 'medium',
  typography: { font_pairing: ['JetBrains Mono', 'Inter'], scale: '1.25', base_size: '16px', line_height: '1.5', weight_strategy: 'contrast', letter_spacing: 'wide' },
  color: { mode: 'dark', primary: '#00ff88', accent: '#ff00ff', background: '#0a0a0a', text: '#e0e0e0', contrast: 'high', dark_mode: true },
  interaction: { level: 'high', hover: 'color-shift', click_feedback: 'ripple', focus: 'glow', scroll_behavior: 'smooth', discoverability: 'progressive', cognitive_load: 'high' },
  motion: { type: 'micro-interaction', duration: '200ms', easing: 'ease-out', reduced_motion: true, entrance: 'clip', feedback_strength: 'strong' },
  hierarchy: { depth: 'deep', contrast_strategy: 'color' },
  spacing: { base: '4px', rhythm: 'tight', alignment: 'center' },
  information: { structure: 'modular', scannability: 'medium', navigation: 'top' },
  personality: ['technical', 'bold', 'cool'],
};

const portfolio: DesignDSL = {
  style: 'portfolio',
  layout: { type: 'grid', grid: true, columns: 2, alignment: 'center', max_width: '1200px', section_spacing: 'generous' },
  density: 'low',
  typography: { font_pairing: ['DM Serif Display', 'DM Sans'], scale: '1.333', base_size: '18px', line_height: '1.5', weight_strategy: 'heavy-headings', paragraph_width: '55ch' },
  color: { mode: 'neutral', primary: '#171717', accent: '#6366f1', background: '#ffffff', text: '#171717', contrast: 'high' },
  interaction: { level: 'medium', hover: 'scale', click_feedback: 'subtle-scale', focus: 'ring', scroll_behavior: 'smooth', discoverability: 'explicit', cognitive_load: 'low' },
  motion: { type: 'stagger', duration: '300ms', easing: 'ease-out', reduced_motion: true, entrance: 'slide-up', feedback_strength: 'medium' },
  hierarchy: { depth: 'moderate', primary_focus: 'hero-title', contrast_strategy: 'typography' },
  spacing: { base: '8px', rhythm: 'airy', alignment: 'center' },
  information: { structure: 'modular', scannability: 'high', navigation: 'top' },
  personality: ['bold', 'elegant', 'minimal'],
};

const warm: DesignDSL = {
  style: 'warm',
  layout: { type: 'single-column', alignment: 'center', max_width: '800px', section_spacing: 'generous' },
  density: 'low',
  typography: { font_pairing: ['Lora', 'Nunito'], scale: '1.25', base_size: '18px', line_height: '1.75', weight_strategy: 'contrast', paragraph_width: '65ch' },
  color: { mode: 'soft', primary: '#b45309', accent: '#d97706', background: '#faf8f5', text: '#292524', contrast: 'medium' },
  interaction: { level: 'low', hover: 'opacity', click_feedback: 'subtle-scale', focus: 'ring', scroll_behavior: 'smooth', discoverability: 'explicit', cognitive_load: 'low' },
  motion: { type: 'subtle-fade', duration: '300ms', easing: 'ease-out', reduced_motion: true, entrance: 'fade', feedback_strength: 'subtle' },
  hierarchy: { depth: 'flat', contrast_strategy: 'typography' },
  spacing: { base: '8px', rhythm: 'airy', alignment: 'center' },
  information: { structure: 'linear', scannability: 'medium', navigation: 'top' },
  personality: ['warm', 'friendly', 'calm'],
};

const PRESETS: Record<StyleName, DesignDSL> = {
  minimal, modern, creative, editorial, product, cyberpunk, portfolio, warm,
};

export function getPreset(name: StyleName): DesignDSL {
  return structuredClone(PRESETS[name]);
}

export function listPresets(): StyleName[] {
  return Object.keys(PRESETS) as StyleName[];
}

/** Deep-merge user overrides onto a preset base */
export function resolveWithPreset(partial: Partial<DesignDSL> & { style: StyleName }): DesignDSL {
  const base = getPreset(partial.style);
  return deepMerge(base as unknown as Obj, partial as unknown as Obj) as unknown as DesignDSL;
}

type Obj = Record<string, unknown>;

function deepMerge(target: Obj, source: Obj): Obj {
  const result = { ...target };
  for (const key of Object.keys(source)) {
    const sv = source[key];
    const tv = target[key];
    if (sv !== undefined && tv !== undefined && isPlainObject(sv) && isPlainObject(tv)) {
      result[key] = deepMerge(tv as Obj, sv as Obj);
    } else if (sv !== undefined) {
      result[key] = sv;
    }
  }
  return result;
}

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}
