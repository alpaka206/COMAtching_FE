import React, { useEffect, useState } from "react";
import TextTyping from "../components/TextTyping";
import Admin from "./Admin";
// import axios from "axios";
// import { validateForm } from "../myfunction/formValidation";
// import { useRecoilState } from "recoil";
// import { userState, selectedMBTIState } from "../Atoms";
// import { useNavigate } from "react-router-dom";
// import MyInput from "../components/MyInput";
// import HeaderNav from "../components/HeaderNav";
// import MajorSelector from "../components/MajorSelector";
// import FormTitle from "../components/FormTitle";
// import "../css/pages/Form.css";
// import StudentIdInput from "../components/StudentIdInput";
// import ContactMethod from "../components/ContactMethod";
// import GenderSelect from "../components/GenderSelect";
// import MBTISection from "../components/MBTISection";

function FormTest() {
  return (
    <TextTyping
      text={
        "반가워요! 저는 Comatching AI 입니다. 커플매칭을 진행하기 전에, 먼저 당신에 대해 알아야 해요. \n 간단한 MBTI 검사부터 시작할게요. 😊"
      }
    />
  );
}

export default FormTest;
