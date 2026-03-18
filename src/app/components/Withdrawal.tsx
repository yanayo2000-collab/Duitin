import { ArrowLeft, Clock, Lock, CheckCircle2 } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router';
import { goBack } from '../../lib/nav';
import { useEffect, useState } from 'react';
import { WithdrawalSuccessModal } from './WithdrawalSuccessModal';
import { WithdrawalFailureModal } from './WithdrawalFailureModal';
import { WithdrawalProcessingOverlay } from './WithdrawalProcessingOverlay';
import { apiRequest, getWalletCache, setWalletCache } from '../../lib/api';

export function Withdrawal() {
  const navigate = useNavigate();
  const location = useLocation();
  const [requiresAgreement, setRequiresAgreement] = useState(false);
  const [agreementChecked, setAgreementChecked] = useState(false);
  const [agreementAccepted, setAgreementAccepted] = useState(false);
  const [agreementSubmitting, setAgreementSubmitting] = useState(false);
  const [agreementStorageKey, setAgreementStorageKey] = useState('');
  const [selectedAmount, setSelectedAmount] = useState(10000);
  const [phoneNumber, setPhoneNumber] = useState('081234567890');
  const [accountName, setAccountName] = useState('Siti Aisyah');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);
  const [failureReason, setFailureReason] = useState<'insufficient_balance' | 'account_invalid' | 'system_error' | 'daily_limit' | 'maintenance'>('system_error');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentBalance, setCurrentBalance] = useState(getWalletCache().balance);

  const withdrawalTiers = [10000, 20000, 50000, 100000];
  const isDisabled = selectedAmount > currentBalance || !phoneNumber || !accountName || isProcessing;

  const handleAgreementAccept = async () => {
    if (!agreementAccepted || agreementSubmitting) return;

    // Let user continue immediately; persist server-side in background.
    setAgreementSubmitting(true);
    setRequiresAgreement(false);
    if (agreementStorageKey) {
      localStorage.setItem(agreementStorageKey, '1');
    }

    try {
      await Promise.race([
        apiRequest('/api/withdraw-agreement/accept', { method: 'POST' }),
        new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 4000)),
      ]);
    } catch {
      // Keep local agreement key as fallback for this account reset-version.
    } finally {
      setAgreementSubmitting(false);
    }
  };

  const handleAgreementReject = () => {
    const from = (location.state as { from?: string } | null)?.from;
    if (from === 'home') {
      navigate('/');
      return;
    }
    if (from === 'my-wallet') {
      navigate('/my-wallet');
      return;
    }
    navigate(-1);
  };

  useEffect(() => {
    const loadInit = async () => {
      try {
        const [wallet, agreement, me] = await Promise.all([
          apiRequest('/api/wallet'),
          apiRequest('/api/withdraw-agreement'),
          apiRequest('/api/me'),
        ]);
        const b = Number(wallet.balance || 0);
        const f = Number(wallet.frozen || 0);
        setCurrentBalance(b);
        setWalletCache(b, f);

        const key = `duitin_withdraw_agreement_ack_${String(me?.id || 'u')}_${String(me?.resetAt || 'none')}`;
        setAgreementStorageKey(key);
        const localAccepted = localStorage.getItem(key) === '1';
        setRequiresAgreement(!(agreement?.accepted || localAccepted));
        setAgreementChecked(true);
      } catch {
        // Fail-closed: require agreement when status cannot be verified.
        setRequiresAgreement(true);
        setAgreementChecked(true);
      }
    };
    loadInit();
  }, []);

  const handleWithdrawal = async () => {
    if (isDisabled) return;

    setIsProcessing(true);
    try {
      await apiRequest('/api/withdraw', {
        method: 'POST',
        body: JSON.stringify({
          amount: selectedAmount,
          destination: 'DANA',
          danaAccount: phoneNumber,
          danaAccountName: accountName,
        }),
      });
      setCurrentBalance((prev) => {
        const next = Math.max(0, Number((prev - selectedAmount).toFixed(2)));
        setWalletCache(next, selectedAmount);
        return next;
      });
      setShowSuccessModal(true);
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Gagal memproses';
      if (msg.includes('insufficient')) {
        setFailureReason('insufficient_balance');
      } else {
        setFailureReason('system_error');
      }
      setShowFailureModal(true);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRetry = () => {
    setShowFailureModal(false);
  };

  const handleContactSupport = () => {
    setShowFailureModal(false);
    navigate('/customer-service');
  };

  const handleGoBack = () => {
    setShowFailureModal(false);
  };

  return (
    <>
      <div className="px-6 py-4 flex items-center gap-4 border-b bg-white" style={{ borderColor: '#E9ECEF' }}>
        <button
          onClick={() => goBack(navigate)}
          className="flex items-center justify-center w-10 h-10 rounded-full transition-all hover:bg-gray-100 active:scale-95"
        >
          <ArrowLeft size={24} style={{ color: '#1E293B' }} />
        </button>
        <h1 className="text-xl" style={{ color: '#1E293B', fontWeight: '700' }}>
          Tarik Tunai
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-3" style={{ backgroundColor: '#F8F9FA' }}>
        <div
          className="mb-3 p-3 rounded-2xl"
          style={{
            backgroundColor: '#FFFFFF',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)'
          }}
        >
          <div className="text-xs mb-1" style={{ color: '#64748B', fontWeight: '600' }}>
            Saldo Tersedia
          </div>
          <div className="flex items-center gap-2">
            <span style={{ fontSize: '20px' }} className="diamond-pulse">💎</span>
            <div className="text-2xl" style={{ color: '#F97316', fontWeight: '700' }}>
              {currentBalance.toLocaleString('id-ID', { maximumFractionDigits: 0 })}
            </div>
            <div className="text-xs" style={{ color: '#94A3B8' }}>
              = Rp {(currentBalance * 10).toLocaleString('id-ID', { maximumFractionDigits: 0 })}
            </div>
          </div>
        </div>

        <div
          className="mb-3 p-3 rounded-2xl"
          style={{
            backgroundColor: '#FFFFFF',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
          }}
        >
          <label className="text-xs block mb-2" style={{ color: '#1E293B', fontWeight: '700' }}>
            Pilih Jumlah Penarikan
          </label>
          <div className="grid grid-cols-2 gap-2">
            {withdrawalTiers.map((tier) => {
              const isSelected = selectedAmount === tier;
              const isAvailable = tier <= currentBalance;
              return (
                <button
                  key={tier}
                  onClick={() => isAvailable && setSelectedAmount(tier)}
                  disabled={!isAvailable}
                  className="p-2.5 rounded-xl transition-all active:scale-95"
                  style={{
                    backgroundColor: isSelected ? '#FFF7ED' : '#F8F9FA',
                    border: isSelected ? '2px solid #F97316' : '2px solid transparent',
                    opacity: isAvailable ? 1 : 0.5,
                    cursor: isAvailable ? 'pointer' : 'not-allowed'
                  }}
                >
                  <div className="flex items-center justify-center gap-1 mb-0.5">
                    <span style={{ fontSize: '14px' }} className={isSelected ? 'diamond-bounce' : ''}>💎</span>
                    <span
                      className="text-sm"
                      style={{
                        color: isSelected ? '#F97316' : '#1E293B',
                        fontWeight: '700'
                      }}
                    >
                      {tier.toLocaleString('id-ID', { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div
                    className="text-xs text-center"
                    style={{
                      color: isSelected ? '#F97316' : '#64748B',
                      fontWeight: '500'
                    }}
                  >
                    Rp {(tier * 10).toLocaleString('id-ID', { maximumFractionDigits: 0 })}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div
          className="mb-3 p-3 rounded-2xl"
          style={{
            backgroundColor: '#FFFFFF',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
          }}
        >
          <label className="text-xs block mb-2" style={{ color: '#1E293B', fontWeight: '700' }}>
            Metode & Akun Penarikan
          </label>
          <div
            className="flex items-center gap-3 p-2.5 rounded-xl mb-2.5"
            style={{
              backgroundColor: '#FFF7ED',
              border: '2px solid #F97316'
            }}
          >
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center" style={{ borderColor: '#F97316' }}>
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#F97316' }} />
              </div>
            </div>
            <span className="text-sm" style={{ color: '#F97316', fontWeight: '700' }}>DANA</span>
            <CheckCircle2 size={16} className="ml-auto" style={{ color: '#F97316' }} />
          </div>

          <label className="text-xs block mb-2" style={{ color: '#1E293B', fontWeight: '700' }}>
            Nomor DANA
          </label>
          <input
            type="tel"
            placeholder="081234567890"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-xl mb-2.5 transition-all focus:outline-none"
            style={{
              color: '#1E293B',
              backgroundColor: '#F8F9FA',
              border: '2px solid transparent'
            }}
            onFocus={(e) => e.target.style.borderColor = '#F97316'}
            onBlur={(e) => e.target.style.borderColor = 'transparent'}
          />

          <label className="text-xs block mb-2" style={{ color: '#1E293B', fontWeight: '700' }}>
            Nama Akun DANA
          </label>
          <input
            type="text"
            placeholder="Siti Aisyah"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-xl transition-all focus:outline-none"
            style={{
              color: '#1E293B',
              backgroundColor: '#F8F9FA',
              border: '2px solid transparent'
            }}
            onFocus={(e) => e.target.style.borderColor = '#F97316'}
            onBlur={(e) => e.target.style.borderColor = 'transparent'}
          />
        </div>

        <button
          disabled={isDisabled}
          onClick={handleWithdrawal}
          className="w-full py-3 rounded-xl text-white transition-all active:scale-98"
          style={{
            backgroundColor: isDisabled ? '#CBD5E1' : '#F97316',
            cursor: isDisabled ? 'not-allowed' : 'pointer',
            fontWeight: '700',
            boxShadow: isDisabled ? 'none' : '0 2px 8px rgba(249, 115, 22, 0.25)'
          }}
        >
          {isProcessing ? 'Memproses...' : 'Ajukan Penarikan'}
        </button>

        <div className="mt-2 text-xs" style={{ color: '#64748B', lineHeight: 1.5 }}>
          <span className="inline-flex items-center gap-1.5 mr-3"><Clock size={12} /> Proses 1–3 hari kerja</span>
          <span className="inline-flex items-center gap-1.5"><Lock size={12} /> Data aman terenkripsi</span>
        </div>
      </div>

      {agreementChecked && requiresAgreement && (
        <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center px-3 sm:px-6" style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}>
          <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden">
            <div className="px-5 py-4 border-b" style={{ borderColor: '#E9ECEF' }}>
              <div className="text-base" style={{ color: '#1E293B', fontWeight: 800 }}>Persetujuan Penarikan</div>
              <div className="text-xs mt-1" style={{ color: '#64748B' }}>Sebelum lanjut, mohon setujui ketentuan penarikan berikut.</div>
            </div>

            <div className="px-5 py-4 text-sm" style={{ color: '#475569', lineHeight: 1.6, backgroundColor: '#F8FAFC' }}>
              <p className="mb-2">• Proses penarikan memerlukan 1–3 hari kerja.</p>
              <p className="mb-2">• Pastikan nomor dan nama akun DANA benar.</p>
              <p className="mb-2">• Dana yang sedang diproses tidak dapat digunakan sementara.</p>
              <p>• Aktivitas berisiko dapat ditinjau manual demi keamanan.</p>

              <label className="mt-4 flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreementAccepted}
                  onChange={(e) => setAgreementAccepted(e.target.checked)}
                  className="mt-0.5"
                />
                <span style={{ color: '#334155', fontWeight: 600 }}>
                  Saya telah membaca dan menyetujui ketentuan penarikan.
                </span>
              </label>
            </div>

            <div className="px-5 py-4 flex gap-2 border-t" style={{ borderColor: '#E9ECEF' }}>
              <button
                onClick={handleAgreementReject}
                className="flex-1 py-2.5 rounded-xl"
                style={{ backgroundColor: '#FFFFFF', color: '#475569', fontWeight: 700, border: '1px solid #CBD5E1' }}
              >
                Tidak Setuju
              </button>
              <button
                onClick={handleAgreementAccept}
                disabled={!agreementAccepted || agreementSubmitting}
                className="flex-1 py-2.5 rounded-xl"
                style={{
                  backgroundColor: agreementAccepted ? '#F97316' : '#CBD5E1',
                  color: '#fff',
                  fontWeight: 700,
                  cursor: agreementAccepted ? 'pointer' : 'not-allowed',
                  opacity: agreementSubmitting ? 0.8 : 1,
                }}
              >
                {agreementSubmitting ? 'Memproses...' : 'Setuju'}
              </button>
            </div>
          </div>
        </div>
      )}

      <WithdrawalSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        amount={selectedAmount}
        destination="DANA"
        accountNumber={phoneNumber}
      />

      <WithdrawalFailureModal
        isOpen={showFailureModal}
        onClose={() => setShowFailureModal(false)}
        amount={selectedAmount}
        failReason={failureReason}
        onRetry={handleRetry}
        onContactSupport={handleContactSupport}
        onGoBack={handleGoBack}
      />

      <WithdrawalProcessingOverlay
        isVisible={isProcessing}
      />

      <style>{`
        .active\\:scale-98:active {
          transform: scale(0.98);
        }
        .active\\:scale-95:active {
          transform: scale(0.95);
        }
        .diamond-pulse {
          animation: pulse 1.5s infinite;
        }
        .diamond-bounce {
          animation: bounce 1.5s infinite;
        }
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
      `}</style>
    </>
  );
}
