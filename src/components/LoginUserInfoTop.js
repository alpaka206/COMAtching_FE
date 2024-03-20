import React, { Fragment } from "react";
import "../css/components/LoginUserInfoTop.css";

function LoginUserInfoTop({ isActive, onClick, label, className }) {
  return (
    <Fragment>
      <div className="welcome-message">
        김규원님,
        <br />
        환영합니다.
      </div>
      <div className="my-info">my info</div>
    </Fragment>
  );
}

export default LoginUserInfoTop;
