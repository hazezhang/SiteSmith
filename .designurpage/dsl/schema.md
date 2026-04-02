# Design DSL Schema — 设计领域特定语言

> SiteSmith 的核心中间表示：所有设计意图最终都被编译为 Design DSL，所有代码生成都从 DSL 出发

## 7 Design Dimensions（设计维度）

| 维度 | 含义 | 取值范围 |
|------|------|---------|
| `style` | 整体风格 | minimal / modern / creative / editorial / product / cyberpunk / portfolio |
| `layout` | 布局结构 | single-column / grid / asymmetric / reading-column / split / magazine |
| `density` | 信息密度 | low / medium / high |
| `typography` | 排版策略 | 字体配对 + 字号阶梯 + 行高 + 字重策略 |
| `color` | 色彩策略 | monochrome / neutral / soft / vibrant / dark + accent + contrast |
| `interaction` | 交互强度 | low / medium / high + hover/click/focus 具体行为 |
| `motion` | 动效类型 | none / subtle-fade / scroll-driven / micro-interaction / 3D |

## Complete Schema

```json
{
  "$schema": "design-dsl/v1",

  "style": "minimal | modern | creative | editorial | product | cyberpunk | portfolio",

  "layout": {
    "type": "single-column | grid | asymmetric | reading-column | split | magazine",
    "grid": false,
    "columns": 1,
    "alignment": "center | left | mixed",
    "max_width": "720px | 1080px | 1280px | full",
    "section_spacing": "compact | default | generous"
  },

  "density": "low | medium | high",

  "typography": {
    "font_pairing": ["heading-font", "body-font"],
    "scale": "1.125 | 1.2 | 1.25 | 1.333 | 1.5",
    "base_size": "16px | 18px | 20px",
    "line_height": "1.4 | 1.5 | 1.6 | 1.75 | 1.8",
    "weight_strategy": "uniform | contrast | heavy-headings",
    "letter_spacing": "tight | normal | wide",
    "paragraph_width": "55ch | 65ch | 75ch"
  },

  "color": {
    "mode": "monochrome | neutral | soft | vibrant | dark",
    "primary": "#hex",
    "accent": "#hex",
    "background": "#hex",
    "text": "#hex",
    "contrast": "low | medium | high",
    "dark_mode": false
  },

  "interaction": {
    "level": "low | medium | high",
    "hover": "none | opacity | scale | shadow-lift | color-shift | underline",
    "click_feedback": "none | subtle-scale | ripple",
    "focus": "ring | outline | glow",
    "scroll_behavior": "auto | smooth"
  },

  "motion": {
    "type": "none | subtle-fade | fade-in | slide-up | stagger | scroll-driven | micro-interaction | parallax | 3D",
    "duration": "100ms | 150ms | 200ms | 300ms | 500ms",
    "easing": "ease-out | ease-in-out | spring | cubic-bezier(...)",
    "reduced_motion": true,
    "entrance": "fade | slide-up | scale | clip"
  },

  "personality": "string — 1-3 adjectives describing the feel (e.g., 'calm, rational, premium')"
}
```

## Field Details

### `style` — 整体风格标识
决定了其他 6 个维度的默认值基线。选择一个 style 等于选择了一套预设，然后可以逐维度覆盖。

### `layout.type` — 布局模型
| 值 | 含义 | 适用场景 |
|----|------|---------|
| `single-column` | 单列居中 | minimal, editorial, blog |
| `grid` | 网格布局 | portfolio, product, SaaS |
| `asymmetric` | 不对称/打破网格 | creative, art |
| `reading-column` | 阅读优化列（窄宽度） | blog, editorial |
| `split` | 左右分栏 | landing page hero |
| `magazine` | 多栏杂志排版 | editorial, content-heavy |

### `density` — 信息密度
| 值 | 间距倍率 | padding | 元素间距 |
|----|---------|---------|---------|
| `low` | 2x | generous | `--space-8` ~ `--space-16` |
| `medium` | 1x | balanced | `--space-4` ~ `--space-8` |
| `high` | 0.75x | compact | `--space-2` ~ `--space-4` |

### `typography.scale` — 字号阶梯比率
| 比率 | 风格 | h1 ≈ |
|------|------|------|
| 1.125 | minor second — 紧凑 | 1.8rem |
| 1.2 | minor third — 平衡 | 2.5rem |
| 1.25 | major third — 标准 | 3.0rem |
| 1.333 | perfect fourth — 醒目 | 4.2rem |
| 1.5 | perfect fifth — 戏剧性 | 7.6rem |

### `color.mode` — 色彩模式
| 模式 | 含义 | 色彩数 |
|------|------|--------|
| `monochrome` | 单色 + 灰度 | 1 + grays |
| `neutral` | 中性色为主 + 单个accent | 1 accent |
| `soft` | 低饱和暖色系 | 2-3 |
| `vibrant` | 高饱和多彩 | 3-5 |
| `dark` | 深色底 + 亮色字/accent | 1-2 |

### `interaction.hover` — Hover 行为映射
| 值 | CSS |
|----|-----|
| `none` | — |
| `opacity` | `opacity: 0.7` |
| `scale` | `transform: scale(1.03)` |
| `shadow-lift` | `box-shadow: var(--shadow-lg); transform: translateY(-2px)` |
| `color-shift` | `background: var(--color-primary-100)` |
| `underline` | `text-decoration: underline` |

### `motion.type` — 动效类型映射
| 值 | 实现方式 | 适用 |
|----|---------|------|
| `none` | — | minimal, editorial |
| `subtle-fade` | `opacity 0→1, 200ms` | 通用 |
| `fade-in` | `opacity + translateY(10px)` | 内容区 |
| `slide-up` | `translateY(20px→0)` | cards, sections |
| `stagger` | `slide-up + delay per item` | grid items |
| `scroll-driven` | `IntersectionObserver trigger` | creative |
| `micro-interaction` | 按钮/输入框状态变化 | product |
| `parallax` | `background-attachment / transform` | hero |

## Validation Rules

1. `density: "low"` + `layout.type: "grid"` + `columns > 3` → 警告：低密度不适合多列
2. `motion.type: "3D"` + `interaction.level: "low"` → 冲突
3. `color.mode: "monochrome"` + `color.contrast: "low"` → 可读性风险
4. `typography.paragraph_width > 75ch` → 可读性警告
5. `motion.reduced_motion` 必须为 `true`（可访问性要求）
