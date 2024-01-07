import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import DashBoard from "./pages/DashBoard";
import Login from "./pages/Login";
import Resetpassword from "./pages/Resetpassword";
import Forgotpassword from "./pages/Forgotpassword";
import MainLayout from "./components/MainLayout";
import Enquiries from "./pages/Enquiries";
import BlogList from "./pages/BlogList";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import CategoryList from "./pages/CategoryList";
import BrandList from "./pages/BrandList";
import AddBlog from "./pages/AddBlog";
import AddCate from "./pages/AddCate";
import AddBrand from "./pages/AddBrand";
import ProductList from "./pages/ProductList";
import AddProduct from "./pages/AddProduct";
import CouponList from "./pages/CouponList";
import AddCoupon from "./pages/AddCoupon";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="reset-password" element={<Resetpassword />} />
        <Route path="forgot-password" element={<Forgotpassword />} />
        <Route path="admin" element={<MainLayout />}>
          <Route index element={<DashBoard />} />
          <Route path="enquiries" element={<Enquiries />} />

          <Route path="blog-list" element={<BlogList />} />
          <Route path="blog" element={<AddBlog />} />

          <Route path="category-list" element={<CategoryList />} />
          <Route path="category" element={<AddCate />} />
          <Route path="category/:id" element={<AddCate />} />

          <Route path="brand-list" element={<BrandList />} />
          <Route path="brand" element={<AddBrand />} />
          <Route path="brand/:id" element={<AddBrand />} />

          <Route path="product-list" element={<ProductList />} />
          <Route path="product" element={<AddProduct />} />
          <Route path="product/:id" element={<AddProduct />} />

          <Route path="orders" element={<Orders />} />

          <Route path="coupon-list" element={<CouponList />} />
          <Route path="coupon" element={<AddCoupon />} />

          <Route path="customers" element={<Customers />} />
          <Route path="list-category" element={<CategoryList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
