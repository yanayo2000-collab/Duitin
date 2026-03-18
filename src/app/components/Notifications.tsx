import { ArrowLeft, Bell, CheckCircle, Gift, TrendingUp, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router';
import { goBack } from '../../lib/nav';

export function Notifications() {
  const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      type: 'success',
      icon: CheckCircle,
      iconColor: '#10B981',
      iconBg: '#F0FDF4',
      title: 'Penarikan Berhasil',
      message: 'Dana sebesar 💎 50.000 telah berhasil ditransfer ke rekening DANA Anda',
      time: '5 menit lalu',
      read: false
    },
    {
      id: 2,
      type: 'task',
      icon: Gift,
      iconColor: '#F97316',
      iconBg: '#FFF7ED',
      title: 'Tugas Baru Tersedia',
      message: '3 tugas baru dengan total reward 💎 2.500 menunggu Anda',
      time: '1 jam lalu',
      read: false
    },
    {
      id: 3,
      type: 'earning',
      icon: TrendingUp,
      iconColor: '#10B981',
      iconBg: '#F0FDF4',
      title: 'Reward Diterima',
      message: 'Selamat! Anda mendapat 💎 1.500 dari tugas "Review produk"',
      time: '3 jam lalu',
      read: true
    },
    {
      id: 4,
      type: 'promo',
      icon: Gift,
      iconColor: '#8B5CF6',
      iconBg: '#F5F3FF',
      title: 'Bonus Referral',
      message: 'Undang 5 teman dan dapatkan bonus 💎 5.000',
      time: '1 hari lalu',
      read: true
    },
    {
      id: 5,
      type: 'info',
      icon: Bell,
      iconColor: '#3B82F6',
      iconBg: '#EFF6FF',
      title: 'Update Aplikasi',
      message: 'Versi baru tersedia dengan fitur penarikan yang lebih cepat',
      time: '2 hari lalu',
      read: true
    },
    {
      id: 6,
      type: 'warning',
      icon: AlertCircle,
      iconColor: '#F59E0B',
      iconBg: '#FEF3C7',
      title: 'Verifikasi Akun',
      message: 'Lengkapi verifikasi akun untuk meningkatkan limit penarikan',
      time: '3 hari lalu',
      read: true
    },
    {
      id: 7,
      type: 'earning',
      icon: TrendingUp,
      iconColor: '#10B981',
      iconBg: '#F0FDF4',
      title: 'Reward Diterima',
      message: 'Selamat! Anda mendapat 💎 800 dari tugas "Unduh aplikasi"',
      time: '4 hari lalu',
      read: true
    },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      {/* Header */}
      <div className="px-6 py-4 border-b bg-white" style={{ borderColor: '#E9ECEF' }}>
        <div className="flex items-center gap-4 mb-3">
          <button 
            onClick={() => goBack(navigate)} 
            className="flex items-center justify-center w-10 h-10 rounded-full transition-all hover:bg-gray-100 active:scale-95"
          >
            <ArrowLeft size={24} style={{ color: '#1E293B' }} />
          </button>
          <h1 className="text-xl flex-1" style={{ color: '#1E293B', fontWeight: '700' }}>
            Notifikasi
          </h1>
          {unreadCount > 0 && (
            <div 
              className="px-2.5 py-1 rounded-full"
              style={{ backgroundColor: '#F97316' }}
            >
              <span className="text-xs" style={{ color: '#FFFFFF', fontWeight: '700' }}>
                {unreadCount} baru
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto" style={{ backgroundColor: '#F8F9FA' }}>
        {/* Unread Section */}
        {unreadCount > 0 && (
          <div className="px-6 pt-4 pb-2">
            <h2 className="text-sm mb-3" style={{ color: '#64748B', fontWeight: '600' }}>
              BELUM DIBACA
            </h2>
            <div className="space-y-2">
              {notifications.filter(n => !n.read).map(notification => (
                <div 
                  key={notification.id}
                  className="p-4 rounded-xl relative"
                  style={{ 
                    backgroundColor: '#FFFFFF',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                    border: '2px solid #FFF7ED'
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div 
                      className="flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0"
                      style={{ backgroundColor: notification.iconBg }}
                    >
                      <notification.icon size={20} style={{ color: notification.iconColor }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm mb-1" style={{ color: '#1E293B', fontWeight: '600' }}>
                        {notification.title}
                      </h3>
                      <p className="text-sm mb-2 leading-relaxed" style={{ color: '#64748B' }}>
                        {notification.message}
                      </p>
                      <span className="text-xs" style={{ color: '#94A3B8' }}>
                        {notification.time}
                      </span>
                    </div>
                  </div>
                  {/* Unread Indicator */}
                  <div 
                    className="absolute top-4 right-4 w-2 h-2 rounded-full"
                    style={{ backgroundColor: '#F97316' }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Read Section */}
        <div className="px-6 py-4">
          {unreadCount > 0 && (
            <h2 className="text-sm mb-3" style={{ color: '#64748B', fontWeight: '600' }}>
              SUDAH DIBACA
            </h2>
          )}
          <div className="space-y-2">
            {notifications.filter(n => n.read).map(notification => (
              <div 
                key={notification.id}
                className="p-4 rounded-xl"
                style={{ 
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                }}
              >
                <div className="flex items-start gap-3">
                  <div 
                    className="flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0"
                    style={{ backgroundColor: notification.iconBg }}
                  >
                    <notification.icon size={20} style={{ color: notification.iconColor }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm mb-1" style={{ color: '#1E293B', fontWeight: '600' }}>
                      {notification.title}
                    </h3>
                    <p className="text-sm mb-2 leading-relaxed" style={{ color: '#64748B' }}>
                      {notification.message}
                    </p>
                    <span className="text-xs" style={{ color: '#94A3B8' }}>
                      {notification.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .active\\:scale-95:active {
          transform: scale(0.95);
        }
      `}</style>
    </>
  );
}