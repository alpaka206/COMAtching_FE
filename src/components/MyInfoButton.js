import React from "react";
import "../css/components/MyInfoButton.css";

function MyInfoButton({ imgSrc, infoText, buttonText }) {
  return (
    <button className="MyInfoButton">
      <div className="textWrapper">
        <div className="buttonText">{buttonText}</div>
        <div className="infoText">{infoText}</div>
      </div>
      <img src={process.env.PUBLIC_URL + imgSrc} alt="이미지" />
    </button>
  );
}

export default MyInfoButton;
