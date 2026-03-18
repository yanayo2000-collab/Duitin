import { useEffect, useState } from 'react';
import { ArrowLeft, CheckCircle2, XCircle, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router';
import { API_BASE, clearToken } from '../../lib/api';

type Row = {
  id: string;
  userId: string;
  amount: number;
  destination?: string;
  danaAccount?: string;
  danaAccountName?: string;
  status: 'processing' | 'completed' | 'failed';
  createdAt: string;
  completedAt?: string;
  rejectedAt?: string;
  failReason?: string;
};

async function parseApiResponse(res: Response) {
  const text = await res.text();
  if (!text) return {} as any;
  try {
    return JSON.parse(text);
  } catch {
    const snippet = text.slice(0, 120).replace(/\s+/g, ' ');
    const looksHtml = /<!doctype|<html/i.test(text);
    if (looksHtml) {
      throw new Error(`Endpoint admin reset tidak ditemukan / bukan JSON (${res.status}). Pastikan backend terbaru di ${API_BASE} sedang berjalan.`);
    }
    throw new Error(`Respon API tidak valid (${res.status}): ${snippet}`);
  }
}

export function AdminWithdrawals() {
  const navigate = useNavigate();
  const [adminKey, setAdminKey] = useState(localStorage.getItem('duitin_admin_key') || 'duitin-admin');
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [busyId, setBusyId] = useState('');
  const [resetting, setResetting] = useState(false);
  const [resettingAgreement, setResettingAgreement] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await fetch(`${API_BASE}/api/admin/withdrawals`, {
        headers: { 'x-admin-key': adminKey },
      });
      const data = await parseApiResponse(res);
      if (!res.ok) throw new Error(data?.message || 'Gagal memuat data');
      setRows(Array.isArray(data.items) ? data.items : []);
      localStorage.setItem('duitin_admin_key', adminKey);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Gagal');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const act = async (id: string, action: 'approve' | 'reject') => {
    try {
      setBusyId(id + action);
      setError('');
      const res = await fetch(`${API_BASE}/api/admin/withdrawals/${id}/${action}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey,
        },
        body: action === 'reject' ? JSON.stringify({ reason: 'Ditolak oleh admin panel' }) : undefined,
      });
      const data = await parseApiResponse(res);
      if (!res.ok) throw new Error(data?.message || 'Aksi gagal');
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Aksi gagal');
    } finally {
      setBusyId('');
    }
  };

  const resetTestAccount = async () => {
    try {
      setResetting(true);
      setError('');
      const res = await fetch(`${API_BASE}/api/admin/test-account/reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey,
        },
        body: JSON.stringify({ userId: 'u_001' }),
      });
      const data = await parseApiResponse(res);
      if (!res.ok) throw new Error(data?.message || 'Reset gagal');
      const resetAt = String(data?.resetAt || new Date().toISOString());
      localStorage.setItem('duitin_reset_at', resetAt);
      localStorage.removeItem('onboardingCompleted');
      localStorage.removeItem('userAge');
      localStorage.removeItem('userGender');
      localStorage.removeItem('vipQualified');
      localStorage.removeItem('vipTaskListUnlocked');
      localStorage.removeItem('duitin_withdraw_agreement_v1');
      Object.keys(localStorage)
        .filter((k) => k.startsWith('duitin_withdraw_agreement_ack_'))
        .forEach((k) => localStorage.removeItem(k));
      localStorage.setItem('showOnboardingOnHome', '1');
      clearToken();
      sessionStorage.removeItem('duitin_session_ok');
      await load();
      navigate('/login');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Reset gagal');
    } finally {
      setResetting(false);
    }
  };

  const resetWithdrawAgreement = async () => {
    try {
      setResettingAgreement(true);
      setError('');
      const res = await fetch(`${API_BASE}/api/admin/withdraw-agreement/reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey,
        },
        body: JSON.stringify({ userId: 'u_001' }),
      });
      const data = await parseApiResponse(res);
      if (!res.ok) throw new Error(data?.message || 'Reset persetujuan gagal');
      localStorage.removeItem('duitin_withdraw_agreement_v1');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Reset persetujuan gagal');
    } finally {
      setResettingAgreement(false);
    }
  };

  return (
    <div className="h-full flex flex-col" style={{ background: '#F8F9FA' }}>
      <div className="px-6 py-4 flex items-center gap-3 border-b bg-white" style={{ borderColor: '#E9ECEF' }}>
        <button onClick={() => navigate('/profile')} className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#F1F5F9' }}>
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 style={{ fontSize: 18, fontWeight: 700, color: '#0F172A', lineHeight: 1.2 }}>Panel Persetujuan</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="p-4 rounded-2xl bg-white mb-4" style={{ boxShadow: '0 8px 20px rgba(15,23,42,0.06)' }}>
          <label className="text-sm" style={{ color: '#475569', fontWeight: 700 }}>Kunci Admin</label>
          <div className="flex flex-col gap-2 mt-3">
            <input
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              className="w-full px-3 py-2 rounded-xl"
              style={{ border: '1px solid #E2E8F0', fontWeight: 600, color: '#0F172A' }}
            />
            <button onClick={load} className="w-full px-4 py-2 rounded-xl flex items-center justify-center gap-2" style={{ background: '#F97316', color: 'white', fontWeight: 700 }}>
              <RefreshCw size={14} />
              <span>Muat Ulang</span>
            </button>
            <button
              onClick={resetTestAccount}
              disabled={resetting}
              className="w-full px-4 py-2 rounded-xl"
              style={{ background: '#0EA5E9', color: 'white', fontWeight: 700, opacity: resetting ? 0.7 : 1 }}
            >
              {resetting ? 'Mereset akun test...' : 'Reset Akun Test (u_001)'}
            </button>
            <button
              onClick={resetWithdrawAgreement}
              disabled={resettingAgreement}
              className="w-full px-4 py-2 rounded-xl"
              style={{ background: '#64748B', color: 'white', fontWeight: 700, opacity: resettingAgreement ? 0.7 : 1 }}
            >
              {resettingAgreement ? 'Mereset persetujuan...' : 'Reset Persetujuan Penarikan'}
            </button>
          </div>
          <p className="mt-2 text-xs" style={{ color: '#64748B' }}>
            Tombol reset akan menghapus riwayat tugas & penarikan akun test, mengatur saldo awal ke 💎0,
            lalu mengembalikan alur seperti akun baru (masuk dari login + onboarding muncul lagi).
          </p>
          {error && <p className="mt-2 text-sm" style={{ color: '#EF4444' }}>{error}</p>}
        </div>

        {loading ? (
          <p style={{ color: '#64748B' }}>Memuat...</p>
        ) : (
          <div className="space-y-3">
            {rows.map((w) => (
              <div key={w.id} className="p-4 rounded-xl bg-white" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="min-w-0 flex-1">
                    <div className="truncate" style={{ fontWeight: 700 }}>{w.id}</div>
                    <div className="text-xs mt-1" style={{ color: '#64748B' }}>
                      UID {w.userId}
                    </div>
                    <div className="text-xs" style={{ color: '#64748B' }}>
                      {new Date(w.createdAt).toLocaleString('id-ID', { maximumFractionDigits: 0 })}
                    </div>
                    <div className="text-xs mt-1" style={{ color: '#64748B' }}>
                      DANA {w.danaAccount || '-'}
                    </div>
                    <div className="text-xs" style={{ color: '#64748B' }}>
                      {w.danaAccountName || '-'}
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <div style={{ fontWeight: 800, color: '#0F172A' }}>
                      💎 {Number(w.amount || 0).toLocaleString('id-ID', { maximumFractionDigits: 0 })}
                    </div>
                    <div className="mt-2">
                      <span className="text-xs px-2 py-1 rounded-full" style={{
                        background: w.status === 'processing' ? '#FFF7ED' : w.status === 'completed' ? '#DCFCE7' : '#FEF2F2',
                        color: w.status === 'processing' ? '#F97316' : w.status === 'completed' ? '#10B981' : '#EF4444',
                        fontWeight: 700,
                      }}>{w.status === 'processing' ? 'DIPROSES' : w.status === 'completed' ? 'BERHASIL' : 'GAGAL'}</span>
                    </div>
                  </div>
                </div>

                {w.failReason && (
                  <div className="text-xs mb-3" style={{ color: '#EF4444' }}>{w.failReason}</div>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <button
                    disabled={w.status !== 'processing' || busyId === w.id + 'approve'}
                    onClick={() => act(w.id, 'approve')}
                    className="px-3 py-2 rounded-lg"
                    style={{ background: '#10B981', color: '#fff', fontWeight: 700, opacity: w.status !== 'processing' ? 0.5 : 1 }}
                  >
                    <CheckCircle2 size={14} style={{ display: 'inline-block', marginRight: 6 }} /> Setujui
                  </button>
                  <button
                    disabled={w.status !== 'processing' || busyId === w.id + 'reject'}
                    onClick={() => act(w.id, 'reject')}
                    className="px-3 py-2 rounded-lg"
                    style={{ background: '#EF4444', color: '#fff', fontWeight: 700, opacity: w.status !== 'processing' ? 0.5 : 1 }}
                  >
                    <XCircle size={14} style={{ display: 'inline-block', marginRight: 6 }} /> Tolak
                  </button>
                </div>
              </div>
            ))}

            {rows.length === 0 && <p style={{ color: '#64748B' }}>Belum ada penarikan.</p>}
          </div>
        )}
      </div>
    </div>
  );
}
