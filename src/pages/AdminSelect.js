// import React, { useState, useEffect } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/pages/AdminSelect.css";

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
