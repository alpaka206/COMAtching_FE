import React, { Fragment, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../Atoms";
import LoginUserInfoTop from "../components/LoginUserInfoTop";
import "../css/components/UserInfoRrev.css";
import UserInfoContainer from "../components/UserInfoContainer";

function UserInfoRrev() {
  const formData = useRecoilValue(userState);
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
      <LoginUserInfoTop />

      <div className="User-Info-Rrev">
        {/* 좌측 화살표 */}
        {currentPage > 0 && (
          <div
            className="slider-arrow left"
            onClick={() => scroll(currentPage - 1)}
          >
            &lt;
          </div>
        )}

        {/* 슬라이더 컨테이너 */}
        <div className="slider" ref={sliderRef}>
          <div className="sliderpage">
            <UserInfoContainer
              FirstTopic="전공"
              FirstText={formData.depart}
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
            <UserInfoContainer FirstTopic="취미" FirstText={formData.depart} />
            <UserInfoContainer
              FirstTopic="연락빈도"
              FirstText={formData.song}
            />
          </div>
        </div>

        {/* 우측 화살표 */}
        {currentPage < 1 && (
          <div
            className="slider-arrow right"
            onClick={() => scroll(currentPage + 1)}
          >
            &gt;
          </div>
        )}

        <div className="User-Contact">@kim.q1</div>
      </div>
    </Fragment>
  );
}

export default UserInfoRrev;
