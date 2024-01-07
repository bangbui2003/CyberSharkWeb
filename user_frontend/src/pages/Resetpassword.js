import React from "react";
import BreadCumb from "../components/BreadCumb.js";
import Meta from "../components/Meta.js";
import Container from "../components/Container.js";
import CustomInput from "../components/CustomInput.js";

const Resetpassword = () => {
  return (
    <>
      <Meta title={"Đặt lại mật khẩu"} />
      <BreadCumb title="Đặt lại mật khẩu" />
      <Container class1="login-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Đặt lại mật khẩu</h3>
              <form action="" className="d-flex flex-column gap-15">
                <CustomInput
                  type="password"
                  name="password"
                  placeholder="Mật khẩu mới"
                  className="form-control"
                />
                <CustomInput
                  type="password"
                  name="confpassword"
                  placeholder="Xác nhận mật khẩu"
                  className="mt-1"
                />
                <div>
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button border-0">Xác nhận</button>
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

export default Resetpassword;
