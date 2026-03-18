import { ArrowLeft, Smartphone, Download, CheckCircle2, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router';
import { goBack } from '../../lib/nav';
import { useState } from 'react';
import { apiRequest, setWalletCache } from '../../lib/api';

export function DownloadApp() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: instructions, 2: verification, 3: completed
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const [claimError, setClaimError] = useState('');

  const reward = 2000;

  const handleDownload = () => {
    // Simulate download
    window.open('https://play.google.com', '_blank');
    setIsDownloaded(true);
  };

  const handleVerify = () => {
    if (isDownloaded && isRegistered) {
      setStep(3);
    }
  };

  const handleClaim = async () => {
    if (isClaiming) return;
    try {
      setIsClaiming(true);
      setClaimError('');
      const claim = await apiRequest('/api/rewards/claim', {
        method: 'POST',
        body: JSON.stringify({ code: 'mission_download_app', title: 'Unduh & Daftar', reward }),
      });
      setWalletCache(Number(claim?.balance || reward), 0);
      navigate('/', { state: { rewardClaimed: true, rewardAmount: reward } });
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Gagal klaim reward';
      setClaimError(msg.includes('already claimed') ? 'Reward sudah pernah diklaim.' : 'Klaim gagal, coba lagi.');
    } finally {
      setIsClaiming(false);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="px-6 py-4 flex items-center gap-4 border-b bg-white" style={{ borderColor: '#E9ECEF' }}>
        <button 
          onClick={() => goBack(navigate)} 
          className="flex items-center justify-center w-10 h-10 rounded-full transition-all hover:bg-gray-100 active:scale-95"
        >
          <ArrowLeft size={24} style={{ color: '#1E293B' }} />
        </button>
        <h1 className="text-xl" style={{ color: '#1E293B', fontWeight: '700' }}>
          Unduh & Daftar
        </h1>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6" style={{ backgroundColor: '#F8F9FA' }}>
        {step === 1 && (
          <>
            {/* Reward Card */}
            <div 
              className="mb-6 p-4 rounded-xl"
              style={{ 
                backgroundColor: '#FFFFFF',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)'
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Smartphone size={20} style={{ color: '#64748B' }} />
                  <span className="text-sm" style={{ color: '#64748B', fontWeight: '500' }}>
                    Unduh aplikasi & daftar akun
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg" style={{ backgroundColor: '#FFF7ED' }}>
                  <span style={{ fontSize: '16px' }}>💎</span>
                  <span className="text-base" style={{ color: '#F97316', fontWeight: '700' }}>
                    {reward.toLocaleString('id-ID', { maximumFractionDigits: 0 })}
                  </span>
                </div>
              </div>
            </div>

            {/* App Preview */}
            <div 
              className="mb-6 p-6 rounded-2xl text-center"
              style={{ 
                backgroundColor: '#FFFFFF',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)'
              }}
            >
              <div 
                className="w-24 h-24 mx-auto mb-4 rounded-3xl flex items-center justify-center"
                style={{ backgroundColor: '#F97316' }}
              >
                <Smartphone size={48} style={{ color: '#FFFFFF' }} />
              </div>
              <h3 className="text-lg mb-2" style={{ color: '#1E293B', fontWeight: '700' }}>
                ShopMate Indonesia
              </h3>
              <p className="text-sm mb-4" style={{ color: '#64748B', lineHeight: '1.5' }}>
                Platform belanja online terbaik dengan ribuan produk pilihan dan harga terjangkau.
              </p>
              <div className="flex items-center justify-center gap-4 text-xs" style={{ color: '#94A3B8' }}>
                <span>⭐ 4.5</span>
                <span>•</span>
                <span>1M+ Unduhan</span>
                <span>•</span>
                <span>Gratis</span>
              </div>
            </div>

            {/* Instructions */}
            <div 
              className="mb-6 p-5 rounded-xl"
              style={{ 
                backgroundColor: '#FFFFFF',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
              }}
            >
              <h4 className="text-sm mb-4" style={{ color: '#1E293B', fontWeight: '700' }}>
                Cara Menyelesaikan Tugas
              </h4>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: '#FFF7ED', color: '#F97316', fontWeight: '700', fontSize: '14px' }}
                  >
                    1
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="text-sm mb-1" style={{ color: '#1E293B', fontWeight: '600' }}>
                      Unduh aplikasi
                    </div>
                    <div className="text-sm" style={{ color: '#64748B', lineHeight: '1.4' }}>
                      Klik tombol "Unduh Aplikasi" untuk membuka Google Play Store
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: '#FFF7ED', color: '#F97316', fontWeight: '700', fontSize: '14px' }}
                  >
                    2
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="text-sm mb-1" style={{ color: '#1E293B', fontWeight: '600' }}>
                      Install dan buka
                    </div>
                    <div className="text-sm" style={{ color: '#64748B', lineHeight: '1.4' }}>
                      Install aplikasi di perangkat Anda dan buka aplikasi
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: '#FFF7ED', color: '#F97316', fontWeight: '700', fontSize: '14px' }}
                  >
                    3
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="text-sm mb-1" style={{ color: '#1E293B', fontWeight: '600' }}>
                      Daftar akun baru
                    </div>
                    <div className="text-sm" style={{ color: '#64748B', lineHeight: '1.4' }}>
                      Buat akun baru dengan nomor telepon atau email Anda
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: '#FFF7ED', color: '#F97316', fontWeight: '700', fontSize: '14px' }}
                  >
                    4
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="text-sm mb-1" style={{ color: '#1E293B', fontWeight: '600' }}>
                      Verifikasi tugas
                    </div>
                    <div className="text-sm" style={{ color: '#64748B', lineHeight: '1.4' }}>
                      Kembali ke sini dan konfirmasi bahwa Anda sudah selesai
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Warning */}
            <div 
              className="mb-6 p-4 rounded-xl"
              style={{ 
                backgroundColor: '#FFFBEB',
                border: '1px solid #FDE68A'
              }}
            >
              <p className="text-sm" style={{ color: '#92400E', lineHeight: '1.5' }}>
                <strong>Penting:</strong> Pastikan Anda mendaftar dengan akun baru. Reward hanya diberikan untuk pendaftaran akun baru, bukan login dengan akun lama.
              </p>
            </div>

            {/* Action Button */}
            <button 
              onClick={() => setStep(2)}
              className="w-full py-3.5 rounded-xl text-white transition-all active:scale-98 flex items-center justify-center gap-2"
              style={{ 
                backgroundColor: '#F97316',
                fontWeight: '700',
                boxShadow: '0 2px 8px rgba(249, 115, 22, 0.25)'
              }}
            >
              <span>Mulai Tugas</span>
              <ExternalLink size={18} />
            </button>
          </>
        )}

        {step === 2 && (
          <>
            {/* Progress Card */}
            <div 
              className="mb-6 p-5 rounded-xl"
              style={{ 
                backgroundColor: '#FFFFFF',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)'
              }}
            >
              <h3 className="text-lg mb-4" style={{ color: '#1E293B', fontWeight: '700' }}>
                Verifikasi Tugas
              </h3>
              <p className="text-sm mb-5" style={{ color: '#64748B', lineHeight: '1.5' }}>
                Centang kotak di bawah setelah Anda menyelesaikan setiap langkah.
              </p>

              <div className="space-y-4">
                {/* Download Checkbox */}
                <div 
                  className="p-4 rounded-xl border-2 transition-all cursor-pointer"
                  style={{ 
                    backgroundColor: isDownloaded ? '#FFF7ED' : '#FFFFFF',
                    borderColor: isDownloaded ? '#F97316' : '#E9ECEF'
                  }}
                  onClick={handleDownload}
                >
                  <div className="flex items-start gap-3">
                    <div className="pt-0.5">
                      {isDownloaded ? (
                        <CheckCircle2 size={24} style={{ color: '#F97316' }} fill="#F97316" strokeWidth={0} />
                      ) : (
                        <div className="w-6 h-6 rounded-full border-2" style={{ borderColor: '#CBD5E1' }} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm mb-1" style={{ color: '#1E293B', fontWeight: '600' }}>
                        Aplikasi sudah diunduh dan diinstall
                      </div>
                      <div className="text-xs" style={{ color: '#64748B' }}>
                        Klik untuk membuka Google Play Store
                      </div>
                      {isDownloaded && (
                        <div className="mt-2 flex items-center gap-1 text-xs" style={{ color: '#10B981', fontWeight: '600' }}>
                          <CheckCircle2 size={14} />
                          <span>Terverifikasi</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Registration Checkbox */}
                <div 
                  className="p-4 rounded-xl border-2 transition-all cursor-pointer"
                  style={{ 
                    backgroundColor: isRegistered ? '#FFF7ED' : '#FFFFFF',
                    borderColor: isRegistered ? '#F97316' : '#E9ECEF'
                  }}
                  onClick={() => setIsRegistered(!isRegistered)}
                >
                  <div className="flex items-start gap-3">
                    <div className="pt-0.5">
                      {isRegistered ? (
                        <CheckCircle2 size={24} style={{ color: '#F97316' }} fill="#F97316" strokeWidth={0} />
                      ) : (
                        <div className="w-6 h-6 rounded-full border-2" style={{ borderColor: '#CBD5E1' }} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm mb-1" style={{ color: '#1E293B', fontWeight: '600' }}>
                        Sudah daftar akun baru
                      </div>
                      <div className="text-xs" style={{ color: '#64748B' }}>
                        Centang jika sudah berhasil mendaftar
                      </div>
                      {isRegistered && (
                        <div className="mt-2 flex items-center gap-1 text-xs" style={{ color: '#10B981', fontWeight: '600' }}>
                          <CheckCircle2 size={14} />
                          <span>Terverifikasi</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Card */}
            <div 
              className="mb-6 p-4 rounded-xl"
              style={{ 
                backgroundColor: '#EFF6FF',
                border: '1px solid #BFDBFE'
              }}
            >
              <p className="text-sm" style={{ color: '#1E40AF', lineHeight: '1.5' }}>
                💡 <strong>Tips:</strong> Pastikan Anda menggunakan akun baru saat mendaftar. Screenshot halaman profil Anda sebagai bukti jika diperlukan verifikasi lebih lanjut.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button 
                onClick={() => setStep(1)}
                className="flex-1 py-3.5 rounded-xl transition-all active:scale-98"
                style={{ 
                  backgroundColor: 'transparent',
                  color: '#F97316',
                  fontWeight: '600',
                  border: '1.5px solid #F97316'
                }}
              >
                Kembali
              </button>
              <button 
                disabled={!isDownloaded || !isRegistered}
                onClick={handleVerify}
                className="flex-1 py-3.5 rounded-xl text-white transition-all active:scale-98"
                style={{ 
                  backgroundColor: (isDownloaded && isRegistered) ? '#F97316' : '#CBD5E1',
                  cursor: (isDownloaded && isRegistered) ? 'pointer' : 'not-allowed',
                  fontWeight: '700',
                  boxShadow: (isDownloaded && isRegistered) ? '0 2px 8px rgba(249, 115, 22, 0.25)' : 'none'
                }}
              >
                Verifikasi
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            {/* Completion Card */}
            <div 
              className="mb-6 p-8 rounded-xl text-center"
              style={{ 
                backgroundColor: '#FFFFFF',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
              }}
            >
              <div 
                className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ 
                  backgroundColor: '#DCFCE7',
                }}
              >
                <CheckCircle2 size={48} style={{ color: '#10B981' }} fill="#10B981" strokeWidth={0} />
              </div>
              <h3 className="text-xl mb-2" style={{ color: '#1E293B', fontWeight: '700' }}>
                Tugas Selesai!
              </h3>
              <p className="text-sm mb-6" style={{ color: '#64748B', lineHeight: '1.5' }}>
                Selamat! Anda telah berhasil mengunduh aplikasi dan mendaftar akun baru.
              </p>
              
              <div className="flex items-center justify-center gap-2 mb-6 p-4 rounded-xl" style={{ backgroundColor: '#FFF7ED' }}>
                <span style={{ fontSize: '32px' }}>💎</span>
                <span className="text-3xl" style={{ color: '#F97316', fontWeight: '700' }}>
                  {reward.toLocaleString('id-ID', { maximumFractionDigits: 0 })}
                </span>
              </div>
            </div>

            {/* Next Steps */}
            <div 
              className="mb-6 p-5 rounded-xl"
              style={{ 
                backgroundColor: '#FFFFFF',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
              }}
            >
              <h4 className="text-sm mb-3" style={{ color: '#1E293B', fontWeight: '700' }}>
                Langkah Selanjutnya
              </h4>
              <ul className="space-y-2 text-sm" style={{ color: '#64748B', lineHeight: '1.5' }}>
                <li className="flex gap-2">
                  <span style={{ color: '#F97316' }}>•</span>
                  <span>Jelajahi aplikasi ShopMate dan temukan produk favorit Anda</span>
                </li>
                <li className="flex gap-2">
                  <span style={{ color: '#F97316' }}>•</span>
                  <span>Lengkapi profil Anda untuk pengalaman yang lebih baik</span>
                </li>
                <li className="flex gap-2">
                  <span style={{ color: '#F97316' }}>•</span>
                  <span>Ikuti tutorial di aplikasi untuk mempelajari fitur-fitur menarik</span>
                </li>
              </ul>
            </div>

            {/* Claim Button */}
            <button 
              onClick={handleClaim}
              disabled={isClaiming}
              className="w-full py-3.5 rounded-xl text-white transition-all active:scale-98"
              style={{ 
                backgroundColor: isClaiming ? '#CBD5E1' : '#F97316',
                fontWeight: '700',
                boxShadow: isClaiming ? 'none' : '0 2px 8px rgba(249, 115, 22, 0.25)',
                cursor: isClaiming ? 'not-allowed' : 'pointer'
              }}
            >
              {isClaiming ? 'Memproses...' : `Klaim 💎 ${reward.toLocaleString('id-ID', { maximumFractionDigits: 0 })}`}
            </button>
            {claimError && (
              <div className="mt-2 text-xs text-center" style={{ color: '#EF4444', fontWeight: 600 }}>
                {claimError}
              </div>
            )}
          </>
        )}
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
