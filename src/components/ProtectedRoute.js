import React, { useEffect } from "react";
import { Route, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children, isAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return children
};

export default ProtectedRoute;
