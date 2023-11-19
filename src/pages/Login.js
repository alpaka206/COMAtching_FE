import React, { useState } from "react";
import axios from "axios";
import MyInput from "../components/MyInput";
import ComatHeader from "../components/ComatHeader";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  // State variables
  const [formData, setFormData] = useState({
    id: "",
  });

  //   function validateYear(value) {
  //     return /^\d{0,2}$/.test(value);
  //   }

  //   function validatePhone(value) {
  //     return /^\d{0,11}$/.test(value);
  //   }

  //   function validateSong(value) {
  //     return /^[^?~!@#$%^&*()+'"<>\\/|{}[\]_=;:]{0,30}$/.test(value);
  //   }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const yearAsInt = parseInt(formData.year, 10);
    const formDataWithIntYear = {
      ...formData,
      year: yearAsInt,
    };

    try {
      const response = await axios.post(
        "https://onesons.site/register",
        formDataWithIntYear
      );

      const generatedPassword = response.data.result.passwd;
      const generatedSuccess = response.data.isSuccess;
      const generatedMessage = response.data.message;

      if (generatedSuccess === true) {
        navigate("/Complete", { state: { generatedPassword } });
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
        <div className="content">
          <div className="user-id">
            <label>
              <h3>아이디</h3>
              <MyInput name="user-id" value={formData.id} placeholder="id" />
            </label>
          </div>
          <div className="user-passwd">
            <label>
              <h3>아이디</h3>
              <MyInput
                name="user-passwd"
                value={formData.passwd}
                placeholder="passwd"
              />
            </label>
          </div>

          {/* <button type="submit-button" disabled={!isContactVerified}> */}
          <button type="submit-button">로그인 ▶</button>
          <div onClick={() => navigate("/Register")}>회원가입하기</div>
        </div>
      </form>
    </div>
  );
}

export default Login;
