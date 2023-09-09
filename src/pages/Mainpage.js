import React, { useState } from "react";
import "./Mainpage.css";

function MainPage() {
  const [isChecked, setIsChecked] = useState(false);
  const [showAgreement, setShowAgreement] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleAgreementClick = () => {
    setShowAgreement(true);
  };
  const handleCloseAgreement = () => {
    setShowAgreement(false);
  };

  const handleSubmit = () => {
    if (isChecked) {
      // 제출 로직을 작성하세요.
    } else {
      alert("개인정보 수집 동의에 체크해주세요.");
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div>
          <img
            src={process.env.PUBLIC_URL + `assets/logowhite.png`}
            alt="로고"
            style={{ width: "142px", height: "auto", marginLeft: "24px" }}
          />
        </div>
        <button
          style={{
            backgroundColor: "#ff4d61",
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
        >
          조회하기
        </button>
      </div>
      <div className="content">
        <img
          src={process.env.PUBLIC_URL + `assets/helloemoji.png`}
          alt="사람 이미지"
          style={{
            width: "80%",
            height: "auto",
            paddingTop: "50px",
          }}
        />
        <div>
          <img
            src={process.env.PUBLIC_URL + `assets/logoblack.png`}
            alt="로고이미지"
            style={{
              width: "75%",
              height: "auto",
              marginTop: "30px",
            }}
          />
        </div>
        <div className="checkbox-label">
          <label
            style={{
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            개인정보 수집 및 이용에 대해 동의합니다
          </label>
        </div>
        <div>
          <button className="privacy-button" onClick={handleAgreementClick}>
            개인정보 수집 활용 동의서
          </button>
        </div>
        {showAgreement && (
          <div className="agreement-box">
            <p
              style={{
                textAlign: "left",
              }}
            >
              개인정보 수집 안내
              <br />
              <br /> 1. 개인정보 수집 목적
              <br />
              - 가톨릭대학교 중앙동아리 COMA는 다음 목적을 위해 개인정보를
              수집합니다:
              <br />
              &nbsp; - 총동아리연합회 주관 다맛제 노점 COMA의 이벤트인
              COMAtching의 참여
              <br />
              <br />
              2. 수집하는 개인정보 항목 * 수집하는 개인정보 항목은 다음과
              같습니다: <br />
              &nbsp;* 인적사항 <br />
              &nbsp; &nbsp;* 성명, 학번, 연락처 <br />
              <br />
              3. 개인정보 제 3자 제공 <br />
              &nbsp;* 수집한 개인정보는 다음 3자에게 정보가 제공됩니다: <br />
              &nbsp; &nbsp;* COMAtching 참여자 <br />
              4. 개인정보 보유 및 이용기간 <br />
              <br />
              &nbsp;2023년 9월 14일 16시 30분까지
              <br />
              <br /> * 개인정보는 수집 및 이용목적이 달성되면 지체 없이
              파기됩니다. 다만, 관련 법규에 따라 보존할 필요가 있는 경우에는
              해당 기간 동안 안전하게 보관됩니다. <br />
              <br /> 5. 개인정보 수집 거부권 * 개인정보의 수집은 자발적으로
              제공하실 수 있으며, 수집에 동의하지 않을 권리가 있습니다. 다만,
              일부 정보를 제공하지 않을 경우 가톨릭대 중앙동아리 COMA의 일부
              서비스를 이용할 수 없을 수 있습니다. <br />
              <br /> 6. 개인정보 관련 문의 및 민원처리 <br />* 개인정보 수집과
              관련한 문의사항이나 민원은 다음으로 문의해 주시기 바랍니다: <br />
              &nbsp;* 최고 정보 관리 책임자 : 가톨릭대학교 중앙동아리 COMA
              <br /> &nbsp;* 개인정보보호책임자 : 가톨릭대학교
              정보통신전자공학부 19학번 박승원 <br />
              &nbsp;* 개인정보 수집 및 이용 주체 : 가톨릭대학교 중앙 IT동아리
              COMA <br />
              <br />
              7. 개인정보 수집 및 이용 동의 * 본인은 개인정보 수집 및 이용에
              대해 동의합니다.
            </p>
            <button className="cancel-button" onClick={handleCloseAgreement}>
              닫기
            </button>
          </div>
        )}
        <div>
          <button className="submit-button" onClick={handleSubmit}>
            시작하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
