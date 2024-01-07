import React from "react";
import { Input } from "antd";

const CustomInput = (props) => {
  const { type, label, i_id, i_class, name, val, onChng, onBlr, min } = props;
  return (
    <div className="form-floating mt-3">
      <input
        type={type}
        className={`form-control ${i_class}`}
        id={i_id}
        placeholder={label}
        name={name}
        value={val}
        onChange={onChng}
        onBlur={onBlr}
        min={min}
      />
      <label htmlFor={label}>{label}</label>
    </div>
  );
};

export default CustomInput;
