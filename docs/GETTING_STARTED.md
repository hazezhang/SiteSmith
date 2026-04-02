# Getting Started — 快速开始

## 什么是 DesignUrPage？

DesignUrPage 是一个基于 Claude Code 的个人网站构建系统。它不是模板工具，而是一个**设计师式的协作流程**：

- AI 像设计师一样理解你的需求、主动建议、解释 trade-off
- 你在每个关键节点做决策，AI 负责执行
- 风格调整是增量 diff，不需要重新生成
- 系统记住你的偏好，越用越懂你

## 两种使用方式

### 方式 1: 完整流水线（推荐新手）

```
/website-pipeline
```

一个命令启动全流程，系统会引导你完成：
1. 设计意图对话
2. 站点结构规划
3. 设计系统生成
4. 逐页构建（每页可预览和修改）
5. 内容填充
6. 质量检查
7. 部署

在每个关键节点，系统会暂停等待你确认。

### 方式 2: 单独使用 Skill（推荐有经验的用户）

直接调用任何 skill：

```
/capture-design-intent "我想做一个简洁的作品集网站"
/suggest-style "portfolio"
/generate-design-system
/generate-page "index"
/refine-design-style "更温暖一点"
/critique-design
```

## 核心概念

### 状态文件

Skills 通过 markdown 文件传递信息：

| 文件 | 谁创建 | 作用 |
|------|--------|------|
| `DESIGN_INTENT.md` | capture-design-intent | 你想要什么样的网站 |
| `SITE_BLUEPRINT.md` | plan-website-structure | 网站的结构规划 |
| `DESIGN_SYSTEM.md` | generate-design-system | 统一的视觉规则 |
| `BUILD_LOG.md` | 各 skill | 构建进度记录 |
| `DESIGN_MEMORY.json` | 系统 | 你的设计偏好记忆 |

### HITL 节点

系统在三类节点暂停等待你：

1. **Design Approval** — 确认设计方向（避免 AI "自嗨"）
2. **Style Editing** — 自然语言调整风格（"更温暖""更简洁"）
3. **Preview & Patch** — 预览后提修改意见（局部修改，不重生成）

### CSS 变量魔法

所有视觉样式通过 CSS Custom Properties 管理。当你说"更温暖一点"：
- AI 只修改 `variables.css` 中的几个变量
- 全站所有组件自动更新
- 不需要重新生成任何页面

## 技术要求

- Claude Code（CLI 或 IDE 插件）
- Node.js（如果选择 Tailwind/React 方案）
- 浏览器（预览用）

## 下一步

打开 Claude Code，输入：

```
/website-pipeline
```

让我们开始吧。
