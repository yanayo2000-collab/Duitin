import { ArrowLeft, User } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useState } from 'react';

export function EditProfile() {
  const navigate = useNavigate();
  const [name, setName] = useState('Siti Aisyah');

  const handleSave = () => {
    // Save logic here
    navigate('/profile');
  };

  return (
    <>
      {/* Header */}
      <div className="px-6 py-4 flex items-center gap-4 border-b bg-white" style={{ borderColor: '#E9ECEF' }}>
        <button 
          onClick={() => navigate('/profile')} 
          className="flex items-center justify-center w-10 h-10 rounded-full transition-all hover:bg-gray-100 active:scale-95"
        >
          <ArrowLeft size={24} style={{ color: '#1E293B' }} />
        </button>
        <h1 className="text-xl" style={{ color: '#1E293B', fontWeight: '700' }}>
          Edit Nama
        </h1>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6" style={{ backgroundColor: '#F8F9FA' }}>
        {/* Profile Info (Read-only) */}
        <div className="flex flex-col items-center mb-6">
          <div 
            className="w-24 h-24 rounded-full flex items-center justify-center mb-3"
            style={{ 
              background: 'linear-gradient(135deg, #F97316 0%, #FB923C 100%)',
              boxShadow: '0 4px 12px rgba(249, 115, 22, 0.3)'
            }}
          >
            <span className="text-4xl" style={{ color: '#FFFFFF', fontWeight: '700' }}>S</span>
          </div>
          <div 
            className="text-xs px-3 py-1 rounded-full" 
            style={{ 
              color: '#64748B',
              backgroundColor: '#FFFFFF',
              fontWeight: '600'
            }}
          >
            ID: DU-2024-12345
          </div>
        </div>

        {/* Name Input */}
        <div 
          className="mb-4 p-4 rounded-xl"
          style={{ 
            backgroundColor: '#FFFFFF',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
          }}
        >
          <label className="text-xs block mb-2 flex items-center gap-2" style={{ color: '#64748B', fontWeight: '600' }}>
            <User size={14} />
            <span>Nama Panggilan</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2.5 text-sm rounded-lg transition-all focus:outline-none"
            style={{ 
              color: '#1E293B',
              backgroundColor: '#F8F9FA',
              border: '2px solid transparent',
              fontWeight: '500'
            }}
            onFocus={(e) => e.target.style.borderColor = '#F97316'}
            onBlur={(e) => e.target.style.borderColor = 'transparent'}
            placeholder="Masukkan nama panggilan Anda"
          />
        </div>

        {/* Info Box */}
        <div 
          className="mb-6 p-4 rounded-xl"
          style={{ 
            backgroundColor: '#FFF7ED',
            border: '1px solid #FED7AA'
          }}
        >
          <div className="text-xs" style={{ color: '#F97316', fontWeight: '500', lineHeight: '1.5' }}>
            <strong>Catatan:</strong> Perubahan nama hanya dapat dilakukan 1 kali dalam 30 hari. Pastikan nama yang Anda pilih sesuai keinginan.
          </div>
        </div>

        {/* Save Button */}
        <button 
          onClick={handleSave}
          className="w-full py-3 rounded-xl text-white transition-all active:scale-98"
          style={{ 
            backgroundColor: '#F97316',
            fontWeight: '700',
            boxShadow: '0 2px 8px rgba(249, 115, 22, 0.25)'
          }}
        >
          Simpan Perubahan
        </button>
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