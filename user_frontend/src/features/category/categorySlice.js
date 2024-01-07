import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import categoryService from "./categoryService";

export const getCategories = createAsyncThunk(
  "category/get-categories",
  async (thunkApi) => {
    try {
      return await categoryService.getCategories();
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getCategory = createAsyncThunk(
  "category/get-category",
  async (id, thunkApi) => {
    try {
      return await categoryService.getCategory(id);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const createCategory = createAsyncThunk(
  "category/create-category",
  async (categoryData, thunkApi) => {
    try {
      return await categoryService.createCategory(categoryData);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "category/update-category",
  async (category, thunkAPI) => {
    try {
      return await categoryService.updateCategory(category);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/delete-category",
  async (id, thunkAPI) => {
    try {
      return await categoryService.deleteCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  categories: [],
  createdCategory: "",
  updatedCategory: "",
  updatingCategory: "",
  deletedCategory: "",
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const categorySlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.categories = action.payload;
        state.message = "success";
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
      })
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.createdCategory = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(getCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.updatingCategory = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.updatedCategory = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.deletedCategory = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(resetState, () => initialState);
  },
});

export default categorySlice.reducer;
