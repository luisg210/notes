import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { Box, Button, CircularProgress, FormControl, Link, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLoginForm } from '../hooks/useLoginForm';

export const LoginForm = () => {
  const { register, onSubmit, errors, loading, isSubmitting } = useLoginForm();
  const navigate = useNavigate();

  return (
    <Box className="login-box">
      <Typography variant="h5" align="center">
        Iniciar sesión
      </Typography>

      <Box component="form" onSubmit={onSubmit}>
        <FormControl fullWidth>
          <TextField
            label="Username"
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

        <Grid marginBottom={1} marginTop={1}>
          <Button
            fullWidth
            className="btn"
            type="submit"
            size="medium"
            variant="outlined"
            disabled={isSubmitting}
          >
            {isSubmitting ? <CircularProgress size={24} /> : 'Iniciar sesion'}
          </Button>
        </Grid>

        <Grid marginTop={2} display="flex" justifyContent="space-between">
          <Link onClick={() => navigate('/register')}>No tengo cuenta</Link>
          <Link onClick={() => navigate('/about')}>About</Link>
        </Grid>
      </Box>
    </Box>
  );
};
