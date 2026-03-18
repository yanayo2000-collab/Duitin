import { X } from 'lucide-react';

interface AgreementWebviewProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'terms' | 'privacy';
}

export function AgreementWebview({ isOpen, onClose, type }: AgreementWebviewProps) {
  if (!isOpen) return null;

  const config = type === 'terms' 
    ? {
        title: 'Syarat & Ketentuan Layanan',
        subtitle: 'Duitin - Terms of Service'
      }
    : {
        title: 'Kebijakan Privasi',
        subtitle: 'Duitin - Privacy Policy'
      };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
      onClick={onClose}
    >
      <div 
        className="w-full rounded-t-3xl animate-slide-up"
        style={{ 
          backgroundColor: '#FFFFFF',
          height: '85vh',
          maxHeight: '85vh',
          boxShadow: '0 -10px 40px rgba(0, 0, 0, 0.3)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div 
          className="flex items-center justify-between px-6 py-4 border-b sticky top-0 z-10"
          style={{ 
            backgroundColor: '#FFFFFF',
            borderColor: '#E9ECEF'
          }}
        >
          <div className="flex-1">
            <h2 className="text-lg mb-0.5" style={{ color: '#1E293B', fontWeight: '700' }}>
              {config.title}
            </h2>
            <p className="text-xs" style={{ color: '#94A3B8' }}>
              {config.subtitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-95"
            style={{ backgroundColor: '#F8F9FA' }}
          >
            <X size={20} style={{ color: '#64748B' }} />
          </button>
        </div>

        {/* Content */}
        <div className="h-full overflow-y-auto px-6 py-6 pb-32" style={{ backgroundColor: '#F8F9FA' }}>
          {/* Quick Summary Card */}
          <div 
            className="p-5 rounded-2xl mb-6"
            style={{ 
              backgroundColor: '#EFF6FF',
              border: '2px solid #DBEAFE'
            }}
          >
            <div className="flex items-start gap-3 mb-3">
              <span className="text-2xl">ℹ️</span>
              <div>
                <h3 className="text-base mb-1" style={{ color: '#1E40AF', fontWeight: '700' }}>
                  Ringkasan Singkat
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#1E40AF' }}>
                  {type === 'terms' 
                    ? 'Dengan menggunakan Duitin, Anda setuju untuk menyelesaikan tugas dengan jujur, menarik saldo sesuai ketentuan, dan tidak melakukan kecurangan.'
                    : 'Kami mengumpulkan data Anda (nama, email, aktivitas) untuk memberikan layanan terbaik dan melindungi privasi Anda sesuai hukum Indonesia.'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div 
            className="p-6 rounded-2xl space-y-6"
            style={{ 
              backgroundColor: '#FFFFFF',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
            }}
          >
            {type === 'terms' ? (
              <>
                {/* Terms Content */}
                <section>
                  <h3 className="text-base mb-3" style={{ color: '#1E293B', fontWeight: '700' }}>
                    1. Penerimaan Ketentuan
                  </h3>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: '#64748B' }}>
                    Dengan mengakses dan menggunakan aplikasi Duitin, Anda secara otomatis menyetujui semua syarat dan ketentuan yang berlaku. Jika Anda tidak setuju, mohon hentikan penggunaan aplikasi ini.
                  </p>
                </section>

                <section>
                  <h3 className="text-base mb-3" style={{ color: '#1E293B', fontWeight: '700' }}>
                    2. Persyaratan Pengguna
                  </h3>
                  <ul className="space-y-2 text-sm" style={{ color: '#64748B', lineHeight: '1.6' }}>
                    <li className="flex gap-2">
                      <span style={{ color: '#F97316' }}>•</span>
                      <span>Berusia minimal 17 tahun atau memiliki izin orang tua/wali.</span>
                    </li>
                    <li className="flex gap-2">
                      <span style={{ color: '#F97316' }}>•</span>
                      <span>Memberikan informasi yang akurat dan valid saat registrasi.</span>
                    </li>
                    <li className="flex gap-2">
                      <span style={{ color: '#F97316' }}>•</span>
                      <span>Bertanggung jawab penuh atas keamanan akun Anda.</span>
                    </li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-base mb-3" style={{ color: '#1E293B', fontWeight: '700' }}>
                    3. Reward & Penarikan
                  </h3>
                  <ul className="space-y-2 text-sm" style={{ color: '#64748B', lineHeight: '1.6' }}>
                    <li className="flex gap-2">
                      <span style={{ color: '#F97316' }}>•</span>
                      <span>1 diamond (💎) = Rp 10 (sepuluh rupiah).</span>
                    </li>
                    <li className="flex gap-2">
                      <span style={{ color: '#F97316' }}>•</span>
                      <span>Minimal penarikan adalah 10.000 diamonds (Rp 100.000).</span>
                    </li>
                    <li className="flex gap-2">
                      <span style={{ color: '#F97316' }}>•</span>
                      <span>Proses penarikan membutuhkan waktu 1-3 hari kerja.</span>
                    </li>
                    <li className="flex gap-2">
                      <span style={{ color: '#F97316' }}>•</span>
                      <span>Kami berhak menahan atau membatalkan penarikan jika terdeteksi aktivitas mencurigakan.</span>
                    </li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-base mb-3" style={{ color: '#1E293B', fontWeight: '700' }}>
                    4. Larangan Pengguna
                  </h3>
                  <ul className="space-y-2 text-sm" style={{ color: '#64748B', lineHeight: '1.6' }}>
                    <li className="flex gap-2">
                      <span style={{ color: '#EF4444' }}>✗</span>
                      <span>Menggunakan bot, script, atau tools otomatis untuk menyelesaikan tugas.</span>
                    </li>
                    <li className="flex gap-2">
                      <span style={{ color: '#EF4444' }}>✗</span>
                      <span>Membuat akun palsu atau duplikat untuk mendapatkan reward berulang.</span>
                    </li>
                    <li className="flex gap-2">
                      <span style={{ color: '#EF4444' }}>✗</span>
                      <span>Melakukan manipulasi, kecurangan, atau eksploitasi sistem.</span>
                    </li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-base mb-3" style={{ color: '#1E293B', fontWeight: '700' }}>
                    5. Sanksi & Penangguhan Akun
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#64748B' }}>
                    Kami berhak menangguhkan atau menonaktifkan akun Anda secara permanen tanpa pemberitahuan sebelumnya jika ditemukan pelanggaran terhadap ketentuan ini. Saldo yang diperoleh dengan cara curang tidak dapat ditarik.
                  </p>
                </section>
              </>
            ) : (
              <>
                {/* Privacy Content */}
                <section>
                  <h3 className="text-base mb-3" style={{ color: '#1E293B', fontWeight: '700' }}>
                    1. Data yang Kami Kumpulkan
                  </h3>
                  <ul className="space-y-2 text-sm" style={{ color: '#64748B', lineHeight: '1.6' }}>
                    <li className="flex gap-2">
                      <span style={{ color: '#3B82F6' }}>•</span>
                      <span>Data pribadi: nama, alamat email, nomor HP, metode pembayaran (DANA, GoPay, dll).</span>
                    </li>
                    <li className="flex gap-2">
                      <span style={{ color: '#3B82F6' }}>•</span>
                      <span>Data aktivitas: tugas yang diselesaikan, transaksi, riwayat penarikan.</span>
                    </li>
                    <li className="flex gap-2">
                      <span style={{ color: '#3B82F6' }}>•</span>
                      <span>Data perangkat: model HP, sistem operasi, alamat IP.</span>
                    </li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-base mb-3" style={{ color: '#1E293B', fontWeight: '700' }}>
                    2. Penggunaan Data
                  </h3>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: '#64748B' }}>
                    Kami menggunakan data Anda untuk:
                  </p>
                  <ul className="space-y-2 text-sm" style={{ color: '#64748B', lineHeight: '1.6' }}>
                    <li className="flex gap-2">
                      <span style={{ color: '#3B82F6' }}>•</span>
                      <span>Memproses tugas dan pembayaran reward.</span>
                    </li>
                    <li className="flex gap-2">
                      <span style={{ color: '#3B82F6' }}>•</span>
                      <span>Meningkatkan kualitas layanan dan pengalaman pengguna.</span>
                    </li>
                    <li className="flex gap-2">
                      <span style={{ color: '#3B82F6' }}>•</span>
                      <span>Mendeteksi dan mencegah fraud atau aktivitas mencurigakan.</span>
                    </li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-base mb-3" style={{ color: '#1E293B', fontWeight: '700' }}>
                    3. Pembagian Data
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#64748B' }}>
                    Kami tidak menjual data pribadi Anda kepada pihak ketiga. Data hanya dibagikan kepada:
                  </p>
                  <ul className="space-y-2 text-sm mt-3" style={{ color: '#64748B', lineHeight: '1.6' }}>
                    <li className="flex gap-2">
                      <span style={{ color: '#3B82F6' }}>•</span>
                      <span>Penyedia layanan pembayaran (untuk memproses penarikan).</span>
                    </li>
                    <li className="flex gap-2">
                      <span style={{ color: '#3B82F6' }}>•</span>
                      <span>Pihak berwenang jika diwajibkan oleh hukum Indonesia.</span>
                    </li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-base mb-3" style={{ color: '#1E293B', fontWeight: '700' }}>
                    4. Keamanan Data
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#64748B' }}>
                    Kami menggunakan enkripsi SSL/TLS dan teknologi keamanan tingkat industri untuk melindungi data Anda. Namun, tidak ada sistem yang 100% aman, sehingga Anda juga perlu menjaga kerahasiaan password dan informasi akun Anda.
                  </p>
                </section>

                <section>
                  <h3 className="text-base mb-3" style={{ color: '#1E293B', fontWeight: '700' }}>
                    5. Hak Pengguna
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#64748B' }}>
                    Anda memiliki hak untuk mengakses, memperbarui, atau menghapus data pribadi Anda kapan saja melalui menu "Hapus Akun" di Pengaturan. Penghapusan akun bersifat permanen dan tidak dapat dibatalkan.
                  </p>
                </section>
              </>
            )}

            {/* Last Updated */}
            <div 
              className="pt-4 border-t text-center"
              style={{ borderColor: '#E9ECEF' }}
            >
              <p className="text-xs" style={{ color: '#94A3B8' }}>
                Terakhir diperbarui: 10 Maret 2026
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slideUp 0.3s ease-out;
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