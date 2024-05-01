import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderNav from "../components/HeaderNav";
import "../css/pages/Hobbyform.css";

function Hobbyform() {
  const navigate = useNavigate();
  const [selectedHobbyIndex, setSelectedHobbyIndex] = useState(null);

  const handleHobbyClick = (index) => {
    setSelectedHobbyIndex(index);
  };

  return (
    <div className="container">
      <HeaderNav destination="/" buttonText="처음으로" />
      <div className="content">
        <div>취미 선택하기</div>
        <div>본인의 취미를 알려주세요. (1-5개)</div>
        <div className="hobby-grid">
          {/* 취미 아이콘 그리드 */}
          {hobbyIcons.map((hobby, index) => (
            <button
              key={index}
              className={`hobby-item ${
                selectedHobbyIndex === index ? "selected" : ""
              }`}
              onClick={() => handleHobbyClick(index)}
            >
              <img
                src={process.env.PUBLIC_URL + `assets/${hobby.image}.svg`}
                alt={hobby.alt}
              />
              <div>{hobby.label}</div>
            </button>
          ))}
        </div>
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
