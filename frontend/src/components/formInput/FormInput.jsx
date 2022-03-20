import React from "react";
import "./formInput.css";

const FormInput = (props) => {
  const { label, onChange, id, ...inputsProps } = props;
  return (
    <div className="formInput">
      <label>{label}</label>
      <input {...inputsProps} onChange={onChange} />
    </div>
  );
};

export default FormInput;
