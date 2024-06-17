// import React, { useState, useEffect } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/pages/AdminSelect.css";
// 충전 페이지로 갈지 뽑기 페이지로 갈지 선택하는 페이지입니다.
function AdminSelect() {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="content">
        <div className="AdminLogin" onClick={() => navigate("/admin")}>
          관리자 페이지
        </div>
        <div className="AdminLogin" onClick={() => navigate("/code-reader")}>
          뽑기페이지
        </div>
      </div>
    </div>
  );
}

export default AdminSelect;
