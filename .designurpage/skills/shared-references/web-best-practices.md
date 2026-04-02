# Web Best Practices — Web开发最佳实践

> 所有生成skill在输出代码时应遵循这些标准

## 1. Performance（性能）
- 首屏加载 < 3s（LCP < 2.5s）
- 图片使用 WebP/AVIF 格式，配合 `loading="lazy"`
- CSS 内联关键路径样式，非关键样式异步加载
- JavaScript 使用 `defer` 或 `async`
- 字体使用 `font-display: swap`，预加载关键字体
- 避免布局偏移（CLS < 0.1）：图片/视频设置明确的宽高

## 2. Semantic HTML（语义化HTML）
- 使用 `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`
- 标题层级正确：每页一个 `<h1>`，层级不跳跃
- 列表用 `<ul>/<ol>/<dl>`，不用 `<div>` 模拟
- 表单元素配对 `<label>`
- 图片必须有 `alt` 属性（装饰性图片用 `alt=""`）

## 3. Accessibility（可访问性 — WCAG 2.1 AA）
- 键盘可导航：所有交互元素可 Tab 到达
- ARIA 标签：自定义组件需要 `role`, `aria-label`, `aria-expanded` 等
- Skip link：页面顶部提供"跳到主内容"链接
- 表单错误提示关联到具体字段
- 颜色不是唯一信息载体

## 4. SEO（搜索引擎优化）
- 每页唯一的 `<title>` 和 `<meta name="description">`
- Open Graph 标签：`og:title`, `og:description`, `og:image`
- 结构化数据（JSON-LD）：Person, WebSite, Article
- `robots.txt` 和 `sitemap.xml`
- URL 简洁可读（kebab-case）

## 5. Security（安全）
- HTTPS everywhere
- CSP (Content-Security-Policy) 头部
- 外部链接使用 `rel="noopener noreferrer"`
- 表单输入做客户端 + 服务端验证
- 不在前端暴露 API key 或敏感信息

## 6. CSS Architecture（CSS架构）
- 使用 CSS Custom Properties（变量）管理设计 tokens
- 命名规范：BEM 或 utility-first（Tailwind）
- 避免 `!important`，使用 specificity 控制
- 移动优先的媒体查询：`min-width` 优于 `max-width`
- 优先使用 Flexbox/Grid，避免 float

## 7. File Structure（文件组织）
```
src/
├── index.html          # 主页
├── pages/              # 其他页面
├── styles/
│   ├── variables.css   # 设计 tokens / CSS 变量
│   ├── base.css        # reset + 全局样式
│   ├── components.css  # 组件样式
│   └── utilities.css   # 工具类
├── scripts/
│   └── main.js         # 交互逻辑
├── assets/
│   ├── images/
│   ├── fonts/
│   └── icons/
└── favicon.ico
```

## 8. Cross-Browser Compatibility（跨浏览器兼容）
- 支持最近 2 个版本的主流浏览器
- 使用 `autoprefixer` 处理 CSS 前缀
- 测试：Chrome, Firefox, Safari, Edge
- 避免使用实验性 CSS 特性（除非有 fallback）
