---
name: accessibility-audit
description: "可访问性审计。检查 WCAG 2.1 AA 合规性并自动修复。Accessibility audit against WCAG 2.1 AA with auto-fix."
argument-hint: [page-path-or-all]
allowed-tools: Read, Write, Edit, Grep, Glob, Bash(*), mcp__Claude_Preview__preview_eval, mcp__Claude_Preview__preview_inspect
---

# Accessibility Audit — 可访问性审计

## Input

`$ARGUMENTS` — 审计范围（页面路径或 "all"）

## Workflow

### Phase A: 自动检查

扫描所有 HTML 文件，检查：

1. **图片 alt 属性** — 所有 `<img>` 必须有 alt（装饰性用 `alt=""`）
2. **标题层级** — h1 → h2 → h3 不跳级
3. **表单标签** — 所有 input 关联 label
4. **颜色对比度** — 文字/背景对比度 ≥ 4.5:1
5. **键盘导航** — 交互元素可 Tab 到达
6. **ARIA 属性** — 自定义组件有正确的 aria 标签
7. **Skip link** — 页面顶部有跳到主内容的链接
8. **Focus visible** — focus 状态可见
9. **Touch target** — 可点击区域 ≥ 44x44px
10. **Language** — `<html lang="...">`

### Phase B: 输出报告

```markdown
## Accessibility Report — WCAG 2.1 AA

### Score: [X/10]

### Issues Found
| 严重度 | 问题 | 位置 | 自动修复？ |
|--------|------|------|-----------|
| 🔴 Critical | 图片缺少 alt | index.html:42 | ⚠️ 需要人工 |
| 🟡 Warning | 对比度不足 | hero button | ✅ 可自动 |
| 🟢 Info | 可添加 aria-label | nav toggle | ✅ 可自动 |
```

### 🚦 Checkpoint: Fix Decision

- **展示**: 审计报告
- **全部修复 →** 自动修复 + 提示需人工处理的项
- **选择修复 →** 用户指定
- **跳过 →** 仅保存报告

## Key Rules

1. **不只是报告** — 尽可能自动修复
2. **alt 需要人工** — 自动生成的 alt 不可靠，标记让用户填写
