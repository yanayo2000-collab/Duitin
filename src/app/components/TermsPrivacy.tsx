import { ArrowLeft, FileText, Shield } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { goBack } from '../../lib/nav';

export function TermsPrivacy() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'terms' | 'privacy'>('terms');

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
          Syarat & Privasi
        </h1>
      </div>

      {/* Tab Navigation */}
      <div className="px-6 py-4 bg-white border-b" style={{ borderColor: '#E9ECEF' }}>
        <div className="p-1 rounded-xl grid grid-cols-2 gap-1" style={{ backgroundColor: '#EEF2F7' }}>
          <button
            onClick={() => setActiveTab('terms')}
            className="py-2.5 rounded-lg transition-all active:scale-98 flex items-center justify-center gap-2"
            style={{
              backgroundColor: activeTab === 'terms' ? '#FFFFFF' : 'transparent',
              color: activeTab === 'terms' ? '#F97316' : '#64748B',
              fontWeight: activeTab === 'terms' ? '700' : '600',
              fontSize: '14px',
              boxShadow: activeTab === 'terms' ? '0 1px 2px rgba(15,23,42,0.08)' : 'none'
            }}
          >
            <FileText size={16} />
            <span>Syarat</span>
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className="py-2.5 rounded-lg transition-all active:scale-98 flex items-center justify-center gap-2"
            style={{
              backgroundColor: activeTab === 'privacy' ? '#FFFFFF' : 'transparent',
              color: activeTab === 'privacy' ? '#F97316' : '#64748B',
              fontWeight: activeTab === 'privacy' ? '700' : '600',
              fontSize: '14px',
              boxShadow: activeTab === 'privacy' ? '0 1px 2px rgba(15,23,42,0.08)' : 'none'
            }}
          >
            <Shield size={16} />
            <span>Privasi</span>
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6" style={{ backgroundColor: '#F8F9FA' }}>
        {activeTab === 'terms' ? (
          <>
            {/* Terms Header */}
            <div 
              className="mb-6 p-6 rounded-2xl"
              style={{ 
                backgroundColor: '#FFFFFF',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)'
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: '#FFF7ED' }}
                >
                  <FileText size={24} style={{ color: '#F97316' }} />
                </div>
                <div>
                  <h2 className="text-lg" style={{ color: '#1E293B', fontWeight: '700' }}>
                    Syarat & Ketentuan
                  </h2>
                  <div className="text-xs" style={{ color: '#64748B' }}>
                    Terakhir diperbarui: 1 Maret 2026
                  </div>
                </div>
              </div>
              <p className="text-sm" style={{ color: '#64748B', lineHeight: '1.6' }}>
                Dengan menggunakan aplikasi Duitin, Anda menyetujui syarat dan ketentuan berikut. Harap baca dengan seksama.
              </p>
            </div>

            {/* Terms Content */}
            <div className="space-y-4">
              <div 
                className="p-5 rounded-xl"
                style={{ 
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                }}
              >
                <h3 className="text-base mb-3" style={{ color: '#1E293B', fontWeight: '700' }}>
                  1. Ketentuan Umum
                </h3>
                <ul className="space-y-2 text-sm" style={{ color: '#64748B', lineHeight: '1.6' }}>
                  <li className="flex gap-2">
                    <span style={{ color: '#F97316' }}>•</span>
                    <span>Pengguna harus berusia minimal 17 tahun atau memiliki izin dari orang tua/wali.</span>
                  </li>
                  <li className="flex gap-2">
                    <span style={{ color: '#F97316' }}>•</span>
                    <span>Setiap pengguna hanya diperbolehkan memiliki satu akun aktif.</span>
                  </li>
                  <li className="flex gap-2">
                    <span style={{ color: '#F97316' }}>•</span>
                    <span>Informasi yang diberikan saat pendaftaran harus akurat dan benar.</span>
                  </li>
                  <li className="flex gap-2">
                    <span style={{ color: '#F97316' }}>•</span>
                    <span>Pengguna bertanggung jawab menjaga kerahasiaan akun dan kata sandi.</span>
                  </li>
                </ul>
              </div>

              <div 
                className="p-5 rounded-xl"
                style={{ 
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                }}
              >
                <h3 className="text-base mb-3" style={{ color: '#1E293B', fontWeight: '700' }}>
                  2. Penggunaan Layanan
                </h3>
                <ul className="space-y-2 text-sm" style={{ color: '#64748B', lineHeight: '1.6' }}>
                  <li className="flex gap-2">
                    <span style={{ color: '#F97316' }}>•</span>
                    <span>Tugas harus diselesaikan sesuai dengan instruksi yang diberikan.</span>
                  </li>
                  <li className="flex gap-2">
                    <span style={{ color: '#F97316' }}>•</span>
                    <span>Dilarang menggunakan bot, script, atau metode otomatis untuk menyelesaikan tugas.</span>
                  </li>
                  <li className="flex gap-2">
                    <span style={{ color: '#F97316' }}>•</span>
                    <span>Review dan konten yang diberikan harus jujur dan sesuai pengalaman pribadi.</span>
                  </li>
                  <li className="flex gap-2">
                    <span style={{ color: '#F97316' }}>•</span>
                    <span>Kami berhak menolak atau membatalkan tugas yang tidak memenuhi syarat.</span>
                  </li>
                </ul>
              </div>

              <div 
                className="p-5 rounded-xl"
                style={{ 
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                }}
              >
                <h3 className="text-base mb-3" style={{ color: '#1E293B', fontWeight: '700' }}>
                  3. Reward & Penarikan
                </h3>
                <ul className="space-y-2 text-sm" style={{ color: '#64748B', lineHeight: '1.6' }}>
                  <li className="flex gap-2">
                    <span style={{ color: '#F97316' }}>•</span>
                    <span>1 diamond setara dengan 10 Rupiah Indonesia.</span>
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
              </div>

              <div 
                className="p-5 rounded-xl"
                style={{ 
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                }}
              >
                <h3 className="text-base mb-3" style={{ color: '#1E293B', fontWeight: '700' }}>
                  4. Larangan
                </h3>
                <ul className="space-y-2 text-sm" style={{ color: '#64748B', lineHeight: '1.6' }}>
                  <li className="flex gap-2">
                    <span style={{ color: '#F97316' }}>•</span>
                    <span>Dilarang melakukan kecurangan atau manipulasi sistem.</span>
                  </li>
                  <li className="flex gap-2">
                    <span style={{ color: '#F97316' }}>•</span>
                    <span>Dilarang membuat multiple account untuk mendapatkan bonus berulang kali.</span>
                  </li>
                  <li className="flex gap-2">
                    <span style={{ color: '#F97316' }}>•</span>
                    <span>Dilarang memberikan informasi palsu atau menyesatkan.</span>
                  </li>
                  <li className="flex gap-2">
                    <span style={{ color: '#F97316' }}>•</span>
                    <span>Pelanggaran dapat mengakibatkan pembekuan atau penghapusan akun.</span>
                  </li>
                </ul>
              </div>

              <div 
                className="p-5 rounded-xl"
                style={{ 
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                }}
              >
                <h3 className="text-base mb-3" style={{ color: '#1E293B', fontWeight: '700' }}>
                  5. Perubahan Layanan
                </h3>
                <p className="text-sm" style={{ color: '#64748B', lineHeight: '1.6' }}>
                  Kami berhak mengubah, memodifikasi, atau menghentikan layanan kapan saja tanpa pemberitahuan sebelumnya. Kami tidak bertanggung jawab atas kerugian yang timbul dari perubahan tersebut.
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Privacy Header */}
            <div 
              className="mb-6 p-6 rounded-2xl"
              style={{ 
                backgroundColor: '#FFFFFF',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)'
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: '#EFF6FF' }}
                >
                  <Shield size={24} style={{ color: '#3B82F6' }} />
                </div>
                <div>
                  <h2 className="text-lg" style={{ color: '#1E293B', fontWeight: '700' }}>
                    Kebijakan Privasi
                  </h2>
                  <div className="text-xs" style={{ color: '#64748B' }}>
                    Terakhir diperbarui: 1 Maret 2026
                  </div>
                </div>
              </div>
              <p className="text-sm" style={{ color: '#64748B', lineHeight: '1.6' }}>
                Duitin berkomitmen untuk melindungi privasi pengguna. Kebijakan ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi data Anda.
              </p>
            </div>

            {/* Privacy Content */}
            <div className="space-y-4">
              <div 
                className="p-5 rounded-xl"
                style={{ 
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                }}
              >
                <h3 className="text-base mb-3" style={{ color: '#1E293B', fontWeight: '700' }}>
                  1. Informasi yang Kami Kumpulkan
                </h3>
                <ul className="space-y-2 text-sm" style={{ color: '#64748B', lineHeight: '1.6' }}>
                  <li className="flex gap-2">
                    <span style={{ color: '#3B82F6' }}>•</span>
                    <span>Informasi pribadi: nama, email, nomor telepon, tanggal lahir.</span>
                  </li>
                  <li className="flex gap-2">
                    <span style={{ color: '#3B82F6' }}>•</span>
                    <span>Informasi keuangan: nomor rekening bank, akun e-wallet.</span>
                  </li>
                  <li className="flex gap-2">
                    <span style={{ color: '#3B82F6' }}>•</span>
                    <span>Data aktivitas: tugas yang diselesaikan, transaksi, riwayat penarikan.</span>
                  </li>
                  <li className="flex gap-2">
                    <span style={{ color: '#3B82F6' }}>•</span>
                    <span>Informasi perangkat: tipe perangkat, sistem operasi, alamat IP.</span>
                  </li>
                </ul>
              </div>

              <div 
                className="p-5 rounded-xl"
                style={{ 
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                }}
              >
                <h3 className="text-base mb-3" style={{ color: '#1E293B', fontWeight: '700' }}>
                  2. Penggunaan Informasi
                </h3>
                <ul className="space-y-2 text-sm" style={{ color: '#64748B', lineHeight: '1.6' }}>
                  <li className="flex gap-2">
                    <span style={{ color: '#3B82F6' }}>•</span>
                    <span>Memproses tugas dan pembayaran reward.</span>
                  </li>
                  <li className="flex gap-2">
                    <span style={{ color: '#3B82F6' }}>•</span>
                    <span>Verifikasi identitas pengguna untuk keamanan.</span>
                  </li>
                  <li className="flex gap-2">
                    <span style={{ color: '#3B82F6' }}>•</span>
                    <span>Mengirim notifikasi terkait tugas, reward, dan update layanan.</span>
                  </li>
                  <li className="flex gap-2">
                    <span style={{ color: '#3B82F6' }}>•</span>
                    <span>Meningkatkan kualitas layanan dan pengalaman pengguna.</span>
                  </li>
                  <li className="flex gap-2">
                    <span style={{ color: '#3B82F6' }}>•</span>
                    <span>Mencegah penipuan dan aktivitas yang melanggar ketentuan.</span>
                  </li>
                </ul>
              </div>

              <div 
                className="p-5 rounded-xl"
                style={{ 
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                }}
              >
                <h3 className="text-base mb-3" style={{ color: '#1E293B', fontWeight: '700' }}>
                  3. Keamanan Data
                </h3>
                <ul className="space-y-2 text-sm" style={{ color: '#64748B', lineHeight: '1.6' }}>
                  <li className="flex gap-2">
                    <span style={{ color: '#3B82F6' }}>•</span>
                    <span>Data Anda dilindungi dengan enkripsi SSL/TLS tingkat tinggi.</span>
                  </li>
                  <li className="flex gap-2">
                    <span style={{ color: '#3B82F6' }}>•</span>
                    <span>Server kami menggunakan firewall dan sistem keamanan berlapis.</span>
                  </li>
                  <li className="flex gap-2">
                    <span style={{ color: '#3B82F6' }}>•</span>
                    <span>Akses data dibatasi hanya untuk staf yang berwenang.</span>
                  </li>
                  <li className="flex gap-2">
                    <span style={{ color: '#3B82F6' }}>•</span>
                    <span>Kami melakukan audit keamanan secara berkala.</span>
                  </li>
                </ul>
              </div>

              <div 
                className="p-5 rounded-xl"
                style={{ 
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                }}
              >
                <h3 className="text-base mb-3" style={{ color: '#1E293B', fontWeight: '700' }}>
                  4. Berbagi Informasi
                </h3>
                <p className="text-sm mb-3" style={{ color: '#64748B', lineHeight: '1.6' }}>
                  Kami tidak akan menjual atau menyewakan informasi pribadi Anda kepada pihak ketiga. Informasi hanya dibagikan dalam kondisi berikut:
                </p>
                <ul className="space-y-2 text-sm" style={{ color: '#64748B', lineHeight: '1.6' }}>
                  <li className="flex gap-2">
                    <span style={{ color: '#3B82F6' }}>•</span>
                    <span>Dengan persetujuan eksplisit dari Anda.</span>
                  </li>
                  <li className="flex gap-2">
                    <span style={{ color: '#3B82F6' }}>•</span>
                    <span>Kepada penyedia layanan pembayaran untuk memproses penarikan.</span>
                  </li>
                  <li className="flex gap-2">
                    <span style={{ color: '#3B82F6' }}>•</span>
                    <span>Jika diwajibkan oleh hukum atau proses hukum yang berlaku.</span>
                  </li>
                </ul>
              </div>

              <div 
                className="p-5 rounded-xl"
                style={{ 
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                }}
              >
                <h3 className="text-base mb-3" style={{ color: '#1E293B', fontWeight: '700' }}>
                  5. Hak Pengguna
                </h3>
                <ul className="space-y-2 text-sm" style={{ color: '#64748B', lineHeight: '1.6' }}>
                  <li className="flex gap-2">
                    <span style={{ color: '#3B82F6' }}>•</span>
                    <span>Mengakses dan memperbarui informasi pribadi Anda kapan saja.</span>
                  </li>
                  <li className="flex gap-2">
                    <span style={{ color: '#3B82F6' }}>•</span>
                    <span>Meminta penghapusan data pribadi (dengan syarat tertentu).</span>
                  </li>
                  <li className="flex gap-2">
                    <span style={{ color: '#3B82F6' }}>•</span>
                    <span>Menolak penggunaan data untuk tujuan marketing.</span>
                  </li>
                  <li className="flex gap-2">
                    <span style={{ color: '#3B82F6' }}>•</span>
                    <span>Mendapatkan salinan data yang kami simpan tentang Anda.</span>
                  </li>
                </ul>
              </div>

              <div 
                className="p-5 rounded-xl"
                style={{ 
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                }}
              >
                <h3 className="text-base mb-3" style={{ color: '#1E293B', fontWeight: '700' }}>
                  6. Cookies & Teknologi Pelacakan
                </h3>
                <p className="text-sm" style={{ color: '#64748B', lineHeight: '1.6' }}>
                  Kami menggunakan cookies dan teknologi serupa untuk meningkatkan pengalaman pengguna, mengingat preferensi, dan menganalisis penggunaan layanan. Anda dapat mengatur browser untuk menolak cookies, namun beberapa fitur mungkin tidak berfungsi optimal.
                </p>
              </div>
            </div>
          </>
        )}

        {/* Contact Info */}
        <div 
          className="mt-6 p-5 rounded-xl"
          style={{ 
            backgroundColor: '#FFFBEB',
            border: '1px solid #FDE68A'
          }}
        >
          <p className="text-sm" style={{ color: '#92400E', lineHeight: '1.6' }}>
            <strong>Pertanyaan tentang kebijakan ini?</strong><br />
            Hubungi kami di <strong>legal@duitin.id</strong> atau melalui menu Bantuan.
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
