---
name: senior-designer-review
version: "1.0"
description: "资深设计师终审。以用户视角审查网站整体体验，输出 rebuttal 式反驳和优先修复清单。Final design review from a senior designer's perspective — holistic UX audit with rebuttal-style critique."
argument-hint: [depth: standard | deep]
allowed-tools: Read, Write, Edit, Grep, Glob, mcp__Claude_Preview__preview_start, mcp__Claude_Preview__preview_screenshot, mcp__Claude_Preview__preview_resize, mcp__Claude_Preview__preview_eval, mcp__Claude_Preview__preview_inspect, mcp__Claude_Preview__preview_snapshot
---

# Senior Designer Review — 资深设计师终审 (Layer 3)

> 不同于 `/critique-design`（技术评审）和 `/enforce-design-consistency`（合规扫描），
> 本 skill 像一个资深设计师那样，以"第一次访问者"的视角审视整个网站。

## Position in Review Architecture

```
Layer 1: /critique-design          → 技术正确性（10维度评分）
Layer 2: /enforce-design-consistency → 设计系统合规性
Layer 3: /senior-designer-review   → 整体体验终审 ← 你在这里
```

## Input

`$ARGUMENTS` — 审查深度
- `standard`（默认）: 整体印象 + 5 秒测试 + 关键路径审查
- `deep`: 含竞品对比 + 情感分析 + rebuttal 辩论

## Prerequisites

- 网站已基本完成（至少 index.html + styles）
- 建议先完成 Layer 1 + Layer 2

## Workflow

### Phase A: 第一印象测试（5-Second Test）

用 Preview 工具截图后，回答：

1. **5 秒后你记住了什么？** — 如果答案不是用户的核心信息，说明焦点有问题
2. **这个网站是做什么的？** — 如果看不出来，说明 value proposition 不清楚
3. **你会点哪里？** — 如果没有明确的下一步，说明 CTA 不够突出
4. **这是给谁的？** — 如果目标受众不明确，说明定位有问题

### Phase B: 用户旅程审查

模拟真实用户的浏览路径：

```
Landing → 读 Hero → 扫描 About → 浏览 Projects → 查看 Contact
```

在每个节点检查：
- **信息获取效率** — 用户能否在 3 秒内找到关键信息？
- **视觉引导** — 眼睛是否自然跟随设计师预设的路径？
- **情感连续性** — 从头到尾的"感觉"是否一致？
- **断裂点** — 哪里会让用户"出戏"？

### Phase C: 情感与品牌审查

对照 DSL 中的 `personality` 维度：

```markdown
## 品牌一致性检查

DSL personality: ["calm", "premium", "clean"]

检查结果:
- ✅ 色彩: 单色系 + 高对比 → calm ✓
- ⚠️ 交互: hover 效果过于明显 → 不够 calm
- ✅ 排版: Inter + 大间距 → clean ✓
- ❌ 首屏: CTA 按钮 gradient 过于 aggressive → 不符合 premium
```

### Phase D: Rebuttal 式反驳 ⭐ 核心创新

像学术 rebuttal 一样，对每个设计决策提出"反方观点"：

```markdown
## Senior Designer Rebuttal

### R1: 关于 Hero 区域的全屏设计
**当前决策**: fullscreen hero with gradient background
**辩护方（builder的理由）**: 最大化首屏冲击力，匹配 creative 风格
**反方（资深设计师）**:
- 全屏 hero 在移动端浪费宝贵的首屏空间
- 用户需要向下滚动才能看到内容，bounce rate 会增加
- gradient 背景在低亮度屏幕上可能看不清文字
**裁定**: ⚠️ MODERATE RISK — 建议添加下滑引导箭头 + 检查移动端 hero 高度

### R2: 关于导航隐藏的决策
**当前决策**: hidden navigation (hamburger only)
**辩护方**: creative 风格追求沉浸感
**反方**:
- 隐藏导航降低了可发现性（contradicts cognitive_load: low）
- 首次访问者找不到 Projects 页面
- Hamburger menu 在桌面端已被证明降低点击率 40%+
**裁定**: 🔴 HIGH RISK — 建议桌面端改为 top nav, 移动端保留 hamburger
```

### Phase E: 优先修复清单（Prioritized Action List）

将所有发现按影响力排序：

```markdown
## Action List（按优先级排序）

### P0 — 必须修复（影响核心体验）
1. [R2] 桌面端显示完整导航 → `/refine-design-dsl "desktop显示完整导航"`
   - **影响**: 用户找不到内容 → bounce rate 高
   - **DSL Diff**: `information.navigation: "hidden" → "top"`
   - **工作量**: 小（导航组件已存在）

### P1 — 强烈建议（影响品牌感知）
2. [R1] Hero 区域优化 → `/patch-component "hero" "add scroll indicator, reduce height on mobile"`
   - **影响**: 移动端首屏效率低
   - **工作量**: 中

### P2 — 可选优化（锦上添花）
3. 页脚社交链接图标大小统一 → `/patch-component "footer" "align icon sizes"`
   - **影响**: 细节打磨感
   - **工作量**: 小
```

### Phase F: Design Quality Score (DQS) 集成

如果 `eval/metrics.ts` 可用，运行自动化评分：

```markdown
## Automated DQS Score

| Metric | Score | Note |
|--------|-------|------|
| Hierarchy Clarity | 16/20 | Hero focal point strong, but About section lacks visual anchor |
| Color Harmony | 14/15 | Palette coherent, 1 contrast violation in footer |
| Typography Quality | 13/15 | Good readability, line-height could be tighter on cards |
| Layout Precision | 18/20 | Grid aligned, spacing consistent |
| Interaction Polish | 8/10 | All hover states present, focus ring missing on cards |
| Responsiveness | 7/10 | Mobile nav works, but hero overflows on 320px |
| Consistency | 9/10 | 1 hardcoded color found |
| **Total DQS** | **85/100** | **Good — ready for launch with P0 fixes** |

Intent Fidelity: 92/100
```

### 🚦 Checkpoint: Senior Review Delivery

- **展示**: 完整审查报告（第一印象 + 旅程 + rebuttal + action list + DQS）
- **询问**: "要按优先级逐个修复吗？还是你觉得哪些可以接受？"
- **全部修复 →** 按 P0→P1→P2 顺序逐个执行 slash command
- **选择修复 →** 用户挑选
- **直接发布 →** 记录 accepted risks → `/pre-launch-checklist`

## Key Rules

1. **用户视角 > 设计师视角** — "好看"不如"好用"
2. **Rebuttal 必须公平** — 先陈述辩护方理由，再提出反方
3. **每个裁定都要分级** — 🔴 HIGH / ⚠️ MODERATE / 💡 LOW
4. **Action list 必须可执行** — 每项都附带 slash command + DSL diff
5. **不要完美主义** — P2 可以选择不修

## Composing with Other Skills

- 前置 → `/critique-design` (Layer 1) + `/enforce-design-consistency` (Layer 2)
- 修复 → 根据 action list 调用对应 skill
- 最终 → `/pre-launch-checklist` 完成上线准备
