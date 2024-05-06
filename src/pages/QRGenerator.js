import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import axios from "axios";
import HeaderNav from "../components/HeaderNav";
import "../css/pages/QRGenerator.css";

const QRGenerator = () => {
  const [hashCode, setHashCode] = useState("1111");

  // useEffect(() => {
  //   // 해시 코드를 받아오는 API 엔드포인트에 요청을 보냅니다.
  //   axios
  //     .get("https://onesons.site/admin/match/auth-code")
  //     .then((response) => {
  //       // 받아온 해시 코드를 상태에 저장합니다.
  //       setHashCode(response.data.hashcode);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching hash code:", error);
  //     });
  // }, []);

  return (
    <div className="container">
      <HeaderNav destination="/" buttonText="로그아웃" />
      <div className="QRGenerator">
        <QRCode value={`https://comatest.web.app/${hashCode}`} />
      </div>
    </div>
  );
};

export default QRGenerator;
