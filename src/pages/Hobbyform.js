import React from "react";
import { useNavigate } from "react-router-dom";
import HeaderNav from "../components/HeaderNav";
import "../css/pages/Hobbyform.css";
import { useRecoilState } from "recoil";
import { userState } from "../Atoms";
import hobbyIcons from "../data/hobbyIcons"; // 취미 아이콘 데이터
import MemoizedHobbyElement from "../components/HobbyElement";
import MemoizedHobbyChoice from "../components/HobbyChoice";
function Hobbyform() {
  const navigate = useNavigate();
  const [pickHobby, setPickHobby] = useRecoilState(userState);

  // 제출 버튼 클릭 시 실행
  const handleSubmit = () => {
    if (pickHobby.hobby.length < 1) {
      alert("관심사를 최소 1개 이상 선택해주세요.");
      return false;
    }
    navigate("/Register");
  };

  // 취미 아이템 클릭 시 실행되는 함수
  const handleHobbyClick = (index) => {
    // 이미 선택한 취미인지, 5개 미만인지 확인
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
  };

  return (
    <div className="container">
      <HeaderNav />
      <div className="content">
        <div className="select-hobby-topic">취미 선택하기</div>
        <div className="select-hobby-text">
          본인의 취미를 알려주세요. (1-5개)
        </div>
        {/*고른 취미 보여주는 칸(컴포넌트화 더 진행할지 고민중입니다) */}
        <div className="selected-hobbies">
          {pickHobby.hobby.map((label, index) => {
            const hobby = hobbyIcons.find((item) => item.label === label);
            return (
              <MemoizedHobbyElement
                index={index}
                hobby={hobby}
                className="selected-hobby"
              />
            );
          })}
        </div>
        <div className="hobby-grid">
          {hobbyIcons.map((hobby, index) => (
            <MemoizedHobbyChoice
              index={index}
              hobby={hobby}
              pickHobby={pickHobby}
              handleHobbyClick={handleHobbyClick}
            />
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
