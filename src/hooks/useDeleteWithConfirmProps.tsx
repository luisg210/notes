import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { useAppSnackbar } from '@/shared';

type UseDeleteWithConfirmProps = {
  entityName: string;
  deleteThunk: (id: string) => any;
  onDeleted: () => void;
  showSnackbar: (msg: string, sev: any) => void;
};

export const useDeleteWithConfirm = ({
  entityName,
  deleteThunk,
  onDeleted,
  showSnackbar,
}: UseDeleteWithConfirmProps) => {
  const [open, setOpen] = useState(false);
  const [targetId, setTargetId] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const { SnackbarComponent } = useAppSnackbar();

  const requestDelete = (id: string) => {
    setTargetId(id);
    setOpen(true);
  };

  const confirmDelete = async () => {
    if (!targetId) return;
    const result = await dispatch(deleteThunk(targetId));
    if (result.type.includes('fulfilled')) {
      showSnackbar(`${entityName} eliminado correctamente`, 'success');
      onDeleted();
    } else {
      showSnackbar(`Error al eliminar ${entityName}`, 'error');
    }
    setOpen(false);
  };

  const ConfirmDialog = (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <Box sx={{ backgroundColor: ['var(--card)'] }}>
        <DialogTitle>¿Eliminar {entityName}?</DialogTitle>
        <DialogContent sx={{ color: ['var(--text-muted)'] }}>
          Esta acción no se puede deshacer.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={confirmDelete} color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );

  return {
    requestDelete,
    ConfirmDialog,
    SnackbarComponent,
  };
};
