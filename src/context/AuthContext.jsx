import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import api from "@/api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants/constants";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  // console.log(user);
  const clearError = () => setError(null);

  const register = async (username, email, password, password2) => {
    try {
      if (password !== password2) {
        setError("Passwords do not match.");
        return;
      }

      await api.post("api/register/", { username, email, password });
      navigate("/check-mail/activate");
    } catch (err) {
      console.error(err.response.data);
      if (err.response?.data?.email) {
        setError(err.response.data.email);
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
      navigate(user.is_admin ? "admin" :from);
      // setUser(response.data);
    } catch (error) {
      console.error(error.message);

      if (error) {
        console.error("Login failed:", error.message);
        setError(error.message || "Login failed. Please try again.");
      }
    }
  };

  const SendPasswordResetLink = async (email) => {
    try {
      await api.post("api/reset-password/", { email });
      navigate("/check-mail/reset");
      console.log("Password reset link sent successfully!");
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const resetPassword = async (uidb64, token, password, confirmPassword) => {
    try {
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      await api.post(`api/password-reset-confirm/${uidb64}/${token}/`, {
        password,
      });
      navigate("/password-changed");
    } catch (error) {
      const errorMessage = error.originalError.response?.data;
      console.error(errorMessage);
      if (errorMessage?.password) {
        setError(errorMessage?.password[0]);
        return;
      }
      if (errorMessage?.detail) {
        setError(errorMessage?.detail);
        return;
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
      if (user) setUser(user);
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

  const userProfile = async () => {
    try {
      const res = await api.get("api/profile");
      return res.data;
    } catch (error) {
      console.error(error);
      // toast.error("Failed to load user profile.");
    }
  };

  const addAddress = async (data) => {
    try {
      await api.post("api/address/", data);
      return data;
    } catch (error) {
      console.error(error);
      // toast.error("Failed to add address. Please try again.");
    }
  };

  const getAllUsers = async (searchTerm = "", statusFilter = "") => {
    console.log(searchTerm);

    try {
      const res = await api.get("api/admin/users", {
        params: {
          search: searchTerm,
          status: statusFilter === "all" ? "" : statusFilter,
        },
      });
      return res.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const getUserAddress = async (addressId = null) => {
    try {
      const res = await api.get(
        addressId ? `api/address/${addressId}/` : "api/address/"
      );
      return res.data;
    } catch (error) {
      console.error(error);
      // return [];
    }
  };

  const updateAddress = async (addressId, data) => {
    try {
      await api.patch(`api/address/${addressId}/`, data);
      toast.success("Address updated successfully!");
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const deleteAddress = async (id) => {
    try {
      await api.delete(`api/address/${id}/`);
      toast.success("Address Deleted successfully!");
    } catch (error) {
      console.error(error);
      return false;
    }
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
        loading,
        getAllUsers,
        getUserAddress,
        deleteAddress,
        userProfile,
        addAddress,
        updateAddress,
        SendPasswordResetLink,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
