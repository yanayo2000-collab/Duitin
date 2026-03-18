import { ArrowLeft, ChevronRight, History, Settings, FileText, LogOut, Users, Edit2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { goBack } from '../../lib/nav';
import { useState } from 'react';
import { LogoutConfirmation } from './LogoutConfirmation';

export function Profile() {
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleLogoutConfirm = () => {
    setShowLogoutConfirm(false);
    // Handle actual logout logic here
    navigate('/login');
  };

  const menuItems = [
    { id: 1, icon: Users, label: 'Undang Teman', hasChevron: true, color: '#F97316', bgColor: '#FFF7ED', link: '/invite' },
    { id: 2, icon: History, label: 'Riwayat Tugas', hasChevron: true, color: '#1E293B', bgColor: '#F0FDF4', link: '/task-history' },
    { id: 3, icon: Settings, label: 'Pengaturan', hasChevron: true, color: '#1E293B', bgColor: '#FFF7ED', link: '/settings' },
    { id: 4, icon: FileText, label: 'Syarat & Privasi', hasChevron: true, color: '#1E293B', bgColor: '#F8F9FA', link: '/terms-privacy' },
    { id: 5, icon: LogOut, label: 'Logout', hasChevron: false, color: '#EF4444', bgColor: '#FEF2F2', onClick: handleLogoutClick },
  ];

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
          Akun
        </h1>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto" style={{ backgroundColor: '#F8F9FA' }}>
        {/* Profile Section */}
        <div className="px-6 py-6 flex flex-col items-center mb-4 bg-white">
          <div 
            className="w-20 h-20 rounded-full flex items-center justify-center mb-3"
            style={{ 
              background: 'linear-gradient(135deg, #F97316 0%, #FB923C 100%)',
              boxShadow: '0 4px 12px rgba(249, 115, 22, 0.3)'
            }}
          >
            <span className="text-3xl" style={{ color: '#FFFFFF', fontWeight: '700' }}>S</span>
          </div>
          <div className="flex items-center justify-center gap-1 mb-1">
            <div className="text-lg" style={{ color: '#1E293B', fontWeight: '700' }}>
              Siti Aisyah
            </div>
            <button
              onClick={() => navigate('/edit-profile')}
              className="flex items-center justify-center transition-all active:scale-95"
              style={{ opacity: 0.5, padding: '2px' }}
            >
              <Edit2 size={14} style={{ color: '#64748B' }} />
            </button>
          </div>
          <div 
            className="text-xs px-3 py-1 rounded-full" 
            style={{ 
              color: '#64748B',
              backgroundColor: '#F8F9FA',
              fontWeight: '600'
            }}
          >
            ID: DU-2024-12345
          </div>
        </div>

        {/* Menu List */}
        <div className="px-6 pb-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className="w-full p-3.5 flex items-center justify-between rounded-xl transition-all active:scale-98"
              style={{ 
                backgroundColor: '#FFFFFF',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
              }}
              onClick={() => item.link && navigate(item.link) || item.onClick && item.onClick()}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="flex items-center justify-center w-9 h-9 rounded-full"
                  style={{ backgroundColor: item.bgColor }}
                >
                  <item.icon size={18} style={{ color: item.color }} />
                </div>
                <span className="text-sm" style={{ color: item.color, fontWeight: '500' }}>
                  {item.label}
                </span>
              </div>
              {item.hasChevron && (
                <ChevronRight size={18} style={{ color: '#94A3B8' }} />
              )}
            </button>
          ))}
        </div>

        {/* Delete Account - Danger Zone */}
        <div className="px-6 pb-6">
          <div className="text-xs mb-2 text-center" style={{ color: '#94A3B8' }}>
            ZONA BERBAHAYA
          </div>
          <button
            onClick={() => navigate('/delete-account')}
            className="w-full p-3.5 flex items-center justify-center gap-2 rounded-xl transition-all active:scale-98"
            style={{ 
              backgroundColor: '#FAFAFA',
              border: '1.5px solid #E9ECEF'
            }}
          >
            <span className="text-sm" style={{ color: '#94A3B8', fontWeight: '500' }}>
              Hapus Akun Permanen
            </span>
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

      {/* Logout Confirmation */}
      {showLogoutConfirm && (
        <LogoutConfirmation
          isOpen={showLogoutConfirm}
          onConfirm={handleLogoutConfirm}
          onClose={() => setShowLogoutConfirm(false)}
        />
      )}
    </>
  );
}