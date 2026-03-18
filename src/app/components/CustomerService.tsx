import { Send, Image as ImageIcon, Paperclip, MoreVertical, History, FileText, Star, ArrowLeft } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';

export function CustomerService() {
  const navigate = useNavigate();
  const location = useLocation();
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'received',
      text: 'Halo! Selamat datang di layanan customer service Duitin. Ada yang bisa saya bantu?',
      time: '10:30',
      sender: 'Admin CS',
      avatar: '👨‍💼'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasAutoSent = useRef(false);

  const quickReplies = [
    'Cara penarikan saldo',
    'Status tugas saya',
    'Masalah pembayaran',
    'Laporkan bug'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-send preset message if passed via navigation state
  useEffect(() => {
    if (!hasAutoSent.current && location.state?.presetMessage) {
      hasAutoSent.current = true;
      const presetMessage = location.state.presetMessage;
      
      // Wait a bit before sending to make it feel natural
      setTimeout(() => {
        const currentTime = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
        const newMessage = {
          id: Date.now(),
          type: 'sent' as const,
          text: presetMessage,
          time: currentTime,
          sender: 'Anda',
          avatar: '👤'
        };
        
        setMessages(prev => [...prev, newMessage]);

        // Simulate auto-reply after 1.5 seconds
        setTimeout(() => {
          const replyTime = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
          const autoReply = {
            id: Date.now() + 1,
            type: 'received' as const,
            text: 'Terima kasih atas minat Anda pada posisi VIP Host! Tim manajer kami akan segera menghubungi Anda untuk diskusi lebih lanjut. Mohon siapkan foto selfie dan dokumen identitas untuk proses verifikasi.',
            time: replyTime,
            sender: 'Admin CS',
            avatar: '👨‍💼'
          };
          setMessages(prev => [...prev, autoReply]);
        }, 1500);
      }, 500);
    }
  }, [location.state]);

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: 'sent' as const,
        text: inputText,
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        sender: 'Anda',
        avatar: '👤'
      };
      
      setMessages([...messages, newMessage]);
      setInputText('');

      // Simulate auto-reply after 1.5 seconds
      setTimeout(() => {
        const autoReply = {
          id: messages.length + 2,
          type: 'received' as const,
          text: 'Terima kasih atas pertanyaan Anda. Tim kami sedang meninjau dan akan segera membantu Anda.',
          time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
          sender: 'Admin CS',
          avatar: '👨‍💼'
        };
        setMessages(prev => [...prev, autoReply]);
      }, 1500);
    }
  };

  const handleQuickReply = (reply: string) => {
    setInputText(reply);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Header */}
      <div className="px-6 py-4 border-b bg-white" style={{ borderColor: '#E9ECEF' }}>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-95"
            style={{ backgroundColor: '#F1F5F9' }}
            aria-label="Kembali"
          >
            <ArrowLeft size={20} style={{ color: '#1E293B' }} />
          </button>

          <div className="flex-1 min-w-0">
            <h1 className="text-base truncate" style={{ color: '#1E293B', fontWeight: '700' }}>
              Customer Service
            </h1>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#10B981' }} />
              <span className="text-xs" style={{ color: '#10B981', fontWeight: '600' }}>
                Online
              </span>
            </div>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-95"
              style={{
                backgroundColor: showMenu ? '#FFF7ED' : '#F8F9FA'
              }}
            >
              <MoreVertical size={20} style={{ color: showMenu ? '#F97316' : '#64748B' }} />
            </button>
            {showMenu && (
              <>
                <div 
                  className="fixed inset-0 z-10"
                  onClick={() => setShowMenu(false)}
                />
                <div 
                  className="absolute right-0 top-12 w-56 rounded-xl overflow-hidden z-20"
                  style={{ 
                    backgroundColor: '#FFFFFF',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #E9ECEF'
                  }}
                >
                  <button
                    onClick={() => {
                      navigate('/chat-history');
                      setShowMenu(false);
                    }}
                    className="w-full px-4 py-3 flex items-center gap-3 transition-all"
                    style={{ 
                      backgroundColor: '#FFFFFF',
                      borderBottom: '1px solid #F8F9FA'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFF7ED'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
                  >
                    <History size={18} style={{ color: '#F97316' }} />
                    <span className="text-sm" style={{ color: '#1E293B', fontWeight: '600' }}>
                      Riwayat Chat
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      navigate('/submit-ticket');
                      setShowMenu(false);
                    }}
                    className="w-full px-4 py-3 flex items-center gap-3 transition-all"
                    style={{ 
                      backgroundColor: '#FFFFFF',
                      borderBottom: '1px solid #F8F9FA'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFF7ED'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
                  >
                    <FileText size={18} style={{ color: '#F97316' }} />
                    <span className="text-sm" style={{ color: '#1E293B', fontWeight: '600' }}>
                      Buat Tiket
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      navigate('/rate-service');
                      setShowMenu(false);
                    }}
                    className="w-full px-4 py-3 flex items-center gap-3 transition-all"
                    style={{ backgroundColor: '#FFFFFF' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFF7ED'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
                  >
                    <Star size={18} style={{ color: '#F97316' }} />
                    <span className="text-sm" style={{ color: '#1E293B', fontWeight: '600' }}>
                      Nilai Layanan
                    </span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div 
        className="flex-1 overflow-y-auto px-6 py-4"
        style={{ backgroundColor: '#F8F9FA' }}
      >
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'sent' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-2 max-w-[75%] ${message.type === 'sent' ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ 
                    backgroundColor: message.type === 'sent' ? '#FFF7ED' : '#EFF6FF',
                    fontSize: '16px'
                  }}
                >
                  {message.avatar}
                </div>

                {/* Message Bubble */}
                <div>
                  <div 
                    className="px-4 py-2.5 rounded-2xl"
                    style={{
                      backgroundColor: message.type === 'sent' ? '#F97316' : '#FFFFFF',
                      color: message.type === 'sent' ? '#FFFFFF' : '#1E293B',
                      boxShadow: message.type === 'received' ? '0 1px 2px rgba(0, 0, 0, 0.05)' : 'none',
                      borderTopRightRadius: message.type === 'sent' ? '4px' : '16px',
                      borderTopLeftRadius: message.type === 'received' ? '4px' : '16px'
                    }}
                  >
                    <p className="text-sm" style={{ lineHeight: '1.5' }}>
                      {message.text}
                    </p>
                  </div>
                  <div 
                    className={`text-xs mt-1 ${message.type === 'sent' ? 'text-right' : 'text-left'}`}
                    style={{ color: '#94A3B8', fontWeight: '500' }}
                  >
                    {message.time}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        {messages.length <= 2 && !location.state?.presetMessage && (
          <div className="mt-6">
            <div className="text-xs mb-3 text-center" style={{ color: '#64748B', fontWeight: '600' }}>
              Topik yang sering ditanyakan
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickReply(reply)}
                  className="px-4 py-2 rounded-full transition-all active:scale-95"
                  style={{
                    backgroundColor: '#FFFFFF',
                    color: '#F97316',
                    border: '1.5px solid #F97316',
                    fontSize: '13px',
                    fontWeight: '600',
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
                  }}
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div 
        className="px-6 py-4 border-t bg-white"
        style={{ borderColor: '#E9ECEF' }}
      >
        {/* Tools */}
        <div className="flex gap-3 mb-3">
          <button 
            className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all active:scale-95"
            style={{ 
              backgroundColor: '#F8F9FA',
              color: '#64748B',
              fontSize: '13px',
              fontWeight: '600'
            }}
          >
            <ImageIcon size={16} />
            <span>Foto</span>
          </button>
          <button 
            className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all active:scale-95"
            style={{ 
              backgroundColor: '#F8F9FA',
              color: '#64748B',
              fontSize: '13px',
              fontWeight: '600'
            }}
          >
            <Paperclip size={16} />
            <span>File</span>
          </button>
        </div>

        {/* Input Box */}
        <div className="flex gap-2">
          <div 
            className="flex-1 flex items-center px-4 py-2 rounded-xl"
            style={{ 
              backgroundColor: '#F8F9FA',
              border: '1.5px solid #E9ECEF'
            }}
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ketik pesan Anda..."
              className="flex-1 bg-transparent text-sm outline-none"
              style={{ color: '#1E293B' }}
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!inputText.trim()}
            className="w-12 h-12 rounded-xl flex items-center justify-center transition-all active:scale-95"
            style={{
              backgroundColor: inputText.trim() ? '#F97316' : '#E9ECEF',
              cursor: inputText.trim() ? 'pointer' : 'not-allowed',
              boxShadow: inputText.trim() ? '0 2px 8px rgba(249, 115, 22, 0.25)' : 'none'
            }}
          >
            <Send 
              size={20} 
              style={{ color: inputText.trim() ? '#FFFFFF' : '#94A3B8' }}
            />
          </button>
        </div>

        {/* Info */}
        <div className="mt-3 text-center">
          <p className="text-xs" style={{ color: '#94A3B8' }}>
            Tim CS kami siap membantu Anda 24/7
          </p>
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