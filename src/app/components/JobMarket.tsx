import { ArrowLeft, BriefcaseBusiness, ShieldAlert, Info } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useMemo, useState } from 'react';

type JobPost = {
  id: string;
  title: string;
  publisher: string;
  resmi?: boolean;
  level: 'A' | 'B' | 'C';
  salaryRpPerDay: number;
  location: string;
  type: string;
  description: string;
};

const jobPosts: JobPost[] = [
  {
    id: 'jp_001',
    title: 'Online Chat Operator',
    publisher: 'LK',
    resmi: true,
    level: 'A',
    salaryRpPerDay: 180000,
    location: 'Remote',
    type: 'Paruh Waktu',
    description: 'Membalas chat pelanggan dan follow-up inquiry harian.',
  },
  {
    id: 'jp_002',
    title: 'Penerjemah Online (ID-EN)',
    publisher: 'TM',
    level: 'B',
    salaryRpPerDay: 220000,
    location: 'Remote',
    type: 'Freelance',
    description: 'Menerjemahkan chat/email pendek dari Indonesia ke Inggris.',
  },
  {
    id: 'jp_003',
    title: 'Data Entry / Pengetik',
    publisher: 'HY',
    resmi: false,
    level: 'C',
    salaryRpPerDay: 160000,
    location: 'Remote',
    type: 'Paruh Waktu',
    description: 'Input data sederhana ke template yang sudah disediakan.',
  },
];

export function JobMarket() {
  const navigate = useNavigate();
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  const userGender = (localStorage.getItem('userGender') || '').toLowerCase();
  const userAge = Number(localStorage.getItem('userAge') || 0);
  const isAdult = userAge >= 18;
  const isVipEligible = userGender === 'female' && userAge >= 18 && userAge <= 40;

  const sortedJobs = useMemo(() => {
    const scoped = !isAdult
      ? []
      : isVipEligible
        ? jobPosts
        : jobPosts.filter((job) => job.level === 'B' || job.level === 'C');

    return [...scoped].sort((a, b) => {
      const rank = (level: 'A' | 'B' | 'C') => (level === 'A' ? 1 : level === 'B' ? 2 : 3);
      const byLevel = rank(a.level) - rank(b.level);
      if (byLevel !== 0) return byLevel;
      return b.salaryRpPerDay - a.salaryRpPerDay;
    });
  }, [isAdult, isVipEligible]);

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
          Lowongan
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pt-3 pb-6" style={{ backgroundColor: '#F1F3F5' }}>

        {!isAdult && (
          <div className="p-4 rounded-2xl mb-3" style={{ backgroundColor: '#FEF2F2', color: '#B91C1C', fontWeight: 700 }}>
            App ini hanya untuk pengguna dewasa (18+).
          </div>
        )}

        <div className="space-y-3">
          {sortedJobs.map((job) => (
            <div
              key={job.id}
              className="p-4 rounded-2xl"
              style={{
                backgroundColor: '#FFFFFF',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
              }}
            >
              <h3 className="text-[15px] mb-1.5" style={{ color: '#0F172A', fontWeight: '700', lineHeight: 1.3 }}>
                {job.title}
              </h3>

              <div className="flex items-center gap-2 mb-2">
                <div className="text-xs" style={{ color: '#64748B', fontWeight: 600 }}>
                  Publisher: {job.publisher}
                </div>
                {job.resmi && (
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: '#DBEAFE', color: '#1D4ED8', fontWeight: 700 }}
                  >
                    RESMI
                  </span>
                )}
              </div>

              <div className="text-xs mb-2" style={{ color: '#64748B', lineHeight: 1.4 }}>
                {job.type} · {job.location}
              </div>

              <p className="text-xs mb-3" style={{ color: '#475569', lineHeight: 1.45 }}>
                {job.description}
              </p>

              <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl mb-3" style={{ backgroundColor: '#F7F2EB' }}>
                <BriefcaseBusiness size={14} style={{ color: '#F97316' }} />
                <p className="text-sm" style={{ color: '#F97316', fontWeight: '700', lineHeight: 1.2 }}>
                  Rp {job.salaryRpPerDay.toLocaleString('id-ID', { maximumFractionDigits: 0 })}/hari
                </p>
              </div>

              <button
                className="w-full py-2.5 rounded-xl transition-all active:scale-98"
                style={{
                  backgroundColor: 'transparent',
                  color: '#F97316',
                  fontWeight: '700',
                  fontSize: '14px',
                  border: '1.5px solid #F97316',
                }}
                onClick={() => navigate('/task-detail', { state: { job } })}
              >
                Lihat Detail
              </button>
            </div>
          ))}
        </div>
      </div>

      {showDisclaimer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6" style={{ backgroundColor: 'rgba(15,23,42,0.5)' }}>
          <div className="w-full max-w-sm rounded-2xl p-4" style={{ backgroundColor: '#FFFFFF' }}>
            <div className="flex items-start gap-2 mb-3">
              <ShieldAlert size={16} style={{ color: '#F97316', marginTop: 1 }} />
              <h3 style={{ color: '#1E293B', fontWeight: 700 }}>Informasi Penting</h3>
            </div>
            <p className="text-sm" style={{ color: '#475569', lineHeight: 1.55 }}>
              Lowongan di halaman ini dipublikasikan oleh pihak ketiga. Duitin tidak menerbitkan lowongan secara langsung.
              Harap verifikasi detail pekerjaan sebelum melamar.
            </p>
            <button
              className="mt-4 w-full py-2.5 rounded-xl"
              style={{ backgroundColor: '#F97316', color: '#FFFFFF', fontWeight: 700 }}
              onClick={() => setShowDisclaimer(false)}
            >
              Saya Mengerti
            </button>
          </div>
        </div>
      )}

      <style>{`
        .active\\:scale-98:active { transform: scale(0.98); }
        .active\\:scale-95:active { transform: scale(0.95); }
      `}</style>
    </>
  );
}
