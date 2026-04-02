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
  it('returns a complete DSL for each preset', () => {
    for (const name of listPresets()) {
      const preset = getPreset(name);
      expect(preset.style).toBe(name);
      expect(preset.layout).toBeDefined();
      expect(preset.typography).toBeDefined();
      expect(preset.color).toBeDefined();
      expect(preset.interaction).toBeDefined();
      expect(preset.motion).toBeDefined();
    }
  });

  it('returns a deep clone (not reference)', () => {
    const a = getPreset('minimal');
    const b = getPreset('minimal');
    a.color.primary = '#ff0000';
    expect(b.color.primary).not.toBe('#ff0000');
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
});
