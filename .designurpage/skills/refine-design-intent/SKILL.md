---
name: refine-design-intent
description: "精炼/修改设计意图。支持自然语言修改如'更温暖一点''像X但更Y'。Refine design intent with natural language adjustments."
argument-hint: [natural-language-adjustment]
allowed-tools: Read, Write, Edit, Grep, Glob
---

# Refine Design Intent — 设计意图精炼

> 自然语言 → 结构化 diff → 更新设计意图

## Input

`$ARGUMENTS` — 用户的修改请求，如：
- "更温暖一点"
- "像Apple但更活泼"
- "不要暗色模式了"
- "增加一个博客板块"

## Workflow

### Phase A: 读取当前状态

1. 读取 `DESIGN_INTENT.md` — 当前设计意图
2. 读取 `.designurpage/skills/shared-references/style-vocabulary.md` — 风格翻译表
3. 如果存在 `DESIGN_SYSTEM.md`，也读取（修改可能需要级联）

### Phase B: 解析修改请求

将用户的自然语言映射为结构化修改：

1. **识别修改维度**：风格？色彩？布局？板块？交互？
2. **查阅 style-vocabulary.md** 的修饰词映射表
3. **生成 diff**：

```markdown
## Design Intent Diff

### 修改前
- 整体风格: modern
- 色温倾向: cool
- border-radius: 8px

### 修改后
- 整体风格: modern + warm
- 色温倾向: warm
- border-radius: 12px

### 修改原因
用户说"更温暖一点" → 参照 style-vocabulary 映射：
色温偏暖, border-radius↑, 字体偏圆润
```

### 🚦 Checkpoint: Diff Confirmation

- **展示**: 修改前后对比 diff
- **询问**: "这样调整符合你的想法吗？"
- **确认 →** 应用修改到 `DESIGN_INTENT.md`
- **修改 →** 调整 diff 后再确认
- **否决 →** 放弃此次修改

### Phase C: 级联影响分析

修改 `DESIGN_INTENT.md` 后，分析是否需要级联更新：

1. 如果 `DESIGN_SYSTEM.md` 存在 → 提示用户运行 `/generate-design-system` 更新
2. 如果已有生成的页面/组件 → 提示用户运行 `/refine-design-style` 应用变更
3. 更新 `DESIGN_MEMORY.json`（如果存在）

## Key Rules

1. **永远展示 diff** — 不直接覆盖，让用户看到前后对比
2. **最小化修改** — 只改用户提到的维度，不动其他部分
3. **级联提醒** — 告知下游哪些文件可能需要更新
