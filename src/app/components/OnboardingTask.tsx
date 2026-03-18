import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface OnboardingTaskProps {
  isOpen: boolean;
  onComplete: (data: { gender: 'male' | 'female'; age: number }) => void;
}

export function OnboardingTask({ isOpen, onComplete }: OnboardingTaskProps) {
  const [gender, setGender] = useState<'male' | 'female' | null>(null);
  const [age, setAge] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCloseButton, setShowCloseButton] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Show close button after 3 seconds
      const timer = setTimeout(() => {
        setShowCloseButton(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const ageNum = parseInt(age);
  const isValidAge = age !== '' && ageNum >= 1 && ageNum <= 99;
  const isValid = gender !== null && isValidAge;

  const handleSubmit = () => {
    if (!isValid || !gender) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      onComplete({ gender, age: parseInt(age) });
    }, 1500);
  };

  const handleAgeInput = (value: string) => {
    // Only allow numbers and max 2 digits
    const numericValue = value.replace(/[^0-9]/g, '').slice(0, 2);
    setAge(numericValue);
  };

  return (
    <>
      <div 
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-2 sm:px-6"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      >
        <div 
          className="w-full max-w-[94vw] sm:max-w-md rounded-2xl sm:rounded-3xl animate-scale-in relative overflow-y-auto"
          style={{ 
            backgroundColor: '#FFFFFF',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            maxHeight: 'min(82vh, 700px)'
          }}
        >
          {/* Close Button (appears after 3s) */}
          {showCloseButton && (
            <button
              onClick={() => {
                setAge('');
              }}
              className="absolute top-2 right-2 sm:top-3 sm:right-3 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all active:scale-95"
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <X size={20} style={{ color: '#FFFFFF' }} />
            </button>
          )}

          {/* Header - Gift Illustration */}
          <div 
            className="text-center pt-4 pb-3 px-4 sm:px-6 rounded-t-2xl sm:rounded-t-3xl"
            style={{ 
              background: 'linear-gradient(180deg, #FFF7ED 0%, #FFFFFF 100%)'
            }}
          >
            <div className="mb-3 flex justify-center relative">
              {/* Sparkle Effects */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span 
                  className="absolute animate-sparkle-1"
                  style={{ fontSize: '24px', left: '20%', top: '10%' }}
                >
                  ✨
                </span>
                <span 
                  className="absolute animate-sparkle-2"
                  style={{ fontSize: '20px', right: '25%', top: '15%' }}
                >
                  ⭐
                </span>
                <span 
                  className="absolute animate-sparkle-3"
                  style={{ fontSize: '18px', left: '15%', bottom: '20%' }}
                >
                  💫
                </span>
                <span 
                  className="absolute animate-sparkle-4"
                  style={{ fontSize: '22px', right: '20%', bottom: '15%' }}
                >
                  ✨
                </span>
              </div>
              
              <div 
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center animate-gift-bounce relative z-10"
                style={{ backgroundColor: '#FEF3C7' }}
              >
                <span className="animate-gift-pulse" style={{ fontSize: '42px' }}>🎁</span>
              </div>
            </div>
            <h2 className="text-xl mb-1" style={{ color: '#1E293B', fontWeight: '800' }}>
              🎁 Bonus Pengguna Baru
            </h2>
            <p className="text-xs leading-relaxed" style={{ color: '#64748B', fontWeight: '500' }}>
              Lengkapi profil dasar Anda dan dapatkan
              <br /><span style={{ color: '#F97316', fontWeight: '700' }}>💎 1.000</span> langsung.
            </p>
          </div>

          {/* Form Area */}
          <div className="px-4 sm:px-6 py-3 sm:py-4 space-y-3 sm:space-y-4">
            {/* Gender Selection */}
            <div>
              <label className="block text-sm mb-3" style={{ color: '#1E293B', fontWeight: '700' }}>
                Jenis Kelamin
              </label>
              <div className="grid grid-cols-2 gap-3">
                {/* Female Option */}
                <button
                  onClick={() => setGender('female')}
                  className="relative p-4 rounded-2xl transition-all active:scale-98"
                  style={{
                    backgroundColor: gender === 'female' ? '#FFF7ED' : '#F8F9FA',
                    border: `2px solid ${gender === 'female' ? '#F97316' : '#E9ECEF'}`
                  }}
                >
                  <div className="flex flex-col items-center gap-2">
                    <span style={{ fontSize: '40px' }}>👩</span>
                    <span 
                      className="text-sm" 
                      style={{ 
                        color: gender === 'female' ? '#F97316' : '#64748B',
                        fontWeight: '700'
                      }}
                    >
                      Wanita
                    </span>
                  </div>
                  {gender === 'female' && (
                    <div 
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: '#F97316' }}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M2 7L5.5 10.5L12 4"
                          stroke="#FFFFFF"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </button>

                {/* Male Option */}
                <button
                  onClick={() => setGender('male')}
                  className="relative p-4 rounded-2xl transition-all active:scale-98"
                  style={{
                    backgroundColor: gender === 'male' ? '#FFF7ED' : '#F8F9FA',
                    border: `2px solid ${gender === 'male' ? '#F97316' : '#E9ECEF'}`
                  }}
                >
                  <div className="flex flex-col items-center gap-2">
                    <span style={{ fontSize: '40px' }}>👨</span>
                    <span 
                      className="text-sm" 
                      style={{ 
                        color: gender === 'male' ? '#F97316' : '#64748B',
                        fontWeight: '700'
                      }}
                    >
                      Pria
                    </span>
                  </div>
                  {gender === 'male' && (
                    <div 
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: '#F97316' }}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M2 7L5.5 10.5L12 4"
                          stroke="#FFFFFF"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* Age Input */}
            <div>
              <label className="block text-sm mb-3" style={{ color: '#1E293B', fontWeight: '700' }}>
                Usia
              </label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={age}
                onChange={(e) => handleAgeInput(e.target.value)}
                placeholder="Masukkan usia Anda (Misal: 22)"
                className="w-full px-4 py-4 rounded-2xl text-base outline-none transition-all"
                style={{
                  backgroundColor: '#F8F9FA',
                  border: `2px solid ${age !== '' ? '#F97316' : '#E9ECEF'}`,
                  color: '#1E293B',
                  fontWeight: '600'
                }}
              />
              {age !== '' && !isValidAge && (
                <p className="text-xs mt-2" style={{ color: '#EF4444' }}>
                  Masukkan usia valid (1-99)
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={!isValid || isSubmitting}
              className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-98"
              style={{
                backgroundColor: isValid && !isSubmitting ? '#F97316' : '#E9ECEF',
                cursor: isValid && !isSubmitting ? 'pointer' : 'not-allowed',
                boxShadow: isValid && !isSubmitting ? '0 8px 24px rgba(249, 115, 22, 0.3)' : 'none'
              }}
            >
              {isSubmitting ? (
                <>
                  <div 
                    className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"
                  />
                  <span className="text-base" style={{ color: '#FFFFFF', fontWeight: '700' }}>
                    Memproses...
                  </span>
                </>
              ) : (
                <>
                  <span className="text-base" style={{ color: isValid ? '#FFFFFF' : '#94A3B8', fontWeight: '700' }}>
                    Klaim Bonus Saya
                  </span>
                  <span style={{ fontSize: '20px' }}>💰</span>
                </>
              )}
            </button>
          </div>
        </div>

        <style>{`
          @keyframes scaleIn {
            from {
              opacity: 0;
              transform: scale(0.9);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          .animate-scale-in {
            animation: scaleIn 0.3s ease-out;
          }
          .active\\:scale-98:active {
            transform: scale(0.98);
          }
          .active\\:scale-95:active {
            transform: scale(0.95);
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          .animate-spin {
            animation: spin 1s linear infinite;
          }
          .border-3 {
            border-width: 3px;
          }
          @keyframes sparkle {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.5); opacity: 0.5; }
            100% { transform: scale(1); opacity: 0; }
          }
          .animate-sparkle-1 {
            animation: sparkle 2s infinite;
          }
          .animate-sparkle-2 {
            animation: sparkle 2.5s infinite;
          }
          .animate-sparkle-3 {
            animation: sparkle 3s infinite;
          }
          .animate-sparkle-4 {
            animation: sparkle 3.5s infinite;
          }
          @keyframes giftBounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
          }
          .animate-gift-bounce {
            animation: giftBounce 2s infinite;
          }
          @keyframes giftPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
          .animate-gift-pulse {
            animation: giftPulse 2s infinite;
          }
        `}</style>
      </div>

    </>
  );
}