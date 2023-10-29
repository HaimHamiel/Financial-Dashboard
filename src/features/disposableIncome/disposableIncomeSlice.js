
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import disposableIncomeService from "./disposableIncomeService";

const initialState = {
  netSalaryMainPosition: 0,
  netSalarySecondaryPosition1: 0,
  netSalarySecondaryPosition2: 0,
  rent: 0,
  propertyTax: 0,
  water: 0,
  electricalPower: 0,
  houseCommittee: 0,
  communication: 0,
  groceryShopping: 0,
  tuition: 0,
  fuel: 0,
  carInsurance: 0,
  premiumSoftware: 0,
  newspaperSubscription: 0,
  premiumServiceSubscription: 0,
  healthInsurance: 0,
  gymMembership: 0,
  loansLeverage: 0,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const addDisposableIncome = createAsyncThunk(
  "disposableIncome/addDisposableIncome",
  async (formData, thunkAPI) => {
    try {
      const response = await disposableIncomeService.addDisposableIncome(formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to add disposable income data");
    }
  }
);

const disposableIncomeSlice = createSlice({
  name: "disposableIncome",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addDisposableIncome.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(addDisposableIncome.fulfilled, (state) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        isError: false,
        message: "Disposable income data added successfully",
      }))
      .addCase(addDisposableIncome.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        isSuccess: false,
        isError: true,
        message: action.payload,
      }));
  },
});

export const { reset } = disposableIncomeSlice.actions;
export default disposableIncomeSlice.reducer;