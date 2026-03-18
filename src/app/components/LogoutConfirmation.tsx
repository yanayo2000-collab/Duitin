import { AlertCircle, X } from 'lucide-react';

interface LogoutConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function LogoutConfirmation({ isOpen, onClose, onConfirm }: LogoutConfirmationProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center px-6"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={onClose}
    >
      <div 
        className="w-full max-w-sm rounded-2xl p-6 relative"
        style={{ 
          backgroundColor: '#FFFFFF',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
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
            className="flex items-center justify-center w-16 h-16 rounded-full"
            style={{ 
              backgroundColor: '#FEF2F2',
              border: '2px solid #FEE2E2'
            }}
          >
            <AlertCircle size={32} style={{ color: '#EF4444' }} />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-center text-xl mb-2" style={{ color: '#1E293B', fontWeight: '700' }}>
          Keluar dari Akun?
        </h2>

        {/* Description */}
        <p className="text-center text-sm mb-6 leading-relaxed" style={{ color: '#64748B' }}>
          Anda akan keluar dari akun Duitin. Data dan saldo Anda tetap aman tersimpan. Anda bisa login kembali kapan saja.
        </p>

        {/* Info Box */}
        <div 
          className="p-3 rounded-xl mb-6"
          style={{ 
            backgroundColor: '#EFF6FF',
            border: '1px solid #DBEAFE'
          }}
        >
          <p className="text-xs leading-relaxed" style={{ color: '#1E40AF' }}>
            <span style={{ fontWeight: '600' }}>💡 Catatan:</span> Ini bukan penghapusan akun. Semua data, saldo 💎, dan riwayat transaksi Anda akan tetap tersimpan dengan aman.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <button
            onClick={onConfirm}
            className="w-full py-3 rounded-xl transition-all active:scale-98"
            style={{ 
              backgroundColor: '#EF4444',
              color: '#FFFFFF',
              fontWeight: '600',
              boxShadow: '0 2px 8px rgba(239, 68, 68, 0.25)'
            }}
          >
            Ya, Keluar
          </button>
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl transition-all active:scale-98"
            style={{ 
              backgroundColor: '#F8F9FA',
              color: '#1E293B',
              fontWeight: '600'
            }}
          >
            Batal
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
      `}</style>
    </div>
  );
}
