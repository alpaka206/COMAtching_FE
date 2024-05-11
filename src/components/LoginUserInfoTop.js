import React, { Fragment } from "react";
import "../css/components/LoginUserInfoTop.css";

function LoginUserInfoTop({ username }) {
  return (
    <Fragment>
      <div className="welcome-message">
        {username}님,
        <br />
        환영합니다.
      </div>
      <div className="my-info">my info</div>
    </Fragment>
  );
}

export default LoginUserInfoTop;
