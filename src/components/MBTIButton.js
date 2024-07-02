import React from "react";
import PropTypes from "prop-types";
import "../css/components/MBTIButton.css";

function MBTIButton({ user, onClick, letter, name }) {
  const isActive = user.includes(letter);

  const handleClick = () => {
    onClick(letter);
  };

  return (
    <div className="MBTIElement">
      <button
        type="button"
        className={`${name} ${isActive ? "active" : ""}`}
        onClick={handleClick}
      >
        {letter}
      </button>
    </div>
  );
}

export default MBTIButton;
