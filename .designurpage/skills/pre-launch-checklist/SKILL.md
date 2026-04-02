---
name: pre-launch-checklist
description: "上线前检查清单。全面检查功能、性能、SEO、可访问性、内容。Pre-launch checklist — comprehensive final review."
argument-hint: []
allowed-tools: Read, Write, Edit, Bash(*), Grep, Glob, mcp__Claude_Preview__preview_start, mcp__Claude_Preview__preview_screenshot, mcp__Claude_Preview__preview_eval, mcp__Claude_Preview__preview_network
---

# Pre-launch Checklist — 上线前检查

> 发布前的最后一道关卡

## Workflow

逐项检查并输出报告：

### 1. Content（内容）
- [ ] 所有占位文字已替换为真实内容
- [ ] 没有 Lorem ipsum 或 placeholder
- [ ] 所有链接可用（无 404）
- [ ] 联系方式正确
- [ ] 版权年份正确

### 2. Design（设计）
- [ ] 所有页面风格一致
- [ ] 无硬编码颜色/字体
- [ ] 暗色模式正常（如有）
- [ ] 图片质量合适

### 3. Responsive（响应式）
- [ ] Mobile (375px) 正常
- [ ] Tablet (768px) 正常
- [ ] Desktop (1440px) 正常
- [ ] 无水平滚动条

### 4. Performance（性能）
- [ ] 图片已优化
- [ ] CSS/JS 已压缩（如适用）
- [ ] 字体加载优化
- [ ] 首屏加载 < 3s

### 5. SEO（搜索引擎）
- [ ] 每页有唯一 title 和 description
- [ ] Open Graph tags 完整
- [ ] sitemap.xml 存在
- [ ] robots.txt 存在

### 6. Accessibility（可访问性）
- [ ] 图片有 alt 属性
- [ ] 键盘可导航
- [ ] 对比度达标
- [ ] Focus 状态可见

### 7. Technical（技术）
- [ ] 无 console errors
- [ ] 外部链接有 rel="noopener noreferrer"
- [ ] favicon 存在
- [ ] 404 页面存在（如适用）

### 🚦 Checkpoint: Launch Decision

- **展示**: 检查清单结果（✅/❌）
- **全部通过 →** 推荐 `/deploy-setup` 部署
- **有未通过项 →** 逐项修复 → 重新检查
- **标记为已知问题 →** 记录但不阻塞发布

## Key Rules

1. **不放过占位内容** — placeholder 上线是最常见的低级错误
2. **自动化优先** — 能自动检查的都自动检查
3. **阻塞 vs 警告** — content/function 问题阻塞，nice-to-have 只警告
