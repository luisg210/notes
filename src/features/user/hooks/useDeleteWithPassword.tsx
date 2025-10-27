import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Loading, useAppSnackbar } from '@/shared';
import { deleteUserThunk } from '../userThunks';
import { UserDeleteDTO } from '@/types';
import { UserDeleteFormData, userDeleteSchema } from '../validation';
import { logOut } from '@/features/auth';

type Props = {
  showSnackbar: (msg: string, sev: any) => void;
};

export const useDeleteWithPassword = ({ showSnackbar }: Props) => {
  const { loading } = useAppSelector(state => state.user);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { SnackbarComponent } = useAppSnackbar();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<UserDeleteFormData>({
    resolver: zodResolver(userDeleteSchema),
  });

  const requestDelete = () => {
    setOpenConfirm(true);
  };

  const closePassword = () => {
    setOpenPassword(false);
    reset();
  };

  const confirmDelete = () => {
    setOpenConfirm(false);
    setOpenPassword(true);
  };

  const handleLogOut = () => {
    dispatch(logOut());
    navigate('/login');
  };

  const onSubmit = handleSubmit(async (data: UserDeleteFormData) => {
    const result = await dispatch(deleteUserThunk(data as UserDeleteDTO));

    if (result.type.includes('fulfilled')) {
      showSnackbar(`${result.payload}. Pronto seras redirigido al login`, 'success');

      // Para esperar que muestre el snackbar antes de cerrar sesión
      setTimeout(() => {
        handleLogOut();
      }, 8000);
    } else {
      showSnackbar(`Error al eliminar usuario`, 'error');
    }
  });

  const ConfirmDialog = (
    <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
      <Box sx={{ backgroundColor: ['var(--card)'] }}>
        <DialogTitle>¿Eliminar Usuario?</DialogTitle>
        <DialogContent sx={{ color: ['var(--text-muted)'] }}>
          Esta acción no se puede deshacer. Perderas todas tus notas.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>Cancelar</Button>
          <Button onClick={confirmDelete} color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );

  const PasswordDialog = (
    <Dialog open={openPassword} onClose={closePassword}>
      <Box component="form" sx={{ backgroundColor: ['var(--card)'] }} onSubmit={onSubmit}>
        {loading && (
          <DialogContent>
            <Loading />
          </DialogContent>
        )}

        {!loading && (
          <>
            <DialogTitle>¿Eliminar Usuario?</DialogTitle>
            <DialogContent sx={{ color: ['var(--text-muted)'] }}>
              <Typography variant="body1">Para continuar, ingresa tu contraseña</Typography>
              <FormControl fullWidth>
                <TextField
                  label="Contraseña"
                  variant="outlined"
                  type="password"
                  {...register('password')}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  margin="normal"
                  color="warning"
                />
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={closePassword}>Cancelar</Button>
              <Button type="submit" color="error">
                Eliminar
              </Button>
            </DialogActions>
          </>
        )}
      </Box>
    </Dialog>
  );

  return {
    requestDelete,
    ConfirmDialog,
    SnackbarComponent,
    PasswordDialog,
  };
};
