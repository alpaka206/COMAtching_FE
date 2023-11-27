import React, { useEffect } from "react";
import "./MainpageUnLogin.css";
import ComatHeader from "../components/ComatHeader";
import Footer from "./../components/Footer";
import FadeLoader from "react-spinners/FadeLoader";
import Login from "./Login";
import { useRecoilValue } from "recoil";
import { userState } from "../Atoms";

function Loading() {
  const formData = useRecoilValue(userState);

  useEffect(() => {
    // Simulate an asynchronous operation (e.g., fetching data) that sets loading to false when completed.
    const fetchData = async () => {
      // Simulating a delay of 2 seconds
      await new Promise((resolve) => setTimeout(resolve, 2000));
    };

    fetchData();
  }, []);
  return (
    <div>
      {formData.isLoggedIn ? (
        <div className="container">
          <ComatHeader destination="/" buttonText="처음으로" />
          <div className="content">
            <FadeLoader color="#C63DEE" height={30} width={10} margin={30} />
            <h3>로딩중 입니다</h3>
            <div>
              <button className="submit-button">취소하기</button>
            </div>
          </div>
          <Footer />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default Loading;
