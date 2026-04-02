---
name: curate-portfolio
description: "组织作品集。帮助选择、排序和描述展示项目。Curate portfolio — select, order and describe showcase projects."
argument-hint: [project-list-or-source]
allowed-tools: Read, Write, Edit, Grep, Glob, WebSearch, WebFetch
---

# Curate Portfolio — 作品集策划

## Input

`$ARGUMENTS` — 项目来源
- 项目列表/描述
- GitHub 用户名（可抓取仓库）
- 或逐个对话收集

## Workflow

### Phase A: 收集项目信息

对每个项目收集：
- 项目名称
- 一句话描述
- 技术栈/标签
- 链接（demo / repo / case study）
- 截图（如有）
- 你的角色和贡献

### Phase B: 策略建议

```markdown
## Portfolio Curation Strategy

### 展示建议
- **Featured Projects (3-4个)**: 最能代表你能力的项目，放在首屏
- **Other Projects (可选)**: 其他有价值的项目，次级展示
- **排序逻辑**: 最新 / 最好 / 按类别

### 项目描述模板
**[项目名]** — [一句话描述]
[2-3句详细说明: 问题→方案→结果]
Tech: [技术栈标签]
[链接]
```

### 🚦 Checkpoint: Portfolio Review

- **展示**: 策划好的项目清单 + 展示顺序
- **确认 →** 生成作品集页面内容
- **调整 →** 修改顺序/描述/选择

## Key Rules

1. **质量 > 数量** — 3-6 个精选优于 20 个堆砌
2. **讲故事** — 每个项目不只是列技术栈，要说明解决了什么问题
3. **视觉优先** — 有截图的项目优先展示
