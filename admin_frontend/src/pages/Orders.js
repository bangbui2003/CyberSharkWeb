import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrders, updateOrder } from "../features/order/oderSlice";
import { valueLabelFormat } from "../utils/formatter";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "Mã đơn",
    dataIndex: "key",
  },
  {
    title: "Tổng trị giá",
    dataIndex: "cost",
  },
  {
    title: "Tình trạng",
    dataIndex: "status",
    sorter: (a, b) => a.status.length - b.status.length,
    defaultSortOrder: "descend",
  },
  {
    title: "Hành động",
    dataIndex: "action",
  },
];

const Orders = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
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

  const orderState = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrders());
    forceUpdate();
  }, [dispatch]);

  const fetchData = () => {
    const data = [];
    let length = 0;
    if (orderState.orders.data) {
      length = orderState.orders.data.length;
    }
    for (let i = 0; i < length; i++) {
      data.push({
        key: orderState.orders.data[i].order_Number,
        cost: valueLabelFormat(orderState.orders.data[i].cost),
        status:
          orderState.orders.data[i].status === "Unpaid"
            ? "Chưa thanh toán"
            : orderState.orders.data[i].status === "Cancel"
            ? "Đã huỷ"
            : orderState.orders.data[i].status === "Delivery"
            ? "Đã giao hàng"
            : "Đã thanh toán",
        action: (
          <>
            <button
              className="ms-3 fs-3 text-danger"
              disabled={
                orderState.orders.data[i].status == "Cancel" ||
                orderState.orders.data[i].status == "Delivery"
              }
              onClick={() => showModal(orderState.orders.data[i])}
            >
              <BiEdit size="20px" />
            </button>
          </>
        ),
      });
    }
    return data;
  };

  useEffect(() => {
    setData(fetchData());
  }, [orderState]);

  const updateOrderStatus = (e) => {
    console.log();
    dispatch(updateOrder({ id: e.order_Number, status: "Delivery" }));
    setOpen(false);
    forceUpdate(); // Trigger a manual update after updating order status
  };
  return (
    <>
      <div>
        <h3 className="mb-4 title">Đơn đặt hàng</h3>
        <div>
          <Table columns={columns} dataSource={data} />
        </div>
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          updateOrderStatus(order);
        }}
        title="Cập nhật trạng thái đã giao hàng?"
      />
    </>
  );
};

export default Orders;
