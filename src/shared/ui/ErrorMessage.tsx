import { Box, Typography } from '@mui/material';
import type React from 'react';

interface ErrorMessageProps {
  message: string;
  variant?: 'h4' | 'h5' | 'h6' | 'body1' | 'body2';
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, variant = 'h4' }) => {
  return (
    <Box mt={2} mb={2} p={2} className="error-text" borderRadius={4}>
      <Typography variant={variant} align="center" marginTop="1rem" gutterBottom>
        {message}
      </Typography>
    </Box>
  );
};

export default ErrorMessage;
