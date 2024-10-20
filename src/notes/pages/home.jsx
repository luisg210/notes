import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useNoteStore } from "../../hooks";
import { onIsUpdate, onOpenModal } from "../../store";
import { Form } from "../components/form";
import { showSuccessAlert, showErrorAlert, showQuestionalert } from "../../shared";

export const Home = () => {
  //importaciones del hooks de useNoteStore
  const {
    notes,
    getAll: findAll,
    deleteNote: deleteNo,
    errorMsg,
    successMsg,
    getById
  } = useNoteStore();
  const dispatch = useDispatch();

  useEffect(() => {
    //Al cargar el componente se cargan todas las notas
    getAll();

    //Sí el mensaje no está vacío se muestra en una alert
    if (successMsg.length > 0) {
      showSuccessAlert(successMsg);
    }

    if (errorMsg.length > 0) {
      showErrorAlert(errorMsg);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorMsg, successMsg]);

  const update = async (id) => {
    await getById({ id });
    dispatch(onIsUpdate(true));
    dispatch(onOpenModal());
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

  const getAll = async () => {
    await findAll();
  }

  const newNote = () => {
    dispatch(onOpenModal())
  };

  return (
    <>
      <Container className="">
        <h1 style={{ margin: "12px" }}>Notes</h1>

        <Button
          type="button"
          variant="contained"
          color="success"
          style={{ margin: "12px" }}
          onClick={newNote}
        >
          New note
        </Button>

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

          <Form />
      </Container>
    </>
  );
};