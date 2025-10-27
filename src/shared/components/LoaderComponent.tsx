import { CircularProgress, Box } from '@mui/material';

export const Loading = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 15, mb: 4 }}>
    <CircularProgress color="success" />
  </Box>
);
