import { ArrowLeft, CheckCircle2, Circle } from 'lucide-react';
import { useNavigate } from 'react-router';
import { goBack } from '../../lib/nav';
import { useState } from 'react';
import { apiRequest, setWalletCache } from '../../lib/api';

export function Survey() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const [claimError, setClaimError] = useState('');

  const reward = 1000;

  const questions = [
    {
      id: 0,
      question: 'Seberapa sering Anda berbelanja online?',
      options: ['Setiap hari', 'Beberapa kali seminggu', 'Beberapa kali sebulan', 'Jarang']
    },
    {
      id: 1,
      question: 'Platform belanja online mana yang paling sering Anda gunakan?',
      options: ['Tokopedia', 'Shopee', 'Lazada', 'Lainnya']
    },
    {
      id: 2,
      question: 'Apa yang paling penting bagi Anda saat berbelanja online?',
      options: ['Harga murah', 'Pengiriman cepat', 'Kualitas produk', 'Layanan pelanggan']
    },
    {
      id: 3,
      question: 'Berapa rata-rata pengeluaran Anda untuk belanja online per bulan?',
      options: ['< Rp 100.000', 'Rp 100.000 - 500.000', 'Rp 500.000 - 1 juta', '> Rp 1 juta']
    },
    {
      id: 4,
      question: 'Apakah Anda puas dengan pengalaman belanja online Anda?',
      options: ['Sangat puas', 'Puas', 'Cukup puas', 'Tidak puas']
    }
  ];

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleSelectAnswer = (option: string) => {
    setAnswers({ ...answers, [currentQuestion]: option });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleClaim = async () => {
    if (isClaiming) return;
    try {
      setIsClaiming(true);
      setClaimError('');
      const claim = await apiRequest('/api/rewards/claim', {
        method: 'POST',
        body: JSON.stringify({ code: 'mission_survey', title: 'Survei Kepuasan', reward }),
      });
      setWalletCache(Number(claim?.balance || reward), 0);
      navigate('/', { state: { rewardClaimed: true, rewardAmount: reward } });
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Gagal klaim reward';
      if (msg.includes('already claimed') || msg.includes('already completed')) {
        setClaimError('Reward survei ini sudah pernah diklaim.');
      } else {
        setClaimError('Klaim belum berhasil. Coba lagi.');
      }
    } finally {
      setIsClaiming(false);
    }
  };

  const currentAnswer = answers[currentQuestion];

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
          Survei Kepuasan
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
                  <span className="text-sm" style={{ color: '#64748B', fontWeight: '500' }}>
                    {questions.length} pertanyaan
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

            {/* Progress Section */}
            <div 
              className="mb-6 p-5 rounded-xl"
              style={{ 
                backgroundColor: '#FFFFFF',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm" style={{ color: '#64748B', fontWeight: '600' }}>
                  Progres Survei
                </span>
                <span className="text-sm" style={{ color: '#F97316', fontWeight: '700' }}>
                  {currentQuestion + 1} / {questions.length}
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full h-3 rounded-full mb-2" style={{ backgroundColor: '#E9ECEF' }}>
                <div 
                  className="h-full rounded-full transition-all duration-300"
                  style={{ 
                    backgroundColor: '#F97316',
                    width: `${progress}%`,
                    boxShadow: '0 0 8px rgba(249, 115, 22, 0.3)'
                  }}
                />
              </div>

              <div className="text-xs text-center" style={{ color: '#94A3B8', fontWeight: '500' }}>
                {Math.round(progress)}% selesai
              </div>
            </div>

            {/* Question Card */}
            <div 
              className="mb-6 p-6 rounded-xl"
              style={{ 
                backgroundColor: '#FFFFFF',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)'
              }}
            >
              <div className="mb-1 text-xs px-2 py-1 rounded inline-block" style={{ backgroundColor: '#FFF7ED', color: '#F97316', fontWeight: '700' }}>
                Pertanyaan {currentQuestion + 1}
              </div>
              <h3 className="text-lg mb-5 mt-3" style={{ color: '#1E293B', fontWeight: '700', lineHeight: '1.4' }}>
                {questions[currentQuestion].question}
              </h3>

              {/* Options */}
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => {
                  const isSelected = currentAnswer === option;
                  return (
                    <button
                      key={index}
                      onClick={() => handleSelectAnswer(option)}
                      className="w-full p-4 rounded-xl flex items-center gap-3 transition-all active:scale-98"
                      style={{
                        backgroundColor: isSelected ? '#FFF7ED' : '#F8F9FA',
                        border: `2px solid ${isSelected ? '#F97316' : '#E9ECEF'}`,
                        cursor: 'pointer'
                      }}
                    >
                      {isSelected ? (
                        <CheckCircle2 size={24} style={{ color: '#F97316' }} fill="#F97316" strokeWidth={0} />
                      ) : (
                        <Circle size={24} style={{ color: '#CBD5E1' }} />
                      )}
                      <span 
                        className="text-left text-sm"
                        style={{ 
                          color: isSelected ? '#1E293B' : '#64748B',
                          fontWeight: isSelected ? '600' : '500'
                        }}
                      >
                        {option}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-3">
              {currentQuestion > 0 && (
                <button 
                  onClick={handleBack}
                  className="flex-1 py-3.5 rounded-xl transition-all active:scale-98"
                  style={{ 
                    backgroundColor: 'transparent',
                    color: '#F97316',
                    fontWeight: '600',
                    border: '1.5px solid #F97316'
                  }}
                >
                  Kembali
                </button>
              )}
              <button 
                disabled={!currentAnswer}
                onClick={handleNext}
                className="flex-1 py-3.5 rounded-xl text-white transition-all active:scale-98"
                style={{ 
                  backgroundColor: currentAnswer ? '#F97316' : '#CBD5E1',
                  cursor: currentAnswer ? 'pointer' : 'not-allowed',
                  fontWeight: '700',
                  boxShadow: currentAnswer ? '0 2px 8px rgba(249, 115, 22, 0.25)' : 'none'
                }}
              >
                {currentQuestion < questions.length - 1 ? 'Lanjut' : 'Selesai'}
              </button>
            </div>
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
                Survei Selesai!
              </h3>
              <p className="text-sm mb-6" style={{ color: '#64748B', lineHeight: '1.5' }}>
                Terima kasih atas partisipasi Anda. Jawaban Anda sangat membantu kami.
              </p>
              
              <div className="flex items-center justify-center gap-2 mb-6 p-4 rounded-xl" style={{ backgroundColor: '#FFF7ED' }}>
                <span style={{ fontSize: '32px' }}>💎</span>
                <span className="text-3xl" style={{ color: '#F97316', fontWeight: '700' }}>
                  {reward.toLocaleString('id-ID', { maximumFractionDigits: 0 })}
                </span>
              </div>
            </div>

            {/* Summary */}
            <div 
              className="mb-6 p-5 rounded-xl"
              style={{ 
                backgroundColor: '#FFFFFF',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
              }}
            >
              <h4 className="text-sm mb-3" style={{ color: '#64748B', fontWeight: '700' }}>
                Ringkasan Jawaban Anda
              </h4>
              <div className="space-y-3">
                {questions.map((q, index) => (
                  <div key={index} className="pb-3 border-b" style={{ borderColor: '#E9ECEF' }}>
                    <div className="text-xs mb-1" style={{ color: '#94A3B8', fontWeight: '600' }}>
                      Pertanyaan {index + 1}
                    </div>
                    <div className="text-sm mb-1" style={{ color: '#1E293B', fontWeight: '500' }}>
                      {q.question}
                    </div>
                    <div className="text-sm" style={{ color: '#F97316', fontWeight: '600' }}>
                      → {answers[index]}
                    </div>
                  </div>
                ))}
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
              {isClaiming ? 'Memproses...' : `Klaim 💎 ${reward.toLocaleString('id-ID', { maximumFractionDigits: 0 })}`}
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
