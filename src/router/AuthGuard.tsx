import { Navigate } from 'react-router-dom';
import type { JSX } from 'react';
import { useAuthStore } from '@/hooks';
import MainLayout from '@/layouts/MainLayout';

export const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" />;

  return <MainLayout>{children}</MainLayout>;
};
