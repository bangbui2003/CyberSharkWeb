import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import authService from "./orderService";
import { toast } from "react-toastify";

export const updateOrder = createAsyncThunk(
  "user/order/update",
  async (updateData, thunkAPI) => {
    try {
      return await authService.updateOrder(updateData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getOrders = createAsyncThunk(
  "user/orders/getAll",
  async (thunkAPI) => {
    try {
      return await authService.getOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getSingleOrder = createAsyncThunk(
  "user/order/get",
  async (id, thunkAPI) => {
    try {
      return await authService.getSingleOrder(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  orders: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  updatedOrder: "",
};

export const orderSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedOrder = action.payload;
        if (state.isSuccess) {
          toast.success("Cập nhật trạng thái Order thành công");
        }
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(getSingleOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.userOrder = action.payload;
      })
      .addCase(getSingleOrder.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(resetState, () => initialState);
  },
});

export default orderSlice.reducer;
