import { useEffect, useState } from 'react';

interface RewardAnimationProps {
  amount: number;
  isVisible: boolean;
  onComplete: () => void;
}

export function RewardAnimation({ amount, isVisible, onComplete }: RewardAnimationProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onComplete();
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
    >
      <div 
        className="animate-reward-float"
        style={{
          fontSize: '52px',
          fontWeight: '800',
          color: '#F97316',
          textShadow: '0 4px 16px rgba(249, 115, 22, 0.6)'
        }}
      >
        + 💎 {amount.toLocaleString('id-ID', { maximumFractionDigits: 0 })}
      </div>

      <style>{`
        @keyframes rewardFloat {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.5);
          }
          30% {
            opacity: 1;
            transform: translateY(0) scale(1.15);
          }
          100% {
            opacity: 0;
            transform: translateY(-50px) scale(0.8);
          }
        }
        .animate-reward-float {
          animation: rewardFloat 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>
    </div>
  );
}