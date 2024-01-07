import React from "react";
import { useDispatch, useSelector } from "react-redux";
import BreadCumb from "../components/BreadCumb.js";
import Meta from "../components/Meta.js";
import Container from "../components/Container.js";
import CustomInput from "../components/CustomInput.js";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import "yup-phone-lite";
import { registerUser } from "../features/user/userSlice.js";
import { useEffect } from "react";
import { toast } from "react-toastify";
const signUpSchema = yup.object({
  ten: yup.string().required("Vui lòng điền tên"),
  email: yup
    .string()
    .required("Vui lòng điền email")
    .email("Email không hợp lệ"),
  so_dien_thoai: yup
    .string()
    .matches(/^0/, "Số điện thoại bắt đầu với số 0")
    .required("Vui lòng điền số điện thoại")
    .min(10, "Độ dài tối thiểu là 10"),
  mat_khau: yup.string().min(6, "Độ dài tối thiểu là 6"),
});

const Singup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const createState = useSelector((state) => state.auth);
  const { isError, isSuccess, isLoading, createdUser } = createState;

  useEffect(() => {
    if (isSuccess && createdUser) {
      toast.success("Đăng ký tài khoản thành công");
      navigate("/login/");
    }
    if (isError) {
      toast.error("Đăng ký không thành công");
    }
  }, [isError, isSuccess, isLoading]);
  const formik = useFormik({
    initialValues: {
      ten: "",
      email: "",
      so_dien_thoai: "",
      mat_khau: "",
    },
    validationSchema: signUpSchema,

    onSubmit: (values) => {
      dispatch(registerUser(values));
    },
  });

  return (
    <>
      <Meta title={"Đăng ký"} />
      <BreadCumb title="Đăng ký" />
      <Container class1="login-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Đăng ký</h3>
              <form
                action=""
                onSubmit={formik.handleSubmit}
                className="d-flex flex-column gap-15"
              >
                <CustomInput
                  type="text"
                  name="ten"
                  placeholder="Họ và tên"
                  value={formik.values.name}
                  onChange={formik.handleChange("ten")}
                  onBlur={formik.handleBlur("ten")}
                />
                <div className="error-message">
                  {formik.touched.ten && formik.errors.ten}
                </div>
                <CustomInput
                  type="email"
                  name="email"
                  placeholder="Email"
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
                <div className="error-message">
                  {formik.touched.mat_khau && formik.errors.mat_khau}
                </div>

                <CustomInput
                  type="tel"
                  name="so_dien_thoai"
                  placeholder="Số điện thoại"
                  value={formik.values.mobile}
                  onChange={formik.handleChange("so_dien_thoai")}
                  onBlur={formik.handleBlur("so_dien_thoai")}
                />
                <div className="error-message">
                  {formik.touched.so_dien_thoai && formik.errors.so_dien_thoai}
                </div>

                <div>
                  <div className="mt-3 d-flex flex-column justify-content-center gap-15 align-items-center">
                    <button className="button border-0" type="submit">
                      Tạo tài khoản
                    </button>
                    <Link to="/login">Huỷ bỏ</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Singup;
