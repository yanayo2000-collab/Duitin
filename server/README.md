# Duitin backend (demo)

## 1) Configure env

Create `.env` in project root (same level as `package.json`):

```env
API_PORT=3001
JWT_SECRET=change-this-jwt-secret
ADMIN_KEY=change-this-admin-key
```

> `ADMIN_KEY` is required for admin APIs.

## 2) Start API

```bash
npm install
npm run server
```

Default API URL: `http://localhost:3001`

Storage: `server/duitin.sqlite` (auto-migrates from legacy `server/db.json` when present and SQLite is empty).

## Default test account

- phone: `18800000000`
- password: `123456`

## Auth endpoints

- `POST /api/auth/login`
- `POST /api/auth/logout` (Bearer token)
- `GET /api/me` (Bearer token)

## User endpoints

- `GET /api/tasks` (Bearer token)
- `POST /api/tasks/:taskId/complete` (Bearer token)
- `GET /api/task-history` (Bearer token)
- `GET /api/wallet` (Bearer token)
- `POST /api/withdraw` (Bearer token, `{ amount }`)
- `GET /api/withdrawals` (Bearer token)

## Admin endpoints (`x-admin-key` required)

- `GET /api/admin/withdrawals`
- `POST /api/admin/withdrawals/:id/approve`
- `POST /api/admin/withdrawals/:id/reject`

## Utility scripts

From project root:

```bash
npm run db:backup   # backup sqlite to server/backups/duitin-<timestamp>.sqlite
npm run db:reset    # reset demo data (user/tasks/history/withdrawals)
```
