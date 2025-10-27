import { Box, Button, Divider, Typography } from '@mui/material';
import { UserResponseDTO } from '@/types';
import { formatDate } from '@/helpers';
import { Loading } from '@/shared';

type Props = {
  user?: UserResponseDTO;
  loading?: boolean;
  onDeleteUser: () => void;
  onUpdateUser: () => void;
  onChangePasswordUser: () => void;
};

export const UserDetails = ({
  user,
  loading,
  onDeleteUser,
  onUpdateUser,
  onChangePasswordUser,
}: Props) => {
  return (
    <Box className="user-details-box">
      {loading && <Loading />}
      {!loading && (
        <>
          <Box display="flex" mb={2} flexDirection="column" alignItems="center">
            <Typography variant="subtitle1">Nombre </Typography>
            <Typography variant="body1">{user?.name}</Typography>
          </Box>

          <Box display="flex" mb={2} flexDirection="column" alignItems="center">
            <Typography variant="subtitle1">Usuario </Typography>
            <Typography variant="body1">{user?.user}</Typography>
          </Box>

          <Box display="flex" mb={4} justifyContent="space-evenly">
            <Box display="flex" flexDirection="column">
              <Typography variant="subtitle1">Creado el </Typography>
              <Typography variant="body1">{formatDate(user?.createdAt as Date)}</Typography>
            </Box>

            <Box display="flex" flexDirection="column">
              <Typography variant="subtitle1">Actualizado el </Typography>
              <Typography variant="body1">{formatDate(user?.updatedAt as Date)}</Typography>
            </Box>
          </Box>

          <Divider variant="middle" color="#fff" />
          <Box display="flex" justifyContent="space-between" mt={4}>
            <Box display="flex" flexDirection="column" pr={4}>
              <Button
                onClick={onDeleteUser}
                variant="text"
                size="small"
                sx={{ color: ['var(--accent)'] }}
              >
                Eliminar usuario
              </Button>
            </Box>

            <Box display="flex" flexDirection="column" pl={4}>
              <Button
                onClick={onUpdateUser}
                variant="text"
                size="small"
                sx={{ color: ['var(--accent)'] }}
              >
                Actualizar usuario
              </Button>
            </Box>

            <Box display="flex" flexDirection="column" pl={4}>
              <Button
                onClick={onChangePasswordUser}
                variant="text"
                size="small"
                sx={{ color: ['var(--accent)'] }}
              >
                Cambiar contraseña
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};
