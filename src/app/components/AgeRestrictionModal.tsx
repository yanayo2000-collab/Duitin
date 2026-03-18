import { AlertTriangle } from 'lucide-react';

interface AgeRestrictionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AgeRestrictionModal({ isOpen, onClose }: AgeRestrictionModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[60] flex items-center justify-center px-6"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
    >
      <div 
        className="w-full max-w-sm rounded-3xl animate-scale-in"
        style={{ 
          backgroundColor: '#FFFFFF',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)'
        }}
      >
        {/* Icon */}
        <div className="text-center pt-8 pb-4 px-6">
          <div className="mb-4 flex justify-center">
            <div 
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#FEF2F2' }}
            >
              <AlertTriangle size={40} style={{ color: '#EF4444' }} />
            </div>
          </div>
          
          <h2 className="text-xl mb-3" style={{ color: '#1E293B', fontWeight: '800' }}>
            Batasan Usia
          </h2>
          
          <p className="text-sm leading-relaxed mb-2" style={{ color: '#64748B', fontWeight: '500' }}>
            Maaf, aplikasi ini hanya dapat digunakan oleh pengguna yang berusia <span style={{ color: '#F97316', fontWeight: '700' }}>18 tahun ke atas</span>.
          </p>
          
          <p className="text-xs leading-relaxed" style={{ color: '#94A3B8', fontWeight: '500' }}>
            Sesuai dengan ketentuan layanan kami, Anda harus berusia minimal 18 tahun untuk dapat menggunakan Duitin.
          </p>
        </div>

        {/* Button */}
        <div className="px-6 pb-8">
          <button
            onClick={onClose}
            className="w-full py-4 rounded-2xl transition-all active:scale-98"
            style={{
              backgroundColor: '#F97316',
              color: '#FFFFFF',
              fontWeight: '700',
              boxShadow: '0 8px 24px rgba(249, 115, 22, 0.3)'
            }}
          >
            Saya Mengerti
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
      `}</style>
    </div>
  );
}
