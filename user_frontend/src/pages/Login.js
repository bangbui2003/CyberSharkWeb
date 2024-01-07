import React from "react";
import BreadCumb from "../components/BreadCumb.js";
import Meta from "../components/Meta.js";
import { Link, useNavigate } from "react-router-dom";
import Container from "../components/Container.js";
import CustomInput from "../components/CustomInput.js";
import { useDispatch, useSelector } from "react-redux";
import { getCart, loginUser, resetState } from "../features/user/userSlice.js";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const signinSchema = yup.object({
  email: yup
    .string()
    .required("Vui lòng điền email")
    .email("Email không hợp lệ"),
  mat_khau: yup.string().min(6, "Độ dài tối thiểu là 6"),
});

const Login = () => {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      mat_khau: "",
    },

    validationSchema: signinSchema,

    onSubmit: (values) => {
      dispatch(loginUser(values));
    },
  });

  useEffect(() => {
    if (authState.isSuccess) {
      navigate("/");
    }
  }, [authState.isSuccess, navigate]);
  return (
    <>
      <Meta title={"Đăng nhập"} />
      <BreadCumb title="Đăng nhập" />
      <Container class1="login-wrapper home-wrapper-2 py-5">
        {" "}
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Đăng nhập</h3>
              <form
                action=""
                className="d-flex flex-column gap-15"
                onSubmit={formik.handleSubmit}
              >
                <CustomInput
                  type="text"
                  name="email"
                  placeholder="Nhập email"
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                />
                <div className="error-message">
                  {formik.touched.email && formik.errors.email}
                </div>

                <CustomInput
                  type="password"
                  name="mat_khau"
                  placeholder="Mật khẩu"
                  className="mt-1"
                  value={formik.values.mat_khau}
                  onChange={formik.handleChange("mat_khau")}
                  onBlur={formik.handleBlur("mat_khau")}
                />
                <div>
                  <div className="error-message">
                    {formik.touched.mat_khau && formik.errors.mat_khau}
                  </div>
                  <Link to="/forgot-password">Quên mật khẩu?</Link>
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button border-0" type="submit">
                      Đăng nhập
                    </button>
                    <Link to="/signup" className="button signup">
                      Đăng ký
                    </Link>
                  </div>
                  <div className="d-flex py-3 align-items-center">
                    <div className="seperate-line w-100 flex-1"></div>
                    <span className="seperate-text">HOẶC</span>
                    <div className="seperate-line w-100 flex-1"></div>
                  </div>
                </div>
              </form>
              <div className="mt-3 d-flex justify-content-center">
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    const credential = jwtDecode(credentialResponse.credential);
                    console.log(credential);
                  }}
                  onError={() => {
                    toast.error("Đăng nhập thất bại");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Login;
