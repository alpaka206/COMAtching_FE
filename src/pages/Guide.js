import React, { useEffect } from "react";
import axios from "axios";
import "./Guide.css";
import HeaderNav from "../components/HeaderNav";
import Footer from "../components/Footer";
// import AgreementBox from "../components/AgreementBox";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
function Guide() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <HeaderNav destination="/" buttonText="처음으로" />
      <div className="content">
        <div className="inner-content">
          <div className="title">
            <div className="title-text">Guidebook</div>
            <div className="title-inst-txt">COMAtching 설명 가이드</div>
          </div>
          <div className="guide-body">
            <img
              className="guide-img"
              src={process.env.PUBLIC_URL + `assets/guide1.png`}
              alt="가이드 이미지1"
              style={{
                width: "40%",
                height: "auto",
                paddingTop: "30px",
              }}
            />
            <div
              className="guide-text"
              style={{
                width: "55%",
                height: "auto",
              }}
            >
              <span className="guide-text-title">메인 화면</span>
              <br></br>
              <span className="guide-text-body">
                하단의 ‘시작하기'를 눌러 로그인 해주세요.<br></br>
                <br></br>
                우측 상단의 ‘로그인'을 누르셔도 돼요!
              </span>
            </div>
          </div>
          <div className="guide-body">
            <img
              className="guide-img"
              src={process.env.PUBLIC_URL + `assets/guide2.png`}
              alt="가이드 이미지2"
              style={{
                width: "40%",
                height: "auto",
                paddingTop: "30px",
              }}
            />
            <div
              className="guide-text"
              style={{
                width: "55%",
                height: "auto",
              }}
            >
              <span className="guide-text-title">로그인</span>
              <br></br>
              <span className="guide-text-body">
                처음 이용하시는 분은 하단의 "회원 가입"을 눌러주세요!
                <br></br>
                <br></br>
                이미 회원이시라면 로그인 후 STEP 4)를 참고해 주세요.
              </span>
            </div>
          </div>
          <div className="guide-body">
            <img
              className="guide-img"
              src={process.env.PUBLIC_URL + `assets/guide3.png`}
              alt="가이드 이미지3"
              style={{
                width: "40%",
                height: "auto",
                paddingTop: "30px",
              }}
            />
            <div
              className="guide-text"
              style={{
                width: "55%",
                height: "auto",
              }}
            >
              <span className="guide-text-title">회원 가입</span>
              <br></br>
              <span className="guide-text-body">
                본인의 이메일 입력 후 "인증번호 전송"을 눌러 주세요.
                <br></br>
                <br></br>
                입력한 이메일 수신함에 도착한 인증번호를 입력해주세요. <br></br>
                <br></br>
                특수문자 포함 6자리 이상인 비밀번호를 입력한 후, <br></br>
                <br></br>
                개인정보 수집 동의서를 꼭! 체크 해주세요. <br></br>
                <br></br>
              </span>
            </div>
          </div>
          <div className="guide-body">
            <img
              className="guide-img"
              src={process.env.PUBLIC_URL + `assets/guide4.png`}
              alt="가이드 이미지4"
              style={{
                width: "40%",
                height: "auto",
                paddingTop: "30px",
              }}
            />
            <div
              className="guide-text"
              style={{
                width: "55%",
                height: "auto",
              }}
            >
              <span className="guide-text-title">본인 정보 입력</span>
              <br></br>
              <span className="guide-text-body">
                본인의 전공, 학번을 입력해주세요.<br></br>
                <br></br>
                Instagram 혹은 전화번호를 입력해 주세요. 입력 후에는 ‘확인'
                버튼으로 중복 체크를 꼭 해주세요!<br></br>
                <br></br>
                본인의 취향이 드러날 수 있는 노래를 선택 해주세요. 특수문자는
                입력할 수 없습니다.<br></br>
                <br></br>
                마지막으로, 본인의 성별과 MBTI를 입력해 주세요.
              </span>
            </div>
          </div>
          <div className="guide-body">
            <img
              className="guide-img"
              src={process.env.PUBLIC_URL + `assets/guide5.png`}
              alt="가이드 이미지5"
              style={{
                width: "40%",
                height: "auto",
                paddingTop: "30px",
              }}
            />
            <div
              className="guide-text"
              style={{
                width: "55%",
                height: "auto",
              }}
            >
              <span className="guide-text-title">대시 보드</span>
              <br></br>
              <span className="guide-text-body">
                ‘매칭하기'를 눌러 원하는 사람과 매칭할 수 있습니다.<br></br>
                <br></br>
                매칭 가능 횟수만큼 매칭할 수 있어요. ‘충전하기’를 눌러
                관리자에게 충전 요청을 보냅니다.<br></br>
                <br></br>
                이후 관리자가 결제 내역을 확인하고, 충전이 완료됩니다.
                <br></br>
                <br></br>
                ‘조회하기'를 눌러 자신이 매칭했던 상대 정보를 확인할 수
                있습니다.
              </span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Guide;
