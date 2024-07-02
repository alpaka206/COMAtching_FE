import React from "react";
import "../css/components/AgeButton.css";

function AgeButton({ formData, value, onClick, isClickable, text }) {
  const isActive = formData === value;

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
      {text}
    </button>
  );
}

export default AgeButton;
