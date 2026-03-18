import { ArrowLeft, Star, Send, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { goBack } from '../../lib/nav';

export function RateService() {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [feedback, setFeedback] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const tags = [
    { id: 'fast', label: 'Respon Cepat', emoji: '⚡' },
    { id: 'helpful', label: 'Sangat Membantu', emoji: '👍' },
    { id: 'professional', label: 'Profesional', emoji: '💼' },
    { id: 'friendly', label: 'Ramah', emoji: '😊' },
    { id: 'clear', label: 'Penjelasan Jelas', emoji: '💡' },
    { id: 'patient', label: 'Sabar', emoji: '🙏' },
  ];

  const ratingLabels = [
    '',
    'Sangat Buruk',
    'Buruk',
    'Cukup',
    'Baik',
    'Sangat Baik'
  ];

  const toggleTag = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter(t => t !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  const handleSubmit = () => {
    if (rating > 0) {
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/customer-service');
      }, 2000);
    }
  };

  const isFormValid = rating > 0;

  if (showSuccess) {
    return (
      <div className="flex-1 flex items-center justify-center px-6" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="text-center">
          <div 
            className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: '#FFF7ED' }}
          >
            <CheckCircle2 size={48} style={{ color: '#F97316' }} fill="#F97316" strokeWidth={0} />
          </div>
          <h2 className="text-2xl mb-3" style={{ color: '#1E293B', fontWeight: '700' }}>
            Terima Kasih!
          </h2>
          <p className="text-base mb-2" style={{ color: '#64748B', lineHeight: '1.6' }}>
            Rating Anda sangat berarti untuk kami
          </p>
          <p className="text-sm" style={{ color: '#94A3B8', lineHeight: '1.5' }}>
            Kami akan terus meningkatkan kualitas layanan
          </p>
          <div className="mt-6 flex items-center justify-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={32}
                style={{ color: '#F97316' }}
                fill={star <= rating ? '#F97316' : 'none'}
              />
            ))}
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
          Nilai Layanan
        </h1>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6" style={{ backgroundColor: '#F8F9FA' }}>
        {/* Header Card */}
        <div 
          className="mb-6 p-6 rounded-2xl text-center"
          style={{ 
            backgroundColor: '#FFFFFF',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)'
          }}
        >
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ 
              background: 'linear-gradient(135deg, #F97316 0%, #FB923C 100%)',
            }}
          >
            <span className="text-3xl">👨‍💼</span>
          </div>
          <h2 className="text-lg mb-2" style={{ color: '#1E293B', fontWeight: '700' }}>
            Admin CS
          </h2>
          <p className="text-sm" style={{ color: '#64748B' }}>
            Bagaimana pengalaman Anda dengan layanan kami?
          </p>
        </div>

        {/* Rating Stars */}
        <div className="mb-6">
          <label className="block text-sm mb-4 text-center" style={{ color: '#1E293B', fontWeight: '700' }}>
            Berikan Rating *
          </label>
          <div className="flex items-center justify-center gap-2 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-all active:scale-90"
              >
                <Star
                  size={48}
                  style={{ 
                    color: '#F97316',
                    transition: 'all 0.2s'
                  }}
                  fill={star <= (hoveredRating || rating) ? '#F97316' : 'none'}
                />
              </button>
            ))}
          </div>
          {(hoveredRating || rating) > 0 && (
            <div 
              className="text-center text-lg"
              style={{ 
                color: '#F97316',
                fontWeight: '700'
              }}
            >
              {ratingLabels[hoveredRating || rating]}
            </div>
          )}
        </div>

        {/* Quick Tags */}
        {rating > 0 && (
          <div className="mb-6">
            <label className="block text-sm mb-3" style={{ color: '#1E293B', fontWeight: '700' }}>
              Yang Anda Sukai (Opsional)
            </label>
            <div className="grid grid-cols-2 gap-3">
              {tags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => toggleTag(tag.id)}
                  className="p-3 rounded-xl transition-all active:scale-98 flex items-center gap-2"
                  style={{
                    backgroundColor: selectedTags.includes(tag.id) ? '#FFF7ED' : '#FFFFFF',
                    border: `1.5px solid ${selectedTags.includes(tag.id) ? '#F97316' : '#E9ECEF'}`,
                    boxShadow: selectedTags.includes(tag.id) ? '0 2px 8px rgba(249, 115, 22, 0.15)' : '0 1px 3px rgba(0, 0, 0, 0.05)'
                  }}
                >
                  <span style={{ fontSize: '20px' }}>{tag.emoji}</span>
                  <span 
                    className="text-sm"
                    style={{ 
                      color: selectedTags.includes(tag.id) ? '#F97316' : '#64748B',
                      fontWeight: selectedTags.includes(tag.id) ? '700' : '500'
                    }}
                  >
                    {tag.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Feedback Text */}
        {rating > 0 && (
          <div className="mb-6">
            <label className="block text-sm mb-3" style={{ color: '#1E293B', fontWeight: '700' }}>
              Saran & Masukan (Opsional)
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Ceritakan pengalaman Anda atau berikan saran untuk kami..."
              rows={5}
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
              {feedback.length} / 300 karakter
            </div>
          </div>
        )}

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
          <span>Kirim Rating</span>
        </button>

        {/* Info */}
        {!rating && (
          <div 
            className="mt-6 p-4 rounded-xl"
            style={{ 
              backgroundColor: '#FFFBEB',
              border: '1px solid #FDE68A'
            }}
          >
            <p className="text-sm text-center" style={{ color: '#92400E', lineHeight: '1.5' }}>
              Rating Anda membantu kami memberikan layanan yang lebih baik untuk semua pengguna Duitin
            </p>
          </div>
        )}
      </div>

      <style>{`
        .active\\:scale-98:active {
          transform: scale(0.98);
        }
        .active\\:scale-95:active {
          transform: scale(0.95);
        }
        .active\\:scale-90:active {
          transform: scale(0.9);
        }
      `}</style>
    </>
  );
}
