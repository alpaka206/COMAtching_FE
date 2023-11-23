import React from "react";

function GenderButton({ isActive, value, onClick, label, className }) {
  return (
    <button
      type="button"
      className={`gender-button ${
        isActive ? "active" : "inactive"
      } ${className}`}
      value={value}
      onClick={() => onClick(value)}
    >
      {label}
    </button>
  );
}

export default GenderButton;
