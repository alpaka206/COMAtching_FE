import React, { useState } from "react";
import HeaderNav from "../components/HeaderNav";
import Footer from "../components/Footer";
import { useRecoilState, useRecoilValue } from "recoil";
import { MatchResultState, MatchPickState, userState } from "../Atoms";
import "./Matchresult.css";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import axios from "axios";

function Matchresult() {
  const navigate = useNavigate();
  const formData = useRecoilValue(userState);
  const [MatchState, setMatchState] = useRecoilState(MatchPickState);
  const [ResultState, setResultState] = useRecoilState(MatchResultState);
  const isPhoneNumberStartsWith010 =
    MatchResultState.generatedPhone &&
    MatchResultState.generatedPhone.slice(0, 3) === "010";
  const alarmUrl = () => {
    alert("url강제 이동시 로그아웃 후 로그인 페이지로 이동됩니다.");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const postdata = {
      gender: !formData.gender,
      mbti: MatchState.sortedMBTI,
      passwd: formData.userEmail,
    };
    try {
      const response = await axios.get("https://onesons.site/match", postdata);

      const { message, code, isSuccess, result } = response.data;

      if (isSuccess === true) {
        const { gender, phone, depart, song, year, mbti } = result;
        setResultState({
          generatedCode: code,
          generatedGender: gender,
          generatedPhone: phone,
          generatedDepart: depart,
          generatedSong: song,
          generatedYear: year,
          generatedMbti: mbti,
        });
        navigate("/Matchresult");
      } else {
        alert(message);
        return;
      }
      console.log(MatchResultState);
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };
  return (
    <div>
      {formData.isLoggedIn ? (
        <div className="container">
          <HeaderNav destination="/match" buttonText="이전으로" />
          <div className={`matchresult-content }`}>
            {MatchResultState.generatedCode === 2002 ? (
              <div style={{ textAlign: "center" }}>
                <span style={{ fontSize: "24px" }}>
                  이성이 데이터에 한명도 없습니다
                </span>
              </div>
            ) : (
              <div className="inner-content">
                <div>
                  <div className="result-title">
                    <div className="result-title-text">매칭 완료</div>
                    <div className="result-title-inst-txt">
                      좋은 결과가 있길 바래요
                    </div>
                  </div>
                  {/* <div className="MatchresultTop">COMAtching 결과!</div> */}
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
                      <span style={{ fontSize: "10px", color: "#FF775E" }}>
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
                  <button className="Retry_button" onClick={handleSubmit}>
                    이전과 같은 조건으로 한번 더 뽑기
                  </button>
                </div>
              </div>
            )}{" "}
          </div>
          <Footer />
        </div>
      ) : (
        <>
          {alarmUrl()}
          <Login />
        </>
      )}
    </div>
  );
}

export default Matchresult;
