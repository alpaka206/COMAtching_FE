import React, { Fragment } from "react";
import GenderButton from "../components/GenderButton";
import "../css/components/GenderSelect.css";

function GenderSelect({ user, setUser }) {
  const handleGenderSelection = (value) => {
    setUser((prevUser) => ({
      ...prevUser,
      gender: value === "male" ? "Male" : "Female",
    }));
  };
  const isActive = user.gender.includes("male");
  return (
    <Fragment>
      <h3>성별</h3>
      <div className="gender-container">
        <GenderButton
          isActive={!isActive}
          value="male"
          onClick={() => handleGenderSelection("male")}
          label="남자"
        />
        <GenderButton
          isActive={isActive}
          value="female"
          onClick={() => handleGenderSelection("female")}
          label="여자"
        />
      </div>
    </Fragment>
  );
}

export default GenderSelect;
