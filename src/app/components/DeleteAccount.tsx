import { ArrowLeft, AlertTriangle, TrendingDown, FileX, UserX, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { DeleteAccountConfirmation } from './DeleteAccountConfirmation';
import { apiRequest, getWalletCache, setWalletCache } from '../../lib/api';

export function DeleteAccount() {
  const navigate = useNavigate();
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showFinalConfirm, setShowFinalConfirm] = useState(false);
  const [currentBalance, setCurrentBalance] = useState(getWalletCache().balance);
  const hasBalance = currentBalance > 0;
  const isConfirmValid = agreedToTerms;

  useEffect(() => {
    let mounted = true;

    const loadWallet = async () => {
      try {
        const data = await apiRequest('/api/wallet');
        if (!mounted) return;
        const b = Number(data?.balance || 0);
        const f = Number(data?.frozen || 0);
        setCurrentBalance(b);
        setWalletCache(b, f);
      } catch {
        // Keep cached value on transient failures
      }
    };

    loadWallet();

    const onVisible = () => {
      if (document.visibilityState === 'visible') loadWallet();
    };
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      mounted = false;
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, []);

  const consequences = [
    {
      id: 1,
      icon: TrendingDown,
      iconColor: '#EF4444',
      iconBg: '#FEF2F2',
      title: 'Aset Akan Hilang',
      description: 'Semua saldo 💎, reward yang belum dicairkan, dan bonus akan hangus permanen.'
    },
    {
      id: 2,
      icon: FileX,
      iconColor: '#EF4444',
      iconBg: '#FEF2F2',
      title: 'Data Dihapus Permanen',
      description: 'Profil, riwayat tugas, dan riwayat penarikan akan dihapus selamanya.'
    },
    {
      id: 3,
      icon: UserX,
      iconColor: '#EF4444',
      iconBg: '#FEF2F2',
      title: 'Akses MCN Hilang',
      description: 'Status kreator dan chat dengan manajer eksklusif akan dihapus.'
    },
    {
      id: 4,
      icon: XCircle,
      iconColor: '#EF4444',
      iconBg: '#FEF2F2',
      title: 'Tidak Dapat Dipulihkan',
      description: 'Akun Google yang sama akan dianggap pengguna baru. Data lama tidak bisa dikembalikan.'
    },
  ];

  const handleDeleteClick = () => {
    if (!isConfirmValid) return;
    setShowFinalConfirm(true);
  };

  const handleFinalDelete = () => {
    setShowFinalConfirm(false);
    // Handle actual account deletion logic
    navigate('/login');
  };

  return (
    <>
      {/* Header */}
      <div className="px-6 py-4 flex items-center gap-4 border-b bg-white" style={{ borderColor: '#E9ECEF' }}>
        <button 
          onClick={() => navigate('/profile')} 
          className="flex items-center justify-center w-10 h-10 rounded-full transition-all hover:bg-gray-100 active:scale-95"
        >
          <ArrowLeft size={24} style={{ color: '#1E293B' }} />
        </button>
        <h1 className="text-xl" style={{ color: '#EF4444', fontWeight: '700' }}>
          Hapus Akun
        </h1>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto" style={{ backgroundColor: '#F8F9FA' }}>
        {/* Warning Header */}
        <div 
          className="px-6 py-6 mb-4"
          style={{ 
            backgroundColor: '#FEF2F2',
            borderBottom: '2px solid #FEE2E2'
          }}
        >
          <div className="flex justify-center mb-4">
            <div 
              className="flex items-center justify-center w-20 h-20 rounded-full"
              style={{ 
                backgroundColor: '#FFFFFF',
                border: '3px solid #FEE2E2'
              }}
            >
              <AlertTriangle size={40} style={{ color: '#EF4444' }} />
            </div>
          </div>
          
          <h2 className="text-center text-xl mb-2" style={{ color: '#1E293B', fontWeight: '700' }}>
            Yakin ingin menghapus akun Anda?
          </h2>
          
          {hasBalance && (
            <div 
              className="mt-4 p-4 rounded-xl"
              style={{ 
                backgroundColor: '#FFFFFF',
                border: '2px solid #EF4444'
              }}
            >
              <div className="text-center">
                <p className="text-sm mb-2" style={{ color: '#EF4444', fontWeight: '600' }}>
                  ⚠️ PERHATIAN: Anda masih memiliki saldo
                </p>
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span style={{ fontSize: '20px' }}>💎</span>
                  <span className="text-2xl" style={{ color: '#EF4444', fontWeight: '700' }}>
                    {currentBalance.toLocaleString('id-ID', { maximumFractionDigits: 0 })}
                  </span>
                </div>
                <p className="text-sm" style={{ color: '#64748B' }}>
                  = Rp {(currentBalance * 10).toLocaleString('id-ID', { maximumFractionDigits: 0 })} yang belum ditarik
                </p>
                <p className="text-xs mt-2" style={{ color: '#EF4444', fontWeight: '600' }}>
                  Semua saldo akan hilang permanen setelah penghapusan!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Consequences List */}
        <div className="px-6 pb-4">
          <h3 className="text-sm mb-3" style={{ color: '#64748B', fontWeight: '600' }}>
            APA YANG AKAN TERJADI SETELAH PENGHAPUSAN
          </h3>
          <div className="space-y-3">
            {consequences.map((item) => (
              <div 
                key={item.id}
                className="p-4 rounded-xl"
                style={{ 
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                }}
              >
                <div className="flex items-start gap-3">
                  <div 
                    className="flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.iconBg }}
                  >
                    <item.icon size={20} style={{ color: item.iconColor }} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm mb-1" style={{ color: '#1E293B', fontWeight: '600' }}>
                      {item.title}
                    </h4>
                    <p className="text-sm leading-relaxed" style={{ color: '#64748B' }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Confirmation Input */}
        <div className="px-6 pb-4">
          <h3 className="text-sm mb-3" style={{ color: '#64748B', fontWeight: '600' }}>
            KONFIRMASI PENGHAPUSAN
          </h3>
          {/* Agreement Checkbox */}
          <button
            onClick={() => setAgreedToTerms(!agreedToTerms)}
            className="w-full p-4 rounded-xl flex items-start gap-3 transition-all active:scale-98"
            style={{ 
              backgroundColor: '#FFFFFF',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
              border: agreedToTerms ? '2px solid #EF4444' : '2px solid transparent'
            }}
          >
            <div 
              className="flex items-center justify-center w-5 h-5 rounded flex-shrink-0 mt-0.5"
              style={{ 
                backgroundColor: agreedToTerms ? '#EF4444' : '#F8F9FA',
                border: agreedToTerms ? 'none' : '2px solid #CBD5E1'
              }}
            >
              {agreedToTerms && (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <p className="text-xs leading-relaxed text-left" style={{ color: '#1E293B' }}>
              Saya mengerti dan setuju untuk <span style={{ fontWeight: '700', color: '#EF4444' }}>menghapus semua data dan aset saya secara permanen</span>. Saya memahami bahwa tindakan ini tidak dapat dibatalkan.
            </p>
          </button>
        </div>

      </div>

      {/* Bottom Action Buttons */}
      <div 
        className="px-6 py-4 border-t bg-white space-y-2"
        style={{ borderColor: '#E9ECEF' }}
      >
        <button 
          onClick={() => navigate('/profile')}
          className="w-full py-3 rounded-xl transition-all active:scale-98"
          style={{ 
            backgroundColor: '#F97316',
            color: '#FFFFFF',
            fontWeight: '600',
            boxShadow: '0 2px 8px rgba(249, 115, 22, 0.25)'
          }}
        >
          Batal & Kembali
        </button>
        <button 
          onClick={handleDeleteClick}
          disabled={!isConfirmValid}
          className="w-full py-3 rounded-xl transition-all active:scale-98"
          style={{ 
            backgroundColor: isConfirmValid ? 'transparent' : '#F8F9FA',
            color: isConfirmValid ? '#EF4444' : '#CBD5E1',
            fontWeight: '600',
            border: isConfirmValid ? '2px solid #EF4444' : '2px solid #E9ECEF',
            cursor: isConfirmValid ? 'pointer' : 'not-allowed'
          }}
        >
          Hapus Akun Permanen
        </button>
      </div>

      {/* Final Confirmation Modal */}
      {showFinalConfirm && (
        <DeleteAccountConfirmation
          isOpen={showFinalConfirm}
          onConfirm={handleFinalDelete}
          onClose={() => setShowFinalConfirm(false)}
          currentBalance={currentBalance}
        />
      )}

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