import { ArrowLeft, Copy, Share2, Check, Gift, Users } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useState } from 'react';

export function Invite() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const inviteCode = 'ABC123';

  const inviteHistory = [
    { id: 1, name: 'Ahmad Rizky', status: 'completed', bonus: 500 },
    { id: 2, name: 'Dewi Lestari', status: 'completed', bonus: 500 },
    { id: 3, name: 'Budi Santoso', status: 'joined', bonus: 0 },
    { id: 4, name: 'Rina Maharani', status: 'pending', bonus: 0 },
  ];

  const handleCopy = () => {
    // Fallback copy function that works without clipboard permissions
    const textArea = document.createElement('textarea');
    textArea.value = inviteCode;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
    
    document.body.removeChild(textArea);
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Selesaikan misi';
      case 'joined':
        return 'Bergabung';
      case 'pending':
        return 'Menunggu';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#10B981';
      case 'joined':
        return '#F97316';
      case 'pending':
        return '#94A3B8';
      default:
        return '#94A3B8';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'completed':
        return '#F0FDF4';
      case 'joined':
        return '#FFF7ED';
      case 'pending':
        return '#F8F9FA';
      default:
        return '#F8F9FA';
    }
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
        <h1 className="text-xl" style={{ color: '#1E293B', fontWeight: '700' }}>
          Ajak Teman
        </h1>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6" style={{ backgroundColor: '#F8F9FA' }}>
        {/* Bonus Card */}
        <div 
          className="mb-6 p-6 rounded-2xl relative overflow-hidden"
          style={{ 
            background: 'linear-gradient(135deg, #F97316 0%, #FB923C 100%)',
            boxShadow: '0 4px 12px rgba(249, 115, 22, 0.25)'
          }}
        >
          <div className="flex items-start gap-3 mb-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-full" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
              <Gift size={24} style={{ color: '#FFFFFF' }} />
            </div>
            <div className="flex-1">
              <h2 className="text-lg mb-2" style={{ color: '#FFFFFF', fontWeight: '700' }}>
                Bonus Ajak Teman
              </h2>
              <p className="text-sm" style={{ color: '#FFF7ED' }}>
                Dapatkan 💎 500 untuk setiap teman yang bergabung dan selesaikan misi pertama!
              </p>
            </div>
          </div>
        </div>

        {/* Invite Code Box */}
        <div 
          className="mb-4 rounded-2xl overflow-hidden"
          style={{ 
            backgroundColor: '#FFFFFF',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)'
          }}
        >
          <div className="flex items-center gap-2 p-6">
            <div className="flex-1">
              <div className="text-xs mb-2" style={{ color: '#64748B', fontWeight: '600' }}>
                Kode Undangan
              </div>
              <div className="text-2xl tracking-wider" style={{ color: '#F97316', fontWeight: '700' }}>
                {inviteCode}
              </div>
            </div>
            <button 
              onClick={handleCopy}
              className="p-3 rounded-xl transition-all active:scale-95"
              style={{ 
                backgroundColor: copied ? '#F0FDF4' : '#FFF7ED',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
              }}
            >
              {copied ? (
                <Check size={24} style={{ color: '#10B981' }} />
              ) : (
                <Copy size={24} style={{ color: '#F97316' }} />
              )}
            </button>
          </div>
        </div>

        {/* Share Button */}
        <button 
          className="w-full py-3.5 rounded-xl flex items-center justify-center gap-2 mb-6 transition-all active:scale-98"
          style={{ 
            backgroundColor: '#FFF7ED',
            color: '#F97316',
            fontWeight: '700',
            border: '1.5px solid #F97316'
          }}
        >
          <Share2 size={20} />
          <span>Bagikan ke Teman</span>
        </button>

        {/* Invite History */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Users size={18} style={{ color: '#64748B' }} />
            <h3 className="text-base" style={{ color: '#1E293B', fontWeight: '700' }}>
              Riwayat Undangan
            </h3>
          </div>
          <div className="space-y-3">
            {inviteHistory.map((invite) => (
              <div 
                key={invite.id}
                className="p-4 rounded-xl"
                style={{ 
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-base" style={{ color: '#1E293B', fontWeight: '600' }}>
                    {invite.name}
                  </div>
                  {invite.bonus > 0 && (
                    <div 
                      className="flex items-center gap-1 px-2 py-1 rounded-lg"
                      style={{ backgroundColor: '#F0FDF4' }}
                    >
                      <span style={{ fontSize: '14px' }}>💎</span>
                      <span className="text-sm" style={{ color: '#10B981', fontWeight: '700' }}>
                        +{invite.bonus.toLocaleString('id-ID', { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                  )}
                </div>
                <div 
                  className="text-xs px-2 py-1 rounded-full inline-block"
                  style={{ 
                    color: getStatusColor(invite.status),
                    backgroundColor: getStatusBg(invite.status),
                    fontWeight: '600'
                  }}
                >
                  {getStatusText(invite.status)}
                </div>
              </div>
            ))}
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