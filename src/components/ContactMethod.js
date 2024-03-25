import React, { Fragment } from "react";
import ContactMethodInput from "../components/ContactMethodInput";
import ContactMethodPick from "../components/ContactMethodPick";
import "../css/components/ContactMethod.css";

function ContactMethod({
  checkMethod,
  setCheckMethod,
  user,
  handleChange,
  handleCheck,
}) {
  return (
    <Fragment>
      <ContactMethodPick
        checkMethod={checkMethod}
        setCheckMethod={setCheckMethod}
      />

      <ContactMethodInput
        method={checkMethod.contactMethod}
        userPhone={user.phone}
        handleChange={handleChange}
        handleCheck={handleCheck}
      />
      <h6
        className={`check-message ${
          checkMethod.contactVerified ? "hidden" : ""
        }`}
      >
        중복입력 방지를 위해 확인버튼을 눌러주세요
      </h6>
    </Fragment>
  );
}

export default ContactMethod;
