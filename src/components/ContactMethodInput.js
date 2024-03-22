import React from "react";
import MyInput from "../components/MyInput";

function ContactMethodInput({ method, userPhone, handleChange, handleCheck }) {
  return (
    <div className="contact-input">
      <label>
        <MyInput
          name="phone"
          value={userPhone}
          onChange={handleChange}
          placeholder={
            method === "phone"
              ? "ex) 01012345678"
              : "ex) cuk_coma (@는 빼고 넣어주세요)"
          }
        />
        <button type="button" className="checkbutton" onClick={handleCheck}>
          확인
        </button>
      </label>
    </div>
  );
}

export default ContactMethodInput;
