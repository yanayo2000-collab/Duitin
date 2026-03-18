const DEV_API_FALLBACK = (() => {
  if (typeof window !== 'undefined') {
    const { protocol, hostname } = window.location;
    return `${protocol}//${hostname}:3002`;
  }
  return 'http://localhost:3002';
})();

const API_BASE = import.meta.env.DEV
  ? ((import.meta.env.VITE_API_BASE_URL as string | undefined) || DEV_API_FALLBACK)
  : 'https://phenomenon-specification-picking-hansen.trycloudflare.com';

export function getToken() {
  return localStorage.getItem("duitin_token") || "";
}

export function setToken(token: string) {
  localStorage.setItem("duitin_token", token);
}

export function clearToken() {
  localStorage.removeItem("duitin_token");
}

const WALLET_CACHE_KEY = 'duitin_wallet_cache_v1';

export function getWalletCache(): { balance: number; frozen: number } {
  try {
    const raw = localStorage.getItem(WALLET_CACHE_KEY);
    if (!raw) return { balance: 0, frozen: 0 };
    const obj = JSON.parse(raw);
    return {
      balance: Number(obj?.balance || 0),
      frozen: Number(obj?.frozen || 0),
    };
  } catch {
    return { balance: 0, frozen: 0 };
  }
}

export function setWalletCache(balance: number, frozen = 0) {
  localStorage.setItem(WALLET_CACHE_KEY, JSON.stringify({ balance: Number(balance || 0), frozen: Number(frozen || 0) }));
}

export async function apiRequest(path: string, options: RequestInit = {}) {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const resetAt = localStorage.getItem('duitin_reset_at') || '';
  if (resetAt) {
    headers['x-reset-at'] = resetAt;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  const text = await res.text();
  let data: any = {};

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      const snippet = text.slice(0, 120).replace(/\s+/g, ' ');
      throw new Error(`Invalid API response (${res.status}): ${snippet}`);
    }
  }

  if (!res.ok) {
    throw new Error(data?.message || `Request failed: ${res.status}`);
  }

  return data;
}

export { API_BASE };
