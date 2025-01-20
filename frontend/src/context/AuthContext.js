import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

// Create Auth Context
const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  // State to store the token and login status
  const [userToken, setUserToken] = useState(localStorage.getItem('token') || '');
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token')); // Check if token exists

  // Login Function
  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/signin', { email, password });
      setUserToken(response.data.token); // Set token in state
      localStorage.setItem('token', response.data.token); // Save token in localStorage
      setIsLoggedIn(true); // Update login status
      toast.success('Logged in successfully!');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Login failed');
    }
  };

  // Register Function
  const register = async (username, email, password) => {
    try {
      await axios.post('http://localhost:3000/auth/signup', { username, email, password });
      toast.success('Account created successfully!');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Signup failed');
    }
  };

  // Logout Function
  const logout = () => {
    setUserToken(''); // Clear token in state
    localStorage.removeItem('token'); // Remove token from localStorage
    setIsLoggedIn(false); // Update login status
    toast.success('Logged out successfully!');
  };

  // Provide context to children
  return (
    <AuthContext.Provider value={{ isLoggedIn, userToken, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to use Auth Context
export const useAuth = () => useContext(AuthContext);
