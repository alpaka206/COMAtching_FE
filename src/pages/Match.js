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
      // const response = await axios.get("https://onesons.site/match", postdata);

      // const { message, code, isSuccess, result } = response.data;

      // if (isSuccess === true) {
      //   const { gender, phone, depart, song, year, mbti } = result;
      //   setMatchResultState({
      //     generatedCode: code,
      //     generatedGender: gender,
      //     generatedPhone: phone,
      //     generatedDepart: depart,
      //     generatedSong: song,
      //     generatedYear: year,
      //     generatedMbti: mbti,
      //   });
      //   navigate("/Matchresult");
      // } else {
      //   alert(message);
      //   return;
      // }

      setMatchResultState({
        generatedPhone: "01024120339",
        generatedDepart: "정보통신전자공학부",
        generatedSong: "1322",
        generatedYear: "11",
        generatedMbti: "estj",
      });
      navigate("/Matchresult");
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <ComatHeader destination="/check" buttonText="조회하기" />
        <div className="content">
          <div className="inner-content">
          <br />
          <br />
        
            <label>
            <div className="match-title">
              <div className="match-title-text">Matching</div>
              <div className="match-title-inst-txt">
                매칭할 상대의 MBTI를 두개 선택하세요!
              </div>
            </div>
            <div className="match-mbtidiv">
  <div className="match-mbtibutton-container">
    {/* First row */}
    <div className="match-mbtibutton-row">
      <MBTIButton
        isActive={MatchState.sortedMBTI.includes("E")}
        onClick={() => handleMBTISelection("E")}
        label="E"
        className="match-mbtibutton"
      />
      <MBTIButton
        isActive={MatchState.sortedMBTI.includes("I")}
        onClick={() => handleMBTISelection("I")}
        label="I"
        className="match-mbtibutton"
      />
    </div>
    {/* Second row */}
    <div className="match-mbtibutton-row">
      <MBTIButton
        isActive={MatchState.sortedMBTI.includes("N")}
        onClick={() => handleMBTISelection("N")}
        label="N"
        className="match-mbtibutton"
      />
      <MBTIButton
        isActive={MatchState.sortedMBTI.includes("S")}
        onClick={() => handleMBTISelection("S")}
        label="S"
        className="match-mbtibutton"
      />
    </div>
    {/* Third row */}
    <div className="match-mbtibutton-row">
      <MBTIButton
        isActive={MatchState.sortedMBTI.includes("F")}
        onClick={() => handleMBTISelection("F")}
        label="F"
        className="match-mbtibutton"
      />
      <MBTIButton
        isActive={MatchState.sortedMBTI.includes("T")}
        onClick={() => handleMBTISelection("T")}
        label="T"
        className="match-mbtibutton"
      />
    </div>
    {/* Fourth row */}
    <div className="match-mbtibutton-row">
      <MBTIButton
        isActive={MatchState.sortedMBTI.includes("P")}
        onClick={() => handleMBTISelection("P")}
        label="P"
        className="match-mbtibutton"
      />
      <MBTIButton 
        isActive={MatchState.sortedMBTI.includes("J")}
        onClick={() => handleMBTISelection("J")}
        label="J"
        className="match-mbtibutton"
      />
    </div>
  </div>
</div>

            </label>
          

          <button type="submit-button">매칭하기</button>
          </div>
        </div>
        <Footer />
      </form>
    </div>
  );
}

export default Match;
