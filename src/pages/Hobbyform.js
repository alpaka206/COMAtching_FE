import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderNav from "../components/HeaderNav";
import "../css/pages/Hobbyform.css";
import { useRecoilState } from "recoil";
import { userState } from "../Atoms";

function Hobbyform() {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);

  const handleSubmit = () => {
    console.log(user.hobby);
    navigate("/form");
  };

  const handleHobbyClick = (index) => {
    // 이미 선택한 취미인지 확인
    const isAlreadySelected = user.hobby.includes(index);
    const updatedHobbies = isAlreadySelected
      ? user.hobby.filter((hobby) => hobby !== index)
      : user.hobby.length < 5
      ? [...user.hobby, index]
      : user.hobby;

    setUser((prevUser) => ({
      ...prevUser,
      hobby: updatedHobbies,
    }));
    console.log(updatedHobbies);
  };

  return (
    <div className="container">
      <HeaderNav destination="/" buttonText="처음으로" />
      <div className="content">
        <div>취미 선택하기</div>
        <div>본인의 취미를 알려주세요. (1-5개)</div>
        <div className="hobby-grid">
          {hobbyIcons.map((hobby, index) => (
            <button
              key={index}
              className={`hobby-item ${
                user.hobby.includes(hobby.label) ? "selected" : ""
              }`}
              onClick={() => handleHobbyClick(hobby.label)}
            >
              <img
                src={process.env.PUBLIC_URL + `assets/${hobby.image}.svg`}
                alt={hobby.alt}
              />
              <div>{hobby.label}</div>
            </button>
          ))}
        </div>
        <button className="submit-button" onClick={handleSubmit}>
          다음으로
        </button>
      </div>
    </div>
  );
}

// 각 취미에 대한 아이콘 및 레이블 데이터 배열
const hobbyIcons = [
  { image: "music", alt: "음악감상", label: "음악감상" },
  { image: "draw", alt: "그림그리기", label: "그림그리기" },
  { image: "game", alt: "게임", label: "게임" },
  { image: "photo", alt: "사진촬영", label: "사진촬영" },
  { image: "activity", alt: "액티비티", label: "액티비티" },
  { image: "exercise", alt: "운동", label: "운동" },
  { image: "alcohol", alt: "술", label: "술" },
  { image: "read", alt: "독서", label: "독서" },
  { image: "music", alt: "음악감상", label: "음악감상" },
  { image: "music", alt: "음악감상", label: "음악감상" },
  { image: "music", alt: "음악감상", label: "음악감상" },
  { image: "music", alt: "음악감상", label: "음악감상" },
  { image: "music", alt: "음악감상", label: "음악감상" },
  { image: "music", alt: "음악감상", label: "음악감상" },
  { image: "music", alt: "음악감상", label: "음악감상" },
];

export default Hobbyform;
