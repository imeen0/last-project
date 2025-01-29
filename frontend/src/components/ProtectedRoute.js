import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';  // Ensure this path is correct

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();  // Get authentication state from context

  if (!isLoggedIn) {
    return <Navigate to="/signin" replace />;  // Redirect to signin if not logged in
  }

  return children;  // Return the children (Home page) if logged in
};

export default ProtectedRoute;
