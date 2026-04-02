---
name: generate-page
description: "生成完整页面。根据设计系统和蓝图组装页面内容和组件。Generate a complete page from design system and blueprint."
argument-hint: [page-name: index | about | projects | blog | contact]
allowed-tools: Read, Write, Edit, Grep, Glob, Agent, mcp__Claude_Preview__preview_start, mcp__Claude_Preview__preview_screenshot, mcp__Claude_Preview__preview_resize
---

# Generate Page — 页面生成

> 设计系统 + 蓝图 + 模板 → 完整可用的页面

## Input

`$ARGUMENTS` — 要生成的页面名称（必填）
- `index` / `home` — 首页
- `about` — 关于页
- `projects` / `portfolio` — 作品集
- `blog` — 博客
- `contact` — 联系页
- 或任何 `SITE_BLUEPRINT.md` 中定义的页面名

## Prerequisites

- `SITE_BLUEPRINT.md` — 该页面的组件清单
- `DESIGN_SYSTEM.md` — CSS 变量和组件样式
- `src/styles/variables.css` — 已存在（由 `/project-scaffold` 创建）

## Workflow

### Phase A: 读取页面规格

1. 从 `SITE_BLUEPRINT.md` 提取目标页面的：
   - 包含哪些 section/组件
   - 布局方式
   - 优先级和复杂度
2. 读取 `DESIGN_SYSTEM.md` — 组件样式指南
3. 读取 `DESIGN_INTENT.md` — 确认风格和内容方向
4. 检查 `templates/pages/` 是否有对应模板可参考

### Phase B: 逐 Section 生成

按照蓝图中的 section 顺序：

1. 对每个 section：
   - 检查是否已有对应组件（`/generate-navbar` 等已生成的）
   - 如果有 → 引用现有组件
   - 如果没有 → 就地生成
2. 确保所有样式使用 CSS 变量（`var(--*)`），不硬编码
3. 确保语义化 HTML 结构
4. 添加响应式基础（mobile-first）

### Phase C: 填充占位内容

- 使用合理的占位文案（不是 Lorem ipsum，而是与上下文相关的示例文字）
- 图片使用占位符（如 `placeholder.svg` 或 CSS gradient）
- 标注哪些内容需要用户替换

### Phase D: 预览验证

1. 使用 Preview 工具启动预览
2. 截图 desktop 视图
3. 调整视口截图 mobile 视图
4. 检查：
   - 布局是否正确？
   - 设计系统是否一致？
   - 响应式是否正常？

### 🚦 Checkpoint: Page Preview & Feedback（HITL-3）

- **展示**: 页面截图（desktop + mobile）
- **询问**: "这个页面的设计和布局如何？你可以提出任何修改意见"
- **满意 →** 更新 `BUILD_LOG.md`，继续下一个页面
- **局部修改 →** 调用 `/patch-component` 修改具体组件
- **风格不对 →** 调用 `/refine-design-style` 调整设计系统
- **布局不对 →** 调用 `/refactor-layout` 重新组织
- **内容修改 →** 直接 Edit 文字内容

## Output

- 完整的页面 HTML/CSS（或 JSX）
- 更新 `BUILD_LOG.md`
- 更新 `src/styles/components.css`（如有新组件样式）

## Key Rules

1. **所有样式用 CSS 变量** — 不硬编码任何颜色/字体/间距
2. **语义化 HTML** — 正确使用 header/main/section/article/footer
3. **响应式** — mobile-first，至少支持 mobile + desktop
4. **可访问性** — alt 属性、aria 标签、足够的对比度
5. **不重复代码** — 如果组件已存在，引用而不是复制

## Composing with Other Skills

- 生成前如果缺少组件 → `/generate-component`, `/generate-navbar` 等
- 内容填充 → `/write-copy`, `/generate-bio`, `/curate-portfolio`
- 生成后审视 → `/critique-design` 评分
- 响应式完善 → `/apply-responsive-design`
