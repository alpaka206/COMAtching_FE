import React, { useState, useEffect } from "react";
import "../css/pages/Loading.css";
import HeaderNav from "../components/HeaderNav";
import { useNavigate } from "react-router-dom";

// 단순한 로딩 페이지입니다. (원래는 ai답변 대기시간를 위한 것이였는데 개발 당시 시간 부족으로 그저 AI답변 효과처럼 표현하는것으로 바꿨습니다.)
// match 결과창에서 스켈레톤 ui처럼 바꿀건지 얘기해보면 좋을거같습니다

const Loading = () => {
  const [offset, setOffset] = useState(-100);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prevOffset) => (prevOffset < 100 ? prevOffset + 1 : -100));
    }, 15); // 1500ms / 100 steps
    const redirectTimeout = setTimeout(() => {
      navigate("/match-result");
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(redirectTimeout); // Clear the timeout to prevent memory leaks
    };
  }, [navigate]);

  return (
    <div className="container">
      <HeaderNav />
      <div className="content">
        <div className="LoadingText">
          코매칭 AI가 입력하신 결과를 바탕으로 <br />
          비슷한 매칭 상대를 찾고 있어요..
        </div>
        <div className="LoadingBar">
          <div className="GradientBar firstloadingbar" style={{ backgroundPosition: `${offset}% 0` }} />
          <div className="GradientBar secondloadingbar" style={{ backgroundPosition: `${offset}% 0` }} />
          <div className="GradientBar thirdloadingbar" style={{ backgroundPosition: `${offset}% 0` }} />
        </div>
      </div>
    </div>
  );
};

export default Loading;
