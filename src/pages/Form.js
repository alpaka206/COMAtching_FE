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
      case "studentid":
        if (!/^\d{0,2}$/.test(value)) {
          errorMessage = "학번은 2자리의 숫자로 입력하세요. (예: 22)";
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

    const studentidAsInt = parseInt(user.studentid, 10);

    const postData = {
      gender: user.gender,
      phone: user.phone,
      depart: user.depart,
      song: user.song,
      mbti: user.mbti,
      userEmail: user.userEmail,
      userPw: user.userPw,
      studentid: studentidAsInt,
    };
    try {
      const response = await axios.post(
        "https://onesons.site/register",
        postData
      );

      if (response.data.isSuccess === true) {
        setUser((prevUser) => ({
          userEmail: "",
          userPw: "",
          depart: "",
          studentid: "",
          phone: "",
          song: "",
          gender: true,
          mbti: "",
        }));
        navigate("/login");
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
            <StudentIdInput value={user.studentid} onChange={handleChange} />

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
