import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import Footer from "../components/Footer";
import ComatHeader from "../components/ComatHeader";
import { numParticipantsState } from "../Atoms";
import "./MainpageLogin.css";
import { useNavigate } from "react-router-dom";

function MainpageLogin() {
  const navigate = useNavigate();
  const [numParticipants, setNumParticipants] =
    useRecoilState(numParticipantsState);

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

  const handleVisitInstagram = () => {
    window.open("https://www.instagram.com/cuk_coma", "_blank"); // "_blank"를 추가하여 새 창에서 열도록 설정
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
      <ComatHeader destination="/" buttonText="로그아웃" />
      <div className="login-content">
        <div
          className="login-name"
          style={{ fontSize: "40px", fontWeight: "bolder" }}
        >
          김규원님,
          <br />
          환영합니다.
        </div>
        <div
          className="myinfo"
          style={{ fontSize: "18px", fontWeight: "bolder" }}
        >
          my info
        </div>
        <div className="CheckresultItem">
          <div className="CheckresultTopline">
            <div className="CheckresultInlineItem">
              <div className="CheckresultTopic">전공</div>
              {/* <div className="CheckresultText">{item.year}</div> */}
              <div className="CheckresultText">정보통신전자공학부</div>
            </div>
            <div className="CheckresultInlineItem2">
              <div className="CheckresultTopic2">학번</div>
              {/* <div className="CheckresultText">{item.depart}</div> */}
              <div className="CheckresultText2">19</div>
            </div>
          </div>
          <div className="CheckresultInline">
            <div className="CheckresultInlineItem">
              <div className="CheckresultTopic">좋아하는 노래</div>
              {/* <div className="CheckresultText">{item.mbti}</div> */}
              <div className="CheckresultText">삐딱하게</div>
            </div>
            <div className="CheckresultInlineItem2">
              <div className="CheckresultTopic2">MBTI</div>
              {/* <div className="CheckresultText">{item.song}</div> */}
              <div className="CheckresultText2">ESTJ</div>
            </div>
          </div>
          <div className="CheckresultBottom">@kim.q1</div>
        </div>

        <div>
          <button className="matching-button" onClick={handleVisitmatch}>
            매칭하기 ▶
            <div
              /*</button>{numParticipants !== null && ( )} -- 요거 있으면 css 안보여서 */
              style={{
                fontSize: "15px",
                fontWeight: "w600",
                marginTop: "5px",
                fontWeight: "bolder",
              }}
            >
              현재{" "}
              <span style={{ color: "#FF4D61", fontWeight: "900" }}>
                {numParticipants}
              </span>
              102명 참여중이에요!
            </div>
          </button>
        </div>
        <div className="number-group">
          <button className="number-button" onClick={handleVisitLoading}>
            나의 매칭가능 횟수
            <div
              className="number-button-opport"
              style={{
                fontSize: "24px",
                fontWeight: "w600",
                marginTop: "5px",
                fontWeight: "bolder",
              }}
            >
              {" "}
              <span style={{ color: "#FF4D61", fontWeight: "900" }}>
                {numParticipants}
              </span>
              <div className="number-matching-group">
                1회
                <div className="number-charge">충전하기</div>
              </div>
            </div>
          </button>
        </div>
        <div className="button-group">
          <div>
            <button
              className="button-group-search"
              onClick={handleVisitcheckresult}
            >
              조회하기
            </button>
          </div>
          <div>
            <button
              className="button-group-guide"
              onClick={handleVisitInstagram}
            >
              COMAtching <br />
              가이드북
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MainpageLogin;
