import axios from "axios";
import brandsData from "@/data/Brands.json";

export const brandService = {
  // For development: Simulate API calls with JSON data
  getAllBrands: () => {
    return new Promise((resolve) => {
      // Simulate network delay
      setTimeout(() => resolve(brandsData), 500);
    });
  },

  getTopBrands: () => {
    return new Promise((resolve) => {
      const topBrands = brandsData.filter((brand) => brand.top === "yes");
      setTimeout(() => resolve(topBrands), 500);
    });
  },

  // For production: Uncomment this when you have a real API
  /*
  getAllBrands: async () => {
    const response = await axios.get('/api/brands');
    return response.data;
  },
  
  getTopBrands: async () => {
    const response = await axios.get('/api/brands?top=yes');
    return response.data;
  },
  */
};
