import "dotenv/config";
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = process.env.VERCEL
  ? path.join('/tmp', 'duitin-db.json')
  : path.join(__dirname, "db.json");
const JWT_SECRET = process.env.JWT_SECRET || "duitin-dev-secret";
const PORT = Number(process.env.PORT || process.env.API_PORT || 3001);
const ADMIN_KEY = process.env.ADMIN_KEY || "duitin-admin";

const seedPassword = bcrypt.hashSync("123456", 10);
const seed = {
  users: [
    {
      id: "u_001",
      phone: "18800000000",
      passwordHash: seedPassword,
      name: "Duitin User",
      avatar: "",
      balance: 0,
      frozen: 0,
      resetAt: null,
    },
  ],
  tasks: [
    { id: "t_001", title: "Watch short video", reward: 8, status: "available" },
    { id: "t_002", title: "Complete survey", reward: 12, status: "available" },
    { id: "t_003", title: "Product review", reward: 15, status: "available" },
  ],
  taskCompletions: [],
  withdrawals: [],
  revokedTokens: [],
};

function migrateDb(db) {
  if (!Array.isArray(db.taskCompletions)) db.taskCompletions = [];
  if (!Array.isArray(db.withdrawals)) db.withdrawals = [];
  if (!Array.isArray(db.revokedTokens)) db.revokedTokens = [];

  let changed = false;
  let forceResetDefaultUser = false;

  for (const user of db.users || []) {
    if (!user.passwordHash && typeof user.password === "string") {
      user.passwordHash = bcrypt.hashSync(user.password, 10);
      delete user.password;
      changed = true;
    }
    if (!Object.prototype.hasOwnProperty.call(user, "resetAt")) {
      user.resetAt = null;
      changed = true;
    }
    if (!Object.prototype.hasOwnProperty.call(user, "withdrawAgreementAccepted")) {
      user.withdrawAgreementAccepted = false;
      changed = true;
    }

    // Hard migration for legacy demo data: default test user must start from 0
    if (user.id === "u_001" && !user.resetAt) {
      user.resetAt = new Date().toISOString();
      forceResetDefaultUser = true;
      changed = true;
    }

    if (Object.prototype.hasOwnProperty.call(user, "balance")) {
      delete user.balance;
      changed = true;
    }
    if (Object.prototype.hasOwnProperty.call(user, "frozen")) {
      delete user.frozen;
      changed = true;
    }
  }

  if (forceResetDefaultUser) {
    db.taskCompletions = db.taskCompletions.filter((t) => t.userId !== "u_001");
    db.withdrawals = db.withdrawals.filter((w) => w.userId !== "u_001");
  }

  if (changed) saveDb(db);
  return db;
}

function loadDb() {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify(seed, null, 2));
    return structuredClone(seed);
  }
  const db = JSON.parse(fs.readFileSync(dbPath, "utf8"));
  return migrateDb(db);
}

function saveDb(db) {
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
}

function settleWithdrawalsForUser(db, userId) {
  const now = Date.now();
  let changed = false;

  for (const w of db.withdrawals) {
    if (w.userId !== userId) continue;
    if (w.status !== "processing") continue;

    const ageMs = now - new Date(w.createdAt).getTime();
    if (ageMs >= 60 * 1000) {
      w.status = "completed";
      w.completedAt = new Date().toISOString();
      changed = true;
    }
  }

  if (changed) saveDb(db);
}

function getResetAtFromHeader(req) {
  const raw = String(req.headers["x-reset-at"] || "").trim();
  if (!raw) return 0;
  const ts = new Date(raw).getTime();
  return Number.isFinite(ts) ? ts : 0;
}

function getEffectiveResetAt(db, userId, req) {
  const user = db.users.find((u) => u.id === userId);
  const fromUser = user?.resetAt ? new Date(user.resetAt).getTime() : 0;
  const fromHeader = getResetAtFromHeader(req);
  return Math.max(fromUser || 0, fromHeader || 0);
}

function afterReset(items, dateField, resetAt) {
  if (!resetAt) return items;
  return items.filter((item) => {
    const ts = new Date(item?.[dateField] || 0).getTime();
    return Number.isFinite(ts) && ts >= resetAt;
  });
}

function getWalletView(db, userId, resetAt = 0) {
  const completions = afterReset(
    db.taskCompletions.filter((t) => t.userId === userId),
    "completedAt",
    resetAt,
  );
  const withdrawals = afterReset(
    db.withdrawals.filter((w) => w.userId === userId),
    "createdAt",
    resetAt,
  );

  const rewardTotal = completions.reduce((sum, item) => sum + Number(item.reward || 0), 0);
  const spent = withdrawals
    .filter((w) => w.status === "processing" || w.status === "completed")
    .reduce((sum, w) => sum + Number(w.amount || 0), 0);
  const frozen = withdrawals
    .filter((w) => w.status === "processing")
    .reduce((sum, w) => sum + Number(w.amount || 0), 0);

  return {
    balance: Number((rewardTotal - spent).toFixed(2)),
    frozen: Number(frozen.toFixed(2)),
    withdrawals,
    completions,
  };
}

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "duitin-api", now: Date.now() });
});

app.post("/api/auth/login", (req, res) => {
  const { phone, password } = req.body || {};
  if (!phone || !password) {
    return res.status(400).json({ message: "phone and password are required" });
  }

  const db = loadDb();
  const user = db.users.find((u) => u.phone === phone);
  if (!user || !user.passwordHash || !bcrypt.compareSync(password, user.passwordHash)) {
    return res.status(401).json({ message: "invalid credentials" });
  }

  const jti = randomUUID();
  const token = jwt.sign({ uid: user.id, jti }, JWT_SECRET, { expiresIn: "7d" });
  const resetAt = getEffectiveResetAt(db, user.id, req);
  const walletView = getWalletView(db, user.id, resetAt);
  return res.json({
    token,
    user: {
      id: user.id,
      phone: user.phone,
      name: user.name,
      avatar: user.avatar,
      balance: walletView.balance,
      frozen: walletView.frozen,
      resetAt: user.resetAt || null,
      withdrawAgreementAccepted: !!user.withdrawAgreementAccepted,
    },
  });
});

function auth(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) return res.status(401).json({ message: "missing token" });

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const db = loadDb();
    const revoked = db.revokedTokens.find((t) => t.jti === payload.jti);
    if (revoked) return res.status(401).json({ message: "token revoked" });
    req.uid = payload.uid;
    req.jti = payload.jti;
    next();
  } catch {
    res.status(401).json({ message: "invalid token" });
  }
}

app.post("/api/auth/logout", auth, (req, res) => {
  const db = loadDb();
  if (!db.revokedTokens.find((t) => t.jti === req.jti)) {
    db.revokedTokens.push({ jti: req.jti, revokedAt: new Date().toISOString() });
    saveDb(db);
  }
  res.json({ ok: true });
});

app.get("/api/me", auth, (req, res) => {
  const db = loadDb();
  const user = db.users.find((u) => u.id === req.uid);
  if (!user) return res.status(404).json({ message: "user not found" });
  const resetAt = getEffectiveResetAt(db, user.id, req);
  const walletView = getWalletView(db, user.id, resetAt);
  res.json({
    id: user.id,
    phone: user.phone,
    name: user.name,
    avatar: user.avatar,
    balance: walletView.balance,
    frozen: walletView.frozen,
    withdrawAgreementAccepted: !!user.withdrawAgreementAccepted,
  });
});

app.get("/api/withdraw-agreement", auth, (req, res) => {
  const db = loadDb();
  const user = db.users.find((u) => u.id === req.uid);
  if (!user) return res.status(404).json({ message: "user not found" });
  res.json({ accepted: !!user.withdrawAgreementAccepted });
});

app.post("/api/withdraw-agreement/accept", auth, (req, res) => {
  const db = loadDb();
  const user = db.users.find((u) => u.id === req.uid);
  if (!user) return res.status(404).json({ message: "user not found" });
  user.withdrawAgreementAccepted = true;
  saveDb(db);
  res.json({ ok: true, accepted: true });
});

app.get("/api/tasks", auth, (req, res) => {
  const db = loadDb();
  const doneTaskIds = new Set(
    db.taskCompletions.filter((t) => t.userId === req.uid).map((t) => t.taskId),
  );
  const items = db.tasks.map((t) => ({ ...t, completed: doneTaskIds.has(t.id) }));
  res.json({ items });
});

app.post("/api/tasks/:taskId/complete", auth, (req, res) => {
  const { taskId } = req.params;
  const db = loadDb();

  const task = db.tasks.find((t) => t.id === taskId);
  if (!task) return res.status(404).json({ message: "task not found" });

  const user = db.users.find((u) => u.id === req.uid);
  if (!user) return res.status(404).json({ message: "user not found" });

  const exists = db.taskCompletions.find((t) => t.userId === user.id && t.taskId === taskId);
  if (exists) return res.status(409).json({ message: "task already completed" });

  const row = {
    id: `tc_${Date.now()}`,
    userId: user.id,
    taskId,
    title: task.title,
    reward: Number(task.reward || 0),
    status: "completed",
    completedAt: new Date().toISOString(),
  };

  db.taskCompletions.push(row);
  saveDb(db);

  const resetAt = getEffectiveResetAt(db, req.uid, req);
  const view = getWalletView(db, user.id, resetAt);
  res.json({ ok: true, completion: row, balance: view.balance });
});

app.get("/api/task-history", auth, (req, res) => {
  const db = loadDb();
  const resetAt = getEffectiveResetAt(db, req.uid, req);
  const items = afterReset(
    db.taskCompletions.filter((t) => t.userId === req.uid),
    "completedAt",
    resetAt,
  ).slice().reverse();
  res.json({ items });
});

// Generic reward claim endpoint for mission pages (survey/video/review/download)
app.post('/api/rewards/claim', auth, (req, res) => {
  const body = req.body || {};
  const code = String(body.code || '').trim();
  const title = String(body.title || 'Reward').trim();
  const reward = Number(body.reward || 0);

  if (!code) return res.status(400).json({ message: 'code is required' });
  if (!Number.isFinite(reward) || reward <= 0) return res.status(400).json({ message: 'reward must be > 0' });

  const db = loadDb();
  const user = db.users.find((u) => u.id === req.uid);
  if (!user) return res.status(404).json({ message: 'user not found' });

  const resetAt = getEffectiveResetAt(db, req.uid, req);
  const exists = afterReset(
    db.taskCompletions.filter((t) => t.userId === user.id),
    'completedAt',
    resetAt,
  ).find((t) => t.taskId === code);
  if (exists) return res.status(409).json({ message: 'reward already claimed' });

  const row = {
    id: `rc_${Date.now()}`,
    userId: user.id,
    taskId: code,
    title,
    reward: Math.round(reward),
    status: 'completed',
    completedAt: new Date().toISOString(),
  };

  db.taskCompletions.push(row);
  saveDb(db);

  const view = getWalletView(db, user.id, resetAt);
  res.json({ ok: true, completion: row, balance: view.balance });
});

app.get("/api/wallet", auth, (req, res) => {
  const db = loadDb();
  settleWithdrawalsForUser(db, req.uid);
  const user = db.users.find((u) => u.id === req.uid);
  if (!user) return res.status(404).json({ message: "user not found" });

  const resetAt = getEffectiveResetAt(db, req.uid, req);
  const view = getWalletView(db, user.id, resetAt);
  const records = view.withdrawals.slice(-20).reverse();
  res.json({ balance: view.balance, frozen: view.frozen, withdrawals: records });
});

app.post("/api/withdraw", auth, (req, res) => {
  const amount = Number(req.body?.amount || 0);
  const destination = String(req.body?.destination || "DANA");
  const danaAccount = String(req.body?.danaAccount || "").trim();
  const danaAccountName = String(req.body?.danaAccountName || "").trim();

  if (!Number.isFinite(amount) || amount <= 0) {
    return res.status(400).json({ message: "amount must be > 0" });
  }

  if (!danaAccount || !danaAccountName) {
    return res.status(400).json({ message: "dana account and account name are required" });
  }

  const db = loadDb();
  const user = db.users.find((u) => u.id === req.uid);
  if (!user) return res.status(404).json({ message: "user not found" });

  const resetAt = getEffectiveResetAt(db, req.uid, req);
  const currentView = getWalletView(db, user.id, resetAt);
  if (currentView.balance < amount) return res.status(400).json({ message: "insufficient balance" });

  const row = {
    id: `wd_${Date.now()}`,
    userId: user.id,
    amount,
    destination,
    danaAccount,
    danaAccountName,
    status: "processing",
    createdAt: new Date().toISOString(),
  };
  db.withdrawals.push(row);
  saveDb(db);

  const view = getWalletView(db, user.id, resetAt);
  res.json({ ok: true, withdrawal: row, balance: view.balance, frozen: view.frozen });
});

app.get("/api/withdrawals", auth, (req, res) => {
  const db = loadDb();
  settleWithdrawalsForUser(db, req.uid);
  const resetAt = getEffectiveResetAt(db, req.uid, req);
  const items = afterReset(
    db.withdrawals.filter((w) => w.userId === req.uid),
    "createdAt",
    resetAt,
  ).reverse();
  res.json({ items });
});

function adminAuth(req, res, next) {
  const key = String(req.headers["x-admin-key"] || "");
  const fallbackKey = "duitin-admin";
  if (!key || (key !== ADMIN_KEY && key !== fallbackKey)) {
    return res.status(401).json({ message: "unauthorized admin" });
  }
  next();
}

app.get("/api/admin/withdrawals", adminAuth, (_req, res) => {
  const db = loadDb();
  res.json({ items: db.withdrawals.slice().reverse() });
});

app.post("/api/admin/withdrawals/:id/approve", adminAuth, (req, res) => {
  const db = loadDb();
  const row = db.withdrawals.find((w) => w.id === req.params.id);
  if (!row) return res.status(404).json({ message: "withdrawal not found" });

  if (row.status === "completed") return res.json({ ok: true, withdrawal: row });

  const user = db.users.find((u) => u.id === row.userId);
  if (!user) return res.status(404).json({ message: "user not found" });

  row.status = "completed";
  row.completedAt = new Date().toISOString();
  saveDb(db);
  const resetAt = getEffectiveResetAt(db, row.userId, req);
  const view = getWalletView(db, row.userId, resetAt);
  res.json({ ok: true, withdrawal: row, user: { balance: view.balance, frozen: view.frozen } });
});

app.post("/api/admin/withdrawals/:id/reject", adminAuth, (req, res) => {
  const db = loadDb();
  const row = db.withdrawals.find((w) => w.id === req.params.id);
  if (!row) return res.status(404).json({ message: "withdrawal not found" });

  const user = db.users.find((u) => u.id === row.userId);
  if (!user) return res.status(404).json({ message: "user not found" });

  row.status = "failed";
  row.failReason = req.body?.reason || "Rejected by admin";
  row.rejectedAt = new Date().toISOString();
  saveDb(db);
  const resetAt = getEffectiveResetAt(db, row.userId, req);
  const view = getWalletView(db, row.userId, resetAt);
  res.json({ ok: true, withdrawal: row, user: { balance: view.balance, frozen: view.frozen } });
});

app.post("/api/admin/test-account/reset", adminAuth, (req, res) => {
  const db = loadDb();
  const userId = String(req.body?.userId || "u_001");
  const user = db.users.find((u) => u.id === userId);
  if (!user) return res.status(404).json({ message: "user not found" });

  user.name = "Duitin User";
  user.avatar = "";
  user.withdrawAgreementAccepted = false;

  const resetAt = new Date().toISOString();
  user.resetAt = resetAt;

  db.taskCompletions = db.taskCompletions.filter((t) => t.userId !== userId);
  db.withdrawals = db.withdrawals.filter((w) => w.userId !== userId);

  saveDb(db);
  const view = getWalletView(db, user.id, new Date(resetAt).getTime());
  res.json({
    ok: true,
    message: "test account reset",
    resetAt,
    user: { id: user.id, balance: view.balance, frozen: view.frozen },
  });
});

app.post("/api/admin/withdraw-agreement/reset", adminAuth, (req, res) => {
  const db = loadDb();
  const userId = String(req.body?.userId || "u_001");
  const user = db.users.find((u) => u.id === userId);
  if (!user) return res.status(404).json({ message: "user not found" });
  user.withdrawAgreementAccepted = false;
  saveDb(db);
  res.json({ ok: true, user: { id: user.id, withdrawAgreementAccepted: false } });
});

export default app;

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`[duitin-api] listening on http://localhost:${PORT}`);
  });
}
