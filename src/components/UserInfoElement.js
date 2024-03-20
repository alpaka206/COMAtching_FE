import React, { Fragment } from "react";
// import LoginUserInfoTop from "../components/LoginUserInfoTop";
import "../css/components/UserInfoElement.css";

function UserInfoElement({ Topic, Text }) {
  return (
    <Fragment>
      <div className="User-Info__Element__Topic">{Topic}</div>
      <div className="User-Info__Element__Text">{Text}</div>
    </Fragment>
  );
}

export default UserInfoElement;
