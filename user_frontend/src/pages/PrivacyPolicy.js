import React from "react";
import BreadCumb from "../components/BreadCumb.js";
import Meta from "../components/Meta.js";
import Container from "../components/Container.js";

const PrivacyPolicy = () => {
  return (
    <>
      <Meta title={"Bảo mật"} />
      <BreadCumb title="Bảo mật" />
      <Container class1="policy-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="policy"></div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default PrivacyPolicy;
