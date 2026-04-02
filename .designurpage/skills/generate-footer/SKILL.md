---
name: generate-footer
description: "生成页脚组件。含社交链接、导航、版权信息。Generate footer with social links and copyright."
argument-hint: [style: simple | detailed]
allowed-tools: Read, Write, Edit, Grep, Glob
---

# Generate Footer — 页脚生成

## Input

`$ARGUMENTS` — 页脚风格
- `simple` (默认): 一行版权 + 社交链接
- `detailed`: 多列布局（导航 + 联系 + 社交 + 版权）

## Prerequisites

- `DESIGN_SYSTEM.md` — 样式 tokens
- `SITE_BLUEPRINT.md` — 页面列表（页脚导航）

## Workflow

1. 读取蓝图获取导航项和社交链接需求
2. 生成页脚：
   - `<footer>` 语义结构
   - 社交链接（SVG icons，`rel="noopener noreferrer"`）
   - 版权信息（自动获取当前年份）
   - 返回顶部链接（可选）
3. 响应式：mobile 端堆叠排列

### 🚦 Checkpoint: Footer Review

- **展示**: 页脚效果
- **确认 →** 保存 + 更新 BUILD_LOG.md
