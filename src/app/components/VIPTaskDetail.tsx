import { ArrowLeft, Check } from 'lucide-react';
import { useNavigate } from 'react-router';
import { goBack } from '../../lib/nav';

export function VIPTaskDetail() {
  const navigate = useNavigate();

  const handleContactManager = () => {
    // Navigate to customer service with preset message
    navigate('/customer-service', {
      state: {
        presetMessage: 'Saya ingin mengetahui detail pekerjaan VIP Host lebih lanjut'
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F8F9FA' }}>
      {/* Header */}
      <div 
        className="px-6 py-4 flex items-center gap-4"
        style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E9ECEF' }}
      >
        <button
          onClick={() => goBack(navigate)}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-95"
          style={{ backgroundColor: '#F8F9FA' }}
        >
          <ArrowLeft size={20} style={{ color: '#1E293B' }} />
        </button>
        <h1 className="text-lg" style={{ color: '#1E293B', fontWeight: '700' }}>
          Detail Pekerjaan
        </h1>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-36">
        {/* Job Banner */}
        <div 
          className="mx-6 mt-4 mb-4 rounded-3xl p-6 relative overflow-hidden"
          style={{ 
            background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
            boxShadow: '0 8px 24px rgba(249, 115, 22, 0.3)'
          }}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 opacity-20">
            <span style={{ fontSize: '120px', lineHeight: '1' }}>💎</span>
          </div>

          <div className="relative z-10">
            {/* Title */}
            <h2 className="text-xl mb-3 leading-tight" style={{ color: '#FFFFFF', fontWeight: '800' }}>
              🔥 VIP Host Job
            </h2>

            {/* Salary - USD only */}
            <div className="mb-3">
              <div className="mb-2">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl" style={{ color: '#FFFFFF', fontWeight: '900', lineHeight: '1' }}>
                    $20 - $100
                  </span>
                  <span className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: '600' }}>
                    per jam
                  </span>
                </div>
                <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.7)', fontWeight: '500' }}>
                  ≈ Rp 320.000 - Rp 1.600.000
                </div>
              </div>
              
              {/* Bonus Badge */}
              <div 
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.25)' }}
              >
                <span className="text-xs" style={{ color: '#FFFFFF', fontWeight: '700' }}>
                  🎁 Bonus 5.000 💎 saat bergabung!
                </span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              <div className="px-2.5 py-1.5 rounded-full text-xs flex items-center gap-1.5" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: '#FFFFFF', fontWeight: '600' }}>
                <Check size={12} style={{ color: '#FFFFFF' }} />
                Resmi
              </div>
              <div className="px-2.5 py-1.5 rounded-full text-xs" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: '#FFFFFF', fontWeight: '600' }}>
                🏠 Remote
              </div>
              <div className="px-2.5 py-1.5 rounded-full text-xs" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: '#FFFFFF', fontWeight: '600' }}>
                ⏰ Fleksibel
              </div>
              <div className="px-2.5 py-1.5 rounded-full text-xs" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: '#FFFFFF', fontWeight: '600' }}>
                ✨ Pemula OK
              </div>
            </div>
          </div>
        </div>

        {/* Job Info - Combined Description & Requirements */}
        <div className="mx-6 mb-4 rounded-2xl p-5" style={{ backgroundColor: '#FFFFFF' }}>
          {/* Description */}
          <div className="mb-4 pb-4" style={{ borderBottom: '1px solid #E9ECEF' }}>
            <h3 className="text-sm mb-2.5 flex items-center gap-2" style={{ color: '#1E293B', fontWeight: '700' }}>
              <span style={{ fontSize: '18px' }}>📋</span>
              Apa yang Anda lakukan
            </h3>
            <ul className="space-y-1.5">
              <li className="flex gap-2 text-sm" style={{ color: '#64748B' }}>
                <span style={{ color: '#F97316', fontWeight: '700' }}>•</span>
                <span>Chat & video call dengan pengguna global</span>
              </li>
              <li className="flex gap-2 text-sm" style={{ color: '#64748B' }}>
                <span style={{ color: '#F97316', fontWeight: '700' }}>•</span>
                <span>Terima tip & hadiah virtual dari fans</span>
              </li>
              <li className="flex gap-2 text-sm" style={{ color: '#64748B' }}>
                <span style={{ color: '#F97316', fontWeight: '700' }}>•</span>
                <span>Penghasilan per jam hingga $20-100</span>
              </li>
              <li className="flex gap-2 text-sm" style={{ color: '#64748B' }}>
                <span style={{ color: '#F97316', fontWeight: '700' }}>•</span>
                <span>2-3 jam/hari, jadwal 100% fleksibel</span>
              </li>
            </ul>
          </div>

          {/* Requirements */}
          <div>
            <h3 className="text-sm mb-2.5 flex items-center gap-2" style={{ color: '#1E293B', fontWeight: '700' }}>
              <span style={{ fontSize: '18px' }}>✅</span>
              Persyaratan
            </h3>
            <ul className="space-y-1.5">
              <li className="flex items-center gap-2 text-sm" style={{ color: '#64748B' }}>
                <Check size={15} className="flex-shrink-0" style={{ color: '#10B981' }} />
                <span><span style={{ fontWeight: '600', color: '#1E293B' }}>Wanita, 18+</span></span>
              </li>
              <li className="flex items-center gap-2 text-sm" style={{ color: '#64748B' }}>
                <Check size={15} className="flex-shrink-0" style={{ color: '#10B981' }} />
                <span>Smartphone & internet stabil</span>
              </li>
              <li className="flex items-center gap-2 text-sm" style={{ color: '#64748B' }}>
                <Check size={15} className="flex-shrink-0" style={{ color: '#10B981' }} />
                <span>Ramah & suka ngobrol</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Steps - Simplified */}
        <div className="mx-6 mb-4 rounded-2xl p-5" style={{ backgroundColor: '#FFFFFF' }}>
          <h3 className="text-sm mb-3 flex items-center gap-2" style={{ color: '#1E293B', fontWeight: '700' }}>
            <span style={{ fontSize: '18px' }}>🚀</span>
            Cara Memulai
          </h3>
          
          <div className="space-y-2.5">
            {/* Step 1 */}
            <div className="flex gap-2.5">
              <div 
                className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs"
                style={{ backgroundColor: '#FFF7ED', color: '#F97316', fontWeight: '800' }}
              >
                1
              </div>
              <p className="text-sm flex-1" style={{ color: '#64748B' }}>
                Klik tombol untuk chat dengan manajer
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex gap-2.5">
              <div 
                className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs"
                style={{ backgroundColor: '#FFF7ED', color: '#F97316', fontWeight: '800' }}
              >
                2
              </div>
              <p className="text-sm flex-1" style={{ color: '#64748B' }}>
                Kirim selfie untuk verifikasi (100% aman)
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex gap-2.5">
              <div 
                className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs"
                style={{ backgroundColor: '#FFF7ED', color: '#F97316', fontWeight: '800' }}
              >
                3
              </div>
              <p className="text-sm flex-1" style={{ color: '#64748B' }}>
                Download app & mulai hasilkan uang
              </p>
            </div>
          </div>
        </div>

        {/* Trust Indicators - Simplified */}
        <div className="mx-6 mb-4 rounded-xl p-4 flex items-start gap-3" style={{ backgroundColor: '#FFF7ED', border: '1px solid #FFEDD5' }}>
          <span style={{ fontSize: '20px' }}>🔒</span>
          <div>
            <h4 className="text-sm mb-0.5" style={{ color: '#EA580C', fontWeight: '700' }}>
              Privasi Terjamin
            </h4>
            <p className="text-xs leading-relaxed" style={{ color: '#64748B' }}>
              Data 100% aman • Dipercaya ribuan host
            </p>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action Bar */}
      <div 
        className="fixed bottom-0 left-0 right-0 px-6 py-4"
        style={{ 
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid #E9ECEF',
          boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.05)'
        }}
      >
        <button
          onClick={handleContactManager}
          className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-98"
          style={{
            background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
            boxShadow: '0 8px 24px rgba(249, 115, 22, 0.3)',
            color: '#FFFFFF',
            fontWeight: '800',
            fontSize: '16px'
          }}
        >
          <span style={{ fontSize: '20px' }}>💬</span>
          Hubungi Manajer Sekarang
        </button>
        <p className="text-xs text-center mt-2" style={{ color: '#94A3B8', fontWeight: '500' }}>
          Response time: &lt; 5 menit • Online 24/7
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
    </div>
  );
}