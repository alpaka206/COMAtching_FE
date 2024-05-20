import React, { useEffect, useState } from "react";
import MainpageUnLogin from "./MainpageUnLogin";
import MainpageLogin from "./MainpageLogin";
import axios from "axios";

function Mainpage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = localStorage.getItem("token") || "";
        console.log(token);
        const response = await axios.get(
          "https://catholic-mibal.site/token/check",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        console.log(response.data);
        if (
          response.data.code[0] === "SEC-001" ||
          response.data.code[0] === "SEC-002"
        ) {
          setIsLoggedIn(false);
        } else {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
        // setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  return <div>{isLoggedIn ? <MainpageLogin /> : <MainpageUnLogin />}</div>;
}

export default Mainpage;
