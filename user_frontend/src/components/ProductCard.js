import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import watch from "../images/watch.jpg";
import wish from "../images/wish.svg";
import compare from "../images/prodcompare.svg";
import view from "../images/view.svg";
import addcard from "../images/add-cart.svg";
import { valueLabelFormat } from "../utils/formatter";

const ProductCard = ({ grid, productDetails }) => {
  const location = useLocation();
  return (
    <>
      {productDetails.map((productDetail, index) => (
        <div
          key={index}
          className={`${
            location.pathname === "/product" ? `gr-${grid}` : "gr-3"
          }`}
        >
          <Link
            to={`/product/` + productDetail?.productId}
            className="product-card position-relative"
          >
            <div className="wishlist-icon position-absolute">
              <button className="border-0 bg-transparent">
                <img src={wish} className="img-fluid" alt="wishlist" />
              </button>
            </div>
            <div className="product-image">
              <img
                src={productDetail.url}
                className=" mx-auto"
                alt="product image"
                width={250}
                height={250}
              />
            </div>
            <div className="product-details">
              <h6 className="brand">{productDetail.brandName}</h6>
              <h5 className="product-title">
                {productDetail.productName.length > 40
                  ? productDetail.productName.substr(0, 40) + "..."
                  : productDetail.productName}
              </h5>
              <ReactStars
                count={5}
                size={24}
                value={3}
                edit={false}
                activeColor="#ffd700"
              />
              <p
                className={`description ${grid === 12 ? "d-block" : "d-none"}`}
                dangerouslySetInnerHTML={{
                  __html: productDetail.description,
                }}
              ></p>
              <p className="price">
                <b>{valueLabelFormat(productDetail.productPrice)}</b>
              </p>
            </div>
            <div className="action-bar position-absolute">
              <div className="d-flex flex-column gap-15">
                <button className="border-0 bg-transparent">
                  <img src={compare} alt="compare" />
                </button>
                <button className="border-0 bg-transparent">
                  <img src={view} alt="view" />
                </button>
                <button className="border-0 bg-transparent">
                  <img src={addcard} alt="addcart" />
                </button>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

export default ProductCard;
