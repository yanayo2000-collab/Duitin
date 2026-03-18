import { ArrowLeft, Clock, Building2, BriefcaseBusiness, MapPin, ShieldAlert } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router';

type JobPost = {
  id: string;
  title: string;
  publisher: string;
  salaryRpPerDay: number;
  location: string;
  type: string;
  description: string;
};

const fallbackJob: JobPost = {
  id: 'jp_001',
  title: 'Online Chat Operator',
  publisher: 'Mitra Recruit ID',
  salaryRpPerDay: 180000,
  location: 'Remote',
  type: 'Paruh Waktu',
  description: 'Membalas chat pelanggan dan follow-up inquiry harian.',
};

export function TaskDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const job: JobPost = location.state?.job || fallbackJob;

  return (
    <>
      <div className="px-6 py-4 flex items-center gap-4 border-b bg-white" style={{ borderColor: '#E9ECEF' }}>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center w-10 h-10 rounded-full transition-all hover:bg-gray-100 active:scale-95"
        >
          <ArrowLeft size={24} style={{ color: '#1E293B' }} />
        </button>
        <h1 className="text-xl" style={{ color: '#1E293B', fontWeight: '700' }}>
          Detail Pekerjaan
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="px-6 py-6 bg-white mb-4">
          <h2 className="text-lg mb-2" style={{ color: '#1E293B', fontWeight: '700' }}>
            {job.title}
          </h2>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <div className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full" style={{ backgroundColor: '#EFF6FF', color: '#1D4ED8', fontWeight: 700 }}>
              <Building2 size={12} />
              {job.publisher}
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full" style={{ backgroundColor: '#FFF7ED', color: '#C2410C', fontWeight: 700 }}>
              <BriefcaseBusiness size={12} />
              {job.type}
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full" style={{ backgroundColor: '#F1F5F9', color: '#334155', fontWeight: 700 }}>
              <MapPin size={12} />
              {job.location}
            </div>
          </div>

          <div
            className="p-4 rounded-xl mb-4"
            style={{
              background: 'linear-gradient(135deg, #F97316 0%, #FB923C 100%)',
              boxShadow: '0 4px 12px rgba(249, 115, 22, 0.25)',
            }}
          >
            <div className="text-xs mb-1" style={{ color: '#FFF7ED', fontWeight: '600' }}>
              Kisaran Upah Harian
            </div>
            <div className="text-2xl" style={{ color: '#FFFFFF', fontWeight: '800' }}>
              Rp {job.salaryRpPerDay.toLocaleString('id-ID', { maximumFractionDigits: 0 })}
            </div>
          </div>

          <div className="text-sm mb-4" style={{ color: '#334155', lineHeight: 1.6 }}>
            {job.description}
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-xl" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0' }}>
              <div className="text-xs mb-1" style={{ color: '#64748B', fontWeight: 700 }}>Contoh Tugas</div>
              <ul className="text-sm" style={{ color: '#334155', lineHeight: 1.6, paddingLeft: 16 }}>
                <li>Online Chat Operator: respon chat pelanggan sesuai template.</li>
                <li>Penerjemah Online: terjemahkan chat/email singkat secara akurat.</li>
                <li>Pengetik: input data harian dengan target ketepatan tinggi.</li>
              </ul>
            </div>

            <div className="p-3 rounded-xl flex items-start gap-2" style={{ backgroundColor: '#FFF7ED', border: '1px solid #FED7AA' }}>
              <ShieldAlert size={16} style={{ color: '#F97316', marginTop: 1 }} />
              <p className="text-xs" style={{ color: '#9A3412', lineHeight: 1.5, fontWeight: 600 }}>
                Pekerjaan ini dipublikasikan oleh pihak ketiga. Pastikan Anda memverifikasi legalitas dan detail pekerjaan sebelum melanjutkan.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 border-t bg-white" style={{ borderColor: '#E9ECEF' }}>
        <button
          className="w-full py-3 rounded-xl transition-all active:scale-98"
          style={{
            backgroundColor: '#F97316',
            color: '#FFFFFF',
            fontWeight: '700',
            boxShadow: '0 2px 8px rgba(249, 115, 22, 0.25)',
          }}
          onClick={() => navigate('/customer-service')}
        >
          Hubungi Penerbit Lowongan
        </button>
        <div className="mt-2 text-xs text-center" style={{ color: '#94A3B8' }}>
          Duitin hanya menyediakan halaman informasi lowongan.
        </div>
      </div>

      <style>{`
        .active\\:scale-98:active { transform: scale(0.98); }
        .active\\:scale-95:active { transform: scale(0.95); }
      `}</style>
    </>
  );
}
