---
name: plan-website-structure
description: "规划网站结构。从设计意图生成站点地图、页面组件规划、导航逻辑。Plan website structure from design intent."
argument-hint: [optional-focus-area]
allowed-tools: Read, Write, Edit, Grep, Glob
---

# Plan Website Structure — 网站结构规划

> 从设计意图到可执行的站点蓝图

## Input

`$ARGUMENTS` — 可选的重点区域（如 "focus on portfolio section"）

## Prerequisites

- `DESIGN_INTENT.md` 必须存在（先运行 `/capture-design-intent`）

## Workflow

### Phase A: 读取设计意图

1. 读取 `DESIGN_INTENT.md` — 提取 sections, layout_preference, type
2. 读取 `DESIGN_MEMORY.json`（如果存在）— 历史偏好

### Phase B: 生成站点地图

根据设计意图规划：

1. **页面清单** — 需要哪些页面？
2. **信息架构** — 页面之间的关系和导航逻辑
3. **每页组件清单** — 每个页面由哪些组件构成

```markdown
## Site Map

### 页面结构
- `/` (index.html) — 首页/Landing
  - Hero Section
  - About Preview
  - Featured Projects
  - CTA
- `/about` — 关于我
  - Bio Section
  - Skills/Experience
  - Timeline
- `/projects` — 作品集
  - Project Grid/List
  - Filter/Tags
  - Project Detail Modal/Page
- `/blog` — 博客（如需要）
  - Post List
  - Post Detail
  - Tag/Category
- `/contact` — 联系方式
  - Contact Form
  - Social Links

### 导航逻辑
- 主导航: [页面列表]
- 移动端导航: hamburger → slide menu
- 页脚导航: [链接列表]
```

### Phase C: 组件规划

列出所有需要的组件及其复杂度：

```markdown
## Component Plan

| 组件 | 所在页面 | 复杂度 | 优先级 | 说明 |
|------|---------|--------|--------|------|
| Navbar | 全局 | 中 | P0 | 含移动端汉堡菜单 |
| Hero | 首页 | 高 | P0 | 首屏焦点 |
| ProjectCard | 首页/作品集 | 中 | P0 | 可复用卡片 |
| Footer | 全局 | 低 | P1 | 社交链接 + 版权 |
| ContactForm | 联系 | 中 | P1 | 表单验证 |
| BlogPostCard | 博客 | 低 | P2 | 如果有博客 |
```

### Phase D: 技术方案建议

根据项目复杂度推荐技术方案：

```markdown
## Technical Recommendation

### 方案 A: 纯 HTML/CSS/JS（推荐：简单站点）
- ✅ 零依赖，部署简单
- ✅ 性能最优
- ⚠️ 多页面管理稍繁琐

### 方案 B: HTML + Tailwind CSS（推荐：中等站点）
- ✅ 快速开发，样式一致
- ✅ 响应式设计方便
- ⚠️ 需要构建步骤

### 方案 C: React/Vue + Tailwind（推荐：复杂交互）
- ✅ 组件复用好
- ✅ 适合动态内容
- ⚠️ 复杂度较高
```

### 🚦 Checkpoint: Blueprint Confirmation

- **展示**: 完整的站点地图 + 组件规划 + 技术方案
- **询问**: "这个结构方案是否合理？需要增减页面或组件吗？"
- **确认 →** 写入 `SITE_BLUEPRINT.md`，建议下一步 `/generate-design-system`
- **修改 →** 调整结构后重新确认
- **技术方案选择 →** 记录到 blueprint 中

## Output

写入 `SITE_BLUEPRINT.md`，包含：
- 站点地图
- 组件规划表
- 技术方案选择
- 构建顺序建议（哪些组件先做）

## Key Rules

1. **从用户内容出发** — 不是"标准网站有什么"，而是"用户的内容需要什么"
2. **保持精简** — 个人网站不需要过度工程化
3. **考虑增长** — 结构要支持后续添加内容（如新项目、新博客文章）

## Composing with Other Skills

- 完成后 → `/generate-design-system` 基于 blueprint 生成设计系统
- 技术方案确认后 → `/project-scaffold` 创建项目骨架
