import React from "react";
import axios from "axios";
import Footer from "../components/Footer";
import HeaderNav from "../components/HeaderNav";
import "./Checkresult.css";
import Mainpage from "./Mainpage";
import { useRecoilValue } from "recoil";
import { generatedDataState } from "../Atoms";
import UserInfoRrev from "../components/UserInfoRrev";
import ResultReview from "../components/ResultReview";

function Checkresult() {
  const generatedData = useRecoilValue(generatedDataState);
  const alarmUrl = () => {
    alert("url강제 이동시 로그아웃 후 로그인 페이지로 이동됩니다.");
  };

  return (
    <div>
      {/* {formData.isLoggedIn ? ( */}
      <div className="container">
        <HeaderNav />
        <div className="checkresult-content">
          {generatedData.map((item, index) => (
            <div key={index}>
              <UserInfoRrev user={item} />

              {!item.review && <ResultReview user={item} />}
            </div>
          ))}
        </div>
        <Footer />
      </div>
      {/* ) : (
        <>
          {alarmUrl()}
          <Mainpage />
        </>
      )} */}
    </div>
  );
}

export default Checkresult;
