import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderNav from "../components/HeaderNav";
import "../css/pages/Hobbyform.css";
import { useRecoilState } from "recoil";
import { userState } from "../Atoms";
import hobbyIcons from "../data/hobbyIcons";

function Hobbyform() {
  const navigate = useNavigate();
  const [pickHobby, setPickHobby] = useRecoilState(userState);

  const handleSubmit = () => {
    console.log(pickHobby.hobby);
    navigate("/form");
  };

  const handleHobbyClick = (index) => {
    // 이미 선택한 취미인지 확인
    const isAlreadySelected = pickHobby.hobby.includes(index);
    const updatedHobbies = isAlreadySelected
      ? pickHobby.hobby.filter((hobby) => hobby !== index)
      : pickHobby.hobby.length < 5
      ? [...pickHobby.hobby, index]
      : pickHobby.hobby;

    setPickHobby((prevUser) => ({
      ...prevUser,
      hobby: updatedHobbies,
    }));
    console.log(updatedHobbies);
  };

  return (
    <div className="container">
      <HeaderNav destination="/" buttonText="처음으로" />
      <div className="content">
        <div className="select-hobby-topic">취미 선택하기</div>
        <div className="select-hobby-text">
          본인의 취미를 알려주세요. (1-5개)
        </div>
        <div className="selected-hobbies">
          {pickHobby.hobby.map((hobbyLabel, index) => {
            const hobby = hobbyIcons.find((item) => item.label === hobbyLabel);
            return (
              <div key={index} className="selected-hobby">
                <img
                  src={process.env.PUBLIC_URL + `assets/${hobby.image}.svg`}
                  alt={hobby.alt}
                />
                <div>{hobby.label}</div>
              </div>
            );
          })}
        </div>
        <div className="hobby-grid">
          {hobbyIcons.map((hobby, index) => (
            <button
              key={index}
              className={`hobby-item ${
                pickHobby.hobby.includes(hobby.label) ? "selected" : ""
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

export default Hobbyform;
