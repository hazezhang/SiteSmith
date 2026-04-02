import type { ColorConfig } from '../types';
import { hexToRgbString, lighten, darken } from '../utils/color-utils';

export function compileColorVars(color: ColorConfig): Record<string, string> {
  const primary = color.primary ?? '#2563eb';
  const accent = color.accent ?? '#f59e0b';
  const bg = color.background ?? '#ffffff';
  const text = color.text ?? '#1e293b';

  const vars: Record<string, string> = {
    '--color-primary': primary,
    '--color-primary-light': lighten(primary, 0.1),
    '--color-primary-dark': darken(primary, 0.1),
    '--color-primary-50': lighten(primary, 0.4),
    '--color-primary-100': lighten(primary, 0.35),
    '--color-primary-500': primary,
    '--color-primary-700': darken(primary, 0.15),
    '--color-primary-rgb': hexToRgbString(primary),

    '--color-accent': accent,
    '--color-accent-light': lighten(accent, 0.1),
    '--color-accent-dark': darken(accent, 0.1),
    '--color-accent-50': lighten(accent, 0.4),
    '--color-accent-100': lighten(accent, 0.35),
    '--color-accent-500': accent,
    '--color-accent-rgb': hexToRgbString(accent),

    '--color-background': bg,
    '--color-surface': color.mode === 'dark' ? '#1e1e1e' : '#ffffff',
    '--color-text': text,
    '--color-text-muted': color.mode === 'dark' ? '#a0a0a0' : lighten(text, 0.2),
    '--color-text-light': color.mode === 'dark' ? '#707070' : lighten(text, 0.35),
    '--color-border': color.mode === 'dark' ? '#2a2a2e' : '#e2e8f0',
  };

  // Gradients for vibrant mode
  if (color.mode === 'vibrant') {
    vars['--gradient-primary'] = `linear-gradient(135deg, ${primary}, ${accent})`;
    vars['--gradient-subtle'] = `linear-gradient(135deg, ${vars['--color-primary-50']}, ${vars['--color-accent-50']})`;
  } else {
    vars['--gradient-primary'] = `linear-gradient(135deg, ${primary}, ${darken(primary, 0.1)})`;
    vars['--gradient-subtle'] = `linear-gradient(135deg, ${vars['--color-primary-50']}, ${lighten(primary, 0.42)})`;
  }

  // Shadow tints based on mode
  const shadowAlpha = color.mode === 'dark' ? '0.3' : '0.06';
  const shadowAlphaLg = color.mode === 'dark' ? '0.4' : '0.1';
  vars['--shadow-sm'] = `0 1px 3px rgba(0, 0, 0, ${shadowAlpha})`;
  vars['--shadow-md'] = `0 4px 12px rgba(0, 0, 0, ${shadowAlphaLg})`;
  vars['--shadow-lg'] = `0 8px 24px rgba(0, 0, 0, ${shadowAlphaLg})`;
  vars['--shadow-xl'] = `0 12px 36px rgba(0, 0, 0, ${parseFloat(shadowAlphaLg) + 0.02})`;
  vars['--shadow-primary'] = `0 8px 24px rgba(${hexToRgbString(primary)}, 0.15)`;
  vars['--shadow-accent'] = `0 8px 24px rgba(${hexToRgbString(accent)}, 0.15)`;

  // Border radius — sharper for dark/monochrome, rounder for soft/warm
  const radiusScale = (color.mode === 'soft' || color.mode === 'vibrant') ? 1.5 : (color.mode === 'dark' ? 0.5 : 1);
  vars['--radius-sm'] = `${Math.round(4 * radiusScale)}px`;
  vars['--radius-md'] = `${Math.round(8 * radiusScale)}px`;
  vars['--radius-lg'] = `${Math.round(12 * radiusScale)}px`;
  vars['--radius-xl'] = `${Math.round(16 * radiusScale)}px`;
  vars['--radius-full'] = '9999px';

  return vars;
}
