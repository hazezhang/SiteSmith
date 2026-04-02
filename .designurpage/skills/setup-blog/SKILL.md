---
name: setup-blog
description: "搭建博客结构。生成文章列表页+详情页+Markdown支持。Setup blog with post list, detail pages, and Markdown support."
argument-hint: [blog-style: simple | featured | minimal]
allowed-tools: Read, Write, Edit, Bash(*), Grep, Glob
---

# Setup Blog — 博客搭建

## Input

`$ARGUMENTS` — 博客风格
- `simple` (默认): 简洁列表 + 详情页
- `featured`: 有 featured post + 分类
- `minimal`: 纯文字列表，类似 blog.jim.sh

## Workflow

1. 生成博客列表页（卡片/列表展示文章）
2. 生成文章详情页模板（支持 Markdown 渲染）
3. 创建示例文章（markdown 格式）
4. 添加标签/分类筛选（如需要）
5. 确保代码高亮支持（如果用户是技术类博客）
6. 响应式适配

### 🚦 Checkpoint: Blog Preview

- **展示**: 博客列表 + 示例文章
- **确认 →** 更新 BUILD_LOG.md
- **调整 →** 修改样式/布局

## Key Rules

1. **Markdown 优先** — 文章用 markdown 写，前端渲染
2. **好的阅读体验** — 段落宽度 ≤ 65ch，行高 1.6+
3. **代码友好** — 如果是技术博客，确保代码块样式好看
