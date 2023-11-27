import React, { useEffect } from "react";
import axios from "axios";
import MBTIButton from "../components/MBTIButton";
import Footer from "../components/Footer";
import ComatHeader from "../components/ComatHeader";
import "./Match.css";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { MatchRecoilState, MatchResultRecoilState, userState } from "../Atoms";

function Match() {
  const navigate = useNavigate();
  const formData = useRecoilValue(userState);
  const [MatchState, setMatchState] = useRecoilState(MatchRecoilState);
  const [MatchResultState, setMatchResultState] = useRecoilState(
    MatchResultRecoilState
  );

  useEffect(() => {
    // selectedMBTI 값 변경시 sortedMBTI값 변경
    const sortedMBTI = [
      ...MatchState.selectedMBTI.filter((mbti) => mbti === "E" || mbti === "I"),
      ...MatchState.selectedMBTI.filter((mbti) => mbti === "S" || mbti === "N"),
      ...MatchState.selectedMBTI.filter((mbti) => mbti === "T" || mbti === "F"),
      ...MatchState.selectedMBTI.filter((mbti) => mbti === "P" || mbti === "J"),
    ];
    setMatchState((prev) => ({ ...prev, sortedMBTI }));
    console.log("Sorted MBTI:", sortedMBTI);
  }, [MatchState.selectedMBTI]);

  const handleChange = (e) => {
    setMatchState((prev) => ({
      ...prev,
      formData: {
        ...prev.formData,
        passwd: e.target.value,
      },
    }));
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

    if (MatchState.history.includes(category)) {
      // 이미 선택된 카테고리가 있다면, 해당 카테고리에서 선택한 값만 변경
      setMatchState((prev) => {
        const updatedMBTI = [...prev.selectedMBTI];
        updatedMBTI.pop(); // 마지막 항목을 제거
        updatedMBTI.push(value); // 새로운 MBTI 추가
        console.log("Updated MBTI:", updatedMBTI);
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
          console.log("Updated MBTI:", updatedMBTI);
          return { ...prev, selectedMBTI: updatedMBTI, history: [category] };
        });
        console.log("Updated History:", category);
      } else {
        setMatchState((prev) => ({
          ...prev,
          selectedMBTI: [...prev.selectedMBTI, value],
          history: [category],
        }));
        console.log("Updated History:", category);
        console.log("Updated MBTI:", [...MatchState.selectedMBTI, value]);
      }
    }
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
        setMatchResultState({
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
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <ComatHeader destination="/check" buttonText="조회하기" />
        <div className="content">
          {/* <div>
            <label>
              <h4 className="mcaotext">비밀번호를 입력하세요.</h4>
              <MyInput
                name="passwd"
                value={MatchState.formData.passwd}
                onChange={handleChange}
                placeholder="* * * * * *"
              />
            </label>
          </div> */}

          {/* <div>
            <label>
              <div className="gender-button-container">
                <GenderButton
                  isActive={MatchState.formData.gender}
                  value="male"
                  onClick={() => handleGenderSelection("male")}
                  label="남자"
                  className="gender-button"
                />
                <GenderButton
                  isActive={!MatchState.formData.gender}
                  value="female"
                  onClick={() => handleGenderSelection("female")}
                  label="여자"
                  className="gender-button"
                />
              </div>
            </label>
          </div> */}
          <br />
          <br />
          <div>
            <label>
              <h4 className="mcaotext">원하는 매칭상대를 선택하세요!</h4>
              <div className="mbtidiv">
                <div className="mbtibutton-container">
                  {/* 첫 번째 열 */}
                  <div className="mbtibutton-column">
                    <MBTIButton
                      isActive={MatchState.sortedMBTI.includes("E")}
                      onClick={() => handleMBTISelection("E")}
                      label="E"
                      className="mbtibutton"
                    />
                    <MBTIButton
                      isActive={MatchState.sortedMBTI.includes("I")}
                      onClick={() => handleMBTISelection("I")}
                      label="I"
                      className="mbtibutton"
                    />
                  </div>
                  <div className="mbtibutton-column">
                    <MBTIButton
                      isActive={MatchState.sortedMBTI.includes("N")}
                      onClick={() => handleMBTISelection("N")}
                      label="N"
                      className="mbtibutton"
                    />
                    <MBTIButton
                      isActive={MatchState.sortedMBTI.includes("S")}
                      onClick={() => handleMBTISelection("S")}
                      label="S"
                      className="mbtibutton"
                    />
                  </div>
                  <div className="mbtibutton-column">
                    <MBTIButton
                      isActive={MatchState.sortedMBTI.includes("T")}
                      onClick={() => handleMBTISelection("T")}
                      label="T"
                      className="mbtibutton"
                    />
                    <MBTIButton
                      isActive={MatchState.sortedMBTI.includes("F")}
                      onClick={() => handleMBTISelection("F")}
                      label="F"
                      className="mbtibutton"
                    />
                  </div>
                  <div className="mbtibutton-column">
                    <MBTIButton
                      isActive={MatchState.sortedMBTI.includes("P")}
                      onClick={() => handleMBTISelection("P")}
                      label="P"
                      className="mbtibutton"
                    />
                    <MBTIButton
                      isActive={MatchState.sortedMBTI.includes("J")}
                      onClick={() => handleMBTISelection("J")}
                      label="J"
                      className="mbtibutton"
                    />
                  </div>
                  {/* <div style={{ display: "flex", flexDirection: "row" }}>
                    <MBTIButton
                      isActive={formData.mbti.includes("E")}
                      onClick={() => handleMBTISelection("E")}
                      label="E"
                      className="mcaombtibutton"
                    />
                    <MBTIButton
                      isActive={formData.mbti.includes("I")}
                      onClick={() => handleMBTISelection("I")}
                      label="I"
                      className="mcaombtibutton"
                    />
                    <MBTIButton
                      isActive={formData.mbti.includes("Z")}
                      onClick={() => handleMBTISelection("Z")}
                      label="선택 안함"
                      className="mcaombtibutton"
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <MBTIButton
                      isActive={formData.mbti.includes("P")}
                      onClick={() => handleMBTISelection("P")}
                      label="P"
                      className="mcaombtibutton"
                    />
                    <MBTIButton
                      isActive={formData.mbti.includes("J")}
                      onClick={() => handleMBTISelection("J")}
                      label="J"
                      className="mcaombtibutton"
                    />
                    <MBTIButton
                      isActive={formData.mbti.includes("X")}
                      onClick={() => handleMBTISelection("X")}
                      label="선택 안함"
                      className="mcaombtibutton"
                    />
                  </div> */}
                </div>
              </div>
            </label>
          </div>

          <button type="submit-button">매칭하기</button>
        </div>
        <Footer />
      </form>
    </div>
  );
}

export default Match;
