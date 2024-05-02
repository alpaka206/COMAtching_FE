import React from "react";
import "../css/pages/MainpageUnLogin.css";
import HeaderNav from "../components/HeaderNav";
import Footer from "../components/Footer";
import TotalUsersCounter from "../components/TotalUsersCounter";
import { useNavigate } from "react-router-dom";
import Kakao from "../data/Kakaokey";
function MainpageUnLogin() {
  const navigate = useNavigate();

  const handleLogin = () => {
    window.location.href = Kakao.kakaoURL;
  };

  const handleVisitGuide = () => {
    navigate("/guide");
  };

  return (
    <div className="container">
      <HeaderNav destination="/" buttonText="처음으로" />
      <div className="content">
        <div className="bubble-counter">
          <TotalUsersCounter font_size="16px" />
        </div>
        <img
          src={process.env.PUBLIC_URL + `assets/helloemoji.svg`}
          alt="사람 이미지"
          style={{
            width: "80%",
            height: "auto",
            paddingTop: "30px",
          }}
        />
        <div>
          <img
            src={process.env.PUBLIC_URL + `assets/logoblack.svg`}
            alt="로고이미지"
            style={{
              width: "75%",
              height: "auto",
              marginTop: "20px",
            }}
          />
        </div>

        <h1>
          캠퍼스의 설렘,
          <br />
          코매칭에서 만나보세요!
        </h1>
        <div className="bubble">⚡️10초만에 빠른 가입⚡️</div>
        <button className="kakao-login" onClick={handleLogin}>
          <div className="kakao-login-element">
            <img
              src={process.env.PUBLIC_URL + `assets/kakao.svg`}
              alt="카카오"
            />
            <p>카카오로 시작하기</p>
          </div>
        </button>
        <div className="help-text">이용에 도움이 필요하신가요?</div>
        <div>
          <button className="privacy-button" onClick={handleVisitGuide}>
            서비스 이용법 안내
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MainpageUnLogin;
