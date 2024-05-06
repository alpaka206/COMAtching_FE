import React from "react";
import "../css/components/AgeButton.css";

function AgeButton({ formData, value, onClick, isClickable }) {
  const isActive = formData.includes(value);

  const handleClick = () => {
    if (isClickable) {
      onClick(value);
    }
  };

  return (
    <button
      type="button"
      className={`AgeButton ${
        isClickable ? `${isActive ? "active" : ""}` : ""
      } `}
      value={value}
      onClick={handleClick}
      disabled={!isClickable}
    >
      {value}
    </button>
  );
}

export default AgeButton;
