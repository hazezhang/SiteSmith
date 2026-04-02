---
name: generate-hero
description: "生成 Hero 首屏区域。网站第一印象，含标题、副标题、CTA、可选背景图/动效。Generate hero section — the first impression."
argument-hint: [hero-style: centered | split | fullscreen | minimal]
allowed-tools: Read, Write, Edit, Grep, Glob
---

# Generate Hero — 首屏区域生成

> 首屏决定用户是否继续浏览 — 必须是全站最精心设计的部分

## Input

`$ARGUMENTS` — Hero 布局风格
- `centered`: 文字居中（默认）
- `split`: 左文右图
- `fullscreen`: 全屏背景 + 叠加文字
- `minimal`: 仅大标题 + 一行描述

## Prerequisites

- `DESIGN_INTENT.md` — 首屏重点
- `DESIGN_SYSTEM.md` — 样式 tokens

## Workflow

### Phase A: 确定 Hero 内容

从 `DESIGN_INTENT.md` 提取：
- 核心标题（一句话说明你是谁/做什么）
- 副标题/描述
- CTA 按钮文案和目标
- 是否需要背景图/插图/动效

### Phase B: 生成 Hero

根据选择的布局风格生成：
1. HTML 结构（语义化 `<section>` 或 `<div>`）
2. CSS 样式（使用设计系统 tokens）
3. 响应式适配（mobile 自动调整为堆叠布局）
4. 可选入场动效（fade-in, slide-up）

### Phase C: 视觉焦点检查

确认：
- 标题是否足够醒目？（使用 `--text-4xl` + `--weight-bold`）
- CTA 是否突出？（使用 `--color-primary` + 足够的对比度）
- 留白是否充分？（上下至少 `--space-24`）

### 🚦 Checkpoint: Hero Preview

- **展示**: Hero 区域效果
- **询问**: "首屏给你什么感觉？标题和CTA够突出吗？"
- **确认 →** 保存 + 更新 BUILD_LOG.md
- **调整 →** 修改布局/文案/样式

## Asset Slots — 素材插槽

Hero 区域支持以下素材插槽，有素材时绑定真实图片，无素材时使用 placeholder：

| 插槽 | 文件路径 | Placeholder |
|------|---------|-------------|
| 头像 | `assets/images/avatar.*` | 首字母 SVG 圆形（使用设计系统配色）|
| 背景图 | `assets/images/hero-bg.*` | CSS gradient（匹配 DSL color 维度）|

**头像绑定示例**：
```html
<!-- 有素材时 -->
<img src="assets/images/avatar.webp" alt="Name" class="hero-avatar"
     width="120" height="120" loading="eager">

<!-- 无素材时（SVG placeholder）-->
<svg class="hero-avatar" viewBox="0 0 120 120" width="120" height="120">
  <rect width="120" height="120" rx="60" fill="url(#avatar-gradient)"/>
  <text x="60" y="65" text-anchor="middle" fill="white" font-size="48">HZ</text>
</svg>
```

**背景图绑定示例**（fullscreen 布局）：
```html
<section class="hero" style="background-image: url('assets/images/hero-bg.webp')">
  <div class="hero-overlay">...</div>
</section>
```

使用 `/manage-assets bind` 可以自动完成素材绑定。

## Key Rules

1. **一个焦点** — Hero 区域只有一个核心信息 + 一个 CTA
2. **大字体** — 标题至少 `--text-3xl`（mobile）/ `--text-4xl`（desktop）
3. **对比度** — CTA 按钮必须是视觉上最突出的元素
4. **头像 loading="eager"** — 首屏资源不延迟加载
5. **设置 width/height** — 防止布局偏移（CLS）
