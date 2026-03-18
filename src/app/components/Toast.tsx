import { AlertCircle, CheckCircle, XCircle, X } from 'lucide-react';
import { useEffect } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, type, isVisible, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const getToastConfig = () => {
    switch (type) {
      case 'success':
        return {
          bgColor: '#F0FDF4',
          borderColor: '#86EFAC',
          textColor: '#166534',
          icon: CheckCircle,
          iconColor: '#10B981'
        };
      case 'error':
        return {
          bgColor: '#FEF2F2',
          borderColor: '#FCA5A5',
          textColor: '#991B1B',
          icon: XCircle,
          iconColor: '#EF4444'
        };
      case 'warning':
        return {
          bgColor: '#FFFBEB',
          borderColor: '#FCD34D',
          textColor: '#92400E',
          icon: AlertCircle,
          iconColor: '#F59E0B'
        };
      case 'info':
      default:
        return {
          bgColor: '#EFF6FF',
          borderColor: '#93C5FD',
          textColor: '#1E40AF',
          icon: AlertCircle,
          iconColor: '#3B82F6'
        };
    }
  };

  const config = getToastConfig();
  const Icon = config.icon;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center px-6 pointer-events-none"
    >
      <div 
        className="animate-fade-in px-6 py-4 rounded-2xl shadow-2xl max-w-sm pointer-events-auto"
        style={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
        }}
      >
        <p 
          className="text-sm leading-relaxed text-center"
          style={{ color: '#FFFFFF', fontWeight: '600' }}
        >
          {message}
        </p>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}