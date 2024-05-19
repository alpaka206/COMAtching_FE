import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import "../css/components/TotalUsersCounter.css";

function TotalUsersCounter({ font_size, numParticipants }) {
  return (
    <Fragment>
      <div className="Total-Users-Counter" style={{ fontSize: font_size }}>
        현재 <span>{numParticipants}</span>명 참여중이에요!
      </div>
    </Fragment>
  );
}

export default TotalUsersCounter;
