import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const PublicRoute = () => {
  const isAuthenticated = useSelector((state) => state.auth.authenticated);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  return !isAuthenticated ? <Outlet /> : <Navigate to={from} />;
};
