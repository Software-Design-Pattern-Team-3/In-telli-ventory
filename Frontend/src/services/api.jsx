import axios from "axios";

const API_URL = "http://localhost:8080";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const authService = {
  login: async (email, password) => {
    const response = await axiosInstance.post("/api/auth/login", {
      email,
      password,
    });
    if (response.data) {
      localStorage.setItem("token", response.data);
    }
    return response.data;
  },
  logout: async () => {
    try {
      await axiosInstance.post("/api/auth/logout");
    } finally {
      localStorage.removeItem("token");
    }
  },
  register: async (firstname,lastname,email,password) => {
    const response = await axiosInstance.post("/api/auth/register", {
      firstname,
      lastname,
      email,
      password
    });
    return response.data;
  },
  
};

export { authService, axiosInstance };
