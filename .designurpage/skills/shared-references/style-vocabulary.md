# Style Vocabulary — 风格词汇 → CSS 映射表

> 当用户用自然语言描述风格时，使用此表将模糊表达转化为具体 CSS 属性

## 整体风格映射

### Minimal（极简）
```css
--border-radius: 0px ~ 4px;
--shadow: none | 0 1px 2px rgba(0,0,0,0.05);
--spacing-scale: generous (1.5x~2x default);
--color-count: 2~3;
--font-weight-body: 300~400;
--decoration: none;
--animation: subtle fade only;
--layout: single-column or asymmetric grid;
```
**关键词**: 简洁、干净、留白多、less is more

### Modern（现代）
```css
--border-radius: 8px ~ 16px;
--shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
--spacing-scale: balanced;
--color-count: 4~5;
--font: geometric sans-serif (Inter, Plus Jakarta Sans);
--decoration: subtle gradients, glassmorphism;
--animation: smooth transitions 200~300ms;
--layout: card-based grid;
```
**关键词**: 科技感、流畅、卡片布局

### Warm（温暖）
```css
--border-radius: 12px ~ 24px;
--color-temperature: warm (amber, orange, cream tones);
--font: rounded sans or soft serif (Nunito, Lora);
--background: off-white (#faf8f5) or warm gray;
--shadow: warm-tinted shadows;
--spacing-scale: comfortable;
--illustration-style: hand-drawn;
```
**关键词**: 亲切、舒适、有温度、friendly

### Elegant（优雅）
```css
--font-heading: serif (Playfair Display, Cormorant);
--font-body: light sans-serif;
--letter-spacing: 0.05em ~ 0.1em (headings);
--text-transform: uppercase (nav, labels);
--color-palette: muted, desaturated;
--spacing-scale: very generous;
--animation: slow, graceful (400ms+);
--layout: editorial, magazine-like;
```
**关键词**: 高级感、杂志风、精致

### Bold / Expressive（大胆/表现力）
```css
--font-heading: display/heavy (900 weight);
--font-size-heading: 4rem+;
--color-contrast: high;
--color-palette: vibrant, saturated;
--border-radius: mixed (0px sharp + 999px pill);
--animation: bouncy, elastic easing;
--layout: broken grid, overlapping elements;
```
**关键词**: 有个性、艺术感、冲击力

### Cyberpunk / Dark Tech（赛博朋克）
```css
--background: #0a0a0a ~ #1a1a2e;
--color-accent: neon (#00ff88, #ff00ff, #00ffff);
--font: monospace or futuristic sans;
--border: 1px solid rgba(neon, 0.3);
--shadow: 0 0 20px rgba(neon, 0.3) (glow effect);
--animation: glitch, flicker;
--text-effect: text-shadow glow;
```
**关键词**: 暗黑、霓虹、未来感、科幻

### Portfolio / Creative（作品集/创意）
```css
--layout: masonry or asymmetric grid;
--image-treatment: full-bleed, hover-zoom;
--typography: mixed sizes, artistic placement;
--scroll-behavior: smooth with parallax hints;
--cursor: custom;
--transition: creative reveals (clip-path, mask);
```
**关键词**: 展示作品、视觉优先、创意排版

## 修饰词映射

| 用户说 | CSS 调整方向 |
|--------|-------------|
| "更温暖" | 色温偏暖 (+hue toward amber), border-radius↑, 字体偏圆润 |
| "更冷/更酷" | 色温偏冷 (+hue toward blue), border-radius↓, 字体偏几何 |
| "更简洁" | 减少颜色数量, 增加留白, 去除装饰, shadow↓ |
| "更丰富" | 增加颜色层次, 添加渐变/纹理, shadow↑ |
| "更活泼" | 强调色饱和度↑, border-radius↑, animation↑, 字重对比↑ |
| "更沉稳" | 饱和度↓, 字体偏衬线, spacing↑, animation↓ |
| "更专业" | 对齐更严格, 颜色克制, 字体偏经典无衬线 |
| "更有个性" | 打破网格, 混合字体, 非常规布局, 自定义光标 |
| "像X但更Y" | 以X风格为基准，在Y维度做增量调整 |

## 色彩情感映射

| 情感/氛围 | 推荐色系 |
|-----------|---------|
| 信任/专业 | 蓝色系 (#1e40af ~ #3b82f6) |
| 活力/热情 | 红橙色系 (#dc2626 ~ #f97316) |
| 自然/健康 | 绿色系 (#15803d ~ #22c55e) |
| 创意/奢华 | 紫色系 (#7c3aed ~ #a855f7) |
| 温暖/友好 | 琥珀色系 (#d97706 ~ #fbbf24) |
| 平静/安宁 | 青蓝色系 (#0891b2 ~ #67e8f9) |
| 高端/神秘 | 深色 + 金色 (#1a1a1a + #d4a574) |

## Layout Preference 映射

| 用户说 | 布局方式 |
|--------|---------|
| "storytelling / 讲故事" | 单列滚动叙事, section-by-section |
| "grid / 网格" | CSS Grid, 卡片式布局 |
| "magazine / 杂志" | 多栏不对称, 大图配文字 |
| "one-page / 单页" | 锚点导航, 全部在一个页面 |
| "multi-page / 多页" | 独立页面, 顶部导航切换 |
| "dashboard / 仪表盘" | 侧边栏 + 内容区, 信息密集 |
