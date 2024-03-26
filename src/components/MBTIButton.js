import React from "react";
import PropTypes from "prop-types";
import "../css/components/MBTIButton.css";

function MBTIButton({ user, handleMBTISelection, letter }) {
  const isActive = user.mbti.includes(letter);

  const handleClick = () => {
    handleMBTISelection(letter);
  };

  return (
    <div className="MBTIElement">
      <button
        type="button"
        className={`MBTIButton ${isActive ? "active" : ""}`}
        onClick={handleClick}
      >
        {letter}
      </button>
    </div>
  );
}

MBTIButton.propTypes = {
  user: PropTypes.object.isRequired,
  handleMBTISelection: PropTypes.func.isRequired,
  letter: PropTypes.string.isRequired,
};

export default MBTIButton;
