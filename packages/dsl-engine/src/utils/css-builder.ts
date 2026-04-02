// CSS string building helpers

export function rootBlock(vars: Record<string, string>): string {
  const lines = Object.entries(vars)
    .map(([k, v]) => `  ${k}: ${v};`)
    .join('\n');
  return `:root {\n${lines}\n}`;
}

export function ruleBlock(selector: string, props: Record<string, string>): string {
  const lines = Object.entries(props)
    .map(([k, v]) => `  ${k}: ${v};`)
    .join('\n');
  return `${selector} {\n${lines}\n}`;
}

export function mediaBlock(query: string, content: string): string {
  const indented = content.split('\n').map(l => '  ' + l).join('\n');
  return `@media ${query} {\n${indented}\n}`;
}

export function comment(text: string): string {
  return `/* ${text} */`;
}

export function section(title: string, content: string): string {
  return `\n/* ── ${title} ── */\n${content}`;
}
