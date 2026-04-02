---
name: critique-design
description: "AI设计批评者。像资深设计师一样审视当前设计，指出问题并打分。Design critic that evaluates and scores the current design."
argument-hint: [page-path-or-all]
allowed-tools: Read, Write, Edit, Grep, Glob, mcp__Claude_Preview__preview_start, mcp__Claude_Preview__preview_screenshot, mcp__Claude_Preview__preview_resize, mcp__Claude_Preview__preview_eval, mcp__Claude_Preview__preview_inspect
---

# Design Critic — AI 设计批评者

> 最像"真人设计师"的部分：直接说"CTA不够突出""视觉层级不清晰"

## Input

`$ARGUMENTS` — 要审视的页面路径，或 "all" 审视全站
- 无参数时，审视所有已生成的页面

## Constants

- **CRITIQUE_DEPTH = `standard`** — 审视深度
  - `quick`: 只看最明显的问题（3分钟审视）
  - `standard`: 全维度评估 + 打分
  - `deep`: 含竞品对比 + 详细改进方案
> 💡 Override: `/critique-design "src/index.html" — depth: deep`

## Workflow

### Phase A: 收集审视素材

1. 读取 `DESIGN_INTENT.md` — 用户的设计目标（评判标准）
2. 读取 `DESIGN_SYSTEM.md` — 设计规则（一致性检查）
3. 读取目标页面代码
4. 使用 Preview 工具：
   - 启动预览 → 截图 desktop 视图
   - 调整视口 → 截图 mobile 视图
5. 读取 `.designurpage/skills/shared-references/design-principles.md`

### Phase B: 七维度评审

#### 1. Visual Hierarchy（视觉层级）⭐⭐⭐
- 信息层次是否清晰？
- 标题/正文/辅助文字的大小对比是否足够？
- 页面焦点是否明确？

#### 2. Color & Contrast（色彩与对比）⭐⭐⭐
- 色彩使用是否遵循设计系统？
- 文字可读性如何？（对比度检查）
- 色彩情感是否匹配设计意图？

#### 3. Typography（字体排版）⭐⭐
- 字体选择是否合适？
- 行高/字间距是否舒适？
- 段落宽度是否在可读范围（45-75ch）？

#### 4. Layout & Spacing（布局与间距）⭐⭐⭐
- 间距系统是否一致？
- 对齐是否严格？
- 组件间关系是否清晰？

#### 5. Consistency（一致性）⭐⭐
- 同类元素样式是否统一？
- 是否有脱离设计系统的"野代码"？

#### 6. Responsiveness（响应式）⭐⭐
- mobile/tablet 体验如何？
- 是否有布局错乱/溢出？

#### 7. Interaction & Polish（交互与打磨）⭐
- hover/focus 状态是否完善？
- 过渡动效是否流畅？
- 细节打磨程度如何？

### Phase C: 输出批评报告

```markdown
## Design Critique Report

### Overall Score: [X/100] — [一句话评语]

### 维度评分
| 维度 | 分数 | 评语 |
|------|------|------|
| 视觉层级 | /20 | ... |
| 色彩对比 | /20 | ... |
| 字体排版 | /15 | ... |
| 布局间距 | /20 | ... |
| 一致性 | /10 | ... |
| 响应式 | /10 | ... |
| 交互打磨 | /5 | ... |

### 关键问题（必须修复）
1. 🔴 [问题] — [原因] — [建议修复]

### 改进建议（推荐修复）
1. 🟡 [建议] — [原因] — [如何改进]

### 亮点（做得好的地方）
1. 🟢 [亮点] — [为什么好]

### 与设计意图的匹配度
- 用户期望: [DESIGN_INTENT 中的关键词]
- 实际呈现: [评估]
- 差距: [如果有]
```

### 🚦 Checkpoint: Critique Review

- **展示**: 完整批评报告
- **询问**: "要修复哪些问题？我可以逐个帮你改进"
- **修复全部 →** 逐个调用 `/patch-component`, `/refactor-layout`, `/refine-design-style`
- **选择修复 →** 用户指定要改的项目
- **仅记录 →** 保存报告供后续参考

## Phase D: DSL Diff 修复提案 ⭐ NEW

不只给文字建议 — 输出机器可执行的 DSL diff：

```markdown
### 自动修复提案

#### 🔴 Issue: Hero 标题对比度不足
**诊断**: 当前 color.contrast="medium" + heading weight=600, hierarchy.depth="flat"
**DSL Diff**:
```json
{
  "hierarchy": { "depth": "moderate", "contrast_strategy": "typography" },
  "typography": { "weight_strategy": "heavy-headings" }
}
```
**效果**: heading 字重 600→900, 层级感增强
**修复命令**: `/refine-design-dsl "更强的标题层级"`
```

每个 critical issue 都必须附带：
1. **诊断** — 指出是哪个 DSL 维度的参数导致了问题
2. **DSL Diff** — 建议的参数变更
3. **修复命令** — 用户可以直接执行的 slash command

## Three-Layer Review Architecture

本 skill 是三层审查体系的 Layer 1：

```
Layer 1: Design Critic (本skill)
    → 10维度评分 + 诊断 + DSL diff 修复提案
    → 关注: 技术正确性、可用性、设计系统一致性
    ↓
Layer 2: /enforce-design-consistency (已有)
    → 跨页面/组件一致性扫描
    → 关注: token合规、风格统一、无"野代码"
    ↓
Layer 3: /senior-designer-review (NEW)
    → 站在用户角度的整体审查
    → 关注: 第一印象、情感传达、品牌一致性
    → 输出: prioritized action list + rebuttal-style 反驳
```

完整审查流程: `/critique-design all` → `/enforce-design-consistency` → `/senior-designer-review`

## Key Rules

1. **基于设计意图评判** — minimal 风格不扣"内容太少"的分
2. **给具体建议** — 不只说"不好"，要说怎么改
3. **先肯定后批评** — 发现亮点也要说
4. **可操作** — 每个问题都映射到一个修复skill
5. **输出 DSL diff** — 每个 critical issue 必须附带参数变更建议

## Composing with Other Skills

- 关键问题 → `/patch-component` 或 `/refine-design-style`
- 布局问题 → `/analyze-layout` 深入分析 → `/refactor-layout`
- 交互问题 → `/suggest-interaction`
- 可访问性问题 → `/accessibility-audit`
- 全站审查 → `/enforce-design-consistency` + `/senior-designer-review`
