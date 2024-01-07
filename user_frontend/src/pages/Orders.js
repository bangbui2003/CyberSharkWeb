import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import BreadCumb from "../components/BreadCumb";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerOrders, updateOrder } from "../features/user/userSlice";
import { valueLabelFormat } from "../utils/formatter";
import car from "../images/car-riding.png";
import CustomModal from "../components/CustomModal";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState(null);

  const forceUpdate = React.useReducer((bool) => !bool)[1]; // Create a forceUpdate function

  const showModal = (e) => {
    setOpen(true);
    setOrder(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const orderState = useSelector((state) => state.auth.userOrder);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    dispatch(getCustomerOrders(user.id));
  }, []);

  const updateOrderStatus = (e) => {
    dispatch(updateOrder({ id: e.order_Number, status: "Cancel" }));
    setOpen(false);
    forceUpdate(); // Trigger a manual update after updating order status
  };

  return (
    <>
      <BreadCumb title="Đơn hàng của tôi" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12 d-flex justify-content-center">
            <div
              className="border-3 border-dark p-5"
              style={{ textAlign: "center" }}
            >
              <h4>Nhận hàng trước</h4>{" "}
              <img width={50} height={50} src={car} alt="" />
              <h4 style={{ color: "red", fontSize: "100", fontWeight: "500" }}>
                30 / 12 / 2023
              </h4>
            </div>
          </div>
          <div
            className="col-12"
            style={{ backgroundColor: "black", color: "white", padding: 10 }}
          >
            <div className="row justify-content-between">
              <div className="col-3">
                <h5>Mã đơn hàng</h5>
              </div>
              <div className="col-3">
                <h5>Tổng tiền đơn hàng</h5>
              </div>
              <div className="col-3">
                <h5>Trạng thái</h5>
              </div>
              <div className="col-3">
                <h5>Hành động</h5>
              </div>
            </div>
          </div>
          <div className="col-12 mt-3">
            {orderState &&
              orderState?.data.map((item, index) => {
                const divStyle = {
                  backgroundColor: index % 2 === 0 ? "#f0f0f0" : "#ffffff", // Alternate colors based on index
                  padding: 16,
                };
                return (
                  <>
                    <div
                      className="row align-items-center"
                      style={divStyle}
                      key={index}
                    >
                      <Link
                        to={`/my-orders/` + item.order_Number}
                        className="col-3"
                      >
                        <h6>{item.order_Number}</h6>
                      </Link>
                      <div className="col-3">
                        <h6>{valueLabelFormat(item.cost)}</h6>
                      </div>
                      <div className="col-3">
                        <h6>
                          {item.status === "Unpaid"
                            ? "Chưa thanh toán"
                            : item.status === "Cancel"
                            ? "Đã huỷ"
                            : item.status === "Delivery"
                            ? "Đã giao hàng"
                            : "Đã thanh toán"}
                        </h6>
                      </div>
                      <div className="col-3">
                        <Button
                          variant="contained"
                          disabled={
                            item.status === "Delivery" ||
                            item.status === "Cancel"
                          }
                          onClick={() => showModal(item)}
                        >
                          Huỷ đơn hàng
                        </Button>
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
        <CustomModal
          hideModal={hideModal}
          open={open}
          performAction={() => {
            updateOrderStatus(order);
          }}
          title="Cập nhật trạng thái đã huỷ?"
        />
      </Container>
    </>
  );
};

export default Orders;
