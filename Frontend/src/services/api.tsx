import axios, { AxiosInstance, AxiosResponse } from "axios";

const API_URL = "http://localhost:8080";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

interface AuthResponse {
  token: string;
}

interface UserData {
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
}

const authService = {
  login: async (email: string, password: string): Promise<string> => {
    const response: AxiosResponse<AuthResponse> = await axiosInstance.post("/api/auth/login", {
      email,
      password,
    });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data.token;
  },
  logout: async (): Promise<void> => {
    try {
      await axiosInstance.post("/api/auth/logout");
    } finally {
      localStorage.removeItem("token");
    }
  },
  register: async (userData: UserData): Promise<AuthResponse> => {
    const response: AxiosResponse<AuthResponse> = await axiosInstance.post("/api/auth/register", userData);
    return response.data;
  },
};

export { authService, axiosInstance };
