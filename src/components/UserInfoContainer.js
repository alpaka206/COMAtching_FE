import React, { Fragment } from "react";
import UserInfoElement from "../components/UserInfoElement";
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
        <div className="User-Info__Container__First-Item">
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
