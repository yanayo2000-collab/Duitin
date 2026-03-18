# 部署说明

## 前端（Vercel）
1. 将本仓库推到 GitHub/GitLab/Bitbucket 或使用 Vercel CLI 直接上传。
2. 在 Vercel 项目设置里配置：
   - 构建命令：`npm run build`。
   - 输出目录：`dist`。
   - 环境变量：`VITE_API_BASE_URL` 设为你的公网 API（例如 `https://duitin-api.yourdomain.com`）。
3. 关联分支/触发部署后，Vercel 会自动运行 `npm run build`，生成 `dist/` 并产出 HTTPS 域名（可自定义域名）。
4. 若需要多环境，可额外在 Settings → Environment Variables 为 Preview/Production 分别设定不同的 API 地址。

## 后端 API（推荐 Render/Cloud Run）
1. 先在云平台（Render、Railway、Cloud Run）创建 Node.js Web Service：
   - 构建命令：`npm install`。
   - 启动命令：`npm run server`。
   - 启动脚本会读取 `.env` 里的 `API_PORT`、`JWT_SECRET`、`ADMIN_KEY`，并使用平台提供的 `PORT`（已在 `server/index.js` 中兼容）。
2. 设置环境变量（Render/Cloud Run 的 Secrets）：
   - `API_PORT=3001`（可选，给内部逻辑用）。
   - `JWT_SECRET=<一个安全的随机字符串>`。
   - `ADMIN_KEY=<管理面板需要的密钥>`。
3. Render 会提供 HTTPS 域名，如 `https://duitin-api.onrender.com`。把这个域名写入 Vercel 的 `VITE_API_BASE_URL`，前端才能正常调用 API。
4. Express 默认会在 `server/duitin.sqlite` 中维护数据（首次运行会从 `server/db.json` 迁移）。Render 的磁盘是持久化的，不需要额外配置。如果将来你想换关系型数据库，可在 `server` 目录写一个新的数据层并在 `.env` 中配置连接字符串。

## 提交与联调
1. 确保 `vercel.json`、`.env.example` 和上述文件都已经添加到 Git 并 push。
2. 在 Vercel 和 API 平台填好所有环境变量后，部署并访问前端域名，使用测试账号 `18800000000` / `123456` 验证任务、提现等功能。
3. 准备 Android TWA/Capacitor 时，使用 Vercel 的 HTTPS 域名作为入口，API 域名作为后台接口，完成 Digital Asset Links 配置。

如需我帮你生成 Render 的 `render.yaml`、Android TWA 配置，或检查部署日志，只需告诉我下一步要做的部分。
