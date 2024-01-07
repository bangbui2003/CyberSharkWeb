import React from "react";
import BreadCumb from "../components/BreadCumb.js";
import Meta from "../components/Meta.js";
import Container from "../components/Container.js";
import watch from "../images/watch.jpg";
import cross from "../images/cross.svg";

const CompareProduct = () => {
  return (
    <>
      <Meta title={"So sánh sản phẩm"} />
      <BreadCumb title="So sánh sản phẩm" />
      <Container class1="compare-product-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-3">
            <div className="compare-product-card position-relative">
              <img
                src={cross}
                className="position-absolute cross img-fluid"
                alt="cross"
              />
              <div className="product-card-image">
                <img src={watch} alt="watch" />
              </div>
              <div className="compare-product-details">
                <h5 className="title">
                  Chiếc đồng hồ siêu xịn xò con bò đỉnh cao
                </h5>
                <h6 className="price mb-3 mt-3">500.000 đ</h6>
                <div>
                  <div className="product-detail">
                    <h5>Brand:</h5>
                    <p>Havels</p>
                  </div>
                  <div className="product-detail">
                    <h5>Avaiablity: </h5>
                    <p>Havels</p>
                  </div>
                  <div className="product-detail">
                    <h5>Cost: </h5>
                    <p>Havels</p>
                  </div>
                  <div className="product-detail">
                    <h5>Type: </h5>
                    <p>Watch</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="compare-product-card position-relative">
              <img
                src={cross}
                className="position-absolute cross img-fluid"
                alt="cross"
              />
              <div className="product-card-image">
                <img src={watch} alt="watch" />
              </div>
              <div className="compare-product-details">
                <h5 className="title">
                  Chiếc đồng hồ siêu xịn xò con bò đỉnh cao
                </h5>
                <h6 className="price mb-3 mt-3">500.000 đ</h6>
                <div>
                  <div className="product-detail">
                    <h5>Brand:</h5>
                    <p>Havels</p>
                  </div>
                  <div className="product-detail">
                    <h5>Avaiablity: </h5>
                    <p>Havels</p>
                  </div>
                  <div className="product-detail">
                    <h5>Cost: </h5>
                    <p>Havels</p>
                  </div>
                  <div className="product-detail">
                    <h5>Type: </h5>
                    <p>Watch</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default CompareProduct;
