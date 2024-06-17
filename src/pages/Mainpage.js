import React, { useEffect, useState } from "react";
import MainpageUnLogin from "./MainpageUnLogin";
import MainpageLogin from "./MainpageLogin";
import axios from "axios";
// mainpage 로그인 비로그인 페이지를 구분하기 위한 페이지입니다
// 토큰의 유무로 확인하였으며 response를 통해 상태를 확인합니다.
function Mainpage() {
  // 로그인 상태를 관리하기 위한 state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 로그인 상태를 확인하는 비동기 함수
    const checkLoginStatus = async () => {
      try {
        // 로컬 스토리지에서 토큰을 가져옴
        const token = localStorage.getItem("token") || "";
        // 토큰을 이용해 로그인 상태를 체크하는 API 호출
        const response = await axios.get(
          "https://catholic-mibal.site/token/check",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (
          response.data.code[0] === "SEC-001" ||
          response.data.code[0] === "SEC-002"
        ) {
          setIsLoggedIn(false);
        } else {
          // 그 외의 경우 로그인 상태로 설정
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    // 컴포넌트가 마운트될 때 로그인 상태를 확인
    checkLoginStatus();
  }, []);

  // 로그인 상태에 따라 다른 컴포넌트 렌더링
  return <div>{isLoggedIn ? <MainpageLogin /> : <MainpageUnLogin />}</div>;
}

export default Mainpage;
