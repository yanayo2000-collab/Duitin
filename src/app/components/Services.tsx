import { ArrowLeft, MessageCircle, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router';
import { goBack } from '../../lib/nav';

export function Services() {
  const navigate = useNavigate();

  const primaryItems = [
    {
      id: 1,
      icon: MessageCircle,
      label: 'Chat Langsung',
      description: 'Hubungi tim support kami sekarang',
      color: '#F97316',
      bgColor: '#FFF7ED',
      link: '/customer-service',
    },
    {
      id: 2,
      icon: MessageSquare,
      label: 'Tiket Support',
      description: 'Buat tiket bantuan baru',
      color: '#10B981',
      bgColor: '#F0FDF4',
      link: '/submit-ticket',
    },
  ];

  return (
    <>
      <div className="px-6 py-4 flex items-center gap-4 border-b bg-white" style={{ borderColor: '#E9ECEF' }}>
        <button
          onClick={() => goBack(navigate)}
          className="flex items-center justify-center w-10 h-10 rounded-full transition-all hover:bg-gray-100 active:scale-95"
        >
          <ArrowLeft size={24} style={{ color: '#1E293B' }} />
        </button>
        <h1 className="text-xl" style={{ color: '#1E293B', fontWeight: '700' }}>
          Layanan
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-5" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="space-y-3 mb-5">
          {primaryItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.link)}
              className="w-full p-3.5 flex items-center gap-3 rounded-xl transition-all active:scale-98"
              style={{ backgroundColor: '#FFFFFF', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' }}
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0" style={{ backgroundColor: item.bgColor }}>
                <item.icon size={20} style={{ color: item.color }} />
              </div>
              <div className="flex-1 text-left">
                <div className="text-base" style={{ color: '#1E293B', fontWeight: '700' }}>
                  {item.label}
                </div>
                <div className="text-xs" style={{ color: '#64748B' }}>
                  {item.description}
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="text-xs" style={{ color: '#64748B', fontWeight: 600 }}>
          Butuh bantuan lain?
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          <button
            onClick={() => navigate('/terms-privacy')}
            className="px-3 py-1.5 rounded-full text-xs"
            style={{ backgroundColor: '#FFFFFF', color: '#475569', border: '1px solid #E2E8F0', fontWeight: 600 }}
          >
            Syarat & Privasi
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
    </>
  );
}
