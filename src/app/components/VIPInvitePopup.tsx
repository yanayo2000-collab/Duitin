import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface VIPInvitePopupProps {
  isOpen: boolean;
  onAccept: () => void;
  onClose: () => void;
}

export function VIPInvitePopup({ isOpen, onAccept, onClose }: VIPInvitePopupProps) {
  if (!isOpen) return null;

  const handleClose = () => {
    // Set 24-hour cooldown
    const cooldownExpiry = Date.now() + 24 * 60 * 60 * 1000;
    localStorage.setItem('vipPopupCooldown', cooldownExpiry.toString());
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center px-6"
      style={{ 
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(8px)'
      }}
    >
      <div 
        className="w-full max-w-xs rounded-3xl animate-scale-in relative overflow-hidden"
        style={{ 
          backgroundColor: '#FFFFFF',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)'
        }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center transition-all active:scale-95 z-10"
          style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.1)'
          }}
        >
          <X size={14} style={{ color: '#64748B' }} />
        </button>

        {/* Urgent Badge */}
        <div className="flex justify-center pt-6 pb-3">
          <div 
            className="px-4 py-1.5 rounded-full"
            style={{ 
              background: 'linear-gradient(90deg, #FCD34D 0%, #FBBF24 100%)',
              boxShadow: '0 4px 12px rgba(251, 191, 36, 0.4)'
            }}
          >
            <span className="text-xs" style={{ color: '#92400E', fontWeight: '800', letterSpacing: '0.5px' }}>
              ⚡ VIP HOST EKSKLUSIF
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center px-6 pb-7">
          {/* Title with gradient */}
          <h2 
            className="text-2xl mb-4 leading-tight animate-gradient"
            style={{ 
              fontWeight: '900',
              background: 'linear-gradient(135deg, #F97316 0%, #DC2626 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            🔥 VIP HOST JOB!
          </h2>

          {/* Body Text */}
          <p className="text-sm mb-4 leading-relaxed" style={{ color: '#1E293B', fontWeight: '500' }}>
            Selamat! Anda memenuhi syarat untuk pekerjaan host eksklusif. Dapatkan{' '}
            <span className="relative inline-block mx-1">
              {/* Sparkles around the diamonds */}
              <span className="absolute -top-2 -left-3 text-base animate-sparkle-1">✨</span>
              <span className="absolute -top-2 -right-3 text-base animate-sparkle-2">✨</span>
              
              <span className="animate-scale-diamond" style={{ color: '#F97316', fontWeight: '900', fontSize: '18px' }}>
                5.000 💎
              </span>
            </span>
            {' '}saat bergabung. Penghasilan per jam hingga{' '}
            <span style={{ color: '#F97316', fontWeight: '700' }}>$20-100</span>.
          </p>

          {/* CTA Button with intense animations */}
          <div className="relative mb-2">
            {/* Pulsing rings around button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div 
                className="absolute w-full h-full rounded-2xl animate-ping-slow"
                style={{ 
                  backgroundColor: '#F97316',
                  opacity: 0.3
                }}
              />
              <div 
                className="absolute w-full h-full rounded-2xl animate-ping-slower"
                style={{ 
                  backgroundColor: '#F97316',
                  opacity: 0.2
                }}
              />
            </div>

            {/* Pointing hand indicator */}
            <div 
              className="absolute -left-2 top-1/2 -translate-y-1/2 animate-point-finger"
              style={{ fontSize: '28px', zIndex: 10 }}
            >
              👉
            </div>

            <button
              onClick={onAccept}
              className="w-full py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 animate-pulse-intense relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #F97316 0%, #DC2626 100%)',
                boxShadow: '0 12px 32px rgba(249, 115, 22, 0.5), 0 0 0 0 rgba(249, 115, 22, 0.4)',
                color: '#FFFFFF',
                fontWeight: '900',
                fontSize: '15px',
                letterSpacing: '0.3px'
              }}
            >
              {/* Multiple shine effects */}
              <div 
                className="absolute inset-0 animate-shine-intense"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                }}
              />
              <div 
                className="absolute inset-0 animate-shine-intense-delayed"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                }}
              />
              
              <span className="relative flex items-center gap-1.5">
                💬 LIHAT DETAIL SEKARANG
                <span className="animate-bounce-arrow">→</span>
              </span>
            </button>
          </div>

          <p className="text-xs" style={{ color: '#DC2626', fontWeight: '700' }}>
            Hanya 5 slot hari ini!
          </p>
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
          animation: scaleIn 0.4s ease-out;
        }
        
        @keyframes pulseSub {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-pulse-subtle {
          animation: pulseSub 2s infinite;
        }
        
        @keyframes bounceS {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-bounce-slow {
          animation: bounceS 3s infinite;
        }
        
        @keyframes bounceG {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .animate-bounce-gentle {
          animation: bounceG 2s infinite;
        }
        
        @keyframes sparkleFloat1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
          50% { transform: translate(-5px, -10px) rotate(20deg); opacity: 1; }
        }
        .animate-sparkle-float-1 {
          animation: sparkleFloat1 3s infinite;
        }
        
        @keyframes sparkleFloat2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
          50% { transform: translate(5px, -8px) rotate(-20deg); opacity: 1; }
        }
        .animate-sparkle-float-2 {
          animation: sparkleFloat2 3.5s infinite;
        }
        
        @keyframes sparkleFloat3 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
          50% { transform: translate(-3px, 10px) rotate(15deg); opacity: 1; }
        }
        .animate-sparkle-float-3 {
          animation: sparkleFloat3 4s infinite;
        }
        
        @keyframes sparkleMinimal1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
          50% { transform: translate(-2px, -2px) rotate(10deg); opacity: 1; }
        }
        .animate-sparkle-minimal-1 {
          animation: sparkleMinimal1 2s infinite;
        }
        
        @keyframes sparkleMinimal2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
          50% { transform: translate(2px, -2px) rotate(-10deg); opacity: 1; }
        }
        .animate-sparkle-minimal-2 {
          animation: sparkleMinimal2 2.5s infinite;
        }
        
        @keyframes pulseBtn {
          0%, 100% { transform: scale(1); box-shadow: 0 12px 32px rgba(249, 115, 22, 0.4); }
          50% { transform: scale(1.02); box-shadow: 0 16px 40px rgba(249, 115, 22, 0.5); }
        }
        .animate-pulse-button {
          animation: pulseBtn 2s infinite;
        }
        
        @keyframes pulseIntense {
          0%, 100% { transform: scale(1); box-shadow: 0 12px 32px rgba(249, 115, 22, 0.5), 0 0 0 0 rgba(249, 115, 22, 0.4); }
          50% { transform: scale(1.03); box-shadow: 0 16px 40px rgba(249, 115, 22, 0.6), 0 0 0 0 rgba(249, 115, 22, 0.5); }
        }
        .animate-pulse-intense {
          animation: pulseIntense 2s infinite;
        }
        
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shine {
          animation: shine 3s infinite;
        }
        
        @keyframes shineFast {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shine-fast {
          animation: shineFast 2s infinite;
        }
        
        @keyframes shineIntense {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shine-intense {
          animation: shineIntense 1.5s infinite;
        }
        
        @keyframes shineIntenseDelayed {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shine-intense-delayed {
          animation: shineIntenseDelayed 2s infinite;
        }
        
        @keyframes pingSlow {
          0% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.1); opacity: 0.5; }
          100% { transform: scale(1); opacity: 0.3; }
        }
        .animate-ping-slow {
          animation: pingSlow 2s infinite;
        }
        
        @keyframes pingSlower {
          0% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.05); opacity: 0.4; }
          100% { transform: scale(1); opacity: 0.2; }
        }
        .animate-ping-slower {
          animation: pingSlower 2.5s infinite;
        }
        
        @keyframes pointFinger {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-5px); }
        }
        .animate-point-finger {
          animation: pointFinger 1.5s infinite;
        }
        
        @keyframes bounceArrow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
        .animate-bounce-arrow {
          animation: bounceArrow 1s infinite;
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        @keyframes glowPulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.5; }
        }
        .animate-glow-pulse {
          animation: glowPulse 2s infinite;
        }
        
        @keyframes bounceDiamond {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
        .animate-bounce-diamond {
          animation: bounceDiamond 1s infinite;
        }
        
        @keyframes scaleDiamond {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-scale-diamond {
          animation: scaleDiamond 2s infinite;
        }
        
        @keyframes shineDiamond {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shine-diamond {
          animation: shineDiamond 1.5s infinite;
        }
        
        @keyframes sparkle1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg) scale(0); opacity: 0; }
          25% { transform: translate(-2px, -2px) rotate(15deg) scale(1); opacity: 1; }
          50% { transform: translate(-3px, -3px) rotate(30deg) scale(0.8); opacity: 0.6; }
          75% { transform: translate(-2px, -2px) rotate(45deg) scale(1); opacity: 1; }
        }
        .animate-sparkle-1 {
          animation: sparkle1 2s infinite;
        }
        
        @keyframes sparkle2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg) scale(0); opacity: 0; }
          25% { transform: translate(2px, -2px) rotate(-15deg) scale(1); opacity: 1; }
          50% { transform: translate(3px, -3px) rotate(-30deg) scale(0.8); opacity: 0.6; }
          75% { transform: translate(2px, -2px) rotate(-45deg) scale(1); opacity: 1; }
        }
        .animate-sparkle-2 {
          animation: sparkle2 2.2s infinite;
        }
        
        @keyframes sparkle3 {
          0%, 100% { transform: translate(0, 0) rotate(0deg) scale(0); opacity: 0; }
          25% { transform: translate(-2px, 2px) rotate(15deg) scale(1); opacity: 1; }
          50% { transform: translate(-3px, 3px) rotate(30deg) scale(0.8); opacity: 0.6; }
          75% { transform: translate(-2px, 2px) rotate(45deg) scale(1); opacity: 1; }
        }
        .animate-sparkle-3 {
          animation: sparkle3 2.4s infinite;
        }
        
        @keyframes sparkle4 {
          0%, 100% { transform: translate(0, 0) rotate(0deg) scale(0); opacity: 0; }
          25% { transform: translate(2px, 2px) rotate(-15deg) scale(1); opacity: 1; }
          50% { transform: translate(3px, 3px) rotate(-30deg) scale(0.8); opacity: 0.6; }
          75% { transform: translate(2px, 2px) rotate(-45deg) scale(1); opacity: 1; }
        }
        .animate-sparkle-4 {
          animation: sparkle4 2.6s infinite;
        }
        
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