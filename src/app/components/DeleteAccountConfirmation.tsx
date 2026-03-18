import { AlertTriangle, X } from 'lucide-react';

interface DeleteAccountConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  currentBalance: number;
}

export function DeleteAccountConfirmation({ isOpen, onClose, onConfirm, currentBalance }: DeleteAccountConfirmationProps) {
  if (!isOpen) return null;

  const hasBalance = currentBalance > 0;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center px-6"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
      onClick={onClose}
    >
      <div 
        className="w-full max-w-sm rounded-2xl p-6 relative"
        style={{ 
          backgroundColor: '#FFFFFF',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all active:scale-95"
          style={{ backgroundColor: '#F8F9FA' }}
        >
          <X size={18} style={{ color: '#64748B' }} />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div 
            className="flex items-center justify-center w-20 h-20 rounded-full animate-pulse"
            style={{ 
              backgroundColor: '#FEF2F2',
              border: '3px solid #FEE2E2'
            }}
          >
            <AlertTriangle size={40} style={{ color: '#EF4444' }} />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-center text-xl mb-2" style={{ color: '#EF4444', fontWeight: '700' }}>
          Konfirmasi Terakhir!
        </h2>

        {/* Description */}
        <p className="text-center text-sm mb-4 leading-relaxed" style={{ color: '#1E293B', fontWeight: '600' }}>
          Tindakan ini TIDAK DAPAT DIBATALKAN
        </p>

        {/* Balance Warning */}
        {hasBalance && (
          <div 
            className="p-4 rounded-xl mb-4 animate-pulse"
            style={{ 
              backgroundColor: '#FEF2F2',
              border: '2px solid #EF4444'
            }}
          >
            <div className="text-center">
              <p className="text-xs mb-2" style={{ color: '#EF4444', fontWeight: '700' }}>
                ⚠️ ANDA AKAN KEHILANGAN:
              </p>
              <div className="flex items-center justify-center gap-2 mb-1">
                <span style={{ fontSize: '20px' }}>💎</span>
                <span className="text-2xl" style={{ color: '#EF4444', fontWeight: '700' }}>
                  {currentBalance.toLocaleString('id-ID', { maximumFractionDigits: 0 })}
                </span>
              </div>
              <p className="text-sm" style={{ color: '#64748B', fontWeight: '600' }}>
                = Rp {(currentBalance * 10).toLocaleString('id-ID', { maximumFractionDigits: 0 })}
              </p>
            </div>
          </div>
        )}

        {/* Consequences List */}
        <div 
          className="p-4 rounded-xl mb-6"
          style={{ 
            backgroundColor: '#F8F9FA',
            border: '1px solid #E9ECEF'
          }}
        >
          <p className="text-xs mb-2" style={{ color: '#1E293B', fontWeight: '700' }}>
            Setelah penghapusan:
          </p>
          <ul className="space-y-1">
            <li className="text-xs" style={{ color: '#64748B' }}>
              • Semua data akan dihapus permanen
            </li>
            <li className="text-xs" style={{ color: '#64748B' }}>
              • Tidak dapat login dengan akun yang sama
            </li>
            <li className="text-xs" style={{ color: '#64748B' }}>
              • Saldo dan reward tidak dapat dikembalikan
            </li>
            <li className="text-xs" style={{ color: '#64748B' }}>
              • Tim support tidak dapat memulihkan akun
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <button
            onClick={onConfirm}
            className="w-full py-3.5 rounded-xl transition-all active:scale-98"
            style={{ 
              backgroundColor: '#EF4444',
              color: '#FFFFFF',
              fontWeight: '700',
              boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)',
              fontSize: '15px'
            }}
          >
            Saya Mengerti, Hapus Sekarang
          </button>
          <button
            onClick={onClose}
            className="w-full py-3.5 rounded-xl transition-all active:scale-98"
            style={{ 
              backgroundColor: '#F97316',
              color: '#FFFFFF',
              fontWeight: '600',
              boxShadow: '0 2px 8px rgba(249, 115, 22, 0.25)',
              fontSize: '15px'
            }}
          >
            Batalkan, Pertahankan Akun Saya
          </button>
        </div>
      </div>

      <style>{`
        .active\\:scale-98:active {
          transform: scale(0.98);
        }
        .active\\:scale-95:active {
          transform: scale(0.95);
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
