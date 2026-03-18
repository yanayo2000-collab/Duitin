export function WithdrawalProcessingOverlay({ isVisible }: { isVisible: boolean }) {
  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
    >
      <div className="flex flex-col items-center">
        {/* Diamond Icon Animation */}
        <div className="mb-6 animate-bounce-diamond">
          <div 
            className="flex items-center justify-center w-24 h-24 rounded-full"
            style={{ 
              backgroundColor: '#FFF7ED',
              border: '4px solid #F97316',
              boxShadow: '0 0 30px rgba(249, 115, 22, 0.4)'
            }}
          >
            <span style={{ fontSize: '48px' }}>💎</span>
          </div>
        </div>

        {/* Loading Text */}
        <h3 className="text-xl mb-2" style={{ color: '#FFFFFF', fontWeight: '700' }}>
          Memproses Penarikan...
        </h3>
        <p className="text-sm mb-6" style={{ color: '#CBD5E1' }}>
          Mohon tunggu sebentar
        </p>

        {/* Loading Dots */}
        <div className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full animate-pulse-dot-1"
            style={{ backgroundColor: '#F97316' }}
          />
          <div 
            className="w-3 h-3 rounded-full animate-pulse-dot-2"
            style={{ backgroundColor: '#F97316' }}
          />
          <div 
            className="w-3 h-3 rounded-full animate-pulse-dot-3"
            style={{ backgroundColor: '#F97316' }}
          />
        </div>
      </div>

      <style>{`
        @keyframes bounceDiamond {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.1);
          }
        }
        @keyframes pulseDot1 {
          0%, 60%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          30% {
            opacity: 1;
            transform: scale(1.3);
          }
        }
        @keyframes pulseDot2 {
          0%, 60%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          45% {
            opacity: 1;
            transform: scale(1.3);
          }
        }
        @keyframes pulseDot3 {
          0%, 60%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          60% {
            opacity: 1;
            transform: scale(1.3);
          }
        }
        .animate-bounce-diamond {
          animation: bounceDiamond 1.5s ease-in-out infinite;
        }
        .animate-pulse-dot-1 {
          animation: pulseDot1 1.5s ease-in-out infinite;
        }
        .animate-pulse-dot-2 {
          animation: pulseDot2 1.5s ease-in-out infinite;
        }
        .animate-pulse-dot-3 {
          animation: pulseDot3 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
