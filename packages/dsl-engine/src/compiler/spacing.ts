import type { SpacingConfig } from '../types';

const RHYTHM_MULTIPLIER: Record<string, number> = {
  tight: 0.75,
  balanced: 1,
  airy: 1.5,
};

export function compileSpacingVars(spacing?: SpacingConfig): Record<string, string> {
  if (!spacing) {
    return buildSpacingScale('8px', 1);
  }

  const base = spacing.base === '4px' ? 4 : 8;
  const multiplier = RHYTHM_MULTIPLIER[spacing.rhythm] ?? 1;

  return {
    ...buildSpacingScale(spacing.base, multiplier),
    '--spacing-base': `${base}px`,
    '--rhythm-multiplier': String(multiplier),
    '--alignment': spacing.alignment ?? 'left',
  };
}

function buildSpacingScale(base: string, rhythmMultiplier: number): Record<string, string> {
  const unit = base === '4px' ? 4 : 8;
  const r = rhythmMultiplier;

  return {
    // Core spacing scale (rhythm-aware)
    '--rhythm-xs': `${(unit * 0.5 * r).toFixed(2)}px`,
    '--rhythm-sm': `${(unit * 1 * r).toFixed(2)}px`,
    '--rhythm-md': `${(unit * 2 * r).toFixed(2)}px`,
    '--rhythm-lg': `${(unit * 4 * r).toFixed(2)}px`,
    '--rhythm-xl': `${(unit * 8 * r).toFixed(2)}px`,
    '--rhythm-2xl': `${(unit * 12 * r).toFixed(2)}px`,
    // Vertical rhythm for text (based on line-height multiples)
    '--rhythm-line': `${(unit * 3 * r).toFixed(2)}px`,
    '--rhythm-paragraph': `${(unit * 4 * r).toFixed(2)}px`,
    '--rhythm-section': `${(unit * 8 * r).toFixed(2)}px`,
  };
}

export function compileSpacingCss(spacing?: SpacingConfig): string {
  if (!spacing) return '';

  const rules: string[] = [];

  // Rhythm-based vertical spacing utilities
  rules.push(`.rhythm-tight > * + * { margin-top: var(--rhythm-sm); }`);
  rules.push(`.rhythm-balanced > * + * { margin-top: var(--rhythm-md); }`);
  rules.push(`.rhythm-airy > * + * { margin-top: var(--rhythm-lg); }`);

  // Alignment utilities from spacing config
  if (spacing.alignment) {
    switch (spacing.alignment) {
      case 'center':
        rules.push(`.content-aligned { text-align: center; margin-left: auto; margin-right: auto; }`);
        break;
      case 'left':
        rules.push(`.content-aligned { text-align: left; }`);
        break;
      case 'right':
        rules.push(`.content-aligned { text-align: right; }`);
        break;
      case 'mixed':
        rules.push(`.content-aligned { text-align: left; }`);
        rules.push(`.content-aligned .section-header { text-align: center; }`);
        break;
    }
  }

  return rules.join('\n\n');
}
