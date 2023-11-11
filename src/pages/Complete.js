import React from "react";
import Footer from "../components/Footer";
import ComatHeader from "../components/ComatHeader";
import "./Complete.css";
import { useLocation } from "react-router-dom";

function Complete() {
  const location = useLocation();
  const generatedPassword = location.state?.generatedPassword;

  const handleVisitInstagram = () => {
    window.open("https://www.instagram.com/cuk_coma", "_blank"); // "_blank"를 추가하여 새 창에서 열도록 설정
  };

  return (
    <div className="container">
      <ComatHeader destination="/" buttonText="처음으로" />
      <div className="content">
        <img
          src={`${process.env.PUBLIC_URL}/assets/completeimage.png`} // 수정된 이미지 경로
          alt="사람 이미지"
          style={{
            width: "80%",
            height: "auto",
            paddingTop: "50px",
          }}
        />
        <div style={{ fontSize: "24px", fontWeight: "bolder" }}>
          등록이 완료 되었습니다
        </div>
        <div
          style={{ fontSize: "32px", fontWeight: "bolder", marginTop: "10px" }}
        >
          나의 코드 : {generatedPassword}
        </div>
        <div
          style={{
            fontSize: "14px",
            fontWeight: "bolder",
            color: "#FF4D61",
            marginTop: "10px",
          }}
        >
          코드를 잃어버리면 당일 매칭이 어려울 수도 있어요
          <br /> 캡처 및 메모 필수!!
        </div>
        <div
          style={{
            fontSize: "14px",
            fontWeight: "bolder",
            marginTop: "20px",
          }}
        >
          코마 부스에서 매칭하고, 원하는 상대를 찾아보세요!
          <br />
          <br /> 스테파노 광장 바로 앞 코마 부스에서 만나요!
        </div>
        <div>
          <button className="submit-button" onClick={handleVisitInstagram}>
            COMA 인스타그램 방문하기
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Complete;
