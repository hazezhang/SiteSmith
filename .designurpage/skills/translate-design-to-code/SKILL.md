---
name: translate-design-to-code
description: "DSL编译器。将 Design DSL 编译为 CSS变量/Tailwind配置/React组件代码。Compile Design DSL into CSS variables, Tailwind config, and component code."
argument-hint: [dsl-source: file-path | inline-json]
allowed-tools: Read, Write, Edit, Bash(*), Grep, Glob
---

# Translate Design to Code — DSL → Code 编译器

> Design DSL 是设计语言，这个 skill 是编译器：把 DSL 翻译成可执行的代码

## Input

`$ARGUMENTS` — DSL 来源
- 无参数: 读取 `DESIGN_INTENT.md` 中嵌入的 DSL JSON
- 文件路径: 读取指定文件中的 DSL
- 内联 JSON: 直接解析

## Prerequisites

- DSL JSON 必须存在（由 `/capture-design-intent` 或 `/refine-design-dsl` 生成）
- `.designurpage/dsl/code-mapping.md` — 翻译规则参考

## Workflow

### Phase A: 读取 + 验证 DSL

1. 读取 DSL JSON（从 `DESIGN_INTENT.md` 的 `## Design DSL` section 提取）
2. 读取 `.designurpage/dsl/schema.md` — 验证字段完整性
3. 运行验证规则：
   - 必填字段是否存在？
   - 值是否在允许范围内？
   - 组合冲突检查（如 `density:low` + `grid.columns:4`）
4. 如果缺失字段 → 从 preset 补全默认值

### Phase B: 编译 CSS 变量

读取 `.designurpage/dsl/code-mapping.md`，逐维度翻译：

1. **Layout → CSS**
   - `layout.type` → container/grid 样式
   - `layout.max_width` → `--container-max`
   - `layout.section_spacing` → `--section-gap`

2. **Density → CSS**
   - 映射 padding/gap/spacing 变量

3. **Typography → CSS**
   - `font_pairing` → `@import` Google Fonts + `--font-heading/body`
   - `scale` → 计算完整字号阶梯 `--text-xs` ~ `--text-4xl`
   - `line_height` → `--leading-*`
   - `weight_strategy` → `--weight-heading/body`

4. **Color → CSS**
   - `mode` → 选择色板生成策略
   - 具体颜色值 → `--color-*` 完整色板（50~900 阶梯）
   - 如果 `dark_mode: true` → 生成 `[data-theme="dark"]` 变量集

5. **Interaction → CSS**
   - `hover` → `.interactive:hover` 样式
   - `click_feedback` → `.interactive:active` 样式
   - `focus` → `.interactive:focus-visible` 样式

6. **Motion → CSS + JS**
   - `type` → `.reveal` 类 + IntersectionObserver 代码
   - `duration/easing` → `--entrance-duration/easing`
   - `reduced_motion: true` → `@media (prefers-reduced-motion)` 覆盖

### Phase C: 输出文件

根据技术方案（从 `SITE_BLUEPRINT.md` 读取）输出：

#### 方案 A: 纯 HTML/CSS
```
src/styles/variables.css    ← 所有 CSS 变量
src/styles/base.css         ← reset + 全局样式（引用变量）
src/styles/interactions.css ← hover/motion 样式
src/scripts/interactions.js ← IntersectionObserver（如果 motion !== "none"）
```

#### 方案 B: Tailwind
额外生成：
```
tailwind.config.js          ← DSL tokens 映射到 Tailwind theme
```

#### 方案 C: React
额外生成：
```
src/styles/tokens.js        ← DSL tokens 作为 JS 对象导出
```

### Phase D: 验证输出

1. 检查所有 CSS 变量是否被引用（无孤立变量）
2. 检查颜色对比度是否达标
3. 检查字号阶梯是否合理（最小 ≥ 12px，最大 ≤ 64px）

### 🚦 Checkpoint: Code Output Review

- **展示**: 生成的关键文件摘要（变量清单 + 色板 + 字号阶梯）
- **确认 →** 写入文件
- **调整 →** 修改 DSL → 重新编译

## DSL → Code 完整映射快速参考

| DSL Field | Output Target |
|-----------|--------------|
| `layout.*` | `--container-max`, `--section-gap`, grid/flex classes |
| `density` | `--component-padding`, `--card-padding`, `--element-gap` |
| `typography.*` | `@import`, `--font-*`, `--text-*`, `--leading-*`, `--weight-*` |
| `color.*` | `--color-*` (full palette), shadow tints |
| `interaction.*` | `:hover`, `:active`, `:focus-visible` styles |
| `motion.*` | `.reveal` CSS, IntersectionObserver JS |

## Key Rules

1. **确定性翻译** — 同一 DSL 输入永远产生同一代码输出
2. **完整性** — 每个 DSL 字段都必须有对应的代码输出
3. **CSS变量优先** — 所有值通过变量传递，不硬编码
4. **渐进增强** — motion/interaction 都有 fallback

## Composing with Other Skills

- 输入来自 → `/capture-design-intent` 或 `/refine-design-dsl`
- 输出被消费 → `/project-scaffold`, `/generate-page`, `/generate-component`
- 修改 DSL → `/refine-design-dsl` → 重新调用本 skill
