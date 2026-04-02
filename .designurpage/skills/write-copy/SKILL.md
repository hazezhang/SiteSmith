---
name: write-copy
description: "生成网站文案。根据设计意图和用户信息撰写各板块文案。Write website copy aligned with design intent and user profile."
argument-hint: [section-name-or-all]
allowed-tools: Read, Write, Edit, Grep, Glob
---

# Write Copy — 网站文案生成

> 文案要与设计风格一致：minimal 用短句，expressive 用长叙述

## Input

`$ARGUMENTS` — 目标板块或 "all"
- `hero` — 首屏标题 + 副标题 + CTA
- `about` — 关于页文案
- `projects` — 项目描述
- `all` — 全站文案

## Workflow

### Phase A: 读取上下文

1. 读取 `DESIGN_INTENT.md` — 语气/风格/目标受众
2. 读取 `SITE_BLUEPRINT.md` — 各板块的内容需求
3. 确定文案风格：
   - minimal → 短句、关键词驱动、大量留白
   - professional → 清晰、信息密度适中
   - creative → 叙事性、个性化表达
   - warm → 对话式、友好

### Phase B: 逐板块生成

为每个板块生成 2~3 个版本供选择：

```markdown
## Hero 标题选项

### 版本 A (简洁)
**标题**: Design with purpose.
**副标题**: I create digital experiences that matter.
**CTA**: View My Work

### 版本 B (个性)
**标题**: Hello, I'm [Name].
**副标题**: A [role] who believes great design starts with empathy.
**CTA**: Let's Connect

### 版本 C (专业)
**标题**: [Name] — [Role]
**副标题**: Specializing in [focus area] with [X] years of experience.
**CTA**: Explore Portfolio
```

### 🚦 Checkpoint: Copy Selection

- **展示**: 每个板块的 2~3 个版本
- **询问**: "每个板块你更喜欢哪个版本？可以混搭或修改"
- **选择 →** 将选中的文案填入页面
- **自定义 →** 用户提供自己的文案，只做润色
- **重写 →** 按新方向重新生成

## Key Rules

1. **风格一致** — 文案语气要匹配设计风格
2. **提供选择** — 每个板块至少 2 个版本
3. **真实感** — 用 [Name], [Role] 等标记需要用户替换的地方
4. **简洁** — 网站文案不是文章，每句话都要有作用
