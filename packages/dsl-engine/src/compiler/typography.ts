import type { TypographyConfig } from '../types';

const WEIGHT_MAP = {
  uniform:        { heading: '600', subheading: '600', body: '400', light: '400' },
  contrast:       { heading: '700', subheading: '600', body: '400', light: '300' },
  'heavy-headings': { heading: '900', subheading: '800', body: '400', light: '300' },
} as const;

const LETTER_SPACING_MAP = {
  tight: '-0.02em',
  normal: '0',
  wide: '0.05em',
} as const;

/** Build Google Fonts @import URL */
export function buildFontImportUrl(fonts: [string, string], weightStrategy: string): string {
  const weights = weightStrategy === 'heavy-headings'
    ? '300;400;500;600;700;800;900'
    : '300;400;500;600;700';

  const unique = [...new Set(fonts)];
  const families = unique.map(f => {
    const encoded = f.replace(/ /g, '+');
    return `family=${encoded}:wght@${weights}`;
  }).join('&');

  return `https://fonts.googleapis.com/css2?${families}&display=swap`;
}

/** Compute type scale ladder from base size and ratio */
function computeScaleLadder(baseSize: number, ratio: number): Record<string, string> {
  return {
    '--text-xs':   `${(baseSize * Math.pow(ratio, -2)).toFixed(3)}rem`,
    '--text-sm':   `${(baseSize * Math.pow(ratio, -1)).toFixed(3)}rem`,
    '--text-base': `${baseSize}rem`,
    '--text-lg':   `${(baseSize * ratio).toFixed(3)}rem`,
    '--text-xl':   `${(baseSize * Math.pow(ratio, 2)).toFixed(3)}rem`,
    '--text-2xl':  `${(baseSize * Math.pow(ratio, 3)).toFixed(3)}rem`,
    '--text-3xl':  `${(baseSize * Math.pow(ratio, 4)).toFixed(3)}rem`,
    '--text-4xl':  `${(baseSize * Math.pow(ratio, 5)).toFixed(3)}rem`,
  };
}

export function compileTypographyVars(typo: TypographyConfig): Record<string, string> {
  const [headingFont, bodyFont] = typo.font_pairing;
  const isSerif = (f: string) => /serif|playfair|lora|merriweather|dm serif/i.test(f);
  const headingFallback = isSerif(headingFont) ? 'Georgia, serif' : '-apple-system, system-ui, sans-serif';
  const bodyFallback = isSerif(bodyFont) ? 'Georgia, serif' : '-apple-system, system-ui, sans-serif';

  const basePx = parseInt(typo.base_size ?? '16px', 10);
  const baseRem = basePx / 16;
  const ratio = parseFloat(typo.scale ?? '1.25');
  const weights = WEIGHT_MAP[typo.weight_strategy ?? 'contrast'];
  const letterSpacing = LETTER_SPACING_MAP[typo.letter_spacing ?? 'normal'];

  return {
    '--font-heading': `'${headingFont}', ${headingFallback}`,
    '--font-body': `'${bodyFont}', ${bodyFallback}`,
    ...computeScaleLadder(baseRem, ratio),
    '--leading-normal': typo.line_height ?? '1.6',
    '--leading-tight': '1.2',
    '--weight-heading': weights.heading,
    '--weight-subheading': weights.subheading,
    '--weight-body': weights.body,
    '--weight-light': weights.light,
    '--paragraph-width': typo.paragraph_width ?? '65ch',
    '--letter-spacing': letterSpacing,
  };
}
