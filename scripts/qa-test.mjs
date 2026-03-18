import 'dotenv/config';

const API = process.env.QA_API_BASE || `http://127.0.0.1:${process.env.API_PORT || 3002}`;
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
  try {
    data = await res.json();
  } catch {}
  return { res, data };
}

(async () => {
  try {
    // reset test account to stable baseline
    {
      const { res, data } = await jfetch('/api/admin/test-account/reset', {
        method: 'POST',
        headers: { 'x-admin-key': ADMIN_KEY },
        body: JSON.stringify({ userId: 'u_001' }),
      });
      if (res.ok) ok('reset test account');
      else fail('reset test account', JSON.stringify(data));
    }

    // health
    {
      const { res, data } = await jfetch('/api/health', { method: 'GET' });
      if (res.ok && data.ok) ok('health endpoint');
      else fail('health endpoint', JSON.stringify(data));
    }

    // login
    let token = '';
    {
      const { res, data } = await jfetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ phone: '18800000000', password: '123456' }),
      });
      if (res.ok && data.token) {
        token = data.token;
        ok('login default account');
      } else fail('login default account', JSON.stringify(data));
    }

    const auth = { Authorization: `Bearer ${token}` };

    // wallet before
    let beforeBalance = 0;
    {
      const { res, data } = await jfetch('/api/wallet', { method: 'GET', headers: auth });
      if (res.ok) {
        beforeBalance = Number(data.balance || 0);
        ok('wallet read before claim');
      } else fail('wallet read before claim', JSON.stringify(data));
    }

    // claim reward generic
    const claimCode = `qa_claim_${Date.now()}`;
    {
      const { res, data } = await jfetch('/api/rewards/claim', {
        method: 'POST',
        headers: auth,
        body: JSON.stringify({ code: claimCode, title: 'QA Reward', reward: 11 }),
      });
      if (res.ok) ok('claim reward endpoint');
      else fail('claim reward endpoint', JSON.stringify(data));
    }

    // wallet after claim
    let afterBalance = 0;
    {
      const { res, data } = await jfetch('/api/wallet', { method: 'GET', headers: auth });
      const after = Number(data.balance || 0);
      afterBalance = after;
      if (res.ok && after >= beforeBalance + 11) ok('wallet increases after claim');
      else fail('wallet increases after claim', `before=${beforeBalance}, after=${after}`);
    }

    // withdraw
    let withdrawalId = '';
    const withdrawAmount = Math.max(1, Math.min(10, Math.floor(afterBalance)));
    {
      const { res, data } = await jfetch('/api/withdraw', {
        method: 'POST',
        headers: auth,
        body: JSON.stringify({
          amount: withdrawAmount,
          destination: 'DANA',
          danaAccount: '081234567890',
          danaAccountName: 'QA Tester',
        }),
      });
      if (res.ok && data.withdrawal?.id) {
        withdrawalId = data.withdrawal.id;
        ok('withdraw submit');
      } else fail('withdraw submit', JSON.stringify(data));
    }

    // admin list
    {
      const { res, data } = await jfetch('/api/admin/withdrawals', {
        method: 'GET',
        headers: { 'x-admin-key': ADMIN_KEY },
      });
      if (res.ok && Array.isArray(data.items)) ok('admin list withdrawals');
      else fail('admin list withdrawals', JSON.stringify(data));
    }

    // admin approve
    if (withdrawalId) {
      const { res, data } = await jfetch(`/api/admin/withdrawals/${withdrawalId}/approve`, {
        method: 'POST',
        headers: { 'x-admin-key': ADMIN_KEY },
      });
      if (res.ok) ok('admin approve withdrawal');
      else fail('admin approve withdrawal', JSON.stringify(data));
    }

    // logout
    {
      const { res } = await jfetch('/api/auth/logout', { method: 'POST', headers: auth });
      if (res.ok) ok('logout');
      else fail('logout');
    }

    if (!process.exitCode) {
      console.log('\n🎉 QA PASS: core API flows are healthy.');
    }
  } catch (e) {
    fail('qa runner crashed', e instanceof Error ? e.message : String(e));
  }
})();
