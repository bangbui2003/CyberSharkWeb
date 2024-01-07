import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let userSchema = Yup.object({
    email: Yup.string().email("Invalid Email").required("Email is required"),
    Mat_khau: Yup.string()
      .min(6, "Password length must greate or equal to 6")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      Mat_khau: "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (!user == null || isSuccess) {
      navigate("admin");
    } else {
      navigate("");
    }
  }, [user, isLoading, isError, isSuccess]);
  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <form action="" onSubmit={formik.handleSubmit}>
          <h3 className="text-center title">Đăng nhập</h3>
          <p className="text-center">Đăng nhập để có thể tiếp tục</p>
          <div className="error text-center">
            {message.message == "Rejected" ? "Bạn không phải là admin" : ""}
          </div>
          <CustomInput
            type="text"
            name="email"
            label="Email"
            id="email"
            val={formik.values.email}
            onChng={formik.handleChange("email")}
            obBlr={formik.handleBlur("email")}
          />
          <div className="error-message">
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}
          </div>
          <CustomInput
            type="password"
            name="Mat_khau"
            label="Mật khẩu"
            id="password"
            val={formik.values.Mat_khau}
            onChng={formik.handleChange("Mat_khau")}
            obBlr={formik.handleBlur("Mat_khau")}
          />
          <div className="error-message">
            {formik.touched.Mat_khau && formik.errors.Mat_khau ? (
              <div>{formik.errors.Mat_khau}</div>
            ) : null}
          </div>
          <div className="mb-3 text-end">
            <Link to="/forgot-password">Quên mật khẩu?</Link>
          </div>
          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
            style={{ background: "#ffd333" }}
            type="submit"
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
