import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import enquiryService from "./enquiryService";

const initialState = {
  enquiries: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getEnquiries = createAsyncThunk(
  "enquiry/get-enquiries",
  async (thunkApi) => {
    try {
      return await enquiryService.getEnquiries();
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

export const enquirySlice = createSlice({
  name: "enquiries",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEnquiries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEnquiries.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.enquiries = action.payload;
        state.message = "success";
      })
      .addCase(getEnquiries.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default enquirySlice.reducer;
