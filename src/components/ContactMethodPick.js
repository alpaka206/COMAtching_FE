import React from "react";
import ContactMethodButton from "./ContactMethodButton";
import "../css/components/ContactMethodPick.css";

function ContactMethodPick({ user, setUser }) {
  const handleContactMethod = (method) => {
    setUser((prev) => ({
      ...prev,
      contact: method,
    }));
  };

  return (
    <div className="ContactMethodPick">
      <h3>연락처</h3>
      <div className="space">&nbsp;</div>
      <ContactMethodButton
        isActive={user.contact === "kakao"}
        onClick={() => handleContactMethod("kakao")}
        type="kakao"
        image={process.env.PUBLIC_URL + "assets/kakao.svg"}
        alt="카카오아이디"
      />

      <ContactMethodButton
        isActive={user.contact === "instagram"}
        onClick={() => handleContactMethod("instagram")}
        type="instagram"
        image={process.env.PUBLIC_URL + "assets/insta.png"}
        alt="인스타그램"
      />
    </div>
  );
}

export default ContactMethodPick;
