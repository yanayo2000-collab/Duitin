import { Navigate } from 'react-router';

export function RedirectToTasks() {
  return <Navigate to="/tasks" replace />;
}
