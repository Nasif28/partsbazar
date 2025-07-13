import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const authApi = {
  register: async (userData) => {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  },
  login: async (credentials) => {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
  },
  forgotPassword: async (email) => {
    const response = await axios.post(`${API_URL}/auth/forgot-password`, {
      email,
    });
    return response.data;
  },
  resetPassword: async (otp, password) => {
    const response = await axios.post(`${API_URL}/auth/reset-password`, {
      otp,
      password,
    });
    return response.data;
  },
  verifyToken: async (token) => {
    const response = await axios.get(`${API_URL}/auth/verify`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};
