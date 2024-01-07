import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { BiMenu } from "react-icons/bi";
import compare from "../images/compare.svg";
import wishlist from "../images/wishlist.svg";
import userImg from "../images/user.svg";
import cart from "../images/cart.svg";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../features/user/userSlice";
import { valueLabelFormat } from "../utils/formatter";

const Header = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const authState = useSelector((state) => state.auth);

  const fetchUser = async () => {
    const userInfo = await localStorage.getItem("user");
    return userInfo;
  };

  useEffect(() => {
    fetchUser().then((result) => {
      let resultJson = JSON.parse(result);
      setUser(resultJson);
      if (resultJson.id) {
        dispatch(getCart(resultJson.id));
      }
    });
  }, [authState.user]);
  return (
    <>
      <header className="header-top-strip py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <p className="text-white mb-0">Miễn phí giao hàng nội thành</p>
            </div>
            <div className="col-6">
              <p className="text-end text-white mb-0">
                Hotline:
                <a className="text-white" href="tel:+84 775197200">
                  +84 775197200
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>

      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <h2 className="col-2">
              <Link to="/" className="text-white">
                CyberShark
              </Link>
            </h2>
            <div className="col-5">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control py-2"
                  placeholder="Search product..."
                  aria-label="Search product..."
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text p-3" id="basic-addon2">
                  <BsSearch className="fs-6" color="white" />
                </span>
              </div>
            </div>

            <div className="col-5">
              <div className="header-upper-links d-flex align-items-center justify-content-between">
                <div>
                  <Link
                    to="/compare-product"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={compare} alt="compare" />
                    <p className="mb-0">
                      So sánh <br /> Sản phấm
                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                    to="/wishlist"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={wishlist} alt="wishlist" />
                    <p className="mb-0">
                      Danh sách <br /> Yêu thích
                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                    to="/cart"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={cart} alt="cart" />
                    <div className="cart">
                      <span className="badge bg-white text-dark">
                        {user && authState?.userCart
                          ? JSON.parse(authState.userCart.data.cart_Detail)
                              .length
                          : 0}
                      </span>
                    </div>
                  </Link>
                </div>
                <div>
                  <Link
                    to={authState?.user === null ? "/login" : ""}
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={userImg} alt="user" />
                    {authState?.user === null ? (
                      <p className="mb-0">
                        Đăng nhập <br /> Tài khoản
                      </p>
                    ) : (
                      <p className="mb-0">
                        Chào mừng <br /> {user && user?.user.ten}
                      </p>
                    )}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-30">
                <div>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <BiMenu color="white" />
                      <span className="me-5 d-inline-block">
                        Danh mục sản phẩm
                      </span>
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <Link className="dropdown-item text-white" to="/">
                          Laptop
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="/">
                          Tai nghe
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="/">
                          Bàn phím và chuột
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="menu-links">
                  <div className="d-flex align-items-center gap-15">
                    <NavLink to="/">Trang chủ</NavLink>
                    <NavLink to="/product">Sản phẩm</NavLink>
                    <NavLink to="/blogs">Tin tức</NavLink>
                    <NavLink to="/contact">Liên lạc</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
