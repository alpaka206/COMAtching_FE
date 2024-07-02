import React from "react";
import MyInput from "../components/MyInput";
import "../css/components/ContactMethodInput.css";
import axios from "../axiosConfig";

function ContactMethodInput({ handleChange, user, setUser }) {
  // 중복 여부 확인 함수
  const checkIfExists = async () => {
    // contact_id가 @로 시작하면 @를 제거
    const contactId = user.contact_id.startsWith("@") ? user.contact_id.slice(1) : user.contact_id;
    const contact = user.contact;
    // 서버에 중복 여부를 확인하는 GET 요청
    const response = await axios.get(`/account/contact/duplication?contactId=${contactId}&contactType=${contact}`);
    // 응답 코드에 따른 처리
    if (response.data.status === 200) {
      const duplication = response.data.data.is_duplication;
      return duplication;
    } else {
      throw new Error("Unexpected response code or status");
    }
  };
  // 입력 값 확인 및 유효성 검사 함수
  const handleCheck = async () => {
    // 카카오 ID 유효성 검사 패턴
    const kakaoPattern = /^[a-z0-9-_.]{3,15}$/;
    // 인스타그램 ID 유효성 검사 패턴
    const instagramPattern = /^@[a-z0-9_.]+$/;

    // contact 값에 따른 유효성 검사
    if (user.contact === "kakao") {
      if (!kakaoPattern.test(user.contact_id)) {
        alert("카카오 ID 형식이 올바르지 않습니다.");
        return;
      }
    } else if (user.contact === "instagram") {
      if (!instagramPattern.test(user.contact_id)) {
        alert("인스타 아이디는 @을 붙이고 영어, 숫자, 언더바(_), 마침표(.)만 가능합니다.");
        return;
      }
    }

    // 중복 여부 확인
    const alreadyExists = await checkIfExists();
    if (alreadyExists) {
      alert(`이미 존재하는 ${user.contact === "kakao" ? "카카오 ID" : "인스타그램 ID"}입니다.`);
    } else {
      alert(`입력한 ${user.contact === "kakao" ? "카카오 ID" : "인스타그램 ID"}는 사용 가능합니다.`);
      setUser((prevState) => ({
        ...prevState,
        contact_id_Verified: false,
      }));
    }
  };

  return (
    <div className="contact-input">
      <MyInput
        name="contact_id"
        value={user.contact_id}
        onChange={handleChange}
        placeholder={user.contact === "kakao" ? "ex) kakao12" : "ex) @cuk_coma (@도 꼭 넣어주세요)"}
      />
      <button type="button" className="checkbutton" onClick={handleCheck}>
        확인
      </button>
    </div>
  );
}

export default ContactMethodInput;
