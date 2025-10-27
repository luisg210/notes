import { Grid, Grow } from '@mui/material';
import { Loading } from '@/shared';
import { NoteResponseDTO } from '@/types';
import { NoteCard } from './NoteCard';
import ErrorMessage from '@/shared/ui/ErrorMessage';

type Props = {
  loading: boolean;
  notes: NoteResponseDTO[] | null;
  onEdit: (note: NoteResponseDTO) => void;
  onViewDetails: (note: NoteResponseDTO) => void;
  onDelete: (id: string) => void;
};

export const NoteList = ({ loading, notes, onEdit, onViewDetails, onDelete }: Props) => {
  const notesReversed = [...(notes ?? [])].reverse();
  if (loading) return <Loading />;

  return (
    <>
      {!Array.isArray(notesReversed) ||
        (notesReversed.length === 0 && <ErrorMessage message="No se encontraron notas" />)}

      {Array.isArray(notesReversed) && notesReversed && (
        <Grow in timeout={1000}>
          <Grid
            container
            spacing={2}
            display="flex"
            justifyContent="center"
            alignContent="center"
            marginTop={5}
          >
            {notesReversed.map(note => (
              <NoteCard
                key={note._id}
                note={note}
                onEdit={() => onEdit(note)}
                onViewDetails={() => onViewDetails(note)}
                onDelete={() => onDelete(note._id)}
              />
            ))}
          </Grid>
        </Grow>
      )}
    </>
  );
};
