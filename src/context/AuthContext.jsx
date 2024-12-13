import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import api from "@/api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants/constants";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // console.log(user);
  const clearError = () => setError(null);

  const register = async (username, email, password, password2) => {
    try {
      if (password !== password2) {
        setError("Passwords do not match.");
        return;
      }

      await api.post("register/", { username, email, password });
      navigate("/check-mail");
    } catch (err) {
      console.error(err);
      if (err.response?.data?.detail) {
        setError(err.response.data.detail);
        return;
      }

      if (err.response?.data?.username) {
        setError(err.response.data.username);
        return;
      }
      if (err.response?.data?.email) {
        setError(err.response.data.email);
      }
      if (err.response?.data?.password) {
        setError(err.response.data.password[0]);
        return;
      }
    }
  };
  const login = async (email, password) => {
    try {
      const { data } = await api.post("api/login/", { email, password });

      localStorage.setItem(ACCESS_TOKEN, data.access);
      localStorage.setItem(REFRESH_TOKEN, data.refresh);
      const user = jwtDecode(data.access);

      setUser(user);
      navigate("/");
      // setUser(response.data);
    } catch (error) {
      console.error(error);
      
      if (error.response) {
        console.error("Login failed:", error.response.data);
        setError(
          error.response.data.detail || "Login failed. Please try again."
        );
      } else {
        console.error("Error:", error.message);
        alert("An error occurred. Please try again.");
      }
    }
  };
  const checkAuth = async () => {
    try {
      const token = localStorage.getItem(ACCESS_TOKEN);
      // console.log("Access Token:", token);
      if (!token) {
        console.warn("No access token found in localStorage");
        setUser(null);
        return;
      }
      const user = jwtDecode(token);
      if(user) setUser(user)
    } catch (error) {
      console.error("Error during authentication:", error);
      setUser(null);
      localStorage.removeItem(ACCESS_TOKEN);
    } finally {
      setLoading(false);
    }
  };
  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    setUser(null);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        register,
        login,
        logout,
        isAuthenticated: !!user,
        error,
        clearError,
        user,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
