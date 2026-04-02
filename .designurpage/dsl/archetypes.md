# GitHub Pages Archetypes — 站点原型 DSL

> 5 种 GitHub Pages 站点原型，每种扩展了 Design DSL 的 `archetype` 字段

## Archetype Schema Extension

在标准 Design DSL 基础上增加：

```json
{
  "$schema": "design-dsl/v1",
  "archetype": "academic-profile | developer-portfolio | project-showcase | writing-site | hybrid-brand",
  "content_blocks": [...],
  "deploy": {
    "platform": "github-pages",
    "mode": "branch | actions",
    "branch": "main",
    "folder": "/ | /docs",
    "custom_domain": null,
    "jekyll": false
  },
  ...standard DSL fields...
}
```

---

## 1. Academic Profile（学术主页）

**适合**: 教授、博士生、研究员、博后

```json
{
  "$schema": "design-dsl/v1",
  "archetype": "academic-profile",
  "style": "minimal",
  "layout": {
    "type": "single-column",
    "alignment": "left",
    "max_width": "800px",
    "section_spacing": "generous"
  },
  "density": "medium",
  "typography": {
    "font_pairing": ["Source Serif 4", "Source Sans 3"],
    "scale": "1.2",
    "base_size": "17px",
    "line_height": "1.7",
    "weight_strategy": "contrast",
    "paragraph_width": "65ch"
  },
  "color": {
    "mode": "neutral",
    "primary": "#1e3a5f",
    "accent": "#2563eb",
    "background": "#ffffff",
    "text": "#1e293b",
    "contrast": "high"
  },
  "interaction": {
    "level": "low",
    "hover": "underline",
    "focus": "ring",
    "scroll_behavior": "auto"
  },
  "motion": {
    "type": "none",
    "reduced_motion": true
  },
  "personality": "credible, clear, scholarly",

  "content_blocks": [
    "hero-name-affiliation",
    "bio-research-interests",
    "publications",
    "projects",
    "teaching",
    "talks",
    "cv-download",
    "contact"
  ],

  "deploy": {
    "platform": "github-pages",
    "mode": "branch",
    "jekyll": false
  }
}
```

**设计要点**:
- 信息可信度 > 视觉冲击力
- 出版物列表需要清晰的格式和排序
- 照片用正式学术照，不用创意照
- 无动画 — 学术受众看重信息效率

---

## 2. Developer Portfolio（开发者作品集）

**适合**: 软件工程师、AI工程师、前端开发、全栈开发

```json
{
  "$schema": "design-dsl/v1",
  "archetype": "developer-portfolio",
  "style": "modern",
  "layout": {
    "type": "grid",
    "grid": true,
    "columns": 2,
    "alignment": "center",
    "max_width": "1100px",
    "section_spacing": "default"
  },
  "density": "medium",
  "typography": {
    "font_pairing": ["Inter", "Inter"],
    "scale": "1.25",
    "base_size": "16px",
    "line_height": "1.5",
    "weight_strategy": "contrast"
  },
  "color": {
    "mode": "neutral",
    "primary": "#171717",
    "accent": "#3b82f6",
    "background": "#fafafa",
    "text": "#171717",
    "contrast": "high",
    "dark_mode": true
  },
  "interaction": {
    "level": "medium",
    "hover": "shadow-lift",
    "click_feedback": "subtle-scale",
    "focus": "ring",
    "scroll_behavior": "smooth"
  },
  "motion": {
    "type": "fade-in",
    "duration": "200ms",
    "easing": "ease-out",
    "reduced_motion": true,
    "entrance": "slide-up"
  },
  "personality": "clean, technical, competent",

  "content_blocks": [
    "hero-intro",
    "skills-tech-stack",
    "featured-projects",
    "github-activity",
    "experience-timeline",
    "blog-notes",
    "contact"
  ],

  "deploy": {
    "platform": "github-pages",
    "mode": "actions",
    "jekyll": false
  }
}
```

**设计要点**:
- 项目卡片要突出（截图 + 技术栈标签）
- 暗色模式是标配
- GitHub 贡献图/活动嵌入是加分项
- 代码块样式要精心设计

---

## 3. Project Showcase（项目展示页）

**适合**: 单个项目、开源项目、比赛作品、毕业设计

```json
{
  "$schema": "design-dsl/v1",
  "archetype": "project-showcase",
  "style": "product",
  "layout": {
    "type": "single-column",
    "alignment": "center",
    "max_width": "1080px",
    "section_spacing": "generous"
  },
  "density": "medium",
  "typography": {
    "font_pairing": ["Plus Jakarta Sans", "Inter"],
    "scale": "1.333",
    "base_size": "18px",
    "line_height": "1.6",
    "weight_strategy": "heavy-headings"
  },
  "color": {
    "mode": "neutral",
    "primary": "#111827",
    "accent": "#6366f1",
    "background": "#ffffff",
    "text": "#111827",
    "contrast": "high"
  },
  "interaction": {
    "level": "medium",
    "hover": "shadow-lift",
    "focus": "ring",
    "scroll_behavior": "smooth"
  },
  "motion": {
    "type": "scroll-driven",
    "duration": "300ms",
    "easing": "ease-out",
    "reduced_motion": true,
    "entrance": "slide-up"
  },
  "personality": "compelling, clear, conversion-focused",

  "content_blocks": [
    "hero-headline-cta",
    "problem-statement",
    "demo-video-screenshot",
    "features-grid",
    "architecture-diagram",
    "screenshots-gallery",
    "roadmap",
    "repo-link-cta"
  ],

  "deploy": {
    "platform": "github-pages",
    "mode": "branch",
    "folder": "/docs",
    "jekyll": false
  }
}
```

**设计要点**:
- 叙事驱动：Problem → Solution → Demo → Features
- CTA 强度高（Star on GitHub / Try Demo）
- 截图/GIF 是核心内容
- 适合作为 project repo 的 `/docs` 目录

---

## 4. Writing Site（写作站点）

**适合**: 技术博客、研究笔记、长文写作、个人杂志

```json
{
  "$schema": "design-dsl/v1",
  "archetype": "writing-site",
  "style": "editorial",
  "layout": {
    "type": "reading-column",
    "alignment": "left",
    "max_width": "720px",
    "section_spacing": "generous"
  },
  "density": "medium",
  "typography": {
    "font_pairing": ["Merriweather", "Inter"],
    "scale": "1.2",
    "base_size": "18px",
    "line_height": "1.8",
    "weight_strategy": "contrast",
    "paragraph_width": "65ch"
  },
  "color": {
    "mode": "soft",
    "primary": "#1e293b",
    "accent": "#b45309",
    "background": "#faf8f5",
    "text": "#292524",
    "contrast": "high"
  },
  "interaction": {
    "level": "low",
    "hover": "underline",
    "focus": "outline",
    "scroll_behavior": "auto"
  },
  "motion": {
    "type": "none",
    "reduced_motion": true
  },
  "personality": "thoughtful, readable, focused",

  "content_blocks": [
    "header-site-title",
    "post-list",
    "post-detail",
    "tags-archive",
    "about",
    "rss-feed"
  ],

  "deploy": {
    "platform": "github-pages",
    "mode": "branch",
    "jekyll": true
  }
}
```

**设计要点**:
- 阅读体验是第一优先级
- 代码高亮必须好看（技术博客）
- 无动画 — 不打断阅读流
- Jekyll 是最自然的路径（GitHub Pages 内建支持）

---

## 5. Hybrid Personal Brand（混合个人品牌）

**适合**: 求职者、多面手、需要同时展示项目+自己+写作的人

```json
{
  "$schema": "design-dsl/v1",
  "archetype": "hybrid-brand",
  "style": "modern",
  "layout": {
    "type": "grid",
    "grid": true,
    "columns": 2,
    "alignment": "center",
    "max_width": "1100px",
    "section_spacing": "generous"
  },
  "density": "low",
  "typography": {
    "font_pairing": ["DM Serif Display", "DM Sans"],
    "scale": "1.25",
    "base_size": "17px",
    "line_height": "1.6",
    "weight_strategy": "heavy-headings"
  },
  "color": {
    "mode": "neutral",
    "primary": "#171717",
    "accent": "#7c3aed",
    "background": "#ffffff",
    "text": "#171717",
    "contrast": "high"
  },
  "interaction": {
    "level": "medium",
    "hover": "scale",
    "focus": "ring",
    "scroll_behavior": "smooth"
  },
  "motion": {
    "type": "subtle-fade",
    "duration": "200ms",
    "easing": "ease-out",
    "reduced_motion": true,
    "entrance": "fade"
  },
  "personality": "personal, polished, memorable",

  "content_blocks": [
    "hero-personal-intro",
    "about-story",
    "selected-work",
    "experience-highlights",
    "writing-preview",
    "contact-cta"
  ],

  "deploy": {
    "platform": "github-pages",
    "mode": "actions",
    "jekyll": false
  }
}
```

**设计要点**:
- 人（品牌）> 项目（作品）— 首屏突出个人
- 模块化布局：各 section 可独立调整
- 适度个性但不失专业
- 适合求职/申请/合作场景
