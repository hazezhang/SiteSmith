---
name: performance-check
description: "性能检查。分析页面加载性能并优化（图片、CSS、JS、字体）。Performance audit and optimization."
argument-hint: [page-path-or-all]
allowed-tools: Read, Write, Edit, Bash(*), Grep, Glob, mcp__Claude_Preview__preview_network, mcp__Claude_Preview__preview_eval
---

# Performance Check — 性能检查

## Input

`$ARGUMENTS` — 检查范围

## Workflow

### Phase A: 静态分析

扫描代码检查：
1. **图片优化** — 格式（WebP/AVIF）、尺寸、lazy loading
2. **CSS 优化** — 未使用的样式、关键路径内联
3. **JS 优化** — defer/async、bundle 大小
4. **字体优化** — font-display:swap、预加载、子集化
5. **HTML 优化** — 压缩、不必要的嵌套

### Phase B: 使用 Preview 工具（如果可用）

通过 Preview 的 network 面板分析：
- 总加载大小
- 请求数量
- 加载瀑布图

### Phase C: 输出报告 + 修复

```markdown
## Performance Report

### 预估评分: [X/100]

### 优化建议
| 优先级 | 优化项 | 预估提升 | 自动修复？ |
|--------|--------|---------|-----------|
| P0 | 图片添加 lazy loading | LCP -500ms | ✅ |
| P0 | 内联关键 CSS | FCP -200ms | ✅ |
| P1 | 字体 font-display:swap | FOUT 优化 | ✅ |
```

### 🚦 Checkpoint: Optimization Decision

- **展示**: 性能报告
- **全部优化 →** 执行自动修复
- **选择优化 →** 用户指定项目

## Key Rules

1. **LCP < 2.5s** — 核心目标
2. **CLS < 0.1** — 避免布局偏移
3. **不牺牲功能** — 优化不能破坏功能
