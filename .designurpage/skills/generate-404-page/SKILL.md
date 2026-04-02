---
name: generate-404-page
description: "生成自定义 404 页面。匹配网站设计风格，提供有用的导航。Generate a custom 404 page matching the site's design."
argument-hint: [style: minimal | fun | helpful]
allowed-tools: Read, Write, Edit, Grep, Glob
---

# Generate 404 Page — 自定义 404 页面

## Input

`$ARGUMENTS` — 404 页面风格
- `minimal` (默认): 简洁文字 + 首页链接
- `fun`: 有趣的插图/动效 + 导航
- `helpful`: 搜索框 + 热门页面链接

## Workflow

1. 读取 `DESIGN_SYSTEM.md` — 保持风格一致
2. 读取 `SITE_BLUEPRINT.md` — 获取主要页面链接
3. 生成 `404.html`：
   - 使用网站的设计系统（CSS变量）
   - 包含网站导航
   - 友好的错误信息
   - 返回首页链接
   - 热门页面快捷链接（helpful模式）

```html
<!-- GitHub Pages 自动识别根目录的 404.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Page Not Found — [Site Name]</title>
  <link rel="stylesheet" href="/styles/variables.css">
  <link rel="stylesheet" href="/styles/base.css">
</head>
<body>
  <main class="error-page">
    <h1>404</h1>
    <p>This page doesn't exist — but these do:</p>
    <nav>
      <a href="/">Home</a>
      <a href="/projects">Projects</a>
      <a href="/about">About</a>
    </nav>
  </main>
</body>
</html>
```

### 🚦 Checkpoint: 404 Page Review

- **展示**: 404 页面效果
- **确认 →** 保存到项目根目录
