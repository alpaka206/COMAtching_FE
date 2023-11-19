import React from "react";
import ComatHeader from "../components/ComatHeader";
import Footer from "../components/Footer";
import { useRecoilValue } from "recoil";
import { mcaotmcapResultState } from "./atoms";
import "./Mcaotmcapresult.css";

function Mcaotmcapresult() {
  const mcaotmcapResult = useRecoilValue(mcaotmcapResultState);
  const isPhoneNumberStartsWith010 =
    mcaotmcapResult.generatedPhone &&
    mcaotmcapResult.generatedPhone.slice(0, 3) === "010";
  return (
    <div className="container">
      <ComatHeader destination="/" buttonText="처음으로" />
      <div className="content">
        {mcaotmcapResult.generatedCode === 2002 ? (
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: "24px" }}>
              이성이 데이터에 한명도 없습니다
            </span>
          </div>
        ) : (
          <div>
            <div className="McaotmcapresultTop">COMAtching 결과!</div>
            <div className="McaotmcapresultTopic">| 전공</div>
            <div className="McaotmcapresultText">
              {mcaotmcapResult.generatedDepart}
            </div>
            <div className="McaotmcapresultTopic">| 학번</div>
            <div className="McaotmcapresultText">
              {mcaotmcapResult.generatedYear}
            </div>
            <div className="McaotmcapresultTopic">| 좋아하는 노래</div>
            <div className="McaotmcapresultText">
              {mcaotmcapResult.generatedSong}
            </div>
            <div className="McaotmcapresultTopic">| 상대방의 MBTI</div>
            <div className="McaotmcapresultMbtitext">
              {mcaotmcapResult.generatedMbti}{" "}
              {mcaotmcapResult.generatedCode === 2001 && (
                <span style={{ fontSize: "15px", color: "#FF775E" }}>
                  조건에 맞는 상대가 없어서 랜덤으로 매칭되었어요!
                </span>
              )}
              {mcaotmcapResult.generatedCode !== 2001 && <span> </span>}
            </div>
            {isPhoneNumberStartsWith010 ? (
              <div className="McaotmcapresultInstaTopic">Phone_number</div>
            ) : (
              <div className="McaotmcapresultInstaTopic">Instagram</div>
            )}
            <div className="McaotmcapresultInstaText">
              {mcaotmcapResult.generatedPhone}
            </div>
            <div className="McaotmcapresultBottom">
              comatching.result(you, partner);
            </div>
          </div>
        )}{" "}
      </div>
      <Footer />
    </div>
  );
}

export default Mcaotmcapresult;
