import { ArrowLeft, Clock, CheckCircle, XCircle, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useEffect, useMemo, useState } from 'react';
import { apiRequest } from '../../lib/api';

type Row = {
  id: string;
  amount: number;
  status: string;
  createdAt: string;
};

export function WithdrawalHistory() {
  const navigate = useNavigate();
  const [withdrawals, setWithdrawals] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;

    const run = async () => {
      try {
        if (mounted) setLoading(true);
        if (mounted) setError('');
        const data = await apiRequest('/api/withdrawals');
        if (!mounted) return;
        setWithdrawals(Array.isArray(data.items) ? data.items : []);
      } catch (e) {
        if (mounted) setError(e instanceof Error ? e.message : 'Gagal memuat riwayat');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    run();
    const timer = setInterval(run, 3000);

    return () => {
      mounted = false;
      clearInterval(timer);
    };
  }, []);

  const viewData = useMemo(() => {
    return withdrawals.map((w) => ({
      id: w.id,
      amount: Number(w.amount || 0),
      amountRupiah: Number(w.amount || 0) * 10,
      destination: 'DANA',
      accountNumber: '************',
      status: w.status || 'processing',
      date: new Date(w.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      time: new Date(w.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      transactionId: w.id,
      failReason: w.status === 'failed' ? 'Permintaan gagal diproses' : '',
    }));
  }, [withdrawals]);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'processing':
        return {
          icon: Clock,
          text: 'Sedang Diproses',
          color: '#F97316',
          bgColor: '#FFF7ED',
          borderColor: '#FFEDD5'
        };
      case 'completed':
        return {
          icon: CheckCircle,
          text: 'Berhasil',
          color: '#10B981',
          bgColor: '#DCFCE7',
          borderColor: '#BBF7D0'
        };
      case 'failed':
        return {
          icon: XCircle,
          text: 'Gagal',
          color: '#EF4444',
          bgColor: '#FEF2F2',
          borderColor: '#FECACA'
        };
      default:
        return {
          icon: Clock,
          text: 'Unknown',
          color: '#64748B',
          bgColor: '#F1F5F9',
          borderColor: '#E2E8F0'
        };
    }
  };

  return (
    <>
      <div className="px-6 py-4 flex items-center gap-4 border-b bg-white" style={{ borderColor: '#E9ECEF' }}>
        <button
          onClick={() => navigate('/my-wallet')}
          className="flex items-center justify-center w-10 h-10 rounded-full transition-all hover:bg-gray-100 active:scale-95"
        >
          <ArrowLeft size={24} style={{ color: '#1E293B' }} />
        </button>
        <h1 className="text-xl" style={{ color: '#1E293B', fontWeight: '700' }}>
          Riwayat Penarikan
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6" style={{ backgroundColor: '#F8F9FA' }}>
        {loading && <div className="text-sm" style={{ color: '#64748B' }}>Memuat riwayat...</div>}
        {error && <div className="text-sm" style={{ color: '#EF4444' }}>{error}</div>}

        <div className="space-y-4">
          {viewData.map((withdrawal) => {
            const statusConfig = getStatusConfig(withdrawal.status);
            const StatusIcon = statusConfig.icon;

            return (
              <div
                key={withdrawal.id}
                className="p-5 rounded-xl"
                style={{
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                  border: '1px solid #E9ECEF'
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                    style={{
                      backgroundColor: statusConfig.bgColor,
                      border: `1px solid ${statusConfig.borderColor}`
                    }}
                  >
                    <StatusIcon size={14} style={{ color: statusConfig.color }} />
                    <span
                      className="text-xs"
                      style={{
                        color: statusConfig.color,
                        fontWeight: '700'
                      }}
                    >
                      {statusConfig.text}
                    </span>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-1 justify-end mb-0.5">
                      <span style={{ fontSize: '16px' }}>💎</span>
                      <span
                        className="text-xl"
                        style={{
                          color: '#1E293B',
                          fontWeight: '700'
                        }}
                      >
                        {withdrawal.amount.toLocaleString('id-ID', { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <div className="text-xs" style={{ color: '#64748B', fontWeight: '500' }}>
                      Rp {withdrawal.amountRupiah.toLocaleString('id-ID', { maximumFractionDigits: 0 })}
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5 mb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm" style={{ color: '#64748B', fontWeight: '500' }}>
                      Tujuan
                    </span>
                    <div className="text-right">
                      <div className="text-sm mb-0.5" style={{ color: '#1E293B', fontWeight: '600' }}>
                        {withdrawal.destination}
                      </div>
                      <div className="text-xs" style={{ color: '#94A3B8', fontWeight: '500' }}>
                        {withdrawal.accountNumber}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm" style={{ color: '#64748B', fontWeight: '500' }}>
                      Waktu Pengajuan
                    </span>
                    <span className="text-sm" style={{ color: '#1E293B', fontWeight: '600' }}>
                      {withdrawal.date} • {withdrawal.time}
                    </span>
                  </div>

                  {withdrawal.status === 'failed' && withdrawal.failReason && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm" style={{ color: '#64748B', fontWeight: '500' }}>
                        Alasan Gagal
                      </span>
                      <span className="text-sm" style={{ color: '#EF4444', fontWeight: '600' }}>
                        {withdrawal.failReason}
                      </span>
                    </div>
                  )}

                  <div
                    className="pt-2.5"
                    style={{ borderTop: '1px solid #E9ECEF' }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs" style={{ color: '#94A3B8', fontWeight: '500' }}>
                        ID Transaksi
                      </span>
                      <span className="text-xs font-mono" style={{ color: '#64748B', fontWeight: '600' }}>
                        {withdrawal.transactionId}
                      </span>
                    </div>
                  </div>
                </div>

                {withdrawal.status === 'processing' && (
                  <div
                    className="mt-3 p-3 rounded-lg"
                    style={{
                      backgroundColor: '#FFF7ED',
                      border: '1px solid #FFEDD5'
                    }}
                  >
                    <p className="text-xs" style={{ color: '#F97316', fontWeight: '500' }}>
                      Penarikan sedang diproses. Dana akan masuk ke akun Anda dalam 1-3 hari kerja.
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!loading && !error && viewData.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
              style={{ backgroundColor: '#F1F5F9' }}
            >
              <ArrowUpRight size={32} style={{ color: '#94A3B8' }} />
            </div>
            <h3 className="text-base mb-2" style={{ color: '#1E293B', fontWeight: '700' }}>
              Belum Ada Penarikan
            </h3>
            <p className="text-sm text-center" style={{ color: '#64748B', fontWeight: '500' }}>
              Riwayat penarikan Anda akan muncul di sini
            </p>
          </div>
        )}
      </div>

      <style>{`
        .active\\:scale-95:active {
          transform: scale(0.95);
        }
      `}</style>
    </>
  );
}
