import { RefreshCw, MessageCircle, X } from 'lucide-react';

interface WithdrawalFailureModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  failReason: 'insufficient_balance' | 'account_invalid' | 'system_error' | 'daily_limit' | 'maintenance';
  onRetry: () => void;
  onContactSupport: () => void;
  onGoBack: () => void;
}

export function WithdrawalFailureModal({
  isOpen,
  onClose,
  amount,
  failReason,
  onRetry,
  onContactSupport,
  onGoBack
}: WithdrawalFailureModalProps) {
  if (!isOpen) return null;

  const amountRupiah = amount * 10;

  const getFailureConfig = (reason: string) => {
    switch (reason) {
      case 'insufficient_balance':
        return {
          title: 'Saldo Tidak Mencukupi',
          description: 'Saldo Anda tidak mencukupi untuk melakukan penarikan ini.',
          icon: '💸',
          canRetry: false
        };
      case 'account_invalid':
        return {
          title: 'Informasi Akun Tidak Valid',
          description: 'Nomor atau nama akun DANA yang Anda masukkan tidak valid.',
          icon: '❌',
          canRetry: true
        };
      case 'daily_limit':
        return {
          title: 'Batas Harian Tercapai',
          description: 'Anda telah mencapai batas maksimal penarikan harian.',
          icon: '⏰',
          canRetry: false
        };
      case 'maintenance':
        return {
          title: 'Sistem Sedang Maintenance',
          description: 'Sistem penarikan sedang dalam pemeliharaan. Silakan coba lagi nanti.',
          icon: '🔧',
          canRetry: true
        };
      case 'system_error':
      default:
        return {
          title: 'Terjadi Kesalahan',
          description: 'Terjadi kesalahan saat memproses penarikan Anda.',
          icon: '⚠️',
          canRetry: true
        };
    }
  };

  const config = getFailureConfig(failReason);

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

        {/* Error Icon */}
        <div className="flex justify-center mb-4">
          <div 
            className="flex items-center justify-center w-16 h-16 rounded-full"
            style={{ 
              backgroundColor: '#FEF2F2',
              border: '3px solid #FEE2E2'
            }}
          >
            <div className="text-4xl">
              {config.icon}
            </div>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-center text-xl mb-2" style={{ color: '#EF4444', fontWeight: '700' }}>
          {config.title}
        </h2>

        {/* Description */}
        <p className="text-center text-sm mb-5" style={{ color: '#64748B' }}>
          {config.description}
        </p>

        {/* Failed Amount */}
        <div 
          className="p-4 rounded-xl mb-5"
          style={{ 
            backgroundColor: '#FEF2F2',
            border: '2px solid #FEE2E2'
          }}
        >
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span style={{ fontSize: '20px' }}>💎</span>
              <span className="text-2xl" style={{ color: '#EF4444', fontWeight: '700' }}>
                {amount.toLocaleString('id-ID', { maximumFractionDigits: 0 })}
              </span>
            </div>
            <p className="text-sm" style={{ color: '#78716C', fontWeight: '500' }}>
              Rp {amountRupiah.toLocaleString('id-ID', { maximumFractionDigits: 0 })}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          {config.canRetry && (
            <button
              onClick={onRetry}
              className="w-full py-3 rounded-xl transition-all active:scale-98 flex items-center justify-center gap-2"
              style={{ 
                backgroundColor: '#F97316',
                color: '#FFFFFF',
                fontWeight: '600',
                boxShadow: '0 2px 8px rgba(249, 115, 22, 0.25)'
              }}
            >
              <RefreshCw size={18} />
              <span>Coba Lagi</span>
            </button>
          )}
          
          <button
            onClick={onContactSupport}
            className="w-full py-3 rounded-xl transition-all active:scale-98 flex items-center justify-center gap-2"
            style={{ 
              backgroundColor: config.canRetry ? '#F8F9FA' : '#F97316',
              color: config.canRetry ? '#1E293B' : '#FFFFFF',
              fontWeight: '600',
              border: config.canRetry ? '2px solid #E9ECEF' : 'none',
              boxShadow: config.canRetry ? 'none' : '0 2px 8px rgba(249, 115, 22, 0.25)'
            }}
          >
            <MessageCircle size={18} />
            <span>Hubungi Support</span>
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