import React, { useEffect } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getEnquiries } from "../features/enquiry/enquirySlice";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "STT",
    dataIndex: "key",
    sorter: (a, b) => a.key - b.key,
  },
  {
    title: "Tiêu đề",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "SĐT",
    dataIndex: "mobile",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
  },
  {
    title: "Hành động",
    dataIndex: "status",
  },
];

const Enquiries = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEnquiries);
  }, []);

  const enquiryState = useSelector((state) => state.enquiry.enquiries);
  const data = [];

  for (let i = 0; i < enquiryState.length; i++) {
    data.push({
      key: i + 1,
      name: enquiryState[i].name,
      email: enquiryState[i].email,
      mobile: enquiryState[i].mobile,
      status: (
        <>
          <select name="" className="form-control form-select">
            <option value="">Chọn trạng thái</option>
          </select>
        </>
      ),
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
  }
  return (
    <div>
      <h3 className="mb-4 title">Hỏi đáp</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default Enquiries;
