import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/user/userSlice";
import productReducer from "../features/product/productSlice";
import brandReducer from "../features/brand/brandSlice";
import categoryReducer from "../features/category/categorySlice";
import addressReducer from "../features/address/addressSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    brand: brandReducer,
    category: categoryReducer,
    address: addressReducer,
  },
});
