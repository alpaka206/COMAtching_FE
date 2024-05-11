import React, { useState, useEffect } from "react";
import "./Loading.css";
import HeaderNav from "../components/HeaderNav";
import { useNavigate } from "react-router-dom";

const Loading = () => {
  const [offset, setOffset] = useState(-100);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prevOffset) => (prevOffset < 100 ? prevOffset + 1 : -100));
    }, 15); // 1500ms / 100 steps
    const redirectTimeout = setTimeout(() => {
      navigate("/Matchresult");
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
        <div className="LoadingBar">
          <div
            className="GradientBar firstloadingbar"
            style={{ backgroundPosition: `${offset}% 0` }}
          />
          <div
            className="GradientBar secondloadingbar"
            style={{ backgroundPosition: `${offset}% 0` }}
          />
          <div
            className="GradientBar thirdloadingbar"
            style={{ backgroundPosition: `${offset}% 0` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Loading;
