import React from 'react';
import { Box, Grid, Toolbar } from '@mui/material';
import { Navbar } from '@/shared';

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar />
      <Box component="div" sx={{ flexGrow: 1, p: 3 }}>
        {/* Espace for the app bar */}
        <Toolbar />

        <Grid
          component="main"
          sx={{
            flexFlow: 2,
          }}
          className="main"
        >
          {/* Main content */}
          {children}
        </Grid>
      </Box>
    </Box>
  );
};

export default MainLayout;
