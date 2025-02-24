import { useEffect, useState } from "react";
import { useAuthStore, useForm } from "../../hooks";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Button, CircularProgress, Container } from "@mui/material";

const loginField = {
  loginUser: "",
  loginPassword: "",
};

const newField = {
  newName: "",
  newUser: "",
  newPassword: "",
  newRepeatPassword: "",
};

export const Login = () => {
  const [isLogin, setIslogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const { startLogin, errorMsg, startRegister } = useAuthStore();

  const {
    loginUser,
    loginPassword,
    onInputChange: onLoginInputChange,
  } = useForm(loginField);

  const {
    newUser,
    newPassword,
    newRepeatPassword,
    newName,
    onInputChange: onNewInputChange,
  } = useForm(newField);

  const login = (e) => {
    e.preventDefault();
    setIslogin(true);

    startLogin({ user: loginUser, password: loginPassword });
    setIslogin(false);
  };

  const register = (e) => {
    e.preventDefault();
    setIslogin(true);

    if (newPassword !== newRepeatPassword) {
      alert("Las contraseñas no coinciden");

      return;
    }

    startRegister({ user: newUser, password: newPassword, name: newName });
    setIslogin(false);
  };

  useEffect(() => {}, [errorMsg, isLogin, login]);

  return (
    <>
      {loading ? (
        <Container style={{ paddingTop: "2rem" }}>
          <CircularProgress />
        </Container>
      ) : (
        <>
          <Grid
            component="form"
            onSubmit={login}
            style={{ display: isLogin ? "" : "none" }}
            container
            md={{
              padding: "1.5rem 1rem",
              boxShadow: "1px 1px 10px 1px rgba(0, 0, 0, .5)",
            }}
            direction="column"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xs={12}>
              <h4>Login</h4>
            </Grid>

            <Grid item xs={12} marginBottom={2} marginTop={2} width={350}>
              <TextField
                label="Username"
                name="loginUser"
                required
                value={loginUser}
                onChange={onLoginInputChange}
                variant="outlined"
                color="warning"
                fullWidth={true}
              />
            </Grid>

            <Grid marginBottom={2} marginTop={2} item xs={12} width={350}>
              <TextField
                label="Password"
                type="password"
                name="loginPassword"
                required
                value={loginPassword}
                onChange={onLoginInputChange}
                variant="outlined"
                color="warning"
                fullWidth
              />
            </Grid>

            <Grid marginBottom={1} marginTop={1} item xs={12}>
              <h5>{errorMsg}</h5>
            </Grid>

            <Grid marginBottom={1} marginTop={1} item xs={12}>
              <Button
                color="success"
                type="submit"
                size="large"
                variant="contained"
              >
                Login
              </Button>
            </Grid>

            <Grid marginBottom={1} marginTop={1} item xs={12}>
              <Button
                type="button"
                onClick={() => setIslogin(false)}
                variant="outlined"
                size="small"
              >
                I don't have an account
              </Button>
            </Grid>
          </Grid>

          <Grid
            direction="column"
            component="form"
            onSubmit={register}
            style={{ display: !isLogin ? "" : "none" }}
            justifyContent="space-between"
            alignItems="center"
            container
          >
            <Grid item marginBottom={2} marginTop={2} xs={12}>
              <h4>Register</h4>
            </Grid>

            <Grid item marginBottom={2} marginTop={2} xs={12} width={350}>
              <TextField
                label="Name"
                name="newName"
                required
                xs={12}
                marginBottom={2}
                marginTop={2}
                width={250}
                value={newName}
                onChange={onNewInputChange}
                variant="outlined"
                color="warning"
                fullWidth
              />
            </Grid>

            <Grid item marginBottom={2} marginTop={2} xs={12} width={350}>
              <TextField
                label="Username"
                xs={12}
                marginBottom={2}
                marginTop={2}
                width={250}
                name="newUser"
                required
                value={newUser}
                onChange={onNewInputChange}
                variant="outlined"
                color="warning"
                fullWidth
              />
            </Grid>

            <Grid item marginBottom={2} marginTop={2} xs={12} width={350}>
              <TextField
                label="Password"
                xs={12}
                marginBottom={2}
                marginTop={2}
                width={250}
                type="password"
                name="newPassword"
                required
                value={newPassword}
                onChange={onNewInputChange}
                variant="outlined"
                color="warning"
                fullWidth
              />
            </Grid>

            <Grid item marginBottom={2} marginTop={2} xs={12} width={350}>
              <TextField
                label="Repeat Password"
                xs={12}
                marginBottom={2}
                marginTop={2}
                width={250}
                type="password"
                name="newRepeatPassword"
                required
                value={newRepeatPassword}
                onChange={onNewInputChange}
                variant="outlined"
                fullWidth
                color="warning"
              />
            </Grid>

            <Grid item xs={12} width={350}>
              <h5>{errorMsg}</h5>
            </Grid>

            <Grid item marginBottom={1} marginTop={1} xs={12}>
              <Button
                type="submit"
                size="large"
                color="success"
                variant="contained"
              >
                Register
              </Button>
            </Grid>

            <Grid item marginBottom={1} marginTop={1} xs={12}>
              <Button
                color="primary"
                type="button"
                size="small"
                variant="outlined"
                onClick={() => setIslogin(true)}
              >
                I have an account
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};
