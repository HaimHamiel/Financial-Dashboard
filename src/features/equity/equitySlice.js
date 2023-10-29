import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import equityService from "./equityService";

const initialState = {
  currentAccountBalanceA: 0,
  currentAccountBalanceB: 0,
  virtualWalletBalance: 0,
  investmentAccountBalance: 0,
  foreignCurrencyBalance: 0,
  virtualCurrencyBalance: 0,
  apartmentValue: 0,
  carValue: 0,
  depositsValue: 0,
  longTermSavingsValue: 0,
  educationFundValue: 0,
  compensationValue: 0,
  pensionValue: 0,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// add a equity data
export const addEquity = createAsyncThunk(
  "equity/addEquity",
  async (equityData, thunkAPI) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;
      if (!token || !user) {
        throw new Error("Failed to add user or token");
      }
      return await equityService.addEquity(equityData, token);
    } catch (error) {
      const message =
        error?.response?.data?.message || error?.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const equitySlice = createSlice({
  name: "equity",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addEquity.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(addEquity.fulfilled, (state) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        isError: false,
      }))
      .addCase(addEquity.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload,
      }));
  },
});

export const { reset } = equitySlice.actions;
export default equitySlice.reducer;
