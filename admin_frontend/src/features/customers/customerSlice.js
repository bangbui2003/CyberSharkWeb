import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customerService from "./customerService";

const initialState = {
  customers: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getCustomers = createAsyncThunk(
  "customer/get-customers",
  async (thunkApi) => {
    try {
      return await customerService.getCustomers();
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const customerSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCustomers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCustomers.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.customers = action.payload;
        state.message = "success";
      })
      .addCase(getCustomers.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
      });
  },
});

export default customerSlice.reducer;
