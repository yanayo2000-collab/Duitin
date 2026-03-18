import { ArrowLeft, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useEffect, useMemo, useState } from 'react';
import { apiRequest, getWalletCache, setWalletCache } from '../../lib/api';

type Withdrawal = {
  id: string;
  amount: number;
  status: string;
  createdAt: string;
  destination?: string;
  danaAccount?: string;
  danaAccountName?: string;
};

type IncomeRow = {
  id: string;
  title: string;
  reward: number;
  completedAt: string;
};

const WALLET_DETAIL_CACHE_KEY = 'duitin_wallet_detail_cache_v1';
const WALLET_DETAIL_CACHE_TTL_MS = 5_000;

function getWalletDetailCache(): { balance: number; frozen: number; withdrawals: Withdrawal[]; incomes: IncomeRow[]; updatedAt: number } {
  try {
    const raw = localStorage.getItem(WALLET_DETAIL_CACHE_KEY);
    if (!raw) return { balance: 0, frozen: 0, withdrawals: [], incomes: [], updatedAt: 0 };
    const obj = JSON.parse(raw);
    return {
      balance: Number(obj?.balance || 0),
      frozen: Number(obj?.frozen || 0),
      withdrawals: Array.isArray(obj?.withdrawals) ? obj.withdrawals : [],
      incomes: Array.isArray(obj?.incomes) ? obj.incomes : [],
      updatedAt: Number(obj?.updatedAt || 0),
    };
  } catch {
    return { balance: 0, frozen: 0, withdrawals: [], incomes: [], updatedAt: 0 };
  }
}

function setWalletDetailCache(balance: number, frozen: number, withdrawals: Withdrawal[], incomes: IncomeRow[]) {
  localStorage.setItem(
    WALLET_DETAIL_CACHE_KEY,
    JSON.stringify({ balance, frozen, withdrawals, incomes, updatedAt: Date.now() }),
  );
}

export function MyWallet() {
  const navigate = useNavigate();
  const cachedWallet = getWalletCache();
  const cachedDetail = getWalletDetailCache();
  const [balance, setBalance] = useState(cachedWallet.balance);
  const [frozen, setFrozen] = useState(cachedWallet.frozen);
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>(cachedDetail.withdrawals);
  const [incomes, setIncomes] = useState<IncomeRow[]>(cachedDetail.incomes);
  const [activeTab, setActiveTab] = useState<'withdraw' | 'income'>(() => {
    const saved = localStorage.getItem('wallet_active_tab');
    return saved === 'income' ? 'income' : 'withdraw';
  });
  const [loading, setLoading] = useState(cachedDetail.withdrawals.length === 0 && cachedDetail.incomes.length === 0);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;

    const run = async (force = false) => {
      const cached = getWalletDetailCache();
      const freshEnough = Date.now() - cached.updatedAt < WALLET_DETAIL_CACHE_TTL_MS;
      if (!force && freshEnough) {
        if (mounted) {
          setWithdrawals(cached.withdrawals);
          setIncomes(cached.incomes);
          setBalance(cached.balance);
          setFrozen(cached.frozen);
          setWalletCache(cached.balance, cached.frozen);
          setLoading(false);
        }
        return;
      }

      if (mounted && cached.updatedAt === 0) {
        setLoading(true);
      }
      if (mounted) setError('');

      const [walletRes, incomeRes] = await Promise.allSettled([
        apiRequest('/api/wallet'),
        apiRequest('/api/task-history'),
      ]);

      if (!mounted) return;

      if (walletRes.status === 'fulfilled' && incomeRes.status === 'fulfilled') {
        const walletData = walletRes.value;
        const incomeData = incomeRes.value;

        const b = Number(walletData.balance || 0);
        const f = Number(walletData.frozen || 0);
        const nextWithdrawals = Array.isArray(walletData.withdrawals) ? walletData.withdrawals : [];
        const nextIncomes = Array.isArray(incomeData.items) ? incomeData.items : [];

        setBalance(b);
        setFrozen(f);
        setWithdrawals(nextWithdrawals);
        setIncomes(nextIncomes);

        setWalletCache(b, f);
        setWalletDetailCache(b, f, nextWithdrawals, nextIncomes);
        setLoading(false);
        return;
      }

      // Keep previous snapshot to avoid mixed/contradictory UI state.
      if (cached.updatedAt > 0) {
        setWithdrawals(cached.withdrawals);
        setIncomes(cached.incomes);
        setBalance(cached.balance);
        setFrozen(cached.frozen);
        setWalletCache(cached.balance, cached.frozen);
      }
      setLoading(false);
      setError('Jaringan sedang sibuk. Menampilkan data terakhir.');
    };

    run();

    const onVisible = () => {
      if (document.visibilityState === 'visible') run(true);
    };
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      mounted = false;
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, []);

  const userAge = Number(localStorage.getItem('userAge') || 0);
  const isUnderage = userAge > 0 && userAge < 18;

  const balanceRupiah = balance * 10;

  const withdrawTransactions = useMemo(() => {
    return withdrawals.map((w, index) => ({
      id: w.id || String(index),
      status: (w.status || 'processing') as 'processing' | 'completed' | 'failed',
      title: 'Penarikan',
      note: `via ${(w.destination || 'DANA').toUpperCase()}${w.danaAccount ? ` · ${w.danaAccount}` : ''}`,
      amountDiamond: Number(w.amount || 0),
      amountRp: Number(w.amount || 0) * 10,
      date: new Date(w.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      time: new Date(w.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    }));
  }, [withdrawals]);

  const diamondTransactions = useMemo(() => {
    const incomeRows = incomes.map((item) => ({
      id: `in_${item.id}`,
      title: 'Pemasukan',
      note: 'dari tugas',
      amountDiamond: Number(item.reward || 0),
      kind: 'plus' as const,
      ts: new Date(item.completedAt).getTime(),
      date: new Date(item.completedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      time: new Date(item.completedAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    }));

    const expenseRows = withdrawals.map((w) => ({
      id: `out_${w.id}`,
      title: 'Pengeluaran',
      note: 'untuk penarikan',
      amountDiamond: Number(w.amount || 0),
      kind: 'minus' as const,
      ts: new Date(w.createdAt).getTime(),
      date: new Date(w.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      time: new Date(w.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    }));

    return [...incomeRows, ...expenseRows].sort((a, b) => b.ts - a.ts);
  }, [incomes, withdrawals]);

  useEffect(() => {
    localStorage.setItem('wallet_active_tab', activeTab);
  }, [activeTab]);

  return (
    <>
      <div className="px-6 py-4 flex items-center gap-4 border-b bg-white" style={{ borderColor: '#E9ECEF' }}>
        <button
          onClick={() => navigate('/profile')}
          className="flex items-center justify-center w-10 h-10 rounded-full transition-all hover:bg-gray-100 active:scale-95"
        >
          <ArrowLeft size={24} style={{ color: '#1E293B' }} />
        </button>
        <h1 className="text-xl" style={{ color: '#1E293B', fontWeight: '700' }}>
          Dompet Saya
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-5" style={{ backgroundColor: '#F3F5F7' }}>
        <div
          className="mb-4 p-5 rounded-2xl relative overflow-hidden"
          style={{
            background: 'linear-gradient(140deg, #F97316 0%, #FB923C 100%)',
            boxShadow: '0 8px 20px rgba(249, 115, 22, 0.22)'
          }}
        >

          <div className="text-sm mb-2" style={{ color: '#FFF7ED', fontWeight: '500' }}>
            Saldo Tersedia
          </div>
          <div className="flex items-center gap-2 mb-1">
            <span style={{ fontSize: '24px' }}>💎</span>
            <span className="text-3xl" style={{ color: '#FFFFFF', fontWeight: '700' }}>
              {balance.toLocaleString('id-ID', { maximumFractionDigits: 0 })}
            </span>
          </div>
          <div className="text-sm mb-2" style={{ color: '#FFF7ED', fontWeight: '500' }}>
            = Rp {balanceRupiah.toLocaleString('id-ID', { maximumFractionDigits: 0 })}
          </div>

          <div className="mb-3" />

          {isUnderage && (
            <div className="mb-3 p-3 rounded-xl" style={{ backgroundColor: '#FEF2F2', color: '#B91C1C', fontWeight: 700 }}>
              App ini hanya untuk pengguna dewasa (18+). Fitur penarikan dinonaktifkan.
            </div>
          )}

          <button
            onClick={() => !isUnderage && navigate('/withdrawal', { state: { from: 'my-wallet' } })}
            disabled={isUnderage}
            className="w-full py-3 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-98"
            style={{
              backgroundColor: isUnderage ? '#E2E8F0' : '#FFFFFF',
              color: isUnderage ? '#94A3B8' : '#F97316',
              fontWeight: '700',
              boxShadow: isUnderage ? 'none' : '0 2px 8px rgba(0, 0, 0, 0.1)',
              cursor: isUnderage ? 'not-allowed' : 'pointer'
            }}
          >
            <Wallet size={20} />
            <span>Tarik Tunai</span>
          </button>
        </div>

        <div className="p-3 rounded-2xl" style={{ backgroundColor: '#FFFFFF', boxShadow: '0 1px 3px rgba(15,23,42,0.06)' }}>
          <h3 className="text-sm mb-3" style={{ color: '#64748B', fontWeight: '700', letterSpacing: 0.3 }}>
            RIWAYAT
          </h3>

          <div className="mb-3 p-1 rounded-xl grid grid-cols-2 gap-1" style={{ backgroundColor: '#EEF2F7' }}>
            <button
              onClick={() => setActiveTab('withdraw')}
              className="px-3 py-2 rounded-lg text-xs"
              style={{
                backgroundColor: activeTab === 'withdraw' ? '#FFFFFF' : 'transparent',
                color: activeTab === 'withdraw' ? '#F97316' : '#64748B',
                fontWeight: 700,
                boxShadow: activeTab === 'withdraw' ? '0 1px 2px rgba(15,23,42,0.06)' : 'none'
              }}
            >
              Penarikan
            </button>
            <button
              onClick={() => setActiveTab('income')}
              className="px-3 py-2 rounded-lg text-xs"
              style={{
                backgroundColor: activeTab === 'income' ? '#FFFFFF' : 'transparent',
                color: activeTab === 'income' ? '#10B981' : '#64748B',
                fontWeight: 700,
                boxShadow: activeTab === 'income' ? '0 1px 2px rgba(15,23,42,0.06)' : 'none'
              }}
            >
              Pemasukan
            </button>
          </div>

          {loading && <div className="text-sm" style={{ color: '#64748B' }}>Memuat data dompet...</div>}
          {error && <div className="text-sm" style={{ color: '#EF4444' }}>{error}</div>}

          {!loading && !error && activeTab === 'withdraw' && withdrawTransactions.length === 0 && (
            <div className="text-sm" style={{ color: '#64748B' }}>Belum ada penarikan.</div>
          )}

          {!loading && !error && activeTab === 'income' && diamondTransactions.length === 0 && (
            <div className="text-sm" style={{ color: '#64748B' }}>Belum ada mutasi diamond.</div>
          )}

          {activeTab === 'withdraw' ? (
            <div className="space-y-3">
              {withdrawTransactions.map((transaction) => {
                const statusStyle =
                  transaction.status === 'completed'
                    ? { color: '#10B981', bg: '#DCFCE7', label: 'Berhasil' }
                    : transaction.status === 'failed'
                      ? { color: '#EF4444', bg: '#FEF2F2', label: 'Gagal' }
                      : { color: '#F59E0B', bg: '#FFFBEB', label: 'Diproses' };

                return (
                  <div
                    key={transaction.id}
                    className="p-3 rounded-xl"
                    style={{
                      backgroundColor: '#FFFFFF',
                      boxShadow: '0 1px 2px rgba(15, 23, 42, 0.04)',
                      border: '1px solid #EEF2F7'
                    }}
                  >
                    <div className="grid grid-cols-[1fr_auto] items-start gap-3">
                      <div className="min-w-0">
                        <div className="text-sm mb-1" style={{ color: '#1E293B', fontWeight: '700' }}>
                          {transaction.title}
                        </div>
                        <div className="text-xs mb-1 truncate" style={{ color: '#64748B', fontWeight: '600' }} title={transaction.note}>
                          {transaction.note}
                        </div>
                        <div className="text-xs" style={{ color: '#94A3B8', fontWeight: '500' }}>
                          {transaction.date} • {transaction.time}
                        </div>
                      </div>
                      <div className="text-right min-w-[128px]">
                        <div className="flex items-center justify-end gap-1">
                          <span
                            className="text-base"
                            style={{
                              color: statusStyle.color,
                              fontWeight: '700'
                            }}
                          >
                            Rp {transaction.amountRp.toLocaleString('id-ID', { maximumFractionDigits: 0 })}
                          </span>
                        </div>
                        <div className="mt-1 inline-flex px-2 py-1 rounded-full text-[11px]" style={{ backgroundColor: statusStyle.bg, color: statusStyle.color, fontWeight: 700 }}>
                          {statusStyle.label}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-3">
              {diamondTransactions.map((item) => {
                const positive = item.kind === 'plus';
                return (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl"
                    style={{
                      backgroundColor: '#FFFFFF',
                      boxShadow: '0 1px 2px rgba(15, 23, 42, 0.04)',
                      border: '1px solid #EEF2F7'
                    }}
                  >
                    <div className="grid grid-cols-[1fr_auto] items-center gap-3">
                      <div className="min-w-0">
                        <div className="text-sm mb-1 truncate" style={{ color: '#1E293B', fontWeight: '700', lineHeight: 1.25 }} title={item.title}>
                          {item.title}
                        </div>
                        <div className="text-xs mb-1 truncate" style={{ color: '#64748B', fontWeight: '600', lineHeight: 1.25 }} title={item.note}>
                          {item.note}
                        </div>
                        <div className="text-xs" style={{ color: '#94A3B8', fontWeight: '500', lineHeight: 1.2 }}>
                          {item.date} • {item.time}
                        </div>
                      </div>
                      <div className="text-right min-w-[88px]">
                        <div className="inline-flex items-center justify-end gap-1 leading-none px-2 py-1 rounded-lg" style={{ backgroundColor: positive ? '#ECFDF5' : '#FEF2F2' }}>
                          <span style={{ fontSize: '13px', opacity: 0.95 }}>💎</span>
                          <span
                            className="text-sm"
                            style={{ color: positive ? '#10B981' : '#EF4444', fontWeight: '700', letterSpacing: 0.1 }}
                          >
                            {positive ? '+' : '-'}{Number(item.amountDiamond || 0).toLocaleString('id-ID', { maximumFractionDigits: 0 })}
                          </span>
                        </div>

                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .active\\:scale-98:active {
          transform: scale(0.98);
        }
        .active\\:scale-95:active {
          transform: scale(0.95);
        }
      `}</style>
    </>
  );
}
