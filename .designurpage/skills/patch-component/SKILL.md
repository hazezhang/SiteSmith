---
name: patch-component
description: "局部修改组件。不重生成，只做 diff 更新。保持设计系统一致性。Patch a component with minimal diff, not regeneration."
argument-hint: [component-path "feedback"]
allowed-tools: Read, Write, Edit, Grep, Glob, mcp__Claude_Preview__preview_start, mcp__Claude_Preview__preview_screenshot
---

# Patch Component — 组件局部修改

> 核心原则：**不重生成，只做 diff**

## Input

`$ARGUMENTS` — 两部分：
1. 组件路径或名称
2. 修改描述

示例：
- `"src/components/hero.html" "CTA按钮不够突出"`
- `"navbar" "添加一个暗色模式切换按钮"`
- `"project-card" "图片太小了，想要更大"`

## Workflow

### Phase A: 理解修改上下文

1. 读取目标组件代码
2. 读取 `DESIGN_SYSTEM.md` — 确保修改后仍遵循设计系统
3. 读取 `BUILD_LOG.md` — 了解该组件在哪些页面使用

### Phase B: 计算最小 Diff

分析用户反馈，确定最小修改范围：
- 只是 CSS 调整？→ 只改样式
- 需要 HTML 结构变化？→ 最小化结构修改
- 需要新增元素？→ 在合适位置插入

```markdown
## Patch Plan

**组件**: hero section
**用户反馈**: "CTA按钮不够突出"

**修改方案**:
1. 增大按钮 font-size: --text-base → --text-lg
2. 增加 padding: --space-3 --space-6 → --space-4 --space-8
3. 添加 box-shadow: --shadow-md → --shadow-lg
4. 增加 hover 动效: scale(1.05)

**不修改**:
- 按钮文案
- 按钮颜色（已使用 --color-primary）
- 按钮位置
- 其他所有元素
```

### 🚦 Checkpoint: Patch Preview

- **展示**: 修改计划（具体改什么 + 不改什么）
- **确认 →** 使用 Edit 工具执行修改
- **调整 →** 修改计划后再确认

### Phase C: 执行 Patch

1. 使用 Edit 工具精确替换代码片段
2. 确保修改使用 CSS 变量
3. 如果涉及多页面共享组件 → 所有使用处自动生效

### Phase D: 验证

1. Preview 截图验证修改效果
2. 检查其他使用该组件的页面是否受影响
3. 更新 `BUILD_LOG.md`

## Key Rules

1. **最小修改原则** — 只改需要改的，不碰其他代码
2. **保持一致性** — 修改后仍必须遵循 DESIGN_SYSTEM.md
3. **不复制代码** — 如果是共享组件，只改一处
4. **记录修改** — 更新 BUILD_LOG.md 说明改了什么
