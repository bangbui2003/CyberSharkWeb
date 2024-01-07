import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import blogService from "./blogService";

export const getBlogs = createAsyncThunk("blog/get-blogs", async (thunkApi) => {
  try {
    return await blogService.getBlogs();
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

const initialState = {
  blogs: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const resetState = createAction("Reset_all");

export const blogSlice = createSlice({
  name: "blogs",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogs.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.blogs = action.payload;
        state.message = "success";
      })
      .addCase(getBlogs.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default blogSlice.reducer;
