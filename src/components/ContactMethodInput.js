import React from "react";
import MyInput from "../components/MyInput";
import "../css/components/ContactMethodInput.css";
import axios from "axios";

function ContactMethodInput({
  handleChange,
  checkMethod,
  user,
  setCheckMethod,
}) {
  const checkIfExists = async () => {
    const response = await axios.get(
      `https://onesons.site/register?phone=${user.phone}`
    );
    return response;
  };

  const handleCheck = async () => {
    const response = await checkIfExists();
    const alreadyExists = response.data;
    console.log(response.data);
    console.log(alreadyExists);
    if (alreadyExists) {
      alert(
        `이미 존재하는 ${
          checkMethod.contactMethod === "phone" ? "전화번호" : "인스타그램 ID"
        }입니다.`
      );
    } else {
      alert(
        `입력한 ${
          checkMethod.contactMethod === "phone" ? "전화번호" : "인스타그램 ID"
        }는 사용 가능합니다.`
      );
      setCheckMethod((prevState) => ({
        ...prevState,
        contactVerified: true,
      }));
    }
  };
  return (
    <div className="contact-input">
      <MyInput
        name="phone"
        value={user.phone}
        onChange={handleChange}
        placeholder={
          checkMethod.contactMethod === "phone"
            ? "ex) 01012345678"
            : "ex) cuk_coma (@는 빼고 넣어주세요)"
        }
      />
      <button type="button" className="checkbutton" onClick={handleCheck}>
        확인
      </button>
    </div>
  );
}

export default ContactMethodInput;
