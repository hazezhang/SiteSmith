# SiteSmith

**可控创意 + 可执行流水线：个人网站生成 Agent 系统**

[English](README.md) | 中文

> "不只是又一个建站工具 — SiteSmith 把设计师的思考过程结构化为 DSL、可复用技能和人机协作工作流。"

SiteSmith 是一个基于 Claude Code 的 Agent 系统，帮你**像和设计师合作一样**搭建个人网站：AI 提出设计方向、解释利弊权衡，你在每个关键节点做决策。所有设计决策都被捕获为 **10 维度 Design DSL**，确定性编译为 CSS — 风格微调是 DSL diff，不是重新生成。

> 💡 借鉴 [ARIS](https://github.com/wanshuiyin/Auto-claude-code-research-in-sleep) 的 skill 治理体系：纯 Markdown 文件、零依赖、零锁定。每个 skill 就是一个 `SKILL.md`，可被任何 LLM 读取 — 换成 Cursor、Trae、Codex CLI 或你自己的 Agent，工作流依然有效。

---

## 架构

```
用户（Human-in-the-Loop）
   ↓
设计对话层
   ↓
设计智能引擎
   ├── 风格顾问         — 主动风格推荐 + 利弊分析
   ├── 布局顾问         — 视觉层级、锚点、空间分析
   ├── 交互顾问         — 微交互、"阻尼感"调优
   ├── 设计批评者       — 7维度评审打分（像资深设计师一样）
   └── 一致性守护       — 设计系统合规扫描 + 自动修复
   ↓
Design DSL（7维度结构化表示）
   ├── style / layout / density / typography / color / interaction / motion
   ├── 8 种预设: minimal, modern, creative, editorial, product, cyberpunk, portfolio, warm
   ├── 5 种 GitHub Pages 原型: academic, developer, project, writing, hybrid
   └── DSL 编译器       → /translate-design-to-code
   ↓
技能路由器（/website-pipeline）
   ↓
执行层（组件 / 页面 / 样式生成）
```

## 核心创新

### 1. Design DSL — 设计决策的结构化语言

每个网站灵感都可以分解为 10 个维度：

| 维度 | 含义 | 示例 |
|------|------|------|
| `style` | 整体风格 | minimal / creative / editorial |
| `layout` | 页面结构 | grid / single-column / asymmetric |
| `density` | 信息密度 | low / medium / high |
| `typography` | 排版策略 | 字体配对、字号阶梯、字重 |
| `color` | 色彩策略 | monochrome / vibrant / soft / dark |
| `interaction` | 交互哲学 | hover/click/focus + 可发现性 + 认知负担 |
| `motion` | 动效+反馈 | none / subtle-fade / scroll-driven + 反馈强度 |
| `hierarchy` | 视觉层级 | flat / moderate / deep + 对比策略 |
| `spacing` | 间距与节奏 | 4px/8px 基础 + tight / balanced / airy |
| `information` | 信息架构 | linear / modular / hub + 可扫读性 + 导航模式 |

```json
{
  "style": "minimal",
  "layout": { "type": "single-column", "max_width": "720px" },
  "density": "low",
  "typography": { "font_pairing": ["Inter", "Inter"], "scale": "1.25" },
  "color": { "mode": "monochrome", "accent": "#007aff" },
  "interaction": { "level": "low", "hover": "opacity" },
  "motion": { "type": "subtle-fade", "duration": "200ms" },
  "personality": "clean, calm, premium"
}
```

当你说 *"太花哨了，简单一点"*，SiteSmith 计算一个 **DSL diff**：

```diff
- "color": { "mode": "vibrant" }
+ "color": { "mode": "monochrome" }
- "interaction": { "level": "high" }
+ "interaction": { "level": "low" }
```

然后把 diff 编译为 CSS 变量变更 — 整个网站自动更新。

### 2. Human-in-the-Loop 作为一等公民

流水线中织入三类门控：

| 门控 | 时机 | 目的 |
|------|------|------|
| **设计审批** | 代码生成前 | 确认 DSL 参数，避免 AI "自嗨设计" |
| **风格编辑循环** | 构建过程中随时 | 自然语言 → DSL diff → CSS diff → 增量更新 |
| **预览 → 反馈 → 修补** | 每个页面生成后 | 局部 diff 修复，绝不全量重生成 |

### 3. 设计智能引擎

五个顾问技能，模拟真实设计师的思考方式：
- **`/suggest-style`** — 推荐 DSL 预设 + 利弊对比表
- **`/analyze-layout`** — "你的首屏区域缺少视觉锚点"
- **`/suggest-interaction`** — 按钮 hover 缓动、滚动揭示时序、过渡"阻尼感"
- **`/critique-design`** — 7维度评审打分，像资深设计师一样
- **`/enforce-design-consistency`** — 扫描绕过设计 token 的硬编码值

### 4. GitHub Pages 一等支持

5 种内置**原型**，专为 `username.github.io` 设计：

| 原型 | 适合人群 | 风格 |
|------|---------|------|
| **学术主页** | 教授、博士生、研究员 | Minimal, 衬线, 无动效, 可信度优先 |
| **开发者作品集** | 软件/AI 工程师 | Modern, 网格, 暗色模式, shadow-lift |
| **项目展示** | 开源项目、比赛作品 | Product, 叙事型, 强 CTA |
| **写作站点** | 技术博客、研究笔记 | Editorial, 阅读栏, Jekyll 原生 |
| **混合品牌** | 求职者、多面手 | Modern, 模块化, 人 > 项目 |

```bash
/classify-github-pages-archetype    # AI 问你："你的网站是展示你自己，还是展示你做的东西？"
/recommend-pages-publishing-mode    # 分支发布 vs Actions vs Jekyll
/generate-pages-workflow            # Actions workflow + .nojekyll + CNAME
```

### 5. 设计记忆

系统跨会话积累你的风格偏好：
```json
{
  "confirmed_choices": ["琥珀色主色", "Playfair Display 标题"],
  "rejected_patterns": ["重渐变", "霓虹色", "视差滚动"],
  "style_refinements": [{"input": "更温暖", "result": "approved"}]
}
```

### 6. DSL Engine — 独立编译器（零依赖 npm 包）

`@sitesmith/dsl-engine` 是从项目中抽离的确定性编译器，**不依赖任何 LLM**：

```typescript
import { compile, getPreset, resolveWithPreset } from '@sitesmith/dsl-engine';

// 直接使用预设
const css = compile(getPreset('minimal'));

// 自定义覆盖
const dsl = resolveWithPreset({
  style: 'portfolio',
  color: { mode: 'vibrant', primary: '#3b82f6', accent: '#ec4899' },
});
const result = compile(dsl);
// result.variablesCss, result.baseCss, result.interactionsCss, result.interactionsJs
```

**核心特性**：零运行时依赖、确定性输出（同输入 = 同输出）、8 种预设、跨维度冲突校验、CJS + ESM 双格式。

任何平台（Claude Code / Cursor / Trae / Codex CLI / Antigravity）都能复用同一套编译逻辑。

---

## 33 个技能，9 大类别

| 类别 | 数量 | 技能 |
|------|------|------|
| **意图层** | 3 | `capture-design-intent`, `refine-design-intent`, `website-pipeline` |
| **设计智能** | 5 | `suggest-style`, `analyze-layout`, `suggest-interaction`, `critique-design`, `enforce-design-consistency` |
| **DSL 层** | 3 | `translate-design-to-code`, `refine-design-dsl`, `critique-design-dsl` |
| **规划** | 2 | `plan-website-structure`, `generate-design-system` |
| **生成** | 7 | `project-scaffold`, `generate-page`, `generate-component`, `generate-navbar`, `generate-hero`, `generate-footer`, `apply-responsive-design` |
| **迭代优化** | 3 | `refine-design-style`, `patch-component`, `refactor-layout` |
| **内容** | 4 | `write-copy`, `generate-bio`, `curate-portfolio`, `setup-blog` |
| **质量与部署** | 5 | `accessibility-audit`, `performance-check`, `seo-optimizer`, `deploy-setup`, `pre-launch-checklist` |
| **GitHub Pages** | 5 | `classify-github-pages-archetype`, `recommend-pages-publishing-mode`, `generate-pages-workflow`, `generate-404-page`, `generate-cname-config` |

每个技能遵循 [ARIS](https://github.com/wanshuiyin/Auto-claude-code-research-in-sleep) 的 skill 格式。

---

## 快速开始

```bash
# 完整引导式流水线
/website-pipeline

# GitHub Pages 模式
/classify-github-pages-archetype
/website-pipeline

# 逐步执行
/capture-design-intent "我想做一个极简风格的作品集网站"
/critique-design-dsl              # 编译前验证 DSL
/translate-design-to-code         # DSL → CSS 变量
/project-scaffold
/generate-page "index"

# 随时微调（DSL diff，不是重生成）
/refine-design-dsl "更温暖，更友好"
/patch-component "hero" "让 CTA 更突出"
/critique-design "all"
```

---

## 流水线全流程

```
/classify-github-pages-archetype（可选）
        │
/capture-design-intent → Design DSL JSON
        │
/critique-design-dsl → 验证
        │
   🚦 HITL-1: 设计审批门控（确认 DSL 参数）
        │
/translate-design-to-code → CSS 变量
        │
/plan-website-structure + /generate-design-system
        │
   🚦 HITL-2: 结构与风格确认
        │
/project-scaffold → /generate-navbar → /generate-footer
        │
   逐页生成:
   ├── /generate-page "page-name"
   ├── 预览截图（桌面 + 移动）
   └── 🚦 HITL-3: 页面审查
        │    ├── /refine-design-dsl "更温暖" → DSL diff → CSS diff
        │    ├── /patch-component → 局部修复
        │    └── /refactor-layout → 布局重构
        │
/write-copy + /generate-bio + /curate-portfolio
        │
   🚦 HITL-4: 内容审查
        │
质量检查: /accessibility-audit + /performance-check + /seo-optimizer
        │
   🚦 HITL-5: 质量审查
        │
/generate-pages-workflow → /deploy-setup
        │
   🎉 上线: username.github.io!
```

---

## 数据流

```
自然语言 → Design DSL JSON → CSS 变量 → HTML/组件
     ↑              ↑              ↑
  "更温暖"    /refine-design-dsl  /translate-design-to-code
              (DSL 参数 diff)      (确定性编译)
```

---

## 项目结构

```
SiteSmith/
├── CLAUDE.md                              # 项目入口 + 技能索引
├── .claude/
│   ├── settings.local.json                # 工具权限
│   └── commands/                          # 37 个 slash 命令
│
├── .designurpage/
│   ├── dsl/                               # Design DSL 规范
│   │   ├── schema.md                      # 完整 schema + 验证规则
│   │   ├── presets.md                     # 8 种风格预设 + 完整 DSL
│   │   ├── archetypes.md                  # 5 种 GitHub Pages 原型
│   │   └── code-mapping.md               # DSL → CSS/HTML/JS 映射规则
│   │
│   └── skills/                            # 33 个技能 (ARIS 格式)
│       ├── shared-references/             # 设计知识库
│       ├── capture-design-intent/         # 意图层
│       ├── suggest-style/                 # 设计智能
│       ├── translate-design-to-code/      # DSL 编译器
│       ├── classify-github-pages-archetype/ # GitHub Pages
│       └── ...
│
├── packages/
│   └── dsl-engine/                        # 独立 DSL 编译器 (npm 包)
│       ├── src/                           # TypeScript 源码
│       ├── tests/                         # 16 个测试
│       └── dist/                          # CJS + ESM 构建产物
│
├── src/                                   # 生成的网站代码
│   ├── index.html
│   ├── styles/                            # DSL 编译输出的 CSS
│   └── scripts/                           # 交互脚本
│
├── templates/                             # 页面和组件模板
├── deploy/                                # 部署模板
├── docs/                                  # 文档
└── eval/                                  # 评估框架
```

---

## 设计原则

1. **DSL 驱动** — 所有设计决策都是 10 维度 DSL 参数，确定性编译为代码
2. **Diff 而非重生成** — 风格变更 = DSL diff → CSS 变量 diff → 全站自动生效
3. **结构化意图** — "像 Apple 但更活泼" → 具体 DSL 参数变更，不是模糊 prompt
4. **主动建议** — AI 像设计师一样提出方向 + 解释利弊，用户做决策
5. **设计记忆** — 系统记住偏好（已确认 + 已拒绝），跨会话继承
6. **GitHub Pages 原生** — 5 种原型 + 部署感知的设计决策
7. **零锁定** — DSL Engine 独立于任何 LLM，技能文件可跨平台复用

---

## 跨平台适配

借鉴 ARIS 的跨平台理念，SiteSmith 的核心资产可在不同环境中使用：

| 层 | 资产 | 可移植性 |
|----|------|---------|
| **DSL Engine** | `@sitesmith/dsl-engine` npm 包 | 任何 JS/TS 环境 |
| **DSL 规范** | `.designurpage/dsl/*.md` | 任何 LLM 可读 |
| **技能文件** | `.designurpage/skills/*/SKILL.md` | Claude Code / Cursor / Trae / Codex CLI |
| **预设库** | 8 种风格 JSON | 机器和人都可读 |

---

## 致谢

- 技能架构受 [ARIS (Auto-claude-code-research-in-sleep)](https://github.com/wanshuiyin/Auto-claude-code-research-in-sleep) 启发
- 基于 [Claude Code](https://docs.anthropic.com/en/docs/claude-code) by Anthropic 构建

---

## License

MIT
