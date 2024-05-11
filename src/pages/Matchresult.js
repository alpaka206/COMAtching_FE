import React, { useState } from "react";
import HeaderNav from "../components/HeaderNav";
import Footer from "../components/Footer";
import { useRecoilState, useRecoilValue } from "recoil";
import { MatchResultState, MatchPickState, userState } from "../Atoms";
import "./Matchresult.css";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import axios from "axios";
import hobbyIcons from "../data/hobbyIcons";

function Matchresult() {
  const navigate = useNavigate();
  const formData = useRecoilValue(userState);
  const [MatchState, setMatchState] = useRecoilState(MatchPickState);
  const [MatchResult, setMatchResult] = useRecoilState(MatchResultState);
  const alarmUrl = () => {
    alert("url강제 이동시 로그아웃 후 로그인 페이지로 이동됩니다.");
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const postdata = {
  //     gender: !formData.gender,
  //     mbti: MatchState.sortedMBTI,
  //     passwd: formData.userEmail,
  //   };
  //   try {
  //     const response = await axios.get("https://onesons.site/match", postdata);

  //     const { message, code, isSuccess, result } = response.data;

  //     if (isSuccess === true) {
  //       const { gender, phone, depart, song, year, mbti } = result;
  //       setResultState({
  //         generatedCode: code,
  //         generatedGender: gender,
  //         generatedPhone: phone,
  //         generatedDepart: depart,
  //         generatedSong: song,
  //         generatedYear: year,
  //         generatedMbti: mbti,
  //       });
  //       navigate("/Matchresult");
  //     } else {
  //       alert(message);
  //       return;
  //     }
  //     console.log(MatchResultState);
  //   } catch (error) {
  //     console.error("오류 발생:", error);
  //   }
  // };
  return (
    <div>
      {formData.isLoggedIn ? (
        <div className="container">
          <HeaderNav />
          {MatchResult.generatedCode === 2002 ? (
            <div className="matchresult-content">
              <div style={{ textAlign: "center" }}>
                <span style={{ fontSize: "24px" }}>
                  이성이 데이터에 한명도 없습니다
                </span>
              </div>
            </div>
          ) : (
            <div>
              <div className="matchresult-content">
                <div className="MatchResult-Container">
                  <div className="MatchResult-Major">
                    <div className="MatchResult-Topic">| 전공</div>
                    <div className="MatchResult-Text">
                      {MatchResult.generatedMajor}
                    </div>
                  </div>
                  <div className="MatchResult-Age">
                    <div className="MatchResult-Topic">| 나이</div>
                    <div className="MatchResult-Text">
                      {MatchResult.generatedAge}
                    </div>
                  </div>
                </div>
                <div className="MatchResult-Container">
                  <div className="MatchResult-Hobby">
                    <div className="MatchResult-Topic">| 취미</div>
                    <div className="MatchResult-Text-Hobby">
                      {MatchResult.generatedHobby.map((hobbyLabel, index) => {
                        const hobby = hobbyIcons.find(
                          (item) => item.label === hobbyLabel
                        );
                        return (
                          <div
                            key={index}
                            className="MatchResult-hobby-element"
                          >
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                `assets/${hobby.image}.svg`
                              }
                              alt={hobby.alt}
                            />
                            <div>{hobby.label}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="MatchResult-MBTI">
                    <div className="MatchResult-Topic">| MBTI</div>
                    <div className="MatchResult-Text">
                      {MatchResult.generatedMbti}
                    </div>
                  </div>
                </div>
                <div className="MatchResult-Song">
                  <div className="MatchResult-Topic">| 좋아하는 노래</div>
                  <div className="MatchResult-Text">
                    {MatchResult.generatedSong}
                  </div>
                </div>
                <div className="MatchResult-Frequency">
                  <div className="MatchResult-Topic">| 연락빈도</div>
                  <div className="MatchResult-Text">
                    {MatchResult.generatedContact_Frequency}
                  </div>
                </div>
                <div className="MatchResult-Contact">
                  <div className="MatchResult-Topic">
                    {MatchResult.generatedContact}
                  </div>
                  <div className="MatchResult-Text MatchResult-Text-Contact">
                    {MatchResult.generatedContact_Id}
                  </div>
                </div>
              </div>
              <div className="MatchResult-button-container">
                <button className="Retry-button" /*onClick={handleSubmit}> */>
                  다시뽑기
                </button>
                <button
                  className="Retry-same-button" /*onClick={handleSubmit}> */
                >
                  <div className="Retry-same-button-point">
                    <img
                      src={process.env.PUBLIC_URL + `assets/point.svg`}
                      alt="cost"
                    />
                    {MatchState.point}P
                  </div>
                  같은 조건으로 한번 더 뽑기
                </button>
              </div>
            </div>
          )}
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
