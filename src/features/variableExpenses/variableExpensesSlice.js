import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import variableExpensesService from "./variableExpensesService";

const initialState = {
  clothes: 0,
  onlineShopping: 0,
  travelAndVacations: 0,
  gifts: 0,
  onlineCourses: 0,
  books: 0,
  eatingOut: 0,
  hangouts: 0,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const addVariableExpenses = createAsyncThunk(
  "variableExpenses/addVariableExpenses",
  async (formData, thunkAPI) => {
    try {
      const response = await variableExpensesService.addVariableExpenses(
        formData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to add Variable Expenses data"
      );
    }
  }
);

const variableExpensesSlice = createSlice({
  name: "variableExpenses",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addVariableExpenses.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(addVariableExpenses.fulfilled, (state) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        isError: false,
        message: "Variable Expenses data added successfully",
      }))
      .addCase(addVariableExpenses.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        isSuccess: false,
        isError: true,
        message: action.payload,
      }));
  },
});

export const { reset } = variableExpensesSlice.actions;
export default variableExpensesSlice.reducer;
