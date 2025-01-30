import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(undefined);
  const [userToken, setUserToken] = useState(localStorage.getItem("token") || "");

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:5000/auth/login", { email, password });
      setUserToken(response.data.token);
      // localStorage.setItem("token", response.data.token);
      setIsLoggedIn(true);
      toast.success("Logged in successfully!");
    } catch (error) {
      toast.error(error.response?.data?.error || "Login failed");
    }
  };

  const register = async (username, email, password) => {
    try {
      await axios.post("http://localhost:5000/auth/register", { username, email, password });
      toast.success("Account created successfully!");
    } catch (error) {
      toast.error(error.response?.data?.error || "Signup failed");
    }
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:5000/auth/me");
      setIsLoggedIn(true);
      setUser(response.data);
    } catch (error) {
      setUser(null);
      setIsLoggedIn(false);
      console.log("-------------------- error --------------------");
      console.log(error);
    }
  };

  console.log("-------------------- user --------------------");
  console.log(user);

  useEffect(() => {
    fetchUser();
  }, []);

  return <AuthContext.Provider value={{ fetchUser, isLoggedIn, login, register, user }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
