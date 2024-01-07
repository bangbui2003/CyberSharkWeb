import React from "react";
import BreadCumb from "../components/BreadCumb.js";
import Meta from "../components/Meta.js";
const ShippingPolicy = () => {
  return (
    <>
      <Meta title={"Vận chuyển"} />
      <BreadCumb title="vận chuyển" />
      <div className="policy-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="policy"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShippingPolicy;
