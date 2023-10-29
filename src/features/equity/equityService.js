import axiosInstance from "../../config/axios";

const API_URL = "/api/equityValuation/";

// Add equity data
const addEquity = async (equityData, token) => {
    let result = null;
    try {
        console.log(equityData);

      if (!token || !equityData) {
        throw new Error("Failed to add equity data");
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      
      const response = await axiosInstance.post(API_URL, equityData, config);
      if (!response?.data) {
        throw new Error("Failed to add equity data");
      }
      result = response.data;
    } catch (error) {
      throw error;
    }
    return result;
  };

const equityService = {
    addEquity,
};

export default equityService;
