
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createCategory,
  deleteCategory,
  findAllCategory,
  findAllUsercategory,
  findCategory,
  updateCategory,
} from "../../services/category.service";

export const createNewCategory = createAsyncThunk(
  "category/create",
  async (body) => {
    const res = await createCategory(body);
    return res;
  }
);

export const listCategory = createAsyncThunk("category/list", async (body) => {
  const res = await findAllCategory(body);
  return res;
});

export const putOneCategory = createAsyncThunk(
  "category/update",
  async ({ id, body }) => {
    const res = await updateCategory({ id, body });
    return res.data;
  }
);

export const getOneCategory = createAsyncThunk(
  "category/fineOne",
  async ({ id }) => {
    const res = await findCategory({ id });
    return res.data;
  }
);

export const deleteOneCategory = createAsyncThunk(
  "category/delete",
  async (id) => {
    const res = await deleteCategory(id);
    return res.data;
  }
);

export const listUserCategory = createAsyncThunk(
  "userCategory/list",
  async (body) => {
    const res = await findAllUsercategory(body);
    return res.data;
  }
);

const initialState = {
  categories: [],
  userCategories: [],
  category: {},
  status: null,
  statusCode: null,
  isLoading: false,
  error: null,
};

const CategorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewCategory.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(createNewCategory.fulfilled, (state, action) => {
        state.status = "created";
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(createNewCategory.rejected, (state) => {
        state.status = "fail";
        state.isLoading = false;
      })
      .addCase(listCategory.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(listCategory.fulfilled, (state, action) => {
        state.status = "success";
        state.categories = action.payload.data?.data;
        state.statusCode = action.payload?.status;
        state.isLoading = false;
      })
      .addCase(listCategory.rejected, (state, action) => {
        state.status = "fail";
        state.statusCode = action.payload?.status;
        state.error = action.payload?.message;
        state.isLoading = false;
      })
      .addCase(putOneCategory.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(putOneCategory.fulfilled, (state, action) => {
        state.status = "updated";
        state.category = action.payload.data;
        state.isLoading = false;
      })
      .addCase(putOneCategory.rejected, (state) => {
        state.status = "fail";
        state.isLoading = false;
      })
      .addCase(deleteOneCategory.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(deleteOneCategory.fulfilled, (state, action) => {
        state.status = "deleted";
        state.category = action.payload.data;
        state.isLoading = false;
      })
      .addCase(deleteOneCategory.rejected, (state) => {
        state.status = "fail";
        state.isLoading = false;
      })
      .addCase(getOneCategory.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(getOneCategory.fulfilled, (state, action) => {
        state.status = "finded";
        state.category = action.payload.data;
        state.isLoading = false;
      })
      .addCase(getOneCategory.rejected, (state) => {
        state.status = "fail";
        state.isLoading = false;
      })
      .addCase(listUserCategory.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(listUserCategory.fulfilled, (state, action) => {
        state.status = "success";
        state.userCategories = action.payload.data;
        state.isLoading = false;
      })
      .addCase(listUserCategory.rejected, (state) => {
        state.status = "fail";
        state.isLoading = false;
      });
  },
});

export const {} = CategorySlice.actions;

export default CategorySlice.reducer;
