import type { NavigateFunction } from 'react-router';

export function goBack(navigate: NavigateFunction) {
  if (typeof window !== 'undefined' && window.history.length > 1) {
    navigate(-1);
    return;
  }
  navigate('/');
}
