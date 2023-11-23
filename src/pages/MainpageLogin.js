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
      <ComatHeader destination="/" buttonText="처음으로" />
      <div className="login-content">
        <div style={{ fontSize: "24px", fontWeight: "bolder" }}>
          김규원님, 환영합니다.
        </div>
        <div className="CheckresultItem">
          <div className="CheckresultTopline">
            <div className="CheckresultInlineItem">
              <div className="CheckresultTopic">학번</div>
              {/* <div className="CheckresultText">{item.year}</div> */}
              <div className="CheckresultText">19</div>
            </div>
            <div className="CheckresultInlineItem">
              <div className="CheckresultTopic">학과</div>
              {/* <div className="CheckresultText">{item.depart}</div> */}
              <div className="CheckresultText">정보통신전자공학부</div>
            </div>
          </div>
          <div className="CheckresultInline">
            <div className="CheckresultInlineItem">
              <div className="CheckresultTopic">MBTI</div>
              {/* <div className="CheckresultText">{item.mbti}</div> */}
              <div className="CheckresultText">ESTJ</div>
            </div>
            <div className="CheckresultInlineItem">
              <div className="CheckresultTopic">좋아하는 노래</div>
              {/* <div className="CheckresultText">{item.song}</div> */}
              <div className="CheckresultText">삐딱하게</div>
            </div>
          </div>
          <div className="CheckresultBottom">@kim.q1</div>
        </div>

        <div>
          <button className="submit-button" onClick={handleVisitmatch}>
            매칭하기
            {numParticipants !== null && (
              <div
                style={{
                  fontSize: "25px",
                  fontWeight: "w600",
                  marginTop: "5px",
                }}
              >
                현재{" "}
                <span style={{ color: "#FF4D61", fontWeight: "900" }}>
                  {numParticipants}
                </span>
                명 참여중이에요!
              </div>
            )}
          </button>
        </div>
        <div>
          <button className="submit-button" onClick={handleVisitLoading}>
            기회추가
          </button>
        </div>
        <div className="button-group">
          <div>
            <button className="submit-button" onClick={handleVisitcheckresult}>
              조회하기
            </button>
          </div>
          <div>
            <button className="submit-button" onClick={handleVisitInstagram}>
              Comatching 가이드북
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MainpageLogin;
