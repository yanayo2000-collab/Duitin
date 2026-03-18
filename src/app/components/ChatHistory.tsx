import { ArrowLeft, MessageSquare, Clock, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { goBack } from '../../lib/nav';

export function ChatHistory() {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState('semua');

  const chatSessions = [
    {
      id: 1,
      title: 'Masalah penarikan dana',
      lastMessage: 'Terima kasih atas bantuannya!',
      date: '9 Mar 2026',
      time: '14:30',
      status: 'resolved',
      unread: 0,
      admin: 'Admin CS',
      messageCount: 12
    },
    {
      id: 2,
      title: 'Tugas tidak terupdate',
      lastMessage: 'Baik, saya akan coba lagi',
      date: '9 Mar 2026',
      time: '11:20',
      status: 'resolved',
      unread: 0,
      admin: 'Admin Rina',
      messageCount: 8
    },
    {
      id: 3,
      title: 'Pertanyaan bonus referral',
      lastMessage: 'Mohon tunggu sebentar...',
      date: '8 Mar 2026',
      time: '16:45',
      status: 'active',
      unread: 2,
      admin: 'Admin Budi',
      messageCount: 15
    },
    {
      id: 4,
      title: 'Verifikasi akun',
      lastMessage: 'Dokumen sudah saya kirim',
      date: '8 Mar 2026',
      time: '09:15',
      status: 'resolved',
      unread: 0,
      admin: 'Admin CS',
      messageCount: 6
    },
    {
      id: 5,
      title: 'Bug pada aplikasi',
      lastMessage: 'Tim teknis sedang menangani',
      date: '7 Mar 2026',
      time: '18:30',
      status: 'pending',
      unread: 1,
      admin: 'Admin Tech',
      messageCount: 10
    },
    {
      id: 6,
      title: 'Pertanyaan reward',
      lastMessage: 'Sudah jelas, terima kasih!',
      date: '6 Mar 2026',
      time: '13:00',
      status: 'resolved',
      unread: 0,
      admin: 'Admin Rina',
      messageCount: 5
    },
  ];

  const filters = [
    { id: 'semua', label: 'Semua', count: chatSessions.length },
    { id: 'active', label: 'Aktif', count: chatSessions.filter(s => s.status === 'active').length },
    { id: 'pending', label: 'Pending', count: chatSessions.filter(s => s.status === 'pending').length },
    { id: 'resolved', label: 'Selesai', count: chatSessions.filter(s => s.status === 'resolved').length },
  ];

  const filteredSessions = selectedFilter === 'semua' 
    ? chatSessions 
    : chatSessions.filter(s => s.status === selectedFilter);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle2 size={16} style={{ color: '#10B981' }} fill="#10B981" strokeWidth={0} />;
      case 'active':
        return <MessageSquare size={16} style={{ color: '#F97316' }} />;
      case 'pending':
        return <Clock size={16} style={{ color: '#EAB308' }} />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'Selesai';
      case 'active':
        return 'Aktif';
      case 'pending':
        return 'Pending';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return '#10B981';
      case 'active':
        return '#F97316';
      case 'pending':
        return '#EAB308';
      default:
        return '#94A3B8';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'resolved':
        return '#DCFCE7';
      case 'active':
        return '#FFF7ED';
      case 'pending':
        return '#FEF9C3';
      default:
        return '#F8F9FA';
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
          Riwayat Chat
        </h1>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6" style={{ backgroundColor: '#F8F9FA' }}>
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div 
            className="p-4 rounded-xl text-center"
            style={{ 
              backgroundColor: '#FFFFFF',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)'
            }}
          >
            <div className="text-2xl mb-1" style={{ color: '#F97316', fontWeight: '700' }}>
              {chatSessions.filter(s => s.status === 'active').length}
            </div>
            <div className="text-xs" style={{ color: '#64748B', fontWeight: '600' }}>
              Aktif
            </div>
          </div>
          <div 
            className="p-4 rounded-xl text-center"
            style={{ 
              backgroundColor: '#FFFFFF',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)'
            }}
          >
            <div className="text-2xl mb-1" style={{ color: '#EAB308', fontWeight: '700' }}>
              {chatSessions.filter(s => s.status === 'pending').length}
            </div>
            <div className="text-xs" style={{ color: '#64748B', fontWeight: '600' }}>
              Pending
            </div>
          </div>
          <div 
            className="p-4 rounded-xl text-center"
            style={{ 
              backgroundColor: '#FFFFFF',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)'
            }}
          >
            <div className="text-2xl mb-1" style={{ color: '#10B981', fontWeight: '700' }}>
              {chatSessions.filter(s => s.status === 'resolved').length}
            </div>
            <div className="text-xs" style={{ color: '#64748B', fontWeight: '600' }}>
              Selesai
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className="px-4 py-2 rounded-lg whitespace-nowrap transition-all active:scale-95 flex items-center gap-2"
              style={{
                backgroundColor: selectedFilter === filter.id ? '#FFF7ED' : '#FFFFFF',
                color: selectedFilter === filter.id ? '#F97316' : '#64748B',
                border: `1.5px solid ${selectedFilter === filter.id ? '#F97316' : '#E9ECEF'}`,
                fontWeight: selectedFilter === filter.id ? '700' : '500',
                fontSize: '14px'
              }}
            >
              <span>{filter.label}</span>
              <span 
                className="px-2 py-0.5 rounded-full text-xs"
                style={{
                  backgroundColor: selectedFilter === filter.id ? '#F97316' : '#E9ECEF',
                  color: selectedFilter === filter.id ? '#FFFFFF' : '#64748B',
                  fontWeight: '700'
                }}
              >
                {filter.count}
              </span>
            </button>
          ))}
        </div>

        {/* Chat Sessions */}
        <div className="space-y-3">
          {filteredSessions.length > 0 ? (
            filteredSessions.map((session) => (
              <div
                key={session.id}
                className="p-4 rounded-xl transition-all active:scale-98 cursor-pointer"
                style={{
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                  border: session.unread > 0 ? '1.5px solid #F97316' : '1.5px solid transparent'
                }}
                onClick={() => navigate('/customer-service')}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base" style={{ color: '#1E293B', fontWeight: '700' }}>
                        {session.title}
                      </h3>
                      {session.unread > 0 && (
                        <div 
                          className="w-5 h-5 rounded-full flex items-center justify-center text-xs"
                          style={{ 
                            backgroundColor: '#F97316',
                            color: '#FFFFFF',
                            fontWeight: '700'
                          }}
                        >
                          {session.unread}
                        </div>
                      )}
                    </div>
                    <p className="text-sm mb-2" style={{ color: '#64748B', lineHeight: '1.4' }}>
                      {session.lastMessage}
                    </p>
                    <div className="flex items-center gap-2 text-xs" style={{ color: '#94A3B8' }}>
                      <span>{session.admin}</span>
                      <span>•</span>
                      <span>{session.messageCount} pesan</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs mb-2" style={{ color: '#94A3B8', fontWeight: '500' }}>
                      {session.date}
                    </div>
                    <div className="text-xs" style={{ color: '#94A3B8', fontWeight: '500' }}>
                      {session.time}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div 
                    className="text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5"
                    style={{
                      backgroundColor: getStatusBg(session.status),
                      color: getStatusColor(session.status),
                      fontWeight: '600'
                    }}
                  >
                    {getStatusIcon(session.status)}
                    <span>{getStatusText(session.status)}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div 
              className="p-8 rounded-xl text-center"
              style={{ 
                backgroundColor: '#FFFFFF',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
              }}
            >
              <div className="text-4xl mb-3">💬</div>
              <div className="text-base mb-1" style={{ color: '#1E293B', fontWeight: '600' }}>
                Tidak ada riwayat
              </div>
              <div className="text-sm" style={{ color: '#64748B' }}>
                Belum ada percakapan dengan status ini
              </div>
            </div>
          )}
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
