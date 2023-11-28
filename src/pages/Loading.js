import React, { useEffect } from "react";
import "./Loading.css";
import ComatHeader from "../components/ComatHeader";
import Footer from "./../components/Footer";
import FadeLoader from "react-spinners/FadeLoader";
import Login from "./Login";
import { useRecoilValue } from "recoil";
import { userState } from "../Atoms";
import { useNavigate } from "react-router-dom";

function Loading() {
  const navigate = useNavigate();

  const formData = useRecoilValue(userState);
  const goback = () => {
    navigate("/");
  };
  useEffect(() => {
    // Simulate an asynchronous operation (e.g., fetching data) that sets loading to false when completed.
    const fetchData = async () => {
      // Simulating a delay of 2 seconds
      await new Promise((resolve) => setTimeout(resolve, 2000));
    };

    fetchData();
  }, []);
  const alarmUrl = () => {
    alert("url강제 이동시 로그아웃 후 로그인 페이지로 이동됩니다.");
  };
  return (
    <div>
      {formData.isLoggedIn ? (
        <div className="loading-container">
          <ComatHeader destination="/" buttonText="처음으로" />
          <div className="loading-content">
            <FadeLoader color="#C63DEE" height={30} width={10} margin={30} />
            <h3>로딩중 입니다</h3>
          </div>
          <button className="loading-submit-button" onClick={goback}>
            취소하기
          </button>
          <Footer />
        </div>
      ) : (
        <>
          {alarmUrl()}
          <Login />
        </>
      )}
    </div>
  );
}

export default Loading;
