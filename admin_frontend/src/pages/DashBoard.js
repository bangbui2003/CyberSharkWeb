import React from "react";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import { Column } from "@ant-design/plots";
import { Table } from "antd";
const columns = [
  {
    title: "Mã đơn",
    dataIndex: "key",
  },
  {
    title: "Họ và tên",
    dataIndex: "name",
  },
  {
    title: "Sản phẩm",
    dataIndex: "product",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
  },
];
const ord_data = [];
for (let i = 0; i < 46; i++) {
  ord_data.push({
    key: i,
    name: `Edward King ${i}`,
    product: 32,
    status: `London, Park Lane no. ${i}`,
  });
}
const DashBoard = () => {
  const data = [
    {
      type: "Tháng 1",
      sales: 38,
    },
    {
      type: "Tháng 2",
      sales: 52,
    },
    {
      type: "Tháng 3",
      sales: 61,
    },
    {
      type: "Tháng 4",
      sales: 145,
    },
    {
      type: "Tháng 5",
      sales: 48,
    },
    {
      type: "Tháng 6",
      sales: 38,
    },
    {
      type: "Tháng 7",
      sales: 38,
    },
    {
      type: "Tháng 8",
      sales: 38,
    },
    {
      type: "Tháng 9",
      sales: 38,
    },
    {
      type: "Tháng 10",
      sales: 38,
    },
    {
      type: "Tháng 11",
      sales: 38,
    },
    {
      type: "Tháng 12",
      sales: 38,
    },
  ];

  const config = {
    data,
    xField: "type",
    yField: "sales",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: "middle",
      style: {
        fill: "#",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };

  return (
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex flex-grow-1 bg-white p-3 rounded-3 justify-content-between align-items-end">
          <div>
            <p className="desc">Tổng tiền bán được</p>
            <h4 className="mb-0 sub-title">5.000.000đ</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6>
              <BsArrowUpRight /> 32%
            </h6>
            <p className="mb-0 desc">So sánh với tháng 4/2023</p>
          </div>
        </div>
        <div className="d-flex flex-grow-1 bg-white p-3 rounded-3 justify-content-between align-items-end">
          <div>
            <p className="desc">Tổng tiền bán được</p>
            <h4 className="mb-0 sub-title">5.000.000đ</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="green">
              <BsArrowUpRight /> 32%
            </h6>
            <p className="mb-0 desc">So sánh với tháng 4/2023</p>
          </div>
        </div>
        <div className="d-flex flex-grow-1 bg-white p-3 rounded-3 justify-content-between align-items-end">
          <div>
            <p className="desc">Tổng tiền bán được</p>
            <h4 className="mb-0 sub-title">5.000.000đ</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="red">
              <BsArrowDownRight /> 16%
            </h6>
            <p className="mb-0 desc">So sánh với tháng 4/2023</p>
          </div>
        </div>
      </div>

      <div className="mt-4 ">
        <h3 className="mb-5 title">Income Statics</h3>
        <div>
          <Column {...config} />
        </div>
      </div>

      <div className="mt-4">
        <h3 className="mb-5 title">Recent Orders</h3>
        <div>
          <Table columns={columns} dataSource={ord_data} />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
