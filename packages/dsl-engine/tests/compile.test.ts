import { describe, it, expect } from 'vitest';
import { compile, validate, getPreset, listPresets, resolveWithPreset } from '../src/index';
import type { DesignDSL } from '../src/types';

describe('listPresets', () => {
  it('returns all 8 presets', () => {
    expect(listPresets()).toHaveLength(8);
    expect(listPresets()).toContain('minimal');
    expect(listPresets()).toContain('cyberpunk');
  });
});

describe('getPreset', () => {
  it('returns a complete 10-dimension DSL for each preset', () => {
    for (const name of listPresets()) {
      const preset = getPreset(name);
      expect(preset.style).toBe(name);
      expect(preset.layout).toBeDefined();
      expect(preset.typography).toBeDefined();
      expect(preset.color).toBeDefined();
      expect(preset.interaction).toBeDefined();
      expect(preset.motion).toBeDefined();
      // New dimensions
      expect(preset.hierarchy).toBeDefined();
      expect(preset.spacing).toBeDefined();
      expect(preset.information).toBeDefined();
      expect(Array.isArray(preset.personality)).toBe(true);
    }
  });

  it('returns a deep clone (not reference)', () => {
    const a = getPreset('minimal');
    const b = getPreset('minimal');
    a.color.primary = '#ff0000';
    expect(b.color.primary).not.toBe('#ff0000');
  });

  it('presets have expanded interaction fields', () => {
    for (const name of listPresets()) {
      const preset = getPreset(name);
      expect(preset.interaction.discoverability).toBeDefined();
      expect(preset.interaction.cognitive_load).toBeDefined();
    }
  });

  it('presets have feedback_strength in motion', () => {
    for (const name of listPresets()) {
      const preset = getPreset(name);
      expect(preset.motion.feedback_strength).toBeDefined();
    }
  });
});

describe('resolveWithPreset', () => {
  it('merges overrides onto preset base', () => {
    const dsl = resolveWithPreset({
      style: 'minimal',
      color: { mode: 'vibrant', primary: '#ec4899', accent: '#3b82f6' },
    } as any);
    expect(dsl.style).toBe('minimal');
    expect(dsl.color.mode).toBe('vibrant');
    expect(dsl.color.primary).toBe('#ec4899');
    // Non-overridden fields from preset
    expect(dsl.layout.type).toBe('single-column');
    expect(dsl.typography.font_pairing[0]).toBe('Inter');
  });

  it('merges new dimension overrides', () => {
    const dsl = resolveWithPreset({
      style: 'modern',
      hierarchy: { depth: 'deep', contrast_strategy: 'color' },
      spacing: { base: '4px', rhythm: 'tight' },
    } as any);
    expect(dsl.hierarchy!.depth).toBe('deep');
    expect(dsl.hierarchy!.contrast_strategy).toBe('color');
    expect(dsl.spacing!.base).toBe('4px');
    expect(dsl.spacing!.rhythm).toBe('tight');
    // Non-overridden new dims from preset
    expect(dsl.information!.structure).toBe('modular');
  });
});

describe('validate', () => {
  it('passes for valid presets', () => {
    for (const name of listPresets()) {
      const result = validate(getPreset(name));
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    }
  });

  it('fails for missing fields', () => {
    const result = validate({} as DesignDSL);
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it('warns for low density + many grid columns', () => {
    const dsl = getPreset('minimal');
    dsl.density = 'low';
    dsl.layout = { type: 'grid', columns: 4, alignment: 'center', max_width: '1200px' };
    const result = validate(dsl);
    expect(result.warnings.some(w => w.field === 'density+layout')).toBe(true);
  });

  it('validates hierarchy dimension enums', () => {
    const dsl = getPreset('minimal');
    dsl.hierarchy = { depth: 'invalid' as any, contrast_strategy: 'typography' };
    const result = validate(dsl);
    expect(result.valid).toBe(false);
    expect(result.errors.some(e => e.field === 'hierarchy.depth')).toBe(true);
  });

  it('validates spacing dimension enums', () => {
    const dsl = getPreset('minimal');
    dsl.spacing = { base: '16px' as any, rhythm: 'balanced' };
    const result = validate(dsl);
    expect(result.valid).toBe(false);
    expect(result.errors.some(e => e.field === 'spacing.base')).toBe(true);
  });

  it('validates information dimension enums', () => {
    const dsl = getPreset('minimal');
    dsl.information = { structure: 'invalid' as any };
    const result = validate(dsl);
    expect(result.valid).toBe(false);
    expect(result.errors.some(e => e.field === 'information.structure')).toBe(true);
  });

  it('warns for deep hierarchy + high density', () => {
    const dsl = getPreset('creative');
    dsl.hierarchy = { depth: 'deep', contrast_strategy: 'color' };
    dsl.density = 'high';
    const result = validate(dsl);
    expect(result.warnings.some(w => w.field === 'hierarchy+density')).toBe(true);
  });

  it('warns for tight rhythm + low density', () => {
    const dsl = getPreset('minimal');
    dsl.spacing = { base: '8px', rhythm: 'tight' };
    dsl.density = 'low';
    const result = validate(dsl);
    expect(result.warnings.some(w => w.field === 'spacing+density')).toBe(true);
  });

  it('warns for hidden nav + low cognitive load', () => {
    const dsl = getPreset('creative');
    dsl.information = { structure: 'hub', navigation: 'hidden' };
    dsl.interaction = { ...dsl.interaction, cognitive_load: 'low' };
    const result = validate(dsl);
    expect(result.warnings.some(w => w.field === 'information+interaction')).toBe(true);
  });
});

describe('compile', () => {
  it('compiles minimal preset to valid CSS', () => {
    const dsl = getPreset('minimal');
    const result = compile(dsl);

    expect(result.variablesCss).toContain(':root');
    expect(result.variablesCss).toContain('--container-max: 720px');
    expect(result.variablesCss).toContain('--font-heading');
    expect(result.variablesCss).toContain('--color-primary');
    expect(result.variablesCss).toContain('@import url');

    expect(result.baseCss).toContain('box-sizing: border-box');
    expect(result.baseCss).toContain('.container');
    expect(result.baseCss).toContain('.card');
    expect(result.baseCss).toContain('.btn');

    expect(result.interactionsCss).toContain(':hover');
    expect(result.interactionsCss).toContain('prefers-reduced-motion');

    expect(result.interactionsJs).toContain('IntersectionObserver');
  });

  it('compiles all 8 presets without errors', () => {
    for (const name of listPresets()) {
      const result = compile(getPreset(name));
      expect(result.variablesCss).toContain(':root');
      expect(result.baseCss.length).toBeGreaterThan(0);
    }
  });

  it('is deterministic — same input produces same output', () => {
    const dsl = getPreset('modern');
    const a = compile(dsl);
    const b = compile(getPreset('modern'));
    expect(a.variablesCss).toBe(b.variablesCss);
    expect(a.baseCss).toBe(b.baseCss);
    expect(a.interactionsCss).toBe(b.interactionsCss);
    expect(a.interactionsJs).toBe(b.interactionsJs);
  });

  it('grid layout produces grid CSS class', () => {
    const dsl = getPreset('modern');
    const result = compile(dsl);
    expect(result.baseCss).toContain('grid-template-columns');
  });

  it('editorial has no motion CSS', () => {
    const dsl = getPreset('editorial');
    const result = compile(dsl);
    expect(result.interactionsCss).not.toContain('.reveal');
    expect(result.interactionsJs).toContain('Motion disabled');
  });

  it('cyberpunk dark mode has dark surface color', () => {
    const dsl = getPreset('cyberpunk');
    const result = compile(dsl);
    expect(result.variablesCss).toContain('--color-surface: #1e1e1e');
  });

  it('stagger motion produces nth-child delays', () => {
    const dsl = getPreset('portfolio');
    const result = compile(dsl);
    expect(result.interactionsCss).toContain('nth-child');
    expect(result.interactionsCss).toContain('transition-delay');
  });

  it('vibrant color mode produces gradient variables', () => {
    const dsl = resolveWithPreset({
      style: 'portfolio',
      color: { mode: 'vibrant', primary: '#3b82f6', accent: '#ec4899' },
    } as any);
    const result = compile(dsl);
    expect(result.variablesCss).toContain('--gradient-primary');
    expect(result.variablesCss).toContain('#ec4899');
  });

  it('font import URL contains all fonts', () => {
    const dsl = getPreset('editorial');
    const result = compile(dsl);
    expect(result.fontImportUrl).toContain('Playfair+Display');
    expect(result.fontImportUrl).toContain('Source+Sans+3');
  });

  // ─── New dimension compile tests ───

  it('hierarchy dimension produces z-index and shadow-depth variables', () => {
    const dsl = getPreset('creative'); // deep hierarchy
    const result = compile(dsl);
    expect(result.variablesCss).toContain('--z-raised');
    expect(result.variablesCss).toContain('--shadow-depth-1');
    expect(result.variablesCss).toContain('--hierarchy-scale');
  });

  it('flat hierarchy has smaller scale than deep', () => {
    const flat = compile(getPreset('minimal')); // flat
    const deep = compile(getPreset('creative')); // deep
    const flatScale = flat.variablesCss.match(/--hierarchy-scale:\s*([\d.]+)/)?.[1];
    const deepScale = deep.variablesCss.match(/--hierarchy-scale:\s*([\d.]+)/)?.[1];
    expect(Number(flatScale)).toBeLessThan(Number(deepScale));
  });

  it('spacing dimension produces rhythm variables', () => {
    const dsl = getPreset('minimal'); // airy rhythm
    const result = compile(dsl);
    expect(result.variablesCss).toContain('--rhythm-sm');
    expect(result.variablesCss).toContain('--rhythm-lg');
    expect(result.variablesCss).toContain('--rhythm-section');
  });

  it('tight rhythm produces smaller spacing values than airy', () => {
    const tight = compile(getPreset('product')); // tight rhythm
    const airy = compile(getPreset('minimal'));  // airy rhythm
    const tightLg = tight.variablesCss.match(/--rhythm-lg:\s*([\d.]+)px/)?.[1];
    const airyLg = airy.variablesCss.match(/--rhythm-lg:\s*([\d.]+)px/)?.[1];
    expect(Number(tightLg)).toBeLessThan(Number(airyLg));
  });

  it('4px spacing base produces finer scale than 8px', () => {
    const dsl4 = getPreset('cyberpunk'); // 4px base
    const dsl8 = getPreset('modern');    // 8px base
    const r4 = compile(dsl4);
    const r8 = compile(dsl8);
    const sm4 = r4.variablesCss.match(/--rhythm-sm:\s*([\d.]+)px/)?.[1];
    const sm8 = r8.variablesCss.match(/--rhythm-sm:\s*([\d.]+)px/)?.[1];
    expect(Number(sm4)).toBeLessThan(Number(sm8));
  });

  it('information dimension produces nav variables', () => {
    const dsl = getPreset('modern'); // top nav
    const result = compile(dsl);
    expect(result.variablesCss).toContain('--nav-height');
    expect(result.variablesCss).toContain('--content-offset');
  });

  it('modular structure produces grid-based content-flow', () => {
    const dsl = getPreset('modern'); // modular structure
    const result = compile(dsl);
    expect(result.baseCss).toContain('content-flow');
    expect(result.baseCss).toContain('grid-template-columns');
  });

  it('linear structure produces flex column content-flow', () => {
    const dsl = getPreset('editorial'); // linear structure
    const result = compile(dsl);
    expect(result.baseCss).toContain('content-flow');
    expect(result.baseCss).toContain('flex-direction: column');
  });

  it('personality array is displayed in CSS comment', () => {
    const dsl = getPreset('minimal');
    const result = compile(dsl);
    expect(result.variablesCss).toContain('calm, premium, clean');
  });

  it('deep hierarchy produces layer utility classes', () => {
    const dsl = getPreset('creative'); // deep hierarchy
    const result = compile(dsl);
    expect(result.baseCss).toContain('layer-raised');
    expect(result.baseCss).toContain('layer-overlay');
  });
});
