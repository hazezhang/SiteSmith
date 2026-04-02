---
name: refine-design-style
description: "风格迭代核心skill。自然语言反馈→design system diff→局部更新所有受影响组件。不重生成整站。Refine style via natural language → incremental diff update."
argument-hint: [natural-language-feedback]
allowed-tools: Read, Write, Edit, Grep, Glob, Agent, mcp__Claude_Preview__preview_start, mcp__Claude_Preview__preview_screenshot
---

# Refine Design Style — 风格迭代 ⭐

> 核心创新：自然语言 → design system diff → 局部 CSS 变量更新 → 全站自动生效
> **永远不重新生成整个网站**

## Input

`$ARGUMENTS` — 用户的风格调整请求（必填），如：
- "更温暖一点"
- "像Apple但更活泼"
- "按钮更圆润一些"
- "整体感觉太冷了"
- "配色太沉闷，想要更有活力"
- "字体太正式了"

## Prerequisites

- `DESIGN_INTENT.md` 必须存在（含 Design DSL JSON）
- `DESIGN_SYSTEM.md` 必须存在
- `src/styles/variables.css` 必须存在

## Workflow

### Phase A: 解析反馈 → 映射到 Design Tokens

1. 从 `DESIGN_INTENT.md` 提取当前 Design DSL JSON
2. 读取 `src/styles/variables.css` — 当前 CSS 变量值
3. 读取 `.designurpage/dsl/presets.md` — 自然语言→DSL diff 映射表
4. 读取 `.designurpage/dsl/code-mapping.md` — DSL→CSS 翻译规则
5. 将用户反馈先映射为 **DSL diff**，再由 DSL diff 计算 **CSS 变量 diff**：

```markdown
## Feedback Analysis

**用户说**: "更温暖一点"

**映射到的修改**:
| Token | 当前值 | 新值 | 原因 |
|-------|--------|------|------|
| `--color-primary-500` | #3b82f6 (蓝) | #f59e0b (琥珀) | 冷色→暖色 |
| `--color-background` | #fafafa | #faf8f5 | 纯白→暖白 |
| `--radius-md` | 8px | 12px | 增加圆润感 |
| `--font-body` | Inter | Nunito | 几何→圆润 |
| `--shadow-md` | rgba(0,0,0,0.1) | rgba(180,120,60,0.08) | 冷灰阴影→暖色阴影 |

**不修改的 Tokens**:
- 间距系统（与温暖无关）
- 动效系统（与温暖无关）
- 字号阶梯（与温暖无关）
```

### Phase B: 生成 Diff 预览

展示修改前后对比：

```markdown
## Style Diff Preview

### Color Changes
Before: 🔵 Cool blue (#3b82f6) → After: 🟡 Warm amber (#f59e0b)
Before: ⬜ Pure white bg → After: 🟤 Warm white bg (#faf8f5)

### Shape Changes
Before: radius 8px (较方) → After: radius 12px (更圆润)

### Typography Changes
Before: Inter (几何无衬线) → After: Nunito (圆润无衬线)

### 影响范围
- variables.css: 5 个变量修改
- 所有使用这些变量的组件自动生效（CSS变量的优势）
- 需要手动检查的: 硬编码颜色（如果有）
```

### 🚦 Checkpoint: Style Diff Confirmation（HITL-2 核心）

- **展示**: Token 修改对比表 + 影响范围
- **询问**: "这样调整符合你想要的'更温暖'的感觉吗？"
- **确认 →** 执行 Phase C
- **微调 →** "色彩可以再暖一点，但字体保持 Inter" → 调整 diff
- **否决 →** 放弃修改
- **更多修改 →** "顺便把动效也活泼一点" → 追加到 diff

### Phase C: 执行增量更新

1. **修改 `src/styles/variables.css`** — 更新 CSS 变量值
   - 使用 Edit 工具逐个替换变量值
   - CSS 变量的级联特性确保全站自动生效

2. **更新 `DESIGN_SYSTEM.md`** — 同步文档
   - 更新对应的 token 表

3. **扫描硬编码值**（调用 `/enforce-design-consistency` 的逻辑）
   - 如果有硬编码颜色等不走 CSS 变量的值，单独 patch

4. **更新 `DESIGN_INTENT.md`** — 反映新的风格方向

5. **更新 `DESIGN_MEMORY.json`** — 记录此次偏好调整

### Phase D: 验证效果

1. 使用 Preview 工具重新预览
2. 截图展示修改后的效果
3. 与修改前对比

### 🚦 Checkpoint: Visual Confirmation

- **展示**: 修改前后截图对比
- **询问**: "效果如何？还需要继续调整吗？"
- **满意 →** 完成
- **继续调整 →** 回到 Phase A（新一轮 refine）

## 为什么这个方法有效

```
传统方法:
用户不满意 → 描述修改 → 重新生成整个页面 → 丢失之前的调整

本方法:
用户不满意 → 描述修改 → CSS变量 diff → 全站自动生效 → 保留所有之前的调整
                                ↑
                        这是核心创新点
```

- CSS Custom Properties 的级联特性让"改一处，全站生效"成为可能
- 不需要重新生成任何 HTML 结构
- 不需要重新生成组件代码
- 只需要修改 `variables.css` 中的几个值

## Key Rules

1. **只改 CSS 变量** — 不动 HTML 结构，不动组件代码
2. **最小修改** — 只改与用户反馈相关的 tokens
3. **展示 diff** — 永远让用户看到修改前后对比
4. **记录偏好** — 每次修改都更新 DESIGN_MEMORY.json
5. **支持连续迭代** — 用户可以连续说"再暖一点""字号再大一点"

## Composing with Other Skills

- 如果有硬编码违规 → `/enforce-design-consistency` 修复
- 如果需要局部组件修改 → `/patch-component`
- 如果需要整体评估 → `/critique-design` 看改后分数
