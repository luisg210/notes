import { Navigate } from 'react-router-dom';
import type { JSX } from 'react';
import { useAuthStore } from '@/hooks';
import { Loading } from '@/shared';
import MainLayout from '@/layouts/MainLayout';

export const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, sessionChecked } = useAuthStore();
  // if (!sessionChecked) return <Loading />;
  if (!isAuthenticated) return <Navigate to="/login" />;

  return <MainLayout>{children}</MainLayout>;
};
