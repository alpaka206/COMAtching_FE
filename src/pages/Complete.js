import React from "react";
import "./Complete.css";
import { useLocation, useNavigate } from "react-router-dom";

function Complete() {
  const navigate = useNavigate();
  const location = useLocation();
  const generatedPassword = location.state?.generatedPassword;

  const handleVisitInstagram = () => {
    window.open("https://www.instagram.com/cuk_coma", "_blank"); // "_blank"를 추가하여 새 창에서 열도록 설정
  };

  return (
    <div className="container">
      <div className="header">
        <div>
          <img
            src={`${process.env.PUBLIC_URL}/assets/logowhite.png`} // 수정된 이미지 경로
            alt="로고"
            style={{ width: "142px", height: "auto", marginLeft: "24px" }}
          />
        </div>
        <button
          className="look-button"
          style={{
            width: "98px",
            height: "29px",
            marginRight: "24px",
            borderRadius: "15px",
            textAlign: "center",
            color: "#ffffff",
            fontSize: "16px",
            fontWeight: "bold",
            paddingTop: "4px",
          }}
          onClick={() => navigate("/Error")}
        >
          조회하기
        </button>
      </div>
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
    </div>
  );
}

export default Complete;
