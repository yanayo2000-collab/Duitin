import { ArrowLeft, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useEffect, useMemo, useState } from 'react';
import { apiRequest } from '../../lib/api';

type Item = {
  id: string;
  title: string;
  status: string;
  reward: number;
  completedAt: string;
};

export function TaskHistory() {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState('semua');
  const [tasks, setTasks] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await apiRequest('/api/task-history');
        setTasks(Array.isArray(data.items) ? data.items : []);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Gagal memuat riwayat tugas');
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  const filters = useMemo(() => [
    { id: 'semua', label: 'Semua', count: tasks.length },
    { id: 'completed', label: 'Selesai', count: tasks.filter(t => t.status === 'completed').length },
    { id: 'in-progress', label: 'Berlangsung', count: tasks.filter(t => t.status === 'in-progress').length },
    { id: 'failed', label: 'Gagal', count: tasks.filter(t => t.status === 'failed').length },
  ], [tasks]);

  const filteredTasks = selectedFilter === 'semua'
    ? tasks
    : tasks.filter(t => t.status === selectedFilter);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 size={20} style={{ color: '#10B981' }} fill="#10B981" strokeWidth={0} />;
      case 'in-progress':
        return <Clock size={20} style={{ color: '#F97316' }} />;
      case 'failed':
        return <XCircle size={20} style={{ color: '#EF4444' }} fill="#EF4444" strokeWidth={0} />;
      default:
        return <Clock size={20} style={{ color: '#94A3B8' }} />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Selesai';
      case 'in-progress':
        return 'Berlangsung';
      case 'failed':
        return 'Gagal';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#10B981';
      case 'in-progress':
        return '#F97316';
      case 'failed':
        return '#EF4444';
      default:
        return '#94A3B8';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'completed':
        return '#DCFCE7';
      case 'in-progress':
        return '#FFF7ED';
      case 'failed':
        return '#FEF2F2';
      default:
        return '#F8F9FA';
    }
  };

  const totalCompleted = tasks.filter(t => t.status === 'completed').length;
  const totalRewardEarned = tasks
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + Number(t.reward || 0), 0);

  return (
    <>
      <div className="px-6 py-4 flex items-center gap-4 border-b bg-white" style={{ borderColor: '#E9ECEF' }}>
        <button
          onClick={() => navigate('/profile')}
          className="flex items-center justify-center w-10 h-10 rounded-full transition-all hover:bg-gray-100 active:scale-95"
        >
          <ArrowLeft size={24} style={{ color: '#1E293B' }} />
        </button>
        <h1 className="text-xl" style={{ color: '#1E293B', fontWeight: '700' }}>
          Riwayat Tugas
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div
            className="p-5 rounded-xl"
            style={{
              backgroundColor: '#FFFFFF',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)'
            }}
          >
            <div className="text-xs mb-2" style={{ color: '#64748B', fontWeight: '600' }}>
              Total Selesai
            </div>
            <div className="text-3xl mb-1" style={{ color: '#10B981', fontWeight: '700' }}>
              {totalCompleted}
            </div>
            <div className="text-xs" style={{ color: '#94A3B8' }}>
              Tugas diselesaikan
            </div>
          </div>

          <div
            className="p-5 rounded-xl"
            style={{
              backgroundColor: '#FFFFFF',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)'
            }}
          >
            <div className="text-xs mb-2" style={{ color: '#64748B', fontWeight: '600' }}>
              Total Reward
            </div>
            <div className="flex items-center gap-1 mb-1">
              <span style={{ fontSize: '16px' }}>💎</span>
              <span className="text-2xl" style={{ color: '#F97316', fontWeight: '700' }}>
                {totalRewardEarned.toLocaleString('id-ID', { maximumFractionDigits: 0 })}
              </span>
            </div>
            <div className="text-xs" style={{ color: '#94A3B8' }}>
              Sudah diklaim
            </div>
          </div>
        </div>

        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className="px-4 py-2 rounded-lg whitespace-nowrap transition-all active:scale-95 flex items-center gap-2"
              style={{
                backgroundColor: selectedFilter === filter.id ? '#FFF7ED' : '#FFFFFF',
                color: selectedFilter === filter.id ? '#F97316' : '#64748B',
                border: `1.5px solid ${selectedFilter === filter.id ? '#F97316' : '#E9ECEF'}`,
                fontWeight: selectedFilter === filter.id ? '700' : '500',
                fontSize: '14px'
              }}
            >
              <span>{filter.label}</span>
              <span
                className="px-2 py-0.5 rounded-full text-xs"
                style={{
                  backgroundColor: selectedFilter === filter.id ? '#F97316' : '#E9ECEF',
                  color: selectedFilter === filter.id ? '#FFFFFF' : '#64748B',
                  fontWeight: '700'
                }}
              >
                {filter.count}
              </span>
            </button>
          ))}
        </div>

        {loading && <div className="text-sm" style={{ color: '#64748B' }}>Memuat riwayat...</div>}
        {error && <div className="text-sm" style={{ color: '#EF4444' }}>{error}</div>}

        <div className="space-y-3">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className="p-4 rounded-xl"
                style={{
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="pt-0.5">
                    {getStatusIcon(task.status)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base mb-1" style={{ color: '#1E293B', fontWeight: '600', lineHeight: '1.3' }}>
                      {task.title}
                    </h3>
                    {task.completedAt && (
                      <div className="text-xs" style={{ color: '#94A3B8', fontWeight: '500' }}>
                        {new Date(task.completedAt).toLocaleDateString('id-ID')} • {new Date(task.completedAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 justify-end mb-1">
                      <span style={{ fontSize: '16px' }}>💎</span>
                      <span
                        className="text-lg"
                        style={{
                          color: task.status === 'completed' ? '#10B981' : '#64748B',
                          fontWeight: '700'
                        }}
                      >
                        {Number(task.reward || 0).toLocaleString('id-ID', { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div
                    className="text-xs px-2 py-1 rounded-full"
                    style={{
                      backgroundColor: getStatusBg(task.status),
                      color: getStatusColor(task.status),
                      fontWeight: '600'
                    }}
                  >
                    {getStatusText(task.status)}
                  </div>
                  <div
                    className="text-xs px-2 py-1 rounded"
                    style={{
                      backgroundColor: '#F8F9FA',
                      color: '#64748B',
                      fontWeight: '600'
                    }}
                  >
                    Tugas
                  </div>
                </div>
              </div>
            ))
          ) : (
            !loading && !error &&
            <div
              className="p-8 rounded-xl text-center"
              style={{
                backgroundColor: '#FFFFFF',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
              }}
            >
              <div className="text-4xl mb-3">📋</div>
              <div className="text-base mb-1" style={{ color: '#1E293B', fontWeight: '600' }}>
                Tidak ada tugas
              </div>
              <div className="text-sm" style={{ color: '#64748B' }}>
                Belum ada tugas dengan status ini
              </div>
            </div>
          )}
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
