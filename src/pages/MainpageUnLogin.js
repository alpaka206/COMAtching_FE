import React, { useEffect, useState } from "react";
import "../css/pages/MainpageUnLogin.css";
import HeaderNav from "../components/HeaderNav";
import Footer from "../components/Footer";
import TotalUsersCounter from "../components/TotalUsersCounter";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MainpageUnLogin() {
  const navigate = useNavigate();
  const [numParticipants, setNumParticipants] = useState(null);
  const handleLogin = () => {
    window.location.href =
      "https://catholic-mibal.site/oauth2/authorization/kakao";
  };

  const handleVisitGuide = () => {
    navigate("/guide");
  };

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "https://catholic-mibal.site/participation/count",
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        console.log(response);
        setNumParticipants(response.data.participation);
      } catch (error) {
        console.error("Error fetching participants:", error);
      }
    };

    fetchParticipants();
  }, [setNumParticipants]);
  return (
    <div className="container">
      <HeaderNav />
      <div className="content">
        <div className="bubble-counter">
          <TotalUsersCounter
            font_size="16px"
            numParticipants={numParticipants}
          />
        </div>
        <img
          src={process.env.PUBLIC_URL + `assets/helloemoji.svg`}
          alt="사람 이미지"
          style={{
            width: "80%",
            height: "auto",
            paddingTop: "30px",
          }}
          className="mainpage-unlogin-userimage"
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
            className="mainpage-unlogin-logoimage"
          />
        </div>

        <div className="welcome">
          캠퍼스의 설렘,
          <br />
          코매칭에서 만나보세요!
        </div>
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
