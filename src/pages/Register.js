import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";
import MyInput from "../components/MyInput";
import ComatHeader from "../components/ComatHeader";
import { useNavigate } from "react-router-dom";
import { userState } from "../Atoms";
import AgreementBox from "../components/AgreementBox";
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
  const [isCheckedPrivacy, setIsCheckedPrivacy] = useState(false); // State for privacy agreement checkbox
  const [showAgreement, setShowAgreement] = useState(false);

  // const [passwordMessage, setPasswordMessage] = useState("");
  // const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
  const handleToggleAgreement = () => {
    setShowAgreement((prevShowAgreement) => !prevShowAgreement);
  };

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
      if (!isCheckedPrivacy) {
        alert("개인정보 수집 및 이용에 동의해주세요.");
        return;
      } else {
        navigate("/Form");
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

  const handlePrivacyCheckboxChange = () => {
    setIsCheckedPrivacy((prev) => !prev);
  };

  return (
    <div className="container">
      <ComatHeader destination="/" buttonText="처음으로" />
      <div className="content">
        <div className="inner-content">
          <div className="title">
            <div className="title-text">Sign Up</div>
            <div className="title-inst-txt">
              가입할 이메일과 비밀번호를
              <br />
              입력해 주세요.
            </div>
          </div>
          <div className="reg-email">
            <label>
              이메일
              <div className="reg-email-input">
                <div className="reg-email-box">
                  <MyInput
                    name="email"
                    value={formData.email}
                    placeholder="abc@gmail.com"
                    onChange={handleInputChange}
                    disabled={emailCodeSubmitted}
                  />
                </div>
                <button className="code-send-btn" onClick={handleSubmitEmail}>
                  <span>인증번호 전송</span>
                </button>
              </div>
            </label>
          </div>
          <div className="user-emailpasswd">
            <div className="emailpasswd-box">
              <MyInput
                name="emailCode"
                value={emailCode.code}
                placeholder="인증번호"
                onChange={handleInputChange}
              />
            </div>
            <button
              className="emailcheck-button"
              onClick={handleSubmitEmailCode}
            >
              확인
            </button>
          </div>

          <div className="register-passwd">
            <label>
              비밀번호
              <div className="reg-pw-input">
                <MyInput
                  name="user-passwd"
                  value={showPassword.passwd}
                  placeholder="6자 이상, 특수문자 포함"
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
              <div className="pw-check-input">
                <MyInput
                  name="user-passwd"
                  value={showPasswordCheck.passwd}
                  placeholder="비밀번호 재확인"
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
          <div className="checkbox-label">
            <label
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                fontWeight: "bold",
                margin: "10px 0",
              }}
            >
              <input
                type="checkbox"
                checked={isCheckedPrivacy}
                onChange={handlePrivacyCheckboxChange}
                style={{
                  width: "13px",
                  textAlign: "center",
                }}
              />
              <div
                style={{
                  paddingTop: "2px",
                }}
              >
                개인정보 수집 및 이용에 대해 동의합니다
              </div>
            </label>
          </div>
          <div>
            <button className="privacy-button" onClick={handleToggleAgreement}>
              개인정보 수집 활용 동의서
            </button>
          </div>
          {showAgreement && (
            <AgreementBox handleCloseAgreement={handleToggleAgreement} />
          )}
          <button
            className="reg-next-button"
            onClick={handleSubmit}
            disabled={!passwordsMatch}
          >
            다음 &gt;
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
