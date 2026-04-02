---
name: generate-bio
description: "生成个人简介。支持多种风格和长度。Generate personal bio in multiple styles and lengths."
argument-hint: [user-info-or-style]
allowed-tools: Read, Write, Edit, Grep, Glob
---

# Generate Bio — 个人简介生成

## Input

`$ARGUMENTS` — 用户信息或风格偏好
- 用户基本信息（角色、经验、兴趣等）
- 或指定风格（formal / casual / creative / academic）

## Workflow

### Phase A: 收集用户信息

如果信息不足，通过对话收集：
- 你是做什么的？
- 你的核心技能/专长？
- 你想强调什么？
- 目标读者是谁？

### Phase B: 生成多版本

为每种长度生成不同版本：

1. **One-liner** (< 20 words) — 用于导航栏/页脚
2. **Short** (2-3 sentences) — 用于首页 hero 下方
3. **Medium** (1 paragraph) — 用于 about 页面顶部
4. **Full** (3-4 paragraphs) — 用于完整 about 页面

### 🚦 Checkpoint: Bio Selection

- **展示**: 各长度版本
- **选择 →** 填入对应页面位置
- **修改 →** 调整措辞/强调点

## Key Rules

1. **真实感** — 避免过度夸张
2. **风格匹配** — 与网站整体风格一致
3. **多长度** — 不同位置需要不同长度
