import React, { Fragment, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../Atoms";
import LoginUserInfoTop from "../components/LoginUserInfoTop";
import "../css/components/UserInfoRrev.css";
import UserInfoContainer from "../components/UserInfoContainer";
import { useNavigate } from "react-router-dom";

function UserInfoRrev({ user }) {
  const formData = useRecoilValue(userState);
  const navigate = useNavigate();
  const sliderRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);

  // 슬라이드 함수 정의
  const scroll = (pageIndex) => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = sliderRef.current.offsetWidth * pageIndex;
      setCurrentPage(pageIndex);
    }
  };

  return (
    <Fragment>
      <LoginUserInfoTop username={formData.contact_id} />

      <div className="User-Info-Rrev">
        {/* 좌측 화살표 */}
        {currentPage > 0 && (
          <div
            className="slider-arrow left"
            onClick={() => scroll(currentPage - 1)}
          >
            ◀
          </div>
        )}
        {/* 슬라이더 컨테이너 */}
        <div className="slider" ref={sliderRef}>
          <div className="sliderpage">
            <UserInfoContainer
              FirstTopic="전공"
              FirstText={formData.major}
              SecoundTopic="나이"
              SecondText={formData.age}
            />
            <UserInfoContainer
              FirstTopic="좋아하는 노래"
              FirstText={formData.song}
              SecoundTopic="MBTI"
              SecondText={formData.mbti}
            />
          </div>
          <div className="sliderpage">
            <UserInfoContainer FirstTopic="취미" FirstText={formData.hobby} />
            <UserInfoContainer
              FirstTopic="나를 표현하는 한마디"
              FirstText={formData.comment}
              SecoundTopic="연락빈도"
              SecondText={formData.contact_frequency}
            />
          </div>
        </div>
        {/* 우측 화살표 */}
        {currentPage < 1 && (
          <div
            className="slider-arrow right"
            onClick={() => scroll(currentPage + 1)}
          >
            ▶
          </div>
        )}
        <div className="User-Contact">
          {formData.contact_id}
          <button
            className="Userinfo-fix-button"
            onClick={() => navigate("/form")}
          >
            수정하기
          </button>
        </div>
      </div>
    </Fragment>
  );
}

export default UserInfoRrev;
