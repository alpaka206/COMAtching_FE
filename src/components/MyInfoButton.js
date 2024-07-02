import React from "react";
import "../css/components/MyInfoButton.css";

function MyInfoButton({ imgSrc, infoText, buttonText }) {
  return (
    <div className="MyInfoButton">
      <div className="textWrapper">
        <div className="MyInfoButton-buttonText">{buttonText}</div>
        <div className="MyInfoButton-valueText">{infoText}</div>
      </div>
      <img src={process.env.PUBLIC_URL + imgSrc} alt="이미지" />
    </div>
  );
}

export default MyInfoButton;
