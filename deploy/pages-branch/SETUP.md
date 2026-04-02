# Branch Publish Setup — GitHub Pages 分支发布

## 步骤

1. 确保 `index.html` 在正确位置：
   - 根目录模式: `./index.html`
   - docs 目录模式: `./docs/index.html`

2. 在项目根目录添加 `.nojekyll` 空文件（禁用 Jekyll）

3. 推送到 GitHub:
   ```bash
   git add -A
   git commit -m "Initial site"
   git push -u origin main
   ```

4. 配置 GitHub Pages:
   - 打开 repo → Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main`
   - Folder: `/` 或 `/docs`
   - 点击 Save

5. 等待部署完成（通常 1-2 分钟）

6. 访问 `https://username.github.io` 或 `https://username.github.io/repo`

## 注意事项

- 每次 `git push` 到 main 都会自动重新部署
- 如果使用自定义域名，确保 `CNAME` 文件在正确位置
- 确保 `.nojekyll` 文件存在（否则 GitHub Pages 会尝试用 Jekyll 构建）
