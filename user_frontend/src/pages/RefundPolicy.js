import React from "react";
import BreadCumb from "../components/BreadCumb.js";
import Meta from "../components/Meta.js";
import Container from "../components/Container.js";
const RefundPolicy = () => {
  return (
    <>
      <Meta title="Refund Policy" />
      <BreadCumb title="Refund Policy" />
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

export default RefundPolicy;
