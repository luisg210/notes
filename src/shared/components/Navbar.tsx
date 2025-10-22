import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { MenuBook } from '@mui/icons-material';
import { useAuthStore } from '@/hooks';
import { logOut } from '@/features/auth';

export const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useAuthStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => setAnchorEl(null);

  const goToProfile = () => {
    handleMenuClose();
    navigate('/profile');
  };

  const handleLogout = () => () => {
    dispatch(logOut());
    handleMenuClose();
    navigate('/login');
  };

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: theme => theme.zIndex.drawer + 1, height: 'auto' }}
      className="navbar"
    >
      <Toolbar>
        <IconButton color="inherit" edge="start" sx={{ mr: 2 }} onClick={() => navigate('/')}>
          <MenuBook />
        </IconButton>
        <Typography variant="h6" noWrap>
          <Button variant="text" onClick={() => navigate('/')} sx={{ color: ['var(--text)'] }}>
            Notas
          </Button>
        </Typography>

        {user && (
          <Box sx={{ marginLeft: 'auto' }}>
            <IconButton onClick={handleMenuOpen} color="inherit">
              <Avatar sx={{ bgcolor: '#90CAF9' }}>{user.user.charAt(0)}</Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem disabled>{user.user}</MenuItem>
              <MenuItem onClick={goToProfile}>Perfil</MenuItem>
              <MenuItem onClick={() => navigate('/about')}>About</MenuItem>
              <MenuItem onClick={handleLogout()}>Cerrar sesión</MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
