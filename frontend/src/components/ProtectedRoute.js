// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';  // Assuming useAuth hook is properly set up

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    // Redirect to Sign In page if not logged in
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
