import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import customerReducer from "../features/customers/customerSlice";
import productReducer from "../features/product/productSlice";
import brandReducer from "../features/brand/brandSlice";
import categoryReducer from "../features/product_catogory/categorySlice";
import blogReducer from "../features/blog/blogSlice";
import enquiryReducer from "../features/enquiry/enquirySlice";
import orderReducer from "../features/order/oderSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    product: productReducer,
    brand: brandReducer,
    category: categoryReducer,
    blog: blogReducer,
    enquiry: enquiryReducer,
    order: orderReducer,
  },
});
