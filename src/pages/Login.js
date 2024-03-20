import React, { useState, useEffect } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { userState } from "../Atoms";
import axios from "axios";
import MyInput from "../components/MyInput";
import HeaderNav from "../components/HeaderNav";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useRecoilState(userState);
  const [showPassword, setShowPassword] = useState(false);
  const Rest_api_key = "4c2e27b993e068dde1cd69f0f5c8fff8"; //REST API KEY
  const redirect_uri = "http://localhost:3000/login"; //Redirect URI
  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  const handleLogin = () => {
    window.location.href = kakaoURL;
  };
  useEffect(() => {});
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const code = new URL(window.location.href).searchParams.get("code"); // 코드 보내기
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const postdata = {
        userEmail: formData.userEmail,
        userPw: formData.userPw,
      };
      const response = await axios.post("https://onesons.site/login", postdata);

      console.log(response);
      if (response.data.isSuccess === true) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          passwd: response.data.result.passwd,
          gender: response.data.result.gender,
          phone: response.data.result.phone,
          depart: response.data.result.depart,
          song: response.data.result.song,
          mbti: response.data.result.mbti,
          year: response.data.result.year,
          chance: response.data.result.chance,
          isLoggedIn: true,
        }));
        console.log(formData);
        navigate("/");
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
        <HeaderNav destination="/" buttonText="처음으로" />
        <div className="content">
          <div className="inner-content">
            <div className="title">
              <div className="title-text">Login</div>
              <div className="title-inst-txt">
                가입하신 이메일과 비밀번호를
                <br />
                입력해 주세요.
              </div>
            </div>
            <div className="user-email">
              <label>
                이메일
                <div className="email-input">
                  <MyInput
                    name="userEmail"
                    value={formData.userEmail}
                    placeholder="example@gmail.com"
                    onChange={handleInputChange}
                  />
                </div>
              </label>
            </div>
            <div className="user-passwd">
              <label>
                비밀번호
                <div className="password-input">
                  <MyInput
                    name="userPw"
                    value={formData.userPw}
                    placeholder="비밀번호를 입력해주세요"
                    type={showPassword ? "text" : "password"}
                    onChange={handleInputChange}
                  />
                  <div
                    className="password-toggle"
                    onClick={handleTogglePassword}
                  >
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </div>
                </div>
              </label>
            </div>
            <button class="login-button">
              <span>로그인</span>
            </button>
            <button onClick={handleLogin}>카카오 로그인</button>

            <div class="line-identifier"></div>
            <div className="register">
              <div className="reg-recommend">
                <div className="rec-text-title">아직 회원이 아니신가요?</div>
                <p className="rec-text-inst">
                  가입하시고 코매칭의 모든 서비스를 경험하세요!
                </p>
              </div>
              <div
                className="register-button"
                onClick={() => navigate("/Register")}
              >
                <span>회원가입</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
