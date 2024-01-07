import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "Sno",
    dataIndex: "key",
  },

  {
    title: "Tên mã",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Giảm giá",
    dataIndex: "discount",
    sorter: (a, b) => a.discount - b.discount,
  },
  {
    title: "Hết hạn",
    dataIndex: "expiry",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Tình trạng",
    dataIndex: "status",
  },
  {
    title: "Hành động",
    dataIndex: "action",
  },
];

const ord_data = [];
for (let i = 0; i < 10; i++) {
  ord_data.push({
    key: i,
    name: `Edward King ${i}`,
    discount: 32,
    expiry: `London, Park Lane no. ${i}`,
    status: "Chưa sử dụng",
    action: `London, Park Lane no. ${i}`,
  });
}

const CouponList = () => {
  return (
    <div>
      <h3 className="mb-4 title">Danh sách mã giảm giá</h3>
      <div>
        <Table columns={columns} dataSource={ord_data} />
      </div>
    </div>
  );
};

export default CouponList;
