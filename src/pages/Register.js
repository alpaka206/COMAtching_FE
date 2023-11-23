import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";
import MyInput from "../components/MyInput";
import ComatHeader from "../components/ComatHeader";
import { useNavigate } from "react-router-dom";
import { userState } from "../Atoms";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  // State variables
  const [formData, setFormData] = useRecoilState(userState);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleTogglePasswordCheck = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://onesons.site/register",
        formData
      );

      if (response.data.isSuccess === true) {
        navigate("/Form");
      } else {
        alert(response.data.message);
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
          <button type="submit-button">확인</button>
          <div className="user-passwd">
            <label>
              <h3>비밀번호</h3>
              <div className="password-input">
                <MyInput
                  name="user-passwd"
                  value={formData.passwd}
                  placeholder="passwd"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) =>
                    setFormData({ ...formData, passwd: e.target.value })
                  }
                />
                <div className="password-toggle" onClick={handleTogglePassword}>
                  {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </div>
              </div>
            </label>
            <label>
              <h3>비밀번호확인</h3>
              <div className="password-input">
                <MyInput
                  name="user-passwd"
                  value={formData.passwd}
                  placeholder="passwd"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) =>
                    setFormData({ ...formData, passwd: e.target.value })
                  }
                />
                <div
                  className="password-toggle"
                  onClick={handleTogglePasswordCheck}
                >
                  {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </div>
              </div>
            </label>
          </div>

          <button type="submit-button">회원가입</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
