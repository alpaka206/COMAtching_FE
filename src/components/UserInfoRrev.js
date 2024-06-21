import React, { Fragment, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../Atoms";
import LoginUserInfoTop from "../components/LoginUserInfoTop";
import "../css/components/UserInfoRrev.css";
import UserInfoContainer from "../components/UserInfoContainer";
import { useNavigate } from "react-router-dom";

function UserInfoRrev({ user, ifMainpage }) {
  const navigate = useNavigate();
  const sliderRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  // 유저정보 컨테이너를 슬라이딩하기 위함입니다.
  // 위아래는 지정하지 않았는데 슬라이딩되어서 수정이 필요합니다.
  // 슬라이드 함수 정의
  const scroll = (pageIndex) => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = sliderRef.current.offsetWidth * pageIndex;
      setCurrentPage(pageIndex);
    }
  };

  return (
    <Fragment>
      {ifMainpage && <LoginUserInfoTop username={user.contact_id} />}

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
              FirstText={user.major}
              SecoundTopic="나이"
              SecondText={user.age}
            />
            <UserInfoContainer
              FirstTopic="좋아하는 노래"
              FirstText={user.song}
              SecoundTopic="MBTI"
              SecondText={user.mbti}
            />
          </div>
          <div className="sliderpage">
            <UserInfoContainer FirstTopic="취미" FirstText={user.hobby} />
            <UserInfoContainer
              FirstTopic="나를 표현하는 한마디"
              FirstText={user.comment}
              SecoundTopic="연락빈도"
              SecondText={user.contact_frequency}
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
          <div
            onClick={() => {
              if (user.contact === "instagram") {
                // user.contact가 'instagram'인 경우에만 작동
                window.open(`https://www.instagram.com/${user.contact_id}/`);
              }
            }}
          >
            {user.contact_id}
          </div>

          {ifMainpage && (
            <button
              className="Userinfo-fix-button"
              onClick={() => navigate("/form")}
            >
              수정하기
            </button>
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default UserInfoRrev;
