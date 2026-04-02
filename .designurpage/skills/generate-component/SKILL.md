---
name: generate-component
description: "生成通用组件。卡片、按钮组、表单、时间线等可复用组件。Generate reusable components (cards, forms, timelines, etc)."
argument-hint: [component-name]
allowed-tools: Read, Write, Edit, Grep, Glob
---

# Generate Component — 通用组件生成

> 每个组件独立、可复用、遵循设计系统

## Input

`$ARGUMENTS` — 组件名称（必填）
- `card` / `project-card` — 项目卡片
- `button-group` — 按钮组
- `contact-form` — 联系表单
- `timeline` — 时间线
- `skill-tags` — 技能标签
- `testimonial` — 推荐语
- `social-links` — 社交链接
- 或任何自定义组件名

## Prerequisites

- `DESIGN_SYSTEM.md` — 组件样式指南

## Workflow

### Phase A: 组件规格确定

1. 读取 `DESIGN_SYSTEM.md` — 组件基础样式
2. 读取 `SITE_BLUEPRINT.md` — 该组件在哪些页面使用
3. 确定组件的：
   - Props/参数（如 card 需要 title, description, image, link）
   - 变体（如 button: primary, secondary, ghost）
   - 状态（default, hover, active, disabled）

### Phase B: 生成组件代码

输出包含：
1. **HTML 结构** — 语义化、可访问
2. **CSS 样式** — 使用 CSS 变量，添加到 `components.css`
3. **交互状态** — hover, focus, active
4. **响应式** — mobile 适配

```html
<!-- 示例: project-card -->
<article class="project-card">
  <div class="project-card__image">
    <img src="..." alt="..." loading="lazy">
  </div>
  <div class="project-card__content">
    <h3 class="project-card__title">...</h3>
    <p class="project-card__description">...</p>
    <div class="project-card__tags">
      <span class="tag">...</span>
    </div>
    <a href="..." class="project-card__link">View Project →</a>
  </div>
</article>
```

### Phase C: 记录组件

更新 `BUILD_LOG.md`：
- 组件名
- 文件位置
- 使用方式
- 可用变体

### 🚦 Checkpoint: Component Review

- **展示**: 组件代码 + 效果描述
- **确认 →** 保存并记录
- **调整 →** 根据反馈修改

## Key Rules

1. **独立性** — 组件不依赖特定页面上下文
2. **CSS变量** — 所有视觉值使用 `var(--*)`
3. **BEM命名** — `.block__element--modifier` 或参照技术方案约定
4. **可访问** — 交互元素有 focus 状态和 aria 属性
