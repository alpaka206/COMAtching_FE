import React from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import MyInput from "../components/MyInput";
import ComatHeader from "../components/ComatHeader";
import { useNavigate } from "react-router-dom";
import { formDataState } from "../Atoms";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  // State variables
  const [formData, setFormData] = useRecoilState(formDataState);

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

    try {
      const response = await axios.post(
        "https://onesons.site/register",
        formData
      );

      const generatedPassword = response.data.result.passwd;
      const generatedSuccess = response.data.isSuccess;
      const generatedMessage = response.data.message;

      if (generatedSuccess === true) {
        navigate("/Form", { state: { generatedPassword } });
      } else {
        alert(generatedMessage);
      }
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <ComatHeader destination="/" buttonText="처음으로" />
        <div className="content">
          <div className="user-email">
            <label>
              <h3>이메일</h3>
              <MyInput
                name="email"
                value={formData.email}
                placeholder="email"
                onChange={handleInputChange}
              />
            </label>
          </div>
          <button type="submit-button">인증 번호 보내기</button>

          <div className="user-emailpasswd">
            <label>
              <h3>이메일 확인 번호</h3>
              <MyInput
                name="passwd"
                value={formData.passwd}
                placeholder="passwd"
                onChange={handleInputChange}
              />
            </label>
          </div>

          {/* <button type="submit-button" disabled={!isContactVerified}> */}

          <div className="user-email">
            <label>
              <h3>비밀번호</h3>
              <MyInput
                name="user-email"
                value={formData.email}
                placeholder="email"
              />
            </label>
          </div>
          <div className="user-email">
            <label>
              <h3>비밀번호 확인</h3>
              <MyInput
                name="user-email"
                value={formData.email}
                placeholder="email"
              />
            </label>
          </div>
          <button type="submit-button">회원가입</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
