import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import OurStore from "./pages/OurStore";
import Blog from "./pages/Blog";
import CompareProduct from "./pages/CompareProduct";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Forgotpassword from "./pages/Forgotpassword";
import Singup from "./pages/Singup";
import Resetpassword from "./pages/Resetpassword";
import SingleBlog from "./pages/SingleBlog";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import GuaranteePolicy from "./pages/GuaranteePolicy";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import { PrivateRoutes } from "./routing/PrivateRoutes";
import { OpenRoutes } from "./routing/OpenRoutes";
import CheckoutPage from "./pages/CheckOutPage";
import Orders from "./pages/Orders";
import OrderDetail from "./pages/OrderDetail";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route
              path="account/profile"
              element={
                <PrivateRoutes>
                  <Profile />
                </PrivateRoutes>
              }
            />
            {/* <Route path="account/orders" element={<About />} /> */}
            <Route path="contact" element={<Contact />} />
            <Route path="product" element={<OurStore />} />
            <Route path="product/:id" element={<SingleProduct />} />
            <Route path="blogs" element={<Blog />} />
            <Route path="blog/:id" element={<SingleBlog />} />
            <Route
              path="Payment/vnpay_return"
              element={
                <PrivateRoutes>
                  <CheckoutPage />
                </PrivateRoutes>
              }
            />

            <Route
              path="cart"
              element={
                <PrivateRoutes>
                  <Cart />
                </PrivateRoutes>
              }
            />
            <Route
              path="my-orders"
              element={
                <PrivateRoutes>
                  <Orders />
                </PrivateRoutes>
              }
            />
            <Route
              path="my-orders/:id"
              element={
                <PrivateRoutes>
                  <OrderDetail />
                </PrivateRoutes>
              }
            />
            <Route
              path="checkout"
              element={
                <PrivateRoutes>
                  <Checkout />
                </PrivateRoutes>
              }
            />
            <Route path="compare-product" element={<CompareProduct />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route
              path="login"
              element={
                <OpenRoutes>
                  <Login />
                </OpenRoutes>
              }
            />
            <Route
              path="forgot-password"
              element={
                <OpenRoutes>
                  <Forgotpassword />
                </OpenRoutes>
              }
            />
            <Route
              path="signup"
              element={
                <OpenRoutes>
                  <Singup />
                </OpenRoutes>
              }
            />
            <Route
              path="reset-password"
              element={
                <OpenRoutes>
                  <Resetpassword />
                </OpenRoutes>
              }
            />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="shipping-policy" element={<ShippingPolicy />} />
            <Route path="refund-policy" element={<RefundPolicy />} />
            <Route
              path="terms-and-conditions"
              element={<TermsAndConditions />}
            />
            <Route path="guarantee-policy" element={<GuaranteePolicy />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
