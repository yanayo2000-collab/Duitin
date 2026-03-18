export function toUserError(err: unknown, fallback = 'Terjadi kesalahan, silakan coba lagi.') {
  const msg = err instanceof Error ? err.message : String(err || '');
  if (!msg) return fallback;

  if (msg.includes('Failed to fetch') || msg.includes('NetworkError')) {
    return 'Koneksi server terputus, silakan muat ulang.';
  }
  if (msg.includes('invalid token') || msg.includes('token revoked') || msg.includes('missing token')) {
    return 'Sesi login berakhir. Silakan masuk ulang.';
  }
  if (msg.includes('insufficient balance')) {
    return 'Saldo tidak mencukupi.';
  }
  if (msg.includes('task already completed')) {
    return 'Tugas ini sudah pernah diselesaikan.';
  }

  return msg;
}
