---
name: apply-responsive-design
description: "响应式适配。检查并优化页面在 mobile/tablet/desktop 三端的表现。Apply responsive design across all viewports."
argument-hint: [page-path-or-all]
allowed-tools: Read, Write, Edit, Grep, Glob, mcp__Claude_Preview__preview_start, mcp__Claude_Preview__preview_screenshot, mcp__Claude_Preview__preview_resize, mcp__Claude_Preview__preview_eval
---

# Apply Responsive Design — 响应式适配

> Mobile-first: 从最小屏幕开始确保体验

## Input

`$ARGUMENTS` — 目标页面路径或 "all"

## Workflow

### Phase A: 多视口检查

使用 Preview 工具在三个视口截图：
1. Mobile: 375px × 812px
2. Tablet: 768px × 1024px
3. Desktop: 1440px × 900px

### Phase B: 发现问题

检查每个视口：
- 文字是否可读？（mobile 最小 14px）
- 布局是否溢出？
- 触摸目标是否 ≥ 44px？
- 图片是否正确缩放？
- 导航是否正确切换（desktop ↔ mobile）？
- 间距是否合理？

### Phase C: 修复问题

对发现的问题：
1. 添加/调整 media queries
2. 使用 `clamp()` 做流体字体
3. 使用 `min()` / `max()` 做流体间距
4. 图片添加 `max-width: 100%` + `height: auto`
5. Grid/Flex 调整列数

### 🚦 Checkpoint: Responsive Review

- **展示**: 三端截图对比
- **确认 →** 更新 BUILD_LOG.md
- **调整 →** 针对具体视口修改

## Key Rules

1. **Mobile-first** — 基础样式为 mobile，通过 `min-width` 媒体查询增强
2. **断点**: sm=640px, md=768px, lg=1024px, xl=1280px
3. **流体优先** — 尽量用 `clamp()` 代替硬断点
