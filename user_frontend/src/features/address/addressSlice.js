import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import addressService from "./addressService";

export const getAllAddresses = createAsyncThunk(
  "user/address/getAll",
  async (customerId, thunkAPI) => {
    try {
      return await addressService.getAddresses(customerId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addAddress = createAsyncThunk(
  "user/address/create",
  async (addressData, thunkAPI) => {
    try {
      return await addressService.addAddress(addressData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateAddress = createAsyncThunk(
  "user/address/update",
  async (addressData, thunkAPI) => {
    try {
      return await addressService.addAddress(addressData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "user/address/delete",
  async (address_Id, thunkAPI) => {
    try {
      return await addressService.deleteAddress(address_Id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  userAddresses: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  createdAddress: "",
  message: "",
};

export const addressSlice = createSlice({
  name: "address",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllAddresses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllAddresses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.userAddresses = action.payload.data;
      })
      .addCase(getAllAddresses.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(addAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdAddress = action.payload;
        if (state.isSuccess) {
          toast.success("Thêm địa chỉ giao hàng thành công");
        }
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(updateAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(deleteAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(resetState, () => initialState);
  },
});

export default addressSlice.reducer;
