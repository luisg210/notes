import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { DeleteForever, Edit, Visibility } from '@mui/icons-material';
import { NoteResponseDTO } from '@/types';
import { formatRelativeDate } from '@/helpers';

type Props = {
  note: NoteResponseDTO;
  onEdit: () => void;
  onViewDetails: () => void;
  onDelete: () => void;
};

export const NoteCard = ({ note, onDelete, onEdit, onViewDetails }: Props) => {
  return (
    <Card elevation={4} className="card-note">
      <CardActionArea onClick={onViewDetails}>
        <CardContent>
          <Typography variant="h6" gutterBottom justifySelf="center">
            {note.title}
          </Typography>

          <Typography variant="body2">
            {note.content.length > 30 ? note.content.slice(0, 30) + '...' : note.content}
          </Typography>

          <Box mt={4} alignContent="center">
            <Typography variant="body2">Creada: {formatRelativeDate(note.date)}</Typography>
            <Typography variant="body2">
              Modificada: {note.updatedAt ? formatRelativeDate(note.updatedAt) : ''}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>

      <CardActions>
        <Grid display="flex" justifyContent="center" justifyItems="center" width="100%" gap={1}>
          <Box>
            <IconButton title="Eliminar" onClick={onDelete} color="error">
              <DeleteForever />
            </IconButton>
          </Box>

          <Box>
            <IconButton onClick={onEdit} title="Editar" color="primary">
              <Edit />
            </IconButton>
          </Box>

          <Box>
            <IconButton onClick={onViewDetails} title="Detalles" color="secondary">
              <Visibility />
            </IconButton>
          </Box>
        </Grid>
      </CardActions>
    </Card>
  );
};
