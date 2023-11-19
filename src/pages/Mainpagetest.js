import React, { useState } from "react";
import Mainpage from "./Mainpage";
import Test from "./Test";

function MainPageTest() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div>
      {isLoggedIn ? (
        <Test onLogout={handleLogout} />
      ) : (
        <Mainpage onLogin={handleLogin} />
      )}
      <div style={{ marginTop: "20px" }}>
        <button onClick={handleLogin} style={{ marginRight: "10px" }}>
          강제 로그인
        </button>
        <button onClick={handleLogout}>강제 로그아웃</button>
      </div>
    </div>
  );
}

export default MainPageTest;
