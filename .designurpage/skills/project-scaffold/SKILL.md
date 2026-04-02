---
name: project-scaffold
description: "创建项目骨架。根据站点蓝图和技术方案生成可运行的空项目结构。Scaffold project structure from blueprint."
argument-hint: [tech-stack: html | tailwind | react]
allowed-tools: Read, Write, Edit, Bash(*), Grep, Glob
---

# Project Scaffold — 项目骨架生成

> 一键生成完整的项目结构，植入设计系统，可立即运行

## Input

`$ARGUMENTS` — 技术方案选择
- `html` (默认): 纯 HTML/CSS/JS
- `tailwind`: HTML + Tailwind CSS
- `react`: React + Tailwind

如果未提供，从 `SITE_BLUEPRINT.md` 读取技术方案选择。

## Prerequisites

- `SITE_BLUEPRINT.md` 必须存在
- `DESIGN_SYSTEM.md` 必须存在（需要 CSS 变量）

## Workflow

### Phase A: 读取规划

1. 读取 `SITE_BLUEPRINT.md` — 页面清单、组件清单、技术方案
2. 读取 `DESIGN_SYSTEM.md` — CSS 变量

### Phase B: 生成项目结构

#### 方案 A: 纯 HTML/CSS/JS
```
src/
├── index.html              # 首页
├── pages/
│   ├── about.html
│   ├── projects.html
│   ├── blog.html
│   └── contact.html
├── styles/
│   ├── variables.css       # ← 从 DESIGN_SYSTEM.md 生成
│   ├── base.css            # reset + 全局样式
│   ├── components.css      # 组件样式
│   ├── utilities.css       # 工具类
│   └── interactions.css    # 交互动效
├── scripts/
│   ├── main.js             # 主逻辑（导航、暗色模式等）
│   └── interactions.js     # 交互/动效
├── assets/
│   ├── images/
│   ├── fonts/
│   └── icons/
└── favicon.ico
```

#### 方案 B: HTML + Tailwind
在方案 A 基础上添加：
```
├── tailwind.config.js      # 映射设计 tokens 到 Tailwind
├── package.json
└── postcss.config.js
```

#### 方案 C: React + Tailwind
```
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Footer.jsx
│   │   └── ...
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   └── ...
│   ├── styles/
│   │   └── variables.css
│   └── assets/
├── package.json
├── vite.config.js
└── tailwind.config.js
```

### Phase C: 生成基础文件内容

1. **variables.css** — 从 `DESIGN_SYSTEM.md` 提取所有 CSS 变量
2. **base.css** — CSS reset + 全局样式（基于设计系统）：
   ```css
   *, *::before, *::after { box-sizing: border-box; margin: 0; }
   html { scroll-behavior: smooth; }
   body {
     font-family: var(--font-body);
     font-size: var(--text-base);
     line-height: var(--leading-normal);
     color: var(--color-text);
     background: var(--color-background);
   }
   ```
3. **index.html** — 带完整 `<head>`（meta, OG tags, 字体引入, CSS链接）的空壳页面
4. **main.js** — 基础功能（汉堡菜单、暗色模式切换、smooth scroll）

### Phase D: 验证可运行

1. 如果是纯 HTML → 尝试用 Preview 工具打开 `src/index.html`
2. 如果是 Tailwind/React → 运行 `npm install` + `npm run dev`
3. 确认无报错

### 🚦 Checkpoint: Scaffold Verification

- **展示**: 项目结构树 + 基础页面截图
- **询问**: "项目骨架已创建完毕，是否可以开始逐页构建？"
- **确认 →** 更新 `BUILD_LOG.md`，建议 `/generate-page "index"`
- **调整 →** 修改结构后再确认

## Output

- 完整可运行的空项目结构
- `BUILD_LOG.md` 初始化（记录已创建的文件清单）

## Key Rules

1. **立即可运行** — 骨架生成后必须能在浏览器中打开
2. **CSS变量植入** — variables.css 必须包含 DESIGN_SYSTEM.md 的所有 tokens
3. **不填充内容** — 骨架只有结构和样式基础，内容由后续 skill 填充
4. **SEO基础** — 每个HTML都有正确的 meta tags 和语义化结构

## Composing with Other Skills

- 创建后 → `/generate-page` 逐页填充内容和组件
- 创建后 → `/generate-navbar` + `/generate-footer` 先做全局组件
