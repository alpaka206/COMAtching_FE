import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import axios from "axios";
import "../css/pages/CodeReader.css";
import { useNavigate } from "react-router-dom";

const CodeReader = () => {
  const navigate = useNavigate();
  const [data, setData] = useState("");

  const sendHashCode = (hashCode) => {
    // 추출된 hashCode를 사용하여 새로운 URL로 요청을 보냅니다.
    axios
      .post("https://onesons.site/user/match/auth", { hashCode })
      .then((response) => {
        console.log(response.data);
        navigate("/match");
      })
      .catch((error) => {
        console.error("Error sending hash code:", error);
      });
  };

  // 데이터에서 hashCode를 추출하는 함수
  const extractHashCode = (data) => {
    const match = data.match(/https:\/\/comatest\.web\.app\/makecode\/(\w+)/);
    if (match && match.length > 1) {
      return match[1];
    }
    return null;
  };
  return (
    <>
      <QrReader
        key="environment"
        constraints={{ facingMode: "environment" }}
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
            // 데이터에서 hashCode 추출
            const hashCode = extractHashCode(result.text);
            // 추출된 hashCode가 있을 경우 요청 보냄
            if (hashCode) {
              sendHashCode(hashCode);
            }
          }

          if (!!error) {
            console.info(error);
          }
        }}
        style={{ width: "100%", height: "100%" }}
      />
      <p>{data}</p>
    </>
  );
};

export default CodeReader;
