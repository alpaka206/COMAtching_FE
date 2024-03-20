import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../Atoms";
import "../css/components/HeaderNav.css";

function HeaderNav({ destination, buttonText }) {
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();
  const handleLogout = () => {
    setUser((prevUser) => ({
      ...prevUser,
      isLoggedIn: false,
    }));
  };

  return (
    <div className="header">
      <div>
        <img
          className="logo-img"
          src={process.env.PUBLIC_URL + `assets/logowhite.png`}
          alt="로고"
          onClick={() => navigate("/")}
        />
      </div>
      {buttonText === "로그아웃" ? (
        <button className="look-button" onClick={handleLogout}>
          {buttonText}
        </button>
      ) : (
        <button
          className="look-button"
          onClick={() => navigate(destination || -1)}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}

export default HeaderNav;
