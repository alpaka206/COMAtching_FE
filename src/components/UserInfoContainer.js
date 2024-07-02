import React, { Fragment } from "react";
import UserInfoElement from "./UserInfoElement";
import "../css/components/UserInfoContainer.css";

function UserInfoContainer({
  FirstTopic,
  FirstText,
  SecoundTopic,
  SecondText,
}) {
  return (
    <Fragment>
      <div className="User-Info__Container">
        <div
          className={`User-Info__Container__First-Item ${
            FirstTopic === "취미" ? "User-Info__Container__Hobby" : ""
          }`}
        >
          <UserInfoElement Topic={FirstTopic} Text={FirstText} />
        </div>
        <div className="User-Info__Container__Second-Item">
          <UserInfoElement Topic={SecoundTopic} Text={SecondText} />
        </div>
      </div>
    </Fragment>
  );
}

export default UserInfoContainer;
