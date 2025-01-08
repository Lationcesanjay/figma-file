import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const LoginSignUpContext = createContext();

export default function LoginContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchUser();
      setIsAuthorized(true);
    }else{
      setIsAuthorized(false);
    }

  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:8000/loginUser/user");
      setUser(response.data.user);
    } catch (e) {
      console.error("Error fetching user:", e);
      localStorage.removeItem("authToken");
    }
  };

  const UserSignUp = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/loginUser/signup",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setUser(response.data.user);
      setError(null);
      alert("User created successfully");
    } catch (e) {
      handleError(e, "Error creating user. Please try again.");
    }
  };

  const UserLogin = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/loginUser/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { token, user: userData } = response.data;

      localStorage.setItem("authToken", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(userData);
      setError(null);
      setIsAuthorized(true);
      alert("Login successful");
    } catch (e) {
      handleError(e, "Login failed. Please check your credentials.");
      setIsAuthorized(false);
    }
  };

  const UserLogout = () => {
    localStorage.removeItem("authToken");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
    setIsAuthorized(false);
    alert("Logged out successfully");
  };

  const handleError = (error, defaultMessage) => {
    const message =
      error.response?.data?.message || defaultMessage || "An error occurred.";
    setError(message);
    console.error(error);
  };

  return (
    <LoginSignUpContext.Provider
      value={{ UserSignUp, UserLogin, UserLogout, user, error ,isAuthorized}}
    >
      {children}
    </LoginSignUpContext.Provider>
  );
}

export const useLoginSignUp = () => {
  const context = useContext(LoginSignUpContext);
  if (!context) {
    throw new Error(
      "useLoginSignUp must be used within a LoginContextProvider"
    );
  }
  return context;
};
