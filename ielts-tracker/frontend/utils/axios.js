import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window !== "undefined" && error?.response?.status === 401) {
      const currentPath = window.location.pathname;
      if (currentPath !== "/" && currentPath !== "/register") {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("user");
      }
    }
    return Promise.reject(error);
  }
);

export default api;
