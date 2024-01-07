import React, { useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddCoupon = () => {
  const [desc, setDesc] = useState();
  const handleDesc = (e) => {
    setDesc(e);
  };

  return (
    <div>
      <h3 className="mb-4 title">Thêm mã giảm giá</h3>
      <div>
        <form action=""></form>
        <CustomInput type="text" label="Nhập tên mã giảm giá" />
        <div className="mb-3">
          <ReactQuill
            theme="snow"
            value={desc}
            onChange={(evt) => {
              handleDesc(evt);
            }}
          />
        </div>
        <CustomInput type="number" label="Số phần trăm giảm" />
        <CustomInput type="text" label="Ngày hết hạn" />

        <button
          className="btn btn-success border-0 rounded-3 my-5"
          type="submit"
        >
          Thêm sản phẩm
        </button>
      </div>
    </div>
  );
};

export default AddCoupon;
