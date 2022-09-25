import React from "react";
import { BrowserRouter, Routes, Route, useNavigate, Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "./core/hooks";
import { Login } from "./pages/auth/login";
import { Home } from "./pages/home";
import history from "./utils/helpers/history";

export const Router: React.FC = () => {
  const NavigateSetter = () => {
    history.navigate = useNavigate();
    return null;
  };
  const { isAuth } = useAppSelector((state) => state.Auth);

  return (
    <BrowserRouter>
      <NavigateSetter />
      <Routes>
        <Route element={isAuth ? <Outlet /> : <Navigate to="login" />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={isAuth ? <Navigate to="/" /> : <Outlet />}>
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="*" element={<>Not found</>} />
      </Routes>
    </BrowserRouter>
  );
};
