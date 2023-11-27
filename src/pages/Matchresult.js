import React from "react";
import axios from "axios";

import ComatHeader from "../components/ComatHeader";
import Footer from "../components/Footer";
import { useRecoilState, useRecoilValue } from "recoil";
import { MatchResultRecoilState, MatchRecoilState, userState } from "../Atoms";
import "./Matchresult.css";
import { useNavigate } from "react-router-dom";
import Login from "./Login";

function Matchresult() {
  const navigate = useNavigate();

  const formData = useRecoilValue(userState);
  const [MatchState, setMatchState] = useRecoilState(MatchRecoilState);
  const [MatchResultState, setMatchResultState] = useRecoilState(
    MatchResultRecoilState
  );
  const isPhoneNumberStartsWith010 =
    MatchResultState.generatedPhone &&
    MatchResultState.generatedPhone.slice(0, 3) === "010";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postdata = {
      passwd: formData.passwd,
      gender: !formData.gender,
      mbti: MatchState.sortedMBTI,
    };
    try {
      const response = await axios.get("https://onesons.site/match", {
        params: {
          mbti: MatchState.sortedMBTI[0] + MatchState.sortedMBTI[1],
          passwd: formData.passwd,
          gender: !formData.gender,
        },
      });

      if (response.data.isSuccess === true) {
        setMatchResultState({
          generatedGender: response.data.result.gender,
          generatedPhone: response.data.result.phone,
          generatedDepart: response.data.result.depart,
          generatedSong: response.data.result.song,
          generatedYear: response.data.result.year,
          generatedMbti: response.data.result.mbti,
        });
      } else {
        alert(response.data.message);
        return;
      }
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };
  return (
    <div>
      {formData.isLoggedIn ? (
        <div className="container">
          <ComatHeader destination="/match" buttonText="이전으로" />
          <div className="content">
            {MatchResultState.generatedCode === 2002 ? (
              <div style={{ textAlign: "center" }}>
                <span style={{ fontSize: "24px" }}>
                  이성이 데이터에 한명도 없습니다
                </span>
              </div>
            ) : (
              <div>
                <div className="MatchresultTop">COMAtching 결과!</div>
                <div className="MatchresultTopic">| 전공</div>
                <div className="MatchresultText">
                  {MatchResultState.generatedDepart}
                </div>
                <div className="MatchresultTopic">| 학번</div>
                <div className="MatchresultText">
                  {MatchResultState.generatedYear}
                </div>
                <div className="MatchresultTopic">| 좋아하는 노래</div>
                <div className="MatchresultText">
                  {MatchResultState.generatedSong}
                </div>
                <div className="MatchresultTopic">| 상대방의 MBTI</div>
                <div className="MatchresultMbtitext">
                  {MatchResultState.generatedMbti}{" "}
                  {MatchResultState.generatedCode === 2001 && (
                    <span style={{ fontSize: "15px", color: "#FF775E" }}>
                      조건에 맞는 상대가 없어서 랜덤으로 매칭되었어요!
                    </span>
                  )}
                  {MatchResultState.generatedCode !== 2001 && <span> </span>}
                </div>
                {isPhoneNumberStartsWith010 ? (
                  <div className="MatchresultInstaTopic">Phone_number</div>
                ) : (
                  <div className="MatchresultInstaTopic">Instagram</div>
                )}
                <div className="MatchresultInstaText">
                  {MatchResultState.generatedPhone}
                </div>
                <button className="MatchresultBottom" onClick={handleSubmit}>
                  이전과 같은 조건으로 한번 더 뽑기
                </button>
              </div>
            )}{" "}
          </div>
          <Footer />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default Matchresult;
