import axiosInstance from "../../config/axios";

const API_URL = "/api/variableExpenses/";

// Add addVariableExpenses data
const addVariableExpenses = async (variableExpensesData) => {
    let result = null;
    try {
        console.log(variableExpensesData, "variableExpensesData");
        const token = localStorage.getItem("token");

      if (!token || !variableExpensesData) {
        throw new Error("Failed to add variableExpenses data");
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axiosInstance.post(API_URL, variableExpensesData, config);
      console.log(response,"response");
      if (!response?.data) {
        throw new Error("Failed to add variableExpensesData");
      }
      result = response.data;
    } catch (error) {
      throw error;
    }
    return result;
  };

const variableExpensesService = {
    addVariableExpenses,
};

export default variableExpensesService;
