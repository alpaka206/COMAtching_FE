import React from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../Atoms";
import MainpageUnLogin from "./MainpageUnLogin";
import MainpageLogin from "./MainpageLogin";

function Mainpage() {
  const user = useRecoilValue(userState);

  return <div>{user.isLoggedIn ? <MainpageLogin /> : <MainpageUnLogin />}</div>;
}

export default Mainpage;
