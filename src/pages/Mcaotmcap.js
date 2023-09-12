import React, { useState } from "react";
import axios from "axios";
import "./Mcaotmcap.css";
import { useNavigate } from "react-router-dom";

function Mcaotmcap() {
  const navigate = useNavigate();
  const [selectedEIZ, setSelectedEIZ] = useState("");
  const [selectedPJX, setSelectedPJX] = useState("");
  const [formData, setFormData] = useState({
    passwd: "",
    gender: true,
    mbti: "",
  });

  const handleGenderSelection = (value) => {
    setFormData({
      ...formData,
      gender: value === "male" ? true : false,
    });
  };

  const handleMBTISelection = (value) => {
    const category =
      value === "E" || value === "I" || value === "Z" ? "EIZ" : "PJX";

    if (category === "EIZ") {
      setSelectedEIZ(value);
    } else if (category === "PJX") {
      setSelectedPJX(value);
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      mbti: `${category === "EIZ" ? value : selectedEIZ}${
        category === "PJX" ? value : selectedPJX
      }`,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.mbti.length !== 2) {
      alert("MBTI를 모두 선택해주세요.");
      return;
    }

    try {
      const response = await axios.get("https://onesons.site/match", {
        params: {
          mbti: formData.mbti,
          passwd: formData.passwd,
          gender: formData.gender,
        },
      });
      const generatedMessage = response.data.message;
      const generatedSuccess = response.data.isSuccess;
      const generatedPhone = response.data.result.phone;
      const generatedDepart = response.data.result.depart;
      const generatedSong = response.data.result.song;
      const generatedYear = response.data.result.year;
      const generatedMbti = response.data.result.mbti;
      console.log(
        generatedPhone,
        generatedDepart,
        generatedSong,
        generatedYear,
        generatedMbti
      );
      if (generatedSuccess === true) {
        navigate("/Mcaotmcapresult", {
          state: {
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
        <div className="header">
          <div>
            <img
              src={process.env.PUBLIC_URL + `assets/logowhite.png`}
              alt="로고"
              style={{ width: "142px", height: "auto", marginLeft: "24px" }}
              onClick={() => navigate("/")}
            />
          </div>
          <button
            className="look-button"
            style={{
              width: "98px",
              height: "29px",
              marginRight: "24px",
              borderRadius: "15px",
              textAlign: "center",
              color: "#ffffff",
              fontSize: "16px",
              fontWeight: "bold",
              paddingTop: "4px",
            }}
            onClick={() => navigate("/Error")}
          >
            조회하기
          </button>
        </div>
        <div className="content">
          <div>
            <label>
              <h4 className="mcaotext">비밀번호를 입력하세요.</h4>
              <input
                type="text"
                class="passwd"
                value={formData.year}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
                placeholder="* * * * * *"
              />
            </label>
          </div>

          <div>
            <label>
              <h4 className="mcaotext">원하는 매칭상대를 선택하세요!</h4>
              <button
                type="button"
                class="mcaogenderbutton"
                value="male"
                onClick={() => handleGenderSelection("male")}
                style={{
                  backgroundColor: formData.gender ? "#ff775e" : "#ffffff",
                  color: formData.gender ? "#ffffff" : "#A5A5A5",
                  border: formData.gender ? "none" : "2px solid #e0e0e0",
                }}
              >
                남자
              </button>
              <button
                type="button"
                class="mcaogenderbutton"
                value="female"
                onClick={() => handleGenderSelection("female")}
                style={{
                  backgroundColor: formData.gender ? "#ffffff" : "#ff775e",
                  color: formData.gender ? "#A5A5A5" : "#ffffff",
                  border: formData.gender ? "2px solid #e0e0e0" : "none",
                }}
              >
                여자
              </button>
            </label>
          </div>
          <div>
            <label>
              <div className="mcaombti">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <button
                    type="button"
                    className="mcaombtibutton"
                    onClick={() => handleMBTISelection("E")}
                    style={{
                      backgroundColor: formData.mbti.includes("E")
                        ? "#ff775e"
                        : "#ffffff",
                      color: formData.mbti.includes("E")
                        ? "#ffffff"
                        : "#A5A5A5",
                      border: formData.mbti.includes("E")
                        ? "none"
                        : "2px solid #e0e0e0",
                      marginBottom: "10px",
                      display: "inline-block", // Added this line
                    }}
                  >
                    E
                  </button>
                  <button
                    type="button"
                    className="mcaombtibutton"
                    onClick={() => handleMBTISelection("I")}
                    style={{
                      backgroundColor: formData.mbti.includes("I")
                        ? "#ff775e"
                        : "#ffffff",
                      color: formData.mbti.includes("I")
                        ? "#ffffff"
                        : "#A5A5A5",
                      border: formData.mbti.includes("I")
                        ? "none"
                        : "2px solid #e0e0e0",
                      marginBottom: "10px",
                      display: "inline-block", // Added this line
                    }}
                  >
                    I
                  </button>
                  <button
                    type="button"
                    className="mcaombtibutton"
                    onClick={() => handleMBTISelection("Z")}
                    style={{
                      backgroundColor: formData.mbti.includes("Z")
                        ? "#ff775e"
                        : "#ffffff",
                      color: formData.mbti.includes("Z")
                        ? "#ffffff"
                        : "#A5A5A5",
                      border: formData.mbti.includes("Z")
                        ? "none"
                        : "2px solid #e0e0e0",
                      marginBottom: "10px",
                      display: "inline-block", // Added this line
                    }}
                  >
                    선택 안함
                  </button>
                </div>

                {/* 두 번째 열 */}
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <button
                    type="button"
                    className="mcaombtibutton"
                    onClick={() => handleMBTISelection("P")}
                    style={{
                      backgroundColor: formData.mbti.includes("P")
                        ? "#ff775e"
                        : "#ffffff",
                      color: formData.mbti.includes("P")
                        ? "#ffffff"
                        : "#A5A5A5",
                      border: formData.mbti.includes("P")
                        ? "none"
                        : "2px solid #e0e0e0",
                      marginBottom: "10px",
                    }}
                  >
                    P
                  </button>
                  <button
                    type="button"
                    className="mcaombtibutton"
                    onClick={() => handleMBTISelection("J")}
                    style={{
                      backgroundColor: formData.mbti.includes("J")
                        ? "#ff775e"
                        : "#ffffff",
                      color: formData.mbti.includes("J")
                        ? "#ffffff"
                        : "#A5A5A5",
                      border: formData.mbti.includes("J")
                        ? "none"
                        : "2px solid #e0e0e0",
                      marginBottom: "10px",
                    }}
                  >
                    J
                  </button>
                  <button
                    type="button"
                    className="mcaombtibutton"
                    onClick={() => handleMBTISelection("X")}
                    style={{
                      backgroundColor: formData.mbti.includes("X")
                        ? "#ff775e"
                        : "#ffffff",
                      color: formData.mbti.includes("X")
                        ? "#ffffff"
                        : "#A5A5A5",
                      border: formData.mbti.includes("X")
                        ? "none"
                        : "2px solid #e0e0e0",
                      marginBottom: "10px",
                    }}
                  >
                    선택 안함
                  </button>
                </div>
              </div>
            </label>
          </div>

          <button type="submit-button">매칭하기</button>
        </div>
      </form>
    </div>
  );
}

export default Mcaotmcap;
