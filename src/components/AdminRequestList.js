// AdminRequestList.js

import React from "react";
import "../css/components/AdminRequestList.css";
import AdminRequestListContainer from "./AdminRequestListContainer";

function AdminRequestList() {
  // 요청 정보 배열 생성
  const requests = [
    { userID: "winterizcoming_", reqTime: "23:09:00", userPoint: 1000 },
    { userID: "rodo_sangjun", reqTime: "23:19:00", userPoint: 3000 },
    { userID: "oxqnd_", reqTime: "23:29:00", userPoint: 8000 },
    { userID: "ssj_leadpay", reqTime: "23:39:00", userPoint: 5000 },
    { userID: "kim.q.1", reqTime: "23:49:00", userPoint: 10000 },
    { userID: "kim.q.1", reqTime: "23:49:00", userPoint: 10000 },
    { userID: "kim.q.1", reqTime: "23:49:00", userPoint: 10000 },
    { userID: "kim.q.1", reqTime: "23:49:00", userPoint: 10000 },
  ];

  return (
    <div className="AdminRequestList">
      <div className="content">
        <div className="AdminRequestList-title">충전 요청 목록</div>
        <div className="AdminRequestList-text">
          유저로부터 이름, 아이디, 입금 내역 확인해서 그만큼 충전
        </div>
        <div className="AmdinRequestListBox">
          {/* map 함수를 사용하여 각 요청 정보를 처리 */}
          {requests.map((request, index) => (
            <AdminRequestListContainer
              key={index}
              userID={request.userID}
              reqTime={request.reqTime}
              userPoint={request.userPoint}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminRequestList;
