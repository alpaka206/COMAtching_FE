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
    // 컴포넌트가 마운트될 때 API 요청을 보냄
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get("/token/check");
        if (response.status === 200) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    checkLoginStatus();
  }, []);

  // 로그인 상태에 따라 다른 컴포넌트 렌더링
  return <div>{isLoggedIn ? <MainpageLogin /> : <MainpageUnLogin />}</div>;
}

export default Mainpage;
