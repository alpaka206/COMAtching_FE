import React from "react";
import "../css/components/ContactMethodButton.css";

function ContactMethodButton({ isActive, onClick, image, alt }) {
  return (
    <button
      type="button"
      className={`phonebutton ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      <img src={image} alt={alt} className="ContactMethodButtonImg" />
    </button>
  );
}

export default ContactMethodButton;
