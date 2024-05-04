import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import Footer from "../components/Footer";
import HeaderNav from "../components/HeaderNav";
import UserInfoRrev from "../components/UserInfoRrev";
import { userState } from "../Atoms";
import "../css/pages/MainpageLogin.css";
import { useNavigate } from "react-router-dom";
import TotalUsersCounter from "../components/TotalUsersCounter";
import BottomNavButton from "../components/BottomNavButton";
import MyInfoButton from "../components/MyInfoButton";

function MainpageLogin() {
  const navigate = useNavigate();
  const formData = useRecoilValue(userState);
  const [numParticipants, setNumParticipants] = useState(0);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await axios.get("https://onesons.site/participations");
        setNumParticipants(response.data);
      } catch (error) {
        console.error("Error fetching participants:", error);
      }
    };

    fetchParticipants();
  }, [setNumParticipants]);

  const handleVisitGuide = () => {
    navigate("/guide"); // "_blank"를 추가하여 새 창에서 열도록 설정
  };
  const handleVisitmatch = () => {
    navigate("/match"); // "_blank"를 추가하여 새 창에서 열도록 설정
  };
  const handleVisitLoading = () => {
    navigate("/Loading"); // "_blank"를 추가하여 새 창에서 열도록 설정
  };
  const handleVisitcheckresult = () => {
    navigate("/checkresult"); // "_blank"를 추가하여 새 창에서 열도록 설정
  };

  return (
    <div className="container">
      <HeaderNav destination="/" buttonText="로그아웃" />
      <div className="Mainpage__Login">
        <UserInfoRrev />
        <div>
          <button className="matching-button" onClick={handleVisitmatch}>
            AI 매칭하기 ▶
            <TotalUsersCounter font_size="15px" />
          </button>
        </div>
        <div className="button-group">
          <MyInfoButton
            imgSrc={`assets/point.svg`}
            infoText="100p"
            buttonText="잔여포인트"
          />
          <MyInfoButton
            imgSrc={`assets/heart.svg`}
            infoText="1회"
            buttonText="나를 뽑을 횟수"
          />
        </div>
        <div>부스에 충전 요청하기</div>
        <div className="button-group">
          <BottomNavButton
            onClick={handleVisitcheckresult}
            imgSrc={`assets/checkresult.svg`}
            imgText="조회버튼"
            buttonText="조회하기"
          />
          <BottomNavButton
            onClick={handleVisitGuide}
            imgSrc={`assets/guidebook.svg`}
            imgText="가이드북"
            buttonText="가이드북"
          />
        </div>
        <div className="button-group">
          <BottomNavButton
            onClick={handleVisitcheckresult}
            imgSrc={`assets/survey.svg`}
            imgText="설문조사"
            buttonText="설문조사"
          />
          <BottomNavButton
            onClick={handleVisitGuide}
            imgSrc={`assets/logout.svg`}
            imgText="로그아웃"
            buttonText="로그아웃"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MainpageLogin;
