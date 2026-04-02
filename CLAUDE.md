# SiteSmith — Website Generation Agent System

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
Design DSL（设计领域特定语言 — 10维度结构化表示）
   ├── style / layout / density / typography / color / interaction / motion
   ├── hierarchy / spacing / information  ← NEW v0.2
   ├── Presets: minimal, modern, creative, editorial, product, cyberpunk, portfolio, warm
   └── DSL Compiler         → /translate-design-to-code
   ↓
Skill Router（能力调度 — /website-pipeline）
   ↓
Execution Layer（组件/页面/样式生成）
```

## Quick Start

```
/capture-design-intent     ← 开始设计对话，输出 Design DSL
/website-pipeline          ← 一键启动完整流水线（含所有HITL节点）
```

## Design DSL（核心中间表示）

所有设计意图最终编译为 10 维度 DSL，所有代码生成从 DSL 出发：

| 维度 | 含义 | 例子 |
|------|------|------|
| `style` | 风格 | minimal / creative / editorial |
| `layout` | 布局结构 | grid / single-column / asymmetric |
| `density` | 信息密度 | low / medium / high |
| `typography` | 排版 | font pairing, scale, weight strategy |
| `color` | 色彩策略 | monochrome / vibrant / soft / dark |
| `interaction` | 交互强度+哲学 | hover/click/focus + discoverability + cognitive_load |
| `motion` | 动效+反馈 | none / subtle-fade / scroll-driven + feedback_strength |
| `hierarchy` | 视觉层级 | flat / moderate / deep + contrast strategy |
| `spacing` | 间距与节奏 | 4px/8px base + tight / balanced / airy rhythm |
| `information` | 信息架构 | linear / modular / hub + scannability + navigation |

DSL 规范位于 `.designurpage/dsl/`：
- `schema.md` — 完整 schema 定义 + 字段详解 + 验证规则
- `presets.md` — 8 种预设风格 DSL + 自然语言→DSL映射表
- `code-mapping.md` — DSL→CSS/HTML/JS 确定性翻译规则

## Skills Index (36 Skills)

### Intent Layer（意图层）— 3 skills
| Skill | 说明 |
|-------|------|
| `/capture-design-intent` | 设计师式对话 → Design DSL JSON |
| `/refine-design-intent` | 自然语言 → design intent diff |
| `/website-pipeline` | 总调度器，串联全流程 + HITL gates |

### Design Intelligence Engine（设计智能引擎）— 6 skills
| Skill | 说明 |
|-------|------|
| `/suggest-style` | AI 风格顾问：推荐 DSL presets + trade-off 分析 |
| `/analyze-layout` | 布局智能分析：视觉锚点/信息层级/空间利用 |
| `/suggest-interaction` | 微交互顾问：hover/scroll/transition 阻尼感调优 |
| `/critique-design` | AI 设计批评者：10维度评审 + DSL diff 修复提案（Layer 1）|
| `/enforce-design-consistency` | 设计一致性守护：扫描硬编码违规 + 自动修复（Layer 2）|
| `/senior-designer-review` | 资深设计师终审：5秒测试 + 用户旅程 + rebuttal 辩论（Layer 3）⭐ NEW |

### DSL Layer（DSL 编译层）— 3 skills ⭐ NEW
| Skill | 说明 |
|-------|------|
| `/translate-design-to-code` | **DSL 编译器**: Design DSL → CSS变量 / Tailwind配置 / 组件代码 |
| `/refine-design-dsl` | **DSL 精炼**: 自然语言 → DSL 参数 diff（用户改参数不改prompt）|
| `/critique-design-dsl` | **DSL 审查**: 编译前检查维度冲突/可访问性/一致性 |

### Planning（规划）— 2 skills
| Skill | 说明 |
|-------|------|
| `/plan-website-structure` | 设计意图 → 站点地图 + 组件规划 + 技术方案 |
| `/generate-design-system` | 完整设计系统文档（基于 DSL 编译输出）|

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
| `/refine-design-style` | 自然语言 → DSL diff → CSS变量 diff → 全站增量更新 |
| `/patch-component` | 组件局部 diff 修改，不重生成 |
| `/refactor-layout` | 重新组织布局，保持内容和样式不变 |

### Content（内容）— 4 skills
| Skill | 说明 |
|-------|------|
| `/write-copy` | 网站文案（多版本供选择，风格匹配设计意图）|
| `/generate-bio` | 个人简介（多长度 + 多风格）|
| `/curate-portfolio` | 作品集策划（选择 + 排序 + 描述）|
| `/setup-blog` | 博客搭建（列表页 + 详情页 + Markdown 支持）|

### Assets（素材管理）— 2 skills
| Skill | 说明 |
|-------|------|
| `/manage-assets` | 素材盘点/绑定/占位图 — 用户提供图片后自动放置并绑定到组件 |
| `/optimize-images` | 图片压缩 + WebP 转换 + 响应式 srcset + 性能审计 |

### Quality & Deploy（质量 + 部署）— 5 skills
| Skill | 说明 |
|-------|------|
| `/accessibility-audit` | WCAG 2.1 AA 合规检查 + 自动修复 |
| `/performance-check` | 性能审计 + 图片/CSS/JS/字体优化 |
| `/seo-optimizer` | meta tags, Open Graph, JSON-LD, sitemap |
| `/deploy-setup` | Vercel / Netlify / GitHub Pages 部署引导 |
| `/pre-launch-checklist` | 上线前完整检查清单 |

### GitHub Pages（GitHub Pages 专用）— 5 skills
| Skill | 说明 |
|-------|------|
| `/classify-github-pages-archetype` | 站点原型顾问：学术/开发者/项目/写作/品牌 |
| `/recommend-pages-publishing-mode` | 部署模式推荐：branch / Actions / Jekyll |
| `/generate-pages-workflow` | 生成 Actions workflow + .nojekyll + 部署文件 |
| `/generate-404-page` | 自定义 404 页面（匹配设计风格）|
| `/generate-cname-config` | 自定义域名配置 + DNS 指引 |

**5 Archetypes（站点原型 — 扩展 Design DSL）**:
| 原型 | 适合 | 默认风格 |
|------|------|---------|
| `academic-profile` | 教授/研究员/博士生 | minimal, serif, no motion |
| `developer-portfolio` | 软件工程师/AI工程师 | modern, grid, dark mode |
| `project-showcase` | 开源项目/比赛作品 | product, storytelling, CTA |
| `writing-site` | 技术博客/研究笔记 | editorial, reading-column, Jekyll |
| `hybrid-brand` | 求职/多面手/个人品牌 | modern, modular, balanced |

## Data Flow（数据流）

```
自然语言 → Design DSL JSON → CSS Variables → HTML/Components
           ↑                    ↑
  /capture-design-intent   /translate-design-to-code
  /refine-design-dsl
```

## State Files（状态文件）

| 文件 | 生成者 | 说明 |
|------|--------|------|
| `DESIGN_INTENT.md` | capture-design-intent | 设计意图 + **内嵌 Design DSL JSON** |
| `SITE_BLUEPRINT.md` | plan-website-structure | 站点地图 + 组件规划 |
| `DESIGN_SYSTEM.md` | generate-design-system | 人可读的设计系统文档 |
| `BUILD_LOG.md` | 各生成skill | 构建进度 + 已完成组件清单 |
| `DESIGN_MEMORY.json` | 系统积累 | 用户风格偏好记忆（跨session继承）|

## HITL Checkpoints（人机协作节点）

```
🚦 HITL-1: Design Approval Gate   → 确认 DSL 参数（避免AI"自嗨"）
🎨 HITL-2: Style Editing Loop     → 自然语言 → DSL diff → CSS diff → 增量更新
🧪 HITL-3: Preview → Feedback → Patch → 预览后局部修改
```

## Three-Layer Design Review（三层设计审查）

```
Layer 1: /critique-design           → 10维度评分 + DSL diff 修复提案
Layer 2: /enforce-design-consistency → 跨页面 token 合规扫描
Layer 3: /senior-designer-review    → 用户视角终审 + rebuttal 辩论
```

## Skill Contracts（技能合约）

每个 skill 有形式化合约（`.designurpage/skills/contracts/*.contract.json`），定义：
- `input_schema` — 必需/可选文件 + 参数类型
- `output_schema` — 输出文件 + 必含内容 + 禁止内容
- `preconditions` / `postconditions` — 可验证的前后置条件
- `routing` — 触发词 + 前后 skill 链 + 冲突检测

合约规范: `.designurpage/skills/SKILL_SCHEMA.md`

## Evaluation Framework（评估框架）

`eval/` 目录包含研究级评估系统：

| 指标 | 维度 | 说明 |
|------|------|------|
| **DQS** (Design Quality Score) | 7 子维度 | 自动化设计质量评分（0-100）|
| **IFS** (Intent Fidelity Score) | 5 检查项 | DSL→输出忠实度（0-100）|
| **DS** (Diversity Score) | 跨预设 | 8 预设间视觉差异性（0-1）|
| **USP** (User Satisfaction Proxy) | HITL 行为 | 用户满意度代理指标 |

自动化评分: `eval/metrics.ts` (36 tests passing)
人工评审: `eval/rubric.md` (5-point scale per dimension)

## Core Design Principles

1. **DSL 驱动** — 所有设计决策都表示为 10 维度 DSL，确定性编译为代码
2. **不重生成，只做 diff** — 风格调整 = DSL diff → CSS 变量 diff → 全站自动生效
3. **结构化意图** — "像Apple但更活泼" → DSL 参数变更，不是模糊 prompt
4. **Design Memory** — 系统记住用户偏好，跨 session 继承
5. **主动建议 > 被动询问** — AI 像设计师一样提出方向 + 解释 trade-off
6. **合约驱动** — 每个 skill 有形式化 input/output schema，可路由、可验证、可评估

## Shared References

- `.designurpage/dsl/` — Design DSL 规范（schema + presets + code-mapping）
- `.designurpage/skills/shared-references/` — 设计知识库（设计原则 + Web最佳实践 + 风格词汇表）
- `.designurpage/skills/contracts/` — Skill 形式化合约（JSON schema）
- `eval/` — 评估框架（metrics + rubric + tests）

## Documentation

- `docs/GETTING_STARTED.md` — 快速开始
- `docs/WORKFLOW_GUIDE.md` — 工作流详解
- `docs/SKILL_REFERENCE.md` — 技能参考
- `docs/DESIGN_MEMORY_SPEC.md` — Design Memory 技术规格
