import React, { useEffect } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getCustomers } from "../features/customers/customerSlice";
import { Link } from "react-router-dom";
const columns = [
  {
    title: "STT",
    dataIndex: "key",
    defaultSortOrder: "ascend",
    width: "10%",
    sorter: (a, b) => a.key - b.key,
  },
  {
    title: "Họ và tên",
    dataIndex: "name",
    defaultSortOrder: "ascend",
    width: "20%",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Email",
    width: "20%",
    dataIndex: "email",
  },
  {
    title: "Loại KH",
    width: "20%",
    dataIndex: "type",
  },
  {
    title: "SĐT",
    width: "20%",
    dataIndex: "telephone",
  },
  {
    title: "Hành động",
    dataIndex: "action",
  },
];

const Customers = () => {
  const data = [];
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getUsers());
  // }, []);
  // const customerState = useSelector((state) => state.customer.customers);
  // for (let i = 0; i < customerState.length; i++) {
  //   if (customerState[i].role !== "admin") {
  //     ord_data.push({
  //       key: i + 1,
  //       name: customerState[i].first_name + " " + customerState[i].last_name,
  //       email: customerState[i].email,
  //       customer_type: customerState[i].customer_type,
  //       customer_telephone: customerState[i].customer_telephone,
  //       action: (
  //         <>
  //           <Link to="/" className="fs-3 text-danger">
  //             <BiEdit size="30px" />
  //           </Link>
  //           <Link to="/" className="ms-3 fs-3 text-danger">
  //             <AiFillDelete size="30px" />
  //           </Link>
  //         </>
  //       ),
  //     });
  //   }
  // }

  data.push({
    key: 1,
    name: "bb",
    email: "bb",
    type: "bb",
    telephone: "bb",
    action: (
      <>
        <Link to="/" className="fs-3 text-danger">
          <BiEdit size="20px" />
        </Link>
        <Link to="/" className="ms-3 fs-3 text-danger">
          <AiFillDelete size="20px" />
        </Link>
      </>
    ),
  });
  return (
    <div>
      <h3 className="mb-4 title">Khách hàng</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default Customers;
