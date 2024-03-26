import React from "react";
import "../css/components/GenderButton.css";

function GenderButton({ isActive, value, onClick, label, className }) {
  return (
    <button
      type="button"
      className={`gender-button ${isActive ? "active" : "inactive"}`}
      value={value}
      onClick={() => onClick(value)}
    >
      {label}
    </button>
  );
}

export default GenderButton;
