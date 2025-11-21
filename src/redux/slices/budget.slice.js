import {
  createBudget,
  deleteBudget,
  findAllBudget,
  updateBudget,
} from "@/src/app/services/budget.service";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createNewBudget = createAsyncThunk(
  "budget/create",
  async (body) => {
    const res = await createBudget(body);
    return res;
  }
);

export const listBudget = createAsyncThunk("budget/list", async (body) => {
  console.log(body);

  const res = await findAllBudget(body);
  return res.data;
});

export const putOneBudget = createAsyncThunk(
  "budget/update",
  async ({ id, limitCents }) => {
    console.log({ id, limitCents });

    const res = await updateBudget({ id, limitCents });
    return res.data;
  }
);

export const deleteOneBudget = createAsyncThunk("budget/delete", async (id) => {
  const res = await deleteBudget(id);
  return res.data;
});

const initialState = {
  budgets: [],
  budget: {},
  status: null,
  isLoading: false,
  error: null,
};

const BudgetSlice = createSlice({
  name: "budgets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewBudget.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(createNewBudget.fulfilled, (state, action) => {
        state.status = "created";
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(createNewBudget.rejected, (state) => {
        state.status = "fail";
        state.isLoading = false;
      })
      .addCase(listBudget.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(listBudget.fulfilled, (state, action) => {
        state.status = "success";
        state.budgets = action.payload.data;
        state.isLoading = false;
      })
      .addCase(listBudget.rejected, (state) => {
        state.status = "fail";
        state.isLoading = false;
      })
      .addCase(putOneBudget.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(putOneBudget.fulfilled, (state, action) => {
        state.status = "updated";
        state.budget = action.payload.data;
        state.isLoading = false;
      })
      .addCase(putOneBudget.rejected, (state) => {
        state.status = "fail";
        state.isLoading = false;
      })
      .addCase(deleteOneBudget.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(deleteOneBudget.fulfilled, (state, action) => {
        state.status = "deleted";
        state.budget = action.payload;
        state.isLoading = false;
      })
      .addCase(deleteOneBudget.rejected, (state) => {
        state.status = "fail";
        state.isLoading = false;
      });
  },
});

export const {} = BudgetSlice.actions;

export default BudgetSlice.reducer;
