import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import "../css/components/TotalUsersCounter.css";
// 유저가 몇명인지 보여주기 위한 컴포넌트입니다.
function TotalUsersCounter({ font_size, numParticipants }) {
  // 페이지마다 fontsize가 달라서 사이즈를 불러오는 형식으로 진행하였습니다.
  return (
    <Fragment>
      <div className="Total-Users-Counter" style={{ fontSize: font_size }}>
        현재 <span>{numParticipants}</span>명 참여중이에요!
      </div>
    </Fragment>
  );
}

export default TotalUsersCounter;
