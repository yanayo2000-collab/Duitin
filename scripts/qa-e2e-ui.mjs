import 'dotenv/config';
import { chromium } from '@playwright/test';

const BASE = process.env.E2E_BASE || 'http://127.0.0.1:5173';
const API = process.env.E2E_API_BASE || 'http://127.0.0.1:3002';
const ADMIN_KEY = process.env.ADMIN_KEY || 'duitin-admin';

const ok = (name) => console.log(`✅ ${name}`);
const fail = (name, detail) => {
  console.error(`❌ ${name}${detail ? `\n   ${detail}` : ''}`);
  process.exitCode = 1;
};

async function jfetch(path, options = {}) {
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      'content-type': 'application/json',
      ...(options.headers || {}),
    },
  });
  let data = {};
  try { data = await res.json(); } catch {}
  return { res, data };
}

async function getToken() {
  const login = await jfetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ phone: '18800000000', password: '123456' }),
  });
  if (!login.res.ok || !login.data?.token) throw new Error(`login failed: ${JSON.stringify(login.data)}`);
  return login.data.token;
}

function normalizeNumberText(text) {
  return String(text || '').replace(/[^0-9]/g, '');
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    // CASE 1: adult female 23 => onboarding +1000, home/wallet一致
    {
      const reset = await jfetch('/api/admin/test-account/reset', {
        method: 'POST',
        headers: { 'x-admin-key': ADMIN_KEY },
        body: JSON.stringify({ userId: 'u_001' }),
      });
      if (!reset.res.ok) throw new Error(`reset failed: ${JSON.stringify(reset.data)}`);

      const token = await getToken();
      const context = await browser.newContext();
      await context.addInitScript((t) => {
        localStorage.setItem('duitin_token', t);
        sessionStorage.setItem('duitin_session_ok', '1');
        localStorage.removeItem('onboardingCompleted');
        localStorage.removeItem('userAge');
        localStorage.removeItem('userGender');
      }, token);

      const page = await context.newPage();
      await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });

      await page.waitForSelector('text=Bonus Pengguna Baru', { timeout: 10000 });
      await page.click('button:has-text("Wanita")');
      await page.fill('input[placeholder*="Masukkan usia"]', '23');
      await page.click('button:has-text("Klaim Bonus Saya")');

      await page.waitForTimeout(2200);

      const walletApi = await jfetch('/api/wallet', { headers: { Authorization: `Bearer ${token}` } });
      const apiBalance = Number(walletApi.data?.balance || 0);
      if (apiBalance === 1000) ok('adult onboarding api balance = 1000');
      else fail('adult onboarding api balance = 1000', `got ${apiBalance}`);

      const homeText = await page.textContent('body');
      if (normalizeNumberText(homeText).includes('1000')) ok('home shows 1000 after onboarding');
      else fail('home shows 1000 after onboarding');

      await page.click('button:has-text("Dompet")');
      await page.waitForTimeout(1200);
      const walletText = await page.textContent('body');
      if (normalizeNumberText(walletText).includes('1000')) ok('wallet page shows 1000 after onboarding');
      else fail('wallet page shows 1000 after onboarding');

      await context.close();
    }

    // CASE 2: female 16 => no reward, no tasks/jobs, adult-only notice
    {
      const reset = await jfetch('/api/admin/test-account/reset', {
        method: 'POST',
        headers: { 'x-admin-key': ADMIN_KEY },
        body: JSON.stringify({ userId: 'u_001' }),
      });
      if (!reset.res.ok) throw new Error(`reset failed: ${JSON.stringify(reset.data)}`);

      const token = await getToken();
      const context = await browser.newContext();
      await context.addInitScript((t) => {
        localStorage.setItem('duitin_token', t);
        sessionStorage.setItem('duitin_session_ok', '1');
        localStorage.removeItem('onboardingCompleted');
        localStorage.removeItem('userAge');
        localStorage.removeItem('userGender');
      }, token);

      const page = await context.newPage();
      await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('text=Bonus Pengguna Baru', { timeout: 10000 });
      await page.click('button:has-text("Wanita")');
      await page.fill('input[placeholder*="Masukkan usia"]', '16');
      await page.click('button:has-text("Klaim Bonus Saya")');
      await page.waitForTimeout(1800);

      const body = await page.textContent('body');
      if ((body || '').includes('App ini hanya untuk pengguna dewasa')) ok('under-18 adult-only notice visible');
      else fail('under-18 adult-only notice visible');

      const walletApi = await jfetch('/api/wallet', { headers: { Authorization: `Bearer ${token}` } });
      const apiBalance = Number(walletApi.data?.balance || 0);
      if (apiBalance === 0) ok('under-18 api balance remains 0');
      else fail('under-18 api balance remains 0', `got ${apiBalance}`);

      await context.close();
    }

    if (!process.exitCode) console.log('\n🧪 QA PASS: UI E2E core flows look good.');
  } catch (e) {
    fail('qa-ui-e2e crashed', e instanceof Error ? e.message : String(e));
  } finally {
    await browser.close();
  }
})();
