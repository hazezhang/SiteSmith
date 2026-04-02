---
name: recommend-pages-publishing-mode
description: "GitHub Pages 部署模式顾问。判断用户应该用 branch publish、GitHub Actions、还是 Jekyll。Recommend the best GitHub Pages publishing mode."
argument-hint: [project-context]
allowed-tools: Read, Write, Edit, Bash(*), Grep, Glob
---

# Recommend Pages Publishing Mode — 部署模式推荐

> 不是"怎么部署"，而是"你的场景最适合哪种模式"

## Input

`$ARGUMENTS` — 项目上下文（可选）

## Prerequisites

- `DESIGN_INTENT.md` 存在（含 archetype 和 deploy 信息）

## Workflow

### Phase A: 分析项目特征

检查：
1. 是否有构建步骤？（Tailwind → 需要 build；纯 HTML → 不需要）
2. 是否使用 Jekyll？（writing-site archetype 默认推荐 Jekyll）
3. 是否有动态内容需求？
4. 是 user site (`username.github.io`) 还是 project site (`username.github.io/repo`)？
5. 是否需要自定义域名？

### Phase B: 推荐模式

#### 模式 1: Branch Publish（最简单）
```
适合:
- 纯 HTML/CSS/JS
- 无构建步骤
- project-showcase 放在 /docs 目录

配置:
  Settings → Pages → Source → Deploy from branch
  Branch: main, Folder: / 或 /docs

优点: 零配置，推送即部署
缺点: 不支持构建步骤
```

#### 模式 2: GitHub Actions（最灵活）
```
适合:
- 有构建步骤（Tailwind, React, Vite）
- 需要自定义构建流程
- developer-portfolio, hybrid-brand

配置:
  .github/workflows/deploy.yml
  → checkout → build → upload artifact → deploy pages

优点: 完全可控，支持任何构建工具
缺点: 需要写 workflow 文件
```

#### 模式 3: Jekyll（GitHub Pages 原生）
```
适合:
- 博客/写作站点
- Markdown 为主
- writing-site archetype

配置:
  _config.yml + Markdown files
  GitHub Pages 自动使用 Jekyll 构建

优点: GitHub 内建支持，Markdown → HTML 自动
缺点: 模板系统有学习曲线

注意: 如果不想用 Jekyll，添加 .nojekyll 文件
```

### Phase C: 生成部署配置

```markdown
## 推荐部署模式

**模式**: GitHub Actions
**原因**: 你的项目使用 Tailwind CSS，需要构建步骤

**部署流程**:
1. `git push` → 触发 GitHub Actions
2. Actions: install → build → deploy to Pages
3. 自动发布到 `username.github.io`

**需要生成的文件**:
- `.github/workflows/deploy.yml`
- `.nojekyll`（禁用 Jekyll）
```

### 🚦 Checkpoint: Mode Confirmation

- **展示**: 推荐模式 + 原因 + 替代方案
- **确认 →** 更新 `DESIGN_INTENT.md` 中的 deploy 配置
- **切换 →** 选择其他模式

## Key Rules

1. **最简路径** — 能用 branch publish 就不用 Actions
2. **检测构建需求** — 有 package.json/tailwind.config → 需要 Actions
3. **Jekyll 只推荐给 writing-site** — 其他原型用 .nojekyll

## Composing with Other Skills

- 确认后 → `/generate-pages-workflow`（如果选择 Actions）
- 确认后 → `/generate-cname-config`（如果需要自定义域名）
- 最终 → `/deploy-setup` 执行部署
