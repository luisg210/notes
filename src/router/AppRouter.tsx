import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense } from 'react';
import { useAuthStore } from '@/hooks';
import { Loading } from '@/shared';
import { AuthGuard } from './AuthGuard';
import { NotesView } from '@/features/notes';
import { LoginView } from '@/features/auth';
import { About } from '@/pages';
import { UserRegister, UserView } from '@/features/user';
import MainLayout from '@/layouts/MainLayout';

export const AppRouter = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Publics routes */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <AuthGuard>
                <NotesView />
              </AuthGuard>
            ) : (
              <LoginView />
            )
          }
        />
        {/* Conditional register route */}
        {!isAuthenticated && <Route path="/register" element={<UserRegister />} />}
        {/* Private Route */}
        <Route
          path="/about"
          element={
            isAuthenticated ? (
              <MainLayout>
                <About />
              </MainLayout>
            ) : (
              <About />
            )
          }
        />
        {/* Private Route */}
        <Route path="/user" element={<UserView />} />
        {/* Default route */}
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
};
