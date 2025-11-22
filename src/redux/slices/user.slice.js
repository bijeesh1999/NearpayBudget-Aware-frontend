import {
  createUser,
  loginUser,
  logoutUser,
} from "@/src/app/services/user.service";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const signup = createAsyncThunk("user/signup", async (body) => {
  const res = await createUser(body);
  return res;
});

export const login = createAsyncThunk("user/login", async (body) => {

  const res = await loginUser(body);
  return res.data;
});

export const logout = createAsyncThunk("user/logout", async () => {
  const res = await logoutUser();
  return res.data;
});

const initialState = {
  user: {},
  status: null,
  isLoading: false,
  error: null,
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = "signUp";
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(signup.rejected, (state) => {
        state.status = "fail";
        state.isLoading = false;
      })
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "login";
        state.user = action.payload.data;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state) => {
        state.status = "fail";
        state.isLoading = false;
      })
      .addCase(logout.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.status = "logout";
        state.user = action.payload.data;
        state.isLoading = false;
      })
      .addCase(logout.rejected, (state) => {
        state.status = "fail";
        state.isLoading = false;
      });
  },
});

export const { resetStatus } = UserSlice.actions;

export default UserSlice.reducer;
