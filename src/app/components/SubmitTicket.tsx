import { ArrowLeft, AlertCircle, Send, Image as ImageIcon, Paperclip, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { goBack } from '../../lib/nav';

export function SubmitTicket() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [showSuccess, setShowSuccess] = useState(false);

  const categories = [
    { id: 'payment', label: 'Masalah Pembayaran', icon: '💰' },
    { id: 'task', label: 'Masalah Tugas', icon: '📋' },
    { id: 'account', label: 'Akun & Verifikasi', icon: '👤' },
    { id: 'technical', label: 'Masalah Teknis', icon: '🔧' },
    { id: 'reward', label: 'Reward & Bonus', icon: '💎' },
    { id: 'other', label: 'Lainnya', icon: '📝' },
  ];

  const priorities = [
    { id: 'low', label: 'Rendah', color: '#10B981', bgColor: '#DCFCE7' },
    { id: 'medium', label: 'Sedang', color: '#F97316', bgColor: '#FFF7ED' },
    { id: 'high', label: 'Tinggi', color: '#EF4444', bgColor: '#FEF2F2' },
  ];

  const handleSubmit = () => {
    if (selectedCategory && title && description) {
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/customer-service');
      }, 2000);
    }
  };

  const isFormValid = selectedCategory && title.trim() && description.trim();

  if (showSuccess) {
    return (
      <div className="flex-1 flex items-center justify-center px-6" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="text-center">
          <div 
            className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: '#DCFCE7' }}
          >
            <CheckCircle2 size={48} style={{ color: '#10B981' }} fill="#10B981" strokeWidth={0} />
          </div>
          <h2 className="text-2xl mb-3" style={{ color: '#1E293B', fontWeight: '700' }}>
            Tiket Terkirim!
          </h2>
          <p className="text-base mb-6" style={{ color: '#64748B', lineHeight: '1.6' }}>
            Tim kami akan segera meninjau dan merespons tiket Anda dalam waktu 24 jam
          </p>
          <div 
            className="px-6 py-3 rounded-xl inline-block"
            style={{ 
              backgroundColor: '#FFF7ED',
              border: '1.5px solid #F97316'
            }}
          >
            <span className="text-sm" style={{ color: '#F97316', fontWeight: '600' }}>
              Nomor Tiket: #TKT-{Date.now().toString().slice(-6)}
            </span>
          </div>
        </div>
      </div>
    );
  }

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
          Buat Tiket Bantuan
        </h1>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6" style={{ backgroundColor: '#F8F9FA' }}>
        {/* Info Banner */}
        <div 
          className="mb-6 p-4 rounded-xl flex gap-3"
          style={{ 
            backgroundColor: '#EFF6FF',
            border: '1.5px solid #BFDBFE'
          }}
        >
          <AlertCircle size={20} style={{ color: '#3B82F6', flexShrink: 0 }} className="mt-0.5" />
          <p className="text-sm" style={{ color: '#1E40AF', lineHeight: '1.5' }}>
            Untuk respons lebih cepat, pastikan Anda memberikan informasi selengkap mungkin tentang masalah yang dihadapi.
          </p>
        </div>

        {/* Category Selection */}
        <div className="mb-6">
          <label className="block text-sm mb-3" style={{ color: '#1E293B', fontWeight: '700' }}>
            Kategori Masalah *
          </label>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className="p-4 rounded-xl transition-all active:scale-98 text-left"
                style={{
                  backgroundColor: selectedCategory === category.id ? '#FFF7ED' : '#FFFFFF',
                  border: `1.5px solid ${selectedCategory === category.id ? '#F97316' : '#E9ECEF'}`,
                  boxShadow: selectedCategory === category.id ? '0 2px 8px rgba(249, 115, 22, 0.15)' : '0 1px 3px rgba(0, 0, 0, 0.05)'
                }}
              >
                <div className="text-2xl mb-2">{category.icon}</div>
                <div 
                  className="text-sm"
                  style={{ 
                    color: selectedCategory === category.id ? '#F97316' : '#1E293B',
                    fontWeight: selectedCategory === category.id ? '700' : '600'
                  }}
                >
                  {category.label}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Title */}
        <div className="mb-6">
          <label className="block text-sm mb-3" style={{ color: '#1E293B', fontWeight: '700' }}>
            Judul Masalah *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Contoh: Penarikan dana tertunda 3 hari"
            className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
            style={{
              backgroundColor: '#FFFFFF',
              border: '1.5px solid #E9ECEF',
              color: '#1E293B'
            }}
            onFocus={(e) => e.target.style.borderColor = '#F97316'}
            onBlur={(e) => e.target.style.borderColor = '#E9ECEF'}
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-sm mb-3" style={{ color: '#1E293B', fontWeight: '700' }}>
            Deskripsi Detail *
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Jelaskan masalah Anda secara detail..."
            rows={6}
            className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all resize-none"
            style={{
              backgroundColor: '#FFFFFF',
              border: '1.5px solid #E9ECEF',
              color: '#1E293B',
              lineHeight: '1.6'
            }}
            onFocus={(e) => e.target.style.borderColor = '#F97316'}
            onBlur={(e) => e.target.style.borderColor = '#E9ECEF'}
          />
          <div className="mt-2 text-xs text-right" style={{ color: '#94A3B8' }}>
            {description.length} / 500 karakter
          </div>
        </div>

        {/* Priority */}
        <div className="mb-6">
          <label className="block text-sm mb-3" style={{ color: '#1E293B', fontWeight: '700' }}>
            Prioritas
          </label>
          <div className="flex gap-3">
            {priorities.map((p) => (
              <button
                key={p.id}
                onClick={() => setPriority(p.id)}
                className="flex-1 py-3 px-4 rounded-xl transition-all active:scale-98"
                style={{
                  backgroundColor: priority === p.id ? p.bgColor : '#FFFFFF',
                  border: `1.5px solid ${priority === p.id ? p.color : '#E9ECEF'}`,
                  color: priority === p.id ? p.color : '#64748B',
                  fontWeight: priority === p.id ? '700' : '500',
                  fontSize: '14px'
                }}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Attachments */}
        <div className="mb-6">
          <label className="block text-sm mb-3" style={{ color: '#1E293B', fontWeight: '700' }}>
            Lampiran (Opsional)
          </label>
          <div className="flex gap-3">
            <button 
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all active:scale-98"
              style={{ 
                backgroundColor: '#FFFFFF',
                border: '1.5px dashed #E9ECEF',
                color: '#64748B',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              <ImageIcon size={18} />
              <span>Tambah Foto</span>
            </button>
            <button 
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all active:scale-98"
              style={{ 
                backgroundColor: '#FFFFFF',
                border: '1.5px dashed #E9ECEF',
                color: '#64748B',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              <Paperclip size={18} />
              <span>Tambah File</span>
            </button>
          </div>
          <p className="mt-2 text-xs" style={{ color: '#94A3B8' }}>
            Format: JPG, PNG, PDF (Maks. 5MB)
          </p>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className="w-full py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-98"
          style={{
            backgroundColor: isFormValid ? '#F97316' : '#E9ECEF',
            color: isFormValid ? '#FFFFFF' : '#94A3B8',
            fontWeight: '700',
            fontSize: '16px',
            cursor: isFormValid ? 'pointer' : 'not-allowed',
            boxShadow: isFormValid ? '0 4px 12px rgba(249, 115, 22, 0.25)' : 'none'
          }}
        >
          <Send size={20} />
          <span>Kirim Tiket</span>
        </button>

        <p className="mt-4 text-center text-xs" style={{ color: '#94A3B8', lineHeight: '1.5' }}>
          Dengan mengirim tiket, Anda menyetujui bahwa tim kami dapat mengakses informasi akun Anda untuk membantu menyelesaikan masalah
        </p>
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
