import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";
import MyInput from "../components/MyInput";
import HeaderNav from "../components/HeaderNav";
import { useNavigate } from "react-router-dom";
import { userState } from "../Atoms";
import AgreementBox from "../components/AgreementBox";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  // State variables
  const [formData, setFormData] = useRecoilState(userState);
  const [registerCheck, setRegisterCheck] = useState({
    emailAuthCode: "",
    emailAuthCodeSubmitted: false,
    showUserPw: false,
    userPwCheck: "",
    showUserPwCheck: false,
    userPwMatch: false,
    isCheckedPrivacy: false,
    showAgreement: false,
  });
  const handleToggleAgreement = () => {
    setRegisterCheck((prevRegisterCheck) => ({
      ...prevRegisterCheck,
      showAgreement: !prevRegisterCheck.showAgreement,
    }));
    console.log(
      formData.userEmail,
      registerCheck.emailAuthCode,
      formData.userPw,
      registerCheck.userPwCheck
    );
  };

  const handleTogglePassword = () => {
    setRegisterCheck((prevRegisterCheck) => ({
      ...prevRegisterCheck,
      showUserPw: !registerCheck.showUserPw,
    }));
  };

  const handleTogglePasswordCheck = () => {
    setRegisterCheck((prevRegisterCheck) => ({
      ...prevRegisterCheck,
      showUserPwCheck: !registerCheck.showUserPwCheck,
    }));
  };

  function isValidEmail(value) {
    return /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value);
  }

  function isValidPassword(value) {
    return /^(?=.*[A-Za-z0-9])[A-Za-z\d@$!%*#?&]{6,}$/.test(value);
  }

  // useEffect(() => {
  //   setPasswordsMatch(formData.userPw === showPasswordCheck.passwd);
  // }, [formData.userPw, showPasswordCheck.passwd]);

  useEffect(() => {
    setRegisterCheck((prevRegisterCheck) => ({
      ...prevRegisterCheck,
      userPwMatch: formData.userPw === registerCheck.userPwCheck,
    }));
  }, [formData.userPw, registerCheck.userPwCheck]);

  const handleSubmitEmail = async () => {
    try {
      const postdata = {
        email: formData.userEmail,
      };
      console.log(postdata);

      if (!isValidEmail(formData.userEmail)) {
        console.log();
        alert("올바른 이메일 형식이 아닙니다.");
        return;
      } else {
        await axios.post("https://onesons.site/userEmail", postdata);
      }
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  const handleSubmitEmailCode = async () => {
    try {
      const postdata = {
        email: formData.email,
        emailAuthCode: registerCheck.emailAuthCode,
      };
      console.log(postdata);
      const response = await axios.post(
        "https://onesons.site/emailAuth",
        postdata
      );
      console.log(response);
      if (response === true) {
        setRegisterCheck((prevRegisterCheck) => ({
          ...prevRegisterCheck,
          emailAuthCodeSubmitted: true,
        }));
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
      if (!registerCheck.isCheckedPrivacy) {
        alert("개인정보 수집 및 이용에 동의해주세요.");
        return;
      } else if (!isValidPassword(formData.userPw)) {
        alert(
          "비밀번호는 최소 6자 이상이어야 하며, 특수문자를 포함해야 합니다."
        );
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

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePrivacyCheckboxChange = () => {
    setRegisterCheck((prevRegisterCheck) => ({
      ...prevRegisterCheck,
      isCheckedPrivacy: !prevRegisterCheck.isCheckedPrivacy,
    }));
  };

  return (
    <div className="container">
      <HeaderNav destination="/" buttonText="처음으로" />
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
                    name="userEmail"
                    value={formData.email}
                    placeholder="abc@gmail.com"
                    onChange={handleInputChange}
                    disabled={registerCheck.emailAuthCodeSubmitted}
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
                value={registerCheck.emailAuthCode}
                placeholder="인증번호"
                onChange={(e) =>
                  setRegisterCheck((prevRegisterCheck) => ({
                    ...prevRegisterCheck,
                    emailAuthCode: e.target.value,
                  }))
                }
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
                  name="userPw"
                  value={formData.userPw}
                  placeholder="6자 이상, 특수문자 포함"
                  type={registerCheck.showUserPw ? "text" : "password"}
                  onChange={handleInputChange}
                />
                <div className="password-toggle" onClick={handleTogglePassword}>
                  {registerCheck.showUserPw ? <FaRegEyeSlash /> : <FaRegEye />}
                </div>
              </div>
            </label>
            <label>
              <div className="pw-check-input">
                <MyInput
                  name="user-passwd"
                  value={registerCheck.userPwCheck}
                  placeholder="비밀번호 재확인"
                  type={registerCheck.showUserPwCheck ? "text" : "password"}
                  onChange={(e) =>
                    setRegisterCheck((prevRegisterCheck) => ({
                      ...prevRegisterCheck,
                      userPwCheck: e.target.value,
                    }))
                  }
                />

                <div
                  className="password-toggle"
                  onClick={handleTogglePasswordCheck}
                >
                  {registerCheck.showUserPwCheck ? (
                    <FaRegEyeSlash />
                  ) : (
                    <FaRegEye />
                  )}
                </div>
              </div>
            </label>
          </div>
          {!registerCheck.userPwMatch && (
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
                checked={registerCheck.isCheckedPrivacy}
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
          {registerCheck.showAgreement && (
            <AgreementBox handleCloseAgreement={handleToggleAgreement} />
          )}
          <button
            className="reg-next-button"
            onClick={handleSubmit}
            disabled={!registerCheck.userPwMatch}
          >
            다음 &gt;
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
