import React from "react";
import PropTypes from "prop-types";
import "../css/components/MBTIButton.css";

function MBTIButton({ user, onClick, letter }) {
  const isActive = user.includes(letter);

  const handleClick = () => {
    onClick(letter);
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

// MBTIButton.propTypes = {
//   user: PropTypes.object.isRequired,
//   handleMBTISelection: PropTypes.func.isRequired,
//   letter: PropTypes.string.isRequired,
// };

export default MBTIButton;
