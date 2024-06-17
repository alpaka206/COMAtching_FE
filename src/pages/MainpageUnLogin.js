import React, { useEffect, useState } from "react";
import "../css/pages/MainpageUnLogin.css";
import HeaderNav from "../components/HeaderNav";
import Footer from "../components/Footer";
import TotalUsersCounter from "../components/TotalUsersCounter";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// 로그인 되지 않은 메인페이지입니다.
function MainpageUnLogin() {
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅 사용
  const [numParticipants, setNumParticipants] = useState(null); // 참가자 수를 저장할 상태 변수

  // 카카오 로그인 핸들러
  // 일반적인 형식과 다를텐데 아래 링크로 이동시켜서 백엔드에서 카카오 로그인을 처리한뒤
  // Redirection페이지로 옮겨서 role을 확인하는 과정을 거쳤습니다.
  const handleLogin = () => {
    window.location.href =
      "https://catholic-mibal.site/oauth2/authorization/kakao";
  };

  // 서비스 이용법 안내 페이지로 이동하는 핸들러
  const handleVisitGuide = () => {
    navigate("/guide");
  };

  // 참가자 수를 가져오는 비동기 함수
  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        // 로컬 스토리지에서 토큰을 가져옴
        const token = localStorage.getItem("token");
        // 서버에서 참가자 수를 가져오는 API 호출
        const response = await axios.get(
          "https://catholic-mibal.site/participation/count",
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        // 참가자 수를 상태 변수에 설정
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
        {/* 이미지가 컴퓨터로 봤을때 너무 크게 유지되어서 고쳐도 좋을것 같습니다. */}
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
        {/* <div className="bubble">26일 자정까지 조회하기만 가능합니다!</div> */}
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
