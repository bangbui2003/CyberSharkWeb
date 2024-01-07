import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const getUserFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  user: getUserFromLocalStorage,
  orders: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const login = createAsyncThunk(
  "auth/admin-login",
  async (user, thunkApi) => {
    try {
      return await authService.login(user);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getOrders = createAsyncThunk(
  "order/get-orders",
  async (thunkApi) => {
    try {
      return await authService.getOrders();
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.user = action.payload;
        state.message = "success";
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
      })
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.orders = action.payload;
        state.message = "success";
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
      });
  },
});

export default authSlice.reducer;
