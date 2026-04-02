---
name: optimize-images
description: "图片优化 — 压缩、格式转换（WebP/AVIF）、响应式 srcset 生成、性能审计。Optimize images: compress, convert to WebP/AVIF, generate responsive srcset, audit performance."
argument-hint: [scope: all | file-path]
allowed-tools: Read, Write, Edit, Bash(*), Grep, Glob
---

# Optimize Images — 图片优化

> 图片通常占网页总体积的 50%+ — 优化图片是性能提升投入产出比最高的手段

## Input

`$ARGUMENTS` — 优化范围
- `all`: 优化 `src/assets/images/` 下所有图片
- 具体路径: 优化单个文件（如 `src/assets/images/avatar.jpg`）

## Prerequisites

- `src/assets/images/` 中有图片文件
- Node.js 环境可用（用于调用 sharp 或 CLI 工具）

## Workflow

### Phase A: Image Audit — 图片审计

扫描所有图片，生成优化报告：

```
📊 Image Audit Report
─────────────────────────────────────
File                    Size    Format  Dimensions  Status
avatar.jpg              245KB   JPEG    800×800     ⚠️ Needs resize + WebP
hero-bg.png             1.8MB   PNG     3840×2160   🔴 Too large, needs compress
projects/project-1.jpg  120KB   JPEG    1200×900    ✅ OK
og-image.png            340KB   PNG     1200×630    ⚠️ Needs WebP variant
─────────────────────────────────────
Total: 2.5MB → Target: ~500KB (80% reduction)
```

#### 审计规则

| 检查项 | 阈值 | 操作 |
|--------|------|------|
| 单文件大小 | > 200KB | 压缩 |
| 总图片大小 | > 1MB | 警告 |
| 格式 | 非 WebP/AVIF | 生成现代格式 |
| 分辨率 | > 实际显示尺寸的 2x | 缩小 |
| 未使用 | 文件未被 HTML 引用 | 标记 |

### Phase B: Optimization Pipeline — 优化流水线

对每张图片执行以下流程：

```
原图 → 尺寸校正 → 压缩 → 格式转换 → srcset 生成
```

#### Step 1: 尺寸校正

根据图片用途确定目标尺寸：

| 用途 | 最大显示尺寸 | 输出尺寸 (1x/2x) |
|------|-------------|-----------------|
| Avatar | 120×120 CSS px | 240×240 |
| Project card | 400×300 CSS px | 800×600 |
| Hero background | viewport width | 1920×1080 max |
| OG Image | 1200×630 (固定) | 1200×630 |
| Favicon SVG | 任意缩放 | 保持矢量 |

#### Step 2: 压缩

使用 sharp（Node.js）或 CLI 工具：

```bash
# 如果 sharp 可用（推荐）
npx sharp-cli --input avatar.jpg --output avatar.jpg --quality 85

# 回退方案：使用 CSS/HTML 约束
# 在 <img> 上设置 width/height，浏览器自动缩放
```

**压缩质量建议**：
- JPEG: quality 80-85（视觉无损）
- WebP: quality 80（比 JPEG 小 25-35%）
- AVIF: quality 65（比 WebP 再小 20%）
- PNG: 仅用于需要透明度的图片

#### Step 3: 格式转换

为每张 JPEG/PNG 生成 WebP 变体：

```
avatar.jpg     → avatar.webp      (WebP 版本)
project-1.jpg  → project-1.webp   (WebP 版本)
hero-bg.png    → hero-bg.webp     (WebP 版本)
```

输出目录结构：
```
src/assets/images/
├── avatar.jpg              # 原格式（回退）
├── avatar.webp             # WebP（优先）
├── projects/
│   ├── project-1.jpg
│   ├── project-1.webp
│   └── ...
└── hero-bg.webp
```

#### Step 4: Responsive srcset 生成

为大图生成多尺寸变体：

```html
<!-- Hero background: 3 sizes for responsive -->
<picture>
  <source srcset="assets/images/hero-bg-480.webp 480w,
                  assets/images/hero-bg-960.webp 960w,
                  assets/images/hero-bg-1920.webp 1920w"
          sizes="100vw"
          type="image/webp">
  <img src="assets/images/hero-bg-960.jpg"
       alt=""
       loading="eager"
       width="1920" height="1080">
</picture>
```

srcset 断点：
- 小图（avatar, icon）: 不需要 srcset，直接输出 2x
- 中图（card image）: 400w, 800w
- 大图（hero bg）: 480w, 960w, 1920w

### Phase C: HTML Update — 更新引用

自动更新 HTML 中的图片引用：

1. 将 `<img>` 升级为 `<picture>` + `<source>`
2. 添加 `loading="lazy"` (非首屏) / `loading="eager"` (首屏)
3. 添加 `width` + `height` 属性
4. 添加 `decoding="async"` (非首屏)

### Phase D: Optimization Report — 优化报告

```
✅ Image Optimization Complete
─────────────────────────────────────
Before: 2.5MB (4 files)
After:  487KB (8 files, including WebP variants)
Saved:  2.0MB (80.5% reduction)

Changes:
  avatar.jpg       245KB → 48KB  (WebP, resized to 240×240)
  hero-bg.png     1.8MB → 280KB  (WebP, resized to 1920×1080)
  project-1.jpg    120KB → 89KB  (WebP variant added)
  og-image.png     340KB → 70KB  (WebP, kept PNG for social)
─────────────────────────────────────
```

### 🚦 Checkpoint: Optimization Review

- **展示**: 优化前后对比报告
- **询问**: "图片质量可以接受吗？需要调整压缩级别吗？"
- **确认 →** 更新 BUILD_LOG.md
- **调整 →** 修改质量参数重新优化

## Key Rules

1. **永远保留原图** — 优化生成新文件，不覆盖原图
2. **WebP 为默认** — 所有 JPEG/PNG 都生成 WebP 变体
3. **2x 为上限** — 不需要 3x，2x Retina 足够
4. **首屏图片预加载** — Hero 区域的图片加 `<link rel="preload">`
5. **OG Image 保持 PNG** — 社交平台对 WebP 支持不一致

## No-dependency Fallback — 无依赖回退方案

如果 sharp 不可用，使用纯 HTML/CSS 优化策略：

1. 手动设置 `width`/`height` 属性
2. 添加 `loading="lazy"` / `decoding="async"`
3. 使用 CSS `object-fit: cover` 控制裁剪
4. 提醒用户使用在线工具（如 squoosh.app）手动压缩
5. 生成 `<picture>` 结构，用户自行准备 WebP 文件

## CSS Utilities for Images

生成到 `src/styles/components.css`：

```css
/* 响应式图片容器 */
.image-container {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-lg);
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-base);
}

/* 图片 hover 效果（根据 interaction.hover 决定） */
.image-container:hover img {
  transform: scale(1.05);
}

/* 固定宽高比容器 */
.aspect-16-9 { aspect-ratio: 16 / 9; }
.aspect-4-3  { aspect-ratio: 4 / 3; }
.aspect-1-1  { aspect-ratio: 1 / 1; }

/* Avatar 圆形 */
.avatar {
  border-radius: var(--radius-full);
  object-fit: cover;
}

/* 渐进加载 placeholder */
.image-loading {
  background: var(--gradient-subtle);
  animation: image-pulse 1.5s ease-in-out infinite;
}

@keyframes image-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}
```

## Integration

- `/manage-assets` — 先用 manage-assets 绑定素材，再调用本 skill 优化
- `/performance-check` — 本 skill 执行后应通过性能审计
- `/apply-responsive-design` — srcset 与响应式设计配合
