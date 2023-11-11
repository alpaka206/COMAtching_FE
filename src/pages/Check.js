import React, { useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import ComatHeader from "../components/ComatHeader";
import "./Check.css";
import { useNavigate } from "react-router-dom";

function Check() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    passwd: "",
  });

  const onPasswdChange = (event) => {
    setFormData({
      passwd: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get("/inquiry", {
        params: {
          passwd: formData.passwd,
        },
      });
      console.log(response.data);
      const generatedData = response.data.result; // Assuming result is the array
      const generatedMessage = response.data.message;
      const generatedSuccess = response.data.isSuccess;
      if (generatedSuccess === true) {
        navigate("/Checkresult", {
          state: {
            data: generatedData,
          },
        });
      } else {
        alert(generatedMessage);
      }
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <ComatHeader destination="/" buttonText="처음으로" />
        <div className="checkcontent">
          <div>
            <label>
              <h4 className="passwdchecktext">비밀번호를 입력하세요.</h4>
              <input
                type="text"
                class="checkpasswd"
                value={formData.year}
                onChange={onPasswdChange}
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
                type="submit-button"
                class="FinalCheckbutton"
                value="YES"
                //onClick={() => handleGenderSelection("male")}
                style={{
                  color: "#ffffff",
                }}
              >
                입력
              </button>
            </label>
          </div>
        </div>
      </form>
      <Footer />
    </div>
  );
}

export default Check;
