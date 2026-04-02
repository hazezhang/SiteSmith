import type { DensityLevel } from '../types';

const DENSITY_MAP: Record<DensityLevel, Record<string, string>> = {
  low: {
    '--component-padding': '2rem',
    '--card-padding': '2rem',
    '--element-gap': '1.5rem',
  },
  medium: {
    '--component-padding': '1.5rem',
    '--card-padding': '1.5rem',
    '--element-gap': '1rem',
  },
  high: {
    '--component-padding': '1rem',
    '--card-padding': '1rem',
    '--element-gap': '0.75rem',
  },
};

export function compileDensityVars(density: DensityLevel): Record<string, string> {
  return { ...DENSITY_MAP[density] };
}
