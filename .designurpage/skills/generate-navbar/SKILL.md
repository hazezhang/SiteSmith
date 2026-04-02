---
name: generate-navbar
description: "生成导航栏组件。含桌面导航+移动端汉堡菜单+暗色模式切换。Generate navbar with mobile menu and dark mode toggle."
argument-hint: [style: fixed | sticky | static]
allowed-tools: Read, Write, Edit, Grep, Glob
---

# Generate Navbar — 导航栏生成

## Input

`$ARGUMENTS` — 导航栏行为
- `fixed`: 固定在顶部（默认）
- `sticky`: 滚动后固定
- `static`: 不固定

## Prerequisites

- `SITE_BLUEPRINT.md` — 页面列表（导航项）
- `DESIGN_SYSTEM.md` — 样式 tokens

## Workflow

1. 从 `SITE_BLUEPRINT.md` 提取导航项列表
2. 生成导航栏包含：
   - Logo / 站名
   - 导航链接
   - 暗色模式切换按钮（如果 DESIGN_INTENT 要求）
   - 移动端汉堡菜单 + slide/fade menu
3. HTML: `<nav>` + `<ul>` 语义结构
4. CSS: 响应式断点切换（desktop → mobile）
5. JS: 汉堡菜单 toggle + 暗色模式 toggle
6. 确保键盘可导航（Tab + Enter/Space）

### 🚦 Checkpoint: Navbar Preview

- **展示**: 导航栏效果描述（desktop + mobile 模式）
- **确认 →** 保存到组件文件 + 更新 BUILD_LOG.md

## Composing with Other Skills

- 交互优化 → `/suggest-interaction "navbar"`
