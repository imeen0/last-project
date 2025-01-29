import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState(localStorage.getItem('token') || '');

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/signin', { email, password });
      setUserToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      setIsLoggedIn(true);
      toast.success('Logged in successfully!');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Login failed');
    }
  };

  const register = async (username, email, password) => {
    try {
      await axios.post('http://localhost:3000/auth/signup', { username, email, password });
      toast.success('Account created successfully!');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
