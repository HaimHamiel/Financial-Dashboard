import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import equityReducer from "../features/equity/equitySlice";
import disposableIncomeReducer from "../features/disposableIncome/disposableIncomeSlice";
import variableExpensesReducer from "../features/variableExpenses/variableExpensesSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    equity: equityReducer,
    disposableIncome: disposableIncomeReducer,
    variableExpenses: variableExpensesReducer,
  },
});
