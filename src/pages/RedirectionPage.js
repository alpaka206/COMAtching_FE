import React, { useEffect } from "react";
import base64 from "base-64";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../Atoms";

function Redirection() {
  const navigate = useNavigate();
  const [userToken, setUserToken] = useRecoilState(userState);

  useEffect(() => {
    // 쿠키에서 토큰 가져오기
    const token = new URL(window.location.href).searchParams.get("token");
    setUserToken((prevUser) => ({ ...prevUser, token: token }));

    if (token) {
      const decoded = decodeJWT(token);
      if (decoded) {
        // 역할 확인
        if (decoded.role === "ROLE_SOCIAL") {
          console.log("회원가입 유저");
          // localStorage.setItem("token", token);
          navigate("/profilebuilder");
        } else if (decoded.role === "ROLE_USER") {
          console.log("로그인 유저");
          localStorage.setItem("token", token);
          navigate("/");
        } else if (decoded.role === "ROLE_ADMIN") {
          console.log("관리자");
          localStorage.setItem("token", token);
          navigate("/");
        } else {
          console.error("Unknown role:", decoded.role);
          navigate("/");
        }
      } else {
        console.error("Invalid token");
        navigate("/");
      }
    } else {
      console.error("Token not found in cookies");
      navigate("/");
    }
  }, []);

  const decodeJWT = (token) => {
    try {
      const payload = token.split(".")[1];
      const decodedPayload = base64.decode(payload);
      return JSON.parse(decodedPayload);
    } catch (error) {
      console.error("Invalid token", error);
      return null;
    }
  };

  return <div className="container">Redirection Page</div>;
}

export default Redirection;
