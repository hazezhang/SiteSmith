---
name: analyze-layout
description: "布局智能分析。评估当前布局合理性，发现问题并给出改进建议。Analyze layout and suggest improvements."
argument-hint: [page-path-or-section]
allowed-tools: Read, Write, Edit, Grep, Glob, mcp__Claude_Preview__preview_start, mcp__Claude_Preview__preview_screenshot, mcp__Claude_Preview__preview_resize, mcp__Claude_Preview__preview_eval
---

# Layout Intelligence — 布局智能分析

> 设计师看布局时的思考过程：信息层级、视觉锚点、空间利用

## Input

`$ARGUMENTS` — 要分析的页面路径或区域名称
- 如果是文件路径：读取并分析代码
- 如果是 "all"：分析所有已生成的页面
- 无参数时：分析 `SITE_BLUEPRINT.md` 规划的布局

## Workflow

### Phase A: 读取布局信息

1. 读取目标页面代码（如果已生成）
2. 读取 `DESIGN_INTENT.md` — 了解用户期望
3. 读取 `DESIGN_SYSTEM.md` — 了解设计约束
4. 如果可能，使用 Preview 工具截图查看实际渲染效果

### Phase B: 布局分析（5维度评估）

#### 1. 视觉锚点（Visual Anchor）
- 首屏是否有明确的视觉焦点？
- CTA 是否足够突出？
- 用户第一眼看到什么？

#### 2. 信息层级（Information Hierarchy）
- 标题大小层级是否清晰？
- 重要信息是否在视觉优先位置？
- 信息分组是否合理？

#### 3. 空间利用（Space Usage）
- 留白是否充足且有节奏？
- 信息密度是否与风格匹配？
- 是否有"视觉拥挤"或"过于空旷"的区域？

#### 4. 流动性（Flow）
- 用户视线路径是否自然？（Z-pattern / F-pattern）
- section 之间的过渡是否流畅？
- 滚动节奏是否合理？

#### 5. 响应式适配（Responsive）
- 布局在 mobile/tablet 上是否合理？
- 是否有溢出或遮挡问题？
- 触摸目标是否足够大？

### Phase C: 输出分析报告

```markdown
## Layout Analysis Report

### 总体评分: [A/B/C/D] — [一句话总结]

### 发现的问题
1. 🔴 [严重] ...
2. 🟡 [建议] ...
3. 🟢 [良好] ...

### 改进建议
1. **[问题]** → [具体建议]
   - 实现方式: [CSS/HTML 修改提示]

### 建议的布局调整
[文字描述或 ASCII 布局图]
```

### 🚦 Checkpoint: Layout Improvement Decision

- **展示**: 分析报告 + 改进建议
- **询问**: "是否要应用这些布局改进？可以选择全部或部分"
- **应用全部 →** 调用 `/refactor-layout` 执行所有改进
- **选择部分 →** 标记要应用的建议，调用 `/patch-component`
- **跳过 →** 记录分析结果，不做修改

## Key Rules

1. **给出具体建议**，不只是"布局不好" — 要说明什么不好 + 怎么改
2. **结合设计意图** — 布局好坏要参照用户的目标风格判断
3. **优先使用 Preview** — 如果能截图，优先基于视觉分析

## Composing with Other Skills

- 发现布局问题 → `/refactor-layout` 执行调整
- 发现组件问题 → `/patch-component` 局部修复
- 发现设计系统不一致 → `/enforce-design-consistency`
