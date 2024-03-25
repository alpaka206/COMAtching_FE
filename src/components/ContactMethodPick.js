import React from "react";
import ContactMethodButton from "./ContactMethodButton";
import "../css/components/ContactMethodPick.css";

function ContactMethodPick({ checkMethod, setCheckMethod }) {
  const handleContactMethod = (method) => {
    setCheckMethod((prevState) => ({
      ...prevState,
      contactMethod: method,
    }));
  };
  return (
    <div className="ContactMethodPick">
      <h3>연락처</h3>
      <div className="space">&nbsp;</div>
      <ContactMethodButton
        isActive={checkMethod.contactMethod === "phone"}
        onClick={() => handleContactMethod("phone")}
        type="phone"
        image={process.env.PUBLIC_URL + "assets/phone.svg"}
        alt="전화번호"
      />

      <ContactMethodButton
        isActive={checkMethod.contactMethod === "insta"}
        onClick={() => handleContactMethod("insta")}
        type="insta"
        image={process.env.PUBLIC_URL + "assets/insta.png"}
        alt="인스타그램"
      />
    </div>
  );
}

export default ContactMethodPick;
