import React, { useState, useEffect } from "react";
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
  const [emailCode, setEmailCode] = useState({
    code: "",
  });
  const [emailCodeSubmitted, setEmailCodeSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  // const [passwordMessage, setPasswordMessage] = useState("");
  // const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleTogglePasswordCheck = () => {
    setShowPasswordCheck((prevShowPasswordCheck) => !prevShowPasswordCheck);
  };

  function isValidEmail(value) {
    return /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value);
  }

  useEffect(() => {
    setPasswordsMatch(showPassword.passwd === showPasswordCheck.passwd);
  }, [showPassword.passwd, showPasswordCheck.passwd]);

  const handleSubmitEmail = async () => {
    try {
      const email = formData;

      if (!isValidEmail(email)) {
        alert("올바른 이메일 형식이 아닙니다.");
        return;
      }
      // await axios.post("https://onesons.site/register", {
      //   email,
      // });
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  const handleSubmitEmailCode = async () => {
    try {
      const emailCodes = emailCode;
      const email = formData;
      console.log(emailCodes, email);
      const response = await axios.post("https://onesons.site/register", {
        emailCodes,
        email,
      });
      if (response.data.isSuccess === true) {
        setEmailCodeSubmitted(true);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("오류 발생:", error);
    }
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
    if (name === "emailCode") {
      setEmailCode((prevEmailCode) => ({
        ...prevEmailCode,
        code: value,
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  return (
    <div className="container">
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
              disabled={emailCodeSubmitted}
            />
          </label>
        </div>
        <button type="submit-button" onClick={handleSubmitEmail}>
          인증 번호 보내기
        </button>

        <div className="user-emailpasswd">
          <label>
            <h3>이메일 확인 번호</h3>
            <MyInput
              name="emailCode"
              value={emailCode.code}
              placeholder="emailCode"
              onChange={handleInputChange}
            />
          </label>
        </div>
        <button type="submit-button" onClick={handleSubmitEmailCode}>
          확인
        </button>
        <div className="user-passwd">
          <label>
            <h3>비밀번호</h3>
            <div className="password-input">
              <MyInput
                name="user-passwd"
                value={showPassword.passwd}
                placeholder="passwd"
                type={showPassword ? "text" : "password"}
                onChange={(e) =>
                  setShowPassword({ ...showPassword, passwd: e.target.value })
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
                value={showPasswordCheck.passwd}
                placeholder="passwd"
                type={showPasswordCheck ? "text" : "password"}
                onChange={(e) =>
                  setShowPasswordCheck({
                    ...showPasswordCheck,
                    passwd: e.target.value,
                  })
                }
              />
              <div
                className="password-toggle"
                onClick={handleTogglePasswordCheck}
              >
                {showPasswordCheck ? <FaRegEyeSlash /> : <FaRegEye />}
              </div>
            </div>
          </label>
        </div>
        {!passwordsMatch && (
          <div className="password-match-error">
            비밀번호와 비밀번호 확인이 일치하지 않습니다.
          </div>
        )}
        <button type="submit-button" disabled={!passwordsMatch}>
          회원가입
        </button>
      </div>
    </div>
  );
}

export default Register;
