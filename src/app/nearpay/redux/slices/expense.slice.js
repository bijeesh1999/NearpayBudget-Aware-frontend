import {
  createExpenses,
  deleteExpenses,
  findAllExpenses,
  updateExpenses,
} from "../../services/expense.service";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createNewExpense = createAsyncThunk(
  "expense/create",
  async (body) => {
    const res = await createExpenses(body);
    return res;
  }
);

export const listExpense = createAsyncThunk("expense/list", async (body) => {
  const res = await findAllExpenses(body);
  return res.data;
});

export const putOneExpense = createAsyncThunk(
  "expense/update",
  async (body) => {

    const res = await updateExpenses(id, body);
    return res.data;
  }
);

export const deleteOneExpense = createAsyncThunk(
  "expense/delete",
  async (body) => {

    const res = await deleteExpenses(id, body);
    return res.data;
  }
);

const initialState = {
  Expenses: [],
  expense: {},
  status: null,
  isLoading: false,
  error: null,
};

const ExpenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewExpense.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(createNewExpense.fulfilled, (state, action) => {
        state.status = "created";
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(createNewExpense.rejected, (state) => {
        state.status = "fail";
        state.isLoading = false;
      })
      .addCase(listExpense.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(listExpense.fulfilled, (state, action) => {
        state.status = "success";
        state.Expenses = action.payload.data;
        state.isLoading = false;
      })
      .addCase(listExpense.rejected, (state) => {
        state.status = "fail";
        state.isLoading = false;
      })
      .addCase(putOneExpense.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(putOneExpense.fulfilled, (state, action) => {
        state.status = "success";
        state.expense = action.payload.data;
        state.isLoading = false;
      })
      .addCase(putOneExpense.rejected, (state) => {
        state.status = "fail";
        state.isLoading = false;
      })
      .addCase(deleteOneExpense.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(deleteOneExpense.fulfilled, (state, action) => {
        state.status = "success";
        state.expense = action.payload.data;
        state.isLoading = false;
      })
      .addCase(deleteOneExpense.rejected, (state) => {
        state.status = "fail";
        state.isLoading = false;
      });
  },
});

export const {resetStatus} = ExpenseSlice.actions;

export default ExpenseSlice.reducer;
