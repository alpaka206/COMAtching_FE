import React from "react";
import { Navigate } from "react-router-dom";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

const PrivateRoute = ({ component: RouteComponent }) => {
  const showAlert = () => {
    alert("로그인이 필요합니다.");
  };

  return cookies.get("Token") ? (
    <RouteComponent />
  ) : (
    <>
      {showAlert()}
      <Navigate to="/" />;
    </>
  );
};

export default PrivateRoute;
