import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const PrivateRoute = ({ role }) => {
  const isAuthenticated = useSelector((state) => state.auth.authenticated);
  const userRole = useSelector((state) => state.auth.user.role);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (role && userRole !== role) {
    return userRole === "Admin" ? (
      <Navigate to="/dashboard" replace />
    ) : (
      <Navigate to="/home" replace />
    );
  }

  return <Outlet />;
};
