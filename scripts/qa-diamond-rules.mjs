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
  try { data = await res.json(); } catch {}
  return { res, data };
}

(async () => {
  try {
    // 1) Reset must return 0
    const reset = await jfetch('/api/admin/test-account/reset', {
      method: 'POST',
      headers: { 'x-admin-key': ADMIN_KEY },
      body: JSON.stringify({ userId: 'u_001' }),
    });
    if (reset.res.ok && Number(reset.data?.user?.balance || 0) === 0) ok('reset returns balance=0');
    else fail('reset returns balance=0', JSON.stringify(reset.data));

    // 2) Login and wallet must be 0 before onboarding claim
    const login = await jfetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ phone: '18800000000', password: '123456' }),
    });
    const token = login.data?.token || '';
    if (login.res.ok && token) ok('login success');
    else return fail('login success', JSON.stringify(login.data));

    const auth = { Authorization: `Bearer ${token}` };

    const me = await jfetch('/api/me', { method: 'GET', headers: auth });
    const wallet0 = await jfetch('/api/wallet', { method: 'GET', headers: auth });

    // 2.1) Withdraw agreement must reset to not accepted
    const withdrawAgreement0 = await jfetch('/api/withdraw-agreement', { method: 'GET', headers: auth });
    if (withdrawAgreement0.res.ok && withdrawAgreement0.data?.accepted === false) ok('withdraw agreement reset state = false');
    else fail('withdraw agreement reset state = false', JSON.stringify(withdrawAgreement0.data));

    const meBalance0 = Number(me.data?.balance || 0);
    const walletBalance0 = Number(wallet0.data?.balance || 0);
    if (me.res.ok && wallet0.res.ok && meBalance0 === walletBalance0 && walletBalance0 === 0) {
      ok('initial balance consistent (/api/me == /api/wallet == 0)');
    } else {
      fail('initial balance consistent', `me=${meBalance0}, wallet=${walletBalance0}`);
    }

    // 2.2) Accept withdraw agreement then verify
    const withdrawAgreementAccept = await jfetch('/api/withdraw-agreement/accept', { method: 'POST', headers: auth });
    if (withdrawAgreementAccept.res.ok && withdrawAgreementAccept.data?.accepted === true) ok('withdraw agreement accept endpoint works');
    else fail('withdraw agreement accept endpoint works', JSON.stringify(withdrawAgreementAccept.data));

    const withdrawAgreement1 = await jfetch('/api/withdraw-agreement', { method: 'GET', headers: auth });
    if (withdrawAgreement1.res.ok && withdrawAgreement1.data?.accepted === true) ok('withdraw agreement state persists as true');
    else fail('withdraw agreement state persists as true', JSON.stringify(withdrawAgreement1.data));

    // 3) Onboarding reward +1000 (single-claim)
    const onboarding = await jfetch('/api/rewards/claim', {
      method: 'POST',
      headers: auth,
      body: JSON.stringify({ code: 'mission_onboarding', title: 'Bonus Pengguna Baru', reward: 1000 }),
    });
    if (onboarding.res.ok) ok('onboarding reward claim (+1000)');
    else fail('onboarding reward claim (+1000)', JSON.stringify(onboarding.data));

    const wallet1 = await jfetch('/api/wallet', { method: 'GET', headers: auth });
    const b1 = Number(wallet1.data?.balance || 0);
    if (wallet1.res.ok && b1 === 1000) ok('balance after onboarding claim = 1000');
    else fail('balance after onboarding claim = 1000', `balance=${b1}`);

    // duplicate claim should not increase
    const dup = await jfetch('/api/rewards/claim', {
      method: 'POST',
      headers: auth,
      body: JSON.stringify({ code: 'mission_onboarding', title: 'Bonus Pengguna Baru', reward: 1000 }),
    });
    if (!dup.res.ok) ok('duplicate onboarding claim rejected');
    else fail('duplicate onboarding claim rejected', JSON.stringify(dup.data));

    const wallet2 = await jfetch('/api/wallet', { method: 'GET', headers: auth });
    const b2 = Number(wallet2.data?.balance || 0);
    if (wallet2.res.ok && b2 === 1000) ok('balance unchanged after duplicate claim');
    else fail('balance unchanged after duplicate claim', `balance=${b2}`);

    // 4) B/C/A reward chain check
    const rewards = [
      { code: 'mission_watch_video', reward: 2000 },
      { code: 'mission_download_app', reward: 2000 },
      { code: 'mission_survey', reward: 1000 },
      { code: 'mission_product_review', reward: 8000 },
    ];

    let expected = 1000;
    for (const r of rewards) {
      const c = await jfetch('/api/rewards/claim', {
        method: 'POST',
        headers: auth,
        body: JSON.stringify({ code: r.code, title: r.code, reward: r.reward }),
      });
      if (!c.res.ok) return fail(`claim ${r.code}`, JSON.stringify(c.data));
      expected += r.reward;
      const w = await jfetch('/api/wallet', { method: 'GET', headers: auth });
      const b = Number(w.data?.balance || 0);
      if (w.res.ok && b === expected) ok(`balance after ${r.code} = ${expected}`);
      else return fail(`balance after ${r.code}`, `expected=${expected}, got=${b}`);
    }

    console.log('\n🎯 QA PASS: diamond rules are consistent.');
  } catch (e) {
    fail('qa runner crashed', e instanceof Error ? e.message : String(e));
  }
})();
