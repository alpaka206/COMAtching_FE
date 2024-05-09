import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/components/HeaderNav.css";

function HeaderNav() {
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
    </div>
  );
}

export default HeaderNav;
