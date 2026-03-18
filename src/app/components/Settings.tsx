import { ArrowLeft, ChevronRight, Bell, Shield, CreditCard, Globe, Moon, HelpCircle, Info } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useState } from 'react';

export function Settings() {
  const navigate = useNavigate();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const settingSections = [
    {
      title: 'PREFERENSI',
      items: [
        { 
          id: 1, 
          icon: Bell, 
          label: 'Notifikasi', 
          hasToggle: true,
          toggleValue: notificationsEnabled,
          onToggle: () => setNotificationsEnabled(!notificationsEnabled),
          color: '#F97316', 
          bgColor: '#FFF7ED'
        },
        { 
          id: 2, 
          icon: Moon, 
          label: 'Mode Gelap', 
          hasToggle: true,
          toggleValue: darkMode,
          onToggle: () => setDarkMode(!darkMode),
          color: '#1E293B', 
          bgColor: '#F8F9FA'
        },
        { 
          id: 3, 
          icon: Globe, 
          label: 'Bahasa', 
          subtitle: 'Indonesia',
          hasChevron: true,
          color: '#3B82F6', 
          bgColor: '#EFF6FF'
        },
      ]
    },
    {
      title: 'KEAMANAN',
      items: [
        { 
          id: 4, 
          icon: Shield, 
          label: 'Keamanan Akun', 
          subtitle: 'PIN, Password, Verifikasi',
          hasChevron: true,
          color: '#10B981', 
          bgColor: '#F0FDF4'
        },
        { 
          id: 5, 
          icon: CreditCard, 
          label: 'Metode Pembayaran', 
          subtitle: '2 metode terhubung',
          hasChevron: true,
          color: '#8B5CF6', 
          bgColor: '#F5F3FF'
        },
      ]
    },
    {
      title: 'BANTUAN',
      items: [
        { 
          id: 6, 
          icon: HelpCircle, 
          label: 'Pusat Bantuan', 
          hasChevron: true,
          color: '#64748B', 
          bgColor: '#F8F9FA',
          link: '/help'
        },
        { 
          id: 7, 
          icon: Info, 
          label: 'Tentang Aplikasi', 
          subtitle: 'Versi 1.0.0',
          hasChevron: true,
          color: '#64748B', 
          bgColor: '#F8F9FA'
        },
      ]
    }
  ];

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
        <h1 className="text-xl" style={{ color: '#1E293B', fontWeight: '700' }}>
          Pengaturan
        </h1>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto" style={{ backgroundColor: '#F8F9FA' }}>
        {settingSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="px-6 py-4">
            <h2 className="text-sm mb-3" style={{ color: '#64748B', fontWeight: '600' }}>
              {section.title}
            </h2>
            <div className="space-y-2">
              {section.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.onToggle) {
                      item.onToggle();
                    } else if (item.link) {
                      navigate(item.link);
                    }
                  }}
                  className="w-full p-4 flex items-center gap-3 rounded-xl transition-all active:scale-98"
                  style={{ 
                    backgroundColor: '#FFFFFF',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                  }}
                >
                  <div 
                    className="flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.bgColor }}
                  >
                    <item.icon size={20} style={{ color: item.color }} />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-sm" style={{ color: '#1E293B', fontWeight: '600' }}>
                      {item.label}
                    </div>
                    {item.subtitle && (
                      <div className="text-xs mt-0.5" style={{ color: '#94A3B8' }}>
                        {item.subtitle}
                      </div>
                    )}
                  </div>
                  {item.hasToggle && (
                    <div 
                      className="relative w-12 h-7 rounded-full transition-all cursor-pointer flex-shrink-0"
                      style={{ 
                        backgroundColor: item.toggleValue ? '#F97316' : '#E9ECEF'
                      }}
                    >
                      <div 
                        className="absolute top-1 w-5 h-5 rounded-full bg-white transition-all"
                        style={{ 
                          left: item.toggleValue ? '26px' : '4px',
                          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                        }}
                      />
                    </div>
                  )}
                  {item.hasChevron && (
                    <ChevronRight size={20} style={{ color: '#94A3B8' }} />
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* App Info */}
        <div className="px-6 pb-6">
          <div 
            className="p-4 rounded-xl text-center"
            style={{ 
              backgroundColor: '#FFFFFF',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
            }}
          >
            <div className="text-xs mb-1" style={{ color: '#94A3B8' }}>
              Made with ❤️ in Indonesia
            </div>
            <div className="text-xs" style={{ color: '#94A3B8' }}>
              © 2026 Duitin. All rights reserved.
            </div>
          </div>
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
    </>
  );
}
