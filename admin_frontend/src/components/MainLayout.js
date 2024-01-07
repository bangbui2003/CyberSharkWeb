import React, { useState } from "react";
import "../index.css";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlinePicLeft,
} from "react-icons/ai";
import { FaRegQuestionCircle } from "react-icons/fa";
import { FaProductHunt } from "react-icons/fa";
import { RiCouponLine } from "react-icons/ri";
import { Outlet } from "react-router-dom";
import { SiBrandfolder } from "react-icons/si";
import { BiCategoryAlt } from "react-icons/bi";
import { ImBlog } from "react-icons/im";
import { FaClipboardList, FaBloggerB } from "react-icons/fa";
import { Button, Layout, Menu, theme } from "antd";
import user from "../images/user.png";
import { IoIosNotifications } from "react-icons/io";
const { Header, Sider, Content } = Layout;
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        {/* <div className="demo-logo-vertical" /> */}
        <div className="logo">
          <h2 className="text-white fs-5 text-center py-3 mb-0">
            <span className="sm-logo">CS</span>
            <span className="lg-logo">CyberShark</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key == "signout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <AiOutlineDashboard className="fs-4" />,
              label: "Tổng quan",
            },
            {
              key: "customers",
              icon: <AiOutlineUser className="fs-4" />,
              label: "Khách hàng",
            },
            {
              key: "catalog",
              icon: <FaProductHunt className="fs-4" />,
              label: "Danh mục sản phẩm",
              children: [
                {
                  key: "product",
                  icon: <AiOutlineShoppingCart className="fs-4" />,
                  label: "Thêm sản phẩm",
                },
                {
                  key: "product-list",
                  icon: <AiOutlineShoppingCart className="fs-4" />,
                  label: "Danh sách sản phẩm",
                },
                {
                  key: "brand",
                  icon: <SiBrandfolder className="fs-4" />,
                  label: "Thương hiệu",
                },
                {
                  key: "brand-list",
                  icon: <SiBrandfolder className="fs-4" />,
                  label: "Danh sách thương hiệu",
                },
                {
                  key: "category",
                  icon: <BiCategoryAlt className="fs-4" />,
                  label: "Thêm loại sản phẩm",
                },
                {
                  key: "category-list",
                  icon: <BiCategoryAlt className="fs-4" />,
                  label: "Danh sách loại sản phẩm",
                },
              ],
            },
            {
              key: "orders",
              icon: <FaClipboardList className="fs-4" />,
              label: "Đơn hàng",
            },
            {
              key: "blogs",
              icon: <FaBloggerB className="fs-4" />,
              label: "Tin tức",
              children: [
                {
                  key: "blog",
                  icon: <ImBlog className="fs-4" />,
                  label: "Thêm tin tức",
                },
                {
                  key: "blog-list",
                  icon: <FaBloggerB className="fs-4" />,
                  label: "Danh sách tin tức",
                },
              ],
            },
            {
              key: "marketing",
              icon: <RiCouponLine className="fs-4" />,
              label: "Marketing",
              children: [
                {
                  key: "coupon",
                  icon: <ImBlog className="fs-4" />,
                  label: "Thêm mã giảm giá",
                },
                {
                  key: "coupon-list",
                  icon: <RiCouponLine className="fs-4" />,
                  label: "Danh sách mã giảm giá",
                },
              ],
            },
            {
              key: "enquiries",
              icon: <FaRegQuestionCircle className="fs-4" />,
              label: "Tư vấn",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="d-flex justify-content-between ps-1 pe-5"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div className="d-flex gap-3 align-items-center">
            <div className="position-relative">
              <IoIosNotifications className="fs-4" />
              <span className="badge bg-warning rounded-circle p-1 position-absolute">
                3
              </span>
            </div>
            <div className="d-flex gap-3 align-items-center dropdown">
              <div>
                <img width={32} height={32} src={user} alt="" />
              </div>
              <div
                role="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h5 className="mb-0">Hữu Bằng</h5>
                <p className="mb-0">buihuubang123@gmail.com</p>
              </div>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li
                  className="dropdown-item py-2 mb-1"
                  style={{ height: "auto", lineHeight: "20px" }}
                >
                  <Link className="dropdown-item" href="#">
                    Xem thông tin
                  </Link>
                </li>
                <li
                  className="dropdown-item py-2 mb-1"
                  style={{ height: "auto", lineHeight: "20px" }}
                >
                  <Link className="dropdown-item" href="#">
                    Thay đổi mật khẩu
                  </Link>
                </li>
                <li
                  className="dropdown-item py-2 mb-1"
                  style={{ height: "auto", lineHeight: "20px" }}
                >
                  <Link className="dropdown-item">Đăng xuất</Link>
                </li>
              </ul>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
