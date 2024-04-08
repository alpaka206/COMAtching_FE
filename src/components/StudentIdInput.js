import React, { Fragment } from "react";
import MyInput from "../components/MyInput";
import "../css/components/StudentIdInput.css";

function StudentIdInput({ value, onChange }) {
  return (
    <Fragment>
      <h3>나이</h3>
      <div className="age">
        <MyInput
          name="age"
          value={value}
          onChange={onChange}
          placeholder="97년생부터 05년생만 가능합니다 ex) 05"
        />
      </div>
    </Fragment>
  );
}

export default StudentIdInput;
