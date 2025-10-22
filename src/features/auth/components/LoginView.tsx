import { useEffect } from 'react';
import { LoginForm } from './LoginForm';
import { useAppSnackbar } from '@/shared';
import { useAppSelector } from '@/store';

export const LoginView = () => {
  const { showSnackbar, SnackbarComponent } = useAppSnackbar();
  const { error } = useAppSelector(state => state.auth);

  useEffect(() => {
    if (error) {
      showSnackbar(error, 'error');
    }
  }, [error]);

  return (
    <>
      <LoginForm />

      {SnackbarComponent}
    </>
  );
};
