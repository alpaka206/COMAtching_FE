import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import Footer from "../components/Footer";
import HeaderNav from "../components/HeaderNav";
import UserInfoRrev from "../components/UserInfoRrev";
import { charge, userState } from "../Atoms";
import "../css/pages/MainpageLogin.css";
import { useNavigate } from "react-router-dom";
import TotalUsersCounter from "../components/TotalUsersCounter";
import BottomNavButton from "../components/BottomNavButton";
import MyInfoButton from "../components/MyInfoButton";
import ChargeButtonInfo from "../components/ChargeButtonInfo";

function MainpageLogin() {
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅 사용
  const [isClicked, setIsClicked] = useState(false); // 충전 요청 토글 클릭 상태를 저장하는 상태 변수
  const [userInfo, setUserInfo] = useState({
    numParticipants: null,
    leftPoint: null,
    Pickme: null,
    major: null,
    age: null,
    contact_id: null,
    contact_frequency: null,
    mbti: null,
    hobby: [],
    song: null,
    comment: null,
  });
  // 충전 요청 상태를 관리하는 Recoil 상태(너무 자주 못누르게 하기 위해서 임시방편이였습니다. 회의를 통해 방식 수정이 필요합니다)
  const [chargeclick, setchargeclick] = useRecoilState(charge);
  const handleToggleClick = () => {
    setIsClicked((prevIsClicked) => !prevIsClicked);
  };

  // 사용자 정보를 가져오는 비동기 함수

  useEffect(() => {
    // 컴포넌트가 마운트될 때 API 요청을 보냄
    const fetchData = async () => {
      try {
        const response = await axios.get("/account/user/main");
        if (response.status === 200) {
          setUserInfo((prev) => ({
            ...prev,
            numParticipants: response.data.data.participation,
            leftPoint: response.data.data.left_point,
            Pickme: response.data.data.pick_me,
            major: response.data.data.major,
            age: response.data.data.age,
            contact_id: response.data.data.contact_id,
            contact_frequency: response.data.data.contact_frequency,
            mbti: response.data.data.mbti,
            hobby: response.data.data.hobby_list,
            song: response.data.data.song,
            comment: response.data.data.comment,
          }));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []); // 빈배열 이므로 한번만 실행

  const handleNotService = () => {
    alert("서비스가 종료되었습니다.");
  };
  const handleVisitGuide = () => {
    navigate("/guide");
  };
  const handleClickmatch = () => {
    navigate("/QR-generator");
  };
  const handleVisitcheckresult = () => {
    navigate("/check-result");
  };
  const handleLogout = () => {
    localStorage.removeItem("token");

    // 쿠키 삭제인데 지금보면 필요없어 보이긴합니다.
    document.cookie.split(";").forEach((cookie) => {
      const [name] = cookie.split("=");
      document.cookie = `${name.trim()}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    });

    window.location.reload();
  };

  // 충전 요청
  const handleChargeRequest = async () => {
    const response = await axios.get("/user/charge/request");
    setchargeclick({
      chargeclick: true, // 클릭된 것으로 상태 변경, 클릭시 관리자 페이지에 뜹니다.
    });
    if (response.data.code === "CHR-001") {
      alert("이미 요청되었습니다."); // 이미 요청된 경우 알림
    }
  };
  return (
    <div className="container">
      <HeaderNav />
      <div className="Mainpage__Login">
        <UserInfoRrev
          user={userInfo}
          // ifMainpage={true}
          numParticipants={userInfo.numParticipants}
        />
        <div
          //onClick={handleClickmatch}
          onClick={handleNotService}
        >
          <button className="matching-button">
            AI 매칭하기 ▶
            <TotalUsersCounter
              font_size="15px"
              numParticipants={userInfo.numParticipants}
            />
          </button>
        </div>
        <div className="button-group">
          <MyInfoButton
            imgSrc={`assets/point.svg`}
            infoText={`${userInfo.leftPoint}P`}
            buttonText="잔여포인트"
          />
          <MyInfoButton
            imgSrc={`assets/heart.svg`}
            infoText={`${userInfo.Pickme}회`}
            buttonText="내가 뽑힐 횟수"
          />
        </div>

        {isClicked ? (
          <ChargeButtonInfo
            handleNotService={handleNotService}
            handleChargeRequest={handleChargeRequest}
            chargeclick={chargeclick}
          />
        ) : (
          <div className="charge-request-unclicked">
            💁 부스에 충전 요청하기
            <button
              className="charge-request-unclicked-img"
              type="button"
              //onClick={handleToggleClick}
              onClick={handleNotService}
            >
              <img
                src={process.env.PUBLIC_URL + `assets/arrowbottom.svg`}
                alt="충전요청 열기"
              />
            </button>
          </div>
        )}

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
            onClick={handleLogout}
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
