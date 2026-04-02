import type { InformationConfig } from '../types';

export function compileInformationVars(info?: InformationConfig): Record<string, string> {
  if (!info) return {};

  const vars: Record<string, string> = {};

  // Navigation pattern → nav height/behavior
  switch (info.navigation ?? 'top') {
    case 'top':
      vars['--nav-height'] = '64px';
      vars['--nav-position'] = 'fixed';
      vars['--nav-width'] = '100%';
      vars['--content-offset'] = '64px';
      break;
    case 'side':
      vars['--nav-height'] = '100vh';
      vars['--nav-position'] = 'fixed';
      vars['--nav-width'] = '240px';
      vars['--content-offset'] = '0';
      break;
    case 'minimal':
      vars['--nav-height'] = '48px';
      vars['--nav-position'] = 'fixed';
      vars['--nav-width'] = '100%';
      vars['--content-offset'] = '48px';
      break;
    case 'hidden':
      vars['--nav-height'] = '0';
      vars['--nav-position'] = 'fixed';
      vars['--nav-width'] = '0';
      vars['--content-offset'] = '0';
      break;
  }

  // Scannability → affects card vs narrative presentation
  switch (info.scannability ?? 'medium') {
    case 'high':
      vars['--content-max-lines'] = '3';
      vars['--summary-display'] = 'block';
      vars['--detail-display'] = 'none';
      break;
    case 'medium':
      vars['--content-max-lines'] = '6';
      vars['--summary-display'] = 'block';
      vars['--detail-display'] = 'block';
      break;
    case 'low':
      vars['--content-max-lines'] = 'none';
      vars['--summary-display'] = 'none';
      vars['--detail-display'] = 'block';
      break;
  }

  return vars;
}

export function compileInformationCss(info?: InformationConfig): string {
  if (!info) return '';

  const rules: string[] = [];

  // Content structure → layout patterns
  switch (info.structure) {
    case 'linear':
      rules.push(`.content-flow { display: flex; flex-direction: column; }`);
      rules.push(`.content-flow > * + * { margin-top: var(--rhythm-section, var(--space-16)); }`);
      break;
    case 'modular':
      rules.push(`.content-flow { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: var(--rhythm-lg, var(--space-8)); }`);
      break;
    case 'hub':
      rules.push(`.content-flow { display: grid; grid-template-columns: 1fr; gap: var(--rhythm-lg, var(--space-8)); }`);
      rules.push(`.content-flow > :first-child { grid-column: 1 / -1; text-align: center; padding: var(--space-16) 0; }`);
      rules.push(`.content-flow .sub-items { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: var(--space-6); }`);
      break;
  }

  // Side navigation layout
  if (info.navigation === 'side') {
    rules.push(`.layout-with-nav { display: flex; }
.layout-with-nav .nav-side { width: var(--nav-width); height: var(--nav-height); position: var(--nav-position); left: 0; top: 0; }
.layout-with-nav .main-content { margin-left: var(--nav-width); flex: 1; }`);
  }

  // Hidden navigation — hamburger-only
  if (info.navigation === 'hidden') {
    rules.push(`.nav { transform: translateX(-100%); transition: transform var(--transition-base); }
.nav.open { transform: translateX(0); }`);
  }

  // Scannability utilities
  if (info.scannability === 'high') {
    rules.push(`.scannable-text {
  display: -webkit-box;
  -webkit-line-clamp: var(--content-max-lines);
  -webkit-box-orient: vertical;
  overflow: hidden;
}`);
  }

  return rules.join('\n\n');
}
