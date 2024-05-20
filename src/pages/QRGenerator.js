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
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://catholic-mibal.site/comatching/code-req/user",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        console.log(response);
        if (
          response.data.code === "SEC-001" ||
          response.data.code === "SEC-002"
        ) {
          localStorage.removeItem("token");
          navigate("/");
        } else if (response.status === 200) {
          setHashCode(response.data.data.match_code);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors if needed
      }
    };

    fetchData(); // Call the async function immediately
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
