import React, { Fragment } from "react";
import ContactMethodInput from "../components/ContactMethodInput";
import ContactMethodPick from "../components/ContactMethodPick";
import "../css/components/ContactMethod.css";

function ContactMethod({ user, handleChange, setUser }) {
  return (
    <Fragment>
      <ContactMethodPick user={user} setUser={setUser} />

      <ContactMethodInput
        user={user}
        setUser={setUser}
        handleChange={handleChange}
      />
      <h6
        className={`check-message ${user.contact_id_Verified ? "hidden" : ""}`}
      >
        중복입력 방지를 위해 확인버튼을 눌러주세요
      </h6>
    </Fragment>
  );
}

export default ContactMethod;
