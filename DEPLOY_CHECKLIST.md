# 部署与健康检查清单

## Vercel 前端
- [ ] vercel.json 设为 version 2，rewrites 只将无扩展名的路径指向 index.html，静态资源由默认目录处理。
- [ ] Settings → Build & Output
  - Build Command：`npm run build`
  - Output Directory：`dist`
  - Environment Variable：`VITE_API_BASE_URL=https://duitin.onrender.com`
  - 确保 Preview/Production 环境都填写此变量。
- [ ] 手动触发部署或推送新 commit 让 Vercel 重新打包。
- [ ] 部署完成后访问 `https://duitin-app-from-archive.vercel.app/`
  - Network 过滤 `Fetch/XHR`，确认 `/api/login` 等请求目标域名是 `https://duitin.onrender.com`、状态 200、响应含 `Access-Control-Allow-Origin`。
  - Console 没有 `Failed to fetch`、MIME 或 CORS 错误。
  - 若页面仍白屏，按 `⌘+Shift+R` 强制刷新并清除缓存。

## Render 后端 API
- [ ] Render Web Service：名称 `duitin-api`，region 选择 Singapore，branch main，Build Command `npm install`，Start Command `npm run server`。
- [ ] 环境变量
  - `JWT_SECRET`（随机字符串）
  - `ADMIN_KEY`（管理员密钥）
  - `API_PORT=3001`
- [ ] Health check URL `https://duitin.onrender.com/api/health` 返回 `{"ok":true,...}`。

## 浏览器/网络验证
- [ ] 在部署完成后强制刷新 `https://duitin-app-from-archive.vercel.app/`，确认页面能正常渲染。
- [ ] Network 中确认所有 `/api` 请求都返回 200，且请求 URL 包含 `https://duitin.onrender.com`。
- [ ] Console 中无 JavaScript/CORS/404 等错误；若仍存在，复制错误内容，并把截图/日志发我分析。
