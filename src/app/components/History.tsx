import { ArrowLeft, TrendingUp, TrendingDown, Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useState } from 'react';

export function History() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');

  const transactions = [
    {
      id: 1,
      type: 'income',
      title: 'Review produk di marketplace',
      amount: 1500,
      date: '9 Mar 2026',
      time: '14:32',
      status: 'completed'
    },
    {
      id: 2,
      type: 'withdraw',
      title: 'Penarikan ke DANA',
      amount: 50000,
      date: '8 Mar 2026',
      time: '10:15',
      status: 'processing'
    },
    {
      id: 3,
      type: 'income',
      title: 'Unduh aplikasi dan daftar',
      amount: 800,
      date: '7 Mar 2026',
      time: '16:45',
      status: 'completed'
    },
    {
      id: 4,
      type: 'income',
      title: 'Isi survei kepuasan pelanggan',
      amount: 500,
      date: '7 Mar 2026',
      time: '09:20',
      status: 'completed'
    },
    {
      id: 5,
      type: 'withdraw',
      title: 'Penarikan ke OVO',
      amount: 20000,
      date: '5 Mar 2026',
      time: '13:10',
      status: 'completed'
    },
    {
      id: 6,
      type: 'income',
      title: 'Tonton video 3 menit',
      amount: 250,
      date: '4 Mar 2026',
      time: '11:30',
      status: 'completed'
    },
    {
      id: 7,
      type: 'income',
      title: 'Data Entry Specialist',
      amount: 5000,
      date: '3 Mar 2026',
      time: '15:22',
      status: 'completed'
    },
  ];

  const filters = [
    { id: 'all', label: 'Semua' },
    { id: 'income', label: 'Pemasukan' },
    { id: 'withdraw', label: 'Penarikan' },
  ];

  const filteredTransactions = activeFilter === 'all' 
    ? transactions 
    : transactions.filter(t => t.type === activeFilter);

  return (
    <>
      {/* Header */}
      <div className="px-6 py-4 flex items-center gap-4 border-b bg-white" style={{ borderColor: '#E9ECEF' }}>
        <button 
          onClick={() => navigate('/my-wallet')} 
          className="flex items-center justify-center w-10 h-10 rounded-full transition-all hover:bg-gray-100 active:scale-95"
        >
          <ArrowLeft size={24} style={{ color: '#1E293B' }} />
        </button>
        <h1 className="text-xl" style={{ color: '#1E293B', fontWeight: '700' }}>
          Riwayat Transaksi
        </h1>
      </div>

      {/* Search Bar */}
      <div className="px-6 py-4 bg-white border-b" style={{ borderColor: '#E9ECEF' }}>
        <div className="relative">
          <Search 
            size={20} 
            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: '#94A3B8' }}
          />
          <input
            type="text"
            placeholder="Cari transaksi..."
            className="w-full pl-10 pr-4 py-3 rounded-xl text-sm transition-all focus:outline-none"
            style={{ 
              backgroundColor: '#F8F9FA',
              color: '#1E293B',
              border: '2px solid transparent'
            }}
            onFocus={(e) => e.target.style.borderColor = '#F97316'}
            onBlur={(e) => e.target.style.borderColor = 'transparent'}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="px-6 py-3 bg-white border-b" style={{ borderColor: '#E9ECEF' }}>
        <div className="flex items-center gap-2">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className="px-4 py-2 rounded-full text-sm transition-all active:scale-95"
              style={{
                backgroundColor: activeFilter === filter.id ? '#FFF7ED' : '#F8F9FA',
                color: activeFilter === filter.id ? '#F97316' : '#64748B',
                fontWeight: activeFilter === filter.id ? '600' : '500'
              }}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="px-6 py-4 space-y-3">
          {filteredTransactions.map(transaction => (
            <div 
              key={transaction.id}
              className="p-4 rounded-xl"
              style={{ 
                backgroundColor: '#FFFFFF',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
              }}
            >
              <div className="flex items-start gap-3">
                <div 
                  className="flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0"
                  style={{ 
                    backgroundColor: transaction.type === 'income' ? '#F0FDF4' : '#FFF7ED'
                  }}
                >
                  {transaction.type === 'income' ? (
                    <TrendingUp size={20} style={{ color: '#10B981' }} />
                  ) : (
                    <TrendingDown size={20} style={{ color: '#F97316' }} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-sm flex-1" style={{ color: '#1E293B', fontWeight: '600' }}>
                      {transaction.title}
                    </h3>
                    <div className="text-right flex-shrink-0">
                      <div className="flex items-center gap-1 justify-end">
                        <span style={{ fontSize: '14px' }}>💎</span>
                        <span 
                          className="text-base"
                          style={{ 
                            color: transaction.type === 'income' ? '#10B981' : '#F97316',
                            fontWeight: '700'
                          }}
                        >
                          {transaction.type === 'income' ? '+' : '-'}{transaction.amount.toLocaleString('id-ID', { maximumFractionDigits: 0 })}
                        </span>
                      </div>
                      <div className="text-xs" style={{ color: '#94A3B8' }}>
                        = Rp {(transaction.amount * 10).toLocaleString('id-ID', { maximumFractionDigits: 0 })}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs" style={{ color: '#94A3B8' }}>
                      {transaction.date} • {transaction.time}
                    </span>
                    {transaction.status === 'processing' && (
                      <span 
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{ 
                          backgroundColor: '#FEF3C7',
                          color: '#92400E',
                          fontWeight: '600'
                        }}
                      >
                        Diproses
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .active\\:scale-95:active {
          transform: scale(0.95);
        }
      `}</style>
    </>
  );
}