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
        <img
          src={process.env.PUBLIC_URL + `assets/helloemoji.png`}
          alt="사람 이미지"
          style={{
            width: "80%",
            height: "auto",
            paddingTop: "30px",
          }}
        />
        <div>
          <img
            src={process.env.PUBLIC_URL + `assets/logoblack.png`}
            alt="로고이미지"
            style={{
              width: "75%",
              height: "auto",
              marginTop: "20px",
            }}
          />
        </div>
        <TotalUsersCounter font_size="25px" />
        <h1>
          캠퍼스의 설렘,
          <br />
          코매칭에서 만나보세요!
        </h1>
        <h4>10초만에 빠른 가입</h4>
        <button onClick={handleLogin}>카카오 시작하기</button>
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
