"use client";
import { configureStore } from "@reduxjs/toolkit";

import BugetSlice from "../slices/budget.slice";
import CategorySlice from "../slices/category.slice";
import ExpenseSlice from "../slices/expense.slice";
import UserSlice from "../slices/user.slice";

export const store = configureStore({
  reducer: {
    budget: BugetSlice,
    category: CategorySlice,
    expenses: ExpenseSlice,
    user: UserSlice,
  },
});
