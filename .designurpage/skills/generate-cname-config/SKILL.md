---
name: generate-cname-config
description: "配置自定义域名。生成 CNAME 文件并提供 DNS 配置指引。Generate CNAME file and DNS setup guide for custom domains."
argument-hint: [domain-name]
allowed-tools: Read, Write, Edit, Bash(*), Grep, Glob
---

# Generate CNAME Config — 自定义域名配置

## Input

`$ARGUMENTS` — 自定义域名（如 `example.com` 或 `blog.example.com`）

## Workflow

### Phase A: 生成 CNAME 文件

```
# CNAME file content (single line, no trailing newline)
example.com
```

放置在项目根目录（或 build 输出目录）。

### Phase B: DNS 配置指引

根据域名类型提供指引：

#### Apex domain (example.com)
```
在你的 DNS 提供商添加以下 A 记录：

Type    Name    Value
A       @       185.199.108.153
A       @       185.199.109.153
A       @       185.199.110.153
A       @       185.199.111.153

等待 DNS 传播（最多 24 小时）
```

#### Subdomain (blog.example.com)
```
添加 CNAME 记录：

Type    Name    Value
CNAME   blog    username.github.io
```

### Phase C: GitHub Settings 指引

```
1. Go to Settings → Pages
2. Under "Custom domain", enter: example.com
3. Check "Enforce HTTPS" (after DNS propagates)
4. Wait for DNS check to pass ✅
```

### 🚦 Checkpoint: Domain Setup Guide

- **展示**: CNAME 文件 + DNS 配置步骤 + GitHub Settings 步骤
- **确认 →** 生成 CNAME 文件
- **跳过 →** 不配置自定义域名

## Key Rules

1. **CNAME 文件会被 build 覆盖** — 如果用 Actions，确保 CNAME 在 build 输出中
2. **HTTPS 优先** — 提醒用户启用 Enforce HTTPS
3. **指导而非代做** — DNS 配置需要用户在自己的域名服务商操作
