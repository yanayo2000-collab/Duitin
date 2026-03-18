import { ArrowLeft, Star, CheckCircle2, Camera, Upload } from 'lucide-react';
import { useNavigate } from 'react-router';
import { goBack } from '../../lib/nav';
import { useState } from 'react';
import { apiRequest, setWalletCache } from '../../lib/api';

export function ProductReview() {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [hasPhoto, setHasPhoto] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const [claimError, setClaimError] = useState('');

  const reward = 8000;
  const minReviewLength = 50;

  const product = {
    name: 'Sepatu Olahraga Premium - Running Shoes',
    brand: 'SportMax',
    image: '👟',
    price: 'Rp 299.000'
  };

  const handleSubmit = () => {
    if (rating >= 4 && reviewCharCount >= minReviewLength) {
      setIsCompleted(true);
    }
  };

  const handlePhotoUpload = () => {
    setHasPhoto(true);
  };

  const handleClaim = async () => {
    if (isClaiming) return;
    try {
      setIsClaiming(true);
      setClaimError('');
      const finalReward = reward + (hasPhoto ? 200 : 0);
      const claim = await apiRequest('/api/rewards/claim', {
        method: 'POST',
        body: JSON.stringify({ code: 'mission_product_review', title: 'Review Produk', reward: finalReward }),
      });
      setWalletCache(Number(claim?.balance || finalReward), 0);
      navigate('/', { state: { rewardClaimed: true, rewardAmount: reward + (hasPhoto ? 200 : 0) } });
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Gagal klaim reward';
      setClaimError(msg.includes('already claimed') ? 'Reward sudah pernah diklaim.' : 'Klaim gagal, coba lagi.');
    } finally {
      setIsClaiming(false);
    }
  };

  const reviewCharCount = Array.from(reviewText.trim()).length;
  const canSubmit = rating >= 4 && reviewCharCount >= minReviewLength;
  const reviewProgress = Math.min((reviewCharCount / minReviewLength) * 100, 100);

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
          Review Produk
        </h1>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6" style={{ backgroundColor: '#F8F9FA' }}>
        {!isCompleted ? (
          <>
            {/* Reward Card */}
            <div 
              className="mb-6 p-4 rounded-xl"
              style={{ 
                backgroundColor: '#FFFFFF',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)'
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star size={20} style={{ color: '#F97316' }} fill="#F97316" />
                  <span className="text-sm" style={{ color: '#64748B', fontWeight: '500' }}>
                    Rating minimal 4 bintang
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg" style={{ backgroundColor: '#FFF7ED' }}>
                  <span style={{ fontSize: '16px' }}>💎</span>
                  <span className="text-base" style={{ color: '#F97316', fontWeight: '700' }}>
                    {reward.toLocaleString('id-ID', { maximumFractionDigits: 0 })}
                  </span>
                </div>
              </div>
            </div>

            {/* Product Card */}
            <div 
              className="mb-6 p-5 rounded-xl"
              style={{ 
                backgroundColor: '#FFFFFF',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)'
              }}
            >
              <div className="text-xs px-2 py-1 rounded inline-block mb-3" style={{ backgroundColor: '#FFF7ED', color: '#F97316', fontWeight: '700' }}>
                PRODUK UNTUK DIREVIEW
              </div>
              <div className="flex gap-4">
                <div 
                  className="w-20 h-20 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#F8F9FA', fontSize: '40px' }}
                >
                  {product.image}
                </div>
                <div className="flex-1">
                  <h3 className="text-base mb-1" style={{ color: '#1E293B', fontWeight: '700', lineHeight: '1.3' }}>
                    {product.name}
                  </h3>
                  <div className="text-sm mb-2" style={{ color: '#64748B' }}>
                    {product.brand}
                  </div>
                  <div className="text-base" style={{ color: '#F97316', fontWeight: '700' }}>
                    {product.price}
                  </div>
                </div>
              </div>
            </div>

            {/* Rating Section */}
            <div 
              className="mb-6 p-5 rounded-xl"
              style={{ 
                backgroundColor: '#FFFFFF',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
              }}
            >
              <h4 className="text-sm mb-4" style={{ color: '#1E293B', fontWeight: '700' }}>
                Berikan Rating
              </h4>
              <div className="flex items-center justify-center gap-3 mb-3">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    onClick={() => setRating(value)}
                    onMouseEnter={() => setHoveredRating(value)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-transform active:scale-95"
                  >
                    <Star
                      size={44}
                      style={{ 
                        color: (hoveredRating || rating) >= value ? '#F97316' : '#E9ECEF',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      fill={(hoveredRating || rating) >= value ? '#F97316' : 'transparent'}
                      strokeWidth={2}
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <div className="text-center">
                  <span className="text-sm px-3 py-1 rounded-full inline-block" style={{ 
                    backgroundColor: rating >= 4 ? '#DCFCE7' : '#FEF3C7',
                    color: rating >= 4 ? '#10B981' : '#F59E0B',
                    fontWeight: '600'
                  }}>
                    {rating === 5 ? 'Sempurna! ⭐' : rating === 4 ? 'Bagus Sekali ✓' : 'Minimal 4 bintang diperlukan'}
                  </span>
                </div>
              )}
            </div>

            {/* Review Text */}
            <div 
              className="mb-6 p-5 rounded-xl"
              style={{ 
                backgroundColor: '#FFFFFF',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm" style={{ color: '#1E293B', fontWeight: '700' }}>
                  Tulis Review
                </h4>
                <span className="text-xs" style={{ 
                  color: reviewCharCount >= minReviewLength ? '#10B981' : '#94A3B8',
                  fontWeight: '600'
                }}>
                  {reviewCharCount}/{minReviewLength}
                </span>
              </div>
              
              {/* Progress Bar */}
              {reviewCharCount > 0 && (
                <div className="w-full h-2 rounded-full mb-3" style={{ backgroundColor: '#E9ECEF' }}>
                  <div 
                    className="h-full rounded-full transition-all duration-300"
                    style={{ 
                      backgroundColor: reviewProgress >= 100 ? '#10B981' : '#F97316',
                      width: `${reviewProgress}%`
                    }}
                  />
                </div>
              )}

              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Bagikan pengalaman Anda dengan produk ini... (minimal 50 karakter)"
                rows={6}
                className="w-full p-4 rounded-xl text-sm resize-none"
                style={{ 
                  backgroundColor: '#F8F9FA',
                  border: '1.5px solid #E9ECEF',
                  color: '#1E293B',
                  outline: 'none'
                }}
              />
              
              <div className="mt-3 text-xs" style={{ color: '#64748B', lineHeight: '1.4' }}>
                💡 Tips: Jelaskan kualitas produk, kelebihan, kekurangan, dan apakah Anda merekomendasikan produk ini.
              </div>
              <div className="mt-2 text-xs" style={{ color: canSubmit ? '#10B981' : '#94A3B8', fontWeight: 600 }}>
                Syarat: rating ≥ 4 & panjang review ≥ 50 karakter.
              </div>
            </div>

            {/* Photo Upload (Bonus) */}
            <div 
              className="mb-6 p-5 rounded-xl"
              style={{ 
                backgroundColor: '#FFFFFF',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm" style={{ color: '#1E293B', fontWeight: '700' }}>
                  Tambahkan Foto
                </h4>
                <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: '#DCFCE7', color: '#10B981', fontWeight: '700' }}>
                  BONUS +💎 200
                </span>
              </div>
              <p className="text-xs mb-4" style={{ color: '#64748B', lineHeight: '1.4' }}>
                Tambahkan foto produk untuk mendapat bonus 200 diamonds!
              </p>
              
              {!hasPhoto ? (
                <button 
                  onClick={handlePhotoUpload}
                  className="w-full py-8 rounded-xl border-2 border-dashed flex flex-col items-center gap-2 transition-all active:scale-98"
                  style={{ 
                    borderColor: '#E9ECEF',
                    backgroundColor: '#F8F9FA'
                  }}
                >
                  <Camera size={32} style={{ color: '#94A3B8' }} />
                  <span className="text-sm" style={{ color: '#64748B', fontWeight: '600' }}>
                    Unggah Foto Produk
                  </span>
                </button>
              ) : (
                <div 
                  className="p-4 rounded-xl flex items-center gap-3"
                  style={{ backgroundColor: '#DCFCE7', border: '2px solid #10B981' }}
                >
                  <Upload size={24} style={{ color: '#10B981' }} />
                  <div className="flex-1">
                    <div className="text-sm mb-1" style={{ color: '#1E293B', fontWeight: '600' }}>
                      Foto berhasil diunggah
                    </div>
                    <div className="text-xs" style={{ color: '#10B981', fontWeight: '600' }}>
                      +💎 200 Bonus
                    </div>
                  </div>
                  <CheckCircle2 size={24} style={{ color: '#10B981' }} fill="#10B981" strokeWidth={0} />
                </div>
              )}
            </div>

            {/* Requirements Checklist */}
            <div 
              className="mb-6 p-4 rounded-xl"
              style={{ 
                backgroundColor: '#FFFBEB',
                border: '1px solid #FDE68A'
              }}
            >
              <div className="text-sm mb-3" style={{ color: '#92400E', fontWeight: '700' }}>
                Persyaratan Review:
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm" style={{ color: '#92400E' }}>
                  {rating >= 4 ? (
                    <CheckCircle2 size={16} style={{ color: '#10B981' }} />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2" style={{ borderColor: '#92400E' }} />
                  )}
                  <span>Rating minimal 4 bintang</span>
                </div>
                <div className="flex items-center gap-2 text-sm" style={{ color: '#92400E' }}>
                  {reviewText.length >= minReviewLength ? (
                    <CheckCircle2 size={16} style={{ color: '#10B981' }} />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2" style={{ borderColor: '#92400E' }} />
                  )}
                  <span>Review minimal 50 karakter</span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              disabled={!canSubmit}
              onClick={handleSubmit}
              className="w-full py-3.5 rounded-xl text-white transition-all active:scale-98"
              style={{ 
                backgroundColor: canSubmit ? '#F97316' : '#CBD5E1',
                cursor: canSubmit ? 'pointer' : 'not-allowed',
                fontWeight: '700',
                boxShadow: canSubmit ? '0 2px 8px rgba(249, 115, 22, 0.25)' : 'none'
              }}
            >
              {canSubmit ? 'Kirim Review' : 'Lengkapi Persyaratan'}
            </button>
          </>
        ) : (
          <>
            {/* Completion Card */}
            <div 
              className="mb-6 p-8 rounded-xl text-center"
              style={{ 
                backgroundColor: '#FFFFFF',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
              }}
            >
              <div 
                className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ 
                  backgroundColor: '#DCFCE7',
                }}
              >
                <CheckCircle2 size={48} style={{ color: '#10B981' }} fill="#10B981" strokeWidth={0} />
              </div>
              <h3 className="text-xl mb-2" style={{ color: '#1E293B', fontWeight: '700' }}>
                Review Berhasil Dikirim!
              </h3>
              <p className="text-sm mb-6" style={{ color: '#64748B', lineHeight: '1.5' }}>
                Terima kasih atas review jujur Anda. Review Anda membantu pembeli lain membuat keputusan yang lebih baik.
              </p>
              
              <div className="flex items-center justify-center gap-2 mb-2 p-4 rounded-xl" style={{ backgroundColor: '#FFF7ED' }}>
                <span style={{ fontSize: '32px' }}>💎</span>
                <span className="text-3xl" style={{ color: '#F97316', fontWeight: '700' }}>
                  {reward.toLocaleString('id-ID', { maximumFractionDigits: 0 })}
                </span>
              </div>
              
              {hasPhoto && (
                <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg" style={{ backgroundColor: '#DCFCE7' }}>
                  <span className="text-sm" style={{ color: '#10B981', fontWeight: '600' }}>
                    + Bonus Foto: 💎 200
                  </span>
                </div>
              )}
            </div>

            {/* Review Summary */}
            <div 
              className="mb-6 p-5 rounded-xl"
              style={{ 
                backgroundColor: '#FFFFFF',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
              }}
            >
              <h4 className="text-sm mb-4" style={{ color: '#1E293B', fontWeight: '700' }}>
                Review Anda
              </h4>
              
              {/* Rating Stars */}
              <div className="flex items-center gap-2 mb-3">
                {[1, 2, 3, 4, 5].map((value) => (
                  <Star
                    key={value}
                    size={24}
                    style={{ color: '#F97316' }}
                    fill={value <= rating ? '#F97316' : 'transparent'}
                  />
                ))}
                <span className="text-sm ml-2" style={{ color: '#64748B', fontWeight: '600' }}>
                  {rating}/5
                </span>
              </div>

              {/* Review Text */}
              <div 
                className="p-4 rounded-xl text-sm mb-3"
                style={{ backgroundColor: '#F8F9FA', color: '#1E293B', lineHeight: '1.5' }}
              >
                {reviewText}
              </div>

              {/* Product */}
              <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: '#F8F9FA' }}>
                <div style={{ fontSize: '24px' }}>{product.image}</div>
                <div className="text-xs" style={{ color: '#64748B' }}>
                  <div style={{ fontWeight: '600' }}>{product.name}</div>
                  <div>{product.brand}</div>
                </div>
              </div>
            </div>

            {/* Impact Stats */}
            <div 
              className="mb-6 p-5 rounded-xl"
              style={{ 
                backgroundColor: '#FFFFFF',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
              }}
            >
              <h4 className="text-sm mb-3" style={{ color: '#1E293B', fontWeight: '700' }}>
                Dampak Review Anda
              </h4>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-lg" style={{ backgroundColor: '#F8F9FA' }}>
                  <div className="text-xl mb-1" style={{ color: '#F97316', fontWeight: '700' }}>
                    {rating}★
                  </div>
                  <div className="text-xs" style={{ color: '#64748B' }}>
                    Rating
                  </div>
                </div>
                <div className="p-3 rounded-lg" style={{ backgroundColor: '#F8F9FA' }}>
                  <div className="text-xl mb-1" style={{ color: '#F97316', fontWeight: '700' }}>
                    {reviewText.length}
                  </div>
                  <div className="text-xs" style={{ color: '#64748B' }}>
                    Karakter
                  </div>
                </div>
                <div className="p-3 rounded-lg" style={{ backgroundColor: '#F8F9FA' }}>
                  <div className="text-xl mb-1" style={{ color: '#F97316', fontWeight: '700' }}>
                    {hasPhoto ? 'Ya' : 'Tidak'}
                  </div>
                  <div className="text-xs" style={{ color: '#64748B' }}>
                    Foto
                  </div>
                </div>
              </div>
            </div>

            {/* Claim Button */}
            <button 
              onClick={handleClaim}
              disabled={isClaiming}
              className="w-full py-3.5 rounded-xl text-white transition-all active:scale-98"
              style={{ 
                backgroundColor: isClaiming ? '#CBD5E1' : '#F97316',
                fontWeight: '700',
                boxShadow: isClaiming ? 'none' : '0 2px 8px rgba(249, 115, 22, 0.25)',
                cursor: isClaiming ? 'not-allowed' : 'pointer'
              }}
            >
              {isClaiming ? 'Memproses...' : `Klaim 💎 ${(reward + (hasPhoto ? 200 : 0)).toLocaleString('id-ID', { maximumFractionDigits: 0 })}`}
            </button>
            {claimError && (
              <div className="mt-2 text-xs text-center" style={{ color: '#EF4444', fontWeight: 600 }}>
                {claimError}
              </div>
            )}
          </>
        )}
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
