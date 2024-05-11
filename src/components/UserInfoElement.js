import React, { Fragment } from "react";
// import LoginUserInfoTop from "../components/LoginUserInfoTop";
import "../css/components/UserInfoElement.css";

function UserInfoElement({ Topic, Text }) {
  return (
    <Fragment>
      <div className="User-Info__Element__Topic">{Topic}</div>
      <div className="User-Info__Element__Text User-Info__Element__Text-hobby">
        {Array.isArray(Text)
          ? Text.map((item, index) => (
              <Fragment key={index}>
                {item}
                {index !== Text.length - 1 && ", "}
              </Fragment>
            ))
          : Text}
      </div>
    </Fragment>
  );
}

export default UserInfoElement;
