import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import productService from "./productService";

export const getAllProducts = createAsyncThunk(
  "product/get-products",
  async (thunkApi) => {
    try {
      return await productService.getAllProducts();
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getSingleProduct = createAsyncThunk(
  "product/get-product",
  async (id, thunkApi) => {
    try {
      return await productService.getSingleProduct(id);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/update-product",
  async (product, thunkAPI) => {
    try {
      return await productService.updateProduct(product);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/delete-product",
  async (id, thunkApi) => {
    try {
      return await productService.deleteProduct(id);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  products: [],
  product: "",
  updatedProduct: "",
  deletedProduct: "",
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const productSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.products = action.payload;
        state.message = "success";
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
      })
      .addCase(getSingleProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.product = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedProduct = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedProduct = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(resetState, () => initialState);
  },
});

export default productSlice.reducer;
