import { CheckCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router';
import { goBack } from '../../lib/nav';

export function WithdrawSuccess() {
  const navigate = useNavigate();

  return (
    <>
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto flex flex-col items-center justify-center px-6" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="w-full max-w-sm">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div 
              className="flex items-center justify-center w-24 h-24 rounded-full"
              style={{ 
                background: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
                boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)'
              }}
            >
              <CheckCircle size={48} style={{ color: '#FFFFFF' }} strokeWidth={2.5} />
            </div>
          </div>

          {/* Success Message */}
          <div className="text-center mb-8">
            <h1 className="text-2xl mb-2" style={{ color: '#1E293B', fontWeight: '700' }}>
              Penarikan Berhasil!
            </h1>
            <p className="text-sm" style={{ color: '#64748B' }}>
              Permintaan penarikan Anda sedang diproses
            </p>
          </div>

          {/* Transaction Details */}
          <div 
            className="p-5 rounded-xl mb-6"
            style={{ 
              backgroundColor: '#FFFFFF',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)'
            }}
          >
            <div className="flex items-center justify-between mb-4 pb-4" style={{ borderBottom: '1px solid #E9ECEF' }}>
              <span className="text-sm" style={{ color: '#64748B' }}>
                Jumlah Penarikan
              </span>
              <div className="text-right">
                <div className="flex items-center gap-1 justify-end mb-1">
                  <span style={{ fontSize: '18px' }}>💎</span>
                  <span className="text-lg" style={{ color: '#F97316', fontWeight: '700' }}>
                    50.000
                  </span>
                </div>
                <div className="text-xs" style={{ color: '#94A3B8' }}>
                  = Rp 500.000
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-3">
              <span className="text-sm" style={{ color: '#64748B' }}>
                Metode Pembayaran
              </span>
              <div className="flex items-center gap-2">
                <div 
                  className="px-2 py-1 rounded"
                  style={{ backgroundColor: '#0081A0' }}
                >
                  <span className="text-xs" style={{ color: '#FFFFFF', fontWeight: '700' }}>
                    DANA
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-3">
              <span className="text-sm" style={{ color: '#64748B' }}>
                Nomor Tujuan
              </span>
              <span className="text-sm" style={{ color: '#1E293B', fontWeight: '600' }}>
                0812-3456-7890
              </span>
            </div>

            <div className="flex items-center justify-between mb-3">
              <span className="text-sm" style={{ color: '#64748B' }}>
                Waktu Permintaan
              </span>
              <span className="text-sm" style={{ color: '#1E293B', fontWeight: '600' }}>
                9 Mar 2026, 14:32
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm" style={{ color: '#64748B' }}>
                ID Transaksi
              </span>
              <span className="text-sm" style={{ color: '#1E293B', fontWeight: '600' }}>
                TRX-2026-03-09-4521
              </span>
            </div>
          </div>

          {/* Info Box */}
          <div 
            className="p-4 rounded-xl mb-6"
            style={{ 
              backgroundColor: '#EFF6FF',
              border: '1px solid #DBEAFE'
            }}
          >
            <p className="text-sm leading-relaxed" style={{ color: '#1E40AF' }}>
              <span style={{ fontWeight: '600' }}>Estimasi waktu:</span> Dana akan masuk ke rekening Anda dalam 1-3 hari kerja. Anda akan mendapat notifikasi saat dana sudah diterima.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button 
              onClick={() => navigate('/history')}
              className="w-full py-3 rounded-xl transition-all active:scale-98 flex items-center justify-center gap-2"
              style={{ 
                backgroundColor: '#F97316',
                color: '#FFFFFF',
                fontWeight: '600',
                boxShadow: '0 2px 8px rgba(249, 115, 22, 0.25)'
              }}
            >
              Lihat Riwayat
              <ArrowRight size={18} />
            </button>
            <button 
              onClick={() => goBack(navigate)}
              className="w-full py-3 rounded-xl transition-all active:scale-98"
              style={{ 
                backgroundColor: 'transparent',
                color: '#F97316',
                fontWeight: '600',
                border: '1.5px solid #F97316'
              }}
            >
              Kembali ke Beranda
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .active\\:scale-98:active {
          transform: scale(0.98);
        }
      `}</style>
    </>
  );
}
