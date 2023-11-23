import React from "react";
import axios from "axios";
import MyInput from "../components/MyInput";
import MBTIButton from "../components/MBTIButton";
import GenderButton from "../components/GenderButton";
import ComatHeader from "../components/ComatHeader";
import majorCategories from "../data/majorCategories";
import { validateForm } from "../myfunction/formValidation";
import { useRecoilState } from "recoil";
import {
  userState,
  selectedMBTIState,
  contactMethodState,
  selectedCategoryState,
  selectedMajorState,
  isContactVerifiedState,
} from "../Atoms";
import { useNavigate } from "react-router-dom";
import "./Form.css";

function Form() {
  const navigate = useNavigate();

  // State variables
  const [user, setUser] = useRecoilState(userState);
  const [selectedMBTI, setSelectedMBTI] = useRecoilState(selectedMBTIState);
  const [contactMethod, setContactMethod] = useRecoilState(contactMethodState);
  const [selectedCategory, setSelectedCategory] = useRecoilState(
    selectedCategoryState
  );
  const [selectedMajor, setSelectedMajor] = useRecoilState(selectedMajorState);
  const [isContactVerified, setIsContactVerified] = useRecoilState(
    isContactVerifiedState
  );

  function validateYear(value) {
    return /^\d{0,2}$/.test(value);
  }

  function validatePhone(value) {
    return /^\d{0,11}$/.test(value);
  }

  function validateSong(value) {
    return /^[^?~!@#$%^&*()+'"<>\\/|{}[\]_=;:]{0,30}$/.test(value);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "year" && !validateYear(value)) {
      alert("학번은 2자리의 숫자로 입력하세요. (예: 22)");
    } else if (
      name === "phone" &&
      contactMethod === "phone" &&
      !validatePhone(value)
    ) {
      alert("(-)없이 전화번호를 입력하세요. (예: 01012345678)");
    } else if (
      name === "phone" &&
      contactMethod === "insta" &&
      !validatePhone(value)
    ) {
      alert("인스타 아이디는 영어,숫자,언더바(_),마침표(.)만 가능합니다.");
    } else if (name === "song" && !validateSong(value)) {
      alert("노래에는 특수기호를 쓸수 없습니다");
    } else {
      setUser((prevUser) => ({ ...prevUser, [name]: value }));
    }
  };

  const handleContactMethod = (method) => {
    setContactMethod(method);
  };

  const handleGenderSelection = (value) => {
    setUser((prevUser) => ({
      ...prevUser,
      gender: value === "male" ? true : false,
    }));
  };

  const handleMBTISelection = (value) => {
    const category =
      value === "E" || value === "I"
        ? "EI"
        : value === "S" || value === "N"
        ? "SN"
        : value === "T" || value === "F"
        ? "TF"
        : "PJ";

    // Update the corresponding state variable with the selected value
    setSelectedMBTI((prevMBTI) => ({
      ...prevMBTI,
      [category]: value,
    }));
    // Update formData's mbti with the selected preferences
    setUser((prevUser) => ({
      ...prevUser,
      mbti: `${category === "EI" ? value : selectedMBTI.EI}${
        category === "SN" ? value : selectedMBTI.SN
      }${category === "TF" ? value : selectedMBTI.TF}${
        category === "PJ" ? value : selectedMBTI.PJ
      }`,
    }));
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedMajor("");
    setUser((prevUser) => ({
      ...prevUser,
      depart: e.target.value,
    }));
  };

  const handleMajorChange = (e) => {
    setSelectedMajor(e.target.value);
    setUser((prevUser) => ({
      ...prevUser,
      depart: e.target.value,
    }));
  };

  const checkIfExists = async () => {
    const response = await axios.get(
      `https://onesons.site/register?phone=${user.phone}`
    );
    return response;
  };

  const handleCheck = async () => {
    const response = await checkIfExists();
    const alreadyExists = response.data;
    console.log(response.data);
    console.log(alreadyExists);
    if (alreadyExists) {
      alert(
        `1이미 존재하는 ${
          contactMethod === "phone" ? "전화번호" : "인스타그램 ID"
        }입니다.`
      );
    } else {
      alert(
        `2입력한 ${
          contactMethod === "phone" ? "전화번호" : "인스타그램 ID"
        }는 사용 가능합니다.`
      );
      setIsContactVerified(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm(user, selectedMajor, contactMethod, isContactVerified)) {
      return;
    }

    const yearAsInt = parseInt(user.year, 10);
    const formDataWithIntYear = {
      ...user,
      year: yearAsInt,
    };

    try {
      const response = await axios.post(
        "https://onesons.site/register",
        formDataWithIntYear
      );

      if (response.data.isSuccess === true) {
        setUser((prevUser) => ({ ...prevUser, isLoggedIn: true }));
        navigate("/");
      } else {
        alert(response.data.message);
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
          <div onSubmit={handleSubmit} style={{ display: "flex" }}>
            <div className="depart">
              <label>
                <h3>학과</h3>
              </label>
              <label className="depart-select">
                <select
                  name="depart"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option value="" style={{ paddingRight: "15px" }} disabled>
                    선택
                  </option>
                  {majorCategories.map((category) => (
                    <option key={category.label} value={category.label}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="major">
              <label>
                <h3 class="major">전공</h3>
              </label>
              <label className="major-select">
                <select
                  name="major"
                  value={selectedMajor}
                  onChange={handleMajorChange}
                >
                  <option value="" disabled>
                    선택
                  </option>
                  {selectedCategory &&
                    majorCategories
                      .find((category) => category.label === selectedCategory)
                      .options.map((major) => (
                        <option key={major} value={major}>
                          {major}
                        </option>
                      ))}
                </select>
              </label>
            </div>
          </div>
          <div>
            <label>
              <h3>학번</h3>
              <MyInput
                name="year"
                value={user.year}
                onChange={handleChange}
                placeholder="00학번부터 23학번까지 가능합니다 ex)23"
              />
            </label>
          </div>
          <div className="contact-method">
            <label>
              <h3 class="phone">연락처</h3>
              <div className="space">&nbsp;</div>
              <button
                type="button"
                className="phonebutton"
                onClick={() => handleContactMethod("phone")}
              >
                <img
                  src={process.env.PUBLIC_URL + `assets/phone.png`}
                  alt="전화번호"
                  style={{
                    width: "13px",
                    height: "13px",
                  }}
                />
              </button>
              <button
                type="button"
                className="phonebutton"
                onClick={() => handleContactMethod("insta")}
              >
                <img
                  src={process.env.PUBLIC_URL + `assets/insta.png`}
                  alt="insta"
                  style={{
                    width: "16px",
                    height: "16px",
                    marginTop: "-3px",
                  }}
                />
              </button>
            </label>
            <div className="contact-input">
              {contactMethod === "phone" ? (
                <label>
                  <MyInput
                    name="phone"
                    value={user.phone}
                    onChange={handleChange}
                    placeholder="ex)01012345678"
                  />
                  <button
                    type="button"
                    class="checkbutton"
                    onClick={handleCheck}
                  >
                    확인
                  </button>
                </label>
              ) : (
                <label>
                  <MyInput
                    name="phone"
                    value={user.phone}
                    onChange={handleChange}
                    placeholder="ex)cuk_coma (@는 빼고 넣어주세요)"
                  />
                  <button
                    type="button"
                    class="checkbutton"
                    onClick={handleCheck}
                  >
                    확인
                  </button>
                </label>
              )}
            </div>
          </div>
          <h6 className={`check-message ${isContactVerified ? "hidden" : ""}`}>
            중복입력 방지를 위해 확인버튼을 눌러주세요
          </h6>
          <div>
            <label>
              <h3>좋아하는 노래</h3>
              <MyInput
                name="song"
                value={user.song}
                onChange={handleChange}
                placeholder="ex)antifreeze"
                className="song-input"
              />
            </label>
          </div>
          <div>
            <label>
              <h3>성별</h3>
              <div className="gender-button-container">
                <GenderButton
                  isActive={user.gender}
                  value="male"
                  onClick={handleGenderSelection}
                  label="남자"
                  className="gender-button"
                />
                <GenderButton
                  isActive={!user.gender}
                  value="female"
                  onClick={handleGenderSelection}
                  label="여자"
                  className="gender-button"
                />
              </div>
            </label>
          </div>
          <div className="mbtidiv">
            <label>
              <h3>MBTI</h3>
              <div className="mbtibutton-container">
                {/* 첫 번째 열 */}
                <div className="mbtibutton-column">
                  <MBTIButton
                    isActive={user.mbti.includes("E")}
                    onClick={() => handleMBTISelection("E")}
                    label="E"
                    className="mbtibutton"
                  />
                  <MBTIButton
                    isActive={user.mbti.includes("I")}
                    onClick={() => handleMBTISelection("I")}
                    label="I"
                    className="mbtibutton"
                  />
                </div>

                {/* 두 번째 열 */}
                <div className="mbtibutton-column">
                  <MBTIButton
                    isActive={user.mbti.includes("N")}
                    onClick={() => handleMBTISelection("N")}
                    label="N"
                    className="mbtibutton"
                  />
                  <MBTIButton
                    isActive={user.mbti.includes("S")}
                    onClick={() => handleMBTISelection("S")}
                    label="S"
                    className="mbtibutton"
                  />
                </div>

                {/* 세 번째 열 */}
                <div className="mbtibutton-column">
                  <MBTIButton
                    isActive={user.mbti.includes("T")}
                    onClick={() => handleMBTISelection("T")}
                    label="T"
                    className="mbtibutton"
                  />
                  <MBTIButton
                    isActive={user.mbti.includes("F")}
                    onClick={() => handleMBTISelection("F")}
                    label="F"
                    className="mbtibutton"
                  />
                </div>

                {/* 네 번째 열 */}
                <div className="mbtibutton-column">
                  <MBTIButton
                    isActive={user.mbti.includes("P")}
                    onClick={() => handleMBTISelection("P")}
                    label="P"
                    className="mbtibutton"
                  />
                  <MBTIButton
                    isActive={user.mbti.includes("J")}
                    onClick={() => handleMBTISelection("J")}
                    label="J"
                    className="mbtibutton"
                  />
                </div>
              </div>
            </label>
          </div>
          {/* <button type="submit-button" disabled={!isContactVerified}> */}
          <button type="submit-button">매칭 등록(Click) ▶</button>
        </div>
      </form>
    </div>
  );
}

export default Form;