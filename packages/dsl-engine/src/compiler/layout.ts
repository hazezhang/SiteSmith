import type { LayoutConfig } from '../types';

const SECTION_SPACING = {
  compact: '3rem',    // space-12
  default: '4rem',    // space-16
  generous: '6rem',   // space-24
} as const;

const MAX_WIDTH_MAP: Record<string, string> = {
  '720px': '720px', '800px': '800px', '1080px': '1080px',
  '1200px': '1200px', '1280px': '1280px', 'full': '100%',
};

export function compileLayoutVars(layout: LayoutConfig): Record<string, string> {
  const maxWidth = MAX_WIDTH_MAP[layout.max_width ?? '1200px'] ?? layout.max_width ?? '1200px';
  const spacing = SECTION_SPACING[layout.section_spacing ?? 'default'];

  return {
    '--container-max': maxWidth,
    '--container-padding': '1.5rem',
    '--section-gap': spacing,
  };
}

export function compileLayoutClasses(layout: LayoutConfig): string {
  const columns = layout.columns ?? 2;

  switch (layout.type) {
    case 'single-column':
      return `.container { max-width: var(--container-max); margin: 0 auto; padding: 0 var(--container-padding); }`;

    case 'grid':
      return [
        `.container { max-width: var(--container-max); margin: 0 auto; padding: 0 var(--container-padding); }`,
        `.grid { display: grid; grid-template-columns: repeat(${columns}, 1fr); gap: var(--space-6); }`,
        `@media (max-width: 768px) { .grid { grid-template-columns: 1fr; } }`,
      ].join('\n');

    case 'asymmetric':
      return [
        `.container { max-width: var(--container-max); margin: 0 auto; padding: 0 var(--container-padding); }`,
        `.layout { display: grid; grid-template-columns: 1.5fr 1fr; gap: var(--space-8); }`,
        `@media (max-width: 768px) { .layout { grid-template-columns: 1fr; } }`,
      ].join('\n');

    case 'reading-column':
      return `.container { max-width: var(--container-max); margin: 0 auto; padding: 0 var(--container-padding); }\n.content { max-width: 65ch; margin: 0 auto; }`;

    case 'split':
      return [
        `.container { max-width: var(--container-max); margin: 0 auto; padding: 0 var(--container-padding); }`,
        `.split { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-8); align-items: center; }`,
        `@media (max-width: 768px) { .split { grid-template-columns: 1fr; } }`,
      ].join('\n');

    case 'magazine':
      return [
        `.container { max-width: var(--container-max); margin: 0 auto; padding: 0 var(--container-padding); }`,
        `.magazine { display: grid; grid-template-columns: 2fr 1fr; gap: var(--space-6); }`,
        `@media (max-width: 768px) { .magazine { grid-template-columns: 1fr; } }`,
      ].join('\n');

    default:
      return `.container { max-width: var(--container-max); margin: 0 auto; padding: 0 var(--container-padding); }`;
  }
}
