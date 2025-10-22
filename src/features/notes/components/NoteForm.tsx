import { useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
} from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { NoteResponseDTO, NoteUpdateDTO } from '@/types';
import { NoteFormData, noteSchema } from '../validation';
import { useNoteForm } from '../hooks/useNoteForm';
import { adaptDTOToForm } from '../adapters/adapDTOtoForm';
import { defaultValues } from '../adapters/defaultValues';

type Props = {
  open: boolean;
  note?: NoteResponseDTO;
  handleCloseForm: () => void;
  handleSuccess: () => void;
  showSnackbar: (msg: string, sev: any) => void;
};

export const NoteForm = ({ open, note, handleCloseForm, handleSuccess, showSnackbar }: Props) => {
  const isEditing = !!note;

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteFormData>({
    resolver: zodResolver(noteSchema),
    defaultValues: isEditing ? adaptDTOToForm(note as NoteUpdateDTO) : defaultValues(),
  });
  const { onSubmit } = useNoteForm({
    showSnackbar,
    handleSuccess,
    reset,
  });

  const onClosedForm = () => {
    reset(defaultValues());
    handleCloseForm();
  };

  useEffect(() => {
    if (open && note?._id) {
      reset(note);
    }
  }, [note, reset, open]);

  return (
    <Dialog open={open} onClose={handleCloseForm}>
      <Box
        component="form"
        sx={{ backgroundColor: ['var(--card)'] }}
        onSubmit={handleSubmit(data => onSubmit(data, note as NoteUpdateDTO))}
      >
        <DialogTitle>{isEditing ? 'Actualizar nota' : 'Nueva Nota'}</DialogTitle>

        <DialogContent sx={{ color: ['var(--text-muted)'] }}>
          <FormControl fullWidth>
            <TextField
              label="Titulo"
              type="text"
              variant="filled"
              {...register('title')}
              error={!!errors.title}
              helperText={errors.title?.message}
              margin="normal"
              color="warning"
            />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              label="Content"
              type="text"
              variant="filled"
              {...register('content')}
              error={!!errors.content}
              helperText={errors.content?.message}
              margin="normal"
              color="warning"
              multiline
              rows={4}
            />
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClosedForm} sx={{ color: ['var(--error)'] }}>
            Cancelar
          </Button>

          <Button
            type="submit"
            variant="text"
            sx={{ color: ['var(--success)'] }}
            disabled={isSubmitting}
          >
            Guardar
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
