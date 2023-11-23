import React from "react";
import ComatHeader from "../components/ComatHeader";
import Footer from "../components/Footer";
import { useRecoilValue } from "recoil";
import { MatchResultRecoilState } from "../Atoms";
import "./Matchresult.css";
import { useNavigate } from "react-router-dom";

function Matchresult() {
  const MatchResult = useRecoilValue(MatchResultRecoilState);
  const isPhoneNumberStartsWith010 =
    MatchResult.generatedPhone &&
    MatchResult.generatedPhone.slice(0, 3) === "010";
  return (
    <div className="container">
      <ComatHeader destination="/" buttonText="처음으로" />
      <div className="content">
        {MatchResult.generatedCode === 2002 ? (
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: "24px" }}>
              이성이 데이터에 한명도 없습니다
            </span>
          </div>
        ) : (
          <div>
            <div className="MatchresultTop">COMAtching 결과!</div>
            <div className="MatchresultTopic">| 전공</div>
            <div className="MatchresultText">{MatchResult.generatedDepart}</div>
            <div className="MatchresultTopic">| 학번</div>
            <div className="MatchresultText">{MatchResult.generatedYear}</div>
            <div className="MatchresultTopic">| 좋아하는 노래</div>
            <div className="MatchresultText">{MatchResult.generatedSong}</div>
            <div className="MatchresultTopic">| 상대방의 MBTI</div>
            <div className="MatchresultMbtitext">
              {MatchResult.generatedMbti}{" "}
              {MatchResult.generatedCode === 2001 && (
                <span style={{ fontSize: "15px", color: "#FF775E" }}>
                  조건에 맞는 상대가 없어서 랜덤으로 매칭되었어요!
                </span>
              )}
              {MatchResult.generatedCode !== 2001 && <span> </span>}
            </div>
            {isPhoneNumberStartsWith010 ? (
              <div className="MatchresultInstaTopic">Phone_number</div>
            ) : (
              <div className="MatchresultInstaTopic">Instagram</div>
            )}
            <div className="MatchresultInstaText">
              {MatchResult.generatedPhone}
            </div>
            <div className="MatchresultBottom">
              comatching.result(you, partner);
            </div>
          </div>
        )}{" "}
      </div>
      <Footer />
    </div>
  );
}

export default Matchresult;
