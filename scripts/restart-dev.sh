#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

SERVER_LOG="/tmp/duitin-server.log"
WEB_LOG="/tmp/duitin-vite.log"

echo "[duitin] Stopping existing processes..."
pkill -f "node server/index.js" 2>/dev/null || true
pkill -f "vite --host 0.0.0.0 --port 5173" 2>/dev/null || true
sleep 1

echo "[duitin] Starting backend..."
nohup npm run server >"$SERVER_LOG" 2>&1 &

echo "[duitin] Starting frontend..."
nohup npm run dev:app >"$WEB_LOG" 2>&1 &

sleep 2

echo ""
echo "[duitin] Restart complete ✅"
echo "- Frontend: http://localhost:5173"
echo "- Backend : http://localhost:3002"
echo ""
echo "[duitin] Recent backend log:"
tail -n 20 "$SERVER_LOG" || true
echo ""
echo "[duitin] Recent frontend log:"
tail -n 20 "$WEB_LOG" || true
