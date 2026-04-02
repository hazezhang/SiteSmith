# DesignUrPage — Website Generation Agent System

> 可控创意 + 可执行流水线：让用户像和设计师合作一样生成个人网站
> "把设计师的思考过程结构化 + 可复用 + 可交互"

## Architecture

```
User (Human-in-the-loop)
   ↓
Design Conversation Layer（对话 + 建议）
   ↓
Design Intelligence Engine（设计智能引擎）
   ├── Style Advisor        → /suggest-style
   ├── Layout Advisor       → /analyze-layout
   ├── Interaction Advisor  → /suggest-interaction
   ├── Design Critic        → /critique-design
   └── Consistency Guard    → /enforce-design-consistency
   ↓
Skill Router（能力调度 — /website-pipeline）
   ↓
Execution Layer（组件/页面/样式生成）
```

## Quick Start

```
/capture-design-intent     ← 开始设计对话
/website-pipeline          ← 一键启动完整流水线（含所有HITL节点）
```

## Skills Index (25 Skills)

### Intent Layer（意图层）— 3 skills
| Skill | 说明 |
|-------|------|
| `/capture-design-intent` | 设计师式对话捕获设计意图 → `DESIGN_INTENT.md` |
| `/refine-design-intent` | 自然语言 → design intent diff（"更温暖""像X但更Y"）|
| `/website-pipeline` | 总调度器，串联全流程 + HITL gates |

### Design Intelligence Engine（设计智能引擎）— 5 skills
| Skill | 说明 |
|-------|------|
| `/suggest-style` | AI 风格顾问：主动推荐 + trade-off 分析 + 设计人格 |
| `/analyze-layout` | 布局智能分析：视觉锚点/信息层级/空间利用/流动性 |
| `/suggest-interaction` | 微交互顾问：hover/scroll/transition 的"阻尼感"调优 |
| `/critique-design` | AI 设计批评者：七维度评审 + 打分 + 可操作改进建议 |
| `/enforce-design-consistency` | 设计一致性守护：扫描硬编码违规 + 自动修复 |

### Planning（规划）— 2 skills
| Skill | 说明 |
|-------|------|
| `/plan-website-structure` | 设计意图 → 站点地图 + 组件规划 + 技术方案 |
| `/generate-design-system` | 完整设计系统：色彩/字体/间距/圆角/阴影/动效 + CSS 变量 |

### Execution（生成）— 7 skills
| Skill | 说明 |
|-------|------|
| `/project-scaffold` | 创建可运行的空项目骨架（HTML / Tailwind / React）|
| `/generate-page` | design system + blueprint → 完整页面 |
| `/generate-component` | 通用可复用组件（card, form, timeline 等）|
| `/generate-navbar` | 导航栏 + 移动端汉堡菜单 + 暗色模式切换 |
| `/generate-hero` | 首屏区域（centered / split / fullscreen / minimal）|
| `/generate-footer` | 页脚 + 社交链接 + 版权 |
| `/apply-responsive-design` | mobile/tablet/desktop 三端响应式适配 |

### Refinement（迭代优化）⭐ — 3 skills
| Skill | 说明 |
|-------|------|
| `/refine-design-style` | **核心创新**: 自然语言 → CSS变量 diff → 全站增量更新 |
| `/patch-component` | 组件局部 diff 修改，不重生成 |
| `/refactor-layout` | 重新组织布局，保持内容和样式不变 |

### Content（内容）— 4 skills
| Skill | 说明 |
|-------|------|
| `/write-copy` | 网站文案（多版本供选择，风格匹配设计意图）|
| `/generate-bio` | 个人简介（多长度 + 多风格）|
| `/curate-portfolio` | 作品集策划（选择 + 排序 + 描述）|
| `/setup-blog` | 博客搭建（列表页 + 详情页 + Markdown 支持）|

### Quality & Deploy（质量 + 部署）— 5 skills
| Skill | 说明 |
|-------|------|
| `/accessibility-audit` | WCAG 2.1 AA 合规检查 + 自动修复 |
| `/performance-check` | 性能审计 + 图片/CSS/JS/字体优化 |
| `/seo-optimizer` | meta tags, Open Graph, JSON-LD, sitemap |
| `/deploy-setup` | Vercel / Netlify / GitHub Pages 部署引导 |
| `/pre-launch-checklist` | 上线前完整检查清单 |

## State Files（状态文件 — Skill间传递信息）

| 文件 | 生成者 | 说明 |
|------|--------|------|
| `DESIGN_INTENT.md` | capture-design-intent | 结构化设计意图（风格/色彩/布局/灵感）|
| `SITE_BLUEPRINT.md` | plan-website-structure | 站点地图 + 组件规划 |
| `DESIGN_SYSTEM.md` | generate-design-system | 字体/间距/颜色规则/CSS变量 |
| `BUILD_LOG.md` | 各生成skill | 构建进度 + 已完成组件清单 |
| `DESIGN_MEMORY.json` | 系统积累 | 用户风格偏好记忆（跨session继承）|

## HITL Checkpoints（人机协作节点）

```
🚦 HITL-1: Design Approval Gate   → 生成前确认方向（避免AI"自嗨"）
🎨 HITL-2: Style Editing Loop     → 自然语言 → CSS diff → 增量更新
🧪 HITL-3: Preview → Feedback → Patch → 预览后局部修改
```

## Core Design Principles

1. **不重生成，只做 diff** — 风格调整和组件修改永远是增量更新（CSS变量级联）
2. **结构化意图** — 用户的模糊表达（"像Apple但更活泼"）被转化为结构化 spec
3. **Design Memory** — 系统记住用户偏好，跨 session 继承（confirmed + rejected）
4. **主动建议 > 被动询问** — AI 像设计师一样提出方向 + 解释 trade-off
5. **每个组件可独立运行** — 组件解耦，可单独测试、替换、patch

## Shared References（设计知识库）

位于 `.designurpage/skills/shared-references/`：
- `design-principles.md` — 视觉设计原则（层次/留白/对比度/动效）
- `web-best-practices.md` — Web开发最佳实践（性能/语义HTML/可访问性/安全）
- `style-vocabulary.md` — 风格词汇 → CSS映射表（"温暖"→具体CSS变更）

## Documentation

- `docs/GETTING_STARTED.md` — 快速开始
- `docs/WORKFLOW_GUIDE.md` — 工作流详解
- `docs/SKILL_REFERENCE.md` — 技能参考
- `docs/DESIGN_MEMORY_SPEC.md` — Design Memory 技术规格
