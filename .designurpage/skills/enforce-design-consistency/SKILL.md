---
name: enforce-design-consistency
description: "设计一致性检查与修复。扫描全站确保所有组件遵循设计系统。Enforce design system consistency across all pages and components."
argument-hint: [scope: all | page-path]
allowed-tools: Read, Write, Edit, Grep, Glob
---

# Enforce Design Consistency — 设计一致性守护

> 确保每个像素都遵循 DESIGN_SYSTEM.md 定义的规则

## Input

`$ARGUMENTS` — 检查范围
- "all"：全站扫描
- 文件路径：只检查指定文件
- 无参数时：扫描 `src/` 下所有 HTML/CSS 文件

## Workflow

### Phase A: 加载设计规则

读取 `DESIGN_SYSTEM.md`，提取所有 design tokens：
- 颜色变量：`--color-*`
- 字体变量：`--font-*`
- 间距变量：`--spacing-*`
- 圆角变量：`--radius-*`
- 阴影变量：`--shadow-*`
- 动效变量：`--transition-*`

### Phase B: 扫描违规

遍历所有 HTML/CSS/JS 文件，查找：

1. **硬编码颜色** — `color: #xxx` 或 `background: rgb(...)` 而不是 `var(--color-*)`
2. **硬编码字体** — `font-family: "xxx"` 而不是 `var(--font-*)`
3. **非系统间距** — 不在 4/8px 倍数系统内的间距值
4. **不一致的圆角** — 同类组件使用不同的 border-radius
5. **不一致的阴影** — 自定义 shadow 而不是系统变量
6. **孤立样式** — 只出现一次的特殊样式值

### Phase C: 输出一致性报告

```markdown
## Design Consistency Report

### 一致性评分: [X%]

### 违规列表
| 文件 | 行号 | 类型 | 当前值 | 应为 | 自动修复？ |
|------|------|------|--------|------|-----------|
| ... | ... | 硬编码颜色 | #333 | var(--color-text) | ✅ |

### 统计
- 硬编码颜色: X 处
- 硬编码字体: X 处
- 非系统间距: X 处
- 不一致圆角: X 处
```

### 🚦 Checkpoint: Auto-fix Decision

- **展示**: 一致性报告
- **询问**: "发现 N 处可自动修复的违规。是否执行自动修复？"
- **全部修复 →** 逐文件 Edit，将硬编码值替换为 CSS 变量
- **选择修复 →** 用户指定要改的项目
- **跳过 →** 仅保存报告

### Phase D: 执行修复（如确认）

对每个可自动修复的违规：
1. 使用 Edit 工具替换硬编码值为 CSS 变量
2. 如果需要新增变量 → 追加到 `variables.css` 并更新 `DESIGN_SYSTEM.md`
3. 更新 `BUILD_LOG.md` 记录修改

## Key Rules

1. **只替换确定的映射** — 如果不确定应映射到哪个变量，标记为"需人工确认"
2. **不修改设计系统本身** — 只修改使用端，不动 `DESIGN_SYSTEM.md` 的定义
3. **保留特殊情况** — 如果有注释说明特殊原因的硬编码值，跳过

## Composing with Other Skills

- 大量不一致时 → `/generate-design-system` 可能需要重新审视设计系统
- 修复后 → `/critique-design` 重新评分
