import { useState } from 'react';
import { ArrowLeft, Smartphone, Mail, ArrowRight, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router';

export function ForgotPassword() {
  const navigate = useNavigate();
  const [method, setMethod] = useState<'phone' | 'email'>('phone');
  const [contact, setContact] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate sending reset link/code
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
        {/* Success State */}
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.5rem' }}>
          <div 
            style={{ 
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.5rem',
              backgroundColor: '#DCFCE7',
              boxShadow: '0 8px 24px rgba(16, 185, 129, 0.2)'
            }}
          >
            <CheckCircle size={40} style={{ color: '#10B981' }} />
          </div>
          
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', textAlign: 'center', color: '#1E293B', fontWeight: '700' }}>
            Link Reset Terkirim!
          </h2>
          
          <p style={{ fontSize: '0.875rem', textAlign: 'center', marginBottom: '2rem', color: '#64748B', lineHeight: '1.5', maxWidth: '360px' }}>
            {method === 'phone' 
              ? `Kode verifikasi telah dikirim ke ${contact}`
              : `Link reset telah dikirim ke ${contact}`
            }
          </p>

          <div style={{ width: '100%', maxWidth: '24rem' }}>
            <button
              onClick={() => navigate('/login')}
              className="active:scale-98"
              style={{
                width: '100%',
                padding: '0.875rem',
                borderRadius: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                marginBottom: '0.75rem',
                border: 'none',
                cursor: 'pointer',
                background: 'linear-gradient(135deg, #F97316 0%, #FB923C 100%)',
                boxShadow: '0 4px 16px rgba(249, 115, 22, 0.3)'
              }}
            >
              <span style={{ fontSize: '1rem', color: '#FFFFFF', fontWeight: '700' }}>
                Kembali ke Login
              </span>
            </button>

            <button
              onClick={() => setIsSuccess(false)}
              className="active:scale-98"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '0.75rem',
                backgroundColor: '#F8F9FA',
                border: '2px solid #E9ECEF',
                color: '#64748B',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Kirim Ulang
            </button>
          </div>
        </div>

        <style>{`
          .active\\:scale-98:active {
            transform: scale(0.98);
            transition: transform 0.1s;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      {/* Header */}
      <div 
        style={{ 
          padding: '1rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          borderBottom: '1px solid #E9ECEF',
          backgroundColor: '#FFFFFF'
        }}
      >
        <button onClick={() => navigate('/login')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}>
          <ArrowLeft size={24} style={{ color: '#1E293B' }} />
        </button>
        <h1 style={{ fontSize: '1.25rem', color: '#1E293B', fontWeight: '700', margin: 0 }}>
          Lupa Kata Sandi
        </h1>
      </div>

      {/* Content */}
      <div style={{ padding: '1.5rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem', backgroundColor: '#FFF7ED' }}>
            <span style={{ fontSize: '28px' }}>🔑</span>
          </div>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '0.25rem', color: '#1E293B', fontWeight: '700' }}>
            Reset Kata Sandi
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: '1.5' }}>
            Pilih metode untuk menerima link reset
          </p>
        </div>

        {/* Method Selection */}
        <div style={{ marginBottom: '1.25rem' }}>
          <p style={{ fontSize: '0.875rem', marginBottom: '0.625rem', color: '#64748B', fontWeight: '600' }}>
            Pilih Metode Reset
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.625rem' }}>
            <button
              onClick={() => {
                setMethod('phone');
                setContact('');
              }}
              className="active:scale-98"
              style={{
                padding: '0.875rem',
                borderRadius: '0.75rem',
                backgroundColor: method === 'phone' ? '#FFF7ED' : '#F8F9FA',
                border: `2px solid ${method === 'phone' ? '#F97316' : '#E9ECEF'}`,
                cursor: 'pointer'
              }}
            >
              <Smartphone 
                size={22} 
                style={{ 
                  color: method === 'phone' ? '#F97316' : '#94A3B8',
                  marginBottom: '6px'
                }} 
              />
              <p 
                style={{ 
                  fontSize: '0.875rem',
                  color: method === 'phone' ? '#F97316' : '#64748B',
                  fontWeight: '600',
                  margin: 0
                }}
              >
                Via SMS
              </p>
            </button>

            <button
              onClick={() => {
                setMethod('email');
                setContact('');
              }}
              className="active:scale-98"
              style={{
                padding: '0.875rem',
                borderRadius: '0.75rem',
                backgroundColor: method === 'email' ? '#FFF7ED' : '#F8F9FA',
                border: `2px solid ${method === 'email' ? '#F97316' : '#E9ECEF'}`,
                cursor: 'pointer'
              }}
            >
              <Mail 
                size={22} 
                style={{ 
                  color: method === 'email' ? '#F97316' : '#94A3B8',
                  marginBottom: '6px'
                }} 
              />
              <p 
                style={{ 
                  fontSize: '0.875rem',
                  color: method === 'email' ? '#F97316' : '#64748B',
                  fontWeight: '600',
                  margin: 0
                }}
              >
                Via Email
              </p>
            </button>
          </div>
        </div>

        {/* Form */}
        <div 
          style={{ 
            padding: '1.25rem',
            borderRadius: '1rem',
            marginBottom: '1rem',
            backgroundColor: '#FFFFFF',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
          }}
        >
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: '#64748B', fontWeight: '600' }}>
                {method === 'phone' ? 'Nomor HP' : 'Email'}
              </label>
              <div style={{ position: 'relative' }}>
                <div 
                  style={{ 
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#94A3B8'
                  }}
                >
                  {method === 'phone' ? <Smartphone size={18} /> : <Mail size={18} />}
                </div>
                <input
                  type={method === 'phone' ? 'tel' : 'email'}
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder={method === 'phone' ? '08xxxxxxxxxx' : 'contoh@email.com'}
                  style={{
                    width: '100%',
                    paddingLeft: '2.75rem',
                    paddingRight: '1rem',
                    paddingTop: '0.75rem',
                    paddingBottom: '0.75rem',
                    borderRadius: '0.75rem',
                    fontSize: '1rem',
                    outline: 'none',
                    backgroundColor: '#F8F9FA',
                    border: '2px solid #E9ECEF',
                    color: '#1E293B'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#F97316';
                    e.target.style.backgroundColor = '#FFFFFF';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#E9ECEF';
                    e.target.style.backgroundColor = '#F8F9FA';
                  }}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="active:scale-98"
              style={{
                width: '100%',
                padding: '0.875rem',
                borderRadius: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                border: 'none',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                background: isLoading ? '#FCA5A5' : 'linear-gradient(135deg, #F97316 0%, #FB923C 100%)',
                boxShadow: isLoading ? 'none' : '0 4px 16px rgba(249, 115, 22, 0.3)',
                opacity: isLoading ? 0.7 : 1
              }}
            >
              {isLoading ? (
                <>
                  <div style={{ width: '18px', height: '18px', border: '3px solid white', borderTopColor: 'transparent', borderRadius: '50%' }} className="animate-spin" />
                  <span style={{ fontSize: '1rem', color: '#FFFFFF', fontWeight: '700' }}>
                    Mengirim...
                  </span>
                </>
              ) : (
                <>
                  <span style={{ fontSize: '1rem', color: '#FFFFFF', fontWeight: '700' }}>
                    Kirim Link Reset
                  </span>
                  <ArrowRight size={18} style={{ color: '#FFFFFF' }} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Help Text - Simplified */}
        <div 
          style={{ 
            padding: '0.875rem',
            borderRadius: '0.75rem',
            backgroundColor: '#F1F5F9',
            border: '1px solid #E2E8F0'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem' }}>
            <span style={{ fontSize: '18px' }}>💡</span>
            <div>
              <p style={{ fontSize: '0.75rem', color: '#64748B', lineHeight: '1.4', margin: '0 0 0.375rem 0' }}>
                Tidak menerima link dalam 5 menit? Hubungi customer service kami.
              </p>
              <button
                onClick={() => navigate('/customer-service')}
                style={{ fontSize: '0.75rem', color: '#F97316', fontWeight: '600', border: 'none', background: 'none', padding: 0, cursor: 'pointer' }}
              >
                Hubungi CS →
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .active\\:scale-98:active {
          transform: scale(0.98);
          transition: transform 0.1s;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
}
