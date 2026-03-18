import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Toast, ToastType } from './Toast';
import { AgreementWebview } from './AgreementWebview';
import { apiRequest, setToken } from '../../lib/api';

export function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
    isVisible: boolean;
  }>({
    message: '',
    type: 'info',
    isVisible: false
  });

  const [agreementWebview, setAgreementWebview] = useState<{
    isOpen: boolean;
    type: 'terms' | 'privacy';
  }>({
    isOpen: false,
    type: 'terms'
  });

  const showToast = (message: string, type: ToastType) => {
    setToast({ message, type, isVisible: true });
  };

  // Demo: click Google button -> login default account
  const handleGoogleLogin = async () => {
    if (isLoading) return;

    if (!agreedToTerms) {
      showToast('Harap baca dan setujui Syarat & Ketentuan serta Kebijakan Privasi terlebih dahulu', 'warning');
      return;
    }

    try {
      setIsLoading(true);
      const data = await apiRequest('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ phone: '18800000000', password: '123456' }),
      });

      setToken(data.token);
      sessionStorage.setItem('duitin_session_ok', '1');

      // Backend-authoritative onboarding gate
      try {
        const history = await apiRequest('/api/task-history');
        const items = Array.isArray(history?.items) ? history.items : [];
        const hasOnboardingClaim = items.some((it: { taskId?: string }) => String(it?.taskId || '') === 'mission_onboarding');

        if (hasOnboardingClaim) {
          localStorage.setItem('onboardingCompleted', 'true');
          localStorage.removeItem('showOnboardingOnHome');
        } else {
          localStorage.removeItem('onboardingCompleted');
          localStorage.setItem('showOnboardingOnHome', '1');
        }
      } catch {
        const hasCompletedOnboarding = localStorage.getItem('onboardingCompleted') === 'true';
        if (!hasCompletedOnboarding) {
          localStorage.setItem('showOnboardingOnHome', '1');
        }
      }
      showToast('Masuk berhasil, mengarahkan ke beranda…', 'success');
      setTimeout(() => navigate('/'), 400);
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Login gagal', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const openAgreement = (type: 'terms' | 'privacy') => {
    setAgreementWebview({ isOpen: true, type });
  };

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #F97316 0%, #FB923C 100%)'
      }}
    >
      <div
        className="absolute w-96 h-96 rounded-full opacity-10"
        style={{
          backgroundColor: '#FFFFFF',
          top: '-120px',
          right: '-120px'
        }}
      />
      <div
        className="absolute w-64 h-64 rounded-full opacity-10"
        style={{
          backgroundColor: '#FFFFFF',
          bottom: '-80px',
          left: '-80px'
        }}
      />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6" style={{ paddingBottom: 'max(24px, env(safe-area-inset-bottom))' }}>
        <div className="w-full max-w-sm flex flex-col items-center">
          <div className="text-center mb-12">
            <div className="mb-6 flex justify-center">
              <div
                className="w-24 h-24 rounded-3xl flex items-center justify-center"
                style={{
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 16px 48px rgba(0, 0, 0, 0.2)'
                }}
              >
                <span style={{ fontSize: '62px' }}>💎</span>
              </div>
            </div>
            <h1 className="text-4xl mb-2" style={{ color: '#FFFFFF', fontWeight: '800' }}>
              Duitin
            </h1>
            <p className="text-base" style={{ color: '#FFF7ED', fontWeight: '500' }}>
              Raih penghasilan tambahan
            </p>
          </div>

          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="py-4 rounded-2xl flex items-center justify-center gap-3 mb-6 transition-all active:scale-98 disabled:opacity-80 disabled:cursor-not-allowed"
            style={{
              width: '80%',
              backgroundColor: '#FFFFFF',
              boxShadow: '0 12px 32px rgba(0, 0, 0, 0.2)',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              border: 'none'
            }}
          >
            {isLoading ? (
              <>
                <div
                  className="border-3 border-gray-300 border-t-orange-500 rounded-full animate-spin"
                  style={{ width: '29px', height: '29px' }}
                />
                <span className="text-base" style={{ color: '#64748B', fontWeight: '600' }}>
                  Memproses...
                </span>
              </>
            ) : (
              <>
                <svg width="29" height="29" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="text-base" style={{ color: '#1E293B', fontWeight: '600' }}>
                  Masuk dengan Google
                </span>
              </>
            )}
          </button>

          <div
            className="flex items-start gap-2 p-3 rounded-lg"
            style={{
              width: '80%',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            }}
          >
            <button
              type="button"
              onClick={() => setAgreedToTerms(!agreedToTerms)}
              className="flex-shrink-0 w-5 h-5 mt-0.5 rounded transition-all active:scale-95"
              style={{
                backgroundColor: agreedToTerms ? '#FFFFFF' : 'rgba(255, 255, 255, 0.3)',
                border: `1.5px solid ${agreedToTerms ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)'}`
              }}
            >
              {agreedToTerms && (
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8L6.5 11.5L13 5"
                    stroke="#F97316"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
            <p style={{ fontSize: '11px', lineHeight: '1.5', color: 'rgba(255, 255, 255, 0.85)' }}>
              Setuju{' '}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  openAgreement('terms');
                }}
                className="underline"
                style={{ color: '#FFFFFF', fontWeight: '600' }}
              >
                S&K
              </button>
              {' '}dan{' '}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  openAgreement('privacy');
                }}
                className="underline"
                style={{ color: '#FFFFFF', fontWeight: '600' }}
              >
                Kebijakan Privasi
              </button>
            </p>
          </div>
        </div>
      </div>

      <style>{`
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
        .border-t-orange-500 {
          border-top-color: #F97316;
        }
        .border-gray-300 {
          border-color: #D1D5DB;
        }
      `}</style>

      {toast.isVisible && (
        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={toast.isVisible}
          onClose={() => setToast({ ...toast, isVisible: false })}
        />
      )}

      {agreementWebview.isOpen && (
        <AgreementWebview
          isOpen={agreementWebview.isOpen}
          type={agreementWebview.type}
          onClose={() => setAgreementWebview({ isOpen: false, type: 'terms' })}
        />
      )}
    </div>
  );
}
