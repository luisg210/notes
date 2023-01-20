import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "../hooks/useAuthStore";
import Navbar from "../components/navbar";
import { Home } from "../components/home";
import Login from "../components/Login";
import Other from "../components/other";
import { useEffect } from "react";
import { Container } from "@mui/material";
import { CircularProgress } from "@mui/material";

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
    console.log(status);
  }, []);

  if (status === "checking") {
    return (
      <>
        <Container>
          <CircularProgress />
        </Container>
      </>
    );
  }

  return (
    <Routes>
      {status === "not-authenticated" ? (
        <Route path="/" element={<Navbar />}>
          <Route index element={<Login />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Route>
      ) : (
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<Other />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Route>
      )}
    </Routes>
  );
};
