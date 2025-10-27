import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Loading, MainTitle, useAppSnackbar } from '@/shared';
import { UserDetails } from './UserDetails';
import { UserChangePasswordForm } from './UserChangePasswordForm';
import { UserForm } from './UserForm';
import { useDeleteWithPassword } from '../hooks/useDeleteWithPassword';
import { useUser } from '../hooks/useUser';
import { useAppSelector } from '@/store';

export const UserView = () => {
  const { error, loading } = useAppSelector(state => state.user);
  const { SnackbarComponent, showSnackbar } = useAppSnackbar();
  const [openFormUpdate, setOpenFormUpdate] = useState(false);
  const [openFormPassword, setOpenFormPassword] = useState(false);
  const { findById, currentUser } = useUser();
  const { ConfirmDialog, PasswordDialog, requestDelete } = useDeleteWithPassword({
    showSnackbar,
  });

  const handleOpenFormUpdate = () => {
    setOpenFormUpdate(true);
  };

  const handleCloseFormUpdate = () => {
    setOpenFormUpdate(false);
  };

  const handleOpenFormPassword = () => {
    setOpenFormPassword(true);
  };

  const handleCloseFormPassword = () => {
    setOpenFormPassword(false);
  };

  const handleOnUpdateUser = () => {
    handleOpenFormUpdate();
  };

  const handleOnUpdatePassword = () => {
    handleOpenFormPassword();
  };

  const handleSuccess = () => {
    findById();
    handleCloseFormPassword();
    handleCloseFormUpdate();
  };

  useEffect(() => {
    findById();

    if (error) {
      showSnackbar(error, 'error');
    }
  }, [error]);

  return (
    <>
      <Box paddingTop={1} paddingBottom={2} display="flex" flexDirection="column" paddingX={4}>
        <Box justifyContent="flex-start" display="flex">
          <MainTitle title="Perfil" />
        </Box>

        <UserDetails
          user={currentUser}
          loading={loading}
          onDeleteUser={requestDelete}
          onUpdateUser={handleOnUpdateUser}
          onChangePasswordUser={handleOnUpdatePassword}
        />
      </Box>

      {/* Form to edit current user */}
      <UserForm
        open={openFormUpdate}
        user={currentUser}
        handleCloseForm={handleCloseFormUpdate}
        showSnackbar={showSnackbar}
        handleSuccess={handleSuccess}
      />
      {/* Form to change password to current user */}
      <UserChangePasswordForm
        open={openFormPassword}
        handleCloseForm={handleCloseFormPassword}
        showSnackbar={showSnackbar}
        handleSuccess={handleSuccess}
      />

      {ConfirmDialog}
      {SnackbarComponent}
      {PasswordDialog}
    </>
  );
};
