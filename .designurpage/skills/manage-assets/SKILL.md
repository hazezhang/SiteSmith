---
name: manage-assets
description: "素材管理 — 用户提供图片/图标等素材，系统自动放置到正确位置并生成引用代码。Manage user-provided assets (images, icons, avatars) with auto-placement and template binding."
argument-hint: [action: inventory | bind | placeholder]
allowed-tools: Read, Write, Edit, Bash(*), Grep, Glob
---

# Manage Assets — 素材管理

> 用户提供的素材（头像、项目截图、Logo 等）是网站个性化的关键 — 系统负责组织、优化和绑定

## Input

`$ARGUMENTS` — 操作类型
- `inventory`: 扫描 `src/assets/` 现有素材，生成清单
- `bind`: 将素材绑定到页面组件（替换 placeholder）
- `placeholder`: 为缺失素材生成高质量 placeholder

## Prerequisites

- `src/assets/` 目录存在（由 `/project-scaffold` 创建）
- `DESIGN_SYSTEM.md` 存在（用于 placeholder 风格匹配）

## Asset Directory Convention

```
src/assets/
├── images/
│   ├── avatar.{jpg,png,webp}         # 个人头像（推荐 400×400+）
│   ├── hero-bg.{jpg,png,webp}        # Hero 背景图（推荐 1920×1080+）
│   ├── og-image.{jpg,png}            # 社交分享图（推荐 1200×630）
│   └── projects/                     # 项目截图
│       ├── project-1.{jpg,png,webp}  # 推荐 800×600+
│       ├── project-2.{jpg,png,webp}
│       └── ...
├── icons/
│   ├── favicon.ico                   # 16×16 + 32×32
│   ├── favicon.svg                   # 矢量 favicon（现代浏览器）
│   ├── apple-touch-icon.png          # 180×180
│   └── icon-192.png                  # PWA icon
└── fonts/                            # 自定义字体（可选）
    └── ...
```

## Workflow

### Phase A: Asset Inventory — 素材盘点

1. 扫描 `src/assets/` 目录
2. 生成素材清单，标注每个文件的：
   - 文件名、格式、大小
   - 推荐用途（根据文件名/尺寸推断）
   - 优化状态（是否需要压缩/转 WebP）

3. 检查缺失的关键素材：

| 素材 | 必要性 | 用途 |
|------|--------|------|
| `avatar.*` | 推荐 | Hero 区头像、About 页 |
| `og-image.*` | 推荐 | 社交分享预览图 |
| `favicon.*` | 必需 | 浏览器标签页图标 |
| `projects/*` | 可选 | 项目卡片配图 |
| `hero-bg.*` | 可选 | Hero 背景图（fullscreen 布局时）|

### Phase B: Asset Binding — 素材绑定

将用户素材绑定到 HTML 组件，替换 placeholder：

#### 头像绑定
```html
<!-- Before: placeholder -->
<div class="hero-avatar">HZ</div>

<!-- After: real image -->
<img src="assets/images/avatar.webp"
     alt="Hazel Zhang"
     class="hero-avatar"
     width="120" height="120"
     loading="eager">
```

#### 项目截图绑定
```html
<!-- Before: gradient placeholder -->
<div class="card-image" style="background: var(--gradient-subtle)">
  &#128640;
</div>

<!-- After: real screenshot -->
<div class="card-image">
  <picture>
    <source srcset="assets/images/projects/project-1.webp" type="image/webp">
    <img src="assets/images/projects/project-1.jpg"
         alt="SiteSmith — Website Generation Agent"
         loading="lazy"
         width="800" height="600">
  </picture>
</div>
```

#### Open Graph 绑定
```html
<meta property="og:image" content="assets/images/og-image.png">
```

#### Favicon 绑定
```html
<link rel="icon" href="assets/icons/favicon.svg" type="image/svg+xml">
<link rel="icon" href="assets/icons/favicon.ico" sizes="32x32">
<link rel="apple-touch-icon" href="assets/icons/apple-touch-icon.png">
```

### Phase C: Placeholder Generation — 占位图生成

当用户暂时没有素材时，生成风格匹配的 placeholder：

1. **Avatar placeholder** — 从名字生成首字母圆形，使用设计系统颜色
2. **Project card placeholder** — SVG gradient + 图标，匹配 color mode
3. **Hero background** — 纯 CSS gradient，匹配 DSL color 维度
4. **OG Image placeholder** — 带文字的 SVG（名字 + 职位 + 设计系统配色）

Placeholder 使用 CSS/SVG 生成，无外部依赖：
```html
<!-- SVG avatar placeholder -->
<svg class="hero-avatar" viewBox="0 0 120 120" width="120" height="120">
  <rect width="120" height="120" rx="60" fill="url(#avatar-gradient)"/>
  <text x="60" y="65" text-anchor="middle" fill="white"
        font-size="48" font-family="var(--font-heading)">HZ</text>
  <defs>
    <linearGradient id="avatar-gradient" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="var(--color-primary)"/>
      <stop offset="100%" stop-color="var(--color-accent)"/>
    </linearGradient>
  </defs>
</svg>
```

### 🚦 Checkpoint: Asset Review

- **展示**: 素材绑定前后对比（placeholder vs 真实素材）
- **询问**: "这些素材放置正确吗？需要调整位置或裁剪吗？"
- **确认 →** 更新 BUILD_LOG.md，标记已绑定素材
- **缺素材 →** 提示用户提供，或用 placeholder 继续

## Key Rules

1. **永远设置 width/height** — 防止 CLS (Cumulative Layout Shift)
2. **永远设置 alt 文本** — 可访问性要求，装饰图用 `alt=""`
3. **Hero 头像用 `loading="eager"`** — 首屏资源不延迟加载
4. **其他图片用 `loading="lazy"`** — 非首屏资源延迟加载
5. **优先 WebP** — 用 `<picture>` + `<source>` 提供回退
6. **路径一致** — 所有路径相对于 `src/`，用 `assets/images/` 前缀

## Integration with Other Skills

- `/optimize-images` — 绑定后自动调用，压缩 + 转格式
- `/performance-check` — 审计图片大小、格式、loading 属性
- `/accessibility-audit` — 检查 alt 文本
- `/seo-optimizer` — 绑定 og:image
