import React, { useEffect, useState } from "react";
import BreadCumb from "../components/BreadCumb.js";
import Meta from "../components/Meta.js";
import watch from "../images/watch.jpg";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Container from "../components/Container.js";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartProduct,
  getCart,
  updateCartProduct,
} from "../features/user/userSlice.js";
import { valueLabelFormat } from "../utils/formatter.js";
import { toast } from "react-toastify";

const Cart = () => {
  const dispatch = useDispatch();
  const [productCartDetail, setProductCartDetail] = useState(null);
  const cartState = useSelector((state) => state.auth.userCart.data);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    const fetchCart = async () => {
      dispatch(getCart(user.id));
    };
    fetchCart();
  }, []);

  useEffect(() => {
    if (productCartDetail) {
      dispatch(
        updateCartProduct({
          customer_Id: user.id,
          product_Id: productCartDetail?.itemId,
          quantity: productCartDetail?.quantity,
        })
      );

      setTimeout(() => {
        dispatch(getCart(user.id));
      }, 500);
    }
  }, [productCartDetail]);

  const deleteCart = (product_Id) => {
    dispatch(
      deleteCartProduct({
        customerId: cId,
        productId: product_Id,
      })
    );
    setTimeout(() => {
      dispatch(getCart(cId));
    }, 500);
  };

  return (
    <>
      <Meta title={"Giỏ hàng"} />
      <BreadCumb title="Giỏ hàng" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="cart-header py-3 d-flex align-items-center">
            <div className="cart-col-1 d-flex justify-content-center">
              <h4>Sản phẩm</h4>
            </div>
            <div className="cart-col-2 d-flex justify-content-center">
              <h4>Giá</h4>
            </div>
            <div className="cart-col-3 d-flex justify-content-center">
              <h4>Số lượng</h4>
            </div>
            <div className="cart-col-4 d-flex justify-content-center">
              <h4>Tổng</h4>
            </div>
          </div>
          {cartState &&
            JSON.parse(cartState?.cart_Detail).map((item, index) => {
              return (
                <div className="cart-data py-3 mb-2 d-flex justify-content-center align-items-center">
                  <div className="cart-col-1 gap-15 d-flex align-items-center">
                    <div className="w-25">
                      <img
                        src={watch}
                        className="img-fluid"
                        alt="product image"
                      />
                    </div>
                    <div className="w-75">
                      <p>{item?.Product_Name}</p>
                    </div>
                  </div>
                  <div className="cart-col-2 d-flex justify-content-end p-3">
                    <h5 className="price">{valueLabelFormat(item?.Price)}</h5>
                  </div>
                  <div className="cart-col-3 d-flex gap-20 justify-content-center">
                    <div>
                      <input
                        type="number"
                        name=""
                        className="form-control"
                        min={1}
                        max={10}
                        id=""
                        value={item?.Quantity}
                        onChange={(e) =>
                          setProductCartDetail({
                            itemId: item?.Product_Id,
                            quantity: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <MdDelete
                        className="text-danger"
                        onClick={() => {
                          deleteCart(item?.Product_Id);
                        }}
                      />
                    </div>
                  </div>
                  <div className="cart-col-4 d-flex justify-content-end">
                    <h5 className="price">
                      {valueLabelFormat(item?.Price * item?.Quantity)}
                    </h5>
                  </div>
                </div>
              );
            })}
          <div className="col-12 py-2 mt-4">
            <div className="d-flex justify-content-between align-items-baseline">
              <Link to="/product" className="button">
                Tiếp tục mua sắm
              </Link>
              <div className="d-flex flex-column align-items-end">
                <h4>Tổng tiền: {valueLabelFormat(cartState?.cart_Total)}</h4>
                <p>Phí ship sẽ được tính lúc xác nhận</p>
                <Link to="/checkout" className="button">
                  Đặt hàng
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cart;
