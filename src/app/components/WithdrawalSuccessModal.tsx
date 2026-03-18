import { CheckCircle, X } from 'lucide-react';

interface WithdrawalSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  destination: string;
  accountNumber: string;
}

export function WithdrawalSuccessModal({
  isOpen,
  onClose,
  amount,
  destination,
  accountNumber
}: WithdrawalSuccessModalProps) {
  if (!isOpen) return null;

  const amountRupiah = amount * 10;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center px-6"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={onClose}
    >
      <div 
        className="w-full max-w-sm rounded-2xl p-6 relative animate-scale-in"
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

        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <div 
            className="flex items-center justify-center w-16 h-16 rounded-full"
            style={{ 
              backgroundColor: '#F0FDF4',
              border: '3px solid #DCFCE7'
            }}
          >
            <CheckCircle size={36} style={{ color: '#10B981' }} strokeWidth={2.5} />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-center text-xl mb-2" style={{ color: '#10B981', fontWeight: '700' }}>
          Penarikan Berhasil!
        </h2>

        {/* Subtitle */}
        <p className="text-center text-sm mb-5" style={{ color: '#64748B' }}>
          Dana akan masuk dalam 1x24 jam
        </p>

        {/* Amount */}
        <div 
          className="p-4 rounded-xl mb-5"
          style={{ 
            backgroundColor: '#FFFBEB',
            border: '2px solid #FEF3C7'
          }}
        >
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span style={{ fontSize: '20px' }}>💎</span>
              <span className="text-2xl" style={{ color: '#F97316', fontWeight: '700' }}>
                {amount.toLocaleString('id-ID', { maximumFractionDigits: 0 })}
              </span>
            </div>
            <p className="text-sm" style={{ color: '#78716C', fontWeight: '500' }}>
              Rp {amountRupiah.toLocaleString('id-ID', { maximumFractionDigits: 0 })}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl transition-all active:scale-98"
          style={{ 
            backgroundColor: '#F97316',
            color: '#FFFFFF',
            fontWeight: '600',
            boxShadow: '0 2px 8px rgba(249, 115, 22, 0.25)'
          }}
        >
          Mengerti
        </button>
      </div>

      <style>{`
        .active\\:scale-98:active {
          transform: scale(0.98);
        }
        .active\\:scale-95:active {
          transform: scale(0.95);
        }
        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scale-in {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}