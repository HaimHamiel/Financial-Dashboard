import axiosInstance from "../../config/axios";

const API_URL = "/api/disposableIncome/";

// Add disposableIncome data
const addDisposableIncome = async (disposableIncomeData) => {
    let result = null;
    try {
        console.log(disposableIncomeData, "disposableIncomeData");
        const token = localStorage.getItem("token");

      if (!token || !disposableIncomeData) {
        throw new Error("Failed to add disposableIncom data");
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axiosInstance.post(API_URL, disposableIncomeData, config);
      console.log(response,"response");
      if (!response?.data) {
        throw new Error("Failed to add disposableIncomeData");
      }
      result = response.data;
    } catch (error) {
      throw error;
    }
    return result;
  };

const disposableIncomeService = {
    addDisposableIncome,
};

export default disposableIncomeService;
