import { useState, useEffect } from 'react';
import { TrendingUp, Star } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router';
import { OnboardingTask } from './OnboardingTask';
import { VIPInvitePopup } from './VIPInvitePopup';
import { showRewardedAd } from '../../lib/rewardedAd';
import { toUserError } from '../../lib/errors';
import { apiRequest, getWalletCache, setWalletCache } from '../../lib/api';

export function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showVIPPopup, setShowVIPPopup] = useState(false);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [adMessage, setAdMessage] = useState('');
  const [rewardToast, setRewardToast] = useState('');
  const [busyTaskId, setBusyTaskId] = useState<number | null>(null);
  const [completedTaskCodes, setCompletedTaskCodes] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem('duitin_completed_task_codes');
      const arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr.map((v) => String(v)) : [];
    } catch {
      return [];
    }
  });
  const [tasksReady, setTasksReady] = useState<boolean>(() => {
    const raw = localStorage.getItem('duitin_completed_task_codes');
    return !!raw;
  });

  const withdrawalGoal = 10000; // first withdraw goal in diamonds
  const progressPercentage = (currentBalance / withdrawalGoal) * 100;
  const progressPercentageClamped = Math.max(0, Math.min(100, progressPercentage));

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const state = (location.state || {}) as { rewardClaimed?: boolean; rewardAmount?: number };
    if (state.rewardClaimed) {
      const amount = Number(state.rewardAmount || 0);
      if (amount > 0) {
        // Immediate UI update to avoid waiting for polling
        setCurrentBalance((prev) => {
          const next = prev + amount;
          setWalletCache(next, 0);
          return next;
        });
      }
      setRewardToast(`Reward masuk +💎 ${amount.toLocaleString('id-ID', { maximumFractionDigits: 0 })}`);
      const t = setTimeout(() => setRewardToast(''), 2200);
      return () => clearTimeout(t);
    }
  }, [location.state]);

  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('onboardingCompleted');
    const forceShowOnboarding = localStorage.getItem('showOnboardingOnHome') === '1';

    if (!hasCompletedOnboarding || forceShowOnboarding) {
      localStorage.removeItem('showOnboardingOnHome');
      const timer = setTimeout(() => {
        setShowOnboarding(true);
      }, 500);
      return () => clearTimeout(timer);
    }

    const cached = getWalletCache();
    setCurrentBalance(cached.balance);
  }, []);

  const handleOnboardingComplete = async (data: { gender: 'male' | 'female'; age: number }) => {
    localStorage.setItem('onboardingCompleted', 'true');
    localStorage.setItem('userGender', data.gender);
    localStorage.setItem('userAge', data.age.toString());

    if (data.gender === 'female' && data.age >= 18 && data.age <= 40) {
      localStorage.setItem('vipQualified', 'true');
    } else {
      localStorage.removeItem('vipQualified');
    }

    setShowOnboarding(false);

    const isVipTarget = data.gender === 'female' && data.age >= 18 && data.age <= 40;
    if (isVipTarget) {
      // Lock VIP list immediately to avoid one-frame leakage before popup appears.
      localStorage.setItem('vipTaskListUnlocked', '0');
      localStorage.removeItem('vipPopupCooldown');
    }

    // Under 18: no reward, keep server-synced balance
    if (data.age < 18) {
      try {
        const wallet = await apiRequest('/api/wallet');
        const b = Number(wallet?.balance || 0);
        // Keep same animation behavior across all reward/balance updates.
        setCurrentBalance(b);
        setWalletCache(b, Number(wallet?.frozen || 0));
      } catch {
        // Keep current displayed/cached values on transient failure.
      }
      return;
    }

    try {
      await apiRequest('/api/rewards/claim', {
        method: 'POST',
        body: JSON.stringify({ code: 'mission_onboarding', title: 'Bonus Pengguna Baru', reward: 1000 }),
      });
    } catch {}

    try {
      const wallet = await apiRequest('/api/wallet');
      const targetBalance = Number(wallet?.balance || 0);
      // Unified animation path: only set target.
      setCurrentBalance(targetBalance);
      setWalletCache(targetBalance, Number(wallet?.frozen || 0));
    } catch {
      // Keep previous value if wallet sync fails; do not reset to zero.
    }

    if (isVipTarget) {
      // Force-show VIP popup first; list stays locked until user handles popup.
      setTimeout(() => {
        setShowVIPPopup(true);
      }, 600);
    }
  };

  useEffect(() => {
    let mounted = true;

    const syncWallet = async () => {
      try {
        const data = await apiRequest('/api/wallet');
        if (!mounted) return;
        const b = Number(data.balance || 0);
        const f = Number(data.frozen || 0);
        setCurrentBalance(b);
        setWalletCache(b, f);
      } catch {
        // Keep previous balance on transient network errors to avoid visual rollback.
      }
    };

    syncWallet();
    const timer = setInterval(() => {
      if (document.visibilityState === 'visible') syncWallet();
    }, 8000);
    return () => {
      mounted = false;
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    const syncCompletedTasks = async () => {
      try {
        const data = await apiRequest('/api/task-history');
        if (!mounted) return;
        const codes = Array.isArray(data?.items)
          ? data.items.map((item: { taskId?: string }) => String(item?.taskId || '')).filter(Boolean)
          : [];
        setCompletedTaskCodes(codes);
        localStorage.setItem('duitin_completed_task_codes', JSON.stringify(codes));
        setTasksReady(true);
      } catch {
        if (mounted) setTasksReady(true);
      }
    };

    syncCompletedTasks();
    const timer = setInterval(() => {
      if (document.visibilityState === 'visible') syncCompletedTasks();
    }, 10000);

    return () => {
      mounted = false;
      clearInterval(timer);
    };
  }, []);

  const tasks = [
    { id: 1, code: 'mission_survey', level: 'C', name: 'Isi survei kepuasan pelanggan', reward: 1000, link: '/survey' },
    { id: 2, code: 'mission_download_app', level: 'B', name: 'Unduh aplikasi dan daftar', reward: 2000, link: '/download-app' },
    { id: 3, code: 'mission_watch_video', level: 'B', name: 'Tonton video 30 detik', reward: 2000, link: '/watch-video' },
    { id: 4, code: 'mission_product_review', level: 'A', name: 'Review produk di marketplace', reward: 8000, link: '/product-review' },
  ] as const;

  const handleTaskClick = async (task: { id: number; link?: string }, isVIPTask: boolean) => {
    if (isVIPTask) {
      setShowVIPPopup(true);
      return;
    }

    if (!task.link || busyTaskId) return;

    try {
      setBusyTaskId(task.id);
      setAdMessage('Menyiapkan iklan...');
      const ad = await showRewardedAd();
      if (!ad.rewarded) {
        setAdMessage(toUserError(ad.message || '', 'Iklan belum selesai. Coba lagi.'));
        return;
      }
      setAdMessage('Iklan selesai. Membuka tugas...');
      navigate(task.link);
    } finally {
      setBusyTaskId(null);
    }
  };

  const onboardingCompleted = localStorage.getItem('onboardingCompleted') === 'true';
  const hideTasksBeforeOnboarding = !onboardingCompleted || showOnboarding;

  const userGender = (localStorage.getItem('userGender') || '').toLowerCase();
  const userAge = Number(localStorage.getItem('userAge') || 0);
  const isAdult = userAge >= 18;
  const isVipEligible = userGender === 'female' && userAge >= 18 && userAge <= 40;

  const completedSet = new Set(completedTaskCodes);
  const availableTasks = tasks.filter((task) => !completedSet.has(task.code));

  const scopedTasks = !isAdult
    ? []
    : isVipEligible
      ? availableTasks
      : availableTasks.filter((task) => task.level === 'B' || task.level === 'C');

  const vipTaskListUnlocked = localStorage.getItem('vipTaskListUnlocked') === '1';
  const showVipInTaskList = isVipEligible && onboardingCompleted && vipTaskListUnlocked;

  const allTasks = showVipInTaskList
    ? [
        {
          id: 999,
          name: 'VIP Host - Chat & Video dengan Pengguna Global',
          reward: 5000,
          link: '/vip-task-detail',
          isVIP: true,
        },
        ...scopedTasks,
      ]
    : scopedTasks;

  const getRewardLevel = (reward: number) => {
    if (reward >= 8000) return { level: 'A', color: '#10B981', bgColor: '#F0FDF4' };
    if (reward >= 2000) return { level: 'B', color: '#3B82F6', bgColor: '#EFF6FF' };
    return { level: 'C', color: '#94A3B8', bgColor: '#F8F9FA' };
  };

  return (
    <>
      {/* Status Bar */}
      <div className="px-6 pt-3 pb-2 flex items-center justify-between text-sm" style={{ color: '#1E293B' }}>
        <span>{currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</span>
        <div className="flex items-center gap-1">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="1" y="6" width="18" height="12" rx="2" />
            <path d="M23 13v-2" />
          </svg>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto" style={{ backgroundColor: '#F8F9FA' }}>
        {/* Balance Card */}
        <div className="px-6 mb-4 pt-3">
          <div 
            className="bg-white rounded-2xl overflow-hidden transition-shadow"
            style={{ 
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)'
            }}
          >
            {/* Marquee - Integrated at top of card */}
            <div className="overflow-hidden" style={{ backgroundColor: '#FFF7ED', borderBottom: '1px solid #FED7AA' }}>
              <div className="py-1.5 px-4 flex items-center gap-2 animate-marquee whitespace-nowrap">
                <TrendingUp size={12} style={{ color: '#F97316' }} />
                <span className="text-xs" style={{ color: '#EA580C', fontWeight: '500' }}>
                  Siti menarik Rp 50.000 via DANA • Ahmad menarik Rp 100.000 via OVO • Rina menarik Rp 75.000 via GoPay
                </span>
              </div>
            </div>

            {/* Balance Content */}
            <div className="px-5 pt-4 pb-4">
              <div className="flex items-center justify-between mb-1.5">
                <div className="text-xs" style={{ color: '#64748B' }}>Saldo Anda</div>
                {!!rewardToast && (
                  <div className="px-2 py-1 rounded-lg text-[11px]" style={{ backgroundColor: '#DCFCE7', color: '#166534', fontWeight: 700, whiteSpace: 'nowrap' }}>
                    {rewardToast}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 mb-3.5">
                <span style={{ fontSize: '28px' }}>💎</span>
                <div className="text-3xl" style={{ color: '#F97316', fontWeight: '700' }}>
                  {currentBalance.toLocaleString('id-ID', { maximumFractionDigits: 0 })}
                </div>
                <div className="text-sm" style={{ color: '#94A3B8' }}>
                  = Rp {(currentBalance * 10).toLocaleString('id-ID', { maximumFractionDigits: 0 })}
                </div>
              </div>
              
              {/* Progress Bar Section */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs" style={{ color: '#64748B', fontWeight: '600' }}>
                    Progress Penarikan
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ color: '#F97316', backgroundColor: '#FFF7ED', fontWeight: '700' }}>
                    {Math.round(progressPercentageClamped)}%
                  </span>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full h-2.5 rounded-full mb-2" style={{ backgroundColor: '#E9ECEF' }}>
                  <div 
                    className="h-full rounded-full transition-all duration-500 ease-out"
                    style={{ 
                      backgroundColor: '#F97316',
                      width: `${progressPercentageClamped}%`,
                      boxShadow: progressPercentageClamped > 0 ? '0 0 8px rgba(249, 115, 22, 0.3)' : 'none'
                    }}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: '#94A3B8' }}>
                    💎 {currentBalance.toLocaleString('id-ID', { maximumFractionDigits: 0 })}
                  </span>
                  <span className="text-xs" style={{ color: '#94A3B8' }}>
                    Target: 💎 {withdrawalGoal.toLocaleString('id-ID', { maximumFractionDigits: 0 })}
                  </span>
                </div>
              </div>
              
              <button 
                className="w-full py-3 rounded-xl text-white transition-all active:scale-98"
                style={{ 
                  backgroundColor: '#F97316',
                  fontWeight: '600',
                  boxShadow: '0 2px 8px rgba(249, 115, 22, 0.25)'
                }}
                onClick={() => navigate('/withdrawal', { state: { from: 'home' } })}
              >
                Tarik Tunai
              </button>
            </div>
          </div>
        </div>

        {/* Task Section */}
        <div className="px-6 pb-6">
          <h2 className="text-lg mb-2" style={{ color: '#1E293B', fontWeight: '700' }}>
            Tugas untuk Anda
          </h2>
          {onboardingCompleted && !isAdult && (
            <div className="p-4 rounded-xl mb-3" style={{ backgroundColor: '#FEF2F2', color: '#B91C1C', fontWeight: 700 }}>
              App ini hanya untuk pengguna dewasa (18+).
            </div>
          )}
          {hideTasksBeforeOnboarding ? null : !tasksReady ? (
            <div className="p-4 rounded-xl" style={{ backgroundColor: '#FFFFFF', color: '#94A3B8', fontWeight: 600 }}>
              Memuat daftar tugas...
            </div>
          ) : (
          <div className="space-y-3">
            {allTasks
              .slice()
              .sort((a, b) => {
                const rank = (task: { reward: number; isVIP?: boolean }) => {
                  if (task.isVIP) return 0;
                  if (task.reward >= 8000) return 1; // A
                  if (task.reward >= 2000) return 2; // B
                  return 3; // C
                };

                const byRank = rank(a) - rank(b);
                if (byRank !== 0) return byRank;
                return b.reward - a.reward;
              })
              .map(task => {
              const levelInfo = getRewardLevel(task.reward);
              const isVIPTask = 'isVIP' in task && task.isVIP;
              
              return (
                <div 
                  key={task.id}
                  className="rounded-xl overflow-hidden transition-all"
                  style={{ 
                    backgroundColor: '#FFFFFF',
                    boxShadow: isVIPTask 
                      ? '0 4px 16px rgba(249, 115, 22, 0.25), 0 0 0 2px #F97316' 
                      : '0 1px 3px rgba(0, 0, 0, 0.05)',
                    position: 'relative'
                  }}
                >
                  {/* VIP Special Banner */}
                  {isVIPTask && (
                    <div className="px-4 py-2 flex items-center gap-2 relative overflow-hidden" style={{ 
                      background: 'linear-gradient(135deg, #DC2626 0%, #F97316 100%)',
                      boxShadow: '0 2px 4px rgba(249, 115, 22, 0.3)'
                    }}>
                      {/* Animated shine */}
                      <div 
                        className="absolute inset-0 animate-shine-banner"
                        style={{
                          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                        }}
                      />
                      
                      <Star size={14} style={{ color: '#FFFFFF' }} fill="#FFFFFF" />
                      <span className="text-xs" style={{ color: '#FFFFFF', fontWeight: '800', letterSpacing: '0.5px' }}>
                        VIP EKSKLUSIF
                      </span>
                    </div>
                  )}
                  
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 pr-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm leading-snug" style={{ 
                            color: '#1E293B', 
                            fontWeight: isVIPTask ? '700' : '500' 
                          }}>
                            {task.name}
                          </span>
                          {!isVIPTask && (
                            <div 
                              className="rounded flex items-center justify-center flex-shrink-0"
                              style={{ 
                                backgroundColor: levelInfo.bgColor,
                                width: '28px',
                                height: '28px',
                                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
                              }}
                            >
                              <span 
                                style={{ 
                                  color: levelInfo.color, 
                                  fontWeight: '700',
                                  fontSize: '13px'
                                }}
                              >
                                {levelInfo.level}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span style={{ fontSize: '18px' }}>💎</span>
                          <span className="text-lg" style={{ 
                            color: '#F97316', 
                            fontWeight: '700',
                            fontSize: isVIPTask ? '20px' : '18px'
                          }}>
                            {task.reward.toLocaleString('id-ID', { maximumFractionDigits: 0 })}
                          </span>
                        </div>
                      </div>
                    </div>
                    {!isVIPTask && (
                      <div className="mb-2 text-[11px]" style={{ color: '#94A3B8', fontWeight: 600 }}>
                        Selesaikan iklan reward terlebih dahulu untuk membuka tugas.
                      </div>
                    )}
                    <button 
                      className="w-full py-2.5 rounded-lg transition-all active:scale-98"
                      style={{ 
                        backgroundColor: isVIPTask ? '#F97316' : 'transparent',
                        color: isVIPTask ? '#FFFFFF' : '#F97316',
                        fontWeight: isVIPTask ? '700' : '600',
                        border: isVIPTask ? 'none' : '1.5px solid #F97316',
                        boxShadow: isVIPTask ? '0 4px 12px rgba(249, 115, 22, 0.3)' : 'none'
                      }}
                      onClick={() => handleTaskClick(task, isVIPTask)}
                      disabled={!!busyTaskId}
                    >
                      {isVIPTask
                        ? '💬 Lihat Detail'
                        : (busyTaskId === task.id ? 'Memproses Iklan...' : 'Kerjakan')}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .active\:scale-98:active {
          transform: scale(0.98);
        }
        .active\:scale-95:active {
          transform: scale(0.95);
        }
        @keyframes shine-banner {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        .animate-shine-banner {
          animation: shine-banner 3s infinite;
        }
      `}</style>

      {/* Onboarding Task */}
      <OnboardingTask 
        isOpen={showOnboarding} 
        onComplete={handleOnboardingComplete} 
      />

      {/* VIP Invite Popup */}
      <VIPInvitePopup 
        isOpen={showVIPPopup}
        onAccept={() => {
          localStorage.setItem('vipTaskListUnlocked', '1');
          setShowVIPPopup(false);
          navigate('/vip-task-detail');
        }}
        onClose={() => {
          localStorage.setItem('vipTaskListUnlocked', '1');
          setShowVIPPopup(false);
        }}
      />
    </>
  );
}