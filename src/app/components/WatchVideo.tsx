import { ArrowLeft, Play, Pause, Clock, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { goBack } from '../../lib/nav';
import { useState, useEffect } from 'react';
import { apiRequest, setWalletCache } from '../../lib/api';

export function WatchVideo() {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timeWatched, setTimeWatched] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const [claimError, setClaimError] = useState('');

  const requiredTime = 30; // 30 seconds for faster testing
  const reward = 2000; // diamonds

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && !isCompleted) {
      interval = setInterval(() => {
        setTimeWatched((prev) => {
          const newTime = prev + 1;
          const newProgress = (newTime / requiredTime) * 100;
          setProgress(newProgress);
          
          if (newTime >= requiredTime) {
            setIsCompleted(true);
            setIsPlaying(false);
          }
          
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isCompleted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleClaim = async () => {
    if (isClaiming) return;
    try {
      setIsClaiming(true);
      setClaimError('');
      const claim = await apiRequest('/api/rewards/claim', {
        method: 'POST',
        body: JSON.stringify({ code: 'mission_watch_video', title: 'Tonton Video', reward }),
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
          Tonton Video
        </h1>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6" style={{ backgroundColor: '#F8F9FA' }}>
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
              <Clock size={20} style={{ color: '#64748B' }} />
              <span className="text-sm" style={{ color: '#64748B', fontWeight: '500' }}>
                Tonton selama 30 detik
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

        {/* Video Player */}
        <div 
          className="mb-6 rounded-2xl overflow-hidden"
          style={{ 
            backgroundColor: '#1E293B',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            aspectRatio: '16/9'
          }}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Video Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="mb-4">
                  <div 
                    className="w-16 h-16 mx-auto rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(249, 115, 22, 0.9)' }}
                  >
                    {isPlaying ? (
                      <Pause size={32} style={{ color: '#FFFFFF' }} />
                    ) : (
                      <Play size={32} style={{ color: '#FFFFFF', marginLeft: '4px' }} />
                    )}
                  </div>
                </div>
                <div className="text-sm" style={{ color: '#94A3B8' }}>
                  {isCompleted ? 'Video Selesai' : isPlaying ? 'Memutar video...' : 'Tekan untuk memutar'}
                </div>
              </div>
            </div>

            {/* Play/Pause Overlay Button */}
            {!isCompleted && (
              <button
                onClick={handlePlayPause}
                className="absolute inset-0 w-full h-full cursor-pointer"
                style={{ backgroundColor: 'transparent' }}
              />
            )}

            {/* Completion Checkmark */}
            {isCompleted && (
              <div 
                className="absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center"
                style={{ 
                  backgroundColor: '#10B981',
                  boxShadow: '0 2px 8px rgba(16, 185, 129, 0.4)'
                }}
              >
                <CheckCircle2 size={28} style={{ color: '#FFFFFF' }} fill="#FFFFFF" />
              </div>
            )}
          </div>
        </div>

        {/* Progress Section */}
        <div 
          className="mb-6 p-5 rounded-xl"
          style={{ 
            backgroundColor: '#FFFFFF',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm" style={{ color: '#64748B', fontWeight: '600' }}>
              Progres Menonton
            </span>
            <span className="text-sm" style={{ color: '#F97316', fontWeight: '700' }}>
              {formatTime(timeWatched)} / {formatTime(requiredTime)}
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full h-3 rounded-full mb-2" style={{ backgroundColor: '#E9ECEF' }}>
            <div 
              className="h-full rounded-full transition-all duration-300"
              style={{ 
                backgroundColor: isCompleted ? '#10B981' : '#F97316',
                width: `${Math.min(progress, 100)}%`,
                boxShadow: progress > 0 ? `0 0 8px rgba(${isCompleted ? '16, 185, 129' : '249, 115, 22'}, 0.3)` : 'none'
              }}
            />
          </div>

          <div className="text-xs text-center" style={{ color: '#94A3B8', fontWeight: '500' }}>
            {isCompleted ? '✓ Selesai menonton' : `${Math.round(progress)}% selesai`}
          </div>
        </div>

        {/* Video Info */}
        <div 
          className="mb-6 p-5 rounded-xl"
          style={{ 
            backgroundColor: '#FFFFFF',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
          }}
        >
          <h3 className="text-base mb-2" style={{ color: '#1E293B', fontWeight: '700' }}>
            Tips Menghasilkan Uang Online
          </h3>
          <p className="text-sm mb-3" style={{ color: '#64748B', lineHeight: '1.5' }}>
            Pelajari cara-cara terbaik untuk menghasilkan uang tambahan melalui platform online dengan aman dan efektif.
          </p>
          <div className="flex items-center gap-3 text-xs" style={{ color: '#94A3B8' }}>
            <span>Durasi: 30 detik</span>
            <span>•</span>
            <span>Kategori: Tutorial</span>
          </div>
        </div>

        {/* Instructions */}
        <div 
          className="mb-6 p-4 rounded-xl"
          style={{ 
            backgroundColor: '#FFFBEB',
            border: '1px solid #FDE68A'
          }}
        >
          <p className="text-sm" style={{ color: '#92400E', lineHeight: '1.5' }}>
            <strong>Petunjuk:</strong> Tonton video sampai selesai untuk mendapatkan reward. Jangan keluar dari halaman ini selama video diputar.
          </p>
        </div>

        {/* Claim Button */}
        <button 
          disabled={!isCompleted || isClaiming}
          onClick={handleClaim}
          className="w-full py-3.5 rounded-xl text-white transition-all active:scale-98"
          style={{ 
            backgroundColor: isCompleted && !isClaiming ? '#F97316' : '#CBD5E1',
            cursor: isCompleted && !isClaiming ? 'pointer' : 'not-allowed',
            fontWeight: '700',
            boxShadow: isCompleted && !isClaiming ? '0 2px 8px rgba(249, 115, 22, 0.25)' : 'none'
          }}
        >
          {!isCompleted ? 'Selesaikan Video untuk Klaim' : isClaiming ? 'Memproses...' : `Klaim 💎 ${reward.toLocaleString('id-ID', { maximumFractionDigits: 0 })}`}
        </button>
        {claimError && (
          <div className="mt-2 text-xs text-center" style={{ color: '#EF4444', fontWeight: 600 }}>
            {claimError}
          </div>
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
