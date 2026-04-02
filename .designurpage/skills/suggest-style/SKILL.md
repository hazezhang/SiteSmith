---
name: suggest-style
description: "AI风格顾问。根据内容类型和用户意图主动推荐设计风格方向，给出 trade-off 分析。Style advisor that proactively suggests design directions."
argument-hint: [content-type-or-description]
allowed-tools: Read, Write, Edit, Grep, Glob, WebSearch, WebFetch, mcp__Claude_Preview__preview_screenshot
---

# Style Advisor — AI 风格顾问

> 不只是问"你要什么风格"，而是主动分析、建议、解释 trade-off

## Input

`$ARGUMENTS` — 用户描述或内容类型，如：
- "我是一个研究员，想展示论文和项目"
- "portfolio"
- 无参数时，读取 `DESIGN_INTENT.md`

## Constants

- **TOP_K = 3** — 推荐方向数量
- **SHOW_TRADEOFFS = `true`** — 是否展示 trade-off 表
- **DESIGN_PERSONALITY = `null`** — 可指定设计人格（Apple-like / Notion-like / Awwwards-like）
> 💡 Override: `/suggest-style "portfolio" — personality: Apple-like`

## Workflow

### Phase A: 分析用户上下文

1. 读取 `$ARGUMENTS` 和 `DESIGN_INTENT.md`（如果存在）
2. 读取 `DESIGN_MEMORY.json`（如果存在）— 历史偏好
3. 分析关键维度：
   - **内容类型**: portfolio / blog / product / academic / creative / personal
   - **内容密度**: 内容多（文字密集）vs 内容少（视觉优先）
   - **目标受众**: 技术人员 / 招聘者 / 客户 / 普通访客
   - **行业/领域**: 学术 / 设计 / 开发 / 商业 / 艺术

### Phase B: 生成风格推荐

读取 `.designurpage/skills/shared-references/style-vocabulary.md`

为每个推荐方向提供：

```markdown
## 推荐方向 1: [风格名]

**为什么适合你**: [1-2句解释]

**视觉特征**:
- 字体: ...
- 色彩: ...
- 布局: ...
- 动效: ...

**参考站点**: [可选，搜索类似风格的网站]

**✅ 优点**: ...
**⚠️ 注意**: ...
**适合场景**: ...
```

### Phase C: Trade-off 对比表

如果 SHOW_TRADEOFFS=true，生成对比表：

```markdown
| 维度 | 方向A: Minimal | 方向B: Creative | 方向C: Editorial |
|------|---------------|----------------|-----------------|
| 个性表达 | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| 信息效率 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| 开发复杂度 | 低 | 高 | 中 |
| 维护成本 | 低 | 中 | 低 |
| 移动端体验 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
```

### Phase D: Design Personality（可选）

如果指定了 DESIGN_PERSONALITY，以该"设计师人格"给建议：

- **Apple-like**: 极致简洁，大量留白，产品聚焦，微妙动效
- **Notion-like**: 功能性优先，干净排版，系统化，黑白为主
- **Awwwards-like**: 创意驱动，打破常规，实验性布局，丰富交互
- **Muji-like**: 自然、朴素、无品牌感，材质感
- **Dieter Rams-like**: 少即是多，功能决定形式，诚实设计

### 🚦 Checkpoint: Style Direction Selection

- **展示**: TOP_K 个推荐方向 + trade-off 表
- **询问**: "你更偏向哪个方向？或者想混合某些特征？"
- **选择 →** 更新 `DESIGN_INTENT.md` 的风格部分
- **混合 →** 记录用户的混合偏好，更新 intent
- **都不满意 →** 询问更多偏好，重新推荐

## Key Rules

1. **主动建议优于被动等待** — 不要问"你想要什么风格"，而是说"根据你的情况，我推荐..."
2. **解释 why** — 每个推荐都要说明原因和 trade-off
3. **接受混合** — 用户可以说"A的布局 + B的色彩"
4. **不做最终决定** — 永远让用户选择，AI只是顾问

## Composing with Other Skills

- 建议被采纳后 → 更新 `DESIGN_INTENT.md`
- 接下来 → `/generate-design-system` 基于选择生成设计系统
- 随时可以 → `/refine-design-intent` 微调方向
