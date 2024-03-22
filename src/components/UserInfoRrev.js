import React, { Fragment, useRef } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../Atoms";
import LoginUserInfoTop from "../components/LoginUserInfoTop";
import "../css/components/UserInfoRrev.css";
import UserInfoContainer from "../components/UserInfoContainer";

function UserInfoRrev() {
  const formData = useRecoilValue(userState);
  const sliderRef = useRef(null);

  const scroll = (scrollOffset) => {
    sliderRef.current.scrollLeft += scrollOffset;
  };

  return (
    <Fragment>
      <LoginUserInfoTop />

      <div className="User-Info-Rrev">
        <div className="slider" ref={sliderRef}>
          <div className="sliderpage">
            <UserInfoContainer
              FirstTopic="전공"
              FirstText={formData.depart}
              SecoundTopic="학번"
              SecondText={formData.year}
            />
            <UserInfoContainer
              FirstTopic="좋아하는 노래"
              FirstText={formData.song}
              SecoundTopic="MBTI"
              SecondText={formData.mbti}
            />
          </div>
          <div className="sliderpage">
            <UserInfoContainer
              FirstTopic="전공"
              FirstText={formData.depart}
              SecoundTopic="학번"
              SecondText={formData.year}
            />
            <UserInfoContainer
              FirstTopic="좋아하는 노래"
              FirstText={formData.song}
              SecoundTopic="MBTI"
              SecondText={formData.mbti}
            />
          </div>
        </div>
        <div className="User-Contact">@kim.q1</div>
      </div>
    </Fragment>
  );
}

export default UserInfoRrev;
