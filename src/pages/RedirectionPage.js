import React, { useEffect } from "react";
import base64 from "base-64";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../Atoms";

function Redirection() {
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅 사용
  const [userToken, setUserToken] = useRecoilState(userState); // 사용자 토큰 상태를 관리하는 Recoil 상태

  useEffect(() => {
    // 쿼리 스트링으로 토큰가져오기
    const token = new URL(window.location.href).searchParams.get("token");

    if (token) {
      const decoded = decodeJWT(token); // 토큰 디코딩
      if (decoded) {
        // 역할 확인
        if (decoded.role === "ROLE_SOCIAL") {
          console.log("회원가입 유저");
          setUserToken((prevUser) => ({ ...prevUser, token: token }));
          // 회원가입 페이지로 이동
          navigate("/profile-builder");
        } else if (decoded.role === "ROLE_USER") {
          console.log("로그인 유저");
          localStorage.setItem("token", token); // 토큰을 로컬 스토리지에 저장
          navigate("/");
        } else if (decoded.role === "ROLE_ADMIN") {
          console.log("관리자");
          localStorage.setItem("token", token);
          navigate("/admin-select"); // 관리자 페이지로 이동
        } else {
          console.error("Unknown role:", decoded.role); // 알 수 없는 역할 처리
          navigate("/");
        }
      } else {
        console.error("Invalid token"); // 유효하지 않은 토큰 처리
        navigate("/");
      }
    } else {
      console.error("Token not found in cookies"); // URL에서 토큰을 찾을 수 없는 경우 처리
      navigate("/");
    }
  }, []); // 빈 배열이므로 컴포넌트가 처음 마운트될 때만 실행

  // JWT 디코딩 함수(base64 이용)
  const decodeJWT = (token) => {
    try {
      const payload = token.split(".")[1];
      const decodedPayload = base64.decode(payload);
      return JSON.parse(decodedPayload); // 디코딩된 페이로드를 JSON 객체로 변환
    } catch (error) {
      console.error("Invalid token", error); // 디코딩 중 오류 발생 시 처리
      return null;
    }
  };

  return <div></div>;
}

export default Redirection;
