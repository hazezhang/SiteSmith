---
name: suggest-interaction
description: "微交互顾问。为组件建议 hover/scroll/transition 等交互效果，调整'阻尼感'。Micro-interaction advisor for buttons, scroll, transitions."
argument-hint: [component-or-page]
allowed-tools: Read, Write, Edit, Grep, Glob, mcp__Claude_Preview__preview_start, mcp__Claude_Preview__preview_screenshot, mcp__Claude_Preview__preview_eval
---

# Micro-interaction Advisor — 微交互顾问

> 按钮的 hover 手感、滚动的阻尼感、加载的节奏感 — 这些细节决定网站品质

## Input

`$ARGUMENTS` — 要添加/调整交互的组件或页面
- 组件名：如 "button", "navbar", "card"
- 文件路径：如 "src/components/hero.html"
- "all"：为整站建议交互方案

## Constants

- **INTERACTION_LEVEL = `auto`** — 交互丰富度，auto 时根据 DESIGN_INTENT 推断
  - `minimal`: 仅基础 hover + focus
  - `moderate`: hover + 滚动 + 页面过渡
  - `rich`: 视差 + 微动效 + 创意交互
> 💡 Override: `/suggest-interaction "button" — level: rich`

## Workflow

### Phase A: 理解交互上下文

1. 读取 `DESIGN_INTENT.md` — 用户的动效偏好
2. 读取 `DESIGN_SYSTEM.md` — 当前动效 tokens
3. 读取目标组件/页面代码
4. 确定 INTERACTION_LEVEL（auto → 从 intent 推断）

### Phase B: 逐组件建议交互

为每个组件/元素生成交互建议：

```json
{
  "component": "primary-button",
  "current_interaction": "none",
  "suggestions": [
    {
      "trigger": "hover",
      "effect": "scale(1.02) + shadow elevation",
      "duration": "180ms",
      "easing": "ease-out",
      "css": "transform: scale(1.02); box-shadow: 0 4px 12px rgba(0,0,0,0.15);",
      "reason": "微放大提供点击反馈感，shadow 增加深度"
    },
    {
      "trigger": "active",
      "effect": "scale(0.98)",
      "duration": "80ms",
      "easing": "ease-in",
      "css": "transform: scale(0.98);",
      "reason": "按下回弹感，增加物理反馈"
    },
    {
      "trigger": "focus-visible",
      "effect": "outline ring",
      "css": "outline: 2px solid var(--color-accent); outline-offset: 2px;",
      "reason": "键盘导航可访问性"
    }
  ]
}
```

### Phase C: 滚动体验建议

```json
{
  "scroll_behavior": "smooth",
  "suggestions": [
    {
      "element": "hero → about transition",
      "effect": "fade-in on scroll",
      "implementation": "IntersectionObserver + opacity transition",
      "threshold": "0.2",
      "reason": "渐入效果引导视线，不打断阅读节奏"
    },
    {
      "element": "project cards",
      "effect": "stagger reveal",
      "implementation": "IntersectionObserver + translateY(20px) + stagger delay",
      "reason": "卡片逐个出现比同时出现更有节奏感"
    }
  ]
}
```

### Phase D: 阻尼感调优指南

> "阻尼感"是交互品质的核心 — 不是动效多少，而是手感对不对

| 风格 | 推荐 easing | duration | 感受 |
|------|-----------|----------|------|
| 轻盈 | ease-out, cubic-bezier(0.25, 0, 0.25, 1) | 150-200ms | 快速响应，不拖泥带水 |
| 弹性 | cubic-bezier(0.34, 1.56, 0.64, 1) | 300-400ms | 活泼有趣 |
| 优雅 | cubic-bezier(0.4, 0, 0.2, 1) | 300-500ms | 从容不迫 |
| 精准 | ease-in-out | 200-250ms | 专业克制 |

### 🚦 Checkpoint: Interaction Review

- **展示**: 所有交互建议 + 预期效果描述
- **询问**: "这些交互感觉如何？需要调整哪些？'更弹一点''更克制一点'都可以"
- **确认 →** 生成 CSS/JS 代码并应用到组件
- **调整 →** 根据反馈修改 duration/easing/effect
- **跳过 →** 不添加交互

### Phase E: 生成交互代码

确认后，输出：
1. CSS transitions/animations 添加到 `styles/interactions.css`
2. JavaScript（如需要）添加到 `scripts/interactions.js`
3. 确保所有交互遵守 `prefers-reduced-motion`

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Key Rules

1. **手感 > 炫技** — 好的交互是用户几乎注意不到但体验很好
2. **尊重 prefers-reduced-motion** — 永远提供 reduced motion 方案
3. **一致的节奏** — 全站的 timing 和 easing 要统一
4. **性能优先** — 只动 transform 和 opacity，不动 layout 属性

## Composing with Other Skills

- 交互应用后 → `/performance-check` 确认无性能影响
- 需要整体风格调整 → `/refine-design-style` 连带更新交互 tokens
