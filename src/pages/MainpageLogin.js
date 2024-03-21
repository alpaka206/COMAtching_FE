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
            매칭하기 ▶
            <TotalUsersCounter font_size="15px" />
          </button>
        </div>
        <div className="number-button">
          <div className="number-text">나의 매칭가능 횟수</div>
          <div className="number-bottom">
            <span className="number-text2">{formData.chance}</span>
            <button className="number-charge" onClick={handleVisitLoading}>
              충전하기
            </button>
          </div>
        </div>
        <div className="button-group">
          <BottomNavButton
            onClick={handleVisitcheckresult}
            imgSrc={`assets/main_search.png`}
            imgText="조회버튼"
            buttonText="조회하기"
          />
          <BottomNavButton
            onClick={handleVisitGuide}
            imgSrc={`assets/main_guide.png`}
            imgText="가이드북"
            buttonText="COMAtching 가이드북"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MainpageLogin;
