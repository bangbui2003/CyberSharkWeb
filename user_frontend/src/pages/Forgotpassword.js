import React from "react";
import BreadCumb from "../components/BreadCumb.js";
import Meta from "../components/Meta.js";
import { Link } from "react-router-dom";
import Container from "../components/Container.js";
import CustomInput from "../components/CustomInput.js";
const Forgotpassword = () => {
  return (
    <>
      <Meta title={"Quên mật khẩu"} />
      <BreadCumb title="Quên mật khẩu" />
      <Container class1="forgot-password-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Quên mật khẩu</h3>
              <p className="text-center mt-2">
                Chúng tôi sẽ gửi email để thiết lập lại mật khẩu
              </p>
              <form action="" className="d-flex flex-column gap-15">
                <CustomInput type="email" name="email" placeholder="Email" />
                <div>
                  <div className="mt-3 d-flex justify-content-center flex-column gap-15 align-items-center">
                    <button className="button border-0" type="submit">
                      Xác nhận
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

export default Forgotpassword;
