import React, { Fragment } from "react";
import "../css/components/UserInfoElement.css";

function UserInfoElement({ Topic, Text }) {
  return (
    <Fragment>
      <div className="User-Info__Element__Topic">{Topic}</div>
      <div className="User-Info__Element__Text User-Info__Element__Text-hobby">
        {Array.isArray(Text) ? (
          <div className="User-Info__Element__Items">
            {Text.map((item, index) => (
              <Fragment key={index}>
                <span className="User-Info__Element__Item">{item}</span>
                {index !== Text.length - 1 && ","}
              </Fragment>
            ))}
          </div>
        ) : (
          Text
        )}
      </div>
    </Fragment>
  );
}

export default UserInfoElement;
