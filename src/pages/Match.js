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
  const [MatchResultState, setMatchResultState] =
    useRecoilState(MatchResultState);
  const [isUseOption, setIsUseOption] = useState([false, false, false, false]);
  useEffect(() => {
    const sortedMBTI = [
      ...MatchState.selectedMBTI.filter((mbti) => mbti === "E" || mbti === "I"),
      ...MatchState.selectedMBTI.filter((mbti) => mbti === "S" || mbti === "N"),
      ...MatchState.selectedMBTI.filter((mbti) => mbti === "T" || mbti === "F"),
      ...MatchState.selectedMBTI.filter((mbti) => mbti === "P" || mbti === "J"),
    ];
    setMatchState((prev) => ({ ...prev, sortedMBTI }));
    console.log("Sorted MBTI:", MatchState);
  }, [MatchState.selectedMBTI]);
  const alarmUrl = () => {
    alert("url강제 이동시 로그아웃 후 로그인 페이지로 이동됩니다.");
  };
  const handleMBTISelection = (value) => {
    const category =
      value === "E" || value === "I"
        ? "EI"
        : value === "S" || value === "N"
        ? "SN"
        : value === "T" || value === "F"
        ? "TF"
        : "PJ";

    if (MatchState.selectedCategory.includes(category)) {
      // 이미 선택된 카테고리가 있다면, 해당 카테고리에서 선택한 값만 변경
      setMatchState((prev) => {
        const updatedMBTI = [...prev.selectedMBTI];
        updatedMBTI.pop(); // 마지막 항목을 제거
        updatedMBTI.push(value); // 새로운 MBTI 추가
        // return updatedMBTI;
        return { ...prev, selectedMBTI: updatedMBTI };
      });
    } else {
      if (MatchState.selectedMBTI.length >= 2) {
        // 이미 두 개의 MBTI를 선택한 상태이면, 첫 번째 선택한 MBTI를 해제하고 새로운 MBTI 추가
        setMatchState((prev) => {
          const updatedMBTI = [...prev.selectedMBTI];
          updatedMBTI.shift();
          updatedMBTI.push(value);
          return {
            ...prev,
            selectedMBTI: updatedMBTI,
            selectedCategory: [category],
          };
        });
      } else {
        setMatchState((prev) => ({
          ...prev,
          selectedMBTI: [...prev.selectedMBTI, value],
          selectedCategory: [category],
        }));
      }
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const postdata = {
  //     passwd: formData.passwd,
  //     mbti: MatchState.sortedMBTI[0] + MatchState.sortedMBTI[1],
  //   };
  //   console.log(postdata);
  //   try {
  //     const response = await axios.get("https://onesons.site/match", {
  //       params: {
  //         mbti: MatchState.sortedMBTI[0] + MatchState.sortedMBTI[1],
  //         passwd: formData.passwd,
  //         gender: !formData.gender,
  //       },
  //     });

  //     if (response.data.isSuccess === true) {
  //       setMatchResultState({
  //         generatedGender: response.data.result.gender,
  //         generatedPhone: response.data.result.phone,
  //         generatedDepart: response.data.result.depart,
  //         generatedSong: response.data.result.song,
  //         generatedYear: response.data.result.year,
  //         generatedMbti: response.data.result.mbti,
  //       });
  //       navigate("/Matchresult");
  //     } else {
  //       alert(response.data.message);
  //       return;
  //     }

  //     // setMatchResultState({
  //     //   generatedPhone: "01024120339",
  //     //   generatedDepart: "정보통신전자공학부",
  //     //   generatedSong: "1322",
  //     //   generatedYear: "11",
  //     //   generatedMbti: "estj",
  //     // });
  //     navigate("/Matchresult");
  //   } catch (error) {
  //     console.error("오류 발생:", error);
  //   }
  // };
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
  const handleButtonClick = (index) => {
    setIsUseOption((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
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
          <form /*onSubmit={handleSubmit}*/>
            <HeaderNav destination="/check" buttonText="조회하기" />
            <div className="content">
              <div className="match-title">
                <div className="match-title-text">Matching</div>
                <div className="match-title-inst-txt">
                  두근두근! 매칭되고 싶은 상대를 입력하세요!
                </div>
              </div>
            </div>
            <div className="content">
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
            <div className="content">
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
                        onClick={() => handleButtonClick(0)}
                      >
                        +
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="match-premium-option-click-button"
                        onClick={() => handleButtonClick(0)}
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
            <div className="content">
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
                        onClick={() => handleButtonClick(1)}
                      >
                        +
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="match-premium-option-click-button"
                        onClick={() => handleButtonClick(1)}
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
            <div className="content">
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
                        onClick={() => handleButtonClick(2)}
                      >
                        +
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="match-premium-option-click-button"
                        onClick={() => handleButtonClick(2)}
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
            <div className="content">
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
                    {!isUseOption[0] ? (
                      <button
                        type="button"
                        className="match-premium-option-unclick-button"
                        onClick={() => handleButtonClick(0)}
                      >
                        +
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="match-premium-option-click-button"
                        onClick={() => handleButtonClick(0)}
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

            <button type="submit-button">매칭하기</button>
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
