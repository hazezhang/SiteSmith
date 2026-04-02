# Workflow Guide — 工作流详解

## 系统架构

```
User (Human-in-the-loop)
   ↓
Intent Layer（设计意图捕获 + 结构化表达）
   ↓
Design Intelligence Engine（设计智能引擎）
   ├── Style Advisor (/suggest-style)
   ├── Layout Advisor (/analyze-layout)
   ├── Interaction Advisor (/suggest-interaction)
   ├── Design Critic (/critique-design)
   └── Consistency Guard (/enforce-design-consistency)
   ↓
Skill Router（能力调度 — /website-pipeline）
   ↓
Execution Layer（代码/组件生成）
```

## 完整工作流

### Phase 1: 设计对话

```
你: "我想做一个个人网站"

AI: 我理解你想做一个个人网站。在开始之前，想了解几点：
    - 这个网站主要给谁看？
    - 你希望传达什么感觉？
    - 有喜欢的网站可以参考吗？

你: "给招聘者看的，偏简洁专业，喜欢 Notion 的感觉"

AI: 根据你的描述，我有两个方向建议：

    方向A: Minimal Professional
    ✅ 干净、专业、信息获取效率高
    ⚠️ 可能个性不够突出

    方向B: Modern Editorial
    ✅ 有设计感、适度个性
    ⚠️ 开发稍复杂

    你更偏向哪个？

    ┌─────────────────────────────┐
    │ 🚦 HITL-1: 确认设计方向      │
    └─────────────────────────────┘
```

### Phase 2: 设计系统

AI 根据确认的方向生成：
- 色板（primary / neutral / accent）
- 字体组合（heading + body）
- 间距系统
- 组件基础样式

```
AI: 这是为你生成的设计系统：
    色彩: 深蓝主色 + 暖灰背景
    字体: Inter (正文) + Playfair Display (标题)
    ...

    ┌─────────────────────────────┐
    │ 🚦 HITL-2: 确认设计系统      │
    └─────────────────────────────┘

你: "色彩可以更暖一点"

AI: → 调用 /refine-design-style "更暖一点"
    → CSS变量 diff: primary #1e40af → #b45309
    → 全站自动生效
```

### Phase 3: 逐页构建

```
AI: 首页已生成，这是预览截图 [desktop + mobile]

    ┌─────────────────────────────┐
    │ 🚦 HITL-3: 页面确认          │
    └─────────────────────────────┘

你: "Hero 的 CTA 按钮不够突出"

AI: → 调用 /patch-component
    → 增大按钮 + 加深阴影
    → 只改了 3 行 CSS，其他不动
```

### Phase 4~6: 内容 → 质量 → 部署

（略，见 /website-pipeline skill 详解）

## 关键 Skill 使用场景

### 当你想调整风格时
```
/refine-design-style "更温暖一点"
/refine-design-style "像Apple但更活泼"
/refine-design-style "字体太正式了"
```

### 当你想修改某个组件时
```
/patch-component "hero" "CTA 按钮不够突出"
/patch-component "navbar" "添加暗色模式切换"
```

### 当你想获得设计建议时
```
/suggest-style "portfolio"
/analyze-layout "src/index.html"
/suggest-interaction "button"
/critique-design "all"
```

### 当你想检查质量时
```
/accessibility-audit "all"
/performance-check "all"
/enforce-design-consistency
```

## 随时可以做的事

- 说"更XXX一点" → 系统自动调用 `/refine-design-style`
- 说"这个组件改一下" → 系统自动调用 `/patch-component`
- 说"评价一下这个设计" → 系统自动调用 `/critique-design`
- 说"准备上线" → 系统自动调用 `/pre-launch-checklist`
