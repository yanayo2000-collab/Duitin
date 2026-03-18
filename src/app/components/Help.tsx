import { ArrowLeft, ChevronDown, ChevronUp, MessageCircle, Mail, Phone } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { goBack } from '../../lib/nav';

export function Help() {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      question: 'Bagaimana cara mendapatkan diamonds?',
      answer: 'Anda dapat mendapatkan diamonds dengan menyelesaikan berbagai tugas seperti mengisi survei, menonton video, mengunduh aplikasi, menulis review produk, dan mengajak teman. Setiap tugas memiliki nilai reward yang berbeda-beda.'
    },
    {
      id: 2,
      question: 'Berapa nilai 1 diamond dalam rupiah?',
      answer: '1 diamond setara dengan 10 Rupiah. Jadi jika Anda memiliki 1000 diamonds, itu sama dengan Rp 10.000.'
    },
    {
      id: 3,
      question: 'Bagaimana cara menarik saldo?',
      answer: 'Buka menu Penarikan, pilih metode pembayaran (DANA, GoPay, OVO, atau Bank Transfer), masukkan nominal yang ingin ditarik (minimal 10.000 diamonds), dan ikuti instruksi selanjutnya. Proses penarikan biasanya selesai dalam 1-3 hari kerja.'
    },
    {
      id: 4,
      question: 'Berapa minimal penarikan saldo?',
      answer: 'Minimal penarikan adalah 10.000 diamonds atau setara dengan Rp 100.000. Pastikan saldo Anda mencukupi sebelum melakukan penarikan.'
    },
    {
      id: 5,
      question: 'Apakah ada batas maksimal penarikan?',
      answer: 'Untuk pengguna baru, batas maksimal penarikan adalah 100.000 diamonds per hari. Setelah verifikasi identitas, batas dapat ditingkatkan hingga 500.000 diamonds per hari.'
    },
    {
      id: 6,
      question: 'Bagaimana cara mengajak teman?',
      answer: 'Buka menu Ajak Teman, salin kode undangan Anda, dan bagikan ke teman-teman. Anda akan mendapat bonus 500 diamonds untuk setiap teman yang berhasil mendaftar dan menyelesaikan tugas pertama mereka.'
    },
    {
      id: 7,
      question: 'Kenapa tugas saya ditolak?',
      answer: 'Tugas bisa ditolak jika tidak memenuhi syarat, seperti review terlalu pendek, rating tidak sesuai, atau bukti tidak valid. Pastikan Anda membaca dan mengikuti instruksi tugas dengan teliti.'
    },
    {
      id: 8,
      question: 'Apakah Duitin aman dan terpercaya?',
      answer: 'Ya, Duitin adalah platform resmi dan terpercaya. Kami telah melayani ribuan pengguna di Indonesia dengan sistem pembayaran yang aman dan transparan. Data pribadi Anda dilindungi dengan enkripsi tingkat tinggi.'
    },
  ];

  const contactMethods = [
    {
      id: 1,
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat dengan tim support kami',
      value: 'Buka Chat',
      color: '#10B981',
      bgColor: '#DCFCE7'
    },
    {
      id: 2,
      icon: Mail,
      title: 'Email',
      description: 'Kirim email ke support',
      value: 'support@duitin.id',
      color: '#F97316',
      bgColor: '#FFF7ED'
    },
    {
      id: 3,
      icon: Phone,
      title: 'WhatsApp',
      description: 'Hubungi via WhatsApp',
      value: '+62 812-3456-7890',
      color: '#3B82F6',
      bgColor: '#EFF6FF'
    },
  ];

  const toggleFaq = (id: number) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

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
          Bantuan
        </h1>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6" style={{ backgroundColor: '#F8F9FA' }}>
        {/* Help Header */}
        <div 
          className="mb-6 p-6 rounded-2xl text-center"
          style={{ 
            backgroundColor: '#FFFFFF',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)'
          }}
        >
          <div className="text-5xl mb-3">💬</div>
          <h2 className="text-xl mb-2" style={{ color: '#1E293B', fontWeight: '700' }}>
            Ada yang bisa kami bantu?
          </h2>
          <p className="text-sm" style={{ color: '#64748B', lineHeight: '1.5' }}>
            Temukan jawaban dari pertanyaan umum atau hubungi tim support kami
          </p>
        </div>

        {/* Contact Methods */}
        <div className="mb-6">
          <h3 className="text-base mb-4" style={{ color: '#1E293B', fontWeight: '700' }}>
            Hubungi Kami
          </h3>
          <div className="space-y-3">
            {contactMethods.map((method) => (
              <button
                key={method.id}
                className="w-full p-4 rounded-xl flex items-center gap-4 transition-all active:scale-98"
                style={{
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                }}
              >
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: method.bgColor }}
                >
                  <method.icon size={24} style={{ color: method.color }} />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-base mb-1" style={{ color: '#1E293B', fontWeight: '600' }}>
                    {method.title}
                  </div>
                  <div className="text-sm" style={{ color: '#64748B' }}>
                    {method.description}
                  </div>
                </div>
                <div className="text-xs px-3 py-1.5 rounded-lg" style={{ 
                  backgroundColor: method.bgColor,
                  color: method.color,
                  fontWeight: '600'
                }}>
                  {method.value.includes('@') || method.value.includes('+') ? 'Kontak' : method.value}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <h3 className="text-base mb-4" style={{ color: '#1E293B', fontWeight: '700' }}>
            Pertanyaan Umum (FAQ)
          </h3>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="rounded-xl overflow-hidden"
                style={{
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                }}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-4 flex items-center justify-between transition-all active:scale-98"
                  style={{ backgroundColor: expandedFaq === faq.id ? '#FFF7ED' : '#FFFFFF' }}
                >
                  <span 
                    className="text-left text-sm pr-3"
                    style={{ 
                      color: '#1E293B',
                      fontWeight: '600',
                      lineHeight: '1.4'
                    }}
                  >
                    {faq.question}
                  </span>
                  {expandedFaq === faq.id ? (
                    <ChevronUp size={20} style={{ color: '#F97316' }} className="flex-shrink-0" />
                  ) : (
                    <ChevronDown size={20} style={{ color: '#94A3B8' }} className="flex-shrink-0" />
                  )}
                </button>
                {expandedFaq === faq.id && (
                  <div 
                    className="px-4 pb-4 pt-2 text-sm"
                    style={{ 
                      color: '#64748B',
                      lineHeight: '1.6',
                      backgroundColor: '#FFFBEB',
                      borderTop: '1px solid #FDE68A'
                    }}
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Info */}
        <div 
          className="mt-6 p-4 rounded-xl"
          style={{ 
            backgroundColor: '#EFF6FF',
            border: '1px solid #BFDBFE'
          }}
        >
          <p className="text-sm text-center" style={{ color: '#1E40AF', lineHeight: '1.5' }}>
            <strong>Jam Operasional:</strong><br />
            Senin - Jumat: 09:00 - 18:00 WIB<br />
            Sabtu - Minggu: 10:00 - 16:00 WIB
          </p>
        </div>
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
