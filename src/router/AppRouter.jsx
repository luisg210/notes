import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "../hooks/useAuthStore";
import Navbar from "../components/navbar";
import { Home } from "../components/home";
import Login from "../components/Login";
import Other from '../components/other';
import { useEffect } from "react";

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => { 
    checkAuthToken();
    console.log("in use effect");
    console.log(status);
  }, []);

  // if (status === 'checking') {
  //   return (
  //     <>
  //       <div
  //         className="spinner-border"
  //         style={{ width: "3rem", height: "3rem" }}
  //         role="status"
  //       >
  //         <span className="visually-hidden">Loading...</span>
  //       </div>
  //       <div
  //         className="spinner-grow"
  //         style={{ width: "3rem", height: "3rem" }}
  //         role="status"
  //       >
  //         <span className="visually-hidden">Loading...</span>
  //       </div>
  //     </>
  //   )
  // }

  return (
    <Routes>
      { status === "not-authenticated" ? (
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
