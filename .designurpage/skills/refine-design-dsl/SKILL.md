---
name: refine-design-dsl
description: "DSL精炼。自然语言反馈→DSL参数diff→更新DSL。用户改参数而不是改prompt。Refine Design DSL from natural language feedback."
argument-hint: [natural-language-feedback]
allowed-tools: Read, Write, Edit, Grep, Glob
---

# Refine Design DSL — DSL 精炼

> 核心交互：用户不再改 prompt，而是改 DSL 参数
> "太花了" → `color.mode: "vibrant" → "monochrome"` + `interaction.level: "high" → "low"`

## Input

`$ARGUMENTS` — 用户的自然语言反馈（必填），如：
- "太花了，想更简洁一点"
- "更温暖"
- "像Apple但更活泼一点"
- "交互太多了"
- "字体太正式了，想要更随意一点"
- 也支持直接指定：`"color.mode": "soft"`

## Prerequisites

- `DESIGN_INTENT.md` 中必须包含 DSL JSON

## Workflow

### Phase A: 读取当前 DSL

1. 从 `DESIGN_INTENT.md` 提取当前 Design DSL JSON
2. 读取 `.designurpage/dsl/presets.md` — 自然语言→DSL映射表
3. 读取 `.designurpage/dsl/schema.md` — 验证约束

### Phase B: 解析反馈 → 计算 DSL Diff

将用户反馈映射为 DSL 字段修改：

**解析策略**：

1. 查阅 `presets.md` 底部的 "Natural Language → DSL Diff Mapping" 表
2. 如果用户说的是修饰词（"更温暖"）→ 查表直接映射
3. 如果用户说的是参考（"像Apple"）→ 加载对应 preset，计算与当前 DSL 的 diff
4. 如果用户说的是具体维度（"交互太多了"）→ 只修改对应维度

**输出 DSL Diff**：

```diff
## Design DSL Diff

用户反馈: "太花了，想更简洁一点"

- "color": { "mode": "vibrant" }
+ "color": { "mode": "monochrome" }

- "interaction": { "level": "high", "hover": "scale" }
+ "interaction": { "level": "low", "hover": "opacity" }

- "motion": { "type": "scroll-driven", "duration": "300ms" }
+ "motion": { "type": "subtle-fade", "duration": "200ms" }

- "density": "medium"
+ "density": "low"

未修改（保留原值）:
  "layout": { ... }          ← 与"简洁"无关
  "typography": { ... }       ← 与"简洁"无关（除非用户指定）
```

### 🚦 Checkpoint: DSL Diff Confirmation

- **展示**: 修改前后 DSL diff（只显示变更的字段）
- **询问**: "这些参数调整符合你要的'更简洁'吗？"
- **确认 →** 应用 diff 到 `DESIGN_INTENT.md` 中的 DSL JSON
- **部分确认 →** "颜色改了，但交互不用变" → 只应用选中的变更
- **否决 →** 放弃修改

### Phase C: 应用 Diff + 级联

1. 更新 `DESIGN_INTENT.md` 中的 DSL JSON
2. 分析级联影响：
   - 如果 `DESIGN_SYSTEM.md` 存在 → 提示重新编译：`/translate-design-to-code`
   - 如果已有生成的页面 → CSS 变量更新会自动生效
   - 如果改了 `layout.type` 等结构性字段 → 需要 `/refactor-layout`
3. 更新 `DESIGN_MEMORY.json`（如果存在）

### Phase D: 验证修改后的 DSL

1. 运行 schema 验证（字段完整 + 值范围 + 组合冲突）
2. 如果有冲突 → 提示用户

## Example: Full Interaction

```
用户: "太花了，想更简洁一点"

系统分析:
  "太花" → color.mode 降级, interaction.level 降级
  "简洁" → density 降低, motion 简化

DSL Diff:
  color.mode:        vibrant → monochrome
  interaction.level: high → low
  interaction.hover: scale → opacity
  density:           medium → low
  motion.type:       scroll-driven → subtle-fade

确认？ [Y/n/部分]

用户: Y

→ 更新 DESIGN_INTENT.md 中的 DSL
→ 提示: 运行 /translate-design-to-code 重新编译CSS
→ 如果CSS已存在，变量更新后全站自动生效
```

## Key Rules

1. **最小修改** — 只改与反馈相关的维度，其余保持不变
2. **展示 diff** — 永远让用户看到精确的参数变化
3. **支持部分确认** — 用户可以只采纳 diff 的一部分
4. **维度独立** — 各维度的修改互不影响（除非有验证冲突）
5. **直接指定** — 用户也可以跳过自然语言，直接说 `"motion.type": "none"`

## Composing with Other Skills

- diff 确认后 → `/translate-design-to-code` 重新编译 CSS
- 如果改了结构字段（layout.type）→ 可能需要 `/refactor-layout`
- 大方向改变 → 考虑先 `/suggest-style` 获取建议
