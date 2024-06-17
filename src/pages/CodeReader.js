import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { MatchPickState } from "../Atoms";
// QR 코드 인식을 위한 페이지 입니다.
const CodeReader = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(""); // QR 코드에서 읽은 데이터 상태 관리
  const [codeState, setCodeState] = useRecoilState(MatchPickState); // Recoil 상태 관리 훅 사용

  // 서버로 해시 코드를 보내는 함수
  const sendHashCode = async (hashCode) => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `https://catholic-mibal.site/comatching/code-req/admin?code=${hashCode}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    if (
      response.data.code[0] === "SEC-001" ||
      response.data.code[0] === "SEC-002"
    ) {
      localStorage.removeItem("token");

      navigate("/");
    } else if (response.data.status === 200) {
      // 코드 상태 업데이트
      setCodeState((prev) => ({
        ...prev,
        balance: response.data.data.currentPoint,
        formData: {
          ...prev.formData,
          match_code: hashCode,
        },
      }));
      navigate("/match");
    } else {
      throw new Error("Unexpected response code or status");
    }
  };

  // 데이터에서 hashCode를 추출하는 함수
  const extractHashCode = (data) => {
    const match = data.match(/https:\/\/cuk-comatching\.web\.app\/(\w+)/);
    if (match && match.length > 1) {
      return match[1];
    }
    return null;
  };
  return (
    <div className="container">
      <div className="content">
        {/* 카메라로 QR 코드를 읽는 컴포넌트 */}
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
        {/* 읽은 데이터 표시(서비스시 qr이 제대로 오는지, 인식을 했는지, 인터넷이 안되는건지 확인하기 위함) */}
        <p>{data}</p>
      </div>
    </div>
  );
};

export default CodeReader;
