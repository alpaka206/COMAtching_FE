import React, { useState, useEffect } from "react";
import axios from "axios";
import MyInput from "./../components/MyInput";
import MBTIButton from "../components/MBTIButton";
import GenderButton from "../components/GenderButton";
import Footer from "../components/Footer";
import ComatHeader from "../components/ComatHeader";
import "./Mcaotmcap.css";
import { useNavigate } from "react-router-dom";

function Mcaotmcap() {
  const navigate = useNavigate();
  const [selectedMBTI, setSelectedMBTI] = useState([]);
  const [history, setHistory] = useState("");
  const [sortedMBTI, setSortedMBTI] = useState([]);
  const [formData, setFormData] = useState({
    passwd: "",
    gender: true,
    mbti: "",
  });

  useEffect(() => {
    // selectedMBTI 값 변경시 sortedMBTI값 변경
    const sortedMBTI = [
      ...selectedMBTI.filter((mbti) => mbti === "E" || mbti === "I"),
      ...selectedMBTI.filter((mbti) => mbti === "S" || mbti === "N"),
      ...selectedMBTI.filter((mbti) => mbti === "T" || mbti === "F"),
      ...selectedMBTI.filter((mbti) => mbti === "P" || mbti === "J"),
    ];
    setSortedMBTI(sortedMBTI);
    console.log("Sorted MBTI:", sortedMBTI);
  }, [selectedMBTI]);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      passwd: e.target.value,
    });
  };
  const handleGenderSelection = (value) => {
    setFormData({
      ...formData,
      gender: value === "male" ? true : false,
    });
    console.log("Sorted MBTI:", formData);
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

    if (history.includes(category)) {
      // 이미 선택된 카테고리가 있다면, 해당 카테고리에서 선택한 값만 변경
      setSelectedMBTI((prevMBTI) => {
        const updatedMBTI = [...prevMBTI];
        updatedMBTI.pop(); // 마지막 항목을 제거
        updatedMBTI.push(value); // 새로운 MBTI 추가
        console.log("Updated MBTI:", updatedMBTI);
        return updatedMBTI;
      });
    } else {
      if (selectedMBTI.length >= 2) {
        // 이미 두 개의 MBTI를 선택한 상태이면, 첫 번째 선택한 MBTI를 해제하고 새로운 MBTI 추가
        setSelectedMBTI((prevMBTI) => {
          const updatedMBTI = [...prevMBTI];
          updatedMBTI.shift(); // 첫 번째 항목을 제거
          updatedMBTI.push(value); // 새로운 MBTI 추가
          console.log("Updated MBTI:", updatedMBTI);
          return updatedMBTI;
        });
        setHistory((prevHistory) => [category]);
        console.log("Updated History:", category);
      } else {
        // 두 개의 MBTI를 선택하지 않은 상태이면, 새로운 MBTI 추가
        setSelectedMBTI((prevMBTI) => [...prevMBTI, value]);
        setHistory((prevHistory) => [category]);
        console.log("Updated History:", category);
        console.log("Updated MBTI:", [...selectedMBTI, value]);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get("/match", {
        params: {
          mbti: sortedMBTI,
          passwd: formData.passwd,
          gender: formData.gender,
        },
      });
      const generatedMessage = response.data.message;
      const generatedCode = response.data.code;
      const generatedSuccess = response.data.isSuccess;
      if (generatedSuccess === true) {
        const generatedPhone = response.data.result.phone;
        const generatedDepart = response.data.result.depart;
        const generatedSong = response.data.result.song;
        const generatedYear = response.data.result.year;
        const generatedMbti = response.data.result.mbti;
        navigate("/Mcaotmcapresult", {
          state: {
            generatedCode,
            generatedPhone,
            generatedDepart,
            generatedSong,
            generatedYear,
            generatedMbti,
          },
        });
      } else {
        alert(generatedMessage);
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
          <div>
            <label>
              <h4 className="mcaotext">비밀번호를 입력하세요.</h4>
              <MyInput
                name="passwd"
                value={formData.passwd}
                onChange={handleChange}
                placeholder="* * * * * *"
              />
            </label>
          </div>

          <div>
            <label>
              <h4 className="mcaotext">원하는 매칭상대를 선택하세요!</h4>
              <div className="gender-button-container">
                <GenderButton
                  isActive={formData.gender}
                  value="male"
                  onClick={handleGenderSelection}
                  label="남자"
                  className="gender-button"
                />
                <GenderButton
                  isActive={!formData.gender}
                  value="female"
                  onClick={handleGenderSelection}
                  label="여자"
                  className="gender-button"
                />
              </div>
            </label>
          </div>
          <br />
          <br />
          <div>
            <label>
              <div className="mbtidiv">
                <div className="mbtibutton-container">
                  {/* 첫 번째 열 */}
                  <div className="mbtibutton-column">
                    <MBTIButton
                      isActive={sortedMBTI.includes("E")}
                      onClick={() => handleMBTISelection("E")}
                      label="E"
                      className="mbtibutton"
                    />
                    <MBTIButton
                      isActive={sortedMBTI.includes("I")}
                      onClick={() => handleMBTISelection("I")}
                      label="I"
                      className="mbtibutton"
                    />
                  </div>

                  {/* 두 번째 열 */}
                  <div className="mbtibutton-column">
                    <MBTIButton
                      isActive={sortedMBTI.includes("N")}
                      onClick={() => handleMBTISelection("N")}
                      label="N"
                      className="mbtibutton"
                    />
                    <MBTIButton
                      isActive={sortedMBTI.includes("S")}
                      onClick={() => handleMBTISelection("S")}
                      label="S"
                      className="mbtibutton"
                    />
                  </div>

                  {/* 세 번째 열 */}
                  <div className="mbtibutton-column">
                    <MBTIButton
                      isActive={sortedMBTI.includes("T")}
                      onClick={() => handleMBTISelection("T")}
                      label="T"
                      className="mbtibutton"
                    />
                    <MBTIButton
                      isActive={sortedMBTI.includes("F")}
                      onClick={() => handleMBTISelection("F")}
                      label="F"
                      className="mbtibutton"
                    />
                  </div>

                  {/* 네 번째 열 */}
                  <div className="mbtibutton-column">
                    <MBTIButton
                      isActive={sortedMBTI.includes("P")}
                      onClick={() => handleMBTISelection("P")}
                      label="P"
                      className="mbtibutton"
                    />
                    <MBTIButton
                      isActive={sortedMBTI.includes("J")}
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

export default Mcaotmcap;
