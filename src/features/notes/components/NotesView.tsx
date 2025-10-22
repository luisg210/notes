import { Box, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { AddOutlined } from '@mui/icons-material';
import { MainTitle, useAppSnackbar } from '@/shared';
import { useNote } from '../hooks/useNote';
import { NoteList } from './NoteList';
import { NoteResponseDTO } from '@/types';
import { NoteForm } from './NoteForm';
import { NoteDetails } from './NoteDetails';

export const NotesView = () => {
  const { SnackbarComponent, showSnackbar } = useAppSnackbar();
  const { notes, error, loading, getNotes, requestDelete, ConfirmDialog } = useNote({
    showSnackbar,
  });
  const [openForm, setOpenForm] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedNote, setSelectedNote] = useState<NoteResponseDTO | undefined>(undefined);

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setSelectedNote(undefined);
    setOpenForm(false);
  };

  const handleOpenDetails = () => {
    setOpenDetails(true);
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
    setSelectedNote(undefined);
  };

  const handleSuccess = () => {
    handleCloseForm();
    getNotes();
    setSelectedNote(undefined);
  };

  const onEditNote = (note: NoteResponseDTO) => {
    setSelectedNote(note);
    handleOpenForm();
  };

  const onViewDetailsNote = (note: NoteResponseDTO) => {
    setSelectedNote(note);
    handleOpenDetails();
  };

  useEffect(() => {
    if (error) {
      showSnackbar(error, 'error');
    }
  }, [error]);

  return (
    <>
      <Box paddingTop={1} paddingBottom={2}>
        <Box display="flex" justifyContent="space-between" alignContent="center" paddingX={4}>
          <MainTitle title="Mis Notas" />

          <IconButton size="large" title="Agregar nota" onClick={handleOpenForm}>
            <AddOutlined titleAccess="Agregar nota" sx={{ color: ['var(--accent)'] }} />
          </IconButton>
        </Box>

        <NoteList
          loading={loading}
          notes={notes}
          onEdit={onEditNote}
          onViewDetails={onViewDetailsNote}
          onDelete={requestDelete}
        />
      </Box>

      <NoteForm
        open={openForm}
        note={selectedNote}
        handleCloseForm={handleCloseForm}
        showSnackbar={showSnackbar}
        handleSuccess={handleSuccess}
      />

      <NoteDetails open={openDetails} note={selectedNote} onClosedDetail={handleCloseDetails} />

      {ConfirmDialog}
      {SnackbarComponent}
    </>
  );
};
