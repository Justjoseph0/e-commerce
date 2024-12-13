import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants/constants";

export const apiUrl = "http://127.0.0.1:8000/";


const api = axios.create({
  baseURL: apiUrl,
});



const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    if (!refreshToken) {
      console.warn("No refresh token found");
      throw new Error("No refresh token available");
    }

    const response = await axios.post(`${apiUrl}api/token/refresh/`, {
      refresh: refreshToken,
    });

    console.log('refreshing');
    

    const { access } = response.data;

    if (!access) {
      throw new Error("Failed to refresh access token");
    }

    console.log('setting new access');
    // Update the access token in localStorage
    localStorage.setItem(ACCESS_TOKEN, access);
    return access;
  } catch (error) {
    console.error("Error refreshing access token:", error);

    // Remove invalid tokens and redirect to login
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    window.location.href = "/login";
    throw error;
  }
};




api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


api.interceptors.response.use(
  (response) => response, // Pass through successful responses
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest); // Retry the original request
      } catch (refreshError) {
        console.error("Failed to refresh token during request retry:", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error); // For other errors
  }
);



export default api


