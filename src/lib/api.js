import axios from "axios";

// Create a reusable Axios instance
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add JWT token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// API helper functions
export const apiService = {
  get: async (endpoint, params = {}) => {
    try {
      const response = await api.get(endpoint, { params });
      return response.data;
    } catch (error) {
      throw apiService.handleError(error);
    }
  },

  post: async (endpoint, data) => {
    try {
      const response = await api.post(endpoint, data);
      return response.data;
    } catch (error) {
      throw apiService.handleError(error);
    }
  },

  handleError: (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error("API Error:", error.response.status, error.response.data);
      return {
        error: true,
        status: error.response.status,
        message: error.response.data.message || "An error occurred",
      };
    } else if (error.request) {
      // The request was made but no response was received
      console.error("API Error: No response received", error.request);
      return {
        error: true,
        message: "No response from server",
      };
    } else {
      // Something happened in setting up the request
      console.error("API Error:", error.message);
      return {
        error: true,
        message: error.message,
      };
    }
  },
};

// Specific API endpoints
export const brandApi = {
  getAllBrands: () => apiService.get("/brands"),
  getTopBrands: () => apiService.get("/brands", { top: "yes", limit: 12 }),
};
