import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { userState } from "../Atoms";
import axios from "axios";
import MyInput from "../components/MyInput";
import ComatHeader from "../components/ComatHeader";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useRecoilState(userState);
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { email, passwd } = formData;
      const response = await axios.post("https://onesons.site/register", {
        email,
        passwd,
      });

      const { token, isSuccess, message } = response.data;

      if (isSuccess === true) {
        // localStorage.setItem("jwtToken", token);
        document.cookie = `jwtToken=${token}; path=/;`;
        navigate("/form");
      } else {
        alert(message);
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
          <div className="user-email">
            <label>
              <h3>이메일</h3>
              <MyInput
                name="user-email"
                value={formData.email}
                placeholder="email"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </label>
          </div>
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
          </div>
          <button type="submit-button">로그인</button>
          <div onClick={() => navigate("/Register")}>회원가입하기</div>
        </div>
      </form>
    </div>
  );
}

export default Login;
