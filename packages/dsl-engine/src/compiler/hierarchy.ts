import type { HierarchyConfig } from '../types';

const DEPTH_MAP: Record<string, Record<string, string>> = {
  flat: {
    '--z-base': '0',
    '--z-raised': '1',
    '--z-overlay': '10',
    '--hierarchy-scale': '1.15',
    '--shadow-depth-1': '0 1px 2px rgba(0,0,0,0.05)',
    '--shadow-depth-2': '0 2px 4px rgba(0,0,0,0.08)',
    '--shadow-depth-3': '0 4px 8px rgba(0,0,0,0.1)',
  },
  moderate: {
    '--z-base': '0',
    '--z-raised': '10',
    '--z-overlay': '100',
    '--hierarchy-scale': '1.3',
    '--shadow-depth-1': '0 1px 3px rgba(0,0,0,0.08)',
    '--shadow-depth-2': '0 4px 12px rgba(0,0,0,0.12)',
    '--shadow-depth-3': '0 8px 24px rgba(0,0,0,0.16)',
  },
  deep: {
    '--z-base': '0',
    '--z-raised': '10',
    '--z-overlay': '1000',
    '--hierarchy-scale': '1.5',
    '--shadow-depth-1': '0 2px 4px rgba(0,0,0,0.1)',
    '--shadow-depth-2': '0 8px 24px rgba(0,0,0,0.16)',
    '--shadow-depth-3': '0 16px 48px rgba(0,0,0,0.2)',
  },
};

const CONTRAST_STRATEGY_MAP: Record<string, Record<string, string>> = {
  typography: {
    '--focus-heading-scale': '1.5',
    '--focus-weight-boost': '800',
    '--focus-color-boost': '0',
    '--focus-space-boost': '0',
  },
  color: {
    '--focus-heading-scale': '1',
    '--focus-weight-boost': '0',
    '--focus-color-boost': '1',
    '--focus-space-boost': '0',
  },
  space: {
    '--focus-heading-scale': '1',
    '--focus-weight-boost': '0',
    '--focus-color-boost': '0',
    '--focus-space-boost': '1',
  },
  mixed: {
    '--focus-heading-scale': '1.2',
    '--focus-weight-boost': '700',
    '--focus-color-boost': '0.5',
    '--focus-space-boost': '0.5',
  },
};

export function compileHierarchyVars(hierarchy?: HierarchyConfig): Record<string, string> {
  if (!hierarchy) {
    return { ...DEPTH_MAP['moderate'], ...CONTRAST_STRATEGY_MAP['mixed'] };
  }

  const depthVars = DEPTH_MAP[hierarchy.depth] ?? DEPTH_MAP['moderate'];
  const strategyVars = CONTRAST_STRATEGY_MAP[hierarchy.contrast_strategy ?? 'mixed'] ?? CONTRAST_STRATEGY_MAP['mixed'];

  return { ...depthVars, ...strategyVars };
}

export function compileHierarchyCss(hierarchy?: HierarchyConfig): string {
  if (!hierarchy) return '';

  const rules: string[] = [];

  // Focal point styling — if primary_focus is set, generate a utility class
  if (hierarchy.primary_focus) {
    rules.push(`.focal-point {
  position: relative;
  z-index: var(--z-raised);
}`);

    if (hierarchy.contrast_strategy === 'space') {
      rules.push(`.focal-point { padding: calc(var(--space-16) * (1 + var(--focus-space-boost))); }`);
    }

    if (hierarchy.contrast_strategy === 'color') {
      rules.push(`.focal-point { color: var(--color-primary); }`);
    }
  }

  // Depth layers
  if (hierarchy.depth === 'deep') {
    rules.push(`.layer-raised { box-shadow: var(--shadow-depth-2); z-index: var(--z-raised); position: relative; }`);
    rules.push(`.layer-overlay { box-shadow: var(--shadow-depth-3); z-index: var(--z-overlay); position: relative; }`);
  }

  return rules.join('\n\n');
}
