import { useEffect } from 'react';
import { Home, Briefcase, Wallet, User, MessageCircle } from 'lucide-react';
import { useNavigate, Outlet, useLocation } from 'react-router';
import { clearToken, getToken } from '../../lib/api';

export function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveTab = () => {
    if (location.pathname === '/') return 'home';
    if (location.pathname === '/tasks') return 'tasks';
    if (location.pathname === '/my-wallet' || location.pathname === '/withdrawal-history') return 'wallet';
    if (location.pathname === '/services' || location.pathname === '/customer-service') return 'service';
    if (location.pathname === '/profile') return 'profile';
    return '';
  };

  const activeTab = getActiveTab();

  useEffect(() => {
    // Admin review page should stay reachable even without app user session.
    if (location.pathname.startsWith('/admin/')) return;

    const token = getToken();
    const sessionOk = sessionStorage.getItem('duitin_session_ok') === '1';

    if (!token || !sessionOk) {
      clearToken();
      navigate('/login', { replace: true });
    }
  }, [navigate, location.pathname]);

  const handleNavClick = (tab: string, path: string) => {
    navigate(path);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Mobile Container */}
      <div className="w-full max-w-[360px] h-[800px] bg-white flex flex-col relative overflow-hidden" style={{ boxShadow: '0 0 40px rgba(0, 0, 0, 0.1)' }}>
        {/* Page Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Outlet />
        </div>

        {/* Bottom Navigation - Pinned */}
        <div 
          className="border-t px-4 py-2 bg-white"
          style={{ 
            borderColor: '#E9ECEF',
            boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.04)'
          }}
        >
          <div className="flex items-center justify-around">
            <button 
              onClick={() => handleNavClick('home', '/')}
              className="flex flex-col items-center gap-0.5 py-2 px-2 rounded-xl transition-all active:scale-95"
              style={{
                backgroundColor: activeTab === 'home' ? '#FFF7ED' : 'transparent'
              }}
            >
              <Home 
                size={22} 
                style={{ color: activeTab === 'home' ? '#F97316' : '#64748B' }}
                fill={activeTab === 'home' ? '#F97316' : 'none'}
              />
              <span className="text-xs" style={{ color: activeTab === 'home' ? '#F97316' : '#64748B', fontWeight: activeTab === 'home' ? '700' : '500' }}>
                Beranda
              </span>
            </button>
            <button 
              onClick={() => handleNavClick('tasks', '/tasks')}
              className="flex flex-col items-center gap-0.5 py-2 px-2 rounded-xl transition-all active:scale-95"
              style={{
                backgroundColor: activeTab === 'tasks' ? '#FFF7ED' : 'transparent'
              }}
            >
              <Briefcase 
                size={22} 
                style={{ color: activeTab === 'tasks' ? '#F97316' : '#64748B' }}
              />
              <span className="text-xs" style={{ color: activeTab === 'tasks' ? '#F97316' : '#64748B', fontWeight: activeTab === 'tasks' ? '700' : '500' }}>
                Lowongan
              </span>
            </button>
            <button 
              onClick={() => handleNavClick('wallet', '/my-wallet')}
              className="flex flex-col items-center gap-0.5 py-2 px-2 rounded-xl transition-all active:scale-95"
              style={{
                backgroundColor: activeTab === 'wallet' ? '#FFF7ED' : 'transparent'
              }}
            >
              <Wallet 
                size={22} 
                style={{ color: activeTab === 'wallet' ? '#F97316' : '#64748B' }}
              />
              <span className="text-xs" style={{ color: activeTab === 'wallet' ? '#F97316' : '#64748B', fontWeight: activeTab === 'wallet' ? '700' : '500' }}>
                Dompet
              </span>
            </button>
            <button 
              onClick={() => handleNavClick('service', '/services')}
              className="flex flex-col items-center gap-0.5 py-2 px-2 rounded-xl transition-all active:scale-95"
              style={{
                backgroundColor: activeTab === 'service' ? '#FFF7ED' : 'transparent'
              }}
            >
              <MessageCircle 
                size={22} 
                style={{ color: activeTab === 'service' ? '#F97316' : '#64748B' }}
              />
              <span className="text-xs" style={{ color: activeTab === 'service' ? '#F97316' : '#64748B', fontWeight: activeTab === 'service' ? '700' : '500' }}>
                Layanan
              </span>
            </button>
            <button 
              onClick={() => handleNavClick('profile', '/profile')}
              className="flex flex-col items-center gap-0.5 py-2 px-2 rounded-xl transition-all active:scale-95"
              style={{
                backgroundColor: activeTab === 'profile' ? '#FFF7ED' : 'transparent'
              }}
            >
              <User 
                size={22} 
                style={{ color: activeTab === 'profile' ? '#F97316' : '#64748B' }}
              />
              <span className="text-xs" style={{ color: activeTab === 'profile' ? '#F97316' : '#64748B', fontWeight: activeTab === 'profile' ? '700' : '500' }}>
                Profil
              </span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .active\\:scale-95:active {
          transform: scale(0.95);
        }
      `}</style>
    </div>
  );
}