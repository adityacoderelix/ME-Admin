import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.example.com/v1";

export const hostService = {
  getAllHosts: async (
    page = 1,
    status = "all",
    sortBy = "",
    searchTerm = ""
  ) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/hosts`, {
        params: { page, status, sortBy, searchTerm },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch hosts");
    }
  },

  getHostStats: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/hosts/stats`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch host statistics"
      );
    }
  },

  getHostGrowth: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/hosts/growth`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch host growth data"
      );
    }
  },

  getTopPerformingHosts: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/hosts/top-performing`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch top performing hosts"
      );
    }
  },

  getHostActivity: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/hosts/activity`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch host activity data"
      );
    }
  },

  getHostDistribution: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/hosts/distribution`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "Failed to fetch host distribution data"
      );
    }
  },

  generateReport: async (metric, startDate, endDate) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/hosts/report`, {
        params: { metric, startDate, endDate },
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to generate report"
      );
    }
  },

  exportHosts: async (format = "csv") => {
    try {
      const response = await axios.get(`${API_BASE_URL}/hosts/export`, {
        params: { format },
        responseType: "json", // Changed from 'blob' to 'json'
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to export hosts"
      );
    }
  },
};
