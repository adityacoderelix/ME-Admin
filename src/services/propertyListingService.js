import axios from "axios";
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://server-me.vercel.app/api/v1";

export const propertyService = {
  getAllProperties: async (
    page = 1,
    status = "all",
    sortBy = "",
    searchTerm = ""
  ) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/prop-listing`, {
        params: { page, status, sortBy, searchTerm },
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch properties"
      );
    }
  },

  bulkAction: async (propertyIds, action) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/prop-listing/bulk-action`,
        {
          propertyIds,
          action,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to perform bulk action"
      );
    }
  },

  getPropertyDetails: async (propertyId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/prop-listing/${propertyId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch property details"
      );
    }
  },

  updateProperty: async (propertyId, propertyData) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/prop-listing/${propertyId}`,
        propertyData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update property"
      );
    }
  },

  deleteProperty: async (propertyId) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/prop-listing/${propertyId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to delete property"
      );
    }
  },

  createProperty: async (propertyData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/prop-listing`,
        propertyData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to create property"
      );
    }
  },

  exportProperties: async (format = "csv") => {
    try {
      const response = await axios.get(`${API_BASE_URL}/prop-listing/export`, {
        params: { format },
        responseType: "blob", // Important for file downloads
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to export properties"
      );
    }
  },
};
