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

function MainpageLogin() {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
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
  const [chargeclick, setchargeclick] = useRecoilState(charge);
  const handleToggleClick = () => {
    setIsClicked((prevIsClicked) => !prevIsClicked);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://catholic-mibal.site/account/user/main",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (
          response.data.code === "SEC-001" ||
          response.data.code === "SEC-002"
        ) {
          localStorage.removeItem("token");
        } else if (response.status === 200) {
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
        // Handle errors if needed
      }
    };

    fetchData(); // Call the async function immediately
  }, []); // Empty dependency array means this effect runs only once, similar to componentDidMount

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
    // Remove token from localStorage
    localStorage.removeItem("token");

    // Clear all cookies
    document.cookie.split(";").forEach((cookie) => {
      const [name] = cookie.split("=");
      document.cookie = `${name.trim()}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    });

    // Navigate to the home page
    window.location.reload();
  };
  const handleChargeRequest = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      "https://catholic-mibal.site/user/charge/request",
      {
        headers: {
          Authorization: token,
        },
      }
    );
    setchargeclick({
      chargeclick: true,
    });
    if (response.data.code === "SEC-001" || response.data.code === "SEC-002") {
      localStorage.removeItem("token");
    } else if (response.data.code === "CHR-001") {
      alert("이미 요청되었습니다.");
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
          <div className="charge-request-clicked">
            <div className="charge-request-clicked-top">
              💁 부스에 충전 요청하기
              <button
                className="charge-request-clicked-img"
                type="button"
                //onClick={handleToggleClick}
                onClick={handleNotService}
              >
                <img
                  src={process.env.PUBLIC_URL + `assets/arrowup.svg`}
                  alt="충전요청 닫기"
                />
              </button>
            </div>
            <li className="charge-request-clicked-text">
              입금 후 포인트 충전을 원하거나
            </li>
            <li className="charge-request-clicked-text">
              포인트를 PickMe로 바꾸고 싶을때 버튼을 눌러 주세요
            </li>
            <li className="charge-request-clicked-text">
              요청 후에는 입금 화면과 아이디를 보여 주세요.
            </li>
            <li className="charge-request-clicked-text">
              버튼 남용 시 이용이 제한될 수 있으니 유의 바랍니다.
            </li>
            <button
              className="charge-request-clicked-button"
              onClick={handleChargeRequest}
              disabled={chargeclick.chargeclick}
            >
              충전 요청하기
            </button>
          </div>
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
