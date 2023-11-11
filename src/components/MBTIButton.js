import React from "react";
import PropTypes from "prop-types";

function MBTIButton({ isActive, onClick, label, className }) {
  return (
    <button
      type="button"
      className={`mbtibutton ${isActive ? "active" : ""} ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

MBTIButton.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default MBTIButton;
