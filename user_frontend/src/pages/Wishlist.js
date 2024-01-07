import React from "react";
import BreadCumb from "../components/BreadCumb.js";
import Meta from "../components/Meta.js";
import Container from "../components/Container.js";
import watch from "../images/watch.jpg";
import cross from "../images/cross.svg";
const Wishlist = () => {
  return (
    <>
      <Meta title={"Yêu thích"} />
      <BreadCumb title="Yêu thích" />
      <Container class1="wishlist-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-3">
            <div className="wishlist-card position-relative">
              <button className="position-absolute bg-light border-0 cross">
                <img src={cross} className="img-fluid" alt="cross" />
              </button>
              <div className="wishlist-card-image">
                <img src={watch} className="img-fluid w-100" alt="watch" />
              </div>
              <div className="py-3 px-3">
                <h5 className="title">
                  Chiếc đồng hồ siêu xịn xò con bò đỉnh cao
                </h5>
                <h6 className="price">500.000đ</h6>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="wishlist-card position-relative">
              <button className="position-absolute bg-light border-0 cross">
                <img src={cross} className="img-fluid" alt="cross" />
              </button>
              <div className="wishlist-card-image">
                <img src={watch} className="img-fluid w-100" alt="watch" />
              </div>
              <div className="py-3 px-3">
                <h5 className="title">
                  Chiếc đồng hồ siêu xịn xò con bò đỉnh cao
                </h5>
                <h6 className="price">500.000đ</h6>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="wishlist-card position-relative">
              <button className="position-absolute bg-light border-0 cross">
                <img src={cross} className="img-fluid" alt="cross" />
              </button>
              <div className="wishlist-card-image">
                <img src={watch} className="img-fluid w-100" alt="watch" />
              </div>
              <div className="py-3 px-3">
                <h5 className="title">
                  Chiếc đồng hồ siêu xịn xò con bò đỉnh cao
                </h5>
                <h6 className="price">500.000đ</h6>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Wishlist;
