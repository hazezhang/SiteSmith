---
name: generate-design-system
description: "生成完整设计系统。从设计意图输出色彩/字体/间距/圆角/阴影/动效的统一规则和CSS变量。Generate complete design system with tokens and CSS variables."
argument-hint: [optional-style-override]
allowed-tools: Read, Write, Edit, Grep, Glob, Bash(python*), WebSearch
---

# Generate Design System — 设计系统生成

> 不只是选颜色，而是建立一套统一的视觉语言

## Input

`$ARGUMENTS` — 可选的风格覆盖（如 "warmer tones"）

## Prerequisites

- `DESIGN_INTENT.md` 必须存在

## Workflow

### Phase A: 读取设计输入

1. 从 `DESIGN_INTENT.md` 提取 **Design DSL JSON** — 这是核心输入
2. 读取 `.designurpage/dsl/code-mapping.md` — DSL→CSS 翻译规则
3. 读取 `.designurpage/dsl/schema.md` — 验证 DSL 完整性
4. 读取 `.designurpage/skills/shared-references/design-principles.md` — 设计原则
5. 读取 `SITE_BLUEPRINT.md`（如果存在）— 了解组件需求

> 本质上，此 skill = DSL 中各维度的展开 + 编译
> 核心编译工作由 `/translate-design-to-code` 完成，本 skill 侧重于生成人可读的 DESIGN_SYSTEM.md 文档

### Phase B: 生成设计 Tokens

#### 1. Color System（色彩系统）

基于设计意图生成完整色板：

```css
:root {
  /* Primary */
  --color-primary-50: #eff6ff;
  --color-primary-100: #dbeafe;
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;
  --color-primary-900: #1e3a5f;

  /* Neutral */
  --color-neutral-50: #fafafa;
  --color-neutral-100: #f5f5f5;
  --color-neutral-500: #737373;
  --color-neutral-900: #171717;

  /* Accent */
  --color-accent: #f59e0b;

  /* Semantic */
  --color-background: var(--color-neutral-50);
  --color-surface: #ffffff;
  --color-text: var(--color-neutral-900);
  --color-text-muted: var(--color-neutral-500);
  --color-border: var(--color-neutral-200);
  --color-link: var(--color-primary-600);
}
```

如果需要暗色模式：
```css
[data-theme="dark"] {
  --color-background: var(--color-neutral-900);
  --color-surface: #1e1e1e;
  --color-text: var(--color-neutral-50);
  /* ... */
}
```

#### 2. Typography System（字体系统）

```css
:root {
  /* Font Families */
  --font-heading: 'Playfair Display', Georgia, serif;
  --font-body: 'Inter', -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Font Sizes (modular scale 1.25) */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.25rem;    /* 20px */
  --text-xl: 1.563rem;   /* 25px */
  --text-2xl: 1.953rem;  /* 31px */
  --text-3xl: 2.441rem;  /* 39px */
  --text-4xl: 3.052rem;  /* 49px */

  /* Line Heights */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;

  /* Font Weights */
  --weight-light: 300;
  --weight-normal: 400;
  --weight-medium: 500;
  --weight-semibold: 600;
  --weight-bold: 700;
}
```

#### 3. Spacing System（间距系统）

```css
:root {
  /* 8px grid */
  --space-1: 0.25rem;  /* 4px */
  --space-2: 0.5rem;   /* 8px */
  --space-3: 0.75rem;  /* 12px */
  --space-4: 1rem;     /* 16px */
  --space-6: 1.5rem;   /* 24px */
  --space-8: 2rem;     /* 32px */
  --space-12: 3rem;    /* 48px */
  --space-16: 4rem;    /* 64px */
  --space-24: 6rem;    /* 96px */
  --space-32: 8rem;    /* 128px */

  /* Section spacing */
  --section-gap: var(--space-24);
  --container-max: 1200px;
  --container-padding: var(--space-6);
}
```

#### 4. Border & Shadow（圆角与阴影）

```css
:root {
  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
```

#### 5. Transition System（动效系统）

```css
:root {
  --transition-fast: 150ms ease-out;
  --transition-base: 200ms ease-out;
  --transition-slow: 300ms ease-out;
  --transition-elegant: 400ms cubic-bezier(0.4, 0, 0.2, 1);
  --easing-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### Phase C: 生成组件基础样式

基于 tokens 生成基础组件样式指南：

```markdown
## Component Style Guide

### Buttons
- Primary: bg=primary-600, text=white, radius=md, shadow=sm
- Secondary: bg=transparent, border=primary-600, text=primary-600
- Ghost: bg=transparent, text=primary-600, hover:bg=primary-50

### Cards
- bg=surface, radius=lg, shadow=md, padding=space-6

### Links
- color=link, underline on hover, transition=fast
```

### 🚦 Checkpoint: Design System Review

- **展示**: 完整的设计系统预览（色板 + 字体 + 间距 + 组件样式）
- **询问**: "这个设计系统是否符合你的期望？可以说'色彩更暖一点''圆角更大一些'来调整"
- **确认 →** 写入 `DESIGN_SYSTEM.md` + `src/styles/variables.css`
- **调整 →** 根据反馈修改 tokens → 重新展示
- **大幅修改 →** 建议先 `/refine-design-intent` 再重新生成

## Output

1. `DESIGN_SYSTEM.md` — 完整的设计系统文档（人读）
2. `src/styles/variables.css` — CSS变量文件（机读）

## Key Rules

1. **完整性** — 每个 token 类别都要覆盖，不留空白
2. **一致性** — 所有值都基于统一的 scale 和 ratio
3. **可读性** — DESIGN_SYSTEM.md 要让非技术人员也能理解
4. **实用性** — 每个 token 都要被组件实际使用

## Composing with Other Skills

- DSL 编译 → `/translate-design-to-code` 生成 `variables.css`（可先于本 skill 运行）
- 确认后 → `/project-scaffold` 创建项目并植入 variables.css
- 需要调整 → `/refine-design-dsl` 修改 DSL 参数 → 重新生成
- 一致性检查 → `/enforce-design-consistency` 确保全站遵循
