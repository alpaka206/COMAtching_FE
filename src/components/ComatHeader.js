import React from "react";
import "./ComatHeader.css";
import { useNavigate } from "react-router-dom";

function ComatHeader({ destination, buttonText }) {
  const navigate = useNavigate();
  return (
    <div className="header">
      <div>
        <img
          className="logo-img"
          src={process.env.PUBLIC_URL + `assets/logowhite.png`}
          alt="로고"
          onClick={() => navigate("/")}
        />
      </div>
      <button className="look-button" onClick={() => navigate({ destination })}>
        {buttonText}
      </button>
    </div>
  );
}

export default ComatHeader;
