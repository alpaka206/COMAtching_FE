import React, { useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import "../css/pages/Match.css";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { MatchPickState, MatchResultState } from "../Atoms";
import MBTISection from "../components/MBTISection";
import AgeButton from "../components/AgeButton";
import hobbyIcons from "../data/hobbyIcons";
import { matchValidation } from "../myfunction/matchValidation";
import MatchHeader from "../components/MatchHeader";

function Match() {
  const navigate = useNavigate();
  const [MatchState, setMatchState] = useRecoilState(MatchPickState); // 뽑은 선택 리스트
  const [matchPageResult, setMatchPageResult] =
    useRecoilState(MatchResultState); // 뽑기 결과 상태 관리

  // MBTI 선택 핸들러
  const handleMBTISelection = (value) => {
    // 선택한 것의 카테고리 구분
    const category =
      value === "E" || value === "I"
        ? 0
        : value === "S" || value === "N"
        ? 1
        : value === "T" || value === "F"
        ? 2
        : 3;
    // 카테고리에 해당하는 값이 이미 들어있을경우 변경
    if (MatchState.selectedCategory.includes(category)) {
      setMatchState((prev) => {
        const updatedMBTI = [...prev.selectedMBTI];
        updatedMBTI[category] = value;
        return { ...prev, selectedMBTI: updatedMBTI };
      });
    } else {
      // 카테고리에 해당하는 값은 없지만 2개 이상 선택되었을경우
      if (MatchState.selectedCategory.length >= 2) {
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
        // 아무것도 없을 경우 or 1개 들어있을 경우
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
  };

  // 폼 제출 핸들러
  const handleSubmit = async () => {
    // 유료 옵션이 몇개인가
    const aiOptionCount = MatchState.isUseOption.filter(
      (option) => option
    ).length;
    // 유료 옵션을 안골랐을때 값 넣어주기
    const updatedFormData = {
      ...MatchState.formData,
      mbti_option: MatchState.selectedMBTI.join(""),
      ai_option_count: aiOptionCount,
      age_option: MatchState.isUseOption[0]
        ? MatchState.formData.age_option
        : "NONE",
      contact_frequency_option: MatchState.isUseOption[1]
        ? MatchState.formData.contact_frequency_option
        : "NONE",
      hobby_option: MatchState.isUseOption[2]
        ? MatchState.formData.hobby_option
        : ["NONE"],
      no_same_major_option: MatchState.isUseOption[3] ? true : false,
      match_code: MatchState.formData.match_code,
    };
    // 값 업데이트(후에 다시 뽑기시 값이 필요해서 recoil 사용)
    setMatchState((prev) => ({
      ...prev,
      formData: updatedFormData,
    }));
    console.log(updatedFormData);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://catholic-mibal.site/comatching/match",
        updatedFormData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response.data.data);
      if (
        response.data.code[0] === "SEC-001" ||
        response.data.code[0] === "SEC-002"
      ) {
        localStorage.removeItem("token");
        navigate("/");
      } else if (response.data.status === 200) {
        // 결과값 저장
        setMatchPageResult({
          major: response.data.data.major,
          age: response.data.data.age,
          hobby: response.data.data.hobby,
          mbti: response.data.data.mbti,
          song: response.data.data.song,
          contactFrequency: response.data.data.contactFrequency,
          contactId: response.data.data.contactId,
          word: response.data.data.word,
        });
        setMatchState((prev) => ({
          ...prev,
          balance: response.data.data.currentPoint,
        }));
        navigate("/loading");
      } else {
        throw new Error("Unexpected response code or status");
      }
    } catch (error) {
      console.error("Error during match request", error);
    }
  };
  // 나이 선택 핸들러
  const handleAgeSelection = (value, location) => {
    setMatchState((prev) => ({
      ...prev,
      formData: {
        ...prev.formData,
        [location]: value,
      },
    }));
  };

  // 유료 버튼 사용 클릭 핸들러
  const handleButtonClick = (index, cost) => {
    setMatchState((prev) => ({
      ...prev,
      point: prev.point + cost,
      isUseOption: prev.isUseOption.map((option, i) =>
        i === index ? !option : option
      ),
    }));
  };

  // 취미 선택 핸들러
  const handleHobbyClick = (index) => {
    const isAlreadySelected = MatchState.formData.hobby_option.includes(index);
    const updatedHobbies = isAlreadySelected
      ? MatchState.formData.hobby_option.filter((hobby) => hobby !== index)
      : MatchState.formData.hobby_option.length < 5
      ? [...MatchState.formData.hobby_option, index]
      : MatchState.formData.hobby_option;

    setMatchState((prev) => ({
      ...prev,
      formData: {
        ...prev.formData,
        hobby_option: updatedHobbies,
      },
    }));
  };

  return (
    <div>
      {/* {formData.isLoggedIn ? ( */}
      <div className="container match-container">
        <MatchHeader
          MatchState={MatchState}
          setMatchState={setMatchState}
          setMatchPageResult={setMatchPageResult}
        />
        {/* <div className="match-header">
          <div>
            <img
              className="logo-img"
              src={process.env.PUBLIC_URL + `assets/logowhite.png`}
              alt="로고"
              onClick={handleMatchLogo}
            />
          </div>
          <div className="match-point-remaining">
            잔여포인트
            <img src={process.env.PUBLIC_URL + `assets/point.svg`} alt="cost" />
            {MatchState.balance}
          </div>
        </div> */}
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
            name="MBTIButton"
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
                {!MatchState.isUseOption[0] ? (
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
              formData={MatchState.formData.age_option}
              value="YOUNGER"
              text="연하"
              onClick={() => handleAgeSelection("YOUNGER", "age_option")}
              isClickable={MatchState.isUseOption[0]}
            />
            <AgeButton
              formData={MatchState.formData.age_option}
              value="EQUAL"
              text="동갑"
              onClick={() => handleAgeSelection("EQUAL", "age_option")}
              isClickable={MatchState.isUseOption[0]}
            />
            <AgeButton
              formData={MatchState.formData.age_option}
              text="연상"
              value="OLDER"
              onClick={() => handleAgeSelection("OLDER", "age_option")}
              isClickable={MatchState.isUseOption[0]}
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
                {!MatchState.isUseOption[1] ? (
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
              formData={MatchState.formData.contact_frequency_option}
              text="자주"
              value="FREQUENT"
              onClick={() =>
                handleAgeSelection("FREQUENT", "contact_frequency_option")
              }
              isClickable={MatchState.isUseOption[1]}
            />
            <AgeButton
              formData={MatchState.formData.contact_frequency_option}
              text="보통"
              value="NORMAL"
              onClick={() =>
                handleAgeSelection("NORMAL", "contact_frequency_option")
              }
              isClickable={MatchState.isUseOption[1]}
            />
            <AgeButton
              formData={MatchState.formData.contact_frequency_option}
              text="가끔"
              value="NOT_FREQUENT"
              onClick={() =>
                handleAgeSelection("NOT_FREQUENT", "contact_frequency_option")
              }
              isClickable={MatchState.isUseOption[1]}
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
                {!MatchState.isUseOption[2] ? (
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
                  MatchState.isUseOption[2]
                    ? `${
                        MatchState.formData.hobby_option.includes(hobby.label)
                          ? "selected"
                          : ""
                      }`
                    : " "
                }`}
                onClick={() => handleHobbyClick(hobby.label)}
                disabled={!MatchState.isUseOption[2]}
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
        <div className="matchcontent matchfinalcontent">
          <div className="match-title">
            <div className="match-premium-option">
              <div>
                <div className="match-title-text">같은과는 싫어요</div>
                <div className="match-title-inst-txt">
                  과 CC를 피할 수 있어요
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
                {!MatchState.isUseOption[3] ? (
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

        <button
          type="button"
          className="match-submit-button"
          onClick={() => handleSubmit()}
        >
          <div className="match-submit-button-point">
            <img src={process.env.PUBLIC_URL + `assets/point.svg`} alt="cost" />
            {MatchState.point}P
          </div>
          로 매칭하기
        </button>
        <Footer />
      </div>
    </div>
  );
}

export default Match;
