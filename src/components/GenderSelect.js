import React, { Fragment } from "react";
import GenderButton from "../components/GenderButton";
import "../css/components/GenderSelect.css";

function GenderSelect({ user, setUser }) {
  const handleGenderSelection = (value) => {
    setUser((prevUser) => ({
      ...prevUser,
      gender: value === "male" ? true : false,
    }));
  };
  return (
    <Fragment>
      <h3>성별</h3>
      <div className="gender-container">
        <GenderButton
          isActive={user.gender}
          value="male"
          onClick={() => handleGenderSelection("male")}
          label="남자"
        />
        <GenderButton
          isActive={!user.gender}
          value="female"
          onClick={() => handleGenderSelection("female")}
          label="여자"
        />
      </div>
    </Fragment>
  );
}

export default GenderSelect;
