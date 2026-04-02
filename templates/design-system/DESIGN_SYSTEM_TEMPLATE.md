# Design System — [项目名]

> 生成时间: [date] | 基于 DESIGN_INTENT.md

---

## 1. Color System

### Light Mode
| Token | 值 | 用途 |
|-------|-----|------|
| `--color-primary-500` | `#___` | 主色调 |
| `--color-primary-600` | `#___` | 主色调（hover） |
| `--color-accent` | `#___` | 强调色 |
| `--color-background` | `#___` | 页面背景 |
| `--color-surface` | `#___` | 卡片/容器背景 |
| `--color-text` | `#___` | 主文字 |
| `--color-text-muted` | `#___` | 辅助文字 |
| `--color-border` | `#___` | 边框 |

### Dark Mode（如需要）
| Token | 值 | 用途 |
|-------|-----|------|
| ... | ... | ... |

### 色彩使用规则
- 60% 背景色 / 30% 表面色 / 10% 强调色
- CTA 按钮使用 `--color-primary-600`
- 链接使用 `--color-link` + 下划线

---

## 2. Typography

### 字体族
- **标题**: `[font-name]`
- **正文**: `[font-name]`
- **代码**: `[font-name]`

### 字号阶梯（Scale Ratio: [X]）
| Token | 大小 | 用途 |
|-------|------|------|
| `--text-xs` | 0.75rem | 标签、注释 |
| `--text-sm` | 0.875rem | 辅助文字 |
| `--text-base` | 1rem | 正文 |
| `--text-lg` | 1.25rem | 大正文 |
| `--text-xl` | 1.563rem | 小标题 |
| `--text-2xl` | 1.953rem | 区块标题 |
| `--text-3xl` | 2.441rem | 页面标题 |
| `--text-4xl` | 3.052rem | Hero 标题 |

### 行高
- 标题: `--leading-tight` (1.25)
- 正文: `--leading-normal` (1.5)
- 宽松: `--leading-relaxed` (1.75)

---

## 3. Spacing

### 间距阶梯（基准: 8px）
| Token | 值 | 典型用途 |
|-------|-----|---------|
| `--space-1` | 4px | 紧凑内间距 |
| `--space-2` | 8px | 元素内间距 |
| `--space-4` | 16px | 组件内间距 |
| `--space-6` | 24px | 组件间距 |
| `--space-8` | 32px | 区块间距 |
| `--space-16` | 64px | Section 间距 |
| `--space-24` | 96px | 大段落间距 |

### 容器
- 最大宽度: `--container-max` = [X]px
- 侧边距: `--container-padding` = [X]rem

---

## 4. Border & Shadow

### 圆角
| Token | 值 | 用途 |
|-------|-----|------|
| `--radius-sm` | [X]px | 按钮、输入框 |
| `--radius-md` | [X]px | 卡片 |
| `--radius-lg` | [X]px | 大容器 |
| `--radius-full` | 9999px | 圆形 |

### 阴影
| Token | 值 | 用途 |
|-------|-----|------|
| `--shadow-sm` | ... | 微阴影 |
| `--shadow-md` | ... | 卡片阴影 |
| `--shadow-lg` | ... | 浮层阴影 |

---

## 5. Transitions

| Token | 值 | 用途 |
|-------|-----|------|
| `--transition-fast` | 150ms ease-out | hover 反馈 |
| `--transition-base` | 200ms ease-out | 通用过渡 |
| `--transition-slow` | 300ms ease-out | 展开/收起 |
| `--transition-elegant` | 400ms cubic-bezier(0.4,0,0.2,1) | 优雅动效 |

---

## 6. Component Styles

### Buttons
| 类型 | 样式规则 |
|------|---------|
| Primary | bg: primary-600, text: white, radius: sm, shadow: sm |
| Secondary | bg: transparent, border: primary-600, text: primary-600 |
| Ghost | bg: transparent, text: primary-600, hover: primary-50 |

### Cards
- 背景: `--color-surface`
- 圆角: `--radius-lg`
- 阴影: `--shadow-md`
- 内间距: `--space-6`

### Forms
- 输入框高度: 44px（可访问性最小值）
- 圆角: `--radius-sm`
- 边框: `--color-border`
- Focus: `--color-primary-500` ring
