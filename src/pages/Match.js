import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import HeaderNav from "../components/HeaderNav";
import "./Match.css";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { MatchPickState, MatchResultState, userState } from "../Atoms";
import Login from "./Login";
import MBTISection from "../components/MBTISection";
import AgeButton from "../components/AgeButton";
import hobbyIcons from "../data/hobbyIcons";

function Match() {
  const navigate = useNavigate();
  const formData = useRecoilValue(userState);
  const [MatchState, setMatchState] = useRecoilState(MatchPickState);
  const [MatchPageResult, setMatchPageResult] =
    useRecoilState(MatchResultState);
  const [isUseOption, setIsUseOption] = useState([false, false, false, false]);

  const alarmUrl = () => {
    alert("url강제 이동시 로그아웃 후 로그인 페이지로 이동됩니다.");
  };
  const handleMBTISelection = (value) => {
    const category =
      value === "E" || value === "I"
        ? 0
        : value === "S" || value === "N"
        ? 1
        : value === "T" || value === "F"
        ? 2
        : 3;

    if (MatchState.selectedCategory.includes(category)) {
      // 이미 선택된 카테고리가 있다면, 해당 카테고리에서 선택한 값만 변경
      setMatchState((prev) => {
        const updatedMBTI = [...prev.selectedMBTI];
        updatedMBTI[category] = value; // 새로운 MBTI 추가
        // return updatedMBTI;
        return { ...prev, selectedMBTI: updatedMBTI };
      });
    } else {
      if (MatchState.selectedCategory.length >= 2) {
        // 이미 두 개의 MBTI를 선택한 상태이면, 첫 번째 선택한 MBTI를 해제하고 새로운 MBTI 추가
        setMatchState((prev) => {
          const updatedMBTI = [...prev.selectedMBTI];
          updatedMBTI[category] = value;
          const updatedMBTICategory = [...prev.selectedCategory];
          updatedMBTI[updatedMBTICategory[0]] = "X";
          updatedMBTICategory.shift();
          updatedMBTICategory.push(category);
          return {
            ...prev,
            selectedMBTI: updatedMBTI,
            selectedCategory: updatedMBTICategory,
          };
        });
      } else {
        setMatchState((prev) => {
          const updatedMBTI = [...prev.selectedMBTI];
          updatedMBTI[category] = value;
          const updatedMBTICategory = [...prev.selectedCategory];
          updatedMBTICategory.push(category);
          return {
            ...prev,
            selectedMBTI: updatedMBTI,
            selectedCategory: updatedMBTICategory,
          };
        });
      }
    }
    console.log("selectedMBTI:", MatchState.selectedMBTI);
    console.log("selectedCategory:", MatchState.selectedCategory);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitmbti =
      MatchState.selectedMBTI[0] +
      MatchState.selectedMBTI[1] +
      MatchState.selectedMBTI[2] +
      MatchState.selectedMBTI[3];
    console.log(submitmbti);

    // try {
    //   const response = await axios.get("https://onesons.site/match", {
    //     params: {
    //       mbti: MatchState.sortedMBTI[0] + MatchState.sortedMBTI[1],
    //       passwd: formData.passwd,
    //       gender: !formData.gender,
    //     },
    //   });

    //   if (response.data.isSuccess === true) {
    //     setMatchPageResult({
    //       generatedMajor: response.data.result.generatedMajor,
    //       generatedAge: response.data.result.generatedAge,
    //       generatedHobby: response.data.result.generatedHobby,
    //       generatedMbti: response.data.result.generatedMbti,
    //       generatedSong: response.data.result.generatedSong,
    //       generatedContact_Frequency:
    //         response.data.result.generatedContact_Frequency,
    //       generatedContact: response.data.result.generatedContact,
    //       generatedContact_Id: response.data.result.generatedContact_Id,
    //     });
    //     navigate("/Matchresult");
    //   } else {
    //     alert(response.data.message);
    //     return;
    //   }

    //     navigate("/Matchresult");
    //   } catch (error) {
    //     console.error("오류 발생:", error);
    // }
    setMatchPageResult({
      generatedMajor: "정보통신전자공학부",
      generatedAge: 20,
      generatedHobby: [
        "음악감상",
        "그림그리기",
        "사진촬영",
        "액티비티",
        "게임",
      ],
      generatedMbti: "ESTJ",
      generatedSong: "아이유-에필로그",
      generatedContact_Frequency: "많이",
      generatedContact: "insta",
      generatedContact_Id: "@COMA",
    });
    navigate("/loading");
  };
  const handleAgeSelection = (value, location) => {
    setMatchState((prev) => ({
      ...prev,
      formData: {
        ...prev.formData,
        [location]: value,
      },
    }));
    console.log("age:", MatchState);
  };
  const handleButtonClick = (index, cost) => {
    setIsUseOption((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
    setMatchState((prev) => ({
      ...prev,
      point: prev.point + cost,
    }));
  };
  const handleHobbyClick = (index) => {
    // 이미 선택한 취미인지 확인
    const isAlreadySelected = MatchState.formData.hobby.includes(index);
    const updatedHobbies = isAlreadySelected
      ? MatchState.formData.hobby.filter((hobby) => hobby !== index)
      : MatchState.formData.hobby.length < 5
      ? [...MatchState.formData.hobby, index]
      : MatchState.formData.hobby;

    setMatchState((prev) => ({
      ...prev,
      formData: {
        ...prev.formData,
        hobby: updatedHobbies,
      },
    }));
    console.log(updatedHobbies);
  };
  return (
    <div>
      {formData.isLoggedIn ? (
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="match-header">
              <div>
                <img
                  className="logo-img"
                  src={process.env.PUBLIC_URL + `assets/logowhite.png`}
                  alt="로고"
                  onClick={() => navigate("/")}
                />
              </div>
              <div className="match-point-remaining">
                잔여포인트
                <img
                  src={process.env.PUBLIC_URL + `assets/point.svg`}
                  alt="cost"
                />
                2000
              </div>
            </div>
            <div className="matchcontent">
              <div className="match-title">
                <div className="match-title-text">Matching</div>
                <div className="match-title-inst-txt">
                  두근두근! 매칭되고 싶은 상대를 입력하세요!
                </div>
              </div>
            </div>
            <div className="matchcontent">
              <div className="match-title">
                <div className="match-title-text">MBTI</div>
                <div className="match-title-inst-txt">
                  매칭할 상대의 MBTI를 두개 선택하세요!
                </div>
              </div>
              <MBTISection
                user={MatchState.selectedMBTI}
                onClick={handleMBTISelection}
              />
            </div>
            <div className="matchcontent">
              <div className="match-title">
                <div className="match-premium-option">
                  <div>
                    <div className="match-title-text">나이</div>
                    <div className="match-title-inst-txt">원하는 나이 선택</div>
                  </div>
                  <div className="match-premium-option-right">
                    <div className="match-premium-option-cost">
                      <img
                        src={process.env.PUBLIC_URL + `assets/point.svg`}
                        alt="cost"
                      />
                      100
                    </div>
                    {!isUseOption[0] ? (
                      <button
                        type="button"
                        className="match-premium-option-unclick-button"
                        onClick={() => handleButtonClick(0, 100)}
                      >
                        +
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="match-premium-option-click-button"
                        onClick={() => handleButtonClick(0, -100)}
                      >
                        <img
                          src={process.env.PUBLIC_URL + `assets/Backspace.svg`}
                          alt="닫기"
                        />
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="match-select-button">
                {" "}
                <AgeButton
                  formData={MatchState.formData.age}
                  value="연하"
                  onClick={() => handleAgeSelection("연하", "age")}
                  isClickable={isUseOption[0]}
                />
                <AgeButton
                  formData={MatchState.formData.age}
                  value="동갑"
                  onClick={() => handleAgeSelection("동갑", "age")}
                  isClickable={isUseOption[0]}
                />
                <AgeButton
                  formData={MatchState.formData.age}
                  value="연상"
                  onClick={() => handleAgeSelection("연상", "age")}
                  isClickable={isUseOption[0]}
                />
              </div>
            </div>
            <div className="matchcontent">
              <div className="match-title">
                <div className="match-premium-option">
                  <div>
                    <div className="match-title-text">연락 빈도</div>
                    <div className="match-title-inst-txt">
                      원하는 연락 빈도 선택
                    </div>
                  </div>
                  <div className="match-premium-option-right">
                    <div className="match-premium-option-cost">
                      <img
                        src={process.env.PUBLIC_URL + `assets/point.svg`}
                        alt="cost"
                      />
                      100
                    </div>
                    {!isUseOption[1] ? (
                      <button
                        type="button"
                        className="match-premium-option-unclick-button"
                        onClick={() => handleButtonClick(1, 100)}
                      >
                        +
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="match-premium-option-click-button"
                        onClick={() => handleButtonClick(1, -100)}
                      >
                        <img
                          src={process.env.PUBLIC_URL + `assets/Backspace.svg`}
                          alt="닫기"
                        />
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="match-select-button">
                <AgeButton
                  formData={MatchState.formData.contactRate}
                  value="빠르게"
                  onClick={() => handleAgeSelection("빠르게", "contactRate")}
                  isClickable={isUseOption[1]}
                />
                <AgeButton
                  formData={MatchState.formData.contactRate}
                  value="중간"
                  onClick={() => handleAgeSelection("중간", "contactRate")}
                  isClickable={isUseOption[1]}
                />
                <AgeButton
                  formData={MatchState.formData.contactRate}
                  value="여유있게"
                  onClick={() => handleAgeSelection("여유있게", "contactRate")}
                  isClickable={isUseOption[1]}
                />
              </div>
            </div>
            <div className="matchcontent">
              <div className="match-title">
                <div className="match-premium-option">
                  <div>
                    <div className="match-title-text">취향</div>
                    <div className="match-title-inst-txt">
                      함께하고 싶은 취향을 선택하세요.
                    </div>
                  </div>
                  <div className="match-premium-option-right">
                    <div className="match-premium-option-cost">
                      <img
                        src={process.env.PUBLIC_URL + `assets/point.svg`}
                        alt="cost"
                      />
                      100
                    </div>
                    {!isUseOption[2] ? (
                      <button
                        type="button"
                        className="match-premium-option-unclick-button"
                        onClick={() => handleButtonClick(2, 100)}
                      >
                        +
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="match-premium-option-click-button"
                        onClick={() => handleButtonClick(2, -100)}
                      >
                        <img
                          src={process.env.PUBLIC_URL + `assets/Backspace.svg`}
                          alt="닫기"
                        />
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="match-hobby-grid">
                {hobbyIcons.map((hobby, index) => (
                  <button
                    type="button"
                    key={index}
                    className={`hobby-item ${
                      isUseOption[2]
                        ? `${
                            MatchState.formData.hobby.includes(hobby.label)
                              ? "selected"
                              : ""
                          }`
                        : " "
                    }`}
                    onClick={() => handleHobbyClick(hobby.label)}
                    disabled={!isUseOption[2]}
                  >
                    <img
                      src={process.env.PUBLIC_URL + `assets/${hobby.image}.svg`}
                      alt={hobby.alt}
                    />
                    <div>{hobby.label}</div>
                  </button>
                ))}
              </div>
            </div>
            <div className="matchcontent">
              <div className="match-title">
                <div className="match-premium-option">
                  <div>
                    <div className="match-title-text">같은과는 싫어요</div>
                    <div className="match-title-inst-txt">
                      과 cc를 피할 수 있어요
                    </div>
                  </div>
                  <div className="match-premium-option-right">
                    <div className="match-premium-option-cost">
                      <img
                        src={process.env.PUBLIC_URL + `assets/point.svg`}
                        alt="cost"
                      />
                      200
                    </div>
                    {!isUseOption[3] ? (
                      <button
                        type="button"
                        className="match-premium-option-unclick-button"
                        onClick={() => handleButtonClick(3, 200)}
                      >
                        +
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="match-premium-option-click-button"
                        onClick={() => handleButtonClick(3, -200)}
                      >
                        <img
                          src={process.env.PUBLIC_URL + `assets/Backspace.svg`}
                          alt="닫기"
                        />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <button type="submit-button">{MatchState.point}매칭하기</button>
            <Footer />
          </form>
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

export default Match;
