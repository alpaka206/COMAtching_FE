import React, { useEffect, useState } from "react";
import MainpageUnLogin from "./MainpageUnLogin";
import MainpageLogin from "./MainpageLogin";
import axios from "axios";

function Mainpage() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://catholic-mibal.site/comatching/code-req/user",
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        console.log(response.data);
        if (
          response.data.message[0] === "token is expired" ||
          response.data.message[0] === "token is available"
        ) {
          setIsLoggedIn(false);
        } else {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  return <div>{isLoggedIn ? <MainpageLogin /> : <MainpageUnLogin />}</div>;
}

export default Mainpage;
