---
name: classify-github-pages-archetype
description: "GitHub Pages 站点原型顾问。判断用户更适合哪类 Pages 站点（学术/开发者/项目/写作/品牌），像设计师一样问正确的问题。Classify which GitHub Pages archetype fits the user best."
argument-hint: [user-description]
allowed-tools: Read, Write, Edit, Grep, Glob, WebSearch, WebFetch
---

# Classify GitHub Pages Archetype — 站点原型分类

> 不是"你想做什么网站"，而是"你的身份和目的决定了什么原型"

## Input

`$ARGUMENTS` — 用户描述（可选）
- 无参数: 进入对话模式
- 有描述: 直接分析

## Workflow

### Phase A: 身份定位对话（HITL 核心）

问 3 个关键问题：

1. **核心身份**:
   ```
   你的 GitHub Pages 站点，核心是展示"我是谁"还是"我做了什么"？
   - "我是谁" → 偏 academic-profile 或 hybrid-brand
   - "我做了什么" → 偏 developer-portfolio 或 project-showcase
   - "我写了什么" → 偏 writing-site
   ```

2. **目标受众**:
   ```
   访问你站点的人最可能是？
   - 招聘者/HR → hybrid-brand
   - 学术同行/导师 → academic-profile
   - 技术社区/开发者 → developer-portfolio
   - 项目潜在用户 → project-showcase
   - 读者/订阅者 → writing-site
   ```

3. **内容体量**:
   ```
   你有多少内容要展示？
   - 1 个核心项目 → project-showcase
   - 3~6 个项目 + 个人信息 → developer-portfolio
   - 论文/出版物 + 教学 → academic-profile
   - 大量文章/笔记 → writing-site
   - 混合：项目+文章+个人 → hybrid-brand
   ```

### Phase B: 推荐原型

读取 `.designurpage/dsl/archetypes.md`，推荐最匹配的原型：

```markdown
## 推荐原型: Developer Portfolio

**为什么**: 你是软件工程师，有 5 个项目要展示，目标是让招聘者看到你的技术能力。

**站点结构预览**:
- Hero: 名字 + 一句话介绍 + 头像
- Skills: 技术栈标签
- Projects: 2列网格卡片（截图 + 描述）
- GitHub: 贡献活动
- Blog: 最近 3 篇文章
- Contact: 邮箱 + 社交链接

**Design DSL 摘要**:
| 维度 | 值 |
|------|-----|
| style | modern |
| layout | grid, 2-column |
| density | medium |
| color | neutral + blue accent, dark mode |
| interaction | medium, shadow-lift |
| motion | fade-in, 200ms |

**备选方案**:
- Hybrid Brand（如果你想突出个人品牌 > 项目）
- Project Showcase（如果只想展示 1 个核心项目）
```

### 🚦 Checkpoint: Archetype Selection

- **展示**: 推荐原型 + 备选 + 各自 trade-off
- **询问**: "这个原型方向对吗？还是你更像另一种？"
- **确认 →** 将 archetype DSL 写入 `DESIGN_INTENT.md`
- **切换 →** 展示备选原型的详情
- **混合 →** "academic + developer" → 合并两个原型的 content_blocks

### Phase C: 输出

将选中的 archetype DSL（包含 `content_blocks` 和 `deploy` 配置）写入 `DESIGN_INTENT.md`。

## Key Rules

1. **问身份，不问技术** — 不要问"你想用 Jekyll 还是纯 HTML"，而是问"你是研究员还是工程师"
2. **推荐而非列举** — 给出 1 个首选 + 理由，而不是 5 个让用户选
3. **解释 trade-off** — "academic-profile 更可信但个性弱，hybrid-brand 更有个性但信息密度低"

## Composing with Other Skills

- 确认后 → `/recommend-pages-publishing-mode` 决定部署方式
- 然后 → `/capture-design-intent`（已有 archetype 作为基础）
- 或直接 → `/website-pipeline`（会自动调用此 skill）
