---
name: refactor-layout
description: "重构页面布局。调整组件排列和空间分配，保持内容和样式不变。Refactor page layout while preserving content and styles."
argument-hint: [page-path "layout-description"]
allowed-tools: Read, Write, Edit, Grep, Glob, mcp__Claude_Preview__preview_start, mcp__Claude_Preview__preview_screenshot, mcp__Claude_Preview__preview_resize
---

# Refactor Layout — 布局重构

> 重新组织组件的空间关系，不改变内容和视觉样式

## Input

`$ARGUMENTS` — 两部分：
1. 页面路径
2. 布局调整描述

示例：
- `"src/index.html" "把 projects 和 about 的顺序换一下"`
- `"src/pages/projects.html" "从列表改成网格布局"`
- `"src/index.html" "hero 区域改成左文右图"`

## Workflow

### Phase A: 理解当前布局

1. 读取页面代码，分析当前 section 结构
2. 生成当前布局的 ASCII 示意图：
   ```
   Current Layout:
   ┌──────────────────────┐
   │      Navbar          │
   ├──────────────────────┤
   │      Hero (centered) │
   ├──────────────────────┤
   │      About           │
   ├──────────────────────┤
   │      Projects        │
   ├──────────────────────┤
   │      Footer          │
   └──────────────────────┘
   ```

### Phase B: 设计新布局

根据用户请求生成新布局示意：
   ```
   New Layout:
   ┌──────────────────────┐
   │      Navbar          │
   ├───────────┬──────────┤
   │  Hero     │  Hero    │
   │  Text     │  Image   │
   ├───────────┴──────────┤
   │      Projects        │
   ├──────────────────────┤
   │      About           │
   ├──────────────────────┤
   │      Footer          │
   └──────────────────────┘
   ```

### 🚦 Checkpoint: Layout Plan

- **展示**: 当前布局 vs 新布局 ASCII 图
- **确认 →** 执行重构
- **调整 →** 修改新布局方案

### Phase C: 执行重构

1. 调整 HTML 中 section 的顺序
2. 修改 CSS Grid/Flex 布局属性
3. 保持所有内容和组件样式不变
4. 确保响应式仍然正确（mobile 可能需要不同的 section 顺序）

### Phase D: 验证

1. Preview 三端截图
2. 确认内容完整性（没有丢失/重复的内容）
3. 更新 `BUILD_LOG.md`

## Key Rules

1. **只改布局** — 不动内容文字、不动组件内部样式
2. **保持语义** — HTML 结构调整后仍保持语义正确
3. **响应式检查** — 布局改了，mobile 端也要验证
