import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
  Typography,
} from '@mui/material';
import { NoteResponseDTO } from '@/types';
import { formatDate } from '@/helpers';

type Props = {
  open: boolean;
  note?: NoteResponseDTO;
  onClosedDetail: () => void;
};

export const NoteDetails = ({ open, note, onClosedDetail }: Props) => {
  const isNote = !!note;
  return (
    <Dialog open={isNote && open} fullWidth>
      <Box sx={{ backgroundColor: ['var(--card)'] }} px={4}>
        <DialogTitle mb={2}>Detalles de Nota</DialogTitle>

        <DialogContent sx={{ color: ['var(--text-muted)'] }}>
          <Box display="flex" flexDirection="column" mb={2}>
            <Typography variant="subtitle1">Titulo: </Typography>
            <Typography variant="body1">{note?.title}</Typography>
          </Box>

          <Box display="flex" flexDirection="column" mb={4}>
            <Typography variant="subtitle1">Contenido: </Typography>
            <Typography variant="body1">{note?.content}</Typography>
          </Box>

          <Box display="flex" justifyContent="space-between">
            <Box display="flex" flexDirection="column" pr={4}>
              <Typography variant="subtitle1">Creado el: </Typography>
              <Typography variant="body1">{formatDate(note?.createdAt as Date)}</Typography>
            </Box>

            <Box display="flex" flexDirection="column" pl={4}>
              <Typography variant="subtitle1">Actualizado el: </Typography>
              <Typography variant="body1">{formatDate(note?.updatedAt as Date)}</Typography>
            </Box>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClosedDetail} sx={{ color: ['var(--error)'] }}>
            Cerrar
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
