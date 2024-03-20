import React, { Fragment } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../Atoms";
import LoginUserInfoTop from "../components/LoginUserInfoTop";
import "../css/components/UserInfoRrev.css";
import UserInfoContainer from "../components/UserInfoContainer";

function UserInfoRrev() {
  const formData = useRecoilValue(userState);
  return (
    <Fragment>
      <LoginUserInfoTop />
      <div className="User-Info-Rrev">
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
        <div className="User-Contact">@kim.q1</div>
      </div>
    </Fragment>
  );
}

export default UserInfoRrev;
