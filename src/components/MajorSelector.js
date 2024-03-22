// MajorSelector.js

import React from "react";
import majorCategories from "../data/majorCategories";
import MajorSelectorElement from "./MajorSelectorElement";
import "../css/components/MajorSelector.css";

const MajorSelector = ({ user, setUser, checkMethod, setCheckMethod }) => {
  const handleInputChange = (fieldName, value) => {
    setCheckMethod((prevState) => ({
      ...prevState,
      [fieldName]: value,
      major: fieldName === "department" ? "" : prevState.major,
    }));
    setUser((prevUser) => ({
      ...prevUser,
      depart: value,
    }));
  };

  return (
    <div className="major-selector">
      <MajorSelectorElement
        placeholder="학과"
        fieldType="depart"
        labelname="depart-select"
        selectname="depart"
        value={checkMethod.department}
        onChange={(e) => handleInputChange("department", e.target.value)}
        options={majorCategories.map((category) => category.label)}
      />
      <MajorSelectorElement
        placeholder="전공"
        fieldType="major"
        labelname="major-select"
        selectname="major"
        value={checkMethod?.major || ""}
        onChange={(e) => handleInputChange("major", e.target.value)}
        options={
          checkMethod.department
            ? majorCategories.find(
                (category) => category.label === checkMethod.department
              )?.options || []
            : []
        }
      />
    </div>
  );
};

export default MajorSelector;
