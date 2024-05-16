import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import axios from "axios";
import HeaderNav from "../components/HeaderNav";
import "../css/pages/QRGenerator.css";
import { useNavigate } from "react-router-dom";

const QRGenerator = () => {
  const navigate = useNavigate();
  const [hashCode, setHashCode] = useState("testcode");

  useEffect(() => {
    axios
      .get("http://13.54.41.253:8080/comatching/code-req/user")
      .then((response) => {
        // 받아온 해시 코드를 상태에 저장합니다.
        setHashCode(response.data.match_code);
      })
      .catch((error) => {
        console.error("Error fetching hash code:", error);
      });
  }, []);

  return (
    <div className="container">
      <HeaderNav />
      <div className="content">
        <div className="QRGenerator">
          <QRCode value={`https://comatest.web.app/${hashCode}`} />
        </div>
        <button className="QRGenerator-Button" onClick={() => navigate("/")}>
          코매칭 시작하기!
        </button>
      </div>
    </div>
  );
};

export default QRGenerator;
