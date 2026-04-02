---
name: seo-optimizer
description: "SEO优化。添加 meta tags, Open Graph, 结构化数据, sitemap。SEO optimization — meta, OG, JSON-LD, sitemap."
argument-hint: [page-path-or-all]
allowed-tools: Read, Write, Edit, Grep, Glob
---

# SEO Optimizer — SEO 优化

## Input

`$ARGUMENTS` — 优化范围

## Workflow

1. 检查并补全每页的：
   - `<title>` — 唯一且描述性（50-60字符）
   - `<meta name="description">` — 唯一（150-160字符）
   - Open Graph tags（og:title, og:description, og:image, og:url）
   - Twitter Card tags
   - Canonical URL
2. 生成 JSON-LD 结构化数据：
   - Person schema（个人网站）
   - WebSite schema
   - Article schema（博客文章）
3. 生成 `sitemap.xml`
4. 生成/更新 `robots.txt`
5. 检查 URL 结构（kebab-case、简洁）
6. 检查标题层级（h1-h6）

### 🚦 Checkpoint: SEO Review

- **展示**: SEO 检查清单 + 生成的 meta/schema
- **确认 →** 应用所有优化
- **调整 →** 修改 title/description 措辞

## Key Rules

1. **每页唯一** — title 和 description 不能重复
2. **用户确认文案** — meta description 影响搜索展示，让用户审核
