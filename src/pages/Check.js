import React, { useState } from "react";
import axios from "axios";
import "./Check.css";
import { useNavigate } from "react-router-dom";

function Check() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    passwd: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get("https://onesons.site/match", {
        params: {
          passwd: formData.passwd,
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
        navigate("/Cresult", {
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
            처음으로
          </button>
        </div>
        <div className="content">
          <div>
            <label>
              <h4 className="passwdchecktext">비밀번호를 입력하세요.</h4>
              <input
                type="text"
                class="checkpasswd"
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
              <button
                type="button"
                class="FinalCheckbutton"
                value="YES"
                //onClick={() => handleGenderSelection("male")}
                style={{
                  backgroundColor: formData.gender ? "#ff775e" : "#ffffff",
                  color: formData.gender ? "#ffffff" : "#A5A5A5",
                  border: formData.gender ? "none" : "2px solid #e0e0e0",
                }}
              >
                입력
              </button>
              <button
                type="button"
                class="FinalCheckbutton"
                value="NO"
                //onClick={() => handleGenderSelection("female")}
                style={{
                  backgroundColor: formData.gender ? "#ffffff" : "#ff775e",
                  color: formData.gender ? "#A5A5A5" : "#ffffff",
                  border: formData.gender ? "2px solid #e0e0e0" : "none",
                }}
              >
                취소
              </button>
            </label>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Check;
