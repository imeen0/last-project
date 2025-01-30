import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Ensure this path is correct

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, user } = useAuth(); // Get authentication state from context

  if (user === null) {
    return <Navigate to="/signin" replace />; // Redirect to signin if not logged in
  }

  if (user === undefined) {
    return <div>Loading...</div>; // Show loading indicator while checking authentication
  }

  return children; // Return the children (Home page) if logged in
};

export default ProtectedRoute;
