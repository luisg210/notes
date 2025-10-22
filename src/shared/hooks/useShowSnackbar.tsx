import { useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

type Severity = 'success' | 'error' | 'info' | 'warning';

export const useAppSnackbar = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<Severity>('info');

  const showSnackbar = (msg: string, sev: Severity = 'info') => {
    setMessage(msg);
    setSeverity(sev);
    setOpen(true);
  };

  const SnackbarComponent = (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={() => setOpen(false)}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      disableWindowBlurListener
    >
      <Alert onClose={() => setOpen(false)} severity={severity} variant="standard">
        {message}
      </Alert>
    </Snackbar>
  );

  return { showSnackbar, SnackbarComponent };
};
