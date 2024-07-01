// AdminRequestList.js

import React, { useEffect, useState } from "react";
import "../css/components/AdminRequestList.css";
import AdminRequestListContainer from "./AdminRequestListContainer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { adminRequests } from "../Atoms";

function AdminRequestList() {
  const navigate = useNavigate();
  const [requests, setRequests] = useRecoilState(adminRequests);
  useEffect(() => {
    // 초기 요청 목록 초기화
    setRequests([]);
    const fetchData = async () => {
      try {
        const response = await axios.get("/admin/manage/main");
        if (response.data.status === 200) {
          const updatedData = response.data.data.charge_request_info_list.map(
            (item) => ({
              ...item,
              isChecked: false,
            })
          );
          setRequests(updatedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors if needed
      }
    };

    fetchData();
  }, []);

  return (
    <div className="AdminRequestList">
      <div className="content">
        <div className="AdminRequestList-title">충전 요청 목록</div>
        <div className="AdminRequestList-text">
          유저로부터 이름, 아이디, 입금 내역 확인해서 그만큼 충전
        </div>
        <div className="AmdinRequestListBox">
          {requests.map(
            (request, index) =>
              !request.isChecked && (
                <AdminRequestListContainer
                  key={index}
                  request={request}
                  setRequests={setRequests}
                />
              )
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminRequestList;
