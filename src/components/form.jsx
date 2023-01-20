import { Button, Grid, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNoteStore } from "../hooks/useNoteStore";
import { onCloseModal, onIsUpdate } from "../store/uiSlice";

export const Form = () => {
  const { isUpdate, isModalOpen } = useSelector((state) => state.ui);
  const { save, note: noteToUpdate, update } = useNoteStore();
  const dispatch = useDispatch();
  const [note, setNote] = useState({
    title: "",
    txt: "",
  });

  useEffect(() => {
    setNoteToModal();
  }, [noteToUpdate])
  

  const setNoteToModal = () => {
    if (noteToUpdate.title !== undefined) {
      note.title = noteToUpdate.title;
      note.txt = noteToUpdate.txt;
    }
  };

  const cleanModal = () => {
    setNote({
      title: "",
      txt: "",
    });

    dispatch(onIsUpdate(false));
    dispatch(onCloseModal());
  };

  const handle = (target) => {
    setNote({
      ...note,
      [target.name]: target.value,
    });
  };

  const saveNote = (e) => {
    e.preventDefault();

    if (isUpdate) {
      update({ note: note, id: noteToUpdate._id });
    } else {
      save({ note: note });
    }

    cleanModal();
  };

  return (
    <>
      <Modal component="form" open={isModalOpen} onSubmit={(e) => saveNote(e)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "white",
            border: "1px solid rgba(12, 12, .2, 1)",
            boxShadow: 24,
            p: 2,
          }}
        >
          <Grid
            direction="column"
            justifyContent="space-between"
            alignItems="center"
            container
          >
            <Grid item>
              <Typography variant="h6">
                {!isUpdate ? "New note" : "Update note"}
              </Typography>
            </Grid>

            <Grid item xs={12} width={350} marginBottom={2} marginTop={4}>
              <TextField
                type="text"
                name="title"
                label="Title"
                value={note.title}
                onChange={(e) => handle(e.target)}
                required
                fullWidth
              />
            </Grid>

            <Grid
              item
              xs={12}
              marginBottom={2}
              marginTop={2}
              width={350}
              height={120}
            >
              <TextField
                type="text"
                name="txt"
                label="Type here..."
                value={note.txt}
                onChange={(e) => handle(e.target)}
                required
                fullWidth
                multiline
              ></TextField>
            </Grid>

            <Grid item marginBottom={1} marginTop={1} xs={12}>
              <Button
                style={{ marginRight: 5 }}
                type="button"
                variant="outlined"
                color="error"
                onClick={() => cleanModal()}
              >
                Close
              </Button>
              <Button variant="contained" color="success" type="submit">
                {!isUpdate ? "Save" : "Update"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};
