import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNoteStore } from "../hooks/useNoteStore";
import { showSuccessAlert, showErrorAlert, showQuestionalert } from "../components/shared";

export const Home = () => {
  //importaciones del hooks de useNoteStore
  const {
    notes,
    getAll: findAll,
    deleteNote: deleteNo,
    errorMsg,
    successMsg,
    save,
    getById,
    note: noteById,
    update: updateNote,
  } = useNoteStore();
  //Valor inicial a note
  const [note, setNote] = useState({
    title: "",
    txt: "",
  });
  //Para hacer validaciones si se está actualizando
  const [isUpdate, setIsUpdate] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    //Al cargar el componente se cargan todas las notas
    getAll();

    //Sí el mensaje no está vacío se muestra en una alert
    if (successMsg.length > 0) {
      handleClose();
      showSuccessAlert(successMsg);
    }

    if (errorMsg.length > 0) {
      handleClose();
      showErrorAlert(errorMsg);
    }

    //Para setear los datos a los inputs
    if (isUpdate && note.title !== '') {
      //setNoteToModal();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorMsg, successMsg]);

  const update = async (id) => {
    await getById({ id });
    setIsUpdate(true);
    setNoteToModal();
  };

  const setNoteToModal = () => {
    if (noteById.title !== undefined) {
      note.title = noteById.title;
      note.txt = noteById.txt;
      handleOpen();
    }

  };

  const cleanModal = () => {
    setNote({
      title: "",
      txt: "",
    });

    setIsUpdate(false);
    handleClose();
  };

  const deleteNote = (id) => {
    showQuestionalert("Are you sure you want to delete this note?").then(
      (res) => {
        if (res.isConfirmed) {
          deleteNo(id);
        } else {
          Swal.fire({
            title: "Canceled",
            icon: "success",
            text: "canceled",
            background: "#353535",
            color: "#fff",
          });
        }
      }
    );

    getAll();
  };

  const handler = (value, input) => {
    setNote({
      ...note,
      [input]: value,
    });
  };

  const saveNote = (e) => {
    e.preventDefault();

    if (isUpdate) {
      updateNote({ note: note, id: noteById._id });
    } else {
      save({ note: note });
    }

    setIsUpdate(false);
    getAll();
  };

  const getAll = async () => {
    await findAll();
    setIsUpdate(false);
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Container className="">
        <h1 style={{ margin: "12px" }}>Notes</h1>

        <Button
          type="button"
          variant="contained"
          color="success"
          style={{ margin: "12px" }}
          onClick={handleOpen}
        >
          New note
        </Button>

        {/* {isUpdate ? (
          <CircularProgress />
        ) : ( */}
          <Grid
            container
            direction="row"
            alignItems="self-start"
          >
            {notes.map((n, i) => {
              return (
                <Grid key={i} width="100%" item sx={12} md={4} padding={1}>
                  <Card className="card" variant="elevation">
                    <CardContent  className="card-content">
                      <Typography
                        variant="h5"
                        color="text.secondary"
                        gutterBottom
                      >
                        {n.title}
                      </Typography>

                      <Typography sx={{ fontSize: 14 }} variant="h6">
                        {n.txt}
                      </Typography>
                    </CardContent>

                    <CardActions>
                      <Grid item>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => update(n._id)}
                        >
                          Update
                        </Button>
                      </Grid>

                      <Grid item>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => deleteNote(n._id)}
                          color="error"
                        >
                          Delete
                        </Button>
                      </Grid>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        {/* )} */}

        <Modal
          component="form"
          open={open}
          onClose={handleClose}
          onSubmit={(e) => saveNote(e)}
        >
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
                  onChange={(e) => handler(e.target.value, "title")}
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
                  onChange={(e) => handler(e.target.value, "txt")}
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
      </Container>
    </>
  );
};
