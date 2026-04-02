---
name: generate-pages-workflow
description: "生成 GitHub Pages 部署所需的全部文件。包括 Actions workflow、.nojekyll、CNAME 等。Generate all GitHub Pages deployment files."
argument-hint: [mode: branch | actions | jekyll]
allowed-tools: Read, Write, Edit, Bash(*), Grep, Glob
---

# Generate Pages Workflow — GitHub Pages 部署文件生成

## Input

`$ARGUMENTS` — 部署模式（从 `DESIGN_INTENT.md` 的 deploy 配置读取）

## Workflow

### 根据模式生成文件

#### Mode: GitHub Actions

生成 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

同时生成：
- `.nojekyll` — 空文件，禁用 Jekyll 处理
- 更新 `package.json` 中的 `build` script（如果需要）

#### Mode: Branch Publish

生成说明文件 + 确保项目结构正确：
- 如果使用 `/docs` 目录：确保 `index.html` 在 `/docs/` 下
- 生成 `.nojekyll`
- 生成 GitHub Settings 配置指引

#### Mode: Jekyll

生成 `_config.yml`：
```yaml
title: [site-title]
description: [description]
baseurl: ""
url: "https://username.github.io"

theme: minima  # 或自定义

markdown: kramdown
highlighter: rouge

plugins:
  - jekyll-feed
  - jekyll-seo-tag

exclude:
  - node_modules
  - README.md
```

### 通用文件

无论哪种模式都生成：

1. **`.nojekyll`**（如果不用 Jekyll）
2. **`404.html`** — 自定义 404 页面（调用 `/generate-404-page`）
3. **`CNAME`**（如果有自定义域名，调用 `/generate-cname-config`）
4. **`robots.txt`**
5. **`favicon.ico` 提醒** — 提示用户提供

### 🚦 Checkpoint: Deployment Files Review

- **展示**: 生成的文件列表 + workflow 内容
- **确认 →** 写入文件
- **调整 →** 修改配置

## Key Rules

1. **使用最新的 GitHub Actions** — v4/v5 版本
2. **权限最小化** — 只声明必需的 permissions
3. **构建路径正确** — 确保 artifact path 对应实际 build 输出目录

## Composing with Other Skills

- 搭配 → `/generate-404-page` 自定义 404
- 搭配 → `/generate-cname-config` 自定义域名
- 最终 → `/deploy-setup` 执行完整部署流程
