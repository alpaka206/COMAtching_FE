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
import StudentIdInput from "../components/StudentIdInput";
import ContactMethod from "../components/ContactMethod";
import GenderSelect from "../components/GenderSelect";
import MBTISection from "../components/MBTISection";

function Form() {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  const [selectedMBTI, setSelectedMBTI] = useRecoilState(selectedMBTIState);
  const [checkMethod, setCheckMethod] = useState({
    contactMethod: "phone",
    department: "",
    major: "",
    contactVerified: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let errorMessage = "";

    switch (name) {
      case "age":
        if (!/^9[7-9]|0[0-5]$/.test(value)) {
          errorMessage =
            "탄생년도는 97부터 05까지의 숫자로 입력하세요. (예: 05)";
        }
        break;

      case "phone":
        if (!/^\d{0,11}$/.test(value)) {
          errorMessage =
            checkMethod.contactMethod === "insta"
              ? "인스타 아이디는 영어, 숫자, 언더바(_), 마침표(.)만 가능합니다."
              : "(-) 없이 전화번호를 입력하세요. (예: 01012345678)";
        }
        break;
      case "song":
        if (!/^[^?~!@#$%^&*()+'"<>\\/|{}[\]_=;:]{0,30}$/.test(value)) {
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
    if (
      !validateForm(
        user,
        checkMethod.major,
        checkMethod.contactMethod,
        checkMethod.contactVerified
      )
    ) {
      return;
    }

    // 학번을 정수형으로 변환
    const ageAsInt = parseInt(user.age, 10);

    // POST 요청에 필요한 데이터 구성
    const postData = {
      gender: user.gender,
      phone: user.phone,
      depart: user.depart,
      song: user.song,
      mbti: user.mbti,
      userEmail: user.userEmail,
      userPw: user.userPw,
      age: ageAsInt,
    };

    try {
      // 서버로 데이터 전송
      const response = await axios.post(
        "https://onesons.site/register",
        postData
      );

      if (response.data.isSuccess === true) {
        // 등록 성공 시 사용자 정보 초기화 및 로그인 페이지로 이동
        setUser((prevUser) => ({
          userEmail: "",
          userPw: "",
          depart: "",
          age: "",
          phone: "",
          song: "",
          gender: true,
          mbti: "",
        }));
        navigate("/login");
      } else {
        // 등록 실패 시 오류 메시지 표시
        alert(response.data.message);
      }
    } catch (error) {
      // 오류 발생 시 콘솔에 오류 로그 출력
      console.error("오류 발생:", error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <HeaderNav destination="/" buttonText="처음으로" />
        <div className="content">
          <div className="inner-content">
            <FormTitle />
            <MajorSelector
              user={user}
              setUser={setUser}
              checkMethod={checkMethod}
              setCheckMethod={setCheckMethod}
            />
            <StudentIdInput value={user.age} onChange={handleChange} />

            <ContactMethod
              checkMethod={checkMethod}
              setCheckMethod={setCheckMethod}
              user={user}
              handleChange={handleChange}
            />

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
            <GenderSelect user={user} setUser={setUser} />

            <MBTISection
              user={user}
              setUser={setUser}
              setSelectedMBTI={setSelectedMBTI}
              selectedMBTI={selectedMBTI}
            />
            {/* <button type="submit-button" disabled={!isContactVerified}> */}
            <button className="submit-button">매칭 등록(Click) ▶</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Form;
