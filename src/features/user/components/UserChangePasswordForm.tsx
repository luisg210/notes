import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
} from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { UserChangePasswordFormData, userChangePasswordSchema } from '../validation';
import { useUserChangePasswordForm } from '../hooks/useChangePasswordForm';

type Props = {
  open: boolean;
  showSnackbar: (msg: string, sev: any) => void;
  handleCloseForm: () => void;
  handleSuccess: () => void;
};

export const UserChangePasswordForm = ({
  open,
  showSnackbar,
  handleCloseForm,
  handleSuccess,
}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<UserChangePasswordFormData>({
    resolver: zodResolver(userChangePasswordSchema),
  });
  const { onSubmit } = useUserChangePasswordForm({
    showSnackbar,
    reset,
    handleSuccess,
  });

  return (
    <Dialog open={open} onClose={handleCloseForm}>
      <Box
        component="form"
        sx={{ backgroundColor: ['var(--card)'] }}
        onSubmit={handleSubmit(data => onSubmit(data))}
      >
        <DialogTitle>Actualizar contraseña</DialogTitle>

        <DialogContent sx={{ color: ['var(--text-muted)'] }}>
          <FormControl fullWidth>
            <TextField
              label="Contraseña actual"
              type="password"
              variant="filled"
              {...register('currentPassword')}
              error={!!errors.currentPassword}
              helperText={errors.currentPassword?.message}
              margin="normal"
              color="warning"
            />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              label="Nueva contraseña"
              type="password"
              variant="filled"
              {...register('newPassword')}
              error={!!errors.newPassword}
              helperText={errors.newPassword?.message}
              margin="normal"
              color="warning"
            />
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseForm} sx={{ color: ['var(--error)'] }}>
            Cancelar
          </Button>

          <Button
            type="submit"
            variant="text"
            sx={{ color: ['var(--success)'] }}
            disabled={isSubmitting}
          >
            Actualizar
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
