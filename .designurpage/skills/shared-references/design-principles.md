# Design Principles — 视觉设计原则

> 所有生成skill在构建页面/组件时应遵循这些原则

## 1. Visual Hierarchy（视觉层次）
- 通过大小、颜色、间距建立信息层次
- 标题 > 副标题 > 正文 > 辅助文字，每级至少 1.25x 大小差异
- 重要元素使用高对比色，次要元素降低饱和度/透明度
- 每个页面有且仅有一个视觉焦点（CTA 或核心信息）

## 2. Whitespace（留白）
- 留白不是浪费空间，是设计的一部分
- 组件间距 ≥ 组件内间距（外松内紧）
- section 之间使用 `4rem ~ 8rem` 间距
- 文字行高 1.5~1.75（正文），1.2~1.3（标题）
- 段落最大宽度 `65ch`，避免阅读疲劳

## 3. Consistency（一致性）
- 全站使用统一的设计系统（`DESIGN_SYSTEM.md` 定义的 tokens）
- 同类元素使用相同样式（所有卡片、所有按钮、所有链接）
- 间距使用 4px/8px 基准的倍数系统（4, 8, 12, 16, 24, 32, 48, 64, 96）
- 颜色使用设计系统定义的变量，不硬编码

## 4. Contrast & Accessibility（对比度与可访问性）
- 正文文字与背景对比度 ≥ 4.5:1（WCAG AA）
- 大文字（≥18px bold 或 ≥24px）对比度 ≥ 3:1
- 不仅靠颜色传递信息（考虑色盲用户）
- 交互元素有明确的 hover/focus/active 状态
- 可点击区域最小 44x44px

## 5. Typography（字体排版）
- 最多使用 2 种字体（标题 + 正文）
- 字体大小使用 modular scale（如 1.25 ratio）
- 中文字体优先级：系统字体 > 思源黑体 > 微软雅黑
- 英文衬线推荐：Playfair Display, Merriweather, Lora
- 英文无衬线推荐：Inter, Plus Jakarta Sans, DM Sans

## 6. Color Usage（颜色使用）
- 60-30-10 规则：60% 主色（背景），30% 辅色（容器/区块），10% 强调色（CTA/链接）
- 每个色板包含：primary, secondary, accent, background, surface, text, muted
- 深色/浅色模式各需一套完整色板
- 渐变使用同色相的不同明度，避免跨色相渐变（除非设计意图明确）

## 7. Responsive Design（响应式设计）
- Mobile First：从最小屏幕开始设计
- 断点：`sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`
- 图片使用 `srcset` 或 CSS `object-fit`
- 导航在移动端折叠为汉堡菜单
- 触摸设备上增大点击区域和间距

## 8. Animation & Motion（动效）
- 动效服务于用户体验，不是装饰
- 过渡时间 150ms~300ms（交互反馈），300ms~500ms（页面转场）
- 使用 `ease-out` 进入，`ease-in` 退出
- 尊重 `prefers-reduced-motion` 媒体查询
- 首屏加载动画不超过 1 个
