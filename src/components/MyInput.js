import React from "react";

const MyInput = ({
  type = "text",
  name,
  value,
  onChange,
  onKeyDown,
  placeholder,
}) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
      placeholder={placeholder}
    />
  );
};

export default MyInput;
