---
name: deploy-setup
description: "部署引导。支持 Vercel/Netlify/GitHub Pages 一键部署。Deploy guide for Vercel, Netlify, or GitHub Pages."
argument-hint: [platform: vercel | netlify | github-pages]
allowed-tools: Read, Write, Edit, Bash(*), Grep, Glob
---

# Deploy Setup — 部署引导

## Input

`$ARGUMENTS` — 部署平台
- `github-pages` (默认): 最简单，免费
- `vercel`: 适合动态站点
- `netlify`: 功能丰富

## Workflow

### Phase A: 部署前检查

1. 确认所有页面已完成
2. 运行 `/pre-launch-checklist`（如果还没运行）
3. 确认项目结构符合部署平台要求

### Phase B: 平台配置

#### GitHub Pages
1. 初始化 git repo（如果还没有）
2. 创建 `.github/workflows/deploy.yml`
3. 配置 GitHub Pages 设置
4. 指导用户设置自定义域名（可选）

#### Vercel
1. 创建 `vercel.json` 配置
2. 指导用户连接 GitHub repo → Vercel
3. 配置自定义域名（可选）

#### Netlify
1. 创建 `netlify.toml` 配置
2. 指导用户连接 GitHub repo → Netlify
3. 配置自定义域名（可选）

### 🚦 Checkpoint: Deploy Confirmation

- **展示**: 部署配置 + 操作步骤
- **确认 →** 执行部署流程
- **选择其他平台 →** 切换方案

## Key Rules

1. **最简路径** — 个人网站不需要复杂的 CI/CD
2. **HTTPS** — 确保部署后默认 HTTPS
3. **指导而非代做** — 涉及账号的操作，给步骤让用户自己做
