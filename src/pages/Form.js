import React, { useState } from "react";
import axios from "axios";
import { validateForm } from "../myfunction/formValidation";
import { useRecoilState } from "recoil";
import { userState, selectedMBTIState } from "../Atoms";
import { useNavigate } from "react-router-dom";
import MyInput from "../components/MyInput";
import HeaderNav from "../components/HeaderNav";
import MajorSelector from "../components/MajorSelector";
import FormTitle from "../components/FormTitle";
import "../css/pages/Form.css";
import AgeInputInput from "../components/AgeInput";
import ContactMethod from "../components/ContactMethod";
import GenderSelect from "../components/GenderSelect";
import MBTISection from "../components/MBTISection";
import hobbyIcons from "../data/hobbyIcons";

function Form() {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  const [selectedMBTI, setSelectedMBTI] = useRecoilState(selectedMBTIState);
  const [checkMethod, setCheckMethod] = useState({
    department: "",
    major: "",
    contactVerified: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let errorMessage = "";

    switch (name) {
      case "contact_id":
        setUser((prevUser) => ({ ...prevUser, contact_id_Verified: true }));
        break;
      case "song":
        if (!/^[^?~!@#$%^&*()+'"<>\\/|{}[\]_=;:]{0,11}$/.test(value)) {
          errorMessage = "노래에는 특수 기호를 사용할 수 없습니다";
        }
        break;
      default:
        break;
    }

    if (errorMessage) {
      alert(errorMessage);
    } else {
      setUser((prevUser) => ({ ...prevUser, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 입력값 유효성 검사
    if (!validateForm(user)) {
      return;
    }

    // 학번을 정수형으로 변환
    const ageAsInt = parseInt(user.age, 10);

    // POST 요청에 필요한 데이터 구성
    const postData = {
      major: user.major,
      age: ageAsInt,
      // contact: user.contact,
      contact_id: user.contact_id,
      gender: user.gender,
      contact_frequency: user.contact_frequency,
      mbti: user.mbti,
      hobby: user.hobby,
      song: user.song,
      comment: user.comment,
    };
    console.log(user.token);
    try {
      const response = await axios.post(
        "https://catholic-mibal.site/account/register-detail",
        postData,
        {
          headers: {
            Authorization: user.token,
          },
        }
      );
      console.log(response);
      if (
        response.data.code === "SEC-001" ||
        response.data.code === "SEC-002"
      ) {
        localStorage.removeItem("token");
        navigate("/");
      } else if (response.data.status === 200) {
        const token = response.data.data.update_token;
        localStorage.setItem("token", token);
        navigate("/");
      } else {
        // 등록 실패 시 오류 메시지 표시
        // alert(response.data.message);
        alert("가입 실패");
      }
    } catch (error) {
      // 오류 발생 시 콘솔에 오류 로그 출력
      console.error("오류 발생:", error);
    }
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

    setSelectedMBTI((prevMBTI) => ({
      ...prevMBTI,
      [category]: value,
    }));

    setUser((prevUser) => ({
      ...prevUser,
      mbti: `${category === "EI" ? value : selectedMBTI.EI}${
        category === "SN" ? value : selectedMBTI.SN
      }${category === "TF" ? value : selectedMBTI.TF}${
        category === "PJ" ? value : selectedMBTI.PJ
      }`,
      isLoggedIn: true,
    }));
  };

  const handleAgeClick = (value, index) => {
    setUser((prev) => ({
      ...prev,
      contact_frequency: value,
    }));
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <HeaderNav />
        <div className="form-inner-content">
          <FormTitle />
          <MajorSelector
            user={user}
            setUser={setUser}
            checkMethod={checkMethod}
            setCheckMethod={setCheckMethod}
          />
          <AgeInputInput value={user.age} onChange={handleChange} />

          <ContactMethod
            checkMethod={checkMethod}
            setCheckMethod={setCheckMethod}
            user={user}
            setUser={setUser}
            handleChange={handleChange}
          />
          <GenderSelect user={user} setUser={setUser} />
          <div>
            <h3>연락빈도</h3>
            <div className="match-select-button">
              <button
                type="button"
                className={`form-AgeMaker ${
                  user.contact_frequency === "자주" ? "selected" : ""
                }`}
                value={"자주"}
                onClick={() => handleAgeClick("자주", 0)}
              >
                {"자주"}
              </button>
              <button
                type="button"
                className={`form-AgeMaker ${
                  user.contact_frequency === "보통" ? "selected" : ""
                }`}
                value={"보통"}
                onClick={() => handleAgeClick("보통", 1)}
              >
                {"보통"}
              </button>
              <button
                type="button"
                className={`form-AgeMaker ${
                  user.contact_frequency === "가끔" ? "selected" : ""
                }`}
                value={"가끔"}
                onClick={() => handleAgeClick("가끔", 2)}
              >
                {"가끔"}
              </button>
            </div>
          </div>
          <h3>MBTI</h3>
          <MBTISection user={user.mbti} onClick={handleMBTISelection} />
          <div>
            <h3>취미</h3>
            <div className="form-selected-hobbies">
              {user.hobby.map((hobbyLabel, index) => {
                const hobby = hobbyIcons.find(
                  (item) => item.label === hobbyLabel
                );
                return (
                  <div
                    key={index}
                    className="selected-hobby"
                    onClick={() => navigate("/Hobby")}
                  >
                    <img
                      src={process.env.PUBLIC_URL + `assets/${hobby.image}.svg`}
                      alt={hobby.alt}
                    />
                    <div>{hobby.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <label>
              <h3>좋아하는 노래</h3>
              <div className="music">
                <MyInput
                  name="song"
                  value={user.song}
                  onChange={handleChange}
                  placeholder="ex) Antifreeze"
                  className="song-input"
                />
              </div>
            </label>
          </div>
          <div>
            <label>
              <h3>나를 소개할 한마디</h3>
              <div className="music">
                <MyInput
                  name="comment"
                  value={user.comment}
                  onChange={handleChange}
                  placeholder="상대에게 전하고 싶은 말을 자유롭게 작성해 주세요"
                  className="comment-input"
                />
              </div>
            </label>
          </div>

          {/* <button type="submit-button" disabled={!isContactVerified}> */}
          <button className="submit-button">다음으로</button>
        </div>
      </form>
    </div>
  );
}

export default Form;
