import React, { useEffect } from "react";
import axios from "axios";
import MBTIButton from "../components/MBTIButton";
import Footer from "../components/Footer";
import HeaderNav from "../components/HeaderNav";
import "./Match.css";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { MatchRecoilState, MatchResultRecoilState, userState } from "../Atoms";
import Login from "./Login";

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
      passwd: formData.passwd,
      gender: !formData.gender,
      mbti: MatchState.sortedMBTI[0] + MatchState.sortedMBTI[1],
    };
    console.log(postdata);
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
        navigate("/Matchresult");
      } else {
        alert(response.data.message);
        return;
      }

      // setMatchResultState({
      //   generatedPhone: "01024120339",
      //   generatedDepart: "정보통신전자공학부",
      //   generatedSong: "1322",
      //   generatedYear: "11",
      //   generatedMbti: "estj",
      // });
      navigate("/Matchresult");
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  return (
    <div>
      {formData.isLoggedIn ? (
        <div className="container">
          <form onSubmit={handleSubmit}>
            <HeaderNav destination="/check" buttonText="조회하기" />
            <div className="content">
              <div className="match-inner-content">
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
