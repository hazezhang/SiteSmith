import type { InteractionConfig } from '../types';

export function compileInteractionVars(interaction: InteractionConfig): Record<string, string> {
  const speedMultiplier = interaction.level === 'low' ? 1 : interaction.level === 'high' ? 0.8 : 1;
  return {
    '--transition-fast': `${Math.round(150 * speedMultiplier)}ms ease-out`,
    '--transition-base': `${Math.round(250 * speedMultiplier)}ms ease-out`,
    '--transition-slow': `${Math.round(400 * speedMultiplier)}ms ease-out`,
  };
}

export function compileInteractionCss(interaction: InteractionConfig): string {
  const rules: string[] = [];

  // Hover
  switch (interaction.hover ?? 'opacity') {
    case 'opacity':
      rules.push(`.interactive:hover, .card:hover { opacity: 0.7; transition: opacity var(--transition-fast); }`);
      break;
    case 'scale':
      rules.push(`.interactive:hover, .card:hover { transform: scale(1.03); transition: transform var(--transition-fast); }`);
      break;
    case 'shadow-lift':
      rules.push(`.interactive:hover, .card:hover { box-shadow: var(--shadow-lg); transform: translateY(-4px); transition: all var(--transition-base); }`);
      break;
    case 'color-shift':
      rules.push(`.interactive:hover, .card:hover { background: var(--color-primary-50); border-color: var(--color-primary-100); transition: all var(--transition-base); }`);
      break;
    case 'underline':
      rules.push(`.interactive:hover { text-decoration: underline; text-underline-offset: 4px; }`);
      break;
    case 'none':
      break;
  }

  // Click feedback
  switch (interaction.click_feedback ?? 'subtle-scale') {
    case 'subtle-scale':
      rules.push(`.interactive:active, .card:active { transform: scale(0.97); transition: transform 80ms ease-in; }`);
      break;
    case 'ripple':
      rules.push(`.interactive:active { transform: scale(0.98); transition: transform 80ms ease-in; }`);
      break;
    case 'none':
      break;
  }

  // Focus
  switch (interaction.focus ?? 'ring') {
    case 'ring':
      rules.push(`.interactive:focus-visible, a:focus-visible { outline: 2px solid var(--color-primary-500); outline-offset: 3px; border-radius: var(--radius-sm); }`);
      break;
    case 'outline':
      rules.push(`.interactive:focus-visible, a:focus-visible { outline: 2px solid var(--color-text); outline-offset: 2px; }`);
      break;
    case 'glow':
      rules.push(`.interactive:focus-visible, a:focus-visible { box-shadow: 0 0 0 3px rgba(var(--color-primary-rgb), 0.4); outline: none; }`);
      break;
  }

  return rules.join('\n\n');
}
