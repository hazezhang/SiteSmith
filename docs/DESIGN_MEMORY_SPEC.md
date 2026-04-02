# Design Memory Specification

> 系统记住用户的设计偏好，跨 session 继承

## 概念

Design Memory 是一个 JSON 文件（`DESIGN_MEMORY.json`），存储在项目根目录，记录用户在设计过程中表达的偏好。每次 HITL 交互后自动更新。

## 数据结构

```json
{
  "version": "1.0",
  "created_at": "2026-04-02T10:00:00Z",
  "updated_at": "2026-04-02T15:30:00Z",
  "sessions": 3,

  "style_profile": {
    "preferred_aesthetic": "minimal + warm",
    "design_personality": "Notion-like",
    "keywords": ["clean", "warm", "readable"],
    "color_tendency": "warm neutrals",
    "typography_preference": "serif headings, sans body",
    "layout_preference": "generous whitespace, single column",
    "animation_preference": "minimal, subtle transitions only",
    "information_density": "sparse"
  },

  "confirmed_choices": [
    {
      "date": "2026-04-02",
      "type": "color",
      "choice": "amber primary (#f59e0b)",
      "context": "chosen over blue after 'warmer' feedback"
    },
    {
      "date": "2026-04-02",
      "type": "font",
      "choice": "Playfair Display for headings",
      "context": "user wanted 'elegant but readable'"
    }
  ],

  "rejected_patterns": [
    {
      "date": "2026-04-02",
      "pattern": "heavy gradients",
      "reason": "user said 'too flashy'"
    },
    {
      "date": "2026-04-02",
      "pattern": "neon colors",
      "reason": "user preferred muted tones"
    },
    {
      "date": "2026-04-02",
      "pattern": "parallax scrolling",
      "reason": "user said 'distracting'"
    }
  ],

  "style_refinements": [
    {
      "date": "2026-04-02",
      "input": "更温暖一点",
      "changes": ["color temp +warm", "border-radius +4px", "font → Nunito"],
      "result": "approved"
    }
  ],

  "interaction_preferences": {
    "hover_feedback": "subtle scale + shadow",
    "transition_speed": "fast (150-200ms)",
    "easing": "ease-out",
    "scroll_behavior": "smooth"
  }
}
```

## 更新时机

| 事件 | 更新内容 |
|------|---------|
| 用户确认设计方向 | `style_profile` + `confirmed_choices` |
| 用户否决选项 | `rejected_patterns` |
| `/refine-design-style` 完成 | `style_refinements` |
| `/suggest-interaction` 确认 | `interaction_preferences` |
| 每个 HITL checkpoint | 增量更新相关字段 |

## 读取时机

| 场景 | 如何使用 |
|------|---------|
| `/capture-design-intent` 开始时 | 告知用户"上次你偏好..."，作为默认建议 |
| `/suggest-style` 推荐时 | 过滤掉 rejected_patterns，优先 confirmed_choices 相近的风格 |
| `/generate-design-system` 时 | 预填入历史偏好的 tokens |
| `/refine-design-style` 时 | 避免建议用户之前否决过的方向 |

## 跨项目复用（未来扩展）

Design Memory 可以从一个项目复制到另一个项目：
```bash
cp project-a/DESIGN_MEMORY.json project-b/DESIGN_MEMORY.json
```

新项目的 `/capture-design-intent` 会读取并询问：
"我发现你之前的偏好是 [摘要]，这次要延续还是尝试新方向？"

## 隐私考虑

- Design Memory 只存储设计偏好，不存储个人信息
- 存储在项目本地，不上传到任何服务
- 用户可以随时删除 `DESIGN_MEMORY.json`
