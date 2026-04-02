---
name: critique-design-dsl
description: "DSL审查。在生成代码前检查DSL的设计合理性、维度冲突和可访问性。Critique Design DSL for consistency, conflicts, and accessibility before code generation."
argument-hint: [dsl-source]
allowed-tools: Read, Write, Edit, Grep, Glob
---

# Critique Design DSL — DSL 设计审查

> 在编译为代码之前，先检查 DSL 本身的设计合理性

## Input

`$ARGUMENTS` — DSL 来源（默认读取 `DESIGN_INTENT.md`）

## Workflow

### Phase A: 读取 DSL

1. 从 `DESIGN_INTENT.md` 提取 Design DSL JSON
2. 读取 `.designurpage/dsl/schema.md` — 验证规则

### Phase B: 七维度审查

#### 1. Completeness Check（完整性）
- 所有 7 个维度是否都有值？
- 是否有字段使用了 schema 之外的值？

#### 2. Conflict Detection（冲突检测）

已知冲突规则：

| 冲突 | 条件 | 严重度 |
|------|------|--------|
| 密度-布局冲突 | `density: "low"` + `layout.columns > 3` | 🔴 |
| 交互-动效冲突 | `interaction.level: "low"` + `motion.type: "3D"` | 🟡 |
| 色彩-对比冲突 | `color.mode: "monochrome"` + `color.contrast: "low"` | 🔴 |
| 排版-密度冲突 | `typography.line_height > 1.8` + `density: "high"` | 🟡 |
| 风格-交互不匹配 | `style: "minimal"` + `interaction.level: "high"` | 🟡 |
| 风格-动效不匹配 | `style: "editorial"` + `motion.type: "scroll-driven"` | 🟡 |

#### 3. Accessibility Check（可访问性）

- `color.contrast` 不能为 `"low"`（WCAG 最低要求）
- `motion.reduced_motion` 必须为 `true`
- `interaction.focus` 不能为 `"none"`
- `typography.base_size` 不能小于 `"14px"`

#### 4. Coherence Score（风格一致性）

评估各维度是否指向同一个设计方向：
- 所有维度都偏 "low"/"minimal" → 高一致性
- `color: vibrant` + `interaction: low` + `motion: none` → 低一致性

#### 5. Personality Match（人格匹配）

检查 `personality` 描述是否与各维度吻合：
- `personality: "calm"` + `motion.type: "scroll-driven"` → 不匹配
- `personality: "bold"` + `interaction.level: "low"` → 不匹配

#### 6. Performance Implications（性能影响）

- `motion.type: "3D"` 或 `"parallax"` → 高 GPU 占用
- `interaction.level: "high"` + `motion.type: "scroll-driven"` → 可能卡顿
- `color.dark_mode: true` → 额外 CSS 体积

#### 7. Implementation Complexity（实现复杂度）

评估 DSL 的实现难度：
- `layout.type: "asymmetric"` → 高
- `motion.type: "scroll-driven"` → 中-高
- `layout.type: "single-column"` + `motion.type: "none"` → 低

### Phase C: 输出审查报告

```markdown
## DSL Critique Report

### Overall Assessment: [Good / Needs Attention / Issues Found]

### Completeness: ✅ / ⚠️ Missing fields: [list]

### Conflicts
| 严重度 | 冲突 | 建议修复 |
|--------|------|---------|
| 🔴 | density:low + columns:4 | 减少列数到 2，或提高 density |
| 🟡 | minimal + high interaction | 降低 interaction 或换风格 |

### Accessibility
- ✅ contrast: high
- ✅ reduced_motion: true
- ⚠️ focus: "none" → 建议设为 "ring"

### Coherence Score: [X/10]
- [分析哪些维度不够统一]

### Performance: [Low / Medium / High] impact
- [列出性能相关注意事项]

### Implementation Complexity: [Low / Medium / High]
- 预估工作量: [X] 个组件, [Y] 个自定义动效

### Recommended Adjustments
1. [具体建议 + DSL diff]
2. [具体建议 + DSL diff]
```

### 🚦 Checkpoint: DSL Adjustment Decision

- **展示**: 审查报告
- **接受建议 →** 应用推荐的 DSL 修改
- **部分接受 →** 选择要应用的建议
- **保持原样 →** 了解风险，继续编译

## Key Rules

1. **在编译前检查** — 修改 DSL 比修改代码容易 100 倍
2. **给出具体 diff** — 每个建议都带可执行的 DSL 修改
3. **区分严重度** — 🔴 必须修复 / 🟡 建议修复 / 🟢 可选优化
4. **不替用户做决定** — 报告问题 + 建议，让用户选择

## Composing with Other Skills

- 修复冲突后 → `/refine-design-dsl` 应用修改
- 审查通过 → `/translate-design-to-code` 编译为代码
- 已有代码需要审查 → `/critique-design`（审查渲染结果而非 DSL）
