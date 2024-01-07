import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import authService from "./userService";
import { toast } from "react-toastify";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      return await authService.register(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loginGoogleUser = createAsyncThunk(
  "auth/loginGoogle",
  async (credential, thunkAPI) => {
    try {
      return await authService.loginAsGoogle(credential);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addToCart = createAsyncThunk(
  "user/cart/add",
  async (cartData, thunkAPI) => {
    try {
      return await authService.addToCart(cartData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getCart = createAsyncThunk(
  "user/cart/get",
  async (customerId, thunkAPI) => {
    try {
      return await authService.getCustomerCart(customerId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteCartProduct = createAsyncThunk(
  "user/cart/delete",
  async (removeData, thunkAPI) => {
    try {
      return await authService.removeProductFromCart(removeData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateCartProduct = createAsyncThunk(
  "user/cart/update",
  async (updateData, thunkAPI) => {
    try {
      return await authService.updateProductInCart(updateData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createPayment = createAsyncThunk(
  "user/payment/create",
  async (paymentData, thunkAPI) => {
    try {
      return await authService.createPayment(paymentData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createOrder = createAsyncThunk(
  "user/order/create",
  async (orderData, thunkAPI) => {
    try {
      return await authService.createOrder(orderData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

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

export const getCustomerOrders = createAsyncThunk(
  "user/orders/get",
  async (customerId, thunkAPI) => {
    try {
      return await authService.getCustomerOrders(customerId);
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

const getCustomerFromLocalStorage = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: getCustomerFromLocalStorage,
  isError: false,
  isSuccess: false,
  isLoading: false,
  createdUser: "",
  addedProduct: "",
  deletedProduct: "",
  updatedProduct: "",
  paymentUrl: "",
  userCart: "",
  userOrder: "",
  message: "",
  createdOrder: "",
  updatedOrder: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdUser = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload;
        toast.success("Đăng nhập thành công");
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
        toast.error(state.message);
      })
      .addCase(loginGoogleUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginGoogleUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(loginGoogleUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.addedProduct = action.payload;
        toast.success("Thêm sản phẩm thành công vào giỏ hàng");
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
        toast.error("Thêm sản phẩm vào giỏ hàng thất bại");
      })
      .addCase(getCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.userCart = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(deleteCartProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedProduct = action.payload;
        if (state.isSuccess) {
          toast.success("Xoá sản phẩm khỏi giỏ hàng thành công");
        }
      })
      .addCase(deleteCartProduct.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
        if (state.isSuccess === false) {
          toast.error(state.message);
        }
      })
      .addCase(updateCartProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedProduct = action.payload;
        if (state.isSuccess) {
          toast.success("Cập nhật số lượng thành công");
        }
      })
      .addCase(updateCartProduct.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
        if (state.isSuccess === false) {
          toast.error(state.message);
        }
      })
      .addCase(createPayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.paymentUrl = action.payload;
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdOrder = action.payload;
        if (state.isSuccess) {
          toast.success("Tạo order thành công");
        }
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      })
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
      .addCase(getCustomerOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCustomerOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.userOrder = action.payload;
      })
      .addCase(getCustomerOrders.rejected, (state, action) => {
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
      .addCase(resetState, () => initialState);
  },
});

export default authSlice.reducer;
