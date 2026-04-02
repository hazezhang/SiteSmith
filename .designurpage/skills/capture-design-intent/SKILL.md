---
name: capture-design-intent
description: "捕获用户的网站设计意图。通过设计师式对话将模糊需求转化为结构化 spec。Capture website design intent through designer-like conversation."
argument-hint: [description-of-your-website]
allowed-tools: Read, Write, Edit, Grep, Glob, Agent, WebSearch, WebFetch, mcp__Claude_Preview__preview_screenshot
---

# Design Intent Capture — 设计意图捕获

> 像设计师 kickoff meeting 一样，通过自然对话理解用户想要什么

## Input

`$ARGUMENTS` — 用户对网站的初始描述（可以很模糊，如"我想做一个个人网站"）

如果没有提供参数，直接进入对话模式。

## Constants

- **INTENT_FILE = `DESIGN_INTENT.md`** — 输出文件
- **MAX_ROUNDS = 5** — 最大对话轮数（防止无限循环）
- **AUTO_SUGGEST = `true`** — 是否主动建议风格方向
> 💡 Override: `/capture-design-intent "我的需求" — auto_suggest: false`

## Workflow

### Phase A: 初始理解

1. 读取 `$ARGUMENTS`，提取关键信息
2. 如果存在 `DESIGN_MEMORY.json`，读取用户历史偏好作为上下文
3. 对用户描述做初步分析：
   - 这是什么类型的网站？（portfolio / blog / product / academic / creative）
   - 能推断出什么风格倾向？
   - 用户是否提到了参考网站？

### Phase B: 设计师式对话（核心 — Human-in-the-Loop）

以设计师的方式与用户沟通。**不要让用户填表**，而是自然对话。

**对话策略**：

1. **开放式提问**（第1轮）：
   ```
   我理解你想做一个[类型]网站。在我开始设计之前，想了解几点：
   - 这个网站主要给谁看？（目标受众）
   - 你希望传达什么感觉？（如：专业、温暖、有创意...）
   - 有没有你喜欢的网站可以参考？
   ```

2. **主动建议**（第2轮，如果 AUTO_SUGGEST=true）：
   读取 `.designurpage/skills/shared-references/style-vocabulary.md`
   ```
   根据你的描述，我有两个方向建议：

   方向A: [风格名] — [原因]
   ✅ 优点: ...
   ⚠️ 注意: ...

   方向B: [风格名] — [原因]
   ✅ 优点: ...
   ⚠️ 注意: ...

   你更偏向哪个？或者你有自己的想法？
   ```

3. **细节确认**（第3~4轮）：
   - 内容板块：你需要哪些页面/区域？（about, projects, blog, contact...）
   - 色彩倾向：偏暖还是偏冷？有没有喜欢的颜色？
   - 交互感受：喜欢动效多一些还是简洁一些？
   - 特殊需求：暗色模式？多语言？

4. **确认总结**（最后一轮）：
   将所有信息结构化，展示给用户确认

### Phase C: 结构化输出

将对话结果转化为结构化 `DESIGN_INTENT.md`：

```markdown
# Design Intent — 设计意图

## 基本信息
- **网站类型**: [portfolio / blog / product / academic / creative]
- **目标受众**: [描述]
- **核心目的**: [一句话]

## 风格定义
- **整体风格**: [minimal / modern / warm / elegant / bold / cyberpunk / ...]
- **设计人格**: [Apple-like / Notion-like / Awwwards-like / 自定义描述]
- **氛围关键词**: [3~5个词]

## 色彩
- **色温倾向**: [warm / cool / neutral]
- **主色调建议**: [hex codes 或描述]
- **是否需要暗色模式**: [yes / no]

## 布局
- **布局偏好**: [storytelling / grid / magazine / one-page / multi-page]
- **信息密度**: [sparse / balanced / dense]

## 页面/板块
- **需要的板块**: [列表]
- **首屏重点**: [描述]

## 交互
- **动效偏好**: [minimal / moderate / rich]
- **滚动体验**: [standard / smooth / parallax]

## 参考
- **灵感网站**: [URLs]
- **喜欢的元素**: [描述]
- **不喜欢的元素**: [描述]

## 结构化 Spec（供下游 skill 读取）
\```json
{
  "type": "...",
  "style": "...",
  "color_palette": [...],
  "layout_preference": "...",
  "sections": [...],
  "inspiration_refs": [...],
  "tone": "...",
  "typography_preference": "...",
  "animation_level": "...",
  "dark_mode": false
}
\```
```

### 🚦 Checkpoint: Design Intent Confirmation

- **展示**: 完整的 DESIGN_INTENT.md 摘要
- **询问**: "这个设计方向是否准确？有什么需要调整的吗？"
- **确认 →** 写入 `DESIGN_INTENT.md`，建议下一步：`/plan-website-structure` 或 `/suggest-style`
- **修改 →** 回到 Phase B 对应环节
- **否决 →** 重新开始 Phase B

## Key Rules

1. **永远不要让用户填表** — 用自然对话提取信息
2. **主动建议优于被动询问** — 给出方向 + trade-off，让用户选择
3. **接受模糊表达** — "像Apple但更活泼" 是有效输入，参考 `style-vocabulary.md` 翻译
4. **记录否定偏好** — "不要太花哨"和"要简洁"一样重要
5. **Design Memory 更新** — 如果存在 `DESIGN_MEMORY.json`，将新偏好追加进去

## Composing with Other Skills

- 完成后建议 → `/suggest-style` 获取 AI 风格建议
- 完成后建议 → `/plan-website-structure` 开始结构规划
- 如果用户中途想修改 → `/refine-design-intent`
