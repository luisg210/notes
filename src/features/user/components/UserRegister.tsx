import { useEffect } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useRegisterForm } from '../hooks/useRegisterForm';
import { useAppSnackbar } from '@/shared';
import { useAppDispatch } from '@/store';
import { clearState } from '../userSlice';

export const UserRegister = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { SnackbarComponent, showSnackbar } = useAppSnackbar();
  const { error, onSubmit, register, errors, isSubmitting } = useRegisterForm();

  useEffect(() => {
    if (error) {
      showSnackbar(error, 'error');

      dispatch(clearState());
    }
  }, [error]);

  return (
    <>
      <Box className="login-box">
        <Typography variant="h5" align="center">
          Crear usuario
        </Typography>

        <Box component="form" onSubmit={onSubmit}>
          <FormControl fullWidth>
            <TextField
              label="Nombre"
              variant="outlined"
              type="text"
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
              margin="normal"
              color="warning"
            />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              label="Nombre de usuario"
              variant="outlined"
              type="text"
              {...register('user')}
              error={!!errors.user}
              helperText={errors.user?.message}
              margin="normal"
              color="warning"
            />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              label="Contraseña"
              type="password"
              {...register('password')}
              variant="outlined"
              error={!!errors.password}
              helperText={errors.password?.message}
              margin="normal"
              color="warning"
            />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              label="Repite la contraseña"
              type="password"
              {...register('repeatPassword')}
              variant="outlined"
              error={!!errors.repeatPassword}
              helperText={errors.repeatPassword?.message}
              margin="normal"
              color="warning"
            />
          </FormControl>

          <Grid marginBottom={1} marginTop={1}>
            <Button
              fullWidth
              className="btn"
              type="submit"
              size="medium"
              variant="outlined"
              disabled={isSubmitting}
            >
              {isSubmitting ? <CircularProgress size={24} /> : 'Crear usuario'}
            </Button>
          </Grid>

          <Grid marginTop={2} display="flex" justifyContent="space-between">
            <Link onClick={() => navigate('/')}>Ya tengo cuenta</Link>
            <Link onClick={() => navigate('/about')}>About</Link>
          </Grid>
        </Box>
      </Box>

      {SnackbarComponent}
    </>
  );
};
