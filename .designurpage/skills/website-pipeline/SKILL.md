---
name: website-pipeline
description: "总调度器。一键启动完整网站构建流水线，自动串联所有skill并在HITL节点暂停。Full pipeline orchestrator with HITL gates."
argument-hint: [optional: resume-from-phase]
allowed-tools: Read, Write, Edit, Bash(*), Grep, Glob, Agent, Skill, WebSearch, WebFetch, mcp__Claude_Preview__preview_start, mcp__Claude_Preview__preview_stop, mcp__Claude_Preview__preview_screenshot, mcp__Claude_Preview__preview_resize, mcp__Claude_Preview__preview_eval, mcp__Claude_Preview__preview_click, mcp__Claude_Preview__preview_fill
---

# Website Pipeline — 总调度器

> 一个命令启动完整的个人网站构建流程
> 在每个关键节点暂停，等待用户确认

## Input

`$ARGUMENTS` — 可选，从指定阶段恢复
- 无参数: 从头开始
- `resume design`: 从设计系统阶段恢复
- `resume build`: 从构建阶段恢复
- `resume quality`: 从质量检查阶段恢复

## Constants

- **TECH_STACK = `auto`** — 技术方案，auto 时根据复杂度推断
- **SKIP_QUALITY = `false`** — 是否跳过质量检查
> 💡 Override: `/website-pipeline — tech: tailwind, skip_quality: true`

## Pipeline Overview

```
Phase 1: Intent Capture
    │
    ├── /capture-design-intent
    ├── /suggest-style (optional)
    │
    🚦 HITL-1: Design Approval Gate ←── 确认设计方向
    │
Phase 2: Planning & Design System
    │
    ├── /plan-website-structure
    ├── /generate-design-system
    │
    🚦 HITL-2: Structure & Style Confirmation ←── 确认结构和设计系统
    │
Phase 3: Build
    │
    ├── /project-scaffold
    ├── /generate-navbar
    ├── /generate-footer
    ├── For each page in blueprint:
    │   ├── /generate-page "{page}"
    │   ├── Preview + Screenshot
    │   └── 🚦 HITL-3: Page Review ←── 每页确认
    │
    ├── /suggest-interaction (optional)
    │
Phase 4: Content
    │
    ├── /write-copy
    ├── /generate-bio
    ├── /curate-portfolio (if needed)
    ├── /setup-blog (if needed)
    │
    🚦 HITL-4: Content Review ←── 内容确认
    │
Phase 5: Quality
    │
    ├── /apply-responsive-design "all"
    ├── /critique-design "all"
    ├── /enforce-design-consistency
    ├── /accessibility-audit "all"
    ├── /performance-check "all"
    ├── /seo-optimizer "all"
    │
    🚦 HITL-5: Quality Review ←── 质量报告确认
    │
Phase 6: Launch
    │
    ├── /pre-launch-checklist
    ├── /deploy-setup
    │
    🎉 Done!
```

## Workflow

### Phase 1: Intent Capture

1. 检查是否存在 `DESIGN_INTENT.md`
   - 如果存在 → 询问是否使用现有的或重新开始
   - 如果不存在 → 调用 `/capture-design-intent`

2. 检查 `DESIGN_MEMORY.json`（如果存在，告知用户"我记得你偏好..."）

3. (可选) 调用 `/suggest-style` 获取 AI 风格建议

### **🚦 HITL Gate 1: Design Approval**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚦 HITL-1: Design Approval Gate
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

设计方向总结:
- 风格: [style]
- 色彩: [colors]
- 布局: [layout]
- 板块: [sections]

选项:
✅ 确认 → 进入规划阶段
✏️ 修改 → /refine-design-intent
🔄 重来 → 重新 /capture-design-intent
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Phase 2: Planning & Design System

1. 调用 `/plan-website-structure`
2. 调用 `/generate-design-system`

### **🚦 HITL Gate 2: Structure & Style Confirmation**

展示：站点地图 + 设计系统预览（色板 + 字体）
选项：确认 / 修改结构 / 修改设计系统

### Phase 3: Build

1. 调用 `/project-scaffold`
2. 调用 `/generate-navbar`
3. 调用 `/generate-footer`
4. 对 blueprint 中的每个页面：
   - 调用 `/generate-page "{page}"`
   - 使用 Preview 截图
   - **🚦 HITL-3: 每页确认** — 用户可以：
     - ✅ 满意 → 下一页
     - 🎨 调风格 → `/refine-design-style`
     - 🔧 改组件 → `/patch-component`
     - 📐 改布局 → `/refactor-layout`
5. (可选) 调用 `/suggest-interaction`

### Phase 4: Content

1. 调用 `/write-copy "all"` — 生成全站文案
2. 调用 `/generate-bio` — 个人简介
3. 如果有作品集 → `/curate-portfolio`
4. 如果有博客 → `/setup-blog`

### **🚦 HITL Gate 4: Content Review**

展示：所有填充的内容
选项：确认 / 修改特定文案 / 使用自己的文案替换

### Phase 5: Quality

1. `/apply-responsive-design "all"` — 响应式检查
2. `/critique-design "all"` — 设计评审 + 打分
3. `/enforce-design-consistency` — 一致性扫描
4. `/accessibility-audit "all"` — 可访问性
5. `/performance-check "all"` — 性能优化
6. `/seo-optimizer "all"` — SEO

### **🚦 HITL Gate 5: Quality Review**

展示：所有质量报告的汇总
选项：修复全部 / 选择修复 / 忽略（标记为已知问题）

### Phase 6: Launch

1. `/pre-launch-checklist` — 最终检查
2. `/deploy-setup` — 部署引导

### 完成后

1. 更新 `DESIGN_MEMORY.json` — 记录最终偏好
2. 输出项目总结：
   ```
   🎉 Your website is ready!

   Pages: X pages built
   Components: X components created
   Design Score: X/100
   Accessibility: X/10
   Performance: X/100

   Deploy with: /deploy-setup [platform]
   ```

## State & Recovery

Pipeline 状态记录在 `BUILD_LOG.md`，支持断点恢复：
- 记录每个 phase 的完成状态
- 记录每个 HITL gate 的用户决定
- 允许从任意阶段恢复

## Key Rules

1. **永远在 HITL 节点暂停** — 不自动跳过任何确认
2. **记录一切** — BUILD_LOG.md 实时更新
3. **支持恢复** — 用户可以随时退出，下次从断点继续
4. **Design Memory** — 整个流程中积累用户偏好
5. **灵活跳过** — 用户可以跳过任何可选步骤

## Composing with Other Skills

此 skill 调度所有其他 skill，是整个系统的入口。
也可以单独使用任何 skill，不必走完整流水线。
